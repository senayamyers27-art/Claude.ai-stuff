/* Social sharing kit: post images and ready-to-paste post text in docs/social/.
   Uses the site's name and domain from site.config.json, so run it again after switching domains:
   CHROMIUM_PATH=/path/to/chromium node tools/social-kit.js */
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");
const ROOT = path.join(__dirname, ".."), PUB = path.join(ROOT, "public"), OUT = path.join(ROOT, "docs/social");
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));
global.CertHub = { certs: {}, register(c) { this.certs[c.id] = c; }, registerLabs(l) { this.labCount = (this.labCount || 0) + l.length; } };
require(path.join(PUB, "data/catalog.js"));
const ids = CertHub.catalog.filter(id => fs.existsSync(path.join(PUB, "data", id + ".js")));
ids.forEach(id => require(path.join(PUB, "data", id + ".js")));
fs.readdirSync(path.join(PUB, "data")).filter(f => /^labs-.+\.js$/.test(f)).forEach(f => require(path.join(PUB, "data", f)));
const N = ids.length, LABS = CertHub.labCount;
const HOST = cfg.domain.replace(/^www\./, "") === "senayamyers27-art.github.io" ? cfg.domain : cfg.domain.replace(/^www\./, "");
const URL = "https://" + cfg.domain + "/";
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const font = w => `@font-face{font-family:PS;font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(path.join(PUB, `assets/fonts/public-sans-latin-${w}-normal.woff2`)).toString("base64")}) format("woff2")}`;
const icon = fs.readFileSync(path.join(PUB, "assets/icon.svg"), "utf8");
const word = `Study<b>To</b>Cert`;

function page({ w, h, kicker, title, sub, chips = [], lang = "en", scale = 1 }) {
  const s = x => Math.round(x * scale);
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>${[400, 600, 800].map(font).join("")}
  *{box-sizing:border-box;margin:0}
  body{width:${w}px;height:${h}px;font-family:PS,sans-serif;background:#16202C;color:#F2F5F8;padding:${s(72)}px;display:flex;flex-direction:column;position:relative;overflow:hidden}
  body::after{content:"";position:absolute;right:-${s(160)}px;bottom:-${s(160)}px;width:${s(520)}px;height:${s(520)}px;border-radius:50%;background:radial-gradient(circle,#2D5BD0 0,#2D5BD0 38%,transparent 39%),radial-gradient(circle,rgba(232,180,68,.25) 0,transparent 70%);opacity:.3}
  .brand{display:flex;align-items:center;gap:${s(18)}px;font-weight:800;font-size:${s(44)}px;letter-spacing:-.01em}.brand svg{width:${s(72)}px;height:${s(72)}px;border-radius:${s(14)}px}.brand b{color:#7FA6FF}
  .k{margin-top:auto;font-size:${s(30)}px;font-weight:700;color:#E8B444;letter-spacing:.06em;text-transform:uppercase}
  h1{font-size:${s(title.length > 40 ? 70 : 84)}px;font-weight:800;line-height:1.04;margin-top:${s(14)}px;letter-spacing:-.02em;max-width:${s(940)}px}
  p{font-size:${s(34)}px;color:#C3CCD6;margin-top:${s(22)}px;line-height:1.3;max-width:${s(900)}px}
  .chips{display:flex;gap:${s(12)}px;margin-top:${s(34)}px;flex-wrap:wrap;position:relative;z-index:1}.chips span{border:2px solid #3A4757;border-radius:999px;padding:${s(9)}px ${s(22)}px;font-size:${s(26)}px;font-weight:600}
  .url{margin-top:${s(40)}px;font-size:${s(32)}px;font-weight:700;color:#7FA6FF;position:relative;z-index:1}
  </style></head><body><div class="brand">${icon}<span>${word}</span></div>
  ${kicker ? `<div class="k">${esc(kicker)}</div>` : `<div style="margin-top:auto"></div>`}<h1>${esc(title)}</h1>${sub ? `<p>${esc(sub)}</p>` : ""}
  ${chips.length ? `<div class="chips">${chips.map(c => `<span>${esc(c)}</span>`).join("")}</div>` : ""}<div class="url">${esc(HOST)}</div></body></html>`;
}
function banner({ w, h }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${[600, 800].map(font).join("")}
  *{box-sizing:border-box;margin:0}body{width:${w}px;height:${h}px;font-family:PS,sans-serif;background:#16202C;color:#F2F5F8;display:flex;align-items:center;justify-content:center;gap:40px;overflow:hidden;padding:0 80px}
  svg{width:${Math.round(h * 0.42)}px;height:${Math.round(h * 0.42)}px;border-radius:18%}.t{font-size:${Math.round(h * 0.2)}px;font-weight:800;letter-spacing:-.02em}.t b{color:#7FA6FF}
  .s{font-size:${Math.round(h * 0.06)}px;color:#C3CCD6;font-weight:600;margin-top:6px}</style></head>
  <body>${icon}<div><div class="t">${word}</div><div class="s">Free study plans for ${N} IT certifications · ${esc(HOST)}</div></div></body></html>`;
}

const IMAGES = [
  ["launch-square.png", 1080, 1080, page({ w: 1080, h: 1080, kicker: "Free · No sign-up · No ads", title: `Free study plans for ${N} IT certifications`, sub: `Week-by-week lessons, ${LABS} hands-on labs, quizzes and practice exams.`, chips: ["Cybersecurity", "Networking", "Cloud", "Data & AI"] })],
  ["spanish-square.png", 1080, 1080, page({ w: 1080, h: 1080, lang: "es", kicker: "Gratis · Sin registro", title: "Estudia para certificarte, en español", sub: `Planes de estudio para ${N} certificaciones de TI: lecciones, preguntas de práctica y simulaciones de examen.`, chips: ["Ciberseguridad", "Redes", "Nube"] })],
  ["daily-review-square.png", 1080, 1080, page({ w: 1080, h: 1080, kicker: "New", title: "Five minutes a day keeps the exam in reach", sub: "Daily review mixes due questions from every certification you're studying.", chips: ["Spaced review", "Works offline"] })],
  ["story.png", 1080, 1920, page({ w: 1080, h: 1920, scale: 1.25, kicker: "Free · No sign-up", title: `Pass your next IT certification`, sub: `${N} study plans with lessons, labs, quizzes and practice exams.`, chips: ["Security+", "CCNA", "AWS", "Azure"] })],
  ["link-card.png", 1200, 630, page({ w: 1200, h: 630, scale: 0.72, kicker: "Free certification study plans", title: `Study to certify`, sub: `${N} IT, cloud and cybersecurity certifications.`, chips: ["Free", "No sign-up", "Works offline"] })],
  ["x-header.png", 1500, 500, banner({ w: 1500, h: 500 })],
  ["linkedin-banner.png", 1584, 396, banner({ w: 1584, h: 396 })]
];

const posts = `# Social sharing kit

Images and post text for announcing ${cfg.siteName}. Generated by \`tools/social-kit.js\` from \`site.config.json\`
(address: ${URL}). Run it again after switching to the custom domain so the images and posts show the new address.

## Images

| File | Size | Use it for |
|---|---|---|
| \`launch-square.png\` | 1080×1080 | Instagram, Facebook, LinkedIn and X posts |
| \`spanish-square.png\` | 1080×1080 | Posts for Spanish-speaking audiences |
| \`daily-review-square.png\` | 1080×1080 | A follow-up post about the daily review |
| \`story.png\` | 1080×1920 | Instagram and Facebook stories, TikTok cover |
| \`link-card.png\` | 1200×630 | Newsletters and blog headers |
| \`x-header.png\` | 1500×500 | X (Twitter) profile header |
| \`linkedin-banner.png\` | 1584×396 | LinkedIn profile or page banner |

The logo files are in \`docs/logo-drafts/\` (concept A is the one in use) and \`public/assets/icons/\`.

## Posts

### Launch (LinkedIn, Facebook)

I built ${cfg.siteName}, a free study site for IT certifications.

Pick a certification and get a week-by-week plan: short lessons, ${LABS} hands-on labs, quizzes, timed checkpoint tests, a practice exam weighted like the real one, and spaced review. There are ${N} certifications across cybersecurity, networking, systems, cloud, software and data & AI, including Security+, CCNA, AWS, Azure and Kubernetes.

No sign-up, no ads, and it works offline on your phone. Progress stays in your browser.

${URL}

### Launch (X, Threads, Bluesky)

Studying for Security+, CCNA, AWS or Azure? ${cfg.siteName} has free week-by-week plans for ${N} IT certifications: lessons, labs, quizzes and practice exams. No sign-up, no ads. ${URL}

### Spanish (Español)

¿Estudias para una certificación de TI? ${cfg.siteName} tiene planes de estudio gratuitos en español para ${N} certificaciones: lecciones, preguntas de práctica, simulaciones de examen y repaso espaciado. Sin registro y sin anuncios. ${URL}es/

### "Which certification first?" (Reddit, forums, groups)

Many people ask which IT certification to start with. ${cfg.siteName} has a two-question guide: pick what you want to work in and where you're starting from, and it suggests a first certification and the one after it. Every plan is free, with lessons, labs and practice exams. ${URL}

Tip: read each community's rules on self-promotion first. Many subreddits only allow links in a weekly thread or ask you to say you built the site.

### Daily review

New on ${cfg.siteName}: daily review. About five minutes of questions a day, mixed from every certification you're studying, with missed questions coming back tomorrow. ${URL}#review

### New domain (after the switch)

${cfg.siteName} has a new home: ${URL}. Your bookmarks keep working. Progress is saved per address, so use Download backup on the old site and Restore on the new one to bring it with you.

## Hashtags

#ITCertification #CyberSecurity #CompTIA #SecurityPlus #CCNA #AWS #Azure #CloudComputing #StudyTips #TechCareers
`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const exe = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  for (const [name, w, h, html] of IMAGES) {
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html); await p.screenshot({ path: path.join(OUT, name), type: "png" }); await p.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, "README.md"), posts);
  console.log(`social-kit: wrote ${IMAGES.length} images and README.md to docs/social/`);
})().catch(e => { console.error(e); process.exit(1); });
