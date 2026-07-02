// Hero slideshow & Swiper initialization
window.addEventListener("load", function () {
  // Hero slideshow
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

  // Clients Swiper
  const swiper = new Swiper(".clients-slider0", {
    loop: true,
    speed: 50,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
  });
});