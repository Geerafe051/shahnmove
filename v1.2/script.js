const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');

menuButton?.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.site-header a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

document.querySelectorAll('.lead-form').forEach((form) => {
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const leads = JSON.parse(localStorage.getItem('shahnmove-v1-1-pilot-requests') || '[]');

    leads.push({ ...data, source: form.id, createdAt: new Date().toISOString() });
    localStorage.setItem('shahnmove-v1-1-pilot-requests', JSON.stringify(leads));

    status.textContent = 'Thank you. We will contact you to discuss a focused pilot.';
    form.reset();
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
