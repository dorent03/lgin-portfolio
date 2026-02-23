const yearElement = document.getElementById("current-year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const staggerRevealElements = document.querySelectorAll(
  ".project-card.reveal, .stack-card.reveal"
);

if (!reduceMotion) {
  staggerRevealElements.forEach((element, index) => {
    const staggerDelayMs = 80;
    element.style.transitionDelay = `${index * staggerDelayMs}ms`;
  });
}

if (reduceMotion) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
    element.style.transitionDelay = "0ms";
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}
