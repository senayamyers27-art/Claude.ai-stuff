/* Small helpers shared by every route. Web-standard APIs only (fetch, crypto.subtle),
   so the same code runs on Cloudflare Workers and in Node for tests. */

export class HttpError extends Error {
  constructor(status, code, message) { super(message || code); this.status = status; this.code = code; }
}
export const bad = (code, message) => new HttpError(400, code, message);
export const unauthorized = () => new HttpError(401, "unauthorized", "Sign in first.");
export const forbidden = (message = "You don't have access to that.") => new HttpError(403, "forbidden", message);
export const notFound = (message = "Not found.") => new HttpError(404, "not_found", message);

export const now = () => Date.now();

export function randomHex(bytes = 32) {
  const a = new Uint8Array(bytes);
  crypto.getRandomValues(a);
  return [...a].map(b => b.toString(16).padStart(2, "0")).join("");
}
export const newId = prefix => `${prefix}_${randomHex(12)}`;

export async function sha256Hex(text) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, "0")).join("");
}

// Constant-time string comparison for secrets and signatures.
export function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export function normalizeEmail(raw) {
  const e = String(raw || "").trim().toLowerCase();
  if (e.length > 254 || !/^[^\s@<>"',;]+@[^\s@<>"',;]+\.[a-z]{2,}$/.test(e)) throw bad("invalid_email", "Enter a valid email address.");
  return e;
}

export async function readJson(request, maxBytes = 16 * 1024) {
  const len = Number(request.headers.get("content-length") || 0);
  if (len > maxBytes) throw new HttpError(413, "too_large", "Request is too large.");
  const text = await request.text();
  if (text.length > maxBytes) throw new HttpError(413, "too_large", "Request is too large.");
  if (!text) return {};
  try {
    const v = JSON.parse(text);
    if (v === null || typeof v !== "object" || Array.isArray(v)) throw new Error();
    return v;
  } catch (e) { throw bad("invalid_json", "Request body must be a JSON object."); }
}

export function parseCookies(request) {
  const out = {};
  (request.headers.get("cookie") || "").split(";").forEach(p => {
    const i = p.indexOf("=");
    if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}

export function clientIp(request) {
  return request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "unknown";
}

export const isHttps = url => /^https:\/\//.test(url || "");
