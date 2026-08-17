/* "Back" link on standalone pages (Privacy, Terms): return to wherever
   the visitor actually came from — the app, the marketing site, or
   whatever else linked here — instead of always going to index.html.
   Kept as an external file (not inline onclick) so it works under a
   strict script-src 'self' CSP with no unsafe-inline needed. */
document.addEventListener('DOMContentLoaded', () => {
  const link = document.querySelector('a.back');
  if (!link) return;
  link.addEventListener('click', (e) => {
    if (history.length > 1) {
      history.back();
      e.preventDefault();
    }
  });
});
