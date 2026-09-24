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
  check(cards === CertHub.catalog.length, `${cards} certification cards (expected ${CertHub.catalog.length})`);

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
    await page.click("[data-tab=practice]");
    await page.click("[data-act=exam]");
    check(!!(await page.$("#timer")), "practice exam starts with a timer");
    await page.click("[data-act=finish]");
    check(!!(await page.$(".big")), "practice exam can be submitted and scored");
    await page.click("[data-act=quit]");
    for (const t of ["plan", "progress", "about"]) await page.click(`[data-tab=${t}]`);
    check(!!(await page.$("#app h1")), "plan, progress and about tabs render");
  }

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
