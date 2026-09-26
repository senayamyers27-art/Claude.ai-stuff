/* Passkey (WebAuthn) and signed-in device tests, with a software authenticator built on Web Crypto:
   real key pairs, authenticator data and signatures, so every server check runs for real. Run: npm run test:api */
process.removeAllListeners("warning");
const test = require("node:test");
const assert = require("node:assert/strict");
const { webcrypto: wc } = require("node:crypto");
const { createD1, createR2 } = require("./d1-shim.js");

const SITE = "https://study.example", RP = "study.example";
let worker;
test.before(async () => { worker = (await import("../src/index.js")).default; });

const makeEnv = () => ({ DB: createD1(), CONTENT: createR2(), SITE_ORIGIN: SITE, APP_ENV: "development", EMAIL_FROM: "t@example" });
let ipN = 0;
async function call(env, method, path, { body, cookie, origin = SITE, ua } = {}) {
  const h = new Headers({ "cf-connecting-ip": `10.2.0.${++ipN % 250}` });
  if (origin) h.set("origin", origin);
  if (cookie) h.set("cookie", cookie);
  if (ua) h.set("user-agent", ua);
  if (body !== undefined) h.set("content-type", "application/json");
  const res = await worker.fetch(new Request("https://api.study.example" + path, { method, headers: h, body: body !== undefined ? JSON.stringify(body) : undefined }), env);
  const text = await res.text(); let json = null; try { json = JSON.parse(text); } catch (e) {}
  return { status: res.status, json, text, headers: res.headers };
}
async function emailSignIn(env, email, ua) {
  env.DB.raw.exec("DELETE FROM rate_limits");
  const r1 = await call(env, "POST", "/v1/auth/magic-link", { body: { email } });
  const token = new URL(r1.json.devLink).searchParams.get("signin");
  const r2 = await call(env, "POST", "/v1/auth/magic-link/verify", { body: { token }, ua });
  assert.equal(r2.status, 200, r2.text);
  return r2.headers.get("set-cookie").split(";")[0];
}

const b64u = b => Buffer.from(b).toString("base64url");
const sha = async b => new Uint8Array(await wc.subtle.digest("SHA-256", b));
function rawToDer(raw) {
  const int = b => { let i = 0; while (i < b.length - 1 && b[i] === 0) i++; b = b.slice(i); if (b[0] & 0x80) b = Uint8Array.of(0, ...b); return Uint8Array.of(0x02, b.length, ...b); };
  const r = int(raw.slice(0, 32)), s = int(raw.slice(32));
  return Uint8Array.of(0x30, r.length + s.length, ...r, ...s);
}
// A software authenticator: one key pair, a counter, and the flags to set.
async function authenticator({ rsa = false } = {}) {
  const params = rsa ? { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" } : { name: "ECDSA", namedCurve: "P-256" };
  const keys = await wc.subtle.generateKey(params, true, ["sign", "verify"]);
  return { keys, rsa, alg: rsa ? -257 : -7, id: b64u(wc.getRandomValues(new Uint8Array(32))), counter: 0, flags: 0x05, rp: RP, origin: SITE };
}
async function authData(a, count) {
  const ad = new Uint8Array(37);
  ad.set(await sha(new TextEncoder().encode(a.rp)));
  ad[32] = a.flags; new DataView(ad.buffer).setUint32(33, count);
  return ad;
}
const clientData = (type, challenge, origin) => new TextEncoder().encode(JSON.stringify({ type, challenge, origin, crossOrigin: false }));
async function register(env, cookie, a, name = "My laptop") {
  const o = await call(env, "POST", "/v1/passkeys/options", { cookie, body: {} });
  assert.equal(o.status, 200, o.text);
  assert.equal(o.json.rp.id, RP); assert.equal(o.json.authenticatorSelection.userVerification, "required");
  return call(env, "POST", "/v1/passkeys", { cookie, body: {
    id: a.id, alg: a.alg, name, transports: ["internal", "hybrid"],
    publicKey: Buffer.from(await wc.subtle.exportKey("spki", a.keys.publicKey)).toString("base64"),
    authenticatorData: b64u(await authData(a, 0)),
    clientDataJSON: b64u(clientData("webauthn.create", o.json.challenge, a.origin))
  } });
}
async function assertion(env, a, { challenge, count, signWith } = {}) {
  if (!challenge) { const o = await call(env, "POST", "/v1/auth/passkey/options", { body: {} }); assert.equal(o.status, 200, o.text); challenge = o.json.challenge; }
  const ad = await authData(a, count ?? ++a.counter), cd = clientData("webauthn.get", challenge, a.origin);
  const data = new Uint8Array(ad.length + 32); data.set(ad); data.set(await sha(cd), ad.length);
  const key = (signWith || a).keys.privateKey;
  const raw = new Uint8Array(await wc.subtle.sign(a.rsa ? "RSASSA-PKCS1-v1_5" : { name: "ECDSA", hash: "SHA-256" }, key, data));
  return { id: a.id, clientDataJSON: b64u(cd), authenticatorData: b64u(ad), signature: b64u(a.rsa ? raw : rawToDer(raw)), challenge };
}
const signin = (env, body) => call(env, "POST", "/v1/auth/passkey/verify", { body });

test("add a passkey, then sign in with it (ES256)", async () => {
  const env = makeEnv(), cookie = await emailSignIn(env, "pk@example.com"), a = await authenticator();
  const reg = await register(env, cookie, a);
  assert.equal(reg.status, 200, reg.text);
  const list = await call(env, "GET", "/v1/passkeys", { cookie });
  assert.equal(list.json.passkeys.length, 1); assert.equal(list.json.passkeys[0].name, "My laptop");
  const r = await signin(env, await assertion(env, a));
  assert.equal(r.status, 200, r.text);
  assert.equal(r.json.user.email, "pk@example.com");
  const sc = r.headers.get("set-cookie");
  assert.match(sc, /__Host-cs_session=[0-9a-f]{64}; Path=\/; Secure; HttpOnly; SameSite=Strict/);
  const me = await call(env, "GET", "/v1/me", { cookie: sc.split(";")[0] });
  assert.equal(me.json.user.email, "pk@example.com");
  assert.ok(env.DB.raw.prepare("SELECT last_used_at FROM passkeys").get().last_used_at, "last use is recorded");
});

test("RS256 passkeys work too", async () => {
  const env = makeEnv(), cookie = await emailSignIn(env, "rsa@example.com"), a = await authenticator({ rsa: true });
  assert.equal((await register(env, cookie, a)).status, 200);
  assert.equal((await signin(env, await assertion(env, a))).status, 200);
});

test("a sign-in challenge works once", async () => {
  const env = makeEnv(), cookie = await emailSignIn(env, "replay@example.com"), a = await authenticator();
  await register(env, cookie, a);
  const body = await assertion(env, a);
  assert.equal((await signin(env, body)).status, 200);
  const again = await signin(env, await assertion(env, a, { challenge: body.challenge }));
  assert.equal(again.status, 400); assert.equal(again.json.error, "passkey_expired");
});

test("responses made for another site are refused", async () => {
  const env = makeEnv(), cookie = await emailSignIn(env, "phish@example.com"), a = await authenticator();
  await register(env, cookie, a);
  a.origin = "https://study-example.evil"; // a look-alike phishing page relaying the challenge
  assert.equal((await signin(env, await assertion(env, a))).status, 400);
  a.origin = SITE; a.rp = "evil.example"; // signed for a different relying party
  assert.equal((await signin(env, await assertion(env, a))).status, 400);
});

test("the device must verify the user (PIN or biometric)", async () => {
  const env = makeEnv(), cookie = await emailSignIn(env, "uv@example.com"), a = await authenticator();
  await register(env, cookie, a);
  a.flags = 0x01; // user present, not verified
  const r = await signin(env, await assertion(env, a));
  assert.equal(r.status, 400); assert.equal(r.json.error, "passkey_unverified");
});

test("a signature from a different key is refused", async () => {
  const env = makeEnv(), cookie = await emailSignIn(env, "sig@example.com"), a = await authenticator(), other = await authenticator();
  await register(env, cookie, a);
  const r = await signin(env, await assertion(env, a, { signWith: other }));
  assert.equal(r.status, 400); assert.equal(r.json.error, "invalid_passkey");
});

test("a counter that goes backwards (a cloned passkey) is refused", async () => {
  const env = makeEnv(), cookie = await emailSignIn(env, "clone@example.com"), a = await authenticator();
  await register(env, cookie, a);
  assert.equal((await signin(env, await assertion(env, a, { count: 5 }))).status, 200);
  const r = await signin(env, await assertion(env, a, { count: 3 }));
  assert.equal(r.status, 400); assert.equal(r.json.error, "passkey_cloned");
});

test("authenticators without a counter (always 0) keep working", async () => {
  const env = makeEnv(), cookie = await emailSignIn(env, "zero@example.com"), a = await authenticator();
  await register(env, cookie, a);
  for (let i = 0; i < 3; i++) assert.equal((await signin(env, await assertion(env, a, { count: 0 }))).status, 200);
});

test("a registration challenge belongs to the account that asked for it", async () => {
  const env = makeEnv(), ca = await emailSignIn(env, "one@example.com"), cb = await emailSignIn(env, "two@example.com"), a = await authenticator();
  const o = await call(env, "POST", "/v1/passkeys/options", { cookie: ca, body: {} });
  const r = await call(env, "POST", "/v1/passkeys", { cookie: cb, body: {
    id: a.id, alg: -7, publicKey: Buffer.from(await wc.subtle.exportKey("spki", a.keys.publicKey)).toString("base64"),
    authenticatorData: b64u(await authData(a, 0)), clientDataJSON: b64u(clientData("webauthn.create", o.json.challenge, SITE)) } });
  assert.equal(r.status, 400);
  assert.equal((await call(env, "POST", "/v1/passkeys/options", { body: {} })).status, 401, "adding a passkey needs a session");
});

test("only the owner can remove a passkey; a removed passkey can't sign in", async () => {
  const env = makeEnv(), ca = await emailSignIn(env, "own@example.com"), cb = await emailSignIn(env, "other@example.com"), a = await authenticator();
  await register(env, ca, a);
  assert.equal((await call(env, "DELETE", `/v1/passkeys/${a.id}`, { cookie: cb })).status, 404);
  assert.equal((await call(env, "DELETE", `/v1/passkeys/${a.id}`, { cookie: ca })).status, 200);
  const r = await signin(env, await assertion(env, a));
  assert.equal(r.status, 400); assert.equal(r.json.error, "unknown_passkey");
});

test("the same passkey can't be registered twice, and there's a limit of 10", async () => {
  const env = makeEnv(), cookie = await emailSignIn(env, "many@example.com"), a = await authenticator();
  assert.equal((await register(env, cookie, a)).status, 200);
  assert.equal((await register(env, cookie, a)).json.error, "passkey_exists");
  for (let i = 0; i < 9; i++) { env.DB.raw.exec("DELETE FROM rate_limits"); assert.equal((await register(env, cookie, await authenticator())).status, 200); }
  const o = await call(env, "POST", "/v1/passkeys/options", { cookie, body: {} });
  assert.equal(o.json.error, "too_many_passkeys");
});

test("devices: list sessions, end one, and sign out everywhere else", async () => {
  const env = makeEnv();
  const phone = await emailSignIn(env, "dev@example.com", "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1");
  const laptop = await emailSignIn(env, "dev@example.com", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0 Safari/537.36");
  const tablet = await emailSignIn(env, "dev@example.com", "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/140.0 Mobile Safari/537.36");
  const l = await call(env, "GET", "/v1/sessions", { cookie: laptop });
  assert.equal(l.json.sessions.length, 3);
  assert.deepEqual(l.json.sessions.map(s => s.device).sort(), ["Chrome on Android", "Chrome on Windows", "Safari on iOS"]);
  const cur = l.json.sessions.find(s => s.current);
  assert.equal(cur.device, "Chrome on Windows");
  assert.ok(l.json.sessions.every(s => /^[0-9a-f]{16}$/.test(s.id)));
  assert.equal((await call(env, "DELETE", `/v1/sessions/${cur.id}`, { cookie: laptop })).status, 404, "the current session ends with sign out, not here");
  const phoneId = l.json.sessions.find(s => s.device === "Safari on iOS").id;
  assert.equal((await call(env, "DELETE", `/v1/sessions/${phoneId}`, { cookie: laptop })).status, 200);
  assert.equal((await call(env, "GET", "/v1/me", { cookie: phone })).json.user, null, "the phone is signed out");
  const r = await call(env, "DELETE", "/v1/sessions/others", { cookie: laptop });
  assert.equal(r.json.ended, 1);
  assert.equal((await call(env, "GET", "/v1/me", { cookie: tablet })).json.user, null);
  assert.ok((await call(env, "GET", "/v1/me", { cookie: laptop })).json.user, "this device stays signed in");
  const other = await emailSignIn(env, "stranger@example.com");
  const sid = (await call(env, "GET", "/v1/sessions", { cookie: laptop })).json.sessions[0].id;
  assert.equal((await call(env, "DELETE", `/v1/sessions/${sid}`, { cookie: other })).status, 404, "can't end someone else's session");
});

test("passkeys are in the account export and go when the account is deleted", async () => {
  const env = makeEnv(), cookie = await emailSignIn(env, "gone@example.com"), a = await authenticator();
  await register(env, cookie, a, "Phone");
  const ex = await call(env, "GET", "/v1/account/export", { cookie });
  assert.equal(ex.json.passkeys[0].name, "Phone");
  assert.ok(!JSON.stringify(ex.json.passkeys).includes(a.id), "the export lists names and dates only");
  assert.equal((await call(env, "DELETE", "/v1/account", { cookie, body: { confirm: "gone@example.com" } })).status, 200);
  assert.equal(env.DB.raw.prepare("SELECT COUNT(*) AS n FROM passkeys").get().n, 0);
});
