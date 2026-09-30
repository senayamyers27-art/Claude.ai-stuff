/* The site owner's dashboard (GET /v1/admin/stats): totals only, never lists of people, emails or answers.
   Open to the addresses in ADMIN_EMAILS (comma-separated; the STUDY_API_ADMIN_EMAILS repository variable). */
import { now, normalizeEmail, forbidden } from "./util.js";

const DAY = 24 * 60 * 60 * 1000;

export function isAdmin(env, user) {
  if (!user || !env.ADMIN_EMAILS) return false;
  const list = String(env.ADMIN_EMAILS).split(",").map(s => { try { return normalizeEmail(s); } catch (e) { return ""; } }).filter(Boolean);
  return list.includes(user.email);
}

const one = async (env, sql, ...args) => ((await env.DB.prepare(sql).bind(...args).first()) || {}).n || 0;
const all = async (env, sql, ...args) => (await env.DB.prepare(sql).bind(...args).all()).results || [];

export async function adminStats(env, user) {
  if (!isAdmin(env, user)) throw forbidden("This page is for the site's owner.");
  const t = now();
  const since = d => t - d * DAY;

  const users = {
    total: await one(env, "SELECT COUNT(*) AS n FROM users"),
    new1: await one(env, "SELECT COUNT(*) AS n FROM users WHERE created_at >= ?", since(1)),
    new7: await one(env, "SELECT COUNT(*) AS n FROM users WHERE created_at >= ?", since(7)),
    new30: await one(env, "SELECT COUNT(*) AS n FROM users WHERE created_at >= ?", since(30)),
    // Someone who synced progress in the window: a good sign they're studying, not just signed up.
    active7: await one(env, "SELECT COUNT(DISTINCT user_id) AS n FROM progress_docs WHERE updated_at >= ?", since(7)),
    active30: await one(env, "SELECT COUNT(DISTINCT user_id) AS n FROM progress_docs WHERE updated_at >= ?", since(30))
  };

  // Sign-ups per day for the last 14 days, oldest first.
  const perDay = await all(env, "SELECT CAST((created_at - ?) / ? AS INTEGER) AS d, COUNT(*) AS n FROM users WHERE created_at >= ? GROUP BY d", since(14), DAY, since(14));
  const signups = Array.from({ length: 14 }, (_, i) => ({ day: new Date(since(14) + i * DAY).toISOString().slice(0, 10), n: (perDay.find(r => r.d === i) || {}).n || 0 }));

  // Paid plans: active or in a trial, by plan and billing period; the page turns these into a monthly estimate.
  const plans = await all(env, `SELECT plan, COALESCE(billing_interval, 'month') AS billing_interval, status, COUNT(*) AS n, SUM(seats) AS seats
    FROM subscriptions WHERE status IN ('active', 'trialing', 'past_due') GROUP BY plan, billing_interval, status`);
  const canceled30 = await one(env, "SELECT COUNT(*) AS n FROM subscriptions WHERE status = 'canceled' AND updated_at >= ?", since(30));

  // Most studied certifications over the last 30 days (by learners with synced progress).
  const certs = (await all(env, `SELECT substr(doc_key, 6) AS cert, COUNT(*) AS n FROM progress_docs
    WHERE doc_key LIKE 'cert:%' AND updated_at >= ? GROUP BY doc_key ORDER BY n DESC LIMIT 10`, since(30))).map(r => ({ certId: r.cert, learners: r.n }));

  const classes = {
    classes: await one(env, "SELECT COUNT(*) AS n FROM classes"),
    students: await one(env, "SELECT COUNT(*) AS n FROM class_members"),
    assignments: await one(env, "SELECT COUNT(*) AS n FROM class_assignments")
  };
  const referrals = {
    codes: await one(env, "SELECT COUNT(*) AS n FROM referral_codes"),
    referred: await one(env, "SELECT COUNT(*) AS n FROM subscriptions WHERE referrer_id IS NOT NULL"),
    rewarded: await one(env, "SELECT COUNT(*) AS n FROM referral_rewards WHERE status = 'credited'"),
    pending: await one(env, "SELECT COUNT(*) AS n FROM referral_rewards WHERE status = 'pending'")
  };
  return { generatedAt: t, users, signups, plans: plans.map(p => ({ plan: p.plan, interval: p.billing_interval, status: p.status, count: p.n, seats: p.seats })), canceled30, certs, classes, referrals };
}
