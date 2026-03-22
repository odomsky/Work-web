const yearTarget = document.getElementById('year');
const langButtons = document.querySelectorAll('[data-set-lang]');
const langNodes = document.querySelectorAll('[data-lang]');
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('main-nav');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const navLabels = {
  cs: { open: 'Otevřít navigaci', close: 'Zavřít navigaci' },
  en: { open: 'Open navigation',  close: 'Close navigation' }
};

function closeMenu() {
  const lang = document.documentElement.lang || 'cs';
  mainNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', (navLabels[lang] || navLabels.cs).open);
}

function setLanguage(lang) {
  langNodes.forEach((node) => {
    node.classList.toggle('hidden', node.dataset.lang !== lang);
  });

  langButtons.forEach((btn) => {
    const isActive = btn.dataset.setLang === lang;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });

  document.documentElement.lang = lang;
  localStorage.setItem('preferredLanguage', lang);
}

const storedLanguage = localStorage.getItem('preferredLanguage');
const browserLang = navigator.language?.startsWith('en') ? 'en' : 'cs';
setLanguage(storedLanguage ?? browserLang);

if (langButtons.length) {
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.setLang));
  });
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    const lang = document.documentElement.lang || 'cs';
    const labels = navLabels[lang] || navLabels.cs;
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? labels.close : labels.open);
  });

  document.querySelectorAll('.nav-list a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('is-open') &&
        !mainNav.contains(e.target) &&
        !navToggle.contains(e.target)) {
      closeMenu();
    }
  });
}
