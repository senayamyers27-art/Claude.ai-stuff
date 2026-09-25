/* Renders link-preview images (1200x630 PNG) to public/og/: site.png, careers.png and one per certification.
   Run after adding a certification: CHROMIUM_PATH=/path/to/chromium node tools/og-images.js
   tools/build.js adds og:image tags for the files that exist (only when site.config.json has a domain). */
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");
const ROOT = path.join(__dirname, ".."), PUB = path.join(ROOT, "public");
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));
global.CertHub = { certs: {}, register(c) { this.certs[c.id] = c; } };
require(path.join(PUB, "data/catalog.js"));
const ids = CertHub.catalog.filter(id => fs.existsSync(path.join(PUB, "data", id + ".js")));
ids.forEach(id => require(path.join(PUB, "data", id + ".js")));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const font = w => `@font-face{font-family:PS;font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(path.join(PUB, `assets/fonts/public-sans-latin-${w}-normal.woff2`)).toString("base64")}) format("woff2")}`;
const icon = fs.readFileSync(path.join(PUB, "assets/icon.svg"), "utf8");
const trackOf = id => (CertHub.tracks || []).find(t => t.certs.includes(id));
function card({ kicker, title, sub, chips, accent }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${[400, 600, 800].map(font).join("")}
  *{box-sizing:border-box;margin:0}body{width:1200px;height:630px;font-family:PS,sans-serif;background:#0E1319;color:#E7ECF1;padding:64px 72px;display:flex;flex-direction:column;position:relative;overflow:hidden}
  .bar{position:absolute;left:0;top:0;bottom:0;width:18px;background:${accent}}
  .brand{display:flex;align-items:center;gap:16px;font-weight:600;font-size:30px;color:#95A1AE}.brand svg{width:52px;height:52px}
  .k{margin-top:auto;font-size:30px;font-weight:600;color:${accent};letter-spacing:.02em}
  h1{font-size:${title.length > 26 ? 76 : 96}px;font-weight:800;line-height:1.02;margin-top:10px;letter-spacing:-.02em}
  p{font-size:34px;color:#C3CCD6;margin-top:18px;line-height:1.25;max-width:1000px}
  .chips{display:flex;gap:12px;margin-top:34px;flex-wrap:wrap}.chips span{border:2px solid #2B3643;border-radius:999px;padding:8px 20px;font-size:24px;color:#E7ECF1;font-weight:600}
  </style></head><body><div class="bar"></div><div class="brand">${icon}${esc(cfg.siteName)}</div>
  <div class="k">${esc(kicker)}</div><h1>${esc(title)}</h1>${sub ? `<p>${esc(sub)}</p>` : ""}<div class="chips">${chips.map(c => `<span>${esc(c)}</span>`).join("")}</div></body></html>`;
}
const ACC = ["#5B8CFF", "#3DC19E", "#E8B444", "#EE6F62", "#B18CF0", "#38BDF8"];
(async () => {
  const out = path.join(PUB, "og"); fs.mkdirSync(out, { recursive: true });
  const exe = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  const jobs = [["site", card({ kicker: "Free certification study plans", title: "Study for IT and security certifications", sub: `${ids.length} certifications: week-by-week plans, lessons, labs, quizzes and practice exams.`, chips: ["Free", "No sign-up", "Works offline"], accent: ACC[0] })],
    ["careers", card({ kicker: "Career paths", title: "Which certification first?", sub: "Jobs, skills, certification order and interview practice for each IT career track.", chips: ["Cybersecurity", "Networking", "Cloud", "Systems"], accent: ACC[1] })]];
  ids.forEach((id, i) => { const c = CertHub.certs[id], t = trackOf(id); jobs.push([id, card({ kicker: `${t ? t.name + " · " : ""}Free study plan`, title: `${c.short} ${c.exam}`.length > 34 ? c.short : `${c.short} ${c.exam}`, sub: `${c.short} ${c.exam}`.length > 34 ? `${c.name} (${c.exam})` : c.name, chips: ["Lessons", "Labs", "Quizzes", "Practice exam"], accent: ACC[(CertHub.tracks || []).indexOf(t) % ACC.length] || ACC[i % ACC.length] })]); });
  for (const [name, html] of jobs) { await page.setContent(html); await page.screenshot({ path: path.join(out, name + ".png"), type: "png" }); }
  await browser.close();
  console.log(`og-images: wrote ${jobs.length} images to public/og/`);
})().catch(e => { console.error(e); process.exit(1); });
