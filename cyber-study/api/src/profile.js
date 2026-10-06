/* The signed-in person's profile: a display name, a short "about me", the certification they're working
   toward, study hours a week, and the sign-up details (phone, what describes them, target exam date). Private to them: no other user or page can read it. */
import { bad } from "./util.js";
import { audit } from "./audit.js";
import { enabledProviders, cleanName, PROVIDERS } from "./oauth.js";
import CERTS from "./cert-meta.js";
import { maskPhone, smsEnabled } from "./sms.js";
import { REMIND } from "./notify.js";

export async function getProfile(env, user) {
  const u = await env.DB.prepare("SELECT email, created_at, display_name, bio, goal_cert, weekly_hours, phone, role, exam_date, password_set_at, sms_phone, email_tips, remind, remind_hour, tz, countdown, news FROM users WHERE id = ?").bind(user.id).first();
  const ids = (await env.DB.prepare("SELECT provider, email, created_at, last_used_at FROM identities WHERE user_id = ? ORDER BY created_at").bind(user.id).all()).results || [];
  return {
    email: u.email, createdAt: u.created_at,
    displayName: u.display_name || "", bio: u.bio || "", goalCert: u.goal_cert || "", weeklyHours: u.weekly_hours || null,
    phone: u.phone || "", role: u.role || "", examDate: u.exam_date || "", hasPassword: !!u.password_set_at,
    smsPhone: maskPhone(u.sms_phone), sms: smsEnabled(env), emailTips: !!u.email_tips,
    remind: u.remind || "off", remindHour: u.remind_hour == null ? 18 : u.remind_hour, tz: u.tz || "", countdown: !!u.countdown, news: !!u.news,
    identities: ids.filter(i => PROVIDERS[i.provider]).map(i => ({ provider: i.provider, email: i.email, createdAt: i.created_at, lastUsedAt: i.last_used_at })),
    providers: enabledProviders(env)
  };
}

export const ROLES = { student: "Student", "career-changer": "Changing careers into IT", "it-pro": "Working in IT", teacher: "Teacher or trainer", other: "Something else" };

// Phone numbers: digits with an optional leading +, 7 to 15 digits (the international maximum). Kept for account
// recovery and support; never shown to anyone else.
export function cleanPhone(raw) {
  const s = String(raw || "").trim();
  if (!s) return null;
  if (!/^\+?[\d\s().-]{7,24}$/.test(s)) throw bad("bad_phone", "Enter a phone number with digits only, for example +1 555 123 4567.");
  const digits = s.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) throw bad("bad_phone", "Enter a phone number with digits only, for example +1 555 123 4567.");
  return (s.startsWith("+") ? "+" : "") + digits;
}

// PUT /v1/profile: only the fields that are sent change, so the sign-up details and the profile form can each send
// their own part.
export async function updateProfile(env, request, user, body) {
  const set = {};
  const has = k => Object.prototype.hasOwnProperty.call(body, k);
  if (has("displayName")) set.display_name = body.displayName == null ? null : cleanName(body.displayName);
  if (has("bio")) {
    const bio = body.bio == null ? "" : String(body.bio).replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").trim();
    if (bio.length > 280) throw bad("bio_too_long", "Keep “About me” to 280 characters.");
    set.bio = bio || null;
  }
  if (has("goalCert")) {
    const goalCert = body.goalCert ? String(body.goalCert) : null;
    if (goalCert && !Object.prototype.hasOwnProperty.call(CERTS, goalCert)) throw bad("unknown_cert", "Pick a certification from the list.");
    set.goal_cert = goalCert;
  }
  if (has("weeklyHours")) {
    const weeklyHours = body.weeklyHours === "" || body.weeklyHours == null ? null : Number(body.weeklyHours);
    if (weeklyHours !== null && (!Number.isInteger(weeklyHours) || weeklyHours < 1 || weeklyHours > 80)) throw bad("bad_hours", "Study hours a week must be a whole number from 1 to 80.");
    set.weekly_hours = weeklyHours;
  }
  if (has("phone")) set.phone = cleanPhone(body.phone);
  if (has("emailTips")) set.email_tips = body.emailTips ? 1 : 0;
  if (has("remind")) { if (!REMIND.includes(body.remind)) throw bad("bad_remind", "Choose how often to get reminders."); set.remind = body.remind; }
  if (has("remindHour")) { const h = Number(body.remindHour); if (!Number.isInteger(h) || h < 0 || h > 23) throw bad("bad_hour", "Choose a time for reminders."); set.remind_hour = h; }
  if (has("tz")) { const z = String(body.tz || ""); let ok = !z; try { if (z && z.length <= 64) { new Intl.DateTimeFormat("en-US", { timeZone: z }); ok = true; } } catch (e) {} if (!ok) throw bad("bad_tz", "Unknown time zone."); set.tz = z || null; }
  if (has("countdown")) set.countdown = body.countdown ? 1 : 0;
  if (has("news")) set.news = body.news ? 1 : 0;
  if (has("role")) {
    const role = body.role ? String(body.role) : null;
    if (role && !Object.prototype.hasOwnProperty.call(ROLES, role)) throw bad("bad_role", "Pick what describes you from the list.");
    set.role = role;
  }
  if (has("examDate")) {
    const d = body.examDate ? String(body.examDate) : null;
    if (d) {
      const t = Date.parse(d + "T00:00:00Z"), today = Date.now() - 24 * 3600e3;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || !Number.isFinite(t) || t < today || t > today + 3 * 366 * 24 * 3600e3) throw bad("bad_exam_date", "Pick an exam date between today and three years from now.");
    }
    set.exam_date = d;
  }
  const cols = Object.keys(set);
  if (cols.length) {
    await env.DB.prepare(`UPDATE users SET ${cols.map(c => c + " = ?").join(", ")} WHERE id = ?`).bind(...cols.map(c => set[c]), user.id).run();
    await audit(env, request, { actor: user.id, action: "profile.updated" });
  }
  return getProfile(env, user);
}
