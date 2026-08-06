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
      <div class="timeline-strip reveal">
        ${data.profile.timeline.map((item) => `
          <article class="timeline-item">
            <span>${escapeHtml(item.period)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.copy)}</p>
          </article>
        `).join('')}
      </div>
    `;
  }

  function renderPractice() {
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
        <article class="featured-client">
          <div class="client-photo">${imageMarkup(data.images.lecrae, 'client-img')}</div>
          <div class="client-copy">
            <p class="section-kicker">Featured representative client</p>
            <h3>${escapeHtml(data.practice.featuredClient.name)}</h3>
            <span>${escapeHtml(data.practice.featuredClient.type)}</span>
            <p>${escapeHtml(data.practice.featuredClient.copy)}</p>
          </div>
        </article>
        <div class="client-list" aria-label="Representative clients">
          ${data.practice.clients.map((client) => `
            <article class="client-chip">
              <span>${escapeHtml(client.type)}</span>
              <h3>${escapeHtml(client.name)}</h3>
              <p>${escapeHtml(client.copy)}</p>
            </article>
          `).join('')}
        </div>
        <p class="client-note">${escapeHtml(data.practice.clientsNote)}</p>
      </div>
    `;
  }

  function renderRecognition() {
    $('#recognition').innerHTML = `
      <div class="recognition-layout">
        <div class="recognition-list reveal">
          ${data.recognition.items.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
        </div>
        <div class="publication-card reveal" data-delay="1">
          <p class="section-kicker">Selected writing + service</p>
          ${data.recognition.publications.map((item) => `<p>${escapeHtml(item)}</p>`).join('')}
          <small>${escapeHtml(data.recognition.disclaimer)}</small>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    $('#footer').innerHTML = `
      <div>
        <strong>${escapeHtml(data.meta.name)}</strong>
        <span>${escapeHtml(data.meta.discipline)}</span>
      </div>
      <p>${escapeHtml(data.meta.note)}</p>
    `;
  }

  function initIntro() {
    const body = document.body;
    const firstTitle = $('#home')?.dataset.railTitle || data.railHeaders.home;
    $('#railHeadline').textContent = firstTitle;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      body.classList.remove('intro-start');
      body.classList.add('rail-docked', 'brand-stacked');
      return;
    }

    window.setTimeout(() => body.classList.add('brand-visible'), 220);
    window.setTimeout(() => body.classList.add('rail-transitioning', 'brand-stacked'), 1250);
    window.setTimeout(() => body.classList.add('rail-docked'), 2350);
  }

  function initDynamicRailHeader() {
    const headline = $('#railHeadline');
    const links = $$('#railNav a');
    const sections = $$('.panel');
    if (!headline || !sections.length) return;

    const setActive = (id, title) => {
      headline.classList.remove('headline-in');
      window.setTimeout(() => {
        headline.textContent = title;
        headline.classList.add('headline-in');
      }, 120);
      links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const section = visible.target;
      setActive(section.id, section.dataset.railTitle || '');
    }, { threshold: [0.34, 0.55, 0.72], rootMargin: '-10% 0px -25% 0px' });

    sections.forEach((section) => observer.observe(section));
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
    renderPractice();
    renderRecognition();
    renderFooter();
    initIntro();
    initDynamicRailHeader();
    initReveals();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
