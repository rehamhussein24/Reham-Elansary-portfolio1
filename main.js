/* ==========================================================================
   THEME (light default, dark mode toggle, persisted)
   ========================================================================== */
(function initTheme() {
  const stored = localStorage.getItem("theme");
  const theme = stored === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
})();

function setupThemeToggle() {
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

/* ==========================================================================
   MOBILE NAV
   ========================================================================== */
function setupMobileNav() {
  const burger = document.querySelector("[data-nav-burger]");
  const links = document.querySelector("[data-nav-links]");
  if (!burger || !links) return;
  burger.addEventListener("click", () => {
    links.classList.toggle("open");
  });
}

/* ==========================================================================
   RENDER PROJECT CARDS
   ========================================================================== */
function projectCardHTML(project) {
  return `
    <a class="project-card" href="${project.url}" target="_blank" rel="noopener">
      <div class="project-thumb">
        <img src="${project.image}" alt="${project.title}" loading="lazy" />
      </div>
      <div class="project-meta">
        <span class="project-name">${project.title}</span>
        <span class="project-tag">${project.tag}</span>
      </div>
    </a>
  `;
}

function renderProjects() {
  const homeGrid = document.querySelector("[data-home-projects]");
  const allGrid = document.querySelector("[data-all-projects]");

  if (homeGrid) {
    const featured = PROJECTS.slice(0, 6);
    homeGrid.innerHTML = featured.map(projectCardHTML).join("");
  }

  if (allGrid) {
    allGrid.innerHTML = PROJECTS.map(projectCardHTML).join("");
  }
}

/* ==========================================================================
   SCROLL REVEAL for project cards
   ========================================================================== */
function setupScrollReveal() {
  const cards = document.querySelectorAll(".project-card");
  if (!cards.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    cards.forEach((c) => c.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("in-view"), i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => observer.observe(card));
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupMobileNav();
  renderProjects();
  setupScrollReveal();

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
