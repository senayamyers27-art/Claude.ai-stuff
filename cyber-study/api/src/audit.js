/* Audit log and rate limiting (stored in D1), and security event logging (Workers logs). */
import { now, sha256Hex, hmacSha256Hex, clientIp, HttpError } from "./util.js";

// IP addresses and rate-limit keys are stored only as a keyed hash (HMAC with the IP_HASH_KEY secret, which the
// deploy workflow creates). A plain hash of an IPv4 address could be reversed by trying all 4 billion of them.
let ipKey = "";
export const setHashKey = k => { ipKey = typeof k === "string" ? k : ""; };
const keyedHash = text => ipKey ? hmacSha256Hex(ipKey, text) : sha256Hex(text);
export const ipHash = async request => (await keyedHash("ip:" + clientIp(request))).slice(0, 16);

export async function audit(env, request, { actor = null, org = null, action, target = null }) {
  const ipHash_ = request ? await ipHash(request) : null;
  await env.DB.prepare("INSERT INTO audit_log (at, actor, org_id, action, target, ip_hash) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(now(), actor, org, action, target, ipHash_).run();
}

// Fixed-window counter. Throws 429 when `limit` requests happen within `windowMs`.
export async function rateLimit(env, bucket, limit, windowMs) {
  const t = now();
  const key = (await keyedHash(bucket)).slice(0, 32);
  const row = await env.DB.prepare("SELECT window_start, count FROM rate_limits WHERE bucket = ?").bind(key).first();
  if (!row || t - row.window_start >= windowMs) {
    await env.DB.prepare("INSERT INTO rate_limits (bucket, window_start, count) VALUES (?, ?, 1) ON CONFLICT(bucket) DO UPDATE SET window_start = excluded.window_start, count = 1")
      .bind(key, t).run();
    return;
  }
  if (row.count >= limit) throw new HttpError(429, "rate_limited", "Too many requests. Wait a few minutes and try again.");
  await env.DB.prepare("UPDATE rate_limits SET count = count + 1 WHERE bucket = ?").bind(key).run();
}

// Security events (refused origins, rate limits, failed sign-ins, failed challenges) go to the Worker's
// logs as one JSON line each, not to D1, so a flood of bad requests can't grow the database.
// No emails, tokens or raw IP addresses: the IP is a short keyed hash, enough to spot one source.
export async function securityLog(request, event, detail = {}) {
  const url = new URL(request.url);
  console.warn(JSON.stringify({ type: "security", event, method: request.method, path: url.pathname.replace(/[0-9a-f]{24,}/g, ":id"), ipHash: await ipHash(request), ...detail }));
}
