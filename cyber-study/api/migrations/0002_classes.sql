-- Class mode: a teacher (any signed-in user) creates a class and shares a join code. Students
-- join only after agreeing to share a progress summary with the teacher, and can leave any time.
-- Times are Unix epoch milliseconds.

CREATE TABLE classes (
  id            TEXT PRIMARY KEY,                -- 'cls_' + 24 hex
  teacher_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  teacher_name  TEXT NOT NULL,                   -- the name students see, chosen by the teacher
  name          TEXT NOT NULL,
  cert_id       TEXT,                            -- optional certification the class is studying
  join_code     TEXT NOT NULL UNIQUE,            -- 10 characters from a 32-letter alphabet (50 random bits)
  created_at    INTEGER NOT NULL,
  updated_at    INTEGER NOT NULL
);
CREATE INDEX classes_teacher ON classes(teacher_id);

CREATE TABLE class_members (
  id            TEXT PRIMARY KEY,                -- 'mem_' + 24 hex, so teachers never see user ids
  class_id      TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  display_name  TEXT NOT NULL,                   -- chosen by the student when joining
  show_email    INTEGER NOT NULL DEFAULT 0,      -- 1 only if the student chose to show their email
  consented_at  INTEGER NOT NULL,                -- when the student agreed to share a progress summary
  joined_at     INTEGER NOT NULL,
  UNIQUE (class_id, user_id)
);
CREATE INDEX class_members_user ON class_members(user_id);
CREATE INDEX class_members_class ON class_members(class_id);
