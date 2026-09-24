#!/usr/bin/env node
/* Keeps the Cloudflare zone's HTTPS/TLS settings where they should be.
   Dry run by default: prints any drift and exits 1 if something is off.
   With --apply it changes the settings that differ.

   Needs env CLOUDFLARE_API_TOKEN (permissions: Zone Settings Edit, Zone Read, DNS Read;
   add Zone Edit if you want --apply to turn on DNSSEC) and CLOUDFLARE_ZONE_ID.
   Run by .github/workflows/study-site-cloudflare.yml. */
const APPLY = process.argv.includes("--apply");
const { CLOUDFLARE_API_TOKEN: TOKEN, CLOUDFLARE_ZONE_ID: ZONE } = process.env;
if (!TOKEN || !ZONE) { console.log("CLOUDFLARE_API_TOKEN or CLOUDFLARE_ZONE_ID isn't set; skipping."); process.exit(0); }

// What each setting should be, and why.
const WANT = {
  always_use_https: ["on", "send every http:// request to https://"],
  automatic_https_rewrites: ["on", "rewrite any stray http:// links in pages to https://"],
  ssl: ["strict", "Full (strict): Cloudflare verifies the certificate behind it"],
  min_tls_version: ["1.2", "refuse TLS 1.0 and 1.1"],
  tls_1_3: ["on", "allow the newest, fastest TLS"],
  opportunistic_encryption: ["on", "advertise encrypted HTTP/2 to supporting browsers"],
  http3: ["on", "QUIC for faster loads on mobile"],
  "0rtt": ["off", "no 0-RTT early data, which can be replayed"],
  browser_check: ["on", "challenge requests with known-bad browser signatures"],
  always_online: ["off", "never serve stale archived copies of study pages"]
};

async function api(method, path, body) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    method, headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  const j = await res.json().catch(() => ({}));
  if (!j.success) throw new Error(`${method} ${path}: ${(j.errors || []).map(e => e.message).join("; ") || res.status}`);
  return j.result;
}

(async () => {
  const current = Object.fromEntries((await api("GET", `/zones/${ZONE}/settings`)).map(s => [s.id, s.value]));
  const drift = Object.entries(WANT).filter(([k, [v]]) => k in current && String(current[k]) !== v);
  for (const [k, [v, why]] of Object.entries(WANT)) {
    if (!(k in current)) { console.log(`  - ${k}: not available on this plan`); continue; }
    console.log(`  ${String(current[k]) === v ? "✓" : "✗"} ${k} = ${current[k]}${String(current[k]) === v ? "" : ` (want ${v}: ${why})`}`);
  }
  const dnssec = await api("GET", `/zones/${ZONE}/dnssec`).catch(e => ({ status: `unknown (${e.message})` }));
  console.log(`  ${dnssec.status === "active" ? "✓" : "✗"} DNSSEC ${dnssec.status}`);

  if (APPLY) {
    if (drift.length) {
      await api("PATCH", `/zones/${ZONE}/settings`, { items: drift.map(([id, [value]]) => ({ id, value })) });
      console.log(`Applied ${drift.length} setting${drift.length > 1 ? "s" : ""}: ${drift.map(d => d[0]).join(", ")}`);
    }
    if (dnssec.status === "disabled") {
      await api("PATCH", `/zones/${ZONE}/dnssec`, { status: "active" }).then(() => console.log("DNSSEC turned on. With Cloudflare Registrar the DS record is added for you.")).catch(e => console.log(`Couldn't turn on DNSSEC: ${e.message}`));
    }
    process.exit(0);
  }
  const off = drift.length + (dnssec.status === "active" ? 0 : 1);
  console.log(off ? `\n${off} setting${off > 1 ? "s" : ""} differ. Run with --apply (or the workflow's "apply" option) to fix.` : "\nZone settings match.");
  process.exit(off ? 1 : 0);
})().catch(e => { console.error(e.message); process.exit(1); });
