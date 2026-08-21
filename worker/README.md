# 11:Eleven staff/owner backend — deployment

This is the real backend behind `owner.html` and `host.html`: a Cloudflare
Worker (the API) plus a D1 database (the shared data). Identity is handled
entirely by **Cloudflare Access**, not by this code — there is no password
or PIN anywhere in here. Everything below happens in your own Cloudflare
account; nothing here can be run from a Claude session, since it needs your
login and billing account.

Prerequisites: your domain is already on Cloudflare (from the earlier
WAF/security-headers setup), and you have Node installed locally.

## 1. Database — already created

The D1 database (`eleven-eleven-staff`) and its schema already exist in
your Cloudflare account — created and migrated directly via the
Cloudflare API in this session, tables and seed menu/floor data included.
`wrangler.toml`'s `database_id` is already set to the real one. You don't
need to run `wrangler d1 create` or the migration yourself — doing so
again would fail with "table already exists," which is fine to ignore if
it happens, but there's nothing to do here.

You do still need to log in once before the next steps, since deploying
the Worker and adding staff both need your own Cloudflare credentials:

```
cd worker
npx wrangler login
```

## 2. Add yourself as the first owner — already done

`senaya.myers27@gmail.com` is already in the `staff` table with role
`owner` (added directly via the Cloudflare API in this session). Nothing
to run here. Add everyone else through the Owner page's Staff tab once
the Worker is deployed and Access is configured below.

## 3. Deploy the Worker

```
npx wrangler deploy
```

This publishes the API at `11elevendallas.com/api/*` (per the `routes`
entry in `wrangler.toml`) — same domain as the rest of the site, so no
CORS configuration is needed. It also picks up the KV binding
(`RATE_LIMIT`, for per-IP request throttling) and the nightly cron trigger
(auto-delete of old data — see `DATA_RETENTION.md`) already declared in
`wrangler.toml`; there's nothing extra to configure for either.

## 4. Configure Cloudflare Access (this is the actual login)

In the Cloudflare dashboard: **Zero Trust → Access → Applications → Add an
application → Self-hosted**.

Create **three** applications, all on domain `11elevendallas.com`:

| Name | Path | Who to include |
|---|---|---|
| Owner | `/owner.html` | Owner email(s) only |
| Host | `/host.html` | All staff emails |
| Staff API | `/api/*` | All staff emails (owners + hosts both need this — it's what lets the pages actually load data) |

Login method: email one-time code works with no extra setup. Add
Google/Microsoft SSO later if your team already uses one.

**Important:** once this is live, go to the Worker's settings in the
dashboard and **disable the workers.dev preview URL**. Without that step,
someone could reach the API directly at its `*.workers.dev` address,
bypassing Access entirely — the `/api/*` route on your real domain is the
only path that should work.

## Backups

Cloudflare D1 keeps 30 days of point-in-time recovery automatically — no
setup needed (`wrangler d1 time-travel`). On top of that,
`.github/workflows/d1-backup.yml` runs a nightly `wrangler d1 export` and
uploads the SQL dump as a workflow artifact (kept 35 days). It's disabled
until you add:

- Repo variable `CLOUDFLARE_ACCOUNT_ID` (Settings → Secrets and variables →
  Actions → Variables)
- Repo secret `CLOUDFLARE_API_TOKEN` (same page, Secrets tab) — a token
  scoped to **D1: Edit** on this account is enough, no need for a
  full-account token.

## Rate limiting & data retention — already in place

- Every `/api/*` request is throttled per IP (120 req/min) using the
  `RATE_LIMIT` KV namespace bound in `wrangler.toml` — no dashboard config
  needed, it deploys with the Worker.
- A nightly cron (`0 9 * * *`, also in `wrangler.toml`) deletes data past
  its retention window. See `DATA_RETENTION.md` for exactly what's kept
  and for how long.

## What's dashboard-only (can't be done from a Claude session)

A few of the standard hardening items don't have an API/CLI path and have
to be turned on by hand in the Cloudflare dashboard once the domain's
nameservers point at Cloudflare:

- **WAF** (managed rules) — Security → WAF on the zone.
- **Bot Management / IDS-IPS-style traffic inspection** — Security →
  Bots, and Security → Analytics for anomaly visibility.
- **Edge-level Rate Limiting Rules** — a second, zone-wide layer on top of
  the per-Worker one above; Security → WAF → Rate limiting rules.
- **Access session duration** ("session timeout") — set per-application
  when you create the three Access apps in step 4 above.
- **CAPTCHA (Turnstile)** — there's no public-facing form on this site that
  submits directly to our own backend right now (the reservation form on
  the homepage hands off entirely to SevenRooms, which runs its own bot
  protection), so there's nothing to attach a Turnstile widget to yet. If
  a form that posts straight to `/api/*` gets added later, wire Turnstile
  in then.

## 5. Test it

Visit `11elevendallas.com/owner.html` — you should hit the Access login
first (email code), then land on the Owner page signed in as yourself.
Add a staff member with role "host" through the Staff tab, then have them
visit `11elevendallas.com/host.html` to confirm they get in and you don't
see the Owner-only tabs when signed in as them.

## What this does and doesn't do yet

- **Menu & Pricing**: fully shared and live between all staff — not yet
  connected to the public menu on the homepage. Ask if you want that wired
  up next.
- **Floor / reservations / walk-ins**: fully shared and live — this is a
  staff-facing tool, separate from SevenRooms (your actual guest booking
  system). Guests never see or touch this.
- **Business overview**: covers and VIP-bookings counts are computed from
  real reservation data; revenue and average turn time are entered
  manually each night until there's a POS integration to pull them from.
- The old staff/host view baked into `reserve.html` (PIN `1111`) still
  exists in that file but is no longer linked from anywhere on the site —
  it's harmless dead code, superseded by `host.html`.
