/**
 * DANIEL MARQUES - PORTFOLIO V2 (DRIBBLE EDITION)
 * Client-Side Scripts & Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeV2();
  initCopyV2();
  initAccordionV2();
});

function initThemeV2() {
  const toggleBtn = document.getElementById('v2-theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme-v2') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateIcon(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const active = document.documentElement.getAttribute('data-theme');
    const newTheme = active === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme-v2', newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    const icon = toggleBtn.querySelector('i');
    if (!icon) return;
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
      icon.style.color = '#F59E0B';
    } else {
      icon.className = 'fa-solid fa-moon';
      icon.style.color = '';
    }
  }
}

function initCopyV2() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copiado: ${text}`);
        });
      }
    });
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

function initAccordionV2() {
  const rows = document.querySelectorAll('.accordion-row');
  rows.forEach(row => {
    row.addEventListener('click', () => {
      rows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');
    });
  });
}
