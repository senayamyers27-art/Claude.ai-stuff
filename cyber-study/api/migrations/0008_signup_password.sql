-- More about the person at sign-up (phone, what describes them, target exam date) and an optional password as a
-- backup way to sign in when they can't get to their email. The password is stored only as a salted PBKDF2 hash.
ALTER TABLE users ADD COLUMN phone TEXT;
ALTER TABLE users ADD COLUMN role TEXT;
ALTER TABLE users ADD COLUMN exam_date TEXT;
ALTER TABLE users ADD COLUMN password_hash TEXT;
ALTER TABLE users ADD COLUMN password_set_at INTEGER;
