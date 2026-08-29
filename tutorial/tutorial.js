(() => {
  "use strict";

  const root = document.documentElement;
  const languageButtons = [...document.querySelectorAll("[data-set-lang]")];
  const storageKey = "67ride-tutorial-language";

  function storedLanguage() {
    try {
      return localStorage.getItem(storageKey);
    } catch (_) {
      return null;
    }
  }

  function rememberLanguage(language) {
    try {
      localStorage.setItem(storageKey, language);
    } catch (_) {
      // The guide still works when private browsing blocks storage.
    }
  }

  function setLanguage(language, persist = true) {
    const selected = language === "en" ? "en" : "cs";
    root.lang = selected;
    root.dataset.currentLang = selected;

    languageButtons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        button.dataset.setLang === selected ? "true" : "false",
      );
    });

    document.title = selected === "en"
      ? "Quick start · 67ride"
      : "Rychlý start · 67ride";

    if (persist) rememberLanguage(selected);
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.setLang));
  });

  setLanguage(storedLanguage() === "en" ? "en" : "cs", false);

  const steps = [...document.querySelectorAll("[data-step]")];
  const stepLinks = [...document.querySelectorAll("[data-step-link]")];
  const progressBar = document.querySelector(".step-progress span");

  function activateStep(stepNumber) {
    const activeStep = Math.min(5, Math.max(1, Number(stepNumber) || 1));

    stepLinks.forEach((link) => {
      const isActive = Number(link.dataset.stepLink) === activeStep;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "step");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (progressBar) progressBar.style.width = `${activeStep * 20}%`;
  }

  activateStep(1);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) activateStep(visible.target.dataset.step);
      },
      { rootMargin: "-28% 0px -48%", threshold: [0.1, 0.35, 0.65] },
    );

    steps.forEach((step) => observer.observe(step));
  }

  stepLinks.forEach((link) => {
    link.addEventListener("click", () => activateStep(link.dataset.stepLink));
  });
})();
