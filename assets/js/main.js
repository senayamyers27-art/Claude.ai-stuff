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

  /* ---------- Reservation form: hands off to SevenRooms ---------- */
  const form = document.getElementById('reserveForm');
  const formNote = document.getElementById('formNote');
  const dateInput = document.getElementById('date');
  dateInput.min = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD, local time
  const isConfigured = SEVENROOMS_VENUE_ID && SEVENROOMS_VENUE_ID !== 'YOUR-VENUE-ID';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const party = document.getElementById('party').value;

    if (!isConfigured) {
      formNote.textContent = 'Online booking through SevenRooms is launching soon — check back shortly, or follow us for the opening announcement.';
      return;
    }

    const params = new URLSearchParams({
      date,
      time,
      party_size: party,
    });
    const bookingUrl = `https://www.sevenrooms.com/reservations/${SEVENROOMS_VENUE_ID}?${params.toString()}`;

    formNote.textContent = 'Opening SevenRooms in a new tab to complete your booking…';
    window.open(bookingUrl, '_blank', 'noopener');
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
