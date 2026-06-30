// ===== Certified Bodies Slider (infinite scroll) =====

function initalhayat() {
  const track = document.querySelector(".slider-track");
  if (!track) return;

  const items = Array.from(track.children);
  items.forEach((item) => track.appendChild(item.cloneNode(true)));
  items.forEach((item) => track.appendChild(item.cloneNode(true)));

  let speed = 0.5;
  let position = 0;
  let isPaused = false;

  track.addEventListener("mouseenter", () => (isPaused = true));
  track.addEventListener("mouseleave", () => (isPaused = false));

  function step() {
    if (!isPaused) {
      position += speed;
      if (position >= track.scrollWidth / 3) position = 0;
      track.style.transform = `translateX(${position}px)`;
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}