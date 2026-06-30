/**
 * MoStay Boutique Hotel — App Logic
 * Handles: navigation, scroll effects, accordion rendering,
 * search/filter, and scroll-reveal animations.
 * Depends on: directory-data.js (must be loaded first)
 */

/* ═══════════════════════════════════════════════════════════
   1. NAVIGATION — Sticky + mobile toggle
═══════════════════════════════════════════════════════════ */
(function initNav() {
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  // Scroll state
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', false);
    });
  });
})();

/* ═══════════════════════════════════════════════════════════
   2. SCROLL REVEAL — Intersection Observer
═══════════════════════════════════════════════════════════ */
(function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe all .reveal elements (initial + dynamically added)
  const observeAll = () => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  };

  // Run immediately and after DOM mutations (for dynamic content)
  observeAll();
  const mutObserver = new MutationObserver(observeAll);
  mutObserver.observe(document.body, { childList: true, subtree: true });
})();

/* ═══════════════════════════════════════════════════════════
   3. GUEST BOOKLET — Dynamic Rendering & Accordion
═══════════════════════════════════════════════════════════ */
(function initBooklet() {
  const container = document.getElementById('booklet-container');
  const searchInput = document.getElementById('booklet-search');

  if (!container || typeof guestDirectory === 'undefined') return;

  let activeCategory = 0; // index into guestDirectory
  let searchQuery = '';

  // ── 3a. Render sidebar tabs ──────────────────────────────
  function renderTabs() {
    const tabContainer = document.getElementById('booklet-tabs');
    tabContainer.innerHTML = '';

    guestDirectory.forEach((cat, idx) => {
      const btn = document.createElement('button');
      btn.className = `booklet-tab-btn${idx === activeCategory ? ' active' : ''}`;
      btn.setAttribute('aria-selected', idx === activeCategory);
      btn.setAttribute('role', 'tab');
      btn.id = `tab-${idx}`;
      btn.innerHTML = `
        <span class="tab-icon" aria-hidden="true">${cat.icon}</span>
        <span class="tab-label">${cat.category}</span>
        <span class="tab-count">${cat.items.length}</span>
      `;
      btn.addEventListener('click', () => {
        activeCategory = idx;
        searchQuery = '';
        searchInput.value = '';
        renderTabs();
        renderPanel();
      });
      tabContainer.appendChild(btn);
    });
  }

  // ── 3b. Render accordion panel ───────────────────────────
  function renderPanel() {
    const category = guestDirectory[activeCategory];

    // Filter items by search query
    const filteredItems = category.items.filter(item => {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.titleEn.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q) ||
        item.contentEn.toLowerCase().includes(q)
      );
    });

    container.innerHTML = '';

    // Panel header
    const header = document.createElement('div');
    header.className = 'booklet-panel-title';
    header.innerHTML = `
      <span class="panel-icon" aria-hidden="true">${category.icon}</span>
      ${category.category}
    `;
    container.appendChild(header);

    if (filteredItems.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'booklet-empty';
      empty.innerHTML = `
        <span class="booklet-empty-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></span>
        <p>No results found for "<strong>${searchQuery}</strong>"</p>
        <p>Try searching in another category or using different keywords.</p>
      `;
      container.appendChild(empty);
      return;
    }

    // Accordion items
    filteredItems.forEach((item, idx) => {
      const accItem = document.createElement('div');
      accItem.className = 'accordion-item reveal';

      const triggerId = `acc-trigger-${activeCategory}-${idx}`;
      const bodyId = `acc-body-${activeCategory}-${idx}`;

      accItem.innerHTML = `
        <button
          class="accordion-trigger"
          id="${triggerId}"
          aria-expanded="false"
          aria-controls="${bodyId}"
        >
          <span class="accordion-trigger-inner">
            <span class="accordion-title-bs">${item.title}</span>
            <span class="accordion-title-en">${item.titleEn}</span>
          </span>
          <span class="accordion-chevron" aria-hidden="true">▾</span>
        </button>
        <div
          class="accordion-body"
          id="${bodyId}"
          role="region"
          aria-labelledby="${triggerId}"
        >
          <div class="accordion-body-inner">
            <p class="accordion-text-bs">${item.content}</p>
            <p class="accordion-text-en">${item.contentEn}</p>
          </div>
        </div>
      `;

      const trigger = accItem.querySelector('.accordion-trigger');
      const body = accItem.querySelector('.accordion-body');

      trigger.addEventListener('click', () => {
        const isOpen = trigger.classList.contains('open');

        // Close all others in panel
        container.querySelectorAll('.accordion-trigger.open').forEach(t => {
          if (t !== trigger) {
            t.classList.remove('open');
            t.setAttribute('aria-expanded', false);
            t.nextElementSibling.classList.remove('open');
          }
        });

        trigger.classList.toggle('open', !isOpen);
        trigger.setAttribute('aria-expanded', !isOpen);
        body.classList.toggle('open', !isOpen);
      });

      container.appendChild(accItem);
    });
  }

  // ── 3c. Global search across ALL categories ──────────────
  function renderSearchResults(query) {
    container.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'booklet-panel-title';
    header.innerHTML = `<span class="panel-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></span> Search Results`;
    container.appendChild(header);

    const allMatches = [];
    guestDirectory.forEach(cat => {
      cat.items.forEach(item => {
        const q = query.toLowerCase();
        if (
          item.title.toLowerCase().includes(q) ||
          item.titleEn.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.contentEn.toLowerCase().includes(q)
        ) {
          allMatches.push({ ...item, _cat: cat.category, _catIcon: cat.icon });
        }
      });
    });

    if (allMatches.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'booklet-empty';
      empty.innerHTML = `
        <span class="booklet-empty-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></span>
        <p>No results for "<strong>${query}</strong>"</p>
        <p>Try different keywords — this directory is available in both Bosnian and English.</p>
      `;
      container.appendChild(empty);
      return;
    }

    allMatches.forEach((item, idx) => {
      const accItem = document.createElement('div');
      accItem.className = 'accordion-item reveal';
      const triggerId = `search-trigger-${idx}`;
      const bodyId = `search-body-${idx}`;

      accItem.innerHTML = `
        <button
          class="accordion-trigger"
          id="${triggerId}"
          aria-expanded="false"
          aria-controls="${bodyId}"
        >
          <span class="accordion-trigger-inner">
            <span class="accordion-title-bs">${item._catIcon} ${item.title}</span>
            <span class="accordion-title-en">${item._cat} · ${item.titleEn}</span>
          </span>
          <span class="accordion-chevron" aria-hidden="true">▾</span>
        </button>
        <div
          class="accordion-body"
          id="${bodyId}"
          role="region"
          aria-labelledby="${triggerId}"
        >
          <div class="accordion-body-inner">
            <p class="accordion-text-bs">${item.content}</p>
            <p class="accordion-text-en">${item.contentEn}</p>
          </div>
        </div>
      `;

      const trigger = accItem.querySelector('.accordion-trigger');
      const body = accItem.querySelector('.accordion-body');

      trigger.addEventListener('click', () => {
        const isOpen = trigger.classList.contains('open');
        container.querySelectorAll('.accordion-trigger.open').forEach(t => {
          if (t !== trigger) {
            t.classList.remove('open');
            t.setAttribute('aria-expanded', false);
            t.nextElementSibling.classList.remove('open');
          }
        });
        trigger.classList.toggle('open', !isOpen);
        trigger.setAttribute('aria-expanded', !isOpen);
        body.classList.toggle('open', !isOpen);
      });

      container.appendChild(accItem);
    });
  }

  // ── 3d. Search input handler ──────────────────────────────
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchQuery = q;
      if (q.length >= 2) {
        // Deactivate tabs visually during search
        document.querySelectorAll('.booklet-tab-btn').forEach(b => b.classList.remove('active'));
        renderSearchResults(q);
      } else {
        document.querySelectorAll('.booklet-tab-btn').forEach((b, i) => {
          b.classList.toggle('active', i === activeCategory);
        });
        renderPanel();
      }
    }, 250);
  });

  // ── 3e. Initial render ────────────────────────────────────
  renderTabs();
  renderPanel();
})();

/* ═══════════════════════════════════════════════════════════
   4. HERO STATS — Animated counter on scroll
═══════════════════════════════════════════════════════════ */
(function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.counter, 10);
      const dur = 1600;
      const step = 16;
      const inc = target / (dur / step);
      let current = 0;

      const tick = () => {
        current = Math.min(current + inc, target);
        el.textContent = Math.floor(current);
        if (current < target) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ═══════════════════════════════════════════════════════════
   5. ACTIVE NAV LINK — Highlight on section in view
═══════════════════════════════════════════════════════════ */
(function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav-links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.removeAttribute('aria-current');
          if (a.getAttribute('href') === `#${entry.target.id}`) {
            a.setAttribute('aria-current', 'section');
          }
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
})();

/* ═══════════════════════════════════════════════════════════
   6. IMAGE LOADING — Handling loading states for room cards
   ═══════════════════════════════════════════════════════════ */
(function initImageLoading() {
  const imageContainers = document.querySelectorAll('.room-card-image');

  imageContainers.forEach(container => {
    const img = container.querySelector('img');
    if (!img) return;

    // Set initial loading state
    container.classList.add('loading');

    const onImageLoaded = () => {
      container.classList.remove('loading');
      container.classList.add('loaded');
    };

    if (img.complete) {
      onImageLoaded();
    } else {
      img.addEventListener('load', onImageLoaded);
      img.addEventListener('error', onImageLoaded); // Also clear loading on error
    }
  });
})();

/* ═══════════════════════════════════════════════════════════
   7. SHARED LIGHTBOX — Reusable full-screen photo viewer
   Used by both the Gallery section and Room Card galleries.
═══════════════════════════════════════════════════════════ */
(function initLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const counter = document.getElementById('lightbox-counter');

  // ── Active image set (swapped in when lightbox opens) ─────
  let activeSources = [];
  let currentIndex = 0;

  function showPhoto(index) {
    if (!activeSources.length) return;
    currentIndex = ((index % activeSources.length) + activeSources.length) % activeSources.length;
    lightboxImg.src = activeSources[currentIndex];
    lightboxImg.alt = `Photo ${currentIndex + 1} of ${activeSources.length}`;
    counter.textContent = `${currentIndex + 1} / ${activeSources.length}`;

    // Re-trigger entrance animation
    lightboxImg.style.animation = 'none';
    lightboxImg.offsetHeight; // Force reflow
    lightboxImg.style.animation = '';
  }

  function openLightbox(sources, startIndex) {
    activeSources = sources;
    showPhoto(startIndex || 0);
    lightbox.hidden = false;
    requestAnimationFrame(() => {
      lightbox.style.opacity = '1';
      lightbox.style.visibility = 'visible';
    });
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.style.opacity = '0';
    lightbox.style.visibility = 'hidden';
    setTimeout(() => {
      lightbox.hidden = true;
    }, 300);
    document.body.style.overflow = '';
  }

  // ── Controls ──────────────────────────────────────────────
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPhoto(currentIndex - 1);
  });
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPhoto(currentIndex + 1);
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
  });

  // Touch swipe for mobile
  let touchStartX = 0;
  const SWIPE_THRESHOLD = 50;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      diff > 0 ? showPhoto(currentIndex + 1) : showPhoto(currentIndex - 1);
    }
  }, { passive: true });

  // ── Expose globally so other modules can call it ──────────
  window.__lightbox = { open: openLightbox, close: closeLightbox };

  // ─────────────────────────────────────────────────────────
  // 7a. LOBBY GALLERY — wire the existing gallery grid
  // ─────────────────────────────────────────────────────────
  const grid = document.getElementById('gallery-grid');
  if (grid) {
    const gallerySources = [];
    const items = grid.querySelectorAll('.gallery-item');
    items.forEach(item => {
      const img = item.querySelector('img');
      if (img) gallerySources.push(img.src);
    });
    items.forEach((item, idx) => {
      item.addEventListener('click', () => openLightbox(gallerySources, idx));
    });
  }
})();

/* ═══════════════════════════════════════════════════════════
   8. ROOM CARD GALLERY — Click room image → lightbox
═══════════════════════════════════════════════════════════ */
(function initRoomGallery() {
  if (!window.__lightbox) return;

  // Map each room type to its image paths (already compressed)
  const roomImages = {
    double: [
      'media/Soba_2/SOBA 2 01.jpg',
      'media/Soba_2/SOBA 2 02.jpg',
      'media/Soba_2/SOBA 2 03.jpg',
      'media/Soba_2/SOBA 2 04.jpg',
      'media/Soba_2/SOBA 2 05.jpg',
      'media/Soba_2/SOBA 2 06.jpg',
      'media/Soba_2/SOBA 2 07.jpg',
      'media/Soba_2/SOBA 2 09.jpg',
      'media/Soba_3/SOBA 3 01.jpg',
      'media/Soba_3/SOBA 3 02.jpg',
      'media/Soba_3/SOBA 3 03.jpg',
      'media/Soba_3/SOBA 3 04.jpg',
      'media/Soba_3/SOBA 3 06.jpg',
      'media/Soba_3/SOBA 3 07.jpg',
      'media/Soba_3/SOBA 3 08.jpg',
      'media/Soba_3/SOBA 3 13.jpg',
      'media/Soba_4/SOBA 4 01.jpg',
      'media/Soba_4/SOBA 4 02.jpg',
      'media/Soba_4/SOBA 4 03.jpg',
      'media/Soba_4/SOBA 4 04.jpg',
      'media/Soba_4/SOBA 4 05.jpg',
      'media/Soba_4/SOBA 4 06.jpg',
      'media/Soba_4/SOBA 4 07.jpg',
    ],
    triple: [
      'media/Soba_5/SOBA 5 01.jpg',
      'media/Soba_5/SOBA 5 02.jpg',
      'media/Soba_5/SOBA 5 03.jpg',
      'media/Soba_5/SOBA 5 04.jpg',
      'media/Soba_5/SOBA 5 05.jpg',
      'media/Soba_5/SOBA 5 06.jpg',
      'media/Soba_5/SOBA 5 07.jpg',
      'media/Soba_5/1781692405799515.jpg',
    ],
    deluxe: [
      'media/Soba_1/SOBA 1 01.jpg',
      'media/Soba_1/SOBA 1 02.jpg',
      'media/Soba_1/SOBA 1 05.jpg',
      'media/Soba_1/SOBA 1 06.jpg',
      'media/Soba_1/SOBA 1 08.jpg',
      'media/Soba_1/SOBA 1 10.jpg',
      'media/Soba_1/SOBA 1 12.jpg',
      'media/Soba_1/SOBA 1 13.jpg',
      'media/Soba_1/SOBA 1 14.jpg',
    ],
    'triple-single': [
      'media/Soba_6/SOBA 6 01.jpg',
      'media/Soba_6/SOBA 6 02.jpg',
      'media/Soba_6/SOBA 6 03.jpg',
      'media/Soba_6/SOBA 6 06.jpg',
      'media/Soba_6/SOBA 6 08.jpg',
    ],
  };

  // Attach click listeners to room card images with data-room-gallery
  document.querySelectorAll('[data-room-gallery]').forEach(cardImage => {
    const roomKey = cardImage.getAttribute('data-room-gallery');
    const images = roomImages[roomKey];
    if (!images || !images.length) return;

    cardImage.style.cursor = 'pointer';
    cardImage.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.__lightbox.open(images, 0);
    });
  });
})();

/* ═══════════════════════════════════════════════════════════
   9. PANNELLUM 360 VIEWER — Lazy-loaded on scroll
═══════════════════════════════════════════════════════════ */
(function initPanorama() {
  const viewerContainer = document.getElementById('panorama-viewer');
  if (!viewerContainer || typeof pannellum === 'undefined') return;

  let viewerInitialized = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !viewerInitialized) {
        viewerInitialized = true;

        pannellum.viewer('panorama-viewer', {
          type: 'equirectangular',
          panorama: 'media/360/MoStay 360.jpg',
          autoLoad: true,
          autoRotate: -2,
          compass: false,
          showZoomCtrl: true,
          showFullscreenCtrl: true,
          mouseZoom: true,
          hfov: 110,
          minHfov: 50,
          maxHfov: 120,
          pitch: 0,
          yaw: 0
        });

        observer.unobserve(viewerContainer);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(viewerContainer);
})();

