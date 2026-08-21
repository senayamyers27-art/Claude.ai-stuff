/* Owner interface — client-side prototype only.
   OWNER_PIN is a deterrent, not security: it lives in this file's own
   source, visible to anyone who views it. Change it before relying on
   this for anything real, and see the note in owner.html about how the
   staff/host-view PIN in reserve.html is a separate, unconnected value. */
const OWNER_PIN = '2222';

const UNLOCK_KEY = '11eleven:owner';
const STAFF_PIN_KEY = '11eleven:staffpin';
const MENU_KEY = '11eleven:menu';
const DEFAULT_STAFF_PIN = '1111';

const DEFAULT_MENU = [
  { name: 'Bar', items: [
    { name: 'Signature Old Fashioned', price: '16' },
    { name: 'Blush Spritz', price: '15' },
    { name: 'House Red / White (glass)', price: '13' },
  ]},
  { name: 'Food', items: [
    { name: 'Mediterranean Mezze Board', price: '24' },
    { name: 'Truffle Fries', price: '14' },
  ]},
  { name: 'Hookah', items: [
    { name: 'Classic Blend', price: '35' },
    { name: 'House Specialty Blend', price: '45' },
  ]},
  { name: 'Bottle Service', items: [
    { name: 'VIP Booth Minimum', price: '200' },
    { name: 'Private Bar Minimum', price: '1000' },
  ]},
];

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
}
function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (err) { /* private browsing */ }
}

document.addEventListener('DOMContentLoaded', () => {
  const lockScreen = document.getElementById('lockScreen');
  const ownerScreen = document.getElementById('ownerScreen');
  const pinInput = document.getElementById('pinInput');
  const pinError = document.getElementById('pinError');
  const unlockBtn = document.getElementById('unlockBtn');
  const lockBtn = document.getElementById('lockBtn');

  function showUnlocked() {
    lockScreen.style.display = 'none';
    ownerScreen.style.display = 'block';
  }

  try {
    if (sessionStorage.getItem(UNLOCK_KEY) === '1') showUnlocked();
  } catch (err) { /* private browsing */ }

  pinInput.addEventListener('input', () => {
    pinInput.value = pinInput.value.replace(/\D/g, '').slice(0, 4);
    unlockBtn.disabled = pinInput.value.length !== 4;
    pinError.textContent = '';
  });

  function attemptUnlock() {
    if (pinInput.value.length !== 4) return;
    if (pinInput.value !== OWNER_PIN) {
      pinError.textContent = 'Incorrect code.';
      pinInput.value = '';
      unlockBtn.disabled = true;
      return;
    }
    try { sessionStorage.setItem(UNLOCK_KEY, '1'); } catch (err) { /* private browsing */ }
    showUnlocked();
  }
  unlockBtn.addEventListener('click', attemptUnlock);
  pinInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') attemptUnlock(); });

  lockBtn.addEventListener('click', () => {
    try { sessionStorage.removeItem(UNLOCK_KEY); } catch (err) { /* private browsing */ }
    ownerScreen.style.display = 'none';
    lockScreen.style.display = 'block';
    pinInput.value = '';
    unlockBtn.disabled = true;
  });

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

  /* ---------- staff pin ---------- */
  const staffPinInput = document.getElementById('staffPinInput');
  const staffPinSaved = document.getElementById('staffPinSaved');
  staffPinInput.value = loadJSON(STAFF_PIN_KEY, DEFAULT_STAFF_PIN);
  staffPinInput.addEventListener('input', () => {
    staffPinInput.value = staffPinInput.value.replace(/\D/g, '').slice(0, 4);
    staffPinSaved.textContent = '';
  });
  document.getElementById('saveStaffPin').addEventListener('click', () => {
    if (staffPinInput.value.length !== 4) return;
    saveJSON(STAFF_PIN_KEY, staffPinInput.value);
    staffPinSaved.textContent = 'Saved.';
  });

  /* ---------- menu editor ---------- */
  let menu = loadJSON(MENU_KEY, DEFAULT_MENU);
  const menuRoot = document.getElementById('menuCategories');

  function renderMenu() {
    menuRoot.innerHTML = '';
    menu.forEach((cat, catIdx) => {
      const catEl = document.createElement('div');
      catEl.className = 'menu-cat';

      const head = document.createElement('div');
      head.className = 'menu-cat-head';
      head.innerHTML = `<h3>${escapeHtml(cat.name)}</h3>`;
      catEl.appendChild(head);

      cat.items.forEach((item, itemIdx) => {
        const row = document.createElement('div');
        row.className = 'menu-item';

        const nameInput = document.createElement('input');
        nameInput.value = item.name;
        nameInput.placeholder = 'Item name';
        nameInput.addEventListener('input', () => {
          menu[catIdx].items[itemIdx].name = nameInput.value;
          saveJSON(MENU_KEY, menu);
        });

        const priceInput = document.createElement('input');
        priceInput.value = item.price;
        priceInput.placeholder = 'Price';
        priceInput.addEventListener('input', () => {
          menu[catIdx].items[itemIdx].price = priceInput.value;
          saveJSON(MENU_KEY, menu);
        });

        const delBtn = document.createElement('button');
        delBtn.className = 'del';
        delBtn.type = 'button';
        delBtn.textContent = '×';
        delBtn.setAttribute('aria-label', `Remove ${item.name}`);
        delBtn.addEventListener('click', () => {
          menu[catIdx].items.splice(itemIdx, 1);
          saveJSON(MENU_KEY, menu);
          renderMenu();
        });

        row.appendChild(nameInput);
        row.appendChild(priceInput);
        row.appendChild(delBtn);
        catEl.appendChild(row);
      });

      const addBtn = document.createElement('button');
      addBtn.className = 'add-item';
      addBtn.type = 'button';
      addBtn.textContent = '+ Add item';
      addBtn.addEventListener('click', () => {
        menu[catIdx].items.push({ name: '', price: '' });
        saveJSON(MENU_KEY, menu);
        renderMenu();
      });
      catEl.appendChild(addBtn);

      menuRoot.appendChild(catEl);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  renderMenu();
});
