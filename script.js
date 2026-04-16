/* ============================================
   MAISON MOVE — Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Loading Screen ---
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }, 1400);
  }

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
        document.body.classList.add('page-transition');
        setTimeout(() => document.body.classList.remove('page-transition'), 800);
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

    // Back to top visibility
    const btt = document.getElementById('back-to-top');
    if (btt) {
      btt.classList.toggle('visible', currentScroll > 600);
    }
  });

  // Back to top click
  document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Fade-in on scroll ---
  const fadeEls = document.querySelectorAll(
    '.section-header, .collection-group-header, .collection-item, .tech-card, .story-content-col, .story-image-col, .value-item, .newsletter-inner, .brand-statement-inner, .countdown-inner, .sculptmap-zone-item, .lookbook-header, .tech-diff-header, .tech-diff-item, .loyalty-tier, .testimonial-card, .cert-item'
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

  // --- Account System ---
  const accountModal = document.getElementById('account-modal');
  const tabs = document.querySelectorAll('.account-tab');
  const panelSignup = document.getElementById('panel-signup');
  const panelLogin = document.getElementById('panel-login');
  const panelDashboard = document.getElementById('panel-dashboard');
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');
  const logoutBtn = document.getElementById('logout-btn');

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panelSignup.style.display = tab.dataset.tab === 'signup' ? 'block' : 'none';
      panelLogin.style.display = tab.dataset.tab === 'login' ? 'block' : 'none';
      panelDashboard.style.display = 'none';
    });
  });

  function showDashboard(user) {
    document.querySelector('.account-tabs').style.display = 'none';
    panelSignup.style.display = 'none';
    panelLogin.style.display = 'none';
    panelDashboard.style.display = 'block';
    document.getElementById('dashboard-name').textContent = user.firstName;
    document.getElementById('dashboard-points').textContent = user.points || 0;

    const points = user.points || 0;
    let tierName = 'Move';
    let nextTierText = '500 points to Maison';
    let progress = (points / 500) * 100;

    if (points >= 1000) {
      tierName = 'Maison Elite';
      nextTierText = 'You\'ve reached the highest tier';
      progress = 100;
    } else if (points >= 500) {
      tierName = 'Maison';
      nextTierText = (1000 - points) + ' points to Maison Elite';
      progress = ((points - 500) / 500) * 100;
    }

    document.getElementById('dashboard-tier-name').textContent = tierName;
    document.getElementById('dashboard-next-tier').textContent = nextTierText;
    document.getElementById('dashboard-progress-bar').style.width = progress + '%';
  }

  // Check if already logged in
  const currentUser = JSON.parse(localStorage.getItem('mm_user'));
  if (currentUser) {
    showDashboard(currentUser);
  }

  // Sign up
  signupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = signupForm.querySelectorAll('input');
    const user = {
      firstName: inputs[0].value,
      lastName: inputs[1].value,
      email: inputs[2].value,
      points: 0,
      tier: 'Move',
      joined: new Date().toISOString()
    };
    localStorage.setItem('mm_user', JSON.stringify(user));
    showDashboard(user);
  });

  // Log in
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('mm_user'));
    if (user) {
      showDashboard(user);
    } else {
      alert('No account found. Please sign up first.');
    }
  });

  // Log out
  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('mm_user');
    document.querySelector('.account-tabs').style.display = 'flex';
    tabs[0].classList.add('active');
    tabs[1].classList.remove('active');
    panelDashboard.style.display = 'none';
    panelSignup.style.display = 'block';
    signupForm.reset();
    accountModal.classList.remove('active');
  });

  // Close account modal on overlay click
  accountModal?.addEventListener('click', (e) => {
    if (e.target === accountModal) accountModal.classList.remove('active');
  });

  // --- Parallax on Story Image ---
  const storyImage = document.querySelector('.story-image img');
  if (storyImage) {
    const storySection = document.querySelector('.story');
    window.addEventListener('scroll', () => {
      const rect = storySection.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.top < windowH && rect.bottom > 0) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        const offset = (progress - 0.5) * -60;
        storyImage.style.transform = `translateY(${offset}px)`;
      }
    });
  }

  // --- Testimonials Drag Scroll ---
  const testTrackWrapper = document.querySelector('.testimonials-track-wrapper');
  const testTrack = document.querySelector('.testimonials-track');
  const testProgressBar = document.getElementById('testimonials-progress-bar');

  if (testTrack && testTrackWrapper) {
    let testIsDragging = false;
    let testStartX = 0;
    let testScrollLeft = 0;
    let testCurrentTranslate = 0;

    function getTestMaxScroll() {
      return testTrack.scrollWidth - testTrackWrapper.offsetWidth;
    }

    function updateTestProgress() {
      const max = getTestMaxScroll();
      if (max <= 0 || !testProgressBar) return;
      const pct = Math.abs(testCurrentTranslate) / max;
      testProgressBar.style.width = '20%';
      testProgressBar.style.marginLeft = (pct * 80) + '%';
    }

    function setTestTranslate(val) {
      const max = getTestMaxScroll();
      testCurrentTranslate = Math.max(-max, Math.min(0, val));
      testTrack.style.transform = `translateX(${testCurrentTranslate}px)`;
      updateTestProgress();
    }

    testTrackWrapper.addEventListener('mousedown', (e) => {
      testIsDragging = true;
      testStartX = e.pageX;
      testScrollLeft = testCurrentTranslate;
      testTrack.style.transition = 'none';
    });

    window.addEventListener('mousemove', (e) => {
      if (!testIsDragging) return;
      setTestTranslate(testScrollLeft + (e.pageX - testStartX));
    });

    window.addEventListener('mouseup', () => {
      if (testIsDragging) {
        testIsDragging = false;
        testTrack.style.transition = 'transform 0.4s ease';
      }
    });

    testTrackWrapper.addEventListener('touchstart', (e) => {
      testIsDragging = true;
      testStartX = e.touches[0].pageX;
      testScrollLeft = testCurrentTranslate;
      testTrack.style.transition = 'none';
    }, { passive: true });

    testTrackWrapper.addEventListener('touchmove', (e) => {
      if (!testIsDragging) return;
      setTestTranslate(testScrollLeft + (e.touches[0].pageX - testStartX));
    }, { passive: true });

    testTrackWrapper.addEventListener('touchend', () => {
      testIsDragging = false;
      testTrack.style.transition = 'transform 0.4s ease';
    });

    updateTestProgress();
    window.addEventListener('resize', updateTestProgress);
  }

  // --- Wishlist ---
  const productData = {
    'sculpt-legging': { name: 'The Sculpt Legging', price: '£95', color: '#d4cec6' },
    'perform-bra': { name: 'The Perform Bra', price: '£60', color: '#b8b0a5' },
    'racerback-crop': { name: 'The Racerback Crop', price: '£55', color: '#c4a882' },
    'cropped-jacket': { name: 'The Maison Statement Jacket', price: '£120', color: '#4a4540' },
    'statement-trouser': { name: 'The Maison Statement Trouser', price: '£85', color: '#4a4540' },
    'wide-leg-trouser': { name: 'The Reset Trouser', price: '£75', color: '#d9d3cb' },
    'lounge-tee': { name: 'The Reset Tee', price: '£60', color: '#3a3632' }
  };

  let wishlist = JSON.parse(localStorage.getItem('mm_wishlist')) || [];
  const wishlistCountEl = document.getElementById('wishlist-count');
  const wishlistItemsEl = document.getElementById('wishlist-items');

  function updateWishlistUI() {
    // Update count badge
    wishlistCountEl.textContent = wishlist.length;
    wishlistCountEl.classList.toggle('visible', wishlist.length > 0);

    // Update heart buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      const product = btn.closest('.collection-item')?.dataset.product;
      if (product) btn.classList.toggle('active', wishlist.includes(product));
    });

    // Update modal
    if (wishlist.length === 0) {
      wishlistItemsEl.innerHTML = '<p class="wishlist-empty">You haven\'t saved any pieces yet.</p>';
    } else {
      wishlistItemsEl.innerHTML = wishlist.map(id => {
        const p = productData[id];
        if (!p) return '';
        return `
          <div class="wishlist-item">
            <div class="wishlist-item-swatch" style="background-color: ${p.color};"><span>MM</span></div>
            <div class="wishlist-item-info">
              <h4>${p.name}</h4>
              <p>${p.price}</p>
            </div>
            <button class="wishlist-item-remove" data-remove="${id}" aria-label="Remove">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        `;
      }).join('');

      // Remove buttons
      wishlistItemsEl.querySelectorAll('.wishlist-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          wishlist = wishlist.filter(id => id !== btn.dataset.remove);
          localStorage.setItem('mm_wishlist', JSON.stringify(wishlist));
          updateWishlistUI();
        });
      });
    }
  }

  // Heart button clicks
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const product = btn.closest('.collection-item')?.dataset.product;
      if (!product) return;

      if (wishlist.includes(product)) {
        wishlist = wishlist.filter(id => id !== product);
      } else {
        wishlist.push(product);
      }
      localStorage.setItem('mm_wishlist', JSON.stringify(wishlist));
      updateWishlistUI();
    });
  });

  // Wishlist modal close
  const wishlistModal = document.getElementById('wishlist-modal');
  wishlistModal?.addEventListener('click', (e) => {
    if (e.target === wishlistModal) wishlistModal.classList.remove('active');
  });

  updateWishlistUI();

  // --- Cookie Banner ---
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && !localStorage.getItem('mm_cookies')) {
    setTimeout(() => cookieBanner.classList.add('visible'), 2000);

    document.getElementById('cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem('mm_cookies', 'accepted');
      cookieBanner.classList.remove('visible');
    });

    document.getElementById('cookie-decline')?.addEventListener('click', () => {
      localStorage.setItem('mm_cookies', 'declined');
      cookieBanner.classList.remove('visible');
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  // --- Size Guide Tabs ---
  const sizeTabs = document.querySelectorAll('.size-tab');
  sizeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sizeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('size-bottoms').style.display = tab.dataset.sizetab === 'bottoms' ? 'block' : 'none';
      document.getElementById('size-tops').style.display = tab.dataset.sizetab === 'tops' ? 'block' : 'none';
    });
  });

  // Size modal close on overlay
  const sizeModal = document.getElementById('size-modal');
  sizeModal?.addEventListener('click', (e) => {
    if (e.target === sizeModal) sizeModal.classList.remove('active');
  });

  // --- Modal close on overlay click ---
  const modal = document.getElementById('collection-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // --- Smooth scroll with page transition ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        // Add transition class
        document.body.classList.add('page-transition');

        // Scroll during the fade-out
        setTimeout(() => {
          window.scrollTo({ top: targetPos, behavior: 'instant' });
        }, 250);

        // Remove class after animation
        setTimeout(() => {
          document.body.classList.remove('page-transition');
        }, 800);
      }
    });
  });

  // --- Staggered animation for grid items ---
  const staggerEls = document.querySelectorAll('.collection-item, .tech-card, .value-item');
  staggerEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  // --- Text Reveal Animations ---
  // Wrap section titles in reveal spans
  document.querySelectorAll('.section-title, .hero-title, .newsletter-title, .countdown-title, .brand-statement-text, .tech-diff-question, .modal-title').forEach(el => {
    if (el.classList.contains('hero-title')) {
      // Hero title already has spans, wrap each
      el.classList.add('reveal-stagger');
      el.querySelectorAll('span').forEach(span => {
        const wrap = document.createElement('span');
        wrap.className = 'reveal-wrap';
        const inner = document.createElement('span');
        inner.className = 'reveal-text';
        inner.innerHTML = span.innerHTML;
        wrap.appendChild(inner);
        span.innerHTML = '';
        span.appendChild(wrap);
      });
    } else {
      const wrap = document.createElement('span');
      wrap.className = 'reveal-wrap';
      const inner = document.createElement('span');
      inner.className = 'reveal-text';
      inner.innerHTML = el.innerHTML;
      el.innerHTML = '';
      wrap.appendChild(inner);
      el.appendChild(wrap);
    }
  });

  // Add reveal-fade to descriptions
  document.querySelectorAll('.section-description, .hero-subtitle, .newsletter-text, .countdown-text, .tech-diff-sub, .sustainability-text').forEach(el => {
    el.classList.add('reveal-fade');
  });

  // Observer for reveal animations
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger reveal-wrap elements
        entry.target.querySelectorAll('.reveal-wrap').forEach(wrap => {
          wrap.classList.add('visible');
        });
        // Trigger hero stagger
        if (entry.target.classList.contains('reveal-stagger')) {
          entry.target.querySelectorAll('.reveal-wrap').forEach(wrap => {
            wrap.classList.add('visible');
          });
        }
        // Trigger reveal-fade
        if (entry.target.classList.contains('reveal-fade')) {
          entry.target.classList.add('visible');
        }
        // Trigger child reveal-fades
        entry.target.querySelectorAll('.reveal-fade').forEach(el => {
          el.classList.add('visible');
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
  });

  // Observe parent sections for reveals
  document.querySelectorAll('.hero-content, .section-header, .brand-statement-inner, .countdown-inner, .tech-diff-header, .newsletter-inner, .sustainability-inner, .faq-header, .lookbook-header').forEach(el => {
    revealObserver.observe(el);
  });

  // Also observe hero title directly
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) revealObserver.observe(heroTitle);


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
