// ===== المنسق الرئيسي للموقع =====

document.addEventListener("DOMContentLoaded", function () {
  loadHeader().then(() => {
    setupMobileMenu();
    setActiveNav();
  });
  loadFooter();
  if (typeof initalhayat === "function") initalhayat();
  if (typeof initProjectFilter === "function") initProjectFilter();
  window.addEventListener("scroll", handleScroll);
  setupSmoothScroll();
});
