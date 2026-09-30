/* tools/stripe-setup.js against a fake Stripe: the first run creates the products, prices, portal and webhook;
   a second run reuses all of them. Run: npm run test:api */
process.removeAllListeners("warning");
const test = require("node:test");
const assert = require("node:assert/strict");

process.env.STRIPE_SECRET_KEY = "sk_test_fake123";
const { main } = require("../../tools/stripe-setup.js");

function fakeStripe() {
  const db = { products: [], prices: [], billing_portal_configurations: [], webhook_endpoints: [] };
  const calls = [];
  let n = 0;
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(url), method = init.method || "GET";
    const params = new URLSearchParams(init.body || u.search.slice(1));
    calls.push({ method, path: u.pathname, params, headers: new Headers(init.headers) });
    const ok = body => new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });
    const list = rows => ok({ object: "list", data: rows, has_more: false });
    const p = u.pathname.replace("/v1/", "");
    if (method === "GET") {
      if (p === "products") return list(db.products);
      if (p === "prices") return list(db.prices);
      if (p === "billing_portal/configurations") return list(db.billing_portal_configurations);
      if (p === "webhook_endpoints") return list(db.webhook_endpoints);
    }
    if (p === "products") { const o = { id: `prod_${++n}`, metadata: { plan: params.get("metadata[plan]") } }; db.products.push(o); return ok(o); }
    if (p === "prices") { const o = { id: `price_${++n}`, product: params.get("product"), currency: params.get("currency"), unit_amount: +params.get("unit_amount"), recurring: { interval: params.get("recurring[interval]") } }; db.prices.push(o); return ok(o); }
    if (p === "billing_portal/configurations") { const o = { id: `bpc_${++n}`, name: params.get("name"), is_default: db.billing_portal_configurations.length === 0 }; db.billing_portal_configurations.push(o); return ok(o); }
    if (p.startsWith("billing_portal/configurations/")) return ok(db.billing_portal_configurations.find(c => p.endsWith(c.id)));
    if (p === "webhook_endpoints") { const o = { id: `we_${++n}`, url: params.get("url"), api_version: params.get("api_version"), secret: "whsec_fake" }; db.webhook_endpoints.push(o); return ok(o); }
    if (p.startsWith("webhook_endpoints/")) { const o = db.webhook_endpoints.find(h => p.endsWith(h.id)); return ok({ ...o, secret: undefined }); }
    return new Response(JSON.stringify({ error: { message: "unexpected " + method + " " + p } }), { status: 400 });
  };
  return { db, calls, restore: () => { globalThis.fetch = realFetch; } };
}

test("creates everything once, then reuses it", async () => {
  const s = fakeStripe();
  try {
    const first = await main();
    assert.equal(first.livemode, false);
    assert.deepEqual(Object.keys(first.prices).sort(), ["STRIPE_PRICE_PREMIUM_MONTHLY", "STRIPE_PRICE_PREMIUM_YEARLY", "STRIPE_PRICE_PRO_MONTHLY", "STRIPE_PRICE_PRO_YEARLY"]);
    assert.equal(s.db.products.length, 2);
    assert.deepEqual(s.db.prices.map(x => x.unit_amount).sort((a, b) => a - b), [700, 1500, 4900, 9900], "prices come from site.config.json");
    assert.match(first.portalConfig, /^bpc_/);
    assert.equal(first.webhook.created, true);
    assert.equal(first.webhook.secret, "whsec_fake");
    assert.match(first.webhook.url, /\/v1\/stripe\/webhook$/);
    assert.ok(s.calls.every(c => c.headers.get("stripe-version") === first.apiVersion), "every call pins the Worker's API version");
    const hook = s.calls.find(c => c.method === "POST" && c.path === "/v1/webhook_endpoints");
    assert.equal(hook.params.get("api_version"), first.apiVersion);
    assert.equal(hook.params.getAll("enabled_events[0]").length + hook.params.getAll("enabled_events[4]").length, 2);
    const portal = s.calls.find(c => c.method === "POST" && c.path === "/v1/billing_portal/configurations");
    assert.equal(portal.params.get("features[subscription_update][proration_behavior]"), "always_invoice");
    assert.equal(portal.params.get("features[subscription_cancel][mode]"), "at_period_end");

    const second = await main();
    assert.equal(s.db.products.length, 2, "no duplicate products");
    assert.equal(s.db.prices.length, 4, "no duplicate prices");
    assert.equal(s.db.webhook_endpoints.length, 1, "no duplicate webhooks");
    assert.equal(s.db.billing_portal_configurations.length, 1, "the portal configuration is updated, not duplicated");
    assert.deepEqual(second.prices, first.prices);
    assert.equal(second.webhook.created, false);
    assert.equal(second.webhook.secret, undefined, "the signing secret only appears when the endpoint is created");
  } finally { s.restore(); }
});
