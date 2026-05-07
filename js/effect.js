      AOS.init({
        duration: 1000, // سرعة الحركة العامة
        once: true, // تتحرك مرة واحدة فقط عند التنزيل
        offset: 100, // تبدأ الحركة قبل وصول المستخدم للعنصر بـ 100 بكسل
      });

window.addEventListener('load', () => {
    const preloader = document.getElementById("preloader");
    const heroH1 = document.querySelector(".hero-content h1");
    const heroH2 = document.querySelector(".hero-content h2");

    // 1. إخفاء شاشة التحميل (فقط إذا كانت موجودة)
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("loaded");
        }, 1000);
    }

    // 2. تشغيل حركات الـ Hero بالترتيب (فقط إذا كانت موجودة)
    if (heroH1) {
        setTimeout(() => {
            heroH1.classList.add("appear");
        }, 1200);
    }

    if (heroH2) {
        setTimeout(() => {
            heroH2.classList.add("appear");
        }, 1400);
    }
});