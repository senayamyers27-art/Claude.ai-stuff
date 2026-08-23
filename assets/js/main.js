/* SEVENROOMS_VENUE_ID is defined in sevenrooms-config.js, loaded
   before this file — see that file to go live with bookings. */

/* =========================================================
   Google Analytics (GA4)
   ---------------------------------------------------------
   Create a free GA4 property at analytics.google.com, then
   replace the placeholder below with its Measurement ID
   (looks like "G-XXXXXXXXXX"). Until then this does nothing —
   no script loads and no request is made to Google.
   ========================================================= */
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

(function initAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');
  const navOverlay = document.getElementById('navOverlay');
  const navMobileClose = document.getElementById('navMobileClose');

  const openNav = () => {
    navMobile.classList.add('open');
    navOverlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', true);
    document.body.style.overflow = 'hidden';
  };
  const closeNav = () => {
    navMobile.classList.remove('open');
    navOverlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    navMobile.classList.contains('open') ? closeNav() : openNav();
  });
  navMobileClose.addEventListener('click', closeNav);
  navOverlay.addEventListener('click', closeNav);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMobile.classList.contains('open')) closeNav();
  });
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeNav);
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 90}ms`;
    io.observe(el);
  });

  /* ---------- Floor plan hotspots ---------- */
  const hotspots = document.querySelectorAll('.hotspot');
  const hotspotTitle = document.getElementById('hotspotTitle');
  const hotspotCopy = document.getElementById('hotspotCopy');
  hotspots.forEach(hs => {
    const activate = () => {
      hotspots.forEach(h => h.classList.remove('active'));
      hs.classList.add('active');
      hotspotTitle.textContent = hs.dataset.title;
      hotspotCopy.textContent = hs.dataset.copy;
    };
    hs.addEventListener('click', activate);
    hs.addEventListener('mouseenter', activate);
  });

  /* ---------- Floor plan video: load and play only once visible,
     and only if the visitor hasn't asked for reduced motion ---------- */
  const floorplanVideo = document.getElementById('floorplanVideo');
  if (floorplanVideo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const videoIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          floorplanVideo.preload = 'auto';
          floorplanVideo.play().catch(() => {});
          videoIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    videoIo.observe(floorplanVideo);
  }

  /* ---------- Menu tabs ---------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      document.querySelector(`.menu-panel[data-panel="${tab.dataset.tab}"]`).classList.add('active');
    });
  });

  /* ---------- Reservation form: real-time availability + direct booking ---------- */
  const form = document.getElementById('reserveForm');
  const formNote = document.getElementById('formNote');
  const submitBtn = document.getElementById('reserveSubmit');
  const dateInput = document.getElementById('date');
  const timeSelect = document.getElementById('time');
  const partyInput = document.getElementById('party');
  dateInput.min = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD, local time

  function formatTime(hhmm) {
    const [h, m] = hhmm.split(':').map(Number);
    const period = h < 12 ? 'AM' : 'PM';
    const displayH = (h % 12) || 12;
    return `${displayH}:${String(m).padStart(2, '0')} ${period}`;
  }

  let availabilityRequestId = 0;
  async function refreshAvailability() {
    const requestId = ++availabilityRequestId; // guards against an older, slower request overwriting a newer one
    const date = dateInput.value;
    const party = Number(partyInput.value) || 2;
    const previouslySelected = timeSelect.value; // a field's native "change" can fire late (on blur, e.g. when
                                                  // focus moves to the time dropdown right after editing party
                                                  // size) - preserve an already-made selection if it's still valid.
    if (!date) {
      timeSelect.disabled = true;
      timeSelect.innerHTML = '<option value="">Pick a date first</option>';
      return;
    }
    timeSelect.disabled = true;
    timeSelect.innerHTML = '<option value="">Checking availability…</option>';
    try {
      const res = await fetch(`/public/availability?date=${encodeURIComponent(date)}&partySize=${encodeURIComponent(party)}`);
      const data = await res.json();
      if (requestId !== availabilityRequestId) return; // a newer request has since started
      const slots = data.slots || [];
      if (!slots.length) {
        timeSelect.innerHTML = '<option value="">Closed that day</option>';
        return;
      }
      const options = ['<option value="">Select</option>'].concat(
        slots.map((s) => `<option value="${s.time}"${s.available ? '' : ' disabled'}>${formatTime(s.time)}${s.available ? '' : ' — full'}</option>`)
      );
      timeSelect.innerHTML = options.join('');
      timeSelect.disabled = false;
      const stillValid = slots.find((s) => s.time === previouslySelected && s.available);
      if (stillValid) timeSelect.value = previouslySelected;
    } catch (err) {
      if (requestId !== availabilityRequestId) return;
      timeSelect.innerHTML = '<option value="">Couldn’t load times — try again</option>';
    }
  }
  dateInput.addEventListener('change', refreshAvailability);
  partyInput.addEventListener('change', refreshAvailability);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    formNote.textContent = 'Booking your table…';

    const body = {
      name: document.getElementById('guestName').value.trim(),
      email: document.getElementById('guestEmail').value.trim(),
      phone: document.getElementById('guestPhone').value.trim(),
      partySize: Number(partyInput.value),
      date: dateInput.value,
      time: timeSelect.value,
      notes: document.getElementById('occasion').value.trim(),
    };

    try {
      const res = await fetch('/public/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        formNote.textContent = data.error || 'Something went wrong — please try again.';
        if (data.full) refreshAvailability();
        submitBtn.disabled = false;
        return;
      }
      formNote.innerHTML = `You're booked! Confirmation code <strong>${data.confirmationCode}</strong> — save it to view or cancel your reservation on <a href="manage-reservation.html">Manage my reservation</a>.`;
      form.reset();
      timeSelect.innerHTML = '<option value="">Pick a date first</option>';
      timeSelect.disabled = true;
      submitBtn.disabled = false;
    } catch (err) {
      formNote.textContent = 'Couldn’t reach the booking system — please try again in a moment.';
      submitBtn.disabled = false;
    }
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop a');
  const navIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.nav-desktop a[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.style.color = '');
        link.style.color = 'var(--gold-light)';
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navIo.observe(s));

});
