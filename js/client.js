// Clients Swiper
document.addEventListener("DOMContentLoaded", function () {
  const clientsSlider = document.querySelector(".clients-slider0");
  if (!clientsSlider) return;

  new Swiper(".clients-slider0", {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerView: 2,
    spaceBetween: 16,
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
  });
});
