# Pro launch checklist

The code for accounts, progress sync and Pro is finished and tested:

- **Worker and database:** `api/` is the Cloudflare Worker, and `api/migrations/` holds the D1 database schema. Run `npm run test:api` to test the Worker.
- **Pro content:** the paid content lives in the private `cyber-study-pro` repository.
- **Deploy workflows:** `.github/workflows/` includes the API deploy, D1 backup and Cloudflare settings workflows.

What remains needs your accounts, payment details and secrets, so only you can do it. Work top to bottom. Every step is reversible until the last one, where you turn on payments.

## 1. Domain (required)

- **Why:** the sign-in cookie only works when the API is on the same site as the pages. A `*.github.io` address can't have an `api.` subdomain that you control, so Pro needs a custom domain.
- [ ] **Buy a domain.** Cloudflare Registrar sells at cost.
- [ ] **Add the domain to Cloudflare** as a zone.
- [ ] **Point the site at the new domain.** Set `"domain"` in `cyber-study/site.config.json` to it, then choose one host:
  - **Cloudflare Pages:** follow the "Study site Cloudflare" workflow notes.
  - **GitHub Pages:** the build writes the `CNAME` file for you.
- [ ] **Set `"apiOrigin"`** to `https://api.<your-domain>`.
- [ ] **Rebuild and publish.** Canonical links, the sitemap, link previews and structured data all switch to the new domain.
- [ ] **If you publish an Android app,** do it after this step (see `PLAY_STORE.md`).

## 2. Cloudflare (API, database, content storage)

- [ ] **Create an API token** under My Profile → API Tokens with these permissions:
  - Workers Scripts: Edit
  - D1: Edit
  - Workers Routes: Edit
  - Workers R2 Storage: Edit
- [ ] **Create the database:** run `npx wrangler d1 create cyber-cert-study` and note the database id.
- [ ] **Create the R2 bucket:** run `npx wrangler r2 bucket create cyber-cert-study-content`.
- [ ] **In this repository** (Settings → Secrets and variables → Actions), add:
  - Secrets:
    - `CLOUDFLARE_API_TOKEN`
    - `CLOUDFLARE_ACCOUNT_ID`
    - `STUDY_API_D1_ID`
  - Variable: `STUDY_API_R2_BUCKET` = `cyber-cert-study-content`
- [ ] **In the private `cyber-study-pro` repository**, add:
  - Secrets: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
  - Variable: `R2_BUCKET` = `cyber-cert-study-content`
- [ ] **Upload the Pro content:** push to `main` in `cyber-study-pro` and check that "Upload Pro content" goes green.

## 3. Sign-in email

- [ ] **Create a Resend account** (or another supported provider) and verify your domain for sending.
- [ ] **Add the secret** `STUDY_API_EMAIL_KEY`.
- [ ] **Add the variable** `STUDY_API_EMAIL_FROM`, for example `StudyToCert <signin@your-domain>`.

## 4. Stripe (payments)

1. [ ] **Create the account.** Set up a Stripe account and finish business verification. Work in **test mode** first.
2. [ ] **Create products.** Make a product "StudyToCert Pro" with a monthly price and a yearly price. `site.config.json` shows $7 and $49; change both places if you choose other prices. Optionally add a per-seat price for group licenses.
3. [ ] **Add the price ids as variables:**
   - `STRIPE_PRICE_PRO_MONTHLY`
   - `STRIPE_PRICE_PRO_YEARLY`
   - `STRIPE_PRICE_ORG_SEAT` (optional)
4. [ ] **Add the secret key.** Add `STRIPE_SECRET_KEY` as a secret. Use a restricted key if you can.
5. [ ] **Create the webhook.** Point it at `https://api.<your-domain>/v1/stripe/webhook` for the checkout and subscription events listed in `docs/BACKEND_DESIGN.md` (Payments). Add its signing secret as `STRIPE_WEBHOOK_SECRET`.
6. [ ] **Set up Stripe Tax** if you need it, and set the variable `STRIPE_TAX` to `on`.
7. [ ] **Set up the Customer Portal** in Stripe settings, so members can cancel or change plans themselves.

## 5. Deploy and test (still in Stripe test mode)

- [ ] **Deploy the API.** Push to `main`, or run **Study site API deploy** by hand. It applies the database migrations and deploys the Worker.
- [ ] **Check the health endpoint.** `https://api.<your-domain>/v1/health` should respond.
- [ ] **Test sign-in.** Open the site's Account page, sign in with your email and follow the link.
- [ ] **Test buying Pro.** Use Stripe's test card, then confirm that:
  - Pro questions, flashcards, the study guide and full-length exams unlock.
  - Progress syncs to a second browser.
- [ ] **Test cancelling.** Cancel in the Customer Portal and confirm Pro turns off at the end of the period.
- [ ] **Test exporting and deleting.** Export your data, then delete the account from the Account page.
- [ ] **Run the accounts check.** Run `npm run test:accounts` locally, which runs the end-to-end accounts test.

## 6. Go live

- [ ] **Update the Privacy Policy and Terms pages** (`tools/build.js`, POLICY) to describe accounts, payments, the email provider and Stripe. Remove "No accounts" from the summary line.
- [ ] **Switch to live keys.** Move Stripe to live mode, then replace `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` and the price ids with live values. Redeploy the API.
- [ ] **Make one real purchase** and refund it.
- [ ] **Turn on the D1 backup workflow** and confirm its first run.
- [ ] **Watch the first week:**
  - Stripe webhook deliveries
  - Worker errors (Cloudflare dashboard → Workers → Logs)
  - support email
