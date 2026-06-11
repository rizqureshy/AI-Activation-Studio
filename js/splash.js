// ─── Splash intro — "Welcome to the future of AI Activation" ─────
// Plays once per browser session (sessionStorage), skippable via
// click / Escape / Enter, and skipped entirely for reduced-motion users.
// The <html data-splash="pending"> attribute is set by an inline script
// in <head> before first paint so the overlay covers the app instantly.

(function () {
  const SPLASH_KEY = 'aas-splash-seen';
  const TOTAL_MS   = 10400;  // day cycle + finale + title morph, then dismiss
  const EXIT_MS    = 900;    // exit transition length (matches CSS flight)

  const root = document.documentElement;
  const pending = root.getAttribute('data-splash') === 'pending';

  function markSeen() {
    try { sessionStorage.setItem(SPLASH_KEY, '1'); } catch (_) {}
  }

  function removeSplash() {
    root.removeAttribute('data-splash');
    document.getElementById('splash')?.remove();
  }

  if (!pending) { removeSplash(); return; }

  const reducedMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    markSeen();
    removeSplash();
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash');
    if (!splash) { removeSplash(); return; }

    markSeen();
    buildStars(splash.querySelector('.splash-stars'));
    // Finale text lands after the day cycle (Plan/Build/Execute) completes.
    // The headline reveals as "The Future of AI Activation"; at 8.6s the
    // CSS morph collapses "The Future of" and brings in "Studio".
    splitLetters(splash.querySelector('.splash-kicker'), 6.2, 0.045);
    splitLetters(splash.querySelector('.splash-title .t-future'), 6.55, 0.04);
    splitLetters(splash.querySelector('.splash-title .t-core'), 7.15, 0.04);

    let exited = false;
    let autoTimer;

    function exit() {
      if (exited) return;
      exited = true;
      clearTimeout(autoTimer);
      flyTitleHome();
      splash.classList.add('exit');
      root.setAttribute('data-splash', 'exiting');
      setTimeout(removeSplash, EXIT_MS);
    }

    // FLIP the splash wordmark onto the landing hero heading so the
    // title visibly travels to where it lives on the page.
    function flyTitleHome() {
      const title = splash.querySelector('.splash-title');
      const target = document.querySelector('#page-landing .studio-h');
      if (!title || !target) return;
      // Measure the rendered text, not the h1 blocks — both headings are
      // block elements whose boxes span their containers.
      const textRect = el => {
        const r = document.createRange();
        r.selectNodeContents(el);
        return r.getBoundingClientRect();
      };
      const a = textRect(title);
      const b = textRect(target);
      if (!a.width || !b.width) return;
      const scale = b.width / a.width;
      const dx = (b.left + b.width / 2) - (a.left + a.width / 2);
      const dy = (b.top + b.height / 2) - (a.top + a.height / 2);
      title.style.transition = 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)';
      title.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(' + scale + ')';
      splash.classList.add('fly');
    }

    // Start the choreography on the next frame so transitions register.
    // The auto-dismiss timer starts here too, so it stays in sync with
    // the animation timeline however long first paint takes.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      splash.classList.add('play');
      autoTimer = setTimeout(exit, TOTAL_MS);
    }));
    splash.addEventListener('click', exit);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') exit();
    }, { once: false });
  });

  // Sparse, varied starfield for the splash backdrop — same technique
  // as generateStarfield() in app.js but lighter, since it lives ~4s.
  function buildStars(layer) {
    if (!layer) return;
    const stars = [];
    for (let i = 0; i < 70; i++) {
      const x = (Math.random() * 100).toFixed(2);
      const y = (Math.random() * 85).toFixed(2);
      const size = (Math.random() * 1.6 + 0.5).toFixed(2);
      const op = (Math.random() * 0.6 + 0.3).toFixed(2);
      stars.push(`radial-gradient(${size}px ${size}px at ${x}% ${y}%, rgba(255,255,255,${op}), transparent 60%)`);
    }
    layer.style.backgroundImage = stars.join(', ');
  }

  // Wrap each character in a <span> with a staggered animation-delay so
  // the line reveals letter-by-letter. Words are kept whole so wrapping
  // never breaks mid-word.
  function splitLetters(el, baseDelay, step) {
    if (!el) return;
    const text = el.textContent;
    el.textContent = '';
    el.setAttribute('aria-label', text);
    let i = 0;
    text.split(' ').forEach((word, w, words) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'splash-word';
      wordSpan.setAttribute('aria-hidden', 'true');
      for (const ch of word) {
        const s = document.createElement('span');
        s.className = 'splash-ch';
        s.textContent = ch;
        s.style.animationDelay = (baseDelay + i * step).toFixed(3) + 's';
        wordSpan.appendChild(s);
        i++;
      }
      el.appendChild(wordSpan);
      if (w < words.length - 1) {
        el.appendChild(document.createTextNode(' '));
        i++; // count the space in the stagger so rhythm stays even
      }
    });
  }
})();
