#!/usr/bin/env node
/* Runs the Worker in Node for local development and browser tests: SQLite instead of D1,
   no email (sign-in links come back in the response), no Stripe unless you set its env vars.
   Usage: node api/dev-server.js [port] [site-origin]   (defaults 8787, http://localhost:8000)
   Pro content: loads every *.json in PRO_CONTENT_DIR (for example ../cyber-study-pro/content)
   or, if unset, the small samples in api/test/fixtures/pro. Make a local account Pro with
   PRO_EMAILS=you@example.com (comma-separated). */
process.removeAllListeners("warning");
const http = require("http");
const fs = require("fs"), path = require("path");
const { createD1, createR2 } = require("./test/d1-shim.js");

async function loadContent(r2, dir) {
  for (const f of fs.readdirSync(dir).filter(f => /^[a-z0-9-]+\.json$/.test(f))) await r2.put(`pro/${f}`, fs.readFileSync(path.join(dir, f), "utf8"));
}
// A development stand-in for Stripe: gives these emails an active Pro subscription once they exist.
async function grantPro(db, emails) {
  for (const email of emails) {
    const u = await db.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    if (u) await db.prepare(`INSERT INTO subscriptions (stripe_subscription, stripe_customer, user_id, plan, status, seats, current_period_end, updated_at)
      VALUES (?, 'cus_dev', ?, 'pro', 'active', 1, NULL, ?) ON CONFLICT(stripe_subscription) DO NOTHING`).bind("sub_dev_" + u.id, u.id, Date.now()).run();
  }
}

async function start({ port = 8787, siteOrigin = "http://localhost:8000", dbFile = ":memory:", env: extra = {} } = {}) {
  const worker = (await import("./src/index.js")).default;
  const env = { DB: createD1(dbFile), CONTENT: createR2(), SITE_ORIGIN: siteOrigin, APP_ENV: "development", EMAIL_FROM: "dev@localhost", ...extra };
  await loadContent(env.CONTENT, process.env.PRO_CONTENT_DIR || path.join(__dirname, "test/fixtures/pro"));
  const proEmails = (process.env.PRO_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
  const server = http.createServer(async (req, res) => {
    if (proEmails.length) await grantPro(env.DB, proEmails);
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
