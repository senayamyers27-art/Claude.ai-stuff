/* Premium Pro: plan tiers, checkout, Stripe plan changes and the AI tutor (POST /v1/tutor/chat).
   The Anthropic and Stripe APIs are stubbed at fetch(). Run: npm run test:api */
process.removeAllListeners("warning");
const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { createD1, createR2 } = require("./d1-shim.js");

const SITE = "https://study.example";
let worker, next = null, stripeLists = {};
const sent = [];
const realFetch = globalThis.fetch;
test.before(async () => {
  worker = (await import("../src/index.js")).default;
  globalThis.fetch = async (url, init = {}) => {
    const u = String(typeof url === "string" ? url : url.url);
    if (u.startsWith("https://api.stripe.com/")) {
      const params = new URLSearchParams(typeof init.body === "string" ? init.body : "");
      sent.push({ url: u, params, headers: new Headers(init.headers) });
      const path = new URL(u).pathname;
      const body = path === "/v1/customers" ? { id: "cus_t" }
        : (init.method || "GET") === "GET" ? { object: "list", data: stripeLists[path] || [], has_more: false }
        : { id: "cs_t", url: "https://checkout.stripe.com/c/pay/cs_t" };
      return new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });
    }
    if (u.startsWith("https://api.resend.com/")) { sent.push({ url: u, email: JSON.parse(init.body) }); return new Response(JSON.stringify({ id: "em_1" }), { status: 200 }); }
    if (!u.startsWith("https://api.anthropic.com/")) return realFetch(url, init);
    const body = JSON.parse(typeof init.body === "string" ? init.body : await new Response(init.body).text());
    sent.push({ url: u, body });
    const r = typeof next === "function" ? next(body) : next;
    return new Response(JSON.stringify(r.body), { status: r.status || 200, headers: { "content-type": "application/json", "request-id": "req_test" } });
  };
});
test.after(() => { globalThis.fetch = realFetch; });

const reply = (text, stop_reason = "end_turn") => ({ body: {
  id: "msg_test", type: "message", role: "assistant", model: "claude-opus-5-5", stop_reason, stop_details: null,
  content: [{ type: "text", text }], usage: { input_tokens: 10, output_tokens: 10 }
} });
const PRICES = { STRIPE_SECRET_KEY: "sk_test", STRIPE_PRICE_PRO_MONTHLY: "price_pro_m", STRIPE_PRICE_PRO_YEARLY: "price_pro_y", STRIPE_PRICE_PREMIUM_MONTHLY: "price_prem_m", STRIPE_PRICE_PREMIUM_YEARLY: "price_prem_y" };
const makeEnv = (extra = {}) => ({ DB: createD1(), CONTENT: createR2(), SITE_ORIGIN: SITE, APP_ENV: "development", EMAIL_FROM: "t@example", ANTHROPIC_API_KEY: "sk-ant-test", ...extra });
let ipN = 0;
async function call(env, method, path, { body, cookie, raw, headers = {}, origin = SITE } = {}) {
  const h = new Headers({ "cf-connecting-ip": `10.9.0.${++ipN % 250}`, ...headers });
  if (origin) h.set("origin", origin);
  if (cookie) h.set("cookie", cookie);
  if (body !== undefined && !raw) h.set("content-type", "application/json");
  const res = await worker.fetch(new Request("https://api.study.example" + path, { method, headers: h, body: raw ?? (body !== undefined ? JSON.stringify(body) : undefined) }), env);
  const text = await res.text();
  let json = null; try { json = JSON.parse(text); } catch (e) {}
  return { status: res.status, json, text };
}
async function signIn(env, email) {
  const r1 = await call(env, "POST", "/v1/auth/magic-link", { body: { email } });
  const token = new URL(r1.json.devLink).searchParams.get("signin");
  const res = await worker.fetch(new Request("https://api.study.example/v1/auth/magic-link/verify", { method: "POST", headers: { origin: SITE, "content-type": "application/json", "cf-connecting-ip": "10.9.9.9" }, body: JSON.stringify({ token }) }), env);
  const j = await res.json();
  return { cookie: res.headers.get("set-cookie").split(";")[0], user: j.user };
}
const subscribe = (env, userId, plan, id = "sub_" + plan) => env.DB.prepare("INSERT INTO subscriptions (stripe_subscription, stripe_customer, user_id, plan, status, seats, updated_at) VALUES (?,?,?,?,'active',1,0)").bind(id, "cus_" + id, userId, plan).run();
function stripeSig(secret, payload, t = Math.floor(Date.now() / 1000)) {
  return `t=${t},v1=${crypto.createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex")}`;
}
const QUESTION = { certId: "security-plus", certName: "CompTIA Security+", domain: "General security concepts", question: "Which control category does a firewall rule belong to?", options: ["Technical", "Managerial", "Operational", "Physical"], answer: 0, chosen: 2, explanation: "Systems enforce technical controls." };

test("plans: Premium Pro includes Pro content and the AI tutor; Pro doesn't include the tutor", async () => {
  const env = makeEnv();
  const pro = await signIn(env, "pro@example.com"), prem = await signIn(env, "prem@example.com"), free = await signIn(env, "free@example.com");
  await subscribe(env, pro.user.id, "pro");
  await subscribe(env, prem.user.id, "premium");
  const mp = (await call(env, "GET", "/v1/me", { cookie: pro.cookie })).json;
  assert.equal(mp.plan, "pro"); assert.ok(mp.features.includes("pro_content")); assert.ok(!mp.features.includes("ai_tutor"));
  const mm = (await call(env, "GET", "/v1/me", { cookie: prem.cookie })).json;
  assert.equal(mm.plan, "premium"); assert.ok(mm.features.includes("pro_content")); assert.ok(mm.features.includes("ai_tutor"));
  // Someone with both keeps the higher plan.
  await subscribe(env, prem.user.id, "pro", "sub_extra");
  assert.equal((await call(env, "GET", "/v1/me", { cookie: prem.cookie })).json.plan, "premium");
  assert.equal((await call(env, "GET", "/v1/me", { cookie: free.cookie })).json.plan, "free");

  const body = { mode: "explain", context: QUESTION };
  assert.equal((await call(env, "POST", "/v1/tutor/chat", { body })).status, 401, "signed-out requests are refused");
  assert.equal((await call(env, "POST", "/v1/tutor/chat", { cookie: free.cookie, body })).status, 402);
  assert.equal((await call(env, "POST", "/v1/tutor/chat", { cookie: pro.cookie, body })).status, 402, "Pro alone doesn't include the tutor");
  next = reply("A firewall rule is enforced by a system, so it's technical.");
  const r = await call(env, "POST", "/v1/tutor/chat", { cookie: prem.cookie, body });
  assert.equal(r.status, 200, r.text);
  assert.match(r.json.reply, /technical/);
  const req = sent.filter(s => s.body).pop().body;
  assert.equal(req.model, "claude-opus-5-5");
  assert.equal(req.system[0].cache_control.type, "ephemeral");
  assert.match(req.system[0].text, /AI Tutor/);
  assert.doesNotMatch(req.system[0].text, /firewall rule/, "the context never goes into the cached system prompt");
  assert.match(req.messages[0].content, /^CONTEXT\n/);
  assert.match(req.messages[0].content, /Learner chose: C \(wrong\)/);
  assert.match(req.messages[0].content, /Explain this question for me\.$/);
});

test("tutor: validates modes and context, keeps the context on follow-ups, and handles refusals", async () => {
  const env = makeEnv();
  const u = await signIn(env, "t@example.com");
  await subscribe(env, u.user.id, "premium");
  const post = body => call(env, "POST", "/v1/tutor/chat", { cookie: u.cookie, body });
  assert.equal((await post({ mode: "hack", context: {} })).status, 400);
  assert.equal((await post({ mode: "explain", context: { ...QUESTION, certId: "not-a-cert" } })).status, 400);
  assert.equal((await post({ mode: "explain", context: { ...QUESTION, options: ["a", "b"] } })).status, 400);
  assert.equal((await post({ mode: "interview", context: { role: "" } })).status, 400);

  next = reply("Day 1: ...");
  const coach = await post({ mode: "coach", context: { certId: "security-plus", certName: "Security+", examDate: "2026-12-01", week: 3, weeks: 16, hoursPerWeek: 6, readiness: 41, domains: [{ name: "Threats", weight: 22, answered: 40, accuracy: 55 }] } });
  assert.equal(coach.status, 200, coach.text);
  let req = sent.filter(s => s.body).pop().body;
  assert.match(req.system[0].text, /Study Coach/);
  assert.match(req.messages[0].content, /Threats: exam weight 22%, 40 questions answered, 55% correct/);
  assert.equal(req.max_tokens, 2500);

  next = reply("Tell me about a time you handled an incident.");
  const conv = [{ role: "user", content: "I'm ready. Please start the interview." }, { role: "assistant", content: "Welcome. What is DNS?" }, { role: "user", content: "It resolves names to addresses." }];
  const iv = await post({ mode: "interview", context: { role: "SOC analyst", level: "entry", certs: ["Security+"] }, messages: conv });
  assert.equal(iv.status, 200, iv.text);
  req = sent.filter(s => s.body).pop().body;
  assert.equal(req.messages.length, 3);
  assert.match(req.messages[0].content, /Role: SOC analyst/, "the context rides on the first message of every request");
  assert.match(req.messages[2].content, /^It resolves names/);

  next = reply("", "refusal");
  const no = await post({ mode: "explain", context: QUESTION });
  assert.equal(no.status, 200);
  assert.match(no.json.reply, /can't help with that one/);
});

test("tutor: per-account limits", async () => {
  const env = makeEnv({ TUTOR_PER_HOUR: "2" });
  const u = await signIn(env, "lim@example.com");
  await subscribe(env, u.user.id, "premium");
  next = reply("ok");
  for (let i = 0; i < 2; i++) assert.equal((await call(env, "POST", "/v1/tutor/chat", { cookie: u.cookie, body: { mode: "explain", context: QUESTION } })).status, 200);
  assert.equal((await call(env, "POST", "/v1/tutor/chat", { cookie: u.cookie, body: { mode: "explain", context: QUESTION } })).status, 429);
});

test("checkout: Premium Pro uses its own prices; the webhook records the plan from the price", async () => {
  const env = makeEnv({ ...PRICES, STRIPE_WEBHOOK_SECRET: "whsec_t" });
  const u = await signIn(env, "buy@example.com");
  assert.equal((await call(env, "GET", "/v1/health")).json.premium, true);
  const r = await call(env, "POST", "/v1/billing/checkout", { cookie: u.cookie, body: { plan: "premium", interval: "year" } });
  assert.equal(r.status, 200, r.text);
  const session = sent.filter(s => s.params && s.url.endsWith("/checkout/sessions")).pop().params;
  assert.equal(session.get("line_items[0][price]"), "price_prem_y");
  assert.equal(session.get("metadata[plan]"), "premium");
  assert.equal(session.get("subscription_data[billing_mode][type]"), "flexible", "new subscriptions use flexible billing mode");
  assert.equal(session.get("success_url"), "https://study.example/?checkout={CHECKOUT_SESSION_ID}#account", "the site learns it's back from Checkout");
  const calls = sent.filter(s => s.params);
  assert.ok(calls.every(c => c.headers.get("stripe-version") === "2025-06-30.basil"), "every Stripe request pins the API version");
  assert.equal(calls.find(c => c.url.endsWith("/customers")).headers.get("idempotency-key"), `customer-${u.user.id}`, "customer creation is idempotent per user");
  assert.equal(calls.filter(c => c.url.endsWith("/customers")).length, 1, "the second checkout reuses the saved customer");
  const pro = await call(env, "POST", "/v1/billing/checkout", { cookie: u.cookie, body: { plan: "pro" } });
  assert.equal(pro.status, 200);
  assert.equal(sent.filter(s => s.params && s.url.endsWith("/checkout/sessions")).pop().params.get("line_items[0][price]"), "price_pro_m");

  await subscribe(env, (await signIn(env, "has@example.com")).user.id, "pro", "sub_has");
  const has = await signIn(env, "has@example.com");
  assert.equal((await call(env, "POST", "/v1/billing/checkout", { cookie: has.cookie, body: { plan: "premium" } })).status, 400, "no second personal plan; switch in the portal instead");

  // Bought Pro, then switched to Premium Pro in the customer portal: metadata still says "pro", the price says premium.
  const ev = (id, price) => JSON.stringify({ id, type: "customer.subscription.updated", data: { object: { id: "sub_9", customer: "cus_9", status: "active", metadata: { user_id: u.user.id, plan: "pro" }, items: { data: [{ quantity: 1, price: { id: price }, current_period_end: Math.floor(Date.now() / 1000) + 86400 }] } } } });
  for (const [id, price, plan] of [["evt_a", "price_pro_m", "pro"], ["evt_b", "price_prem_m", "premium"], ["evt_c", "price_pro_y", "pro"]]) {
    const raw = ev(id, price);
    assert.equal((await call(env, "POST", "/v1/stripe/webhook", { raw, origin: null, headers: { "stripe-signature": stripeSig("whsec_t", raw) } })).status, 200);
    assert.equal((await call(env, "GET", "/v1/me", { cookie: u.cookie })).json.plan, plan);
  }
});

test("webhook: a failed invoice marks the subscription past due (current and older invoice shapes)", async () => {
  const env = makeEnv({ ...PRICES, STRIPE_WEBHOOK_SECRET: "whsec_t" });
  const u = await signIn(env, "late@example.com");
  const send = async obj => { const raw = JSON.stringify(obj); return call(env, "POST", "/v1/stripe/webhook", { raw, origin: null, headers: { "stripe-signature": stripeSig("whsec_t", raw) } }); };
  const t = Math.floor(Date.now() / 1000);
  for (const [n, id] of [[1, "sub_new"], [2, "sub_old"]]) await send({ id: "evt_s" + n, created: t, type: "customer.subscription.created", data: { object: { id, customer: "cus_x", status: "active", metadata: { user_id: u.user.id, plan: "pro" }, items: { data: [{ quantity: 1, price: { id: "price_pro_m" }, current_period_end: t + 86400 }] } } } });
  await send({ id: "evt_f1", created: t + 1, type: "invoice.payment_failed", data: { object: { id: "in_1", parent: { type: "subscription_details", subscription_details: { subscription: "sub_new" } } } } });
  await send({ id: "evt_f2", created: t + 1, type: "invoice.payment_failed", data: { object: { id: "in_2", subscription: "sub_old" } } });
  const rows = (await env.DB.prepare("SELECT stripe_subscription, status FROM subscriptions ORDER BY stripe_subscription").all()).results;
  assert.deepEqual(rows.map(r => r.status), ["past_due", "past_due"]);
});

test("checkout: Premium Pro is refused until its price is set", async () => {
  const env = makeEnv({ STRIPE_SECRET_KEY: "sk_test", STRIPE_PRICE_PRO_MONTHLY: "price_pro_m" });
  const u = await signIn(env, "early@example.com");
  assert.equal((await call(env, "GET", "/v1/me", { cookie: u.cookie })).json.premium, false);
  assert.equal((await call(env, "POST", "/v1/billing/checkout", { cookie: u.cookie, body: { plan: "premium" } })).status, 503);
});

test("tutor: resume review, lab write-up feedback and weak-spot practice (Premium Pro only)", async () => {
  const env = makeEnv();
  const u = await signIn(env, "more@example.com"), pro = await signIn(env, "pro2@example.com");
  await subscribe(env, u.user.id, "premium"); await subscribe(env, pro.user.id, "pro");
  const post = (cookie, body) => call(env, "POST", "/v1/tutor/chat", { cookie, body });
  const resume = { mode: "resume", context: { role: "SOC analyst", resume: "Help desk technician, 2 years.\n- Reset passwords and unlocked accounts in Active Directory\n- Built a home lab with a SIEM" } };
  assert.equal((await post(pro.cookie, resume)).status, 402, "Pro doesn't include the resume review");
  assert.equal((await post(u.cookie, { mode: "resume", context: { role: "SOC analyst", resume: "short" } })).status, 400);
  next = reply("Strong start.");
  assert.equal((await post(u.cookie, resume)).status, 200);
  let req = sent.filter(s => s.body).pop().body;
  assert.match(req.system[0].text, /Resume Reviewer/);
  assert.match(req.messages[0].content, /Target role: SOC analyst/);
  assert.equal(req.max_tokens, 2500);

  assert.equal((await post(u.cookie, { mode: "writeup", context: { title: "Harden SSH", notes: "" } })).status, 400);
  next = reply("Good notes.");
  assert.equal((await post(u.cookie, { mode: "writeup", context: { title: "Harden SSH", goal: "Key-only SSH", notes: "Disabled password auth, set PermitRootLogin no, tested from a second VM." } })).status, 200);
  req = sent.filter(s => s.body).pop().body;
  assert.match(req.system[0].text, /Lab Reviewer/);
  assert.match(req.messages[0].content, /Learner's notes:\nDisabled password auth/);

  next = reply("Question 1: ...");
  assert.equal((await post(u.cookie, { mode: "drill", context: { certId: "network-plus", certName: "Network+", weak: [{ name: "Network troubleshooting", accuracy: 48, answered: 25 }], missed: ["Which tool shows the path packets take?"] } })).status, 200);
  req = sent.filter(s => s.body).pop().body;
  assert.match(req.system[0].text, /Practice Coach/);
  assert.match(req.messages[0].content, /Network troubleshooting: 48% correct over 25 questions/);
  assert.match(req.messages[0].content, /Give me my first practice question\.$/);
});

test("a completed checkout sends one welcome email for the plan bought", async () => {
  const env = makeEnv({ ...PRICES, STRIPE_WEBHOOK_SECRET: "whsec_t", EMAIL_FROM: "StudyToCert <hi@study.example>" });
  const u = await signIn(env, "welcome@example.com");
  env.EMAIL_API_KEY = "re_test"; // after signing in: the test sign-in uses the development link, which needs no key
  const t = Math.floor(Date.now() / 1000);
  const sub = { id: "sub_w", customer: "cus_w", status: "active", metadata: { user_id: u.user.id, plan: "premium" }, items: { data: [{ quantity: 1, price: { id: "price_prem_m" }, current_period_end: t + 86400 }] } };
  const raw = JSON.stringify({ id: "evt_w1", created: t, type: "checkout.session.completed", data: { object: { id: "cs_1", subscription: sub } } });
  const before = sent.filter(x => x.email).length;
  assert.equal((await call(env, "POST", "/v1/stripe/webhook", { raw, origin: null, headers: { "stripe-signature": stripeSig("whsec_t", raw) } })).status, 200);
  const mails = sent.filter(x => x.email).slice(before);
  assert.equal(mails.length, 1);
  assert.deepEqual(mails[0].email.to, ["welcome@example.com"]);
  assert.equal(mails[0].email.subject, "Welcome to StudyToCert Premium Pro");
  assert.match(mails[0].email.text, /AI tutor/);
  assert.equal((await call(env, "GET", "/v1/me", { cookie: u.cookie })).json.plan, "premium");
  await call(env, "POST", "/v1/stripe/webhook", { raw, origin: null, headers: { "stripe-signature": stripeSig("whsec_t", raw) } });
  assert.equal(sent.filter(x => x.email).length - before, 1, "a repeated event doesn't send a second email");
});

test("checkout: a plan Stripe still has (even past due) blocks a second one, and earlier open checkouts are expired", async () => {
  const env = makeEnv(PRICES);
  const u = await signIn(env, "twice@example.com");
  try {
    stripeLists = { "/v1/subscriptions": [{ id: "sub_old", status: "past_due", metadata: { plan: "pro" } }] };
    const r = await call(env, "POST", "/v1/billing/checkout", { cookie: u.cookie, body: { plan: "pro" } });
    assert.equal(r.status, 400); assert.equal(r.json.error, "already_subscribed");
    stripeLists = { "/v1/subscriptions": [{ id: "sub_gone", status: "canceled", metadata: { plan: "pro" } }], "/v1/checkout/sessions": [{ id: "cs_old", metadata: { plan: "pro" } }] };
    sent.length = 0;
    assert.equal((await call(env, "POST", "/v1/billing/checkout", { cookie: u.cookie, body: { plan: "premium" } })).status, 200);
    assert.ok(sent.some(s => s.url.endsWith("/v1/checkout/sessions/cs_old/expire")), "the earlier open checkout is expired");
    const list = sent.find(s => s.url.includes("/v1/subscriptions?"));
    assert.equal(new URL(list.url).searchParams.get("status"), "all");
  } finally { stripeLists = {}; }
});
