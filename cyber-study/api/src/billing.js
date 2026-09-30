/* Stripe billing: Checkout, customer portal and webhooks, using Stripe's REST API directly
   (no SDK). Entitlements are always computed on the server from the subscriptions table. */
import { now, bad, forbidden, HttpError, safeEqual, isHttps } from "./util.js";
import { audit } from "./audit.js";
import { sendEmail } from "./email.js";


export const billingEnabled = env => !!(env.STRIPE_SECRET_KEY && env.STRIPE_PRICE_PRO_MONTHLY);
// Premium Pro can be bought once its monthly price is set too.
export const premiumEnabled = env => billingEnabled(env) && !!env.STRIPE_PRICE_PREMIUM_MONTHLY;

// Personal plans, lowest to highest. Premium Pro includes everything in Pro.
const RANK = { pro: 1, premium: 2 };
// Which personal plan a Stripe price belongs to. The price wins over metadata, so a plan changed in the
// customer portal (Pro to Premium Pro or back) is recorded correctly.
function planForPrice(env, priceId) {
  if (!priceId) return null;
  if (priceId === env.STRIPE_PRICE_PREMIUM_MONTHLY || priceId === env.STRIPE_PRICE_PREMIUM_YEARLY) return "premium";
  if (priceId === env.STRIPE_PRICE_PRO_MONTHLY || priceId === env.STRIPE_PRICE_PRO_YEARLY) return "pro";
  if (priceId === env.STRIPE_PRICE_ORG_SEAT) return "org";
  return null;
}

// Every request names the API version this code is written for, so a new Stripe default can't change response
// shapes under it. Create the webhook endpoint with the same version (docs/PRO_LAUNCH.md) so events match too.
// Override with the STRIPE_API_VERSION variable only after checking the code against that version's changes.
export const STRIPE_API_VERSION = "2025-06-30.basil";

async function stripe(env, method, path, params, { idempotencyKey } = {}) {
  const query = params && method === "GET" ? "?" + new URLSearchParams(flatten(params)).toString() : "";
  const body = params && method !== "GET" ? new URLSearchParams(flatten(params)).toString() : undefined;
  const res = await fetch(`https://api.stripe.com/v1${path}${query}`, {
    method,
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Stripe-Version": env.STRIPE_API_VERSION || STRIPE_API_VERSION,
      ...(body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {})
    },
    body
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) {
    // Stripe's own message can mention account details, so it goes to the Worker's logs, not to the browser.
    console.error("stripe", res.status, j.error && j.error.type, j.error && j.error.code);
    throw new HttpError(502, "stripe_error", "The payment service returned an error. Try again in a few minutes.");
  }
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
  const rows = (await env.DB.prepare(
    `SELECT plan FROM subscriptions WHERE user_id = ? AND plan IN ('pro','premium') AND status IN ('active','trialing') AND (current_period_end IS NULL OR current_period_end > ?)`
  ).bind(userId, t).all()).results || [];
  const personal = rows.reduce((best, r) => (RANK[r.plan] || 0) > (RANK[best] || 0) ? r.plan : best, null);
  const orgs = (await env.DB.prepare(
    `SELECT o.id, o.name, m.role FROM org_members m JOIN orgs o ON o.id = m.org_id WHERE m.user_id = ? ORDER BY o.name`
  ).bind(userId).all()).results || [];
  const orgActive = [];
  for (const o of orgs) if (await orgHasAccess(env, o.id)) orgActive.push(o.id);
  const features = new Set();
  // Sync is free for every signed-in account; Pro content needs Pro, Premium Pro or an active organization;
  // the AI tutor, study coach and mock interviews (./tutor.js) need Premium Pro.
  features.add("sync");
  if (personal || orgActive.length) features.add("pro_content");
  if (personal === "premium") features.add("ai_tutor");
  return { plan: personal || (orgActive.length ? "org" : "free"), features: [...features], orgs: orgs.map(o => ({ ...o, active: orgActive.includes(o.id) })) };
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
  // Two checkouts started at once send the same key, so Stripe creates one customer and returns it to both.
  const c = await stripe(env, "POST", "/customers", { email: user.email, metadata: { user_id: user.id } }, { idempotencyKey: `customer-${user.id}` });
  await env.DB.prepare("INSERT INTO stripe_customers (user_id, stripe_customer) VALUES (?, ?) ON CONFLICT(user_id) DO NOTHING").bind(user.id, c.id).run();
  const saved = await env.DB.prepare("SELECT stripe_customer FROM stripe_customers WHERE user_id = ?").bind(user.id).first();
  return saved ? saved.stripe_customer : c.id;
}

// Before a new personal checkout: ask Stripe (not just our table, which can lag the webhook) whether the customer
// already has a personal subscription that is live or could still recover (past_due, unpaid, incomplete), and expire
// any earlier checkout that is still open, so two tabs or a retry after a failed card can't start a second plan.
const LIVE_STATUSES = ["active", "trialing", "past_due", "unpaid", "incomplete"];
async function guardPersonalCheckout(env, customer) {
  const subs = await stripe(env, "GET", "/subscriptions", { customer, status: "all", limit: 20 });
  if ((subs.data || []).some(s => LIVE_STATUSES.includes(s.status) && !(s.metadata && s.metadata.plan === "org")))
    throw new HttpError(400, "already_subscribed", "You already have a plan (or a payment for one is being retried). Manage it from Manage billing on your Account page.");
  const open = await stripe(env, "GET", "/checkout/sessions", { customer, status: "open", limit: 20 });
  for (const s of open.data || [])
    if (!(s.metadata && s.metadata.plan === "org")) await stripe(env, "POST", `/checkout/sessions/${encodeURIComponent(s.id)}/expire`);
}

export async function createCheckout(env, request, user, body) {
  if (!billingEnabled(env)) throw new HttpError(503, "billing_disabled", "Payments aren't set up yet.");
  const kind = body.plan === "org" ? "org" : body.plan === "premium" ? "premium" : "pro";
  let price, quantity = 1, metadata = { user_id: user.id, plan: kind };
  // One personal plan at a time: switching between Pro and Premium Pro happens in the customer portal (prorated),
  // so a second checkout never double-charges.
  if (kind !== "org" && ["pro", "premium"].includes((await entitlementsFor(env, user.id)).plan))
    throw new HttpError(400, "already_subscribed", "You already have a plan. Switch plans from Manage billing on your Account page.");
  if (kind === "premium") {
    if (!premiumEnabled(env)) throw new HttpError(503, "billing_disabled", "Premium Pro isn't available yet.");
    price = body.interval === "year" && env.STRIPE_PRICE_PREMIUM_YEARLY ? env.STRIPE_PRICE_PREMIUM_YEARLY : env.STRIPE_PRICE_PREMIUM_MONTHLY;
  } else if (kind === "pro") {
    price = body.interval === "year" && env.STRIPE_PRICE_PRO_YEARLY ? env.STRIPE_PRICE_PRO_YEARLY : env.STRIPE_PRICE_PRO_MONTHLY;
  } else {
    if (!env.STRIPE_PRICE_ORG_SEAT) throw new HttpError(503, "billing_disabled", "Group plans aren't available yet.");
    const role = await env.DB.prepare("SELECT role FROM org_members WHERE org_id = ? AND user_id = ?").bind(String(body.orgId || ""), user.id).first();
    if (!role || role.role !== "owner") throw forbidden("Only the organization's owner can buy seats.");
    quantity = Math.min(Math.max(parseInt(body.seats, 10) || 0, 1), 1000);
    price = env.STRIPE_PRICE_ORG_SEAT;
    metadata.org_id = String(body.orgId);
  }
  const customer = await customerFor(env, user);
  if (kind !== "org") await guardPersonalCheckout(env, customer);
  const session = await stripe(env, "POST", "/checkout/sessions", {
    mode: "subscription",
    customer,
    client_reference_id: user.id,
    line_items: [{ price, quantity }],
    // Flexible billing mode (Stripe's recommended default): accurate prorations when members switch plans.
    subscription_data: { metadata, billing_mode: { type: "flexible" } },
    metadata,
    allow_promotion_codes: "true",
    automatic_tax: env.STRIPE_TAX === "on" ? { enabled: "true" } : undefined,
    customer_update: env.STRIPE_TAX === "on" ? { address: "auto" } : undefined,
    // Stripe fills in {CHECKOUT_SESSION_ID}; the site sees ?checkout=… and waits for the webhook to record the plan.
    success_url: `${env.SITE_ORIGIN}/?checkout={CHECKOUT_SESSION_ID}#account`,
    cancel_url: `${env.SITE_ORIGIN}/#plans`
  });
  await audit(env, request, { actor: user.id, org: metadata.org_id || null, action: "billing.checkout", target: kind });
  if (!isHttps(session.url)) throw new HttpError(502, "stripe_error", "The payment service returned an unexpected link.");
  return { url: session.url };
}

export async function createPortal(env, request, user) {
  if (!billingEnabled(env)) throw new HttpError(503, "billing_disabled", "Payments aren't set up yet.");
  const row = await env.DB.prepare("SELECT stripe_customer FROM stripe_customers WHERE user_id = ?").bind(user.id).first();
  if (!row) throw bad("no_billing", "There's no billing account yet.");
  // The "StudyToCert members" configuration (plan switching, upgrades invoiced right away); without it Stripe uses
  // the account's default portal settings.
  const configuration = /^bpc_[A-Za-z0-9]+$/.test(env.STRIPE_PORTAL_CONFIG || "") ? env.STRIPE_PORTAL_CONFIG : undefined;
  const s = await stripe(env, "POST", "/billing_portal/sessions", { customer: row.stripe_customer, return_url: `${env.SITE_ORIGIN}/#account`, configuration });
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

// An invoice's subscription id: under parent.subscription_details since API version 2025-03-31.basil; older
// versions put it at the top level.
function invoiceSubscription(inv) {
  const s = (inv && inv.parent && inv.parent.subscription_details && inv.parent.subscription_details.subscription) || (inv && inv.subscription);
  return typeof s === "string" ? s : s && s.id;
}

export async function handleWebhook(env, request) {
  if (Number(request.headers.get("content-length")) > 512 * 1024) throw new HttpError(413, "too_large", "Payload too large.");
  const payload = await request.text();
  if (payload.length > 512 * 1024) throw new HttpError(413, "too_large", "Payload too large.");
  if (!(await verifyStripeSignature(env.STRIPE_WEBHOOK_SECRET, payload, request.headers.get("stripe-signature")))) {
    throw new HttpError(400, "bad_signature", "Signature check failed.");
  }
  const event = JSON.parse(payload);
  if (!event || typeof event.id !== "string" || typeof event.type !== "string") throw bad("bad_event", "Not a Stripe event.");
  const seen = await env.DB.prepare("INSERT INTO stripe_events (id, received_at) VALUES (?, ?) ON CONFLICT(id) DO NOTHING").bind(event.id, now()).run();
  if (!seen.meta || seen.meta.changes !== 1) return { received: true, duplicate: true };

  const obj = event.data && event.data.object;
  // Stripe's event time (seconds), so an older event that arrives late can't undo a newer one.
  const at = (Number(event.created) || Math.floor(now() / 1000)) * 1000;
  try {
    if (event.type.startsWith("customer.subscription.")) await upsertSubscription(env, obj, event.type === "customer.subscription.deleted", at);
    else if (event.type === "checkout.session.completed" && obj.subscription) {
      const sub = typeof obj.subscription === "string" ? await stripe(env, "GET", `/subscriptions/${obj.subscription}`) : obj.subscription;
      await upsertSubscription(env, sub, false, at);
      await welcomeEmail(env, sub);
    } else if (event.type === "invoice.payment_failed" && invoiceSubscription(obj)) {
      await env.DB.prepare("UPDATE subscriptions SET status = 'past_due', updated_at = ?, stripe_event_at = ? WHERE stripe_subscription = ? AND COALESCE(stripe_event_at, 0) <= ?")
        .bind(now(), at, invoiceSubscription(obj), at).run();
    }
  } catch (e) {
    // Forget the event so Stripe's retry is processed instead of being skipped as a duplicate.
    await env.DB.prepare("DELETE FROM stripe_events WHERE id = ?").bind(event.id).run().catch(() => {});
    throw e;
  }
  await audit(env, null, { actor: "stripe", action: "stripe." + event.type, target: obj && obj.id });
  return { received: true };
}

// A short welcome after a first purchase (checkout.session.completed arrives once per purchase; duplicates are
// dropped above). Best effort: a failed email never fails the webhook, so Stripe doesn't retry the whole event.
const WELCOME = {
  pro: { name: "Pro", lines: ["Unlimited practice exams, every exam simulation and graded VM lab, and the timed VM exam", "About 300 extra practice questions per certification, with explanations", "3 full-length timed exams a month per certification, with a pass estimate and a score report", "Printable study guides and capstone projects for your portfolio"] },
  premium: { name: "Premium Pro", lines: ["Everything in Pro, with unlimited full-length exams", "The AI tutor: \"Explain with the AI tutor\" under any question you miss", "AI weak-spot practice on each certification's Practice tab", "The AI study coach on your dashboard, AI resume and lab write-up reviews, and AI mock interviews on the career pages"] }
};
async function welcomeEmail(env, sub) {
  try {
    const md = (sub && sub.metadata) || {}, item = sub && sub.items && sub.items.data && sub.items.data[0];
    const plan = planForPrice(env, item && item.price && item.price.id) || md.plan;
    if (!WELCOME[plan] || !md.user_id || !env.EMAIL_API_KEY) return;
    const user = await env.DB.prepare("SELECT email FROM users WHERE id = ?").bind(md.user_id).first();
    if (!user) return;
    const w = WELCOME[plan], site = env.SITE_ORIGIN;
    const text = [`Welcome to StudyToCert ${w.name}, and thank you for supporting the site.`, "", "What you have now:", ...w.lines.map(l => `- ${l}`), "",
      `Start here: ${site}/#dashboard`, `Manage or cancel your plan any time from your Account page: ${site}/#account`,
      "Your first payment can be refunded within 7 days: reply to this email.", "", "Good luck with your exam,", "StudyToCert"].join("\n");
    await sendEmail(env, { to: user.email, subject: `Welcome to StudyToCert ${w.name}`, text });
  } catch (e) { console.error("welcome email failed", e && e.code); }
}

async function upsertSubscription(env, sub, deleted, at) {
  const md = sub.metadata || {};
  const item = sub.items && sub.items.data && sub.items.data[0];
  // Newer Stripe API versions put the billing period on the subscription item.
  const periodEnd = sub.current_period_end || (item && item.current_period_end) || null;
  const byPrice = planForPrice(env, item && item.price && item.price.id);
  const plan = byPrice || (md.plan === "org" ? "org" : md.plan === "premium" ? "premium" : "pro");
  const userId = md.user_id || null;
  if (userId && !(await env.DB.prepare("SELECT 1 FROM users WHERE id = ?").bind(userId).first())) return;
  await env.DB.prepare(
    `INSERT INTO subscriptions (stripe_subscription, stripe_customer, user_id, org_id, plan, status, seats, current_period_end, updated_at, stripe_event_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(stripe_subscription) DO UPDATE SET plan = excluded.plan, status = excluded.status, seats = excluded.seats,
       current_period_end = excluded.current_period_end, updated_at = excluded.updated_at, stripe_event_at = excluded.stripe_event_at
     WHERE COALESCE(subscriptions.stripe_event_at, 0) <= excluded.stripe_event_at`
  ).bind(sub.id, String(sub.customer), plan !== "org" ? userId : null, plan === "org" ? (md.org_id || null) : null, plan,
    deleted ? "canceled" : sub.status, item ? (item.quantity || 1) : 1, periodEnd ? periodEnd * 1000 : null, now(), at).run();
}
