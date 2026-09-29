-- Stripe sends webhook events in no guaranteed order: remember the newest event applied to each
-- subscription so an older, late-arriving event can't overwrite a newer status.
ALTER TABLE subscriptions ADD COLUMN stripe_event_at INTEGER;

-- Indexes for the daily clean-up of expired rows (see purgeExpired in src/index.js).
CREATE INDEX IF NOT EXISTS sessions_expires ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS magic_links_expires ON magic_links(expires_at);
CREATE INDEX IF NOT EXISTS stripe_events_received ON stripe_events(received_at);
