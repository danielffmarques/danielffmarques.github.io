/**
 * DANIEL MARQUES - PORTFOLIO 2026
 * Interactive Client-Side Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTheme();
  initLanguageSwitcher();
  initCopyButtons();
  initMethodologySteps();
  initProjectAccordions();
  initSpecializationStage();
  initTimelineScrollReveal();
  initProjectModals();
  initCvSwitcher();
});

/* ==========================================================================
   1. NAVBAR & SCROLLSPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Home Button (Scroll to Top) & CS:GO Inferno 2 Pin Easter Egg (Chicken Feathers Burst 🐔🪶)
  const infernoPinBtn = document.getElementById('nav-home-btn');
  if (infernoPinBtn) {
    infernoPinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Primary objective: Smooth scroll to top / hero section
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (window.location.hash !== '#hero') {
        history.pushState(null, '', '#hero');
      }

      // Easter egg: chicken feathers burst
      triggerChickenFeathers(infernoPinBtn);
    });
  }

  function triggerChickenFeathers(element) {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let viewport = document.getElementById('navbar-feathers-viewport');
    if (!viewport) {
      viewport = document.createElement('div');
      viewport.id = 'navbar-feathers-viewport';
      viewport.style.position = 'absolute';
      viewport.style.top = '0';
      viewport.style.left = '0';
      viewport.style.width = '100%';
      viewport.style.height = '100%';
      viewport.style.pointerEvents = 'none';
      viewport.style.overflow = 'hidden';
      viewport.style.zIndex = '1001';
      navbar.appendChild(viewport);
    }

    const navRect = navbar.getBoundingClientRect();
    const pinRect = element.getBoundingClientRect();

    // Exact horizontal center of pin relative to navbar
    const pinRelX = (pinRect.left - navRect.left) + pinRect.width / 2;
    const headerHeight = navRect.height;

    // Playful pin squawk bounce
    const wrapper = element.querySelector('.inferno-pin-wrapper') || element;
    wrapper.style.transform = 'scale(0.88) rotate(-5deg)';
    wrapper.style.transition = 'transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1)';
    setTimeout(() => {
      wrapper.style.transform = 'scale(1.12) rotate(3deg)';
      setTimeout(() => { wrapper.style.transform = ''; }, 140);
    }, 120);

    // 7 authentic fluffy chicken down plumes (plumas fofas de galinha - mistura de castanho e branco)
    const featherCount = 7;
    const henBrownTones = ['#9E5D42', '#B46B4B', '#83472F', '#C47E5E'];
    const henWhiteTones = ['#FFFFFF', '#FDFBF7', '#F5ECE0'];

    for (let i = 0; i < featherCount; i++) {
      const feather = document.createElement('div');
      feather.className = 'chicken-feather-particle';

      const isBrown = i % 2 === 0;
      const tone = isBrown 
        ? henBrownTones[Math.floor(Math.random() * henBrownTones.length)]
        : henWhiteTones[Math.floor(Math.random() * henWhiteTones.length)];

      const size = 17 + Math.random() * 5.5; // 17px to 22.5px
      const height = size * 1.25;

      // Wide, airy fall spread across the pin area ("alarga a sua queda")
      const startX = pinRelX + (Math.random() - 0.5) * 44;
      const startY = 1 + Math.random() * 5; // top of header

      // Gentle floating sway like light, weightless plumage ("mais fluffy, não pesado")
      const sway1 = (Math.random() - 0.5) * 32;
      const sway2 = sway1 + (Math.random() - 0.5) * 34;

      const rotStart = (Math.random() - 0.5) * 40;
      const rot1 = rotStart + (Math.random() > 0.5 ? 28 : -28);
      const rot2 = rot1 + (Math.random() > 0.5 ? -36 : 36);
      const rotEnd = rot2 + (Math.random() > 0.5 ? 24 : -24);

      // Slower floating duration (1.6s to 2.2s) for light, airy flutter
      const duration = 1600 + Math.random() * 600;
      const delay = i * 85;

      feather.style.position = 'absolute';
      feather.style.left = '0px';
      feather.style.top = '0px';
      feather.style.width = size + 'px';
      feather.style.height = height + 'px';
      feather.style.pointerEvents = 'none';
      feather.style.opacity = '0';
      feather.style.transform = `translate(${startX}px, ${startY}px)`;

      feather.innerHTML = isBrown ? `
        <svg viewBox="0 0 32 40" width="100%" height="100%" style="overflow: visible; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
          <path d="M 16,3 C 16,14 15.5,25 15,37" stroke="#D7C4A5" stroke-width="1.3" stroke-linecap="round"/>
          <path d="M 16,4 C 11,8 8,14 8,20 C 8,24 10.5,26.5 12,25 C 10,28 11.5,31 14,31.5 C 13.5,33 14.5,34 15,33 C 15.5,34 16.5,33 16,31.5 C 18.5,31 20,28 18,25 C 19.5,26.5 22,24 22,20 C 22,14 19,8 16,4 Z" fill="${tone}" opacity="0.95"/>
          <path d="M 15,26 Q 10,29 7,32 M 15,28 Q 11,32 9,35 M 15,26 Q 20,29 23,32 M 15,28 Q 19,32 21,35" stroke="#7A3F2A" stroke-width="1.1" stroke-linecap="round" fill="none"/>
        </svg>
      ` : `
        <svg viewBox="0 0 32 40" width="100%" height="100%" style="overflow: visible; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.4));">
          <path d="M 16,3 C 16,14 15.5,25 15,37" stroke="#D5CBB9" stroke-width="1.3" stroke-linecap="round"/>
          <path d="M 16,4 C 11,8 8,14 8,20 C 8,24 10.5,26.5 12,25 C 10,28 11.5,31 14,31.5 C 13.5,33 14.5,34 15,33 C 15.5,34 16.5,33 16,31.5 C 18.5,31 20,28 18,25 C 19.5,26.5 22,24 22,20 C 22,14 19,8 16,4 Z" fill="${tone}" opacity="0.96"/>
          <path d="M 15,26 Q 10,29 7,32 M 15,28 Q 11,32 9,35 M 15,26 Q 20,29 23,32 M 15,28 Q 19,32 21,35" stroke="#D8CFBF" stroke-width="1.1" stroke-linecap="round" fill="none"/>
        </svg>
      `;

      viewport.appendChild(feather);

      const keyframes = [
        {
          transform: `translate(${startX}px, ${startY}px) rotate(${rotStart}deg) scale(0.7)`,
          opacity: 0
        },
        {
          transform: `translate(${startX + sway1 * 0.4}px, ${startY + 12}px) rotate(${rot1}deg) scale(1)`,
          opacity: 0.95,
          offset: 0.2
        },
        {
          transform: `translate(${startX + sway1}px, ${startY + (headerHeight * 0.5)}px) rotate(${rot2}deg) scale(1)`,
          opacity: 0.92,
          offset: 0.62
        },
        {
          transform: `translate(${startX + sway2}px, ${headerHeight - 2}px) rotate(${rotEnd}deg) scale(0.85)`,
          opacity: 0
        }
      ];

      const anim = feather.animate(keyframes, {
        duration: duration,
        delay: delay,
        easing: 'cubic-bezier(0.2, 0.7, 0.4, 1)',
        fill: 'both'
      });

      anim.onfinish = () => feather.remove();
    }
  }


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

  // Scrollspy
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

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
   2. THEME TOGGLE (SUNFLOWER HELIOTROPISM EASTER EGG 🌻☀️🌙)
   Girassol & Ramo Fofinho Dinâmico (Caule vivo contínuo a 60fps)
   ========================================================================== */

let plantAnimFrame = null;
let currentPlantT = 0; // 0 = Light (Dia), 1 = Dark (Noite)

function renderPlantFrame(t) {
  currentPlantT = t;
  const stemEl = document.getElementById('branch-stem-path');
  const leafEl = document.getElementById('branch-leaf-path');
  const headEl = document.getElementById('branch-sunflower-head');
  if (!stemEl || !headEl) return;

  // 1. Cabeça do girassol: centro (cx, cy) e rotação
  // De dia (t=0): cx=19, cy=15, rot=+26° (erguido para o sol)
  // À noite (t=1): cx=56, cy=23, rot=-75° (descaído a dormir sob o arco superior)
  const cx = 19 + 37 * t;
  const cy = 15 + 8 * t + Math.sin(t * Math.PI) * 1.5;
  const rot = 26 - 101 * t;

  headEl.setAttribute('transform', `translate(${cx.toFixed(2)}, ${cy.toFixed(2)}) rotate(${rot.toFixed(2)})`);

  // 2. Caule contínuo: passa suavemente por baixo durante a viragem e arqueia por cima da flor à noite
  // Base do caule: de x=19 (dia) até x=74 (noite)
  const x0 = (19 + 55 * t).toFixed(2);
  const c1x = (19 + 56 * t).toFixed(2);
  const c1y = (34 - 9 * t).toFixed(2);
  const c2x = (19 + 56 * t).toFixed(2);
  const c2y = (30 - 15 * t).toFixed(2);
  const midX = (19 + 53 * t).toFixed(2);
  const midY = (28 - 18 * t).toFixed(2);

  const c3x = (19 + 50 * t).toFixed(2);
  const c3y = (26 - 21.5 * t).toFixed(2);
  const c4x = (19 + 43 * t).toFixed(2);
  const c4y = (25 - 20.5 * t).toFixed(2);
  const endX = (19 + 37 * t).toFixed(2);
  const endY = (24 - 8 * t).toFixed(2);

  const stemD = `M ${x0} 37 C ${c1x} ${c1y}, ${c2x} ${c2y}, ${midX} ${midY} C ${c3x} ${c3y}, ${c4x} ${c4y}, ${endX} ${endY}`;
  stemEl.setAttribute('d', stemD);

  // 3. Folhinha dinâmica contínua ao longo do caule
  if (leafEl) {
    const lx0 = (19 + 55 * t).toFixed(2);
    const ly0 = (30 - 3 * t).toFixed(2);
    const lx1 = (14 + 64 * t).toFixed(2);
    const ly1 = (28 - 3 * t).toFixed(2);
    const lx2 = (12 + 68 * t).toFixed(2);
    const ly2 = (32 - 4 * t).toFixed(2);
    const lx3 = (16 + 61 * t).toFixed(2);
    const ly3 = (34 - 3 * t).toFixed(2);
    const lx4 = (18 + 56 * t).toFixed(2);
    const ly4 = (35 - 3 * t).toFixed(2);

    const leafD = `M ${lx0} ${ly0} C ${lx1} ${ly1}, ${lx2} ${ly2}, ${lx3} ${ly3} C ${lx4} ${ly4}, ${lx0} ${ly0}, ${lx0} ${ly0} Z`;
    leafEl.setAttribute('d', leafD);
  }
}

function animatePlantTo(targetT, duration = 850) {
  if (plantAnimFrame) cancelAnimationFrame(plantAnimFrame);
  const startT = currentPlantT;
  const deltaT = targetT - startT;
  if (Math.abs(deltaT) < 0.001) {
    renderPlantFrame(targetT);
    return;
  }
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    // Easing suave sedoso (Quartic ease in-out para arranque e paragem ultra-macios)
    const eased = progress < 0.5 ? 8 * Math.pow(progress, 4) : 1 - Math.pow(-2 * progress + 2, 4) / 2;
    renderPlantFrame(startT + deltaT * eased);

    if (progress < 1) {
      plantAnimFrame = requestAnimationFrame(step);
    } else {
      renderPlantFrame(targetT);
      plantAnimFrame = null;
    }
  }

  plantAnimFrame = requestAnimationFrame(step);
}

function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Initialize theme
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Initial render of continuous plant
  renderPlantFrame(currentTheme === 'dark' ? 1 : 0);

  // Remove any tooltip message so no text popups appear on hover/click
  themeToggle.removeAttribute('title');

  // Theme toggle click interaction (limpo, silencioso, sem qualquer mensagem de texto)
  themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

    // Disparar animação suave contínua
    if (newTheme === 'dark') {
      animatePlantTo(1, 850);
    } else {
      animatePlantTo(0, 850);
    }

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.removeAttribute('title');
  });
}

/* Global Toast Helper */
function showGlobalToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #22C55E; margin-right: 8px;"></i> ${message}`;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   3. COPY TO CLIPBOARD & TOAST NOTIFICATION
   ========================================================================== */
function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((resolve, reject) => {
      const successful = document.execCommand('copy');
      textArea.remove();
      successful ? resolve() : reject();
    });
  }
}

function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        copyTextToClipboard(textToCopy).then(() => {
          const prefix = (currentLang === 'en') ? 'Copied: ' : 'Copiado: ';
          showGlobalToast(`${prefix}${textToCopy}`);

          const copyIcon = btn.querySelector('.pill-copy-icon');
          if (copyIcon) {
            const prevClass = copyIcon.className;
            copyIcon.className = 'fa-solid fa-check pill-copy-icon';
            copyIcon.style.color = 'var(--primary)';
            setTimeout(() => {
              copyIcon.className = prevClass;
              copyIcon.style.color = '';
            }, 1800);
          }
        }).catch(() => {
          showGlobalToast('Erro ao copiar texto.');
        });
      }
    });
  });
}

/* ==========================================================================
   4. METHODOLOGY INTERACTIVE CYCLE (ESQ -> DRT -> BAIXO DRT -> BAIXO ESQ)
   ========================================================================== */
function initMethodologySteps() {
  const arrowTo2 = document.getElementById('arrowTo2');
  const arrowTo3 = document.getElementById('arrowTo3');
  const arrowTo4 = document.getElementById('arrowTo4');
  const arrowTo1 = document.getElementById('arrowTo1');

  const card1 = document.getElementById('methodCard1');
  const card2 = document.getElementById('methodCard2');
  const card3 = document.getElementById('methodCard3');
  const card4 = document.getElementById('methodCard4');

  if (!card1) return;

  function resetToStep1() {
    if (card2) card2.classList.remove('revealed');
    if (card3) card3.classList.remove('revealed');
    if (card4) card4.classList.remove('revealed');

    if (arrowTo2) {
      arrowTo2.classList.remove('completed');
      arrowTo2.classList.add('active-next');
    }
    if (arrowTo3) arrowTo3.classList.remove('completed', 'active-next');
    if (arrowTo4) arrowTo4.classList.remove('completed', 'active-next');
    if (arrowTo1) arrowTo1.classList.remove('completed', 'active-next');

    // Smooth subtle highlight on card 1 to acknowledge reset
    card1.style.transform = 'scale(1.02)';
    setTimeout(() => {
      card1.style.transform = '';
    }, 280);
  }

  function revealStep(stepNum) {
    if (stepNum === 2) {
      if (card2) card2.classList.add('revealed');
      if (arrowTo2) {
        arrowTo2.classList.remove('active-next');
        arrowTo2.classList.add('completed');
      }
      if (arrowTo3 && card3 && !card3.classList.contains('revealed')) {
        arrowTo3.classList.add('active-next');
      }
    } else if (stepNum === 3) {
      if (card3) card3.classList.add('revealed');
      if (arrowTo3) {
        arrowTo3.classList.remove('active-next');
        arrowTo3.classList.add('completed');
      }
      if (arrowTo4 && card4 && !card4.classList.contains('revealed')) {
        arrowTo4.classList.add('active-next');
      }
    } else if (stepNum === 4) {
      if (card4) card4.classList.add('revealed');
      if (arrowTo4) {
        arrowTo4.classList.remove('active-next');
        arrowTo4.classList.add('completed');
      }
      if (arrowTo1) {
        arrowTo1.classList.add('active-next');
      }
    }
  }

  if (arrowTo2) arrowTo2.addEventListener('click', () => revealStep(2));
  if (arrowTo3) arrowTo3.addEventListener('click', () => revealStep(3));
  if (arrowTo4) arrowTo4.addEventListener('click', () => revealStep(4));
  if (arrowTo1) {
    arrowTo1.addEventListener('click', () => {
      // Loop back to start: reset to step 1
      resetToStep1();
      card1.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
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
   7. INTERACTIVE SPECIALIZATION STAGE & SCROLL BIO REVEAL
   ========================================================================== */
function initSpecializationStage() {
  const stage = document.getElementById('specializationStage');
  const scrollBio = document.getElementById('aboutScrollBio');

  if (!stage) return;

  // IntersectionObserver to trigger fan-out after portrait is viewed
  const stageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Optimal delay (~450ms) so user registers portrait before cards fan out
        setTimeout(() => {
          stage.classList.add('fanned-out');
        }, 450);
        observer.unobserve(stage);
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -50px 0px'
  });

  stageObserver.observe(stage);

  // IntersectionObserver to reveal bio text when scrolling slightly down
  if (scrollBio) {
    const bioObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrollBio.classList.add('revealed');
          observer.unobserve(scrollBio);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    });

    bioObserver.observe(scrollBio);
  }
}

/* ==========================================================================
   7. VERTICAL TIMELINE SCROLL REVEAL (PINNED SCROLL TRACK DRIVEN BY PAGE SCROLL)
   - Quando a secção anterior (#about) sai do ecrã, a timeline desce naturalmente
     com o scroll da página, sem necessidade de posicionar o cursor no interior.
   - Quando se faz scroll para cima, a timeline retrocede e regressa imediatamente
     à parte inferior da secção anterior (#about).
   ========================================================================== */
function initTimelineScrollReveal() {
  const section = document.getElementById('experience');
  const scrollWindow = document.getElementById('timelineScrollWindow');
  const rows = document.querySelectorAll('.timeline-v-row');
  if (!section || !scrollWindow) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    root: scrollWindow,
    threshold: 0.08,
    rootMargin: '0px 0px -10px 0px'
  });

  rows.forEach((row, index) => {
    row.style.transitionDelay = `${index * 0.08}s`;
    observer.observe(row);
  });

  // Smooth window scroll progress driving the timeline
  let ticking = false;

  function updateTimelineProgress() {
    const rect = section.getBoundingClientRect();
    const navbarHeight = 70;
    const maxScroll = scrollWindow.scrollHeight - scrollWindow.clientHeight;
    if (maxScroll <= 0) return;

    const totalTrack = section.offsetHeight - window.innerHeight;
    if (totalTrack <= 0) return;

    // Scrolled past top of section (below navbar)
    const scrolledPastTop = -rect.top + navbarHeight;
    const progress = Math.min(1, Math.max(0, scrolledPastTop / totalTrack));

    // Directly set scrollTop
    scrollWindow.scrollTop = progress * maxScroll;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateTimelineProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    updateTimelineProgress();
  }, { passive: true });

  // Initial sync
  updateTimelineProgress();
}

/* ==========================================================================
   8. INTERACTIVE PROJECT POP-UP MODALS
   ========================================================================== */
function initProjectModals() {
  const triggers = document.querySelectorAll('[data-modal]');
  const closeBtns = document.querySelectorAll('[data-close-modal]');

  function preventBgScroll(e) {
    // Permitir scroll livre dentro das áreas roláveis dos modais (projetos e CV)
    if (e.target.closest('.modal-left-col') || e.target.closest('.doc-viewer-scroll') || e.target.closest('.cv-modal-body')) {
      return;
    }
    // Bloquear scroll se o utilizador tentar rolar no backdrop/fundo da página
    e.preventDefault();
  }

  let savedScrollY = 0;

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // Guardar a posição exata de scroll antes de abrir o modal
    savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Bloqueio de scroll no fundo da página
    window.addEventListener('wheel', preventBgScroll, { passive: false });
    window.addEventListener('touchmove', preventBgScroll, { passive: false });

    // Focus no botão de fechar para acessibilidade sem deslocar a página
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    window.removeEventListener('wheel', preventBgScroll);
    window.removeEventListener('touchmove', preventBgScroll);

    // Restaurar a posição exata da página onde o utilizador estava
    window.scrollTo({
      top: savedScrollY,
      behavior: 'instant'
    });
  }

  triggers.forEach(trig => {
    trig.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trig.getAttribute('data-modal');
      openModal(modalId);
    });

    trig.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const modalId = trig.getAttribute('data-modal');
        openModal(modalId);
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modal = btn.closest('.project-modal');
      closeModal(modal);
    });
  });

  // Close when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.project-modal.active');
      if (activeModal) closeModal(activeModal);
    }
  });
}

/* ==========================================================================
   9. CV LANGUAGE SWITCHER (PT / EN)
   ========================================================================== */
function initCvSwitcher() {
  const tabBtns = document.querySelectorAll('.cv-tab-btn');
  const previewImg = document.getElementById('cv-preview-img');
  const downloadBtn = document.getElementById('cv-download-btn');
  const fullscreenBtn = document.getElementById('cv-fullscreen-btn');
  const langPill = document.getElementById('cv-current-lang-pill');

  if (!tabBtns.length || !previewImg) return;

  const cvData = {
    pt: {
      img: 'assets/cv/cv-pt.png',
      pdf: 'assets/cv/cv-daniel-marques-pt.pdf',
      download: 'CV_Daniel_Marques_PT.pdf',
      label: '<i class="fa-solid fa-circle-check text-orange"></i> Versão Portuguesa (PT)'
    },
    en: {
      img: 'assets/cv/cv-en.png',
      pdf: 'assets/cv/cv-daniel-marques-en.pdf',
      download: 'CV_Daniel_Marques_EN.pdf',
      label: '<i class="fa-solid fa-circle-check text-orange"></i> English Version (EN)'
    }
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-cv-lang');
      if (!cvData[lang]) return;

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update image, links and metadata
      previewImg.style.opacity = '0.6';
      setTimeout(() => {
        previewImg.src = cvData[lang].img;
        previewImg.style.opacity = '1';
      }, 120);

      if (downloadBtn) {
        downloadBtn.href = cvData[lang].pdf;
        downloadBtn.setAttribute('download', cvData[lang].download);
      }
      if (fullscreenBtn) {
        fullscreenBtn.href = cvData[lang].pdf;
      }
      if (langPill) {
        langPill.innerHTML = cvData[lang].label;
      }
    });
  });
}





/* ==========================================================================
   10. BILINGUAL LANGUAGE SWITCHER (EN UK / PT PORTUGAL)
   Starts ALWAYS in English as requested by user ("E começa sempre em inglês").
   Toggle displays only "EN" or "PT", clicking passes to the other.
   ========================================================================== */

let currentLang = 'en'; // Starts ALWAYS in English

function initLanguageSwitcher() {
  const langToggleBtn = document.getElementById('lang-toggle');

  // Initialize page in English on load
  setLanguage('en');

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'en' ? 'pt' : 'en';
      setLanguage(nextLang);
    });
  }
}

function setLanguage(lang) {
  currentLang = lang;

  // 1. Update button text & tooltip
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.textContent = lang === 'en' ? 'EN' : 'PT';
    langToggleBtn.title = lang === 'en' ? 'Mudar para Português (PT)' : 'Switch to English (UK)';
    langToggleBtn.setAttribute('aria-label', langToggleBtn.title);
  }

  // 2. Update HTML attributes
  document.documentElement.setAttribute('lang', lang === 'en' ? 'en-GB' : 'pt-PT');
  document.title = (lang === 'en') ? 'Portfolio Daniel Marques' : 'Portfólio Daniel Marques';

  // 3. Apply full dictionary translations
  applyLanguageContent(lang);

  // 4. Update Koenigsegg slides (119 slides in EN vs 127 in PT)
  updateKoenigseggSlides(lang);

  // 5. Update CV modal
  updateCvModal(lang);
}

function applyLanguageContent(lang) {
  const d = window.i18nData && window.i18nData[lang];
  if (!d) return;

  // Navbar
  const statusEl = document.querySelector('.nav-status-text');
  if (statusEl) statusEl.textContent = d.nav.status;

  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  if (navLinks.length >= 5) {
    navLinks[0].innerHTML = `<i class="fa-regular fa-user"></i> ${d.nav.about}`;
    navLinks[1].innerHTML = `<i class="fa-solid fa-briefcase"></i> ${d.nav.experience}`;
    navLinks[2].innerHTML = `<i class="fa-solid fa-diagram-project"></i> ${d.nav.methodology}`;
    navLinks[3].innerHTML = `<i class="fa-solid fa-screwdriver-wrench"></i> ${d.nav.tools}`;
    navLinks[4].innerHTML = `<i class="fa-solid fa-layer-group"></i> ${d.nav.projects}`;
  }

  const cvNavBtn = document.querySelector('.nav-cv-btn');
  if (cvNavBtn) cvNavBtn.title = d.nav.cv_title;

  const homeBtn = document.getElementById('nav-home-btn');
  if (homeBtn) {
    homeBtn.removeAttribute('title');
  }

  // Hero
  const heroEyebrow = document.querySelector('.hero-eyebrow');
  if (heroEyebrow) heroEyebrow.textContent = d.hero.eyebrow;

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.innerHTML = d.hero.title;

  // About
  const aboutHeading = document.querySelector('.about-section .section-title');
  if (aboutHeading) aboutHeading.textContent = d.about.heading;

  const portraitLoc = document.querySelector('.portrait-name');
  if (portraitLoc) portraitLoc.textContent = d.about.portrait_location;

  const card1 = document.querySelector('.spec-card[data-pillar="strategy"]');
  if (card1) {
    const t = card1.querySelector('.spec-title');
    const p = card1.querySelector('.spec-desc');
    const tag = card1.querySelector('.spec-tag');
    if (t) t.textContent = d.about.card1_title;
    if (p) p.textContent = d.about.card1_desc;
    if (tag) tag.innerHTML = d.about.card1_tag;
  }
  const card2 = document.querySelector('.spec-card[data-pillar="branding"]');
  if (card2) {
    const t = card2.querySelector('.spec-title');
    const p = card2.querySelector('.spec-desc');
    const tag = card2.querySelector('.spec-tag');
    if (t) t.textContent = d.about.card2_title;
    if (p) p.textContent = d.about.card2_desc;
    if (tag) tag.innerHTML = d.about.card2_tag;
  }
  const card3 = document.querySelector('.spec-card[data-pillar="social"]');
  if (card3) {
    const t = card3.querySelector('.spec-title');
    const p = card3.querySelector('.spec-desc');
    const tag = card3.querySelector('.spec-tag');
    if (t) t.textContent = d.about.card3_title;
    if (p) p.textContent = d.about.card3_desc;
    if (tag) tag.innerHTML = d.about.card3_tag;
  }
  const card4 = document.querySelector('.spec-card[data-pillar="audit"]');
  if (card4) {
    const t = card4.querySelector('.spec-title');
    const p = card4.querySelector('.spec-desc');
    const tag = card4.querySelector('.spec-tag');
    if (t) t.textContent = d.about.card4_title;
    if (p) p.textContent = d.about.card4_desc;
    if (tag) tag.innerHTML = d.about.card4_tag;
  }

  const bioTitle = document.querySelector('.bio-intro-title');
  if (bioTitle) bioTitle.innerHTML = d.about.intro_title;

  const bioText = document.querySelector('.bio-main-text');
  if (bioText) bioText.innerHTML = d.about.intro_text;

    // Experience / Timeline
  const expHeading = document.querySelector('.experience-section .section-title') || document.querySelector('.timeline-section .section-title');
  if (expHeading) expHeading.textContent = d.experience.heading;

  // Side Rails
  const railLeft = document.querySelector('.rail-left .rail-title');
  if (railLeft && d.experience.rail_professional) {
    railLeft.innerHTML = `<i class="fa-solid fa-briefcase"></i> ${d.experience.rail_professional}`;
  }
  const railRight = document.querySelector('.rail-right .rail-title');
  if (railRight && d.experience.rail_academic) {
    railRight.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${d.experience.rail_academic}`;
  }

  const timelineCards = document.querySelectorAll('.timeline-v-card');
  if (timelineCards.length >= 4) {
    // Card 0: InovCorp (Professional)
    const c1 = timelineCards[0];
    const c1Date = c1.querySelector('.t-date');
    const c1Role = c1.querySelector('.t-role');
    const c1Entity = c1.querySelector('.t-entity');
    const c1Grade = c1.querySelector('.t-grade-tag');
    const c1List = c1.querySelectorAll('.t-duties li');
    if (c1Date) c1Date.textContent = d.experience.card1_period;
    if (c1Role) c1Role.textContent = d.experience.card1_role;
    if (c1Entity) c1Entity.textContent = d.experience.card1_entity;
    if (c1Grade) c1Grade.innerHTML = d.experience.card1_grade;
    if (c1List[0]) c1List[0].innerHTML = `<i class="fa-solid fa-check"></i> ${d.experience.card1_b1}`;
    if (c1List[1]) c1List[1].innerHTML = `<i class="fa-solid fa-check"></i> ${d.experience.card1_b2}`;
    if (c1List[2]) c1List[2].innerHTML = `<i class="fa-solid fa-check"></i> ${d.experience.card1_b3}`;

    // Card 1: IPLUSO (Academic)
    const c2 = timelineCards[1];
    const c2Date = c2.querySelector('.t-date');
    const c2Role = c2.querySelector('.t-role');
    const c2Entity = c2.querySelector('.t-entity');
    const c2Grade = c2.querySelector('.t-grade-tag');
    const c2AreasLabel = c2.querySelector('.t-areas-label');
    const c2Areas = c2.querySelectorAll('.t-areas-list li');
    if (c2Date) c2Date.textContent = d.experience.card2_period;
    if (c2Role) c2Role.textContent = d.experience.card2_role;
    if (c2Entity) c2Entity.textContent = d.experience.card2_entity;
    if (c2Grade) c2Grade.innerHTML = d.experience.card2_grade;
    if (c2AreasLabel) c2AreasLabel.innerHTML = `<strong>${d.experience.card2_areas_title}</strong>`;
    c2Areas.forEach((li, idx) => {
      if (d.experience.card2_areas && d.experience.card2_areas[idx]) {
        li.innerHTML = `<i class="fa-solid fa-arrow-right text-orange"></i> ${d.experience.card2_areas[idx]}`;
      }
    });

    // Card 2: STREAM PLAN EVENTS (Professional)
    const c3 = timelineCards[2];
    const c3Date = c3.querySelector('.t-date');
    const c3Role = c3.querySelector('.t-role');
    const c3Entity = c3.querySelector('.t-entity');
    const c3Proj = c3.querySelector('.t-project-note');
    const c3List = c3.querySelectorAll('.t-duties li');
    if (c3Date) c3Date.textContent = d.experience.card3_period;
    if (c3Role) c3Role.textContent = d.experience.card3_role;
    if (c3Entity) c3Entity.textContent = d.experience.card3_entity;
    if (c3Proj) c3Proj.innerHTML = d.experience.card3_project;
    if (c3List[0]) c3List[0].innerHTML = `<i class="fa-solid fa-check"></i> ${d.experience.card3_b1}`;
    if (c3List[1]) c3List[1].innerHTML = `<i class="fa-solid fa-check"></i> ${d.experience.card3_b2}`;
    if (c3List[2]) c3List[2].innerHTML = `<i class="fa-solid fa-check"></i> ${d.experience.card3_b3}`;
    if (c3List[3]) c3List[3].innerHTML = `<i class="fa-solid fa-check"></i> ${d.experience.card3_b4}`;

    // Card 3: EDIT. (Academic)
    const c4 = timelineCards[3];
    const c4Date = c4.querySelector('.t-date');
    const c4Role = c4.querySelector('.t-role');
    const c4Entity = c4.querySelector('.t-entity');
    const c4Grade = c4.querySelector('.t-grade-tag');
    const c4Proj = c4.querySelector('.t-project-note');
    const c4AreasLabel = c4.querySelector('.t-areas-label');
    const c4Areas = c4.querySelectorAll('.t-areas-list li');
    if (c4Date) c4Date.textContent = d.experience.card4_period;
    if (c4Role) c4Role.textContent = d.experience.card4_role;
    if (c4Entity) c4Entity.textContent = d.experience.card4_entity;
    if (c4Grade) c4Grade.innerHTML = d.experience.card4_grade;
    if (c4Proj) c4Proj.innerHTML = d.experience.card4_project;
    if (c4AreasLabel) c4AreasLabel.innerHTML = `<strong>${d.experience.card4_areas_title}</strong>`;
    c4Areas.forEach((li, idx) => {
      if (d.experience.card4_areas && d.experience.card4_areas[idx]) {
        li.innerHTML = `<i class="fa-solid fa-arrow-right text-orange"></i> ${d.experience.card4_areas[idx]}`;
      }
    });
  }

  // Methodology
  const methHeading = document.querySelector('.methodology-section .section-title');
  if (methHeading) methHeading.textContent = d.methodology.heading;
  const methSub = document.querySelector('.methodology-section .section-sub');
  if (methSub) methSub.textContent = d.methodology.subtitle;

  const m1 = document.getElementById('methodCard1');
  if (m1) {
    const t = m1.querySelector('.method-step-title');
    const sub = m1.querySelector('.method-subtitle');
    const lis = m1.querySelectorAll('.method-checklist li');
    if (t) t.textContent = d.methodology.step1_title;
    if (sub) sub.textContent = d.methodology.step1_sub;
    lis.forEach((li, i) => { if (d.methodology.step1_list[i]) li.textContent = d.methodology.step1_list[i]; });
  }
  const m2 = document.getElementById('methodCard2');
  if (m2) {
    const t = m2.querySelector('.method-step-title');
    const sub = m2.querySelector('.method-subtitle');
    const lis = m2.querySelectorAll('.method-checklist li');
    if (t) t.textContent = d.methodology.step2_title;
    if (sub) sub.textContent = d.methodology.step2_sub;
    lis.forEach((li, i) => { if (d.methodology.step2_list[i]) li.textContent = d.methodology.step2_list[i]; });
  }
  const m3 = document.getElementById('methodCard3');
  if (m3) {
    const t = m3.querySelector('.method-step-title');
    const sub = m3.querySelector('.method-subtitle');
    const lis = m3.querySelectorAll('.method-checklist li');
    if (t) t.textContent = d.methodology.step3_title;
    if (sub) sub.textContent = d.methodology.step3_sub;
    lis.forEach((li, i) => { if (d.methodology.step3_list[i]) li.textContent = d.methodology.step3_list[i]; });
  }
  const m4 = document.getElementById('methodCard4');
  if (m4) {
    const t = m4.querySelector('.method-step-title');
    const sub = m4.querySelector('.method-subtitle');
    const lis = m4.querySelectorAll('.method-checklist li');
    if (t) t.textContent = d.methodology.step4_title;
    if (sub) sub.textContent = d.methodology.step4_sub;
    lis.forEach((li, i) => { if (d.methodology.step4_list[i]) li.textContent = d.methodology.step4_list[i]; });
  }

  const a2 = document.getElementById('arrowTo2');
  if (a2) { a2.title = d.methodology.arrow_to_2_title; a2.setAttribute('aria-label', d.methodology.arrow_to_2_aria); }
  const a3 = document.getElementById('arrowTo3');
  if (a3) { a3.title = d.methodology.arrow_to_3_title; a3.setAttribute('aria-label', d.methodology.arrow_to_3_aria); }
  const a4 = document.getElementById('arrowTo4');
  if (a4) { a4.title = d.methodology.arrow_to_4_title; a4.setAttribute('aria-label', d.methodology.arrow_to_4_aria); }
  const a1 = document.getElementById('arrowTo1');
  if (a1) { a1.title = d.methodology.arrow_to_1_title; a1.setAttribute('aria-label', d.methodology.arrow_to_1_aria); }

  const goalText = document.querySelector('.goal-text');
  if (goalText) goalText.innerHTML = d.methodology.goal;

  // Tools
  const toolsHeading = document.querySelector('.tools-section .section-title');
  if (toolsHeading) toolsHeading.textContent = d.tools.heading;
  const toolsSub = document.querySelector('.tools-section .section-sub');
  if (toolsSub) toolsSub.textContent = d.tools.subtitle;

  // Projects
  const projHeading = document.querySelector('.projects-section .section-title');
  if (projHeading) projHeading.textContent = d.projects.heading;
  const projSub = document.querySelector('.projects-section .section-sub');
  if (projSub) projSub.textContent = d.projects.subtitle;

  // All "Ver Projeto" / "View Project" buttons (cover overlay pills and bottom links)
  document.querySelectorAll('.visual-open-pill').forEach(pill => {
    pill.innerHTML = `<i class="fa-solid fa-expand"></i> ${d.projects.view_project}`;
  });
  document.querySelectorAll('.view-project-link span').forEach(sp => {
    sp.textContent = d.projects.view_project;
  });

  const projCards = document.querySelectorAll('.project-card-visual');
  if (projCards.length >= 3) {
    // Koenigsegg
    const pc1 = projCards[0];
    const pc1Disc = pc1.querySelector('.badge-category');
    const pc1Tag = pc1.querySelector('.badge-tag');
    const pc1Title = pc1.querySelector('.project-visual-title');
    const pc1Desc = pc1.querySelector('.project-visual-desc');
    const pc1Btn = pc1.querySelector('.view-project-link span');
    if (pc1Disc) pc1Disc.innerHTML = `<i class="fa-solid fa-bullhorn"></i> ${d.projects.koenigsegg_discipline}`;
    if (pc1Tag) pc1Tag.textContent = d.projects.koenigsegg_tag;
    if (pc1Title) pc1Title.textContent = d.projects.koenigsegg_title;
    if (pc1Desc) pc1Desc.textContent = d.projects.koenigsegg_desc;
    if (pc1Btn) pc1Btn.textContent = d.projects.view_project;

    // Saoloto
    const pc2 = projCards[1];
    const pc2Disc = pc2.querySelector('.badge-category');
    const pc2Tag = pc2.querySelector('.badge-tag');
    const pc2Title = pc2.querySelector('.project-visual-title');
    const pc2Desc = pc2.querySelector('.project-visual-desc');
    const pc2Btn = pc2.querySelector('.view-project-link span');
    if (pc2Disc) pc2Disc.innerHTML = `<i class="fa-solid fa-chess"></i> ${d.projects.saoloto_discipline}`;
    if (pc2Tag) pc2Tag.textContent = d.projects.saoloto_tag;
    if (pc2Title) pc2Title.textContent = d.projects.saoloto_title;
    if (pc2Desc) pc2Desc.textContent = d.projects.saoloto_desc;
    if (pc2Btn) pc2Btn.textContent = d.projects.view_project;

    // Brio
    const pc3 = projCards[2];
    const pc3Disc = pc3.querySelector('.badge-category');
    const pc3Tag = pc3.querySelector('.badge-tag');
    const pc3Title = pc3.querySelector('.project-visual-title');
    const pc3Desc = pc3.querySelector('.project-visual-desc');
    const pc3Btn = pc3.querySelector('.view-project-link span');
    if (pc3Disc) pc3Disc.innerHTML = `<i class="fa-solid fa-compass-drafting"></i> ${d.projects.brio_discipline}`;
    if (pc3Tag) pc3Tag.textContent = d.projects.brio_tag;
    if (pc3Title) pc3Title.textContent = d.projects.brio_title;
    if (pc3Desc) pc3Desc.textContent = d.projects.brio_desc;
    if (pc3Btn) pc3Btn.textContent = d.projects.view_project;
  }

  // Modals text
  // Koenigsegg Modal
  const mk = document.getElementById('modal-koenigsegg');
  if (mk) {
    const disc = mk.querySelector('.badge-discipline');
    const tag = mk.querySelector('.badge-type');
    const title = mk.querySelector('.modal-title');
    const steps = mk.querySelectorAll('.modal-point-item');
    const docT = mk.querySelector('.doc-viewer-title span:first-of-type');
    const pdf = mk.querySelector('.btn-pdf-fullscreen');

    if (disc) disc.innerHTML = `<i class="fa-solid fa-hashtag"></i> ${d.modals.koenigsegg_discipline}`;
    if (tag) tag.textContent = d.modals.koenigsegg_tag;
    if (title) title.textContent = d.modals.koenigsegg_title;
    if (docT) docT.textContent = d.modals.doc_title;
    if (pdf) pdf.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> ${d.modals.btn_pdf}`;

    if (steps.length >= 3) {
      steps[0].querySelector('h4').textContent = d.modals.challenge_heading;
      steps[0].querySelector('.point-desc').textContent = d.modals.koenigsegg_d1;
      steps[1].querySelector('h4').textContent = d.modals.approach_heading;
      steps[1].querySelector('.point-desc').textContent = d.modals.koenigsegg_d2;
      steps[2].querySelector('h4').textContent = d.modals.result_heading;
      steps[2].querySelector('.point-desc').textContent = d.modals.koenigsegg_d3;
    }
  }

  // Saoloto Modal
  const ms = document.getElementById('modal-saoloto');
  if (ms) {
    const disc = ms.querySelector('.badge-discipline');
    const tag = ms.querySelector('.badge-type');
    const title = ms.querySelector('.modal-title');
    const concept = ms.querySelector('.modal-concept');
    const steps = ms.querySelectorAll('.modal-point-item');
    const docT = ms.querySelector('.doc-viewer-title span:first-of-type');
    const pdf = ms.querySelector('.btn-pdf-fullscreen');

    if (disc) disc.innerHTML = `<i class="fa-solid fa-chess"></i> ${d.modals.saoloto_discipline}`;
    if (tag) tag.textContent = d.modals.saoloto_tag;
    if (title) title.textContent = d.modals.saoloto_title;
    if (concept) concept.innerHTML = `<i class="fa-solid fa-water text-orange"></i> ${d.modals.saoloto_concept}`;
    if (docT) docT.textContent = d.modals.doc_title;
    if (pdf) pdf.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> ${d.modals.btn_pdf}`;

    if (steps.length >= 3) {
      steps[0].querySelector('h4').textContent = d.modals.challenge_heading;
      steps[0].querySelector('.point-desc').textContent = d.modals.saoloto_d1;
      steps[1].querySelector('h4').textContent = d.modals.approach_heading;
      steps[1].querySelector('.point-desc').textContent = d.modals.saoloto_d2;
      steps[2].querySelector('h4').textContent = d.modals.result_heading;
      steps[2].querySelector('.point-desc').textContent = d.modals.saoloto_d3;
    }
  }

  // Brio Modal
  const mb = document.getElementById('modal-brio');
  if (mb) {
    const disc = mb.querySelector('.badge-discipline');
    const tag = mb.querySelector('.badge-type');
    const title = mb.querySelector('.modal-title');
    const concept = mb.querySelector('.modal-concept');
    const steps = mb.querySelectorAll('.modal-point-item');
    const docT = mb.querySelector('.doc-viewer-title span:first-of-type');
    const pdf = mb.querySelector('.btn-pdf-fullscreen');

    if (disc) disc.innerHTML = `<i class="fa-solid fa-compass-drafting"></i> ${d.modals.brio_discipline}`;
    if (tag) tag.textContent = d.modals.brio_tag;
    if (title) title.textContent = d.modals.brio_title;
    if (concept) concept.innerHTML = `<i class="fa-solid fa-building text-orange"></i> ${d.modals.brio_concept}`;
    if (docT) docT.textContent = d.modals.doc_title;
    if (pdf) pdf.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> ${d.modals.btn_pdf}`;

    if (steps.length >= 3) {
      steps[0].querySelector('h4').textContent = d.modals.challenge_heading;
      steps[0].querySelector('.point-desc').textContent = d.modals.brio_d1;
      steps[1].querySelector('h4').textContent = d.modals.approach_heading;
      steps[1].querySelector('.point-desc').textContent = d.modals.brio_d2;
      steps[2].querySelector('h4').textContent = d.modals.result_heading;
      steps[2].querySelector('.point-desc').textContent = d.modals.brio_d3;
    }
  }

  // Footer
  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) footerCopy.textContent = d.footer.copy;
  const footerSub = document.querySelector('.footer-sub');
  if (footerSub) footerSub.textContent = d.footer.sub;
}

function updateKoenigseggSlides(lang) {
  const scrollContainer = document.querySelector('#modal-koenigsegg .doc-viewer-scroll');
  const counterEl = document.querySelector('#modal-koenigsegg .doc-page-counter');
  const pdfBtn = document.querySelector('#modal-koenigsegg .btn-pdf-fullscreen');
  if (!scrollContainer) return;

  const total = (lang === 'en') ? 119 : 127;
  const folder = (lang === 'en') ? 'en' : 'pt';
  const pdfUrl = (lang === 'en') ? 'assets/projects/koenigsegg/koenigsegg-en.pdf' : 'assets/projects/koenigsegg/koenigsegg-pt.pdf';

  if (counterEl) counterEl.textContent = `${total} Slides`;
  if (pdfBtn) pdfBtn.href = pdfUrl;

  let html = '';
  for (let i = 1; i <= total; i++) {
    html += `<div class="doc-slide"><img src="assets/projects/koenigsegg/${folder}/page-${i}.png" alt="Koenigsegg Slide ${i}" loading="lazy"></div>`;
  }
  scrollContainer.innerHTML = html;
}

function updateCvModal(lang) {
  const cvImg = document.getElementById('cv-preview-img');
  const downloadBtn = document.getElementById('cv-download-btn');
  const fullscreenBtn = document.getElementById('cv-fullscreen-btn');
  const subtitle = document.querySelector('.cv-modal-subtitle');
  const formatPill = document.querySelector('.cv-meta-pill');

  if (lang === 'en') {
    if (cvImg) cvImg.src = 'assets/cv/cv-en.png';
    if (downloadBtn) {
      downloadBtn.href = 'assets/cv/cv-daniel-marques-en.pdf';
      downloadBtn.download = 'CV_Daniel_Marques_EN.pdf';
      downloadBtn.innerHTML = '<i class="fa-solid fa-download"></i> Download PDF';
    }
    if (fullscreenBtn) {
      fullscreenBtn.href = 'assets/cv/cv-daniel-marques-en.pdf';
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> View CV in Fullscreen (PDF)';
    }
    if (subtitle) subtitle.textContent = 'Daniel Marques • Digital Marketing & Strategy';
    if (formatPill) formatPill.innerHTML = '<i class="fa-solid fa-file-pdf text-orange"></i> A4 Format • 1 Page';
  } else {
    if (cvImg) cvImg.src = 'assets/cv/cv-pt.png';
    if (downloadBtn) {
      downloadBtn.href = 'assets/cv/cv-daniel-marques-pt.pdf';
      downloadBtn.download = 'CV_Daniel_Marques_PT.pdf';
      downloadBtn.innerHTML = '<i class="fa-solid fa-download"></i> Descarregar PDF';
    }
    if (fullscreenBtn) {
      fullscreenBtn.href = 'assets/cv/cv-daniel-marques-pt.pdf';
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> Ver CV em Ecrã Inteiro (PDF)';
    }
    if (subtitle) subtitle.textContent = 'Daniel Marques • Marketing Digital & Estratégia';
    if (formatPill) formatPill.innerHTML = '<i class="fa-solid fa-file-pdf text-orange"></i> Formato A4 • 1 Página';
  }
}
