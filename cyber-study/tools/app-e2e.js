#!/usr/bin/env node
/* The iOS and Android apps' web layer in headless Chromium: the app's bundle (mobile/www, from
   `node mobile/build-www.js`) with a stand-in for Capacitor's native bridge, against a local copy of the API.
   Checks what differs from the website: no service worker or "Install App"; the store rules for paid plans
   (outside the US: no prices, buy buttons or links; in the US: a link to subscribe on the website); sign-in with
   the emailed code and a bearer token; reminders as phone notifications; and website-only pages opening in the
   browser. Run: npm run test:app */
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const { serve } = require("./serve");

const WWW = path.join(__dirname, "..", "mobile", "www");
if (!fs.existsSync(path.join(WWW, "index.html"))) { console.error("Run `node mobile/build-www.js` first."); process.exit(1); }
const SITE_PORT = 8131, API_PORT = 8791;
const BASE = `http://localhost:${SITE_PORT}`, API = `http://localhost:${API_PORT}`;
let failures = 0;
const check = (ok, msg) => { console.log(`  ${ok ? "✓" : "✗"} ${msg}`); if (!ok) failures++; };

// A stand-in for Capacitor's bridge: the plugins the app uses, recording what the page asks the phone to do.
const bridge = platform => {
  window.__calls = [];
  const rec = (plugin, method, result) => (...args) => { window.__calls.push({ plugin, method, args }); return Promise.resolve(typeof result === "function" ? result(...args) : result); };
  window.Capacitor = {
    isNativePlatform: () => true, getPlatform: () => platform,
    Plugins: {
      Browser: { open: rec("Browser", "open") },
      LocalNotifications: { requestPermissions: rec("LocalNotifications", "requestPermissions", { display: "granted" }), schedule: rec("LocalNotifications", "schedule", {}), cancel: rec("LocalNotifications", "cancel", {}) },
      Share: { share: rec("Share", "share", {}) },
      Filesystem: { writeFile: rec("Filesystem", "writeFile", a => ({ uri: "file:///cache/" + a.path })) },
      App: { addListener: rec("App", "addListener", {}) },
      SplashScreen: { hide: rec("SplashScreen", "hide") }
    }
  };
};

(async () => {
  const { start } = require("../api/dev-server.js");
  const api = await start({ port: API_PORT, siteOrigin: "https://site.example", env: { DEV_APP_ORIGIN: BASE, STRIPE_SECRET_KEY: "sk_test_app", STRIPE_PRICE_PRO_MONTHLY: "price_app_pro", STRIPE_PRICE_PREMIUM_MONTHLY: "price_app_prem" } });
  const site = await serve(SITE_PORT, { apiOrigin: API, root: WWW });
  const exe = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const errors = [];
  const open = async (locale, platform) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, locale });
    await ctx.addInitScript(bridge, platform);
    const page = await ctx.newPage();
    page.setDefaultTimeout(8000);
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    return { ctx, page, calls: () => page.evaluate(() => window.__calls) };
  };

  console.log("Outside the US (de-DE, Android)");
  {
    const { ctx, page, calls } = await open("de-DE", "android");
    await page.goto(BASE + "/");
    await page.waitForSelector(".tiles .tile");
    check(await page.evaluate(() => document.documentElement.classList.contains("native-app") && !!window.CertHubNative && !window.CertHubNative.webPurchase), "app mode is on, with no web purchase outside the US");
    check(await page.evaluate(() => navigator.serviceWorker.getRegistrations().then(r => r.length === 0)), "no service worker");
    check(!(await page.$(".installcard a[href='#install']")), "no \"Install App\" card");
    await page.goto(BASE + "/#plans"); await page.waitForSelector(".plancards");
    const plans = await page.textContent("#app");
    check(!/\$\d/.test(plans) && !(await page.$("[data-aact=upgrade], [data-aact=webplans], [data-aact=portal]")) && !/studytocert\.com/i.test(plans), "Plans shows no prices, buy buttons or website links");
    check(/Sign in to use it/.test(plans), "Plans tells members to sign in to use their plan");

    await page.goto(BASE + "/#login"); await page.waitForSelector("#signin-form");
    check(!(await page.$(".socialbtn, [data-aact=passkey-signin]")) && /sign-in code/i.test(await page.textContent("#signin-form")), "sign-in offers the emailed code only");
    await page.fill("#signin-email", "app-user@example.com");
    await page.click("#signin-form button[type=submit]");
    await page.waitForSelector("#signin-code");
    const code = (await page.textContent("#code-form code")).trim();
    check(/^[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code), `a code is sent (${code})`);
    await page.fill("#signin-code", "ZZZZ-ZZZZ"); await page.click("#code-form button[type=submit]");
    await page.waitForFunction(() => /wrong|expired/i.test(document.querySelector("#signin-msg").textContent));
    check(true, "a wrong code is refused");
    await page.fill("#signin-code", code.toLowerCase()); await page.click("#code-form button[type=submit]");
    await page.waitForFunction(() => location.hash === "#profile");
    check(await page.evaluate(() => /^[0-9a-f]{64}$/.test(window.CertHubNative.token())), "signed in: the app keeps a session token");
    await page.goto(BASE + "/#account"); await page.waitForSelector("[data-aact=signout]");
    check(/app-user@example\.com/.test(await page.textContent("#app")), "the account page loads with the token (no cookie)");
    await page.click("[data-aact=signout]");
    await page.waitForFunction(() => !window.CertHubNative.token());
    check(true, "signing out forgets the token");

    // Pages can re-render once their data loads, so click by selector (re-found on each try), not by a saved handle.
    await page.goto(BASE + "/#security-plus.progress"); await page.waitForSelector("[data-act=reminder]");
    await page.click("[data-act=reminder]"); await page.waitForSelector("#nrm-time");
    await page.fill("#nrm-time", "07:30"); await page.click("[data-nrm=ok]");
    await page.waitForFunction(() => window.__calls.some(c => c.method === "schedule"));
    const s = (await calls()).find(c => c.method === "schedule").args[0].notifications[0];
    check(s.schedule.on.hour === 7 && s.schedule.on.minute === 30, "the daily reminder is a phone notification at the chosen time");

    await page.goto(BASE + "/#careers"); await page.waitForSelector('a[href^="/compare/"]');
    const cmp = page.locator('a[href^="/compare/"]').first();
    const href = await cmp.getAttribute("href");
    await cmp.click();
    await page.waitForFunction(() => window.__calls.some(c => c.plugin === "Browser"));
    const url = (await calls()).filter(c => c.plugin === "Browser").pop().args[0].url;
    check(url === "https://www.studytocert.com" + href && await page.evaluate(() => location.pathname === "/"), "website-only pages open in the browser, not in the app");
    await ctx.close();
  }

  console.log("In the US (en-US, iOS)");
  {
    const { ctx, page, calls } = await open("en-US", "ios");
    await page.goto(BASE + "/#plans"); await page.waitForSelector(".plancards");
    const btn = await page.$("[data-aact=webplans]");
    check(!!btn && !(await page.$("[data-aact=upgrade]")), "Plans links to the website instead of starting a payment in the app");
    if (btn) {
      await btn.click();
      await page.waitForFunction(() => window.__calls.some(c => c.plugin === "Browser"));
      check((await calls()).find(c => c.plugin === "Browser").args[0].url === "https://www.studytocert.com/#plans", "the link opens studytocert.com/#plans in the browser");
    }
    await ctx.close();
  }

  const real = errors.filter(e => !/Failed to load resource/.test(e));
  check(real.length === 0, "no JavaScript errors" + (real.length ? ":\n    " + [...new Set(real)].join("\n    ") : ""));
  await browser.close(); site.close(); api.server.close();
  console.log(failures ? `\n${failures} app check(s) failed.` : "\nAll app checks passed.");
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
