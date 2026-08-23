/* Manage-my-reservation: look up and cancel a booking by confirmation code.
   Talks to the public (unauthenticated) booking API at /public/*. */

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h < 12 ? 'AM' : 'PM';
  const displayH = (h % 12) || 12;
  return `${displayH}:${String(m).padStart(2, '0')} ${period}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lookupForm');
  const codeInput = document.getElementById('code');
  const lookupBtn = document.getElementById('lookupBtn');
  const lookupNote = document.getElementById('lookupNote');
  const card = document.getElementById('resCard');
  const cancelBtn = document.getElementById('cancelBtn');
  const cancelledMsg = document.getElementById('cancelledMsg');

  let currentCode = null;

  function renderReservation(row) {
    document.getElementById('resStatus').textContent = row.status;
    document.getElementById('resName').textContent = row.guest_name;
    document.getElementById('resDate').textContent = `${formatDate(row.res_date)} at ${formatTime(row.time_slot)}`;
    document.getElementById('resParty').textContent = `Party of ${row.party_size}`;
    document.getElementById('resNotes').textContent = row.notes ? row.notes : '';
    document.getElementById('resNotes').style.display = row.notes ? '' : 'none';

    const cancelled = row.status === 'cancelled';
    cancelBtn.style.display = cancelled ? 'none' : '';
    cancelledMsg.style.display = cancelled ? '' : 'none';
    card.classList.add('show');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = codeInput.value.trim().toUpperCase();
    if (!code) return;
    lookupBtn.disabled = true;
    lookupNote.textContent = 'Looking up your reservation…';
    lookupNote.classList.remove('error');
    card.classList.remove('show');

    try {
      const res = await fetch(`/public/reservations/${encodeURIComponent(code)}`);
      if (!res.ok) {
        lookupNote.textContent = res.status === 404
          ? 'No reservation found with that code — double-check and try again.'
          : 'Something went wrong — please try again.';
        lookupNote.classList.add('error');
        lookupBtn.disabled = false;
        return;
      }
      const row = await res.json();
      currentCode = code;
      lookupNote.textContent = '';
      renderReservation(row);
    } catch (err) {
      lookupNote.textContent = 'Couldn’t reach the booking system — please try again in a moment.';
      lookupNote.classList.add('error');
    }
    lookupBtn.disabled = false;
  });

  cancelBtn.addEventListener('click', async () => {
    if (!currentCode) return;
    if (!confirm('Cancel this reservation? This can’t be undone.')) return;
    cancelBtn.disabled = true;
    try {
      const res = await fetch(`/public/reservations/${encodeURIComponent(currentCode)}/cancel`, { method: 'PATCH' });
      if (!res.ok) {
        lookupNote.textContent = 'Couldn’t cancel — please try again.';
        lookupNote.classList.add('error');
        cancelBtn.disabled = false;
        return;
      }
      cancelBtn.style.display = 'none';
      cancelledMsg.style.display = '';
      document.getElementById('resStatus').textContent = 'cancelled';
    } catch (err) {
      lookupNote.textContent = 'Couldn’t reach the booking system — please try again in a moment.';
      lookupNote.classList.add('error');
      cancelBtn.disabled = false;
    }
  });
});
