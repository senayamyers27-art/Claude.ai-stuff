/* Sign-in with emailed links (or, in the iOS and Android apps, the code in the same email), and sessions: a cookie
   on the website, a bearer token in the apps. Only SHA-256 hashes of link tokens, codes and session tokens are stored. */
import { now, randomHex, newId, sha256Hex, normalizeEmail, parseCookies, clientIp, bad, unauthorized, HttpError, safeEqual } from "./util.js";
import { audit, rateLimit, securityLog } from "./audit.js";
import { sendEmail } from "./email.js";

export const SESSION_COOKIE = "__Host-cs_session";
const LINK_TTL = 15 * 60 * 1000;
const SESSION_TTL = 30 * 24 * 60 * 60 * 1000;  // sliding: extended while in use
const SESSION_MAX_AGE = 90 * 24 * 60 * 60 * 1000; // absolute: sign in again after 90 days regardless
const MAX_SESSIONS = 10;                           // per user; signing in on an 11th device ends the oldest session
const TURNSTILE_VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const CODE_ATTEMPTS = 5;                           // wrong guesses before an app sign-in code stops working

// The iOS and Android apps (Capacitor) load the bundled site from these origins. They can't use the site's cookie,
// so they sign in with the emailed code and send the session as a bearer token.
export const APP_ORIGINS = ["capacitor://localhost", "https://localhost"];
// DEV_APP_ORIGIN (development only) lets the app test (tools/app-e2e.js) stand in for an app from a local address.
export const isAppOrigin = (env, origin) => !!origin && (APP_ORIGINS.includes(origin) || (env.APP_ENV === "development" && !!env.DEV_APP_ORIGIN && origin === env.DEV_APP_ORIGIN));
export const isAppRequest = (env, request) => isAppOrigin(env, request.headers.get("origin"));
// Codes are 8 characters from an alphabet without look-alikes (no 0/O, 1/I/L): about 40 bits, shown as ABCD-EFGH.
const CODE_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
function newCode() {
  const b = crypto.getRandomValues(new Uint8Array(8));
  return [...b].map(x => CODE_ALPHABET[x % CODE_ALPHABET.length]).join("");
}
const normCode = raw => String(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
const codeHash = (email, code) => sha256Hex(`app-code:${email}:${code}`);

// Optional Cloudflare Turnstile challenge on sign-in requests (set the TURNSTILE_SECRET_KEY secret and
// turnstileSiteKey in site.config.json). Without the secret, sign-in relies on the rate limits alone.
async function checkTurnstile(env, request, token) {
  if (!env.TURNSTILE_SECRET_KEY) return;
  if (typeof token !== "string" || !token || token.length > 2048) { await securityLog(request, "turnstile_missing"); throw bad("challenge_required", "Complete the check that you're not a bot, then try again."); }
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET_KEY);
  form.append("response", token);
  const ip = request.headers.get("cf-connecting-ip");
  if (ip) form.append("remoteip", ip);
  let r = {};
  try { r = await (await fetch(TURNSTILE_VERIFY, { method: "POST", body: form })).json(); } catch (e) { r = { success: false, "error-codes": ["verify_unreachable"] }; }
  const host = new URL(env.SITE_ORIGIN).hostname;
  if (!r.success || (r.hostname && r.hostname !== host)) {
    await securityLog(request, "turnstile_failed", { codes: (r["error-codes"] || []).slice(0, 3) });
    throw bad("challenge_failed", "The check that you're not a bot didn't pass. Try again.");
  }
}

export async function requestMagicLink(env, request, body) {
  const email = normalizeEmail(body.email);
  // The apps can't show the Turnstile widget (it only runs on the site's own domain), so an app request skips it and
  // gets tighter limits instead. Anyone can send an app Origin header, so the limits are what protect this.
  const app = isAppRequest(env, request) && body.app === true;
  if (!app) await checkTurnstile(env, request, body.turnstile);
  await rateLimit(env, "magic:ip:" + clientIp(request), app ? 5 : 10, 60 * 60 * 1000);
  await rateLimit(env, "magic:email:" + email, app ? 3 : 5, 60 * 60 * 1000);
  if (app) await rateLimit(env, "magic:app:d", Number(env.APP_SIGNIN_DAILY_LIMIT) || 2000, 24 * 60 * 60 * 1000);
  const token = randomHex(32), code = app ? newCode() : null;
  const t = now();
  await env.DB.prepare("INSERT INTO magic_links (token_hash, email, created_at, expires_at, code_hash) VALUES (?, ?, ?, ?, ?)")
    .bind(await sha256Hex(token), email, t, t + LINK_TTL, code ? await codeHash(email, code) : null).run();
  const link = `${env.SITE_ORIGIN}/?signin=${token}#account`;
  const shown = code ? `${code.slice(0, 4)}-${code.slice(4)}` : "";
  const sent = await sendEmail(env, code ? {
    to: email,
    subject: `Your StudyToCert sign-in code: ${shown}`,
    text: `Your StudyToCert sign-in code is:\n\n${shown}\n\nType it in the app. It works once and expires in 15 minutes.\n\nOn a computer instead? Open this link to sign in on the website:\n${link}\n\nIf you didn't ask for this, ignore this email.`,
    html: `<p>Your StudyToCert sign-in code is:</p><p style="font-size:24px;font-weight:700;letter-spacing:2px">${shown}</p><p>Type it in the app. It works once and expires in 15 minutes.</p><p>On a computer instead? <a href="${link}">Sign in on the website</a>.</p><p>If you didn't ask for this, ignore this email.</p>`
  } : {
    to: email,
    subject: "Your StudyToCert sign-in link",
    text: `Sign in to StudyToCert:\n\n${link}\n\nThis link works once and expires in 15 minutes. If you didn't ask for it, ignore this email.`,
    html: `<p>Sign in to StudyToCert:</p><p><a href="${link}">Sign in</a></p><p>This link works once and expires in 15 minutes. If you didn't ask for it, ignore this email.</p>`
  });
  // Same response whether or not the address has an account, so emails can't be enumerated.
  const res = { ok: true, message: code ? "Check your email for a sign-in code." : "Check your email for a sign-in link." };
  if (sent.devLink) { res.devLink = link; if (code) res.devCode = shown; } // development only: no email provider configured
  return res;
}

export async function verifyMagicLink(env, request, body) {
  const token = String(body.token || "");
  if (!/^[0-9a-f]{64}$/.test(token)) throw bad("invalid_link", "That sign-in link isn't valid.");
  await rateLimit(env, "verify:ip:" + clientIp(request), 30, 60 * 60 * 1000);
  const hash = await sha256Hex(token);
  const t = now();
  // Mark used and read in one step, so a link can't be redeemed twice in a race.
  const upd = await env.DB.prepare("UPDATE magic_links SET used_at = ? WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?").bind(t, hash, t).run();
  if (!upd.meta || upd.meta.changes !== 1) { await securityLog(request, "signin_link_rejected"); throw new HttpError(400, "invalid_link", "That sign-in link has expired or was already used. Request a new one."); }
  const { email } = await env.DB.prepare("SELECT email FROM magic_links WHERE token_hash = ?").bind(hash).first();
  const user = await userForEmail(env, request, email, t);
  return { user, cookie: await createSession(env, request, user, "email") };
}

// App sign-in: the email address and the code from the email. Returns the user and a session token for the app to
// send as "Authorization: Bearer". Only from the apps' origins.
export async function verifyCode(env, request, body) {
  if (!isAppRequest(env, request)) throw new HttpError(403, "bad_origin", "Sign-in codes are for the StudyToCert app.");
  const email = normalizeEmail(body.email), code = normCode(body.code);
  if (!/^[A-Z0-9]{8}$/.test(code)) throw bad("invalid_code", "Enter the 8-character code from the email.");
  await rateLimit(env, "code:ip:" + clientIp(request), 30, 60 * 60 * 1000);
  await rateLimit(env, "code:email:" + email, 10, 60 * 60 * 1000);
  const t = now();
  // App Store and Google Play reviewers sign in to one review account with a fixed code (the APP_REVIEW_EMAIL and
  // APP_REVIEW_CODE secrets, given to the stores in the review notes). Unset, there is no such account.
  const review = normCode(env.APP_REVIEW_CODE);
  if (env.APP_REVIEW_EMAIL && /^[A-Z0-9]{8}$/.test(review) && email === normalizeEmail(env.APP_REVIEW_EMAIL)) {
    if (!safeEqual(code, review)) throw await (async () => { await securityLog(request, "signin_code_rejected"); return new HttpError(400, "invalid_code", "That code is wrong or has expired. Check the newest email, or request a new code."); })();
    const user = await userForEmail(env, request, email, t);
    await audit(env, request, { actor: user.id, action: "session.review" });
    return { user, token: await createSessionToken(env, request, user, "app-review") };
  }
  const row = await env.DB.prepare("SELECT token_hash, code_hash, code_attempts FROM magic_links WHERE email = ? AND code_hash IS NOT NULL AND used_at IS NULL AND expires_at > ? ORDER BY created_at DESC LIMIT 1").bind(email, t).first();
  const wrong = async () => { await securityLog(request, "signin_code_rejected"); return new HttpError(400, "invalid_code", "That code is wrong or has expired. Check the newest email, or request a new code."); };
  if (!row || row.code_attempts >= CODE_ATTEMPTS) throw await wrong();
  if (!safeEqual(row.code_hash, await codeHash(email, code))) {
    await env.DB.prepare("UPDATE magic_links SET code_attempts = code_attempts + 1 WHERE token_hash = ?").bind(row.token_hash).run();
    throw await wrong();
  }
  const upd = await env.DB.prepare("UPDATE magic_links SET used_at = ? WHERE token_hash = ? AND used_at IS NULL AND code_attempts < ?").bind(t, row.token_hash, CODE_ATTEMPTS).run();
  if (!upd.meta || upd.meta.changes !== 1) throw await wrong();
  const user = await userForEmail(env, request, email, t);
  return { user, token: await createSessionToken(env, request, user, "app") };
}

// The account for an address that was just proven by an email (link or code), created if it's new.
async function userForEmail(env, request, email, t) {
  let user = await env.DB.prepare("SELECT id, email, email_verified FROM users WHERE email = ?").bind(email).first();
  if (user && !user.email_verified) await claimEmail(env, request, user.id);
  if (!user) {
    user = { id: newId("usr"), email };
    await env.DB.prepare("INSERT INTO users (id, email, created_at) VALUES (?, ?, ?)").bind(user.id, email, t).run();
    await audit(env, request, { actor: user.id, action: "user.created" });
  }
  return user;
}

// The account was created from a provider that didn't confirm its address, so whoever made it may not own it.
// Called when the owner proves the address (an emailed link, or a provider that verified it): removes the linked
// sign-ins, passkeys and sessions that came before, then marks the address verified.
export async function claimEmail(env, request, userId) {
  for (const sql of ["DELETE FROM identities WHERE user_id = ?", "DELETE FROM passkeys WHERE user_id = ?", "DELETE FROM sessions WHERE user_id = ?", "UPDATE users SET email_verified = 1 WHERE id = ?"])
    await env.DB.prepare(sql).bind(userId).run();
  await audit(env, request, { actor: userId, action: "email.verified" });
}

// __Host- prefix: Secure, Path=/ and no Domain, so no subdomain can set or read it. SameSite=Strict: the API
// is on a subdomain of the site (same site), so the site's own requests carry it and no other site's do.
// A new session for this user (after an email link or a passkey); returns the Set-Cookie value.
export async function createSession(env, request, user, method) {
  return sessionCookie(await createSessionToken(env, request, user, method), SESSION_TTL);
}
// A new session; returns the raw token (the website puts it in a cookie, the apps keep it and send it as a bearer token).
export async function createSessionToken(env, request, user, method) {
  const t = now();
  const session = randomHex(32);
  await env.DB.prepare("INSERT INTO sessions (token_hash, user_id, created_at, expires_at, user_agent) VALUES (?, ?, ?, ?, ?)")
    .bind(await sha256Hex(session), user.id, t, t + SESSION_TTL, (request.headers.get("user-agent") || "").slice(0, 200)).run();
  // Keep only the newest sessions for this user.
  await env.DB.prepare("DELETE FROM sessions WHERE user_id = ? AND token_hash NOT IN (SELECT token_hash FROM sessions WHERE user_id = ? ORDER BY created_at DESC, rowid DESC LIMIT ?)")
    .bind(user.id, user.id, MAX_SESSIONS).run();
  await audit(env, request, { actor: user.id, action: "session.created", target: method });
  return session;
}

export function sessionCookie(value, ttlMs) {
  return `${SESSION_COOKIE}=${value}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=${Math.floor(ttlMs / 1000)}`;
}
export const clearCookie = () => `${SESSION_COOKIE}=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0`;

// Returns the signed-in user or null. Extends the session when it's past half its life.
// Session cookies to re-send with the response, set by currentUser when it extends a session.
export const refreshedCookies = new WeakMap();
export async function currentUser(env, request) {
  const bearer = /^Bearer ([0-9a-f]{64})$/.exec(request.headers.get("authorization") || "");
  const token = bearer ? bearer[1] : parseCookies(request)[SESSION_COOKIE];
  if (!token || !/^[0-9a-f]{64}$/.test(token)) return null;
  const hash = await sha256Hex(token);
  const t = now();
  const row = await env.DB.prepare(
    "SELECT s.user_id, s.created_at, s.expires_at, u.email FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ?"
  ).bind(hash).first();
  if (!row || row.expires_at <= t) return null;
  if (t - row.created_at > SESSION_MAX_AGE) {
    await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(hash).run();
    return null;
  }
  let refresh = null;
  if (row.expires_at - t < SESSION_TTL / 2) {
    const exp = Math.min(t + SESSION_TTL, row.created_at + SESSION_MAX_AGE);
    await env.DB.prepare("UPDATE sessions SET expires_at = ? WHERE token_hash = ?").bind(exp, hash).run();
    // Send the cookie again with the new lifetime, or the browser would still drop it at the old expiry.
    if (!bearer) { refresh = sessionCookie(token, exp - t); refreshedCookies.set(request, refresh); }
  }
  return { id: row.user_id, email: row.email, sessionHash: hash, refresh };
}

export async function requireUser(env, request) {
  const u = await currentUser(env, request);
  if (!u) throw unauthorized();
  return u;
}

export async function logout(env, request, user) {
  await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(user.sessionHash).run();
  await audit(env, request, { actor: user.id, action: "session.ended" });
}
