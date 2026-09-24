#!/usr/bin/env node
/* Local preview of public/ that behaves like Cloudflare Pages for the parts that matter here:
   directory index pages, trailing-slash redirects, _redirects rules and _headers (global block).
   Usage: node tools/serve.js [port]   (default 8000) */
const http = require("http"), fs = require("fs"), path = require("path");
const PUB = path.join(__dirname, "..", "public");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml" };
const redirects = fs.readFileSync(path.join(PUB, "_redirects"), "utf8").split("\n").filter(l => l && !l.startsWith("#")).map(l => l.trim().split(/\s+/));
const globalHeaders = {};
(fs.readFileSync(path.join(PUB, "_headers"), "utf8").split(/\n(?=\/)/).find(b => b.startsWith("/*\n")) || "").split("\n").slice(1)
  .forEach(l => { const m = l.match(/^\s+([\w-]+):\s*(.+)$/); if (m && m[1] !== "Strict-Transport-Security") globalHeaders[m[1]] = m[2].replace("; upgrade-insecure-requests", ""); });

function serve(port) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    const r = redirects.find(([from]) => from === url.pathname);
    if (r) { res.writeHead(+r[2] || 301, { Location: r[1] }); return res.end(); }
    let file = path.join(PUB, decodeURIComponent(url.pathname));
    if (!file.startsWith(PUB)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!url.pathname.endsWith("/")) { res.writeHead(308, { Location: url.pathname + "/" }); return res.end(); }
      file = path.join(file, "index.html");
    }
    let status = 200;
    if (!fs.existsSync(file) || path.basename(file).startsWith("_")) { status = 404; file = path.join(PUB, "404.html"); }
    res.writeHead(status, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", ...globalHeaders });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(ok => server.listen(port, () => ok(server)));
}
if (require.main === module) {
  const port = +process.argv[2] || 8000;
  serve(port).then(() => console.log(`Serving public/ at http://localhost:${port}`));
}
module.exports = { serve };
