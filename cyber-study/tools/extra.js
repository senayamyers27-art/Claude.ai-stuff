/* Loads data/extra/<id>.js: more questions for a certification's free bank, their wrong-answer notes,
   and a difficulty level (1 easy, 2 medium, 3 hard) for every question in the bank.
   CertHub.addExtra("<id>", { questions: [[id, 0, domain, question, [4 options], answer, explanation, source], ...],
                              whys: { id: [4 reasons, null at the answer] }, levels: { anyQuestionId: 1 | 2 | 3 } });
   Used by tools/build.js and tools/check-data.js. */
const fs = require("fs"), path = require("path");
module.exports = function loadExtra(pub, id) {
  const f = path.join(pub, "data/extra", id + ".js");
  if (!fs.existsSync(f)) return null;
  let cur = null; const prev = global.CertHub.addExtra;
  global.CertHub.addExtra = (i, x) => { cur = { id: i, ...(x || {}) }; };
  delete require.cache[require.resolve(f)];
  require(f);
  global.CertHub.addExtra = prev;
  if (!cur || cur.id !== id) return { error: `extra/${id}.js must call CertHub.addExtra("${id}", {...})` };
  return { questions: Array.isArray(cur.questions) ? cur.questions : [], whys: cur.whys || {}, levels: cur.levels || {} };
};
