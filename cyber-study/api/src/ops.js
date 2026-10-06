/* Operations emails to the site owner (the addresses in ADMIN_EMAILS), sent by the hourly cron:
   - error alert: when unexpected server errors pass ERROR_ALERT_MIN (default 5) in the last hour, at most one
     email an hour, listing the routes and error lines (never request bodies, emails or IP addresses);
   - weekly summary: Mondays at 14:00 UTC, the dashboard totals for the past week.
   Unexpected errors are recorded by recordError() from the fetch handler in index.js and kept 30 days. */
import { now } from "./util.js";
import { sendEmail } from "./email.js";
import { adminEmails, collectStats } from "./admin.js";
import CERTS from "./cert-meta.js";

const HOUR = 60 * 60 * 1000;

// '/v1/classes/cls_ab12…/assignments' -> '/v1/classes/:id/assignments', so routes group and no ids are stored.
export function routeOf(request) {
  let path = "";
  try { path = new URL(request.url).pathname; } catch (e) {}
  path = path.split("/").map(seg => /^[a-z]{2,6}_[0-9a-f]{8,}$|^[0-9a-f]{16,}$|^\d+$|^[a-km-np-z2-9]{10}$/.test(seg) ? ":id" : seg).join("/").slice(0, 120);
  return `${request.method} ${path}`;
}
export async function recordError(env, request, e) {
  const line = String((e && e.stack ? e.stack.split("\n")[0] : e) || "error").replace(/\S+@\S+/g, "[email]").slice(0, 200);
  await env.DB.prepare("INSERT INTO server_errors (at, route, message) VALUES (?, ?, ?)").bind(now(), routeOf(request), line).run();
}

const getState = async (env, key) => ((await env.DB.prepare("SELECT value FROM ops_state WHERE key = ?").bind(key).first()) || {}).value || "";
const setState = (env, key, value) => env.DB.prepare("INSERT INTO ops_state (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").bind(key, String(value)).run();

async function mail(env, subject, lines) {
  const to = adminEmails(env);
  for (const addr of to) await sendEmail(env, { to: addr, subject, text: lines.join("\n"), html: lines.map(l => `<p>${l.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]))}</p>`).join("") });
  return to.length;
}

export async function checkErrorAlert(env, t = now()) {
  const min = Number(env.ERROR_ALERT_MIN) || 5;
  const rows = (await env.DB.prepare("SELECT route, message, COUNT(*) AS n FROM server_errors WHERE at >= ? GROUP BY route, message ORDER BY n DESC LIMIT 10").bind(t - HOUR).all()).results || [];
  const total = rows.reduce((s, r) => s + r.n, 0);
  if (total < min || !adminEmails(env).length) return { total, sent: false };
  if (Number(await getState(env, "error_alert_at")) > t - HOUR) return { total, sent: false };
  await setState(env, "error_alert_at", t);
  await mail(env, `StudyToCert: ${total} server errors in the last hour`, [
    `The API had ${total} unexpected errors in the last hour (alerts start at ${min}). The most common:`,
    ...rows.map(r => `${r.n} x ${r.route}: ${r.message}`),
    `Check the Cloudflare dashboard (Workers & Pages, the API worker, Logs) and the latest "Study site API deploy" run on GitHub. If a deploy just went out, rolling back to the previous version in Cloudflare stops the errors while you look.`,
    "You'll get at most one of these an hour."
  ]);
  return { total, sent: true };
}

export function weeklyEmail(s, site) {
  const paying = s.plans.filter(p => p.status === "active").reduce((n, p) => n + p.count, 0);
  const trials = s.plans.filter(p => p.status === "trialing").reduce((n, p) => n + p.count, 0);
  const pastDue = s.plans.filter(p => p.status === "past_due").reduce((n, p) => n + p.count, 0);
  const top = s.certs.slice(0, 5).map(c => (CERTS[c.certId] && CERTS[c.certId].name) || c.certId).join(", ");
  return {
    subject: `StudyToCert weekly: ${s.users.new7} new accounts, ${s.users.active7} studied`,
    lines: [
      "Your week on StudyToCert:",
      `Accounts: ${s.users.total} in total, ${s.users.new7} new this week, ${s.users.active7} studied this week.`,
      `Plans: ${paying} paying, ${trials} in a free trial${pastDue ? `, ${pastDue} with a failing payment (check Stripe)` : ""}. ${s.canceled30} canceled in the last 30 days.`,
      top ? `Most studied (30 days): ${top}.` : "No synced study yet.",
      `Classes: ${s.classes.classes} with ${s.classes.students} students. Referral credits given: ${s.referrals.rewarded}.`,
      s.storiesPending ? `${s.storiesPending} success ${s.storiesPending === 1 ? "story is" : "stories are"} waiting for your approval.` : "",
      s.errors7 ? `Server errors this week: ${s.errors7}.` : "No server errors this week.",
      `Full dashboard: ${site}/#admin`
    ].filter(Boolean)
  };
}
export async function sendWeeklySummary(env, t = now()) {
  const d = new Date(t);
  if (d.getUTCDay() !== 1 || d.getUTCHours() !== 14 || !adminEmails(env).length) return { sent: false };
  const week = d.toISOString().slice(0, 10);
  if ((await getState(env, "weekly_sent")) === week) return { sent: false };
  await setState(env, "weekly_sent", week);
  const s = await collectStats(env, t);
  s.storiesPending = ((await env.DB.prepare("SELECT COUNT(*) AS n FROM stories WHERE status = 'pending' AND publish = 1").first()) || {}).n || 0;
  s.errors7 = ((await env.DB.prepare("SELECT COUNT(*) AS n FROM server_errors WHERE at >= ?").bind(t - 7 * 24 * HOUR).first()) || {}).n || 0;
  const m = weeklyEmail(s, env.SITE_ORIGIN);
  await mail(env, m.subject, m.lines);
  return { sent: true };
}

// The hourly run: never lets one failure stop the other.
export async function runOps(env, t = now()) {
  if (!env.EMAIL_API_KEY && env.APP_ENV !== "development") return { skipped: "email_not_configured" };
  const out = {};
  try { out.alert = await checkErrorAlert(env, t); } catch (e) { out.alert = { error: true }; }
  try { out.weekly = await sendWeeklySummary(env, t); } catch (e) { out.weekly = { error: true }; }
  console.log(JSON.stringify({ type: "ops", ...out }));
  return out;
}
