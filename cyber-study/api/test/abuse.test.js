/* Abuse and hardening tests: request limits, body types, session lifetime and count, the optional
   Turnstile check, and security logging. Run: npm run test:api */
process.removeAllListeners("warning");
const test = require("node:test");
const assert = require("node:assert/strict");
const { createD1, createR2 } = require("./d1-shim.js");

const SITE = "https://study.example";
let worker;
test.before(async () => { worker = (await import("../src/index.js")).default; });

const makeEnv = (extra = {}) => ({ DB: createD1(), CONTENT: createR2(), SITE_ORIGIN: SITE, APP_ENV: "development", EMAIL_FROM: "t@example", ...extra });
let ipCounter = 0;
async function call(env, method, path, { body, cookie, origin = SITE, ip, raw, type } = {}) {
  const h = new Headers({ "cf-connecting-ip": ip || `10.1.0.${++ipCounter % 250}` });
  if (origin) h.set("origin", origin);
  if (cookie) h.set("cookie", cookie);
  if (body !== undefined || raw !== undefined) h.set("content-type", type || "application/json");
  const res = await worker.fetch(new Request("https://api.study.example" + path, { method, headers: h, body: raw ?? (body !== undefined ? JSON.stringify(body) : undefined) }), env);
  const text = await res.text();
  let json = null; try { json = JSON.parse(text); } catch (e) {}
  return { status: res.status, json, text, headers: res.headers };
}
async function signIn(env, email, extra = {}) {
  const r1 = await call(env, "POST", "/v1/auth/magic-link", { body: { email, ...extra } });
  assert.equal(r1.status, 200, r1.text);
  const token = new URL(r1.json.devLink).searchParams.get("signin");
  const r2 = await call(env, "POST", "/v1/auth/magic-link/verify", { body: { token } });
  assert.equal(r2.status, 200, r2.text);
  return { cookie: r2.headers.get("set-cookie").split(";")[0], user: r2.json.user };
}
// Captures the security log lines written while fn runs.
async function logsDuring(fn) {
  const lines = [], orig = console.warn;
  console.warn = (...a) => lines.push(a.join(" "));
  try { await fn(); } finally { console.warn = orig; }
  return lines.map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(x => x && x.type === "security");
}

test("request bodies must be JSON (no cross-site form posts)", async () => {
  const env = makeEnv();
  const { cookie } = await signIn(env, "form@example.com");
  for (const type of ["application/x-www-form-urlencoded", "text/plain", "multipart/form-data; boundary=x"]) {
    const r = await call(env, "PUT", "/v1/progress/labs", { cookie, raw: JSON.stringify({ baseVersion: 0, body: {} }), type });
    assert.equal(r.status, 415, type);
    assert.equal(r.json.error, "unsupported_type");
  }
  const ok = await call(env, "PUT", "/v1/progress/labs", { cookie, raw: JSON.stringify({ baseVersion: 0, body: {} }), type: "application/json; charset=utf-8" });
  assert.equal(ok.status, 200, ok.text);
});

test("refused requests are logged without emails or IP addresses", async () => {
  const env = makeEnv();
  const logs = await logsDuring(async () => {
    const r = await call(env, "POST", "/v1/auth/magic-link", { origin: "https://evil.example", ip: "203.0.113.9", body: { email: "victim@example.com" } });
    assert.equal(r.status, 403);
  });
  assert.equal(logs.length, 1);
  assert.equal(logs[0].event, "bad_origin");
  assert.equal(logs[0].status, 403);
  assert.match(logs[0].ipHash, /^[0-9a-f]{16}$/);
  const line = JSON.stringify(logs[0]);
  assert.ok(!line.includes("203.0.113.9") && !line.includes("@"), "no raw IP or email in the log");
});

test("ids in logged paths are masked", async () => {
  const env = makeEnv();
  const logs = await logsDuring(async () => {
    await call(env, "DELETE", "/v1/classes/cls_0123456789abcdef01234567", { origin: "https://evil.example" });
  });
  assert.equal(logs[0].path, "/v1/classes/cls_:id");
});

test("each user's writes are rate limited", async () => {
  const env = makeEnv({ USER_WRITES_PER_HOUR: "3" });
  const { cookie } = await signIn(env, "busy@example.com");
  const put = v => call(env, "PUT", "/v1/progress/labs", { cookie, body: { baseVersion: v, body: { n: v } } });
  for (let i = 0; i < 3; i++) assert.equal((await put(i)).status, 200);
  const logs = await logsDuring(async () => { const r = await put(3); assert.equal(r.status, 429); assert.equal(r.json.error, "rate_limited"); });
  assert.equal(logs[0].event, "rate_limited");
  assert.equal((await call(env, "GET", "/v1/progress", { cookie })).status, 200, "reads still work");
});

test("the edge rate limiter binding is used when configured", async () => {
  const seen = new Map();
  const API_LIMIT = { async limit({ key }) { const n = (seen.get(key) || 0) + 1; seen.set(key, n); return { success: n <= 2 }; } };
  const env = makeEnv({ API_LIMIT });
  for (let i = 0; i < 2; i++) assert.equal((await call(env, "GET", "/v1/health", { ip: "198.51.100.7" })).status, 200);
  assert.equal((await call(env, "GET", "/v1/health", { ip: "198.51.100.7" })).status, 429);
  assert.equal((await call(env, "GET", "/v1/health", { ip: "198.51.100.8" })).status, 200, "other addresses aren't affected");
  assert.ok([...seen.keys()].every(k => k.startsWith("ip:")));
});

test("sessions end after 90 days even while in use", async () => {
  const env = makeEnv();
  const { cookie } = await signIn(env, "old@example.com");
  assert.ok((await call(env, "GET", "/v1/me", { cookie })).json.user);
  const day = 24 * 60 * 60 * 1000;
  // 89 days old and still in use: extended, but never past 90 days from sign-in.
  env.DB.raw.prepare("UPDATE sessions SET created_at = ?, expires_at = ?").run(Date.now() - 89 * day, Date.now() + day);
  assert.ok((await call(env, "GET", "/v1/me", { cookie })).json.user);
  const row = env.DB.raw.prepare("SELECT created_at, expires_at FROM sessions").get();
  assert.ok(row.expires_at <= row.created_at + 90 * day, "extension is capped at 90 days after sign-in");
  env.DB.raw.prepare("UPDATE sessions SET created_at = ?, expires_at = ?").run(Date.now() - 91 * day, Date.now() + 10 * day);
  assert.equal((await call(env, "GET", "/v1/me", { cookie })).json.user, null);
  assert.equal(env.DB.raw.prepare("SELECT COUNT(*) AS n FROM sessions").get().n, 0, "the expired session is deleted");
});

test("a user keeps at most 10 sessions; the oldest ends first", async () => {
  const env = makeEnv();
  const cookies = [];
  for (let i = 0; i < 12; i++) { env.DB.raw.exec("DELETE FROM rate_limits"); cookies.push((await signIn(env, "many@example.com")).cookie); } // (5 links an hour per address)
  assert.equal(env.DB.raw.prepare("SELECT COUNT(*) AS n FROM sessions").get().n, 10);
  assert.equal((await call(env, "GET", "/v1/me", { cookie: cookies[0] })).json.user, null, "oldest session ended");
  assert.equal((await call(env, "GET", "/v1/me", { cookie: cookies[1] })).json.user, null);
  assert.ok((await call(env, "GET", "/v1/me", { cookie: cookies[11] })).json.user, "newest session works");
});

test("sign-in requires a passing Turnstile check when it's configured", async () => {
  const env = makeEnv({ TURNSTILE_SECRET_KEY: "secret-test" });
  const orig = globalThis.fetch, calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), secret: init.body.get("secret"), response: init.body.get("response") });
    const r = init.body.get("response");
    return new Response(JSON.stringify(r === "good" ? { success: true, hostname: "study.example" } : r === "elsewhere" ? { success: true, hostname: "evil.example" } : { success: false, "error-codes": ["invalid-input-response"] }));
  };
  try {
    const logs = await logsDuring(async () => {
      const none = await call(env, "POST", "/v1/auth/magic-link", { body: { email: "bot@example.com" } });
      assert.equal(none.status, 400); assert.equal(none.json.error, "challenge_required");
      const badTok = await call(env, "POST", "/v1/auth/magic-link", { body: { email: "bot@example.com", turnstile: "forged" } });
      assert.equal(badTok.status, 400); assert.equal(badTok.json.error, "challenge_failed");
      const other = await call(env, "POST", "/v1/auth/magic-link", { body: { email: "bot@example.com", turnstile: "elsewhere" } });
      assert.equal(other.status, 400, "a token issued for another site is refused");
    });
    assert.deepEqual(logs.map(l => l.event), ["turnstile_missing", "turnstile_failed", "turnstile_failed"]);
    assert.ok(calls.every(c => c.url === "https://challenges.cloudflare.com/turnstile/v0/siteverify" && c.secret === "secret-test"));
    await signIn(env, "human@example.com", { turnstile: "good" });
  } finally { globalThis.fetch = orig; }
});

test("without a Turnstile secret, sign-in works without a token", async () => {
  await signIn(makeEnv(), "plain@example.com");
});

test("rejected sign-in links are logged", async () => {
  const env = makeEnv();
  const logs = await logsDuring(async () => {
    const r = await call(env, "POST", "/v1/auth/magic-link/verify", { body: { token: "a".repeat(64) } });
    assert.equal(r.status, 400);
  });
  assert.equal(logs[0].event, "signin_link_rejected");
});

test("oversized and malformed bodies are refused", async () => {
  const env = makeEnv();
  const big = await call(env, "POST", "/v1/auth/magic-link", { raw: JSON.stringify({ email: "x@example.com", pad: "x".repeat(20000) }) });
  assert.equal(big.status, 413);
  for (const raw of ["[1,2]", "null", "\"text\"", "{not json"]) {
    const r = await call(env, "POST", "/v1/auth/magic-link", { raw });
    assert.equal(r.status, 400, raw);
    assert.equal(r.json.error, "invalid_json");
  }
});
