# Cyber Cert Study

A static study website with plans for several cybersecurity certifications. It grew out of the
Security+ Study Hub. Everything runs in the browser and progress is saved in `localStorage`.
There is no build step and no server.

```
cyber-study/
  index.html            home page: one card per certification
  <cert-id>/index.html  one study page per certification (generated, see below)
  assets/core.js        shared helpers: storage, plan builder, theme, backup/restore
  assets/engine.js      study page: week view, plan, quizzes, tests, review, progress
  assets/home.js        home page cards
  assets/style.css      Public Sans, cool grey, route-map styles, light and dark
  data/catalog.js       home page order and not-yet-built certifications
  data/<cert-id>.js     domains, weights, plan, study prompts, question bank
  tools/make-pages.js   writes <cert-id>/index.html for every data file
  _headers              security headers for Cloudflare Pages
```

## Run it locally

```sh
cd cyber-study
python3 -m http.server 8000
# open http://localhost:8000
```

## Add or change a certification

See [DATA_FORMAT.md](DATA_FORMAT.md). In short: write `data/<id>.js`, add the id to
`data/catalog.js`, run `node tools/make-pages.js`.

Plans are generated from the domain weights unless a data file has hand-written `weeks`
(Security+ keeps its original 16-week plan). The last week is always full practice exams and
review.

## Status of each certification (Sept 24, 2026)

| Cert | Status | Notes |
|---|---|---|
| Security+ SY0-701 | Built, weights verified | 91 questions, original 16-week plan and note sources kept |
| CySA+ CS0-004 | Built, weights verified | Objective numbers follow CS0-003; check against the CS0-004 PDF |
| CCNA 200-301 v2.0 | Built, weights verified | |
| SSCP | Built, weights verified | Sub-objective numbers are from the earlier outline; check against the PDF |
| Network+ N10-009 | Built | See the page's banner for verification status |
| ISC2 CC | Built, weights to confirm | Uses the outline ISC2 introduced Sept 1, 2026, based on search summaries of ISC2's announcement |
| PenTest+ PT0-003 | Not built | Listed with domain weights only |
| CEH v13 | Not built | Listed with domain weights only |
| CISSP | Built, weights to confirm | Weights match third-party summaries of the 2024 outline |

Official vendor sites couldn't be opened from the build environment, so "to confirm" means
exactly that: check the weights against the official outline and flip `status` to
`"verified"` in the data file.

## Deploy (Cloudflare)

1. **Domain.** Buy it in the Cloudflare dashboard under *Domain Registration → Register
   Domains*. Cloudflare Registrar sells at cost and sets up DNS for you.
2. **Pages project.** *Workers & Pages → Create → Pages → Connect to Git*, pick this
   repository and branch, then set:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: **cyber-study**
3. **Custom domain.** In the Pages project, *Custom domains → Set up a custom domain* and
   enter the domain (and `www.` if you want it). Cloudflare adds the DNS records.
4. Every push to the branch redeploys; other branches get preview URLs.

Note: this repository also holds the 11:Eleven site, and its GitHub Pages workflow publishes
the whole repository, so these pages are also reachable under `/cyber-study/` on that domain
until the study site gets its own repository or the workflow excludes this folder.

## Phase 2 (optional): a small backend

The Claude-hosted hub could read the "UTD Fullstack Cybersecurity" Drive folder and write new
questions from the notes. On a normal website that needs a backend so API keys never reach the
browser. A Cloudflare Worker on the same domain could:

- `GET /api/drive/changes`: list new or edited sections in the Drive folder (Google service
  account or OAuth, key stored as a Worker secret).
- `POST /api/questions/generate`: send a notes section to the Claude API and return
  validated questions in the same `[id, week, domain, q, options, answer, explanation, source]`
  shape, stored in D1 or KV.
- `GET/PUT /api/progress`: sync progress across devices, behind Cloudflare Access or a login.

The engine would then merge fetched questions into its bank the way it merges `data/<id>.js`.
