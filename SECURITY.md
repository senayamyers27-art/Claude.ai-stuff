# Security framework

How 11:Eleven Lounge's backend (Cloudflare Worker + D1, gated by Cloudflare
Access) is patched, updated, audited, and mapped to Confidentiality,
Integrity, and Availability. Written for what this stack actually is —
serverless on Cloudflare, no servers or OS of our own — not a generic
checklist copied from a traditional data-center setup.

## Shared responsibility: what Cloudflare already patches

There is no OS, kernel, container runtime, or web server in this stack for
anyone to patch — Cloudflare Workers is a managed runtime. Cloudflare
patches the V8 isolate runtime, the edge network, D1's storage engine, and
TLS itself, continuously, with no action possible or needed on our side.
"Auto patch management" for infrastructure is therefore already 100%
covered, by design — the only thing that could regress it is *reintroducing*
something we removed (see workers.dev, below).

The only code we own is `worker/src/index.js` (no npm dependencies —
there's no `package.json` anywhere in this repo) and the static HTML/JS
pages. That means classic dependency-patching tools (Dependabot for npm,
`npm audit`) have nothing to scan here; auditing has to target the code
itself instead, which is what CodeQL (below) is for.

## Auto patch management / auto updates

| Surface | Mechanism | Status |
|---|---|---|
| Workers runtime, D1, TLS, edge network | Cloudflare-managed, continuous | Automatic, nothing to configure |
| GitHub Actions versions (`actions/checkout@v4`, etc.) | Dependabot (`.github/dependabot.yml`) | Already configured — weekly PRs |
| App code (`worker/src/index.js`, `assets/js/*`) | No dependency manager (no `package.json`) | Nothing to auto-patch; covered by auditing instead |

## Auto auditing

| Check | Where | Runs |
|---|---|---|
| Live site up, CSP present, HTTPS enforced, TLS cert not expiring, security headers (HSTS, `X-Content-Type-Options`) present | `scripts/live_site_audit.py` via `.github/workflows/live-site-audit.yml` | Nightly + on demand |
| Staff API (`/api/me`) rejects anonymous requests | same script, `check_staff_api_requires_auth()` | Nightly — regression test for the exact Access bug fixed earlier |
| `workers.dev` preview URL stays disabled | same script, `check_workers_dev_disabled()` | Nightly (set the `WORKERS_DEV_URL` repo variable to enable; skipped with a warning otherwise) |
| Static analysis of `worker/src` and `assets/js` for injection, unsafe patterns | CodeQL (`.github/workflows/codeql.yml`) | Every push/PR to `main` + weekly |
| Secrets accidentally committed | gitleaks (`.github/workflows/secret-scan.yml`) | Every push/PR to `main` |
| Performance/accessibility regressions | Lighthouse CI (`.github/workflows/lighthouse-ci.yml`, `live-site-audit.yml`) | Every PR + nightly |
| D1 data export | `.github/workflows/d1-backup.yml` | Nightly (**needs one-time setup — see below**) |

A failure in any nightly job files/comments on a GitHub issue automatically
(see `live-site-audit.yml`'s failure step) — this is the "who's watching
the watcher" piece: audits don't just run, a real failure produces a visible
artifact even if nobody's looking that day.

## One-time setup still needed (can't be done from code)

- **D1 backups**: `d1-backup.yml` is gated on the `CLOUDFLARE_ACCOUNT_ID`
  repo variable and `CLOUDFLARE_API_TOKEN` repo secret — until both are set
  (Settings → Secrets and variables → Actions), nightly backups silently
  don't run. Token needs D1:Edit scope only.
- **`workers.dev` regression check**: set the `WORKERS_DEV_URL` repo
  variable to `https://eleven-eleven-staff-api.<your-subdomain>.workers.dev`
  so the nightly audit actually verifies it's still disabled, instead of
  just warning that the check was skipped.
- **HSTS**: the header check will fail on the first run unless it's already
  on — enable it once in the Cloudflare dashboard (SSL/TLS → Edge
  Certificates → "Enable HSTS"). This can't be set from a Worker or from
  this repo; it's an edge/zone-level setting.
- **Cloudflare account itself**: enable MFA on the account that owns this
  zone/Worker/D1 database. Everything above assumes that account isn't
  compromised — nothing in this repo can enforce that from outside.

## CIA triad mapping

### Confidentiality
- **Access control**: Cloudflare Access (One-Time PIN) gates `owner.html`,
  `host.html`, and `/api/*`; the staff table's `role` column further
  restricts owner-only endpoints. `/public/*` (guest booking) is
  deliberately open — guests have no Cloudflare identity to authenticate
  with, so it only ever exposes booking-scoped actions, never staff data.
- **Encryption in transit**: TLS enforced end-to-end (Cloudflare edge
  certificate + `upgrade-insecure-requests` in CSP + HTTPS-redirect check
  in the live audit).
- **Encryption at rest**: D1 storage is encrypted at rest by Cloudflare;
  no separate key management needed or possible from Worker code.
- **No secrets in code**: no passwords/PINs/API keys anywhere in this
  repo — identity comes entirely from Access, and the only credential
  (`CLOUDFLARE_API_TOKEN` for backups) lives in GitHub Actions secrets,
  never in a file. Gitleaks now checks that stays true.
- **Least privilege**: staff `role` (`owner` vs `host`) gates which API
  routes return data; removing a staff row revokes access immediately,
  no session to separately invalidate.

### Integrity
- **Input validation**: request bodies validated in `worker/src/index.js`
  (party size bounds, required fields, enum checks on status/role) before
  any D1 write.
- **Injection protection**: all D1 queries are parameterized (`.bind(...)`),
  never string-concatenated SQL.
- **Content integrity**: CSP (`script-src 'self'`) blocks injected scripts
  from executing even if a page were somehow tampered with in transit or
  via XSS; `referrer-policy` limits what leaks to a linked-to origin.
- **Change audit trail**: every backend change ships as a reviewed PR
  (git history = change log); CodeQL now flags risky patterns before merge
  instead of after.
- **Rate limiting**: per-IP throttling (`RATE_LIMIT` KV) on the public
  booking API guards against automated abuse corrupting the reservation
  book (e.g. mass fake bookings).

### Availability
- **DDoS/edge protection**: Cloudflare's network-level protection is
  always-on in front of the Worker and static site; nothing to configure.
- **Backups**: nightly D1 export (`d1-backup.yml`, pending the one-time
  secret setup above) plus Cloudflare D1's built-in 30-day point-in-time
  recovery as a second, independent recovery path.
- **Data retention**: `worker/DATA_RETENTION.md` bounds how much the
  database ever has to hold, so cleanup can't silently stop and grow
  D1 into an outage.
- **Health monitoring**: nightly live-site audit catches an outage,
  cert expiry, or a broken page within a day, with an automatic GitHub
  issue instead of relying on someone noticing.

## Explicitly out of scope (and why)

- **"TCP/IP protocol hardening"**: there's no TCP/IP stack we control —
  Cloudflare's edge terminates all of that. Nothing to configure here.
- **NIST Framework / ISO-style compliance program**: those are
  organizational risk-management processes (policies, roles, audits,
  training), not something expressed in code. This document is the
  closest code-side equivalent — a living control map — but a real NIST
  CSF program is a business decision, not a PR.
- **Password hashing**: there are no passwords anywhere in this system —
  identity is Cloudflare Access only. Nothing to hash.
- **Token management (custom)**: no custom session tokens are issued;
  Access's own JWT is the only token in play, and Cloudflare manages its
  issuance, rotation, and validation entirely.
