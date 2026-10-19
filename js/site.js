(function () {
  var root = document.documentElement;
  root.classList.add('ready');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.querySelector('.site-header');
  var bar = document.querySelector('.progress');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Scroll progress and header shadow
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    var max = root.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (header) header.classList.toggle('scrolled', y > 8);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  // Staggered scroll reveal
  document.querySelectorAll('.grid, .steps, .contact-list').forEach(function (group) {
    group.querySelectorAll(':scope > .reveal, :scope > li').forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--d', (i * 0.1) + 's');
    });
  });
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduce) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) {
      // Anything already on screen at load shows immediately; the rest reveal on scroll
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('in');
      else io.observe(el);
    });
  }

  // Card spotlight (fine pointers only)
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  // Consent: Google Analytics and Messenger load only after Accept
  var KEY = 'ba-consent';
  var banner = document.getElementById('consent');
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadAnalytics() {
    if (window.__baGA) return; window.__baGA = true;
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=G-C58RKCTPWR';
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-C58RKCTPWR');
  }
  function loadMessenger() {
    if (window.__baFB) return; window.__baFB = true;
    var root = document.createElement('div'); root.id = 'fb-root';
    var chat = document.createElement('div');
    chat.className = 'fb-customerchat';
    chat.setAttribute('attribution', 'setup_tool');
    chat.setAttribute('page_id', '1785302118448125');
    chat.setAttribute('theme_color', '#7ed957');
    document.body.appendChild(root); document.body.appendChild(chat);
    window.fbAsyncInit = function () { FB.init({ xfbml: true, version: 'v10.0' }); };
    var s = document.createElement('script');
    s.async = true; s.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
    document.body.appendChild(s);
  }
  function apply() {
    if (get() === 'yes') { loadAnalytics(); loadMessenger(); }
  }
  if (banner) {
    if (!get()) banner.hidden = false;
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (!b) return;
      set(b.getAttribute('data-consent'));
      banner.hidden = true;
      apply();
    });
    document.querySelectorAll('[data-consent-reset]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); banner.hidden = false; });
    });
  }
  apply();
})();
