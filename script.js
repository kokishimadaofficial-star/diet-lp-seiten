// ===========================
// Diet LP — Interactions
// ===========================

// Scroll-triggered fade-up
(function () {
  const items = document.querySelectorAll(
    '.hero__points, .hero__title, .block__title, .block__lead, .block__msg, .check-list li, .num-list li, .myth-list li, .day-list li, .numbers-list li, .voice-item, .profile-list, .bonus-list li, .bonus-total, .qa-item, .letter-body p, .final-merits, .btn-line--final'
  );
  items.forEach((el, i) => {
    el.classList.add('animate-up');
    if (i % 3 === 0) el.style.transitionDelay = '0s';
    else if (i % 3 === 1) el.style.transitionDelay = '0.1s';
    else el.style.transitionDelay = '0.2s';
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '-8% 0px -8% 0px', threshold: 0.05 }
  );
  items.forEach((el) => io.observe(el));
})();

// Floating CTA show/hide
(function () {
  const fcta = document.querySelector('.float-cta');
  if (!fcta) return;
  const hero = document.querySelector('.hero');
  const finalCta = document.querySelector('#cta-final');
  fcta.style.opacity = '0';
  fcta.style.pointerEvents = 'none';
  fcta.style.transition = 'opacity 0.4s, transform 0.4s';

  const update = () => {
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
    const finalTop = finalCta ? finalCta.getBoundingClientRect().top : Infinity;
    const visible = heroBottom < 80 && finalTop > window.innerHeight * 0.6;
    if (visible) {
      fcta.style.opacity = '1';
      fcta.style.pointerEvents = 'auto';
    } else {
      fcta.style.opacity = '0';
      fcta.style.pointerEvents = 'none';
    }
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// Number count-up
(function () {
  const nums = document.querySelectorAll('.numbers-list em');
  if (!nums.length || !('IntersectionObserver' in window)) return;

  const animate = (el) => {
    const text = el.childNodes[0].nodeValue || '';
    const match = text.match(/(-?[\d,.]+)/);
    if (!match) return;
    const target = parseFloat(match[1].replace(/,/g, ''));
    if (isNaN(target)) return;
    const isFloat = match[1].includes('.');
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = target * eased;
      el.childNodes[0].nodeValue = isFloat ? cur.toFixed(1) : Math.floor(cur).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
      else el.childNodes[0].nodeValue = isFloat ? target.toFixed(1) : target.toLocaleString();
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach((n) => io.observe(n));
})();

// Smooth scroll for in-page anchors
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
