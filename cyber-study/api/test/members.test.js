/* Members' lessons, text-message sign-in codes and the welcome emails. Twilio and Resend are stubbed at fetch().
   Run: npm run test:api */
process.removeAllListeners("warning");
const test = require("node:test");
const assert = require("node:assert/strict");
const { createD1, createR2 } = require("./d1-shim.js");

const SITE = "https://study.example";
let worker, welcome;
const sent = [];
const realFetch = globalThis.fetch;
test.before(async () => {
  worker = (await import("../src/index.js")).default;
  welcome = await import("../src/welcome.js");
  globalThis.fetch = async (url, init = {}) => {
    const u = String(typeof url === "string" ? url : url.url);
    if (u.startsWith("https://api.twilio.com/")) { sent.push({ sms: Object.fromEntries(new URLSearchParams(String(init.body))), auth: new Headers(init.headers).get("authorization") }); return new Response(JSON.stringify({ sid: "SM1" }), { status: 201 }); }
    if (u.startsWith("https://api.resend.com/")) { sent.push({ email: JSON.parse(init.body) }); return new Response(JSON.stringify({ id: "em_1" }), { status: 200 }); }
    return realFetch(url, init);
  };
});
test.after(() => { globalThis.fetch = realFetch; });

const TWILIO = { TWILIO_ACCOUNT_SID: "AC123", TWILIO_AUTH_TOKEN: "tok", TWILIO_FROM: "+15550000000" };
const makeEnv = (extra = {}) => ({ DB: createD1(), CONTENT: createR2(), SITE_ORIGIN: SITE, API_ORIGIN: "https://api.study.example", APP_ENV: "development", EMAIL_FROM: "t@example", ...extra });
let ipN = 0;
async function call(env, method, path, { body, cookie, origin = SITE } = {}) {
  const h = new Headers({ "cf-connecting-ip": `10.7.0.${++ipN % 250}` });
  if (origin) h.set("origin", origin);
  if (cookie) h.set("cookie", cookie);
  if (body !== undefined) h.set("content-type", "application/json");
  const res = await worker.fetch(new Request("https://api.study.example" + path, { method, headers: h, body: body !== undefined ? JSON.stringify(body) : undefined }), env);
  const text = await res.text();
  let json = null; try { json = JSON.parse(text); } catch (e) {}
  return { status: res.status, json, text, headers: res.headers };
}
async function signIn(env, email) {
  const r1 = await call(env, "POST", "/v1/auth/magic-link", { body: { email } });
  const token = new URL(r1.json.devLink).searchParams.get("signin");
  const res = await worker.fetch(new Request("https://api.study.example/v1/auth/magic-link/verify", { method: "POST", headers: { origin: SITE, "content-type": "application/json", "cf-connecting-ip": "10.7.9.9" }, body: JSON.stringify({ token }) }), env);
  const j = await res.json();
  return { cookie: res.headers.get("set-cookie").split(";")[0], user: j.user };
}

test("lessons past the free sample go only to signed-in accounts", async () => {
  const env = makeEnv();
  await env.CONTENT.put("member/lessons/security-plus.json", JSON.stringify({ id: "security-plus", lang: "en", lessons: [{ t: "Topic", body: ["Full text"] }] }));
  await env.CONTENT.put("member/lessons-es/security-plus.json", JSON.stringify({ id: "security-plus", lang: "es", lessons: [{ t: "Topic", tt: "Tema", body: ["Texto"] }] }));
  assert.equal((await call(env, "GET", "/v1/content/lessons/security-plus")).status, 401);
  const { cookie } = await signIn(env, "free@example.com");
  const r = await call(env, "GET", "/v1/content/lessons/security-plus", { cookie });
  assert.equal(r.status, 200);
  assert.equal(r.json.lessons[0].body[0], "Full text");
  assert.equal(r.headers.get("cache-control"), "no-store");
  assert.equal((await call(env, "GET", "/v1/content/lessons/security-plus?lang=es", { cookie })).json.lang, "es");
  assert.equal((await call(env, "GET", "/v1/content/lessons/no-such-cert", { cookie })).status, 404);
  assert.equal((await call(env, "GET", "/v1/content/lessons/..%2Fpro%2Fx", { cookie })).status, 404);
});

test("the lesson split keeps the free sample whole and only the opening of the rest", () => {
  const split = require("../../tools/lesson-split.js");
  const on = split.split("https://api.example.com"), off = split.split("");
  const load = text => { let got; new Function("CertHub", text)({ addLessons: (id, list) => { got = list; } }); return got; };
  const pub = load(on.public["public/data/lessons/security-plus.js"]), full = load(off.public["public/data/lessons/security-plus.js"]);
  assert.ok(pub.length === full.length && pub.length > split.FREE);
  pub.slice(0, split.FREE).forEach((l, i) => assert.deepEqual(l, full[i]));
  pub.slice(split.FREE).forEach(l => { assert.equal(l.locked, true); assert.ok(l.body.length <= 1); assert.equal(l.terms, undefined); assert.equal(l.check, undefined); });
  const member = JSON.parse(on.member["member/lessons/security-plus.json"]);
  assert.equal(member.lessons.length, full.length - split.FREE);
  assert.ok(member.lessons.every(l => !l.locked && l.check));
  assert.equal(Object.keys(off.member).length, 0);
  // Spanish locks the same topics as English.
  const es = load(on.public["public/data/lessons-es/security-plus.js"]);
  assert.deepEqual(es.filter(l => !l.locked).map(l => l.t), pub.filter(l => !l.locked).map(l => l.t));
});

test("adding a mobile number needs a texted code, and only US/Canada numbers by default", async () => {
  sent.length = 0;
  const env = makeEnv({ ...TWILIO });
  // Make the account with development sign-in, then switch to production with email on.
  const { cookie } = await signIn(env, "sms@example.com");
  Object.assign(env, { APP_ENV: "production", EMAIL_API_KEY: "re_test" });
  assert.equal((await call(env, "POST", "/v1/account/sms", { cookie, body: { phone: "+44 7700 900123" } })).json.error, "sms_country");
  assert.equal((await call(env, "POST", "/v1/account/sms", { cookie, body: { phone: "12345" } })).status, 400);
  const r = await call(env, "POST", "/v1/account/sms", { cookie, body: { phone: "(555) 123-4567" } });
  assert.equal(r.status, 200);
  assert.equal(r.json.devCode, undefined, "no code in the response outside development");
  const text = sent.find(s => s.sms);
  assert.equal(text.sms.To, "+15551234567");
  assert.equal(text.auth, "Basic " + Buffer.from("AC123:tok").toString("base64"));
  const code = text.sms.Body.match(/\d{6}/)[0];
  const wrong = code === "000000" ? "111111" : "000000";
  assert.equal((await call(env, "POST", "/v1/account/sms/confirm", { cookie, body: { code: wrong } })).status, 400);
  const ok = await call(env, "POST", "/v1/account/sms/confirm", { cookie, body: { code } });
  assert.equal(ok.json.smsPhone, "•••• 4567");
  assert.ok(sent.some(s => s.email && /phone number was added/.test(s.email.subject)), "the owner is told by email");
  const pr = await call(env, "GET", "/v1/profile", { cookie });
  assert.equal(pr.json.smsPhone, "•••• 4567");
  assert.equal(pr.json.sms, true);
});

test("signing in with a texted code; the same answer for unknown addresses; codes allow five guesses", async () => {
  const env = makeEnv();
  const { cookie } = await signIn(env, "texter@example.com");
  const add = await call(env, "POST", "/v1/account/sms", { cookie, body: { phone: "5551230000" } });
  await call(env, "POST", "/v1/account/sms/confirm", { cookie, body: { code: add.json.devCode } });

  const none = await call(env, "POST", "/v1/auth/sms/start", { body: { email: "nobody@example.com" } });
  assert.deepEqual(none.json, { sent: true });
  const start = await call(env, "POST", "/v1/auth/sms/start", { body: { email: "Texter@Example.com" } });
  assert.equal(start.json.sent, true);
  assert.match(start.json.devCode, /^\d{6}$/);
  const wrong = start.json.devCode === "000000" ? "111111" : "000000";
  for (let i = 0; i < 5; i++) assert.equal((await call(env, "POST", "/v1/auth/sms/verify", { body: { email: "texter@example.com", code: wrong } })).status, 400);
  // Five wrong guesses use the code up, even the right one fails now.
  assert.equal((await call(env, "POST", "/v1/auth/sms/verify", { body: { email: "texter@example.com", code: start.json.devCode } })).status, 400);

  const again = await call(env, "POST", "/v1/auth/sms/start", { body: { email: "texter@example.com" } });
  const v = await call(env, "POST", "/v1/auth/sms/verify", { body: { email: "texter@example.com", code: again.json.devCode } });
  assert.equal(v.status, 200);
  assert.equal(v.json.user.email, "texter@example.com");
  assert.match(v.headers.get("set-cookie"), /__Host-cs_session=/);
  // A code works once.
  assert.equal((await call(env, "POST", "/v1/auth/sms/verify", { body: { email: "texter@example.com", code: again.json.devCode } })).status, 400);

  // Removing the number turns it off.
  await call(env, "DELETE", "/v1/account/sms", { cookie });
  assert.equal((await call(env, "POST", "/v1/auth/sms/start", { body: { email: "texter@example.com" } })).json.devCode, undefined);
});

test("texted sign-in codes are rate limited per address", async () => {
  const env = makeEnv();
  let last;
  for (let i = 0; i < 6; i++) last = await call(env, "POST", "/v1/auth/sms/start", { body: { email: "limit@example.com" } });
  assert.equal(last.status, 429);
});

test("text messages are off in production until Twilio is set up", async () => {
  const env = makeEnv({ APP_ENV: "production" });
  assert.equal((await call(env, "GET", "/v1/me")).json.sms, false);
  assert.equal((await call(env, "POST", "/v1/auth/sms/start", { body: { email: "a@example.com" } })).status, 503);
  assert.equal((await call(env, "GET", "/v1/me")).json.user, null);
});

test("welcome emails go out on days 1, 3 and 7, once each, with a working unsubscribe", async () => {
  sent.length = 0;
  const env = makeEnv({ EMAIL_API_KEY: "re_test", IP_HASH_KEY: "k".repeat(64) });
  env.EMAIL_API_KEY = undefined; // development sign-in, then switch email on
  const a = await signIn(env, "new@example.com");
  await call(env, "PUT", "/v1/profile", { cookie: a.cookie, body: { displayName: "Ana Lopez", goalCert: "security-plus" } });
  const b = await signIn(env, "quiet@example.com");
  await call(env, "PUT", "/v1/profile", { cookie: b.cookie, body: { emailTips: false } });
  env.EMAIL_API_KEY = "re_test";
  const t0 = (await env.DB.prepare("SELECT created_at FROM users WHERE email = ?").bind("new@example.com").first()).created_at;
  const H = 3600e3;

  assert.equal((await welcome.sendWelcomeEmails(env, t0 + 12 * H)).sent, 0, "nothing on the first day");
  const d1 = await welcome.sendWelcomeEmails(env, t0 + 25 * H);
  assert.equal(d1.sent, 1, "only the account with study tips on");
  const mail = sent.filter(s => s.email).pop().email;
  assert.equal(mail.to[0], "new@example.com");
  assert.match(mail.subject, /CompTIA Security\+ study plan/);
  assert.match(mail.text, /^Hi Ana,/);
  assert.match(mail.text, /https:\/\/study\.example\/security-plus\//);
  assert.match(mail.headers["List-Unsubscribe"], /^<https:\/\/api\.study\.example\/v1\/email\/unsubscribe\?u=usr_[0-9a-f]{24}&t=[0-9a-f]{32}>$/);
  assert.equal(mail.headers["List-Unsubscribe-Post"], "List-Unsubscribe=One-Click");
  assert.equal((await welcome.sendWelcomeEmails(env, t0 + 26 * H)).sent, 0, "not twice");
  assert.equal((await welcome.sendWelcomeEmails(env, t0 + 73 * H)).sent, 1, "day 3");

  // GET shows a button and changes nothing; a bad signature is refused; POST unsubscribes.
  const link = mail.headers["List-Unsubscribe"].slice(1, -1).replace("https://api.study.example", "");
  const page = await call(env, "GET", link, { origin: null });
  assert.equal(page.status, 200);
  assert.match(page.text, /<form method="post"/);
  assert.equal((await call(env, "GET", "/v1/profile", { cookie: a.cookie })).json.emailTips, true);
  assert.equal((await call(env, "POST", link.replace(/t=[0-9a-f]{4}/, "t=ffff"), { origin: null })).status, 400);
  const done = await call(env, "POST", link, { origin: null });
  assert.equal(done.status, 200);
  assert.match(done.text, /unsubscribed/);
  assert.equal((await call(env, "GET", "/v1/profile", { cookie: a.cookie })).json.emailTips, false);
  assert.equal((await welcome.sendWelcomeEmails(env, t0 + 7.1 * 24 * H)).sent, 0, "no more after unsubscribing");
});

test("accounts from before the series, and ones that missed an email by a week, aren't sent old emails", async () => {
  sent.length = 0;
  const env = makeEnv({ EMAIL_API_KEY: "re_test", IP_HASH_KEY: "k".repeat(64) });
  env.EMAIL_API_KEY = undefined; await signIn(env, "late@example.com"); env.EMAIL_API_KEY = "re_test";
  const t0 = (await env.DB.prepare("SELECT created_at FROM users WHERE email = ?").bind("late@example.com").first()).created_at;
  const r = await welcome.sendWelcomeEmails(env, t0 + 30 * 24 * 3600e3);
  assert.equal(r.sent, 0);
  assert.equal((await env.DB.prepare("SELECT welcome_step FROM users WHERE email = ?").bind("late@example.com").first()).welcome_step, 3);
});

test("teacher editions go only to teacher accounts, and /v1/me says who is a teacher", async () => {
  const env = makeEnv();
  await env.CONTENT.put("member/teacher/security-plus.json", JSON.stringify({ id: "security-plus", plans: [{ t: "Topic", objectives: ["x"] }] }));
  const { cookie } = await signIn(env, "student.t@example.com");
  assert.equal((await call(env, "GET", "/v1/content/teacher/security-plus")).status, 401);
  const no = await call(env, "GET", "/v1/content/teacher/security-plus", { cookie });
  assert.equal(no.status, 403);
  assert.equal(no.json.error, "teacher_only");
  assert.equal((await call(env, "GET", "/v1/me", { cookie })).json.teacher, undefined);
  await call(env, "PUT", "/v1/profile", { cookie, body: { role: "teacher" } });
  assert.equal((await call(env, "GET", "/v1/me", { cookie })).json.teacher, true);
  const yes = await call(env, "GET", "/v1/content/teacher/security-plus", { cookie });
  assert.equal(yes.status, 200);
  assert.equal(yes.json.plans[0].t, "Topic");
  assert.equal((await call(env, "GET", "/v1/content/teacher/no-such-cert", { cookie })).status, 404);
});

test("teacher plans are built only into the private bundles, never the public files", () => {
  const split = require("../../tools/lesson-split.js");
  if (!split.teacherIds().length) return;
  const res = split.split("https://api.example.com");
  const id = split.teacherIds()[0];
  assert.ok(res.member[`member/teacher/${id}.json`]);
  assert.ok(!Object.keys(res.public).some(k => k.includes("teacher")));
  assert.ok(!Object.values(res.public).some(t => /"objectives"/.test(t)));
});
