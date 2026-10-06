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
  assert.ok(Object.keys(off.member).every(k => k.startsWith("member/teacher/")), "without accounts only the teacher editions stay private");
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

test("one-lesson, one-lab and exit-ticket assignments; students answer exit tickets and only the teacher sees them", async () => {
  const env = makeEnv();
  const meta = (await import("../src/cert-meta.js")).default["security-plus"];
  const { lessonKeyOf } = await import("../src/classes.js");
  const key = meta.lessons[0];
  await env.CONTENT.put("member/teacher/security-plus.json", JSON.stringify({ id: "security-plus", plans: [{ t: "Control categories: technical, managerial, operational, physical", exit: [["Q1?", "A1"], ["Q2?", "A2"]] }] }));
  assert.equal(lessonKeyOf("Control categories: technical, managerial, operational, physical"), key, "lesson keys match cert-meta");
  const t = await signIn(env, "t.exit@example.com"), st = await signIn(env, "s.exit@example.com"), other = await signIn(env, "o.exit@example.com");
  const cls = (await call(env, "POST", "/v1/classes", { cookie: t.cookie, body: { name: "Sec+ A", teacherName: "Ms. K", certId: "security-plus" } })).json;
  await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: st.cookie, body: { displayName: "Ana", consent: true } });
  const mk = body => call(env, "POST", `/v1/classes/${cls.id}/assignments`, { cookie: t.cookie, body: { certId: "security-plus", ...body } });
  assert.equal((await mk({ title: "Bad", kind: "lesson", item: "lnotreal" })).status, 400);
  assert.equal((await mk({ title: "Bad lab", kind: "lab", item: "x" })).status, 400);
  const lesson = (await mk({ title: "Read it", kind: "lesson", item: key })).json;
  const lab = (await mk({ title: "Lab", kind: "lab", item: "lab-linux-cli" })).json;
  const exit = (await mk({ title: "Exit", kind: "exit", item: key })).json;
  assert.equal(lesson.item, key); assert.equal(exit.kind, "exit"); assert.equal(lab.target, 1);
  assert.equal((await mk({ title: "No plan", kind: "exit", item: meta.lessons[1] })).json.error, "no_exit_ticket");

  // The student sees questions only, answers, then sees it done; an outsider can't see it.
  const q = await call(env, "GET", `/v1/classes/${cls.id}/assignments/${exit.id}/exit`, { cookie: st.cookie });
  assert.deepEqual(q.json.questions, ["Q1?", "Q2?"]);
  assert.ok(!/A1/.test(q.text), "no expected answers for students");
  assert.equal((await call(env, "GET", `/v1/classes/${cls.id}/assignments/${exit.id}/exit`, { cookie: other.cookie })).status, 404);
  assert.equal((await call(env, "POST", `/v1/classes/${cls.id}/assignments/${exit.id}/exit`, { cookie: st.cookie, body: { answers: ["one"] } })).status, 400);
  assert.equal((await call(env, "POST", `/v1/classes/${cls.id}/assignments/${exit.id}/exit`, { cookie: st.cookie, body: { answers: ["my one", "my two"] } })).status, 200);
  const mine = (await call(env, "GET", "/v1/classes", { cookie: st.cookie })).json.joined[0].assignments;
  assert.equal(mine.find(a => a.id === exit.id).done, true);
  assert.equal(mine.find(a => a.id === lesson.id).done, false);

  // Reading the lesson and finishing the lab (synced progress) mark those done.
  await call(env, "PUT", "/v1/progress/cert:security-plus", { cookie: st.cookie, body: { baseVersion: 0, body: { read: { [key]: 1 } } } });
  await call(env, "PUT", "/v1/progress/labs", { cookie: st.cookie, body: { baseVersion: 0, body: { "lab-linux-cli": { done: true } } } });
  const again = (await call(env, "GET", "/v1/classes", { cookie: st.cookie })).json.joined[0].assignments;
  assert.ok(again.find(a => a.id === lesson.id).done && again.find(a => a.id === lab.id).done);

  // The teacher sees answers next to the expected ones; the roster doesn't list which lessons were read.
  const res = (await call(env, "GET", `/v1/classes/${cls.id}/assignments/${exit.id}/results`, { cookie: t.cookie })).json;
  assert.equal(res.students[0].answers[1], "my two");
  assert.equal(res.questions[0].expected, "A1");
  assert.equal((await call(env, "GET", `/v1/classes/${cls.id}/assignments/${exit.id}/results`, { cookie: st.cookie })).status, 404);
  const roster = await call(env, "GET", `/v1/classes/${cls.id}/roster`, { cookie: t.cookie });
  assert.ok(!roster.text.includes(key) || roster.text.split(key).length - 1 === 2, "only the assignment items mention the key");
  assert.equal(roster.json.assignments.find(a => a.id === exit.id).done, 1);

  // Leaving the class removes the student's answers.
  await call(env, "DELETE", `/v1/classes/${cls.id}/membership`, { cookie: st.cookie });
  assert.equal((await env.DB.prepare("SELECT COUNT(*) AS n FROM exit_responses").first()).n, 0);
});

test("study groups: start, join with consent, see each other's numbers, leave; owner hand-over", async () => {
  const env = makeEnv();
  const a = await signIn(env, "g.a@example.com"), b = await signIn(env, "g.b@example.com"), c = await signIn(env, "g.c@example.com");
  assert.equal((await call(env, "POST", "/v1/groups", { cookie: a.cookie, body: { name: "Crew", certId: "nope", displayName: "Ana" } })).status, 400);
  const g = (await call(env, "POST", "/v1/groups", { cookie: a.cookie, body: { name: "Crew", certId: "security-plus", displayName: "Ana" } })).json;
  assert.match(g.code, /^[a-km-np-z2-9]{10}$/);
  assert.equal((await call(env, "GET", `/v1/groups/join/${g.code}`, { cookie: b.cookie })).json.group.members, 1);
  assert.equal((await call(env, "POST", `/v1/groups/join/${g.code}`, { cookie: b.cookie, body: { displayName: "Ben" } })).json.error, "consent_required");
  await call(env, "POST", `/v1/groups/join/${g.code}`, { cookie: b.cookie, body: { displayName: "Ben", consent: true } });
  await call(env, "PUT", "/v1/progress/cert:security-plus", { cookie: b.cookie, body: { baseVersion: 0, body: { stats: { 1: { c: 8, t: 10 } } } } });
  const board = (await call(env, "GET", "/v1/groups", { cookie: a.cookie })).json.groups[0];
  assert.deepEqual(board.members.map(m => m.displayName), ["Ana", "Ben"]);
  assert.equal(board.members[1].answered, 10);
  assert.ok(!JSON.stringify(board).includes("g.b@example.com"), "no emails on the board");
  assert.equal((await call(env, "GET", "/v1/groups", { cookie: c.cookie })).json.groups.length, 0, "outsiders see nothing");
  // The owner leaves: Ben owns it now and can make a new code; the old code stops working.
  await call(env, "DELETE", `/v1/groups/${g.id}/membership`, { cookie: a.cookie });
  const code2 = (await call(env, "POST", `/v1/groups/${g.id}/code`, { cookie: b.cookie })).json.code;
  assert.ok(code2 && code2 !== g.code);
  assert.equal((await call(env, "GET", `/v1/groups/join/${g.code}`, { cookie: c.cookie })).status, 404);
  // The last one out closes the group.
  await call(env, "DELETE", `/v1/groups/${g.id}/membership`, { cookie: b.cookie });
  assert.equal((await env.DB.prepare("SELECT COUNT(*) AS n FROM study_groups").first()).n, 0);
});

test("reminders, exam countdown and What's new go out at the right local time, once", async () => {
  sent.length = 0;
  const notify = await import("../src/notify.js");
  const env = makeEnv({ EMAIL_API_KEY: "re_test", IP_HASH_KEY: "k".repeat(64) });
  env.EMAIL_API_KEY = undefined; const u = await signIn(env, "rem@example.com"); env.EMAIL_API_KEY = "re_test";
  // 18:00 in New York on a Wednesday = 22:00 UTC (EDT) on 2026-10-07.
  const t = Date.parse("2026-10-07T22:30:00Z");
  await call(env, "PUT", "/v1/profile", { cookie: u.cookie, body: { remind: "weekdays", remindHour: 18, tz: "America/New_York", goalCert: "security-plus", examDate: "2026-10-14", countdown: true } });
  assert.equal((await call(env, "PUT", "/v1/profile", { cookie: u.cookie, body: { tz: "Mars/Olympus" } })).status, 400);
  assert.equal((await notify.sendScheduledEmails(env, t - 3600e3)).sent, 0, "not before the chosen hour");
  assert.equal((await notify.sendScheduledEmails(env, t)).sent, 1);
  const m = sent.filter(s => s.email).pop().email;
  assert.match(m.subject, /Time to study: CompTIA Security\+/);
  assert.match(m.text, /7 days until your exam/);
  assert.equal((await notify.sendScheduledEmails(env, t + 60e3)).sent, 0, "once a day");
  // Countdown: 9 a.m. local, a week before (2026-10-07 is 7 days before 10-14).
  const nine = Date.parse("2026-10-07T13:10:00Z");
  assert.equal((await notify.sendScheduledEmails(env, nine)).sent, 1);
  assert.match(sent.filter(s => s.email).pop().email.subject, /One week until/);
  assert.equal((await notify.sendScheduledEmails(env, nine + 60e3)).sent, 0);
  // Saturday: no weekday reminder.
  assert.equal((await notify.sendScheduledEmails(env, Date.parse("2026-10-10T22:30:00Z"))).sent, 0);
  // Unsubscribing turns them all off.
  const unsubUrl = m.headers["List-Unsubscribe"].slice(1, -1).replace("https://api.study.example", "");
  await call(env, "POST", unsubUrl, { origin: null });
  const pr = (await call(env, "GET", "/v1/profile", { cookie: u.cookie })).json;
  assert.equal(pr.remind, "off"); assert.equal(pr.countdown, false); assert.equal(pr.news, false);
});

test("success stories: shown only with the member's permission and after the owner approves; withdrawing removes them", async () => {
  const env = makeEnv({ ADMIN_EMAILS: "owner@example.com" });
  const amy = (await signIn(env, "amy@example.com")).cookie, owner = (await signIn(env, "owner@example.com")).cookie;
  const today = new Date().toISOString().slice(0, 10);
  assert.equal((await call(env, "POST", "/v1/stories", { cookie: amy, body: { certId: "nope", passedOn: today, quote: "Lessons every day and a practice exam weekly.", publish: true } })).json.error, "invalid_cert");
  assert.equal((await call(env, "POST", "/v1/stories", { cookie: amy, body: { certId: "security-plus", passedOn: today, quote: "short", publish: true } })).json.error, "invalid_quote");
  assert.equal((await call(env, "POST", "/v1/stories", { cookie: amy, body: { certId: "security-plus", passedOn: today, quote: "See https://example.com for my notes, it helped.", publish: true } })).json.error, "invalid_quote");
  const saved = await call(env, "POST", "/v1/stories", { cookie: amy, body: { certId: "security-plus", passedOn: today, quote: "Two lessons a day and a practice exam every Sunday.", shownAs: "Amy R.", publish: true } });
  assert.equal(saved.status, 200); assert.equal(saved.json.status, "pending");
  assert.equal((await call(env, "GET", "/v1/stories")).json.stories.length, 0, "pending stories aren't public");
  assert.equal((await call(env, "GET", "/v1/admin/stories", { cookie: amy })).status, 403);
  assert.equal((await call(env, "POST", `/v1/admin/stories/${saved.json.id}`, { cookie: amy, body: { status: "approved" } })).status, 403);
  assert.equal((await call(env, "GET", "/v1/admin/stories", { cookie: owner })).json.stories.length, 1);
  assert.equal((await call(env, "POST", `/v1/admin/stories/${saved.json.id}`, { cookie: owner, body: { status: "approved" } })).status, 200);
  const pub = (await call(env, "GET", "/v1/stories?cert=security-plus")).json.stories;
  assert.equal(pub.length, 1); assert.equal(pub[0].shownAs, "Amy R.");
  assert.ok(!("userId" in pub[0]) && !JSON.stringify(pub).includes("amy@example.com"), "no account details in public stories");
  // Editing sends it back for approval.
  await call(env, "POST", "/v1/stories", { cookie: amy, body: { certId: "security-plus", passedOn: today, quote: "Two lessons a day, labs on weekends, practice exams.", shownAs: "Amy R.", publish: true } });
  assert.equal((await call(env, "GET", "/v1/stories")).json.stories.length, 0);
  // Private stories never reach the owner's queue.
  await call(env, "POST", "/v1/stories", { cookie: amy, body: { certId: "network-plus", passedOn: today, quote: "Subnetting drills every morning for a month.", publish: false } });
  assert.equal((await call(env, "GET", "/v1/admin/stories", { cookie: owner })).json.stories.length, 1);
  const mine = (await call(env, "GET", "/v1/stories/mine", { cookie: amy })).json.stories;
  assert.equal(mine.length, 2);
  assert.equal((await call(env, "DELETE", `/v1/stories/${saved.json.id}`, { cookie: owner })).status, 404, "only the author can delete");
  assert.equal((await call(env, "DELETE", `/v1/stories/${saved.json.id}`, { cookie: amy })).status, 200);
  assert.equal((await call(env, "GET", "/v1/stories/mine", { cookie: amy })).json.stories.length, 1);
});
