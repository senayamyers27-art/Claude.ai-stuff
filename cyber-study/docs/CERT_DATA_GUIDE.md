# Writing a certification data file

Each certification is one file, `public/data/<cert-id>.js`, that calls `CertHub.register({...})`.
Use `public/data/network-plus.js` or `public/data/isc2-cc.js` as the model (generated plan: no
hand-written `weeks`; the site builds the weekly plan from the domains).

## Fields
| Field | Notes |
|---|---|
| `id` | The cert id you were given, e.g. `ccnp-encor` |
| `vendor`, `name`, `short`, `exam` | Official vendor, full name, short name (e.g. "ENCOR"), current exam code (e.g. "350-401 v1.2") |
| `blurb` | One sentence on what it covers and who it's for |
| `status` | `"verified"` ONLY if you read the domains and weights on the vendor's official page or PDF during this task; otherwise `"check"` |
| `statusNote` | What you confirmed and where, or what still needs checking (e.g. vendor publishes no weights, so weights are estimated from the number of objectives) |
| `lastVerified` | `"2026-09-24"` |
| `notices` | `[]`, or dated notices for announced retirements/new versions: `{ from, until, text }` (YYYY-MM-DD) |
| `examInfo` | `{ questions: "text", minutes: number, pass: "text" }` from the official page; use "Not published" if unknown |
| `examSim` | `{ questions: n, minutes: m }` for the full practice exam (real exam length; for performance-based exams like RHCSA/CKAD/CKA use a knowledge exam of about 60 questions in 90 minutes and say so in examInfo.extra) |
| `sources` | Official https links only (vendor exam page, objectives PDF) |
| `planWeeks` | 6–16 depending on exam size |
| `hoursPerWeek` | optional string like "6–8" |
| `domains` | `[{ id: 1.., name, w (integer %, all sum to exactly 100), topics: [8–12 concrete topic strings], notes: ["Objectives 1.1–1.5"], labs: [3 short hands-on exercises using free tools] }]` |
| `study` | `{ "1": [[question, answer], ...], ... }` — 4–6 open study questions per domain with concise answers |
| `questions` | 80–100 multiple-choice questions (see below) |

Weights: when the vendor gives ranges (e.g. Microsoft "25–30%"), use midpoints scaled to sum to
100 and say so in `statusNote`. When the vendor gives no weights, estimate from the objectives and
set `status: "check"`.

## Questions
`[id, 0, domainId, "question", ["A", "B", "C", "D"], answerIndex, "explanation", "objective ref"]`
- id: short prefix unique to this cert + number, e.g. `en1`, `en2` for ENCOR.
- Split across domains roughly by weight; 4 distinct options; one correct answer; no "all/none of the above".
- Balance answer positions (about 25% each of 0–3). Keep option lengths similar: the correct answer must
  not be the single longest option in more than about 35% of questions.
- 60% scenario, 40% knowledge; explanation says why the answer is right and why the tempting option is wrong.
- Original wording written from the official objectives. Never copy real exam questions or dumps.
- Accurate for the current exam version. Leave out anything you're unsure of.

## Checking
From `cyber-study/`: `node tools/check-data.js` must show no ✗ lines for your cert (it also checks
weights sum to 100, 4 distinct options, unique ids and stems). Only create your own data file.
