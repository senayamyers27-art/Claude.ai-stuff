# Security self-assessment

A self-assessment of StudyToCert against two public standards, with the evidence for each answer. It is not an independent audit or a certification. Review it when the architecture changes, and at least every six months.

- **OWASP Application Security Verification Standard (ASVS) 5.0, Level 1**, by chapter.
- **NIST Secure Software Development Framework (SSDF), SP 800-218**, by practice.

Last reviewed: 2026-09-26.

## What is assessed

| Part | What it is | Where |
|---|---|---|
| The site | Static pages, app scripts and data, served from GitHub Pages (or Cloudflare Pages). No server code; progress stays in the visitor's browser. | `public/`, `tools/build.js` |
| Practice VMs and Python | Third-party engines (v86, xterm.js, Pyodide) that run entirely in the visitor's browser, in a sandbox with no route to the internet | `public/vendor/`, `tools/vm/` |
| Accounts API (optional, off) | A Cloudflare Worker with a D1 database for sign-in, progress sync, classes and Pro | `api/` |
| Delivery | GitHub Actions workflows that check, build, sign and publish | `.github/workflows/` |

Most of ASVS is about server-side code, which the site doesn't have. Those chapters apply only to the accounts API, and only once it's turned on.

## OWASP ASVS 5.0, Level 1

Status: **Met**, **Partly** (with the gap named), or **N/A** (nothing in scope).

| Chapter | Status | Evidence |
|---|---|---|
| V1 Encoding and Sanitization | Met | Every value placed in HTML goes through `esc()`. `tools/check-xss.js` parses every app script and fails the build on an unescaped value in an HTML template. Trusted Types (`assets/theme.js`) refuse script, style and frame tags, event handlers and `javascript:` URLs in any HTML the app writes. CSV exports neutralize spreadsheet formulas (`api/src/classes.js`, `orgs.js`). The API uses bound SQL parameters only. |
| V2 Validation and Business Logic | Met | The API validates every body (JSON object only, size limits, typed fields, ids by pattern) in `api/src/`. Sign-in, invites, class codes and writes are rate limited. Progress sync uses version numbers so stale writes can't overwrite newer data. |
| V3 Web Frontend Security | Partly | CSP with no inline script, no `eval` and no inline style attributes; Trusted Types; Subresource Integrity on every script and stylesheet; HSTS; `nosniff`; strict referrer policy; `rel=noopener` on new-window links; `__Host-` `SameSite=Strict` cookie. **Gap:** on GitHub Pages the CSP is a `<meta>` tag, so `frame-ancestors` and `X-Frame-Options` can't be sent (clickjacking). Fixed by moving to Cloudflare Pages (`CLOUDFLARE_MOVE.md`). |
| V4 API and Web Service | Met | CORS allows only the site's origin, with credentials; every state-changing request must carry the site's `Origin` and a JSON body; responses carry `Cache-Control: no-store`, `nosniff` and a `default-src 'none'` CSP; HTTP methods are matched per route. |
| V5 File Handling | N/A | Nobody can upload files. Downloads (exports, CSVs) are generated, with fixed file names. |
| V6 Authentication | Met | Passwordless: single-use sign-in links with 256-bit random tokens, 15-minute expiry, stored only as SHA-256 hashes, redeemed atomically. Rate limits per address and per IP; optional Turnstile bot check. The same response whether or not an account exists (no enumeration). Passkeys are planned (`BACKEND_DESIGN.md`). |
| V7 Session Management | Met | 256-bit random session tokens, hash stored; `__Host-` prefix, `Secure`, `HttpOnly`, `SameSite=Strict`; 30-day sliding expiry with a 90-day absolute limit; at most 10 sessions per user; sign-out deletes the session on the server; account deletion ends every session. Tested in `api/test/`. |
| V8 Authorization | Met | Every route checks ownership or role on the server (class teacher or member, organization role, Pro entitlement for Pro content). Cross-account cases are tested in `api/test/classes.test.js`. |
| V9 Self-contained Tokens | N/A | No JWTs or other self-contained tokens; sessions are opaque and checked against the database. |
| V10 OAuth and OIDC | N/A | Not used. |
| V11 Cryptography | Met | Only platform cryptography (Web Crypto): `crypto.getRandomValues` for tokens, SHA-256 for stored hashes, HMAC-SHA256 with constant-time comparison for Stripe webhooks. No custom algorithms, no keys in code. |
| V12 Secure Communication | Met | HTTPS only: HSTS for two years including subdomains, `upgrade-insecure-requests`, an HTTP-to-HTTPS redirect; the daily live check verifies the certificate and that TLS 1.0 and 1.1 are refused. |
| V13 Configuration | Met | Secrets only in GitHub and Cloudflare secret stores, never in the repository (secret scanning and gitleaks enforce it). Generated configuration comes from one checked file (`site.config.json`). The site has no debug endpoints; the API's development shortcuts only work when `APP_ENV` is `development`. |
| V14 Data Protection | Met | The static site stores progress only in the visitor's browser and sends it nowhere. With accounts: the minimum personal data (an email address), export and deletion endpoints, no emails or tokens in logs, IP addresses stored only as short hashes. |
| V15 Secure Coding and Architecture | Met | Third-party code is vendored, version-pinned, listed in an SBOM and checked weekly for known vulnerabilities; GitHub Actions are pinned to commit SHAs; Dependabot updates both. CodeQL scans the code. |
| V16 Security Logging and Error Handling | Met | The API logs each refused request (bad origin, rate limit, wrong body type, rejected sign-in link, failed bot check) as one JSON line with a hashed IP, and an audit log records sign-ins, role changes, exports and deletions. Errors return a generic message; details go to the logs only. |
| V17 WebRTC | N/A | Not used. (The practice VMs' networking runs inside the page.) |

## NIST SSDF (SP 800-218)

| Practice | How the project meets it |
|---|---|
| **PO.1** Define security requirements | This document, `BACKEND_DESIGN.md` (threat model and controls) and the security lints, which turn requirements into checks that fail the build. |
| **PO.2** Roles and responsibilities | One maintainer owns security decisions; reports go to private vulnerability reporting (`security.txt`, the Security page). |
| **PO.3** Supporting toolchains | CI runs data checks, security and XSS lints, SBOM checks, API unit and abuse tests, a browser smoke test, an accessibility test and `npm audit`; CodeQL, gitleaks, Scorecard and ZAP run on schedules. |
| **PO.4** Security checks | Every check above must pass before deploy; Scorecard and the ZAP baseline track the overall posture. |
| **PO.5** Secure environments | Workflows get read-only tokens by default and ask for write access per job; checkouts don't keep credentials; deploy tokens are narrow and expire (`GITHUB_SETTINGS.md`). |
| **PS.1** Protect all code from unauthorized access and tampering | Branch rulesets on `main` (`GITHUB_SETTINGS.md`), two-factor sign-in, secret scanning with push protection. |
| **PS.2** Provide a way to verify software integrity | Subresource Integrity hashes on every script and stylesheet; signed SLSA build provenance for a manifest of every published file ("Study site provenance"); the live integrity monitor compares the deployed site with the repository every six hours. |
| **PS.3** Archive and protect each release | Each `main` build's file manifest and SBOM are kept with a signed attestation; git history holds every published version. |
| **PW.1** Design to meet security requirements | Static-first design: no server unless accounts are turned on; the VMs run sandboxed in the browser with no internet route. |
| **PW.2** Review the design | `BACKEND_DESIGN.md` records the design review for the accounts API; this assessment is repeated every six months. |
| **PW.4** Reuse well-secured software | Established open-source engines (v86, xterm.js, Pyodide, Ubuntu packages), pinned and listed in the SBOM, checked weekly against OSV. |
| **PW.5** Secure coding practices | Escaping enforced by an AST lint, Trusted Types, no `eval`, bound SQL parameters, constant-time secret comparisons. |
| **PW.6** Configure the build securely | The build refuses invalid configuration (API origin, keys), validates the service worker it generates, and pins every tool version (`package-lock.json`). |
| **PW.7** Review code | CodeQL on every push and pull request; the security and XSS lints; pull request review. |
| **PW.8** Test executable code | API unit and abuse tests, the browser smoke test (including the VMs and offline mode), the accounts end-to-end test, graded VM lab tests, and the weekly ZAP passive scan of the live site. |
| **PW.9** Secure defaults | Accounts, analytics, Turnstile and cross-origin isolation are off unless configured; the strictest CSP is the default. |
| **RV.1** Identify vulnerabilities | Dependabot, the weekly OSV check of shipped components, CodeQL, Scorecard, ZAP and private vulnerability reporting. |
| **RV.2** Assess and remediate | `INCIDENT_RESPONSE.md` gives the steps for each kind of finding. |
| **RV.3** Analyze root causes | Each incident ends with a written note and, where possible, a new automated check (`INCIDENT_RESPONSE.md`, "Afterwards"). |

## Open items

1. **Clickjacking protection on GitHub Pages:** needs response headers; move to Cloudflare Pages (`CLOUDFLARE_MOVE.md`).
2. **HSTS preload:** after the move (`CLOUDFLARE_MOVE.md`, step 7).
3. **Passkeys** for accounts, before accounts launch widely (`BACKEND_DESIGN.md`).
4. **A list of your signed-in devices with "sign out everywhere"** in the account page. Sessions already end after 90 days and are capped at 10.
5. **Repository settings** in `GITHUB_SETTINGS.md` that only the owner can turn on.
