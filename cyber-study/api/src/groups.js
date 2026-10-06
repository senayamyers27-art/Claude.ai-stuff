/* Study groups: a few people studying the same certification together. Anyone signed in can start one and share its
   join code; everyone in the group (and only them) sees each member's chosen name and the same progress numbers a
   teacher would: exam readiness, lessons read, questions answered, best practice exam and when they were last
   active. Joining needs agreement to share those; leaving stops it at once. No answers, notes or emails are shown. */
import { now, newId, bad, notFound, HttpError, clientIp } from "./util.js";
import { audit, rateLimit } from "./audit.js";
import CERT_META from "./cert-meta.js";
import { newJoinCode, CODE_RE, certSummary } from "./classes.js";

const MAX_MEMBERS = 20, MAX_GROUPS = 10;
const GROUP_ID_RE = /^grp_[0-9a-f]{24}$/;
const clean = (v, max, label) => {
  const s = String(v == null ? "" : v).replace(/[\u0000-\u001f\u007f​-‏‪-‮⁦-⁩]/g, "").replace(/\s+/g, " ").trim();
  if (!s || s.length > max) throw bad("invalid_text", `${label} must be 1–${max} characters.`);
  return s;
};
const cert = v => {
  const s = String(v || "");
  if (!/^[a-z0-9-]{1,40}$/.test(s) || !Object.prototype.hasOwnProperty.call(CERT_META, s)) throw bad("invalid_cert", "Choose a certification.");
  return s;
};

async function uniqueCode(env) {
  for (let i = 0; i < 5; i++) {
    const code = newJoinCode();
    if (!(await env.DB.prepare("SELECT 1 AS x FROM study_groups WHERE join_code = ?").bind(code).first())) return code;
  }
  throw new HttpError(503, "try_again", "Couldn't make a join code. Try again.");
}
async function countMine(env, userId) {
  return (await env.DB.prepare("SELECT COUNT(*) AS n FROM study_group_members WHERE user_id = ?").bind(userId).first()).n;
}

// POST /v1/groups { name, certId, displayName }: start a group; the creator is its first member.
export async function createGroup(env, request, user, body) {
  await rateLimit(env, "group:create:" + user.id, 20, 24 * 60 * 60 * 1000);
  const name = clean(body.name, 60, "Group name"), certId = cert(body.certId), displayName = clean(body.displayName, 40, "Your name");
  if ((await countMine(env, user.id)) >= MAX_GROUPS) throw new HttpError(409, "too_many_groups", `You can be in up to ${MAX_GROUPS} study groups. Leave one first.`);
  const id = newId("grp"), t = now(), code = await uniqueCode(env);
  await env.DB.prepare("INSERT INTO study_groups (id, name, cert_id, owner_id, join_code, created_at) VALUES (?, ?, ?, ?, ?, ?)").bind(id, name, certId, user.id, code, t).run();
  await env.DB.prepare("INSERT INTO study_group_members (group_id, user_id, display_name, joined_at) VALUES (?, ?, ?, ?)").bind(id, user.id, displayName, t).run();
  await audit(env, request, { actor: user.id, action: "group.created", target: id });
  return { id, name, certId, code };
}

// GET /v1/groups: my groups, each with its board.
export async function listGroups(env, user) {
  const groups = (await env.DB.prepare(
    "SELECT g.* FROM study_groups g JOIN study_group_members m ON m.group_id = g.id WHERE m.user_id = ? ORDER BY g.created_at DESC").bind(user.id).all()).results || [];
  const out = [];
  for (const g of groups) out.push(await board(env, user, g));
  return { groups: out, limit: MAX_GROUPS };
}

async function board(env, user, g) {
  const members = (await env.DB.prepare("SELECT user_id, display_name, joined_at FROM study_group_members WHERE group_id = ? ORDER BY joined_at").bind(g.id).all()).results || [];
  const meta = CERT_META[g.cert_id];
  const rows = [];
  for (const m of members) {
    const d = await env.DB.prepare("SELECT body, updated_at FROM progress_docs WHERE user_id = ? AND doc_key = ?").bind(m.user_id, "cert:" + g.cert_id).first();
    let body = null; try { body = d ? JSON.parse(d.body) : null; } catch (e) {}
    const s = certSummary(body, meta);
    rows.push({ displayName: m.display_name, you: m.user_id === user.id, readiness: s.readiness, lessonsRead: s.lessonsRead, lessonsTotal: s.lessonsTotal, answered: s.answered, bestExam: s.bestExam, lastActive: d ? d.updated_at : null });
  }
  return { id: g.id, name: g.name, certId: g.cert_id, code: g.join_code, owner: g.owner_id === user.id, members: rows };
}

async function groupByCode(env, code) {
  if (!CODE_RE.test(code)) throw notFound("That join code doesn't match a study group.");
  const g = await env.DB.prepare("SELECT * FROM study_groups WHERE join_code = ?").bind(code).first();
  if (!g) throw notFound("That join code doesn't match a study group.");
  return g;
}
const limitLookups = async (env, request, user) => {
  await rateLimit(env, "group:lookup:" + user.id, 30, 60 * 60 * 1000);
  await rateLimit(env, "group:lookup:ip:" + clientIp(request), 60, 60 * 60 * 1000);
};

// GET /v1/groups/join/<code>: what the group is, before joining.
export async function previewGroup(env, request, user, code) {
  await limitLookups(env, request, user);
  const g = await groupByCode(env, code);
  const n = (await env.DB.prepare("SELECT COUNT(*) AS n FROM study_group_members WHERE group_id = ?").bind(g.id).first()).n;
  const member = !!(await env.DB.prepare("SELECT 1 AS x FROM study_group_members WHERE group_id = ? AND user_id = ?").bind(g.id, user.id).first());
  return { group: { name: g.name, certId: g.cert_id, members: n }, isMember: member };
}

// POST /v1/groups/join/<code> { displayName, consent: true }
export async function joinGroup(env, request, user, code, body) {
  await limitLookups(env, request, user);
  if (body.consent !== true) throw bad("consent_required", "To join, agree to share your progress numbers with the group.");
  const displayName = clean(body.displayName, 40, "Your name");
  const g = await groupByCode(env, code);
  const existing = await env.DB.prepare("SELECT 1 AS x FROM study_group_members WHERE group_id = ? AND user_id = ?").bind(g.id, user.id).first();
  if (existing) {
    await env.DB.prepare("UPDATE study_group_members SET display_name = ? WHERE group_id = ? AND user_id = ?").bind(displayName, g.id, user.id).run();
  } else {
    if ((await env.DB.prepare("SELECT COUNT(*) AS n FROM study_group_members WHERE group_id = ?").bind(g.id).first()).n >= MAX_MEMBERS) throw new HttpError(409, "group_full", `This group is full (${MAX_MEMBERS} people).`);
    if ((await countMine(env, user.id)) >= MAX_GROUPS) throw new HttpError(409, "too_many_groups", `You can be in up to ${MAX_GROUPS} study groups. Leave one first.`);
    await env.DB.prepare("INSERT INTO study_group_members (group_id, user_id, display_name, joined_at) VALUES (?, ?, ?, ?)").bind(g.id, user.id, displayName, now()).run();
  }
  await audit(env, request, { actor: user.id, action: "group.joined", target: g.id });
  return { group: { id: g.id, name: g.name, certId: g.cert_id } };
}

// DELETE /v1/groups/<id>/membership: leave. The last one out closes the group; if the owner leaves, the next
// member to have joined takes over.
export async function leaveGroup(env, request, user, groupId) {
  if (!GROUP_ID_RE.test(groupId)) throw notFound("Group not found.");
  const r = await env.DB.prepare("DELETE FROM study_group_members WHERE group_id = ? AND user_id = ?").bind(groupId, user.id).run();
  if (!r.meta || r.meta.changes !== 1) throw notFound("You're not in that group.");
  const next = await env.DB.prepare("SELECT user_id FROM study_group_members WHERE group_id = ? ORDER BY joined_at LIMIT 1").bind(groupId).first();
  if (!next) await env.DB.prepare("DELETE FROM study_groups WHERE id = ?").bind(groupId).run();
  else await env.DB.prepare("UPDATE study_groups SET owner_id = ? WHERE id = ? AND owner_id = ?").bind(next.user_id, groupId, user.id).run();
  await audit(env, request, { actor: user.id, action: "group.left", target: groupId });
  return { left: true };
}

// POST /v1/groups/<id>/code (owner): a new join code, so the old one stops working.
export async function newGroupCode(env, request, user, groupId) {
  if (!GROUP_ID_RE.test(groupId)) throw notFound("Group not found.");
  const g = await env.DB.prepare("SELECT id FROM study_groups WHERE id = ? AND owner_id = ?").bind(groupId, user.id).first();
  if (!g) throw notFound("Group not found.");
  const code = await uniqueCode(env);
  await env.DB.prepare("UPDATE study_groups SET join_code = ? WHERE id = ?").bind(code, g.id).run();
  return { code };
}
