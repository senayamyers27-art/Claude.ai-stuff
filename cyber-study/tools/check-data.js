#!/usr/bin/env node
/* Sanity checks for every data file: weights, question shape, ids, answer spread. */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..", "public");
global.CertHub = { certs: {}, labs: {}, register(c) { this.certs[c.id] = c; }, registerLabs(l) { l.forEach(x => { if (this.labs[x.id]) console.log(`  ✗ duplicate lab id ${x.id}`) || bad++; this.labs[x.id] = x; }); } };
let bad = 0;
require(path.join(root, "data/catalog.js"));
require(path.join(root, "data/lab-map.js"));
fs.readdirSync(path.join(root, "data")).filter(f => /^labs-.+\.js$/.test(f)).forEach(f => require(path.join(root, "data", f)));
const fail = (id, m) => { bad++; console.log(`  ✗ ${id}: ${m}`); };
for (const id of CertHub.catalog) {
  const f = path.join(root, "data", id + ".js");
  if (!fs.existsSync(f)) { if (!CertHub.planned[id] && !(CertHub.tracks || []).some(t => t.certs.includes(id))) fail(id, "no data file and not in a track"); else console.log(`${id}: not written yet`); continue; }
  require(f);
  const c = CertHub.certs[id];
  if (!c) { fail(id, "file did not register " + id); continue; }
  const sum = c.domains.reduce((a, d) => a + d.w, 0);
  if (sum !== 100) fail(id, `weights sum to ${sum}`);
  const doms = new Set(c.domains.map(d => d.id));
  const ids = new Set(), stems = new Set(), pos = [0, 0, 0, 0], per = {};
  for (const q of c.questions) {
    const [qid, , d, text, o, a, e] = q;
    if (ids.has(qid)) fail(id, "duplicate id " + qid); ids.add(qid);
    if (stems.has(text)) fail(id, "duplicate question " + qid); stems.add(text);
    if (!doms.has(d)) fail(id, `${qid} has unknown domain ${d}`);
    if (!Array.isArray(o) || o.length !== 4 || new Set(o).size !== 4) fail(id, `${qid} needs 4 distinct options`);
    if (!(a >= 0 && a < 4)) fail(id, `${qid} answer index ${a}`);
    if (!e) fail(id, `${qid} has no explanation`);
    pos[a]++; per[d] = (per[d] || 0) + 1;
  }
  const isDate = d => /^\d{4}-\d{2}-\d{2}$/.test(d || "") && !isNaN(Date.parse(d));
  if (!isDate(c.lastVerified)) fail(id, "lastVerified must be a YYYY-MM-DD date");
  (c.notices || []).forEach((n, i) => {
    if (!n.text) fail(id, `notice ${i} has no text`);
    if ((n.from && !isDate(n.from)) || (n.until && !isDate(n.until))) fail(id, `notice ${i} has a bad date`);
    if (n.from && n.until && n.from > n.until) fail(id, `notice ${i} ends before it starts`);
  });
  if (!(c.sources || []).every(s => /^https:\/\//.test(s.url))) fail(id, "source links must use https://");
  if (!c.weeks) c.domains.forEach(d => { if (!(d.topics || []).length) fail(id, `domain ${d.id} has no topics`); });
  console.log(`${id}: ${c.questions.length} questions, per domain ${JSON.stringify(per)}, answer positions ${pos.join("/")}, ${c.status}`);
}
/* ---------- lessons ---------- */
// data/lessons/<id>.js: one lesson per plan topic, matched by the exact topic text.
CertHub.lessons = {};
CertHub.addLessons = (id, list) => { CertHub.lessons[id] = list; };
const planTopics = c => (c.weeks ? c.weeks.filter(w => w.dom).flatMap(w => w.topics) : c.domains.flatMap(d => d.topics || [])).filter(t => !/^Checkpoint test/i.test(t));
const pair = x => Array.isArray(x) && x.length === 2 && x.every(y => typeof y === "string" && y.trim());
let lessonTotal = 0; const noLessons = [];
for (const id of CertHub.catalog) {
  const c = CertHub.certs[id]; if (!c) continue;
  const f = path.join(root, "data/lessons", id + ".js");
  if (!fs.existsSync(f)) { noLessons.push(id); continue; }
  require(f);
  const list = CertHub.lessons[id];
  if (!Array.isArray(list)) { fail(id, "lessons file did not call CertHub.addLessons with its id"); continue; }
  const topics = planTopics(c), want = new Set(topics), seen = new Set();
  if (want.size !== topics.length) fail(id, "two plan topics have the same text, so their lessons can't be told apart");
  list.forEach((l, i) => {
    const L = m => fail(id, `lesson ${i + 1} (${String(l && l.t).slice(0, 50)}): ${m}`);
    if (!l || typeof l.t !== "string") return L("needs t, the exact topic text");
    if (!want.has(l.t)) L("doesn't match any topic in the plan (the text must match exactly)");
    if (seen.has(l.t)) L("duplicate lesson"); seen.add(l.t);
    if (!Array.isArray(l.body) || l.body.length < 3 || l.body.length > 8 || !l.body.every(p => typeof p === "string" && p.trim().length >= 40)) L("body needs 3 to 8 paragraphs");
    else if (l.body.join(" ").split(/\s+/).length < 180) L("body is too short (aim for 250 to 600 words)");
    if (!Array.isArray(l.terms) || l.terms.length < 3 || !l.terms.every(pair)) L("terms needs at least 3 [term, definition] pairs");
    if (typeof l.example !== "string" || l.example.trim().length < 80) L("example needs a real-world scenario");
    if (typeof l.tip !== "string" || l.tip.trim().length < 30) L("tip needs an exam tip");
    if (!Array.isArray(l.check) || l.check.length < 2 || !l.check.every(pair)) L("check needs at least 2 [question, answer] pairs");
    if (/https?:\/\//.test(JSON.stringify(l))) L("no links inside lessons");
  });
  const missing = topics.filter(t => !seen.has(t));
  if (missing.length) fail(id, `${missing.length} plan topics have no lesson, e.g. "${missing[0]}"`);
  lessonTotal += list.length;
}
/* ---------- diagrams (data/diagrams.js): SVG colored by the site's CSS, attached by topic text ---------- */
{
  let D = [];
  CertHub.addDiagrams = list => { D = list; };
  require(path.join(root, "data/diagrams.js"));
  const OKEL = new Set("svg g defs marker rect circle ellipse line polyline polygon path text tspan".split(" "));
  const OKCLS = new Set("box hi ln mute t s b acc acc-ln arrow".split(" "));
  const ids = new Set();
  D.forEach(d => {
    const F = m => fail(`diagram ${d && d.id}`, m);
    if (!/^[a-z0-9-]+$/.test(d.id || "") || ids.has(d.id)) F("bad or duplicate id"); ids.add(d.id);
    if (!d.title || !d.alt || d.alt.length < 60) F("needs a title and a full alt text");
    const svg = String(d.svg || "");
    if (!/^<svg viewBox="[\d. ]+" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*<\/svg>$/.test(svg)) F("svg must be one <svg viewBox> element");
    for (const m of svg.matchAll(/<\/?([a-zA-Z:]+)/g)) if (!OKEL.has(m[1])) F("element not allowed: " + m[1]);
    if (/\s(on\w+|style|href|xlink:href|fill|stroke)=/.test(svg)) F("no style, link, event or color attributes (use classes)");
    for (const m of svg.matchAll(/class="([^"]*)"/g)) m[1].split(/\s+/).forEach(k => { if (!OKCLS.has(k)) F("class not allowed: " + k); });
    for (const [cid, list] of Object.entries(d.topics || {})) {
      const c = CertHub.certs[cid]; if (!c) { F("unknown certification " + cid); continue; }
      const all = planTopics(c);
      (list || []).forEach(t => { if (!all.includes(t)) F(`${cid}: no plan topic "${String(t).slice(0, 60)}"`); });
    }
  });
  console.log(`diagrams: ${D.length}`);
}
console.log(`lessons: ${lessonTotal}${noLessons.length ? `; not written yet for ${noLessons.join(", ")}` : " (every certification)"}`);
/* ---------- labs ---------- */
const TRACKS = ["Foundations", "Networking", "Blue team", "GRC & architecture", "Systems administration", "Software engineering"], LEVELS = ["Beginner", "Intermediate", "Advanced"];
for (const l of Object.values(CertHub.labs)) {
  const f = m => fail(l.id, m);
  if (!/^lab-[a-z0-9-]+$/.test(l.id)) f("id must look like lab-some-name");
  for (const k of ["title", "summary", "realWorld", "deliverable", "resume", "cost"]) if (typeof l[k] !== "string" || !l[k].trim()) f(`missing ${k}`);
  if (!TRACKS.includes(l.track)) f(`unknown track "${l.track}"`);
  if (!LEVELS.includes(l.level)) f(`unknown level "${l.level}"`);
  if (!(l.minutes > 0)) f("minutes must be a positive number");
  if (!Array.isArray(l.steps) || l.steps.length < 6) f("needs at least 6 steps");
  (l.steps || []).forEach((st, i) => { if (!st.title || !st.body) f(`step ${i + 1} needs a title and body`); if (st.cmd != null && typeof st.cmd !== "string") f(`step ${i + 1} cmd must be text`); });
  if (!Array.isArray(l.verify) || l.verify.length < 2) f("needs at least 2 verify checks");
  if (!Array.isArray(l.youWillNeed) || !l.youWillNeed.length) f("youWillNeed is empty");
  (l.links || []).forEach(u => { if (!/^https:\/\//.test(u.url)) f(`link must be https: ${u.url}`); });
  (l.requires || []).forEach(r => { if (!CertHub.labs[r]) f(`requires unknown lab ${r}`); });
}
/* ---------- frameworks and NICE work roles ---------- */
require(path.join(root, "data/frameworks.js"));
{
  const KINDS = ["Governance & risk", "Controls & standards", "Threat & detection", "Secure development", "Privacy & compliance", "Networking models & standards", "IT service & operations", "Software delivery", "Cloud architecture", "Careers"];
  const fwIds = new Set();
  for (const f of CertHub.frameworks || []) {
    const e = m => fail(`framework ${f.id}`, m);
    if (!/^[a-z0-9-]+$/.test(f.id || "") || fwIds.has(f.id)) e("needs a unique [a-z0-9-] id"); fwIds.add(f.id);
    for (const k of ["name", "org", "what", "useWhen", "match"]) if (typeof f[k] !== "string" || !f[k].trim()) e(`missing ${k}`);
    if (!KINDS.includes(f.kind)) e(`unknown kind ${f.kind}`);
    if (!Array.isArray(f.parts) || !f.parts.length) e("needs parts");
    (f.exams || []).forEach(x => { if (!CertHub.catalog.includes(x)) e(`unknown exam ${x}`); });
    if (f.url && !/^https:\/\//.test(f.url)) e("url must be https");
    try { new RegExp(f.match); } catch (err) { e("match is not a valid pattern"); }
  }
  const roleIds = new Set((CertHub.niceRoles || []).map(r => r.id));
  for (const r of CertHub.niceRoles || []) for (const k of ["id", "name", "category", "titles", "about"]) if (!r[k]) fail(`role ${r.id}`, `missing ${k}`);
  for (const id of Object.keys(CertHub.labs)) {
    const rs = (CertHub.labRoles || {})[id];
    if (!Array.isArray(rs) || rs.length < 1 || rs.length > 3) fail(id, "needs 1 to 3 NICE work roles in data/frameworks.js labRoles");
    else rs.forEach(r => { if (!roleIds.has(r)) fail(id, `unknown work role ${r}`); });
  }
  for (const id of Object.keys(CertHub.labRoles || {})) if (!CertHub.labs[id]) fail("labRoles", `unknown lab ${id}`);
  for (const r of roleIds) if (!Object.values(CertHub.labRoles || {}).some(list => list.includes(r))) fail(`role ${r}`, "no lab builds toward this role");
  console.log(`frameworks: ${(CertHub.frameworks || []).length}, NICE work roles: ${roleIds.size}`);
}
const used = new Set();
for (const [cid, m] of Object.entries(CertHub.labMap || {})) {
  if (!CertHub.certs[cid]) fail("lab-map", `unknown certification ${cid}`);
  for (const [k, list] of Object.entries(Object.assign({}, m.weeks, m.domains))) list.forEach(id => { used.add(id); if (!CertHub.labs[id]) fail("lab-map", `${cid} ${k}: unknown lab ${id}`); });
}
const unused = Object.keys(CertHub.labs).filter(id => !used.has(id));
console.log(`labs: ${Object.keys(CertHub.labs).length} labs, ${Object.values(CertHub.labs).reduce((a, l) => a + (l.steps || []).length, 0)} steps${unused.length ? `, not linked to any plan: ${unused.join(", ")}` : ""}`);
process.exit(bad ? 1 : 0);
