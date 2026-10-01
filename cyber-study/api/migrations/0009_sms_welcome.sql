-- Text-message sign-in codes (a backup way in when someone can't get to their email) and the welcome email series.
-- sms_phone is set only after the person confirms a code sent to it. Codes are stored only as hashes.
ALTER TABLE users ADD COLUMN sms_phone TEXT;
ALTER TABLE users ADD COLUMN sms_verified_at INTEGER;
-- Study tips by email (the welcome series); 0 after an unsubscribe or switching it off on the profile.
ALTER TABLE users ADD COLUMN email_tips INTEGER NOT NULL DEFAULT 1;
-- How many welcome emails this account has had (0 to 3). Accounts made before the series started are marked done.
ALTER TABLE users ADD COLUMN welcome_step INTEGER NOT NULL DEFAULT 0;
UPDATE users SET welcome_step = 3;

CREATE TABLE sms_codes (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  purpose     TEXT NOT NULL,              -- 'verify' (adding a number) or 'signin'
  phone       TEXT NOT NULL,
  code_hash   TEXT NOT NULL,
  attempts    INTEGER NOT NULL DEFAULT 0,
  created_at  INTEGER NOT NULL,
  expires_at  INTEGER NOT NULL
);
CREATE INDEX sms_codes_user ON sms_codes(user_id, purpose);
