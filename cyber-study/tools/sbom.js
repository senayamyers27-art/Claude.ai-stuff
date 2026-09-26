#!/usr/bin/env node
/* Software bill of materials (CycloneDX 1.6 JSON) for everything the site ships to visitors:
   the Python engine (Pyodide), the practice VM (v86, xterm.js, SeaBIOS, the Linux kernel and every
   Ubuntu package in the VM image), and the self-hosted font. Build tools from package-lock.json are
   listed with scope "excluded" because they never reach visitors. Output is deterministic for a commit.
   Usage: node tools/sbom.js [--out sbom.cdx.json]   (--check: only verify every shipped component has a version and purl)
   tools/vuln-check.js reads the same list to look for known vulnerabilities. */
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, "..");
const PUB = path.join(ROOT, "public");
const read = rel => fs.readFileSync(path.join(ROOT, rel), "utf8");
const sha256 = file => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const hashes = dir => fs.readdirSync(path.join(PUB, dir)).filter(f => !/\.(txt|md)$|^LICENSE/.test(f)).sort()
  .map(f => ({ name: `${dir}/${f}`, sha: sha256(path.join(PUB, dir, f)) }));
const UBUNTU = "ubuntu-24.04";

function components() {
  const out = [];
  const add = c => out.push(Object.assign({ type: "library", scope: "required" }, c));

  // Python engine
  const py = JSON.parse(fs.readFileSync(path.join(PUB, "vendor/pyodide/package.json"), "utf8"));
  add({ name: "pyodide", version: py.version, purl: `pkg:npm/pyodide@${py.version}`, licenses: [{ license: { id: "MPL-2.0" } }],
    description: "Python in the browser (hands-on Python exercises)", files: hashes("vendor/pyodide") });

  // Practice VM: versions come from SOURCES.txt, written by tools/vm/build-vm.sh.
  const src = fs.readFileSync(path.join(PUB, "vendor/vm/SOURCES.txt"), "utf8");
  const m = (re, what) => { const x = re.exec(src); if (!x) throw new Error(`SOURCES.txt: can't find the ${what} version`); return x; };
  const v86 = m(/^v86 (\S+)/m, "v86")[1].replace(/\+.*$/, ""), xterm = m(/xterm\.js (\S+)/, "xterm.js")[1];
  const [, kpkg, kver] = m(/^Kernel: Ubuntu (\S+) ([^,\s]+)/m, "kernel"), seabios = m(/^SeaBIOS: Ubuntu seabios (\S+)/m, "SeaBIOS")[1];
  const vmFiles = hashes("vendor/vm");
  add({ name: "v86", version: v86, purl: `pkg:npm/v86@${v86}`, licenses: [{ license: { id: "BSD-2-Clause" } }], description: "x86 emulator for the practice VMs",
    files: vmFiles.filter(f => /libv86|v86\.wasm/.test(f.name)) });
  add({ name: "@xterm/xterm", version: xterm, purl: `pkg:npm/%40xterm/xterm@${xterm}`, licenses: [{ license: { id: "MIT" } }], description: "Terminal for the practice VMs",
    files: vmFiles.filter(f => /xterm/.test(f.name)) });
  add({ name: "seabios", version: seabios, purl: `pkg:deb/ubuntu/seabios@${encodeURIComponent(seabios)}?arch=all&distro=${UBUNTU}`, licenses: [{ license: { id: "LGPL-3.0-only" } }],
    description: "PC BIOS for the practice VMs", files: vmFiles.filter(f => /bios/.test(f.name)), sourcePackage: "seabios" });
  add({ name: "linux", version: kver, purl: `pkg:deb/ubuntu/${kpkg}@${encodeURIComponent(kver)}?distro=${UBUNTU}`, licenses: [{ license: { id: "GPL-2.0-only" } }],
    description: "Linux kernel built for the practice VMs (tools/vm/kernel-i386.config)", sourcePackage: "linux" });
  // Every Ubuntu package in the VM image, as "name_version_arch.deb  source: srcname [(srcversion)]".
  for (const [, file, source] of src.matchAll(/^ {2}(\S+\.deb)(?: {2}source: (.+))?$/gm)) {
    const [name, ver, arch] = file.replace(/\.deb$/, "").split("_"), version = decodeURIComponent(ver);
    const [srcName, srcVer] = source ? [source.split(" ")[0], (/\(([^)]+)\)/.exec(source) || [])[1]] : [name];
    add({ name, version, purl: `pkg:deb/ubuntu/${name}@${encodeURIComponent(version)}?arch=${arch}&distro=${UBUNTU}`, description: "Ubuntu package in the practice VM image",
      sourcePackage: srcName, sourceVersion: srcVer || version });
  }

  // Font
  add({ type: "file", name: "Public Sans", purl: "pkg:github/uswds/public-sans", licenses: [{ license: { id: "OFL-1.1" } }], description: "Self-hosted web font",
    files: hashes("assets/fonts") });

  // Build and test tools (never shipped).
  const lock = JSON.parse(read("package-lock.json"));
  for (const [key, p] of Object.entries(lock.packages || {}).sort()) {
    if (!key.startsWith("node_modules/") || !p.version) continue;
    const name = key.slice(key.lastIndexOf("node_modules/") + 13);
    const c = { name, version: p.version, purl: `pkg:npm/${name.replace("@", "%40")}@${p.version}`, scope: "excluded", description: "Build or test tool" };
    if (p.license) c.licenses = [{ expression: p.license }];
    if (p.integrity && p.integrity.startsWith("sha512-")) c.hashes = [{ alg: "SHA-512", content: Buffer.from(p.integrity.slice(7), "base64").toString("hex") }];
    add(c);
  }
  // Dedupe (the same package can sit at several places in node_modules).
  const seen = new Set();
  return out.filter(c => { const k = c.purl || c.name; return !seen.has(k) && seen.add(k); });
}

function sbom() {
  const list = components();
  let commit = "", date = new Date(0).toISOString();
  try { commit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: ROOT, encoding: "utf8" }).trim(); date = execFileSync("git", ["log", "-1", "--format=%cI"], { cwd: ROOT, encoding: "utf8" }).trim().replace(/\+00:00$/, "Z"); } catch {}
  const sw = fs.readFileSync(path.join(PUB, "sw.js"), "utf8"), version = (/const VERSION = "([0-9a-f]+)"/.exec(sw) || [])[1] || "unknown";
  const cfg = JSON.parse(read("site.config.json"));
  const body = {
    bomFormat: "CycloneDX", specVersion: "1.6", version: 1,
    metadata: {
      timestamp: date,
      tools: { components: [{ type: "application", name: "tools/sbom.js" }] },
      component: { type: "application", "bom-ref": "site", name: cfg.siteName || "site", version, description: cfg.description,
        externalReferences: [{ type: "website", url: `https://${cfg.domain}` }, ...(commit ? [{ type: "vcs", url: `https://github.com/senayamyers27-art/Claude.ai-stuff/commit/${commit}` }] : [])] }
    },
    components: list.map(c => {
      const o = { type: c.type, "bom-ref": c.purl || c.name, name: c.name };
      if (c.version) o.version = c.version;
      o.scope = c.scope;
      if (c.description) o.description = c.description;
      if (c.licenses) o.licenses = c.licenses;
      if (c.purl) o.purl = c.purl;
      if (c.hashes) o.hashes = c.hashes;
      const props = [];
      if (c.sourcePackage) props.push({ name: "ubuntu:source-package", value: c.sourcePackage }, { name: "ubuntu:source-version", value: c.sourceVersion || c.version });
      (c.files || []).forEach(f => props.push({ name: "sha256:" + f.name, value: f.sha }));
      if (props.length) o.properties = props;
      return o;
    }),
    dependencies: [{ ref: "site", dependsOn: list.filter(c => c.scope !== "excluded").map(c => c.purl || c.name) }]
  };
  body.serialNumber = "urn:uuid:" + uuidFrom(JSON.stringify(body));
  return body;
}
// A stable UUID (version 5 layout) from the document, so the same commit always gives the same SBOM.
function uuidFrom(s) {
  const h = crypto.createHash("sha1").update(s).digest();
  h[6] = (h[6] & 0x0f) | 0x50; h[8] = (h[8] & 0x3f) | 0x80;
  const x = h.subarray(0, 16).toString("hex");
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20)}`;
}

module.exports = { components, sbom };
if (require.main === module && process.argv.includes("--check")) {
  const shipped = components().filter(c => c.scope === "required"), bad = shipped.filter(c => !c.version && c.type !== "file" || !c.purl);
  bad.forEach(c => console.log(`  ✗ SBOM component ${c.name} has no version or purl`));
  if (shipped.filter(c => c.sourcePackage).length < 50) { console.log("  ✗ SBOM lists too few VM packages; check the format of public/vendor/vm/SOURCES.txt"); process.exit(1); }
  console.log(bad.length ? `${bad.length} SBOM problem(s).` : `SBOM complete (${shipped.length} shipped components).`);
  process.exit(bad.length ? 1 : 0);
} else if (require.main === module) {
  const i = process.argv.indexOf("--out"), doc = JSON.stringify(sbom(), null, 2) + "\n";
  if (i > 0) {
    fs.writeFileSync(process.argv[i + 1], doc);
    const b = JSON.parse(doc).components;
    console.log(`Wrote ${process.argv[i + 1]}: ${b.filter(c => c.scope === "required").length} shipped components, ${b.filter(c => c.scope === "excluded").length} build tools.`);
  } else process.stdout.write(doc);
}
