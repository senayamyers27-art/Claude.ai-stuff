# Store listing: StudyToCert

Text and answers to paste into App Store Connect and Google Play Console. Keep them in step with the site's
Privacy Policy (https://www.studytocert.com/#privacy) and the app's behavior.

## Both stores

- **App name:** StudyToCert
- **Category:** Education
- **Support URL:** https://www.studytocert.com/#support
- **Privacy policy URL:** https://www.studytocert.com/#privacy
- **Marketing URL:** https://www.studytocert.com
- **Price:** Free

### Short description (Google Play, 80 characters max)

Free study plans for 46 IT, cloud and cybersecurity certifications. Works offline.

### Subtitle (App Store, 30 characters max)

IT & Security Cert Study Plans

### Description

StudyToCert turns 46 IT, cloud and cybersecurity certifications into week-by-week study plans you can follow on your phone, with or without a connection.

Pick a certification (CompTIA A+, Network+, Security+, CySA+, CISSP, CCNA, AWS, Azure, Google Cloud, Linux and more) and get:

• Short lessons for every exam objective, in English and Spanish
• Quizzes and timed checkpoint tests with an explanation for every wrong answer
• A practice exam weighted like the real one, and spaced review of what you miss
• Exam simulations (performance-based questions) and flashcards
• 106 hands-on lab guides, and practice Linux machines that run right in the app
• A dashboard with your readiness, exam countdowns and what's due today
• Daily study reminders, streaks and badges
• Career paths, pay outlook and interview practice

No ads. Your progress stays on your phone, and you can create a free account to sync it with the website.

Members with a Pro or Premium Pro plan can sign in to use it in the app.

### Keywords (App Store, 100 characters max)

comptia,security+,network+,a+,cissp,ccna,aws,azure,cybersecurity,it certification,exam prep,quiz

## App Store Connect

- **Age rating:** 4+ (no objectionable content). Answer "No" to every content question. Unrestricted web access: No (links open in Safari).
- **App Privacy ("nutrition label"):**
  - Data used to track you: **None**.
  - Data linked to you (only when someone creates an account): **Contact info: email address** (App functionality); **User content: study progress** (App functionality); **Identifiers: user ID** (App functionality).
  - Data not linked to you: none. No analytics or advertising SDKs are in the app.
- **Encryption:** the app uses only standard HTTPS, so it's exempt (Info.plist sets ITSAppUsesNonExemptEncryption to NO).
- **Sign-in required?** No. Everything free works without an account.
- **Review notes** (paste into "Notes" and fill in the account):

  > StudyToCert is a free study app; no account is needed for any free feature. To review signed-in features, open the menu → Log in, enter REVIEW_EMAIL, tap "Email me a sign-in code", then enter REVIEW_CODE. This review account has Premium Pro.
  > Paid plans (Pro and Premium Pro) are sold only on our website, studytocert.com, and are the same plans members use on the web (guideline 3.1.3(b) multiplatform services). The app does not sell anything. In the United States storefront, the Plans page has a button that opens our website to subscribe (guideline 3.1.1(a), US storefront). In other storefronts the app shows no prices, purchase buttons or links to buy.
  > The practice Linux machines run entirely on the device (an x86 emulator in the web view); they don't download or run code from the internet.

## Google Play Console

- **App content → Data safety:**
  - Data collected: **Email address** (Account management; optional, only with an account); **App activity: other user-generated content (study progress)** (App functionality; optional).
  - Is data shared with third parties? **No.**
  - Is data encrypted in transit? **Yes.**
  - Can users request deletion? **Yes**: Account page → Delete my account, or email support.
- **Ads:** No ads.
- **Target audience:** 13 and over (the site's accounts are for ages 13+).
- **Content rating:** complete the IARC questionnaire; answer "No" to everything (education app, no user-to-user chat).
- **App access:** "All or some functionality is restricted" → add instructions: menu → Log in → REVIEW_EMAIL → "Email me a sign-in code" → enter REVIEW_CODE.
- **Payments:** the app has no in-app purchases. In the US, the Plans page links to the website to subscribe. Check Google's current rules for linking out to web payments in the US before submitting (Play Console → Policy → "Payments") and enrol in the program Google requires, if any.

## Screenshots

`screenshots/iphone` (6.9"), `screenshots/ipad` (13") and `screenshots/android` (phone), made by
`node tools/app-screenshots.js`. Google Play also needs a 512 × 512 icon (`../assets/icon-only.png` resized) and a
1024 × 500 feature graphic.
