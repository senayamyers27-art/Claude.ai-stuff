#!/usr/bin/env node
/* Static security lint for everything that gets deployed (public/ and functions/).
   Fails on: missing or weakened CSP, inline scripts or event handlers, third-party
   script/style/font hosts, plain http:// links, target=_blank without rel=noopener,
   eval-style JavaScript, and missing security headers. */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const PUB = path.join(ROOT, "public");
let bad = 0;
const fail = (f, m) => { bad++; console.log(`  ✗ ${path.relative(ROOT, f)}: ${m}`); };
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));
const apiOrigin = String(cfg.apiOrigin || "").trim().replace(/\/+$/, "").toLowerCase();
const gc = String(((cfg.analytics || {}).goatcounter) || "").trim().toLowerCase();
const analyticsOrigin = gc ? `https://${gc}.goatcounter.com` : "";
const files = walk(PUB).concat(walk(path.join(ROOT, "functions")));

for (const f of files.filter(f => f.endsWith(".html"))) {
  const s = fs.readFileSync(f, "utf8");
  const csp = (s.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/) || [])[1];
  if (!csp) fail(f, "no Content-Security-Policy meta tag");
  else {
    if (/'unsafe-eval'|script-src[^;]*'unsafe-inline'/.test(csp)) fail(f, "CSP allows unsafe script execution");
    if (!/object-src 'none'/.test(csp)) fail(f, "CSP must set object-src 'none'");
    // The only outside hosts allowed are the site's own accounts API and its optional page counter, only for connect-src.
    const other = csp.split(";").map(d => d.trim()).map(d => d.startsWith("connect-src") ? d.replace(" " + apiOrigin, "").replace(" " + analyticsOrigin, "") : d).join(";");
    if (/https?:\/\//.test(other)) fail(f, "CSP allows a third-party host");
  }
  if (/<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>/i.test(s)) fail(f, "inline <script> (move it to a file)");
  if (/\son[a-z]+\s*=\s*["']/i.test(s)) fail(f, "inline event handler attribute");
  // A canonical link names the page's own public address; it loads nothing.
  if (/<script[^>]+src="https?:\/\//i.test(s) || /<link(?![^>]*rel="canonical")[^>]+href="https?:\/\//i.test(s)) fail(f, "loads a script or stylesheet from another site");
  for (const m of s.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) if (!/rel="[^"]*noopener/.test(m[0])) fail(f, "target=_blank link without rel=noopener");
}
// Question text in data/ may quote URLs as exam content, and the font licence is verbatim;
// data source links are checked for https:// by check-data.js instead.
for (const f of files.filter(f => /\.(html|js|css|webmanifest|txt)$/.test(f) && !f.includes(`${path.sep}data${path.sep}`) && !f.endsWith("OFL.txt"))) {
  const s = fs.readFileSync(f, "utf8");
  for (const m of s.matchAll(/http:\/\/[^\s"'<>)]+/g)) if (!/^http:\/\/(www\.w3\.org|www\.sitemaps\.org|localhost|127\.0\.0\.1)/.test(m[0])) fail(f, `insecure URL ${m[0]}`);
  if (f.endsWith(".js") && /\beval\s*\(|new Function\s*\(|document\.write\s*\(|setTimeout\s*\(\s*["'`]/.test(s)) fail(f, "eval-style code");
}
// Engine and home page render with innerHTML, so every data value must pass through esc().
for (const f of ["assets/engine.js", "assets/app.js", "assets/labs.js", "assets/sync.js", "assets/pro.js", "assets/frameworks.js"].map(p => path.join(PUB, p))) {
  // Only lines that build HTML (contain a tag) are checked; Markdown write-ups are plain text.
  // ids are excluded: check-data.js restricts them to numbers and [a-z0-9-] slugs.
  fs.readFileSync(f, "utf8").split("\n").filter(line => /<[a-z/]/i.test(line)).forEach(line => {
    for (const m of line.matchAll(/\$\{\s*(?:q|c|w|d|n|s|h|x|z|l|r|u|v|lab|cert)\.(q|e|src|name|title|text|blurb|statusNote|prompt|answer|lab|obj|label|summary|body|cmd|check|realWorld|deliverable|resume|safety|notes|track|level|cost|url)\s*\}/g)) fail(f, `unescaped \${${m[0].slice(2, -1).trim()}} in HTML`);
  });
}
const headers = fs.readFileSync(path.join(PUB, "_headers"), "utf8");
for (const h of ["Content-Security-Policy", "Strict-Transport-Security", "X-Content-Type-Options: nosniff", "X-Frame-Options: DENY", "Referrer-Policy", "Permissions-Policy"])
  if (!headers.includes(h)) fail(path.join(PUB, "_headers"), `missing ${h}`);
if (!/frame-ancestors 'none'/.test(headers)) fail(path.join(PUB, "_headers"), "CSP header must set frame-ancestors 'none'");
const sec = fs.readFileSync(path.join(PUB, ".well-known/security.txt"), "utf8");
const exp = Date.parse((sec.match(/^Expires: (.+)$/m) || [])[1]);
if (!(exp > Date.now())) fail(path.join(PUB, ".well-known/security.txt"), "Expires date has passed; update securityTxtExpires in site.config.json");

console.log(bad ? `${bad} security problem${bad > 1 ? "s" : ""} found.` : `Security lint passed (${files.length} files).`);
process.exit(bad ? 1 : 0);
