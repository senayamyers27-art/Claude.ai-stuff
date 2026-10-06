# Writing lessons

Every topic in a certification's study plan has a free lesson that teaches it. Lessons show up in the week view (under "This week's lessons") and on the Lessons tab. A learner should be able to read a week's lessons and then pass that week's quiz, do its labs and, in time, pass the real exam.

## File

`content/lessons/<cert-id>.js`, loaded only when someone opens that certification:

```js
/* Lessons for <Cert name> (<exam code>). One per plan topic; "t" must match the topic text exactly. */
CertHub.addLessons("<cert-id>", [
  {
    t: "Exact topic text copied from data/<cert-id>.js",
    body: [
      "Paragraph 1: what it is and why it matters, in plain language.",
      "Paragraph 2: how it works, step by step.",
      "Paragraph 3: the distinctions the exam tests (X vs Y, when to choose which).",
      "```python\nprint(7 // 2)  # 3\n```"
    ],
    terms: [["Term", "One-sentence definition."], ["Term 2", "..."], ["Term 3", "..."]],
    example: "A short real-world scenario that shows the idea at work.",
    tip: "The trap or distinction exam questions most often turn on.",
    check: [["A question the learner should now be able to answer?", "The answer, with the reason."], ["...", "..."]]
  }
]);
```

- **Match topics exactly.** Match the topic strings from the certification's data file:
  - Generated plans: `domains[].topics`.
  - Security+: `weeks[].topics`.
  - Skip topics that start with "Checkpoint test" and the final review week.
  - Copy each string character for character.
- **One lesson per topic,** in plan order, with no extras.
- **Body:** 3–8 paragraphs, 250–600 words in total (up to 10 paragraphs and about 1,100 words with the richer parts below).
  - Inline code goes in `` `backticks` ``.
  - A paragraph that starts with a fence line (a line of three backticks, optionally a language) is shown as a code block. Use real newlines (`\n`) inside it.
- **Terms:** at least 3 pairs.
- **Example:** at least 80 characters.
- **Tip:** at least 30 characters.
- **Check:** at least 2 question/answer pairs.
- **No links.** The About tab already lists official sources.

### Optional richer parts

A lesson can also have these fields (Security+ has all of them). Each shows in its own panel in the app and on the
lesson's web page:

- **`hook`**: a short opening scene (60–140 words) in second person, with a fictional organization and people, that
  shows why the topic matters. It also shows as a teaser on locked lessons.
- **`analogy`**: one everyday comparison for the hardest idea (40–120 words).
- **`mnemonic`**: a memory aid, only for a real list or order the exam expects. Leave it out rather than force one.
- **`mistakes`**: 2–5 `[wrong idea, correction]` pairs: the distractors learners actually fall for.
- **`tryit`**: 1–3 `[scenario, answer]` pairs: a decision for the learner, with the reasoning.

With these, the body can run to 10 paragraphs. No emoji or exclamation marks in any of them.

### Teacher edition

`content/teacher/<cert-id>.js` holds a lesson plan per lesson. It is never published: the API serves it only to
accounts whose profile says "Teacher or trainer" (the **Teacher edition** tab).

```js
CertHub.addTeacher("<cert-id>", [{
  t: "Exact lesson topic",
  objectives: ["Students will be able to ...", "..."],
  plan: [[5, "Warm-up", "..."], [15, "Teach", "..."], [15, "Activity", "..."], [5, "Discuss", "..."], [5, "Exit ticket", "..."]],
  warmup: "Opening prompt",
  activity: { title: "...", materials: "...", steps: ["...", "..."] },
  discussion: ["Question?"],
  exit: [["Question?", "Answer."], ["...", "..."]],
  differentiation: ["Support: ...", "Extend: ..."]
}]);
```

The plan's minutes must add up to 45.

`node tools/check-data.js` validates all of this and fails if any plan topic in a certification that has a lessons file lacks a lesson.

## How to write them

- **Teach; don't list.** Assume a motivated beginner who has done the earlier weeks. Define every acronym the first time it's used. Explain why, not only what.
- **Aim at the exam.** Cover the distinctions the vendor's objectives test, and use the exam's vocabulary.
- **Be accurate and durable.**
  - Prefer facts that don't change between exam versions.
  - Don't invent version numbers, prices, limits or product names.
  - When you aren't sure of a specific value, teach the concept without it.
- **Connect to practice.** Where it fits, mention what the learner will see in a lab: a command, a config line, a console screen.
- **Keep security content defensive.** Explain how an attack works well enough to recognize, detect and prevent it. Don't include working exploit payloads, malware code or step-by-step attack instructions against real systems.
- **Write in a plain, warm tone,** in second person where natural. Use no marketing language, emoji or exclamation marks.

## Diagrams

Teaching diagrams live in `public/data/diagrams.js` (`CertHub.addDiagrams([...])`). Each diagram has:

- an `id`
- a `title`
- a full `alt` text
- `topics`: `{ certId: [exact topic text] }`
- an inline `svg`

A diagram shows inside every lesson it's attached to, on that lesson's web page, and in the lesson's overview video.

The site's CSS colors the SVGs for light and dark mode, so they may only use these classes:

- `box` and `box hi`
- `ln` and `ln mute`
- `t`, `t s` and `t b`
- `acc` and `acc-ln`
- `arrow`

SVGs may not contain `fill`, `stroke`, `style`, links or scripts. `tools/check-data.js` enforces these rules.

## Lesson web pages and overview videos

`tools/build.js` writes a plain HTML page for every lesson at `/<cert>/lessons/<slug>/`, and adds each page to the sitemap. The overview video is built from the lesson itself: its first paragraph, key terms, a diagram, the example, the tip and a check question. The device's text-to-speech voice narrates it. So a well-written lesson gives both a good page and a good video.
