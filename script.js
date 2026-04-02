/* ============================================
   MAISON MOVE — Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu-inner a');

  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Navbar hide on scroll down, show on scroll up ---
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      nav.style.boxShadow = '0 1px 0 rgba(26,26,26,0.06)';
    } else {
      nav.style.boxShadow = 'none';
    }
    if (currentScroll > lastScroll && currentScroll > 200) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  // --- Fade-in on scroll ---
  const fadeEls = document.querySelectorAll(
    '.section-header, .collection-item, .tech-card, .story-content-col, .story-image-col, .value-item, .newsletter-inner, .brand-statement-inner, .countdown-inner, .bodymap-grid, .lookbook-header'
  );

  fadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeEls.forEach(el => observer.observe(el));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // --- Staggered animation for grid items ---
  const staggerEls = document.querySelectorAll('.collection-item, .tech-card, .value-item');
  staggerEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });


  // ==========================================
  // COUNTDOWN TIMER
  // ==========================================
  // Set launch date 90 days from now (adjust to your actual launch date)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 90);
  launchDate.setHours(10, 0, 0, 0);

  function updateCountdown() {
    const now = new Date();
    const diff = launchDate - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-minutes').textContent = '00';
      document.getElementById('cd-seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // ==========================================
  // BODYMAP INTERACTIVE
  // ==========================================
  const zones = document.querySelectorAll('.bodymap-zone');
  const defaultInfo = document.getElementById('bodymap-default');
  const allDetails = document.querySelectorAll('.bodymap-detail');

  zones.forEach(zone => {
    const zoneName = zone.dataset.zone;
    const detail = document.getElementById('bodymap-' + zoneName);

    zone.addEventListener('mouseenter', () => {
      // Hide all
      defaultInfo.style.display = 'none';
      allDetails.forEach(d => d.style.display = 'none');
      zones.forEach(z => z.classList.remove('active'));
      // Show this one
      zone.classList.add('active');
      if (detail) detail.style.display = 'block';
    });

    zone.addEventListener('mouseleave', () => {
      zone.classList.remove('active');
      if (detail) detail.style.display = 'none';
      // Check if any zone is still hovered
      setTimeout(() => {
        const anyActive = document.querySelector('.bodymap-zone:hover');
        if (!anyActive) {
          defaultInfo.style.display = 'block';
        }
      }, 50);
    });

    // Touch support
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      defaultInfo.style.display = 'none';
      allDetails.forEach(d => d.style.display = 'none');
      zones.forEach(z => z.classList.remove('active'));
      zone.classList.add('active');
      if (detail) detail.style.display = 'block';
    });
  });

  // Reset on click outside
  document.querySelector('.bodymap')?.addEventListener('click', (e) => {
    if (!e.target.closest('.bodymap-zone')) {
      allDetails.forEach(d => d.style.display = 'none');
      zones.forEach(z => z.classList.remove('active'));
      defaultInfo.style.display = 'block';
    }
  });


  // ==========================================
  // HORIZONTAL LOOKBOOK (drag scroll)
  // ==========================================
  const trackWrapper = document.querySelector('.lookbook-track-wrapper');
  const track = document.querySelector('.lookbook-track');
  const prevBtn = document.querySelector('.lookbook-prev');
  const nextBtn = document.querySelector('.lookbook-next');
  const progressBar = document.getElementById('lookbook-progress-bar');

  if (track && trackWrapper) {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let currentTranslate = 0;
    let maxScroll = 0;

    function getMaxScroll() {
      return track.scrollWidth - trackWrapper.offsetWidth;
    }

    function updateProgress() {
      maxScroll = getMaxScroll();
      if (maxScroll <= 0) return;
      const pct = Math.abs(currentTranslate) / maxScroll;
      const barWidth = 20;
      const maxLeft = 100 - barWidth;
      progressBar.style.width = barWidth + '%';
      progressBar.style.marginLeft = (pct * maxLeft) + '%';
    }

    function setTranslate(val) {
      maxScroll = getMaxScroll();
      currentTranslate = Math.max(-maxScroll, Math.min(0, val));
      track.style.transform = `translateX(${currentTranslate}px)`;
      updateProgress();
    }

    // Mouse drag
    trackWrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollLeft = currentTranslate;
      track.style.transition = 'none';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const x = e.pageX;
      const diff = x - startX;
      setTranslate(scrollLeft + diff);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      track.style.transition = 'transform 0.4s ease';
    });

    // Touch drag
    trackWrapper.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX;
      scrollLeft = currentTranslate;
      track.style.transition = 'none';
    }, { passive: true });

    trackWrapper.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX;
      const diff = x - startX;
      setTranslate(scrollLeft + diff);
    }, { passive: true });

    trackWrapper.addEventListener('touchend', () => {
      isDragging = false;
      track.style.transition = 'transform 0.4s ease';
    });

    // Arrow buttons
    const slideWidth = 340; // slide width + gap

    prevBtn?.addEventListener('click', () => {
      track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
      setTranslate(currentTranslate + slideWidth);
    });

    nextBtn?.addEventListener('click', () => {
      track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
      setTranslate(currentTranslate - slideWidth);
    });

    // Initial progress
    updateProgress();
    window.addEventListener('resize', updateProgress);
  }

});
