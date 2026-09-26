/* Checks for exam simulations (data/pbq), wrong-answer notes (data/whys), Spanish lessons
   (data/lessons-es) and career pages (data/careers.js). Used by tools/check-data.js. */
const fs = require("fs"), path = require("path");
const str = (x, n = 1) => typeof x === "string" && x.trim().length >= n;
const pair = x => Array.isArray(x) && x.length === 2 && x.every(y => str(y));
const noLinks = (x, F) => { if (/https?:\/\//.test(JSON.stringify(x))) F("no links"); };

function pbqs(c, list, F) {
  const doms = new Set(c.domains.map(d => d.id)), ids = new Set();
  if (!Array.isArray(list) || list.length < 8) return F("needs 8 or more simulations");
  list.forEach((p, i) => {
    const E = m => F(`simulation ${i + 1} (${p && p.id}): ${m}`);
    if (!/^[a-z0-9-]{2,40}$/.test(p.id || "") || ids.has(p.id)) E("id must be unique lowercase-with-dashes"); ids.add(p.id);
    if (!doms.has(p.d)) E("unknown domain");
    if (!str(p.title, 5) || !str(p.prompt, 20) || !str(p.explain, 60)) E("needs title, prompt and explain");
    if (p.type === "match") { if (!Array.isArray(p.pairs) || p.pairs.length < 3 || !p.pairs.every(pair) || new Set(p.pairs.map(x => x[0])).size !== p.pairs.length) E("match needs 3+ distinct [item, answer] pairs"); if ((p.extra || []).some(e => p.pairs.some(x => x[1] === e))) E("extra answers can't equal a correct answer"); }
    else if (p.type === "order") { if (!Array.isArray(p.steps) || p.steps.length < 3 || new Set(p.steps).size !== p.steps.length) E("order needs 3+ distinct steps"); }
    else if (p.type === "select") { if (!Array.isArray(p.options) || p.options.length < 4 || !Array.isArray(p.answers) || !p.answers.length || p.answers.length >= p.options.length || !p.answers.every(a => Number.isInteger(a) && a >= 0 && a < p.options.length)) E("select needs 4+ options and some (not all) answers"); }
    else if (p.type === "fill") { if (!Array.isArray(p.fields) || !p.fields.length || !p.fields.every(f => str(f.label) && Array.isArray(f.answers) && f.answers.length && f.answers.every(a => str(a)))) E("fill needs fields with accepted answers"); }
    else E("type must be match, order, select or fill");
    noLinks(p, E);
  });
  c.domains.forEach(d => { if (!list.some(p => p.d === d.id)) F(`no simulation for domain ${d.id}`); });
}
function whys(c, m, F) {
  if (!m || typeof m !== "object") return F("CertHub.addWhys needs a map");
  c.questions.forEach(([qid, , , , , a]) => {
    const w = m[qid];
    if (!Array.isArray(w) || w.length !== 4) return F(`${qid}: needs 4 entries`);
    w.forEach((x, i) => { if (i === a ? x !== null : !str(x, 25)) F(`${qid}: option ${i} ${i === a ? "is the answer, so it must be null" : "needs a reason"}`); });
  });
  Object.keys(m).forEach(k => { if (!c.questions.some(q => q[0] === k)) F(`unknown question ${k}`); });
  noLinks(m, F);
}
function spanish(c, list, topics, F) {
  const want = new Set(topics), seen = new Set();
  (list || []).forEach((l, i) => {
    const E = m => F(`Spanish lesson ${i + 1}: ${m}`);
    if (!want.has(l.t)) E("t must be the English topic text"); if (seen.has(l.t)) E("duplicate"); seen.add(l.t);
    if (!str(l.tt, 5) || !Array.isArray(l.body) || l.body.length < 3 || !l.terms || l.terms.length < 3 || !l.terms.every(pair) || !str(l.example, 60) || !str(l.tip, 20) || !Array.isArray(l.check) || !l.check.every(pair)) E("incomplete translation");
    noLinks(l, E);
  });
  const missing = topics.filter(t => !seen.has(t)).length; if (missing) F(`${missing} topics have no Spanish lesson`);
}
function careers(list, interview, tracks, roles, labs, F) {
  tracks.forEach(t => { if (!(list || []).some(c => c.track === t.id)) F(`no career page for ${t.id}`); });
  (list || []).forEach(c => {
    const E = m => F(`career ${c.track}: ${m}`), t = tracks.find(x => x.id === c.track);
    if (!t) return E("unknown track");
    if (!str(c.title) || !str(c.intro, 200)) E("title and intro");
    if (!Array.isArray(c.path) || c.path.length < 3 || !c.path.every(p => t.certs.includes(p.cert) && str(p.why, 40))) E("path");
    if (!Array.isArray(c.jobs) || c.jobs.length < 3 || !c.jobs.every(j => str(j.title) && str(j.level) && str(j.does, 40))) E("jobs");
    if (!Array.isArray(c.roles) || !c.roles.every(r => roles.has(r))) E("roles must be NICE role ids");
    if (!Array.isArray(c.skills) || c.skills.length < 5 || !Array.isArray(c.firstSteps) || c.firstSteps.length < 4) E("skills and first steps");
    if (!Array.isArray(c.labs) || !c.labs.every(l => labs[l])) E("labs must be existing lab ids");
  });
  roles.forEach(r => { const q = (interview || {})[r]; if (!Array.isArray(q) || q.length < 8 || !q.every(x => pair(x) && x[1].length >= 100)) F(`interview questions for role ${r}: 8+ [question, answer]`); });
  noLinks([list, interview], F);
}
// Hands-on exercises: data/handson/<id>.js. Terminal and KQL solutions are run here; Python runs in tools/check-python.js.
function handson(c, h, F) {
  const doms = new Set(c.domains.map(d => d.id)), ids = new Set();
  if (!h || !Array.isArray(h.items) || h.items.length < 6) return F("needs 6 or more hands-on items");
  const kql = require("../public/assets/kql.js");
  const TERMS = { shell: "shell", kube: "kube", ios: "ios", pwsh: "pwsh" };
  h.items.forEach((x, i) => {
    const E = m => F(`hands-on ${i + 1} (${x && x.id}): ${m}`);
    if (!/^[a-z0-9-]{2,40}$/.test(x.id || "") || ids.has(x.id)) E("id must be unique lowercase-with-dashes"); ids.add(x.id);
    if (!doms.has(x.d)) E("unknown domain");
    if (!str(x.title, 5) || !str(x.prompt, 30) || !str(x.hint, 15) || !str(x.explain, 60)) E("needs title, prompt, hint and explain");
    noLinks(x, E);
    if (x.kind === "code") {
      if (typeof x.starter !== "string" || !str(x.solution, 5)) E("code needs a starter and a solution");
      if (!Array.isArray(x.tests) || x.tests.length < 2 || !x.tests.every(t => str(t.name, 5) && str(t.code, 5))) E("code needs 2+ tests with name and code");
    } else if (TERMS[x.kind]) {
      if (!Array.isArray(x.checks) || x.checks.length < 2 || !x.checks.every(k => str(k.label, 5) && str(k.type))) E(`${x.kind} needs 2+ checks with a label`);
      if (!Array.isArray(x.solution) || !x.solution.length) return E(`${x.kind} solution must be a list of commands`);
      let shell;
      try { shell = require(`../public/assets/${TERMS[x.kind]}.js`); } catch (e) { return E(`no simulator public/assets/${TERMS[x.kind]}.js: ${e.message}`); }
      const isErr = shell.isError || (o => /command not found|No such file|could not be found|invalid|missing operand|Permission denied/i.test(o));
      try {
        const S0 = shell.create(x.setup || {});
        if (x.checks.every(k => shell.check(S0, k))) E("every check already passes before any command");
        const S1 = shell.create(x.setup || {});
        x.solution.forEach(l => { const o = shell.run(S1, l); if (isErr(o)) E(`solution command "${l}" printed: ${o.split("\n")[0]}`); });
        x.checks.forEach(k => { if (!shell.check(S1, k)) E(`solution doesn't satisfy "${k.label}"`); });
      } catch (e) { E("terminal error: " + e.message); }
    } else if (x.kind === "kql") {
      if (!Array.isArray(x.tables) || !x.tables.length || !x.tables.every(t => h.tables && Array.isArray(h.tables[t]) && h.tables[t].length)) E("kql tables must name sample tables in h.tables");
      try { const r = kql.run(x.solution, h.tables || {}); if (!r.rows.length) E("solution returns no rows"); if (x.starter) { const s0 = kql.run(x.starter, h.tables || {}); if (kql.same(s0, r)) E("starter already gives the answer"); } }
      catch (e) { E("solution query failed: " + e.message); }
    } else E("kind must be code, kql or a simulator: " + Object.keys(TERMS).join(", "));
  });
}

module.exports = { handson, pbqs, whys, spanish, careers };
