-- Admin stats, referrals and class assignments.

-- Billing period of each subscription ('month' or 'year'), for the admin page's revenue estimate, and who referred
-- it (a user id), for referral rewards.
ALTER TABLE subscriptions ADD COLUMN billing_interval TEXT;
ALTER TABLE subscriptions ADD COLUMN referrer_id TEXT;

-- One referral code per user, created the first time they open "Invite friends".
CREATE TABLE referral_codes (
  code        TEXT PRIMARY KEY,                -- 8 characters from the join-code alphabet
  user_id     TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  created_at  INTEGER NOT NULL
);

-- A reward for the referrer when a referred friend's first paid period starts. One per referred user, ever.
CREATE TABLE referral_rewards (
  referee_id           TEXT PRIMARY KEY,       -- the friend who subscribed
  referrer_id          TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription  TEXT,
  amount               INTEGER NOT NULL,       -- cents of credit
  status               TEXT NOT NULL,          -- 'credited', 'pending' (no billing account yet) or 'capped'
  created_at           INTEGER NOT NULL,
  credited_at          INTEGER
);
CREATE INDEX referral_rewards_referrer ON referral_rewards(referrer_id);

-- Assignments a teacher sets for a class: a target on one certification, optionally with a due date.
CREATE TABLE class_assignments (
  id          TEXT PRIMARY KEY,                -- 'asg_' + 24 hex
  class_id    TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  cert_id     TEXT NOT NULL,
  kind        TEXT NOT NULL CHECK (kind IN ('lessons', 'exam', 'readiness', 'questions')),
  target      INTEGER NOT NULL,                -- lessons read, exam %, readiness %, or questions answered
  due_date    TEXT,                            -- YYYY-MM-DD, optional
  created_at  INTEGER NOT NULL
);
CREATE INDEX class_assignments_class ON class_assignments(class_id);
