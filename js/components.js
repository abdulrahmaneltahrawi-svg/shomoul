// ===== Header & Navigation =====

function loadHeader() {
  return fetch("components/header.html")
    .then((r) => r.text())
    .then((data) => {
      const placeholder = document.getElementById("header-placeholder");
      if (placeholder) placeholder.innerHTML = data;
    })
    .catch((e) => console.error("Error loading header:", e));
}

function loadFooter() {
  fetch("components/footer.html")
    .then((r) => r.text())
    .then((data) => {
      const placeholder = document.getElementById("footer-placeholder");
      if (placeholder) placeholder.innerHTML = data;
    })
    .catch((e) => console.error("Error loading footer:", e));
}

function setActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-header nav a").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("!text-[#c5a059]");
    }
  });
}

function handleScroll() {
  const header = document.getElementById("main-header");
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("shadow-lg");
    } else {
      header.classList.remove("shadow-lg");
    }
  }
}

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const bar1 = document.getElementById("bar1");
  const bar2 = document.getElementById("bar2");
  const bar3 = document.getElementById("bar3");

  if (!toggle || !mobileMenu) return;

  toggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    if (isOpen) {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
      bar1 && bar1.classList.remove("rotate-45", "translate-y-2");
      bar2 && bar2.classList.remove("opacity-0");
      bar3 && bar3.classList.remove("-rotate-45", "-translate-y-2");
    } else {
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("flex");
      bar1 && bar1.classList.add("rotate-45", "translate-y-2");
      bar2 && bar2.classList.add("opacity-0");
      bar3 && bar3.classList.add("-rotate-45", "-translate-y-2");
    }
  });

  // Close on link click
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
    });
  });
}