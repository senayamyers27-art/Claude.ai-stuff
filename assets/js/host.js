/* Host interface — talks to the staff API at /api/*.
   Same identity model as owner.js: Cloudflare Access authenticates the
   person, this page just calls the API and trusts its role check. */

const API = '/api';

async function api(path, options = {}) {
  const res = await fetch(API + path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.error || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

function timeAgo(iso) {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso + 'Z').getTime()) / 60000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

document.addEventListener('DOMContentLoaded', async () => {
  const loadingState = document.getElementById('loadingState');
  const deniedState = document.getElementById('deniedState');
  const errorState = document.getElementById('errorState');
  const hostScreen = document.getElementById('hostScreen');

  let me;
  try {
    me = await api('/me');
  } catch (err) {
    loadingState.style.display = 'none';
    if (err.status === 401 || err.status === 403) {
      document.getElementById('deniedMsg').textContent = err.message;
      deniedState.style.display = 'block';
    } else {
      errorState.style.display = 'block';
    }
    return;
  }

  loadingState.style.display = 'none';
  hostScreen.style.display = 'block';
  document.getElementById('whoamiName').textContent = me.name;
  document.getElementById('whoamiEmail').textContent = `${me.email} · ${me.role}`;

  /* ---------- tabs ---------- */
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-' + tab.dataset.panel).classList.add('active');
    });
  });

  /* ---------- tonight's book ---------- */
  async function loadBook() {
    const res = await api('/reservations');
    document.getElementById('bookRows').innerHTML = res.map((r) => `
      <tr>
        <td>${escapeHtml(r.time_slot)}</td>
        <td>${escapeHtml(r.guest_name)}</td>
        <td>${r.party_size}</td>
        <td>${r.tag ? `<span class="tag-pill">${escapeHtml(r.tag)}</span>` : ''}</td>
        <td>
          <button class="status-btn ${r.status === 'seated' ? 'active' : ''}" data-id="${r.id}" data-status="seated">Seated</button>
          <button class="status-btn ${r.status === 'cancelled' ? 'active' : ''}" data-id="${r.id}" data-status="cancelled">Cancel</button>
        </td>
      </tr>
    `).join('') || '<tr><td colspan="5" style="color:var(--dim)">Nothing on the book yet tonight.</td></tr>';
    document.querySelectorAll('#bookRows .status-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        await api(`/reservations/${btn.dataset.id}`, { method: 'PATCH', body: JSON.stringify({ status: btn.dataset.status }) });
        loadBook();
        loadFloor();
      });
    });
  }
  document.getElementById('addResBtn').addEventListener('click', async () => {
    const timeSlot = document.getElementById('rTime').value.trim();
    const guestName = document.getElementById('rName').value.trim();
    const partySize = Number(document.getElementById('rParty').value);
    if (!timeSlot || !guestName || !partySize) return;
    await api('/reservations', { method: 'POST', body: JSON.stringify({ timeSlot, guestName, partySize }) });
    document.getElementById('rTime').value = '';
    document.getElementById('rName').value = '';
    document.getElementById('rParty').value = '';
    loadBook();
  });

  /* ---------- floor ---------- */
  async function loadFloor() {
    const tables = await api('/floor');
    document.getElementById('floorGrid').innerHTML = tables.map((t) => `
      <div class="table-card">
        <div class="label">${escapeHtml(t.label)}</div>
        <div class="cap">Seats ${t.capacity}</div>
        <div class="guest">${t.guest_name ? escapeHtml(t.guest_name) + ' · ' + t.party_size : ''}</div>
        <div>
          <button class="status-btn ${t.status === 'open' ? 'active' : ''}" data-id="${t.id}" data-status="open">Open</button>
          <button class="status-btn ${t.status === 'held' ? 'active' : ''}" data-id="${t.id}" data-status="held">Held</button>
          <button class="status-btn ${t.status === 'seated' ? 'active' : ''}" data-id="${t.id}" data-status="seated">Seated</button>
        </div>
      </div>
    `).join('');
    document.querySelectorAll('#floorGrid .status-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        await api(`/floor/${btn.dataset.id}`, { method: 'PATCH', body: JSON.stringify({ status: btn.dataset.status }) });
        loadFloor();
      });
    });
  }

  /* ---------- walk-ins ---------- */
  async function loadWalkins() {
    const list = await api('/walkins');
    document.getElementById('walkinRows').innerHTML = list.map((w) => `
      <tr>
        <td>${w.position}</td>
        <td>${escapeHtml(w.guest_name)}</td>
        <td>${w.party_size}</td>
        <td>${timeAgo(w.waited_since)}</td>
        <td>
          <button class="status-btn" data-id="${w.id}" data-status="seated">Seat now</button>
          <button class="status-btn" data-id="${w.id}" data-status="left">Left</button>
        </td>
      </tr>
    `).join('') || '<tr><td colspan="5" style="color:var(--dim)">No one waiting.</td></tr>';
    document.querySelectorAll('#walkinRows .status-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        await api(`/walkins/${btn.dataset.id}`, { method: 'PATCH', body: JSON.stringify({ status: btn.dataset.status }) });
        loadWalkins();
      });
    });
  }
  document.getElementById('addWalkinBtn').addEventListener('click', async () => {
    const guestName = document.getElementById('wName').value.trim();
    const partySize = Number(document.getElementById('wParty').value);
    if (!guestName || !partySize) return;
    await api('/walkins', { method: 'POST', body: JSON.stringify({ guestName, partySize }) });
    document.getElementById('wName').value = '';
    document.getElementById('wParty').value = '';
    loadWalkins();
  });

  await Promise.all([loadBook(), loadFloor(), loadWalkins()]);
});
