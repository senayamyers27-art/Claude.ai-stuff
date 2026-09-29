# Sign in with Google, Facebook and LinkedIn

The login page (`#login`, `#signup`) offers a button for each provider that is set up. Nothing appears until
the accounts API is running (see `BACKEND_DESIGN.md` and `CLOUDFLARE_MOVE.md`); after that, each button appears
as soon as its two values are saved as GitHub secrets and the **Study site API deploy** workflow runs.

In every provider's settings, the **redirect URI** (also called callback URL) is your API address plus a fixed path:

| Provider | Redirect URI |
| --- | --- |
| Google | `https://<your API domain>/v1/auth/oauth/google/callback` |
| Facebook | `https://<your API domain>/v1/auth/oauth/facebook/callback` |
| LinkedIn | `https://<your API domain>/v1/auth/oauth/linkedin/callback` |

`<your API domain>` is `apiOrigin` in `site.config.json` (for example `api.studytocert.com`). It must match exactly,
including `https://` and no trailing slash.

## Google

1. Go to <https://console.cloud.google.com/>, create a project (for example "StudyToCert").
2. **APIs & Services → OAuth consent screen** (Google Auth Platform → Branding): app name StudyToCert, your support
   email, your site as the home page, and links to `/#privacy` and `/#terms`. Audience: **External**.
3. **Data access / Scopes**: add `openid`, `.../auth/userinfo.email` and `.../auth/userinfo.profile` only. These are
   non-sensitive scopes, so no Google review is needed.
4. **Clients → Create client → Web application.** Authorized JavaScript origins: your site. Authorized redirect URIs:
   the Google redirect URI above.
5. Copy the **Client ID** and **Client secret**.
6. Publish the app (move it out of "Testing"), or only test users can sign in.

GitHub secrets: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.

## Facebook

1. Go to <https://developers.facebook.com/apps>, **Create app → Authenticate and request data from users with
   Facebook Login**. You need a Meta developer account.
2. **Use cases → Facebook Login → Customize → Permissions**: make sure `email` and `public_profile` are added. These
   two don't need App Review.
3. **Facebook Login → Settings**: add the Facebook redirect URI above to **Valid OAuth Redirect URIs**. Keep
   **Use Strict Mode for redirect URIs**, **Enforce HTTPS** and **Client OAuth login / Web OAuth login** on.
4. **App settings → Basic**: add your privacy policy URL (`https://<site>/#privacy`), terms URL, a data deletion
   instructions URL (you can use `https://<site>/#privacy`; the Account page has "Delete my account"), an app icon and
   a category. Copy the **App ID** and **App secret**.
5. Switch the app from **Development** to **Live** mode (App Mode at the top), or only app admins and testers can sign in.
   Meta may ask you to complete Business verification for some app types; basic Facebook Login usually doesn't need it.

GitHub secrets: `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`.
Optional: `FACEBOOK_GRAPH_VERSION` as a Worker variable (for example `v24.0`) to use a newer Graph API version than
the default. Meta retires each version about two years after release.

Facebook doesn't say whether it confirmed a person's email address, so a Facebook sign-in never takes over an
existing StudyToCert account with the same email. That person signs in with an emailed link first and then presses
**Connect** next to Facebook on their profile.

## LinkedIn

1. Go to <https://www.linkedin.com/developers/apps> and **Create app**. It needs a LinkedIn Page for your
   company or project (you can create one for StudyToCert) and an app logo. Verify the app with the Page.
2. **Products**: request **Sign In with LinkedIn using OpenID Connect**. It's approved automatically.
3. **Auth**: add the LinkedIn redirect URI above under **Authorized redirect URLs for your app**. Check that the
   scopes list shows `openid`, `profile` and `email`.
4. Copy the **Client ID** and **Primary Client Secret**.

GitHub secrets: `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`.

## Saving the values

GitHub → your repository → **Settings → Secrets and variables → Actions → New repository secret**, one per value
above. Then run **Actions → Study site API deploy → Run workflow**. The workflow copies them into the Worker as
secrets. Check `https://<your API domain>/v1/me`: `providers` lists the options that are live.

Rotate a secret by creating a new one at the provider, updating the GitHub secret, running the deploy, then
deleting the old one at the provider.

## How it works and why it's safe

- The whole exchange happens on the API (`api/src/oauth.js`). The site never handles a provider token, and the API
  doesn't store one: it reads the person's ID, name and email once, then signs them in with the usual session cookie.
- `state` is checked on the way back, is used once, expires in 10 minutes and is tied to the browser with a
  `__Host-` cookie, so another site can't sign someone into an account that isn't theirs. Google and Facebook also use
  PKCE.
- A provider links to an existing account by email only when the provider says the email is verified (Google,
  LinkedIn). An account first created from an unverified address is reset when the real owner signs in with an emailed
  link: linked providers, passkeys and sessions made before are removed.
- After sign-in the API only ever redirects to fixed pages on your site (`#profile` or `#login`), never to an address
  taken from the request.
- Profiles are private. `GET/PUT /v1/profile` only return or change the signed-in person's own profile.

## Trying it locally

`npm run api:dev` starts the API with stand-ins for all three providers: each button opens a plain page on
`localhost` where you type any name and email. `npm run test:accounts` runs the whole flow in a browser, and
`npm run test:api` includes `api/test/oauth.test.js`.
