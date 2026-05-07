// ── HAMBURGER MOBILE NAV ──
const AGE_GATE_KEY = 'vapsolo_age_verified';
const ageGate = document.getElementById('age-gate');
const ageConfirm = document.getElementById('age-confirm');
const ageDecline = document.getElementById('age-decline');

const hideAgeGate = () => {
  if (ageGate) ageGate.style.display = 'none';
};

if (ageGate) {
  try {
    if (window.localStorage.getItem(AGE_GATE_KEY) === 'true') {
      hideAgeGate();
    }
  } catch (error) {
    // Keep the gate visible if storage is unavailable.
  }
}

if (ageConfirm) {
  ageConfirm.addEventListener('click', () => {
    try {
      window.localStorage.setItem(AGE_GATE_KEY, 'true');
    } catch (error) {
      // Ignore storage failures and still allow entry for this session.
    }
    hideAgeGate();
  });
}

if (ageDecline) {
  ageDecline.addEventListener('click', () => {
    window.location.href = 'https://google.com';
  });
}

const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ── FADE-UP SCROLL ANIMATION ──
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));


// ── COUNTER ANIMATION ──
const counters = document.querySelectorAll('.hero-stat .num[data-target]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = target * ease;
      el.textContent = (Number.isInteger(target) ? Math.floor(val) : val.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObs.observe(el));

// ── CITIES ACCORDION ──
const toggle = document.getElementById('citiesTogle');
const body   = document.getElementById('citiesBody');

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';

  if (!isOpen) {
    body.style.maxHeight = body.scrollHeight + 'px';
    body.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  } else {
    body.style.maxHeight = body.scrollHeight + 'px';
    requestAnimationFrame(() => {
      body.style.maxHeight = '0px';
      body.classList.remove('open');
    });
    toggle.setAttribute('aria-expanded', 'false');
  }
});
