document.addEventListener("DOMContentLoaded", function () {
  // Counter animation
  const counters = document.querySelectorAll(".counter");
  if (counters.length > 0) {
    const startCounters = () => {
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const step = Math.ceil(target / 60);
        const interval = setInterval(() => {
          count += step;
          if (count >= target) {
            counter.innerText = target.toLocaleString();
            clearInterval(interval);
          } else {
            counter.innerText = count.toLocaleString();
          }
        }, 20);
      });
    };
    const statsSection = document.querySelector(".stats-section");
    if (statsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startCounters();
            observer.unobserve(statsSection);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(statsSection);
    }
  }
});