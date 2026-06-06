// ─── Custom cursor ───────────────────────────────────────────
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top  = my + 'px';
});

(function animCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  cursor.style.left = cx + 'px';
  cursor.style.top  = cy + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .p-item, .filter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '56px';
    cursor.style.height = '56px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '36px';
    cursor.style.height = '36px';
  });
});

// ─── Nav scroll ──────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ─── Mobile menu ─────────────────────────────────────────────
const toggle     = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

toggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  toggle.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    toggle.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── Portfolio filter ─────────────────────────────────────────
const filterBtns    = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.p-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    portfolioItems.forEach(item => {
      const cats = item.dataset.cat || '';
      const show = f === 'all' || cats.includes(f);
      item.style.display = show ? '' : 'none';
    });
  });
});

// ─── Scroll reveal ────────────────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.about-inner > *, .svc-row, .testi, .contact-inner > *, .p-item'
);
revealTargets.forEach(el => {
  if (!el.classList.contains('reveal')) el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Skill bars animate on scroll ────────────────────────────
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.classList.add('animated');
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-list');
if (skillsSection) skillObserver.observe(skillsSection);

// ─── Contact form ─────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.classList.add('show');
  e.target.reset();
  setTimeout(() => success.classList.remove('show'), 6000);
});
