/* Tests for the backend hardening: webhook retries and ordering, sliding session cookies, keyed IP hashes
   and the daily clean-up. Run: npm run test:api */
process.removeAllListeners("warning");
const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { createD1, createR2 } = require("./d1-shim.js");

const SITE = "https://study.example";
const DAY = 24 * 60 * 60 * 1000;
let worker, purgeExpired;
test.before(async () => { const m = await import("../src/index.js"); worker = m.default; purgeExpired = m.purgeExpired; });

const makeEnv = (extra = {}) => ({ DB: createD1(), CONTENT: createR2(), SITE_ORIGIN: SITE, APP_ENV: "development", EMAIL_FROM: "t@example", ...extra });
let ipCounter = 0;
async function call(env, method, path, { body, cookie, origin = SITE, ip, raw, headers = {} } = {}) {
  const h = new Headers({ "cf-connecting-ip": ip || `10.1.0.${++ipCounter % 250}`, ...headers });
  if (origin) h.set("origin", origin);
  if (cookie) h.set("cookie", cookie);
  if (body !== undefined && !raw) h.set("content-type", "application/json");
  const res = await worker.fetch(new Request("https://api.study.example" + path, { method, headers: h, body: raw ?? (body !== undefined ? JSON.stringify(body) : undefined) }), env);
  const text = await res.text();
  let json = null; try { json = JSON.parse(text); } catch (e) {}
  return { status: res.status, json, text, headers: res.headers };
}
async function signIn(env, email) {
  const r1 = await call(env, "POST", "/v1/auth/magic-link", { body: { email } });
  const token = new URL(r1.json.devLink).searchParams.get("signin");
  const r2 = await call(env, "POST", "/v1/auth/magic-link/verify", { body: { token } });
  assert.equal(r2.status, 200, r2.text);
  return { cookie: r2.headers.get("set-cookie").split(";")[0], user: r2.json.user };
}
const sig = (secret, payload) => { const t = Math.floor(Date.now() / 1000); return `t=${t},v1=${crypto.createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex")}`; };
const subEvent = (id, type, status, userId, created) => JSON.stringify({ id, type, created, data: { object: { id: "sub_h", customer: "cus_h", status, metadata: { user_id: userId, plan: "pro" }, items: { data: [{ quantity: 1 }] } } } });
const hook = (env, secret, payload) => call(env, "POST", "/v1/stripe/webhook", { raw: payload, origin: null, headers: { "stripe-signature": sig(secret, payload) } });

test("a webhook that fails partway is retried, not skipped as a duplicate", async () => {
  const secret = "whsec_h", env = makeEnv({ STRIPE_WEBHOOK_SECRET: secret });
  const { cookie, user } = await signIn(env, "retry@example.com");
  const ev = subEvent("evt_r1", "customer.subscription.created", "active", user.id, 1000);
  const prepare = env.DB.prepare.bind(env.DB);
  env.DB.prepare = sql => { if (/INSERT INTO subscriptions/.test(sql)) throw new Error("database busy"); return prepare(sql); };
  const err = console.error; console.error = () => {};
  try { assert.equal((await hook(env, secret, ev)).status, 500, "Stripe sees a failure and retries"); } finally { console.error = err; env.DB.prepare = prepare; }
  const again = await hook(env, secret, ev);
  assert.equal(again.status, 200);
  assert.notEqual(again.json.duplicate, true, "the retry is processed");
  assert.equal((await call(env, "GET", "/v1/me", { cookie })).json.plan, "pro");
});

test("an older webhook event arriving late doesn't undo a newer one", async () => {
  const secret = "whsec_h", env = makeEnv({ STRIPE_WEBHOOK_SECRET: secret });
  const { cookie, user } = await signIn(env, "order@example.com");
  await hook(env, secret, subEvent("evt_o2", "customer.subscription.deleted", "canceled", user.id, 2000));
  await hook(env, secret, subEvent("evt_o1", "customer.subscription.updated", "active", user.id, 1000));
  assert.equal((await call(env, "GET", "/v1/me", { cookie })).json.plan, "free", "the cancellation stands");
  await hook(env, secret, subEvent("evt_o3", "customer.subscription.created", "active", user.id, 3000));
  assert.equal((await call(env, "GET", "/v1/me", { cookie })).json.plan, "pro", "a newer event still applies");
});

test("payment errors from Stripe aren't passed to the browser", async () => {
  const env = makeEnv({ STRIPE_SECRET_KEY: "sk_test_x", STRIPE_PRICE_PRO_MONTHLY: "price_x" });
  const { cookie } = await signIn(env, "pay@example.com");
  const real = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ error: { type: "invalid_request_error", message: "No such customer: cus_secret_detail" } }), { status: 400 });
  const origErr = console.error; console.error = () => {};
  try {
    const r = await call(env, "POST", "/v1/billing/checkout", { cookie, body: { plan: "pro", interval: "month" } });
    assert.ok(r.status >= 400);
    assert.doesNotMatch(r.text, /cus_secret_detail/);
  } finally { globalThis.fetch = real; console.error = origErr; }
});

test("an extended session re-sends its cookie with the new lifetime", async () => {
  const env = makeEnv();
  const { cookie } = await signIn(env, "slide@example.com");
  env.DB.raw.prepare("UPDATE sessions SET created_at = ?, expires_at = ?").run(Date.now() - 20 * DAY, Date.now() + 5 * DAY);
  const r = await call(env, "GET", "/v1/progress", { cookie });
  assert.equal(r.status, 200);
  const set = r.headers.get("set-cookie") || "";
  assert.match(set, /__Host-cs_session=[0-9a-f]{64}; Path=\/; Secure; HttpOnly; SameSite=Strict; Max-Age=\d+/);
  assert.ok(Number(set.match(/Max-Age=(\d+)/)[1]) > 25 * 86400, "the browser keeps the cookie for the extended time");
  const r2 = await call(env, "GET", "/v1/progress", { cookie });
  assert.equal(r2.headers.get("set-cookie"), null, "no cookie is sent when nothing changed");
});

test("IP addresses are stored as a keyed hash when IP_HASH_KEY is set", async () => {
  const env = makeEnv({ IP_HASH_KEY: "k".repeat(64) });
  await signIn(env, "hash@example.com");
  const rows = env.DB.raw.prepare("SELECT ip_hash FROM audit_log WHERE ip_hash IS NOT NULL").all();
  assert.ok(rows.length);
  const ips = Array.from({ length: 250 }, (_, i) => `10.1.0.${i}`);
  const plain = new Set(ips.map(ip => crypto.createHash("sha256").update("ip:" + ip).digest("hex").slice(0, 16)));
  assert.ok(rows.every(r => !plain.has(r.ip_hash)), "an unkeyed hash of the address can't be matched");
  const keyed = new Set(ips.map(ip => crypto.createHmac("sha256", "k".repeat(64)).update("ip:" + ip).digest("hex").slice(0, 16)));
  assert.ok(rows.every(r => keyed.has(r.ip_hash)));
});

test("the daily clean-up removes expired rows and keeps current ones", async () => {
  const env = makeEnv();
  await signIn(env, "keep@example.com");
  const t = Date.now(), db = env.DB.raw;
  db.prepare("INSERT INTO magic_links (token_hash, email, created_at, expires_at) VALUES ('old', 'x@example.com', ?, ?)").run(t - 3 * DAY, t - 2 * DAY);
  db.prepare("INSERT INTO sessions (token_hash, user_id, created_at, expires_at, user_agent) SELECT 'expired', id, ?, ?, '' FROM users LIMIT 1").run(t - 40 * DAY, t - DAY);
  db.prepare("INSERT INTO stripe_events (id, received_at) VALUES ('evt_old', ?), ('evt_new', ?)").run(t - 100 * DAY, t);
  db.prepare("INSERT INTO audit_log (at, action) VALUES (?, 'old'), (?, 'new')").run(t - 400 * DAY, t);
  db.prepare("INSERT INTO rate_limits (bucket, window_start, count) VALUES ('old', ?, 1)").run(t - 2 * DAY);
  const log = console.log; console.log = () => {};
  try { await purgeExpired(env, t); } finally { console.log = log; }
  const n = sql => db.prepare(sql).get().n;
  assert.equal(n("SELECT COUNT(*) n FROM magic_links WHERE token_hash = 'old'"), 0);
  assert.equal(n("SELECT COUNT(*) n FROM sessions WHERE token_hash = 'expired'"), 0);
  assert.equal(n("SELECT COUNT(*) n FROM sessions"), 1, "the live session stays");
  assert.equal(n("SELECT COUNT(*) n FROM stripe_events"), 1);
  assert.equal(n("SELECT COUNT(*) n FROM audit_log WHERE action = 'old'"), 0);
  assert.ok(n("SELECT COUNT(*) n FROM audit_log WHERE action = 'new'") >= 1);
  assert.equal(n("SELECT COUNT(*) n FROM rate_limits WHERE bucket = 'old'"), 0);
});

test("rate limits hold under parallel requests, and IPv6 addresses count by their /64", async () => {
  const { rateLimit } = await import("../src/audit.js");
  const { ipv6Prefix64, clientIp } = await import("../src/util.js");
  const env = { DB: createD1() };
  const results = await Promise.allSettled(Array.from({ length: 30 }, () => rateLimit(env, "par:test", 10, 60000)));
  assert.equal(results.filter(r => r.status === "fulfilled").length, 10);
  assert.equal(ipv6Prefix64("2001:db8:1:2:aaaa::1"), "2001:db8:1:2::/64");
  assert.equal(ipv6Prefix64("2001:db8:1:2:ffff:ffff:ffff:ffff"), "2001:db8:1:2::/64");
  assert.equal(ipv6Prefix64("2001:db8::1"), "2001:db8:0:0::/64");
  assert.equal(ipv6Prefix64("::ffff:192.0.2.1"), "192.0.2.1");
  assert.equal(clientIp(new Request("https://x", { headers: { "cf-connecting-ip": "203.0.113.9" } })), "203.0.113.9");
});
