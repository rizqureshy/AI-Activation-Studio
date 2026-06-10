// ─── Global state ─────────────────────────────────────────
const state = {
  step: 1,
  program: {
    name: '',
    audience: '',
    trainer: '',
    startDate: '',
    format: null
  },
  tracks: {},           // id -> { selected, difficulty }
  schedule: [],         // [{ activityId }]
  resources: [],        // catalogIds attached to this program
  filters: { track: 'all', difficulty: 'all' },
  customActivities: []
};

function allActivities() {
  return ACTIVITIES.concat(state.customActivities);
}
function findActivity(id) {
  return allActivities().find(a => a.id === id);
}
function findCatalogItem(id) {
  return (typeof CATALOG !== 'undefined') ? CATALOG.find(c => c.id === id) : null;
}

// ─── Theme management ────────────────────────────────────
const THEME_VERSION = 'v3-dark-cinematic';

function initTheme() {
  // One-time reset when the visual direction changes, so existing users
  // see the new dark default instead of a stale "light" preference.
  const storedVersion = localStorage.getItem('ath-theme-version');
  if (storedVersion !== THEME_VERSION) {
    localStorage.removeItem('ath-theme');
    localStorage.setItem('ath-theme-version', THEME_VERSION);
  }
  const saved = localStorage.getItem('ath-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon();
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let next;
  if (current === 'light') next = 'dark';
  else if (current === 'dark') next = 'light';
  else next = prefersDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ath-theme', next);
  updateThemeIcon();
}
function updateThemeIcon() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
    || (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  btn.innerHTML = isDark
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

// ─── State persistence ───────────────────────────────────
const STATE_KEY = 'ath-state-v1';
let savePending = false;
function saveState() {
  if (savePending) return;
  savePending = true;
  requestAnimationFrame(() => {
    savePending = false;
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify({
        program: state.program,
        tracks: state.tracks,
        schedule: state.schedule,
        resources: state.resources,
        customActivities: state.customActivities,
        step: state.step,
        loadedPlanId: state.loadedPlanId || null
      }));
    } catch (_) {}
  });
}
function restoreState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    if (!saved || !saved.program) return false;
    Object.assign(state.program, saved.program);
    state.tracks = saved.tracks || {};
    state.schedule = saved.schedule || [];
    state.resources = saved.resources || [];
    state.customActivities = saved.customActivities || [];
    state.loadedPlanId = saved.loadedPlanId || null;
    return state.schedule.length > 0 || !!state.program.name;
  } catch (_) { return false; }
}
function resetState() {
  localStorage.removeItem(STATE_KEY);
  state.program = { name:'', audience:'', trainer:'', startDate:'', format:null };
  state.tracks = {};
  state.schedule = [];
  state.resources = [];
  state.customActivities = [];
  state.step = 1;
  state.loadedPlanId = null;
}
// Auto-save proxy: wrap critical mutations from outside via window event
window.addEventListener('ath-mutate', saveState);

// ─── Page navigation ─────────────────────────────────────
const pageHistory = [];
let currentPageId = 'landing';

function showPage(id) {
  // Don't push onto history if we're navigating to the same page
  if (currentPageId && currentPageId !== id) pageHistory.push(currentPageId);
  _switchPage(id);
}

// Internal switch without history push — used by goBack().
// Uses View Transitions API on supporting browsers for a buttery
// cross-fade between pages; falls back to instant + CSS-pageIn
// animation on older browsers.
function _switchPage(id) {
  const doSwitch = () => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + id);
    if (target) target.classList.add('active');
    currentPageId = id;
    updateBackButton();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  if (document.startViewTransition) {
    document.startViewTransition(doSwitch);
  } else {
    doSwitch();
  }
}

function goBack() {
  if (pageHistory.length === 0) { _switchPage('landing'); return; }
  const prev = pageHistory.pop();
  _switchPage(prev);
}

function updateBackButton() {
  const btn = document.getElementById('back-btn');
  if (!btn) return;
  btn.hidden = currentPageId === 'landing';
}
function startBuilder() {
  showPage('builder');
  if (!state.program.name && !state.schedule.length) state.step = 1;
  renderStep();
}
function startFresh() {
  if (!confirm('Discard your current program and start over?')) return;
  resetState();
  startBuilder();
}

// One-click "build me a program" from the landing
function autoFillFromLanding() {
  resetState();
  state.program.name = suggestProgramName();
  state.program.format = 'monthly-marathon';
  state.program.audience = '';
  ['prompt-engineering','content-generation','data-analysis'].forEach(id => {
    state.tracks[id] = { selected: true, difficulty: 'mixed' };
  });
  state.step = 3;
  showPage('builder');
  renderStep();
  setTimeout(() => {
    if (typeof autoFill === 'function') autoFill();
    toast('Built a Monthly Marathon. Edit anything you like.');
  }, 280);
}

// Quick-start blueprint by format
function quickStart(formatId) {
  resetState();
  state.program.name = suggestProgramName();
  state.program.format = formatId;
  // Pick sensible default tracks for each blueprint
  const defaults = {
    'monthly-marathon': ['prompt-engineering','content-generation','data-analysis','application-building'],
    'weekly-sprint':    ['prompt-engineering','content-generation','data-analysis'],
    'workshop':         ['prompt-engineering','content-generation','application-building'],
    'lunch-learn':      ['prompt-engineering','content-generation'],
    'self-paced':       ['prompt-engineering','content-generation','data-analysis'],
    'hackathon':        ['prompt-engineering','application-building','visual-creation'],
    'certification':    ['prompt-engineering','content-generation','data-analysis','code-technical']
  };
  (defaults[formatId] || ['prompt-engineering','content-generation']).forEach(id => {
    state.tracks[id] = { selected: true, difficulty: 'mixed' };
  });
  state.step = 3;
  showPage('builder');
  renderStep();
  setTimeout(() => {
    if (typeof autoFill === 'function') autoFill();
    const fmt = FORMATS.find(f => f.id === formatId);
    toast(`Built a ${fmt?.name || 'program'}. Edit anything.`);
  }, 280);
}

function suggestProgramName() {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const d = new Date();
  return `AI ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// 3D-tilt + cursor-lit glass for .path tiles (rAF-batched)
function attachPathTilts() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.path, .res-tile').forEach(el => {
    if (el.dataset.tiltBound) return;
    el.dataset.tiltBound = '1';
    let rafId = null;
    let px = 50, py = 50;
    const apply = () => {
      rafId = null;
      // Gentle tilt — ±4° / ±5° feels rich without being theatrical
      const rx = -(py - 50) / 50 * 4;
      const ry =  (px - 50) / 50 * 5;
      el.style.setProperty('--mx', px + '%');
      el.style.setProperty('--my', py + '%');
      el.style.setProperty('--rx', rx + 'deg');
      el.style.setProperty('--ry', ry + 'deg');
    };
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width)  * 100;
      py = ((e.clientY - r.top)  / r.height) * 100;
      if (!rafId) rafId = requestAnimationFrame(apply);
    });
    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--mx', '50%');
      el.style.setProperty('--my', '50%');
    });
  });
}

// Dense starfield — generate ~110 stars with varied size/brightness once on load
function generateStarfield() {
  const layer = document.querySelector('.scene-stars');
  if (!layer || layer.dataset.generated) return;
  layer.dataset.generated = '1';
  const stars = [];
  // Far layer: many small dim stars (background depth)
  for (let i = 0; i < 80; i++) {
    const x = (Math.random() * 100).toFixed(2);
    const y = (Math.random() * 70).toFixed(2);   // keep stars above the horizon zone
    const size = (Math.random() * 1.2 + 0.5).toFixed(2);
    const op = (Math.random() * 0.45 + 0.30).toFixed(2);
    stars.push(`radial-gradient(${size}px ${size}px at ${x}% ${y}%, rgba(255,255,255,${op}), transparent 60%)`);
  }
  // Mid layer: medium stars
  for (let i = 0; i < 24; i++) {
    const x = (Math.random() * 100).toFixed(2);
    const y = (Math.random() * 70).toFixed(2);
    const size = (Math.random() * 0.8 + 1.2).toFixed(2);
    const op = (Math.random() * 0.30 + 0.65).toFixed(2);
    stars.push(`radial-gradient(${size}px ${size}px at ${x}% ${y}%, rgba(255,255,255,${op}), transparent 60%)`);
  }
  // Bright foreground: a handful of sharp, near-white anchor stars
  for (let i = 0; i < 10; i++) {
    const x = (Math.random() * 100).toFixed(2);
    const y = (Math.random() * 65).toFixed(2);
    const size = (Math.random() * 1.2 + 2.0).toFixed(2);
    const op = (Math.random() * 0.10 + 0.90).toFixed(2);
    stars.push(`radial-gradient(${size}px ${size}px at ${x}% ${y}%, rgba(255,255,255,${op}), transparent 55%)`);
  }
  layer.style.backgroundImage = stars.join(', ');
}

// Record-bin flip (vinyl blueprint cards on landing)
function flipRecord(el) {
  if (!el) return;
  // Close any other currently-flipped record so only one is open at a time
  document.querySelectorAll('.record.flipped').forEach(r => { if (r !== el) r.classList.remove('flipped'); });
  el.classList.toggle('flipped');
}

// Nav overflow dropdown
function toggleNavOverflow(e) {
  e.stopPropagation();
  const wrap = document.querySelector('.nav-overflow');
  if (!wrap) return;
  const open = wrap.classList.toggle('open');
  if (open) {
    setTimeout(() => document.addEventListener('click', closeNavOverflowOnce, { once: true }), 0);
  }
}
function hideNavOverflow() {
  document.querySelector('.nav-overflow')?.classList.remove('open');
}
function closeNavOverflowOnce() { hideNavOverflow(); }

// ─── JSON file load ──────────────────────────────────────
function triggerLoadJSON() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json,.json';
  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        const s = data.state || data; // accept raw state or {state, payload}
        if (!s.program) throw new Error('Not a valid AI Activation Studio backup.');
        Object.assign(state.program, s.program);
        state.tracks = s.tracks || {};
        state.schedule = s.schedule || [];
        state.resources = s.resources || [];
        state.customActivities = s.customActivities || [];
        saveState();
        toast('Program loaded.');
        startBuilder();
      } catch (err) {
        toast('Could not load JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  });
  input.click();
}

// ─── Toast ───────────────────────────────────────────────
let toastTimer;
function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

// ─── Init ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  const hasSaved = restoreState();
  renderLanding(hasSaved);
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeIcon);

  // Global keyboard handling
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('activity-modal');
      if (modal?.classList.contains('open')) { closeModal(); return; }
    }
    // Cmd/Ctrl+S — save (no-op; auto-save already runs)
    if ((e.metaKey || e.ctrlKey) && e.key === 's' && document.getElementById('page-builder')?.classList.contains('active')) {
      e.preventDefault();
      saveState();
      toast('Saved.');
    }
  });
});

// ─── Landing page render ─────────────────────────────────
function renderLanding(hasSaved) {
  initRevealObserver();
  generateStarfield();
  attachPathTilts();
  if (typeof _refreshMyPlansChip === 'function') _refreshMyPlansChip();
  const resume = document.getElementById('resume-banner');
  if (resume) {
    if (hasSaved && state.program.name) {
      resume.innerHTML = `
        <div class="resume-inner">
          <div>
            <div class="resume-label">Pick up where you left off</div>
            <div class="resume-name">${escapeHtml(state.program.name)}</div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn small" onclick="startBuilder()">Resume</button>
            <button class="btn small ghost" onclick="startFresh()">Start fresh</button>
          </div>
        </div>`;
      resume.style.display = 'block';
    } else {
      resume.style.display = 'none';
    }
  }
}
function escapeHtml(s) { return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }

// ─── Scroll reveal (IntersectionObserver) ───────────────
let revealObserver;
function initRevealObserver() {
  if (typeof IntersectionObserver === 'undefined') return;
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    if (!el.classList.contains('reveal-in')) revealObserver.observe(el);
  });
}

// ─── Stat counter animation ─────────────────────────────
function setupCountObserver() {
  if (typeof IntersectionObserver === 'undefined') {
    // Fallback: just set the final value
    document.querySelectorAll('[data-target]').forEach(el => el.textContent = el.dataset.target);
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-target]').forEach(el => obs.observe(el));
}
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10) || 0;
  const start = performance.now();
  const duration = 1400;
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    // ease-out-quart
    const eased = 1 - Math.pow(1 - t, 4);
    const v = Math.round(target * eased);
    el.textContent = v;
    if (t < 1) requestAnimationFrame(tick); else el.textContent = target;
  }
  requestAnimationFrame(tick);
}
