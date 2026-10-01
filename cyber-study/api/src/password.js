/* An optional password: a backup way to sign in for people who can't get to their email (a lost inbox, a blocked
   work address). Email links, Google and passkeys stay the main ways in. Stored only as a salted PBKDF2-SHA256
   hash (100,000 rounds, the most Workers allow); the password itself is never stored or logged. */
import { bad, now, normalizeEmail, clientIp, safeEqual, HttpError } from "./util.js";
import { audit, rateLimit, securityLog } from "./audit.js";
import { sendEmail } from "./email.js";

const ROUNDS = 100000;
const MIN = 10, MAX = 128;
// A few of the most common passwords and patterns; a longer list isn't worth shipping in the Worker, and the
// minimum length already rules out most of the rest.
const COMMON = ["password", "1234567890", "qwertyuiop", "letmein", "iloveyou", "studytocert", "welcome1", "passw0rd", "abcdefghij", "11111111", "000000000"];

const b64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));
const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));

async function derive(password, salt, rounds) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  return crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: rounds }, key, 256);
}
export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2$${ROUNDS}$${b64(salt)}$${b64(await derive(password, salt, ROUNDS))}`;
}
export async function checkPassword(password, stored) {
  const [kind, rounds, salt, hash] = String(stored || "").split("$");
  if (kind !== "pbkdf2" || !hash) return false;
  return safeEqual(b64(await derive(password, unb64(salt), Number(rounds))), hash);
}
// Hashed against when there's no account or no password, so a wrong email takes as long as a wrong password.
const DUMMY = "pbkdf2$100000$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

export function passwordProblem(password, email) {
  const p = String(password || "");
  if (p.length < MIN) return `Use at least ${MIN} characters.`;
  if (p.length > MAX) return `Use at most ${MAX} characters.`;
  const low = p.toLowerCase();
  if (new Set(p).size < 4 || COMMON.some(c => low.includes(c))) return "That password is too easy to guess. Try a few unrelated words.";
  if (email && low.includes(String(email).split("@")[0].toLowerCase()) && String(email).split("@")[0].length >= 4) return "Don't use your email address in your password.";
  return "";
}

// POST /v1/account/password { password, current? }: set or change it (signed in). Changing needs the current one.
export async function setPassword(env, request, user, body) {
  const row = await env.DB.prepare("SELECT email, password_hash FROM users WHERE id = ?").bind(user.id).first();
  if (row.password_hash) {
    await rateLimit(env, "pwchange:" + user.id, 10, 60 * 60 * 1000);
    if (!(await checkPassword(String(body.current || ""), row.password_hash))) throw bad("wrong_password", "Your current password isn't right.");
  }
  const problem = passwordProblem(body.password, row.email);
  if (problem) throw bad("weak_password", problem);
  await env.DB.prepare("UPDATE users SET password_hash = ?, password_set_at = ? WHERE id = ?").bind(await hashPassword(String(body.password)), now(), user.id).run();
  await audit(env, request, { actor: user.id, action: row.password_hash ? "password.changed" : "password.set" });
  // Tell the owner, in case it wasn't them.
  await sendEmail(env, {
    to: row.email,
    subject: row.password_hash ? "Your StudyToCert password was changed" : "A password was added to your StudyToCert account",
    text: `A password ${row.password_hash ? "was changed" : "was added"} on your StudyToCert account. You can now sign in with your email address and that password if you can't get to your email.\n\nIf this wasn't you, sign in with an email link and remove the password on your Account page, then sign out of other devices.`,
    html: `<p>A password ${row.password_hash ? "was changed" : "was added"} on your StudyToCert account. You can now sign in with your email address and that password if you can't get to your email.</p><p>If this wasn't you, sign in with an email link and remove the password on your Account page, then sign out of other devices.</p>`
  }).catch(() => {});
  return { password: true };
}

// DELETE /v1/account/password: remove it (signed in).
export async function removePassword(env, request, user) {
  await env.DB.prepare("UPDATE users SET password_hash = NULL, password_set_at = NULL WHERE id = ?").bind(user.id).run();
  await audit(env, request, { actor: user.id, action: "password.removed" });
  return { password: false };
}

// POST /v1/auth/password { email, password }: sign in. The same answer for an unknown email, an account with no
// password and a wrong password, so it doesn't reveal which addresses have accounts. Tight limits per address and
// per network, on top of the slow hash.
export async function passwordSignIn(env, request, body) {
  let email;
  try { email = normalizeEmail(body.email); } catch (e) { throw bad("bad_credentials", "That email and password don't match."); }
  const password = String(body.password || "");
  if (!password || password.length > MAX) throw bad("bad_credentials", "That email and password don't match.");
  await rateLimit(env, "pw:ip:" + clientIp(request), 20, 60 * 60 * 1000);
  await rateLimit(env, "pw:email:" + email, 8, 60 * 60 * 1000);
  await rateLimit(env, "pw:email:d:" + email, 20, 24 * 60 * 60 * 1000);
  const user = await env.DB.prepare("SELECT id, email, email_verified, password_hash FROM users WHERE email = ?").bind(email).first();
  const ok = await checkPassword(password, (user && user.password_hash) || DUMMY);
  // An account made from a provider that didn't confirm the address can't use a password until the address is proven.
  if (!user || !user.password_hash || !ok || !user.email_verified) {
    await securityLog(request, "password_rejected");
    throw new HttpError(400, "bad_credentials", "That email and password don't match.");
  }
  return { id: user.id, email: user.email };
}
