/* Stripe setup for StudyToCert: creates (or finds) the Pro and Premium Pro products, their monthly and yearly
   prices, the Customer Portal configuration and the webhook endpoint in the account that STRIPE_SECRET_KEY
   belongs to (test or live). Safe to run again: it reuses what already exists.
   Used by the "Study site Stripe setup" workflow; also runs locally:
     STRIPE_SECRET_KEY=sk_test_... node tools/stripe-setup.js
   Prints JSON: { livemode, prices: { STRIPE_PRICE_PRO_MONTHLY, ... }, webhook: { id, created, secret? } }.
   The webhook signing secret is only returned when the endpoint is created. */
const fs = require("fs"), path = require("path");
const KEY = process.env.STRIPE_SECRET_KEY || "";
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "site.config.json"), "utf8"));
// The API version the Worker pins (api/src/billing.js); the webhook sends events in the same shape.
const VERSION = (fs.readFileSync(path.join(__dirname, "..", "api/src/billing.js"), "utf8").match(/STRIPE_API_VERSION = "([^"]+)"/) || [])[1];
const SITE = `https://${cfg.domain}`;
const API = cfg.apiOrigin || `https://api.${cfg.domain.replace(/^www\./, "")}`;
const TAX_CODE = "txcd_20060058"; // Training Services - Self-study Web-based
const cents = s => Math.round(parseFloat(String(s).replace(/[^0-9.]/g, "")) * 100);
const PLANS = [
  { plan: "pro", name: "StudyToCert Pro", prices: cfg.pro,
    description: "Unlimited practice exams, every exam simulation and graded VM lab, about 300 extra questions per certification, full-length exams, score reports, study guides and capstone projects." },
  { plan: "premium", name: "StudyToCert Premium Pro", prices: cfg.premium,
    description: "Everything in Pro plus unlimited full-length exams, an AI tutor, AI weak-spot practice, an AI study coach, AI resume and lab write-up reviews, and AI mock job interviews." }
];
const EVENTS = ["checkout.session.completed", "customer.subscription.created", "customer.subscription.updated", "customer.subscription.deleted", "invoice.payment_failed"];

function form(obj, prefix = "", out = new URLSearchParams()) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}[${k}]` : k;
    if (v == null) continue;
    if (typeof v === "object") form(v, key, out); else out.append(key, String(v));
  }
  return out;
}
async function stripe(method, url, params, idem) {
  const body = params && method !== "GET" ? form(params).toString() : undefined;
  const q = params && method === "GET" ? "?" + form(params).toString() : "";
  const res = await fetch(`https://api.stripe.com/v1${url}${q}`, {
    method,
    headers: { Authorization: `Bearer ${KEY}`, "Stripe-Version": VERSION, ...(body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}), ...(idem ? { "Idempotency-Key": idem } : {}) },
    body
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`${method} ${url}: ${(j.error && j.error.message) || res.status}`);
  return j;
}
const all = async (url, params = {}) => { const out = []; let after; do { const p = await stripe("GET", url, { limit: 100, ...params, ...(after ? { starting_after: after } : {}) }); out.push(...p.data); after = p.has_more ? p.data[p.data.length - 1].id : null; } while (after); return out; };

async function main() {
  if (!/^(sk|rk)_(test|live)_[A-Za-z0-9]+$/.test(KEY)) throw new Error("Set STRIPE_SECRET_KEY to a Stripe secret or restricted key (sk_… or rk_…).");
  if (!VERSION) throw new Error("Couldn't read STRIPE_API_VERSION from api/src/billing.js.");
  const livemode = KEY.includes("_live_");
  const products = await all("/products", { active: true });
  const prices = await all("/prices", { active: true, type: "recurring" });
  const ids = {}, portalProducts = [];
  for (const p of PLANS) {
    let prod = products.find(x => x.metadata && x.metadata.plan === p.plan);
    if (!prod) prod = await stripe("POST", "/products", { name: p.name, description: p.description, tax_code: TAX_CODE, metadata: { plan: p.plan } }, `studytocert-product-${p.plan}`);
    const want = [["month", p.prices.monthly], ["year", p.prices.yearly]];
    const got = [];
    for (const [interval, label] of want) {
      const amount = cents(label);
      if (!amount) throw new Error(`site.config.json ${p.plan}.${interval === "month" ? "monthly" : "yearly"} isn't a price.`);
      let price = prices.find(x => x.product === prod.id && x.recurring && x.recurring.interval === interval && x.unit_amount === amount && x.currency === "usd");
      if (!price) price = await stripe("POST", "/prices", { product: prod.id, currency: "usd", unit_amount: amount, recurring: { interval }, tax_behavior: "exclusive", nickname: `${p.name.replace("StudyToCert ", "")} ${interval}ly`, lookup_key: `${p.plan}_${interval}ly_${amount}`, transfer_lookup_key: true }, `studytocert-price-${p.plan}-${interval}-${amount}`);
      ids[`STRIPE_PRICE_${p.plan.toUpperCase()}_${interval === "month" ? "MONTHLY" : "YEARLY"}`] = price.id;
      got.push(price.id);
    }
    portalProducts.push({ product: prod.id, prices: got });
  }

  // Customer Portal: plan switching between Pro and Premium Pro, card updates, invoices, cancel at period end.
  const configs = await all("/billing_portal/configurations", { active: true });
  const features = {
    customer_update: { enabled: true, allowed_updates: ["email", "address", "tax_id"] },
    invoice_history: { enabled: true },
    payment_method_update: { enabled: true },
    subscription_cancel: { enabled: true, mode: "at_period_end", cancellation_reason: { enabled: true, options: ["too_expensive", "unused", "missing_features", "switched_service", "low_quality", "too_complex", "customer_service", "other"] } },
    subscription_update: { enabled: true, default_allowed_updates: ["price", "promotion_code"], proration_behavior: "create_prorations", products: portalProducts, schedule_at_period_end: { conditions: [{ type: "decreasing_item_amount" }, { type: "shortening_interval" }] } }
  };
  const business_profile = { headline: "Manage your StudyToCert plan", privacy_policy_url: `${SITE}/privacy/`, terms_of_service_url: `${SITE}/terms/` };
  const mine = configs.find(c => c.name === "StudyToCert members");
  const portal = mine
    ? await stripe("POST", `/billing_portal/configurations/${mine.id}`, { business_profile, default_return_url: `${SITE}/#account`, features })
    : await stripe("POST", "/billing_portal/configurations", { name: "StudyToCert members", business_profile, default_return_url: `${SITE}/#account`, features });

  // Webhook endpoint for the accounts API.
  const url = `${API}/v1/stripe/webhook`;
  const hooks = await all("/webhook_endpoints");
  let hook = hooks.find(h => h.url === url), created = false;
  if (hook) hook = await stripe("POST", `/webhook_endpoints/${hook.id}`, { enabled_events: EVENTS, disabled: false });
  else { hook = await stripe("POST", "/webhook_endpoints", { url, api_version: VERSION, enabled_events: EVENTS, description: "StudyToCert accounts API: subscriptions and entitlements" }); created = true; }
  if (hook.api_version && hook.api_version !== VERSION) console.error(`Warning: the webhook uses API version ${hook.api_version}; the Worker expects ${VERSION}. Delete the endpoint in Stripe and run this again to recreate it.`);

  return { livemode, apiVersion: VERSION, prices: ids, portal: { id: portal.id, isDefault: portal.is_default }, webhook: { id: hook.id, url, created, ...(created ? { secret: hook.secret } : {}) } };
}

if (require.main === module) main().then(r => console.log(JSON.stringify(r, null, 2)), e => { console.error(e.message); process.exit(1); });
module.exports = { main, form };
