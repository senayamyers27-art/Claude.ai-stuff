# Data retention policy

What the staff backend (D1 database `eleven-eleven-staff`) keeps, for how
long, and how it's deleted.

| Data | Retention | Deleted by |
|---|---|---|
| Reservations (`completed` / `cancelled`) | 1 year | nightly cron |
| Walk-ins (`seated` / `left`) | 30 days | nightly cron |
| Nightly stats (revenue, avg turn) | 2 years | nightly cron |
| Active/open reservations, walk-ins, table status | kept until resolved | n/a |
| Staff roster | kept until an owner removes it | manual only |
| Menu & pricing | kept until an owner edits it | manual only |

## How it's enforced

`worker/src/index.js` exports a `scheduled()` handler wired to the cron
trigger in `wrangler.toml` (`0 7 * * *`, ~02:00 America/Chicago). It runs
`cleanupOldData()`, which deletes rows past the windows above. Nothing here
is a soft-delete — rows are gone from the live database once the window
passes.

## Backups vs. retention

These are separate concerns:

- **Retention** (this doc) decides what data the app is allowed to keep at
  all, and for how long, independent of backups.
- **Backups** (`worker/README.md` / the `d1-backup.yml` workflow, plus
  Cloudflare D1's own 30-day point-in-time recovery) exist to recover from
  accidental deletes or bugs — they are not a way to keep data past its
  retention window on purpose. A backup snapshot itself ages out after the
  same 2-year outer bound as `nightly_stats`.

## Changing the windows

Edit the intervals in `cleanupOldData()` in `worker/src/index.js` and this
table together, then redeploy (`wrangler deploy`).
