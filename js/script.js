/* =========================================================
   SATHVIK — PORTFOLIO — script.js
   Vanilla JS. No build step required.
   ========================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Page loader ---------------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    setTimeout(() => loader && loader.classList.add('hidden'), 350);
  });

  /* ---------------- Year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Theme toggle ---------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    body.setAttribute('data-theme', 'dark');
    themeToggle && themeToggle.setAttribute('aria-pressed', 'true');
  }
  themeToggle && themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.setAttribute('aria-pressed', String(!isDark));
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });

  /* ---------------- Scroll progress + header state ---------------- */
  const progressBar = document.getElementById('scroll-progress');
  const header = document.getElementById('site-header');
  function onScroll() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';
    if (header) header.classList.toggle('scrolled', h.scrollTop > 12);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Active nav link on scroll ---------------- */
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));
  function updateActiveLink() {
    let current = sections[0];
    sections.forEach(sec => {
      if (sec && window.scrollY >= sec.offsetTop - 140) current = sec;
    });
    navLinks.forEach(a => a.classList.toggle('active', current && a.getAttribute('href') === '#' + current.id));
  }
  document.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------------- Mobile menu ---------------- */
  const menuOpenBtn = document.getElementById('menu-open');
  const menuCloseBtn = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  function openMenu() {
    mobileMenu.classList.add('open');
    menuOpenBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    menuCloseBtn.focus();
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuOpenBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuOpenBtn.focus();
  }
  menuOpenBtn && menuOpenBtn.addEventListener('click', openMenu);
  menuCloseBtn && menuCloseBtn.addEventListener('click', closeMenu);
  mobileMenu && mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });

  /* ---------------- Cursor glow (desktop, motion-safe) ---------------- */
  const glow = document.getElementById('cursor-glow');
  if (glow && !reduceMotion && window.matchMedia('(hover:hover)').matches) {
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
  } else if (glow) {
    glow.remove();
  }

  /* ---------------- Typing animation (hero role) ---------------- */
  const typedEl = document.getElementById('typed-role');
  const roles = ['BCA Student', 'Frontend Developer', 'Python Enthusiast', 'Software Developer'];
  if (typedEl && !reduceMotion) {
    const cursor = typedEl.querySelector('.cursor-blink');
    let roleIndex = 0, charIndex = 0, deleting = false;
    function tick() {
      const word = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        if (charIndex > word.length) { deleting = true; setTimeout(tick, 1400); return; }
      } else {
        charIndex--;
        if (charIndex < 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; charIndex = 0; }
      }
      typedEl.childNodes[0].nodeValue = word.slice(0, charIndex);
      if (!typedEl.contains(cursor)) typedEl.appendChild(cursor);
      setTimeout(tick, deleting ? 45 : 85);
    }
    typedEl.textContent = '';
    typedEl.appendChild(document.createTextNode(''));
    typedEl.appendChild(cursor || document.createElement('span'));
    tick();
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------------- Animated counters ---------------- */
  const counters = document.querySelectorAll('.counter');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10) || 0;
      if (reduceMotion) { el.textContent = target; counterIO.unobserve(el); return; }
      let cur = 0;
      const step = Math.max(1, Math.round(target / 40));
      const iv = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(iv); }
        el.textContent = cur;
      }, 30);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterIO.observe(el));

  /* ---------------- Language bars ---------------- */
  const bars = document.querySelectorAll('.bar-fill');
  const barIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.level + '%';
        barIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => barIO.observe(b));

  /* ---------------- Projects data (for modal) ---------------- */
  const projectData = {
    chatbot: {
      title: 'Content Aware Chatbot',
      status: 'In Progress',
      image: 'assets/projects/chatbot.jpg',
      fallback: 'https://placehold.co/760x420/3B5BFF/ffffff?text=Content+Aware+Chatbot',
      description: 'A chatbot that reads context from supplied content — documents or notes — and answers questions grounded in that material instead of generic responses.',
      stack: ['Python', 'API integration', 'JavaScript', 'HTML/CSS'],
      architecture: ['Frontend chat interface for sending questions', 'Backend service that retrieves relevant context', 'API layer connecting the model to the content source'],
      challenges: ['Keeping answers grounded in the provided content rather than drifting off-topic', 'Handling longer documents within context limits'],
      improvements: ['Add conversation memory across sessions', 'Support multiple document formats', 'Improve response speed'],
      github: 'https://github.com/',
      demo: '#'
    },
    mentor: {
      title: 'Mentor Connect',
      status: 'In Progress',
      image: 'assets/projects/mentor-connect.jpg',
      fallback: 'https://placehold.co/760x420/8B5CF6/ffffff?text=Mentor+Connect',
      description: 'A concept platform that connects students with mentors through simple profile browsing and a guided matching flow, built to practice full front-to-back thinking.',
      stack: ['HTML', 'CSS', 'JavaScript', 'SQL'],
      architecture: ['Profile browsing interface with filters', 'A basic matching flow between student and mentor profiles', 'SQL-backed data model for users and sessions'],
      challenges: ['Designing a data model flexible enough for different mentor specialties', 'Keeping the matching flow simple without oversimplifying it'],
      improvements: ['Add scheduling and calendar sync', 'Introduce ratings and feedback after sessions', 'Build a proper authentication flow'],
      github: 'https://github.com/',
      demo: '#'
    },
    portfolio: {
      title: 'Portfolio Website',
      status: 'Live',
      image: 'assets/projects/portfolio.jpg',
      fallback: 'https://placehold.co/760x420/FF6B35/ffffff?text=Portfolio+Website',
      description: 'This site. A hand-built, responsive portfolio with dark mode, scroll-triggered animation, an accessible keyboard-navigable project carousel, and a validated contact form.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      architecture: ['Semantic, accessible section-based layout', 'CSS custom properties driving the light/dark theme system', 'Vanilla JS modules for carousel, modal, reveal and form logic'],
      challenges: ['Balancing bold neo-brutalist visuals with real accessibility and performance', 'Building a touch, mouse, and keyboard-friendly carousel from scratch'],
      improvements: ['Wire the contact form to a real email service', 'Add a written case study per project', 'Add real project screenshots and a demo recording'],
      github: 'https://github.com/',
      demo: '#'
    }
  };

  /* ---------------- Project modal ---------------- */
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  let lastFocused = null;

  function renderModal(key) {
    const p = projectData[key];
    if (!p) return;
    modalContent.innerHTML = `
      <img src="${p.image}" alt="${p.title} preview" style="width:100%;border-radius:14px;border:3px solid var(--border);margin-bottom:20px;" onerror="this.src='${p.fallback}'">
      <span class="tag">${p.status}</span>
      <h3 id="modal-title" style="margin-top:14px;">${p.title}</h3>
      <p style="color:var(--ink-soft);">${p.description}</p>
      <h4>Tech Stack</h4>
      <div class="project-tags">${p.stack.map(s => `<span class="tag">${s}</span>`).join('')}</div>
      <h4>Architecture</h4>
      <ul>${p.architecture.map(s => `<li>${s}</li>`).join('')}</ul>
      <h4>Challenges</h4>
      <ul>${p.challenges.map(s => `<li>${s}</li>`).join('')}</ul>
      <h4>Future Improvements</h4>
      <ul>${p.improvements.map(s => `<li>${s}</li>`).join('')}</ul>
      <div class="project-links" style="margin-top:24px;">
        <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-primary">View on GitHub</a>
      </div>
    `;
  }

  function openModal(key) {
    lastFocused = document.activeElement;
    renderModal(key);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    lastFocused && lastFocused.focus();
  }
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.project));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.project); }
    });
  });
  modalClose && modalClose.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  /* ---------------- Carousel ---------------- */
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsWrap = document.getElementById('carousel-dots');
  const cards = Array.from(track.querySelectorAll('.project-card'));

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to project ' + (i + 1));
    dot.addEventListener('click', () => scrollToCard(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function cardWidth() {
    return cards[0].getBoundingClientRect().width + 28; // gap
  }
  function currentIndex() {
    return Math.round(track.scrollLeft / cardWidth());
  }
  function scrollToCard(i) {
    i = Math.max(0, Math.min(cards.length - 1, i));
    track.scrollTo({ left: i * cardWidth(), behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  function updateDots() {
    const idx = currentIndex();
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }
  track.addEventListener('scroll', () => {
    clearTimeout(track._t);
    track._t = setTimeout(updateDots, 80);
  }, { passive: true });

  prevBtn.addEventListener('click', () => scrollToCard(currentIndex() - 1));
  nextBtn.addEventListener('click', () => scrollToCard(currentIndex() + 1));

  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollToCard(currentIndex() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToCard(currentIndex() - 1); }
  });

  /* drag / swipe support */
  let isDown = false, startX, scrollLeftStart;
  track.addEventListener('pointerdown', e => {
    isDown = true;
    track.setPointerCapture(e.pointerId);
    startX = e.clientX;
    scrollLeftStart = track.scrollLeft;
  });
  track.addEventListener('pointermove', e => {
    if (!isDown) return;
    track.scrollLeft = scrollLeftStart - (e.clientX - startX);
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(evt =>
    track.addEventListener(evt, () => { isDown = false; updateDots(); })
  );

  updateDots();

  /* ---------------- Contact form ---------------- */
  const form = document.getElementById('contact-form');
  const statusBox = document.getElementById('form-status');
  const submitBtn = document.getElementById('contact-submit');
  const submitLabel = document.getElementById('submit-label');

  function setFieldError(id, invalid) {
    const field = document.getElementById('field-' + id);
    if (field) field.classList.toggle('invalid', invalid);
  }

  function validate() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setFieldError('name', name.length === 0);
    setFieldError('email', !emailOk);
    setFieldError('subject', subject.length === 0);
    setFieldError('message', message.length === 0);

    return name.length > 0 && emailOk && subject.length > 0 && message.length > 0;
  }

  form && form.addEventListener('submit', e => {
    e.preventDefault();
    statusBox.classList.remove('show', 'success');
    if (!validate()) return;

    submitBtn.disabled = true;
    submitLabel.innerHTML = '';
    const spinner = document.createElement('span');
    spinner.className = 'spinner';
    submitLabel.appendChild(spinner);
    submitLabel.appendChild(document.createTextNode(' Sending...'));

    // Simulated send — replace with a real endpoint (e.g. Formspree, EmailJS) for production.
    setTimeout(() => {
      submitBtn.disabled = false;
      submitLabel.textContent = 'Send Message';
      statusBox.classList.add('show', 'success');
      statusBox.textContent = "Message sent — thanks! I'll reply within a couple of days.";
      form.reset();
    }, 1100);
  });

  ['name', 'email', 'subject', 'message'].forEach(id => {
    const el = document.getElementById(id);
    el && el.addEventListener('input', () => setFieldError(id, false));
  });

  /* ---------------- Back to top ---------------- */
  const backToTop = document.getElementById('back-to-top');
  backToTop && backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

})();
