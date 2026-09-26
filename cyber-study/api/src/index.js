/* Cyber Cert Study API (Cloudflare Worker).
   See ../docs/BACKEND_DESIGN.md. The static site works without this; it only calls the API
   when someone signs in. */
import { HttpError, readJson, notFound } from "./util.js";
import { requestMagicLink, verifyMagicLink, requireUser, currentUser, logout, clearCookie } from "./auth.js";
import { listDocs, putDoc, MAX_DOC_BYTES } from "./progress.js";
import { entitlementsFor, createCheckout, createPortal, handleWebhook, billingEnabled } from "./billing.js";
import { createOrg, createCohort, listCohorts, createInvite, acceptInvite, cohortSummary, summaryCsv } from "./orgs.js";
import { exportAccount, deleteAccount } from "./account.js";
import { listClasses, createClass, updateClass, deleteClass, rotateCode, previewJoin, joinClass, leaveClass, removeStudent, roster, rosterCsv } from "./classes.js";

const SECURITY_HEADERS = {
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Cache-Control": "no-store",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains"
};

function cors(env, request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== env.SITE_ORIGIN) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "600",
    Vary: "Origin"
  };
}

function json(env, request, data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...SECURITY_HEADERS, ...cors(env, request), ...extra } });
}

export default {
  async fetch(request, env) {
    try {
      return await route(request, env);
    } catch (e) {
      if (e instanceof HttpError) return json(env, request, { error: e.code, message: e.message }, e.status);
      console.error("unhandled", e && e.stack ? e.stack.split("\n")[0] : e); // no request bodies or emails in logs
      return json(env, request, { error: "server_error", message: "Something went wrong. Try again." }, 500);
    }
  }
};

async function route(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const method = request.method;

  if (method === "OPTIONS") return new Response(null, { status: 204, headers: { ...SECURITY_HEADERS, ...cors(env, request) } });

  // Stripe calls this directly, authenticated by signature, not by cookie or origin.
  if (path === "/v1/stripe/webhook" && method === "POST") return json(env, request, await handleWebhook(env, request));

  // Browsers send Origin on every cross-origin and state-changing request. Anything writing
  // with a cookie must come from the site itself (defense against cross-site request forgery).
  if (method !== "GET") {
    const origin = request.headers.get("origin");
    if (origin !== env.SITE_ORIGIN) throw new HttpError(403, "bad_origin", "Requests must come from the site.");
  }

  if (path === "/v1/health" && method === "GET") return json(env, request, { ok: true, billing: billingEnabled(env) });

  if (path === "/v1/auth/magic-link" && method === "POST") return json(env, request, await requestMagicLink(env, request, await readJson(request)));
  if (path === "/v1/auth/magic-link/verify" && method === "POST") {
    const { user, cookie } = await verifyMagicLink(env, request, await readJson(request));
    return json(env, request, { user: { id: user.id, email: user.email } }, 200, { "Set-Cookie": cookie });
  }
  if (path === "/v1/auth/logout" && method === "POST") {
    const u = await currentUser(env, request);
    if (u) await logout(env, request, u);
    return json(env, request, { ok: true }, 200, { "Set-Cookie": clearCookie() });
  }

  if (path === "/v1/me" && method === "GET") {
    const u = await currentUser(env, request);
    if (!u) return json(env, request, { user: null, billing: billingEnabled(env) });
    return json(env, request, { user: { id: u.id, email: u.email }, billing: billingEnabled(env), ...(await entitlementsFor(env, u.id)) });
  }

  // Everything below needs a signed-in user.
  const user = await requireUser(env, request);

  if (path === "/v1/progress" && method === "GET") return json(env, request, await listDocs(env, user));
  let m;
  if ((m = path.match(/^\/v1\/progress\/([a-z0-9:-]{1,50})$/)) && method === "PUT") {
    const r = await putDoc(env, user, m[1], await readJson(request, MAX_DOC_BYTES + 1024));
    return json(env, request, r.data, r.status);
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

  if (path === "/v1/billing/checkout" && method === "POST") return json(env, request, await createCheckout(env, request, user, await readJson(request)));
  if (path === "/v1/billing/portal" && method === "POST") return json(env, request, await createPortal(env, request, user));

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
  if ((m = path.match(/^\/v1\/classes\/(cls_[0-9a-f]{24})\/code$/)) && method === "POST") return json(env, request, await rotateCode(env, request, user, m[1]));
  if ((m = path.match(/^\/v1\/classes\/(cls_[0-9a-f]{24})\/membership$/)) && method === "DELETE") return json(env, request, await leaveClass(env, request, user, m[1]));
  if ((m = path.match(/^\/v1\/classes\/(cls_[0-9a-f]{24})\/students\/(mem_[0-9a-f]{24})$/)) && method === "DELETE") return json(env, request, await removeStudent(env, request, user, m[1], m[2]));
  if ((m = path.match(/^\/v1\/classes\/(cls_[0-9a-f]{24})\/roster(\.csv)?$/)) && method === "GET") {
    const r = await roster(env, user, m[1]);
    if (!m[2]) return json(env, request, r);
    return new Response(rosterCsv(r), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="class-roster.csv"`, ...SECURITY_HEADERS, ...cors(env, request) } });
  }

  if (path === "/v1/account/export" && method === "GET") return json(env, request, await exportAccount(env, user), 200, { "Content-Disposition": 'attachment; filename="cyber-cert-study-account.json"' });
  if (path === "/v1/account" && method === "DELETE") {
    const r = await deleteAccount(env, request, user, await readJson(request));
    return json(env, request, r, 200, { "Set-Cookie": clearCookie() });
  }

  throw notFound();
}
