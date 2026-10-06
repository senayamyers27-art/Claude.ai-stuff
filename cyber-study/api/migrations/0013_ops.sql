-- Operations: unexpected server errors (route and the error's first line only: no request bodies, emails or IPs),
-- kept 30 days, for the hourly error alert; and small key/value state for the alert and the weekly summary.
CREATE TABLE server_errors (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  at       INTEGER NOT NULL,
  route    TEXT NOT NULL,          -- e.g. 'POST /v1/classes/:id/assignments'
  message  TEXT NOT NULL           -- first line of the error, at most 200 characters
);
CREATE INDEX server_errors_at ON server_errors(at);
CREATE TABLE ops_state (
  key    TEXT PRIMARY KEY,
  value  TEXT NOT NULL
);
