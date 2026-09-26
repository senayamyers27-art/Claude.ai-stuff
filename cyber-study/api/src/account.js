/* Self-service data export and account deletion. */
import { HttpError } from "./util.js";
import { audit } from "./audit.js";
import { billingEnabled } from "./billing.js";

export async function exportAccount(env, user) {
  const q = (sql, ...a) => env.DB.prepare(sql).bind(...a);
  const u = await q("SELECT id, email, created_at FROM users WHERE id = ?", user.id).first();
  const docs = (await q("SELECT doc_key, body, version, updated_at FROM progress_docs WHERE user_id = ?", user.id).all()).results || [];
  const orgs = (await q("SELECT o.id, o.name, m.role, m.joined_at FROM org_members m JOIN orgs o ON o.id = m.org_id WHERE m.user_id = ?", user.id).all()).results || [];
  const cohorts = (await q("SELECT c.id, c.name, c.cert_id FROM cohort_members m JOIN cohorts c ON c.id = m.cohort_id WHERE m.user_id = ?", user.id).all()).results || [];
  const classesTaught = (await q("SELECT id, name, cert_id, teacher_name, join_code, created_at FROM classes WHERE teacher_id = ?", user.id).all()).results || [];
  const classesJoined = (await q("SELECT c.id, c.name, c.teacher_name, m.display_name, m.show_email, m.consented_at, m.joined_at FROM class_members m JOIN classes c ON c.id = m.class_id WHERE m.user_id = ?", user.id).all()).results || [];
  const subs = (await q("SELECT plan, status, seats, current_period_end, updated_at FROM subscriptions WHERE user_id = ?", user.id).all()).results || [];
  const sessions = (await q("SELECT created_at, expires_at, user_agent FROM sessions WHERE user_id = ?", user.id).all()).results || [];
  return {
    exportedAt: new Date().toISOString(),
    user: u,
    progress: docs.map(d => ({ key: d.doc_key, version: d.version, updatedAt: d.updated_at, body: JSON.parse(d.body) })),
    organizations: orgs, cohorts, classesTaught, classesJoined, subscriptions: subs, sessions
  };
}

export async function deleteAccount(env, request, user, body) {
  if (body.confirm !== user.email) throw new HttpError(400, "confirm_email", "Type your email address to confirm.");
  // An owner can't leave an organization that still has other people in it.
  const owned = (await env.DB.prepare(
    `SELECT o.id, (SELECT COUNT(*) FROM org_members x WHERE x.org_id = o.id) AS members
     FROM orgs o JOIN org_members m ON m.org_id = o.id WHERE m.user_id = ? AND m.role = 'owner'`
  ).bind(user.id).all()).results || [];
  if (owned.some(o => o.members > 1)) throw new HttpError(409, "owner_of_org", "You own an organization with other members. Remove them or hand it over before deleting your account.");

  // Cancel billing first: deleting the Stripe customer also cancels its subscriptions.
  const cust = await env.DB.prepare("SELECT stripe_customer FROM stripe_customers WHERE user_id = ?").bind(user.id).first();
  if (cust && billingEnabled(env)) {
    const res = await fetch(`https://api.stripe.com/v1/customers/${encodeURIComponent(cust.stripe_customer)}`, { method: "DELETE", headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } });
    if (!res.ok && res.status !== 404) throw new HttpError(502, "stripe_error", "Couldn't close the billing account. Try again, or cancel in Manage billing first.");
  }
  for (const o of owned) await env.DB.prepare("DELETE FROM orgs WHERE id = ?").bind(o.id).run();
  await env.DB.prepare("DELETE FROM users WHERE id = ?").bind(user.id).run(); // cascades to sessions, progress, memberships
  await env.DB.prepare("DELETE FROM magic_links WHERE email = ?").bind(user.email).run();
  await audit(env, request, { actor: "system", action: "user.deleted" });
  return { deleted: true };
}
