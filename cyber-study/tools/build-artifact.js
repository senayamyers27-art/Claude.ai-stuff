#!/usr/bin/env node
/* Packages the app as a hosted artifact preview in <out-dir> (default: dist-artifact/):
   index.html (page content only; the host adds <html>/<head>/<body>) plus the same
   assets, fonts and data files. No service worker, manifest or CSP meta: the host
   serves the page with its own policy. Usage: node tools/build-artifact.js [out-dir] */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), PUB = path.join(ROOT, "public");
const OUT = path.resolve(process.argv[2] || path.join(ROOT, "dist-artifact"));
global.CertHub = { certs: {}, register(c) { this.certs[c.id] = c; } };
require(path.join(PUB, "data/catalog.js"));
const ids = CertHub.catalog.filter(id => fs.existsSync(path.join(PUB, "data", id + ".js")));
const scripts = ["assets/theme.js", ...require("./app-scripts")(ids).scripts];
const body = fs.readFileSync(path.join(__dirname, "templates/home.html"), "utf8").trim();
const page = `<title>StudyToCert</title>
<link rel="stylesheet" href="assets/style.css">
${scripts.map(s => s === "assets/theme.js" ? `<script src="${s}"></script>` : `<script src="${s}" defer></script>`).join("\n")}
${body}
`;
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "index.html"), page);
const files = ["assets/style.css", "assets/icon.svg", ...fs.readdirSync(path.join(PUB, "assets/fonts")).filter(f => f.endsWith(".woff2")).map(f => "assets/fonts/" + f), ...scripts, ...ids.map(id => `data/gen/${id}-q.js`)];
for (const f of files) { fs.mkdirSync(path.dirname(path.join(OUT, f)), { recursive: true }); fs.copyFileSync(path.join(PUB, f), path.join(OUT, f)); }
fs.writeFileSync(path.join(OUT, "files.json"), JSON.stringify(Object.fromEntries(files.map(f => [f, path.join(OUT, f)])), null, 1));
console.log(`Wrote ${OUT} (index.html + ${files.length} files)`);
