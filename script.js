/**
 * POÇOS RECEPTIVO CITY TOUR - INTERACTIVE SCRIPTS
 * Guia Turístico Claudinei | Poços de Caldas - MG
 */

// Global Configuration
const APP_CONFIG = {
  whatsappNumber: '5535991932025',
  displayPhone: '(35) 99193-2025',
  guideName: 'Claudinei',
  companyName: 'Poços Receptivo City Tour'
};

// Global direct WhatsApp opener
window.openWhatsApp = function(customText) {
  const defaultText = customText || 'Olá Claudinei! Gostaria de informações para agendar um passeio em Poços de Caldas com a Poços Receptivo City Tour.';
  const url = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(defaultText)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initToursFilter();
  initFaqAccordion();
  initAttractionsModal();
  initContactForm();
  initScrollSpy();
});

/* ==========================================================================
   1. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileClose = document.getElementById('mobileNavClose');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Open mobile drawer
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      mobileBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close mobile drawer
  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   2. TOURS FILTER
   ========================================================================== */
function initToursFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const tourCards = document.querySelectorAll('.tour-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      tourCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordions
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector('.faq-content');
        if (otherContent) otherContent.style.maxHeight = null;
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        content.style.maxHeight = null;
      }
    });
  });

  // Open the first item by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    const firstContent = faqItems[0].querySelector('.faq-content');
    if (firstContent) firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
  }
}

/* ==========================================================================
   4. ATTRACTIONS MODAL
   ========================================================================== */
function initAttractionsModal() {
  const modal = document.getElementById('attractionModal');
  if (!modal) return;

  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalTag = document.getElementById('modalTag');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalCloseBtn');
  const attractionCards = document.querySelectorAll('.attraction-card');

  attractionCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.attraction-img').getAttribute('src');
      const title = card.querySelector('.attraction-name').innerText;
      const tag = card.querySelector('.attraction-tag').innerText;
      const desc = card.getAttribute('data-full-desc') || card.querySelector('.attraction-desc').innerText;

      modalImg.setAttribute('src', img);
      modalTitle.innerText = title;
      modalTag.innerText = tag;
      modalDesc.innerText = desc;

      const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');
      if (modalWhatsAppBtn) {
        modalWhatsAppBtn.href = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá Claudinei! Gostaria de incluir o ponto turístico ' + title + ' no meu passeio em Poços de Caldas.')}`;
      }

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. CONTACT FORM TO WHATSAPP
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('cNome').value.trim();
    const telefone = document.getElementById('cTelefone').value.trim();
    const mensagem = document.getElementById('cMensagem').value.trim();

    if (!nome || !mensagem) {
      alert('Por favor, preencha nome e sua mensagem.');
      return;
    }

    let msg = `*Contato pelo Site - Poços Receptivo City Tour*\n\n`;
    msg += `👤 *Nome:* ${nome}\n`;
    if (telefone) msg += `📱 *Telefone:* ${telefone}\n`;
    msg += `💬 *Mensagem:* ${mensagem}\n`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodedMsg}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

/* Helper to format date YYYY-MM-DD to DD/MM/YYYY */
function formatDate(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
}

/* ==========================================================================
   7. SCROLL SPY FOR ACTIVE NAV LINKS
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
