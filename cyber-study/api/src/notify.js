/* Emails people choose on their profile, sent by the hourly cron (scheduled() in index.js):
   - study reminders: every day, on weekdays or once a week (Mondays), at the hour they picked in their own time zone;
   - exam countdown: a week before and the day before the exam date on their profile (on unless switched off);
   - What's new: once a month, the site's new features from the past month (off unless switched on).
   Every email carries the signed unsubscribe link (welcome.js), which turns all of them off. */
import { now } from "./util.js";
import { sendEmail } from "./email.js";
import { unsubToken } from "./welcome.js";
import CERTS from "./cert-meta.js";
import NEWS from "./news-meta.js";

export const REMIND = ["off", "daily", "weekdays", "weekly"];
const PER_RUN = 150;

// The person's local date, weekday and hour, from an IANA time zone (UTC when it's missing or unknown).
export function localParts(tz, t = now()) {
  let zone = "UTC";
  try { if (tz) { new Intl.DateTimeFormat("en-US", { timeZone: tz }); zone = tz; } } catch (e) {}
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23", weekday: "short" }).formatToParts(new Date(t)).map(x => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, hour: +p.hour % 24, weekday: p.weekday };
}
const daysBetween = (a, b) => Math.round((Date.parse(b + "T00:00:00Z") - Date.parse(a + "T00:00:00Z")) / 864e5);

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
async function send(env, u, subject, lines) {
  const unsub = `${env.API_ORIGIN}/v1/email/unsubscribe?u=${encodeURIComponent(u.id)}&t=${await unsubToken(env, u.id)}`;
  const link = s => esc(s).replace(/(https:\/\/[^\s<]+?)([.,)]?)(?=\s|$)/g, '<a href="$1">$1</a>$2');
  await sendEmail(env, {
    to: u.email, subject,
    text: lines.join("\n\n") + `\n\nStudyToCert\n\nChange these emails on your profile: ${env.SITE_ORIGIN}/#profile. Stop all study emails: ${unsub}`,
    html: lines.map(l => `<p>${link(l)}</p>`).join("") + `<p>StudyToCert</p><p style="color:#5b6472;font-size:12px">Change these emails on <a href="${esc(env.SITE_ORIGIN)}/#profile">your profile</a>, or <a href="${esc(unsub)}">stop all study emails</a>.</p>`,
    headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" }
  });
}
const certName = id => (id && CERTS[id] && CERTS[id].name) || "";
const hi = u => (u.display_name ? `Hi ${u.display_name.split(/\s+/)[0]},` : "Hi,");

export function reminderEmail(u, site, local) {
  const name = certName(u.goal_cert), plan = u.goal_cert && CERTS[u.goal_cert] ? `${site}/${u.goal_cert}/` : `${site}/#dashboard`;
  const days = u.exam_date ? daysBetween(local.date, u.exam_date) : null;
  return {
    subject: name ? `Time to study: ${name}` : "Time for today's study session",
    lines: [hi(u),
      days != null && days > 0 ? `${days} days until your exam. A short session today keeps you on track.` : "A short session today keeps your streak going.",
      `Pick up where you left off: ${plan}`,
      "Try this: read one lesson, answer its check questions out loud, then do the 5-minute daily review.",
      "See you there."]
  };
}
export function countdownEmail(u, site, days) {
  const name = certName(u.goal_cert) || "your exam", plan = u.goal_cert && CERTS[u.goal_cert] ? `${site}/${u.goal_cert}/` : `${site}/#dashboard`;
  return days === 7 ? {
    subject: `One week until ${name}`,
    lines: [hi(u), `Your exam is a week from today. Here's how to use the week:`,
      "1. Take one full practice exam under timed conditions, then read every explanation, including for questions you got right.",
      "2. Spend most of your time on your two weakest domains: the weak-spot plan after a practice exam picks the lessons and drills.",
      "3. Read the cheat sheet once a day and the exam-day guide once.",
      `Your plan: ${plan}`, "You've prepared for this."]
  } : {
    subject: `Tomorrow: ${name}`,
    lines: [hi(u), "Your exam is tomorrow.",
      "Today, review lightly: the cheat sheet and the questions you flagged. Don't start anything new.",
      "Check your appointment time, ID and the route or the online check-in rules, then get a good night's sleep.",
      "During the exam, flag hard questions and come back to them; answer every question, since a blank is always wrong.",
      `Exam-day guide: ${site}/#exam-day`, "Good luck."]
  };
}
export function newsEmail(u, site, items) {
  return {
    subject: "What's new on StudyToCert",
    lines: [hi(u), "Here's what's new this month:", ...items.map(n => `${n.title}: ${n.items.join(" ")}`), `More at ${site}/#whats-new`]
  };
}

// The hourly run.
export async function sendScheduledEmails(env, t = now()) {
  if (!env.EMAIL_API_KEY && env.APP_ENV !== "development") return { skipped: "email_not_configured" };
  if (!env.API_ORIGIN || !(env.IP_HASH_KEY || env.APP_ENV === "development")) return { skipped: "no_unsubscribe_link" };
  const site = env.SITE_ORIGIN;
  let sent = 0;
  const rows = (await env.DB.prepare(`SELECT id, email, display_name, goal_cert, exam_date, remind, remind_hour, tz, remind_sent, countdown, countdown_sent, news, news_sent
    FROM users WHERE email_verified = 1 AND (remind != 'off' OR (countdown = 1 AND exam_date IS NOT NULL) OR news = 1) LIMIT 5000`).all()).results || [];
  const monthAgo = new Date(t - 31 * 864e5).toISOString().slice(0, 10);
  const recent = NEWS.filter(n => n.date >= monthAgo);
  for (const u of rows) {
    if (sent >= PER_RUN) break;
    const local = localParts(u.tz, t);
    try {
      // Countdown, at 9 a.m. local time.
      if (u.countdown && u.exam_date && local.hour === 9) {
        const days = daysBetween(local.date, u.exam_date), tag = `${u.exam_date}:${days}`;
        if ((days === 7 || days === 1) && u.countdown_sent !== tag) {
          await env.DB.prepare("UPDATE users SET countdown_sent = ? WHERE id = ?").bind(tag, u.id).run();
          const m = countdownEmail(u, site, days); await send(env, u, m.subject, m.lines); sent++; continue;
        }
      }
      // Study reminder, at the chosen hour.
      if (u.remind !== "off" && local.hour === u.remind_hour && u.remind_sent !== local.date) {
        const day = local.weekday;
        const due = u.remind === "daily" || (u.remind === "weekdays" && !["Sat", "Sun"].includes(day)) || (u.remind === "weekly" && day === "Mon");
        if (due) {
          await env.DB.prepare("UPDATE users SET remind_sent = ? WHERE id = ?").bind(local.date, u.id).run();
          const m = reminderEmail(u, site, local); await send(env, u, m.subject, m.lines); sent++; continue;
        }
      }
      // What's new, on the 1st of the month at 10 a.m. local time, when there is something new.
      const month = local.date.slice(0, 7);
      if (u.news && recent.length && local.date.endsWith("-01") && local.hour === 10 && u.news_sent !== month) {
        await env.DB.prepare("UPDATE users SET news_sent = ? WHERE id = ?").bind(month, u.id).run();
        const m = newsEmail(u, site, recent); await send(env, u, m.subject, m.lines); sent++;
      }
    } catch (e) { /* one failed send doesn't stop the run; the row is already marked, so it isn't retried */ }
  }
  console.log(JSON.stringify({ type: "scheduled_emails", sent }));
  return { sent };
}
