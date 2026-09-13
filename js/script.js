// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(22,34,74,0.08)' : 'none';
    });
  }

  // Contact form — AJAX submit to FormSubmit.co so the page never navigates
  // away; the inline success message shows on this same page.
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const success = document.querySelector('.form-success');
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : '';

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }
      if (success) success.classList.remove('show');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form)
        });

        if (response.ok) {
          if (success) success.classList.add('show');
          form.reset();
        } else {
          alert("Sorry, we couldn't send your message right now. Please email us directly at techinfy.ti@gmail.com.");
        }
      } catch (err) {
        alert("Sorry, we couldn't send your message right now. Please email us directly at techinfy.ti@gmail.com.");
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
      }
    });
  }

  // Highlight active nav link based on current page
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // AI capabilities slider
  const slider = document.querySelector('.ai-slider');
  if (slider) {
    const slides = slider.querySelectorAll('.ai-slide');
    const dots = slider.querySelectorAll('.dot');
    const AUTOPLAY_MS = 4500;
    let current = 0;
    let autoplayTimer = null;

    const showSlide = (index) => {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    };

    const startAutoplay = () => {
      stopAutoplay();
      autoplayTimer = setInterval(() => showSlide(current + 1), AUTOPLAY_MS);
    };
    const stopAutoplay = () => { if (autoplayTimer) clearInterval(autoplayTimer); };
    const restartAutoplay = () => startAutoplay();

    slider.querySelector('.next').addEventListener('click', () => { showSlide(current + 1); restartAutoplay(); });
    slider.querySelector('.prev').addEventListener('click', () => { showSlide(current - 1); restartAutoplay(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); restartAutoplay(); }));

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    startAutoplay();
  }
});
