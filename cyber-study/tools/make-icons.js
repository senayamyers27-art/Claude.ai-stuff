#!/usr/bin/env node
/* Renders the PNG app icons phones need from the site's logo, using headless Chromium.
   Output: public/assets/icons/{icon-192,icon-512,maskable-512,apple-touch-icon}.png
   Run after changing the logo: node tools/make-icons.js */
const { chromium } = require("playwright");
const path = require("path"), fs = require("fs");
const OUT = path.join(__dirname, "..", "public", "assets", "icons");
// The logo's artwork, drawn on a full-bleed square. "pad" shrinks it to fit Android's
// maskable safe zone (the inner 80%) or iOS's rounded corners.
const art = `<path d="M10 38h44" stroke="#2D5BD0" stroke-width="6" stroke-linecap="round"/><circle cx="16" cy="38" r="6" fill="#fff" stroke="#2D5BD0" stroke-width="4"/><circle cx="32" cy="38" r="6" fill="#fff" stroke="#12806A" stroke-width="4"/><circle cx="48" cy="38" r="7" fill="#B57C00"/><path d="M18 22l6-6 6 6" stroke="#EEF1F4" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const svg = (rounded, pad) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${rounded ? `<rect width="64" height="64" rx="14" fill="#16202C"/>` : `<rect width="64" height="64" fill="#16202C"/>`}<g transform="translate(${32 - 32 * pad} ${29 - 29 * pad}) scale(${pad})">${art}</g></svg>`;
const ICONS = [
  ["icon-192.png", 192, svg(true, 1)],
  ["icon-512.png", 512, svg(true, 1)],
  ["maskable-512.png", 512, svg(false, 0.72)],
  ["apple-touch-icon.png", 180, svg(false, 0.86)]
];
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const exe = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  for (const [name, size, markup] of ICONS) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent(`<html><body style="margin:0;background:transparent">${markup.replace("<svg ", `<svg width="${size}" height="${size}" `)}</body></html>`);
    await page.screenshot({ path: path.join(OUT, name), omitBackground: true });
    await page.close();
    console.log("wrote", name);
  }
  await browser.close();
})();
