/* Home page: one card per certification with its domain mix and your progress. */
(function () {
  const { U, certs, loadProgress, buildPlan } = CertHub;
  const { $, esc, dc } = U;

  function load(id) {
    return new Promise(res => {
      const s = document.createElement("script");
      s.src = `data/${id}.js`;
      s.onload = s.onerror = res;
      document.head.appendChild(s);
    });
  }

  function card(id) {
    const c = certs[id] || CertHub.planned[id];
    if (!c) return "";
    const built = !!certs[id];
    const stack = `<div class="stack" aria-hidden="true">${c.domains.map(d => `<i style="--c:${dc(d.id)};flex:${d.w}"></i>`).join("")}</div>`;
    const badge = c.status === "verified" ? `<span class="badge ok">Weights verified</span>` : `<span class="badge check">Weights to confirm</span>`;
    let foot;
    if (built) {
      const p = loadProgress(id);
      const s = Object.values(p.stats).reduce((a, x) => ({ c: a.c + x.c, t: a.t + x.t }), { c: 0, t: 0 });
      const weeks = buildPlan(c).weeks.length;
      const days = Object.values(p.checks).filter(Boolean).length;
      foot = `<span>${weeks} weeks · ${c.questions.length} questions</span><span>${s.t ? `${Math.round(100 * s.c / s.t)}% of ${s.t} answered` : days ? `${days} days checked` : "Not started"}</span>`;
    } else {
      foot = `<span>Study plan not written yet</span>`;
    }
    const inner = `<span class="vendor">${esc(c.vendor)} · ${esc(c.exam)}</span>
      <h2>${esc(c.name)}</h2>
      <p>${esc(c.blurb)}</p>
      ${stack}
      <div class="cardfoot">${badge}${foot}</div>`;
    return built
      ? `<a class="card" href="${id}/">${inner}</a>`
      : `<div class="card" aria-disabled="true" style="opacity:.7">${inner}</div>`;
  }

  async function boot() {
    CertHub.themeButton();
    const ids = CertHub.catalog.filter(id => !CertHub.planned[id]);
    await Promise.all(ids.map(load));
    $("#cards").innerHTML = CertHub.catalog.map(card).join("");
    $("#exp").addEventListener("click", CertHub.exportAll);
    $("#imp").addEventListener("change", e => {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      CertHub.importAll(f, (err, n) => {
        $("#datamsg").textContent = err ? err.message : `Restored ${n} saved item${n === 1 ? "" : "s"}.`;
        if (!err) $("#cards").innerHTML = CertHub.catalog.map(card).join("");
      });
    });
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
