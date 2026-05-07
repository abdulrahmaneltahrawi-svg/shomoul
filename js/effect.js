      AOS.init({
        duration: 1000, // سرعة الحركة العامة
        once: true, // تتحرك مرة واحدة فقط عند التنزيل
        offset: 100, // تبدأ الحركة قبل وصول المستخدم للعنصر بـ 100 بكسل
      });

      window.addEventListener("load", () => {
        const preloader = document.getElementById("preloader");
        const heroH1 = document.querySelector(".hero-content h1");
        const heroH2 = document.querySelector(".hero-content h2");
        const heroImg = document.querySelector(".hero-image");

        // 1. إخفاء شاشة التحميل بعد ثانية واحدة
        setTimeout(() => {
          preloader.classList.add("loaded");

          // 2. تشغيل حركات الـ Hero بالترتيب
          setTimeout(() => {
            heroH1.classList.add("appear");
          }, 200);

          setTimeout(() => {
            heroH2.classList.add("appear");
          }, 400);

          setTimeout(() => {
            heroImg.classList.add("reveal-img");
          }, 100);
        }, 1000);
      });