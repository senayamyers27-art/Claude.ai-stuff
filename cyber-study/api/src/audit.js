/* Audit log and rate limiting, both stored in D1. */
import { now, sha256Hex, clientIp, HttpError } from "./util.js";

export async function audit(env, request, { actor = null, org = null, action, target = null }) {
  const ipHash = request ? (await sha256Hex("ip:" + clientIp(request))).slice(0, 16) : null;
  await env.DB.prepare("INSERT INTO audit_log (at, actor, org_id, action, target, ip_hash) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(now(), actor, org, action, target, ipHash).run();
}

// Fixed-window counter. Throws 429 when `limit` requests happen within `windowMs`.
export async function rateLimit(env, bucket, limit, windowMs) {
  const t = now();
  const key = (await sha256Hex(bucket)).slice(0, 32);
  const row = await env.DB.prepare("SELECT window_start, count FROM rate_limits WHERE bucket = ?").bind(key).first();
  if (!row || t - row.window_start >= windowMs) {
    await env.DB.prepare("INSERT INTO rate_limits (bucket, window_start, count) VALUES (?, ?, 1) ON CONFLICT(bucket) DO UPDATE SET window_start = excluded.window_start, count = 1")
      .bind(key, t).run();
    return;
  }
  if (row.count >= limit) throw new HttpError(429, "rate_limited", "Too many requests. Wait a few minutes and try again.");
  await env.DB.prepare("UPDATE rate_limits SET count = count + 1 WHERE bucket = ?").bind(key).run();
}
