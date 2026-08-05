/* ==========================================
   LESSON PAGE INTERACTIONS
========================================== */

/* ==========================================
   DISCOVERY REVEAL
========================================== */

const revealButton = document.querySelector(".reveal-btn");

const revealContent = document.querySelector(".reveal-content");

if (revealButton && revealContent) {
  revealButton.addEventListener("click", () => {
    revealContent.classList.toggle("show");

    if (revealContent.classList.contains("show")) {
      revealButton.textContent = "Hide Thinking";
    } else {
      revealButton.textContent = "Show Answer";
    }
  });
}

/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const lessonSections = document.querySelectorAll(
  ".measure-section, .concept-intro, .discovery, .objectives",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.15,
  },
);

lessonSections.forEach((section) => {
  section.classList.add("hidden-section");

  observer.observe(section);
});

/* ==========================================
   FORMULA HIGHLIGHT
========================================== */

const formulas = document.querySelectorAll(".formula");

const formulaObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("formula-focus");

        setTimeout(() => {
          entry.target.classList.remove("formula-focus");
        }, 1200);
      }
    });
  },

  {
    threshold: 0.8,
  },
);

formulas.forEach((formula) => {
  formulaObserver.observe(formula);
});
