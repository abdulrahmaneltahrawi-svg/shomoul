// ===== Project Filter =====

function initProjectFilter() {
  const filterTabs = document.querySelectorAll(".filter-item");
  const projectCards = document.querySelectorAll(".cards .card");
  if (!filterTabs.length || !projectCards.length) return;

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      filterTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      const category = this.getAttribute("data-category");
      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        card.style.display =
          category === "all" || category === cardCategory ? "block" : "none";
      });
    });
  });
}