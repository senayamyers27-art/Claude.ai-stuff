/* Progress sync. Each document is one of the app's localStorage entries: 'cert:<id>' or 'labs'.
   Writes use optimistic concurrency: the client sends the version it last saw; if the server has
   moved on, it answers 409 with its copy and the client merges and retries. */
import { now, bad, HttpError } from "./util.js";

export const MAX_DOC_BYTES = 256 * 1024;
const DOC_KEY = /^(cert:[a-z0-9-]{1,40}|labs)$/;
const MAX_DOCS = 40;

export function checkDocKey(key) {
  if (!DOC_KEY.test(key)) throw bad("invalid_doc", "Unknown progress document.");
  return key;
}

export async function listDocs(env, user) {
  const rows = (await env.DB.prepare("SELECT doc_key, body, version, updated_at FROM progress_docs WHERE user_id = ? ORDER BY doc_key").bind(user.id).all()).results || [];
  return { docs: rows.map(r => ({ key: r.doc_key, version: r.version, updatedAt: r.updated_at, body: JSON.parse(r.body) })) };
}

export async function putDoc(env, user, key, input) {
  checkDocKey(key);
  const baseVersion = Number.isInteger(input.baseVersion) ? input.baseVersion : 0;
  const body = input.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) throw bad("invalid_body", "Progress must be a JSON object.");
  const text = JSON.stringify(body);
  if (text.length > MAX_DOC_BYTES) throw new HttpError(413, "too_large", "This progress document is too large to sync.");
  const t = now();

  if (baseVersion === 0) {
    const count = await env.DB.prepare("SELECT COUNT(*) AS n FROM progress_docs WHERE user_id = ?").bind(user.id).first();
    if (count.n >= MAX_DOCS) throw bad("too_many_docs", "Too many progress documents.");
    const ins = await env.DB.prepare(
      "INSERT INTO progress_docs (user_id, doc_key, body, version, updated_at) VALUES (?, ?, ?, 1, ?) ON CONFLICT(user_id, doc_key) DO NOTHING"
    ).bind(user.id, key, text, t).run();
    if (ins.meta && ins.meta.changes === 1) return { status: 200, data: { key, version: 1, updatedAt: t } };
  } else {
    const upd = await env.DB.prepare(
      "UPDATE progress_docs SET body = ?, version = version + 1, updated_at = ? WHERE user_id = ? AND doc_key = ? AND version = ?"
    ).bind(text, t, user.id, key, baseVersion).run();
    if (upd.meta && upd.meta.changes === 1) return { status: 200, data: { key, version: baseVersion + 1, updatedAt: t } };
  }
  // Someone else (another device) wrote first: return the current copy for merging.
  const cur = await env.DB.prepare("SELECT body, version, updated_at FROM progress_docs WHERE user_id = ? AND doc_key = ?").bind(user.id, key).first();
  if (!cur) throw new HttpError(409, "conflict", "Progress changed on another device. Try again.");
  return { status: 409, data: { error: "conflict", key, version: cur.version, updatedAt: cur.updated_at, body: JSON.parse(cur.body) } };
}
