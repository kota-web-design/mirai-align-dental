document.documentElement.classList.add("js-enabled");

// Header navigation
const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.classList.toggle("is-open", !isOpen);
    siteNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("is-menu-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.classList.remove("is-open");
      siteNav.classList.remove("is-open");
      document.body.classList.remove("is-menu-open");
    });
  });
}

// FAQ accordion
document.querySelectorAll(".faq-item").forEach((item) => {
  const button = item.querySelector("button");
  const answer = item.querySelector(".faq-item__answer");

  if (!button || !answer) return;

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
      if (openItem === item) return;
      const openButton = openItem.querySelector("button");
      const openAnswer = openItem.querySelector(".faq-item__answer");
      openItem.classList.remove("is-open");
      openButton?.setAttribute("aria-expanded", "false");
      if (openAnswer) openAnswer.style.maxHeight = "0px";
    });

    item.classList.toggle("is-open", !isOpen);
    button.setAttribute("aria-expanded", String(!isOpen));
    answer.style.maxHeight = isOpen ? "0px" : `${answer.scrollHeight}px`;
  });
});

// Fade-up animation
const fadeElements = document.querySelectorAll(".fade-up");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  fadeElements.forEach((element) => observer.observe(element));

  window.setTimeout(() => {
    fadeElements.forEach((element) => element.classList.add("is-visible"));
  }, 1400);
} else {
  fadeElements.forEach((element) => element.classList.add("is-visible"));
}

// Close menu when clicking outside
document.addEventListener("click", (event) => {
  if (!menuButton || !siteNav) return;
  if (!siteNav.classList.contains("is-open")) return;
  if (siteNav.contains(event.target) || menuButton.contains(event.target)) return;

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.classList.remove("is-open");
  siteNav.classList.remove("is-open");
  document.body.classList.remove("is-menu-open");
});

// Portfolio demo modal
const demoModal = document.querySelector("#demo-modal");
const demoModalTriggers = document.querySelectorAll(".js-demo-modal-trigger");
const demoModalCloseButtons = document.querySelectorAll("[data-demo-modal-close]");
let lastFocusedElement = null;

const openDemoModal = (trigger) => {
  if (!demoModal) return;
  lastFocusedElement = trigger;
  demoModal.classList.add("is-open");
  demoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-demo-modal-open");
  demoModal.querySelector(".demo-modal__close")?.focus();
};

const closeDemoModal = () => {
  if (!demoModal || !demoModal.classList.contains("is-open")) return;
  demoModal.classList.remove("is-open");
  demoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-demo-modal-open");
  lastFocusedElement?.focus();
  lastFocusedElement = null;
};

demoModalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    if (!demoModal) return;
    event.preventDefault();
    openDemoModal(trigger);
  });
});

demoModalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeDemoModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDemoModal();
});

// Mobile fixed CTA appears after the first view
const fixedCta = document.querySelector(".mobile-fixed-cta");
const hero = document.querySelector(".hero");

const updateFixedCta = () => {
  if (!fixedCta || !hero) return;
  const threshold = hero.offsetHeight * 0.7;
  fixedCta.classList.toggle("is-visible", window.scrollY > threshold);
};

window.addEventListener("scroll", updateFixedCta, { passive: true });
window.addEventListener("resize", updateFixedCta);
updateFixedCta();
