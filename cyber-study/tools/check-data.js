#!/usr/bin/env node
/* Sanity checks for every data file: weights, question shape, ids, answer spread. */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
global.CertHub = { certs: {}, register(c) { this.certs[c.id] = c; } };
require(path.join(root, "data/catalog.js"));
let bad = 0;
const fail = (id, m) => { bad++; console.log(`  ✗ ${id}: ${m}`); };
for (const id of CertHub.catalog) {
  const f = path.join(root, "data", id + ".js");
  if (!fs.existsSync(f)) { if (!CertHub.planned[id]) fail(id, "no data file and not listed as planned"); continue; }
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
  if (!c.weeks) c.domains.forEach(d => { if (!(d.topics || []).length) fail(id, `domain ${d.id} has no topics`); });
  console.log(`${id}: ${c.questions.length} questions, per domain ${JSON.stringify(per)}, answer positions ${pos.join("/")}, ${c.status}`);
}
process.exit(bad ? 1 : 0);
