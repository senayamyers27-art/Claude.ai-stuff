#!/usr/bin/env node
/* Runs the Worker in Node for local development and browser tests: SQLite instead of D1,
   no email (sign-in links come back in the response), no Stripe unless you set its env vars.
   Usage: node api/dev-server.js [port] [site-origin]   (defaults 8787, http://localhost:8000) */
process.removeAllListeners("warning");
const http = require("http");
const { createD1, createR2 } = require("./test/d1-shim.js");

async function start({ port = 8787, siteOrigin = "http://localhost:8000", dbFile = ":memory:", env: extra = {} } = {}) {
  const worker = (await import("./src/index.js")).default;
  const env = { DB: createD1(dbFile), CONTENT: createR2(), SITE_ORIGIN: siteOrigin, APP_ENV: "development", EMAIL_FROM: "dev@localhost", ...extra };
  const server = http.createServer(async (req, res) => {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const body = Buffer.concat(chunks);
    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) headers.set(k, Array.isArray(v) ? v.join(", ") : v);
    headers.set("cf-connecting-ip", req.socket.remoteAddress || "127.0.0.1");
    const request = new Request(`http://localhost:${port}${req.url}`, { method: req.method, headers, body: ["GET", "HEAD"].includes(req.method) ? undefined : body });
    const response = await worker.fetch(request, env);
    const out = {};
    response.headers.forEach((v, k) => { out[k] = v; });
    res.writeHead(response.status, out);
    res.end(Buffer.from(await response.arrayBuffer()));
  });
  await new Promise(ok => server.listen(port, ok));
  return { server, env };
}
module.exports = { start };
if (require.main === module) {
  const port = +process.argv[2] || 8787, siteOrigin = process.argv[3] || "http://localhost:8000";
  start({ port, siteOrigin }).then(() => console.log(`API (development) at http://localhost:${port}, allowing ${siteOrigin}`));
}
