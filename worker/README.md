# 11:Eleven staff/owner backend — deployment

This is the real backend behind `owner.html` and `host.html`: a Cloudflare
Worker (the API) plus a D1 database (the shared data). Identity is handled
entirely by **Cloudflare Access**, not by this code — there is no password
or PIN anywhere in here. Everything below happens in your own Cloudflare
account; nothing here can be run from a Claude session, since it needs your
login and billing account.

Prerequisites: your domain is already on Cloudflare (from the earlier
WAF/security-headers setup), and you have Node installed locally.

## 1. Log in and create the database

```
cd worker
npx wrangler login
npx wrangler d1 create eleven-eleven-staff
```

This prints a `database_id`. Copy it into `wrangler.toml`, replacing
`REPLACE_WITH_YOUR_D1_DATABASE_ID`.

## 2. Run the schema migration

```
npx wrangler d1 execute eleven-eleven-staff --remote --file=migrations/0001_init.sql
```

This creates the tables and seeds the menu with what's currently on the
public site, plus a starter set of tables matching the floor plan.

## 3. Add yourself as the first owner

The staff table starts empty — nobody can log in yet, including you. Add
your own email once, using your real one:

```
npx wrangler d1 execute eleven-eleven-staff --remote --command "INSERT INTO staff (email, name, role) VALUES ('you@yourdomain.com', 'Your Name', 'owner')"
```

After this, you can add everyone else through the Owner page's Staff tab —
you won't need to touch wrangler again for staff changes.

## 4. Deploy the Worker

```
npx wrangler deploy
```

This publishes the API at `11elevendallas.com/api/*` (per the `routes`
entry in `wrangler.toml`) — same domain as the rest of the site, so no
CORS configuration is needed.

## 5. Configure Cloudflare Access (this is the actual login)

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

## 6. Test it

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
