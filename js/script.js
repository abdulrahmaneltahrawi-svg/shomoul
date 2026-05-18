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
      const currentLocation = window.location.pathname.split("/").pop() || "index.html";
      const navLinks = document.querySelectorAll(".nav-menu ul li a");
      
      navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentLocation) {
          link.classList.add("active");
          
          // إذا كان الرابط داخل قائمة منسدلة (مشاريع فرعية)، نجعل كلمة "المشاريع" نشطة أيضاً
          const parentDropdown = link.closest('.has-dropdown');
          if (parentDropdown) {
            parentDropdown.querySelector('.menu-item-link a').classList.add('active');
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

  // إنشاء overlay للقائمة الجانبية
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(overlay);

  if (menuToggle && headerNav) {
    menuToggle.addEventListener("click", function () {
      headerNav.classList.toggle("active");
      menuToggle.classList.toggle("active");
      
      // إظهار/إخفاء الـ overlay
      if (headerNav.classList.contains("active")) {
        overlay.style.display = "block";
        setTimeout(() => {
          overlay.style.opacity = "1";
        }, 10);
        document.body.style.overflow = "hidden"; // منع التمرير في الخلفية
      } else {
        overlay.style.opacity = "0";
        setTimeout(() => {
          overlay.style.display = "none";
        }, 300);
        document.body.style.overflow = ""; // إعادة التمرير
      }
    });

    // تفعيل فتح وإغلاق القوائم المنسدلة (الأفرع) عند الضغط
    const dropdownToggles = headerNav.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const parentLi = this.closest('.has-dropdown');
        parentLi.classList.toggle('open');
      });
    });

    // إغلاق القائمة عند النقر على الـ overlay
    overlay.addEventListener("click", function () {
      headerNav.classList.remove("active");
      menuToggle.classList.remove("active");
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
      }, 300);
      document.body.style.overflow = "";
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener("click", function (event) {
      if (
        !headerNav.contains(event.target) &&
        !menuToggle.contains(event.target) &&
        !overlay.contains(event.target)
      ) {
        headerNav.classList.remove("active");
        menuToggle.classList.remove("active");
        overlay.style.opacity = "0";
        setTimeout(() => {
          overlay.style.display = "none";
        }, 300);
        document.body.style.overflow = "";
      }
    });
  }
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

  // لكي يتم التركيز على الحقل فور ظهوره
  if (input.classList.contains("active")) {
    input.focus();
  }
}



// وظيفة تحريك شريط العملاء بشكل لانهائي وسلس
function initClientSlider() {
  const track = document.querySelector(".slider-track");
  if (!track) return;

  // مضاعفة العناصر مرتين لضمان عدم وجود فراغ
  const items = Array.from(track.children);
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
  
  // مضاعفة إضافية لضمان ملء الشاشات العريضة جداً
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let speed = 1; // سرعة الحركة (بكسل في كل إطار)
  let position = 0;
  let isPaused = false;

  track.addEventListener("mouseenter", () => isPaused = true);
  track.addEventListener("mouseleave", () => isPaused = false);

  function step() {
    if (!isPaused) {
      position += speed;
      // إذا تحرك الشريط بمقدار ثلث طوله الكلي (لأننا ضاعفنا العناصر 3 مرات)
      // نقوم بإعادة الصفر لضمان الاستمرارية
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
      // تحديث الكلاس النشط (Active)
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
