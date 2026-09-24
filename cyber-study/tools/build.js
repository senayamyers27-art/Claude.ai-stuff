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
  "img-src 'self' data:", `connect-src 'self'${apiOrigin ? " " + apiOrigin : ""}`, "manifest-src 'self'", "worker-src 'self'",
  "object-src 'none'", "base-uri 'self'", "form-action 'none'", "frame-ancestors 'none'", "upgrade-insecure-requests"
].join("; ");
// frame-ancestors is ignored in <meta>, so the meta copy drops it; _headers carries the full policy.
const CSP_META = CSP.replace("; frame-ancestors 'none'", "");

/* ---------- shared <head> ---------- */
function head({ title, desc, prefix, urlPath, scripts }) {
  const canonical = origin ? `\n<link rel="canonical" href="${origin}${urlPath}">\n<meta property="og:url" content="${origin}${urlPath}">` : "";
  return `<!doctype html>
<html lang="en">
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

/* ---------- public site settings (read by the app) ---------- */
const httpsOr = u => (typeof u === "string" && /^https:\/\/[^\s"'<>]+$/.test(u)) ? u : "";
const support = cfg.support || {};
out("public/data/site.js", `/* Generated by tools/build.js from site.config.json. */
CertHub.site = ${JSON.stringify({
  support: { label: String(support.label || "").slice(0, 60), url: httpsOr(support.url) },
  feedbackUrl: httpsOr(cfg.feedbackUrl),
  apiUrl: apiOrigin
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

const POLICY = { support: ["Support This Site", "Ways to help keep Cyber Cert Study free: share it, send feedback, or donate."], install: ["Install the App", "Add Cyber Cert Study to your phone's home screen. Works offline, no app store needed."], privacy: ["Privacy Policy", "No accounts, cookies, analytics or tracking. Your progress stays in your browser."], terms: ["Terms of Use", "Terms for using the study plans and labs, including authorized-use-only lab rules."], security: ["Security", "How the site is secured and how to report a vulnerability."] };
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

out("public/robots.txt", `User-agent: *
Allow: /
${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ""}`);

// lastmod comes from each data file's lastVerified date, so the sitemap stays deterministic.
const urls = [["/", certs.map(c => c.lastVerified).filter(Boolean).sort().pop()]].concat(certs.map(c => [`/${c.id}/`, c.lastVerified]), [["/install/"], ["/support/"], ["/privacy/"], ["/terms/"], ["/security/"]]);
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
    if (rel.startsWith("/assets/") || rel.startsWith("/data/") || rel === "/manifest.webmanifest") precache.push(rel);
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
self.addEventListener("message", e => { if (e.data === "skip-waiting") self.skipWaiting(); });
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
