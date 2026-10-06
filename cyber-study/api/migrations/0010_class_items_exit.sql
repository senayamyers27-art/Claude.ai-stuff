-- Assignments for one lesson, one lab or an online exit ticket (kind 'lesson', 'lab', 'exit', with the lesson key
-- or lab id in "item"), and students' exit-ticket answers. SQLite can't change a CHECK constraint in place, so the
-- assignments table is rebuilt with the wider list of kinds.
CREATE TABLE class_assignments_new (
  id          TEXT PRIMARY KEY,
  class_id    TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  cert_id     TEXT NOT NULL,
  kind        TEXT NOT NULL CHECK (kind IN ('lessons', 'exam', 'readiness', 'questions', 'lesson', 'lab', 'exit')),
  target      INTEGER NOT NULL,
  item        TEXT,                            -- lesson key ('l...') or lab id, for 'lesson', 'lab' and 'exit'
  due_date    TEXT,
  created_at  INTEGER NOT NULL
);
INSERT INTO class_assignments_new (id, class_id, title, cert_id, kind, target, due_date, created_at)
  SELECT id, class_id, title, cert_id, kind, target, due_date, created_at FROM class_assignments;
DROP TABLE class_assignments;
ALTER TABLE class_assignments_new RENAME TO class_assignments;
CREATE INDEX class_assignments_class ON class_assignments(class_id);

-- One row per student per exit ticket: their short answers (a JSON array of up to 5 strings). The class's teacher
-- sees them; nobody else does. Removed when the student leaves the class, the assignment is deleted, or the account goes.
CREATE TABLE exit_responses (
  assignment_id TEXT NOT NULL REFERENCES class_assignments(id) ON DELETE CASCADE,
  user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  answers       TEXT NOT NULL,
  created_at    INTEGER NOT NULL,
  PRIMARY KEY (assignment_id, user_id)
);
