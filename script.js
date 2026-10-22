/**
 * VERDÉRA — Luxury Interior Architecture & Furniture Atelier
 * Vanilla JavaScript Controller (Hostinger Ready & Zero Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-menu-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    const toggleMenu = () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Reveal on Scroll (Intersection Observer)
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers or reduced motion preference
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // 4. Collection Filter Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const collectionCards = document.querySelectorAll('.collection-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category || 'all';

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      collectionCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // 5. Contact Form Submission & Validation
  const inquiryForm = document.getElementById('inquiry-form');
  const successBox = document.getElementById('form-success-box');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('client-name');
      const emailInput = document.getElementById('client-email');
      const messageInput = document.getElementById('client-message');

      if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
        alert('Please complete all required fields.');
        return;
      }

      // Simulate luxury submission
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'TRANSMITTING INQUIRY...';
      }

      setTimeout(() => {
        inquiryForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'SEND PROJECT INQUIRY';
        }
        if (successBox) {
          successBox.classList.add('show');
          successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => {
            successBox.classList.remove('show');
          }, 8000);
        }
      }, 900);
    });
  }

  // 6. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Subtle Parallax on Architectural Banner
  const parallaxBanner = document.querySelector('.parallax-bg');
  if (parallaxBanner && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const rect = parallaxBanner.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * 0.08;
        parallaxBanner.style.transform = `translateY(${offset}px)`;
      }
    }, { passive: true });
  }
});
