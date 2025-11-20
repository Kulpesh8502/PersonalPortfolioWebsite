const doc = document.documentElement;
const nav = document.querySelector(".primary-nav");
const navToggle = document.querySelector(".nav-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const statusEl = document.querySelector(".form-status");
const form = document.querySelector(".contact-form");
const yearEl = document.getElementById("year");

// Smooth scroll and active section highlighting
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const navLink = document.querySelector(`.primary-nav a[href="#${id}"]`);
      if (navLink) {
        if (entry.isIntersecting) {
          document
            .querySelectorAll(".primary-nav a")
            .forEach((link) => link.classList.remove("active"));
          navLink.classList.add("active");
        }
      }
    });
  },
  { threshold: 0.45 }
);

document.querySelectorAll("main section").forEach((section) => observer.observe(section));

nav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const target = document.querySelector(event.target.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      nav.classList.remove("open");
    }
  }
});

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Theme toggle with localStorage persistence
const storedTheme = localStorage.getItem("km-theme");
if (storedTheme) {
  doc.setAttribute("data-theme", storedTheme);
}

themeToggle.addEventListener("click", () => {
  const current = doc.getAttribute("data-theme");
  const newTheme = current === "light" ? "dark" : "light";
  if (newTheme === "dark") {
    doc.removeAttribute("data-theme");
  } else {
    doc.setAttribute("data-theme", newTheme);
  }
  localStorage.setItem("km-theme", doc.getAttribute("data-theme") || "dark");
});

// Contact form mock submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusEl.textContent = "Sending...";

  setTimeout(() => {
    statusEl.textContent = "Message sent! I will reply within 24 hours.";
    form.reset();
    setTimeout(() => (statusEl.textContent = ""), 4000);
  }, 800);
});

// Footer year
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
