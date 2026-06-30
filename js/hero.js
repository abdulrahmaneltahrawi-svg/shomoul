// Hero slideshow & Swiper initialization
window.addEventListener("load", function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".hero-slideshow .slide");
  if (slides.length > 0) {
    slides[0].style.opacity = "1";
    setInterval(() => {
      slides.forEach((s) => (s.style.opacity = "0"));
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].style.opacity = "1";
    }, 5000);
  }
});
