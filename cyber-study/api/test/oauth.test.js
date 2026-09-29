/* Sign in with Google, Facebook and LinkedIn, account linking and profiles. The providers are stubbed at
   fetch(): each test says which profile a code returns. Run: npm run test:api */
process.removeAllListeners("warning");
const test = require("node:test");
const assert = require("node:assert/strict");
const { createD1, createR2 } = require("./d1-shim.js");

const SITE = "https://study.example", API = "https://api.study.example";
let worker;
const realFetch = globalThis.fetch;
const profiles = new Map(); // code -> profile the provider returns for it
const calls = [];
test.before(async () => {
  worker = (await import("../src/index.js")).default;
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(typeof url === "string" ? url : url.url);
    calls.push({ url: u, init });
    if (/oauth2\.googleapis\.com|oauth\/access_token|linkedin\.com\/oauth\/v2\/accessToken/.test(u.href)) {
      const form = new URLSearchParams(init.body.toString());
      if (!profiles.has(form.get("code"))) return new Response(JSON.stringify({ error: "invalid_grant" }), { status: 400 });
      return new Response(JSON.stringify({ access_token: "at." + form.get("code"), token_type: "Bearer" }));
    }
    const code = u.hostname === "graph.facebook.com" ? (u.searchParams.get("access_token") || "").slice(3) : ((init.headers || {}).Authorization || "").replace("Bearer at.", "");
    const p = profiles.get(code);
    return p ? new Response(JSON.stringify(p)) : new Response("{}", { status: 401 });
  };
});
test.after(() => { globalThis.fetch = realFetch; });

const makeEnv = (extra = {}) => ({
  DB: createD1(), CONTENT: createR2(), SITE_ORIGIN: SITE, APP_ENV: "development", EMAIL_FROM: "t@example",
  GOOGLE_CLIENT_ID: "g-id", GOOGLE_CLIENT_SECRET: "g-secret", FACEBOOK_APP_ID: "fb-id", FACEBOOK_APP_SECRET: "fb-secret",
  LINKEDIN_CLIENT_ID: "li-id", LINKEDIN_CLIENT_SECRET: "li-secret", ...extra
});
let ipN = 0;
async function call(env, method, path, { body, cookie, origin = SITE } = {}) {
  const h = new Headers({ "cf-connecting-ip": `10.3.0.${++ipN % 250}` });
  if (origin) h.set("origin", origin);
  if (cookie) h.set("cookie", cookie);
  if (body !== undefined) h.set("content-type", "application/json");
  const res = await worker.fetch(new Request(API + path, { method, headers: h, body: body !== undefined ? JSON.stringify(body) : undefined }), env);
  const text = await res.text(); let json = null; try { json = JSON.parse(text); } catch (e) {}
  return { status: res.status, json, text, headers: res.headers, cookies: res.headers.getSetCookie ? res.headers.getSetCookie() : [] };
}
const cookieVal = (cookies, name) => { const c = cookies.find(x => x.startsWith(name + "=")); return c ? c.split(";")[0] : null; };

// The whole round trip: start (browser leaves for the provider), then the callback with the given code.
async function signInWith(env, provider, code, { cookie, link = false, tamperState = false } = {}) {
  const s = await call(env, "GET", `/v1/auth/oauth/${provider}/start${link ? "?link=1" : ""}`, { origin: null, cookie });
  assert.equal(s.status, 302, s.text);
  const to = new URL(s.headers.get("location"));
  const stateCookie = cookieVal(s.cookies, "__Host-cs_oauth");
  if (!stateCookie) return { start: s, to };
  const state = tamperState ? "0".repeat(64) : to.searchParams.get("state");
  const cb = await call(env, "GET", `/v1/auth/oauth/${provider}/callback?code=${encodeURIComponent(code)}&state=${state}`, { origin: null, cookie: stateCookie });
  assert.equal(cb.status, 302);
  const back = new URL(cb.headers.get("location"));
  return { start: s, to, cb, back, session: cookieVal(cb.cookies, "__Host-cs_session"), stateCookie, state };
}
async function emailSignIn(env, email) {
  env.DB.raw.exec("DELETE FROM rate_limits");
  const r1 = await call(env, "POST", "/v1/auth/magic-link", { body: { email } });
  const env2 = r1.json.devLink ? r1 : null;
  assert.ok(env2, "development link returned");
  const token = new URL(r1.json.devLink).searchParams.get("signin");
  const r2 = await call(env, "POST", "/v1/auth/magic-link/verify", { body: { token } });
  assert.equal(r2.status, 200, r2.text);
  return r2.headers.get("set-cookie").split(";")[0];
}

test("providers are offered only when configured", async () => {
  const off = makeEnv({ GOOGLE_CLIENT_SECRET: "", LINKEDIN_CLIENT_ID: "" });
  assert.deepEqual((await call(off, "GET", "/v1/me")).json.providers, ["facebook"]);
  const r = await call(off, "GET", "/v1/auth/oauth/google/start", { origin: null });
  assert.equal(r.status, 302);
  assert.equal(r.headers.get("location"), `${SITE}/?signin_error=provider_off#login`);
  assert.equal((await call(off, "GET", "/v1/auth/oauth/myspace/start", { origin: null })).headers.get("location"), `${SITE}/?signin_error=provider_off#login`);
});

test("start sends the browser to Google with state and PKCE, and a Lax state cookie", async () => {
  const env = makeEnv();
  const s = await call(env, "GET", "/v1/auth/oauth/google/start", { origin: null });
  const to = new URL(s.headers.get("location"));
  assert.equal(to.origin + to.pathname, "https://accounts.google.com/o/oauth2/v2/auth");
  assert.equal(to.searchParams.get("client_id"), "g-id");
  assert.equal(to.searchParams.get("redirect_uri"), `${API}/v1/auth/oauth/google/callback`);
  assert.equal(to.searchParams.get("code_challenge_method"), "S256");
  assert.match(to.searchParams.get("state"), /^[0-9a-f]{64}$/);
  const c = s.cookies.find(x => x.startsWith("__Host-cs_oauth="));
  assert.match(c, /HttpOnly/); assert.match(c, /Secure/); assert.match(c, /SameSite=Lax/); assert.match(c, /Path=\//);
  assert.equal(s.headers.get("content-security-policy"), "default-src 'none'; frame-ancestors 'none'");
  // LinkedIn: no PKCE (web apps use the client secret); Facebook: PKCE.
  const li = new URL((await call(env, "GET", "/v1/auth/oauth/linkedin/start", { origin: null })).headers.get("location"));
  assert.equal(li.searchParams.get("code_challenge"), null);
  assert.equal(li.searchParams.get("scope"), "openid profile email");
  const fb = new URL((await call(env, "GET", "/v1/auth/oauth/facebook/start", { origin: null })).headers.get("location"));
  assert.match(fb.pathname, /^\/v\d+\.\d\/dialog\/oauth$/);
  assert.ok(fb.searchParams.get("code_challenge"));
});

test("new Google user: account created, signed in, lands on the profile", async () => {
  const env = makeEnv();
  profiles.set("g1", { sub: "g-111", email: "Ana@Example.com", email_verified: true, name: "Ana <b>López</b>" });
  const r = await signInWith(env, "google", "g1");
  assert.equal(r.back.hash, "#profile");
  assert.equal(r.back.searchParams.get("welcome"), "1");
  assert.ok(r.session, "session cookie set");
  assert.ok(r.cb.cookies.some(c => /^__Host-cs_oauth=;/.test(c)), "state cookie cleared");
  // PKCE verifier went to the token endpoint.
  const tokenCall = calls.filter(c => c.url.hostname === "oauth2.googleapis.com").pop();
  assert.ok(new URLSearchParams(tokenCall.init.body.toString()).get("code_verifier"));
  const me = await call(env, "GET", "/v1/me", { cookie: r.session });
  assert.equal(me.json.user.email, "ana@example.com");
  assert.equal(me.json.user.displayName, "Ana bLópez/b", "angle brackets stripped from provider names");
  const p = await call(env, "GET", "/v1/profile", { cookie: r.session });
  assert.deepEqual(p.json.identities.map(i => i.provider), ["google"]);
  // Signing in again finds the same account.
  const again = await signInWith(env, "google", "g1");
  assert.equal(again.back.searchParams.get("signed_in"), "google");
  assert.equal((await call(env, "GET", "/v1/me", { cookie: again.session })).json.user.id, me.json.user.id);
});

test("state is checked, single-use and bound to the browser", async () => {
  const env = makeEnv();
  profiles.set("g2", { sub: "g-222", email: "b@example.com", email_verified: true, name: "B" });
  const bad = await signInWith(env, "google", "g2", { tamperState: true });
  assert.equal(bad.back.searchParams.get("signin_error"), "state_mismatch");
  assert.equal(bad.session, null);
  // Replaying a used callback finds nothing.
  const ok = await signInWith(env, "google", "g2");
  assert.ok(ok.session);
  const replay = await call(env, "GET", `/v1/auth/oauth/google/callback?code=g2&state=${ok.state}`, { origin: null, cookie: ok.stateCookie });
  assert.equal(new URL(replay.headers.get("location")).searchParams.get("signin_error"), "expired");
  // No state cookie (a callback started in another browser).
  const s = await call(env, "GET", "/v1/auth/oauth/google/start", { origin: null });
  const st = new URL(s.headers.get("location")).searchParams.get("state");
  const other = await call(env, "GET", `/v1/auth/oauth/google/callback?code=g2&state=${st}`, { origin: null });
  assert.equal(new URL(other.headers.get("location")).searchParams.get("signin_error"), "state_mismatch");
  // The person pressed Cancel at the provider.
  const s2 = await call(env, "GET", "/v1/auth/oauth/google/start", { origin: null });
  const cancel = await call(env, "GET", "/v1/auth/oauth/google/callback?error=access_denied&state=x", { origin: null, cookie: cookieVal(s2.cookies, "__Host-cs_oauth") });
  assert.equal(new URL(cancel.headers.get("location")).searchParams.get("signin_error"), "cancelled");
  // A code the provider rejects.
  const rej = await signInWith(env, "google", "not-a-code");
  assert.equal(rej.back.searchParams.get("signin_error"), "code_rejected");
});

test("linking by email: verified providers link, Facebook asks to sign in first", async () => {
  const env = makeEnv();
  await emailSignIn(env, "carla@example.com");
  profiles.set("fb1", { id: "fb-1", email: "carla@example.com", name: "Carla" });
  const fb = await signInWith(env, "facebook", "fb1");
  assert.equal(fb.back.searchParams.get("signin_error"), "email_in_use");
  assert.equal(fb.session, null);
  // appsecret_proof sent with the Graph call.
  const g = calls.filter(c => c.url.hostname === "graph.facebook.com" && c.url.pathname.endsWith("/me")).pop();
  assert.match(g.url.searchParams.get("appsecret_proof"), /^[0-9a-f]{64}$/);
  profiles.set("li1", { sub: "li-1", email: "carla@example.com", email_verified: true, name: "Carla" });
  const li = await signInWith(env, "linkedin", "li1");
  assert.ok(li.session);
  assert.equal((await call(env, "GET", "/v1/me", { cookie: li.session })).json.user.email, "carla@example.com");
  profiles.set("g3", { sub: "g-3", email: "carla@example.com", email_verified: false, name: "C" });
  assert.equal((await signInWith(env, "google", "g3")).back.searchParams.get("signin_error"), "email_in_use", "unverified Google email doesn't link");
  profiles.set("fb0", { id: "fb-0", name: "No Email" });
  assert.equal((await signInWith(env, "facebook", "fb0")).back.searchParams.get("signin_error"), "no_email");
});

test("connect and disconnect from the profile", async () => {
  const env = makeEnv();
  const cookie = await emailSignIn(env, "dev@example.com");
  profiles.set("fb2", { id: "fb-2", email: "someone.else@example.com", name: "Dev" });
  const r = await signInWith(env, "facebook", "fb2", { cookie, link: true });
  assert.equal(r.back.hash, "#profile");
  assert.equal(r.back.searchParams.get("linked"), "facebook");
  let p = await call(env, "GET", "/v1/profile", { cookie });
  assert.deepEqual(p.json.identities.map(i => i.provider), ["facebook"]);
  // Now Facebook signs in to this account.
  const again = await signInWith(env, "facebook", "fb2");
  assert.equal((await call(env, "GET", "/v1/me", { cookie: again.session })).json.user.email, "dev@example.com");
  // The same Facebook account can't be connected to a second person.
  const other = await emailSignIn(env, "other@example.com");
  const clash = await signInWith(env, "facebook", "fb2", { cookie: other, link: true });
  assert.equal(clash.back.searchParams.get("signin_error"), "identity_in_use");
  // Linking needs a signed-in session.
  const anon = await call(env, "GET", "/v1/auth/oauth/facebook/start?link=1", { origin: null });
  assert.equal(anon.headers.get("location"), `${SITE}/?signin_error=signed_out#login`);
  // Disconnect.
  assert.equal((await call(env, "DELETE", "/v1/identities/facebook", { cookie })).status, 200);
  assert.equal((await call(env, "DELETE", "/v1/identities/facebook", { cookie })).status, 404);
  assert.equal((await call(env, "DELETE", "/v1/identities/facebook", { cookie, origin: "https://evil.example" })).status, 403);
  p = await call(env, "GET", "/v1/profile", { cookie });
  assert.deepEqual(p.json.identities, []);
  const exp = await call(env, "GET", "/v1/account/export", { cookie });
  assert.ok(Array.isArray(exp.json.linkedSignIns));
});

test("an unverified Facebook address is reset when its owner signs in by email", async () => {
  const env = makeEnv();
  profiles.set("fb3", { id: "fb-3", email: "victim@example.com", name: "Not The Owner" });
  const squat = await signInWith(env, "facebook", "fb3");
  assert.ok(squat.session, "account created from Facebook");
  const owner = await emailSignIn(env, "victim@example.com");
  assert.equal((await call(env, "GET", "/v1/me", { cookie: squat.session })).json.user, null, "earlier session ended");
  const p = await call(env, "GET", "/v1/profile", { cookie: owner });
  assert.deepEqual(p.json.identities, [], "Facebook link removed");
  assert.equal((await signInWith(env, "facebook", "fb3")).back.searchParams.get("signin_error"), "email_in_use");
});

test("a verified Google sign-in also resets an account made from an unverified address", async () => {
  const env = makeEnv();
  profiles.set("fb4", { id: "fb-4", email: "owner@example.com", name: "Squatter" });
  const squat = await signInWith(env, "facebook", "fb4");
  assert.ok(squat.session);
  profiles.set("g4", { sub: "g-4", email: "owner@example.com", email_verified: true, name: "Owner" });
  const owner = await signInWith(env, "google", "g4");
  assert.ok(owner.session);
  assert.equal((await call(env, "GET", "/v1/me", { cookie: squat.session })).json.user, null, "squatter's session ended");
  const p = await call(env, "GET", "/v1/profile", { cookie: owner.session });
  assert.deepEqual(p.json.identities.map(i => i.provider), ["google"], "only the verified provider remains");
});

test("profile edits are validated", async () => {
  const env = makeEnv();
  const cookie = await emailSignIn(env, "eve@example.com");
  const ok = await call(env, "PUT", "/v1/profile", { cookie, body: { displayName: "  Eve   Doe ", bio: "Studying for Security+.", goalCert: "security-plus", weeklyHours: 6 } });
  assert.equal(ok.status, 200, ok.text);
  assert.equal(ok.json.displayName, "Eve Doe");
  assert.equal(ok.json.goalCert, "security-plus");
  assert.equal(ok.json.weeklyHours, 6);
  assert.equal((await call(env, "PUT", "/v1/profile", { cookie, body: { goalCert: "not-a-cert" } })).status, 400);
  assert.equal((await call(env, "PUT", "/v1/profile", { cookie, body: { weeklyHours: 200 } })).status, 400);
  assert.equal((await call(env, "PUT", "/v1/profile", { cookie, body: { bio: "x".repeat(281) } })).status, 400);
  assert.equal((await call(env, "PUT", "/v1/profile", { body: { bio: "hi" } })).status, 401);
  assert.equal((await call(env, "PUT", "/v1/profile", { cookie, body: { bio: "hi" }, origin: "https://evil.example" })).status, 403);
  const cleared = await call(env, "PUT", "/v1/profile", { cookie, body: { displayName: "", bio: "", goalCert: "", weeklyHours: "" } });
  assert.equal(cleared.json.displayName, ""); assert.equal(cleared.json.goalCert, ""); assert.equal(cleared.json.weeklyHours, null);
});
