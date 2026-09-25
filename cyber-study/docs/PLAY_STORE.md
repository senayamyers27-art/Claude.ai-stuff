# Publishing the app on Google Play

The site is already an installable PWA: it has a manifest, icons, a service worker and offline support. To list it on Google Play, you wrap it in a **Trusted Web Activity (TWA)**. A TWA is a small Android app that opens the site full screen in Chrome, with no browser address bar. The app's content still comes from the website, so a site deploy updates the app too. You only rebuild the Android package when the icon, name or package settings change.

Some steps need your own accounts and signing keys, so only you can do them. The site side is ready: the build publishes `/.well-known/assetlinks.json` once you set `android` in `site.config.json`.

## Before you start

- **The site must be at the root of its domain.** `https://senayamyers27-art.github.io/` qualifies. A TWA checks `https://<domain>/.well-known/assetlinks.json`.
- **If you move to a custom domain later**, the Android app must be rebuilt for that domain. Choose your domain before you publish if you can.
- **Google Play Console developer account.** Registration has a one-time fee and needs identity verification.
- **Testing rule for new personal accounts.** Google has required a closed test (a set number of testers over a set number of days) before production access. Check the current rule in Play Console when you create the account.
- **Node.js and a Java JDK** on your computer, for Bubblewrap. Alternatively, use PWABuilder (pwabuilder.com), which builds the package in the browser.

## 1. Build the Android package

With Bubblewrap (Google's TWA tool):

```sh
npm i -g @bubblewrap/cli
mkdir cert-study-android && cd cert-study-android
bubblewrap init --manifest https://senayamyers27-art.github.io/manifest.webmanifest
```

1. **Answer the prompts.**
   - Package ID: pick one and never change it, for example `io.github.senayamyers27art.certstudy`.
   - App name: Cyber Cert Study.
   - Launcher name: Cert Study.
   - Theme colors: keep the manifest's colors.
   - Signing key: let Bubblewrap create one. **Back up the keystore file and its passwords.** Without them you can't publish updates.
2. **Build the package:** run `bubblewrap build`. This produces an `.aab` file, which is what you upload to Play, and an `.apk` for testing on your own phone.

## 2. Link the app and the site (Digital Asset Links)

Chrome only hides the address bar when the site says it trusts the app.

1. **Get the SHA-256 fingerprints.**
   - Play Console: open **Test and release → App integrity → App signing** and copy the **App signing key certificate** SHA-256 fingerprint. Play signs the build that users download with this key.
   - Your own test builds: run `keytool -list -v -keystore android.keystore` to get your upload key's SHA-256 fingerprint.
2. **Add both fingerprints** to `cyber-study/site.config.json`:
   ```json
   "android": {
     "package": "io.github.senayamyers27art.certstudy",
     "sha256": ["AB:CD:...:EF", "12:34:...:56"]
   }
   ```
3. **Rebuild and publish the site.** `node tools/build.js` writes `public/.well-known/assetlinks.json`, and the build fails if the package name or a fingerprint is malformed. The publish folder already has `.nojekyll`, so GitHub Pages serves `.well-known/`.
4. **Check the link:**
   - Open `https://senayamyers27-art.github.io/.well-known/assetlinks.json` in a browser and confirm it shows your package and fingerprints.
   - Install the test `.apk`. The app should open with no address bar.

## 3. Create the Play listing

In Play Console, create the app and fill in these:

- **Store listing:**
  - Short description (80 characters).
  - Full description.
  - 512×512 icon: `public/assets/icons/icon-512.png`.
  - 1024×500 feature graphic.
  - At least two phone screenshots.
- **App content:**
  - Privacy policy URL: `https://senayamyers27-art.github.io/privacy/`.
  - Data safety form. The free site stores progress only on the device. If Pro accounts are live, declare the email address used for sign-in and the synced progress.
  - Ads: none.
  - Target audience.
  - Content rating questionnaire.
- **Category:** Education.

Upload the `.aab` to a testing track first, then promote it to production once the testing rule is met.

## 4. Payments inside the app

If Pro is live (see `PRO_LAUNCH.md`), check Google Play's Payments policy before the app shows a way to buy Pro. Google generally requires Google Play Billing for digital content bought inside an Android app. Two common approaches:

- Hide the purchase button in the Android app. The app can tell it's running as a TWA because `document.referrer` starts with `android-app://`.
- Integrate Play Billing.

Free study content has no payment requirement.

## Updating the app

- **Content and code changes:** deploy the site as usual. The app picks up the changes on next launch.
- **Name, icon, colors or package settings:**
  1. Update `twa-manifest.json`.
  2. Run `bubblewrap update`, then `bubblewrap build`.
  3. Raise the version code.
  4. Upload the new `.aab`.
