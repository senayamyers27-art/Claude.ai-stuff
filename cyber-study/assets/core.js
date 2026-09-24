/* Shared helpers for the home page and every certification page. */
(function () {
  const DAY = 86400000;
  const certs = {};

  const U = {
    DAY,
    $: s => document.querySelector(s),
    esc: s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])),
    today() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; },
    iso(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; },
    parseD(s) { const [y, m, d] = String(s).split("-").map(Number); return new Date(y, m - 1, d); },
    addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; },
    fmt: d => d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    fmtLong: d => d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
    shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
    nextMonday(d) { const x = new Date(d); const k = (8 - x.getDay()) % 7 || 7; x.setDate(x.getDate() + k); return x; },
    dc: n => n ? `var(--d${((n - 1) % 9) + 1})` : "var(--d0)"
  };

  /* ---------- storage (every read and write may throw in private mode) ---------- */
  const KEY = id => "certhub:v1:" + id;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    keys() { try { return Object.keys(localStorage).filter(k => k.startsWith("certhub:")); } catch (e) { return []; } }
  };
  function freshProgress() { return { checks: {}, stats: {}, review: {}, history: [], start: null, examDate: null }; }
  function loadProgress(id) {
    const p = freshProgress();
    try { const raw = store.get(KEY(id)); if (raw) Object.assign(p, JSON.parse(raw)); } catch (e) {}
    return p;
  }
  function saveProgress(id, p) { return store.set(KEY(id), JSON.stringify(p)); }

  /* ---------- plan ---------- */
  // Hand-written weeks are used as-is. Otherwise the last week is a final review and the
  // rest are spread across domains by weight (largest remainder, at least one each).
  function allocate(domains, n) {
    const total = domains.reduce((a, d) => a + d.w, 0) || 1;
    const k = domains.length;
    if (n <= k) return domains.map(() => 1);
    const raw = domains.map(d => 1 + (n - k) * d.w / total);
    const out = raw.map(Math.floor);
    let left = n - out.reduce((a, b) => a + b, 0);
    raw.map((r, i) => [r - Math.floor(r), i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { out[i]++; left--; } });
    return out;
  }
  function split(arr, parts) {
    arr = arr || [];
    const out = [];
    for (let i = 0; i < parts; i++) out.push(arr.slice(Math.floor(i * arr.length / parts), Math.floor((i + 1) * arr.length / parts)));
    return out;
  }
  function buildPlan(c) {
    if (c.weeks) {
      return {
        weeks: c.weeks.map((w, i) => ({ n: i + 1, ...w })),
        checkpoints: c.checkpoints || [],
        phases: c.phases || [[1, c.weeks.length, "Plan"]]
      };
    }
    const total = Math.max(c.planWeeks || 12, c.domains.length + 1);
    const counts = allocate(c.domains, total - 1);
    const weeks = [], checkpoints = [], phases = [];
    c.domains.forEach((d, di) => {
      const k = counts[di];
      const topics = split(d.topics, k), study = split((c.study || {})[d.id], k);
      const first = weeks.length + 1;
      for (let j = 0; j < k; j++) {
        const labs = d.labs || [];
        weeks.push({
          n: weeks.length + 1,
          dom: d.id,
          title: k > 1 ? `${d.name} (${j + 1} of ${k})` : d.name,
          obj: (d.notes && d.notes[0]) || `Domain ${d.id}`,
          topics: topics[j].length ? topics[j] : d.topics || [],
          notes: d.notes || [],
          lab: labs.length ? labs[j % labs.length] : "Summarize this week's topics in your own words on one page.",
          study: study[j] || [],
          checkpoint: j === k - 1
        });
      }
      checkpoints.push({ after: weeks.length, dom: d.id });
      phases.push([first, weeks.length, `Domain ${d.id}: ${d.name}`]);
    });
    const f = c.final || {};
    weeks.push({
      n: weeks.length + 1, dom: 0,
      title: "Full practice exams and final review",
      obj: "All domains",
      topics: f.topics || [
        `Two full timed practice exams (${c.examSim.questions} questions, ${c.examSim.minutes} minutes)`,
        "Review every miss, then re-quiz until the review queue is empty",
        "Re-drill your weakest domain from the Progress tab",
        "Exam logistics: ID, check-in rules, time budget per question"
      ],
      notes: ["All domains", "Your review queue and weakest domain"],
      lab: f.lab || "Target 85% or better on both practice exams before you book the real one.",
      study: f.study || []
    });
    phases.push([weeks.length, weeks.length, "Final review"]);
    return { weeks, checkpoints, phases };
  }

  /* ---------- theme ---------- */
  const THEMES = ["auto", "light", "dark"];
  function applyTheme(t) {
    const root = document.documentElement;
    if (t === "light" || t === "dark") root.setAttribute("data-theme", t); else root.removeAttribute("data-theme");
  }
  function themeButton() {
    const b = document.getElementById("theme");
    if (!b) return;
    const cur = () => store.get("certhub:theme") || "auto";
    const label = () => { b.textContent = { auto: "Auto", light: "Light", dark: "Dark" }[cur()]; b.setAttribute("aria-label", `Color theme: ${b.textContent}. Change theme`); };
    label();
    b.addEventListener("click", () => {
      const next = THEMES[(THEMES.indexOf(cur()) + 1) % THEMES.length];
      store.set("certhub:theme", next); applyTheme(next); label();
    });
  }

  /* ---------- backup (progress lives only in this browser) ---------- */
  function exportAll() {
    const data = {};
    store.keys().forEach(k => { data[k] = store.get(k); });
    const blob = new Blob([JSON.stringify({ app: "certhub", v: 1, at: new Date().toISOString(), data }, null, 1)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cert-study-progress-${U.iso(new Date())}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  function importAll(file, done) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const j = JSON.parse(r.result);
        if (j.app !== "certhub" || typeof j.data !== "object") throw new Error("Not a progress backup from this site.");
        let n = 0;
        Object.entries(j.data).forEach(([k, v]) => { if (k.startsWith("certhub:") && typeof v === "string") { store.set(k, v); n++; } });
        done(null, n);
      } catch (e) { done(e); }
    };
    r.onerror = () => done(new Error("Couldn't read that file."));
    r.readAsText(file);
  }

  window.CertHub = {
    U, store, certs, buildPlan, loadProgress, saveProgress, freshProgress, applyTheme, themeButton, exportAll, importAll,
    register(c) { certs[c.id] = c; }
  };
})();
