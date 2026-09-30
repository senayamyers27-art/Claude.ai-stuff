# Pro launch checklist

The code for accounts, progress sync and Pro is finished and tested:

- **Worker and database:** `api/` is the Cloudflare Worker, and `api/migrations/` holds the D1 database schema. Run `npm run test:api` to test the Worker.
- **Pro content:** the paid content lives in the private `cyber-study-pro` repository.
- **Deploy workflows:** `.github/workflows/` includes the API deploy, API backup and Cloudflare settings workflows.

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
2. [ ] **Create products.** Make two products, each with a monthly and a yearly price:
   - **StudyToCert Pro:** `site.config.json` shows $7 a month and $49 a year (`pro`).
   - **StudyToCert Premium Pro:** `site.config.json` shows $15 a month and $99 a year (`premium`). It includes everything in Pro plus the AI tutor, study coach and mock interviews, which use the Anthropic API (see `SUPPORT_BOT.md`), so price it above your expected AI cost per member.
   - Change the prices in both Stripe and `site.config.json` if you choose others. Optionally add a per-seat price for group licenses.
3. [ ] **Add the price ids as variables:**
   - `STRIPE_PRICE_PRO_MONTHLY`
   - `STRIPE_PRICE_PRO_YEARLY`
   - `STRIPE_PRICE_PREMIUM_MONTHLY` (Premium Pro shows "Coming soon" until this is set)
   - `STRIPE_PRICE_PREMIUM_YEARLY`
   - `STRIPE_PRICE_ORG_SEAT` (optional)
4. [ ] **Add the secret key.** Add `STRIPE_SECRET_KEY` as a secret. Use a restricted key if you can.
5. [ ] **Create the webhook.** Point it at `https://api.<your-domain>/v1/stripe/webhook` and select `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted` and `invoice.payment_failed`. Set its **API version** to `2025-03-31.basil`, the version the API code pins on every request (`STRIPE_API_VERSION` in `api/src/billing.js`), so events arrive in the shape the code expects. Add its signing secret as `STRIPE_WEBHOOK_SECRET`.
6. [ ] **Set up Stripe Tax** if you need it, and set the variable `STRIPE_TAX` to `on`.
7. [ ] **Set up the Customer Portal** in Stripe settings, so members can cancel or change plans themselves. Under **Subscriptions → Customers can switch plans**, add both products (Pro and Premium Pro, monthly and yearly) and choose to prorate. Members switch between Pro and Premium Pro there; the site never sells a second plan to someone who already has one, and the webhook records the new plan from the price.

## 5. Deploy and test (still in Stripe test mode)

- [ ] **Deploy the API.** Push to `main`, or run **Study site API deploy** by hand. It applies the database migrations and deploys the Worker.
- [ ] **Check the health endpoint.** `https://api.<your-domain>/v1/health` should respond.
- [ ] **Test sign-in.** Open the site's Account page, sign in with your email and follow the link.
- [ ] **Test buying Pro.** Use Stripe's test card, then confirm that:
  - Pro questions, flashcards, the study guide and full-length exams unlock.
  - Progress syncs to a second browser.
- [ ] **Test Premium Pro.** Buy it with the test card and confirm the AI tutor opens from a missed question's review, the AI study coach from a dashboard card, and the AI interviewer from a career page. Switch to Pro in the Customer Portal and confirm the AI buttons change to "Premium Pro" links.
- [ ] **Test cancelling.** Cancel in the Customer Portal and confirm Pro turns off at the end of the period.
- [ ] **Test exporting and deleting.** Export your data, then delete the account from the Account page.
- [ ] **Run the accounts check.** Run `npm run test:accounts` locally, which runs the end-to-end accounts test.

## 6. Go live

- [ ] **Update the Privacy Policy and Terms pages** (`tools/build.js`, POLICY) to describe accounts, payments, the email provider and Stripe. Remove "No accounts" from the summary line.
- [ ] **Switch to live keys.** Move Stripe to live mode, then replace `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` and the price ids with live values. Redeploy the API.
- [ ] **Make one real purchase** and refund it.
- [ ] **Set up backups.** Confirm D1 Time Travel is available for `cyber-cert-study` (Cloudflare dashboard → D1 → the database → Time Travel). For weekly encrypted copies, create an `age` key pair on your own computer (`age-keygen -o studytocert-backup.key`), keep the private key offline, add the public key (`age1…`) as the repository variable `STUDY_API_BACKUP_AGE_RECIPIENT`, and run **Actions → Study site API backup** once. (The "D1 Nightly Backup" workflow belongs to the other site in this repository, not to StudyToCert.)
- [ ] **Watch the first week:**
  - Stripe webhook deliveries
  - Worker errors (Cloudflare dashboard → Workers → Logs)
  - support email
