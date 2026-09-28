#!/usr/bin/env node
/* Checks the live site over the internet: HTTPS, redirects, security headers and the TLS
   certificate. Run daily by .github/workflows/study-site-live-check.yml.
   On GitHub Pages, which can't send custom headers, the header checks become notes and the CSP is
   checked in the page's meta tag instead; they become real checks once the site is on Cloudflare Pages
   (docs/CLOUDFLARE_MOVE.md), which sends public/_headers.
   Usage: node tools/live-check.js [domain]   (defaults to "domain" in site.config.json) */
const fs = require("fs"), path = require("path"), tls = require("tls"), http = require("http"), https = require("https");
const ROOT = path.join(__dirname, "..");
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));
const domain = (process.argv[2] || cfg.domain || "").trim();
if (!domain) { console.log("No domain set in site.config.json; nothing to check yet."); process.exit(0); }

global.CertHub = { certs: {}, register(c) { this.certs[c.id] = c; } };
require(path.join(ROOT, "public/data/catalog.js"));
const pages = ["/", ...CertHub.catalog.filter(id => fs.existsSync(path.join(ROOT, "public/data", id + ".js"))).map(id => `/${id}/`)];

let fails = 0, warns = 0;
const ok = m => console.log(`  ✓ ${m}`);
const bad = m => { fails++; console.log(`  ✗ ${m}`); };
const warn = m => { warns++; console.log(`  ! ${m}`); };
const note = m => console.log(`  · ${m}`);

// One request, no redirect following, so each hop can be checked. withBody also returns the text.
function get(url, withBody = false) {
  return new Promise(res => {
    const lib = url.startsWith("https:") ? https : http;
    const req = lib.get(url, { headers: { "User-Agent": "CyberCertStudy-live-check/1.0" }, timeout: 15000 }, r => {
      if (!withBody) { r.resume(); return res({ status: r.statusCode, headers: r.headers }); }
      let body = ""; r.setEncoding("utf8"); r.on("data", d => { body += d; }); r.on("end", () => res({ status: r.statusCode, headers: r.headers, body }));
    });
    req.on("timeout", () => req.destroy(new Error("timed out")));
    req.on("error", e => res({ error: e.message }));
  });
}
function certInfo(host, opts = {}) {
  return new Promise(res => {
    const s = tls.connect({ host, port: 443, servername: host, timeout: 15000, ...opts }, () => {
      const c = s.getPeerCertificate();
      res({ protocol: s.getProtocol(), validTo: c.valid_to, authorized: s.authorized, authError: s.authorizationError });
      s.end();
    });
    s.on("timeout", () => { s.destroy(); res({ error: "timed out" }); });
    s.on("error", e => res({ error: e.message }));
  });
}

(async () => {
  const home = await get(`https://${domain}/`, true);
  const ghPages = /github\.com/i.test((home.headers || {}).server || "");
  if (ghPages) console.log("Hosted on GitHub Pages: custom headers aren't possible there, so header checks are notes.");
  console.log(`HTTPS pages on ${domain}`);
  for (const p of pages) {
    const r = await get(`https://${domain}${p}`);
    r.status === 200 ? ok(`${p} → 200`) : bad(`${p} → ${r.status || r.error}`);
  }

  console.log("Redirects");
  const h = await get(`http://${domain}/`);
  if (h.status >= 300 && h.status < 400 && /^https:\/\//.test(h.headers.location || "")) ok(`http:// → ${h.status} ${h.headers.location}`);
  else bad(`http:// should redirect to https:// (got ${h.status || h.error})`);
  if (cfg.redirectWww && /\.github\.io$/.test(domain)) note("www redirect: not applicable to a github.io address");
  else if (cfg.redirectWww) {
    const w = await get(`https://www.${domain}/`);
    if (w.error) warn(`www.${domain} isn't reachable (${w.error}). Add a www DNS record or turn off redirectWww.`);
    else if (w.status >= 300 && w.status < 400 && (w.headers.location || "").startsWith(`https://${domain}`)) ok(`www → ${w.headers.location}`);
    else bad(`www.${domain} should redirect to https://${domain}/ (got ${w.status})`);
  }
  if (cfg.cloudflarePagesProject && ghPages) note(`${cfg.cloudflarePagesProject}.pages.dev: not checked until the site moves to Cloudflare Pages`);
  else if (cfg.cloudflarePagesProject) {
    const d = await get(`https://${cfg.cloudflarePagesProject}.pages.dev/`);
    if (d.error) warn(`${cfg.cloudflarePagesProject}.pages.dev not reachable (${d.error})`);
    else if (d.status >= 300 && d.status < 400) ok(`pages.dev → ${d.headers.location}`);
    else warn(`${cfg.cloudflarePagesProject}.pages.dev serves the site directly (status ${d.status}); the Pages Function should redirect it`);
  }

  console.log("Security headers");
  const r = await get(`https://${domain}/`);
  const H = r.headers || {};
  const age = +((H["strict-transport-security"] || "").match(/max-age=(\d+)/) || [])[1];
  age >= 31536000 ? ok(`HSTS max-age ${age}`) : bad(`HSTS missing or under one year (${H["strict-transport-security"] || "none"})`);
  if (ghPages) {
    // The page carries its own policy: check the meta tag has the parts that matter.
    const meta = ((home.body || "").match(/http-equiv="Content-Security-Policy" content="([^"]+)"/) || [])[1] || "";
    const need = ["default-src 'self'", "object-src 'none'", "style-src-attr 'none'", "require-trusted-types-for 'script'"];
    const missing = need.filter(x => !meta.includes(x));
    missing.length ? bad(`CSP meta tag missing or weakened (no ${missing.join(", ")})`) : ok("CSP meta tag in the page (strict policy, Trusted Types)");
    note("CSP header, frame-ancestors, X-Frame-Options, X-Content-Type-Options, Referrer-Policy: GitHub Pages can't send these; moving to Cloudflare Pages adds them (docs/CLOUDFLARE_MOVE.md)");
  } else {
    /frame-ancestors 'none'/.test(H["content-security-policy"] || "") ? ok("CSP header with frame-ancestors 'none'") : bad("CSP header missing or without frame-ancestors");
    for (const [k, v] of [["x-content-type-options", "nosniff"], ["x-frame-options", "DENY"], ["referrer-policy", "strict-origin-when-cross-origin"]])
      (H[k] || "").toLowerCase() === v.toLowerCase() ? ok(`${k}: ${H[k]}`) : bad(`${k} should be ${v} (got ${H[k] || "none"})`);
  }
  for (const p of ["/.well-known/security.txt", "/sitemap.xml", "/robots.txt"]) { const x = await get(`https://${domain}${p}`); x.status === 200 ? ok(`${p} → 200`) : bad(`${p} → ${x.status || x.error}`); }

  console.log("TLS");
  const c = await certInfo(domain);
  if (c.error) bad(`TLS connection failed: ${c.error}`);
  else {
    c.authorized ? ok("certificate is trusted") : bad(`certificate not trusted: ${c.authError}`);
    const left = Math.floor((new Date(c.validTo) - Date.now()) / 864e5);
    left >= 14 ? ok(`certificate valid for ${left} more days`) : bad(`certificate expires in ${left} days (${c.validTo})`);
    /TLSv1\.[23]/.test(c.protocol) ? ok(`negotiated ${c.protocol}`) : bad(`negotiated ${c.protocol}`);
  }
  const old = await certInfo(domain, { minVersion: "TLSv1", maxVersion: "TLSv1.1", ciphers: "DEFAULT:@SECLEVEL=0" });
  old.error ? ok("TLS 1.0/1.1 refused") : bad(`server accepts ${old.protocol}; set minimum TLS to 1.2`);

  console.log(`\n${fails ? fails + " failed" : "All checks passed"}${warns ? `, ${warns} warning${warns > 1 ? "s" : ""}` : ""}.`);
  process.exit(fails ? 1 : 0);
})();
