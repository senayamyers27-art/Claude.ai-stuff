/* Class mode: any signed-in user (free accounts too) can teach a class. Students join with the
   class's join code, but only after agreeing to share a progress summary with the teacher; they
   can leave at any time, which stops sharing at once. Teachers see derived numbers computed here
   from the student's synced progress documents, never raw answers, review queues or lab notes. */
import { now, newId, bad, notFound, clientIp, HttpError } from "./util.js";
import { audit, rateLimit } from "./audit.js";
import CERT_META from "./cert-meta.js";

export const MAX_CLASSES_PER_TEACHER = 20;
export const MAX_STUDENTS_PER_CLASS = 200;
const MAX_CLASSES_JOINED = 20;

// Join codes: 10 characters from a 32-letter alphabet without look-alikes (no l, o, 0 or 1),
// 50 random bits from crypto.getRandomValues. Lookups are rate limited per user and per IP.
const CODE_ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";
export const CODE_RE = /^[a-km-np-z2-9]{10}$/;
export const CLASS_ID_RE = /^cls_[0-9a-f]{24}$/;
export const MEMBER_ID_RE = /^mem_[0-9a-f]{24}$/;
export function newJoinCode() {
  const a = new Uint8Array(10);
  crypto.getRandomValues(a);
  return [...a].map(b => CODE_ALPHABET[b & 31]).join(""); // 256 is a multiple of 32: no bias
}

const cleanText = (v, max, code, label) => {
  const s = String(v == null ? "" : v).replace(/[\u0000-\u001f\u007f​-‏‪-‮⁦-⁩]/g, "").replace(/\s+/g, " ").trim();
  if (!s || s.length > max) throw bad(code, `${label} must be 1–${max} characters.`);
  return s;
};
const cleanCert = v => {
  if (v == null || v === "") return null;
  const s = String(v);
  if (!/^[a-z0-9-]{1,40}$/.test(s)) throw bad("invalid_cert", "Choose a certification.");
  return s;
};

const classOut = c => ({ id: c.id, name: c.name, certId: c.cert_id, teacherName: c.teacher_name, code: c.join_code, createdAt: c.created_at, students: c.students || 0 });

// The class, if the caller teaches it. Someone else's class looks the same as a missing one.
async function ownClass(env, user, classId) {
  if (!CLASS_ID_RE.test(classId)) throw notFound("Class not found.");
  const c = await env.DB.prepare("SELECT * FROM classes WHERE id = ? AND teacher_id = ?").bind(classId, user.id).first();
  if (!c) throw notFound("Class not found.");
  return c;
}

async function uniqueCode(env) {
  for (let i = 0; i < 5; i++) {
    const code = newJoinCode();
    if (!(await env.DB.prepare("SELECT 1 AS x FROM classes WHERE join_code = ?").bind(code).first())) return code;
  }
  throw new HttpError(503, "try_again", "Couldn't make a join code. Try again.");
}

export async function listClasses(env, user) {
  const teaching = (await env.DB.prepare(
    `SELECT c.*, (SELECT COUNT(*) FROM class_members m WHERE m.class_id = c.id) AS students
     FROM classes c WHERE c.teacher_id = ? ORDER BY c.created_at DESC`
  ).bind(user.id).all()).results || [];
  const joined = (await env.DB.prepare(
    `SELECT c.id, c.name, c.cert_id, c.teacher_name, m.display_name, m.show_email, m.joined_at
     FROM class_members m JOIN classes c ON c.id = m.class_id WHERE m.user_id = ? ORDER BY m.joined_at DESC`
  ).bind(user.id).all()).results || [];
  // A student's own assignments, with how far along they are (from their own synced progress).
  let myDocs = null;
  const joinedOut = [];
  for (const j of joined) {
    const list = await assignmentsFor(env, j.id);
    if (list.length && !myDocs) myDocs = (await env.DB.prepare("SELECT doc_key, body, updated_at FROM progress_docs WHERE user_id = ?").bind(user.id).all()).results || [];
    const mine = list.length ? studentSummary(myDocs, j.cert_id) : null;
    const exits = await exitsDoneBy(env, j.id, user.id);
    joinedOut.push({ id: j.id, name: j.name, certId: j.cert_id, teacherName: j.teacher_name, displayName: j.display_name, showEmail: !!j.show_email, joinedAt: j.joined_at,
      assignments: list.map(a => ({ ...a, ...assignmentProgress(a, mine, exits) })) });
  }
  return {
    teaching: teaching.map(classOut),
    joined: joinedOut,
    limit: MAX_CLASSES_PER_TEACHER
  };
}

export async function createClass(env, request, user, body) {
  await rateLimit(env, "class:create:" + user.id, 30, 24 * 60 * 60 * 1000);
  const name = cleanText(body.name, 80, "invalid_name", "Class name");
  const teacherName = cleanText(body.teacherName, 60, "invalid_teacher_name", "Your name");
  const certId = cleanCert(body.certId);
  const n = (await env.DB.prepare("SELECT COUNT(*) AS n FROM classes WHERE teacher_id = ?").bind(user.id).first()).n;
  if (n >= MAX_CLASSES_PER_TEACHER) throw new HttpError(409, "too_many_classes", `You can have up to ${MAX_CLASSES_PER_TEACHER} classes. Delete one first.`);
  const id = newId("cls"), t = now(), code = await uniqueCode(env);
  await env.DB.prepare("INSERT INTO classes (id, teacher_id, teacher_name, name, cert_id, join_code, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(id, user.id, teacherName, name, certId, code, t, t).run();
  await audit(env, request, { actor: user.id, action: "class.created", target: id });
  return classOut({ id, name, cert_id: certId, teacher_name: teacherName, join_code: code, created_at: t, students: 0 });
}

export async function updateClass(env, request, user, classId, body) {
  const c = await ownClass(env, user, classId);
  const name = body.name !== undefined ? cleanText(body.name, 80, "invalid_name", "Class name") : c.name;
  const teacherName = body.teacherName !== undefined ? cleanText(body.teacherName, 60, "invalid_teacher_name", "Your name") : c.teacher_name;
  const certId = body.certId !== undefined ? cleanCert(body.certId) : c.cert_id;
  await env.DB.prepare("UPDATE classes SET name = ?, teacher_name = ?, cert_id = ?, updated_at = ? WHERE id = ? AND teacher_id = ?")
    .bind(name, teacherName, certId, now(), c.id, user.id).run();
  await audit(env, request, { actor: user.id, action: "class.updated", target: c.id });
  return classOut({ ...c, name, teacher_name: teacherName, cert_id: certId });
}

export async function deleteClass(env, request, user, classId) {
  const c = await ownClass(env, user, classId);
  await env.DB.prepare("DELETE FROM classes WHERE id = ? AND teacher_id = ?").bind(c.id, user.id).run(); // cascades to members
  await audit(env, request, { actor: user.id, action: "class.deleted", target: c.id });
  return { deleted: true };
}

// A new join code; the old one stops working at once. Students already in the class stay.
export async function rotateCode(env, request, user, classId) {
  const c = await ownClass(env, user, classId);
  await rateLimit(env, "class:rotate:" + user.id, 30, 60 * 60 * 1000);
  const code = await uniqueCode(env);
  await env.DB.prepare("UPDATE classes SET join_code = ?, updated_at = ? WHERE id = ? AND teacher_id = ?").bind(code, now(), c.id, user.id).run();
  await audit(env, request, { actor: user.id, action: "class.code_rotated", target: c.id });
  return { code };
}

async function limitLookups(env, request, user) {
  // Join codes are guessable only by brute force; these limits keep that impractical.
  await rateLimit(env, "class:join:" + user.id, 30, 60 * 60 * 1000);
  await rateLimit(env, "class:join:ip:" + clientIp(request), 60, 60 * 60 * 1000);
}
async function classByCode(env, code) {
  if (!CODE_RE.test(code)) throw bad("invalid_code", "That class code isn't valid.");
  const c = await env.DB.prepare("SELECT * FROM classes WHERE join_code = ?").bind(code).first();
  if (!c) throw notFound("No class has that code. Check it with your teacher.");
  return c;
}

// What a student sees before agreeing: the class and teacher names, and what will be shared.
export async function previewJoin(env, request, user, code) {
  await limitLookups(env, request, user);
  const c = await classByCode(env, code);
  const member = await env.DB.prepare("SELECT 1 AS x FROM class_members WHERE class_id = ? AND user_id = ?").bind(c.id, user.id).first();
  return { class: { name: c.name, certId: c.cert_id, teacherName: c.teacher_name }, isTeacher: c.teacher_id === user.id, isMember: !!member };
}

export async function joinClass(env, request, user, code, body) {
  await limitLookups(env, request, user);
  if (body.consent !== true) throw bad("consent_required", "To join, agree to share your progress summary with the teacher.");
  const displayName = cleanText(body.displayName, 60, "invalid_display_name", "Your name");
  const showEmail = body.showEmail === true ? 1 : 0;
  const c = await classByCode(env, code);
  if (c.teacher_id === user.id) throw bad("own_class", "You teach this class.");
  const existing = await env.DB.prepare("SELECT id FROM class_members WHERE class_id = ? AND user_id = ?").bind(c.id, user.id).first();
  const t = now();
  if (existing) {
    await env.DB.prepare("UPDATE class_members SET display_name = ?, show_email = ?, consented_at = ? WHERE id = ?").bind(displayName, showEmail, t, existing.id).run();
  } else {
    const students = (await env.DB.prepare("SELECT COUNT(*) AS n FROM class_members WHERE class_id = ?").bind(c.id).first()).n;
    if (students >= MAX_STUDENTS_PER_CLASS) throw new HttpError(409, "class_full", "This class is full. Ask your teacher.");
    const mine = (await env.DB.prepare("SELECT COUNT(*) AS n FROM class_members WHERE user_id = ?").bind(user.id).first()).n;
    if (mine >= MAX_CLASSES_JOINED) throw new HttpError(409, "too_many_joined", `You can be in up to ${MAX_CLASSES_JOINED} classes. Leave one first.`);
    await env.DB.prepare("INSERT INTO class_members (id, class_id, user_id, display_name, show_email, consented_at, joined_at) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(class_id, user_id) DO NOTHING")
      .bind(newId("mem"), c.id, user.id, displayName, showEmail, t, t).run();
  }
  await audit(env, request, { actor: user.id, action: "class.joined", target: c.id });
  return { class: { id: c.id, name: c.name, certId: c.cert_id, teacherName: c.teacher_name } };
}

// The student leaves: the membership row goes, so the teacher's next roster no longer includes them.
export async function leaveClass(env, request, user, classId) {
  if (!CLASS_ID_RE.test(classId)) throw notFound("Class not found.");
  const r = await env.DB.prepare("DELETE FROM class_members WHERE class_id = ? AND user_id = ?").bind(classId, user.id).run();
  if (!r.meta || r.meta.changes !== 1) throw notFound("You're not in that class.");
  await dropExitAnswers(env, classId, user.id);
  await audit(env, request, { actor: user.id, action: "class.left", target: classId });
  return { left: true };
}

export async function removeStudent(env, request, user, classId, memberId) {
  const c = await ownClass(env, user, classId);
  if (!MEMBER_ID_RE.test(memberId)) throw notFound("Student not found.");
  const mem = await env.DB.prepare("SELECT user_id FROM class_members WHERE id = ? AND class_id = ?").bind(memberId, c.id).first();
  const r = await env.DB.prepare("DELETE FROM class_members WHERE id = ? AND class_id = ?").bind(memberId, c.id).run();
  if (mem) await dropExitAnswers(env, c.id, mem.user_id);
  if (!r.meta || r.meta.changes !== 1) throw notFound("Student not found.");
  await audit(env, request, { actor: user.id, action: "class.student_removed", target: c.id });
  return { removed: true };
}

/* ---------- the summary a teacher sees ---------- */
const num = v => (typeof v === "number" && Number.isFinite(v) ? v : 0);
const isObj = v => v && typeof v === "object" && !Array.isArray(v);
const countTrue = o => (isObj(o) ? Object.values(o).filter(Boolean).length : 0);
const isExam = h => h.kind === "full" || /practice exam|full-length/i.test(String(h.title || ""));

/* One certification's progress document -> the numbers a teacher may see. Mirrors "Exam
   readiness", the badge's "lessons read" and "best practice exam" in public/assets/engine.js.
   meta: { domains: [[id, weight]], lessons: [lesson keys] } from cert-meta.js, or undefined. */
export function certSummary(doc, meta, at = now()) {
  const p = isObj(doc) ? doc : {};
  const stats = isObj(p.stats) ? p.stats : {};
  let answered = 0;
  for (const s of Object.values(stats)) if (isObj(s)) answered += Math.max(0, num(s.t));
  const read = isObj(p.read) ? p.read : {};
  const lessons = meta && Array.isArray(meta.lessons) ? meta.lessons : null;
  const lessonsRead = lessons ? lessons.filter(k => read[k]).length : countTrue(read);
  const history = (Array.isArray(p.history) ? p.history : []).filter(h => isObj(h) && num(h.total) > 0 && num(h.score) >= 0);
  const exams = history.filter(isExam);
  const bestExam = exams.length ? Math.max(...exams.map(h => Math.round(100 * Math.min(1, num(h.score) / num(h.total))))) : null;
  const handsOn = countTrue(p.handson) + (isObj(p.sims) ? Object.keys(p.sims).length : 0);

  let readiness = null;
  if (meta && Array.isArray(meta.domains) && meta.domains.length && (answered > 0 || exams.length)) {
    const acc = meta.domains.reduce((a, [id, w]) => {
      const x = isObj(stats[id]) ? stats[id] : { c: 0, t: 0 };
      const t = Math.max(0, num(x.t)), c = Math.min(t, Math.max(0, num(x.c)));
      const conf = Math.min(1, t / 20), pct = t ? c / t : 0;
      return a + num(w) / 100 * (conf * pct + (1 - conf) * 0.35);
    }, 0);
    const lessonsPct = lessons && lessons.length ? lessonsRead / lessons.length : 0;
    const recent = exams.slice(0, 3); // history is kept newest first
    const exam = recent.length ? Math.max(...recent.map(h => Math.min(1, num(h.score) / num(h.total)))) : null;
    const due = isObj(p.review) ? Object.values(p.review).filter(r => isObj(r) && num(r.due) <= at + 1000).length : 0;
    readiness = Math.max(0, Math.min(100, Math.round(100 * (0.5 * acc + 0.15 * lessonsPct + 0.35 * (exam ?? acc * 0.9)) - Math.min(10, due / 5))));
  }
  return { readiness, lessonsRead, lessonsTotal: lessons ? lessons.length : null, bestExam, answered, handsOn };
}

// Every progress document a student synced -> their summary. Lab notes and answers never leave here.
export function studentSummary(docs, classCertId, at = now()) {
  const certs = [];
  let labsDone = 0, lastActive = null;
  const detail = { read: {}, labs: new Set() };
  for (const d of docs) {
    lastActive = Math.max(lastActive || 0, num(d.updated_at)) || null;
    let body = null;
    try { body = JSON.parse(d.body); } catch (e) { continue; }
    if (d.doc_key === "labs") {
      labsDone = isObj(body) ? Object.values(body).filter(l => isObj(l) && l.done).length : 0;
      if (isObj(body)) Object.entries(body).forEach(([k, l]) => { if (isObj(l) && l.done) detail.labs.add(k); });
      continue;
    }
    const m = /^cert:([a-z0-9-]{1,40})$/.exec(d.doc_key);
    if (!m) continue;
    detail.read[m[1]] = new Set(isObj(body) && isObj(body.read) ? Object.keys(body.read).filter(k => body.read[k]) : []);
    const s = certSummary(body, Object.prototype.hasOwnProperty.call(CERT_META, m[1]) ? CERT_META[m[1]] : undefined, at);
    // A certification counts as studied once there is any activity in it.
    if (m[1] !== classCertId && !s.answered && !s.lessonsRead && !s.handsOn && s.bestExam == null && !countTrue(isObj(body) && body.checks)) continue;
    certs.push({ certId: m[1], ...s, lastActive: num(d.updated_at) || null });
  }
  certs.sort((a, b) => (b.certId === classCertId) - (a.certId === classCertId) || (b.lastActive || 0) - (a.lastActive || 0));
  const out = { certs, labsDone, lastActive };
  // Which lessons and labs are done, for one-lesson and one-lab assignments. Not enumerable, so it never reaches
  // the teacher's roster or the CSV: only "done" or "not yet" for the assigned item does.
  Object.defineProperty(out, "detail", { value: detail, enumerable: false });
  return out;
}

/* ---------- assignments ---------- */
// A target on one certification: lessons read, best practice exam %, exam readiness %, or questions answered.
// Or one item: read a lesson, finish a lab, or answer a lesson's exit ticket (from its teacher edition).
export const ASSIGNMENT_KINDS = { lessons: [1, 500], exam: [1, 100], readiness: [1, 100], questions: [1, 5000], lesson: [1, 1], lab: [1, 1], exit: [1, 1] };
const ITEM_KINDS = new Set(["lesson", "lab", "exit"]);
// The same key as lessonKey() in public/assets/engine.js.
export const lessonKeyOf = t => "l" + [...String(t)].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7).toString(36);
export const ASSIGNMENT_ID_RE = /^asg_[0-9a-f]{24}$/;
const MAX_ASSIGNMENTS_PER_CLASS = 50;
const assignmentOut = a => ({ id: a.id, title: a.title, certId: a.cert_id, kind: a.kind, target: a.target, item: a.item || null, dueDate: a.due_date || null, createdAt: a.created_at });
async function assignmentsFor(env, classId) {
  return ((await env.DB.prepare("SELECT * FROM class_assignments WHERE class_id = ? ORDER BY COALESCE(due_date, '9999'), created_at").bind(classId).all()).results || []).map(assignmentOut);
}
// How far a student is on one assignment: { value, done } from their summary (studentSummary's certs).
export function assignmentProgress(a, summary, exitsDone = new Set()) {
  if (a.kind === "exit") { const done = exitsDone.has(a.id); return { value: done ? 1 : 0, done }; }
  if (a.kind === "lesson" || a.kind === "lab") {
    const d = summary && summary.detail;
    const done = !!d && (a.kind === "lab" ? d.labs.has(a.item) : !!(d.read[a.certId] && d.read[a.certId].has(a.item)));
    return { value: done ? 1 : 0, done };
  }
  const s = summary && summary.certs.find(c => c.certId === a.certId);
  const value = !s ? 0 : a.kind === "lessons" ? s.lessonsRead : a.kind === "exam" ? (s.bestExam || 0) : a.kind === "readiness" ? (s.readiness || 0) : s.answered;
  return { value, done: value >= a.target };
}

export async function createAssignment(env, request, user, classId, body) {
  const c = await ownClass(env, user, classId);
  await rateLimit(env, "class:assign:" + user.id, 100, 24 * 60 * 60 * 1000);
  const title = cleanText(body.title, 100, "invalid_title", "Assignment title");
  const certId = cleanCert(body.certId || c.cert_id);
  if (!certId) throw bad("invalid_cert", "Choose a certification.");
  const range = ASSIGNMENT_KINDS[body.kind];
  if (!range) throw bad("invalid_kind", "Choose what the assignment asks for.");
  const target = ITEM_KINDS.has(body.kind) ? 1 : parseInt(body.target, 10);
  if (!(target >= range[0] && target <= range[1])) throw bad("invalid_target", `The target must be ${range[0]}–${range[1]}.`);
  let item = null;
  if (body.kind === "lab") {
    item = String(body.item || "");
    if (!/^lab-[a-z0-9-]{1,60}$/.test(item)) throw bad("invalid_item", "Choose a lab.");
  } else if (ITEM_KINDS.has(body.kind)) {
    item = String(body.item || "");
    const meta = Object.prototype.hasOwnProperty.call(CERT_META, certId) ? CERT_META[certId] : null;
    if (!/^l[a-z0-9]{1,12}$/.test(item) || (meta && Array.isArray(meta.lessons) && !meta.lessons.includes(item))) throw bad("invalid_item", "Choose a lesson from this certification.");
    if (body.kind === "exit" && !(await teacherPlan(env, certId, item))) throw bad("no_exit_ticket", "That lesson doesn't have an exit ticket yet.");
  }
  const due = body.dueDate == null || body.dueDate === "" ? null : String(body.dueDate);
  if (due && !/^\d{4}-\d{2}-\d{2}$/.test(due)) throw bad("invalid_due", "Use a date like 2026-10-31.");
  const n = (await env.DB.prepare("SELECT COUNT(*) AS n FROM class_assignments WHERE class_id = ?").bind(c.id).first()).n;
  if (n >= MAX_ASSIGNMENTS_PER_CLASS) throw new HttpError(409, "too_many_assignments", `A class can have up to ${MAX_ASSIGNMENTS_PER_CLASS} assignments. Delete an old one first.`);
  const a = { id: newId("asg"), class_id: c.id, title, cert_id: certId, kind: body.kind, target, item, due_date: due, created_at: now() };
  await env.DB.prepare("INSERT INTO class_assignments (id, class_id, title, cert_id, kind, target, item, due_date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(a.id, a.class_id, a.title, a.cert_id, a.kind, a.target, a.item, a.due_date, a.created_at).run();
  await audit(env, request, { actor: user.id, action: "class.assignment_created", target: c.id });
  return assignmentOut(a);
}

export async function deleteAssignment(env, request, user, classId, assignmentId) {
  const c = await ownClass(env, user, classId);
  if (!ASSIGNMENT_ID_RE.test(assignmentId)) throw notFound("Assignment not found.");
  const r = await env.DB.prepare("DELETE FROM class_assignments WHERE id = ? AND class_id = ?").bind(assignmentId, c.id).run();
  if (!r.meta || !r.meta.changes) throw notFound("Assignment not found.");
  await audit(env, request, { actor: user.id, action: "class.assignment_deleted", target: c.id });
  return { ok: true };
}

export async function roster(env, user, classId) {
  const c = await ownClass(env, user, classId);
  const members = (await env.DB.prepare(
    `SELECT m.id, m.user_id, m.display_name, m.show_email, m.joined_at, u.email
     FROM class_members m JOIN users u ON u.id = m.user_id WHERE m.class_id = ? ORDER BY m.display_name COLLATE NOCASE, m.joined_at`
  ).bind(c.id).all()).results || [];
  const at = now(), students = [];
  const assignments = await assignmentsFor(env, c.id);
  for (const m of members) {
    const docs = (await env.DB.prepare("SELECT doc_key, body, updated_at FROM progress_docs WHERE user_id = ?").bind(m.user_id).all()).results || [];
    const summary = studentSummary(docs, c.cert_id, at);
    const exits = await exitsDoneBy(env, c.id, m.user_id);
    students.push({
      memberId: m.id,
      displayName: m.display_name,
      email: m.show_email ? m.email : null,
      joinedAt: m.joined_at,
      ...summary,
      assignments: assignments.map(a => ({ id: a.id, ...assignmentProgress(a, summary, exits) }))
    });
  }
  return { class: classOut({ ...c, students: members.length }), assignments: assignments.map(a => ({ ...a, done: students.filter(s => s.assignments.find(x => x.id === a.id).done).length })), students };
}

export function rosterCsv(r) {
  const q = v => {
    let s = v == null ? "" : String(v);
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // stop spreadsheet formula injection
    return `"${s.replace(/"/g, '""')}"`;
  };
  const iso = t => (t ? new Date(t).toISOString() : "");
  const rows = [["student", "email", "certification", "readiness", "lessons_read", "lessons_total", "best_practice_exam_pct", "questions_answered", "hands_on_done", "labs_done", "last_active"]];
  for (const s of r.students) {
    if (!s.certs.length) rows.push([s.displayName, s.email, "", "", "", "", "", "", "", s.labsDone, iso(s.lastActive)]);
    for (const x of s.certs) rows.push([s.displayName, s.email, x.certId, x.readiness, x.lessonsRead, x.lessonsTotal, x.bestExam, x.answered, x.handsOn, s.labsDone, iso(x.lastActive)]);
  }
  return rows.map(row => row.map(q).join(",")).join("\r\n") + "\r\n";
}

/* ---------- online exit tickets ---------- */
// The lesson's plan from its teacher edition (in the private bucket), or null.
async function teacherPlan(env, certId, key) {
  const obj = env.CONTENT ? await env.CONTENT.get(`member/teacher/${certId}.json`) : null;
  if (!obj) return null;
  let j; try { j = JSON.parse(typeof obj.body === "string" ? obj.body : await new Response(obj.body).text()); } catch (e) { return null; }
  return ((j && j.plans) || []).find(p => p && lessonKeyOf(p.t) === key && Array.isArray(p.exit) && p.exit.length) || null;
}
async function exitsDoneBy(env, classId, userId) {
  const rows = (await env.DB.prepare("SELECT r.assignment_id FROM exit_responses r JOIN class_assignments a ON a.id = r.assignment_id WHERE a.class_id = ? AND r.user_id = ?").bind(classId, userId).all()).results || [];
  return new Set(rows.map(r => r.assignment_id));
}
async function dropExitAnswers(env, classId, userId) {
  await env.DB.prepare("DELETE FROM exit_responses WHERE user_id = ? AND assignment_id IN (SELECT id FROM class_assignments WHERE class_id = ?)").bind(userId, classId).run();
}
// An exit-ticket assignment in a class the caller teaches or belongs to.
async function exitAssignment(env, user, classId, asgId) {
  if (!CLASS_ID_RE.test(classId) || !ASSIGNMENT_ID_RE.test(asgId)) throw notFound("Assignment not found.");
  const a = await env.DB.prepare("SELECT a.*, c.teacher_id FROM class_assignments a JOIN classes c ON c.id = a.class_id WHERE a.id = ? AND a.class_id = ? AND a.kind = 'exit'").bind(asgId, classId).first();
  if (!a) throw notFound("Assignment not found.");
  const teacher = a.teacher_id === user.id;
  if (!teacher && !(await env.DB.prepare("SELECT 1 AS x FROM class_members WHERE class_id = ? AND user_id = ?").bind(classId, user.id).first())) throw notFound("Assignment not found.");
  const plan = await teacherPlan(env, a.cert_id, a.item);
  if (!plan) throw notFound("That exit ticket isn't available right now.");
  return { a, plan, teacher };
}

// GET: the questions (never the answers) and the student's own submitted answers, if any.
export async function exitTicket(env, user, classId, asgId) {
  const { a, plan } = await exitAssignment(env, user, classId, asgId);
  const mine = await env.DB.prepare("SELECT answers, created_at FROM exit_responses WHERE assignment_id = ? AND user_id = ?").bind(a.id, user.id).first();
  return { id: a.id, title: a.title, certId: a.cert_id, lesson: plan.t, questions: plan.exit.map(q => q[0]), answers: mine ? JSON.parse(mine.answers) : null, submittedAt: mine ? mine.created_at : null };
}

// POST { answers: [..] }: a class member submits (or updates) their answers.
export async function submitExitTicket(env, request, user, classId, asgId, body) {
  const { a, plan, teacher } = await exitAssignment(env, user, classId, asgId);
  if (teacher) throw bad("teacher", "Students answer exit tickets; you'll see their answers here.");
  await rateLimit(env, "exit:" + user.id, 60, 60 * 60 * 1000);
  const raw = Array.isArray(body.answers) ? body.answers : [];
  if (raw.length !== plan.exit.length) throw bad("invalid_answers", "Answer every question.");
  const answers = raw.map(x => String(x == null ? "" : x).replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").trim().slice(0, 1000));
  if (answers.some(x => !x)) throw bad("invalid_answers", "Answer every question.");
  await env.DB.prepare(`INSERT INTO exit_responses (assignment_id, user_id, answers, created_at) VALUES (?, ?, ?, ?)
    ON CONFLICT(assignment_id, user_id) DO UPDATE SET answers = excluded.answers, created_at = excluded.created_at`).bind(a.id, user.id, JSON.stringify(answers), now()).run();
  return { submitted: true };
}

// GET (teacher): every student's answers next to the expected answers.
export async function exitResults(env, user, classId, asgId) {
  const { a, plan, teacher } = await exitAssignment(env, user, classId, asgId);
  if (!teacher) throw notFound("Assignment not found.");
  const rows = (await env.DB.prepare(
    `SELECT m.display_name, r.answers, r.created_at FROM class_members m LEFT JOIN exit_responses r ON r.user_id = m.user_id AND r.assignment_id = ?
     WHERE m.class_id = ? ORDER BY m.display_name COLLATE NOCASE`).bind(a.id, classId).all()).results || [];
  return {
    id: a.id, title: a.title, lesson: plan.t,
    questions: plan.exit.map(([q, ans]) => ({ question: q, expected: ans })),
    students: rows.map(r => ({ displayName: r.display_name, answers: r.answers ? JSON.parse(r.answers) : null, submittedAt: r.created_at || null }))
  };
}
