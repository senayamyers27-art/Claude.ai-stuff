#!/usr/bin/env node
/* Writes <id>/index.html for every certification that has a data file.
   Run from anywhere: node cyber-study/tools/make-pages.js */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

global.CertHub = { certs: {}, register(c) { this.certs[c.id] = c; } };
require(path.join(root, "data/catalog.js"));
const ids = CertHub.catalog.filter(id => fs.existsSync(path.join(root, "data", id + ".js")));
ids.forEach(id => require(path.join(root, "data", id + ".js")));

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const page = c => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(c.short)} ${esc(c.exam)} Study Plan</title>
<meta name="description" content="${esc(`Free ${c.name} ${c.exam} study plan: weekly topics, labs, quizzes, timed checkpoint tests and a weighted practice exam.`)}">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="theme-color" content="#EEF1F4">
<link rel="icon" href="../assets/icon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/style.css">
<script src="../assets/theme.js"></script>
<script src="../assets/core.js" defer></script>
<script src="../data/${c.id}.js" defer></script>
<script src="../assets/engine.js" defer></script>
</head>
<body data-cert="${c.id}">
<a class="skip" href="#app">Skip to content</a>
<header class="top">
  <div class="bar"><span class="brand"><a class="home" href="../" aria-label="All certifications">&larr; All</a><span class="name" id="brandname">${esc(c.short)} ${esc(c.exam)}</span></span><span class="right"><span class="count" id="count"></span><button class="theme" id="theme" type="button">Auto</button></span></div>
  <nav class="tabs" role="tablist" id="tabs" aria-label="Sections"></nav>
</header>
<main class="wrap" id="app"><noscript><p>This study plan needs JavaScript.</p></noscript></main>
</body>
</html>
`;
ids.forEach(id => {
  fs.mkdirSync(path.join(root, id), { recursive: true });
  fs.writeFileSync(path.join(root, id, "index.html"), page(CertHub.certs[id]));
  console.log("wrote", id + "/index.html");
});
