document.addEventListener("components:loaded", () => {
  initYear();
  initNavbarScroll();
  initMobileMenu();
  initScrollReveal();
  initActiveNavigation();
  initCursorGlow();
  initProfileTilt();
  initProjectTilt();
  initThemeToggle();
});


/* =========================================================
   YEAR
========================================================= */

function initYear() {
  const yearEl = document.getElementById("year");

  if (!yearEl) return;

  yearEl.textContent = new Date().getFullYear();
}


/* =========================================================
   NAVBAR SCROLL
========================================================= */

function initNavbarScroll() {
  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  const updateNavbar = () => {
    navbar.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );
  };

  updateNavbar();

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );
}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuBtn.textContent = isOpen ? "×" : "☰";

    menuBtn.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );
  });

  navLinks
    .querySelectorAll("a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
          "aria-label",
          "Open navigation menu"
        );
      });
    });
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  targets.forEach((element) => {
    observer.observe(element);
  });
}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {
  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const links = document.querySelectorAll(
    ".nav-links a[href^='#']"
  );

  if (!sections.length || !links.length) return;

  const updateActiveNavigation = () => {
    let current = "";

    sections.forEach((section) => {
      const top =
        section.offsetTop - 180;

      if (window.scrollY >= top) {
        current = section.id;
      }
    });

    links.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  };

  updateActiveNavigation();

  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );
}


/* =========================================================
   CURSOR GLOW
========================================================= */

function initCursorGlow() {
  const glow =
    document.querySelector(".cursor-glow");

  if (!glow) return;

  if (
    !window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {
    return;
  }

  window.addEventListener(
    "mousemove",
    (event) => {
      glow.style.left =
        `${event.clientX}px`;

      glow.style.top =
        `${event.clientY}px`;
    },
    { passive: true }
  );
}


/* =========================================================
   3D PROFILE CARD
========================================================= */

function initProfileTilt() {
  const card =
    document.getElementById("profileCard");

  if (!card) return;

  if (window.matchMedia(
    "(pointer: coarse)"
  ).matches) {
    return;
  }

  card.addEventListener(
    "mousemove",
    (event) => {
      const rect =
        card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const rotateY =
        (x / rect.width - 0.5) * 12;

      const rotateX =
        (y / rect.height - 0.5) * -12;

      card.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
    }
  );

  card.addEventListener(
    "mouseleave",
    () => {
      card.style.transform = "";
    }
  );
}


/* =========================================================
   PROJECT TILT
========================================================= */

function initProjectTilt() {
  const projects =
    document.querySelectorAll(".project");

  if (!projects.length) return;

  if (
    !window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {
    return;
  }

  projects.forEach((project) => {
    project.addEventListener(
      "mousemove",
      (event) => {
        const rect =
          project.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateY =
          (x / rect.width - 0.5) * 3;

        const rotateX =
          (y / rect.height - 0.5) * -3;

        project.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-7px)
        `;
      }
    );

    project.addEventListener(
      "mouseleave",
      () => {
        project.style.transform = "";
      }
    );
  });
}


/* =========================================================
   THEME
========================================================= */

function initThemeToggle() {
  const themeToggle =
    document.getElementById("themeToggle");

  if (!themeToggle) return;

  const themeIcon =
    themeToggle.querySelector(".theme-icon");

  const root =
    document.documentElement;

  const savedTheme =
    localStorage.getItem("theme");

  const systemDark =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

  const initialTheme =
    savedTheme ||
    (systemDark ? "dark" : "light");

  root.dataset.theme = initialTheme;

  updateThemeButton(initialTheme);

  themeToggle.addEventListener(
    "click",
    () => {
      const currentTheme =
        root.dataset.theme;

      const newTheme =
        currentTheme === "dark"
          ? "light"
          : "dark";

      root.dataset.theme =
        newTheme;

      localStorage.setItem(
        "theme",
        newTheme
      );

      updateThemeButton(newTheme);
    }
  );

  function updateThemeButton(theme) {
    if (!themeIcon) return;

    const isDark =
      theme === "dark";

    themeIcon.textContent =
      isDark ? "☼" : "☾";

    themeToggle.setAttribute(
      "aria-label",
      isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );

    themeToggle.setAttribute(
      "title",
      isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );
  }
}