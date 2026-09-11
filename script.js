(() => {
  const data = window.siteData;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function imageMarkup(image, className = '') {
    return `<img class="${escapeHtml(className)}" src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy" />`;
  }

  function renderRailNav() {
    $('#railNav').innerHTML = data.navigation
      .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
      .join('');
  }

  function renderHero() {
    $('#home').innerHTML = `
      <div class="hero-photo reveal">
        ${imageMarkup(data.images.hero, 'hero-img')}
        <div class="hero-photo-wash"></div>
      </div>
      <div class="hero-content reveal" data-delay="1">
        <p class="section-kicker">${escapeHtml(data.hero.eyebrow)}</p>
        <p class="hero-intro">${escapeHtml(data.hero.intro)}</p>
        <div class="hero-highlights">
          ${data.hero.highlights.map((item) => `
            <div class="highlight-card">
              <strong>${escapeHtml(item.value)}</strong>
              <span>${escapeHtml(item.label)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function profileBlock(person, image) {
    return `
      <article class="person-card reveal">
        <div class="person-image-wrap">${imageMarkup(image, 'person-image')}</div>
        <div class="person-copy">
          <p class="person-role">${escapeHtml(person.role)}</p>
          <h3>${escapeHtml(person.name)}</h3>
          ${person.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
          <a class="text-link" href="${escapeHtml(person.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <div class="credential-cloud">
            ${person.credentials.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
          </div>
        </div>
      </article>
    `;
  }

  function renderProfile() {
    $('#profile').innerHTML = `
      <div class="profile-stack">
        ${profileBlock(data.profile.sandra, data.images.studio)}
        ${profileBlock(data.profile.jacquie, data.images.jacquie)}
      </div>
    `;
  }

  function clientLinks(links = []) {
    if (!links.length) return '';
    return `
      <div class="client-links">
        ${links.map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)} ↗</a>`).join('')}
      </div>
    `;
  }

  function featuredClientMarkup(client, image, modifier = '') {
    return `
      <article class="featured-client ${modifier}">
        <div class="client-photo">${imageMarkup(image, 'client-img')}</div>
        <div class="client-copy">
          <p class="section-kicker">Featured representative client</p>
          <h3>${escapeHtml(client.name)}</h3>
          <span>${escapeHtml(client.type)}</span>
          <p>${escapeHtml(client.copy)}</p>
          ${clientLinks(client.links)}
        </div>
      </article>
    `;
  }

  function renderPractice() {
    const secondaryFeatured = data.practice.secondaryFeaturedClient
      ? featuredClientMarkup(data.practice.secondaryFeaturedClient, data.images.heroBand, 'featured-client--secondary')
      : '';

    $('#practice').innerHTML = `
      <div class="practice-intro reveal">
        <p>${escapeHtml(data.practice.intro)}</p>
      </div>
      <div class="practice-areas reveal" data-delay="1">
        ${data.practice.areas.map((item, index) => `
          <article class="practice-area">
            <span>${String(index + 1).padStart(2, '0')}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.copy)}</p>
          </article>
        `).join('')}
      </div>
      <div class="client-showcase reveal" data-delay="1">
        ${featuredClientMarkup(data.practice.featuredClient, data.images.lecrae)}
        <div class="client-list" aria-label="Representative clients">
          ${data.practice.clients.map((client) => `
            <article class="client-chip">
              <span>${escapeHtml(client.type)}</span>
              <h3>${escapeHtml(client.name)}</h3>
              <p>${escapeHtml(client.copy)}</p>
              ${clientLinks(client.links)}
            </article>
          `).join('')}
        </div>
        ${secondaryFeatured}
        <p class="client-note">${escapeHtml(data.practice.clientsNote)}</p>
      </div>
    `;
  }

  function renderRecognition() {
    $('#recognition').innerHTML = `
      <div class="recognition-layout recognition-layout--simple">
        <div class="recognition-list reveal">
          ${data.recognition.items.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
        </div>
      </div>
      <p class="recognition-note reveal" data-delay="1">${escapeHtml(data.recognition.disclaimer)}</p>
    `;
  }

  function renderFooter() {
    $('#footer').innerHTML = `
      <div>
        <strong>${escapeHtml(data.meta.name)}</strong>
        <span>${escapeHtml(data.meta.discipline)}</span>
      </div>
      <address>
        ${escapeHtml(data.meta.address)}<br />
        P: ${escapeHtml(data.meta.phone)}
      </address>
      <p>${escapeHtml(data.meta.note)}</p>
    `;
  }

  function initIntro() {
    const body = document.body;
    const firstTitle = $('#home')?.dataset.railTitle || data.railHeaders.home;
    const headline = $('#railHeadline');
    if (headline) {
      headline.textContent = firstTitle;
      headline.classList.add('headline-in');
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      body.classList.remove('intro-start');
      body.classList.add('rail-docked', 'brand-stacked', 'content-ready', 'headline-ready');
      return;
    }

    window.setTimeout(() => body.classList.add('brand-visible'), 220);
    window.setTimeout(() => body.classList.add('rail-transitioning', 'brand-stacked'), 1250);
    window.setTimeout(() => body.classList.add('rail-docked'), 2350);

    // The sidebar finishes docking at ~2.35s. Main content begins its fade exactly 0.6s later.
    window.setTimeout(() => body.classList.add('content-ready'), 2950);

    // Keep sidebar section headers hidden until the main screen has fully faded in.
    window.setTimeout(() => body.classList.add('headline-ready'), 3700);
  }

  function initDynamicRailHeader() {
    const headline = $('#railHeadline');
    const links = $$('#railNav a');
    const sections = $$('.panel');
    if (!headline || !sections.length) return;

    let activeId = '';
    let headlineTimer = null;

    const setActive = (id, title) => {
      if (!id || id === activeId) return;
      activeId = id;
      window.clearTimeout(headlineTimer);
      headline.classList.remove('headline-in');
      headlineTimer = window.setTimeout(() => {
        headline.textContent = title || data.railHeaders[id] || '';
        headline.classList.add('headline-in');
      }, 120);
      links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    };

    const updateActiveFromScroll = () => {
      const targetY = window.innerHeight * 0.5;
      let best = sections[0];
      let bestDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const containsTarget = rect.top <= targetY && rect.bottom >= targetY;
        const distance = containsTarget ? 0 : Math.abs(sectionCenter - targetY);
        if (distance < bestDistance) {
          best = section;
          bestDistance = distance;
        }
      });

      setActive(best.id, best.dataset.railTitle || data.railHeaders[best.id] || '');
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    window.addEventListener('resize', updateActiveFromScroll);
  }

  function initReveals() {
    const revealEls = $$('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => observer.observe(el));
  }

  function init() {
    renderRailNav();
    renderHero();
    renderProfile();
    //renderPractice();
    renderRecognition();
    renderFooter();
    initIntro();
    initDynamicRailHeader();
    initReveals();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
