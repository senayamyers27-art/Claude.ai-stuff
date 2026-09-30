# StudyToCert on the App Store and Google Play

The apps are the study site bundled into a native shell ([Capacitor](https://capacitorjs.com)), in
`cyber-study/mobile/`. Everything free works offline with no account. The apps add phone features on top:

- **Study reminders** as phone notifications ("Set a daily reminder" on a study plan or the Progress tab);
- **Share sheet** for sharing scores and saving backups, calendar files and CSVs;
- **Sign-in with a code** from the sign-in email (the app can't open the emailed link), kept as a token on the phone;
- the **Android back button**, and links to website-only pages (comparisons, policies) opening in the browser.

## Paid plans in the apps

- Plans are sold **only on the website** (Stripe). The apps sell nothing, so neither store takes a cut.
- Members **sign in** in the app to use Pro or Premium Pro (App Store guideline 3.1.3(b), multiplatform services).
- **United States** (device region US): the Plans page shows **Subscribe at studytocert.com**, which opens the
  website. Apple allows this link in the US storefront. Google Play has been loosening its rules on links to web
  payments in the US, but may charge a fee for them: check its current terms before you submit.
- **Everywhere else**: the app shows **no prices, buy buttons or links** to buy. It shows your current plan, and
  "Have a Pro or Premium Pro plan? Sign in to use it in the app."
- The region comes from the phone's language setting (for example English (US)). That usually matches the store
  country but not always. If a reviewer asks, the rule is in `public/assets/native.js` (`webPurchase`).

## What you need (one time)

1. **Apple Developer Program**: $99 a year. Sign up at developer.apple.com/programs with your Apple ID. As an
   individual it's quick; as a company (shows the company name in the store) you need a D-U-N-S number.
2. **Google Play Console**: $25 once, at play.google.com/console. New personal accounts must run a **closed test
   with at least 12 testers for 14 days** before they can publish to everyone. An organization account skips
   this but needs a D-U-N-S number.
3. **The accounts API live** (docs/PRO_LAUNCH.md). The apps work without it, but sign-in and paid plans need it.
   After `apiOrigin` is set, rebuild the apps so they know where the API is.

## Google Play

1. **Make an upload key** (once; keep the file and passwords safe, you need them for every update). On your Mac:
   `keytool -genkeypair -v -keystore upload.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload`
   It asks for a password; use the same one for the key when asked.
2. In GitHub → Settings → Environments, create **study-mobile** and add these secrets:
   - `ANDROID_KEYSTORE_BASE64`: the output of `base64 -i upload.jks`;
   - `ANDROID_KEYSTORE_PASSWORD` and `ANDROID_KEY_PASSWORD`: the password;
   - `ANDROID_KEY_ALIAS`: `upload`.
3. Actions → **Study site mobile apps** → Run workflow → platform **android**. Download the artifact; it has
   `studytocert.aab`.
4. In Play Console, **Create app**: name StudyToCert, app, free. Fill **App content** and **Store listing** from
   `mobile/store/listing.md`, and add the screenshots, `feature-graphic.png` and `play-icon-512.png` from
   `mobile/store/`.
5. **Test and release → Closed testing**: create a track, upload the `.aab`, add testers, and roll out. Play App
   Signing is on by default: Google keeps the app signing key, and your upload key only proves updates come from
   you.
6. After the test period, **Production** → create a release with the same (or a newer) `.aab` → send for review.

## App Store

1. In **App Store Connect** (appstoreconnect.apple.com):
   - **Apps → + → New App**: iOS, name StudyToCert, language English (U.S.), bundle ID **com.studytocert.app**
     (register it first under Certificates, Identifiers & Profiles → Identifiers if it isn't offered), SKU
     `studytocert`.
   - **Users and Access → Integrations → App Store Connect API → Team Keys → +**: name "GitHub", access
     **App Manager**. Download the `.p8` file (only once), and note the **Key ID** and the **Issuer ID**.
2. In the GitHub **study-mobile** environment add:
   - secrets `APP_STORE_CONNECT_KEY_ID`, `APP_STORE_CONNECT_ISSUER_ID`, and `APP_STORE_CONNECT_KEY` (the whole
     `.p8` file, including the BEGIN and END lines);
   - variable `APPLE_TEAM_ID`: 10 characters, from developer.apple.com → Account → Membership details.
3. Actions → **Study site mobile apps** → Run workflow → platform **ios**. The run builds, signs and uploads
   the app. After 10–30 minutes it shows under **TestFlight**. Install **TestFlight** on your iPhone to try it.
4. Fill the app's page from `mobile/store/listing.md`: App Privacy, age rating, description, keywords, and the
   screenshots in `mobile/store/screenshots/iphone` and `ipad`.
5. Pick the build, add the review notes (with the review account below), and **Submit for Review**.

## Review account

Both stores need a way to see signed-in features.

1. Choose an address you control (for example `review@studytocert.com`) and make a random 8-character code on
   your Mac: `LC_ALL=C tr -dc '23456789ABCDEFGHJKMNPQRSTUVWXYZ' </dev/urandom | head -c 8; echo`
   Run it again if the result has no digit. The server switches the review account off if the code is weak (no
   digit or no letter, fewer than 6 different characters, or words like REVIEW, STUDY, 1234).
2. Add them as GitHub secrets `APP_REVIEW_EMAIL` and `APP_REVIEW_CODE`, then run **Study site API deploy**.
3. Sign in once in the app with that address and code, so the account exists.
4. To let reviewers see Premium Pro, give the account a complimentary plan. In the Cloudflare dashboard → D1 →
   cyber-cert-study → Console, run this with the review account's user id (from the `users` table):
   `INSERT INTO subscriptions (stripe_subscription, stripe_customer, user_id, plan, status, seats, updated_at) VALUES ('comp_review', 'comp_review', '<user id>', 'premium', 'active', 1, 0);`
5. Put the address and code in the review notes. Remove the secrets (and delete that row) whenever you like.

## Updates

- **Content and fixes**: when the site changes, run the workflow again. Raise `"version"` in
  `mobile/package.json` for a new store version; the build number rises by itself.
- The apps don't update themselves from the website, so the stores always review what users get.
- Screenshots: `node mobile/build-www.js && node tools/app-screenshots.js`.
- Icons: `cd mobile && npm run assets` (from the site's logo).

## Working on the apps

- `npm run test:app` (in `cyber-study/`) builds the app's copy of the site and checks the app-only behavior in a
  browser with a stand-in for the phone: store rules for plans, code sign-in, reminders, links. CI runs it.
- To run on a device you need Android Studio or Xcode: `cd mobile && npm ci && npm run android` (or `npm run ios`
  on a Mac).
- The API accepts the apps' origins (`capacitor://localhost` on iOS, `https://localhost` on Android). App
  sign-in skips the Turnstile check (it can't run in an app) and has tighter limits instead: 3 codes per email and
  5 per address an hour.
- Sign-in codes are 8 random characters from 31 (no look-alikes such as 0/O or 1/I): about 853 billion possible
  codes. A code lasts 15 minutes and stops working after 5 wrong tries; each email address gets at most 10 tries an
  hour and 30 a day. Even guessing at that limit for a year gives about a 1 in 78 million chance.
