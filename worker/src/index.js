/**
 * 11:Eleven staff/owner backend.
 *
 * Identity comes from Cloudflare Access, not from this code: Access sits in
 * front of this Worker's route and injects `Cf-Access-Authenticated-User-Email`
 * on every request it has already authenticated. This Worker never asks for a
 * password - it trusts that header, then looks the email up in the `staff`
 * table to decide the caller's role (owner vs host).
 *
 * SECURITY REQUIREMENT: the Access application covering this Worker's route
 * (e.g. 11elevendallas.com/api/*) must be configured in the Cloudflare
 * dashboard BEFORE this is useful - otherwise the email header is either
 * absent or, if someone reaches the Worker directly via its workers.dev URL
 * instead of through the Access-protected route, potentially forgeable.
 * Disable the workers.dev preview URL in the dashboard once this is deployed
 * so the Worker is only reachable through the Access-gated route.
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

/* ---------------- reservations / walk-ins ---------------- */

async function getTonightReservations(db) {
  const res = await db
    .prepare(
      `SELECT id, guest_name, party_size, time_slot, table_id, tag, status
       FROM reservations WHERE status != 'cancelled' ORDER BY time_slot`
    )
    .all();
  return res.results;
}

async function getWalkins(db) {
  const res = await db
    .prepare(`SELECT id, guest_name, party_size, position, waited_since, status FROM walkins WHERE status = 'waiting' ORDER BY position`)
    .all();
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

/* ---------------- router ---------------- */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/api/, '') || '/';
    const db = env.DB;

    const caller = await getCaller(request, db);
    if (!caller) {
      return errorResponse('Not recognized as staff. Ask an owner to add your email.', 401);
    }

    try {
      if (path === '/me') {
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
        if (!email || !body.name) return errorResponse('email and name required', 400);
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
        if (!body.guestName || !body.partySize || !body.timeSlot) {
          return errorResponse('guestName, partySize, timeSlot required', 400);
        }
        await db
          .prepare('INSERT INTO reservations (guest_name, party_size, time_slot, table_id, tag) VALUES (?, ?, ?, ?, ?)')
          .bind(body.guestName, body.partySize, body.timeSlot, body.tableId || null, body.tag || null)
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
        if (!body.guestName || !body.partySize) return errorResponse('guestName, partySize required', 400);
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
