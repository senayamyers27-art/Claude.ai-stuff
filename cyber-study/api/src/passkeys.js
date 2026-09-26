/* Passkeys (WebAuthn): add a passkey while signed in, then sign in with it instead of an emailed link.
   Registration uses attestation "none" (no device model is collected), so the browser's own view of the new
   credential is used: its public key (SubjectPublicKeyInfo) and authenticator data. Every sign-in is verified
   here with Web Crypto: one-time challenge, origin, relying party, user presence and verification flags,
   signature, and a signature counter that must not go backwards (a sign of a cloned authenticator). */
import { now, sha256Hex, bad, notFound, HttpError, clientIp } from "./util.js";
import { audit, rateLimit, securityLog } from "./audit.js";
import { createSession } from "./auth.js";

const CHALLENGE_TTL = 5 * 60 * 1000;
const MAX_PASSKEYS = 10;
const ALGS = { "-7": { name: "ECDSA", namedCurve: "P-256", hash: "SHA-256" }, "-257": { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" } };

const b64u = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
function fromB64(s, max = 4096) {
  if (typeof s !== "string" || !s || s.length > max || !/^[A-Za-z0-9+/_-]+={0,2}$/.test(s)) throw bad("invalid_passkey", "That passkey response isn't valid.");
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/").replace(/=+$/, "") + "===".slice((s.replace(/=+$/, "").length + 3) % 4));
  return Uint8Array.from(bin, c => c.charCodeAt(0));
}
const rpId = env => new URL(env.SITE_ORIGIN).hostname;
const sha256 = async bytes => new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

async function newChallenge(env, purpose, userId = null) {
  const bytes = crypto.getRandomValues(new Uint8Array(32)), challenge = b64u(bytes);
  await env.DB.prepare("DELETE FROM webauthn_challenges WHERE expires_at < ?").bind(now()).run();
  await env.DB.prepare("INSERT INTO webauthn_challenges (challenge_hash, user_id, purpose, expires_at) VALUES (?, ?, ?, ?)")
    .bind(await sha256Hex(challenge), userId, purpose, now() + CHALLENGE_TTL).run();
  return challenge;
}
// Checks clientDataJSON and uses up its challenge (each challenge works once).
async function checkClientData(env, request, raw, type, purpose, userId = null) {
  let cd;
  try { cd = JSON.parse(new TextDecoder().decode(raw)); } catch (e) { throw bad("invalid_passkey", "That passkey response isn't valid."); }
  if (cd.type !== type) throw bad("invalid_passkey", "That passkey response isn't valid.");
  if (cd.origin !== env.SITE_ORIGIN) { await securityLog(request, "passkey_wrong_origin"); throw bad("invalid_passkey", "That passkey was used on a different site."); }
  if (typeof cd.challenge !== "string" || cd.challenge.length > 200) throw bad("invalid_passkey", "That passkey response isn't valid.");
  const q = userId
    ? env.DB.prepare("DELETE FROM webauthn_challenges WHERE challenge_hash = ? AND purpose = ? AND user_id = ? AND expires_at > ?").bind(await sha256Hex(cd.challenge), purpose, userId, now())
    : env.DB.prepare("DELETE FROM webauthn_challenges WHERE challenge_hash = ? AND purpose = ? AND user_id IS NULL AND expires_at > ?").bind(await sha256Hex(cd.challenge), purpose, now());
  const r = await q.run();
  if (!r.meta || r.meta.changes !== 1) { await securityLog(request, "passkey_bad_challenge"); throw bad("passkey_expired", "That passkey request expired. Try again."); }
}
// Authenticator data: rpIdHash (32) | flags (1) | signCount (4) | ...
async function checkAuthData(env, ad) {
  if (ad.length < 37) throw bad("invalid_passkey", "That passkey response isn't valid.");
  if (!same(ad.slice(0, 32), await sha256(new TextEncoder().encode(rpId(env))))) throw bad("invalid_passkey", "That passkey belongs to a different site.");
  const flags = ad[32];
  if (!(flags & 0x01) || !(flags & 0x04)) throw bad("passkey_unverified", "Your device didn't confirm it's you. Unlock it with your PIN, fingerprint or face and try again.");
  return { count: ((ad[33] << 24) >>> 0) + (ad[34] << 16) + (ad[35] << 8) + ad[36] };
}
// WebAuthn ECDSA signatures are DER; Web Crypto wants the raw 64-byte r||s.
function derToRaw(der) {
  if (der[0] !== 0x30) throw new Error("not DER");
  let i = 2; if (der[1] & 0x80) i = 2 + (der[1] & 0x7f);
  const part = () => { if (der[i++] !== 0x02) throw new Error("not DER"); const len = der[i++]; let v = der.slice(i, i + len); i += len; while (v.length > 32 && v[0] === 0) v = v.slice(1); if (v.length > 32) throw new Error("bad int"); const out = new Uint8Array(32); out.set(v, 32 - v.length); return out; };
  const r = part(), s = part(), out = new Uint8Array(64); out.set(r); out.set(s, 32); return out;
}
const cleanName = (s, fallback) => String(s || "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 60) || fallback;

/* ---------- adding a passkey (signed in) ---------- */
export async function registerOptions(env, request, user) {
  await rateLimit(env, "passkey:reg:" + user.id, 20, 60 * 60 * 1000);
  const existing = (await env.DB.prepare("SELECT id, transports FROM passkeys WHERE user_id = ?").bind(user.id).all()).results || [];
  if (existing.length >= MAX_PASSKEYS) throw bad("too_many_passkeys", `You can have up to ${MAX_PASSKEYS} passkeys. Remove one first.`);
  return {
    challenge: await newChallenge(env, "register", user.id),
    rp: { id: rpId(env), name: "StudyToCert" },
    user: { id: b64u(new TextEncoder().encode(user.id)), name: user.email, displayName: user.email },
    pubKeyCredParams: [{ type: "public-key", alg: -7 }, { type: "public-key", alg: -257 }],
    authenticatorSelection: { residentKey: "required", requireResidentKey: true, userVerification: "required" },
    excludeCredentials: existing.map(p => ({ type: "public-key", id: p.id, ...(p.transports ? { transports: JSON.parse(p.transports) } : {}) })),
    attestation: "none",
    timeout: CHALLENGE_TTL
  };
}

export async function registerVerify(env, request, user, body) {
  const id = String(body.id || "");
  if (!/^[A-Za-z0-9_-]{16,1024}$/.test(id)) throw bad("invalid_passkey", "That passkey response isn't valid.");
  const alg = String(body.alg);
  if (!ALGS[alg]) throw bad("unsupported_passkey", "This passkey uses an algorithm the site doesn't support.");
  await checkClientData(env, request, fromB64(body.clientDataJSON), "webauthn.create", "register", user.id);
  await checkAuthData(env, fromB64(body.authenticatorData, 8192));
  const spki = fromB64(body.publicKey, 2048);
  try { await crypto.subtle.importKey("spki", spki, ALGS[alg], false, ["verify"]); }
  catch (e) { throw bad("invalid_passkey", "That passkey's key isn't valid."); }
  if (await env.DB.prepare("SELECT 1 AS x FROM passkeys WHERE id = ?").bind(id).first()) throw bad("passkey_exists", "That passkey is already registered.");
  const transports = Array.isArray(body.transports) ? body.transports.filter(t => /^[a-z-]{2,20}$/.test(t)).slice(0, 6) : [];
  const name = cleanName(body.name, "Passkey");
  await env.DB.prepare("INSERT INTO passkeys (id, user_id, public_key, alg, sign_count, name, transports, created_at) VALUES (?, ?, ?, ?, 0, ?, ?, ?)")
    .bind(id, user.id, btoa(String.fromCharCode(...spki)), +alg, name, transports.length ? JSON.stringify(transports) : null, now()).run();
  await audit(env, request, { actor: user.id, action: "passkey.added" });
  return { id, name };
}

/* ---------- signing in with a passkey ---------- */
export async function signinOptions(env, request) {
  await rateLimit(env, "passkey:opt:ip:" + clientIp(request), 60, 60 * 60 * 1000);
  return { challenge: await newChallenge(env, "signin"), rpId: rpId(env), userVerification: "required", timeout: CHALLENGE_TTL };
}

export async function signinVerify(env, request, body) {
  await rateLimit(env, "passkey:verify:ip:" + clientIp(request), 30, 60 * 60 * 1000);
  const id = String(body.id || "");
  if (!/^[A-Za-z0-9_-]{16,1024}$/.test(id)) throw bad("invalid_passkey", "That passkey response isn't valid.");
  const clientData = fromB64(body.clientDataJSON), ad = fromB64(body.authenticatorData, 8192), sig = fromB64(body.signature, 2048);
  await checkClientData(env, request, clientData, "webauthn.get", "signin");
  const pk = await env.DB.prepare("SELECT p.*, u.email FROM passkeys p JOIN users u ON u.id = p.user_id WHERE p.id = ?").bind(id).first();
  if (!pk) { await securityLog(request, "passkey_unknown"); throw bad("unknown_passkey", "That passkey isn't registered here. Sign in with an email link, then add it again."); }
  if (body.userHandle && body.userHandle !== b64u(new TextEncoder().encode(pk.user_id))) throw bad("invalid_passkey", "That passkey response isn't valid.");
  const { count } = await checkAuthData(env, ad);
  const params = ALGS[String(pk.alg)];
  const key = await crypto.subtle.importKey("spki", fromB64(pk.public_key), params, false, ["verify"]);
  const signed = new Uint8Array(ad.length + 32); signed.set(ad); signed.set(await sha256(clientData), ad.length);
  let ok = false;
  try { ok = await crypto.subtle.verify(params.name === "ECDSA" ? { name: "ECDSA", hash: "SHA-256" } : params.name, key, params.name === "ECDSA" ? derToRaw(sig) : sig, signed); } catch (e) { ok = false; }
  if (!ok) { await securityLog(request, "passkey_bad_signature"); throw bad("invalid_passkey", "That passkey couldn't be verified."); }
  // Counters only go up on authenticators that keep one; 0 means the device doesn't count.
  if ((count !== 0 || pk.sign_count !== 0) && count <= pk.sign_count) {
    await securityLog(request, "passkey_counter_regressed");
    await audit(env, request, { actor: pk.user_id, action: "passkey.counter_regressed", target: pk.id.slice(0, 16) });
    throw new HttpError(400, "passkey_cloned", "This passkey may have been copied, so it was refused. Sign in with an email link and remove it.");
  }
  await env.DB.prepare("UPDATE passkeys SET sign_count = ?, last_used_at = ? WHERE id = ?").bind(count, now(), pk.id).run();
  const user = { id: pk.user_id, email: pk.email };
  const cookie = await createSession(env, request, user, "passkey");
  return { user, cookie };
}

/* ---------- managing passkeys ---------- */
export async function listPasskeys(env, user) {
  const rows = (await env.DB.prepare("SELECT id, name, created_at, last_used_at FROM passkeys WHERE user_id = ? ORDER BY created_at").bind(user.id).all()).results || [];
  return { passkeys: rows.map(r => ({ id: r.id, name: r.name, createdAt: r.created_at, lastUsedAt: r.last_used_at })) };
}
export async function deletePasskey(env, request, user, id) {
  const r = await env.DB.prepare("DELETE FROM passkeys WHERE id = ? AND user_id = ?").bind(id, user.id).run();
  if (!r.meta || r.meta.changes !== 1) throw notFound("No passkey with that id.");
  await audit(env, request, { actor: user.id, action: "passkey.removed" });
  return { ok: true };
}

/* ---------- signed-in devices (sessions) ---------- */
// Sessions are shown by a short, non-secret id: the first 16 hex characters of the stored token hash.
export async function listSessions(env, user) {
  const rows = (await env.DB.prepare("SELECT token_hash, created_at, expires_at, user_agent FROM sessions WHERE user_id = ? AND expires_at > ? ORDER BY created_at DESC").bind(user.id, now()).all()).results || [];
  return { sessions: rows.map(r => ({ id: r.token_hash.slice(0, 16), createdAt: r.created_at, expiresAt: r.expires_at, device: describeAgent(r.user_agent), current: r.token_hash === user.sessionHash })) };
}
export async function endSession(env, request, user, id) {
  const r = await env.DB.prepare("DELETE FROM sessions WHERE user_id = ? AND substr(token_hash, 1, 16) = ? AND token_hash != ?").bind(user.id, id, user.sessionHash).run();
  if (!r.meta || !r.meta.changes) throw notFound("No other session with that id. To end this one, sign out.");
  await audit(env, request, { actor: user.id, action: "session.revoked" });
  return { ok: true };
}
export async function endOtherSessions(env, request, user) {
  const r = await env.DB.prepare("DELETE FROM sessions WHERE user_id = ? AND token_hash != ?").bind(user.id, user.sessionHash).run();
  await audit(env, request, { actor: user.id, action: "session.revoked_others" });
  return { ended: (r.meta && r.meta.changes) || 0 };
}
// "Chrome on Windows" from a user agent string, for the devices list. Only browser and platform names.
export function describeAgent(ua) {
  ua = String(ua || "");
  const browser = /Edg\//.test(ua) ? "Edge" : /OPR\//.test(ua) ? "Opera" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "A browser";
  const os = /iPhone|iPad|iPod/.test(ua) ? "iOS" : /Android/.test(ua) ? "Android" : /Windows/.test(ua) ? "Windows" : /Mac OS X|Macintosh/.test(ua) ? "macOS" : /CrOS/.test(ua) ? "ChromeOS" : /Linux/.test(ua) ? "Linux" : "";
  return os ? `${browser} on ${os}` : browser;
}
