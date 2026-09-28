# Moving hosting from GitHub Pages to Cloudflare Pages

GitHub Pages serves the site well, but it can't send custom HTTP headers. That leaves a few protections the site already has ready unused:

| Protection | On GitHub Pages | On Cloudflare Pages |
|---|---|---|
| Content Security Policy | In a `<meta>` tag, so `frame-ancestors` is ignored | Sent as a header, including `frame-ancestors 'none'` |
| Clickjacking (`X-Frame-Options: DENY`) | Not possible: another site could frame the pages | Sent on every page |
| HSTS policy and preload | GitHub's own policy | Two years, `includeSubDomains`, and `preload` when you choose |
| `Permissions-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy` | Not possible | Sent on every page |
| Cross-origin isolation (`Cross-Origin-Embedder-Policy`) | Not possible | Optional (step 7) |
| Redirects (`_redirects`), HTTPS-only preview builds | Not possible | Used |

Everything is already built: `tools/build.js` writes `public/_headers` and `public/_redirects`, `functions/` holds the HTTPS redirect, and the "Study site deploy" workflow deploys to Cloudflare Pages once its secrets exist. The steps below need your Cloudflare and GitHub accounts, so only you can do them. Do them after the domain move in `CUSTOM_DOMAIN.md`.

## 1. Put the domain on Cloudflare

1. **Add the site.** Create a free Cloudflare account, choose **Add a domain**, enter `studytocert.com` and pick the Free plan.
2. **Check the imported records.** Cloudflare copies your existing DNS records. Make sure the CAA, MX, SPF, DMARC and DKIM records from `CUSTOM_DOMAIN.md` step 4 came across.
3. **Change the nameservers** at your registrar to the two Cloudflare shows. It can take a few hours before Cloudflare says the domain is active.
4. **Turn on DNSSEC** in Cloudflare (**DNS → Settings**) and add the DS record it shows at your registrar. If DNSSEC was on at the old DNS host, turn it off there *before* changing nameservers, or the domain stops resolving.

## 2. Create the Pages project and deploy token

1. **Create the project.** In Cloudflare: **Workers & Pages → Create → Pages → Upload assets**, name it `cyber-cert-study` (the `cloudflarePagesProject` value in `site.config.json`), and upload any small folder to create it. Don't connect the GitHub repository: the workflow deploys it, and connecting it too would deploy every push twice.
2. **Create an API token.** **My Profile → API Tokens → Create Token → Custom token** with only **Account → Cloudflare Pages → Edit**, limited to your account, with an expiry date (for example a year; put a reminder in your calendar).
3. **Add the repository secrets** in `senayamyers27-art/Claude.ai-stuff` → **Settings → Secrets and variables → Actions**: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` (shown on the Workers & Pages overview page).
4. **Deploy.** Run **Actions → Study site CI** on `main` (or push any change). When CI passes, "Study site deploy" publishes to Cloudflare Pages. The site is then live at `cyber-cert-study.pages.dev`, which redirects to the main domain.

## 3. Point the domain at Cloudflare Pages

1. **Add the custom domains** in the Pages project (**Custom domains → Set up a domain**): `www.studytocert.com` and `studytocert.com`. Cloudflare replaces the GitHub Pages records with its own.
2. **Delete any leftover GitHub Pages records** (the `185.199.x.153` A records, the `2606:50c0:…` AAAA records and the `www` CNAME to `senayamyers27-art.github.io`) if Cloudflare didn't replace them.
3. **Send the bare domain to www.** In the zone: **Rules → Redirect Rules → Create rule → Redirect from root to WWW** (the template). Otherwise `studytocert.com` serves a second copy of the site.
4. **Check it.** `curl -sI https://www.studytocert.com/ | grep -i -e content-security -e x-frame -e strict-transport` should show the three headers.

## 4. Apply the zone settings

The "Study site Cloudflare settings" workflow checks the zone every week: Always Use HTTPS, Full (strict) SSL, TLS 1.2 minimum, TLS 1.3, HTTP/3, no 0-RTT and DNSSEC.

1. **Add the secrets** `CLOUDFLARE_ZONE_TOKEN` (a token with **Zone → Zone Settings → Edit**, **Zone → Zone → Read**, and **Zone → Zone → Edit** so it can turn on DNSSEC, limited to this zone) and `CLOUDFLARE_ZONE_ID` (on the domain's overview page).
2. **Run it once with "apply" ticked** (**Actions → Study site Cloudflare settings → Run workflow**). After that, the weekly run only reports drift.

## 5. Retire GitHub Pages publishing

1. **Delete the `PAGES_DEPLOY_TOKEN` secret**, so "Study site to GitHub Pages" stops publishing. Also revoke that token under your GitHub **Settings → Developer settings → Personal access tokens**.
2. **Keep the old address redirecting.** Leave the `senayamyers27-art.github.io` repository as it is for a few weeks and check that `https://senayamyers27-art.github.io/` still sends visitors to the new domain. If it stops, replace that repository's contents with one page that links to `https://www.studytocert.com/`.

## 6. Tighten the security scans

- **ZAP rules.** In `tools/zap-rules.tsv`, change the first group of `IGNORE` rules (headers GitHub Pages can't send) to `FAIL`. Cloudflare sends all of them, so a missing header then fails the weekly scan. Leave the study-content and informational groups as they are.
- **Integrity monitor.** Nothing to change: "Study site integrity" checks whichever domain `site.config.json` names, and skips `_headers` and `_redirects`, which Cloudflare reads instead of serving.

## 7. Optional extra hardening

### HSTS preload

Preloading puts the domain in the list built into browsers, so even a first visit never uses plain HTTP.

1. **Wait two weeks** after the move and make sure every subdomain you use (including `api.` if accounts are on) works over HTTPS.
2. **Set `"hstsPreload": true`** in `site.config.json`. Claude can do this: the next deploy adds `preload` to the header.
3. **Submit** `studytocert.com` at hstspreload.org.

Preloading is hard to undo: removal takes months to reach browsers, and every subdomain must serve HTTPS for as long as the domain is listed.

### Cross-origin isolation

`"crossOriginIsolation": true` in `site.config.json` adds `Cross-Origin-Embedder-Policy: require-corp`. With the opener and resource policies already sent, the browser then gives the site its own process, which walls it off from Spectre-style side-channel attacks by other sites. Everything the pages load is same-origin, and the full smoke test (including the practice VMs and Python) passes with it on. It can't be combined with the Turnstile sign-in check, because Cloudflare's Turnstile frame doesn't allow being embedded that way; the build refuses that combination.

### WAF and bot protection for the API

If accounts are on, turn on **Security → Bots → Bot Fight Mode** and the free managed WAF rules for the `api.` hostname, and consider the Turnstile sign-in check (`turnstileSiteKey` in `site.config.json` and the `TURNSTILE_SECRET_KEY` repository secret).
