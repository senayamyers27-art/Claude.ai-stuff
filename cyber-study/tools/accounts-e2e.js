#!/usr/bin/env node
/* Browser test for optional accounts, against the API running locally (api/dev-server.js).
   Signs in with an emailed link on two "devices", syncs progress both ways, and runs the
   instructor flow: organization, cohort, invite link, learner joins, progress summary. */
const { chromium } = require("playwright");
const { serve } = require("./serve");

const SITE_PORT = 8124, API_PORT = 8788;
const BASE = `http://localhost:${SITE_PORT}`, API = `http://localhost:${API_PORT}`;
let failures = 0;
const check = (ok, msg) => { console.log(`  ${ok ? "✓" : "✗"} ${msg}`); if (!ok) failures++; };

(async () => {
  const { start } = require("../api/dev-server.js");
  const api = await start({ port: API_PORT, siteOrigin: BASE });
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
    await a.waitForSelector(".card");
    check(await a.$('nav.tabs a[href="#account"]'), "Account tab shown when an API is configured");
    await a.goto(BASE + "/#account");
    check(await a.$("#signin-form"), "account page offers sign-in");
    check(/Optional accounts/.test(await (await a.goto(BASE + "/#privacy"), a.textContent("#app"))), "Privacy Policy describes accounts");

    console.log("Device A: sign in and upload");
    await a.evaluate(() => {
      localStorage.setItem("certhub:v1:labs", JSON.stringify({ "lab-a": { started: 1000, steps: { 0: true }, notes: "notes from A", notesAt: 2000 } }));
      localStorage.setItem("certhub:v1:security-plus", JSON.stringify({ checks: { "1-1": true }, stats: { 1: { c: 3, t: 4 } }, history: [] }));
    });
    await signIn(a, "learner.one@example.com");
    check(/learner\.one@example\.com/.test(await a.textContent("#app")), "account page shows the email");
    await a.waitForFunction(() => /^Synced/.test((document.getElementById("syncstatus") || {}).textContent || ""));
    check(true, "first sync finished");

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

    console.log("Delete account");
    await b.goto(BASE + "/#account");
    await b.click("[data-aact=delete]");
    await b.click('.modal [data-v="1"]');
    await b.waitForSelector("#signin-form");
    const left = await api.env.DB.prepare("SELECT COUNT(*) AS n FROM users WHERE email = ?").bind("learner.one@example.com").first();
    check(left.n === 0, "account removed from the server");
    check(!!(await local(b, "certhub:v1:labs")), "progress on the device is kept");
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
