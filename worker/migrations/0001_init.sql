-- 11:Eleven staff/owner backend — initial schema

CREATE TABLE staff (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'host')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE menu_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE menu_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE tables (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 4,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'seated', 'held')),
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_name TEXT NOT NULL,
  party_size INTEGER NOT NULL,
  time_slot TEXT NOT NULL,
  table_id INTEGER REFERENCES tables(id) ON DELETE SET NULL,
  tag TEXT,
  status TEXT NOT NULL DEFAULT 'booked' CHECK (status IN ('booked', 'seated', 'completed', 'cancelled')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE walkins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_name TEXT NOT NULL,
  party_size INTEGER NOT NULL,
  position INTEGER NOT NULL,
  waited_since TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'seated', 'left'))
);

CREATE TABLE nightly_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stat_date TEXT NOT NULL UNIQUE,
  revenue_cents INTEGER,
  avg_turn_minutes INTEGER,
  entered_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Seed: menu categories/items matching the current public site
INSERT INTO menu_categories (name, sort_order) VALUES
  ('Bar', 0), ('Food', 1), ('Hookah', 2), ('Bottle Service', 3);

INSERT INTO menu_items (category_id, name, price, sort_order) VALUES
  (1, 'Signature Old Fashioned', '16', 0),
  (1, 'Blush Spritz', '15', 1),
  (1, 'House Red / White (glass)', '13', 2),
  (2, 'Mediterranean Mezze Board', '24', 0),
  (2, 'Truffle Fries', '14', 1),
  (3, 'Classic Blend', '35', 0),
  (3, 'House Specialty Blend', '45', 1),
  (4, 'VIP Booth Minimum', '200', 0),
  (4, 'Private Bar Minimum', '1000', 1);

-- Seed: a starter set of tables matching the floor plan
INSERT INTO tables (label, capacity, sort_order) VALUES
  ('Main Bar 1', 2, 0), ('Main Bar 2', 2, 1),
  ('Booth A', 6, 2), ('Booth B', 6, 3), ('Booth C', 8, 4), ('Booth D', 8, 5),
  ('VIP Booth 1', 8, 6), ('VIP Booth 2', 8, 7), ('VIP Booth 3', 10, 8), ('Private Bar', 15, 9);
