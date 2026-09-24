-- Cyber Cert Study API: initial schema (Cloudflare D1 / SQLite).
-- Times are Unix epoch milliseconds. Ids are random hex strings.

CREATE TABLE users (
  id          TEXT PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  created_at  INTEGER NOT NULL
);

CREATE TABLE sessions (
  token_hash  TEXT PRIMARY KEY,           -- SHA-256 of the cookie value; the value itself is never stored
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at  INTEGER NOT NULL,
  expires_at  INTEGER NOT NULL,
  user_agent  TEXT
);
CREATE INDEX sessions_user ON sessions(user_id);

CREATE TABLE magic_links (
  token_hash  TEXT PRIMARY KEY,
  email       TEXT NOT NULL,
  created_at  INTEGER NOT NULL,
  expires_at  INTEGER NOT NULL,
  used_at     INTEGER
);

-- Stripe subscriptions: a personal Pro plan (user_id) or an organization's seats (org_id).
CREATE TABLE subscriptions (
  stripe_subscription  TEXT PRIMARY KEY,
  stripe_customer      TEXT NOT NULL,
  user_id              TEXT REFERENCES users(id) ON DELETE SET NULL,
  org_id               TEXT REFERENCES orgs(id) ON DELETE SET NULL,
  plan                 TEXT NOT NULL,          -- 'pro' | 'org'
  status               TEXT NOT NULL,          -- Stripe status: active, trialing, past_due, canceled, …
  seats                INTEGER NOT NULL DEFAULT 1,
  current_period_end   INTEGER,
  updated_at           INTEGER NOT NULL
);
CREATE INDEX subscriptions_user ON subscriptions(user_id);
CREATE INDEX subscriptions_org ON subscriptions(org_id);

CREATE TABLE stripe_customers (
  user_id          TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer  TEXT NOT NULL UNIQUE
);

-- Webhook events already processed, so retries are ignored.
CREATE TABLE stripe_events (
  id           TEXT PRIMARY KEY,
  received_at  INTEGER NOT NULL
);

CREATE TABLE orgs (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  pilot_seats  INTEGER NOT NULL DEFAULT 0,     -- free seats for pilots, set by the operator
  created_at   INTEGER NOT NULL
);

CREATE TABLE org_members (
  org_id   TEXT NOT NULL REFERENCES orgs(id) ON DELETE CASCADE,
  user_id  TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role     TEXT NOT NULL CHECK (role IN ('owner', 'instructor', 'learner')),
  joined_at INTEGER NOT NULL,
  PRIMARY KEY (org_id, user_id)
);
CREATE INDEX org_members_user ON org_members(user_id);

CREATE TABLE cohorts (
  id          TEXT PRIMARY KEY,
  org_id      TEXT NOT NULL REFERENCES orgs(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  cert_id     TEXT NOT NULL,
  start_date  TEXT,
  exam_date   TEXT,
  created_at  INTEGER NOT NULL
);
CREATE INDEX cohorts_org ON cohorts(org_id);

CREATE TABLE cohort_members (
  cohort_id  TEXT NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (cohort_id, user_id)
);

CREATE TABLE invites (
  code_hash   TEXT PRIMARY KEY,
  org_id      TEXT NOT NULL REFERENCES orgs(id) ON DELETE CASCADE,
  cohort_id   TEXT REFERENCES cohorts(id) ON DELETE CASCADE,
  role        TEXT NOT NULL CHECK (role IN ('instructor', 'learner')),
  expires_at  INTEGER NOT NULL,
  max_uses    INTEGER NOT NULL,
  uses        INTEGER NOT NULL DEFAULT 0,
  created_by  TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at  INTEGER NOT NULL
);

-- Synced progress: the same JSON documents the app keeps in localStorage.
CREATE TABLE progress_docs (
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  doc_key     TEXT NOT NULL,                  -- 'cert:<id>' or 'labs'
  body        TEXT NOT NULL,
  version     INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL,
  PRIMARY KEY (user_id, doc_key)
);

CREATE TABLE rate_limits (
  bucket        TEXT PRIMARY KEY,             -- e.g. 'magic:ip:<hash>'
  window_start  INTEGER NOT NULL,
  count         INTEGER NOT NULL
);

CREATE TABLE audit_log (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  at        INTEGER NOT NULL,
  actor     TEXT,                              -- user id, or 'stripe' / 'system'
  org_id    TEXT,
  action    TEXT NOT NULL,
  target    TEXT,
  ip_hash   TEXT
);
CREATE INDEX audit_at ON audit_log(at);
