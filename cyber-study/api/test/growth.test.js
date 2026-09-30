/* The owner's admin stats, referrals ("give a month, get a month") and class assignments.
   Stripe is stubbed at fetch(). Run: npm run test:api */
process.removeAllListeners("warning");
const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { createD1, createR2 } = require("./d1-shim.js");

const SITE = "https://study.example";
let worker;
const sent = [];
let stripeState = { subs: [], price: 700 };
const realFetch = globalThis.fetch;
test.before(async () => {
  worker = (await import("../src/index.js")).default;
  globalThis.fetch = async (url, init = {}) => {
    const u = String(typeof url === "string" ? url : url.url);
    if (!u.startsWith("https://api.stripe.com/")) return realFetch(url, init);
    const { pathname } = new URL(u), method = init.method || "GET";
    const params = new URLSearchParams(typeof init.body === "string" ? init.body : "");
    sent.push({ method, path: pathname, url: u, params, headers: new Headers(init.headers) });
    const ok = b => new Response(JSON.stringify(b), { status: 200, headers: { "content-type": "application/json" } });
    if (pathname === "/v1/customers") return ok({ id: "cus_" + crypto.randomBytes(4).toString("hex") });
    if (pathname === "/v1/subscriptions") return ok({ object: "list", data: stripeState.subs });
    if (pathname === "/v1/checkout/sessions" && method === "GET") return ok({ object: "list", data: [] });
    if (pathname === "/v1/checkout/sessions") return ok({ id: "cs_t", url: "https://checkout.stripe.com/c/pay/cs_t" });
    if (pathname.startsWith("/v1/prices/")) return ok({ id: "price_pro_m", unit_amount: stripeState.price });
    if (/\/v1\/customers\/[^/]+\/balance_transactions$/.test(pathname)) return ok({ id: "cbtxn_1" });
    return ok({});
  };
});
test.after(() => { globalThis.fetch = realFetch; });

const PRICES = { STRIPE_SECRET_KEY: "sk_test", STRIPE_WEBHOOK_SECRET: "whsec_g", STRIPE_PRICE_PRO_MONTHLY: "price_pro_m", STRIPE_PRICE_PRO_YEARLY: "price_pro_y", STRIPE_PRICE_PREMIUM_MONTHLY: "price_prem_m" };
const makeEnv = (extra = {}) => ({ DB: createD1(), CONTENT: createR2(), SITE_ORIGIN: SITE, APP_ENV: "development", EMAIL_FROM: "t@example", ...extra });
let ipN = 0;
async function call(env, method, path, { body, cookie, raw, headers = {}, origin = SITE } = {}) {
  const h = new Headers({ "cf-connecting-ip": `10.30.0.${++ipN % 250}`, ...headers });
  if (origin) h.set("origin", origin);
  if (cookie) h.set("cookie", cookie);
  if (body !== undefined && !raw) h.set("content-type", "application/json");
  const res = await worker.fetch(new Request("https://api.study.example" + path, { method, headers: h, body: raw ?? (body !== undefined ? JSON.stringify(body) : undefined) }), env);
  const text = await res.text();
  let json = null; try { json = JSON.parse(text); } catch (e) {}
  return { status: res.status, json };
}
async function signIn(env, email) {
  const r1 = await call(env, "POST", "/v1/auth/magic-link", { body: { email } });
  const token = new URL(r1.json.devLink).searchParams.get("signin");
  const res = await worker.fetch(new Request("https://api.study.example/v1/auth/magic-link/verify", { method: "POST", headers: { origin: SITE, "content-type": "application/json", "cf-connecting-ip": "10.30.9.9" }, body: JSON.stringify({ token }) }), env);
  const j = await res.json();
  return { cookie: res.headers.get("set-cookie").split(";")[0], user: j.user };
}
const sig = (secret, payload) => { const t = Math.floor(Date.now() / 1000); return `t=${t},v1=${crypto.createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex")}`; };
let evN = 0;
const subEvent = (env, sub) => {
  const payload = JSON.stringify({ id: "evt_g" + (++evN), type: "customer.subscription.updated", created: Math.floor(Date.now() / 1000) + evN, data: { object: sub } });
  return call(env, "POST", "/v1/stripe/webhook", { raw: payload, origin: null, headers: { "stripe-signature": sig(env.STRIPE_WEBHOOK_SECRET, payload), "content-type": "application/json" } });
};

test("admin stats: only for ADMIN_EMAILS, and only totals", async () => {
  const env = makeEnv({ ADMIN_EMAILS: " Owner@Example.com , other@example.com" });
  const owner = await signIn(env, "owner@example.com"), someone = await signIn(env, "someone@example.com");
  assert.equal((await call(env, "GET", "/v1/admin/stats", { cookie: someone.cookie })).status, 403);
  assert.equal((await call(env, "GET", "/v1/me", { cookie: someone.cookie })).json.admin, undefined);
  assert.equal((await call(env, "GET", "/v1/me", { cookie: owner.cookie })).json.admin, true);
  env.DB.raw.prepare("INSERT INTO subscriptions (stripe_subscription, stripe_customer, user_id, plan, status, seats, updated_at, billing_interval) VALUES ('sub_a','cus_a',?,'pro','active',1,0,'year')").run(someone.user.id);
  const r = await call(env, "GET", "/v1/admin/stats", { cookie: owner.cookie });
  assert.equal(r.status, 200);
  assert.equal(r.json.users.total, 2);
  assert.equal(r.json.users.new7, 2);
  assert.equal(r.json.signups.length, 14);
  assert.deepEqual(r.json.plans, [{ plan: "pro", interval: "year", status: "active", count: 1, seats: 1 }]);
  assert.ok(!JSON.stringify(r.json).includes("@example.com"), "no email addresses in the stats");
  assert.equal((await call(makeEnv(), "GET", "/v1/admin/stats", { cookie: owner.cookie })).status, 401, "a session from another database isn't valid");
});

test("referrals: the friend's first month is free, and the referrer gets a month of credit when it's paid", async () => {
  const env = makeEnv(PRICES);
  const alice = await signIn(env, "alice@example.com"), bob = await signIn(env, "bob@example.com");
  const info = (await call(env, "GET", "/v1/referral", { cookie: alice.cookie })).json;
  assert.match(info.code, /^[a-km-np-z2-9]{8}$/);
  assert.equal(info.link, `${SITE}/?ref=${info.code}#plans`);
  assert.equal((await call(env, "GET", "/v1/referral", { cookie: alice.cookie })).json.code, info.code, "the code stays the same");

  // Alice can't refer herself.
  stripeState.subs = [];
  sent.length = 0;
  await call(env, "POST", "/v1/billing/checkout", { cookie: alice.cookie, body: { plan: "pro", ref: info.code } });
  let co = sent.find(s => s.method === "POST" && s.path === "/v1/checkout/sessions");
  assert.equal(co.params.get("subscription_data[trial_period_days]"), null);

  // Bob, never subscribed, gets a 30-day trial tagged with Alice.
  sent.length = 0;
  const r = await call(env, "POST", "/v1/billing/checkout", { cookie: bob.cookie, body: { plan: "pro", ref: info.code } });
  assert.equal(r.json.trialDays, 30);
  co = sent.find(s => s.method === "POST" && s.path === "/v1/checkout/sessions");
  assert.equal(co.params.get("subscription_data[trial_period_days]"), "30");
  assert.equal(co.params.get("subscription_data[metadata][referrer_id]"), alice.user.id);

  // Someone who had a plan before gets no trial.
  const carol = await signIn(env, "carol@example.com");
  stripeState.subs = [{ id: "sub_old", status: "canceled", metadata: { plan: "pro" } }];
  sent.length = 0;
  await call(env, "POST", "/v1/billing/checkout", { cookie: carol.cookie, body: { plan: "pro", ref: info.code } });
  assert.equal(sent.find(s => s.method === "POST" && s.path === "/v1/checkout/sessions").params.get("subscription_data[trial_period_days]"), null);
  stripeState.subs = [];

  // Bob's trial: no reward yet. His first paid period: Alice (who has a billing account) is credited once.
  const bobSub = status => ({ id: "sub_bob", customer: "cus_bob", status, metadata: { user_id: bob.user.id, plan: "pro", referrer_id: alice.user.id }, items: { data: [{ quantity: 1, price: { id: "price_pro_m", recurring: { interval: "month" } } }] } });
  sent.length = 0;
  assert.equal((await subEvent(env, bobSub("trialing"))).status, 200);
  assert.equal(env.DB.raw.prepare("SELECT COUNT(*) AS n FROM referral_rewards").get().n, 0);
  await subEvent(env, bobSub("active"));
  const credit = sent.find(s => /balance_transactions$/.test(s.path));
  assert.ok(credit, "Alice's Stripe balance is credited");
  assert.equal(credit.params.get("amount"), "-700");
  assert.equal(credit.headers.get("idempotency-key"), `referral-credit-${bob.user.id}`);
  await subEvent(env, bobSub("active"));
  assert.equal(sent.filter(s => /balance_transactions$/.test(s.path)).length, 1, "one reward per friend");
  const after = (await call(env, "GET", "/v1/referral", { cookie: alice.cookie })).json;
  assert.equal(after.friends, 1); assert.equal(after.credited, 1); assert.equal(after.creditCents, 700);
  assert.equal(env.DB.raw.prepare("SELECT billing_interval FROM subscriptions WHERE stripe_subscription = 'sub_bob'").get().billing_interval, "month");
});

test("referrals: a credit earned before the referrer has a billing account waits, then applies at their checkout", async () => {
  const env = makeEnv(PRICES);
  const dana = await signIn(env, "dana@example.com"), eve = await signIn(env, "eve@example.com");
  await call(env, "GET", "/v1/referral", { cookie: dana.cookie });
  sent.length = 0;
  await subEvent(env, { id: "sub_eve", customer: "cus_eve", status: "active", metadata: { user_id: eve.user.id, plan: "pro", referrer_id: dana.user.id }, items: { data: [{ quantity: 1, price: { id: "price_pro_m", recurring: { interval: "month" } } }] } });
  assert.equal(sent.filter(s => /balance_transactions$/.test(s.path)).length, 0);
  assert.equal((await call(env, "GET", "/v1/referral", { cookie: dana.cookie })).json.pending, 1);
  await call(env, "POST", "/v1/billing/checkout", { cookie: dana.cookie, body: { plan: "pro" } });
  assert.equal(sent.filter(s => /balance_transactions$/.test(s.path)).length, 1, "applied when Dana starts a plan");
  assert.equal((await call(env, "GET", "/v1/referral", { cookie: dana.cookie })).json.credited, 1);
});

test("class assignments: teachers set targets, students and the roster see progress", async () => {
  const env = makeEnv();
  const teacher = await signIn(env, "teach@example.com"), student = await signIn(env, "stud@example.com");
  const cls = (await call(env, "POST", "/v1/classes", { cookie: teacher.cookie, body: { name: "Sec+ Fall", teacherName: "Ms. T", certId: "security-plus" } })).json;
  await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: student.cookie, body: { displayName: "Sam", consent: true } });

  assert.equal((await call(env, "POST", `/v1/classes/${cls.id}/assignments`, { cookie: student.cookie, body: { title: "x", kind: "exam", target: 80 } })).status, 404, "only the teacher");
  assert.equal((await call(env, "POST", `/v1/classes/${cls.id}/assignments`, { cookie: teacher.cookie, body: { title: "Practice exam", kind: "exam", target: 180 } })).status, 400);
  const a = (await call(env, "POST", `/v1/classes/${cls.id}/assignments`, { cookie: teacher.cookie, body: { title: "Practice exam", kind: "exam", target: 80, dueDate: "2026-11-01" } })).json;
  assert.match(a.id, /^asg_/);
  assert.equal(a.certId, "security-plus", "defaults to the class's certification");

  // The student scores 85% on a practice exam.
  const doc = { history: [{ title: "Practice exam", score: 77, total: 90 }] };
  await call(env, "PUT", "/v1/progress/cert:security-plus", { cookie: student.cookie, body: { baseVersion: 0, body: doc } });
  const mine = (await call(env, "GET", "/v1/classes", { cookie: student.cookie })).json.joined[0];
  assert.equal(mine.assignments.length, 1);
  assert.equal(mine.assignments[0].value, 86); assert.equal(mine.assignments[0].done, true);
  const r = (await call(env, "GET", `/v1/classes/${cls.id}/roster`, { cookie: teacher.cookie })).json;
  assert.equal(r.assignments[0].done, 1);
  assert.equal(r.students[0].assignments[0].done, true);

  assert.equal((await call(env, "DELETE", `/v1/classes/${cls.id}/assignments/${a.id}`, { cookie: teacher.cookie })).status, 200);
  assert.equal((await call(env, "GET", `/v1/classes/${cls.id}/roster`, { cookie: teacher.cookie })).json.assignments.length, 0);
});
