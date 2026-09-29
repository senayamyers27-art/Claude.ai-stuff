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
  ctx.on("request", r => { if (!r.url().startsWith(BASE) && !r.url().startsWith("data:") && !r.url().startsWith("blob:" + BASE)) foreign.push(r.url()); });
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
    // Markup that was escaped twice shows up as literal tags in the text.
    check(!/<\/?(li|button|a|span|strong|code)\b/i.test(await page.textContent("#app")), "no raw HTML tags shown as text on the week view");
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
    await page.keyboard.press("b"); await page.keyboard.press("a");
    check((await page.getAttribute(".opt >> nth=0", "aria-pressed")) === "true", "keyboard shortcut A picks the first option");
    await page.click("[data-act=flag]");
    await page.click("[data-strike='1']");
    check(!!(await page.$(".opt.struck")) && (await page.getAttribute("[data-act=flag]", "aria-pressed")) === "true", "exam questions can be flagged and options crossed out");
    await page.click("[data-act=reviewall]");
    check(!!(await page.$(".qgrid .qcell.flag.done")), "the review screen shows answered and flagged questions");
    await page.click("[data-goto='0']");
    check(!!(await page.$(".opt.struck")), "going back keeps crossed-out options");
    await page.click("[data-act=finish]");
    await page.click('.modal [data-v="1"]');
    check(!!(await page.$(".big")), "practice exam can be submitted and scored");
    await page.click("[data-act=quit]");
    for (const t of ["plan", "labs", "progress", "about"]) { await page.click(`[data-tab=${t}]`); await page.waitForTimeout(50); }
    check(!!(await page.$("#app h1")), "plan, labs, progress and about tabs render");
  }

  // Practice VM: restores the VM snapshot in the page, runs a command, and checks a graded lab (about 30 s).
  // SKIP_VM=1 skips it.
  if (!process.env.SKIP_VM) {
    console.log("Practice VM");
    const vmReady = () => page.waitForFunction(() => /Ready/.test((document.querySelector("#vmstatus") || {}).textContent || ""), null, { timeout: 180000 }).then(() => true, () => false);
    await page.goto(`${BASE}/#vm`);
    await page.waitForSelector("#vmgo");
    check(await page.$$eval(".labcard", c => c.length) > 0, "practice VM hub lists graded labs");
    await page.click("#vmgo");
    const ready = await vmReady();
    check(ready, "practice VM starts");
    if (ready) {
      await page.waitForTimeout(2000);
      await page.click(".xterm-rows");
      await page.keyboard.type("echo SMOKE-$((2+3)); systemctl is-system-running\n");
      const ran = await page.waitForFunction(() => /SMOKE-5/.test((document.querySelector(".xterm-rows") || {}).innerText || ""), null, { timeout: 20000 }).then(() => true, () => false);
      check(ran, "practice VM runs commands");
    }
    await page.goto(`${BASE}/#vm-lab-cron`);
    await page.waitForSelector("#vmgo"); await page.click("#vmgo");
    if (await vmReady()) {
      await page.click("[data-vm=check]");
      const graded = await page.waitForFunction(() => /checks pass|complete/.test((document.querySelector("#vmresults") || {}).textContent || ""), null, { timeout: 120000 }).then(() => true, () => false);
      check(graded, "graded lab checks run inside the VM");
    } else check(false, "graded lab VM starts");
    await page.goto(`${BASE}/#home`);
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
  // Timed tests end on the review screen: submit from there.
  check(!!(await page.$(".qgrid")), "a timed test ends on a review screen before submitting");
  await page.click("[data-act=finish]");
  await page.click('.modal [data-v="1"]');
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
  check(!!(await page.$(".kmap .kmcells i.miss, .kmap .kmcells i.known")), "Progress tab shows the knowledge map with answered questions");
  await page.goto(`${BASE}/#dashboard`);
  await page.waitForSelector("#app h1");
  { const card = await page.$('.dashcard:has(a[href="#security-plus.week"])'); check(!!card && /\d+\/100/.test(await card.textContent()) && (await page.$$(".dashsum .panel")).length === 5, "dashboard lists a started certification with its readiness"); }
  await page.goto(`${BASE}/#achievements`);
  await page.waitForSelector(".ach");
  check((await page.$$(".ach.got")).length >= 1, "achievements page shows earned badges");
  await page.goto(`${BASE}/#settings.accessibility`);
  await page.waitForSelector('[data-pref="size:lg"]');
  await page.click('[data-pref="size:lg"]'); await page.click('[data-pref="contrast:more"]'); await page.click('[data-pref="read:on"]');
  await page.reload(); await page.waitForSelector("#app h1");
  check(await page.evaluate(() => { const r = document.documentElement; return r.dataset.size === "lg" && r.dataset.contrast === "more" && r.dataset.read === "easy"; }), "reading settings apply and survive a reload");
  await page.click('[data-pref="size:md"]'); await page.click('[data-pref="contrast:normal"]'); await page.click('[data-pref="read:off"]');
  await page.click('[data-pref="motion:reduce"]'); await page.click('[data-pref="links:on"]'); await page.click('[data-pref="focusring:strong"]');
  await page.reload(); await page.waitForSelector('[data-pref="motion:reduce"]');
  check(await page.evaluate(() => { const r = document.documentElement; return r.dataset.motion === "reduce" && r.dataset.links === "on" && r.dataset.focusring === "strong" && CertHub.fx.calm(); }), "accessibility settings (reduce motion, underlined links, focus outline) apply and survive a reload");
  await page.click('[data-pref="motion:auto"]'); await page.click('[data-pref="links:off"]'); await page.click('[data-pref="focusring:normal"]');
  await page.click('[data-pref="time:1.5"]'); await page.click('[data-pref="keys:off"]');
  await page.goto(`${BASE}/#security-plus.practice`);
  await page.waitForSelector("[data-act=exam]"); await page.click("[data-act=exam]"); await page.waitForSelector(".qhead");
  const xt = await page.evaluate(() => ({ chip: /Time and a half/.test(document.querySelector(".qhead").textContent) }));
  await page.keyboard.press("a");
  check(xt.chip && !(await page.$(".opt[aria-pressed=true]")), "extra time shows on timed tests, and single-key shortcuts can be turned off");
  await page.click("[data-act=quit]").catch(() => {}); await page.click('.modal [data-v="1"]').catch(() => {});
  await page.evaluate(() => { localStorage.removeItem("certhub:extratime"); localStorage.removeItem("certhub:keys"); });
  await page.goto(`${BASE}/#settings`); await page.waitForSelector('[data-set="theme:dark"]');
  await page.click('[data-set="theme:dark"]');
  check(await page.evaluate(() => document.documentElement.dataset.theme === "dark" && localStorage.getItem("certhub:theme") === "dark" && document.getElementById("theme").textContent === "Dark"), "settings page switches the theme and updates the header button");
  await page.click('[data-set="theme:auto"]');
  await page.goto(`${BASE}/#settings.study`); await page.waitForSelector("#set-name");
  await page.fill("#set-name", "Test Learner"); await page.press("#set-name", "Tab");
  check(await page.evaluate(() => localStorage.getItem("certhub:name") === "Test Learner"), "settings page saves the certificate name");
  // Help box on the home page and the full Help page (every answer), alongside the floating Help panel.
  await page.goto(`${BASE}/#home`); await page.waitForSelector("#homehelp .supsearch");
  await page.fill("#hsupsearch", "Spanish");
  await page.waitForSelector("#hsupresults details[open]");
  check(/Spanish|español/i.test(await page.textContent("#hsupresults")), "home page has a help box that searches the answers");
  await page.goto(`${BASE}/#help`); await page.waitForSelector("#helppage .supqa");
  check((await page.$$("#helppage .supqa")).length === await page.evaluate(() => CertHub.help.length) && !!(await page.$('.footlinks a[href="#help"]')), "Help page lists every answer and is linked from the footer");
  await page.goto(`${BASE}/#settings`); await page.waitForSelector(".settabs");
  // Help widget: opens from the button, searches the built-in answers, closes with Escape (no API here, so no chat).
  await page.click("#helpbtn"); await page.waitForSelector("#supsearch");
  await page.fill("#supsearch", "backup another device");
  await page.waitForSelector("#supresults details[open]");
  check(/phone and computer|Where is my progress saved/.test(await page.textContent("#supresults")) && !(await page.$("#supform")), "Help widget searches the built-in answers (no chat without the API)");
  await page.keyboard.press("Escape");
  check(await page.evaluate(() => document.getElementById("supportpanel").hidden && document.activeElement === document.getElementById("helpbtn")), "Help closes with Escape and returns focus to the button");
  await page.goto(`${BASE}/#settings.data`); await page.waitForSelector("[data-set='erase:all']");
  check(!!(await page.$('.footlinks a[href="#settings"]')) && !!(await page.$("[data-gact=download]")) && (await page.$$(".settabs a")).length >= 5, "settings has tabs, backups and a footer link");
  { // Streak freeze: one missed day inside a run doesn't break the streak; two in a week do.
    const r = await page.evaluate(() => {
      const d = n => CertHub.U.iso(CertHub.U.addDays(CertHub.U.today(), -n));
      const save = localStorage.getItem("certhub:activity");
      localStorage.setItem("certhub:activity", JSON.stringify([d(0), d(1), d(3), d(4), d(6)]));
      const a = CertHub.activity.streak();
      localStorage.setItem("certhub:activity", save || "[]");
      return a;
    });
    check(r.current === 4 && r.frozen.length === 1, `streak freeze bridges one missed day a week (got ${r.current})`);
  }
  await page.goto(`${BASE}/#dashboard`);
  await page.waitForSelector(".goalcard");
  await page.click('[data-goal="3"]');
  check((await page.getAttribute('[data-goal="3"]', "aria-pressed")) === "true" && !!(await page.$(".recap")), "dashboard sets a weekly goal and shows the weekly recap");
  await page.click('[data-habit="focus"][data-min="15"]');
  check(!!(await page.$("#focuspill")), "focus timer starts");
  await page.click('[data-habit="focusstop"]');
  check(!(await page.$("#focuspill")), "focus timer stops");
  await page.goto(`${BASE}/#security-plus.practice`);
  await page.waitForSelector(".builder");
  await page.click(".builder summary");
  await page.selectOption("#bcount", "10");
  await page.click("[data-act=custom]");
  await page.waitForSelector(".opt");
  await page.click("[data-act=guess]");
  check((await page.getAttribute("[data-act=guess]", "aria-pressed")) === "true", "custom quiz starts and answers can be marked as a guess");
  await page.click("[data-act=quit]"); await page.click('.modal [data-v="1"]');
  await page.goto(`${BASE}/#security-plus.cards`);
  await page.waitForSelector(".pcard");
  check((await page.$$(".pcard")).length > 20, "printable flashcards page lists key terms");
  await page.goto(`${BASE}/#security-plus.learn`);
  await page.waitForSelector("details.lesson");
  check(!!(await page.$('[data-act="listen"]')) || !(await page.evaluate(() => "speechSynthesis" in window)), "lessons have a Listen button where speech is supported");
  await page.goto(`${BASE}/#security-plus.progress`);
  await page.waitForSelector("#exam");
  const examWas = await page.inputValue("#exam");
  await page.fill("#exam", await page.evaluate(() => CertHub.U.iso(CertHub.U.addDays(CertHub.U.today(), 3))));
  await page.dispatchEvent("#exam", "change");
  await page.goto(`${BASE}/#security-plus.week`);
  await page.waitForSelector("#app h1");
  check(!!(await page.$(".finalweek .fw li.now")), "the last week before the exam shows the final-week plan");
  await page.goto(`${BASE}/#security-plus.progress`); await page.waitForSelector("#exam");
  await page.fill("#exam", examWas); await page.dispatchEvent("#exam", "change");
  await page.goto(`${BASE}/#exam-changes`);
  await page.waitForSelector("table.plain");
  check((await page.$$("table.plain tbody tr")).length >= 40, "exam changes page lists every certification");
  await page.goto(`${BASE}/#schools`);
  await page.waitForSelector("#app h1");
  check(/teachers/i.test(await page.textContent("#app h1")), "page for teachers and schools renders");
  await page.goto(`${BASE}/#career-network`);
  await page.waitForSelector(".dayline li");
  check((await page.$$(".dayline li")).length >= 5, "career pages show a day in the life");
  await page.goto(`${BASE}/#job-outlook`);
  await page.waitForSelector("table.plain");
  check((await page.$$("table.plain tbody tr")).length >= 8 && /bls\.gov/.test(await page.innerHTML("#app")), "pay and job outlook page lists occupations with BLS sources");
  await page.goto(`${BASE}/#net-design`);
  await page.waitForSelector("[data-nslot]");
  { const puzzles = await page.evaluate(() => CertHub.netdesign.puzzles); let solved = 0;
    for (let i = 0; i < puzzles.length; i++) {
      for (const [id, ans] of puzzles[i].answers) await page.selectOption(`[data-nslot="${id}"]`, ans);
      await page.click("[data-nd=check]");
      if (await page.textContent(".expl strong") === "All correct.") solved++;
      if (i < puzzles.length - 1) await page.click("[data-nd=next]");
    }
    check(solved === puzzles.length, `network design puzzles accept the right devices (${solved}/${puzzles.length})`); }
  await page.goto(`${BASE}/#log-puzzles`);
  await page.waitForSelector("[data-logpick]");
  { const n = await page.evaluate(() => CertHub.blueteam.puzzles); let ok = 0;
    for (let i = 0; i < n; i++) { await page.click("[data-logpick='0']"); if (await page.$(".logline.right")) ok++; if (i < n - 1) await page.click("[data-bt=pnext]"); }
    check(ok === n, `log puzzles mark the right line and explain it (${ok}/${n})`); }
  await page.goto(`${BASE}/#tabletop`);
  await page.waitForSelector(".card");
  for (const id of await page.evaluate(() => CertHub.blueteam.tabletops)) {
    await page.goto(`${BASE}/#tabletop-${id}`);
    await page.waitForSelector("[data-ttpick]");
    // The best choice in every scenario is written first (index 0); the page shuffles the order it shows them in.
    for (let i = 0; i < 10 && await page.$("[data-ttpick]"); i++) await page.click("[data-ttpick='0']");
    check(/\b(\d+) of \1 points\b/.test(await page.textContent("#btbox")) && !!(await page.$(".ring")), `tabletop ${id} reaches its end with the best path scoring 100%`);
  }
  await page.goto(`${BASE}/#games`);
  await page.waitForSelector(".gamecard");
  check((await page.$$(".gamecard")).length === 5, "games page lists the quick games");
  { // Subnetting answers are computed; check 400 of them against an independent calculation.
    const bad = await page.evaluate(() => {
      const toN = s => s.split(".").reduce((a, o) => a * 256 + +o, 0), out = [];
      for (let i = 0; i < 400; i++) {
        const q = CertHub.games._q.subnetQ(); let m, want;
        if ((m = /usable host addresses are in a \/(\d+)/.exec(q.q))) want = String(2 ** (32 - m[1]) - 2);
        else if ((m = /subnet mask is \/(\d+)/.exec(q.q))) { const n = 2 ** 32 - 2 ** (32 - m[1]); want = [24, 16, 8, 0].map(s => Math.floor(n / 2 ** s) % 256).join("."); }
        else if ((m = /(network|broadcast) address of ([\d.]+)\/(\d+)/.exec(q.q))) { const size = 2 ** (32 - m[3]), a = toN(m[2]), net = a - a % size, v = m[1] === "network" ? net : net + size - 1; want = [24, 16, 8, 0].map(s => Math.floor(v / 2 ** s) % 256).join("."); }
        if (q.a !== want || q.o.length !== 4 || new Set(q.o).size !== 4 || !q.o.includes(q.a)) out.push(q.q + " -> " + q.a + " (want " + want + ")");
      }
      for (const f of ["portQ", "acronymQ", "osiQ", "commandQ"]) for (let i = 0; i < 100; i++) { const q = CertHub.games._q[f](); if (q.o.length !== 4 || new Set(q.o).size !== 4 || !q.o.includes(q.a)) out.push(f + ": " + q.q); }
      return out;
    });
    check(!bad.length, "game questions have one right answer among four different options" + (bad.length ? `: ${bad.slice(0, 3).join("; ")}` : ""));
  }
  await page.goto(`${BASE}/#game-ports`);
  await page.click("[data-game=start]");
  await page.waitForSelector("[data-gopt]");
  await page.keyboard.press("1");
  await page.waitForFunction(() => /Correct|Answer:/.test(document.querySelector("#gfeed").textContent));
  check(true, "a game round starts and takes keyboard answers");
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
