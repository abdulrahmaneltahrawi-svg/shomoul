// ===== وظائف الموقع الأساسية =====

document.addEventListener("DOMContentLoaded", function () {
  // تحميل الهيدر والفوتر
  loadHeader().then(() => {
    setupMobileMenu();
  });
  loadFooter();

  initClientSlider();
  initProjectFilter();
  window.addEventListener("scroll", handleScroll);
  setupSmoothScroll();
  setupScrollAnimations();
});

// تحميل الهيدر
function loadHeader() {
  return fetch("components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // منطق تحديد الرابط النشط بناءً على اسم الملف في الرابط
      const currentLocation =
        window.location.pathname.split("/").pop() || "index.html";
      const navLinks = document.querySelectorAll(".nav-menu ul li a");

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === currentLocation) {
          link.classList.add("active");

          const parentDropdown = link.closest(".has-dropdown");
          if (parentDropdown) {
            parentDropdown
              .querySelector(".menu-item-link a")
              .classList.add("active");
          }
        }
      });
    })
    .catch((error) => console.error("Error loading header:", error));
}

// تحميل الفوتر
function loadFooter() {
  fetch("components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer:", error));
}

// تأثير التمرير على الهيدر
function handleScroll() {
  const header = document.querySelector(".main-header");
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
}

// إعداد القائمة المتنقلة
function setupMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const headerNav = document.getElementById("header-nav");

  if (!menuToggle || !headerNav) return;

  // تجنب تكرار الـ overlay عند إعادة التحميل
  let overlay = document.querySelector(".menu-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "menu-overlay";
    document.body.appendChild(overlay);
  }

  function openMenu() {
    headerNav.classList.add("active");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "إغلاق القائمة");
    document.body.classList.add("menu-open");
    overlay.style.display = "block";
    overlay.classList.add("is-visible");
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
    });
  }

  function closeMenu() {
    headerNav.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "فتح القائمة");
    document.body.classList.remove("menu-open");
    overlay.classList.remove("is-visible");
    overlay.style.opacity = "0";
    setTimeout(() => {
      if (!headerNav.classList.contains("active")) {
        overlay.style.display = "none";
      }
    }, 300);
  }

  function toggleMenu() {
    if (headerNav.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuToggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });

  overlay.addEventListener("click", closeMenu);

  // القوائم المنسدلة
  headerNav.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.closest(".has-dropdown").classList.toggle("open");
    });
  });

  // إغلاق القائمة عند اختيار رابط
  headerNav.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // إغلاق بمفتاح Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && headerNav.classList.contains("active")) {
      closeMenu();
    }
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".feature-card, .service-card").forEach((el) => {
    observer.observe(el);
  });
}

function toggleSearch() {
  const input = document.getElementById("searchInput");
  input.classList.toggle("active");

  if (input.classList.contains("active")) {
    input.focus();
  }
}

// وظيفة تحريك شريط العملاء بشكل لانهائي وسلس
function initClientSlider() {
  const track = document.querySelector(".slider-track");
  if (!track) return;

  const items = Array.from(track.children);
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let speed = 2;
  let position = 0;
  let isPaused = false;

  track.addEventListener("mouseenter", () => (isPaused = true));
  track.addEventListener("mouseleave", () => (isPaused = false));

  function step() {
    if (!isPaused) {
      position += speed;
      if (position >= track.scrollWidth / 3) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
    }
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// وظيفة فلترة المشاريع
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

        if (category === "all" || category === cardCategory) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.5s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// وظيفة تكبير الصور (Lightbox)
document.addEventListener("DOMContentLoaded", function () {

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close-btn");
  const cards = document.querySelectorAll(".card");

  // إذا عناصر اللايت بوكس غير موجودة لا تشغل الكود
  if (!lightbox || !lightboxImg || !closeBtn) return;

  cards.forEach((card) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", function () {
      const img = card.querySelector("img");

      if (img) {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        document.body.style.overflow = "hidden";
      }
    });
  });

  closeBtn.addEventListener("click", function () {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

});