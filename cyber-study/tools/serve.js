#!/usr/bin/env node
/* Local preview of public/ that behaves like Cloudflare Pages for the parts that matter here:
   directory index pages, trailing-slash redirects, _redirects rules and _headers (global block).
   Usage: node tools/serve.js [port] [api-origin]   (default 8000; api-origin, e.g.
   http://localhost:8787 from api/dev-server.js, turns on accounts for local testing) */
const http = require("http"), fs = require("fs"), path = require("path"), crypto = require("crypto");
const PUB = path.join(__dirname, "..", "public");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".wasm": "application/wasm", ".zip": "application/zip", ".png": "image/png", ".css": "text/css; charset=utf-8", ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml" };
const redirects = fs.readFileSync(path.join(PUB, "_redirects"), "utf8").split("\n").filter(l => l && !l.startsWith("#")).map(l => l.trim().split(/\s+/));
const globalHeaders = {};
(fs.readFileSync(path.join(PUB, "_headers"), "utf8").split(/\n(?=\/)/).find(b => b.startsWith("/*\n")) || "").split("\n").slice(1)
  .forEach(l => { const m = l.match(/^\s+([\w-]+):\s*(.+)$/); if (m && m[1] !== "Strict-Transport-Security") globalHeaders[m[1]] = m[2].replace("; upgrade-insecure-requests", ""); });

// root: another folder to serve instead of public/ (the app's copy, mobile/www, for tools/app-e2e.js).
function serve(port, { apiOrigin = "", root = PUB } = {}) {
  // With an API origin, the pages allow connecting to it and data/site.js points at it.
  const SITE_JS = path.join(root, "data/site.js");
  const siteJs = () => fs.readFileSync(SITE_JS, "utf8").replace(/"apiUrl": "[^"]*"/, `"apiUrl": ${JSON.stringify(apiOrigin)}`);
  // The rewritten data/site.js needs a matching integrity hash in the pages that load it.
  const withSri = html => html.replace(/(src="[^"]*data\/site\.js\?v=[^"]*" integrity=")[^"]*/g, (m, a) => a + "sha384-" + crypto.createHash("sha384").update(siteJs()).digest("base64"));
  const withApi = text => apiOrigin ? text.replace(/connect-src 'self'/g, `connect-src 'self' ${apiOrigin}`) : text;
  const headers = Object.fromEntries(Object.entries(globalHeaders).map(([k, v]) => [k, withApi(v)]));
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    const r = redirects.find(([from]) => from === url.pathname);
    if (r) { res.writeHead(+r[2] || 301, { Location: r[1] }); return res.end(); }
    let file = path.join(root, decodeURIComponent(url.pathname));
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!url.pathname.endsWith("/")) { res.writeHead(308, { Location: url.pathname + "/" }); return res.end(); }
      file = path.join(file, "index.html");
    }
    let status = 200;
    if (!fs.existsSync(file) || path.basename(file).startsWith("_")) { status = 404; file = path.join(PUB, "404.html"); }
    const type = TYPES[path.extname(file)] || "application/octet-stream";
    res.writeHead(status, { "Content-Type": type, ...headers });
    if (apiOrigin && file.endsWith(".html")) return res.end(withSri(withApi(fs.readFileSync(file, "utf8"))));
    if (apiOrigin && file === SITE_JS) return res.end(siteJs());
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(ok => server.listen(port, () => ok(server)));
}
if (require.main === module) {
  const port = +process.argv[2] || 8000, apiOrigin = process.argv[3] || "";
  serve(port, { apiOrigin }).then(() => console.log(`Serving public/ at http://localhost:${port}${apiOrigin ? ` with accounts via ${apiOrigin}` : ""}`));
}
module.exports = { serve };
