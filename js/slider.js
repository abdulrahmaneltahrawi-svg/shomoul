const slider = document.querySelector('.features-grid');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.style.cursor = 'grabbing'; // تغيير شكل الماوس عند الضغط
  // حساب نقطة البداية
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.style.cursor = 'grab';
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.style.cursor = 'grab';
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return; 
  e.preventDefault();
  
  const x = e.pageX - slider.offsetLeft;
  // في المواقع العربية (RTL)، المتصفحات تتعامل مع scrollLeft بقيم سالبة أحياناً
  // لذا نضرب في 2 لزيادة سرعة الاستجابة
  const walk = (x - startX) * 1; 
  slider.scrollLeft = scrollLeft - walk;
});