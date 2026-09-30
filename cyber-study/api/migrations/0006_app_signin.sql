-- Sign-in codes for the iOS and Android apps. An app can't receive the emailed link, so the same email also
-- carries a short code the person types in the app. Stored only as a hash; wrong guesses are counted and the
-- code stops working after a few.
ALTER TABLE magic_links ADD COLUMN code_hash TEXT;
ALTER TABLE magic_links ADD COLUMN code_attempts INTEGER NOT NULL DEFAULT 0;
CREATE INDEX IF NOT EXISTS magic_links_email ON magic_links(email, created_at);
