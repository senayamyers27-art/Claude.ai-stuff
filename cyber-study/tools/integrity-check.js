#!/usr/bin/env node
/* Live integrity monitor: proves the deployed site is byte-for-byte a build from this repository.
   1. Reads the build version from the live /sw.js.
   2. Finds the commit on main whose public/sw.js has that version (among the last 60 that changed it).
   3. Downloads every file that commit published and compares its git blob hash with the commit's tree,
      so any file changed on the server, by a compromised host or a hijacked deploy, is caught.
   Fails when the live version matches no recent commit, or any file differs or is missing.
   A live site that is behind main is reported but doesn't fail (publishing runs after CI).
   Usage: node tools/integrity-check.js [--base https://example.com] [--ref origin/main] [--skip-large] [--sample N]
     --skip-large  don't download files over 5 MB (the VM image and Python engine), for a quick run.
     --sample N    check every script, style, data and top-level file (what the app runs on) plus N randomly
                   chosen other pages, to go easy on the host between full checks.
   Needs git history: in GitHub Actions use actions/checkout with fetch-depth: 0. */
const { execFileSync } = require("child_process");
const crypto = require("crypto"), fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));
const arg = (name, def) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : def; };
const BASE = (arg("--base", cfg.domain ? `https://${cfg.domain}` : "") || "").replace(/\/+$/, "");
const REF = arg("--ref", "HEAD");
const SKIP_LARGE = process.argv.includes("--skip-large");
const SAMPLE = process.argv.includes("--sample") ? Math.max(0, +arg("--sample", 0)) : null;
const LARGE = 5 * 1024 * 1024;
// Files the publish step adds, and host configuration that Cloudflare Pages reads instead of serving.
const NOT_PUBLISHED = new Set([".nojekyll", "README.md", "_headers", "_redirects"]);
if (!BASE) { console.log("No domain set in site.config.json and no --base; nothing to check."); process.exit(0); }

const TOP = execFileSync("git", ["rev-parse", "--show-toplevel"], { cwd: ROOT, encoding: "utf8" }).trim();
const git = (...a) => execFileSync("git", a, { cwd: TOP, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
const PREFIX = path.relative(TOP, path.join(ROOT, "public")).split(path.sep).join("/") + "/"; // e.g. cyber-study/public/
const versionOf = sw => (/const VERSION = "([0-9a-f]+)"/.exec(sw) || [])[1];
const blobHash = buf => crypto.createHash("sha1").update(`blob ${buf.length}\0`).update(buf).digest("hex");

// Retries rate limits (429) and server errors with backoff, honoring Retry-After, so a busy host isn't
// mistaken for a changed file.
async function get(url) {
  for (let tries = 0; ; tries++) {
    let r;
    try { r = await fetch(url, { redirect: "follow", cache: "no-store" }); }
    catch (e) { if (tries >= 4) return { status: 0, error: e.message }; await sleep(1000 * 2 ** tries); continue; }
    if ((r.status === 429 || r.status >= 500) && tries < 5) {
      const wait = Math.min(60, +(r.headers.get("retry-after") || 0) || 2 ** (tries + 1));
      await r.arrayBuffer().catch(() => {}); await sleep(wait * 1000); continue;
    }
    return { status: r.status, body: r.ok ? Buffer.from(await r.arrayBuffer()) : null };
  }
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log(`Integrity check of ${BASE}`);
  const sw = await get(`${BASE}/sw.js`);
  if (!sw.body) { console.log(`  ✗ couldn't download /sw.js (${sw.error || "HTTP " + sw.status})`); process.exit(1); }
  const live = versionOf(sw.body.toString("utf8"));
  if (!live) { console.log("  ✗ /sw.js has no build version; it isn't a build of this site"); process.exit(1); }

  // Which commit is live?
  const commits = git("log", "--format=%H %cI", "-n", "60", REF, "--", PREFIX + "sw.js").trim().split("\n").filter(Boolean).map(l => l.split(" "));
  let match = null;
  for (const [sha, date] of commits) {
    let v; try { v = versionOf(git("show", `${sha}:${PREFIX}sw.js`)); } catch { continue; }
    if (v === live) { match = { sha, date }; break; }
  }
  if (!match) { console.log(`  ✗ the live build version ${live} matches none of the last ${commits.length} builds on ${REF}. The site may have been changed outside this repository.`); process.exit(1); }
  const behind = commits.findIndex(([sha]) => sha === match.sha);
  console.log(`  ✓ live build ${live} is commit ${match.sha.slice(0, 7)} (${match.date})`);
  if (behind > 0) console.log(`  ! the live site is ${behind} build${behind > 1 ? "s" : ""} behind ${REF} (published after CI, or not published yet)`);

  // Compare every published file with that commit's tree.
  const tree = git("ls-tree", "-r", "-l", match.sha, "--", PREFIX).trim().split("\n").map(l => {
    const [meta, file] = l.split("\t"), [, , sha, size] = meta.split(/\s+/);
    return { rel: file.slice(PREFIX.length), sha, size: +size };
  }).filter(f => !NOT_PUBLISHED.has(f.rel));
  let todo = tree.filter(f => !(SKIP_LARGE && f.size > LARGE));
  if (SAMPLE != null) {
    const core = f => !f.rel.includes("/") || /^(assets|data|vendor)\//.test(f.rel) || /^[^/]+\/index\.html$/.test(f.rel);
    const rest = todo.filter(f => !core(f));
    for (let i = rest.length - 1; i > 0; i--) { const j = crypto.randomInt(i + 1); [rest[i], rest[j]] = [rest[j], rest[i]]; }
    todo = todo.filter(core).concat(rest.slice(0, SAMPLE));
  }
  // A file whose content differs, or that's missing (404), fails the check. One the host wouldn't serve even
  // after retries (rate limits, outages) couldn't be checked: reported, and failing only if it's many files.
  const differs = [], unreachable = [];
  let done = 0;
  const queue = todo.slice();
  await Promise.all(Array.from({ length: 4 }, async () => {
    for (let f; (f = queue.shift());) {
      const url = `${BASE}/${f.rel.split("/").map(encodeURIComponent).join("/")}`;
      const r = await get(url);
      if (r.body) { if (blobHash(r.body) !== f.sha) differs.push(`${f.rel}: live content differs from commit ${match.sha.slice(0, 7)}`); }
      else if (r.status === 404) differs.push(`${f.rel}: missing on the live site (404)`);
      else unreachable.push(`${f.rel}: ${r.error || "HTTP " + r.status}`);
      done++;
    }
  }));
  differs.forEach(m => console.log(`  ✗ ${m}`));
  unreachable.slice(0, 10).forEach(m => console.log(`  ! couldn't check ${m}`));
  if (unreachable.length > 10) console.log(`  ! …and ${unreachable.length - 10} more the host wouldn't serve`);
  const tooManyUnreachable = unreachable.length > Math.max(5, done * 0.02);
  const skipped = tree.length - todo.length, scope = SAMPLE != null ? ` (core files and a sample of ${SAMPLE} pages)` : skipped ? ` (${skipped} large files skipped)` : "";
  if (differs.length) console.log(`${differs.length} of ${done} files don't match the repository. Treat this as a possible compromise: see docs/INCIDENT_RESPONSE.md.`);
  else if (tooManyUnreachable) console.log(`The host wouldn't serve ${unreachable.length} of ${done} files, so the site couldn't be checked. Run it again later.`);
  else console.log(`  ✓ ${done - unreachable.length} files match commit ${match.sha.slice(0, 7)}${scope}${unreachable.length ? `; ${unreachable.length} couldn't be downloaded` : ""}`);
  process.exit(differs.length || tooManyUnreachable ? 1 : 0);
})();
