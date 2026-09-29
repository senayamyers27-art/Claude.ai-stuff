#!/usr/bin/env node
/* Layout check at phone (360 px) and desktop (1280 px) widths, light and dark: every kind of view must fit the
   screen with no sideways page scroll, and no visible element may stick out past the right edge unless it sits in
   a scrolling box (tables, code, terminals). With --shots, saves a full-page screenshot of each view to
   layout-shots/ (CI keeps them as a run artifact) so layout changes can be looked over at a glance.
   Usage: node tools/layout.js [--shots] */
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const { serve } = require("./serve");

const PORT = 8143, BASE = `http://localhost:${PORT}`;
const SHOTS = process.argv.includes("--shots");
const OUT = path.join(__dirname, "../layout-shots");
global.CertHub = { certs: {}, register(c) { this.certs[c.id] = c; } };
require(path.join(__dirname, "../public/data/catalog.js"));
const has = id => fs.existsSync(path.join(__dirname, "../public/data", id + ".js"));
const cert = ["security-plus", "network-plus"].find(has) || CertHub.catalog.find(has);

// [label, path, selector to wait for]
const VIEWS = [
  ["home", "", ".card"],
  ...["week", "learn", "plan", "practice", "labs", "progress", "guide", "about"].map(t => [`${cert}-${t}`, `#${cert}.${t}`, "#app h1"]),
  ["labs", "#labs", "#app h1"],
  ["lab", "#lab-home-lab", "#app h1"],
  ["vm-hub", "#vm", "#app h1"],
  ["vm-lab", "#vm-lab-ssh-investigation", "#app h1"],
  ["vm-exam", "#vm-exam", "#app h1"],
  ["review", "#review", "#app h1"],
  ["careers", "#careers", "#app h1"],
  ["career", "#career-cybersecurity", "#app h1"],
  ["portfolio", "#portfolio", "#app h1"],
  ["whats-new", "#whats-new", "#app h1"],
  ["dashboard", "#dashboard", "#app h1"],
  ["games", "#games", "#app h1"],
  ["achievements", "#achievements", "#app h1"],
  ["settings", "#settings", "#app h1"],
  ["log-puzzles", "#log-puzzles", "#app h1"],
  ["exam-changes", "#exam-changes", "#app h1"],
  ["schools", "#schools", "#app h1"],
  ["job-outlook", "#job-outlook", "#app h1"],
  ["net-design", "#net-design", "#app h1"],
  ["tabletop", "#tabletop-ransomware", "#app h1"],
  ["flashcards-print", `#${cert}.cards`, "#app h1"],
  ["game", "#game-subnet", "#app h1"],
  ["security", "#security", "#app h1"],
  ["compare-index", "compare/", "main h1"],
  ["compare", "compare/security-plus-vs-cysa-plus/", "main h1"],
  ["lesson-page", `${cert}/lessons/`, "main h1"],
  ["cheat-sheet", `${cert}/cheat-sheet/`, "main h1"],
  ["exam-day", "exam-day/", "main h1"],
  ["spanish-hub", "es/", "main h1"],
  ["not-found", "no-such-page/", "h1"]
];

// Elements wider than the screen are fine inside a box that scrolls sideways or clips.
function overflow() {
  const W = document.documentElement.clientWidth, out = [];
  if (document.documentElement.scrollWidth > W + 1) out.push(`page scrolls sideways (${document.documentElement.scrollWidth}px wide at ${W}px)`);
  const contained = el => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const s = getComputedStyle(p); if (/(auto|scroll|hidden|clip)/.test(s.overflowX)) return true; } return false; };
  for (const el of document.body.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height || r.right <= W + 1) continue;
    const s = getComputedStyle(el);
    if (s.visibility === "hidden" || s.position === "fixed" || el.closest(".sr-only") || contained(el)) continue;
    out.push(`${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).join(".") : ""} reaches ${Math.round(r.right)}px: "${(el.textContent || "").trim().slice(0, 50)}"`);
    if (out.length > 5) break;
  }
  return out;
}

(async () => {
  const site = await serve(PORT);
  const exe = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  if (SHOTS) fs.mkdirSync(OUT, { recursive: true });
  let bad = 0, checked = 0;
  for (const [vw, vh] of [[360, 740], [1280, 800]]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, colorScheme: scheme, serviceWorkers: "block", reducedMotion: "reduce" });
    const page = await ctx.newPage();
    page.setDefaultTimeout(15000);
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    for (const [label, url, wait] of VIEWS) {
      const name = `${label}-${vw}-${scheme}`;
      try {
        await page.goto(`${BASE}/${url}`);
        await page.waitForSelector(wait);
        await page.waitForTimeout(250);
        const problems = await page.evaluate(overflow);
        checked++;
        if (problems.length) { bad++; console.log(`  ✗ ${name}\n      ${problems.join("\n      ")}`); }
        if (SHOTS && scheme === "light") await page.screenshot({ path: path.join(OUT, name + ".png"), fullPage: true });
      } catch (e) { bad++; console.log(`  ✗ ${name}: ${e.message.split("\n")[0]}`); }
    }
    if (errors.length) { bad++; console.log(`  ✗ page errors at ${vw}px ${scheme}: ${[...new Set(errors)].slice(0, 3).join("; ")}`); }
    await ctx.close();
  }
  await browser.close(); site.close();
  console.log(bad ? `${bad} layout problem(s) in ${checked} views.` : `Layout check passed (${checked} views at 360 and 1280 px, light and dark).`);
  process.exit(bad ? 1 : 0);
})();
