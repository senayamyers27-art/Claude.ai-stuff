#!/usr/bin/env node
/* Builds the app's copy of the site (mobile/www) from ../public, which `node tools/build.js` produces:
   - only what the app runs: index.html, the manifest, assets/, data/ and vendor/. The website's static pages
     (per-certification pages, Spanish lesson pages, comparisons, policies, social images, sitemap, service
     worker) stay on the website; the app opens them there when linked.
   - adds assets/native.js (with its integrity hash) right after theme.js, so it runs before the other scripts.
   Run: npm run www (or npm run sync, which also copies it into the iOS and Android projects). */
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const PUB = path.join(__dirname, "..", "public"), OUT = path.join(__dirname, "www");
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "site.config.json"), "utf8"));
const KEEP = ["index.html", "manifest.webmanifest", "assets", "data", "vendor"];

if (!fs.existsSync(path.join(PUB, "index.html"))) { console.error("Run `node tools/build.js` in cyber-study first."); process.exit(1); }
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
for (const k of KEEP) fs.cpSync(path.join(PUB, k), path.join(OUT, k), { recursive: true });

const html = path.join(OUT, "index.html");
let page = fs.readFileSync(html, "utf8");
const theme = page.match(/<script src="assets\/theme\.js[^"]*"[^>]*><\/script>/);
if (!theme) { console.error("Couldn't find theme.js in index.html."); process.exit(1); }
const js = fs.readFileSync(path.join(OUT, "assets/native.js"));
const sri = "sha384-" + crypto.createHash("sha384").update(js).digest("base64");
const ver = crypto.createHash("sha256").update(js).digest("hex").slice(0, 12);
const web = `https://${cfg.domain}`;
page = page.replace(theme[0], `${theme[0]}\n<script src="assets/native.js?v=${ver}" integrity="${sri}" data-web="${web}"></script>`);
fs.writeFileSync(html, page);

let bytes = 0, files = 0;
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else { bytes += fs.statSync(p).size; files++; } } })(OUT);
console.log(`www: ${files} files, ${(bytes / 1048576).toFixed(1)} MB (API: ${cfg.apiOrigin || "none, accounts off"})`);
