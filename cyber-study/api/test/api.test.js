/* API tests: the real Worker code against SQLite (via the D1 shim). Run: npm run test:api */
process.removeAllListeners("warning");
const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { createD1, createR2 } = require("./d1-shim.js");

const SITE = "https://study.example";
let worker;
test.before(async () => { worker = (await import("../src/index.js")).default; });

function makeEnv(extra = {}) {
  return { DB: createD1(), CONTENT: createR2(), SITE_ORIGIN: SITE, APP_ENV: "development", EMAIL_FROM: "t@example", ...extra };
}
let ipCounter = 0;
async function call(env, method, path, { body, cookie, origin = SITE, ip, raw, headers = {} } = {}) {
  const h = new Headers({ "cf-connecting-ip": ip || `10.0.0.${++ipCounter % 250}`, ...headers });
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
  assert.equal(r1.status, 200);
  const token = new URL(r1.json.devLink).searchParams.get("signin");
  const r2 = await call(env, "POST", "/v1/auth/magic-link/verify", { body: { token } });
  assert.equal(r2.status, 200, r2.text);
  const cookie = r2.headers.get("set-cookie").split(";")[0];
  return { cookie, user: r2.json.user, token };
}
function stripeSig(secret, payload, t = Math.floor(Date.now() / 1000)) {
  const sig = crypto.createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex");
  return `t=${t},v1=${sig}`;
}

test("health and security headers", async () => {
  const env = makeEnv();
  const r = await call(env, "GET", "/v1/health");
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("content-security-policy"), "default-src 'none'; frame-ancestors 'none'");
  assert.equal(r.headers.get("cache-control"), "no-store");
  assert.equal(r.headers.get("access-control-allow-origin"), SITE);
  const other = await call(env, "GET", "/v1/health", { origin: "https://evil.example" });
  assert.equal(other.headers.get("access-control-allow-origin"), null, "no CORS for other sites");
});

test("sign in with an emailed link, then sign out", async () => {
  const env = makeEnv();
  const { cookie, user, token } = await signIn(env, "Student@Example.com");
  assert.equal(user.email, "student@example.com", "email is normalized");
  assert.match(cookie, /^__Host-cs_session=[0-9a-f]{64}$/);
  const me = await call(env, "GET", "/v1/me", { cookie });
  assert.equal(me.json.user.email, "student@example.com");
  assert.equal(me.json.plan, "free");
  assert.deepEqual(me.json.features, ["sync"]);

  const reuse = await call(env, "POST", "/v1/auth/magic-link/verify", { body: { token } });
  assert.equal(reuse.status, 400, "a link works only once");

  const out = await call(env, "POST", "/v1/auth/logout", { cookie });
  assert.match(out.headers.get("set-cookie"), /Max-Age=0/);
  const after = await call(env, "GET", "/v1/me", { cookie });
  assert.equal(after.json.user, null, "session is gone after sign-out");
});

test("session cookie is Secure, HttpOnly and SameSite=Lax; only its hash is stored", async () => {
  const env = makeEnv();
  const r1 = await call(env, "POST", "/v1/auth/magic-link", { body: { email: "a@example.com" } });
  const r2 = await call(env, "POST", "/v1/auth/magic-link/verify", { body: { token: new URL(r1.json.devLink).searchParams.get("signin") } });
  const sc = r2.headers.get("set-cookie");
  for (const part of ["Secure", "HttpOnly", "SameSite=Lax", "Path=/"]) assert.ok(sc.includes(part), part);
  const value = sc.split(";")[0].split("=")[1];
  const rows = (await env.DB.prepare("SELECT token_hash FROM sessions").all()).results;
  assert.equal(rows.length, 1);
  assert.notEqual(rows[0].token_hash, value, "raw token is not stored");
});

test("expired links are refused and bad input is rejected", async () => {
  const env = makeEnv();
  const r1 = await call(env, "POST", "/v1/auth/magic-link", { body: { email: "b@example.com" } });
  await env.DB.prepare("UPDATE magic_links SET expires_at = 0").run();
  const r2 = await call(env, "POST", "/v1/auth/magic-link/verify", { body: { token: new URL(r1.json.devLink).searchParams.get("signin") } });
  assert.equal(r2.status, 400);
  assert.equal((await call(env, "POST", "/v1/auth/magic-link", { body: { email: "not-an-email" } })).status, 400);
  assert.equal((await call(env, "POST", "/v1/auth/magic-link/verify", { body: { token: "abc" } })).status, 400);
  assert.equal((await call(env, "POST", "/v1/auth/magic-link", { raw: "[1,2]", headers: { "content-type": "application/json" } })).status, 400);
});

test("sign-in email is required in production", async () => {
  const env = makeEnv({ APP_ENV: "production" });
  const r = await call(env, "POST", "/v1/auth/magic-link", { body: { email: "c@example.com" } });
  assert.equal(r.status, 503);
  assert.equal(r.json.devLink, undefined, "never leaks the link outside development");
});

test("writes from other sites are refused (CSRF)", async () => {
  const env = makeEnv();
  const { cookie } = await signIn(env, "d@example.com");
  const noOrigin = await call(env, "PUT", "/v1/progress/labs", { cookie, origin: null, body: { baseVersion: 0, body: {} } });
  assert.equal(noOrigin.status, 403);
  const evil = await call(env, "PUT", "/v1/progress/labs", { cookie, origin: "https://evil.example", body: { baseVersion: 0, body: {} } });
  assert.equal(evil.status, 403);
});

test("rate limits sign-in emails per address", async () => {
  const env = makeEnv();
  for (let i = 0; i < 5; i++) assert.equal((await call(env, "POST", "/v1/auth/magic-link", { body: { email: "e@example.com" } })).status, 200);
  const r = await call(env, "POST", "/v1/auth/magic-link", { body: { email: "e@example.com" } });
  assert.equal(r.status, 429);
});

test("progress sync with version checks, conflicts and limits", async () => {
  const env = makeEnv();
  const { cookie } = await signIn(env, "f@example.com");
  const a = await call(env, "PUT", "/v1/progress/cert:security-plus", { cookie, body: { baseVersion: 0, body: { checks: { "1-0": true } } } });
  assert.equal(a.status, 200); assert.equal(a.json.version, 1);
  const b = await call(env, "PUT", "/v1/progress/cert:security-plus", { cookie, body: { baseVersion: 1, body: { checks: { "1-0": true, "1-1": true } } } });
  assert.equal(b.json.version, 2);
  const stale = await call(env, "PUT", "/v1/progress/cert:security-plus", { cookie, body: { baseVersion: 1, body: { checks: {} } } });
  assert.equal(stale.status, 409, "stale version is a conflict");
  assert.equal(stale.json.version, 2);
  assert.deepEqual(stale.json.body.checks, { "1-0": true, "1-1": true }, "conflict returns the server copy");
  const again = await call(env, "PUT", "/v1/progress/cert:security-plus", { cookie, body: { baseVersion: 0, body: {} } });
  assert.equal(again.status, 409, "creating an existing doc is a conflict too");

  const list = await call(env, "GET", "/v1/progress", { cookie });
  assert.equal(list.json.docs.length, 1);
  assert.ok([400, 404].includes((await call(env, "PUT", "/v1/progress/cert:../../x", { cookie, body: { baseVersion: 0, body: {} } })).status), "path tricks are rejected");
  assert.equal((await call(env, "PUT", "/v1/progress/notes", { cookie, body: { baseVersion: 0, body: {} } })).status, 400);
  assert.equal((await call(env, "PUT", "/v1/progress/labs", { cookie, body: { baseVersion: 0, body: [1] } })).status, 400);
  const big = await call(env, "PUT", "/v1/progress/labs", { cookie, body: { baseVersion: 0, body: { x: "a".repeat(300 * 1024) } } });
  assert.equal(big.status, 413);

  const other = await signIn(env, "g@example.com");
  const theirs = await call(env, "GET", "/v1/progress", { cookie: other.cookie });
  assert.equal(theirs.json.docs.length, 0, "users never see each other's progress");
  assert.equal((await call(env, "GET", "/v1/progress")).status, 401);
});

test("Stripe webhooks: signature, Pro entitlement, duplicates, cancellation", async () => {
  const secret = "whsec_test";
  const env = makeEnv({ STRIPE_WEBHOOK_SECRET: secret });
  const { cookie, user } = await signIn(env, "h@example.com");
  const event = (id, type, status) => JSON.stringify({ id, type, data: { object: { id: "sub_1", customer: "cus_1", status, metadata: { user_id: user.id, plan: "pro" }, items: { data: [{ quantity: 1, current_period_end: Math.floor(Date.now() / 1000) + 86400 }] } } } });

  const forged = event("evt_x", "customer.subscription.created", "active");
  assert.equal((await call(env, "POST", "/v1/stripe/webhook", { raw: forged, origin: null, headers: { "stripe-signature": stripeSig("wrong", forged) } })).status, 400);
  const old = await call(env, "POST", "/v1/stripe/webhook", { raw: forged, origin: null, headers: { "stripe-signature": stripeSig(secret, forged, Math.floor(Date.now() / 1000) - 3600) } });
  assert.equal(old.status, 400, "old signatures are rejected (replay)");

  const created = event("evt_1", "customer.subscription.created", "active");
  assert.equal((await call(env, "POST", "/v1/stripe/webhook", { raw: created, origin: null, headers: { "stripe-signature": stripeSig(secret, created) } })).status, 200);
  let me = await call(env, "GET", "/v1/me", { cookie });
  assert.equal(me.json.plan, "pro");
  assert.ok(me.json.features.includes("pro_content"));

  const dup = await call(env, "POST", "/v1/stripe/webhook", { raw: created, origin: null, headers: { "stripe-signature": stripeSig(secret, created) } });
  assert.equal(dup.json.duplicate, true);

  const deleted = event("evt_2", "customer.subscription.deleted", "canceled");
  await call(env, "POST", "/v1/stripe/webhook", { raw: deleted, origin: null, headers: { "stripe-signature": stripeSig(secret, deleted) } });
  me = await call(env, "GET", "/v1/me", { cookie });
  assert.equal(me.json.plan, "free");
});

test("Pro content is gated and billing stays off until configured", async () => {
  const env = makeEnv();
  const { cookie, user } = await signIn(env, "i@example.com");
  assert.equal((await call(env, "GET", "/v1/content/security-plus/questions", { cookie })).status, 402);
  await env.DB.prepare("INSERT INTO subscriptions (stripe_subscription, stripe_customer, user_id, plan, status, seats, updated_at) VALUES ('sub_x','cus_x',?,'pro','active',1,0)").bind(user.id).run();
  assert.equal((await call(env, "GET", "/v1/content/security-plus/questions", { cookie })).status, 404, "no extra bank uploaded yet");
  await env.CONTENT.put("pro/security-plus.json", { questions: [] });
  assert.equal((await call(env, "GET", "/v1/content/security-plus/questions", { cookie })).status, 200);
  // The bundle path and capstones work the same way; names are restricted to [a-z0-9-].
  assert.equal((await call(env, "GET", "/v1/content/security-plus", { cookie })).status, 200);
  assert.equal((await call(env, "GET", "/v1/content/capstones", { cookie })).status, 404);
  await env.CONTENT.put("pro/capstones.json", { labs: [] });
  const cap = await call(env, "GET", "/v1/content/capstones", { cookie });
  assert.equal(cap.status, 200);
  assert.equal(cap.headers.get("cache-control"), "no-store");
  assert.equal((await call(env, "GET", "/v1/content/..%2Fsecrets", { cookie })).status, 404);
  const free = await signIn(env, "free@example.com");
  assert.equal((await call(env, "GET", "/v1/content/capstones", { cookie: free.cookie })).status, 402, "free accounts can't read capstones");
  assert.equal((await call(env, "GET", "/v1/content/capstones")).status, 401, "signed-out requests can't either");
  assert.equal((await call(env, "POST", "/v1/billing/checkout", { cookie, body: { plan: "pro" } })).status, 503);
});

test("organizations: seats, invites, cohorts, summary and tenant isolation", async () => {
  const env = makeEnv();
  const owner = await signIn(env, "owner@school.example");
  const org = (await call(env, "POST", "/v1/orgs", { cookie: owner.cookie, body: { name: "UTD Cohort Pilot" } })).json;
  assert.match(org.id, /^org_[0-9a-f]{24}$/);
  const cohort = (await call(env, "POST", `/v1/orgs/${org.id}/cohorts`, { cookie: owner.cookie, body: { name: "Fall Security+", certId: "security-plus", startDate: "2026-09-28" } })).json;
  const inv = (await call(env, "POST", `/v1/orgs/${org.id}/invites`, { cookie: owner.cookie, body: { role: "learner", cohortId: cohort.id, maxUses: 30 } })).json;
  assert.match(inv.code, /^[0-9a-f]{32}$/);

  const learner = await signIn(env, "learner@school.example");
  const noSeats = await call(env, "POST", `/v1/invites/${inv.code}/accept`, { cookie: learner.cookie });
  assert.equal(noSeats.status, 402, "no seats until a subscription or pilot seats exist");
  await env.DB.prepare("UPDATE orgs SET pilot_seats = 5 WHERE id = ?").bind(org.id).run();
  const ok = await call(env, "POST", `/v1/invites/${inv.code}/accept`, { cookie: learner.cookie });
  assert.equal(ok.status, 200, ok.text);
  assert.equal(ok.json.role, "learner");
  const me = await call(env, "GET", "/v1/me", { cookie: learner.cookie });
  assert.equal(me.json.plan, "org");

  await call(env, "PUT", "/v1/progress/cert:security-plus", { cookie: learner.cookie, body: { baseVersion: 0, body: { stats: { 1: { c: 8, t: 10 }, 2: { c: 1, t: 2 } }, checks: { "1-0": true, "1-1": true }, history: [{ score: 9, total: 10 }] } } });
  await call(env, "PUT", "/v1/progress/labs", { cookie: learner.cookie, body: { baseVersion: 0, body: { "lab-home-lab": { done: 1, notes: "PRIVATE NOTE", steps: { 0: true } } } } });

  const sum = await call(env, "GET", `/v1/cohorts/${cohort.id}/summary`, { cookie: owner.cookie });
  assert.equal(sum.status, 200);
  const row = sum.json.learners[0];
  assert.equal(row.email, "learner@school.example");
  assert.equal(row.answered, 12); assert.equal(row.accuracy, 75); assert.equal(row.labsDone, 1); assert.equal(row.daysChecked, 2); assert.equal(row.lastScore, 90);
  assert.ok(!sum.text.includes("PRIVATE NOTE"), "instructors never see lab notes");

  assert.equal((await call(env, "GET", `/v1/cohorts/${cohort.id}/summary`, { cookie: learner.cookie })).status, 403, "learners can't see the summary");
  const stranger = await signIn(env, "other@corp.example");
  assert.equal((await call(env, "GET", `/v1/cohorts/${cohort.id}/summary`, { cookie: stranger.cookie })).status, 404, "other orgs can't even see it exists");
  assert.equal((await call(env, "GET", `/v1/orgs/${org.id}/cohorts`, { cookie: stranger.cookie })).status, 404);
  assert.equal((await call(env, "POST", `/v1/orgs/${org.id}/invites`, { cookie: learner.cookie, body: {} })).status, 403, "learners can't invite");
});

test("CSV export neutralizes spreadsheet formulas", async () => {
  const { summaryCsv } = await import("../src/orgs.js");
  const csv = summaryCsv({ learners: [{ email: "=HYPERLINK(\"http://x\")@a.b", answered: 1, accuracy: 100, daysChecked: 0, labsDone: 0, labsStarted: 0, lastScore: null, lastActive: null }] });
  assert.ok(csv.includes(`"'=HYPERLINK(""http://x"")@a.b"`), csv);
});

test("export and delete my account", async () => {
  const env = makeEnv();
  const { cookie } = await signIn(env, "j@example.com");
  await call(env, "PUT", "/v1/progress/labs", { cookie, body: { baseVersion: 0, body: { "lab-home-lab": { done: 1 } } } });
  const exp = await call(env, "GET", "/v1/account/export", { cookie });
  assert.equal(exp.status, 200);
  assert.equal(exp.json.user.email, "j@example.com");
  assert.equal(exp.json.progress.length, 1);
  assert.equal((await call(env, "DELETE", "/v1/account", { cookie, body: { confirm: "wrong@example.com" } })).status, 400);
  const del = await call(env, "DELETE", "/v1/account", { cookie, body: { confirm: "j@example.com" } });
  assert.equal(del.status, 200);
  assert.equal((await env.DB.prepare("SELECT COUNT(*) AS n FROM progress_docs").first()).n, 0, "progress deleted");
  assert.equal((await env.DB.prepare("SELECT COUNT(*) AS n FROM users").first()).n, 0);
  assert.equal((await call(env, "GET", "/v1/me", { cookie })).json.user, null);
});

test("unknown routes and methods return 404 JSON", async () => {
  const env = makeEnv();
  const r = await call(env, "GET", "/nope");
  assert.equal(r.status, 401, "non-public routes need sign-in first");
  const { cookie } = await signIn(env, "k@example.com");
  assert.equal((await call(env, "GET", "/v1/nope", { cookie })).status, 404);
});
