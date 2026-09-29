/* Sign in (or create an account) with Google, Facebook or LinkedIn, and connect or disconnect them later.
   Authorization code flow, run entirely on the server: the browser goes to /v1/auth/oauth/<provider>/start,
   the provider sends it back to /callback, and the Worker swaps the code for the person's profile using the
   app's client secret. The site never sees a provider token, and none is stored.

   Protections:
   - state: a random value in a short-lived cookie and (hashed) in the database, checked on the way back, so
     another site can't finish a sign-in in your browser (login CSRF). Used once.
   - PKCE (Google and Facebook) so an intercepted code can't be redeemed by anyone else.
   - A provider account links to an existing account by email only when the provider says it verified that
     email (Google, LinkedIn). Otherwise the person signs in with an emailed link first and connects it.
   - Accounts created from an unverified email are marked unverified; proving the address with an emailed link
     removes anything linked before (see verifyMagicLink in auth.js), so nobody can claim an address in advance.

   Setup: docs/SOCIAL_SIGNIN.md. A provider is offered only when both its client id and secret are set. */
import { now, randomHex, newId, sha256Hex, hmacSha256Hex, parseCookies, clientIp, bad, HttpError } from "./util.js";
import { audit, rateLimit, securityLog } from "./audit.js";
import { createSession, claimEmail } from "./auth.js";

const STATE_COOKIE = "__Host-cs_oauth";
const STATE_TTL = 10 * 60 * 1000;
const FB_VERSION = env => (/^v\d{1,2}\.\d$/.test(env.FACEBOOK_GRAPH_VERSION || "") ? env.FACEBOOK_GRAPH_VERSION : "v23.0");

export const PROVIDERS = {
  google: {
    name: "Google", pkce: true,
    id: env => env.GOOGLE_CLIENT_ID, secret: env => env.GOOGLE_CLIENT_SECRET,
    authorize: () => "https://accounts.google.com/o/oauth2/v2/auth",
    token: () => "https://oauth2.googleapis.com/token",
    scope: "openid email profile",
    extra: { prompt: "select_account" },
    async profile(env, tok) {
      const p = await getJson(env, "https://openidconnect.googleapis.com/v1/userinfo", { Authorization: `Bearer ${tok.access_token}` });
      return { subject: p.sub, email: p.email, emailVerified: p.email_verified === true, name: p.name };
    }
  },
  facebook: {
    name: "Facebook", pkce: true,
    id: env => env.FACEBOOK_APP_ID, secret: env => env.FACEBOOK_APP_SECRET,
    authorize: env => `https://www.facebook.com/${FB_VERSION(env)}/dialog/oauth`,
    token: env => `https://graph.facebook.com/${FB_VERSION(env)}/oauth/access_token`,
    scope: "public_profile,email",
    extra: {},
    async profile(env, tok) {
      // appsecret_proof: Facebook rejects the token from any caller that doesn't also know the app secret.
      const proof = await hmacSha256Hex(env.FACEBOOK_APP_SECRET, tok.access_token);
      const q = new URLSearchParams({ fields: "id,name,email", access_token: tok.access_token, appsecret_proof: proof });
      const p = await getJson(env, `https://graph.facebook.com/${FB_VERSION(env)}/me?${q}`);
      // Facebook doesn't say whether the address was confirmed, so it never links to an existing account by email.
      return { subject: p.id, email: p.email, emailVerified: false, name: p.name };
    }
  },
  linkedin: {
    name: "LinkedIn", pkce: false, // LinkedIn offers PKCE only to native apps; web apps use the client secret
    id: env => env.LINKEDIN_CLIENT_ID, secret: env => env.LINKEDIN_CLIENT_SECRET,
    authorize: () => "https://www.linkedin.com/oauth/v2/authorization",
    token: () => "https://www.linkedin.com/oauth/v2/accessToken",
    scope: "openid profile email",
    extra: {},
    async profile(env, tok) {
      const p = await getJson(env, "https://api.linkedin.com/v2/userinfo", { Authorization: `Bearer ${tok.access_token}` });
      return { subject: p.sub, email: p.email, emailVerified: p.email_verified === true, name: p.name };
    }
  }
};

export const enabledProviders = env => Object.keys(PROVIDERS).filter(k => PROVIDERS[k].id(env) && PROVIDERS[k].secret(env));

// Local development only: send every provider request to a stand-in (api/dev-server.js) instead of the real one.
function devUrl(env, url) {
  if (env.APP_ENV !== "development" || !env.OAUTH_DEV_BASE) return url;
  const u = new URL(url);
  return `${env.OAUTH_DEV_BASE}/__oauth/${u.hostname}${u.pathname}${u.search}`;
}
async function getJson(env, url, headers = {}) {
  let res;
  try { res = await fetch(devUrl(env, url), { headers: { Accept: "application/json", ...headers } }); } catch (e) { throw new HttpError(502, "provider_unreachable", "Couldn't reach the sign-in provider."); }
  if (!res.ok) throw new HttpError(502, "provider_error", "The sign-in provider didn't return your profile.");
  return res.json();
}

const b64url = bytes => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
async function challengeFor(verifier) {
  return b64url(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))));
}
const callbackUrl = (request, provider) => `${new URL(request.url).origin}/v1/auth/oauth/${provider}/callback`;
const stateCookie = (value, maxAgeSec) => `${STATE_COOKIE}=${value}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSec}`;
// Where the browser lands on the site afterwards. Only these fixed pages, never a caller-supplied URL (no open redirect).
const siteUrl = (env, hash, params = {}) => {
  const q = new URLSearchParams(params).toString();
  return `${env.SITE_ORIGIN}/${q ? "?" + q : ""}#${hash}`;
};

export function providerOf(env, key) {
  const p = PROVIDERS[key];
  if (!p || !p.id(env) || !p.secret(env)) throw new HttpError(404, "provider_off", "That sign-in option isn't set up on this site.");
  return p;
}

// GET /v1/auth/oauth/<provider>/start[?link=1]. Returns the provider's URL and the state cookie to set.
export async function startOAuth(env, request, key, linkUser) {
  const p = providerOf(env, key);
  await rateLimit(env, "oauth:ip:" + clientIp(request), 30, 60 * 60 * 1000);
  const state = randomHex(32), verifier = p.pkce ? randomHex(48) : null, t = now();
  await env.DB.prepare("INSERT INTO oauth_states (state_hash, provider, verifier, link_user_id, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(await sha256Hex(state), key, verifier, linkUser ? linkUser.id : null, t, t + STATE_TTL).run();
  const q = new URLSearchParams({ response_type: "code", client_id: p.id(env), redirect_uri: callbackUrl(request, key), scope: p.scope, state, ...p.extra });
  if (verifier) { q.set("code_challenge", await challengeFor(verifier)); q.set("code_challenge_method", "S256"); }
  return { location: devUrl(env, `${p.authorize(env)}?${q}`), cookie: stateCookie(state, STATE_TTL / 1000) };
}

async function exchange(env, request, key, p, code, verifier) {
  const form = new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: callbackUrl(request, key), client_id: p.id(env), client_secret: p.secret(env) });
  if (verifier) form.set("code_verifier", verifier);
  let res;
  try { res = await fetch(devUrl(env, p.token(env)), { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" }, body: form }); }
  catch (e) { throw new HttpError(502, "provider_unreachable", "Couldn't reach the sign-in provider."); }
  const tok = await res.json().catch(() => ({}));
  if (!res.ok || typeof tok.access_token !== "string") throw new HttpError(400, "code_rejected", "The sign-in provider didn't accept the sign-in. Try again.");
  return tok;
}

// GET /v1/auth/oauth/<provider>/callback. Always ends in a redirect back to the site: to the profile when it
// worked, or to the sign-in page with an error code the page explains. Returns { location, cookies }.
export async function finishOAuth(env, request, key) {
  const url = new URL(request.url);
  const clear = stateCookie("", 0);
  const fail = async (code, logged) => {
    if (logged) await securityLog(request, "oauth_" + code, { provider: key });
    return { location: siteUrl(env, "login", { signin_error: code }), cookies: [clear] };
  };
  const p = PROVIDERS[key];
  if (!p || !p.id(env) || !p.secret(env)) return fail("provider_off");
  if (url.searchParams.get("error")) return fail("cancelled"); // the person said no on the provider's page

  const state = url.searchParams.get("state") || "", code = url.searchParams.get("code") || "";
  const cookieState = parseCookies(request)[STATE_COOKIE] || "";
  if (!/^[0-9a-f]{64}$/.test(state) || state !== cookieState) return fail("state_mismatch", true);
  if (!code || code.length > 2048) return fail("no_code", true);
  await rateLimit(env, "oauthcb:ip:" + clientIp(request), 60, 60 * 60 * 1000);

  // Use the state once: delete and read in one step, so a replayed callback finds nothing.
  const hash = await sha256Hex(state), t = now();
  const row = await env.DB.prepare("DELETE FROM oauth_states WHERE state_hash = ? AND provider = ? AND expires_at > ? RETURNING verifier, link_user_id").bind(hash, key, t).first();
  if (!row) return fail("expired", true);

  let prof;
  try {
    const tok = await exchange(env, request, key, p, code, row.verifier);
    prof = await p.profile(env, tok);
  } catch (e) { return fail(e.code === "code_rejected" ? "code_rejected" : "provider_error", true); }
  const subject = String(prof.subject || "");
  if (!subject || subject.length > 255) return fail("provider_error", true);
  const email = typeof prof.email === "string" && prof.email.length <= 254 && /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[a-z]{2,}$/i.test(prof.email.trim()) ? prof.email.trim().toLowerCase() : null;
  const name = typeof prof.name === "string" ? cleanName(prof.name) : null;

  const found = await env.DB.prepare("SELECT user_id FROM identities WHERE provider = ? AND subject = ?").bind(key, subject).first();

  // Connecting a provider to the signed-in account (started from the profile page).
  if (row.link_user_id) {
    if (found && found.user_id !== row.link_user_id) return { location: siteUrl(env, "profile", { signin_error: "identity_in_use" }), cookies: [clear] };
    if (!found) {
      const has = await env.DB.prepare("SELECT 1 AS x FROM identities WHERE user_id = ? AND provider = ?").bind(row.link_user_id, key).first();
      if (has) return { location: siteUrl(env, "profile", { signin_error: "already_linked" }), cookies: [clear] };
      await env.DB.prepare("INSERT INTO identities (provider, subject, user_id, email, created_at, last_used_at) VALUES (?, ?, ?, ?, ?, ?)").bind(key, subject, row.link_user_id, email, t, t).run();
      await audit(env, request, { actor: row.link_user_id, action: "identity.linked", target: key });
    }
    return { location: siteUrl(env, "profile", { linked: key }), cookies: [clear] };
  }

  let user, created = false;
  if (found) {
    user = await env.DB.prepare("SELECT id, email FROM users WHERE id = ?").bind(found.user_id).first();
    await env.DB.prepare("UPDATE identities SET last_used_at = ?, email = COALESCE(?, email) WHERE provider = ? AND subject = ?").bind(t, email, key, subject).run();
  } else {
    if (!email) return fail("no_email");
    const existing = await env.DB.prepare("SELECT id, email, email_verified FROM users WHERE email = ?").bind(email).first();
    if (existing && !prof.emailVerified) return fail("email_in_use");
    if (existing && !existing.email_verified) await claimEmail(env, request, existing.id);
    if (existing) {
      const has = await env.DB.prepare("SELECT 1 AS x FROM identities WHERE user_id = ? AND provider = ?").bind(existing.id, key).first();
      if (has) return fail("email_in_use"); // a different account at the same provider is already connected
      user = existing;
    } else {
      user = { id: newId("usr"), email };
      await env.DB.prepare("INSERT INTO users (id, email, created_at, display_name, email_verified) VALUES (?, ?, ?, ?, ?)")
        .bind(user.id, email, t, name, prof.emailVerified ? 1 : 0).run();
      await audit(env, request, { actor: user.id, action: "user.created", target: key });
      created = true;
    }
    await env.DB.prepare("INSERT INTO identities (provider, subject, user_id, email, created_at, last_used_at) VALUES (?, ?, ?, ?, ?, ?)").bind(key, subject, user.id, email, t, t).run();
    await audit(env, request, { actor: user.id, action: "identity.linked", target: key });
  }
  const session = await createSession(env, request, user, key);
  return { location: siteUrl(env, "profile", created ? { welcome: "1" } : { signed_in: key }), cookies: [clear, session] };
}

export function cleanName(s) {
  return String(s).replace(/[\u0000-\u001f\u007f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 60) || null;
}

export async function unlinkIdentity(env, request, user, key) {
  if (!PROVIDERS[key]) throw bad("unknown_provider", "Unknown sign-in option.");
  // Always safe: the account's email address can still get a sign-in link.
  const r = await env.DB.prepare("DELETE FROM identities WHERE user_id = ? AND provider = ?").bind(user.id, key).run();
  if (!r.meta || !r.meta.changes) throw new HttpError(404, "not_linked", `${PROVIDERS[key].name} isn't connected.`);
  await audit(env, request, { actor: user.id, action: "identity.unlinked", target: key });
  return { ok: true };
}
