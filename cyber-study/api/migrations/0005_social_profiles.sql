-- Sign-in with Google, Facebook and LinkedIn, and user profiles.

-- Profile fields, all optional and private to the account holder.
ALTER TABLE users ADD COLUMN display_name TEXT;
ALTER TABLE users ADD COLUMN bio TEXT;
ALTER TABLE users ADD COLUMN goal_cert TEXT;
ALTER TABLE users ADD COLUMN weekly_hours INTEGER;
-- 0 when the account was created from a provider that didn't confirm the email address. Proving the address
-- with an emailed link sets it to 1 and removes anything linked before (see verifyMagicLink in src/auth.js).
ALTER TABLE users ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 1;

-- One row per linked provider account. The provider's own user id (subject) identifies it; the email is kept
-- only to show which account is linked.
CREATE TABLE identities (
  provider      TEXT NOT NULL,              -- 'google' | 'facebook' | 'linkedin'
  subject       TEXT NOT NULL,
  user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email         TEXT,
  created_at    INTEGER NOT NULL,
  last_used_at  INTEGER,
  PRIMARY KEY (provider, subject)
);
CREATE INDEX identities_user ON identities(user_id);
CREATE UNIQUE INDEX identities_user_provider ON identities(user_id, provider);

-- A sign-in in progress: created when the browser leaves for the provider, used once when it comes back.
CREATE TABLE oauth_states (
  state_hash    TEXT PRIMARY KEY,           -- SHA-256 of the state value; the value itself is only in the browser's cookie
  provider      TEXT NOT NULL,
  verifier      TEXT,                       -- PKCE code verifier, for providers that support it
  link_user_id  TEXT REFERENCES users(id) ON DELETE CASCADE, -- set when a signed-in user is connecting a provider
  created_at    INTEGER NOT NULL,
  expires_at    INTEGER NOT NULL
);
CREATE INDEX oauth_states_expires ON oauth_states(expires_at);
