const yearTarget = document.getElementById('year');
const langButtons = document.querySelectorAll('[data-set-lang]');
const langNodes = document.querySelectorAll('[data-lang]');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

function setLanguage(lang) {
  langNodes.forEach((node) => {
    node.classList.toggle('hidden', node.dataset.lang !== lang);
  });

  langButtons.forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.setLang === lang);
  });

  document.documentElement.lang = lang;
  localStorage.setItem('preferredLanguage', lang);
}

const storedLanguage = localStorage.getItem('preferredLanguage');
const initialLanguage = storedLanguage === 'en' ? 'en' : 'cs';
setLanguage(initialLanguage);

langButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.setLang);
  });
});
