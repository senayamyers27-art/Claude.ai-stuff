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
const { mergePlan, mergeLabs, mergeWork, mergeDoc, enabled } = ctx.CertHub.sync;
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

test("cert progress: objective stats and flashcard schedule merge like stats and review", () => {
  const m = plain(mergePlan(
    { objs: { "2.3": { c: 2, t: 3 } }, cards: { c1: { box: 2, due: 900 } } },
    { objs: { "2.3": { c: 5, t: 9 }, "4.1": { c: 1, t: 1 } }, cards: { c1: { box: 1, due: 100 }, c2: { box: 0, due: 5 } } }));
  assert.deepEqual(m.objs, { "2.3": { c: 5, t: 9 }, "4.1": { c: 1, t: 1 } });
  assert.deepEqual(m.cards, { c1: { box: 2, due: 900 }, c2: { box: 0, due: 5 } });
});

test("cert progress: lessons read on any device stay read", () => {
  const m = plain(mergePlan({ read: { la: true } }, { read: { lb: true, la: false } }));
  assert.deepEqual(m.read, { la: true, lb: true });
});

test("saved work: nothing done on either device is lost", () => {
  const a = {
    "certhub:activity": ["2026-09-01", "2026-09-03"], "certhub:qlog": { "2026-09-03": 5 },
    "certhub:vmlabs": { "vm-a": { when: 1 } }, "certhub:vmexam": { best: 70, last: { score: 70, when: 5 } },
    "certhub:blueteam": { "p:1": 1, "t:ransom": 60 }, "certhub:games": { subnet: { best: 12, plays: 3, last: 9 } },
    "certhub:readyhist": { "security-plus": [["2026-09-01", 40], ["2026-09-03", 55]] }, "certhub:achievements": ["first"], "certhub:name": "Ana"
  };
  const b = {
    "certhub:activity": ["2026-09-02", "2026-09-03"], "certhub:qlog": { "2026-09-03": 8, "2026-09-02": 4 },
    "certhub:vmlabs": { "vm-b": { when: 2 } }, "certhub:vmexam": { best: 85, last: { score: 60, when: 9 } },
    "certhub:blueteam": { "t:ransom": 90, "p:2": 1 }, "certhub:games": { subnet: { best: 15, plays: 1, last: 4 }, ports: { best: 3, plays: 1, last: 2 } },
    "certhub:readyhist": { "security-plus": [["2026-09-02", 50]], "cysa-plus": [["2026-09-02", 30]] }, "certhub:achievements": ["streak3"], "certhub:goal": "4"
  };
  const m = plain(mergeWork(a, b));
  assert.deepEqual(m["certhub:activity"], ["2026-09-01", "2026-09-02", "2026-09-03"]);
  assert.deepEqual(m["certhub:qlog"], { "2026-09-03": 8, "2026-09-02": 4 });
  assert.deepEqual(Object.keys(m["certhub:vmlabs"]).sort(), ["vm-a", "vm-b"]);
  assert.deepEqual(m["certhub:vmexam"], { best: 85, last: { score: 60, when: 9 } });
  assert.deepEqual(m["certhub:blueteam"], { "t:ransom": 90, "p:2": 1, "p:1": 1 });
  assert.deepEqual(m["certhub:games"].subnet, { best: 15, plays: 3, last: 9 });
  assert.ok(m["certhub:games"].ports);
  assert.deepEqual(m["certhub:readyhist"]["security-plus"].map(p => p[0]), ["2026-09-01", "2026-09-02", "2026-09-03"]);
  assert.ok(m["certhub:readyhist"]["cysa-plus"]);
  assert.deepEqual(m["certhub:achievements"], ["first", "streak3"]);
  assert.equal(m["certhub:name"], "Ana"); assert.equal(m["certhub:goal"], "4");
  assert.deepEqual(plain(mergeWork(m, m)), m, "merging with itself changes nothing");
  assert.deepEqual(plain(mergeDoc("work", a, b)), m);
});
