# Incident response

What to do when a security check fails or someone reports a problem. The aim for each case is the same: **contain** it, **restore** a known-good state, **find the cause**, then **prevent it happening again**. Write down what you see and do, with times, as you go; it makes the cause far easier to find.

## Where alerts come from

| Alert | Means | Go to |
|---|---|---|
| "Study site integrity" failed | A live file differs from every recent build in the repository | [Site files changed](#site-files-changed) |
| "Study site vulnerability check" failed | A library that runs in visitors' pages has a known vulnerability | [Vulnerable component](#vulnerable-component) |
| Dependabot or code scanning alert | A dependency or the code has a known issue | [Vulnerable component](#vulnerable-component) |
| Secret scanning alert, or a token seen somewhere public | A credential may be in someone else's hands | [Leaked secret](#leaked-secret) |
| A private vulnerability report (**Security → Advisories**) | A researcher found something | [Vulnerability report](#vulnerability-report) |
| "Study site live check" or ZAP scan failed | HTTPS, headers or redirects changed | Read the run log; usually a setting, not an attack. If the site points somewhere unexpected, see [Domain or DNS changed](#domain-or-dns-changed) |
| Many `"type":"security"` lines in the API's Worker logs | Someone is probing or flooding the accounts API | [API abuse](#api-abuse) |

## Site files changed

The integrity monitor found live files that match no build from `main`. Treat it as a compromise of the hosting or the publishing path until proven otherwise.

1. **Confirm.** Open the failed run and note which files differ. Run it again (**Actions → Study site integrity → Run workflow**). If only a publish was in progress, the second run passes.
2. **Contain.** Remove the publishing tokens that could have been used: revoke `PAGES_DEPLOY_TOKEN` (and `CLOUDFLARE_API_TOKEN` if on Cloudflare) in your GitHub and Cloudflare settings. Check your GitHub **Settings → Security log** and the `senayamyers27-art.github.io` commit history for pushes you didn't make.
3. **Restore.** Publish a known-good build: run the publish workflow for the latest `main` commit, or ask Claude to publish it. Then run the integrity monitor again; it should pass.
4. **Find the cause.** Look at who pushed the changed files, and when. If it was a token, check where that token was stored. If it was your account, follow [Account compromised](#account-compromised).
5. **Tell visitors** if the changed files could have run code in their browsers (any `.js` or `.html` file): a short note on the What's new page saying what happened, when, and that they should clear the site's data if they visited in that window. The service worker picks up the restored build on the next visit.

## Leaked secret

1. **Revoke it first,** then work out how it leaked. Every secret is listed in `GITHUB_SETTINGS.md` with where it's used.
2. **Create a new one** with the minimum access and an expiry date, and save it as the repository secret.
3. **Check what the old one could do** in its service's logs (GitHub security log, Cloudflare audit log, Stripe dashboard, email provider) for the time it was exposed.
4. **Remove it from history** only after it's revoked: rewriting history doesn't un-leak it, but stops it being found again.

## Account compromised

If you see sign-ins, keys, tokens or pushes you didn't make:

1. **Secure the account.** Change the password, sign out all sessions (**Settings → Sessions**), remove unknown SSH keys, tokens, OAuth apps and GitHub Apps, and check that two-factor sign-in is still yours.
2. **Rotate every secret** in the repositories (see [Leaked secret](#leaked-secret)), because anyone with your account could read workflow logs and change workflows.
3. **Review recent changes** to `main`, to the workflows (`.github/workflows/`) and to repository settings (**Settings → Rules**, **Actions**, **Secrets**) since the first sign of trouble.
4. **Check the live site** with the integrity monitor.

## Vulnerable component

1. **Read the advisory:** is the vulnerable code actually used by the site? The vulnerability check's summary links each advisory.
2. **Libraries in visitors' pages** (Pyodide, v86, xterm.js): update the file in `public/vendor/` from the fixed release, rebuild, and run all checks (`npm run check`, the smoke test and, for the VM, `node tools/vm/test-labs.js`).
3. **The practice VM image:** rebuild it with `tools/vm/build-vm.sh`, which downloads the current Ubuntu packages, then `node tools/vm/make-state.js` and `node tools/vm/test-labs.js`.
4. **Build and test tools** (npm): merge Dependabot's pull request once CI passes.

## Vulnerability report

1. **Thank the reporter** within a few days, in the private advisory. Don't discuss it in public issues.
2. **Reproduce it** safely, on a local copy (`npm start`), not the live site.
3. **Fix it** in a private fork created from the advisory (**Security → Advisories → the report → Start a temporary private fork**), or in a normal pull request if the fix doesn't reveal the problem.
4. **Publish the advisory** once the fix is live, crediting the reporter if they want it.

## Domain or DNS changed

If the domain points somewhere you didn't set, or the certificate isn't yours:

1. **Sign in to the registrar and DNS host** (with two-factor) and check the nameservers and records against `CUSTOM_DOMAIN.md`.
2. **Put them back,** change those accounts' passwords, and turn on registrar lock.
3. **Check certificate transparency** at crt.sh for certificates issued for your domain that you didn't request, and report them to the certificate authority that issued them.

## API abuse

Only relevant when accounts are on. Each refused request logs one JSON line with `"type":"security"`, the reason (`bad_origin`, `rate_limited`, `unsupported_type`, `signin_link_rejected`, `turnstile_failed`...) and a hashed IP.

1. **Look at the pattern** in Cloudflare (**Workers & Pages → the API → Logs**): one `ipHash` or many, which paths, which reasons.
2. **Contain it** at the edge: a WAF rule blocking the source, or Bot Fight Mode. Turn on the Turnstile check on sign-in if it's sign-in requests (`CLOUDFLARE_MOVE.md`, step 7).
3. **If data may have been read or changed,** check the audit log table (`audit_log`) for the affected accounts, end their sessions (`DELETE FROM sessions WHERE user_id = ...`), and tell the people affected what happened. Depending on where they live, you may have to tell a regulator within a fixed time; check the rules that apply before you need them.

## Afterwards

Write a short note: what happened, how it was found, what fixed it, and what will stop it happening again. Add a check to the relevant workflow or lint when one could have caught it earlier.
