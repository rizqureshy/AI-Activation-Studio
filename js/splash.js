// ─── Splash intro — "Welcome to the future of AI Activation" ─────
// Plays once per browser session (sessionStorage), skippable via
// click / Escape / Enter, and skipped entirely for reduced-motion users.
// The <html data-splash="pending"> attribute is set by an inline script
// in <head> before first paint so the overlay covers the app instantly.

(function () {
  const SPLASH_KEY = 'aas-splash-seen';
  const TOTAL_MS   = 9600;   // day cycle (~5.6s) + finale, then auto-dismiss
  const EXIT_MS    = 750;    // exit transition length (matches CSS)

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
    // Finale text lands after the day cycle (Plan/Build/Execute) completes
    splitLetters(splash.querySelector('.splash-kicker'), 6.2, 0.045);
    splitLetters(splash.querySelector('.splash-title'), 6.7, 0.05);

    let exited = false;
    let autoTimer;

    function exit() {
      if (exited) return;
      exited = true;
      clearTimeout(autoTimer);
      splash.classList.add('exit');
      root.setAttribute('data-splash', 'exiting');
      setTimeout(removeSplash, EXIT_MS);
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
