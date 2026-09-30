#!/usr/bin/env node
/* Store screenshots of the app (mobile/www in app mode) at the sizes the stores ask for:
     mobile/store/screenshots/iphone/   1290 x 2796  (App Store: iPhone 6.9" display)
     mobile/store/screenshots/ipad/     2048 x 2732  (App Store: iPad 13" display)
     mobile/store/screenshots/android/  1080 x 1920  (Google Play: phone)
   Home, certifications, a study week, a quiz with its explanation, labs, games and the dashboard.
   Run: node mobile/build-www.js && node tools/app-screenshots.js */
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const { serve } = require("./serve");

const WWW = path.join(__dirname, "..", "mobile", "www");
const OUT = path.join(__dirname, "..", "mobile", "store", "screenshots");
const DEVICES = [
  ["iphone", { width: 430, height: 932, deviceScaleFactor: 3 }],
  ["ipad", { width: 1024, height: 1366, deviceScaleFactor: 2 }],
  ["android", { width: 360, height: 640, deviceScaleFactor: 3 }]
];
// Each shot: a name, the route, and what to do once it's there.
const SHOTS = [
  ["01-home", "#home", ".tiles .tile"],
  ["02-certifications", "#certifications", ".card"],
  ["03-study-week", "#security-plus", "#app h1", async p => { await p.waitForFunction(() => /^Week /.test(document.querySelector("#app h1").textContent)); }],
  ["04-quiz", "#security-plus", "#app h1", async p => { await p.waitForFunction(() => /^Week /.test(document.querySelector("#app h1").textContent)); await p.click("[data-act=weekly]"); await p.click(".opt >> nth=1"); await p.waitForSelector(".expl, .opt.right"); }],
  ["05-labs", "#labs", ".labgrid, .labcard, #app h1"],
  ["06-games", "#games", "#app h1"],
  ["07-dashboard", "#dashboard", "#app h1"]
];

(async () => {
  if (!fs.existsSync(path.join(WWW, "index.html"))) { console.error("Run `node mobile/build-www.js` first."); process.exit(1); }
  const server = await serve(8133, { root: WWW });
  const exe = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  for (const [dir, vp] of DEVICES) {
    fs.mkdirSync(path.join(OUT, dir), { recursive: true });
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.deviceScaleFactor, locale: "en-US", colorScheme: "light", reducedMotion: "reduce" });
    await ctx.addInitScript(() => {
      window.Capacitor = { isNativePlatform: () => true, getPlatform: () => "ios", Plugins: {} };
      try { localStorage.setItem("certhub:seen-news", "all"); } catch (e) {}
    });
    const page = await ctx.newPage();
    page.setDefaultTimeout(15000);
    for (const [name, route, sel, act] of SHOTS) {
      await page.goto(`http://localhost:8133/${route}`);
      await page.waitForSelector(sel);
      if (act) await act(page);
      // No floating Help button, toasts or badge pop-ups in the shots.
      await page.addStyleTag({ content: "#helpbtn,.toast,.fx-pop,.fx-confetti{display:none!important}" });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(OUT, dir, name + ".png") });
    }
    await ctx.close();
    console.log(`${dir}: ${SHOTS.length} screenshots at ${vp.width * vp.deviceScaleFactor} x ${vp.height * vp.deviceScaleFactor}`);
  }
  // Google Play: a 512 x 512 icon and a 1024 x 500 feature graphic, drawn from the site's logo.
  const logo = fs.readFileSync(path.join(__dirname, "..", "public", "assets", "icon.svg"), "utf8");
  const art = await browser.newPage({ viewport: { width: 1024, height: 500 } });
  await art.setContent(`<body style="margin:0;width:1024px;height:500px;background:#0E1319;display:flex;align-items:center;gap:48px;padding:0 80px;box-sizing:border-box;font-family:system-ui,sans-serif;color:#fff">
    <div style="width:220px;height:220px;flex:none">${logo.replace("<svg ", '<svg width="220" height="220" ')}</div>
    <div><div style="font-size:64px;font-weight:800;letter-spacing:-1px">StudyTo<span style="color:#6E95F0">Cert</span></div>
    <div style="font-size:30px;line-height:1.3;color:#C9D3DF;margin-top:12px">Free study plans for 46 IT, cloud and cybersecurity certifications</div></div></body>`);
  await art.screenshot({ path: path.join(OUT, "..", "feature-graphic.png") });
  await art.setViewportSize({ width: 512, height: 512 });
  await art.setContent(`<body style="margin:0;background:#16202C">${logo.replace("<svg ", '<svg width="512" height="512" ').replace(/rx="14"/, 'rx="0"')}</body>`);
  await art.screenshot({ path: path.join(OUT, "..", "play-icon-512.png") });
  console.log("feature-graphic.png (1024 x 500) and play-icon-512.png");
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
