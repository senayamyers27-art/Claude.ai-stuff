/* Organizations, invites, cohorts and the instructor summary (group licenses).
   Every query is scoped to an org the caller belongs to, with the role checked. */
import { now, newId, randomHex, sha256Hex, bad, forbidden, notFound, HttpError } from "./util.js";
import { audit, rateLimit } from "./audit.js";
import { orgSeatLimit } from "./billing.js";

const cleanName = (v, max = 80) => {
  const s = String(v || "").replace(/[\u0000-\u001f\u007f]/g, "").trim();
  if (!s || s.length > max) throw bad("invalid_name", `Name must be 1–${max} characters.`);
  return s;
};
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export async function roleIn(env, orgId, userId) {
  const r = await env.DB.prepare("SELECT role FROM org_members WHERE org_id = ? AND user_id = ?").bind(orgId, userId).first();
  return r ? r.role : null;
}
async function requireRole(env, orgId, user, roles) {
  const role = await roleIn(env, orgId, user.id);
  // Not a member looks the same as not existing, so org ids can't be probed.
  if (!role) throw notFound("Organization not found.");
  if (!roles.includes(role)) throw forbidden();
  return role;
}

export async function createOrg(env, request, user, body) {
  await rateLimit(env, "org:create:" + user.id, 5, 24 * 60 * 60 * 1000);
  const id = newId("org"), t = now();
  await env.DB.prepare("INSERT INTO orgs (id, name, created_at) VALUES (?, ?, ?)").bind(id, cleanName(body.name), t).run();
  await env.DB.prepare("INSERT INTO org_members (org_id, user_id, role, joined_at) VALUES (?, ?, 'owner', ?)").bind(id, user.id, t).run();
  await audit(env, request, { actor: user.id, org: id, action: "org.created" });
  return { id };
}

export async function createCohort(env, request, user, orgId, body) {
  await requireRole(env, orgId, user, ["owner", "instructor"]);
  const certId = String(body.certId || "");
  if (!/^[a-z0-9-]{1,40}$/.test(certId)) throw bad("invalid_cert", "Choose a certification.");
  for (const d of [body.startDate, body.examDate]) if (d != null && d !== "" && !ISO_DATE.test(d)) throw bad("invalid_date", "Dates must be YYYY-MM-DD.");
  const id = newId("coh");
  await env.DB.prepare("INSERT INTO cohorts (id, org_id, name, cert_id, start_date, exam_date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(id, orgId, cleanName(body.name), certId, body.startDate || null, body.examDate || null, now()).run();
  await audit(env, request, { actor: user.id, org: orgId, action: "cohort.created", target: id });
  return { id };
}

export async function listCohorts(env, user, orgId) {
  await requireRole(env, orgId, user, ["owner", "instructor"]);
  const rows = (await env.DB.prepare(
    `SELECT c.id, c.name, c.cert_id AS certId, c.start_date AS startDate, c.exam_date AS examDate,
            (SELECT COUNT(*) FROM cohort_members m WHERE m.cohort_id = c.id) AS learners
     FROM cohorts c WHERE c.org_id = ? ORDER BY c.created_at DESC`
  ).bind(orgId).all()).results || [];
  return { cohorts: rows, seats: await orgSeatLimit(env, orgId), members: (await env.DB.prepare("SELECT COUNT(*) AS n FROM org_members WHERE org_id = ?").bind(orgId).first()).n };
}

export async function createInvite(env, request, user, orgId, body) {
  await requireRole(env, orgId, user, ["owner", "instructor"]);
  const role = body.role === "instructor" ? "instructor" : "learner";
  if (role === "instructor" && (await roleIn(env, orgId, user.id)) !== "owner") throw forbidden("Only the owner can invite instructors.");
  let cohortId = null;
  if (body.cohortId) {
    const c = await env.DB.prepare("SELECT id FROM cohorts WHERE id = ? AND org_id = ?").bind(String(body.cohortId), orgId).first();
    if (!c) throw notFound("Cohort not found.");
    cohortId = c.id;
  }
  const maxUses = Math.min(Math.max(parseInt(body.maxUses, 10) || 1, 1), 500);
  const days = Math.min(Math.max(parseInt(body.days, 10) || 14, 1), 90);
  const code = randomHex(16), t = now();
  await env.DB.prepare("INSERT INTO invites (code_hash, org_id, cohort_id, role, expires_at, max_uses, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(await sha256Hex(code), orgId, cohortId, role, t + days * 864e5, maxUses, user.id, t).run();
  await audit(env, request, { actor: user.id, org: orgId, action: "invite.created", target: role });
  return { code, link: `${env.SITE_ORIGIN}/?invite=${code}#account`, expiresAt: t + days * 864e5, maxUses };
}

export async function acceptInvite(env, request, user, code) {
  if (!/^[0-9a-f]{32}$/.test(code)) throw bad("invalid_invite", "That invite isn't valid.");
  await rateLimit(env, "invite:" + user.id, 20, 60 * 60 * 1000);
  const hash = await sha256Hex(code), t = now();
  const inv = await env.DB.prepare("SELECT * FROM invites WHERE code_hash = ?").bind(hash).first();
  if (!inv || inv.expires_at <= t || inv.uses >= inv.max_uses) throw new HttpError(400, "invalid_invite", "That invite has expired or was already used.");
  const existing = await roleIn(env, inv.org_id, user.id);
  if (!existing) {
    const members = (await env.DB.prepare("SELECT COUNT(*) AS n FROM org_members WHERE org_id = ?").bind(inv.org_id).first()).n;
    if (members >= (await orgSeatLimit(env, inv.org_id)) + 1) throw new HttpError(402, "no_seats", "This organization has no free seats. Ask the owner to add seats.");
    const claim = await env.DB.prepare("UPDATE invites SET uses = uses + 1 WHERE code_hash = ? AND uses < max_uses").bind(hash).run();
    if (!claim.meta || claim.meta.changes !== 1) throw new HttpError(400, "invalid_invite", "That invite was just used up.");
    await env.DB.prepare("INSERT INTO org_members (org_id, user_id, role, joined_at) VALUES (?, ?, ?, ?)").bind(inv.org_id, user.id, inv.role, t).run();
  }
  if (inv.cohort_id) await env.DB.prepare("INSERT INTO cohort_members (cohort_id, user_id) VALUES (?, ?) ON CONFLICT DO NOTHING").bind(inv.cohort_id, user.id).run();
  await audit(env, request, { actor: user.id, org: inv.org_id, action: "invite.accepted", target: inv.role });
  const org = await env.DB.prepare("SELECT id, name FROM orgs WHERE id = ?").bind(inv.org_id).first();
  return { org, role: existing || inv.role };
}

/* Instructor summary: derived numbers only. Lab notes and quiz history are never exposed. */
export function summarize(certDoc, labsDoc) {
  const stats = (certDoc && certDoc.stats) || {};
  let c = 0, t = 0;
  const byDomain = {};
  for (const [d, s] of Object.entries(stats)) {
    if (!s || typeof s.t !== "number") continue;
    c += s.c || 0; t += s.t;
    byDomain[d] = s.t ? Math.round(100 * (s.c || 0) / s.t) : null;
  }
  const daysChecked = Object.values((certDoc && certDoc.checks) || {}).filter(Boolean).length;
  const labs = labsDoc || {};
  const labsDone = Object.values(labs).filter(l => l && l.done).length;
  const labsStarted = Object.values(labs).filter(l => l && !l.done && Object.values(l.steps || {}).some(Boolean)).length;
  const last = Array.isArray(certDoc && certDoc.history) && certDoc.history[0];
  return { answered: t, accuracy: t ? Math.round(100 * c / t) : null, byDomain, daysChecked, labsDone, labsStarted, lastScore: last ? Math.round(100 * last.score / last.total) : null };
}

export async function cohortSummary(env, user, cohortId) {
  const cohort = await env.DB.prepare("SELECT * FROM cohorts WHERE id = ?").bind(cohortId).first();
  if (!cohort) throw notFound("Cohort not found.");
  await requireRole(env, cohort.org_id, user, ["owner", "instructor"]);
  const members = (await env.DB.prepare(
    "SELECT u.id, u.email FROM cohort_members m JOIN users u ON u.id = m.user_id WHERE m.cohort_id = ? ORDER BY u.email"
  ).bind(cohortId).all()).results || [];
  const learners = [];
  for (const m of members) {
    const docs = (await env.DB.prepare("SELECT doc_key, body, updated_at FROM progress_docs WHERE user_id = ? AND doc_key IN (?, 'labs')")
      .bind(m.id, "cert:" + cohort.cert_id).all()).results || [];
    const cert = docs.find(d => d.doc_key.startsWith("cert:"));
    const labs = docs.find(d => d.doc_key === "labs");
    learners.push({
      email: m.email,
      lastActive: Math.max(0, ...docs.map(d => d.updated_at)) || null,
      ...summarize(cert ? JSON.parse(cert.body) : null, labs ? JSON.parse(labs.body) : null)
    });
  }
  return { cohort: { id: cohort.id, name: cohort.name, certId: cohort.cert_id, startDate: cohort.start_date, examDate: cohort.exam_date }, learners };
}

export function summaryCsv(summary) {
  const q = v => {
    let s = v == null ? "" : String(v);
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // stop spreadsheet formula injection
    return `"${s.replace(/"/g, '""')}"`;
  };
  const rows = [["email", "answered", "accuracy_pct", "days_checked", "labs_done", "labs_started", "last_score_pct", "last_active"]];
  for (const l of summary.learners) rows.push([l.email, l.answered, l.accuracy, l.daysChecked, l.labsDone, l.labsStarted, l.lastScore, l.lastActive ? new Date(l.lastActive).toISOString() : ""]);
  return rows.map(r => r.map(q).join(",")).join("\r\n") + "\r\n";
}
