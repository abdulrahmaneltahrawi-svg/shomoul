new Swiper('.clients-slider0', {
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  slidesPerView: 2,        // جوال: عميلين في الشريط
  spaceBetween: 20,
  breakpoints: {
    640: {
      slidesPerView: 3,    // تابلت
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 4,    // كمبيوتر: 4 عملاء
      spaceBetween: 30,
    },
  },
});