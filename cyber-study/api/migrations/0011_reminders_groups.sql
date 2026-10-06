-- Email reminders the person chooses on their profile, and study groups.
-- remind: 'off', 'daily', 'weekdays' or 'weekly' (Mondays); remind_hour: 0-23 in the person's own time zone (tz).
ALTER TABLE users ADD COLUMN remind TEXT NOT NULL DEFAULT 'off';
ALTER TABLE users ADD COLUMN remind_hour INTEGER NOT NULL DEFAULT 18;
ALTER TABLE users ADD COLUMN tz TEXT;
ALTER TABLE users ADD COLUMN remind_sent TEXT;         -- local date (YYYY-MM-DD) of the last reminder
-- Exam countdown emails (a week before and the day before the exam date on the profile): on unless switched off.
ALTER TABLE users ADD COLUMN countdown INTEGER NOT NULL DEFAULT 1;
ALTER TABLE users ADD COLUMN countdown_sent TEXT;      -- "<exam date>:7" or "<exam date>:1", the last one sent
-- The monthly "What's new" email: off unless switched on.
ALTER TABLE users ADD COLUMN news INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN news_sent TEXT;           -- YYYY-MM of the last one sent

-- Study groups: a few people studying together see each other's name and progress numbers for one certification.
CREATE TABLE study_groups (
  id          TEXT PRIMARY KEY,                -- 'grp_' + 24 hex
  name        TEXT NOT NULL,
  cert_id     TEXT NOT NULL,
  owner_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  join_code   TEXT NOT NULL UNIQUE,
  created_at  INTEGER NOT NULL
);
CREATE TABLE study_group_members (
  group_id     TEXT NOT NULL REFERENCES study_groups(id) ON DELETE CASCADE,
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  joined_at    INTEGER NOT NULL,
  PRIMARY KEY (group_id, user_id)
);
CREATE INDEX study_group_members_user ON study_group_members(user_id);
