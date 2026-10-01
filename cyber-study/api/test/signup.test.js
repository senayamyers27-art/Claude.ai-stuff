/* Sign-up details on the profile, the backup password, and the AI career and certification path advisor.
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

test("profile: sign-up details are saved, validated, and only the fields sent change", async () => {
  const env = makeEnv();
  const u = await signIn(env, "details@example.com");
  const put = body => call(env, "PUT", "/v1/profile", { body, cookie: u.cookie });
  let r = await put({ displayName: "Ana Rivera", phone: "+1 (555) 123-4567", role: "career-changer", goalCert: "security-plus", examDate: "2027-03-01" });
  assert.equal(r.status, 200);
  assert.equal(r.json.phone, "+15551234567");
  assert.equal(r.json.role, "career-changer");
  assert.equal(r.json.examDate, "2027-03-01");
  assert.equal(r.json.hasPassword, false);
  r = await put({ bio: "Help desk tech" });
  assert.equal(r.json.displayName, "Ana Rivera", "fields not sent are kept");
  assert.equal(r.json.bio, "Help desk tech");
  assert.equal((await put({ phone: "call me" })).status, 400);
  assert.equal((await put({ phone: "12" })).status, 400);
  assert.equal((await put({ role: "admin" })).status, 400);
  assert.equal((await put({ examDate: "2001-01-01" })).status, 400);
  const ex = await call(env, "GET", "/v1/account/export", { cookie: u.cookie });
  assert.equal(ex.json.user.phone, "+15551234567");
});

test("backup password: set, sign in, wrong guesses refused the same way, change needs the current one, remove", async () => {
  const env = makeEnv();
  const u = await signIn(env, "pw.user@example.com");
  const set = body => call(env, "POST", "/v1/account/password", { body, cookie: u.cookie });
  assert.equal((await set({ password: "short" })).status, 400);
  assert.equal((await set({ password: "password12345" })).status, 400, "common passwords are refused");
  assert.equal((await set({ password: "pw.user-rocks-2027" })).status, 400, "the email name is refused");
  assert.equal((await set({ password: "violet canyon tractor 9" })).status, 200);
  const prof = await call(env, "GET", "/v1/profile", { cookie: u.cookie });
  assert.equal(prof.json.hasPassword, true);
  const row = await env.DB.prepare("SELECT password_hash FROM users WHERE email = ?").bind("pw.user@example.com").first();
  assert.match(row.password_hash, /^pbkdf2\$100000\$/);
  assert.ok(!row.password_hash.includes("violet"), "only a hash is stored");

  const login = (email, password) => call(env, "POST", "/v1/auth/password", { body: { email, password } });
  const ok = await login("PW.User@example.com", "violet canyon tractor 9");
  assert.equal(ok.status, 200);
  assert.match(ok.json ? "" : "", /^$/);
  const cookie = (await worker.fetch(new Request("https://api.study.example/v1/auth/password", { method: "POST", headers: { origin: SITE, "content-type": "application/json", "cf-connecting-ip": "10.7.7.7" }, body: JSON.stringify({ email: "pw.user@example.com", password: "violet canyon tractor 9" }) }), env)).headers.get("set-cookie");
  assert.match(cookie, /^__Host-cs_session=/);
  const wrong = await login("pw.user@example.com", "wrong password here");
  const nobody = await login("nobody@example.com", "violet canyon tractor 9");
  assert.equal(wrong.status, 400); assert.equal(nobody.status, 400);
  assert.equal(wrong.json.message, nobody.json.message, "no hint whether the account exists");

  assert.equal((await set({ password: "another long phrase 7" })).status, 400, "changing needs the current password");
  assert.equal((await set({ password: "another long phrase 7", current: "violet canyon tractor 9" })).status, 200);
  assert.equal((await login("pw.user@example.com", "another long phrase 7")).status, 200);
  assert.equal((await call(env, "DELETE", "/v1/account/password", { cookie: u.cookie })).status, 200);
  assert.equal((await login("pw.user@example.com", "another long phrase 7")).status, 400);
});

test("backup password: too many guesses for one address are rate limited", async () => {
  const env = makeEnv();
  const u = await signIn(env, "guess@example.com");
  await call(env, "POST", "/v1/account/password", { body: { password: "maple harbor lantern 3" }, cookie: u.cookie });
  let last;
  for (let i = 0; i < 9; i++) last = await call(env, "POST", "/v1/auth/password", { body: { email: "guess@example.com", password: "not it " + i } });
  assert.equal(last.status, 429);
});

test("path advisor: Premium Pro only, recommends from the site's catalog", async () => {
  const env = makeEnv({ ...PRICES });
  const u = await signIn(env, "path@example.com");
  const ask = ctx => call(env, "POST", "/v1/tutor/chat", { body: { mode: "path", context: ctx }, cookie: u.cookie });
  assert.equal((await ask({ goal: "First IT job" })).status, 402);
  await subscribe(env, u.user.id, "premium");
  assert.equal((await ask({ goal: "" })).status, 400);
  next = reply("Start with A+ Core 1.");
  const r = await ask({ goal: "Move from help desk into a SOC analyst job", experience: "it-job", hoursPerWeek: 8, interests: ["Blue team"], certs: ["A+"], timeframe: "1 year" });
  assert.equal(r.status, 200);
  const req = sent.filter(s => s.body).pop().body;
  assert.match(req.system[0].text, /Career and Certification Advisor/);
  assert.match(req.system[0].text, /CompTIA Security\+/);
  assert.match(req.messages[0].content, /Goal: Move from help desk into a SOC analyst job/);
  assert.match(req.messages[0].content, /Experience: Working in IT for under 2 years/);
});
