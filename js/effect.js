AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

window.addEventListener("load", function () {
  // Preloader: wait until fully loaded then hide
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // Wait at least 1.5s to show the logo animation nicely
    setTimeout(function () {
      preloader.classList.add("loaded");
    }, 1500);
  }
});