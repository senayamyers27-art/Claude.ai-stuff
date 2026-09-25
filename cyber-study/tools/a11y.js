#!/usr/bin/env node
/* Accessibility check with axe-core against WCAG 2.2 A and AA rules, in light and dark mode,
   at phone width. Covers every kind of view: home, each certification tab, a quiz in progress and
   its results, the lab library, a lab page, the portfolio, frameworks, policies, 404, and the
   account and Pro views (with a local API). Fails on serious or critical violations.
   Usage: node tools/a11y.js [--all] (--all also fails on moderate and minor ones) */
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const { serve } = require("./serve");

const AXE = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const PORT = 8141, API_PORT = 8791, BASE = `http://localhost:${PORT}`;
const STRICT = process.argv.includes("--all");
global.CertHub = { certs: {}, register(c) { this.certs[c.id] = c; } };
require(path.join(__dirname, "../public/data/catalog.js"));
const certIds = CertHub.catalog.filter(id => fs.existsSync(path.join(__dirname, "../public/data", id + ".js")));

let failures = 0;
const seen = new Map(); // rule id -> { impact, help, pages: Set, sample }

async function audit(page, label) {
  // axe is injected through the debugging protocol, so the site's CSP doesn't have to allow it.
  await page.evaluate(AXE);
  const res = await page.evaluate(() => window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] } }));
  for (const v of res.violations) {
    const bad = STRICT || v.impact === "serious" || v.impact === "critical";
    const s = seen.get(v.id) || { impact: v.impact, help: v.help, pages: new Set(), sample: v.nodes[0] && (v.nodes[0].target.join(" ") + " — " + (v.nodes[0].failureSummary || "").split("\n").slice(0, 2).join(" ")), bad };
    s.pages.add(label); seen.set(v.id, s);
  }
}

(async () => {
  process.env.PRO_EMAILS = "a11y@example.com";
  delete process.env.PRO_CONTENT_DIR;
  const { start } = require("../api/dev-server.js");
  const api = await start({ port: API_PORT, siteOrigin: BASE });
  const site = await serve(PORT, { apiOrigin: `http://localhost:${API_PORT}` });
  const exe = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});

  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, serviceWorkers: "block", reducedMotion: "reduce" });
    const page = await ctx.newPage();
    page.setDefaultTimeout(10000);
    page.on("dialog", d => d.accept());
    const go = async (hash, label, wait = "#app h1") => { await page.goto(`${BASE}/${hash}`); await page.waitForSelector(wait); await page.waitForTimeout(150); await audit(page, `${label} (${scheme})`); };

    await go("", "home", ".card");
    for (const id of certIds) for (const tab of ["week", "plan", "practice", "labs", "progress", "guide", "about"]) await go(`#${id}.${tab}`, `${id}.${tab}`);
    // A quiz in progress, with feedback shown, then its results.
    await page.goto(`${BASE}/#${certIds[0]}.practice`); await page.waitForSelector("[data-act=drill]");
    await page.click("[data-act=drill]"); await page.click(".opt >> nth=0"); await page.waitForSelector(".expl");
    await audit(page, `quiz feedback (${scheme})`);
    await page.click("[data-act=quit]"); await page.click('.modal [data-v="1"]').catch(() => {});
    await page.click("[data-act=checkpoint] >> nth=0"); await page.click("[data-act=finish]");
    await audit(page, `confirm dialog (${scheme})`);
    await page.click('.modal [data-v="1"]'); await page.waitForSelector(".big");
    await audit(page, `test results (${scheme})`);
    await page.click("[data-act=quit]");
    await go("#labs", "lab library"); await go("#lab-home-lab", "lab page"); await go("#portfolio", "portfolio");
    await go("#frameworks", "frameworks");
    await page.evaluate(() => document.querySelectorAll("details").forEach(d => { d.open = true; }));
    await audit(page, `frameworks expanded (${scheme})`);
    for (const p of ["privacy", "terms", "security", "install", "support"]) await go(`#${p}`, p);
    await page.goto(`${BASE}/no-such-page`); await page.waitForSelector("h1"); await audit(page, `404 (${scheme})`);
    // Accounts and Pro.
    await go("#account", "sign-in", "#signin-form");
    await page.fill("#signin-email", "a11y@example.com"); await page.click("#signin-form button[type=submit]");
    await page.goto(await page.getAttribute("#signin-msg a", "href")); await page.waitForSelector("[data-aact=signout]");
    await audit(page, `account (${scheme})`);
    await go(`#security-plus.practice`, "Pro practice", "[data-act=fullexam]");
    await go(`#security-plus.progress`, "Pro progress");
    await go(`#security-plus.guide`, "Pro guide", "[data-act=fcstart]");
    await page.click("[data-act=fcstart]"); await page.click("[data-act=fcflip]"); await audit(page, `flashcard (${scheme})`);
    await page.click("[data-act=fcdone]");
    await go("#cap-sample-soc", "capstone", ".sectable");
    await ctx.close();
  }
  await browser.close(); site.close(); api.server.close();

  const rows = [...seen.entries()].sort((a, b) => b[1].bad - a[1].bad);
  for (const [id, s] of rows) {
    console.log(`  ${s.bad ? "✗" : "·"} ${id} (${s.impact}): ${s.help}\n      e.g. ${s.sample}\n      on ${s.pages.size} view${s.pages.size > 1 ? "s" : ""}: ${[...s.pages].slice(0, 6).join(", ")}${s.pages.size > 6 ? ", …" : ""}`);
    if (s.bad) failures++;
  }
  console.log(failures ? `\n${failures} accessibility rule${failures > 1 ? "s" : ""} failed.` : `\nAccessibility check passed${rows.length ? ` (${rows.length} minor note${rows.length > 1 ? "s" : ""} above)` : ""}.`);
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
