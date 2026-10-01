# Text-message sign-in codes (Twilio)

A backup way in for people who can't get to their email. Someone signed in adds a mobile number on their profile
(confirmed with a texted code). After that, the login page's **Can't get to your email? Log in another way** offers
**Or get a code by text**: they enter their email address and a 6-digit code goes to that number.

The code is all in place (`api/src/sms.js`). The option stays hidden until Twilio is connected.

## What protects it

- Codes are 6 digits, work once, expire in 10 minutes and allow 5 guesses. Only a hash is stored.
- A number is saved only after its owner types the code sent to it, and the account owner gets an email when one is added.
- The login form asks for the email address, not the phone number, and answers the same way whether or not the
  address has an account or a number.
- Texts go only to US and Canadian numbers (country code 1) unless you set the `STUDY_API_SMS_COUNTRIES` variable,
  because paid texts to some countries are a common target for fraud.
- Limits: 5 texts an hour per address, per number and per account, 10 an hour per network, and 300 a day in total
  (change with the Worker variable `SMS_DAILY_LIMIT`).

## Set it up

1. **Create a Twilio account** at <https://www.twilio.com/try-twilio> and upgrade it (add a payment method).
   Trial accounts can only text numbers you've verified yourself.
2. **Get a number that's allowed to send texts in the US.** Carriers block unregistered business texts, so pick one:
   - **Toll-free number (simplest for a small site):** Phone Numbers → Buy a number → Toll-free, then submit
     **Toll-free verification** (Messaging → Regulatory compliance). Describe the use as "one-time sign-in codes
     for StudyToCert accounts, sent only when the account owner asks for one". Approval usually takes a few days.
   - **Local 10-digit number:** needs **A2P 10DLC** registration (a brand plus a campaign of type
     "2FA / account notifications"). Takes longer and has registration fees.
3. **Note three values** from the Twilio console: the **Account SID** (starts with `AC`), the **Auth Token**, and
   your number in `+1XXXXXXXXXX` form. (Using a Messaging Service instead of a single number? Note its SID, starting
   with `MG`.)
4. **Add them to GitHub**, never to chat or a file: repository → **Settings → Secrets and variables → Actions →
   New repository secret**:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_FROM` (the number), or `TWILIO_MESSAGING_SERVICE_SID` instead
5. Run **Actions → Study site API deploy → Run workflow**. When it's green, the profile shows **Add a mobile number**
   and the login page shows the text-message option.

## Cost

Twilio charges for the number each month and a small amount per text, plus carrier fees. Check
<https://www.twilio.com/en-us/sms/pricing/us>. Texts are only sent when someone asks for a code, and the daily cap
above limits the worst case.

## Turning it off

Delete the `TWILIO_*` secrets in GitHub and in Cloudflare (Workers & Pages → cyber-cert-study-api → Settings →
Variables and Secrets), then redeploy. Numbers people saved stay on their accounts but no texts are sent.
