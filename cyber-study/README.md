# Cyber Cert Study

A static study website with plans for several cybersecurity certifications, grown out of the
Security+ Study Hub. It's a separate site from 11:Eleven: it deploys to its own domain on
Cloudflare Pages and is excluded from this repository's GitHub Pages deploy.

Everything runs in the browser as one app: certifications, a library of 41 step-by-step
hands-on labs, a portfolio of finished labs, and Privacy, Terms and Security pages. Progress
and lab notes are saved in `localStorage` (with backup/restore), pages work offline, and the
site makes no requests to other websites.

Routes are hash tokens: `#home`, `#security-plus`, `#security-plus.labs`, `#labs`,
`#lab-linux-hardening`, `#portfolio`, `#privacy`, `#terms`, `#security`. The generated pages
`/<cert>/`, `/privacy/`, `/terms/` and `/security/` load the same app on that route.

```
cyber-study/
  site.config.json        domain, security contact, review interval, Pages project name
  public/                 ← everything deployed (Cloudflare Pages output directory)
    index.html            home page                                 (generated)
    <cert-id>/index.html  one study page per certification          (generated)
    assets/               core.js, app.js (router, home), engine.js (study plans),
                          labs.js (labs, portfolio), pages.js (policies), style.css, fonts/
    data/catalog.js       home page order, planned certifications
    data/<cert-id>.js     domains, weights, plan, notices, question bank
    data/labs-*.js        lab library (see LABS_FORMAT.md)
    data/lab-map.js       which labs go with which study weeks
    _headers _redirects robots.txt sitemap.xml manifest.webmanifest sw.js
    .well-known/security.txt                                        (all generated)
  functions/_middleware.js  HTTPS + canonical-host redirects         (generated)
  tools/                  build, checks, smoke test, local server, maintenance scripts
  package.json            pinned dev tools: playwright (tests), wrangler (deploys)
```

## Everyday commands

```sh
cd cyber-study
npm ci              # once: install the pinned tools
npm start           # preview at http://localhost:8000 (behaves like Cloudflare Pages)
npm run build       # regenerate pages and config files after editing data or config
npm run check       # data checks + generated files in sync + security lint
npm test            # headless browser smoke test of every page, including offline mode
npm run test:api    # accounts API tests (see "Optional accounts" below)
npm run test:a11y   # accessibility: axe-core WCAG 2.2 AA on every view, light and dark
```

`npm run build` writes every generated file from `site.config.json` and `public/data/`. Never
edit generated files by hand; CI fails if they're out of date.

## Labs

41 labs in four tracks (Foundations, Networking, Blue team, GRC & architecture), 507 steps in
total. Each has exact commands with copy buttons, checks that prove it worked, a notes box,
a Markdown write-up and a resume bullet. Finished labs collect on the Portfolio page. Add or
edit labs in `public/data/labs-*.js` following [LABS_FORMAT.md](LABS_FORMAT.md), and link them
to study weeks in `public/data/lab-map.js`.

## Add or change a certification

See [DATA_FORMAT.md](DATA_FORMAT.md): write `public/data/<id>.js`, add the id to
`public/data/catalog.js`, then `npm run build && npm run check && npm test`.

## Automation

| Workflow | When | What it does |
|---|---|---|
| **Study site CI** (`study-site-ci.yml`) | Every push or PR touching `cyber-study/` | Question-bank checks, generated files in sync, security lint, `npm audit`, browser smoke test. |
| **Study site deploy** (`study-site-deploy.yml`) | After CI passes on a push | Deploys to Cloudflare Pages. `main` → production; other branches → preview URL (hidden from search engines). Pull requests are never deployed with the token. |
| **Study site maintenance** (`study-site-maintenance.yml`) | Mondays + on demand | Updates one issue, "Study site maintenance report": exam details due for re-checking, weights to confirm, notices starting or ending in 30 days, security.txt expiry, and whether the official exam pages changed. |
| **Study site live check** (`study-site-live-check.yml`) | Daily + after each production deploy | Every page over HTTPS, http→https and www→apex redirects, HSTS/CSP/nosniff/frame headers, trusted TLS certificate with 14+ days left, TLS 1.0/1.1 refused. A failure fails the run and GitHub emails you. |
| **Study site Cloudflare settings** (`study-site-cloudflare.yml`) | Wednesdays + on demand | Checks the zone for drift: Always Use HTTPS, Full (strict) SSL, minimum TLS 1.2, TLS 1.3, HTTP/3, no 0-RTT, DNSSEC. Run manually with **apply** to fix. |
| **Dependabot** (`.github/dependabot.yml`) | Weekly | Security and version updates for the npm tools and all GitHub Actions. |
| **CodeQL** and **Secret Scan** (existing) | Pushes and PRs to `main` | Static analysis of the JavaScript and a scan for committed credentials, covering this folder too. |

Inside the site:

- **Updates reach visitors automatically.** Each build stamps `sw.js` with a hash of every
  page, script and data file. When anything changes, open pages show "New questions or fixes
  are ready. Update now".
- **Dated notices** (`notices` in a data file) show between their `from` and `until` dates,
  for example the Security+ SY0-801 preview and the CySA+ CS0-003 retirement, then disappear.
- **Offline study.** After the first visit every page, script, font and question bank is
  cached, so plans and quizzes work without a connection.

## HTTP/HTTPS and security

- **HTTPS only.** Cloudflare's Always Use HTTPS plus the Pages Function redirect every
  `http://` request (301). HSTS is sent with a two-year max-age. Set `"hstsPreload": true` and
  submit the domain at hstspreload.org only once you're sure every subdomain will stay on HTTPS.
- **One address.** `www.` and `<project>.pages.dev` redirect to the domain in
  `site.config.json`. Preview deployments stay reachable but carry `X-Robots-Tag: noindex`.
- **Headers** (`public/_headers`): Content-Security-Policy that allows only the site's own
  files, `frame-ancestors 'none'`, X-Frame-Options, nosniff, Referrer-Policy,
  Permissions-Policy, Cross-Origin-Opener/Resource-Policy.
- **No third parties.** Fonts are self-hosted (Public Sans, SIL OFL), so there are no Google
  Fonts requests, no analytics and no cookies.
- **security.txt** at `/.well-known/security.txt` points to GitHub private vulnerability
  reporting. The maintenance report reminds you 45 days before it expires.

## Free hosting now: GitHub Pages

Until the Cloudflare domain is set up, the site can run at `https://senayamyers27-art.github.io`,
which is installable on phones.

1. Create a **public** repository named exactly `senayamyers27-art.github.io` (empty, no README).
2. Grant the Claude GitHub App access to it, or create a fine-grained token limited to that
   repository with *Contents: Read and write* and save it here as the secret `PAGES_DEPLOY_TOKEN`.
3. **Study site to GitHub Pages** (`study-site-github-pages.yml`) then publishes `public/` there
   after every green CI run on `main`, adding `.nojekyll` so `/.well-known/` is served.

GitHub Pages can't send custom response headers, so the Content-Security-Policy comes from each
page's `<meta>` tag, HTTPS/HSTS come from github.io itself, and the `_headers`, `_redirects` and
Pages Function only apply on Cloudflare.

## Launch checklist

1. **Buy the domain** in Cloudflare: Domain Registration → Register Domains.
2. **Set it** in `site.config.json` (`"domain": "yourdomain.com"`), run `npm run build`, and commit.
   That fills in canonical URLs, the sitemap, robots.txt, security.txt and the redirect function.
3. **Create a Cloudflare API token** (My Profile → API Tokens) with *Account › Cloudflare Pages:
   Edit*. Add repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
   (GitHub → Settings → Secrets and variables → Actions). The next push to `main` deploys.
4. **Attach the domain**: Workers & Pages → `cyber-cert-study` → Custom domains → add the domain
   and `www.` Cloudflare issues the certificates.
5. **Zone settings token**: a second token with *Zone › Zone Settings: Edit* and *Zone › Zone: Read*
   (add *Zone: Edit* for DNSSEC), saved as `CLOUDFLARE_ZONE_TOKEN`, plus `CLOUDFLARE_ZONE_ID`
   (shown on the domain's Overview page). Run **Study site Cloudflare settings** with **apply** once.
6. **Turn on private vulnerability reporting**: GitHub → Settings → Code security, so the
   security.txt contact works.
7. Run **Study site live check** manually and confirm everything passes.

## Status of each certification

| Cert | Status | Notes |
|---|---|---|
| Security+ SY0-701 | Built, weights verified | 101 questions: the original 91 with their note sources, plus 10 Domain 5 |
| CySA+ CS0-004 | Built, weights verified | Objective numbers follow CS0-003; check against the CS0-004 PDF |
| CCNA 200-301 v2.0 | Built, weights verified | Exact topic numbers only where confirmed; others cite the section |
| SSCP | Built, weights verified | Sub-objective numbers from the earlier outline |
| Network+ N10-009 | Built, weights verified | 23/20/19/14/24, confirmed Sept 24, 2026 |
| ISC2 CC | Built, weights verified | Outline effective Sept 1, 2026 (24/17.3/20/21.3/17.3, rounded) |
| CISSP | Built, weights verified | 2024 outline, confirmed Sept 24, 2026 |

When you confirm a cert's details against the official outline, set `status: "verified"` and
update `lastVerified`. The maintenance report asks again after `reviewEveryDays` (180).

## Optional accounts (backend)

`api/` is a Cloudflare Worker with a D1 database that adds optional accounts: email sign-in
links (no passwords), progress sync between devices, a Pro plan through Stripe, and
organizations with cohorts, invite links and an instructor progress summary. The design is in
[docs/BACKEND_DESIGN.md](docs/BACKEND_DESIGN.md).

It is **off** until `apiOrigin` is set in `site.config.json`. While it's empty the site makes
no outside requests, shows no Account tab, and the policies say there are no accounts.

Try it locally (no Cloudflare, email or Stripe needed; sign-in links appear on the page):

```sh
npm run api:dev          # API at http://localhost:8787 (SQLite in memory)
npm run start:accounts   # site at http://localhost:8000 with the Account tab turned on
npm run test:api         # API and sync merge-rule tests (node:test)
npm run test:accounts    # browser test: sign-in, two-device sync, cohort, delete account
```

Turn it on for real (needs the site on its own domain, since the sign-in cookie only works
when the API is on the same site, for example `https://api.example.com` for `example.com`):

1. `npx wrangler d1 create cyber-cert-study` and save the id as secret `STUDY_API_D1_ID`.
2. Give `CLOUDFLARE_API_TOKEN` Workers Scripts, D1 and Workers Routes edit permissions.
3. Email: create a Resend account, verify the domain, save the key as `STUDY_API_EMAIL_KEY`.
4. Set `"apiOrigin": "https://api.<domain>"` in `site.config.json`, run `npm run build`, push.
   "Study site API deploy" applies migrations, deploys, and checks `/v1/health`.
5. Payments (later): add `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` secrets and
   `STRIPE_PRICE_PRO_MONTHLY` (and optionally `_YEARLY`, `STRIPE_PRICE_ORG_SEAT`) variables,
   and point a Stripe webhook at `https://api.<domain>/v1/stripe/webhook` for
   `checkout.session.completed`, `customer.subscription.*` and `invoice.payment_failed`.
   Until then the Pro section stays hidden.
6. Group pilot without billing: `npx wrangler d1 execute cyber-cert-study --remote --command
   "UPDATE orgs SET pilot_seats = 30 WHERE id = 'org_…'"`.

### Pro

Everything that's free today stays free. Pro (prices in `site.config.json` → `pro`, charged
amounts set in Stripe) adds, per certification: about 300 extra questions, full-length timed
exams at the real exam's length with a pass estimate, a score report (predicted score, weakest
domains and objectives, trend, readiness), flashcards with spaced repetition and a printable
study guide; plus capstone projects with grading rubrics in the lab library. Organization seats
include Pro.

The code is here (`public/assets/pro.js`, `engine.js`); the paid content lives in the private
`cyber-study-pro` repository, whose workflow uploads it to an R2 bucket that only the API reads,
for signed-in Pro members (`GET /v1/content/<cert-id>`, `/v1/content/capstones`). Without
`apiOrigin` there are no Pro prompts anywhere. Locally, `npm run api:dev` serves the small samples in
`api/test/fixtures/pro`; to try Pro, run it with `PRO_EMAILS=you@example.com` (and
`PRO_CONTENT_DIR=../../cyber-study-pro/content` for the real content).

The GitHub Pages copy (`*.github.io`) can't use accounts, because browsers block the cookie
across different sites. It keeps working as the free, local-only version.

PenTest+ and CEH are not on the site. Their domain weights are kept in `public/data/catalog.js`
(`CertHub.planned`) so they can be added back later with a data file.
