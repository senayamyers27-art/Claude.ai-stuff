/* Owner operations emails: the error alert and the Monday summary. Resend is stubbed at fetch().
   Run: npm run test:api */
process.removeAllListeners("warning");
const test = require("node:test");
const assert = require("node:assert/strict");
const { createD1, createR2 } = require("./d1-shim.js");

let ops, worker;
const sent = [];
const realFetch = globalThis.fetch;
test.before(async () => {
  ops = await import("../src/ops.js");
  worker = (await import("../src/index.js")).default;
  globalThis.fetch = async (url, init = {}) => {
    if (String(url).startsWith("https://api.resend.com/")) { sent.push(JSON.parse(init.body)); return new Response(JSON.stringify({ id: "em_1" }), { status: 200 }); }
    return realFetch(url, init);
  };
});
test.after(() => { globalThis.fetch = realFetch; });
const makeEnv = (extra = {}) => ({ DB: createD1(), CONTENT: createR2(), SITE_ORIGIN: "https://study.example", API_ORIGIN: "https://api.study.example", APP_ENV: "development", EMAIL_API_KEY: "k", EMAIL_FROM: "t@example", ADMIN_EMAILS: "owner@example.com", ...extra });
const req = (method, path) => new Request("https://api.study.example" + path, { method });

test("routes are grouped without ids, and error lines drop email addresses", async () => {
  assert.equal(ops.routeOf(req("POST", "/v1/classes/cls_0123456789abcdef01234567/assignments/asg_0123456789abcdef01234567/exit")), "POST /v1/classes/:id/assignments/:id/exit");
  assert.equal(ops.routeOf(req("GET", "/v1/groups/join/abcdefghjk")), "GET /v1/groups/join/:id");
  const env = makeEnv();
  await ops.recordError(env, req("GET", "/v1/me"), new Error("boom for sam@example.com"));
  const row = await env.DB.prepare("SELECT route, message FROM server_errors").first();
  assert.equal(row.route, "GET /v1/me");
  assert.ok(!row.message.includes("sam@example.com") && row.message.includes("[email]"));
});

test("the error alert goes out past the threshold, at most once an hour, only to the owner", async () => {
  const env = makeEnv({ ERROR_ALERT_MIN: "3" });
  for (let i = 0; i < 2; i++) await ops.recordError(env, req("GET", "/v1/me"), new Error("db down"));
  sent.length = 0;
  assert.equal((await ops.checkErrorAlert(env, Date.now())).sent, false, "below the threshold");
  await ops.recordError(env, req("POST", "/v1/progress/cert:security-plus"), new Error("db down"));
  const r = await ops.checkErrorAlert(env, Date.now());
  assert.equal(r.sent, true); assert.equal(r.total, 3);
  assert.equal(sent.length, 1); assert.ok(JSON.stringify(sent[0].to).includes("owner@example.com"));
  assert.match(sent[0].subject, /3 server errors/);
  assert.match(sent[0].text, /2 x GET \/v1\/me: Error: db down/);
  assert.equal((await ops.checkErrorAlert(env, Date.now() + 10 * 60e3)).sent, false, "not again within the hour");
  assert.equal((await ops.checkErrorAlert(makeEnv({ ADMIN_EMAILS: "" }), Date.now())).sent, false);
});

test("an unexpected error in a request is logged as a 500 without the body", async () => {
  const env = makeEnv();
  env.DB = new Proxy(env.DB, { get(target, k) { if (k === "prepare") return sql => { if (/FROM sessions/.test(sql)) throw new Error("simulated failure"); return target.prepare(sql); }; const v = target[k]; return typeof v === "function" ? v.bind(target) : v; } });
  const res = await worker.fetch(new Request("https://api.study.example/v1/me", { headers: { origin: "https://study.example", cookie: "__Host-session=abc" } }), env);
  if (res.status === 500) {
    const row = await env.DB.prepare("SELECT route FROM server_errors").first();
    assert.equal(row.route, "GET /v1/me");
  } else assert.ok(res.status < 500, "handled without a server error");
});

test("the weekly summary goes out on Mondays at 14:00 UTC, once a week", async () => {
  const env = makeEnv();
  sent.length = 0;
  const mon = Date.UTC(2026, 9, 12, 14, 5), tue = Date.UTC(2026, 9, 13, 14, 5);
  assert.equal((await ops.sendWeeklySummary(env, tue)).sent, false);
  assert.equal((await ops.sendWeeklySummary(env, Date.UTC(2026, 9, 12, 13, 5))).sent, false);
  assert.equal((await ops.sendWeeklySummary(env, mon)).sent, true);
  assert.equal((await ops.sendWeeklySummary(env, mon + 60e3)).sent, false, "once a week");
  assert.equal(sent.length, 1);
  assert.match(sent[0].subject, /StudyToCert weekly: \d+ new accounts/);
  assert.match(sent[0].text, /study\.example\/#admin/);
});
