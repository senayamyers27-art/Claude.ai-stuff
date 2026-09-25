#!/usr/bin/env node
/* Generates everything in public/ that isn't hand-written, from site.config.json and the
   data files. The output is deterministic, so CI can fail when it's out of date.

     node tools/build.js          write files
     node tools/build.js --check  exit 1 if any generated file would change

   Writes: index.html, <cert>/index.html, 404.html, _headers, _redirects, robots.txt,
   sitemap.xml, manifest.webmanifest, .well-known/security.txt, sw.js,
   and functions/_middleware.js (HTTPS + canonical-host redirects on Cloudflare Pages). */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const PUB = path.join(ROOT, "public");
const CHECK = process.argv.includes("--check");
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));
const domain = (cfg.domain || "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
const origin = domain ? `https://${domain}` : "";
// Optional accounts API (see api/). Empty keeps the site fully static with no outside requests.
const apiOrigin = (() => {
  const v = String(cfg.apiOrigin || "").trim().replace(/\/+$/, "");
  if (!v) return "";
  if (!/^https:\/\/[a-z0-9.-]+(:\d+)?$/i.test(v)) { console.error(`site.config.json apiOrigin must be an https:// origin, got "${v}"`); process.exit(1); }
  const host = v.toLowerCase().slice(8).replace(/:\d+$/, ""), base = domain.replace(/^www\./, "");
  // The sign-in cookie is only sent when the API is on the same site as the pages.
  if (domain && host !== base && !host.endsWith("." + base)) { console.error(`apiOrigin must be on ${base} (for example https://api.${base}), got ${v}`); process.exit(1); }
  return v.toLowerCase();
})();

// Optional privacy-friendly page counts (GoatCounter: no cookies, no personal data). Empty = off.
const analyticsOrigin = (() => {
  const code = String(((cfg.analytics || {}).goatcounter) || "").trim().toLowerCase();
  if (!code) return "";
  if (!/^[a-z0-9][a-z0-9-]{1,48}$/.test(code)) { console.error(`site.config.json analytics.goatcounter must be your GoatCounter code (the part before .goatcounter.com), got "${code}"`); process.exit(1); }
  return `https://${code}.goatcounter.com`;
})();
global.CertHub = { certs: {}, register(c) { this.certs[c.id] = c; } };
require(path.join(PUB, "data/catalog.js"));
const ids = CertHub.catalog.filter(id => fs.existsSync(path.join(PUB, "data", id + ".js")));
ids.forEach(id => require(path.join(PUB, "data", id + ".js")));
const certs = ids.map(id => CertHub.certs[id]);
// Lab libraries: every data/labs-*.js file, in name order.
const { labFiles, scripts: APP_SCRIPTS } = require("./app-scripts")(ids);
global.CertHub.registerLabs = function (list) { (this.labList = this.labList || []).push(...list); };
labFiles.forEach(f => require(path.join(PUB, "data", f)));

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const changed = [];
function out(rel, content) {
  const file = path.join(ROOT, rel);
  const old = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  if (old === content) return;
  changed.push(rel);
  if (!CHECK) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); }
}

/* ---------- security policy (one source for <meta> and _headers) ---------- */
const CSP = [
  "default-src 'self'", "script-src 'self'", "style-src 'self' 'unsafe-inline'", "font-src 'self'",
  "img-src 'self' data:", `connect-src 'self'${apiOrigin ? " " + apiOrigin : ""}${analyticsOrigin ? " " + analyticsOrigin : ""}`, "manifest-src 'self'", "worker-src 'self'",
  "object-src 'none'", "base-uri 'self'", "form-action 'none'", "frame-ancestors 'none'", "upgrade-insecure-requests"
].join("; ");
// frame-ancestors is ignored in <meta>, so the meta copy drops it; _headers carries the full policy.
const CSP_META = CSP.replace("; frame-ancestors 'none'", "");

/* ---------- shared <head> ---------- */
function head({ title, desc, prefix, urlPath, scripts, lang = "en" }) {
  const canonical = origin ? `\n<link rel="canonical" href="${origin}${urlPath}">\n<meta property="og:url" content="${origin}${urlPath}">` : "";
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta http-equiv="Content-Security-Policy" content="${CSP_META}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="theme-color" content="#EEF1F4" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0E1319" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(cfg.siteName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">${canonical}
<link rel="icon" href="${prefix}assets/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${prefix}assets/icons/apple-touch-icon.png">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Cert Study">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="manifest" href="${prefix}manifest.webmanifest">
<link rel="preload" href="${prefix}assets/fonts/public-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${prefix}assets/style.css">
<script src="${prefix}assets/theme.js"></script>
${scripts.map(s => `<script src="${prefix}${s}" defer></script>`).join("\n")}
</head>`;
}

/* ---------- certification data, split for fast pages ---------- */
// Pages load each certification's plan (data/gen/<id>.js); its question bank
// (data/gen/<id>-q.js) loads only when someone opens that certification.
for (const c of certs) {
  const plan = { ...c, qCount: c.questions.length };
  // Pages only ask for lessons, translations and simulations that exist.
  const has = rel => fs.existsSync(path.join(PUB, "data", rel, c.id + ".js"));
  if (has("lessons")) plan.hasLessons = true;
  if (has("lessons-es")) plan.hasLessonsEs = true;
  if (has("pbq")) plan.hasPbqs = true;
  // "Why this option is wrong" notes (data/whys/<id>.js) ride along with each question as a 9th field.
  let qs = c.questions;
  if (has("whys")) {
    let W = {}; CertHub.addWhys = (id, m) => { if (id === c.id) W = m || {}; };
    delete require.cache[require.resolve(path.join(PUB, "data/whys", c.id + ".js"))];
    require(path.join(PUB, "data/whys", c.id + ".js"));
    qs = qs.map(q => Array.isArray(W[q[0]]) ? [q[0], q[1], q[2], q[3], q[4], q[5], q[6], q[7] ?? null, W[q[0]]] : q);
  }
  delete plan.questions;
  out(`public/data/gen/${c.id}.js`, `/* Generated by tools/build.js from data/${c.id}.js. Edit that file, not this one. */\nCertHub.register(${JSON.stringify(plan)});\n`);
  out(`public/data/gen/${c.id}-q.js`, `/* Generated by tools/build.js from data/${c.id}.js. Edit that file, not this one. */\nCertHub.addQuestions(${JSON.stringify(c.id)}, ${JSON.stringify(qs)});\n`);
}

/* ---------- public site settings (read by the app) ---------- */
const httpsOr = u => (typeof u === "string" && /^https:\/\/[^\s"'<>]+$/.test(u)) ? u : "";
const support = cfg.support || {};
out("public/data/site.js", `/* Generated by tools/build.js from site.config.json. */
CertHub.site = ${JSON.stringify({
  support: { label: String(support.label || "").slice(0, 60), url: httpsOr(support.url) },
  feedbackUrl: httpsOr(cfg.feedbackUrl),
  // Display prices for Pro (the amounts charged are set in Stripe; keep them the same).
  pro: Object.fromEntries(["monthly", "yearly"].map(k => [k, /^[$€£]\d{1,4}(\.\d{2})?$/.test(String((cfg.pro || {})[k] || "")) ? cfg.pro[k] : ""])),
  apiUrl: apiOrigin,
  analytics: analyticsOrigin
}, null, 2)};
`);

/* ---------- pages ---------- */
// Every page is the same app; cert pages just open on their certification.
const shell = fs.readFileSync(path.join(__dirname, "templates/home.html"), "utf8").trim();
out("public/index.html", `${head({ title: cfg.siteName, desc: cfg.description, prefix: "", urlPath: "/", scripts: APP_SCRIPTS })}
<body>
${shell}
</body>
</html>
`);
certs.forEach(c => out(`public/${c.id}/index.html`, `${head({
  title: `${c.short} ${c.exam} Study Plan`,
  desc: `Free ${c.name} ${c.exam} study plan: weekly topics, step-by-step labs, quizzes, timed checkpoint tests and a weighted practice exam.`,
  prefix: "../", urlPath: `/${c.id}/`, scripts: APP_SCRIPTS
})}
<body data-route="${c.id}">
${shell}
</body>
</html>
`));

/* ---------- lesson pages: plain HTML copies of every lesson, for search engines and sharing ---------- */
// The app loads lessons on demand with JavaScript; these pages carry the same text as real HTML.
CertHub.addLessons = (id, list, meta) => {
  const es = meta && meta.lang === "es";
  const key = es ? "lessonDataEs" : "lessonData";
  CertHub[key] = CertHub[key] || {}; CertHub[key][id] = list;
  if (!es) { CertHub.lessonMeta = CertHub.lessonMeta || {}; CertHub.lessonMeta[id] = meta || {}; }
};
CertHub.addDiagrams = list => { CertHub.diagramList = list; };
require(path.join(PUB, "data/diagrams.js"));
const slugify = t => t.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70).replace(/-+$/, "") || "lesson";
const inl = x => esc(x).replace(/`([^`\n]+)`/g, "<code>$1</code>");
const par = x => /^```/.test(x) ? `<pre class="code" tabindex="0"><code>${esc(x.replace(/^```[a-z]*\n?/i, "").replace(/\n?```$/, ""))}</code></pre>` : `<p>${inl(x)}</p>`;
const lessonPages = [];
const reviewedOf = id => { const r = ((CertHub.lessonMeta || {})[id] || {}).reviewed; return r ? new Date(r + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }) : ""; };
const esOf = (id, t) => { const f = path.join(PUB, "data/lessons-es", id + ".js"); if (!fs.existsSync(f)) return null; if (!(CertHub.lessonDataEs || {})[id]) require(f); return ((CertHub.lessonDataEs || {})[id] || []).find(l => l.t === t) || null; };
certs.forEach(c => {
  const f = path.join(PUB, "data/lessons", c.id + ".js");
  if (!fs.existsSync(f)) return;
  require(f);
  const list = (CertHub.lessonData || {})[c.id] || [];
  const plan = (c.weeks ? c.weeks.filter(w => w.dom).map(w => [w.dom, w.topics]) : c.domains.map(d => [d.id, d.topics || []]));
  const domOf = t => (plan.find(([, ts]) => ts.includes(t)) || [])[0];
  const used = new Set();
  const items = list.map(l => { let sl = slugify(l.t), k = 2; while (used.has(sl)) sl = `${slugify(l.t)}-${k++}`; used.add(sl); return { l, slug: sl, dom: domOf(l.t) }; });
  const top = `<header class="top"><div class="bar"><a class="brand" href="../../">${esc(cfg.siteName)}</a></div></header>`;
  const cta = `<div class="panel startcard"><div class="grow"><strong>Study ${esc(c.short)} for free</strong><br><span class="note">A week-by-week plan with every lesson, quizzes, checkpoint tests, a practice exam and hands-on labs.</span></div><a class="btn sm" href="${"../../"}${c.id}/">Open the ${esc(c.short)} study plan</a></div>`;
  // Index of all lessons for the certification.
  out(`public/${c.id}/lessons/index.html`, `${head({ title: `${c.short} ${c.exam} Lessons: Free Study Guide`, desc: `${items.length} free lessons covering every ${c.name} (${c.exam}) exam topic, with key terms, examples, exam tips and self-check questions.`, prefix: "../../", urlPath: `/${c.id}/lessons/`, scripts: [] })}
<body>
${top.replace(/\.\.\/\.\.\//g, "../../")}
<main class="wrap lesson-page">
<p class="crumbs"><a href="../../">All certifications</a> / <a href="../">${esc(c.short)}</a> / Lessons</p>
<h1>${esc(c.short)} ${esc(c.exam)} lessons</h1>
<p class="meta">${items.length} free lessons, one for every topic in the ${esc(c.name)} study plan.</p>
${cta}
${c.domains.map(d => { const its = items.filter(x => x.dom === d.id); return its.length ? `<h2>Domain ${d.id}: ${esc(d.name)}</h2><div class="panel"><ul class="clean">${its.map(x => `<li><a href="${x.slug}/">${esc(x.l.t)}</a></li>`).join("")}</ul></div>` : ""; }).join("\n")}
</main>
</body>
</html>
`);
  items.forEach((x, i) => {
    const l = x.l, d = c.domains.find(d => d.id === x.dom), prev = items[i - 1], next = items[i + 1];
    const figs = (CertHub.diagramList || []).filter(g => ((g.topics || {})[c.id] || []).includes(l.t)).map(g => `<figure class="diagram">${g.svg.replace(/^<svg /, `<svg role="img" aria-label="${esc(g.alt)}" focusable="false" `)}<figcaption>${esc(g.title)}</figcaption></figure>`).join("");
    const desc = String(l.body[0] || "").replace(/`/g, "").split(/(?<=[.!?])\s+/).slice(0, 2).join(" ").slice(0, 155);
    out(`public/${c.id}/lessons/${x.slug}/index.html`, `${head({ title: `${l.t.length > 60 ? l.t.slice(0, 58).replace(/[\s,:;]+\S*$/, "") + "…" : l.t} · ${c.short} Lesson`, desc, prefix: "../../../", urlPath: `/${c.id}/lessons/${x.slug}/`, scripts: [] })}
<body>
<header class="top"><div class="bar"><a class="brand" href="../../../">${esc(cfg.siteName)}</a></div></header>
<main class="wrap lesson-page">
<p class="crumbs"><a href="../../../">All certifications</a> / <a href="../../">${esc(c.short)}</a> / <a href="../">Lessons</a></p>
<p class="note">${esc(c.name)} ${esc(c.exam)}${d ? ` · Domain ${d.id}: ${esc(d.name)}` : ""}</p>
<h1>${esc(l.t)}</h1>
<p class="note">${reviewedOf(c.id) ? `Last reviewed ${esc(reviewedOf(c.id))}` : ""}${esOf(c.id, l.t) ? `${reviewedOf(c.id) ? " · " : ""}<a href="../../../es/${c.id}/lessons/${x.slug}/" hreflang="es" lang="es">Leer en español</a>` : ""}</p>
<article class="lbody">
${l.body.map((p, j) => par(p) + (j === 0 ? figs : "")).join("\n")}
<h2>Key terms</h2>
<dl class="terms">${l.terms.map(([a, b]) => `<dt>${inl(a)}</dt><dd>${inl(b)}</dd>`).join("")}</dl>
<div class="panel ex"><strong>Real-world example</strong><p>${inl(l.example)}</p></div>
<div class="status notice"><strong>Exam tip:</strong> ${inl(l.tip)}</div>
<h2>Check yourself</h2>
${l.check.map(([q, a]) => `<details class="sq"><summary>${inl(q)}</summary><p>${inl(a)}</p></details>`).join("\n")}
</article>
${cta}
<nav class="pager" aria-label="More lessons">${prev ? `<a href="../${prev.slug}/">← ${esc(prev.l.t.slice(0, 60))}</a>` : "<span></span>"}${next ? `<a href="../${next.slug}/">${esc(next.l.t.slice(0, 60))} →</a>` : ""}</nav>
</main>
</body>
</html>
`);
  });
  lessonPages.push([`/${c.id}/lessons/`, c.lastVerified], ...items.map(x => [`/${c.id}/lessons/${x.slug}/`, c.lastVerified]));
});
/* ---------- Spanish lesson pages (/es/<cert>/lessons/<slug>/) ---------- */
certs.forEach(c => {
  const list = (CertHub.lessonData || {})[c.id]; if (!list) return;
  const used = new Set(), items = [];
  list.forEach(l => { let sl = slugify(l.t), k = 2; while (used.has(sl)) sl = `${slugify(l.t)}-${k++}`; used.add(sl); const es = esOf(c.id, l.t); if (es) items.push({ l: es, slug: sl }); });
  if (!items.length) return;
  out(`public/es/${c.id}/lessons/index.html`, `${head({ title: `Lecciones de ${c.short} ${c.exam}`, desc: `${items.length} lecciones gratuitas en español para ${c.name} (${c.exam}).`, prefix: "../../../", urlPath: `/es/${c.id}/lessons/`, scripts: [], lang: "es" })}
<body>
<header class="top"><div class="bar"><a class="brand" href="../../../">${esc(cfg.siteName)}</a></div></header>
<main class="wrap lesson-page">
<p class="crumbs"><a href="../../../${c.id}/">${esc(c.short)}</a> / Lecciones en español · <a href="../../../${c.id}/lessons/" hreflang="en" lang="en">English</a></p>
<h1>Lecciones de ${esc(c.short)} ${esc(c.exam)}</h1>
<div class="panel"><ul class="clean">${items.map(x => `<li><a href="${x.slug}/">${esc(x.l.tt)}</a></li>`).join("")}</ul></div>
</main>
</body>
</html>
`);
  items.forEach((x, i) => {
    const l = x.l, prev = items[i - 1], next = items[i + 1];
    out(`public/es/${c.id}/lessons/${x.slug}/index.html`, `${head({ title: `${l.tt.length > 60 ? l.tt.slice(0, 58) + "…" : l.tt} · Lección de ${c.short}`, desc: String(l.body[0] || "").replace(/`/g, "").slice(0, 155), prefix: "../../../../", urlPath: `/es/${c.id}/lessons/${x.slug}/`, scripts: [], lang: "es" })}
<body>
<header class="top"><div class="bar"><a class="brand" href="../../../../">${esc(cfg.siteName)}</a></div></header>
<main class="wrap lesson-page">
<p class="crumbs"><a href="../../../../${c.id}/">${esc(c.short)}</a> / <a href="../">Lecciones</a> · <a href="../../../../${c.id}/lessons/${x.slug}/" hreflang="en" lang="en">English</a></p>
<p class="note">${esc(c.name)} ${esc(c.exam)}</p>
<h1>${esc(l.tt)}</h1>
<article class="lbody">
${l.body.map(par).join("\n")}
<h2>Términos clave</h2>
<dl class="terms">${l.terms.map(([a, b]) => `<dt>${inl(a)}</dt><dd>${inl(b)}</dd>`).join("")}</dl>
<div class="panel ex"><strong>Ejemplo real</strong><p>${inl(l.example)}</p></div>
<div class="status notice"><strong>Consejo para el examen:</strong> ${inl(l.tip)}</div>
<h2>Comprueba lo que sabes</h2>
${l.check.map(([q, a]) => `<details class="sq"><summary>${inl(q)}</summary><p>${inl(a)}</p></details>`).join("\n")}
</article>
<div class="panel startcard"><div class="grow"><strong>Estudia ${esc(c.short)} gratis</strong><br><span class="note">Plan semanal, cuestionarios, simulaciones y laboratorios prácticos (en inglés).</span></div><a class="btn sm" href="../../../../${c.id}/">Abrir el plan de estudio</a></div>
<nav class="pager" aria-label="Más lecciones">${prev ? `<a href="../${prev.slug}/">← ${esc(prev.l.tt.slice(0, 60))}</a>` : "<span></span>"}${next ? `<a href="../${next.slug}/">${esc(next.l.tt.slice(0, 60))} →</a>` : ""}</nav>
</main>
</body>
</html>
`);
  });
  lessonPages.push([`/es/${c.id}/lessons/`, c.lastVerified], ...items.map(x => [`/es/${c.id}/lessons/${x.slug}/`, c.lastVerified]));
});

/* ---------- cheat sheet pages (/<cert>/cheat-sheet/): every lesson's exam tip and key terms ---------- */
const extraPages = [];
certs.forEach(c => {
  const list = (CertHub.lessonData || {})[c.id]; if (!list) return;
  const plan = (c.weeks ? c.weeks.filter(w => w.dom).map(w => [w.dom, w.topics]) : c.domains.map(d => [d.id, d.topics || []]));
  const byDom = d => list.filter(l => (plan.find(([, ts]) => ts.includes(l.t)) || [])[0] === d.id);
  out(`public/${c.id}/cheat-sheet/index.html`, `${head({ title: `${c.short} ${c.exam} Cheat Sheet`, desc: `Free ${c.name} (${c.exam}) cheat sheet: every exam tip and key term by domain, ready to print.`, prefix: "../../", urlPath: `/${c.id}/cheat-sheet/`, scripts: [] })}
<body>
<header class="top"><div class="bar"><a class="brand" href="../../">${esc(cfg.siteName)}</a></div></header>
<main class="wrap lesson-page">
<p class="crumbs"><a href="../../">All certifications</a> / <a href="../">${esc(c.short)}</a> / Cheat sheet</p>
<h1>${esc(c.short)} ${esc(c.exam)} cheat sheet</h1>
<p class="meta">Every exam tip and key term from the free ${esc(c.short)} lessons, by domain. Use your browser's Print to save it as a PDF.</p>
${c.domains.map(d => { const ls = byDom(d); if (!ls.length) return ""; const seen = new Set(); return `<h2>Domain ${d.id}: ${esc(d.name)} (${d.w}%)</h2><div class="panel cheat"><h3>Exam tips</h3><ul class="clean">${ls.map(l => `<li>${inl(l.tip)}</li>`).join("")}</ul><h3>Key terms</h3><dl class="terms">${ls.flatMap(l => l.terms).filter(([a]) => !seen.has(a.toLowerCase()) && seen.add(a.toLowerCase())).map(([a, b]) => `<dt>${inl(a)}</dt><dd>${inl(b)}</dd>`).join("")}</dl></div>`; }).join("\n")}
<div class="panel startcard"><div class="grow"><strong>Study ${esc(c.short)} for free</strong><br><span class="note">Lessons, quizzes, exam simulations and hands-on labs.</span></div><a class="btn sm" href="../">Open the ${esc(c.short)} study plan</a></div>
</main>
</body>
</html>
`);
  extraPages.push([`/${c.id}/cheat-sheet/`, c.lastVerified]);
});

/* ---------- career pages (/careers/ and /careers/<track>/) ---------- */
{
  let careers = null, interview = {};
  CertHub.addCareers = l => { careers = l; }; CertHub.addInterview = m => { interview = m || {}; };
  CertHub.niceRoles = CertHub.niceRoles || null;
  const cf = path.join(PUB, "data/careers.js");
  if (fs.existsSync(cf)) {
    require(cf);
    if (!CertHub.niceRoles) require(path.join(PUB, "data/frameworks.js"));
    const roleName = id => ((CertHub.niceRoles || []).find(r => r.id === id) || { name: id }).name;
    const labTitle = id => ((CertHub.labList || []).find(l => l.id === id) || {}).title;
    const top = pre => `<header class="top"><div class="bar"><a class="brand" href="${pre}">${esc(cfg.siteName)}</a></div></header>`;
    out("public/careers/index.html", `${head({ title: `Career Paths · ${cfg.siteName}`, desc: "Career paths in cybersecurity, networking, software, security administration and systems administration: which certification first, jobs, skills and interview practice.", prefix: "../", urlPath: "/careers/", scripts: [] })}
<body>
${top("../")}
<main class="wrap lesson-page">
<h1>Career paths</h1>
<p class="meta">Which certification to take first, the jobs each track leads to, the skills employers ask for, and interview practice.</p>
<div class="panel"><ul class="clean">${careers.map(c => `<li><a href="${c.track}/">${esc(c.title)}</a></li>`).join("")}</ul></div>
</main>
</body>
</html>
`);
    extraPages.push(["/careers/"]);
    careers.forEach(c => {
      out(`public/careers/${c.track}/index.html`, `${head({ title: `${c.title} · ${cfg.siteName}`, desc: String(c.intro).split("\n")[0].slice(0, 155), prefix: "../../", urlPath: `/careers/${c.track}/`, scripts: [] })}
<body>
${top("../../")}
<main class="wrap lesson-page">
<p class="crumbs"><a href="../">Career paths</a></p>
<h1>${esc(c.title)}</h1>
<div class="prose">${String(c.intro).split(/\n\n+/).map(p => `<p>${esc(p)}</p>`).join("")}</div>
<h2>Certification path</h2>
<ol class="steps-list plain">${c.path.map(p => { const x = CertHub.certs[p.cert]; return `<li><strong>${x ? `<a href="../../${p.cert}/">${esc(x.short)} ${esc(x.exam)}</a>` : esc(p.cert)}</strong><br>${esc(p.why)}</li>`; }).join("")}</ol>
<h2>Jobs</h2>
<div class="panel">${c.jobs.map(j => `<div class="row"><div class="grow"><strong>${esc(j.title)}</strong> (${esc(j.level)})<br><span class="note">${esc(j.does)}</span></div></div>`).join("")}</div>
<h2>Skills employers ask for</h2>
<div class="panel"><ul class="clean">${c.skills.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>
<h2>Your next 30 days</h2>
<div class="panel"><ol class="clean">${c.firstSteps.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div>
<h2>Portfolio labs</h2>
<div class="panel"><ul class="clean">${c.labs.map(id => `<li><a href="../../#${id}">${esc(labTitle(id) || id)}</a></li>`).join("")}</ul></div>
<h2>Interview practice</h2>
${c.roles.map(r => `<h3>${esc(roleName(r))}</h3><div class="panel">${(interview[r] || []).map(([q, a]) => `<details class="sq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>`).join("\n")}
</main>
</body>
</html>
`);
      extraPages.push([`/careers/${c.track}/`]);
    });
  }
}

// Lesson pages that no longer match a lesson are removed.
if (!CHECK) certs.forEach(c => {
  const keep = new Set(lessonPages.map(([u]) => u));
  [[path.join(PUB, c.id, "lessons"), `/${c.id}/lessons/`], [path.join(PUB, "es", c.id, "lessons"), `/es/${c.id}/lessons/`]].forEach(([dir, pre]) => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory() && !keep.has(`${pre}${e.name}/`)).forEach(e => fs.rmSync(path.join(dir, e.name), { recursive: true }));
  });
});

const POLICY = { support: ["Support This Site", "Ways to help keep Cyber Cert Study free: share it, send feedback, or donate."], install: ["Install the App", "Add Cyber Cert Study to your phone's home screen. Works offline, no app store needed."], privacy: ["Privacy Policy", "No accounts, cookies, analytics or tracking. Your progress stays in your browser."], terms: ["Terms of Use", "Terms for using the study plans and labs, including authorized-use-only lab rules."], security: ["Security", "How the site is secured and how to report a vulnerability."], frameworks: ["Security Frameworks", "NIST CSF, ATT&CK, CIS Controls, ISO 27001, OWASP and more: what each framework is, which exams test it, and labs that use it. Plus NICE cybersecurity job roles."] };
Object.entries(POLICY).forEach(([id, [t, d]]) => out(`public/${id}/index.html`, `${head({ title: `${t} · ${cfg.siteName}`, desc: d, prefix: "../", urlPath: `/${id}/`, scripts: APP_SCRIPTS })}
<body data-route="${id}">
${shell}
</body>
</html>
`));

out("public/404.html", `${head({ title: "Page Not Found", desc: cfg.description, prefix: "/", urlPath: "/404", scripts: [] })}
<body>
<main class="wrap">
  <h1>That page isn't here</h1>
  <p class="meta">The study plan you're looking for may have moved.</p>
  <div class="btns"><a class="btn" href="/">See all certifications</a></div>
</main>
</body>
</html>
`);

/* ---------- Cloudflare Pages config ---------- */
const hsts = `max-age=63072000; includeSubDomains${cfg.hstsPreload ? "; preload" : ""}`;
out("public/_headers", `# Generated by tools/build.js from site.config.json. Edit those, not this file.
# https://developers.cloudflare.com/pages/configuration/headers/
/*
  Content-Security-Policy: ${CSP}
  Strict-Transport-Security: ${hsts}
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin

/sw.js
  Cache-Control: no-cache
/manifest.webmanifest
  Cache-Control: no-cache
/assets/*
  Cache-Control: public, max-age=3600, must-revalidate
/data/*
  Cache-Control: public, max-age=3600, must-revalidate
`);

out("public/_redirects", `# Generated by tools/build.js. Shorthand paths -> study pages.
# (Cloudflare Pages already adds trailing slashes and drops index.html.)
/home / 301
/secplus /security-plus/ 301
/security+ /security-plus/ 301
/cysa /cysa-plus/ 301
/netplus /network-plus/ 301
/cc /isc2-cc/ 301
`);

// GitHub Pages serves a custom domain when the site has a CNAME file naming it.
if (domain && !domain.endsWith(".github.io")) out("public/CNAME", domain + "\n");
else if (!CHECK && fs.existsSync(path.join(PUB, "CNAME"))) fs.rmSync(path.join(PUB, "CNAME"));
out("public/robots.txt", `User-agent: *
Allow: /
${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ""}`);

// lastmod comes from each data file's lastVerified date, so the sitemap stays deterministic.
const urls = [["/", certs.map(c => c.lastVerified).filter(Boolean).sort().pop()]].concat(certs.map(c => [`/${c.id}/`, c.lastVerified]), [["/frameworks/"], ["/install/"], ["/support/"], ["/privacy/"], ["/terms/"], ["/security/"]], extraPages, lessonPages);
out("public/sitemap.xml", origin ? `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, d]) => `  <url><loc>${origin}${u}</loc>${d ? `<lastmod>${d}</lastmod>` : ""}</url>`).join("\n")}
</urlset>
` : `<?xml version="1.0" encoding="UTF-8"?>
<!-- Set "domain" in site.config.json and rebuild to list pages here. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>
`);

out("public/.well-known/security.txt", `# Generated by tools/build.js. Renew "securityTxtExpires" in site.config.json before it passes.
Contact: ${cfg.securityContact}
Expires: ${cfg.securityTxtExpires}T00:00:00.000Z
Preferred-Languages: en
${origin ? `Canonical: ${origin}/.well-known/security.txt\n` : ""}`);

out("public/manifest.webmanifest", JSON.stringify({
  name: cfg.siteName, short_name: "Cert Study", description: cfg.description,
  id: "/", start_url: "/", scope: "/", display: "standalone", orientation: "any",
  background_color: "#EEF1F4", theme_color: "#EEF1F4", categories: ["education"],
  icons: [
    { src: "/assets/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/assets/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "/assets/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    { src: "/assets/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }
  ],
  shortcuts: [{ name: "Labs", url: "/#labs" }, { name: "Portfolio", url: "/#portfolio" }, ...certs.slice(0, 2).map(c => ({ name: `${c.short} study plan`, url: `/${c.id}/` }))]
}, null, 2) + "\n");

/* ---------- service worker: offline study, versioned by content hash ---------- */
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
// Hash what the pages will actually serve. Generated files are hashed from their new content.
const pending = new Map();
const precache = ["/", "/404.html", ...certs.map(c => `/${c.id}/`)];
const hash = crypto.createHash("sha256");
walk(PUB).filter(f => !/(^|\/)(sw\.js|_headers|_redirects|robots\.txt|sitemap\.xml|OFL\.txt)$/.test(f) && !f.includes(".well-known"))
  .sort().forEach(f => {
    const rel = "/" + path.relative(PUB, f).split(path.sep).join("/");
    hash.update(rel).update(fs.readFileSync(f));
    // Authored certification files aren't loaded by pages (the generated copies in data/gen/ are).
    const authoredCert = ids.some(id => rel === `/data/${id}.js`);
    // Lessons are cached the first time someone opens them rather than all at install.
    const lesson = rel.startsWith("/data/lessons/") || rel.startsWith("/data/lessons-es/");
    if (!authoredCert && !lesson && (rel.startsWith("/assets/") || rel.startsWith("/data/") || rel === "/manifest.webmanifest")) precache.push(rel);
  });
const VERSION = hash.digest("hex").slice(0, 12);
out("public/sw.js", `/* Generated by tools/build.js. Lets the site work offline and picks up new questions
   automatically. The version changes whenever any page, script, style or data file changes. */
const VERSION = "${VERSION}";
const CACHE = "certhub-" + VERSION;
const PRECACHE = ${JSON.stringify(precache.sort(), null, 2)};

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("certhub-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("message", e => {
  if (e.data === "skip-waiting") self.skipWaiting();
  // "Save for offline": the page asks for its lessons, questions and simulations to be cached now.
  if (e.data && e.data.type === "cache-urls" && Array.isArray(e.data.urls)) {
    const urls = e.data.urls.filter(u => { try { return new URL(u, location.href).origin === location.origin; } catch (x) { return false; } });
    const reply = ok => e.ports && e.ports[0] && e.ports[0].postMessage({ ok });
    e.waitUntil(caches.open(CACHE).then(c => Promise.all(urls.map(u => fetch(u).then(r => r.ok ? c.put(u, r) : Promise.reject(new Error(u)))))).then(() => reply(true), () => reply(false)));
  }
});
self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (req.mode === "navigate") {
    // Pages: network first so updates show immediately; cached copy when offline.
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then(r => r || caches.match(url.pathname.endsWith("/") ? url.pathname : url.pathname + "/")).then(r => r || caches.match("/404.html"))));
    return;
  }
  // Scripts, styles, data, fonts: cache first; this version's cache is filled at install.
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
`);

/* ---------- Pages Function: HTTPS and one canonical host ---------- */
out("functions/_middleware.js", `// Generated by tools/build.js from site.config.json.
// Runs on Cloudflare Pages in front of every request:
//  - http:// -> https:// (301), in case "Always Use HTTPS" is ever switched off
//  - www. and *.pages.dev production traffic -> the canonical domain (301)
//  - preview deployments (branch.*.pages.dev) stay reachable but are hidden from search engines
const CANONICAL = ${JSON.stringify(domain)};
const REDIRECT_WWW = ${!!cfg.redirectWww};

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const host = url.hostname;
  const isPreview = /^[^.]+\\.[^.]+\\.pages\\.dev$/.test(host);
  let target = null;
  if (url.protocol === "http:" && host !== "localhost" && host !== "127.0.0.1") target = new URL(url);
  if (CANONICAL && !isPreview && host !== CANONICAL && (host.endsWith(".pages.dev") || (REDIRECT_WWW && host === "www." + CANONICAL))) {
    target = new URL(url); target.hostname = CANONICAL;
  }
  if (target) { target.protocol = "https:"; target.port = ""; return Response.redirect(target.toString(), 301); }
  const res = await next();
  if (isPreview) { const r = new Response(res.body, res); r.headers.set("X-Robots-Tag", "noindex, nofollow"); return r; }
  return res;
}
`);

if (CHECK) {
  if (changed.length) { console.error("Generated files are out of date. Run: node tools/build.js\n  " + changed.join("\n  ")); process.exit(1); }
  console.log("Generated files are up to date (version " + VERSION + ").");
} else {
  console.log(changed.length ? "Updated:\n  " + changed.join("\n  ") : "Nothing to update.");
  console.log("Version " + VERSION + (domain ? ", domain " + domain : ", no domain set yet"));
}
