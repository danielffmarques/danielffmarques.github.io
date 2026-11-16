/**
 * DANIEL MARQUES - PORTFOLIO 2026
 * Interactive Client-Side Scripts & In-Browser Python Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTheme();
  initCopyButtons();
  initToolsFilter();
  initMethodologySteps();
  initProjectAccordions();
  initPythonLab();
});

/* ==========================================================================
   1. NAVBAR & SCROLLSPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Scrollspy & Sticky Shadow
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Active nav link highlight
    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 120;
      const sectionId = sec.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   2. THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
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

/* ==========================================================================
   3. COPY TO CLIPBOARD & TOAST NOTIFICATION
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copiado: ${textToCopy}`);
        }).catch(() => {
          showToast('Erro ao copiar texto.');
        });
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

/* ==========================================================================
   4. TOOLS FILTER
   ========================================================================== */
function initToolsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const toolCards = document.querySelectorAll('.tool-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      toolCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. METHODOLOGY STEPS INTERACTION
   ========================================================================== */
function initMethodologySteps() {
  const methodCards = document.querySelectorAll('.method-card');
  methodCards.forEach(card => {
    card.addEventListener('click', () => {
      methodCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

/* ==========================================================================
   6. PROJECT ACCORDIONS (CHALLENGE / APPROACH / OUTCOME)
   ========================================================================== */
function initProjectAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const accordionGroup = parentItem.parentElement;

      // Toggle active inside the same project card
      const activeSibling = accordionGroup.querySelector('.accordion-item.active');
      if (activeSibling && activeSibling !== parentItem) {
        activeSibling.classList.remove('active');
      }

      parentItem.classList.toggle('active');
    });
  });
}

/* ==========================================================================
   7. PYTHON LAB: CAMPAIGN ROI SIMULATOR (PYODIDE & CLIENT RUNTIME)
   ========================================================================== */
let pyodideInstance = null;
let isPyodideLoading = false;

async function loadPyodideEngine() {
  if (typeof loadPyodide !== 'undefined' && !pyodideInstance && !isPyodideLoading) {
    try {
      isPyodideLoading = true;
      const engineStatus = document.getElementById('engine-status');
      if (engineStatus) {
        engineStatus.innerHTML = '<span class="status-indicator" style="background:#F59E0B;"></span> A carregar Python WebAssembly...';
      }
      pyodideInstance = await loadPyodide();
      if (engineStatus) {
        engineStatus.innerHTML = '<span class="status-indicator" style="background:#10B981;"></span> Python 3.11 Pronto (Pyodide WebAssembly)';
      }
    } catch (e) {
      console.warn('Pyodide engine fallback to JS simulation:', e);
      const engineStatus = document.getElementById('engine-status');
      if (engineStatus) {
        engineStatus.innerHTML = '<span class="status-indicator" style="background:#10B981;"></span> Motor de Simulação Ativo';
      }
    } finally {
      isPyodideLoading = false;
    }
  }
}

function initPythonLab() {
  // Start lazy loading Pyodide in background
  setTimeout(loadPyodideEngine, 1000);

  const budgetInput = document.getElementById('input-budget');
  const cpcInput = document.getElementById('input-cpc');
  const crInput = document.getElementById('input-cr');
  const aovInput = document.getElementById('input-aov');

  const valBudget = document.getElementById('val-budget');
  const valCpc = document.getElementById('val-cpc');
  const valCr = document.getElementById('val-cr');
  const valAov = document.getElementById('val-aov');

  const runBtn = document.getElementById('run-python-btn');
  const toggleCodeBtn = document.getElementById('toggle-code-btn');
  const codeDrawer = document.getElementById('code-drawer');
  const copyCodeBtn = document.getElementById('copy-code-btn');

  // Input Slider updates
  function updateInputDisplays() {
    if (valBudget && budgetInput) valBudget.textContent = `${Number(budgetInput.value).toLocaleString('pt-PT')} €`;
    if (valCpc && cpcInput) valCpc.textContent = `${Number(cpcInput.value).toFixed(2)} €`;
    if (valCr && crInput) valCr.textContent = `${Number(crInput.value).toFixed(1)} %`;
    if (valAov && aovInput) valAov.textContent = `${Number(aovInput.value).toFixed(2)} €`;
  }

  [budgetInput, cpcInput, crInput, aovInput].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', () => {
        updateInputDisplays();
        executeSimulation(false); // real-time visual update
      });
    }
  });

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      executeSimulation(true);
    });
  }

  // Toggle code view
  if (toggleCodeBtn && codeDrawer) {
    toggleCodeBtn.addEventListener('click', () => {
      const isHidden = codeDrawer.style.display === 'none';
      codeDrawer.style.display = isHidden ? 'block' : 'none';
      toggleCodeBtn.innerHTML = isHidden 
        ? '<i class="fa-solid fa-code"></i> Ocultar Código Python'
        : '<i class="fa-solid fa-code"></i> Ver Código Python Fonte';
    });
  }

  // Copy code button
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const codeText = document.querySelector('.code-content code')?.innerText;
      if (codeText) {
        navigator.clipboard.writeText(codeText).then(() => {
          copyCodeBtn.innerHTML = '<i class="fa-solid fa-check"></i> Código Copiado!';
          setTimeout(() => {
            copyCodeBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copiar Código';
          }, 2000);
        });
      }
    });
  }

  // Initial calculation
  updateInputDisplays();
  executeSimulation(false);
}

async function executeSimulation(isUserClick = false) {
  const budget = parseFloat(document.getElementById('input-budget')?.value || 1500);
  const cpc = parseFloat(document.getElementById('input-cpc')?.value || 0.45);
  const cr = parseFloat(document.getElementById('input-cr')?.value || 3.2);
  const aov = parseFloat(document.getElementById('input-aov')?.value || 75);

  const clicks = cpc > 0 ? Math.floor(budget / cpc) : 0;
  const conversions = Math.floor(clicks * (cr / 100));
  const revenue = conversions * aov;
  const netProfit = revenue - budget;
  const roas = budget > 0 ? (revenue / budget) : 0;
  const cac = conversions > 0 ? (budget / conversions) : 0;

  // Update UI KPI Cards
  const kpiRoas = document.getElementById('kpi-roas');
  const kpiRevenue = document.getElementById('kpi-revenue');
  const kpiCac = document.getElementById('kpi-cac');
  const kpiConversions = document.getElementById('kpi-conversions');
  const kpiClicks = document.getElementById('kpi-clicks');
  const kpiProfit = document.getElementById('kpi-profit');
  const consoleOutput = document.getElementById('python-output');

  if (kpiRoas) kpiRoas.textContent = `${roas.toFixed(2)}x`;
  if (kpiRevenue) kpiRevenue.textContent = `${Math.round(revenue).toLocaleString('pt-PT')} €`;
  if (kpiCac) kpiCac.textContent = `${cac.toFixed(2)} €`;
  if (kpiConversions) kpiConversions.textContent = `${conversions.toLocaleString('pt-PT')}`;
  if (kpiClicks) kpiClicks.textContent = `${clicks.toLocaleString('pt-PT')}`;
  
  if (kpiProfit) {
    const prefix = netProfit >= 0 ? '+' : '';
    kpiProfit.textContent = `${prefix}${Math.round(netProfit).toLocaleString('pt-PT')} €`;
    kpiProfit.className = netProfit >= 0 ? 'kpi-value text-green' : 'kpi-value text-orange';
  }

  // If Pyodide is ready and user explicitly clicked, run directly through Pyodide!
  if (pyodideInstance && isUserClick) {
    try {
      const pythonScript = `
import json

budget = ${budget}
cpc = ${cpc}
cr = ${cr}
aov = ${aov}

clicks = int(budget / cpc) if cpc > 0 else 0
conversions = int(clicks * (cr / 100.0))
revenue = conversions * aov
net_profit = revenue - budget
roas = round(revenue / budget, 2) if budget > 0 else 0.0
cac = round(budget / conversions, 2) if conversions > 0 else 0.0

log_lines = [
    f">>> [Pyodide WebAssembly Python 3.11 Execution]",
    f"[OK] Budget: {budget}€ | CPC: {cpc}€ | CR: {cr}% | AOV: {aov}€",
    f"[CALC] Clicks = {clicks:,} | Conversions = {conversions:,}",
    f"[CALC] Revenue = {revenue:,.2f}€ | Net Profit = {net_profit:,.2f}€",
    f"[METRIC] ROAS: {roas}x | CAC: {cac:.2f}€",
    f">>> Process completed successfully (exit code 0)."
]
"\\n".join(log_lines)
      `;
      const result = await pyodideInstance.runPythonAsync(pythonScript);
      if (consoleOutput) consoleOutput.textContent = result;
      return;
    } catch (err) {
      console.error('Python execution error:', err);
    }
  }

  // Simulated stdout
  if (consoleOutput) {
    consoleOutput.textContent = `>>> Executing Python Marketing Simulation...
[OK] Parameters: Budget=${budget.toLocaleString('pt-PT')}€, CPC=${cpc.toFixed(2)}€, CR=${cr.toFixed(1)}%, AOV=${aov.toFixed(2)}€
[CALC] Clicks = ${budget} / ${cpc} = ${clicks.toLocaleString('pt-PT')} clicks
[CALC] Conversions = ${clicks} * ${cr}% = ${conversions} conversions
[CALC] Revenue = ${conversions} * ${aov}€ = ${revenue.toFixed(2)}€
[RESULT] ROAS = ${roas.toFixed(2)}x | CAC = ${cac.toFixed(2)}€ | Net Profit = ${netProfit >= 0 ? '+' : ''}${netProfit.toFixed(2)}€
>>> Simulation finished with exit code 0.`;
  }
}
