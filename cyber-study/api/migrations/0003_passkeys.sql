-- Passkeys (WebAuthn) for passwordless sign-in, and one-time challenges for the passkey ceremonies.
-- Times are Unix epoch milliseconds.

CREATE TABLE passkeys (
  id            TEXT PRIMARY KEY,                -- the credential id, base64url
  user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  public_key    TEXT NOT NULL,                   -- SubjectPublicKeyInfo, base64
  alg           INTEGER NOT NULL,                -- COSE algorithm: -7 (ES256) or -257 (RS256)
  sign_count    INTEGER NOT NULL DEFAULT 0,
  name          TEXT NOT NULL,
  transports    TEXT,
  created_at    INTEGER NOT NULL,
  last_used_at  INTEGER
);
CREATE INDEX passkeys_user ON passkeys(user_id);

CREATE TABLE webauthn_challenges (
  challenge_hash TEXT PRIMARY KEY,               -- SHA-256 of the challenge; the challenge itself isn't stored
  user_id        TEXT REFERENCES users(id) ON DELETE CASCADE,  -- set for registration, empty for sign-in
  purpose        TEXT NOT NULL,                  -- 'register' or 'signin'
  expires_at     INTEGER NOT NULL
);
