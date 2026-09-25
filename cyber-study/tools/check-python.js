/* Runs every Python exercise in data/handson/*.js with Pyodide (public/vendor/pyodide):
   the solution must pass all its tests, and the starter code must fail at least one. */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..", "public");
const dir = path.join(root, "data/handson");
(async () => {
  const items = [];
  global.CertHub = { addHandson: (id, h) => (h.items || []).filter(x => x.kind === "code").forEach(x => items.push([id, x])) };
  if (fs.existsSync(dir)) fs.readdirSync(dir).filter(f => f.endsWith(".js")).forEach(f => require(path.join(dir, f)));
  if (!items.length) { console.log("python: no exercises"); return; }
  const { loadPyodide } = await import(path.join(root, "vendor/pyodide/pyodide.mjs"));
  const py = await loadPyodide({ indexURL: path.join(root, "vendor/pyodide") + "/" });
  py.setStdout({ batched: () => {} }); py.setStderr({ batched: () => {} });
  let bad = 0;
  const run = async (code, x) => {
    const lines = String(x.stdin || "").split("\n"); py.setStdin({ stdin: () => (lines.length ? lines.shift() : undefined) });
    const ns = py.globals.get("dict")(), out = [];
    try { await py.runPythonAsync(code, { globals: ns }); } catch (e) { ns.destroy(); return { err: String(e.message).trim().split("\n").pop() }; }
    for (const t of x.tests) { try { await py.runPythonAsync(t.code, { globals: ns }); out.push(true); } catch (e) { out.push(String(e.message).trim().split("\n").pop()); } }
    ns.destroy(); return { out };
  };
  for (const [id, x] of items) {
    const F = m => { bad++; console.log(`✗ ${id} ${x.id}: ${m}`); };
    const s = await run(x.solution, x);
    if (s.err) F("solution raised " + s.err); else s.out.forEach((r, i) => { if (r !== true) F(`solution fails test "${x.tests[i].name}": ${r}`); });
    const st = await run(x.starter || "", x);
    if (!st.err && st.out.every(r => r === true)) F("starter code already passes every test");
  }
  console.log(`python: ${items.length} exercises checked${bad ? `, ${bad} problems` : ", all OK"}`);
  if (bad) process.exit(1);
})().catch(e => { console.error(e); process.exit(1); });
