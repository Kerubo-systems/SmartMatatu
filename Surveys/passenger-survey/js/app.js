window.SmartMatatu = window.SmartMatatu || {};

window.SmartMatatu.App = (() => {
  const THEME_STORAGE_KEY = "smartmatatu_theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const icon = document.getElementById("theme-toggle-icon");
    const label = document.getElementById("theme-toggle-label");
    if (!icon || !label) return;
    
    if (theme === "dark") {
      icon.textContent = "\u2600";
      label.textContent = "Light mode";
      document.getElementById("theme-toggle-btn")?.setAttribute("aria-label", "Switch to light mode");
    } else {
      icon.textContent = "\u263E";
      label.textContent = "Dark mode";
      document.getElementById("theme-toggle-btn")?.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "light";
    applyTheme(savedTheme);
    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (!toggleBtn) return;
    
    toggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    });
  }

  function detectCurrentPage() {
    if (document.getElementById("begin-survey-btn")) return "homepage";
    if (document.getElementById("question-container")) return "survey";
    if (document.getElementById("response-id-display")) return "thankyou";
    return "unknown";
  }

  function initHomepage() {
    const beginBtn = document.getElementById("begin-survey-btn");
    if (!beginBtn) return;
    beginBtn.addEventListener("click", () => {
      window.SmartMatatu.Storage.getResponseId();
      window.location.href = "survey.html";
    });
  }

  function initSurveyPage() {
    const container = document.getElementById("question-container");
    if (!container) return;
    if (window.SmartMatatu.Storage.hasSubmittedResponse()) {
      window.location.href = "thank-you.html";
      return;
    }
    window.SmartMatatu.Engine.startSurvey(container);
  }

  function initThankYouPage() {
    const responseIdDisplay = document.getElementById("response-id-display");
    if (!responseIdDisplay) return;
    const responseId = window.SmartMatatu.Storage.getResponseId();
    responseIdDisplay.textContent = responseId;
    window.SmartMatatu.Storage.clearResponse();
  }

  function init() {
    initTheme();
    const page = detectCurrentPage();
    switch (page) {
      case "homepage":
        initHomepage();
        break;
      case "survey":
        initSurveyPage();
        break;
      case "thankyou":
        initThankYouPage();
        break;
      default:
        console.warn("app.js: page not recognised.");
        break;
    }
  }

  document.addEventListener("DOMContentLoaded", init);

  return { init };
})();