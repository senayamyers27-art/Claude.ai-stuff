/* =========================================================
   SevenRooms reservation hand-off
   ---------------------------------------------------------
   11:Eleven doesn't have a live SevenRooms account yet (see
   Section 11 of the business plan — SevenRooms is the intended
   guest-management platform, to be set up before opening).
   Once a venue is created in SevenRooms, its dashboard provides
   a venue slug used in the hosted booking page URL:
     https://www.sevenrooms.com/reservations/<venue-slug>
   Replace the placeholder below with that slug to go live —
   no other code changes are needed.
   ========================================================= */
const SEVENROOMS_VENUE_ID = 'YOUR-VENUE-ID';

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
      hotspotTitle.innerHTML = hs.dataset.title;
      hotspotCopy.textContent = hs.dataset.copy;
    };
    hs.addEventListener('click', activate);
    hs.addEventListener('mouseenter', activate);
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

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.full;
      lightboxImg.alt = item.dataset.caption;
      lightboxCaption.textContent = item.dataset.caption;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- Reservation form: hands off to SevenRooms ---------- */
  const form = document.getElementById('reserveForm');
  const formNote = document.getElementById('formNote');
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
