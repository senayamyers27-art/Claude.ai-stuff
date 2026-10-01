/* Text-message codes: a backup way to sign in for people who can't get to their email. Someone signed in adds a
   mobile number by confirming a code sent to it; after that, the login page can text a 6-digit code to that number
   (asked for by email address, so the page never reveals which numbers or addresses have accounts).

   Sent through Twilio when TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_FROM (or TWILIO_MESSAGING_SERVICE_SID)
   are set; off otherwise. Texts go only to the country codes in SMS_COUNTRIES (default "1": the US and Canada),
   with per-person, per-number, per-network and daily caps, because paid texts are a target for abuse. */
import { bad, now, newId, sha256Hex, safeEqual, normalizeEmail, clientIp, HttpError } from "./util.js";
import { audit, rateLimit, securityLog } from "./audit.js";
import { sendEmail } from "./email.js";

const HOUR = 60 * 60 * 1000, DAY = 24 * HOUR;
const TTL = 10 * 60 * 1000, MAX_TRIES = 5;

export const smsConfigured = env => !!(env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && (env.TWILIO_FROM || env.TWILIO_MESSAGING_SERVICE_SID));
// In development there's no Twilio: the code comes back in the response instead.
export const smsEnabled = env => smsConfigured(env) || env.APP_ENV === "development";

const countries = env => String(env.SMS_COUNTRIES || "1").split(",").map(s => s.trim()).filter(s => /^\d{1,3}$/.test(s));
// A mobile number in E.164 form (+15551234567). Ten digits, or 11 starting with 1, are read as US/Canada numbers.
export function e164(env, raw) {
  const s = String(raw || "").trim();
  if (!/^\+?[\d\s().-]{7,24}$/.test(s)) throw bad("bad_phone", "Enter a mobile number, for example +1 555 123 4567.");
  let d = s.replace(/\D/g, "");
  if (!s.startsWith("+")) { if (d.length === 10) d = "1" + d; else if (!(d.length === 11 && d[0] === "1")) throw bad("bad_phone", "Include your country code, for example +1 555 123 4567."); }
  if (d.length < 8 || d.length > 15) throw bad("bad_phone", "Enter a mobile number, for example +1 555 123 4567.");
  if (!countries(env).some(c => d.startsWith(c))) throw bad("sms_country", "Text-message codes work only with US and Canadian mobile numbers for now.");
  return "+" + d;
}
export const maskPhone = p => p ? "•••• " + String(p).slice(-4) : "";

function newSmsCode() {
  const max = 4294967296 - (4294967296 % 1000000);
  for (;;) { const x = crypto.getRandomValues(new Uint32Array(1))[0]; if (x < max) return String(x % 1000000).padStart(6, "0"); }
}
const hashCode = (id, code) => sha256Hex(`sms:${id}:${code}`);

async function sendSms(env, to, body) {
  if (!smsConfigured(env)) {
    if (env.APP_ENV === "development") return { dev: true };
    throw new HttpError(503, "sms_not_configured", "Text-message codes aren't set up yet.");
  }
  const form = new URLSearchParams({ To: to, Body: body });
  if (env.TWILIO_MESSAGING_SERVICE_SID) form.set("MessagingServiceSid", env.TWILIO_MESSAGING_SERVICE_SID); else form.set("From", env.TWILIO_FROM);
  const sid = env.TWILIO_ACCOUNT_SID;
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(sid)}/Messages.json`, {
    method: "POST",
    headers: { Authorization: "Basic " + btoa(`${sid}:${env.TWILIO_AUTH_TOKEN}`), "Content-Type": "application/x-www-form-urlencoded" },
    body: form
  });
  if (!res.ok) throw new HttpError(502, "sms_failed", "Couldn't send the text. Check the number and try again in a minute.");
  return { sent: true };
}

// Makes and texts a code; returns the dev code in development.
async function issue(env, userId, purpose, phone) {
  await rateLimit(env, "sms:to:" + phone, 5, HOUR);
  await rateLimit(env, "sms:global", Number(env.SMS_DAILY_LIMIT) || 300, DAY);
  const code = newSmsCode(), id = newId("smc"), t = now();
  await env.DB.prepare("DELETE FROM sms_codes WHERE user_id = ? AND purpose = ?").bind(userId, purpose).run();
  await env.DB.prepare("INSERT INTO sms_codes (id, user_id, purpose, phone, code_hash, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(id, userId, purpose, phone, await hashCode(id, code), t, t + TTL).run();
  const r = await sendSms(env, phone, `StudyToCert code: ${code}. It expires in 10 minutes. Never share it; we will never ask for it.`);
  return r.dev ? code : null;
}

// Checks a code; returns the stored row (with its phone) or throws. Each code allows MAX_TRIES guesses.
async function check(env, userId, purpose, raw) {
  const code = String(raw || "").replace(/\D/g, "");
  const wrong = () => bad("bad_code", "That code isn't right or has expired. Ask for a new one.");
  const row = await env.DB.prepare("SELECT id, phone, code_hash, attempts, expires_at FROM sms_codes WHERE user_id = ? AND purpose = ?").bind(userId, purpose).first();
  if (!row || row.expires_at < now() || row.attempts >= MAX_TRIES) throw wrong();
  await env.DB.prepare("UPDATE sms_codes SET attempts = attempts + 1 WHERE id = ?").bind(row.id).run();
  if (code.length !== 6 || !safeEqual(await hashCode(row.id, code), row.code_hash)) throw wrong();
  await env.DB.prepare("DELETE FROM sms_codes WHERE id = ?").bind(row.id).run();
  return row;
}

// POST /v1/account/sms { phone } (signed in): text a code to the number being added.
export async function startAddPhone(env, request, user, body) {
  if (!smsEnabled(env)) throw new HttpError(503, "sms_not_configured", "Text-message codes aren't set up yet.");
  const phone = e164(env, body.phone);
  await rateLimit(env, "sms:add:" + user.id, 5, HOUR);
  await rateLimit(env, "sms:add:d:" + user.id, 10, DAY);
  const dev = await issue(env, user.id, "verify", phone);
  return { sent: true, phone: maskPhone(phone), ...(dev ? { devCode: dev } : {}) };
}

// POST /v1/account/sms/confirm { code } (signed in): the number is saved once the code matches.
export async function confirmPhone(env, request, user, body) {
  const row = await check(env, user.id, "verify", body.code);
  const u = await env.DB.prepare("SELECT email FROM users WHERE id = ?").bind(user.id).first();
  await env.DB.prepare("UPDATE users SET sms_phone = ?, sms_verified_at = ? WHERE id = ?").bind(row.phone, now(), user.id).run();
  await audit(env, request, { actor: user.id, action: "sms.added" });
  // Tell the owner, in case it wasn't them.
  await sendEmail(env, {
    to: u.email,
    subject: "A phone number was added to your StudyToCert account",
    text: `The mobile number ending ${row.phone.slice(-4)} can now get text-message sign-in codes for your StudyToCert account.\n\nIf this wasn't you, sign in with an email link, remove the number on your profile, then sign out of other devices.`,
    html: `<p>The mobile number ending ${row.phone.slice(-4)} can now get text-message sign-in codes for your StudyToCert account.</p><p>If this wasn't you, sign in with an email link, remove the number on your profile, then sign out of other devices.</p>`
  }).catch(() => {});
  return { smsPhone: maskPhone(row.phone) };
}

// DELETE /v1/account/sms (signed in).
export async function removePhone(env, request, user) {
  await env.DB.prepare("UPDATE users SET sms_phone = NULL, sms_verified_at = NULL WHERE id = ?").bind(user.id).run();
  await env.DB.prepare("DELETE FROM sms_codes WHERE user_id = ?").bind(user.id).run();
  await audit(env, request, { actor: user.id, action: "sms.removed" });
  return { smsPhone: "" };
}

// POST /v1/auth/sms/start { email }: texts a code to the account's confirmed number. The same answer whether or
// not the address has an account or a number, so it can't be used to find either.
export async function startSmsSignIn(env, request, body) {
  if (!smsEnabled(env)) throw new HttpError(503, "sms_not_configured", "Text-message codes aren't set up yet.");
  let email;
  try { email = normalizeEmail(body.email); } catch (e) { throw bad("bad_email", "Enter the email address on your account."); }
  await rateLimit(env, "sms:in:ip:" + clientIp(request), 10, HOUR);
  await rateLimit(env, "sms:in:" + email, 5, HOUR);
  const u = await env.DB.prepare("SELECT id, email_verified, sms_phone FROM users WHERE email = ?").bind(email).first();
  const out = { sent: true };
  if (u && u.sms_phone && u.email_verified) {
    const dev = await issue(env, u.id, "signin", u.sms_phone);
    if (dev) out.devCode = dev;
  } else await securityLog(request, "sms_signin_no_number");
  return out;
}

// POST /v1/auth/sms/verify { email, code }: returns the user to sign in, or throws one answer for every failure.
export async function verifySmsSignIn(env, request, body) {
  const fail = () => new HttpError(400, "bad_code", "That code isn't right or has expired. Ask for a new one.");
  let email;
  try { email = normalizeEmail(body.email); } catch (e) { throw fail(); }
  await rateLimit(env, "sms:ver:ip:" + clientIp(request), 30, HOUR);
  const u = await env.DB.prepare("SELECT id, email, email_verified, sms_phone FROM users WHERE email = ?").bind(email).first();
  if (!u || !u.sms_phone || !u.email_verified) throw fail();
  const row = await check(env, u.id, "signin", body.code).catch(() => { throw fail(); });
  if (row.phone !== u.sms_phone) throw fail();
  await audit(env, request, { actor: u.id, action: "signin.sms" });
  return { id: u.id, email: u.email };
}
