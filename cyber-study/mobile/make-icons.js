/* Source images for `npm run assets` (@capacitor/assets), drawn from the site's logo (../public/assets/icon.svg):
   a full-bleed square icon (the stores round the corners themselves), Android adaptive icon layers, and splash
   screens. Run: npm run assets (downloads the image tools for that run only; the results are committed). */
const fs = require("fs"), path = require("path"), sharp = require("sharp");
const svg = fs.readFileSync(path.join(__dirname, "../public/assets/icon.svg"), "utf8");
const BG = "#16202C", SPLASH = "#0E1319";
// The logo's shapes without its rounded background square.
const art = svg.replace(/<rect[^>]*\/>/, "");
const logo = (size, bg) => Buffer.from(art.replace("<svg ", `<svg width="${size}" height="${size}" `).replace(/(<svg[^>]*>)/, bg ? `$1<rect width="64" height="64" fill="${bg}"/>` : "$1"));
const out = f => path.join(__dirname, "assets", f);
(async () => {
  // Full icon: the art at 80% on the background.
  const inner = await sharp(logo(820)).png().toBuffer();
  await sharp({ create: { width: 1024, height: 1024, channels: 4, background: BG } }).composite([{ input: inner, gravity: "center" }]).png().toFile(out("icon-only.png"));
  // Android adaptive icon: foreground art inside the 66% safe zone, and a plain background.
  const fg = await sharp(logo(600)).png().toBuffer();
  await sharp({ create: { width: 1024, height: 1024, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: fg, gravity: "center" }]).png().toFile(out("icon-foreground.png"));
  await sharp({ create: { width: 1024, height: 1024, channels: 4, background: BG } }).png().toFile(out("icon-background.png"));
  // Splash: the icon, small, in the middle.
  const small = await sharp(Buffer.from(svg.replace("<svg ", '<svg width="560" height="560" '))).png().toBuffer();
  for (const f of ["splash.png", "splash-dark.png"])
    await sharp({ create: { width: 2732, height: 2732, channels: 4, background: SPLASH } }).composite([{ input: small, gravity: "center" }]).png().toFile(out(f));
  console.log("assets/: icon-only, icon-foreground, icon-background, splash, splash-dark");
})();
