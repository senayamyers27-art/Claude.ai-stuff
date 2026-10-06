/* StudyToCert API (Cloudflare Worker).
   See ../docs/BACKEND_DESIGN.md. The static site works without this; it only calls the API
   when someone signs in. */
import { HttpError, readJson, notFound, clientIp } from "./util.js";
import { rateLimit, securityLog, setHashKey } from "./audit.js";
import { smsEnabled, startAddPhone, confirmPhone, removePhone, startSmsSignIn, verifySmsSignIn } from "./sms.js";
import { sendWelcomeEmails, unsubscribe } from "./welcome.js";
import { requestMagicLink, verifyMagicLink, verifyCode, requireUser, currentUser, logout, clearCookie, refreshedCookies, isAppOrigin, isAppRequest, createSession, createSessionToken } from "./auth.js";
import { listDocs, putDoc, MAX_DOC_BYTES } from "./progress.js";
import { entitlementsFor, createCheckout, createPortal, handleWebhook, billingEnabled, premiumEnabled, referralInfo } from "./billing.js";
import { adminStats, isAdmin } from "./admin.js";
import { tutorChat } from "./tutor.js";
import { createOrg, createCohort, listCohorts, createInvite, acceptInvite, cohortSummary, summaryCsv } from "./orgs.js";
import { exportAccount, deleteAccount } from "./account.js";
import { registerOptions, registerVerify, signinOptions, signinVerify, listPasskeys, deletePasskey, listSessions, endSession, endOtherSessions } from "./passkeys.js";
import { startOAuth, finishOAuth, unlinkIdentity, enabledProviders } from "./oauth.js";
import { getProfile, updateProfile } from "./profile.js";
import { setPassword, removePassword, passwordSignIn } from "./password.js";
import { supportChat, supportEnabled } from "./support.js";
import { createAssignment, deleteAssignment, listClasses, createClass, updateClass, deleteClass, rotateCode, previewJoin, joinClass, leaveClass, removeStudent, roster, rosterCsv } from "./classes.js";

const SECURITY_HEADERS = {
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Cache-Control": "no-store",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains"
};

// The site, and the iOS and Android apps (which send their session as a bearer token, not a cookie).
const allowedOrigin = (env, origin) => !!origin && (origin === env.SITE_ORIGIN || isAppOrigin(env, origin));
function cors(env, request) {
  const origin = request.headers.get("origin");
  if (!allowedOrigin(env, origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    // Cookies only for the site; the apps authenticate with a bearer token.
    ...(origin === env.SITE_ORIGIN ? { "Access-Control-Allow-Credentials": "true" } : {}),
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "600",
    Vary: "Origin"
  };
}

function json(env, request, data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...SECURITY_HEADERS, ...cors(env, request), ...extra } });
}

// A redirect for the sign-in-with-a-provider flow, which runs as top-level page navigations.
function redirect(location, cookies = []) {
  const h = new Headers({ Location: location, ...SECURITY_HEADERS });
  for (const c of cookies) h.append("Set-Cookie", c);
  return new Response(null, { status: 302, headers: h });
}

// Refusals worth a security log line: forbidden, too large, wrong body type, rate limited.
const LOGGED = new Set([403, 413, 415, 429]);
// Writes per signed-in user per hour. Progress sync pushes at most every few seconds while someone studies.
const USER_WRITES_PER_HOUR = 1000;

export default {
  async fetch(request, env) {
    setHashKey(env.IP_HASH_KEY);
    try {
      const res = await route(request, env);
      const c = refreshedCookies.get(request);
      if (c && !res.headers.has("Set-Cookie")) res.headers.append("Set-Cookie", c);
      return res;
    } catch (e) {
      if (e instanceof HttpError) {
        if (LOGGED.has(e.status)) await securityLog(request, e.code, { status: e.status }).catch(() => {});
        return json(env, request, { error: e.code, message: e.message }, e.status);
      }
      console.error("unhandled", e && e.stack ? e.stack.split("\n")[0] : e); // no request bodies or emails in logs
      return json(env, request, { error: "server_error", message: "Something went wrong. Try again." }, 500);
    }
  },
  // Daily clean-up (wrangler [triggers] crons), so expired sign-in links, sessions and logs don't pile up.
  async scheduled(controller, env, ctx) {
    // 15:47 UTC: the welcome emails (./welcome.js); the other run cleans up.
    ctx.waitUntil(controller && controller.cron === "47 15 * * *" ? sendWelcomeEmails(env) : purgeExpired(env));
  }
};

const DAY = 24 * 60 * 60 * 1000;
// How long each kind of expired or historical row is kept. The audit log is kept a year to investigate abuse
// (as the privacy policy says); everything else goes soon after it stops being useful.
export async function purgeExpired(env, t = Date.now()) {
  const steps = [
    ["DELETE FROM magic_links WHERE expires_at < ?", t - DAY],
    ["DELETE FROM sessions WHERE expires_at < ?", t],
    ["DELETE FROM webauthn_challenges WHERE expires_at < ?", t],
    ["DELETE FROM oauth_states WHERE expires_at < ?", t],
    ["DELETE FROM sms_codes WHERE expires_at < ?", t],
    ["DELETE FROM rate_limits WHERE window_start < ?", t - DAY],
    ["DELETE FROM stripe_events WHERE received_at < ?", t - 90 * DAY],
    ["DELETE FROM audit_log WHERE at < ?", t - 365 * DAY]
  ];
  const out = {};
  for (const [sql, before] of steps) {
    const r = await env.DB.prepare(sql).bind(before).run();
    out[sql.split(" ")[2]] = (r.meta && r.meta.changes) || 0;
  }
  console.log(JSON.stringify({ type: "purge", ...out }));
  return out;
}

const isTeacher = async (env, u) => isAdmin(env, u) || ((await env.DB.prepare("SELECT role FROM users WHERE id = ?").bind(u.id).first()) || {}).role === "teacher";

async function route(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const method = request.method;

  let m0;
  if (method === "OPTIONS") return new Response(null, { status: 204, headers: { ...SECURITY_HEADERS, ...cors(env, request) } });

  // Per-address request limit, when the Workers rate limiting binding is configured (wrangler.toml
  // [[ratelimits]] API_LIMIT). It's kept in memory at the edge, so it adds no database work.
  if (env.API_LIMIT && path !== "/v1/stripe/webhook") {
    const { success } = await env.API_LIMIT.limit({ key: "ip:" + clientIp(request) });
    if (!success) throw new HttpError(429, "rate_limited", "Too many requests. Wait a minute and try again.");
  }

  // Stripe calls this directly, authenticated by signature, not by cookie or origin.
  if (path === "/v1/stripe/webhook" && method === "POST") return json(env, request, await handleWebhook(env, request));

  // Unsubscribe from the welcome emails: a signed link (GET shows a button, POST unsubscribes), also posted to
  // directly by mail apps' one-click unsubscribe, so it comes before the origin check.
  if (path === "/v1/email/unsubscribe" && (method === "GET" || method === "POST")) {
    const { html } = await unsubscribe(env, request, url);
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", ...SECURITY_HEADERS, "Content-Security-Policy": "default-src 'none'; form-action 'self'; frame-ancestors 'none'" } });
  }

  // Browsers send Origin on every cross-origin and state-changing request. Anything writing
  // with a cookie must come from the site itself (defense against cross-site request forgery).
  if (method !== "GET") {
    const origin = request.headers.get("origin");
    if (!allowedOrigin(env, origin)) throw new HttpError(403, "bad_origin", "Requests must come from the site.");
  }

  if (path === "/v1/health" && method === "GET") return json(env, request, { ok: true, billing: billingEnabled(env), premium: premiumEnabled(env), support: supportEnabled(env) });

  // AI support assistant (./support.js): open to everyone, rate limited, nothing stored.
  if (path === "/v1/support/chat" && method === "POST") {
    const u = await currentUser(env, request).catch(() => null);
    const who = u ? { userId: u.id, plan: (await entitlementsFor(env, u.id)).plan } : null;
    return json(env, request, await supportChat(env, request, await readJson(request, 32 * 1024), who));
  }

  if (path === "/v1/auth/magic-link" && method === "POST") return json(env, request, await requestMagicLink(env, request, await readJson(request)));
  if (path === "/v1/auth/magic-link/verify" && method === "POST") {
    const { user, cookie } = await verifyMagicLink(env, request, await readJson(request));
    return json(env, request, { user: { id: user.id, email: user.email } }, 200, { "Set-Cookie": cookie });
  }
  if (path === "/v1/auth/code/verify" && method === "POST") {
    const { user, token } = await verifyCode(env, request, await readJson(request));
    return json(env, request, { user: { id: user.id, email: user.email }, token });
  }
  // Backup sign-in with a password. The apps get a bearer token; the website gets the session cookie.
  if (path === "/v1/auth/password" && method === "POST") {
    const user = await passwordSignIn(env, request, await readJson(request));
    if (isAppRequest(env, request)) return json(env, request, { user, token: await createSessionToken(env, request, user, "password") });
    return json(env, request, { user }, 200, { "Set-Cookie": await createSession(env, request, user, "password") });
  }
  // Backup sign-in with a code texted to the account's confirmed mobile number (./sms.js).
  if (path === "/v1/auth/sms/start" && method === "POST") return json(env, request, await startSmsSignIn(env, request, await readJson(request)));
  if (path === "/v1/auth/sms/verify" && method === "POST") {
    const user = await verifySmsSignIn(env, request, await readJson(request));
    if (isAppRequest(env, request)) return json(env, request, { user, token: await createSessionToken(env, request, user, "sms") });
    return json(env, request, { user }, 200, { "Set-Cookie": await createSession(env, request, user, "sms") });
  }
  if (path === "/v1/auth/passkey/options" && method === "POST") return json(env, request, await signinOptions(env, request));
  if (path === "/v1/auth/passkey/verify" && method === "POST") {
    const { user, cookie } = await signinVerify(env, request, await readJson(request));
    return json(env, request, { user: { id: user.id, email: user.email } }, 200, { "Set-Cookie": cookie });
  }
  // Sign in with Google, Facebook or LinkedIn (./oauth.js). These are page navigations, not fetches: GET only,
  // and a failure still redirects back to the site with an error code rather than showing JSON.
  if ((m0 = path.match(/^\/v1\/auth\/oauth\/([a-z]{3,12})\/start$/)) && method === "GET") {
    const linking = url.searchParams.get("link") === "1";
    const u = linking ? await currentUser(env, request) : null;
    if (linking && !u) return redirect(`${env.SITE_ORIGIN}/?signin_error=signed_out#login`);
    try {
      const r = await startOAuth(env, request, m0[1], u);
      return redirect(r.location, [r.cookie]);
    } catch (e) {
      if (!(e instanceof HttpError)) throw e;
      return redirect(`${env.SITE_ORIGIN}/?signin_error=${e.code === "rate_limited" ? "rate_limited" : "provider_off"}#${linking ? "profile" : "login"}`);
    }
  }
  if ((m0 = path.match(/^\/v1\/auth\/oauth\/([a-z]{3,12})\/callback$/)) && method === "GET") {
    try {
      const r = await finishOAuth(env, request, m0[1]);
      return redirect(r.location, r.cookies);
    } catch (e) {
      if (!(e instanceof HttpError)) throw e;
      return redirect(`${env.SITE_ORIGIN}/?signin_error=${e.code === "rate_limited" ? "rate_limited" : "provider_error"}#login`, [`__Host-cs_oauth=; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=0`]);
    }
  }

  if (path === "/v1/auth/logout" && method === "POST") {
    const u = await currentUser(env, request);
    if (u) await logout(env, request, u);
    return json(env, request, { ok: true }, 200, { "Set-Cookie": clearCookie() });
  }

  if (path === "/v1/me" && method === "GET") {
    const u = await currentUser(env, request);
    const providers = enabledProviders(env);
    if (!u) return json(env, request, { user: null, billing: billingEnabled(env), premium: premiumEnabled(env), providers, support: supportEnabled(env), sms: smsEnabled(env) });
    const p = await env.DB.prepare("SELECT display_name FROM users WHERE id = ?").bind(u.id).first();
    return json(env, request, { user: { id: u.id, email: u.email, displayName: (p && p.display_name) || "" }, billing: billingEnabled(env), premium: premiumEnabled(env), providers, support: supportEnabled(env), sms: smsEnabled(env), ...((await isTeacher(env, u)) ? { teacher: true } : {}), ...(isAdmin(env, u) ? { admin: true } : {}), ...(await entitlementsFor(env, u.id)) });
  }

  // Everything below needs a signed-in user.
  const user = await requireUser(env, request);
  if (method !== "GET") await rateLimit(env, "write:" + user.id, Number(env.USER_WRITES_PER_HOUR) || USER_WRITES_PER_HOUR, 60 * 60 * 1000);

  if (path === "/v1/progress" && method === "GET") return json(env, request, await listDocs(env, user));
  let m;
  if ((m = path.match(/^\/v1\/progress\/([a-z0-9:-]{1,50})$/)) && method === "PUT") {
    const r = await putDoc(env, user, m[1], await readJson(request, MAX_DOC_BYTES + 1024));
    return json(env, request, r.data, r.status);
  }

  // Lessons past the free sample, for any signed-in account: /v1/content/lessons/<cert-id>[?lang=es]
  // (uploaded from member/ by the API deploy; see tools/lesson-split.js).
  if ((m = path.match(/^\/v1\/content\/lessons\/([a-z0-9-]{1,40})$/)) && method === "GET") {
    const dir = url.searchParams.get("lang") === "es" ? "lessons-es" : "lessons";
    const obj = env.CONTENT ? await env.CONTENT.get(`member/${dir}/${m[1]}.json`) : null;
    if (!obj) throw notFound("No lessons for this yet.");
    return new Response(obj.body, { headers: { "Content-Type": "application/json; charset=utf-8", ...SECURITY_HEADERS, ...cors(env, request) } });
  }

  // Teacher editions (lesson plans, activities, exit tickets with answers): /v1/content/teacher/<cert-id>, for
  // accounts whose profile says "Teacher or trainer" (and the site owner).
  if ((m = path.match(/^\/v1\/content\/teacher\/([a-z0-9-]{1,40})$/)) && method === "GET") {
    if (!(await isTeacher(env, user))) throw new HttpError(403, "teacher_only", "Teacher editions are for teachers. Choose \"Teacher or trainer\" on your profile to see them.");
    const obj = env.CONTENT ? await env.CONTENT.get(`member/teacher/${m[1]}.json`) : null;
    if (!obj) throw notFound("No teacher edition for this yet.");
    return new Response(obj.body, { headers: { "Content-Type": "application/json; charset=utf-8", ...SECURITY_HEADERS, ...cors(env, request) } });
  }

  // Pro bundles: /v1/content/<cert-id> (questions, flashcards, study guide) and
  // /v1/content/capstones. The older /v1/content/<cert-id>/questions path returns the same bundle.
  if ((m = path.match(/^\/v1\/content\/([a-z0-9-]{1,40})(?:\/questions)?$/)) && method === "GET") {
    const ent = await entitlementsFor(env, user.id);
    if (!ent.features.includes("pro_content")) throw new HttpError(402, "pro_required", "This is part of Pro.");
    const obj = env.CONTENT ? await env.CONTENT.get(`pro/${m[1]}.json`) : null;
    if (!obj) throw notFound("No Pro content for this yet.");
    return new Response(obj.body, { headers: { "Content-Type": "application/json; charset=utf-8", ...SECURITY_HEADERS, ...cors(env, request) } });
  }

  // Premium Pro AI tutor, study coach and mock interviews (./tutor.js).
  if (path === "/v1/tutor/chat" && method === "POST") return json(env, request, await tutorChat(env, request, user, await entitlementsFor(env, user.id), await readJson(request, 48 * 1024)));

  if (path === "/v1/billing/checkout" && method === "POST") return json(env, request, await createCheckout(env, request, user, await readJson(request)));
  if (path === "/v1/billing/portal" && method === "POST") return json(env, request, await createPortal(env, request, user));
  if (path === "/v1/referral" && method === "GET") return json(env, request, await referralInfo(env, user));
  if (path === "/v1/admin/stats" && method === "GET") return json(env, request, await adminStats(env, user));

  if (path === "/v1/orgs" && method === "POST") return json(env, request, await createOrg(env, request, user, await readJson(request)));
  if ((m = path.match(/^\/v1\/orgs\/(org_[0-9a-f]{24})\/cohorts$/))) {
    if (method === "GET") return json(env, request, await listCohorts(env, user, m[1]));
    if (method === "POST") return json(env, request, await createCohort(env, request, user, m[1], await readJson(request)));
  }
  if ((m = path.match(/^\/v1\/orgs\/(org_[0-9a-f]{24})\/invites$/)) && method === "POST") return json(env, request, await createInvite(env, request, user, m[1], await readJson(request)));
  if ((m = path.match(/^\/v1\/invites\/([0-9a-f]{32})\/accept$/)) && method === "POST") return json(env, request, await acceptInvite(env, request, user, m[1]));
  if ((m = path.match(/^\/v1\/cohorts\/(coh_[0-9a-f]{24})\/summary(\.csv)?$/)) && method === "GET") {
    const s = await cohortSummary(env, user, m[1]);
    if (!m[2]) return json(env, request, s);
    return new Response(summaryCsv(s), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="cohort-${m[1]}.csv"`, ...SECURITY_HEADERS, ...cors(env, request) } });
  }

  // Class mode (free): teachers create classes; students join with a code after agreeing to share.
  if (path === "/v1/classes") {
    if (method === "GET") return json(env, request, await listClasses(env, user));
    if (method === "POST") return json(env, request, await createClass(env, request, user, await readJson(request)));
  }
  if ((m = path.match(/^\/v1\/classes\/join\/([a-km-np-z2-9]{10})$/))) {
    if (method === "GET") return json(env, request, await previewJoin(env, request, user, m[1]));
    if (method === "POST") return json(env, request, await joinClass(env, request, user, m[1], await readJson(request)));
  }
  if ((m = path.match(/^\/v1\/classes\/(cls_[0-9a-f]{24})$/))) {
    if (method === "PUT") return json(env, request, await updateClass(env, request, user, m[1], await readJson(request)));
    if (method === "DELETE") return json(env, request, await deleteClass(env, request, user, m[1]));
  }
  if ((m = path.match(/^\/v1\/classes\/(cls_[0-9a-f]{24})\/assignments$/)) && method === "POST") return json(env, request, await createAssignment(env, request, user, m[1], await readJson(request)));
  if ((m = path.match(/^\/v1\/classes\/(cls_[0-9a-f]{24})\/assignments\/(asg_[0-9a-f]{24})$/)) && method === "DELETE") return json(env, request, await deleteAssignment(env, request, user, m[1], m[2]));
  if ((m = path.match(/^\/v1\/classes\/(cls_[0-9a-f]{24})\/code$/)) && method === "POST") return json(env, request, await rotateCode(env, request, user, m[1]));
  if ((m = path.match(/^\/v1\/classes\/(cls_[0-9a-f]{24})\/membership$/)) && method === "DELETE") return json(env, request, await leaveClass(env, request, user, m[1]));
  if ((m = path.match(/^\/v1\/classes\/(cls_[0-9a-f]{24})\/students\/(mem_[0-9a-f]{24})$/)) && method === "DELETE") return json(env, request, await removeStudent(env, request, user, m[1], m[2]));
  if ((m = path.match(/^\/v1\/classes\/(cls_[0-9a-f]{24})\/roster(\.csv)?$/)) && method === "GET") {
    const r = await roster(env, user, m[1]);
    if (!m[2]) return json(env, request, r);
    return new Response(rosterCsv(r), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="class-roster.csv"`, ...SECURITY_HEADERS, ...cors(env, request) } });
  }

  // Passkeys and signed-in devices.
  if (path === "/v1/passkeys") {
    if (method === "GET") return json(env, request, await listPasskeys(env, user));
    if (method === "POST") return json(env, request, await registerVerify(env, request, user, await readJson(request)));
  }
  if (path === "/v1/passkeys/options" && method === "POST") return json(env, request, await registerOptions(env, request, user));
  if ((m = path.match(/^\/v1\/passkeys\/([A-Za-z0-9_-]{16,1024})$/)) && method === "DELETE") return json(env, request, await deletePasskey(env, request, user, m[1]));
  if (path === "/v1/sessions" && method === "GET") return json(env, request, await listSessions(env, user));
  if (path === "/v1/sessions/others" && method === "DELETE") return json(env, request, await endOtherSessions(env, request, user));
  if ((m = path.match(/^\/v1\/sessions\/([0-9a-f]{16})$/)) && method === "DELETE") return json(env, request, await endSession(env, request, user, m[1]));

  if (path === "/v1/profile") {
    if (method === "GET") return json(env, request, await getProfile(env, user));
    if (method === "PUT") return json(env, request, await updateProfile(env, request, user, await readJson(request)));
  }
  if (path === "/v1/account/sms" && method === "POST") return json(env, request, await startAddPhone(env, request, user, await readJson(request)));
  if (path === "/v1/account/sms/confirm" && method === "POST") return json(env, request, await confirmPhone(env, request, user, await readJson(request)));
  if (path === "/v1/account/sms" && method === "DELETE") return json(env, request, await removePhone(env, request, user));
  if (path === "/v1/account/password" && method === "POST") return json(env, request, await setPassword(env, request, user, await readJson(request)));
  if (path === "/v1/account/password" && method === "DELETE") return json(env, request, await removePassword(env, request, user));
  if ((m = path.match(/^\/v1\/identities\/([a-z]{3,12})$/)) && method === "DELETE") return json(env, request, await unlinkIdentity(env, request, user, m[1]));

  if (path === "/v1/account/export" && method === "GET") return json(env, request, await exportAccount(env, user), 200, { "Content-Disposition": 'attachment; filename="cyber-cert-study-account.json"' });
  if (path === "/v1/account" && method === "DELETE") {
    const r = await deleteAccount(env, request, user, await readJson(request));
    return json(env, request, r, 200, { "Set-Cookie": clearCookie() });
  }

  throw notFound();
}
