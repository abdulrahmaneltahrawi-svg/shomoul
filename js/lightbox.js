// ===== Lightbox =====

document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDescription = document.getElementById("lightbox-description");
  const closeBtn = document.querySelector(".close-btn");
  const cards = document.querySelectorAll(".card");
  if (!lightbox || !lightboxImg) return;

  cards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
      const img = card.querySelector("img");
      if (img) {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        if (lightboxTitle) lightboxTitle.textContent = img.getAttribute("data-title") || img.alt || "";
        if (lightboxDescription) lightboxDescription.textContent = img.getAttribute("data-description") || "لا يوجد وصف متاح لهذا المشروع.";
        document.body.style.overflow = "hidden";
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", () => { lightbox.style.display = "none"; document.body.style.overflow = "auto"; });
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) { lightbox.style.display = "none"; document.body.style.overflow = "auto"; } });
});