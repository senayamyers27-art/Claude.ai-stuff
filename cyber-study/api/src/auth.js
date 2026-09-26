/* Sign-in with emailed links, and cookie sessions.
   Only SHA-256 hashes of link tokens and session tokens are stored. */
import { now, randomHex, newId, sha256Hex, normalizeEmail, parseCookies, clientIp, bad, unauthorized, HttpError } from "./util.js";
import { audit, rateLimit, securityLog } from "./audit.js";
import { sendEmail } from "./email.js";

export const SESSION_COOKIE = "__Host-cs_session";
const LINK_TTL = 15 * 60 * 1000;
const SESSION_TTL = 30 * 24 * 60 * 60 * 1000;  // sliding: extended while in use
const SESSION_MAX_AGE = 90 * 24 * 60 * 60 * 1000; // absolute: sign in again after 90 days regardless
const MAX_SESSIONS = 10;                           // per user; signing in on an 11th device ends the oldest session
const TURNSTILE_VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

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
  await checkTurnstile(env, request, body.turnstile);
  await rateLimit(env, "magic:ip:" + clientIp(request), 10, 60 * 60 * 1000);
  await rateLimit(env, "magic:email:" + email, 5, 60 * 60 * 1000);
  const token = randomHex(32);
  const t = now();
  await env.DB.prepare("INSERT INTO magic_links (token_hash, email, created_at, expires_at) VALUES (?, ?, ?, ?)")
    .bind(await sha256Hex(token), email, t, t + LINK_TTL).run();
  const link = `${env.SITE_ORIGIN}/?signin=${token}#account`;
  const sent = await sendEmail(env, {
    to: email,
    subject: "Your StudyToCert sign-in link",
    text: `Sign in to StudyToCert:\n\n${link}\n\nThis link works once and expires in 15 minutes. If you didn't ask for it, ignore this email.`,
    html: `<p>Sign in to StudyToCert:</p><p><a href="${link}">Sign in</a></p><p>This link works once and expires in 15 minutes. If you didn't ask for it, ignore this email.</p>`
  });
  // Same response whether or not the address has an account, so emails can't be enumerated.
  const res = { ok: true, message: "Check your email for a sign-in link." };
  if (sent.devLink) res.devLink = link; // development only: no email provider configured
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

  let user = await env.DB.prepare("SELECT id, email FROM users WHERE email = ?").bind(email).first();
  if (!user) {
    user = { id: newId("usr"), email };
    await env.DB.prepare("INSERT INTO users (id, email, created_at) VALUES (?, ?, ?)").bind(user.id, email, t).run();
    await audit(env, request, { actor: user.id, action: "user.created" });
  }
  const session = randomHex(32);
  await env.DB.prepare("INSERT INTO sessions (token_hash, user_id, created_at, expires_at, user_agent) VALUES (?, ?, ?, ?, ?)")
    .bind(await sha256Hex(session), user.id, t, t + SESSION_TTL, (request.headers.get("user-agent") || "").slice(0, 200)).run();
  // Keep only the newest sessions for this user.
  await env.DB.prepare("DELETE FROM sessions WHERE user_id = ? AND token_hash NOT IN (SELECT token_hash FROM sessions WHERE user_id = ? ORDER BY created_at DESC, rowid DESC LIMIT ?)")
    .bind(user.id, user.id, MAX_SESSIONS).run();
  await audit(env, request, { actor: user.id, action: "session.created" });
  return { user, cookie: sessionCookie(session, SESSION_TTL) };
}

// __Host- prefix: Secure, Path=/ and no Domain, so no subdomain can set or read it. SameSite=Strict: the API
// is on a subdomain of the site (same site), so the site's own requests carry it and no other site's do.
export function sessionCookie(value, ttlMs) {
  return `${SESSION_COOKIE}=${value}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=${Math.floor(ttlMs / 1000)}`;
}
export const clearCookie = () => `${SESSION_COOKIE}=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0`;

// Returns the signed-in user or null. Extends the session when it's past half its life.
export async function currentUser(env, request) {
  const token = parseCookies(request)[SESSION_COOKIE];
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
  if (row.expires_at - t < SESSION_TTL / 2) {
    await env.DB.prepare("UPDATE sessions SET expires_at = ? WHERE token_hash = ?").bind(Math.min(t + SESSION_TTL, row.created_at + SESSION_MAX_AGE), hash).run();
  }
  return { id: row.user_id, email: row.email, sessionHash: hash };
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
