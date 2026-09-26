/* Runs in <head> before anything else on the page.
   1. Trusted Types (the CSP requires them): every HTML string the app writes into the page goes through this one
      policy, which refuses real <script>, <iframe>, <object>-style tags, event-handler attributes and javascript:
      URLs, and scripts and workers may only load from this site. Escaped text (&lt;...&gt;) is never affected.
   2. A saved light/dark or accent choice is applied before paint, so it never flashes.
   3. A ?lang=es or ?lang=en link (from the Spanish lesson pages) sets the interface language, then the parameter is removed. */
try {
  if (window.trustedTypes && trustedTypes.createPolicy && !trustedTypes.defaultPolicy) {
    var DANGER = /<\s*\/?\s*(script|iframe|frame|frameset|object|embed|base|meta|link)\b|<[a-z][^>]*\son[a-z]+\s*=|<[a-z][^>]*\s(href|src|action|formaction|xlink:href)\s*=\s*["']?\s*(javascript|vbscript|data:text\/html)/i;
    var refuse = function (what, s) { var e = new TypeError("Blocked unsafe " + what); console.error(e.message, String(s).slice(0, 200)); throw e; };
    trustedTypes.createPolicy("default", {
      createHTML: function (s) { return DANGER.test(s) ? refuse("HTML", s) : s; },
      createScriptURL: function (u) { var x = new URL(u, location.href); return x.origin === location.origin || x.protocol === "blob:" ? u : refuse("script URL", u); },
      createScript: function (s) { return refuse("dynamic script", s); }
    });
  }
} catch (e) {}
try {
  var q = /[?&]lang=(es|en)\b/.exec(location.search);
  if (q) { localStorage.setItem("certhub:lang", q[1]); history.replaceState(null, "", location.pathname + location.search.replace(/([?&])lang=(es|en)\b&?/, "$1").replace(/[?&]$/, "") + location.hash); }
  var t = localStorage.getItem("certhub:theme"); if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  var a = localStorage.getItem("certhub:accent"); if (/^(green|purple|rose|amber|classic)$/.test(a || "")) document.documentElement.setAttribute("data-accent", a);
} catch (e) {}
