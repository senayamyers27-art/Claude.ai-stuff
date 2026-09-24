# Certification data files

Each certification is one file in `public/data/<id>.js` that calls `CertHub.register({...})`.
The shared engine (`assets/engine.js`) turns it into a study page with a plan, weekly
quizzes, timed checkpoint tests, a practice exam, spaced review and progress by domain.

To add a certification: write `public/data/<id>.js`, add the id to `public/data/catalog.js`,
then run `npm run build` (creates `public/<id>/index.html` and updates the sitemap and
service worker), `npm run check` and `npm test`.

## Fields

```js
CertHub.register({
  id: "cysa-plus",                 // matches the file name and the page folder
  vendor: "CompTIA",
  name: "CompTIA CySA+",
  short: "CySA+",                  // used in the header and quiz titles
  exam: "CS0-004",
  blurb: "One sentence for the home page card.",

  // "verified": weights checked against the official outline (say when in statusNote)
  // "check":    weights not yet confirmed; the page shows a warning banner
  status: "verified",
  statusNote: "Weights verified Sept 24, 2026. CS0-003 retires Nov 22, 2026.",
  lastVerified: "2026-09-24",      // when exam details were last checked; the weekly
                                   // maintenance report asks again after reviewEveryDays

  // Dated banners, shown only between from and until (both optional, YYYY-MM-DD)
  notices: [{ from: "2026-09-24", until: "2026-11-22", text: "CS0-003 retires Nov 22, 2026." }],

  examInfo: { questions: "Max 85", minutes: 165, pass: "750 on a 100–900 scale" },
  examSim:  { questions: 85, minutes: 165 },   // practice exam size and time limit
  sources:  [{ label: "Official exam objectives", url: "https://..." }],

  // Plan: either hand-written `weeks` (see security-plus.js) or generated from domains.
  planWeeks: 12,                   // total weeks INCLUDING the final review week
  start: "2026-09-28",             // optional; otherwise the Monday after first visit
  examDate: "2026-12-21",          // optional; otherwise start + planWeeks weeks

  domains: [
    {
      id: 1,
      name: "Security operations",
      w: 34,                       // exam weight in percent; all domains sum to 100
      topics: ["...", "..."],      // 6–12 items taken from the official objectives
      notes: ["Objectives 1.1–1.5"], // what to reread (objective numbers, notes docs)
      labs: ["...", "..."]         // hands-on tasks; one used per week of this domain
    }
  ],

  // Open study prompts per domain id: [prompt, model answer]
  study: { 1: [["prompt", "answer"]] },

  // Optional overrides for the generated final review week
  final: { topics: ["..."], lab: "..." },

  // [id, week, domain, question, [4 options], answer index 0–3, explanation, source]
  // week = 0 lets the engine place the question by domain.
  questions: [
    ["cy1", 0, 1, "Question?", ["A", "B", "C", "D"], 2, "Why C is right.", "Objective 1.2"]
  ]
});
```

## Plan generation

When `weeks` is absent, the engine gives the last week to full practice exams and review,
then spreads the remaining weeks across domains by weight (largest remainder, at least one
week each), in the order the domains are listed. Each domain's topics, labs and study
prompts are split across its weeks, and a timed checkpoint test closes each domain.

## Content rules

- Ground every question in the official exam objectives (or Senaya's bootcamp notes).
  Put the objective number or note name in the source field.
- Exactly four options, one clearly best answer, scenario style like the real exam.
- Options are shuffled at quiz time, but still vary the stored answer index.
