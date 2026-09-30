# Moving the site to www.studytocert.com

The site is ready for the new domain. The name, logo, icons and link previews already say StudyToCert. The one switch that is left is the domain itself, and it has to wait until DNS works. If the site switches first, GitHub Pages sends every visitor from `senayamyers27-art.github.io` to a domain that doesn't answer yet, and the site is down until DNS catches up.

Steps 1, 2 and 4 need your domain registrar and your GitHub account, so only you can do them. Step 3 is a one-line change that Claude can make once you say DNS is working.

## 1. Add the DNS records (at your registrar or DNS host)

Add these records for `studytocert.com`. Delete any existing parking-page or forwarding records for the same names first.

| Type  | Name / host | Value                          |
|-------|-------------|--------------------------------|
| CNAME | `www`       | `senayamyers27-art.github.io`  |
| A     | `@` (apex)  | `185.199.108.153`              |
| A     | `@` (apex)  | `185.199.109.153`              |
| A     | `@` (apex)  | `185.199.110.153`              |
| A     | `@` (apex)  | `185.199.111.153`              |

- **Optional IPv6:** add AAAA records for `@` with `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153` and `2606:50c0:8003::153`.
- **The apex records** make `studytocert.com` (without www) work too. GitHub Pages redirects it to `www.studytocert.com`.
- **If you use Cloudflare for DNS,** set these records to **DNS only** (grey cloud) until GitHub has issued the HTTPS certificate in step 2. You can turn the proxy on afterwards.
- **Check that the records are live.** Changes can take from a few minutes to a few hours. Run `nslookup www.studytocert.com` or use a site such as dnschecker.org. You should see `senayamyers27-art.github.io` and the 185.199.x.153 addresses.

## 2. Verify the domain on GitHub (recommended)

Verifying stops anyone else from pointing a GitHub Pages site at your domain.

1. **Start verification.** On GitHub, open your profile picture → **Settings → Pages → Add a domain**, and enter `studytocert.com`.
2. **Add the TXT record** that GitHub shows (named like `_github-pages-challenge-senayamyers27-art`) at your DNS host.
3. **Click Verify** once the record is live.

## 3. Switch the site to the domain (after DNS works)

Tell Claude "DNS is working, switch the domain". It will:

1. **Set the domain.** In `cyber-study/site.config.json`, `"domain"` becomes `"www.studytocert.com"`.
2. **Rebuild the site.** The build writes the `CNAME` file and switches canonical links, the sitemap, `robots.txt`, link previews and structured data to the new domain.
3. **Publish it** to the `senayamyers27-art.github.io` repository.

Then, in the **`senayamyers27-art.github.io` repository → Settings → Pages**:

1. **Check the custom domain.** It should show `www.studytocert.com` with a green "DNS check successful".
2. **Turn on HTTPS.** Tick **Enforce HTTPS** once it is available. GitHub can take up to an hour to issue the certificate.

Old `senayamyers27-art.github.io` links keep working because GitHub redirects them to the new domain. Progress that learners saved in their browser is tied to the old address, though. The backup and restore buttons (Settings → Your data) move it across, so it is worth mentioning when you announce the new domain.

## 4. Harden the domain's DNS (after the switch)

These records stop the most common domain attacks: certificates issued by the wrong authority, forged DNS answers, and email spoofed from your domain. Add them at the same DNS host as step 1.

### Only let your certificate authorities issue certificates (CAA)

| Type | Name | Value |
|------|------|-------|
| CAA  | `@`  | `0 issue "letsencrypt.org"` |
| CAA  | `@`  | `0 issuewild ";"` |
| CAA  | `@`  | `0 iodef "mailto:you@example.com"` (your address: where authorities report refused requests) |

- **Which authority.** GitHub Pages gets its certificates from Let's Encrypt, so that is the only one allowed.
- **If you move to Cloudflare Pages** (`CLOUDFLARE_MOVE.md`) or turn on Cloudflare's proxy, Cloudflare adds CAA records for the authorities it uses automatically once you have any CAA record. Check that its records appear under **SSL/TLS → Edge Certificates**.
- **No wildcards.** `issuewild ";"` forbids wildcard certificates, which the site never needs.

### Sign the DNS records (DNSSEC)

DNSSEC lets resolvers detect forged answers that would send visitors to someone else's server.

1. **Turn it on at your DNS host.** On Cloudflare: **DNS → Settings → Enable DNSSEC**. Elsewhere, look for DNSSEC in the domain's DNS settings.
2. **Add the DS record at your registrar.** The DNS host shows the values (key tag, algorithm, digest type, digest). If the registrar is also the DNS host, it usually does this for you.
3. **Check it** at dnsviz.net: every link in the chain should be green. The weekly "Study site Cloudflare settings" workflow also reports if DNSSEC is ever turned off.

### Stop email spoofing

The site doesn't send or receive email, so tell the world that no mail from `studytocert.com` is genuine:

| Type | Name | Value |
|------|------|-------|
| MX   | `@`  | `0 .` (a "null MX": this domain receives no email) |
| TXT  | `@`  | `v=spf1 -all` |
| TXT  | `_dmarc` | `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s` |
| TXT  | `*._domainkey` | `v=DKIM1; p=` |

- **Mail providers** then reject messages that claim to come from your domain, which protects learners from phishing that uses the site's name.
- **When you turn on accounts** (sign-in links are emailed from `EMAIL_FROM`), replace these with your email provider's records: remove the null MX only if you also receive mail, change SPF to the provider's `include:`, add its DKIM keys, and remove the `*._domainkey` record. Start DMARC at `p=none; rua=mailto:you@example.com` for a week, check the reports, then go back to `p=reject`.

### Keep the domain itself safe

- **Registrar lock:** turn on "transfer lock" (and "registry lock" if offered), so the domain can't be moved to another registrar without you.
- **Two-factor sign-in** at the registrar and DNS host, ideally with a passkey or security key.
- **Auto-renew,** with a card that won't expire before the renewal date. An expired domain can be bought by anyone.

## Later: Pro accounts and the Android app

- **Pro accounts** need the API on a subdomain of the same site. Set `"apiOrigin"` to `https://api.studytocert.com` and follow `PRO_LAUNCH.md`.
- **The Android app** (`PLAY_STORE.md`) is tied to one domain. Build it after the switch, with `https://www.studytocert.com/manifest.webmanifest`.
- **Search engines:** add `https://www.studytocert.com` in Google Search Console and Bing Webmaster Tools and submit `https://www.studytocert.com/sitemap.xml`.
- **Email:** for a support or sign-in address such as `hello@studytocert.com`, replace the no-email records from step 4 with your email provider's MX, SPF and DKIM records (see "Stop email spoofing").
