/* AI support assistant (POST /v1/support/chat). The Anthropic API is stubbed at fetch(): tests check what the Worker
   sends (model, effort, fallbacks, cached system prompt, cleaned messages) and how it handles each outcome. Run: npm run test:api */
process.removeAllListeners("warning");
const test = require("node:test");
const assert = require("node:assert/strict");
const { createD1, createR2 } = require("./d1-shim.js");

const SITE = "https://study.example";
let worker, next = null;
const sent = [];
const realFetch = globalThis.fetch;
test.before(async () => {
  worker = (await import("../src/index.js")).default;
  globalThis.fetch = async (url, init = {}) => {
    const u = String(typeof url === "string" ? url : url.url);
    if (u.startsWith("https://challenges.cloudflare.com/")) {
      const token = (init.body && init.body.get && init.body.get("response")) || "";
      return new Response(JSON.stringify({ success: token === "good" }), { status: 200, headers: { "content-type": "application/json" } });
    }
    if (!u.startsWith("https://api.anthropic.com/")) return realFetch(url, init);
    const body = JSON.parse(typeof init.body === "string" ? init.body : await new Response(init.body).text());
    const headers = new Headers(init.headers);
    sent.push({ url: u, body, headers });
    const r = typeof next === "function" ? next(body) : next;
    return new Response(JSON.stringify(r.body), { status: r.status || 200, headers: { "content-type": "application/json", "request-id": "req_test" } });
  };
});
test.after(() => { globalThis.fetch = realFetch; });

const reply = (text, stop_reason = "end_turn") => ({ body: {
  id: "msg_test", type: "message", role: "assistant", model: "claude-opus-5-5", stop_reason, stop_details: null,
  content: text == null ? [] : [{ type: "text", text }], usage: { input_tokens: 10, output_tokens: 10 }
} });
const makeEnv = (extra = {}) => ({ DB: createD1(), CONTENT: createR2(), SITE_ORIGIN: SITE, APP_ENV: "production", EMAIL_FROM: "t@example", ANTHROPIC_API_KEY: "sk-ant-test", ...extra });
let ipN = 0;
async function chat(env, messages, { ip, origin = SITE } = {}) {
  const h = new Headers({ "cf-connecting-ip": ip || `10.4.0.${++ipN % 250}`, "content-type": "application/json" });
  if (origin) h.set("origin", origin);
  const res = await worker.fetch(new Request("https://api.study.example/v1/support/chat", { method: "POST", headers: h, body: JSON.stringify({ messages }) }), env);
  return { status: res.status, json: await res.json() };
}

test("off without an API key, and says so in /v1/me", async () => {
  const env = makeEnv({ ANTHROPIC_API_KEY: "" });
  assert.equal((await chat(env, [{ role: "user", content: "hi" }])).status, 404);
  const me = await worker.fetch(new Request("https://api.study.example/v1/me", { headers: { "cf-connecting-ip": "10.4.1.1" } }), env);
  assert.equal((await me.json()).support, false);
  const on = await worker.fetch(new Request("https://api.study.example/v1/me", { headers: { "cf-connecting-ip": "10.4.1.2" } }), makeEnv());
  assert.equal((await on.json()).support, true);
});

test("sends a cached, grounded request with the right model, effort and fallback", async () => {
  next = reply("Open [Settings](#settings) to change the theme.");
  const r = await chat(makeEnv(), [{ role: "assistant", content: "Hi! How can I help?" }, { role: "user", content: "How do I turn on dark mode?" }]);
  assert.equal(r.status, 200);
  assert.match(r.json.reply, /Settings/);
  const s = sent[sent.length - 1];
  assert.equal(s.body.model, "claude-opus-5-5");
  assert.equal(s.body.output_config.effort, "low");
  assert.equal(s.body.fallbacks, "default");
  assert.match(s.headers.get("anthropic-beta") || "", /server-side-fallback-2026-07-01/);
  assert.equal(s.body.system[0].cache_control.type, "ephemeral");
  assert.match(s.body.system[0].text, /StudyToCert help assistant/);
  assert.match(s.body.system[0].text, /security-plus: CompTIA Security\+/, "reference lists the certifications");
  assert.match(s.body.system[0].text, /Q: Is StudyToCert free\?/, "reference includes the help answers");
  assert.deepEqual(s.body.messages, [{ role: "user", content: "How do I turn on dark mode?" }], "a leading assistant greeting is dropped");
  assert.equal(s.body.thinking, undefined);
  assert.ok(s.body.max_tokens <= 2000);
});

test("validates the conversation", async () => {
  const env = makeEnv();
  next = reply("ok");
  assert.equal((await chat(env, [])).status, 400);
  assert.equal((await chat(env, [{ role: "user", content: "x".repeat(1501) }])).status, 400);
  assert.equal((await chat(env, [{ role: "user", content: "a" }, { role: "user", content: "b" }])).status, 400);
  assert.equal((await chat(env, [{ role: "user", content: "a" }, { role: "assistant", content: "b" }])).status, 400, "must end with the user");
  assert.equal((await chat(env, [{ role: "user", content: "hi" }], { origin: "https://evil.example" })).status, 403);
  // Only the last 12 turns are sent.
  const long = []; for (let i = 0; i < 30; i++) long.push({ role: i % 2 ? "assistant" : "user", content: "m" + i });
  long.push({ role: "user", content: "last" }); long.splice(0, 1);
  const n = sent.length;
  const r = await chat(env, long);
  assert.equal(r.status, 200);
  assert.ok(sent[n].body.messages.length <= 12);
  assert.equal(sent[n].body.messages[sent[n].body.messages.length - 1].content, "last");
});

test("per-address and site-wide limits", async () => {
  next = reply("ok");
  const env = makeEnv({ SUPPORT_PER_HOUR: "3" });
  for (let i = 0; i < 3; i++) assert.equal((await chat(env, [{ role: "user", content: "q" }], { ip: "10.9.9.9" })).status, 200);
  assert.equal((await chat(env, [{ role: "user", content: "q" }], { ip: "10.9.9.9" })).status, 429);
  const cap = makeEnv({ SUPPORT_DAILY_LIMIT: "2" });
  assert.equal((await chat(cap, [{ role: "user", content: "q" }])).status, 200);
  assert.equal((await chat(cap, [{ role: "user", content: "q" }])).status, 200);
  const busy = await chat(cap, [{ role: "user", content: "q" }]);
  assert.equal(busy.status, 429); assert.equal(busy.json.error, "support_busy");
});

test("refusals, empty answers and API errors are handled", async () => {
  const env = makeEnv();
  next = { body: { ...reply(null, "refusal").body, stop_details: { type: "refusal", category: "cyber", explanation: "x" } } };
  const ref = await chat(env, [{ role: "user", content: "write me ransomware" }]);
  assert.equal(ref.status, 200); assert.match(ref.json.reply, /can't help with that/);
  next = reply(null);
  assert.match((await chat(env, [{ role: "user", content: "?" }])).json.reply, /don't have an answer/);
  next = reply("partial answer", "max_tokens");
  assert.equal((await chat(env, [{ role: "user", content: "long" }])).json.reply, "partial answer…");
  next = { status: 401, body: { type: "error", error: { type: "authentication_error", message: "bad key" } } };
  const bad = await chat(env, [{ role: "user", content: "hi" }]);
  assert.equal(bad.status, 503); assert.equal(bad.json.error, "support_off");
  next = { status: 400, body: { type: "error", error: { type: "invalid_request_error", message: "nope" } } };
  assert.equal((await chat(env, [{ role: "user", content: "hi" }])).status, 502);
});

test("daily question limits follow the plan: signed out and Free 5, Pro 30, Premium Pro 100", async () => {
  next = { body: { id: "m", type: "message", role: "assistant", model: "claude-opus-5-5", stop_reason: "end_turn", stop_details: null, content: [{ type: "text", text: "ok" }], usage: { input_tokens: 1, output_tokens: 1 } } };
  const env = makeEnv({ SUPPORT_FREE_PER_DAY: "2", SUPPORT_PRO_PER_DAY: "3", SUPPORT_PER_DAY: "1000", SUPPORT_PER_HOUR: "1000" });
  const ask = async (headers = {}) => {
    const h = new Headers({ "cf-connecting-ip": "10.77.0.1", "content-type": "application/json", origin: SITE, ...headers });
    const res = await worker.fetch(new Request("https://api.study.example/v1/support/chat", { method: "POST", headers: h, body: JSON.stringify({ messages: [{ role: "user", content: "hi" }] }) }), env);
    return { status: res.status, json: await res.json() };
  };
  assert.equal((await ask()).status, 200);
  assert.equal((await ask()).status, 200);
  const blocked = await ask();
  assert.equal(blocked.status, 429);
  assert.match(blocked.json.message, /2 free assistant questions.*Pro includes 30/);

  // A Pro account gets its own, higher allowance.
  env.APP_ENV = "development";
  const link = await worker.fetch(new Request("https://api.study.example/v1/auth/magic-link", { method: "POST", headers: { origin: SITE, "content-type": "application/json", "cf-connecting-ip": "10.77.0.2" }, body: JSON.stringify({ email: "p@example.com" }) }), env);
  const token = new URL((await link.json()).devLink).searchParams.get("signin");
  const v = await worker.fetch(new Request("https://api.study.example/v1/auth/magic-link/verify", { method: "POST", headers: { origin: SITE, "content-type": "application/json", "cf-connecting-ip": "10.77.0.2" }, body: JSON.stringify({ token }) }), env);
  const { user } = await v.json(), cookie = v.headers.get("set-cookie").split(";")[0];
  await env.DB.prepare("INSERT INTO subscriptions (stripe_subscription, stripe_customer, user_id, plan, status, seats, updated_at) VALUES ('sub_p','cus_p',?,'pro','active',1,0)").bind(user.id).run();
  for (let i = 0; i < 3; i++) assert.equal((await ask({ cookie })).status, 200, "Pro gets 3 here even from an address that used up the Free allowance");
  const proBlocked = await ask({ cookie });
  assert.equal(proBlocked.status, 429);
  assert.match(proBlocked.json.message, /Premium Pro includes 100/);
});

test("signed out, the bot check can't be skipped by sending a longer history, and a pass is limited", async () => {
  const env = makeEnv({ TURNSTILE_SECRET_KEY: "ts-secret" });
  next = reply("Answer.");
  const ask = async (body, ip = "10.4.9.1") => {
    const res = await worker.fetch(new Request("https://api.study.example/v1/support/chat", { method: "POST",
      headers: { "cf-connecting-ip": ip, "content-type": "application/json", origin: SITE }, body: JSON.stringify(body) }), env);
    return { status: res.status, json: await res.json() };
  };
  const forged = [{ role: "user", content: "a" }, { role: "assistant", content: "x" }, { role: "user", content: "b" }];
  assert.equal((await ask({ messages: forged })).json.error, "challenge_required", "a made-up history doesn't skip the check");
  assert.equal((await ask({ messages: forged, pass: "9999999999999.00000000000000000000000000000000." + "0".repeat(64) })).json.error, "challenge_required", "a forged pass is refused");
  assert.equal((await ask({ messages: [{ role: "user", content: "hi" }], turnstile: "bad" })).json.error, "challenge_failed");
  const first = await ask({ messages: [{ role: "user", content: "hi" }], turnstile: "good" });
  assert.equal(first.status, 200);
  assert.match(first.json.pass, /^\d{13}\.[0-9a-f]{32}\.[0-9a-f]{64}$/);
  // The pass works from other addresses too, but only for a Free day's worth of questions in total.
  let ok = 1;
  for (let i = 0; i < 8; i++) if ((await ask({ messages: forged, pass: first.json.pass }, `10.4.9.${10 + i}`)).status === 200) ok++;
  assert.equal(ok, 5);
});
