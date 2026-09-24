/* Stripe billing: Checkout, customer portal and webhooks, using Stripe's REST API directly
   (no SDK). Entitlements are always computed on the server from the subscriptions table. */
import { now, bad, forbidden, HttpError, safeEqual, isHttps } from "./util.js";
import { audit } from "./audit.js";


export const billingEnabled = env => !!(env.STRIPE_SECRET_KEY && env.STRIPE_PRICE_PRO_MONTHLY);

async function stripe(env, method, path, params) {
  const body = params ? new URLSearchParams(flatten(params)).toString() : undefined;
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, ...(body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}) },
    body
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new HttpError(502, "stripe_error", (j.error && j.error.message) || "The payment service returned an error.");
  return j;
}
// { a: { b: 1 }, c: [ { d: 2 } ] } -> { "a[b]": 1, "c[0][d]": 2 }
function flatten(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}[${k}]` : k;
    if (v === undefined || v === null) continue;
    if (typeof v === "object") flatten(v, key, out); else out[key] = String(v);
  }
  return out;
}

/* ---------- entitlements ---------- */
export async function entitlementsFor(env, userId) {
  const t = now();
  const pro = await env.DB.prepare(
    `SELECT 1 FROM subscriptions WHERE user_id = ? AND plan = 'pro' AND status IN ('active','trialing') AND (current_period_end IS NULL OR current_period_end > ?) LIMIT 1`
  ).bind(userId, t).first();
  const orgs = (await env.DB.prepare(
    `SELECT o.id, o.name, m.role FROM org_members m JOIN orgs o ON o.id = m.org_id WHERE m.user_id = ? ORDER BY o.name`
  ).bind(userId).all()).results || [];
  const orgActive = [];
  for (const o of orgs) if (await orgHasAccess(env, o.id)) orgActive.push(o.id);
  const features = new Set();
  // Sync is free for every signed-in account; Pro content needs Pro or an active organization.
  features.add("sync");
  if (pro || orgActive.length) features.add("pro_content");
  return { plan: pro ? "pro" : orgActive.length ? "org" : "free", features: [...features], orgs: orgs.map(o => ({ ...o, active: orgActive.includes(o.id) })) };
}

export async function orgSeatLimit(env, orgId) {
  const sub = await env.DB.prepare(
    `SELECT seats FROM subscriptions WHERE org_id = ? AND plan = 'org' AND status IN ('active','trialing') ORDER BY updated_at DESC LIMIT 1`
  ).bind(orgId).first();
  const org = await env.DB.prepare("SELECT pilot_seats FROM orgs WHERE id = ?").bind(orgId).first();
  return Math.max(sub ? sub.seats : 0, org ? org.pilot_seats : 0);
}
async function orgHasAccess(env, orgId) { return (await orgSeatLimit(env, orgId)) > 0; }

/* ---------- checkout and portal ---------- */
async function customerFor(env, user) {
  const row = await env.DB.prepare("SELECT stripe_customer FROM stripe_customers WHERE user_id = ?").bind(user.id).first();
  if (row) return row.stripe_customer;
  const c = await stripe(env, "POST", "/customers", { email: user.email, metadata: { user_id: user.id } });
  await env.DB.prepare("INSERT INTO stripe_customers (user_id, stripe_customer) VALUES (?, ?)").bind(user.id, c.id).run();
  return c.id;
}

export async function createCheckout(env, request, user, body) {
  if (!billingEnabled(env)) throw new HttpError(503, "billing_disabled", "Payments aren't set up yet.");
  const kind = body.plan === "org" ? "org" : "pro";
  let price, quantity = 1, metadata = { user_id: user.id, plan: kind };
  if (kind === "pro") {
    price = body.interval === "year" && env.STRIPE_PRICE_PRO_YEARLY ? env.STRIPE_PRICE_PRO_YEARLY : env.STRIPE_PRICE_PRO_MONTHLY;
  } else {
    if (!env.STRIPE_PRICE_ORG_SEAT) throw new HttpError(503, "billing_disabled", "Group plans aren't available yet.");
    const role = await env.DB.prepare("SELECT role FROM org_members WHERE org_id = ? AND user_id = ?").bind(String(body.orgId || ""), user.id).first();
    if (!role || role.role !== "owner") throw forbidden("Only the organization's owner can buy seats.");
    quantity = Math.min(Math.max(parseInt(body.seats, 10) || 0, 1), 1000);
    price = env.STRIPE_PRICE_ORG_SEAT;
    metadata.org_id = String(body.orgId);
  }
  const session = await stripe(env, "POST", "/checkout/sessions", {
    mode: "subscription",
    customer: await customerFor(env, user),
    client_reference_id: user.id,
    line_items: [{ price, quantity }],
    subscription_data: { metadata },
    metadata,
    allow_promotion_codes: "true",
    automatic_tax: env.STRIPE_TAX === "on" ? { enabled: "true" } : undefined,
    customer_update: env.STRIPE_TAX === "on" ? { address: "auto" } : undefined,
    success_url: `${env.SITE_ORIGIN}/#account`,
    cancel_url: `${env.SITE_ORIGIN}/#account`
  });
  await audit(env, request, { actor: user.id, org: metadata.org_id || null, action: "billing.checkout", target: kind });
  if (!isHttps(session.url)) throw new HttpError(502, "stripe_error", "The payment service returned an unexpected link.");
  return { url: session.url };
}

export async function createPortal(env, request, user) {
  if (!billingEnabled(env)) throw new HttpError(503, "billing_disabled", "Payments aren't set up yet.");
  const row = await env.DB.prepare("SELECT stripe_customer FROM stripe_customers WHERE user_id = ?").bind(user.id).first();
  if (!row) throw bad("no_billing", "There's no billing account yet.");
  const s = await stripe(env, "POST", "/billing_portal/sessions", { customer: row.stripe_customer, return_url: `${env.SITE_ORIGIN}/#account` });
  return { url: s.url };
}

/* ---------- webhooks ---------- */
async function hmacHex(secret, message) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, "0")).join("");
}

// Verifies Stripe's signature header: t=<timestamp>,v1=<hex hmac of "t.payload">.
export async function verifyStripeSignature(secret, payload, header, toleranceSec = 300) {
  if (!secret || !header) return false;
  const parts = Object.fromEntries(header.split(",").map(p => p.split("=")).filter(p => p.length === 2).map(([k, v]) => [k.trim(), v.trim()]));
  const sigs = header.split(",").filter(p => p.trim().startsWith("v1=")).map(p => p.trim().slice(3));
  const t = parseInt(parts.t, 10);
  if (!t || !sigs.length || Math.abs(Date.now() / 1000 - t) > toleranceSec) return false;
  const expected = await hmacHex(secret, `${t}.${payload}`);
  return sigs.some(s => safeEqual(s, expected));
}

export async function handleWebhook(env, request) {
  const payload = await request.text();
  if (payload.length > 512 * 1024) throw new HttpError(413, "too_large", "Payload too large.");
  if (!(await verifyStripeSignature(env.STRIPE_WEBHOOK_SECRET, payload, request.headers.get("stripe-signature")))) {
    throw new HttpError(400, "bad_signature", "Signature check failed.");
  }
  const event = JSON.parse(payload);
  const seen = await env.DB.prepare("INSERT INTO stripe_events (id, received_at) VALUES (?, ?) ON CONFLICT(id) DO NOTHING").bind(event.id, now()).run();
  if (!seen.meta || seen.meta.changes !== 1) return { received: true, duplicate: true };

  const obj = event.data && event.data.object;
  if (event.type.startsWith("customer.subscription.")) await upsertSubscription(env, obj, event.type === "customer.subscription.deleted");
  else if (event.type === "checkout.session.completed" && obj.subscription) {
    const sub = typeof obj.subscription === "string" ? await stripe(env, "GET", `/subscriptions/${obj.subscription}`) : obj.subscription;
    await upsertSubscription(env, sub, false);
  } else if (event.type === "invoice.payment_failed" && obj.subscription) {
    await env.DB.prepare("UPDATE subscriptions SET status = 'past_due', updated_at = ? WHERE stripe_subscription = ?").bind(now(), obj.subscription).run();
  }
  await audit(env, null, { actor: "stripe", action: "stripe." + event.type, target: obj && obj.id });
  return { received: true };
}

async function upsertSubscription(env, sub, deleted) {
  const md = sub.metadata || {};
  const item = sub.items && sub.items.data && sub.items.data[0];
  // Newer Stripe API versions put the billing period on the subscription item.
  const periodEnd = sub.current_period_end || (item && item.current_period_end) || null;
  const plan = md.plan === "org" ? "org" : "pro";
  const userId = md.user_id || null;
  if (userId && !(await env.DB.prepare("SELECT 1 FROM users WHERE id = ?").bind(userId).first())) return;
  await env.DB.prepare(
    `INSERT INTO subscriptions (stripe_subscription, stripe_customer, user_id, org_id, plan, status, seats, current_period_end, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(stripe_subscription) DO UPDATE SET status = excluded.status, seats = excluded.seats,
       current_period_end = excluded.current_period_end, updated_at = excluded.updated_at`
  ).bind(sub.id, String(sub.customer), plan === "pro" ? userId : null, plan === "org" ? (md.org_id || null) : null, plan,
    deleted ? "canceled" : sub.status, item ? (item.quantity || 1) : 1, periodEnd ? periodEnd * 1000 : null, now()).run();
}
