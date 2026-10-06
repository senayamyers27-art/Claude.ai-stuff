/* The welcome emails: three short study emails in a new account's first week (day 1, day 3 and day 7), sent by the
   daily cron (scheduled() in index.js). Only to confirmed addresses that haven't switched study tips off. Every email
   has an unsubscribe link and the one-click List-Unsubscribe header; both are signed, so no sign-in is needed.
   At most WELCOME_PER_RUN (default 60) a day, which leaves room in the email plan for sign-in emails. */
import { now, hmacSha256Hex, safeEqual, HttpError } from "./util.js";
import { sendEmail } from "./email.js";
import CERTS from "./cert-meta.js";

const DAY = 24 * 60 * 60 * 1000;
// [days after sign-up, step]. Someone who signs up late in the day gets each email a little after that.
const STEPS = [[1, 1], [3, 2], [7, 3]];

const unsubKey = env => env.IP_HASH_KEY || (env.APP_ENV === "development" ? "dev-unsubscribe-key" : "");
export const unsubToken = async (env, userId) => (await hmacSha256Hex(unsubKey(env), "unsubscribe:" + userId)).slice(0, 32);
const apiOrigin = env => env.API_ORIGIN || "";
async function unsubLink(env, userId) {
  return `${apiOrigin(env)}/v1/email/unsubscribe?u=${encodeURIComponent(userId)}&t=${await unsubToken(env, userId)}`;
}

const escHtml = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// The three emails. Plain study advice; the links go to the parts of the site that help most that week.
export function welcomeEmail(step, { site, name, goal }) {
  const hi = name ? `Hi ${name},` : "Hi,";
  const cert = goal && CERTS[goal] ? { id: goal, name: CERTS[goal].name } : null;
  const plan = cert ? `${site}/${cert.id}/` : `${site}/#certifications`;
  if (step === 1) return {
    subject: cert ? `Your ${cert.name} study plan is ready` : "Your study plan is one click away",
    lines: [hi,
      cert ? `Your week-by-week ${cert.name} plan is ready: ${plan}` : `Pick the certification you're working toward and you'll get a week-by-week plan: ${plan}`,
      "Three things that make the first week count:",
      "1. Take the placement test (Practice tab). It shows which domains you already know, so you spend time where it matters.",
      "2. Read one lesson a day and answer its check questions out loud before you open the answers. Recalling beats rereading.",
      "3. Set a weekly goal in Settings. Small and steady wins: 30 minutes a day adds up to about 15 hours a month.",
      "Good luck with your studies."]
  };
  if (step === 2) return {
    subject: "A 10-minute habit that helps you remember",
    lines: [hi,
      "Most of what you read is forgotten within days unless you come back to it. Spaced review fixes that.",
      `Try the 5-minute daily review: it mixes questions from everything you've studied, weighted toward what you missed. ${site}/#review`,
      "Flashcards work the same way: flip, answer from memory, and mark the ones you missed so they come back sooner.",
      "Tip: add the study reminders to your calendar (Progress tab) so the habit doesn't depend on remembering.",
      "Keep going."]
  };
  return {
    subject: "One week in: time for a checkpoint",
    lines: [hi,
      "You've had your plan for a week. A short test now shows what's sticking and what needs another pass.",
      `Open your plan and take the checkpoint test for the domain you've been studying: ${plan}`,
      "After it, the weak-spot plan picks the lessons, flashcards and a lab for the questions you missed.",
      "Hands-on labs are the fastest way to make exam topics real. Each one has step-by-step guides and checks.",
      `Not sure which certification comes next for your career? Ask the career and certification advisor: ${site}/#careers`,
      "You've got this."]
  };
}

function render(mail, unsub) {
  const text = mail.lines.join("\n\n") + `\n\nStudyToCert\n\nYou're getting this because you created a StudyToCert account. Stop these study emails: ${unsub}`;
  const link = s => escHtml(s).replace(/(https:\/\/[^\s<]+?)([.,)]?)(?=\s|$)/g, '<a href="$1">$1</a>$2');
  const html = mail.lines.map(l => `<p>${link(l)}</p>`).join("") + `<p>StudyToCert</p><p style="color:#5b6472;font-size:12px">You're getting this because you created a StudyToCert account. <a href="${escHtml(unsub)}">Stop these study emails</a>.</p>`;
  return { text, html };
}

// The daily run: sends each due email once, oldest accounts first.
export async function sendWelcomeEmails(env, t = now()) {
  if (!env.EMAIL_API_KEY && env.APP_ENV !== "development") return { sent: 0, skipped: "email_not_configured" };
  if (!unsubKey(env) || !apiOrigin(env)) return { sent: 0, skipped: "no_unsubscribe_link" };
  const limit = Number(env.WELCOME_PER_RUN) || 60;
  let sent = 0, failed = 0;
  for (const [days, step] of STEPS) {
    if (sent >= limit) break;
    const rows = (await env.DB.prepare(`SELECT id, email, display_name, goal_cert FROM users
      WHERE welcome_step = ? AND email_tips = 1 AND email_verified = 1 AND created_at <= ? AND created_at > ?
      ORDER BY created_at LIMIT ?`).bind(step - 1, t - days * DAY, t - (days + 7) * DAY, limit - sent).all()).results || [];
    for (const u of rows) {
      const unsub = await unsubLink(env, u.id);
      const mail = welcomeEmail(step, { site: env.SITE_ORIGIN, name: (u.display_name || "").split(/\s+/)[0], goal: u.goal_cert });
      // Marked first, so a failure never sends the same email twice.
      await env.DB.prepare("UPDATE users SET welcome_step = ? WHERE id = ?").bind(step, u.id).run();
      try {
        await sendEmail(env, { to: u.email, subject: mail.subject, ...render(mail, unsub), headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } });
        sent++;
      } catch (e) { failed++; }
    }
  }
  // Accounts that missed an email by more than a week (the series started late, or the daily cap ran out) skip it.
  for (const [days, step] of STEPS)
    await env.DB.prepare("UPDATE users SET welcome_step = ? WHERE welcome_step = ? AND created_at <= ?").bind(step, step - 1, t - (days + 7) * DAY).run();
  console.log(JSON.stringify({ type: "welcome", sent, failed }));
  return { sent, failed };
}

// GET shows a confirm button (so link checkers that open every link don't unsubscribe anyone); POST, from that
// button or a mail app's one-click unsubscribe, turns the emails off. Signed with the account id, no sign-in needed.
const PAGE = (title, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head><body><h1>${title}</h1>${body}</body></html>`;
export async function unsubscribe(env, request, url) {
  const u = url.searchParams.get("u") || "", tk = url.searchParams.get("t") || "";
  if (!/^usr_[0-9a-f]{24}$/.test(u) || !unsubKey(env) || !safeEqual(tk, await unsubToken(env, u))) throw new HttpError(400, "bad_link", "This unsubscribe link isn't valid.");
  if (request.method === "GET") return {
    html: PAGE("Stop study emails?", `<p>You'll stop getting StudyToCert study emails: tips, reminders, the exam countdown and news. Sign-in links and account notices still come when you ask for them.</p><form method="post" action="?u=${encodeURIComponent(u)}&amp;t=${encodeURIComponent(tk)}"><button type="submit">Stop study emails</button></form><p><a href="${escHtml(env.SITE_ORIGIN)}/">Back to StudyToCert</a></p>`)
  };
  await env.DB.prepare("UPDATE users SET email_tips = 0, remind = 'off', countdown = 0, news = 0 WHERE id = ?").bind(u).run();
  return { html: PAGE("You're unsubscribed", `<p>You won't get StudyToCert study emails any more: no tips, reminders, exam countdown or news. Sign-in links and account notices still come when you ask for them. You can turn emails back on from your profile.</p><p><a href="${escHtml(env.SITE_ORIGIN)}/">Back to StudyToCert</a></p>`) };
}
