/* Success stories: a member who passed shares their result and a few words. Nothing is shown on the site unless
   the member ticked "you can show this" and the site owner approved it; it then appears under the name the member
   chose (or with no name). Members can withdraw their story at any time, which removes it from the site. */
import { now, newId, bad, notFound, forbidden } from "./util.js";
import { rateLimit } from "./audit.js";
import { isAdmin } from "./admin.js";
import CERTS from "./cert-meta.js";

const STORY_ID_RE = /^sty_[0-9a-f]{24}$/;
const clean = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u0008\u000b-\u001f\u007f​-‏‪-‮⁦-⁩]/g, "").replace(/[ \t]+/g, " ").trim().slice(0, max);
const out = s => ({ id: s.id, certId: s.cert_id, passedOn: s.passed_on, quote: s.quote, shownAs: s.shown_as, publish: !!s.publish, status: s.status, createdAt: s.created_at });

// POST /v1/stories { certId, passedOn, quote, shownAs, publish }: add or replace my story for a certification.
export async function saveStory(env, request, user, body) {
  await rateLimit(env, "story:" + user.id, 20, 24 * 60 * 60 * 1000);
  const certId = String(body.certId || "");
  if (!Object.prototype.hasOwnProperty.call(CERTS, certId)) throw bad("invalid_cert", "Choose the certification you passed.");
  const passedOn = String(body.passedOn || "");
  const t = Date.parse(passedOn + "T00:00:00Z");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(passedOn) || !Number.isFinite(t) || t > now() + 864e5 || t < now() - 3 * 366 * 864e5) throw bad("invalid_date", "Enter the date you passed (within the last three years).");
  const quote = clean(body.quote, 600);
  if (quote.length < 20) throw bad("invalid_quote", "Write a sentence or two about how you prepared (at least 20 characters).");
  if (/https?:\/\/|www\./i.test(quote)) throw bad("invalid_quote", "Leave links out of your story.");
  const shownAs = clean(body.shownAs, 40);
  const publish = body.publish === true ? 1 : 0;
  const existing = await env.DB.prepare("SELECT id FROM stories WHERE user_id = ? AND cert_id = ?").bind(user.id, certId).first();
  const id = existing ? existing.id : newId("sty");
  // Any change goes back for approval.
  await env.DB.prepare(`INSERT INTO stories (id, user_id, cert_id, passed_on, quote, shown_as, publish, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    ON CONFLICT(user_id, cert_id) DO UPDATE SET passed_on = excluded.passed_on, quote = excluded.quote, shown_as = excluded.shown_as, publish = excluded.publish, status = 'pending'`)
    .bind(id, user.id, certId, passedOn, quote, shownAs, publish, now()).run();
  return { id, status: "pending" };
}

// GET /v1/stories/mine
export async function myStories(env, user) {
  return { stories: ((await env.DB.prepare("SELECT * FROM stories WHERE user_id = ? ORDER BY created_at DESC").bind(user.id).all()).results || []).map(out) };
}

// DELETE /v1/stories/<id> (mine)
export async function deleteStory(env, user, id) {
  if (!STORY_ID_RE.test(id)) throw notFound("Story not found.");
  const r = await env.DB.prepare("DELETE FROM stories WHERE id = ? AND user_id = ?").bind(id, user.id).run();
  if (!r.meta || !r.meta.changes) throw notFound("Story not found.");
  return { deleted: true };
}

// GET /v1/stories (public): approved stories the members agreed to show. No user ids or emails.
export async function publicStories(env, certId) {
  const rows = (await env.DB.prepare(`SELECT id, cert_id, passed_on, quote, shown_as FROM stories WHERE status = 'approved' AND publish = 1
    ${certId ? "AND cert_id = ?" : ""} ORDER BY passed_on DESC LIMIT 50`).bind(...(certId ? [certId] : [])).all()).results || [];
  return { stories: rows.map(s => ({ id: s.id, certId: s.cert_id, passedOn: s.passed_on, quote: s.quote, shownAs: s.shown_as })) };
}

// Site owner: GET /v1/admin/stories (pending and approved), POST /v1/admin/stories/<id> { status }.
export async function adminStories(env, user) {
  if (!isAdmin(env, user)) throw forbidden("This page is for the site's owner.");
  return { stories: ((await env.DB.prepare("SELECT * FROM stories WHERE publish = 1 ORDER BY status = 'pending' DESC, created_at DESC LIMIT 200").all()).results || []).map(out) };
}
export async function moderateStory(env, user, id, body) {
  if (!isAdmin(env, user)) throw forbidden("This page is for the site's owner.");
  if (!STORY_ID_RE.test(id) || !["approved", "hidden"].includes(body.status)) throw bad("invalid", "Choose approve or hide.");
  const r = await env.DB.prepare("UPDATE stories SET status = ? WHERE id = ? AND publish = 1").bind(body.status, id).run();
  if (!r.meta || !r.meta.changes) throw notFound("Story not found.");
  return { status: body.status };
}
