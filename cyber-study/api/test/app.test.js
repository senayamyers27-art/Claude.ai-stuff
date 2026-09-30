/* Sign-in for the iOS and Android apps: an emailed code instead of a link, and a bearer token instead of the
   site's cookie. Run: npm run test:api */
process.removeAllListeners("warning");
const test = require("node:test");
const assert = require("node:assert/strict");
const { createD1, createR2 } = require("./d1-shim.js");

const SITE = "https://study.example", APP = "capacitor://localhost";
let worker;
test.before(async () => { worker = (await import("../src/index.js")).default; });
const makeEnv = (extra = {}) => ({ DB: createD1(), CONTENT: createR2(), SITE_ORIGIN: SITE, APP_ENV: "development", EMAIL_FROM: "t@example", ...extra });
let ipN = 0;
async function call(env, method, path, { body, origin = APP, headers = {} } = {}) {
  const h = new Headers({ "cf-connecting-ip": `10.20.0.${++ipN % 250}`, ...headers });
  if (origin) h.set("origin", origin);
  if (body !== undefined) h.set("content-type", "application/json");
  const res = await worker.fetch(new Request("https://api.study.example" + path, { method, headers: h, body: body !== undefined ? JSON.stringify(body) : undefined }), env);
  let json = null; try { json = await res.json(); } catch (e) {}
  return { status: res.status, json, headers: res.headers };
}

test("the app signs in with the emailed code and uses a bearer token", async () => {
  const env = makeEnv();
  const r1 = await call(env, "POST", "/v1/auth/magic-link", { body: { email: "App@Example.com", app: true } });
  assert.equal(r1.status, 200);
  assert.match(r1.json.message, /code/);
  assert.match(r1.json.devCode, /^[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/);
  assert.equal(r1.headers.get("access-control-allow-origin"), APP);
  assert.equal(r1.headers.get("access-control-allow-credentials"), null, "no cookies for the apps");
  const row = env.DB.raw.prepare("SELECT code_hash FROM magic_links").get();
  assert.ok(row.code_hash && !row.code_hash.includes(r1.json.devCode.replace("-", "")), "only a hash of the code is stored");

  const ok = await call(env, "POST", "/v1/auth/code/verify", { body: { email: "app@example.com", code: r1.json.devCode.toLowerCase() } });
  assert.equal(ok.status, 200);
  assert.match(ok.json.token, /^[0-9a-f]{64}$/);
  assert.equal(ok.headers.get("set-cookie"), null);
  const me = await call(env, "GET", "/v1/me", { headers: { authorization: `Bearer ${ok.json.token}` } });
  assert.equal(me.json.user.email, "app@example.com");
  assert.equal((await call(env, "POST", "/v1/auth/code/verify", { body: { email: "app@example.com", code: r1.json.devCode } })).status, 400, "a code works once");

  await call(env, "POST", "/v1/auth/logout", { headers: { authorization: `Bearer ${ok.json.token}` } });
  assert.equal((await call(env, "GET", "/v1/me", { headers: { authorization: `Bearer ${ok.json.token}` } })).json.user, null, "signing out ends the token");
});

test("wrong codes are counted and the code stops working", async () => {
  const env = makeEnv();
  const { json } = await call(env, "POST", "/v1/auth/magic-link", { body: { email: "guess@example.com", app: true } });
  for (let i = 0; i < 5; i++) assert.equal((await call(env, "POST", "/v1/auth/code/verify", { body: { email: "guess@example.com", code: "AAAA-AAAA" } })).status, 400);
  const r = await call(env, "POST", "/v1/auth/code/verify", { body: { email: "guess@example.com", code: json.devCode } });
  assert.equal(r.status, 400, "the right code no longer works after 5 wrong guesses");
});

test("codes are only for the apps; the website keeps Turnstile and links", async () => {
  const env = makeEnv({ TURNSTILE_SECRET_KEY: "ts" });
  const site = await call(env, "POST", "/v1/auth/magic-link", { origin: SITE, body: { email: "web@example.com", app: true } });
  assert.equal(site.json.error, "challenge_required", "the website still needs the bot check");
  const app = await call(env, "POST", "/v1/auth/magic-link", { body: { email: "web@example.com", app: true } });
  assert.equal(app.status, 200);
  assert.equal((await call(env, "POST", "/v1/auth/code/verify", { origin: SITE, body: { email: "web@example.com", code: app.json.devCode } })).status, 403);
  assert.equal((await call(env, "POST", "/v1/auth/magic-link", { origin: "https://evil.example", body: { email: "x@example.com", app: true } })).status, 403);
  for (let i = 0; i < 2; i++) await call(env, "POST", "/v1/auth/magic-link", { body: { email: "web@example.com", app: true } });
  assert.equal((await call(env, "POST", "/v1/auth/magic-link", { body: { email: "web@example.com", app: true } })).status, 429, "app requests have tighter limits");
});

test("the store review account signs in with its fixed code", async () => {
  const env = makeEnv({ APP_REVIEW_EMAIL: "review@studytocert.com", APP_REVIEW_CODE: "K7QM-2X9D" });
  assert.equal((await call(env, "POST", "/v1/auth/code/verify", { body: { email: "review@studytocert.com", code: "K7QM-2X9E" } })).status, 400);
  const ok = await call(env, "POST", "/v1/auth/code/verify", { body: { email: "Review@StudyToCert.com", code: "k7qm-2x9d" } });
  assert.equal(ok.status, 200);
  assert.equal((await call(env, "GET", "/v1/me", { headers: { authorization: `Bearer ${ok.json.token}` } })).json.user.email, "review@studytocert.com");
  const off = makeEnv();
  assert.equal((await call(off, "POST", "/v1/auth/code/verify", { body: { email: "review@studytocert.com", code: "K7QM-2X9D" } })).status, 400, "no review account unless it's configured");
});

test("a weak review code switches the review account off", async () => {
  for (const weak of ["REVIEW01", "AAAA1111", "ABCD2345", "KQMXPRTZ"]) {
    const env = makeEnv({ APP_REVIEW_EMAIL: "review@studytocert.com", APP_REVIEW_CODE: weak });
    assert.equal((await call(env, "POST", "/v1/auth/code/verify", { body: { email: "review@studytocert.com", code: weak } })).status, 400, weak);
  }
});

test("sign-in codes are random: 8 characters, every character equally likely", async () => {
  const { newCode } = await import("../src/auth.js");
  const counts = {}, N = 20000;
  const seen = new Set();
  for (let i = 0; i < N; i++) {
    const c = newCode();
    assert.match(c, /^[2-9A-HJ-NP-Z]{8}$/);
    seen.add(c);
    for (const ch of c) counts[ch] = (counts[ch] || 0) + 1;
  }
  assert.equal(seen.size, N, "no repeats in 20,000 codes");
  assert.equal(Object.keys(counts).length, 31, "all 31 characters are used");
  const expected = N * 8 / 31, worst = Math.max(...Object.values(counts).map(v => Math.abs(v - expected) / expected));
  assert.ok(worst < 0.06, `each character within 6% of its expected share (worst ${(worst * 100).toFixed(1)}%)`);
});

test("guessing is capped per address: 10 tries an hour, across codes and addresses of the caller", async () => {
  const env = makeEnv();
  await call(env, "POST", "/v1/auth/magic-link", { body: { email: "cap@example.com", app: true } });
  let limited = 0;
  for (let i = 0; i < 12; i++) {
    const r = await call(env, "POST", "/v1/auth/code/verify", { body: { email: "cap@example.com", code: "ZZZZ-ZZZ" + (i % 9 + 1) } });
    if (r.status === 429) limited++;
  }
  assert.equal(limited, 2, "the 11th and 12th tries in an hour are refused");
});
