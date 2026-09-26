/* Class mode: teachers, join codes, consent, leaving, roster summaries and access control.
   Run: npm run test:api */
process.removeAllListeners("warning");
const test = require("node:test");
const assert = require("node:assert/strict");
const { createD1, createR2 } = require("./d1-shim.js");

const SITE = "https://study.example";
let worker, classes, META;
test.before(async () => {
  worker = (await import("../src/index.js")).default;
  classes = await import("../src/classes.js");
  META = (await import("../src/cert-meta.js")).default;
});

const makeEnv = () => ({ DB: createD1(), CONTENT: createR2(), SITE_ORIGIN: SITE, APP_ENV: "development", EMAIL_FROM: "t@example" });
let ipCounter = 0;
async function call(env, method, path, { body, cookie, origin = SITE } = {}) {
  const h = new Headers({ "cf-connecting-ip": `10.1.0.${++ipCounter % 250}` });
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
  const r2 = await call(env, "POST", "/v1/auth/magic-link/verify", { body: { token } });
  assert.equal(r2.status, 200, r2.text);
  return { cookie: r2.headers.get("set-cookie").split(";")[0], user: r2.json.user };
}
const put = (env, cookie, key, body) => call(env, "PUT", `/v1/progress/${key}`, { cookie, body: { baseVersion: 0, body } });

async function setup() {
  const env = makeEnv();
  const teacher = await signIn(env, "teacher@school.example");
  const created = await call(env, "POST", "/v1/classes", { cookie: teacher.cookie, body: { name: "Period 3 Security+", teacherName: "Ms. Rivera", certId: "security-plus" } });
  assert.equal(created.status, 200, created.text);
  return { env, teacher, cls: created.json };
}

test("join codes are long, random and from the strict alphabet", () => {
  const seen = new Set();
  for (let i = 0; i < 500; i++) {
    const c = classes.newJoinCode();
    assert.match(c, classes.CODE_RE);
    assert.ok(c.length >= 8);
    seen.add(c);
  }
  assert.equal(seen.size, 500, "no repeats");
});

test("create a class (free account), list it, rename it, rotate the code, and the 20-class limit", async () => {
  const { env, teacher, cls } = await setup();
  assert.match(cls.id, /^cls_[0-9a-f]{24}$/);
  assert.match(cls.code, /^[a-km-np-z2-9]{10}$/);
  assert.equal(cls.teacherName, "Ms. Rivera");
  const me = await call(env, "GET", "/v1/me", { cookie: teacher.cookie });
  assert.equal(me.json.plan, "free", "no Pro needed to teach");

  const list = await call(env, "GET", "/v1/classes", { cookie: teacher.cookie });
  assert.equal(list.json.teaching.length, 1);
  assert.equal(list.json.teaching[0].code, cls.code);
  assert.deepEqual(list.json.joined, []);

  const renamed = await call(env, "PUT", `/v1/classes/${cls.id}`, { cookie: teacher.cookie, body: { name: "  Period 4\u0000 Security+  " } });
  assert.equal(renamed.status, 200, renamed.text);
  assert.equal(renamed.json.name, "Period 4 Security+", "control characters and extra spaces are removed");
  assert.equal((await call(env, "PUT", `/v1/classes/${cls.id}`, { cookie: teacher.cookie, body: { name: "" } })).status, 400);
  assert.equal((await call(env, "PUT", `/v1/classes/${cls.id}`, { cookie: teacher.cookie, body: { name: "x".repeat(81) } })).status, 400);
  assert.equal((await call(env, "PUT", `/v1/classes/${cls.id}`, { cookie: teacher.cookie, body: { certId: "../etc" } })).status, 400);

  const rot = await call(env, "POST", `/v1/classes/${cls.id}/code`, { cookie: teacher.cookie, body: {} });
  assert.equal(rot.status, 200);
  assert.notEqual(rot.json.code, cls.code);
  const student = await signIn(env, "s@school.example");
  assert.equal((await call(env, "GET", `/v1/classes/join/${cls.code}`, { cookie: student.cookie })).status, 404, "the old code stops working");
  assert.equal((await call(env, "GET", `/v1/classes/join/${rot.json.code}`, { cookie: student.cookie })).status, 200);

  for (let i = 1; i < 20; i++) assert.equal((await call(env, "POST", "/v1/classes", { cookie: teacher.cookie, body: { name: `Class ${i}`, teacherName: "Ms. Rivera" } })).status, 200);
  const over = await call(env, "POST", "/v1/classes", { cookie: teacher.cookie, body: { name: "One too many", teacherName: "Ms. Rivera" } });
  assert.equal(over.status, 409);
  assert.equal(over.json.error, "too_many_classes");
  assert.equal((await call(env, "POST", "/v1/classes", { cookie: teacher.cookie, body: { name: "No name", teacherName: "" } })).status, 400, "teacher name required");
});

test("students preview, must consent, join, and can leave at once", async () => {
  const { env, teacher, cls } = await setup();
  const student = await signIn(env, "ana@school.example");

  assert.equal((await call(env, "GET", `/v1/classes/join/${cls.code}`)).status, 401, "sign in first");
  const pre = await call(env, "GET", `/v1/classes/join/${cls.code}`, { cookie: student.cookie });
  assert.equal(pre.status, 200);
  assert.deepEqual(pre.json.class, { name: "Period 3 Security+", certId: "security-plus", teacherName: "Ms. Rivera" });
  assert.equal(pre.json.isMember, false);
  assert.ok(!pre.text.includes("teacher@school.example"), "the teacher's email is never shown");
  assert.ok(!pre.text.includes(cls.id), "the preview doesn't reveal the class id");

  const noConsent = await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: student.cookie, body: { displayName: "Ana" } });
  assert.equal(noConsent.status, 400);
  assert.equal(noConsent.json.error, "consent_required");
  assert.equal((await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: student.cookie, body: { displayName: "Ana", consent: "yes" } })).status, 400, "consent must be exactly true");
  assert.equal((await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: student.cookie, body: { consent: true } })).status, 400, "a display name is required");
  let r = await call(env, "GET", `/v1/classes/${cls.id}/roster`, { cookie: teacher.cookie });
  assert.equal(r.json.students.length, 0, "nothing is shared before consent");

  const joined = await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: student.cookie, body: { displayName: "Ana", consent: true } });
  assert.equal(joined.status, 200, joined.text);
  assert.equal(joined.json.class.id, cls.id);
  const again = await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: student.cookie, body: { displayName: "Ana M.", consent: true } });
  assert.equal(again.status, 200, "joining twice updates the name instead of duplicating");
  const mine = await call(env, "GET", "/v1/classes", { cookie: student.cookie });
  assert.equal(mine.json.joined.length, 1);
  assert.equal(mine.json.joined[0].teacherName, "Ms. Rivera");
  assert.equal(mine.json.joined[0].displayName, "Ana M.");
  assert.deepEqual(mine.json.teaching, []);

  r = await call(env, "GET", `/v1/classes/${cls.id}/roster`, { cookie: teacher.cookie });
  assert.equal(r.json.students.length, 1);
  assert.equal(r.json.students[0].displayName, "Ana M.");
  assert.equal(r.json.students[0].email, null, "email stays hidden unless the student chooses to show it");
  assert.ok(!r.text.includes("ana@school.example"));
  assert.ok(!r.text.includes(student.user.id), "the teacher never sees user ids");

  assert.equal((await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: teacher.cookie, body: { displayName: "Me", consent: true } })).status, 400, "the teacher can't join their own class");

  const leave = await call(env, "DELETE", `/v1/classes/${cls.id}/membership`, { cookie: student.cookie });
  assert.equal(leave.status, 200);
  r = await call(env, "GET", `/v1/classes/${cls.id}/roster`, { cookie: teacher.cookie });
  assert.equal(r.json.students.length, 0, "leaving stops sharing immediately");
  assert.equal((await call(env, "DELETE", `/v1/classes/${cls.id}/membership`, { cookie: student.cookie })).status, 404);

  const shown = await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: student.cookie, body: { displayName: "Ana", consent: true, showEmail: true } });
  assert.equal(shown.status, 200);
  r = await call(env, "GET", `/v1/classes/${cls.id}/roster`, { cookie: teacher.cookie });
  assert.equal(r.json.students[0].email, "ana@school.example", "shown when the student opts in");
});

test("teacher removes a student, deletes the class; bad codes and CSRF are refused", async () => {
  const { env, teacher, cls } = await setup();
  const s1 = await signIn(env, "s1@school.example"), s2 = await signIn(env, "s2@school.example");
  for (const [s, n] of [[s1, "Sam"], [s2, "Kim"]]) assert.equal((await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: s.cookie, body: { displayName: n, consent: true } })).status, 200);
  let r = await call(env, "GET", `/v1/classes/${cls.id}/roster`, { cookie: teacher.cookie });
  assert.deepEqual(r.json.students.map(s => s.displayName), ["Kim", "Sam"]);
  const kim = r.json.students[0].memberId;
  assert.match(kim, /^mem_[0-9a-f]{24}$/);
  assert.equal((await call(env, "DELETE", `/v1/classes/${cls.id}/students/${kim}`, { cookie: s1.cookie })).status, 404, "students can't remove each other");
  assert.equal((await call(env, "DELETE", `/v1/classes/${cls.id}/students/${kim}`, { cookie: teacher.cookie })).status, 200);
  r = await call(env, "GET", `/v1/classes/${cls.id}/roster`, { cookie: teacher.cookie });
  assert.deepEqual(r.json.students.map(s => s.displayName), ["Sam"]);
  assert.equal((await call(env, "GET", "/v1/classes", { cookie: s2.cookie })).json.joined.length, 0, "the removed student's list is updated");

  assert.equal((await call(env, "GET", "/v1/classes/join/ABCDEFGHJK", { cookie: s2.cookie })).status, 404, "uppercase or other characters never match a route");
  assert.equal((await call(env, "GET", "/v1/classes/join/abc", { cookie: s2.cookie })).status, 404);
  assert.equal((await call(env, "GET", "/v1/classes/join/aaaaaaaaaa", { cookie: s2.cookie })).status, 404, "unknown code");

  const evil = await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: s2.cookie, origin: "https://evil.example", body: { displayName: "x", consent: true } });
  assert.equal(evil.status, 403, "writes from other sites are refused");
  assert.equal((await call(env, "DELETE", `/v1/classes/${cls.id}`, { cookie: teacher.cookie, origin: null })).status, 403);

  assert.equal((await call(env, "DELETE", `/v1/classes/${cls.id}`, { cookie: s1.cookie })).status, 404, "students can't delete the class");
  assert.equal((await call(env, "DELETE", `/v1/classes/${cls.id}`, { cookie: teacher.cookie })).status, 200);
  assert.equal((await env.DB.prepare("SELECT COUNT(*) AS n FROM class_members").first()).n, 0, "members go with the class");
  assert.equal((await call(env, "GET", `/v1/classes/join/${cls.code}`, { cookie: s1.cookie })).status, 404);
});

test("authorization: students can't see the roster; teachers can't see other classes", async () => {
  const { env, teacher, cls } = await setup();
  const student = await signIn(env, "stu@school.example");
  await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: student.cookie, body: { displayName: "Stu", consent: true } });
  const other = await signIn(env, "other-teacher@school.example");
  const theirs = (await call(env, "POST", "/v1/classes", { cookie: other.cookie, body: { name: "Other class", teacherName: "Mr. Lee" } })).json;

  for (const p of [`/v1/classes/${cls.id}/roster`, `/v1/classes/${cls.id}/roster.csv`]) {
    assert.equal((await call(env, "GET", p, { cookie: student.cookie })).status, 404, "a student can't see the roster");
    assert.equal((await call(env, "GET", p, { cookie: other.cookie })).status, 404, "another teacher can't see it or tell it exists");
    assert.equal((await call(env, "GET", p)).status, 401);
  }
  assert.equal((await call(env, "GET", `/v1/classes/${theirs.id}/roster`, { cookie: teacher.cookie })).status, 404);
  assert.equal((await call(env, "PUT", `/v1/classes/${theirs.id}`, { cookie: teacher.cookie, body: { name: "Mine now" } })).status, 404);
  assert.equal((await call(env, "POST", `/v1/classes/${theirs.id}/code`, { cookie: teacher.cookie, body: {} })).status, 404);
  assert.equal((await call(env, "POST", `/v1/classes/${cls.id}/code`, { cookie: student.cookie, body: {} })).status, 404, "students can't rotate the code");
  const list = await call(env, "GET", "/v1/classes", { cookie: other.cookie });
  assert.equal(list.json.teaching.length, 1);
  assert.ok(!list.text.includes(cls.code), "other teachers never see this class's code");
  const stuList = await call(env, "GET", "/v1/classes", { cookie: student.cookie });
  assert.ok(!stuList.text.includes(cls.code), "students don't get the code back either");

  // A non-member can only join with the code: there is no route that joins by class id.
  const outsider = await signIn(env, "outsider@school.example");
  assert.equal((await call(env, "POST", `/v1/classes/${cls.id}/membership`, { cookie: outsider.cookie, body: { consent: true, displayName: "x" } })).status, 404);
  assert.equal((await call(env, "POST", `/v1/classes/join/${cls.id}`, { cookie: outsider.cookie, body: { consent: true, displayName: "x" } })).status, 404);
  assert.equal((await call(env, "GET", `/v1/classes/${cls.id}/roster`, { cookie: teacher.cookie })).json.students.length, 1);
});

test("roster summary: computed from synced progress, never raw answers or notes", async () => {
  const { env, teacher, cls } = await setup();
  const student = await signIn(env, "sum@school.example");
  const keys = META["security-plus"].lessons;
  assert.ok(keys.length > 10, "cert-meta.js has the Security+ lessons (run node tools/build.js)");
  const read = Object.fromEntries(keys.slice(0, 5).map(k => [k, true]));
  read.unknownKey = true; // not a lesson in the plan: not counted
  await put(env, student.cookie, "cert:security-plus", {
    stats: { 1: { c: 18, t: 20 }, 2: { c: 5, t: 10 } },
    read,
    checks: { "1-0": true },
    review: { "q-secret-answer": { due: 0, box: 1 } },
    history: [{ at: 3, title: "Practice exam", score: 70, total: 90, kind: "full", answers: ["SECRET-ANSWER"] }, { at: 2, title: "Week 1 quiz", score: 9, total: 10 }, { at: 1, title: "Practice exam", score: 45, total: 90 }],
    handson: { "ho-1": true, "ho-2": true, "ho-3": false },
    sims: { "pbq-1": { best: 80, at: 1 } }
  });
  await put(env, student.cookie, "cert:network-plus", { stats: { 1: { c: 1, t: 4 } } });
  await put(env, student.cookie, "cert:cissp", { checks: {} }); // untouched plan: not listed
  await put(env, student.cookie, "labs", { "lab-home-lab": { done: 1, notes: "PRIVATE LAB NOTE", steps: { 0: true } }, "lab-x": { steps: { 0: true } } });
  await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: student.cookie, body: { displayName: "Sum", consent: true } });

  const r = await call(env, "GET", `/v1/classes/${cls.id}/roster`, { cookie: teacher.cookie });
  assert.equal(r.status, 200);
  const s = r.json.students[0];
  assert.equal(s.labsDone, 1);
  assert.ok(s.lastActive > 0);
  assert.deepEqual(s.certs.map(c => c.certId), ["security-plus", "network-plus"], "the class's certification first; untouched plans skipped");
  const sp = s.certs[0];
  assert.equal(sp.answered, 30);
  assert.equal(sp.lessonsRead, 5);
  assert.equal(sp.lessonsTotal, keys.length);
  assert.equal(sp.bestExam, 78, "best practice exam, rounded (70/90)");
  assert.equal(sp.handsOn, 3, "two hands-on exercises plus one simulation");
  assert.equal(typeof sp.readiness, "number");
  assert.ok(sp.readiness >= 0 && sp.readiness <= 100);
  for (const secret of ["PRIVATE LAB NOTE", "SECRET-ANSWER", "q-secret-answer", "Week 1 quiz", "unknownKey"]) assert.ok(!r.text.includes(secret), `roster must not include ${secret}`);

  const csv = await call(env, "GET", `/v1/classes/${cls.id}/roster.csv`, { cookie: teacher.cookie });
  assert.equal(csv.status, 200);
  assert.match(csv.headers.get("content-type"), /^text\/csv/);
  assert.equal(csv.headers.get("cache-control"), "no-store");
  const lines = csv.text.trim().split("\r\n");
  assert.equal(lines.length, 3, "header plus one row per certification");
  assert.ok(lines[0].startsWith('"student","email","certification","readiness","lessons_read","lessons_total"'));
  assert.ok(lines[1].startsWith(`"Sum","","security-plus","${sp.readiness}","5","${keys.length}","78","30","3","1",`));
  assert.ok(!csv.text.includes("sum@school.example"));
});

test("summary math matches the app's readiness estimate", () => {
  const meta = { domains: [["1", 50], ["2", 50]], lessons: ["la", "lb", "lc", "ld"] };
  const at = 1_000_000;
  // No activity: nothing to estimate.
  assert.deepEqual(classes.certSummary({}, meta, at), { readiness: null, lessonsRead: 0, lessonsTotal: 4, bestExam: null, answered: 0, handsOn: 0 });
  // Domain 1: 20/20 answered, full confidence -> 1.0; domain 2: 0 answered -> 0.35 prior.
  // acc = 0.5*1 + 0.5*0.35 = 0.675; lessons 2/4 = 0.5; exam 0.8; due 10 -> penalty 2.
  const doc = { stats: { 1: { c: 20, t: 20 } }, read: { la: true, lb: true }, history: [{ title: "Practice exam", score: 8, total: 10 }], review: Object.fromEntries([...Array(12)].map((_, i) => [`q${i}`, { due: i < 10 ? at : at + 864e5 }])) };
  const s = classes.certSummary(doc, meta, at);
  assert.equal(s.readiness, Math.round(100 * (0.5 * 0.675 + 0.15 * 0.5 + 0.35 * 0.8) - 2));
  assert.equal(s.lessonsRead, 2);
  assert.equal(s.bestExam, 80);
  // Without a practice exam the estimate uses 90% of accuracy, like the app.
  const noExam = classes.certSummary({ stats: { 1: { c: 20, t: 20 } } }, meta, at);
  assert.equal(noExam.readiness, Math.round(100 * (0.5 * 0.675 + 0.35 * 0.675 * 0.9)));
  // Junk is tolerated; correct counts never exceed totals.
  const junk = classes.certSummary({ stats: { 1: { c: 99, t: 10 }, 2: "x", 3: null }, history: [null, { score: 5, total: 0 }, "x"], read: [], handson: "x", review: 5 }, meta, at);
  assert.equal(junk.answered, 10);
  assert.equal(junk.bestExam, null);
  assert.ok(junk.readiness <= 100);
  // Unknown certification (no meta): counts still work, readiness and totals are unavailable.
  const unknown = classes.certSummary({ stats: { 1: { c: 1, t: 2 } }, read: { a: true, b: false } }, undefined, at);
  assert.equal(unknown.readiness, null);
  assert.equal(unknown.lessonsTotal, null);
  assert.equal(unknown.lessonsRead, 1);
});

test("roster CSV neutralizes spreadsheet formulas in names", () => {
  const csv = classes.rosterCsv({ students: [{ displayName: "=HYPERLINK(\"http://x\")", email: null, labsDone: 0, lastActive: null, certs: [] }] });
  assert.ok(csv.includes(`"'=HYPERLINK(""http://x"")"`), csv);
});

test("deleting an account removes its classes and memberships; export includes them", async () => {
  const { env, teacher, cls } = await setup();
  const student = await signIn(env, "del@school.example");
  await call(env, "POST", `/v1/classes/join/${cls.code}`, { cookie: student.cookie, body: { displayName: "Del", consent: true } });
  const exp = await call(env, "GET", "/v1/account/export", { cookie: student.cookie });
  assert.equal(exp.json.classesJoined.length, 1);
  const texp = await call(env, "GET", "/v1/account/export", { cookie: teacher.cookie });
  assert.equal(texp.json.classesTaught.length, 1);
  assert.equal((await call(env, "DELETE", "/v1/account", { cookie: student.cookie, body: { confirm: "del@school.example" } })).status, 200);
  assert.equal((await call(env, "GET", `/v1/classes/${cls.id}/roster`, { cookie: teacher.cookie })).json.students.length, 0);
  assert.equal((await call(env, "DELETE", "/v1/account", { cookie: teacher.cookie, body: { confirm: "teacher@school.example" } })).status, 200);
  assert.equal((await env.DB.prepare("SELECT COUNT(*) AS n FROM classes").first()).n, 0);
});

test("join lookups are rate limited", async () => {
  const { env } = await setup();
  const guesser = await signIn(env, "guess@school.example");
  let last;
  for (let i = 0; i < 31; i++) last = await call(env, "GET", `/v1/classes/join/${"a".repeat(9)}${"abcdefghijkmnpqrstuvwxyz23456789"[i]}`, { cookie: guesser.cookie });
  assert.equal(last.status, 429);
});
