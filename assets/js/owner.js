/* Owner interface — talks to the staff API at /api/*.
   Identity comes from Cloudflare Access (see worker/README.md), not from
   anything in this file — there is no PIN or password here. The API looks
   the caller's Access-authenticated email up in the staff table and only
   returns data once that's confirmed. */

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

document.addEventListener('DOMContentLoaded', async () => {
  const loadingState = document.getElementById('loadingState');
  const deniedState = document.getElementById('deniedState');
  const errorState = document.getElementById('errorState');
  const ownerScreen = document.getElementById('ownerScreen');

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
  ownerScreen.style.display = 'block';
  document.getElementById('whoamiName').textContent = me.name;
  document.getElementById('whoamiEmail').textContent = `${me.email} · ${me.role}`;

  if (me.role !== 'owner') {
    deniedState.style.display = 'block';
    document.getElementById('deniedMsg').textContent = 'This page is for owners. You’re signed in as staff — try the Host view instead.';
    ownerScreen.style.display = 'none';
    return;
  }

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

  /* ---------- overview ---------- */
  async function loadOverview() {
    const stats = await api('/stats/overview');
    document.getElementById('kpiGrid').innerHTML = `
      <div class="kpi"><div class="label">Covers tonight</div><div class="value">${stats.coversTonight}</div><div class="sub">seated so far</div></div>
      <div class="kpi"><div class="label">Revenue tonight</div><div class="value">${stats.revenueCents != null ? '$' + (stats.revenueCents / 100).toLocaleString() : '—'}</div><div class="sub">manually entered</div></div>
      <div class="kpi"><div class="label">Avg table turn</div><div class="value">${stats.avgTurnMinutes != null ? stats.avgTurnMinutes + 'm' : '—'}</div><div class="sub">manually entered</div></div>
      <div class="kpi"><div class="label">VIP bookings (7d)</div><div class="value">${stats.vipBookings7d}</div><div class="sub">tagged reservations</div></div>
    `;
    if (stats.revenueCents != null) document.getElementById('revenueInput').value = (stats.revenueCents / 100).toFixed(0);
    if (stats.avgTurnMinutes != null) document.getElementById('turnInput').value = stats.avgTurnMinutes;
  }
  document.getElementById('saveStatsBtn').addEventListener('click', async () => {
    const revenue = document.getElementById('revenueInput').value;
    const turn = document.getElementById('turnInput').value;
    await api('/stats/nightly', {
      method: 'POST',
      body: JSON.stringify({
        revenueCents: revenue === '' ? null : Math.round(Number(revenue) * 100),
        avgTurnMinutes: turn === '' ? null : Number(turn),
      }),
    });
    document.getElementById('statsSaved').textContent = 'Saved.';
    loadOverview();
  });

  /* ---------- staff ---------- */
  async function loadStaff() {
    const staff = await api('/staff');
    document.getElementById('staffRows').innerHTML = staff.map((s) => `
      <tr data-id="${s.id}">
        <td>${escapeHtml(s.name)}</td>
        <td>${escapeHtml(s.email)}</td>
        <td><span class="role-pill ${s.role}">${s.role}</span></td>
        <td><button class="del-btn" data-id="${s.id}" aria-label="Remove ${escapeHtml(s.name)}">×</button></td>
      </tr>
    `).join('');
    document.querySelectorAll('#staffRows .del-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        await api(`/staff/${btn.dataset.id}`, { method: 'DELETE' });
        loadStaff();
      });
    });
  }
  document.getElementById('addStaffBtn').addEventListener('click', async () => {
    const name = document.getElementById('newStaffName').value.trim();
    const email = document.getElementById('newStaffEmail').value.trim();
    const role = document.getElementById('newStaffRole').value;
    if (!name || !email) return;
    try {
      await api('/staff', { method: 'POST', body: JSON.stringify({ name, email, role }) });
      document.getElementById('newStaffName').value = '';
      document.getElementById('newStaffEmail').value = '';
      document.getElementById('staffSaved').textContent = 'Added.';
      loadStaff();
    } catch (err) {
      document.getElementById('staffSaved').textContent = err.message;
    }
  });

  /* ---------- menu ---------- */
  let menu = [];
  function renderMenu() {
    const root = document.getElementById('menuCategories');
    root.innerHTML = '';
    menu.forEach((cat, catIdx) => {
      const catEl = document.createElement('div');
      catEl.className = 'menu-cat';

      const head = document.createElement('div');
      head.className = 'menu-cat-head';
      const nameInput = document.createElement('input');
      nameInput.value = cat.name;
      nameInput.style.cssText = 'background:transparent;border:none;color:#F1ECE4;font-family:var(--font-display);font-size:20px;font-weight:500;padding:0;outline:none;width:auto;';
      nameInput.addEventListener('input', () => { menu[catIdx].name = nameInput.value; });
      head.appendChild(nameInput);
      catEl.appendChild(head);

      cat.items.forEach((item, itemIdx) => {
        const row = document.createElement('div');
        row.className = 'menu-item';

        const itemName = document.createElement('input');
        itemName.value = item.name;
        itemName.placeholder = 'Item name';
        itemName.addEventListener('input', () => { menu[catIdx].items[itemIdx].name = itemName.value; });

        const priceInput = document.createElement('input');
        priceInput.value = item.price;
        priceInput.placeholder = 'Price';
        priceInput.addEventListener('input', () => { menu[catIdx].items[itemIdx].price = priceInput.value; });

        const delBtn = document.createElement('button');
        delBtn.className = 'del';
        delBtn.type = 'button';
        delBtn.textContent = '×';
        delBtn.setAttribute('aria-label', `Remove ${item.name}`);
        delBtn.addEventListener('click', () => { menu[catIdx].items.splice(itemIdx, 1); renderMenu(); });

        row.appendChild(itemName);
        row.appendChild(priceInput);
        row.appendChild(delBtn);
        catEl.appendChild(row);
      });

      const addBtn = document.createElement('button');
      addBtn.className = 'add-item';
      addBtn.type = 'button';
      addBtn.textContent = '+ Add item';
      addBtn.addEventListener('click', () => { menu[catIdx].items.push({ name: '', price: '' }); renderMenu(); });
      catEl.appendChild(addBtn);

      root.appendChild(catEl);
    });
  }
  document.getElementById('addCatBtn').addEventListener('click', () => {
    menu.push({ name: 'New category', items: [] });
    renderMenu();
  });
  document.getElementById('saveMenuBtn').addEventListener('click', async () => {
    await api('/menu', { method: 'PUT', body: JSON.stringify({ categories: menu }) });
    document.getElementById('menuSaved').textContent = 'Saved.';
  });

  async function loadMenu() {
    menu = await api('/menu');
    renderMenu();
  }

  await Promise.all([loadOverview(), loadStaff(), loadMenu()]);
});
