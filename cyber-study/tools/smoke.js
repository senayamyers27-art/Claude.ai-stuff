#!/usr/bin/env node
/* End-to-end smoke test in headless Chromium at phone width.
   For every study page: loads without errors, makes no third-party requests, has no
   sideways scroll, runs a quiz and a timed test. Also checks the home page, saved
   progress, redirects, the 404 page and offline mode. */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { serve } = require("./serve");

global.CertHub = { certs: {}, register(c) { this.certs[c.id] = c; } };
const PUB = path.join(__dirname, "..", "public");
require(path.join(PUB, "data/catalog.js"));
const ids = CertHub.catalog.filter(id => fs.existsSync(path.join(PUB, "data", id + ".js")));

const PORT = 8123, BASE = `http://localhost:${PORT}`;
let failures = 0;
const check = (ok, msg) => { console.log(`  ${ok ? "✓" : "✗"} ${msg}`); if (!ok) failures++; };

(async () => {
  const server = await serve(PORT);
  const exe = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const errors = [], foreign = [];
  ctx.on("page", p => {
    p.on("pageerror", e => errors.push(`${p.url()}: ${e.message}`));
    p.on("console", m => { if (m.type() === "error") errors.push(`${p.url()}: ${m.text()}`); });
    p.on("dialog", d => d.accept());
  });
  ctx.on("request", r => { if (!r.url().startsWith(BASE) && !r.url().startsWith("data:")) foreign.push(r.url()); });
  const page = await ctx.newPage();
  page.setDefaultTimeout(8000);

  console.log("Home page");
  await page.goto(BASE + "/");
  await page.waitForSelector(".card");
  const cards = await page.$$eval(".card", c => c.length);
  // "All tracks" shows each track's certifications; a cert in two tracks appears in both.
  const expected = CertHub.tracks.reduce((n, t) => n + t.certs.filter(id => ids.includes(id)).length, 0);
  check(cards === expected, `${cards} certification cards across ${CertHub.tracks.length} tracks (expected ${expected})`);

  for (const id of ids) {
    console.log(id);
    await page.goto(`${BASE}/${id}/`);
    await page.waitForSelector("h1");
    check((await page.textContent("h1")).startsWith("Week "), "week view renders");
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    check(sw <= 390, `no sideways scroll (${sw}px)`);
    await page.click("[data-act=weekly]");
    const total = +(await page.textContent(".flex.note")).match(/of (\d+)/)[1];
    check(total === 10, `weekly quiz has ${total} questions`);
    await page.click(".opt >> nth=0");
    check(!!(await page.$(".opt.right")), "answer feedback shows the correct option");
    await page.click("[data-act=quit]");
    check(!!(await page.$(".modal")), "leaving a quiz asks for confirmation in the page");
    await page.click('.modal [data-v="1"]');
    await page.click("[data-tab=practice]");
    await page.click("[data-act=exam]");
    check(!!(await page.$("#timer")), "practice exam starts with a timer");
    await page.click("[data-act=finish]");
    await page.click('.modal [data-v="1"]');
    check(!!(await page.$(".big")), "practice exam can be submitted and scored");
    await page.click("[data-act=quit]");
    for (const t of ["plan", "labs", "progress", "about"]) { await page.click(`[data-tab=${t}]`); await page.waitForTimeout(50); }
    check(!!(await page.$("#app h1")), "plan, labs, progress and about tabs render");
  }

  console.log("Labs");
  const labCount = fs.readdirSync(path.join(PUB, "data")).filter(f => /^labs-/.test(f)).reduce((n, f) => { let k = 0; global.CertHub.registerLabs = l => { k = l.length; }; require(path.join(PUB, "data", f)); return n + k; }, 0);
  await page.goto(`${BASE}/#labs`);
  await page.waitForSelector(".labcard");
  const shown = await page.$$eval(".labcard", c => c.length);
  check(shown === labCount, `lab library shows ${shown} labs (expected ${labCount})`);
  await page.fill("#f-q", "wireshark");
  await page.waitForTimeout(300);
  check((await page.$$eval(".labcard", c => c.length)) >= 1 && (await page.$$eval(".labcard", c => c.length)) < labCount, "lab search filters the list");
  await page.goto(`${BASE}/#lab-home-lab`);
  await page.waitForSelector(".steps-list");
  check((await page.$$(".steps-list > li")).length >= 8, "lab page lists its steps");
  check((await page.evaluate(() => document.documentElement.scrollWidth)) <= 390, "lab page has no sideways scroll");
  await page.check('[data-lstep="0"]');
  await page.fill("#labnotes", "Smoke test note");
  await page.waitForTimeout(600);
  await page.click('[data-lact="done"]');
  await page.click('[data-v="1"]');
  await page.goto(`${BASE}/#portfolio`);
  await page.waitForSelector("h1");
  check((await page.textContent("#app")).includes("Build a home") || (await page.$$eval(".row", r => r.length)) > 0, "finished lab appears in the portfolio");
  await page.goto(`${BASE}/#security-plus`);
  await page.waitForSelector(".labgrid");
  check((await page.$$(".labgrid .labcard")).length >= 1, "study week links to its labs");
  // Lessons are checked once Security+ has them (docs/LESSON_GUIDE.md).
  if (require("fs").existsSync(require("path").join(__dirname, "../public/data/lessons/security-plus.js"))) {
  await page.waitForSelector("details.lesson");
  await page.click("details.lesson >> nth=0 >> summary");
  check((await page.$$eval("details.lesson[open] .lbody p", ps => ps.length)) >= 3, "study week teaches each topic with a lesson");
  await page.click("details.lesson[open] [data-act=read]");
  check(await page.$("details.lesson .chip") !== null, "a lesson can be marked as read");
  await page.goto(`${BASE}/#security-plus.learn`);
  await page.waitForSelector("details.lesson");
  check((await page.$$("details.lesson")).length >= 70, "Lessons tab lists every lesson");
  await page.fill("#lsearch", "ocsp stapling");
  check(/^[1-9]\d* lessons? match/.test(await page.textContent("#lsearch-n")), "lesson search finds a lesson");
  await page.fill("#lsearch", "");
  check(await page.$("details.glossary dl.terms dt") !== null, "Lessons tab has a glossary");
  await page.click("details.lesson >> nth=1 >> summary");
  await page.click("details.lesson[open] [data-act=video]");
  await page.waitForSelector(".ov-slide");
  check((await page.textContent(".ov-n")).startsWith("1 /"), "lesson overview video opens");
  await page.keyboard.press("Escape");
  check(!(await page.$(".ov-wrap")), "overview closes with Escape");
  const lp = await page.goto(`${BASE}/security-plus/lessons/`);
  check(lp.status() === 200 && (await page.$$("main li a")).length >= 70, "static lesson index page lists every lesson");
  await page.goto(`${BASE}/security-plus/#security-plus.practice`);
  await page.waitForSelector("[data-act=placement]");
  await page.click("[data-act=placement]");
  await page.waitForSelector(".opt");
  for (let i = 0; i < 40 && await page.$(".opt"); i++) { await page.click(".opt >> nth=0"); await page.click("[data-act=next]"); }
  await page.waitForSelector(".big");
  check((await page.textContent("#app")).includes("Where to start"), "placement test recommends where to start");
  check((await page.$$("a.report")).length > 0, "questions have a Report a mistake link");
  check((await page.$$("details.whys")).length > 0, "missed questions explain why the other options are wrong");
  await page.click("[data-act=quit]");
  await page.waitForSelector("[data-act=simstart]");
  await page.click("[data-act=simstart] >> nth=0");
  await page.waitForSelector("[data-act=simcheck]");
  await page.click("[data-act=simcheck]");
  check(/correct \(\d+%\)/.test(await page.textContent(".expl")), "exam simulation can be answered and scored");
  await page.click("[data-act=simquit] >> nth=0");
  await page.click("[data-act=drillstart][data-kind=ports]");
  await page.waitForSelector("[data-drill]");
  await page.click("[data-drill] >> nth=0");
  check(/Correct|Answer:/.test(await page.textContent("#app")), "skill drill gives instant feedback");
  await page.click("[data-act=drillquit]");
  await page.click("[data-act=smart]");
  await page.waitForSelector(".qhead");
  check(/Smart practice/.test(await page.textContent(".qhead")) && /of 15/.test(await page.textContent("#app")), "smart practice picks 15 questions");
  await page.click("[data-act=quit]");
  if (await page.$(".modal")) await page.click('.modal [data-v="1"]');
  await page.waitForSelector("[data-act=tcstart]");
  await page.click("[data-act=tcstart]");
  await page.click("[data-act=fcflip]");
  await page.click("[data-act=fcknow]");
  check(/2 of \d+/.test(await page.textContent(".qhead")), "key-term flashcards can be studied for free");
  await page.click("[data-act=fcdone]");
  await page.goto(`${BASE}/#security-plus.learn`);
  await page.waitForSelector("[data-act=playweek]");
  await page.click("[data-act=playweek] >> nth=0");
  await page.waitForSelector(".ov-wrap");
  check(/more in this playlist/.test(await page.textContent(".ov-top")), "a week's overview videos play as a playlist");
  await page.keyboard.press("Escape");
  await page.waitForSelector("details.lesson");
  await page.click("details.lesson >> nth=0 >> summary");
  await page.click('details.lesson >> nth=0 >> [data-act=rate][data-v="1"]');
  check((await page.getAttribute('details.lesson >> nth=0 >> [data-act=rate][data-v="1"]', "aria-pressed")) === "true", "a lesson can be rated helpful");
  // Hands-on practice: a terminal task, a KQL query and a Python exercise, solved with their own solutions.
  const solveWith = async sel => { await page.click("[data-act=hosol]"); return (await page.textContent("#hosolution")).split("\n"); };
  await page.goto(`${BASE}/#linux-plus.practice`);
  await page.waitForSelector("[data-act=hostart]");
  await page.click("[data-act=hostart] >> nth=0");
  await page.waitForSelector("#hocmd");
  for (const c of await solveWith()) { await page.fill("#hocmd", c); await page.press("#hocmd", "Enter"); }
  check(await page.isVisible("text=All tasks complete."), "terminal task can be completed in the simulated shell");
  await page.goto(`${BASE}/#ccna.practice`);
  await page.waitForSelector("[data-act=hostart]");
  await page.click("[data-act=hostart] >> nth=0");
  await page.waitForSelector("#hocmd");
  for (const c of await solveWith()) { await page.fill("#hocmd", c); await page.press("#hocmd", "Enter"); }
  check(await page.isVisible("text=All tasks complete."), "Cisco IOS task can be completed in the simulated switch");
  await page.goto(`${BASE}/#sc-200.practice`);
  await page.waitForSelector("[data-act=hostart]");
  await page.click("[data-act=hostart] >> nth=0");
  await page.waitForSelector("[data-act=hokql]:not([disabled])");
  await page.fill("#hoq", (await solveWith()).join("\n"));
  await page.click("[data-act=hokql]");
  check(/expected result/.test(await page.textContent("#horesult")) && (await page.$$("table.kqlt tbody tr")).length > 0, "KQL query task runs and checks the result");
  await page.goto(`${BASE}/#pcep.practice`);
  await page.waitForSelector("[data-act=hostart]");
  await page.click("[data-act=hostart] >> nth=0");
  await page.fill("#hocode", (await solveWith()).join("\n"));
  await page.click("[data-act=horun]");
  await page.waitForFunction(() => /tests pass|couldn't|too long/.test(document.querySelector("#horesult").textContent), null, { timeout: 120000 });
  check(/(\d+) of \1 tests pass/.test(await page.textContent("#horesult")), "Python exercise runs in the browser and passes its tests");
  await page.click("[data-act=hoquit]");
  await page.goto(`${BASE}/#security-plus.progress`);
  await page.waitForSelector(".panel.ready");
  check(/\d+\/100/.test(await page.textContent(".panel.ready")), "Progress tab shows an exam readiness score");
  await page.goto(`${BASE}/#security-plus.cheat`);
  await page.waitForSelector(".panel.cheat");
  check((await page.$$(".panel.cheat")).length === 5, "cheat sheet covers every domain");
  await page.goto(`${BASE}/#career-cybersecurity`);
  await page.waitForSelector("details.sq");
  check((await page.$$("details.sq")).length >= 8, "career page has interview practice");
  { const r = await page.goto(`${BASE}/security-plus/lessons/`); const html = await r.text(); check(!/og:image/.test(html) || /og\/security-plus\.png/.test(html), "certification pages use their own link-preview image"); }
  for (const pth of ["careers/network/", "security-plus/cheat-sheet/"]) { const r = await page.goto(`${BASE}/${pth}`); check(r.status() === 200 && (await page.$("h1")) !== null, `/${pth} static page renders`); }
  }
  for (const pth of ["privacy", "terms", "security", "frameworks"]) {
    const r = await page.goto(`${BASE}/${pth}/`);
    await page.waitForSelector("h1");
    check(r.status() === 200 && /Privacy|Terms|Security|Frameworks/.test(await page.textContent("h1")), `/${pth}/ policy page renders`);
  }

  console.log("Without accounts");
  let proSeen = false;
  for (const h of [`#${ids[0]}.practice`, `#${ids[0]}.progress`, "#labs", "#account"]) {
    await page.goto(`${BASE}/${h}`);
    await page.waitForSelector("#app h1");
    if (await page.$(".chip.pro, .pro-teaser, [data-tab=guide], a[href='#account']")) proSeen = true;
  }
  check(!proSeen, "no Pro prompts, Pro tab or Account link when accounts aren't configured");

  console.log("Saved progress");
  await page.goto(`${BASE}/${ids[0]}/`);
  await page.check('[data-check="1-0"]');
  await page.waitForTimeout(500);
  await page.reload();
  await page.waitForSelector('[data-check="1-0"]');
  check(await page.isChecked('[data-check="1-0"]'), "a checked study day survives a reload");

  console.log("Redirects and errors");
  const r1 = await page.goto(BASE + "/secplus");
  check(r1.url() === BASE + "/security-plus/", "/secplus redirects to /security-plus/");
  const r2 = await page.goto(BASE + "/no-such-page");
  check(r2.status() === 404 && (await page.textContent("h1")).includes("isn't here"), "unknown pages return the 404 page");

  console.log("Offline");
  await page.goto(`${BASE}/${ids[1] || ids[0]}/`);
  const ready = await page.evaluate(() => navigator.serviceWorker && navigator.serviceWorker.ready.then(() => true));
  check(ready, "service worker installs");
  await page.reload();
  await ctx.setOffline(true);
  await page.reload();
  await page.waitForSelector("h1", { timeout: 5000 }).catch(() => {});
  check(((await page.textContent("h1").catch(() => "")) || "").startsWith("Week "), "study page still opens with no connection");
  await ctx.setOffline(false);

  // Offline reloads log network errors by design; ignore those.
  const real = errors.filter(e => !/ERR_INTERNET_DISCONNECTED|Failed to load resource/.test(e));
  check(real.length === 0, "no JavaScript errors" + (real.length ? ":\n    " + real.join("\n    ") : ""));
  check(foreign.length === 0, "no requests to other sites" + (foreign.length ? ": " + [...new Set(foreign)].join(", ") : ""));

  await browser.close();
  server.close();
  console.log(failures ? `\n${failures} check${failures > 1 ? "s" : ""} failed.` : "\nAll smoke checks passed.");
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
