#!/usr/bin/env node
/* Weekly known-vulnerability check of everything in the SBOM (tools/sbom.js), using the OSV database.
   - Libraries that run in visitors' pages (Pyodide, v86, xterm.js): any known vulnerability fails the run.
   - The practice VM image (Ubuntu packages and kernel): runs sandboxed inside the in-browser emulator,
     where the learner is already root, so advisories are listed with the fixed version to rebuild with
     (tools/vm/build-vm.sh) but only fail the run with --strict.
   Build tools are covered by npm audit in CI.
   Writes a Markdown report to $GITHUB_STEP_SUMMARY when set.
   Usage: node tools/vuln-check.js [--strict]      (OSV_API overrides https://api.osv.dev for tests) */
const fs = require("fs");
const { components } = require("./sbom.js");
const API = (process.env.OSV_API || "https://api.osv.dev").replace(/\/+$/, "");
const STRICT = process.argv.includes("--strict");
const UBUNTU = "Ubuntu:24.04:LTS";

async function post(url, body) {
  for (let tries = 0; ; tries++) {
    try {
      const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } catch (e) { if (tries >= 2) throw e; await new Promise(r => setTimeout(r, 2000 * (tries + 1))); }
  }
}
async function vuln(id) {
  try {
    const r = await fetch(`${API}/v1/vulns/${encodeURIComponent(id)}`, { signal: AbortSignal.timeout(20000) });
    return r.ok ? await r.json() : { id };
  } catch (e) { return { id }; }
}
// Runs fn over items, n at a time.
async function pool(items, n, fn) {
  const queue = items.slice();
  await Promise.all(Array.from({ length: n }, async () => { for (let x; (x = queue.shift());) await fn(x); }));
}
// The kernel has thousands of advisories and runs only inside the in-browser emulator: count them and link
// to the list rather than downloading each one.
const COUNT_ONLY = new Set(["linux"]);

(async () => {
  // What to ask OSV about: npm libraries by name, Ubuntu packages by source package (advisories use source names).
  const shipped = components().filter(c => c.scope === "required");
  const queries = new Map();
  for (const c of shipped) {
    if (c.purl && c.purl.startsWith("pkg:npm/")) queries.set(`npm:${c.name}`, { kind: "browser", label: `${c.name} ${c.version}`, q: { package: { name: c.name, ecosystem: "npm" }, version: c.version } });
    else if (c.sourcePackage) {
      const ver = c.sourceVersion || c.version; // the kernel and SeaBIOS are listed by their source package's version
      if (!ver) continue; // without a version OSV would return every advisory ever published for the package
      const key = `deb:${c.sourcePackage}@${ver}`;
      if (!queries.has(key)) queries.set(key, { kind: "vm", label: `${c.sourcePackage} ${ver}`, q: { package: { name: c.sourcePackage, ecosystem: UBUNTU }, version: ver }, binaries: [] });
      queries.get(key).binaries.push(c.name);
    }
  }
  const list = [...queries.values()];
  const results = [];
  for (let i = 0; i < list.length; i += 500) {
    const r = await post(`${API}/v1/querybatch`, { queries: list.slice(i, i + 500).map(x => x.q) });
    results.push(...r.results);
  }
  // Details (summary and fixed version) for each advisory found, 8 requests at a time.
  const found = [], counted = [], jobs = [];
  list.forEach((x, i) => {
    const ids = ((results[i] || {}).vulns || []).map(v => v.id);
    if (!ids.length) return;
    if (x.kind === "vm" && COUNT_ONLY.has(x.q.package.name)) counted.push({ ...x, n: ids.length });
    else ids.forEach(id => jobs.push([x, id]));
  });
  await pool(jobs, 8, async ([x, id]) => {
    const v = await vuln(id);
    const aff = (v.affected || []).find(a => a.package && a.package.name === x.q.package.name) || {};
    const fixed = (aff.ranges || []).flatMap(r => r.events || []).map(e => e.fixed).filter(Boolean).pop() || "";
    found.push({ ...x, id, summary: (v.summary || (v.details || "").split("\n")[0] || "").slice(0, 140), fixed });
  });
  found.sort((a, b) => a.kind.localeCompare(b.kind) || a.label.localeCompare(b.label) || a.id.localeCompare(b.id));

  const browser = found.filter(f => f.kind === "browser"), vm = found.filter(f => f.kind === "vm");
  const vmFixable = vm.filter(f => f.fixed);
  const lines = [`# Known vulnerabilities in shipped components`, ``, `Checked ${list.length} packages (${shipped.length} shipped components) against OSV on ${new Date().toISOString().slice(0, 10)}.`, ``];
  const table = rows => ["| Package | Advisory | Fixed in | Summary |", "|---|---|---|---|", ...rows.map(f => `| ${f.label} | [${f.id}](https://osv.dev/vulnerability/${f.id}) | ${f.fixed || "no fix yet"} | ${f.summary.replace(/\|/g, "\\|")} |`)];
  lines.push(`## Libraries in visitors' pages: ${browser.length ? browser.length + " found" : "none found"}`, ``, ...(browser.length ? table(browser) : []), ``);
  lines.push(`## Practice VM image: ${vm.length} advisor${vm.length === 1 ? "y" : "ies"} (${vmFixable.length} with a fix available)`, ``);
  counted.forEach(x => lines.push(`- ${x.label}: ${x.n} advisories, not listed one by one (it runs only inside the in-browser emulator). [List on OSV](https://osv.dev/list?ecosystem=${encodeURIComponent("Ubuntu:24.04:LTS")}&q=${encodeURIComponent(x.q.package.name)})`, ``));
  if (vmFixable.length) lines.push("Rebuild the VM with `tools/vm/build-vm.sh` to pick up fixed packages, then `node tools/vm/test-labs.js`.", ``, ...table(vmFixable), ``);
  const report = lines.join("\n");
  console.log(report);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + "\n");
  process.exit(browser.length || (STRICT && vmFixable.length) ? 1 : 0);
})().catch(e => { console.error("Vulnerability check couldn't run: " + e.message); process.exit(1); });
