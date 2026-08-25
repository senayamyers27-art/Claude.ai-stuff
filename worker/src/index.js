/**
 * 11:Eleven staff/owner backend + guest-facing booking API.
 *
 * Two trust zones share this Worker:
 *  - /api/*    — staff tools. Identity comes from Cloudflare Access, which
 *                sits in front of this route and injects
 *                `Cf-Access-Authenticated-User-Email` on every request it has
 *                already authenticated. This Worker never asks for a
 *                password - it trusts that header, then looks the email up
 *                in the `staff` table to decide the caller's role.
 *  - /public/* — guest-facing booking. Deliberately NOT behind Access (real
 *                guests have no Cloudflare identity) - protected instead by
 *                the rate limits below and server-side validation.
 *
 * SECURITY REQUIREMENT: the Access application covering /api/* (e.g.
 * 11elevendallas.com/api/*) must be configured in the Cloudflare dashboard
 * BEFORE /api/* is safe to use - otherwise the email header is either absent
 * or, if someone reaches the Worker directly via its workers.dev URL instead
 * of through the Access-protected route, potentially forgeable. Disable the
 * workers.dev preview URL in the dashboard once this is deployed so /api/*
 * is only reachable through the Access-gated route. /public/* has no such
 * requirement - it's meant to be open.
 */

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function errorResponse(message, status) {
  return json({ error: message }, status);
}

/* ---------------- rate limiting ----------------
 * Cloudflare Access already keeps unauthenticated traffic out of /api/*, but
 * this throttles any single client (staff device gone haywire, a script, a
 * probe that reaches the Worker directly) to a sane request rate. /public/*
 * has no Access in front of it at all, so this is its only defense against
 * abuse - a stricter, separate limit applies to its write endpoints below.
 * Fixed window per minute (or custom window), per IP, stored in KV with a
 * self-expiring TTL. */
const RATE_LIMIT_PER_MINUTE = 120;

async function checkRateLimit(request, kv) {
  if (!kv) return null; // KV not bound (e.g. local dev without it) — skip rather than break.
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const windowKey = `rl:${ip}:${Math.floor(Date.now() / 60000)}`;
  const current = Number((await kv.get(windowKey)) || '0');
  if (current >= RATE_LIMIT_PER_MINUTE) {
    return errorResponse('Too many requests, slow down.', 429);
  }
  await kv.put(windowKey, String(current + 1), { expirationTtl: 90 });
  return null;
}

async function checkWriteRateLimit(request, kv, prefix, max, windowMinutes) {
  if (!kv) return null;
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const windowKey = `${prefix}:${ip}:${Math.floor(Date.now() / (windowMinutes * 60000))}`;
  const current = Number((await kv.get(windowKey)) || '0');
  if (current >= max) {
    return errorResponse('Too many requests, please try again later.', 429);
  }
  await kv.put(windowKey, String(current + 1), { expirationTtl: windowMinutes * 60 + 30 });
  return null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isPositiveInt(n, max = 1000) {
  return Number.isInteger(n) && n > 0 && n <= max;
}

async function getCaller(request, db) {
  const email = request.headers.get('Cf-Access-Authenticated-User-Email');
  if (!email) return null;
  const row = await db
    .prepare('SELECT id, email, name, role FROM staff WHERE email = ?')
    .bind(email.toLowerCase())
    .first();
  return row || null;
}

function requireRole(caller, roles) {
  if (!caller || !roles.includes(caller.role)) {
    return errorResponse('Forbidden', 403);
  }
  return null;
}

/* ---------------- menu ---------------- */

async function getMenu(db) {
  const categories = await db
    .prepare('SELECT id, name, sort_order FROM menu_categories ORDER BY sort_order')
    .all();
  const items = await db
    .prepare('SELECT id, category_id, name, price, sort_order FROM menu_items ORDER BY category_id, sort_order')
    .all();
  const byCategory = {};
  for (const item of items.results) {
    (byCategory[item.category_id] ||= []).push(item);
  }
  return categories.results.map((c) => ({
    id: c.id,
    name: c.name,
    items: (byCategory[c.id] || []).map((i) => ({ id: i.id, name: i.name, price: i.price })),
  }));
}

async function replaceMenu(db, categories) {
  const stmts = [
    db.prepare('DELETE FROM menu_items'),
    db.prepare('DELETE FROM menu_categories'),
  ];
  categories.forEach((cat, catIdx) => {
    stmts.push(
      db.prepare('INSERT INTO menu_categories (id, name, sort_order) VALUES (?, ?, ?)')
        .bind(catIdx + 1, String(cat.name || '').slice(0, 120), catIdx)
    );
    (cat.items || []).forEach((item, itemIdx) => {
      stmts.push(
        db.prepare('INSERT INTO menu_items (category_id, name, price, sort_order) VALUES (?, ?, ?, ?)')
          .bind(catIdx + 1, String(item.name || '').slice(0, 200), String(item.price || '').slice(0, 40), itemIdx)
      );
    });
  });
  await db.batch(stmts);
}

/* ---------------- staff ---------------- */

async function listStaff(db) {
  const res = await db.prepare('SELECT id, email, name, role, created_at FROM staff ORDER BY created_at').all();
  return res.results;
}

/* ---------------- floor ---------------- */

async function getFloor(db) {
  const res = await db
    .prepare(
      `SELECT t.id, t.label, t.capacity, t.status, t.sort_order,
              r.id AS reservation_id, r.guest_name, r.party_size
       FROM tables t
       LEFT JOIN reservations r ON r.table_id = t.id AND r.status = 'seated'
       ORDER BY t.sort_order`
    )
    .all();
  return res.results;
}

/* ---------------- reservations / walk-ins (staff) ---------------- */

async function getTonightReservations(db) {
  const today = new Date().toISOString().slice(0, 10);
  const res = await db
    .prepare(
      `SELECT id, guest_name, party_size, time_slot, table_id, tag, status, contact_email, contact_phone, source, notes
       FROM reservations WHERE status != 'cancelled' AND res_date = ? ORDER BY time_slot`
    )
    .bind(today)
    .all();
  return res.results;
}

async function getWalkins(db) {
  const res = await db
    .prepare(`SELECT id, guest_name, party_size, position, waited_since, status FROM walkins WHERE status = 'waiting' ORDER BY position`)
    .all();
  return res.results;
}

/* ---------------- guest CRM (staff) ---------------- */

async function listGuests(db, search) {
  let query = `SELECT id, name, email, phone, notes, tags, visit_count, last_visit_at FROM guests`;
  const params = [];
  if (search) {
    query += ` WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?`;
    const like = `%${search}%`;
    params.push(like, like, like);
  }
  query += ` ORDER BY (last_visit_at IS NULL), last_visit_at DESC, name`;
  const res = await db.prepare(query).bind(...params).all();
  return res.results;
}

/* ---------------- stats ---------------- */

async function getOverview(db) {
  const today = new Date().toISOString().slice(0, 10);
  const covers = await db
    .prepare(`SELECT COALESCE(SUM(party_size), 0) AS n FROM reservations WHERE status = 'seated'`)
    .first();
  const vip7d = await db
    .prepare(`SELECT COUNT(*) AS n FROM reservations WHERE tag = 'VIP' AND created_at >= datetime('now', '-7 days')`)
    .first();
  const stat = await db
    .prepare('SELECT revenue_cents, avg_turn_minutes FROM nightly_stats WHERE stat_date = ?')
    .bind(today)
    .first();
  return {
    coversTonight: covers?.n || 0,
    vipBookings7d: vip7d?.n || 0,
    revenueCents: stat?.revenue_cents ?? null,
    avgTurnMinutes: stat?.avg_turn_minutes ?? null,
  };
}

async function setNightlyStats(db, enteredBy, body) {
  const today = new Date().toISOString().slice(0, 10);
  await db
    .prepare(
      `INSERT INTO nightly_stats (stat_date, revenue_cents, avg_turn_minutes, entered_by)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(stat_date) DO UPDATE SET
         revenue_cents = excluded.revenue_cents,
         avg_turn_minutes = excluded.avg_turn_minutes,
         entered_by = excluded.entered_by`
    )
    .bind(today, body.revenueCents ?? null, body.avgTurnMinutes ?? null, enteredBy)
    .run();
}

/* ---------------- guest booking (public) ----------------
 * Simple capacity-based availability: no per-table assignment optimization,
 * just "does the venue have enough total open capacity across a 2-hour turn
 * window starting at this slot." Good enough for a single-venue lounge;
 * not what you'd want for a large multi-section restaurant. */

const VENUE_HOURS = {
  // 0=Sun..6=Sat, matches the footer's posted hours. Close hour >24
  // represents "past midnight, same service night" (e.g. 25:00 = 1am).
  0: { open: '15:00', close: '25:00' }, // Sun 3pm–1am
  1: null, // Mon closed
  2: null, // Tue closed
  3: { open: '15:00', close: '23:00' }, // Wed 3pm–11pm
  4: { open: '15:00', close: '23:00' }, // Thu 3pm–11pm
  5: { open: '15:00', close: '23:00' }, // Fri 3pm–11pm
  6: { open: '15:00', close: '25:00' }, // Sat 3pm–1am
};
const TURN_MINUTES = 120;
const LAST_SEATING_BUFFER_MINUTES = 60;
const SLOT_INTERVAL_MINUTES = 30;
const MAX_BOOKING_DAYS_OUT = 90;

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}
function fromMinutes(mins) {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function generateSlots(dateStr) {
  const dow = new Date(dateStr + 'T00:00:00Z').getUTCDay();
  const hours = VENUE_HOURS[dow];
  if (!hours) return [];
  const openMin = toMinutes(hours.open);
  const closeMin = toMinutes(hours.close);
  const lastSeating = closeMin - LAST_SEATING_BUFFER_MINUTES;
  const slots = [];
  for (let m = openMin; m <= lastSeating; m += SLOT_INTERVAL_MINUTES) {
    slots.push(fromMinutes(m));
  }
  return slots;
}

function overlaps(aStartMin, bStartMin, turnMin) {
  return aStartMin < bStartMin + turnMin && bStartMin < aStartMin + turnMin;
}

async function getVenueCapacity(db) {
  const row = await db.prepare('SELECT COALESCE(SUM(capacity), 0) AS cap FROM tables').first();
  return row?.cap || 0;
}

async function getBookedForDate(db, dateStr) {
  const res = await db
    .prepare(`SELECT time_slot, party_size FROM reservations WHERE res_date = ? AND status != 'cancelled'`)
    .bind(dateStr)
    .all();
  return res.results;
}

async function getAvailability(db, dateStr, partySize) {
  const slots = generateSlots(dateStr);
  if (!slots.length) return [];
  const capacity = await getVenueCapacity(db);
  const booked = await getBookedForDate(db, dateStr);
  return slots.map((slot) => {
    const slotMin = toMinutes(slot);
    const bookedAtOverlap = booked
      .filter((b) => overlaps(slotMin, toMinutes(b.time_slot), TURN_MINUTES))
      .reduce((sum, b) => sum + b.party_size, 0);
    const remaining = Math.max(0, capacity - bookedAtOverlap);
    return { time: slot, available: remaining >= partySize, remaining };
  });
}

function genConfirmationCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous 0/O/1/I
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[bytes[i] % chars.length];
  return code;
}

async function upsertGuest(db, { name, email, phone }) {
  let existing = null;
  if (email) existing = await db.prepare('SELECT id FROM guests WHERE email = ?').bind(email).first();
  if (!existing && phone) existing = await db.prepare('SELECT id FROM guests WHERE phone = ?').bind(phone).first();
  if (existing) return existing.id;
  const result = await db
    .prepare('INSERT INTO guests (name, email, phone) VALUES (?, ?, ?)')
    .bind(name, email, phone)
    .run();
  return result.meta.last_row_id;
}

function validBookingInput(body) {
  const name = String(body.name || '').trim().slice(0, 120);
  const email = body.email ? String(body.email).trim().toLowerCase().slice(0, 200) : null;
  const phone = body.phone ? String(body.phone).trim().slice(0, 40) : null;
  const partySize = Number(body.partySize);
  const date = String(body.date || '');
  const time = String(body.time || '');

  if (!name) return { error: 'Name is required' };
  if (!email && !phone) return { error: 'A valid email or phone number is required' };
  if (email && !EMAIL_RE.test(email)) return { error: 'Please enter a valid email' };
  if (!isPositiveInt(partySize, 20)) return { error: 'Party size must be between 1 and 20' };
  if (!DATE_RE.test(date)) return { error: 'Invalid date' };

  const today = new Date().toISOString().slice(0, 10);
  const maxDate = new Date(Date.now() + MAX_BOOKING_DAYS_OUT * 86400000).toISOString().slice(0, 10);
  if (date < today) return { error: 'Date cannot be in the past' };
  if (date > maxDate) return { error: 'Date is too far in advance' };

  return { name, email, phone, partySize, date, time };
}

async function createPublicReservation(db, body) {
  const v = validBookingInput(body);
  if (v.error) return v;
  const notes = body.notes ? String(body.notes).trim().slice(0, 500) : null;

  const validSlots = generateSlots(v.date);
  if (!validSlots.includes(v.time)) return { error: 'That time is not a valid slot for this date' };

  const availability = await getAvailability(db, v.date, v.partySize);
  const slot = availability.find((s) => s.time === v.time);
  if (!slot || !slot.available) return { error: 'That time is no longer available.', full: true };

  const guestId = await upsertGuest(db, { name: v.name, email: v.email, phone: v.phone });
  const code = genConfirmationCode();

  await db
    .prepare(
      `INSERT INTO reservations
         (guest_name, party_size, time_slot, res_date, contact_email, contact_phone, confirmation_code, source, guest_id, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'online', ?, ?)`
    )
    .bind(v.name, v.partySize, v.time, v.date, v.email, v.phone, code, guestId, notes)
    .run();

  return { ok: true, confirmationCode: code };
}

async function lookupReservation(db, code) {
  const row = await db
    .prepare(
      `SELECT id, guest_name, party_size, res_date, time_slot, status, notes
       FROM reservations WHERE confirmation_code = ?`
    )
    .bind(String(code || '').toUpperCase())
    .first();
  return row || null;
}

async function cancelReservation(db, code) {
  const row = await lookupReservation(db, code);
  if (!row) return { error: 'Reservation not found', status: 404 };
  if (row.status === 'cancelled') return { ok: true, alreadyCancelled: true };
  await db.prepare(`UPDATE reservations SET status = 'cancelled' WHERE id = ?`).bind(row.id).run();
  return { ok: true };
}

async function joinWaitlist(db, body) {
  const v = validBookingInput(body);
  if (v.error) return v;
  await db
    .prepare(
      `INSERT INTO reservation_waitlist (guest_name, contact_email, contact_phone, party_size, res_date, requested_time)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .bind(v.name, v.email, v.phone, v.partySize, v.date, v.time)
    .run();
  return { ok: true };
}

/* ---------------- data retention (auto-delete) ----------------
 * See DATA_RETENTION.md for the retention periods and rationale. Runs on
 * the cron trigger in wrangler.toml. */
async function cleanupOldData(db) {
  await db.batch([
    db.prepare(`DELETE FROM reservations WHERE status IN ('completed', 'cancelled') AND created_at < datetime('now', '-365 days')`),
    db.prepare(`DELETE FROM walkins WHERE status IN ('seated', 'left') AND waited_since < datetime('now', '-30 days')`),
    db.prepare(`DELETE FROM nightly_stats WHERE created_at < datetime('now', '-730 days')`),
    db.prepare(`DELETE FROM reservation_waitlist WHERE status IN ('booked', 'expired') AND created_at < datetime('now', '-90 days')`),
  ]);
}

/* ---------------- public (guest-facing) router ---------------- */

async function handlePublic(request, env, url) {
  const db = env.DB;
  const path = url.pathname.replace(/^\/public/, '') || '/';

  try {
    if (path === '/availability' && request.method === 'GET') {
      const date = url.searchParams.get('date') || '';
      const partySizeRaw = Number(url.searchParams.get('partySize') || '2');
      const partySize = isPositiveInt(partySizeRaw, 20) ? partySizeRaw : 2;
      if (!DATE_RE.test(date)) return errorResponse('date=YYYY-MM-DD is required', 400);
      const slots = await getAvailability(db, date, partySize);
      return json({ date, partySize, slots });
    }

    if (path === '/reservations' && request.method === 'POST') {
      const limited = await checkWriteRateLimit(request, env.RATE_LIMIT, 'pub-res', 5, 60);
      if (limited) return limited;
      const body = await request.json();
      const result = await createPublicReservation(db, body);
      if (result.error) return errorResponse(result.error, 400);
      return json(result);
    }

    if (path.match(/^\/reservations\/[A-Z0-9]{4,10}$/i) && request.method === 'GET') {
      const code = path.split('/')[2];
      const row = await lookupReservation(db, code);
      if (!row) return errorResponse('Reservation not found', 404);
      return json(row);
    }

    if (path.match(/^\/reservations\/[A-Z0-9]{4,10}\/cancel$/i) && request.method === 'PATCH') {
      const code = path.split('/')[2];
      const result = await cancelReservation(db, code);
      if (result.error) return errorResponse(result.error, result.status || 400);
      return json(result);
    }

    if (path === '/waitlist' && request.method === 'POST') {
      const limited = await checkWriteRateLimit(request, env.RATE_LIMIT, 'pub-wait', 5, 60);
      if (limited) return limited;
      const body = await request.json();
      const result = await joinWaitlist(db, body);
      if (result.error) return errorResponse(result.error, 400);
      return json(result);
    }

    return errorResponse('Not found', 404);
  } catch (err) {
    return errorResponse(`Server error: ${err.message}`, 500);
  }
}

/* ---------------- staff router ---------------- */

export default {
  async scheduled(event, env) {
    await cleanupOldData(env.DB);
  },

  async fetch(request, env) {
    const url = new URL(request.url);
    const db = env.DB;

    try {
      const limited = await checkRateLimit(request, env.RATE_LIMIT);
      if (limited) return limited;

      if (url.pathname.startsWith('/public/')) {
        return await handlePublic(request, env, url);
      }

      const path = url.pathname.replace(/^\/api/, '') || '/';

      const caller = await getCaller(request, db);
      if (!caller) {
        return errorResponse('Not recognized as staff. Ask an owner to add your email.', 401);
      }

      if (path === '/me') {
        // A real browser navigation (not the app's own background fetch) landing here
        // means host.js/owner.js redirected here after fetch('/me') failed with no
        // status - the signature of Access intercepting the request with a
        // cross-origin redirect that fetch() can't follow. Access has already
        // authenticated this request by the time we get here, so send the browser
        // back to the right dashboard instead of showing it raw JSON.
        if (request.headers.get('Sec-Fetch-Mode') === 'navigate') {
          const dest = caller.role === 'owner' ? '/owner.html' : '/host.html';
          return Response.redirect(new URL(dest, url.origin), 302);
        }
        return json({ email: caller.email, name: caller.name, role: caller.role });
      }

      if (path === '/menu' && request.method === 'GET') {
        return json(await getMenu(db));
      }
      if (path === '/menu' && request.method === 'PUT') {
        const forbidden = requireRole(caller, ['owner']);
        if (forbidden) return forbidden;
        const body = await request.json();
        await replaceMenu(db, body.categories || []);
        return json({ ok: true });
      }

      if (path === '/staff' && request.method === 'GET') {
        const forbidden = requireRole(caller, ['owner']);
        if (forbidden) return forbidden;
        return json(await listStaff(db));
      }
      if (path === '/staff' && request.method === 'POST') {
        const forbidden = requireRole(caller, ['owner']);
        if (forbidden) return forbidden;
        const body = await request.json();
        const email = String(body.email || '').toLowerCase().trim();
        const role = body.role === 'owner' ? 'owner' : 'host';
        if (!EMAIL_RE.test(email) || !String(body.name || '').trim()) {
          return errorResponse('A valid email and name are required', 400);
        }
        await db
          .prepare('INSERT INTO staff (email, name, role) VALUES (?, ?, ?)')
          .bind(email, String(body.name).slice(0, 120), role)
          .run();
        return json({ ok: true });
      }
      if (path.match(/^\/staff\/\d+$/) && request.method === 'DELETE') {
        const forbidden = requireRole(caller, ['owner']);
        if (forbidden) return forbidden;
        const id = path.split('/')[2];
        await db.prepare('DELETE FROM staff WHERE id = ?').bind(id).run();
        return json({ ok: true });
      }

      if (path === '/floor' && request.method === 'GET') {
        const forbidden = requireRole(caller, ['owner', 'host']);
        if (forbidden) return forbidden;
        return json(await getFloor(db));
      }
      if (path.match(/^\/floor\/\d+$/) && request.method === 'PATCH') {
        const forbidden = requireRole(caller, ['owner', 'host']);
        if (forbidden) return forbidden;
        const id = path.split('/')[2];
        const body = await request.json();
        const status = ['open', 'seated', 'held'].includes(body.status) ? body.status : 'open';
        await db.prepare('UPDATE tables SET status = ? WHERE id = ?').bind(status, id).run();
        return json({ ok: true });
      }

      if (path === '/reservations' && request.method === 'GET') {
        const forbidden = requireRole(caller, ['owner', 'host']);
        if (forbidden) return forbidden;
        return json(await getTonightReservations(db));
      }
      if (path === '/reservations' && request.method === 'POST') {
        const forbidden = requireRole(caller, ['owner', 'host']);
        if (forbidden) return forbidden;
        const body = await request.json();
        if (!String(body.guestName || '').trim() || !isPositiveInt(body.partySize, 50) || !String(body.timeSlot || '').trim()) {
          return errorResponse('guestName, a valid partySize (1-50), and timeSlot are required', 400);
        }
        const resDate = DATE_RE.test(body.date || '') ? body.date : new Date().toISOString().slice(0, 10);
        await db
          .prepare(
            `INSERT INTO reservations (guest_name, party_size, time_slot, table_id, tag, res_date, source)
             VALUES (?, ?, ?, ?, ?, ?, 'staff')`
          )
          .bind(body.guestName, body.partySize, body.timeSlot, body.tableId || null, body.tag || null, resDate)
          .run();
        return json({ ok: true });
      }
      if (path.match(/^\/reservations\/\d+$/) && request.method === 'PATCH') {
        const forbidden = requireRole(caller, ['owner', 'host']);
        if (forbidden) return forbidden;
        const id = path.split('/')[2];
        const body = await request.json();
        const fields = [];
        const values = [];
        if (body.status) { fields.push('status = ?'); values.push(body.status); }
        if (body.tableId !== undefined) { fields.push('table_id = ?'); values.push(body.tableId); }
        if (!fields.length) return errorResponse('nothing to update', 400);
        values.push(id);
        await db.prepare(`UPDATE reservations SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();

        if (body.status === 'seated') {
          const row = await db.prepare('SELECT guest_id FROM reservations WHERE id = ?').bind(id).first();
          if (row?.guest_id) {
            await db
              .prepare(`UPDATE guests SET visit_count = visit_count + 1, last_visit_at = datetime('now') WHERE id = ?`)
              .bind(row.guest_id)
              .run();
          }
        }
        return json({ ok: true });
      }

      if (path === '/walkins' && request.method === 'GET') {
        const forbidden = requireRole(caller, ['owner', 'host']);
        if (forbidden) return forbidden;
        return json(await getWalkins(db));
      }
      if (path === '/walkins' && request.method === 'POST') {
        const forbidden = requireRole(caller, ['owner', 'host']);
        if (forbidden) return forbidden;
        const body = await request.json();
        if (!String(body.guestName || '').trim() || !isPositiveInt(body.partySize, 50)) {
          return errorResponse('guestName and a valid partySize (1-50) are required', 400);
        }
        const maxPos = await db.prepare(`SELECT COALESCE(MAX(position), 0) AS n FROM walkins WHERE status = 'waiting'`).first();
        await db
          .prepare('INSERT INTO walkins (guest_name, party_size, position) VALUES (?, ?, ?)')
          .bind(body.guestName, body.partySize, (maxPos?.n || 0) + 1)
          .run();
        return json({ ok: true });
      }
      if (path.match(/^\/walkins\/\d+$/) && request.method === 'PATCH') {
        const forbidden = requireRole(caller, ['owner', 'host']);
        if (forbidden) return forbidden;
        const id = path.split('/')[2];
        const body = await request.json();
        const status = ['waiting', 'seated', 'left'].includes(body.status) ? body.status : 'waiting';
        await db.prepare('UPDATE walkins SET status = ? WHERE id = ?').bind(status, id).run();
        return json({ ok: true });
      }

      if (path === '/guests' && request.method === 'GET') {
        const forbidden = requireRole(caller, ['owner']);
        if (forbidden) return forbidden;
        const search = url.searchParams.get('q') || '';
        return json(await listGuests(db, search));
      }
      if (path.match(/^\/guests\/\d+$/) && request.method === 'DELETE') {
        const forbidden = requireRole(caller, ['owner']);
        if (forbidden) return forbidden;
        const id = path.split('/')[2];
        // Keep the reservation history, just detach it from the deleted profile.
        await db.prepare('UPDATE reservations SET guest_id = NULL WHERE guest_id = ?').bind(id).run();
        await db.prepare('DELETE FROM guests WHERE id = ?').bind(id).run();
        return json({ ok: true });
      }

      if (path === '/stats/overview' && request.method === 'GET') {
        const forbidden = requireRole(caller, ['owner']);
        if (forbidden) return forbidden;
        return json(await getOverview(db));
      }
      if (path === '/stats/nightly' && request.method === 'POST') {
        const forbidden = requireRole(caller, ['owner']);
        if (forbidden) return forbidden;
        const body = await request.json();
        await setNightlyStats(db, caller.email, body);
        return json({ ok: true });
      }

      return errorResponse('Not found', 404);
    } catch (err) {
      return errorResponse(`Server error: ${err.message}`, 500);
    }
  },
};
