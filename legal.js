(() => {
  const storageKey = "67ride-legal-language";
  const buttons = [...document.querySelectorAll("[data-set-lang]")];
  const blocks = [...document.querySelectorAll("[data-lang]")];

  function setLanguage(lang) {
    const selected = lang === "en" ? "en" : "cs";
    document.documentElement.lang = selected;
    localStorage.setItem(storageKey, selected);

    blocks.forEach((node) => {
      node.classList.toggle("visible", node.dataset.lang === selected);
    });

    buttons.forEach((button) => {
      const active = button.dataset.setLang === selected;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.setLang));
  });

  const storedLanguage = localStorage.getItem(storageKey);
  const browserLanguage = (navigator.language || "").toLowerCase().startsWith("cs")
    ? "cs"
    : "en";

  setLanguage(storedLanguage || browserLanguage);
})();
