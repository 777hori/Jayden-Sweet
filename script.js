/* ================================================================
   MONTHSARY WEBSITE — script.js
   ================================================================ */

// ---- PAGE NAVIGATION ----
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  document.getElementById('page-' + pageId).classList.add('active');

  const btnMap = { home: 0, months: 1, thankyou: 2 };
  const btns = document.querySelectorAll('.nav-btn');
  if (btns[btnMap[pageId]]) btns[btnMap[pageId]].classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- HOME SLIDESHOW ----
(function initHomeSlideshow() {
  const slides = document.querySelectorAll('.slideshow-bg .slide');
  if (!slides.length) return;
  let current = 0;

  function nextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  // Change every 5 seconds
  setInterval(nextSlide, 5000);
})();

// ---- THANK YOU SLIDESHOW ----
(function initTySlideshow() {
  const slides = document.querySelectorAll('.ty-slide');
  if (!slides.length) return;
  let current = 0;

  function nextSlide() {
    slides[current].classList.remove('ty-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('ty-active');
  }

  setInterval(nextSlide, 6000);
})();

// ---- ECG ANIMATION (heartbeat draw effect) ----
(function initEcg() {
  const polyline = document.querySelector('.ecg-strip polyline');
  if (!polyline) return;

  // Animate the stroke-dashoffset for a drawing effect
  const length = 320;
  polyline.style.strokeDasharray = length;
  polyline.style.strokeDashoffset = length;

  let start = null;
  function animate(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;
    const progress = Math.min(elapsed / 2000, 1);
    polyline.style.strokeDashoffset = length * (1 - progress);
    if (progress < 1) requestAnimationFrame(animate);
    else {
      // Loop with a delay
      setTimeout(() => {
        start = null;
        polyline.style.strokeDashoffset = length;
        requestAnimationFrame(animate);
      }, 1500);
    }
  }
  requestAnimationFrame(animate);
})();

// ---- PHOTO FRAME: tap to expand ----
(function initPhotoTap() {
  const frames = document.querySelectorAll('.photo-frame');

  frames.forEach(frame => {
    frame.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (!img) return;

      // Create lightbox
      const lb = document.createElement('div');
      lb.style.cssText = `
        position: fixed; inset: 0; z-index: 99999;
        background: rgba(10,4,5,0.95);
        display: flex; align-items: center; justify-content: center;
        animation: fade-lb 0.3s ease;
      `;

      const style = document.createElement('style');
      style.textContent = `@keyframes fade-lb { from { opacity: 0; } to { opacity: 1; } }`;
      document.head.appendChild(style);

      const pic = document.createElement('img');
      pic.src = img.src;
      pic.style.cssText = `
        max-width: 92%; max-height: 80dvh;
        object-fit: contain; border-radius: 12px;
        border: 1px solid rgba(200,150,150,0.25);
        box-shadow: 0 0 40px rgba(184,50,50,0.2);
      `;

      lb.appendChild(pic);
      lb.addEventListener('click', () => lb.remove());
      document.body.appendChild(lb);
    });
  });
})();

// ---- SCROLL REVEAL for months page ----
(function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  // We'll apply reveal to record blocks
  const targets = document.querySelectorAll('.record-block, .section-header, .chart-divider');
  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
    observer.observe(el);
  });
})();
