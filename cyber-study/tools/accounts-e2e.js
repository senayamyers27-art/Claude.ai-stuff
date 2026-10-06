#!/usr/bin/env node
/* Browser test for optional accounts, against the API running locally (api/dev-server.js).
   Signs in with an emailed link on two "devices", syncs progress both ways, and runs the
   instructor flow: organization, cohort, invite link, learner joins, progress summary, and
   class mode: teacher creates a class, a student joins with consent, then leaves. */
const { chromium } = require("playwright");
const { serve } = require("./serve");

const SITE_PORT = 8124, API_PORT = 8788;
const BASE = `http://localhost:${SITE_PORT}`, API = `http://localhost:${API_PORT}`;
let failures = 0;
const check = (ok, msg) => { console.log(`  ${ok ? "✓" : "✗"} ${msg}`); if (!ok) failures++; };

(async () => {
  process.env.PRO_EMAILS = "pro.learner@example.com"; // dev server grants this account Pro
  process.env.PREMIUM_EMAILS = "premium.learner@example.com"; // and this one Premium Pro
  delete process.env.PRO_CONTENT_DIR; // use the small sample content in api/test/fixtures/pro
  const { start } = require("../api/dev-server.js");
  const api = await start({ port: API_PORT, siteOrigin: BASE, env: { ADMIN_EMAILS: "owner.admin@example.com" } });
  const site = await serve(SITE_PORT, { apiOrigin: API });
  const exe = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const errors = [], foreign = [];

  async function device() {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });
    ctx.on("page", p => {
      p.on("pageerror", e => errors.push(`${p.url()}: ${e.message}`));
      p.on("console", m => { if (m.type() === "error" && !/status of 40[0-9]/.test(m.text())) errors.push(`${p.url()}: ${m.text()}`); });
      p.on("dialog", d => d.accept());
    });
    ctx.on("request", r => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith(API) && !u.startsWith("data:") && !u.startsWith("blob:")) foreign.push(u); });
    const page = await ctx.newPage();
    page.setDefaultTimeout(8000);
    return page;
  }
  async function signIn(page, email, landing = "/#account") {
    await page.goto(BASE + landing);
    await page.fill("#signin-email", email);
    await page.click("#signin-form button[type=submit]");
    const link = await page.getAttribute("#signin-msg a", "href");
    check(link && link.startsWith(`${BASE}/?signin=`), `${email}: sign-in link issued (development mode shows it on the page)`);
    await page.goto(link);
    await page.waitForSelector("[data-aact=signout]");
    check(!page.url().includes("signin="), `${email}: token removed from the address bar`);
  }
  const local = (page, key) => page.evaluate(k => JSON.parse(localStorage.getItem(k) || "null"), key);
  const syncNow = async page => { await page.goto(BASE + "/#account"); await page.click("[data-aact=sync]"); await page.waitForFunction(() => /^Synced/.test((document.getElementById("syncstatus") || {}).textContent || "")); };

  try {
    console.log("Signed out");
    const a = await device();
    await a.goto(BASE + "/");
    await a.waitForSelector(".tile");
    check(await a.$('nav.tabs a[href="#account"]'), "Account tab shown when an API is configured");
    await a.goto(BASE + "/#account");
    check(await a.$("#signin-form"), "account page offers sign-in");
    check(/A free account unlocks the rest/.test(await (await a.goto(BASE + "/#privacy"), a.textContent("#app"))), "Privacy Policy describes accounts");

    console.log("Device A: sign in and upload");
    await a.evaluate(() => {
      localStorage.setItem("certhub:v1:labs", JSON.stringify({ "lab-a": { started: 1000, steps: { 0: true }, notes: "notes from A", notesAt: 2000 } }));
      localStorage.setItem("certhub:v1:security-plus", JSON.stringify({ checks: { "1-1": true }, stats: { 1: { c: 3, t: 4 } }, history: [] }));
    });
    await signIn(a, "learner.one@example.com");
    check(/learner\.one@example\.com/.test(await a.textContent("#app")), "account page shows the email");
    await a.waitForFunction(() => /^Synced/.test((document.getElementById("syncstatus") || {}).textContent || ""));
    check(true, "first sync finished");

    console.log("Free account sees Pro as an upgrade");
    check(/Plan: Free/.test(await a.textContent("#app")), "account shows the free plan");
    await a.goto(BASE + "/#security-plus.practice");
    await a.waitForSelector("text=Full-length exam");
    check(!(await a.$("[data-act=fullexam]")) && !!(await a.$('a[href="#account"]:has-text("Unlock")')), "full-length exam is locked with an Unlock link");
    await a.goto(BASE + "/#security-plus.guide");
    await a.waitForSelector(".pro-teaser");
    check(!(await a.$("[data-act=fcstart]")), "flashcards are locked");
    await a.goto(BASE + "/#security-plus.progress");
    check(!!(await a.$(".pro-teaser")) && !/Predicted score/.test(await a.textContent("#app")), "score report is locked");

    console.log("Device B: sign in and download");
    const b = await device();
    await b.goto(BASE + "/");
    await b.evaluate(() => localStorage.setItem("certhub:v1:labs", JSON.stringify({ "lab-b": { started: 3000, steps: { 2: true } } })));
    await signIn(b, "learner.one@example.com");
    await b.waitForFunction(() => /^Synced/.test((document.getElementById("syncstatus") || {}).textContent || ""));
    const bl = await local(b, "certhub:v1:labs");
    check(bl && bl["lab-a"] && bl["lab-a"].notes === "notes from A" && bl["lab-b"], "B has A's lab notes and kept its own lab");
    const bc = await local(b, "certhub:v1:security-plus");
    check(bc && bc.checks["1-1"] === true && bc.stats[1].t === 4, "B has A's Security+ progress");

    console.log("Both devices change, then sync");
    await b.evaluate(() => { const l = JSON.parse(localStorage.getItem("certhub:v1:labs")); l["lab-a"].notes = "edited on B"; l["lab-a"].notesAt = Date.now(); localStorage.setItem("certhub:v1:labs", JSON.stringify(l)); });
    await syncNow(b);
    await a.evaluate(() => { const c = JSON.parse(localStorage.getItem("certhub:v1:security-plus")); c.checks["1-2"] = true; localStorage.setItem("certhub:v1:security-plus", JSON.stringify(c)); });
    await syncNow(a);
    const al = await local(a, "certhub:v1:labs");
    check(al["lab-a"].notes === "edited on B" && al["lab-b"], "A received B's newer note and B's lab");
    await syncNow(b);
    const bc2 = await local(b, "certhub:v1:security-plus");
    check(bc2.checks["1-1"] && bc2.checks["1-2"], "B received A's new check without losing old ones");

    console.log("Saving progress in the app pushes it automatically");
    await b.goto(BASE + "/#security-plus");
    await b.waitForSelector("#app");
    await b.evaluate(() => { const k = "certhub:v1:security-plus"; const c = JSON.parse(localStorage.getItem(k)); c.checks["9-9"] = true; localStorage.setItem(k, JSON.stringify(c)); CertHub.sync.changed(k); });
    await b.waitForTimeout(3500);
    const docs = await b.evaluate(async api => (await (await fetch(api + "/v1/progress", { credentials: "include" })).json()).docs, API);
    check(docs.find(d => d.key === "cert:security-plus").body.checks["9-9"] === true, "change reached the server within a few seconds");

    console.log("Instructor: organization, cohort and invite");
    const t = await device();
    await signIn(t, "instructor@example.com");
    await t.click("details.sq summary");
    await t.fill("#org-name", "Test Bootcamp");
    await t.click("#org-form button[type=submit]");
    await t.waitForSelector("#cohort-form", { state: "attached" }).catch(async e => { console.log(await t.textContent("#app")); throw e; });
    const orgId = await t.getAttribute("#cohort-form", "data-org");
    await api.env.DB.prepare("UPDATE orgs SET pilot_seats = 5 WHERE id = ?").bind(orgId).run(); // a pilot, no billing
    await t.click("#orgpanel details.sq summary");
    await t.fill("#cohort-name", "Fall cohort");
    await t.selectOption("#cohort-cert", "security-plus");
    await t.click("#cohort-form button[type=submit]");
    await t.waitForSelector("#orgpanel [data-aact=invite]");
    const cohortId = await t.getAttribute("#orgpanel [data-aact=invite]", "data-cohort");
    const invite = await t.evaluate(async ([api, org, cohort]) => (await (await fetch(`${api}/v1/orgs/${org}/invites`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role: "learner", cohortId: cohort, maxUses: 5, days: 7 }) })).json()).link, [API, orgId, cohortId]);
    check(invite && invite.startsWith(`${BASE}/?invite=`), "invite link created");

    console.log("Learner joins through the invite");
    await a.goto(BASE + "/#account");
    await a.click("[data-aact=signout]");
    await a.waitForSelector("#signin-form");
    check(true, "signed out");
    await a.goto(invite);
    await a.waitForSelector("#signin-form");
    await signIn(a, "learner.one@example.com", "/#account");
    await a.waitForFunction(() => /Test Bootcamp/.test(document.getElementById("app").textContent));
    check(true, "learner joined the organization after signing in");

    console.log("Instructor sees derived numbers only");
    await t.goto(`${BASE}/#cohort-${cohortId.replace(/^coh_/, "")}`);
    await t.waitForSelector("table.sectable tbody tr td");
    const row = await t.textContent("table.sectable tbody");
    check(/learner\.one@example\.com/.test(row) && /75%/.test(row), "summary lists the learner with accuracy");
    check(!/edited on B|notes from A/.test(await t.content()), "lab notes are not shown to the instructor");

    console.log("Pro member");
    const p = await device();
    const contentCalls = [];
    p.on("response", r => { if (r.url().includes("/v1/content/")) contentCalls.push(r.status()); });
    await signIn(p, "pro.learner@example.com");
    check(/Plan: Pro/.test(await p.textContent("#app")), "account shows the Pro plan");
    await p.goto(BASE + "/#security-plus.practice");
    await p.waitForSelector("[data-act=fullexam]");
    check(/\+ 12 Pro/.test(await p.textContent("#app")), "Pro questions are added to the bank");
    await p.click("[data-act=fullexam]");
    check(/Question 1 of 90/.test(await p.textContent("#app")), "full-length exam has the real exam's 90 questions");
    for (let i = 0; i < 40; i++) { await p.click(".opt >> nth=0"); await p.click("[data-act=next]"); }
    await p.click("[data-act=finish]");
    await p.click('.modal [data-v="1"]');
    await p.waitForSelector(".big");
    check(/Pass estimate/.test(await p.textContent("#app")), "result shows a pass estimate and domain breakdown");
    await p.click("[data-act=quit]");
    await p.goto(BASE + "/#security-plus.progress");
    await p.waitForSelector("text=Predicted score");
    check(/Latest full-length exam/.test(await p.textContent("#app")), "score report shows the prediction and the full-length exam");
    await p.goto(BASE + "/#security-plus.guide");
    await p.waitForSelector("[data-act=fcstart]");
    await p.click("[data-act=fcstart]");
    await p.click("[data-act=fcflip]");
    check(!!(await p.$(".flashcard .expl")), "flashcard flips to show the answer");
    await p.click("[data-act=fcknow]");
    await p.click("[data-act=fcdone]");
    await p.waitForTimeout(600); // progress saves are debounced
    const cards = await p.evaluate(() => Object.keys((JSON.parse(localStorage.getItem("certhub:v1:security-plus")) || {}).cards || {}).length);
    check(cards === 1, "flashcard progress is saved for spaced repetition");
    check((await p.$$(".guide details")).length === 5, "study guide has a section for every domain");
    await p.goto(BASE + "/#labs");
    await p.waitForSelector('a.labcard[href="#cap-sample-soc"]');
    await p.click('a.labcard[href="#cap-sample-soc"]');
    await p.waitForSelector("text=Grade your project");
    check(/SAMPLE capstone/.test(await p.textContent("#app")) && (await p.$$(".sectable tbody tr")).length === 4, "capstone opens with its rubric");
    check(contentCalls.length >= 2 && contentCalls.every(s => s === 200), "Pro content was served to the Pro member");
    // Lessons past the free sample aren't in the public files; signed-in members get them from the API.
    const pubLessons = await p.evaluate(async () => (await fetch("data/lessons/security-plus.js")).text());
    check(/"locked":true/.test(pubLessons) && !/"check":/.test(pubLessons.split('"locked":true')[1] || ""), "the public lesson file has only the opening of locked lessons");
    await p.goto(BASE + "/#security-plus.learn"); await p.reload();
    await p.waitForFunction(() => document.querySelectorAll("details.lesson").length > 10 && !document.querySelector(".lesson.locked"));
    check(true, "signed in: every lesson opens, with the full text from the API");
    await p.goto(BASE + "/#account");
    await p.click("[data-aact=signout]");
    await p.waitForSelector("#signin-form");
    await p.goto(BASE + "/#security-plus.practice");
    await p.waitForSelector(".gatewall");
    check(!(await p.$("[data-act=fullexam]")) && !/\+ 12 Pro/.test(await p.textContent("#app")), "signing out removes Pro content from the page");
    // Free-account gate: signed out, a sample only.
    check(!!(await p.$('[data-act="weekly-sel"]')) && !!(await p.$('[data-act="placement"]')) && !(await p.$('[data-act="smart"]')) && !(await p.$('[data-act="exam"]')), "signed out: the quiz page offers the placement test and weekly quiz, and asks for a free account for the rest");
    await p.goto(BASE + "/#security-plus.learn");
    await p.waitForSelector("details.lesson");
    check((await p.$$("details.lesson")).length === 2 && (await p.$$(".lesson.locked")).length > 10, "signed out: the first 2 lessons open; the rest ask for a free account");
    check(await p.evaluate(async () => !(await caches.keys()).includes("certhub-member")), "signing out deletes the saved copy of the members' lessons");
    await p.goto(BASE + "/#labs");
    await p.waitForSelector(".labcard");
    const labHrefs = await p.$$eval(".labgrid .labcard", els => els.map(e => e.getAttribute("href")));
    await p.goto(BASE + "/" + labHrefs[0]); await p.waitForSelector("#app h1");
    const firstOpen = !(await p.$(".gatewall"));
    await p.goto(BASE + "/" + labHrefs[1]); await p.waitForSelector(".gatewall");
    check(firstOpen, "signed out: the first lab of a track opens as a sample, the next one asks for a free account");
    await p.goto(BASE + "/#vm"); await p.waitForSelector(".gatewall");
    check(true, "signed out: practice VMs ask for a free account");

    console.log("Class mode (free)");
    const tch = await device();
    await signIn(tch, "teacher.one@example.com");
    await tch.waitForSelector("#class-form", { state: "attached" });
    await tch.click("#classpanel summary");
    await tch.fill("#class-name", "Period 3 <b>Security+</b>");
    await tch.fill("#class-teacher", "Ms. Rivera");
    await tch.selectOption("#class-cert", "security-plus");
    await tch.click("#class-form button[type=submit]");
    await tch.waitForSelector("#classpanel [data-aact=copyjoin]");
    const code = await tch.getAttribute("#classpanel [data-aact=copyjoin]", "data-code");
    check(/^[a-km-np-z2-9]{10}$/.test(code || ""), "teacher created a class and got a join code");
    check(!(await tch.$("#classpanel b")), "class name is escaped");
    const stu = await device();
    await stu.goto(BASE + "/");
    await stu.evaluate(() => localStorage.setItem("certhub:v1:security-plus", JSON.stringify({ checks: {}, stats: { 1: { c: 7, t: 10 } }, history: [], read: {} })));
    await stu.goto(`${BASE}/#join-${code}`);
    await stu.waitForSelector('a.btn[href="#account"]');
    check(/Sign in first/.test(await stu.textContent("#app")), "join link asks a signed-out student to sign in");
    await stu.goto(BASE + "/#account");
    await stu.fill("#signin-email", "student.one@example.com");
    await stu.click("#signin-form button[type=submit]");
    await stu.goto(await stu.getAttribute("#signin-msg a", "href"));
    await stu.waitForSelector("#join-form");
    const joinText = await stu.textContent("#app");
    check(/Ms\. Rivera/.test(joinText) && /Period 3 <b>Security\+<\/b>/.test(joinText) && !/teacher\.one@/.test(joinText), "after sign-in the student is back on the join page, with the class and teacher names");
    await stu.fill("#join-name", "Ana");
    await stu.click("#join-form button[type=submit]");
    check(/agree/.test(await stu.textContent("#join-msg")), "joining needs the consent box");
    await stu.check("#join-consent");
    await stu.click("#join-form button[type=submit]");
    await stu.waitForSelector("#classpanel [data-aact=leaveclass]");
    check(true, "student joined after agreeing");
    await syncNow(stu);
    await tch.goto(BASE + "/#account");
    await tch.click('#classpanel a[href^="#class-"]');
    await tch.waitForSelector(".sectable tbody tr td strong");
    const roster = await tch.textContent("#app");
    check(/Ana/.test(roster) && /Security\+/.test(roster) && !/student\.one@/.test(roster), "teacher sees the student's name and progress, not their email");
    check((await tch.$$eval(".sectable tbody td", tds => tds.map(td => td.textContent.trim()))).includes("10"), "roster shows questions answered from synced progress");
    // Assignments: the teacher sets a target; the roster and the student's Account page show progress.
    await tch.click("#assign-form >> xpath=.. >> summary");
    await tch.fill("#assign-title", "Warm-up questions");
    await tch.selectOption("#assign-kind", "questions");
    await tch.fill("#assign-target", "5");
    await tch.click("#assign-form button[type=submit]");
    await tch.waitForSelector("text=1 of 1 student done");
    check(true, "teacher adds an assignment and sees who has done it");
    await stu.goto(BASE + "/#account"); await stu.reload();
    await stu.waitForSelector("#classpanel .assignlist li.done");
    check(/Warm-up questions/.test(await stu.textContent("#classpanel .assignlist")), "student sees the assignment marked done");
    // Exit tickets: the teacher assigns one online; the student answers; only the teacher sees answers, with the expected ones.
    const openAssign = async () => { if (!(await tch.isVisible("#assign-title"))) await tch.click("#assign-form >> xpath=.. >> summary"); };
    await openAssign();
    await tch.fill("#assign-title", "Read: lesson one");
    await tch.selectOption("#assign-kind", "lesson");
    await tch.selectOption("#assign-cert", "security-plus");
    await tch.waitForFunction(() => { const o = document.querySelector("#assign-item option"); return o && /^l[0-9a-z]+$/.test(o.value); });
    await tch.click("#assign-form button[type=submit]");
    await tch.waitForSelector('a[href^="https://classroom.google.com/share?url="]');
    check(true, "teacher assigns one lesson, with a Share to Google Classroom link");
    await openAssign();
    await tch.fill("#assign-title", "Exit ticket: lesson one");
    await tch.selectOption("#assign-kind", "exit");
    await tch.selectOption("#assign-cert", "security-plus");
    await tch.waitForFunction(() => { const o = document.querySelector("#assign-item option"); return o && /^l[0-9a-z]+$/.test(o.value); });
    await tch.click("#assign-form button[type=submit]");
    await tch.waitForSelector("[data-aact=exitresults]");
    check(true, "teacher adds an online exit ticket");
    await stu.goto(BASE + "/#account"); await stu.reload();
    await stu.waitForSelector("#classpanel [data-aact=exitopen]");
    check(!!(await stu.$('#classpanel a[href^="#security-plus.lesson-l"]')), "student sees the one-lesson assignment with a link to the lesson");
    await stu.click("#classpanel [data-aact=exitopen]");
    await stu.waitForSelector(".exitform textarea");
    const nq = (await stu.$$(".exitform textarea")).length;
    for (let i = 0; i < nq; i++) await stu.fill(`.exitform textarea >> nth=${i}`, `My answer number ${i + 1}`);
    await stu.click(".exitform button[type=submit]");
    await stu.waitForSelector('#classpanel [data-aact=exitopen]:has-text("Change your answers")');
    check(nq === 3, "student answers the three exit-ticket questions and sends them");
    await tch.reload(); await tch.waitForSelector("[data-aact=exitresults]");
    await tch.click("[data-aact=exitresults]");
    await tch.waitForSelector(".exitres");
    const res = await tch.textContent(".exitres");
    check(/1 of 1 answered/.test(res) && /My answer number 1/.test(res) && /Expected:/.test(res) && /Ana/.test(res), "teacher sees each student's answers next to the expected ones");
    await stu.click("#classpanel [data-aact=leaveclass]");
    await stu.click('.modal [data-v="1"]');
    await stu.waitForSelector("text=None. Your teacher shares");
    await tch.reload();
    await tch.waitForSelector("text=No students yet");
    check(true, "after the student leaves, the roster no longer shows them");

    console.log("Site dashboard");
    const own = await device();
    await signIn(own, "owner.admin@example.com");
    await own.waitForSelector('a[href="#admin"]');
    await own.click('a[href="#admin"]');
    await own.waitForSelector(".stats .stat");
    const dash = await own.textContent("#app");
    check(/accounts/.test(dash) && /Most studied/.test(dash) && !/@example\.com/.test(dash), "the owner's dashboard shows totals, no emails");
    check(!(await tch.$('a[href="#admin"]')), "other members don't get the dashboard link");

    console.log("Passkeys and signed-in devices");
    const pk = await device(), other = await device();
    // Chrome's virtual authenticator stands in for a phone or laptop with a fingerprint reader.
    const cdp = await pk.context().newCDPSession(pk);
    await cdp.send("WebAuthn.enable");
    await cdp.send("WebAuthn.addVirtualAuthenticator", { options: { protocol: "ctap2", transport: "internal", hasResidentKey: true, hasUserVerification: true, isUserVerified: true, automaticPresenceSimulation: true } });
    await signIn(pk, "passkey.user@example.com");
    await pk.click("[data-aact=passkey-add]");
    await pk.waitForSelector("#modal-in");
    await pk.fill("#modal-in", "Test laptop");
    await pk.click('.modal [type="submit"]');
    await pk.waitForSelector('#passkeypanel >> text=Test laptop');
    check(true, "a passkey can be added and named");
    await signIn(other, "passkey.user@example.com");
    await pk.reload(); await pk.waitForSelector("#devicepanel [data-aact=session-others]");
    check(/This device/.test(await pk.textContent("#devicepanel")) && (await pk.$$("#devicepanel .row")).length === 2, "devices list shows both sessions and marks this one");
    await pk.click("[data-aact=signout]");
    await pk.waitForSelector("[data-aact=passkey-signin]");
    await pk.click("[data-aact=passkey-signin]");
    await pk.waitForSelector("[data-aact=signout]");
    check(/passkey\.user@example\.com/.test(await pk.textContent("#app")), "signs in with the passkey, no email needed");
    await pk.waitForSelector("#devicepanel [data-aact=session-others]");
    await pk.click("#devicepanel [data-aact=session-others]");
    await pk.click('.modal [data-v="1"]');
    await pk.waitForFunction(() => !document.querySelector("#devicepanel [data-aact=session-others]"));
    await other.reload(); await other.waitForSelector("#signin-form");
    check(true, "sign out everywhere else ends the other device's session");
    await pk.click("[data-aact=passkey-del]");
    await pk.click('.modal [data-v="1"]');
    await pk.waitForFunction(() => !/Test laptop/.test(document.getElementById("passkeypanel").textContent));
    check(true, "a passkey can be removed");

    console.log("Delete account");
    await b.goto(BASE + "/#account");
    await b.click("[data-aact=delete]");
    await b.click('.modal [data-v="1"]');
    await b.waitForSelector("#signin-form");
    const left = await api.env.DB.prepare("SELECT COUNT(*) AS n FROM users WHERE email = ?").bind("learner.one@example.com").first();
    check(left.n === 0, "account removed from the server");
    check(!!(await local(b, "certhub:v1:labs")), "progress on the device is kept");

    console.log("Sign in with Google or LinkedIn (development stand-ins)");
    const s = await device();
    await s.goto(BASE + "/#signup");
    await s.waitForSelector(".socialbtn");
    const btns = await s.$$eval(".socialbtn", els => els.map(e => e.textContent.trim()));
    check(btns.join("|") === "Sign up with Google|Sign up with LinkedIn", "sign-up page offers Google and LinkedIn");
    check(await s.$("#signin-form[data-intent=signup]") && /Create your free account/.test(await s.textContent("h1")) && (await s.$$(".perklist li")).length === 4, "sign-up page explains what an account gives you and offers an email link");
    check(/agree to the Terms/.test(await s.textContent(".authsignup")) && !(await s.$("[data-aact=passkey-signin]")), "sign-up page asks for agreement to the Terms, with no passkey button");
    await s.goto(BASE + "/#login");
    await s.waitForSelector("#signin-form[data-intent=login]");
    if (process.env.SHOTS) await s.screenshot({ path: `${process.env.SHOTS}/login.png`, fullPage: true });
    check((await s.textContent("h1")).trim() === "Log in" && !(await s.$(".perklist")) && /Log in with Google/.test(await s.textContent(".social")), "the login page is separate: a short form with Log in buttons");
    check(!!(await s.$('.authswitch a[href="#signup"]')), "the login page links to sign-up");
    await s.click('.authswitch a[href="#signup"]');
    await s.waitForSelector(".authsignup .socialbtn");
    check(/Log in/.test(await s.textContent("#acctchip")), "header shows Log in when signed out");
    if (process.env.SHOTS) await s.screenshot({ path: `${process.env.SHOTS}/signup.png`, fullPage: true });
    // Sign-up asks about the person first: Google waits until the details are filled in.
    await s.click('.socialbtn[data-provider="google"]');
    await s.waitForFunction(() => /Student or Teacher/i.test((document.querySelector("#su-msg") || {}).textContent || ""));
    check(/#signup$/.test(s.url()), "sign-up asks whether you're a student or a teacher before Google");
    await s.click('.kindcard:has(input[value="teacher"])');
    check(await s.isHidden("#su-role-box"), "teachers skip \"Which describes you?\"");
    await s.click('.kindcard:has(input[value="student"])');
    await s.fill("#su-name", "Sam Rivera"); await s.fill("#su-phone", "+1 555 123 4567");
    await s.selectOption("#su-role", "career-changer"); await s.selectOption("#su-goal", "network-plus");
    await s.click('.socialbtn[data-provider="google"]');
    await s.waitForSelector("#fake-continue");
    await s.fill("#fake-name", "Sam Rivera"); await s.fill("#fake-email", "sam.social@example.com");
    await s.click("#fake-continue");
    await s.waitForSelector("#profile-form");
    check(/#profile$/.test(s.url()) && !/welcome=/.test(s.url()), "back on the profile, with the address bar cleaned");
    check(/Welcome to StudyToCert/.test(await s.textContent("#app")), "new account gets a welcome message");
    check((await s.textContent(".profhead h1")).trim() === "Sam Rivera", "profile uses the name from Google");
    check((await s.textContent("#acctchip")).trim() === "SR", "header shows the person's initials");
    await s.fill("#pf-bio", "Help desk tech moving into security.");
    await s.selectOption("#pf-goal", "security-plus");
    await s.fill("#pf-hours", "6");
    await s.click("#profile-form button[type=submit]");
    await s.waitForFunction(() => /Working toward.*Security\+/.test((document.querySelector(".profhead") || {}).textContent || ""));
    check(/Security\+/.test(await s.textContent(".profhead")) && /6 hours a week/.test(await s.textContent(".profhead")), "profile edits saved and shown");
    check(await s.inputValue("#pf-phone") === "+15551234567" && await s.inputValue("#pf-role") === "career-changer", "the sign-up details were saved to the profile");
    // Backup password: add it from the profile, then log in with it instead of email.
    await s.fill("#pw-new", "violet canyon tractor 9"); await s.fill("#pw-new2", "violet canyon tractor 9");
    await s.click("#setpw-form button[type=submit]");
    await s.waitForSelector("[data-aact=rmpassword]");
    check(!(await s.$(".setpw")), "backup password saved; the profile shows it's set");
    await s.click("[data-aact=signout]");
    await s.waitForSelector("#acctchip a[href='#login']");
    await s.goto(BASE + "/#login"); await s.reload();
    try { await s.waitForSelector(".pwlogin"); } catch (e) { await s.screenshot({ path: "/tmp/claude-0/-home-user-Claude-ai-stuff/80d82bf2-f974-54e4-ad55-c3f1f693c0a6/scratchpad/pwlogin.png", fullPage: true }); throw e; }
    await s.click(".pwlogin summary");
    await s.fill("#pw-email", "sam.social@example.com"); await s.fill("#pw-pass", "wrong password guess");
    await s.click("#password-form button[type=submit]");
    await s.waitForFunction(() => /don't match/.test((document.querySelector("#pw-msg") || {}).textContent || ""));
    await s.fill("#pw-pass", "violet canyon tractor 9");
    await s.click("#password-form button[type=submit]");
    await s.waitForSelector("#profile-form");
    check((await s.textContent(".profhead h1")).trim() === "Sam Rivera", "logged in with the backup password");
    // Text-message codes: add the mobile number from the profile, then log in with a texted code.
    await s.click(".pwchange summary:has-text('Add a mobile number')");
    check(await s.inputValue("#smsadd-phone") === "+15551234567", "the mobile number form starts with the sign-up phone number");
    await s.click("#smsadd-btn");
    await s.waitForFunction(() => !document.querySelector("#smsadd-step2").hidden && /texted/.test(document.querySelector("#smsadd-msg").textContent));
    await s.click("#smsadd-btn");
    await s.waitForSelector("[data-aact=rmsms]");
    check(/•••• 4567/.test(await s.textContent("#app")), "mobile number confirmed with a texted code");
    await s.click("[data-aact=signout]");
    await s.waitForSelector("#acctchip a[href='#login']");
    await s.goto(BASE + "/#login"); await s.reload();
    await s.waitForSelector(".pwlogin");
    await s.click(".pwlogin summary");
    await s.fill("#sms-email", "sam.social@example.com");
    await s.click("#sms-btn");
    await s.waitForFunction(() => !document.querySelector("#sms-step2").hidden);
    await s.click("#sms-btn");
    await s.waitForSelector("#profile-form");
    check((await s.textContent(".profhead h1")).trim() === "Sam Rivera", "logged in with a texted code");
    // Richer lessons: story opener, analogy, common mistakes and "You decide" in an open lesson.
    await s.goto(BASE + "/#security-plus.learn"); await s.reload();
    await s.waitForFunction(() => document.querySelectorAll("details.lesson").length > 10 && !document.querySelector(".lesson.locked"));
    await s.click("details.lesson >> nth=2 >> summary");
    check(!!(await s.$("details.lesson[open] .lhook")) && !!(await s.$("details.lesson[open] .lidea")) && (await s.$$("details.lesson[open] ul.lmistakes li")).length >= 2 && !!(await s.$("details.lesson[open] .ltry details")), "a lesson shows its story opener, analogy, common mistakes and a You decide scenario");
    check(!(await s.$('#tabs [data-tab="teach"]')), "the teacher edition tab is hidden from students");
    if (process.env.SHOTS) await s.screenshot({ path: `${process.env.SHOTS}/lesson-rich.png`, fullPage: true });
    // Teacher edition: a teacher account gets the tab, a plan per lesson, and a link from each lesson.
    // One click switches to teacher view, right from the Lessons tab.
    await s.click('.modeswitch.intab [data-mode="teacher"]');
    await s.waitForSelector('#tabs [data-tab="teach"]');
    await s.click('#tabs [data-tab="teach"]');
    await s.waitForSelector("details.tplan");
    check((await s.$$("details.tplan")).length === 72 && !!(await s.$('#tabs [data-tab="teach"]')), "a teacher sees a lesson plan for every Security+ lesson");
    await s.click("details.tplan >> nth=0 >> summary");
    const plan = await s.textContent("details.tplan[open]");
    check(/Objectives/.test(plan) && /45-minute plan/.test(plan) && /Exit ticket/.test(plan) && /Answer:/.test(plan) && /Support:/.test(plan), "a plan has objectives, the 45-minute plan, an exit ticket with answers and differentiation");
    if (process.env.SHOTS) await s.screenshot({ path: `${process.env.SHOTS}/teacher.png`, fullPage: false });
    // Present as slides: arrow keys move through them, Escape closes.
    await s.click("details.tplan[open] [data-act=teachslides]");
    await s.waitForSelector(".slides .slide:not([hidden])");
    const total = +(await s.textContent(".slidecount")).split("/")[1];
    await s.keyboard.press("ArrowRight");
    check(total > 4 && (await s.textContent(".slidecount")).trim() === `2 / ${total}`, "a plan opens as slides, and the arrow keys move through them");
    await s.keyboard.press("Escape");
    await s.waitForSelector(".slides", { state: "detached" });
    // Print a student worksheet: print is stubbed to read what would be printed.
    await s.evaluate(() => { window.print = () => { const w = document.querySelector(".worksheet"); window.__sheet = w ? w.textContent : ""; window.dispatchEvent(new Event("afterprint")); }; });
    await s.click("details.tplan[open] [data-act=teachsheet]");
    const sheet = await s.evaluate(() => window.__sheet || "");
    check(/Name _+/.test(sheet) && /Exit ticket/.test(sheet) && !/Answer:/.test(sheet) && !(await s.$(".worksheet")), "the student worksheet has a name line and the exit ticket, without the answers");
    await s.click("details.tplan[open] [data-act=teachstudent]");
    await s.waitForSelector("details.lesson[open] [data-act=teachplan]");
    check(true, "a plan opens its student lesson, which links back to the teacher edition");
    // And back to student view: the tab goes away and the earlier "Which describes you?" comes back.
    await s.click('.modeswitch.intab [data-mode="student"]');
    await s.waitForFunction(() => !document.querySelector('#tabs [data-tab="teach"]'));
    await s.goto(BASE + "/#profile"); await s.waitForSelector("#profile-form");
    check(await s.inputValue("#pf-role") === "career-changer", "switching back to student view restores the earlier choice");
    // Study tips by email can be switched off.
    await s.goto(BASE + "/#profile"); await s.waitForSelector("[data-aact=emailtips]");
    await s.click("[data-aact=emailtips]");
    await s.waitForSelector('[data-aact=emailtips][data-on="0"]');
    check(true, "study tips by email switched off on the profile");
    // Success stories: shared from the profile, shown on the site only after the owner approves it.
    await s.waitForSelector("#story-form");
    await s.selectOption("#story-cert", "security-plus");
    await s.fill("#story-date", new Date().toISOString().slice(0, 10));
    await s.fill("#story-quote", "Two lessons a day and a practice exam every Sunday.");
    await s.fill("#story-name", "Sam R.");
    await s.check("#story-publish");
    await s.click("#story-form button[type=submit]");
    await s.waitForSelector('#storypanel [data-aact=rmstory]');
    check(/Waiting for a quick check/.test(await s.textContent("#storypanel")), "a shared story waits for approval before it's shown");
    await s.goto(BASE + "/#security-plus.about"); await s.waitForSelector(".booking");
    check(!(await s.$("#storiesbox .story")) && !!(await s.$('.booking a[target=_blank]')), "the About tab has a Book your exam guide, and no unapproved stories");
    await own.goto(BASE + "/#admin"); await own.reload();
    await own.waitForSelector('#adminstories [data-aact=modstory][data-status="approved"]');
    await own.click('#adminstories [data-aact=modstory][data-status="approved"]');
    await own.waitForSelector('#adminstories [data-aact=modstory][data-status="hidden"]');
    await s.reload(); await s.waitForSelector("#storiesbox .story");
    check(/Sam R\./.test(await s.textContent("#storiesbox")), "after the owner approves it, the story shows on the certification's About tab");
    await s.goto(BASE + "/#profile"); await s.waitForSelector("#profile-form");
    if (process.env.SHOTS) await s.screenshot({ path: `${process.env.SHOTS}/profile.png`, fullPage: true });
    // Connect LinkedIn from the profile, then disconnect it.
    await s.click('a[href$="/v1/auth/oauth/linkedin/start?link=1"]');
    await s.waitForSelector("#fake-continue");
    await s.fill("#fake-email", "sam.work@example.com");
    await s.click("#fake-continue");
    await s.waitForSelector('[data-aact="unlink"][data-provider="linkedin"]');
    check(/LinkedIn is connected/.test(await s.textContent("#app")), "LinkedIn connected from the profile");
    await s.click('[data-aact="unlink"][data-provider="linkedin"]');
    await s.click('.modal [data-v="1"]');
    await s.waitForSelector('a[href$="/v1/auth/oauth/linkedin/start?link=1"]');
    check(true, "LinkedIn disconnected");
    // Sign out, then back in with Google: same account.
    await s.click("[data-aact=signout]");
    await s.waitForSelector(".socialbtn");
    await s.click('.socialbtn[data-provider="google"]');
    await s.fill("#fake-name", "Sam Rivera"); await s.fill("#fake-email", "sam.social@example.com");
    await s.click("#fake-continue");
    await s.waitForSelector("#profile-form");
    check(/Help desk tech/.test(await s.textContent(".bio")), "signing in again with Google opens the same account");
    // LinkedIn with an address it hasn't verified, which already has an account here, asks for the email link first.
    await s.click("[data-aact=signout]");
    await s.waitForSelector('.socialbtn[data-provider="linkedin"]');
    check(!(await s.$('.socialbtn[data-provider="facebook"]')), "the login page offers Google and LinkedIn only");
    await s.click('.socialbtn[data-provider="linkedin"]');
    await s.fill("#fake-email", "sam.social@example.com"); await s.uncheck('input[name="verified"]');
    await s.click("#fake-continue");
    await s.waitForSelector("#app .status.warn");
    check(/already exists/.test(await s.textContent("#app .status.warn")), "LinkedIn doesn't take over an existing account by email");
    await s.click('.socialbtn[data-provider="linkedin"]');
    await s.click("#fake-cancel");
    await s.waitForSelector("#app .status.warn");
    check(/cancelled/.test(await s.textContent("#app .status.warn")), "cancelling at the provider explains what happened");
    if (process.env.SHOTS) await s.screenshot({ path: `${process.env.SHOTS}/login-error.png`, fullPage: true });

    console.log("Help widget with the AI assistant (development stub)");
    const h = await device();
    await h.goto(BASE + "/#home"); await h.waitForSelector("#helpbtn");
    await h.waitForFunction(() => CertHub.sync && CertHub.sync.me && CertHub.sync.me.support === true);
    await h.click("#helpbtn"); await h.waitForSelector("#supq");
    await h.fill("#supq", "How do I change the theme?");
    await h.click("#supform button[type=submit]");
    await h.waitForSelector(".supmsg.bot a[href='#settings']");
    check(/Development stub/.test(await h.textContent("#suplog")), "assistant answers in the Help widget, with a link to a site page");
    await h.goto(BASE + "/#help"); await h.waitForSelector("#helppage .supform");
    check(/Development stub/.test(await h.textContent("#psuplog")), "Help page chat box shows the same conversation");
    await h.fill("#psupq", "Is it free?"); await h.click("#psupform button[type=submit]");
    await h.waitForFunction(() => document.querySelectorAll("#psuplog .supmsg.bot").length >= 2);
    check(true, "Help page chat box asks the assistant");
    await h.click("#psuplog .supmsg.bot a[href='#settings']");
    await h.waitForSelector(".settabs");
    check(true, "assistant links open the site's own pages");
    api.env.DB.raw.exec("DELETE FROM rate_limits");

    console.log("Plans and Premium Pro (AI tutor, development stub)");
    const pm = await device();
    await pm.goto(BASE + "/#plans"); await pm.waitForSelector(".plancards");
    check((await pm.$$(".plancard")).length === 3 && (await pm.$$(".ptable tbody tr")).length > 10, "plans page shows three plans and the comparison table");
    check(/header/.test(await pm.evaluate(() => { const r = document.querySelector("header.top #acctchip"); return r && r.querySelector('a[href="#signup"]') && r.querySelector('a[href="#login"]') ? "header" : ""; })), "signed out: header shows Log in and Sign up");
    await signIn(pm, "premium.learner@example.com");
    await pm.goto(BASE + "/#plans"); await pm.waitForSelector(".plancard.best .pcur");
    check(true, "plans page marks Premium Pro as the current plan");
    check(await pm.evaluate(() => CertHub.premium.active), "Premium Pro members have the AI tutor");
    await pm.evaluate(() => { document.getElementById("app").insertAdjacentHTML("beforeend", CertHub.premium.button("interview", "Practice with the AI interviewer", () => ({ subtitle: "SOC analyst", context: { role: "SOC analyst", level: "entry", certs: ["Security+"] } }))); });
    await pm.click("[data-tutor=interview]");
    await pm.waitForSelector(".tutor .tutmsg.ai");
    await pm.waitForFunction(() => /Development stub \(interview\)/.test((document.querySelector(".tutlog") || {}).textContent || ""), null, { timeout: 8000 }).catch(() => {});
    check(/Development stub \(interview\)/.test(await pm.textContent(".tutlog")), "the AI interviewer answers in the tutor window");
    await pm.keyboard.press("Escape");
    await pm.goto(BASE + "/#careers"); await pm.waitForSelector("#advisor-form");
    await pm.fill("#adv-goal", "Move from help desk into a SOC analyst job");
    await pm.click("#advisor-form button[type=submit]");
    await pm.waitForFunction(() => /Development stub \(path\)/.test((document.querySelector(".tutlog") || {}).textContent || ""), null, { timeout: 8000 }).catch(() => {});
    check(/Development stub \(path\)/.test(await pm.textContent(".tutlog")) && /Career & Certification Advisor/.test(await pm.textContent(".tutor")), "the AI career and certification advisor answers from the Career Paths page");
    await pm.fill("#tut-in", "DNS turns names into addresses.");
    await pm.press("#tut-in", "Enter");
    await pm.waitForFunction(() => document.querySelectorAll(".tutor .tutmsg.ai").length >= 2);
    check(true, "follow-up messages get answers");
    await pm.keyboard.press("Escape");
    check(!(await pm.$(".tutor")), "Escape closes the tutor window");
    const pr = await device();
    await signIn(pr, "pro.learner@example.com");
    check(!(await pr.evaluate(() => CertHub.premium.active)), "Pro members don't have the AI tutor");
    await pr.goto(BASE + "/?checkout=cs_test_a1b2c3d4e5f6g7h8#account");
    await pr.waitForFunction(() => /Welcome to Pro/.test((document.getElementById("toast") || {}).textContent || ""));
    check(!pr.url().includes("checkout="), "back from Checkout: welcome message, and the session id is removed from the address bar");
    api.env.DB.raw.exec("DELETE FROM rate_limits");

    console.log("Saving work to the profile");
    const w1 = await device();
    await w1.goto(BASE + "/#portfolio");
    await w1.waitForSelector(".savecard");
    check(/Save your work to a free profile/.test(await w1.textContent(".savecard")), "signed out: portfolio invites saving work to a profile");
    await w1.evaluate(() => {
      localStorage.setItem("certhub:games", JSON.stringify({ subnet: { best: 14, plays: 2, last: Date.now() } }));
      localStorage.setItem("certhub:vmlabs", JSON.stringify({ "vm-cron-review": { when: Date.now() } }));
      localStorage.setItem("certhub:blueteam", JSON.stringify({ "p:1": 1, "t:ransomware": 80 }));
      localStorage.setItem("certhub:activity", JSON.stringify(["2026-09-20", "2026-09-21"]));
    });
    api.env.DB.raw.exec("DELETE FROM rate_limits"); // many sign-ins from one address in this test run
    await signIn(w1, "saver@example.com");
    await w1.goto(BASE + "/#profile");
    await w1.waitForSelector("[data-aact=savework]");
    await w1.click("[data-aact=savework]");
    await w1.waitForFunction(() => /^Saved /.test((document.getElementById("savedstatus") || {}).textContent || ""));
    const listed = await w1.waitForFunction(() => /1 VM lab passed/.test(document.getElementById("app").textContent) && /1 game played/.test(document.getElementById("app").textContent)).then(() => true, () => false);
    check(listed, "profile lists the saved work");
    if (process.env.SHOTS) await w1.screenshot({ path: `${process.env.SHOTS}/saved-work.png`, fullPage: true });
    const doc = await api.env.DB.prepare("SELECT d.body FROM progress_docs d JOIN users u ON u.id = d.user_id WHERE d.doc_key = 'work' AND u.email = ?").bind("saver@example.com").first();
    check(doc && /vm-cron-review/.test(doc.body) && /ransomware/.test(doc.body), "work saved on the server");
    const w2 = await device();
    await signIn(w2, "saver@example.com");
    await w2.waitForFunction(() => !!localStorage.getItem("certhub:vmlabs"), null, { timeout: 8000 });
    const got = await w2.evaluate(() => ({ g: JSON.parse(localStorage.getItem("certhub:games") || "{}"), a: JSON.parse(localStorage.getItem("certhub:activity") || "[]") }));
    check(got.g.subnet && got.g.subnet.best === 14 && got.a.includes("2026-09-21"), "saved work comes back on another device");
    await w2.goto(BASE + "/#dashboard");
    await w2.waitForSelector("#app h1");
    await w2.goto(BASE + "/#portfolio");
    await w2.waitForSelector(".savedline");
    check(/Saved to your profile/.test(await w2.textContent(".savedline")), "signed in: portfolio shows it's saved to the profile");
  } catch (e) {
    check(false, `unexpected error: ${e.message.split("\n")[0]}`);
    if (process.env.DEBUG) console.log(e.stack);
  }

  check(!foreign.length, `no requests to other sites${foreign.length ? ": " + foreign.slice(0, 3).join(", ") : ""}`);
  check(!errors.length, `no page errors${errors.length ? ": " + errors.slice(0, 3).join(" | ") : ""}`);
  await browser.close();
  site.close(); api.server.close();
  console.log(failures ? `\n${failures} check${failures > 1 ? "s" : ""} failed.` : "\nAll account checks passed.");
  process.exit(failures ? 1 : 0);
})();
