const yearTarget = document.getElementById('year');
const langButtons = document.querySelectorAll('[data-set-lang]');
const langNodes = document.querySelectorAll('[data-lang]');
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('main-nav');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
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
setLanguage(storedLanguage === 'en' ? 'en' : 'cs');

if (langButtons.length) {
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.setLang));
  });
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Zavřít navigaci' : 'Otevřít navigaci');
  });
}
