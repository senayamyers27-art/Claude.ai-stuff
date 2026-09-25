#!/usr/bin/env node
/* Maintenance report: what on the site needs updating, as Markdown.
   Run weekly by .github/workflows/study-site-maintenance.yml, which posts it to one issue.

     node tools/freshness.js [--state old.json] [--state-out new.json] [--out report.md] [--no-fetch]

   Checks:
     - exam details and lessons not re-checked in site.config.json "reviewEveryDays"
     - plans whose weights are still "to confirm", and planned certs with no content
     - notices starting or ending soon, or already expired
     - security.txt expiry and a missing domain
     - official exam pages: fingerprints the lines that mention percentages or the exam
       code, so a change in published weights or versions shows up as "changed" */
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const ROOT = path.join(__dirname, ".."), PUB = path.join(ROOT, "public");
const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));
global.CertHub = { certs: {}, register(c) { this.certs[c.id] = c; } };
require(path.join(PUB, "data/catalog.js"));
CertHub.catalog.forEach(id => { const f = path.join(PUB, "data", id + ".js"); if (fs.existsSync(f)) require(f); });

const DAY = 864e5;
const today = new Date(new Date().toISOString().slice(0, 10));
const days = d => Math.round((new Date(d) - today) / DAY);
const action = [], soon = [], info = [];

if (!cfg.domain) action.push("**Set the domain.** `domain` in `site.config.json` is empty, so there's no canonical URL, sitemap entries or live HTTPS check yet.");
const secDays = days(cfg.securityTxtExpires);
if (secDays < 45) action.push(`**Renew security.txt.** It expires ${cfg.securityTxtExpires} (${secDays} days). Set \`securityTxtExpires\` in \`site.config.json\` about a year out, then run \`npm run build\`.`);

for (const id of CertHub.catalog) {
  const c = CertHub.certs[id], p = CertHub.planned[id];
  if (!c) { action.push(`**${p ? p.name : id}: no study content.** Listed on the home page with weights only.`); continue; }
  // Lessons carry their own last-reviewed date (third argument of CertHub.addLessons).
  const lf = path.join(PUB, "data/lessons", id + ".js");
  if (fs.existsSync(lf)) {
    let meta = {}; CertHub.addLessons = (x, l, m) => { meta = m || {}; }; require(lf);
    const lage = meta.reviewed ? -days(meta.reviewed) : Infinity;
    if (lage > (cfg.reviewEveryDays || 180)) action.push(`**${c.name}: review the lessons.** ${meta.reviewed ? `Last reviewed ${meta.reviewed} (${lage} days ago)` : "No review date"}. Check them against the current objectives, fix anything outdated, then update \`reviewed\` at the end of \`public/data/lessons/${id}.js\`.`);
  }
  const age = -days(c.lastVerified);
  if (age > (cfg.reviewEveryDays || 180)) action.push(`**${c.name}: re-check exam details.** Last checked ${c.lastVerified} (${age} days ago). Confirm weights, format and dates, then update \`lastVerified\` in \`public/data/${id}.js\`.`);
  if (c.status !== "verified") action.push(`**${c.name}: confirm domain weights** against the official outline, then set \`status: "verified"\`.`);
  for (const n of c.notices || []) {
    if (n.until && days(n.until) < 0) info.push(`${c.short}: notice ended ${n.until}, can be removed: “${n.text}”`);
    else if (n.until && days(n.until) <= 30) soon.push(`${c.short}: notice ends ${n.until} (${days(n.until)} days). Update the plan if the exam changes then: “${n.text}”`);
    if (n.from && days(n.from) > 0 && days(n.from) <= 30) soon.push(`${c.short}: notice starts showing ${n.from}: “${n.text}”`);
  }
}

async function fingerprint(url) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 20000);
  try {
    const res = await fetch(url, { signal: ctl.signal, redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (compatible; CyberCertStudy-freshness/1.0)", Accept: "text/html,application/pdf" } });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const text = (await res.text()).replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, "\n").replace(/&nbsp;/g, " ").replace(/[ \t]+/g, " ");
    const lines = text.split("\n").map(l => l.trim()).filter(l => /\d{1,3}\s?%|\b[A-Z]{2,3}\d?-\d{3}\b|\bv\d+(\.\d+)?\b|retire|launch/i.test(l) && l.length < 300);
    return { hash: crypto.createHash("sha256").update(lines.join("\n")).digest("hex").slice(0, 16), lines: lines.length };
  } catch (e) { return { error: e.name === "AbortError" ? "timed out" : e.message }; } finally { clearTimeout(t); }
}

(async () => {
  const prev = arg("--state") && fs.existsSync(arg("--state")) ? JSON.parse(fs.readFileSync(arg("--state"), "utf8")) : {};
  const state = {}, watch = [];
  if (!process.argv.includes("--no-fetch")) {
    for (const c of Object.values(CertHub.certs)) for (const s of c.sources || []) {
      const r = await fingerprint(s.url);
      const old = prev[s.url];
      state[s.url] = r.hash ? r.hash : (old || null);
      let st;
      if (r.error) st = `⚠️ couldn't read (${r.error})`;
      else if (!old) st = "first check, fingerprint saved";
      else if (old !== r.hash) { st = "🔔 **changed since last week**"; action.push(`**${c.name}: the official page changed.** Look for new weights, versions or dates: ${s.url}`); }
      else st = "no change";
      watch.push(`| ${c.short} | [${s.label}](${s.url}) | ${st} |`);
    }
  }
  const md = [
    `# Study site maintenance report`,
    `Generated ${today.toISOString().slice(0, 10)}. This issue is updated automatically every week; close it when everything below is handled.`,
    `## Needs action (${action.length})`, action.length ? action.map(a => `- [ ] ${a}`).join("\n") : "Nothing right now.",
    `## Coming up in the next 30 days (${soon.length})`, soon.length ? soon.map(a => `- ${a}`).join("\n") : "Nothing scheduled.",
    info.length ? `## Tidy-up\n${info.map(a => `- ${a}`).join("\n")}` : "",
    watch.length ? `## Official exam pages\nOnly lines mentioning percentages, exam codes, versions, launches or retirements are compared.\n\n| Cert | Page | Status |\n|---|---|---|\n${watch.join("\n")}` : ""
  ].filter(Boolean).join("\n\n");
  if (arg("--out")) fs.writeFileSync(arg("--out"), md + "\n"); else console.log(md);
  if (arg("--state-out")) fs.writeFileSync(arg("--state-out"), JSON.stringify(state));
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `actions=${action.length}\n`);
})();
