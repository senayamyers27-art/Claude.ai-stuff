/* Merge rules the browser uses when two devices changed the same progress document
   (public/assets/sync.js). Loaded in a sandbox with just enough of the page stubbed. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs"), path = require("path"), vm = require("vm");

const src = fs.readFileSync(path.join(__dirname, "../../public/assets/sync.js"), "utf8");
const noop = () => {};
const ctx = {
  CertHub: { site: { apiUrl: "" }, U: { $: noop, esc: s => s }, store: { get: noop, set: noop, keys: () => [] }, ui: {} },
  document: { addEventListener: noop, getElementById: () => null }
};
vm.runInNewContext(src, ctx);
const { mergePlan, mergeLabs, mergeDoc, enabled } = ctx.CertHub.sync;
const plain = v => JSON.parse(JSON.stringify(v)); // objects from the sandbox have another realm's prototypes

test("sync stays off without an API", () => {
  assert.equal(enabled, false);
});

test("cert progress: checks union, bigger stats win, history merges", () => {
  const a = { start: "2026-09-01", checks: { "1-1": true, "1-2": false }, stats: { 1: { c: 5, t: 10 }, 2: { c: 1, t: 1 } }, history: [{ at: 3, title: "Test 1", score: 8, total: 10 }] };
  const b = { start: "2026-08-01", examDate: "2026-12-01", checks: { "1-2": true, "2-1": true }, stats: { 1: { c: 12, t: 20 } }, history: [{ at: 3, title: "Test 1", score: 8, total: 10 }, { at: 5, title: "Test 2", score: 9, total: 10 }] };
  const m = plain(mergePlan(a, b));
  assert.deepEqual(m.checks, { "1-1": true, "1-2": true, "2-1": true });
  assert.deepEqual(m.stats, { 1: { c: 12, t: 20 }, 2: { c: 1, t: 1 } });
  assert.deepEqual(m.history.map(h => h.at), [5, 3]);
  assert.equal(m.start, "2026-09-01"); // this device's plan dates win
  assert.equal(m.examDate, "2026-12-01"); // but a date set only elsewhere is kept
});

test("cert progress: review queue keeps the entry that's further along", () => {
  const m = plain(mergePlan({ review: { q1: { due: 100, box: 1 }, q2: { due: 900 } } }, { review: { q1: { due: 500, box: 3 }, q3: { due: 1 } } }));
  assert.deepEqual(m.review, { q1: { due: 500, box: 3 }, q2: { due: 900 }, q3: { due: 1 } });
});

test("cert progress: merging is stable and tolerates junk", () => {
  const a = { checks: { x: true }, stats: { 1: { c: 1, t: 2 } }, history: [] };
  const once = plain(mergePlan(a, a));
  assert.deepEqual(plain(mergePlan(once, once)), once);
  assert.doesNotThrow(() => mergePlan(null, "nope"));
  assert.doesNotThrow(() => mergePlan([], { checks: null, history: null }));
});

test("labs: steps union, earliest start and finish, newest notes win", () => {
  const a = { l1: { started: 200, steps: { 0: true }, notes: "new", notesAt: 900 }, l2: { started: 50, done: 400 } };
  const b = { l1: { started: 100, steps: { 1: true }, verify: { 0: true }, notes: "old", notesAt: 800, done: 300 }, l3: { started: 5 } };
  const m = plain(mergeLabs(a, b));
  assert.deepEqual(m.l1.steps, { 0: true, 1: true });
  assert.deepEqual(m.l1.verify, { 0: true });
  assert.equal(m.l1.started, 100);
  assert.equal(m.l1.done, 300);
  assert.equal(m.l1.notes, "new");
  assert.equal(m.l2.done, 400);
  assert.equal(m.l3.started, 5);
  assert.equal(plain(mergeLabs(b, a)).l1.notes, "new");
});

test("labs: notes without timestamps are never silently dropped", () => {
  assert.equal(mergeLabs({ l: { notes: "abc def" } }, { l: { notes: "abc" } }).l.notes, "abc def");
  const both = mergeLabs({ l: { notes: "phone notes" } }, { l: { notes: "laptop notes" } }).l.notes;
  assert.ok(both.includes("phone notes") && both.includes("laptop notes"));
  assert.equal(mergeLabs({ l: { notes: "" } }, { l: { notes: "kept" } }).l.notes, "kept");
});

test("mergeDoc picks the rule by document key", () => {
  assert.deepEqual(plain(mergeDoc("labs", { l: { steps: { 0: true } } }, {})).l.steps, { 0: true });
  assert.deepEqual(plain(mergeDoc("cert:ccna", { checks: { a: true } }, {})).checks, { a: true });
});
