(() => {
  const data = window.siteData;
  const $ = (selector, scope = document) => scope.querySelector(selector);

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderNav() {
    const nav = $(".site-nav");
    nav.innerHTML = `
      ${data.navigation
        .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
        .join("")}
      <a class="nav-button" href="#contact">Inquiry</a>
    `;
  }

  function renderHero() {
    $("#hero").innerHTML = `
      <div class="hero-orbit" aria-hidden="true"></div>
      <div class="hero-grid container">
        <div class="hero-copy reveal">
          <p class="section-kicker">${escapeHtml(data.hero.eyebrow)}</p>
          <h1>${escapeHtml(data.hero.title)}</h1>
          <p class="hero-intro">${escapeHtml(data.hero.intro)}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#contact">${escapeHtml(data.hero.primaryCta)}</a>
            <a class="button button-ghost" href="#focus">${escapeHtml(data.hero.secondaryCta)}</a>
          </div>
          <div class="hero-highlights" aria-label="Selected highlights">
            ${data.hero.highlights
              .map(
                (item) => `
                  <div>
                    <strong>${escapeHtml(item.value)}</strong>
                    <span>${escapeHtml(item.label)}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>

        <div class="portrait-panel reveal" data-delay="2">
          <div class="portrait-frame">
            <img src="${escapeHtml(data.images.portrait.src)}" alt="${escapeHtml(data.images.portrait.alt)}" />
          </div>
          <div class="portrait-caption">
            <span>${escapeHtml(data.meta.discipline)}</span>
            <strong>${escapeHtml(data.meta.shortName)}</strong>
          </div>
        </div>
      </div>
    `;
  }

  function renderFocus() {
    $("#focus").innerHTML = `
      <div class="container">
        <div class="section-header reveal">
          <p class="section-kicker">${escapeHtml(data.positioning.kicker)}</p>
          <h2>${escapeHtml(data.positioning.title)}</h2>
          <p>${escapeHtml(data.positioning.intro)}</p>
        </div>
        <div class="focus-grid">
          ${data.positioning.items
            .map(
              (item, index) => `
                <article class="focus-card reveal" data-delay="${index % 3}">
                  <span class="card-number">0${index + 1}</span>
                  <h3>${escapeHtml(item.title)}</h3>
                  <p>${escapeHtml(item.copy)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function renderProfile() {
    $("#profile").innerHTML = `
      <div class="container profile-grid">
        <div class="profile-copy reveal">
          <p class="section-kicker">${escapeHtml(data.profile.kicker)}</p>
          <h2>${escapeHtml(data.profile.title)}</h2>
          <p>${escapeHtml(data.profile.body)}</p>
          <div class="credential-list">
            ${data.profile.credentials.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
        <div class="timeline-card reveal" data-delay="2">
          ${data.profile.timeline
            .map(
              (item) => `
                <article class="timeline-item">
                  <span>${escapeHtml(item.year)}</span>
                  <div>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.copy)}</p>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function renderRecognition() {
    $("#recognition").innerHTML = `
      <div class="recognition-bg" aria-hidden="true"></div>
      <div class="container recognition-grid">
        <div class="recognition-copy reveal">
          <p class="section-kicker">${escapeHtml(data.recognition.kicker)}</p>
          <h2>${escapeHtml(data.recognition.title)}</h2>
          <p>${escapeHtml(data.recognition.intro)}</p>
        </div>
        <div class="award-stack reveal" data-delay="2">
          ${data.recognition.awards.map((item) => `<div class="award-line">${escapeHtml(item)}</div>`).join("")}
          <p class="site-disclaimer">${escapeHtml(data.recognition.disclaimer)}</p>
        </div>
      </div>
    `;
  }

  function renderContact() {
    $("#contact").innerHTML = `
      <div class="container contact-grid">
        <div class="contact-copy reveal">
          <p class="section-kicker">${escapeHtml(data.contact.kicker)}</p>
          <h2>${escapeHtml(data.contact.title)}</h2>
          <p>${escapeHtml(data.contact.intro)}</p>
          <div class="contact-details">
            <strong>${escapeHtml(data.contact.locationLabel)}</strong>
            <span>${escapeHtml(data.meta.address)}</span>
            ${data.contact.attorneys.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
        <form class="contact-form reveal" data-delay="2">
          ${data.contact.fields
            .map((field) => {
              const isMessage = field.toLowerCase().includes("message");
              const name = field.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return `
                <label>
                  <span>${escapeHtml(field)}</span>
                  ${
                    isMessage
                      ? `<textarea name="${escapeHtml(name)}" rows="5"></textarea>`
                      : `<input name="${escapeHtml(name)}" type="${field === "Email" ? "email" : "text"}" />`
                  }
                </label>
              `;
            })
            .join("")}
          <button class="button button-primary" type="submit">${escapeHtml(data.contact.button)}</button>
          <p class="form-note">Demo form only. Connect to Sandra’s preferred secure intake or email workflow before launch.</p>
        </form>
      </div>
    `;
  }

  function renderFooter() {
    $("#footer").innerHTML = `
      <div class="container footer-grid">
        <div>
          <strong>${escapeHtml(data.meta.name)}</strong>
          <span>${escapeHtml(data.meta.tagline)}</span>
        </div>
        <p>${escapeHtml(data.meta.note)}</p>
      </div>
    `;
  }

  function initMenu() {
    const toggle = $(".nav-toggle");
    const nav = $(".site-nav");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("nav-open", !open);
    });
    nav.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("nav-open");
      }
    });
  }

  function initHeaderState() {
    const header = $("#siteHeader");
    const update = () => header.classList.toggle("header-scrolled", window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initReveals() {
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  function initFormDemo() {
    const form = $(".contact-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = form.querySelector("button");
      const original = button.textContent;
      button.textContent = "Inquiry Prepared";
      form.classList.add("form-sent");
      setTimeout(() => {
        button.textContent = original;
        form.classList.remove("form-sent");
      }, 2200);
    });
  }

  function init() {
    renderNav();
    renderHero();
    renderFocus();
    renderProfile();
    renderRecognition();
    renderContact();
    renderFooter();
    initMenu();
    initHeaderState();
    initReveals();
    initFormDemo();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
