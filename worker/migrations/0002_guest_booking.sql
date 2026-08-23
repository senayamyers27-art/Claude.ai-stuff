-- Guest-facing booking system: real availability, waitlist, guest CRM.

CREATE TABLE guests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  notes TEXT,
  tags TEXT,
  visit_count INTEGER NOT NULL DEFAULT 0,
  last_visit_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_guests_email ON guests(email);
CREATE INDEX idx_guests_phone ON guests(phone);

ALTER TABLE reservations ADD COLUMN res_date TEXT;
ALTER TABLE reservations ADD COLUMN contact_email TEXT;
ALTER TABLE reservations ADD COLUMN contact_phone TEXT;
ALTER TABLE reservations ADD COLUMN confirmation_code TEXT;
ALTER TABLE reservations ADD COLUMN source TEXT NOT NULL DEFAULT 'staff';
ALTER TABLE reservations ADD COLUMN guest_id INTEGER REFERENCES guests(id);
ALTER TABLE reservations ADD COLUMN notes TEXT;

UPDATE reservations SET res_date = date('now') WHERE res_date IS NULL;

CREATE INDEX idx_res_date ON reservations(res_date);
CREATE UNIQUE INDEX idx_res_confirmation ON reservations(confirmation_code) WHERE confirmation_code IS NOT NULL;

CREATE TABLE reservation_waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_name TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  party_size INTEGER NOT NULL,
  res_date TEXT NOT NULL,
  requested_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'notified', 'booked', 'expired')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_waitlist_date ON reservation_waitlist(res_date);
