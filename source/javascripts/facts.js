/**
 * Animates fact numbers from zero to their server-rendered value once they
 * enter the viewport. Values remain unchanged when JavaScript or motion is
 * unavailable.
 */
const factsCounter = () => {
  const counters = document.querySelectorAll("[data-fact-counter]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!counters.length || reducedMotion || !("IntersectionObserver" in window)) {
    return;
  }

  const animate = (counter) => {
    const target = parseInt(counter.dataset.factValue, 10);
    const duration = 1000;
    let startTime = null;

    if (!Number.isFinite(target)) {
      return;
    }

    const step = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 2);
      counter.textContent = Math.floor(target * easedProgress).toString();

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        counter.textContent = target.toString();
      }
    };

    window.requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        animate(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", factsCounter);
} else {
  factsCounter();
}
