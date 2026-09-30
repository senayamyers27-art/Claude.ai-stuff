#!/usr/bin/env node
/* Daily check of the deployed site as a visitor sees it (headless Chromium at phone width), plus the accounts
   API when one is configured. Read-only: it answers a practice question in its own throwaway browser profile
   and never signs in, pays or sends a help-assistant question.
     node tools/live-journey.js                      checks https://<domain> from site.config.json
     LIVE_URL=https://example.com node tools/live-journey.js
   Also: a sample of pages from the live sitemap, the web app manifest, the service worker and offline mode,
   load time of the home page, and JavaScript errors. Exits 1 on any failure; writes a Markdown summary to
   $GITHUB_STEP_SUMMARY when set. */
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "site.config.json"), "utf8"));
const BASE = (process.env.LIVE_URL || `https://${cfg.domain}`).replace(/\/$/, "");
const API = (process.env.LIVE_API || cfg.apiOrigin || "").replace(/\/$/, "");
const CERT = process.env.LIVE_CERT || "security-plus";
const SLOW_MS = Number(process.env.LIVE_SLOW_MS) || 6000;
const results = [];
const check = (ok, msg) => { results.push({ ok: !!ok, msg }); console.log(`  ${ok ? "✓" : "✗"} ${msg}`); };
const step = async (name, fn) => { console.log(name); try { await fn(); } catch (e) { check(false, `${name}: ${String(e.message || e).split("\n")[0]}`); } };

(async () => {
  const exe = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const errors = [];
  ctx.on("page", p => {
    p.on("pageerror", e => errors.push(`${p.url()}: ${e.message}`));
    p.on("console", m => { if (m.type() === "error") errors.push(`${p.url()}: ${m.text()}`); });
    p.on("dialog", d => d.accept());
  });
  const page = await ctx.newPage();
  page.setDefaultTimeout(15000);

  await step("Home page", async () => {
    const t = Date.now();
    const res = await page.goto(BASE + "/", { waitUntil: "load" });
    await page.waitForSelector(".tiles .tile");
    const ms = Date.now() - t;
    check(res && res.status() === 200, `home page answers 200 (${res && res.status()})`);
    check(ms < SLOW_MS, `home page is usable in ${ms} ms (limit ${SLOW_MS})`);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    check(sw <= 390, `no sideways scroll at phone width (${sw}px)`);
  });

  await step("Installable app", async () => {
    const href = await page.getAttribute('link[rel="manifest"]', "href");
    const man = await (await page.request.get(new URL(href, BASE + "/").href)).json();
    check(man.name && man.start_url && (man.icons || []).length, "the web app manifest loads with a name, start URL and icons");
    const ready = await page.evaluate(() => navigator.serviceWorker && Promise.race([navigator.serviceWorker.ready.then(() => true), new Promise(r => setTimeout(() => r(false), 15000))]));
    check(ready, "the service worker installs");
  });

  await step("Certifications", async () => {
    await page.goto(BASE + "/#certifications");
    await page.waitForSelector(".card");
    const n = await page.$$eval(".card", c => c.length);
    check(n >= 40, `${n} certification cards`);
  });

  await step(`Study page (${CERT})`, async () => {
    await page.goto(`${BASE}/${CERT}/`);
    await page.waitForSelector("h1");
    check((await page.textContent("h1")).startsWith("Week "), "the week view renders");
    await page.click("[data-act=weekly]");
    await page.click(".opt >> nth=0");
    check(!!(await page.$(".opt.right")), "a quiz question can be answered and shows the correct option");
    await page.click("[data-act=quit]");
    await page.click('.modal [data-v="1"]');
    for (const t of ["plan", "labs", "progress", "about"]) { await page.click(`[data-tab=${t}]`); await page.waitForTimeout(100); }
    check(!!(await page.$("#app h1")), "plan, labs, progress and about tabs render");
  });

  await step("Plans and help", async () => {
    await page.goto(BASE + "/#plans");
    await page.waitForSelector(".plancards");
    check((await page.$$(".plancards > *")).length >= 3, "the Plans page shows Free, Pro and Premium Pro");
    await page.goto(BASE + "/#help");
    await page.waitForSelector("#helppage .supqa");
    await page.fill("#psupsearch", "refund");
    await page.waitForSelector("#psupresults details[open]");
    check(/refund/i.test(await page.textContent("#psupresults")), "help search finds the refund answer");
  });

  await step("Offline", async () => {
    await page.goto(`${BASE}/${CERT}/`);
    await page.waitForSelector("h1");
    await page.reload(); await page.waitForSelector("h1");
    await ctx.setOffline(true);
    await page.reload().catch(() => {});
    await page.waitForSelector("h1", { timeout: 8000 }).catch(() => {});
    check(((await page.textContent("h1").catch(() => "")) || "").startsWith("Week "), "a study page still opens with no connection");
    await ctx.setOffline(false);
  });

  await step("Pages from the sitemap", async () => {
    const xml = await (await page.request.get(BASE + "/sitemap.xml")).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    // A different spread of pages each day, so every page gets checked over time.
    const day = Math.floor(Date.now() / 86400000), sample = [];
    for (let i = 0; i < Math.min(30, urls.length); i++) sample.push(urls[(day * 31 + i * 97) % urls.length]);
    const bad = [];
    for (const u of new Set(sample)) {
      const r = await page.request.get(u.replace(/^https?:\/\/[^/]+/, BASE), { maxRedirects: 3 });
      if (r.status() !== 200) bad.push(`${r.status()} ${u}`);
    }
    check(urls.length > 100 && bad.length === 0, `${new Set(sample).size} of ${urls.length} sitemap pages load` + (bad.length ? `; failed: ${bad.join(", ")}` : ""));
  });

  if (API) await step(`Accounts API (${API})`, async () => {
    const h = await page.request.get(API + "/v1/health", { headers: { origin: BASE } });
    const j = await h.json().catch(() => ({}));
    check(h.status() === 200 && j.ok === true, `health check answers ok (${h.status()})`);
    check(h.headers()["access-control-allow-origin"] === BASE, "the API allows the site's origin (CORS)");
    check(j.billing === true, "payments are switched on");
    const me = await page.request.get(API + "/v1/me", { headers: { origin: BASE } });
    check(me.status() === 200, `signed-out /v1/me answers (${me.status()})`);
    const foreign = await page.request.post(API + "/v1/support/chat", { headers: { origin: "https://evil.example", "content-type": "application/json" }, data: { messages: [] } });
    check(foreign.status() === 403, `requests from other sites are refused (${foreign.status()})`);
  });
  else console.log("Accounts API: not configured (apiOrigin is empty), skipped");

  const real = errors.filter(e => !/ERR_INTERNET_DISCONNECTED|Failed to load resource/.test(e));
  check(real.length === 0, "no JavaScript errors" + (real.length ? ":\n    " + [...new Set(real)].slice(0, 10).join("\n    ") : ""));
  await browser.close();

  const failed = results.filter(r => !r.ok);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,
    `## Live site: ${BASE}\n\n${results.map(r => `- ${r.ok ? "✅" : "❌"} ${r.msg.split("\n")[0]}`).join("\n")}\n\n`);
  console.log(failed.length ? `\n${failed.length} live check(s) failed.` : "\nAll live checks passed.");
  process.exit(failed.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
