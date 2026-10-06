-- Success stories: members who passed share their result. Published only with their permission and after the site
-- owner approves it, under the name they choose (or no name).
CREATE TABLE stories (
  id           TEXT PRIMARY KEY,                -- 'sty_' + 24 hex
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cert_id      TEXT NOT NULL,
  passed_on    TEXT NOT NULL,                   -- YYYY-MM-DD
  quote        TEXT NOT NULL,
  shown_as     TEXT NOT NULL,                   -- the name to show, or '' for anonymous
  publish      INTEGER NOT NULL DEFAULT 0,      -- 1: they agreed it can be shown on the site
  status       TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'hidden')),
  created_at   INTEGER NOT NULL
);
CREATE INDEX stories_status ON stories(status, created_at);
CREATE UNIQUE INDEX stories_user_cert ON stories(user_id, cert_id);
