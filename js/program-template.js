// ─── Standalone HTML program template ───────────────────
// Returns the full HTML for an exported learner-facing site.
function generateProgramHTML(program) {
  const styles = generateProgramCSS();
  const data = JSON.stringify(program, null, 2);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(program.name)}</title>
<style>${styles}</style>
</head>
<body>

<nav class="nav">
  <div class="nav-inner">
    <div class="brand"><div class="brand-dot"></div><span>${escapeHtml(program.name)}</span></div>
    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme"></button>
  </div>
</nav>

<header class="hero">
  <div class="hero-eyebrow">${escapeHtml(program.format)} · ${escapeHtml(program.dateStr)}</div>
  <h1 class="hero-title">${escapeHtml(program.name)}</h1>
  <p class="hero-sub">${escapeHtml(program.audience ? 'For ' + program.audience + '. ' : '')}A hands-on program to build real AI skills by doing real work.</p>
  <div class="stats-row">
    <div><div class="stat-n">${program.activities.length}</div><div class="stat-l">Activities</div></div>
    <div><div class="stat-n">${program.totalHours}h</div><div class="stat-l">Total time</div></div>
    <div><div class="stat-n">${program.tracksCovered}</div><div class="stat-l">Tracks</div></div>
    <div><div class="stat-n">${program.weeks}</div><div class="stat-l">Week${program.weeks===1?'':'s'}</div></div>
  </div>
</header>

<main class="container">
  <div class="progress-wrap">
    <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
    <div class="progress-meta">
      <span id="progress-label">0 / ${program.activities.length} completed</span>
      <span id="progress-pct">0%</span>
    </div>
  </div>

  ${program.weeks > 1 ? `
  <div class="week-tabs" id="week-tabs">
    ${Array.from({length: program.weeks}, (_, i) => `<button class="week-tab ${i===0?'active':''}" data-w="${i+1}">Week ${i+1}</button>`).join('')}
  </div>` : ''}

  <div id="cards-root"></div>

  ${program.resources && program.resources.length ? `
    <section class="resources-section">
      <h2 class="resources-title">📚 Recommended resources</h2>
      <p class="resources-sub">Curated videos, courses, and labs to support this program.</p>
      <div class="resources-grid">
        ${program.resources.map(r => `
          <article class="res-card">
            <div class="res-card-top">
              <span class="res-track">${escapeHtml(r.trackIcon + ' ' + (r.trackName||'').split(' ')[0])}</span>
              <span class="res-cost res-cost-${r.cost}">${escapeHtml(r.costLabel)}</span>
            </div>
            <div class="res-title">${escapeHtml(r.title)}</div>
            <div class="res-provider">${escapeHtml(r.provider)}${r.instructor ? ' · ' + escapeHtml(r.instructor) : ''}</div>
            <div class="res-meta">${escapeHtml(r.typeLabel)} · ${escapeHtml(r.durationLabel)} · ${escapeHtml(r.difficulty)}</div>
            <a class="res-cta" href="${escapeHtml(r.url)}" target="_blank" rel="noopener">Open ↗</a>
          </article>
        `).join('')}
      </div>
    </section>
  ` : ''}
</main>

<footer class="footer">
  Generated with <a href="#" style="color:var(--accent)">AI Activation Studio</a> · ${escapeHtml(program.trainer || 'Your trainer')}
</footer>

<div class="modal-backdrop" id="modal-backdrop">
  <div class="modal" id="modal"></div>
</div>

<script>
const PROGRAM = ${data};
const STORAGE_KEY = 'ath-progress-' + (PROGRAM.id || 'default');
let completed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let currentWeek = 1;

function initTheme() {
  const saved = localStorage.getItem('ath-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon();
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const next = current === 'light' ? 'dark' : current === 'dark' ? 'light' : (prefersDark ? 'light' : 'dark');
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

function diffStars(d) { return d === 'advanced' ? '★★★' : d === 'intermediate' ? '★★' : '★'; }

function renderCards() {
  const root = document.getElementById('cards-root');
  const cards = PROGRAM.activities.map((a, i) => {
    if (PROGRAM.weeks > 1 && a.week !== currentWeek) return '';
    const done = completed.includes(a.id);
    const req = a.required === 'mandatory' ? 'mandatory' : 'optional';
    return \`
      <div class="card diff-\${a.difficulty} req-\${req} \${done?'done':''}" data-id="\${a.id}">
        <div class="card-row">
          <div class="card-day">\${a.slotLabel}</div>
          <button class="card-check \${done?'checked':''}" data-id="\${a.id}" onclick="event.stopPropagation(); toggleDone('\${a.id}')">\${done?'✓':''}</button>
        </div>
        <div class="card-emoji">\${a.emoji}</div>
        <div class="card-title">\${a.title}</div>
        <div class="card-desc">\${a.description}</div>
        <div class="card-meta">
          <span class="card-diff diff-\${a.difficulty}">\${diffStars(a.difficulty)} \${a.difficulty}</span>
          <span class="card-req req-\${req}"><span class="card-req-dot"></span>\${req === 'mandatory' ? 'Mandatory' : 'Optional'}</span>
          <span>⏱ \${a.timeEstimate} min</span>
          <span>\${a.trackName}</span>
        </div>
      </div>
    \`;
  }).join('');
  root.innerHTML = '<div class="card-grid">' + cards + '</div>';
  root.querySelectorAll('.card').forEach(c => c.addEventListener('click', () => showDetail(c.dataset.id)));
  updateProgress();
}

function toggleDone(id) {
  const i = completed.indexOf(id);
  if (i >= 0) completed.splice(i, 1); else completed.push(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  renderCards();
}

function updateProgress() {
  const done = completed.length;
  const total = PROGRAM.activities.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent = done + ' / ' + total + ' completed';
  document.getElementById('progress-pct').textContent = pct + '%';
}

function showDetail(id) {
  const a = PROGRAM.activities.find(x => x.id === id);
  if (!a) return;
  const m = document.getElementById('modal');
  m.innerHTML = \`
    <button class="modal-close" onclick="closeModal()">×</button>
    <div class="modal-emoji">\${a.emoji}</div>
    <h3>\${a.title}</h3>
    <div class="modal-meta">
      <span>\${a.trackName}</span>
      <span>\${diffStars(a.difficulty)} \${a.difficulty}</span>
      <span>⏱ \${a.timeEstimate} min</span>
    </div>
    <p>\${a.description}</p>
    <h4>How to run it</h4>
    <p>\${a.detailedInstructions}</p>
    <h4>Deliverable</h4>
    <p>\${a.deliverable}</p>
    <h4>Skills built</h4>
    <div class="tag-row">\${(a.skillsBuilt||[]).map(s => '<span class="tag">'+s+'</span>').join('')}</div>
    <h4>Tools</h4>
    <div class="tag-row">\${(a.tools||['any']).map(s => '<span class="tag">'+s+'</span>').join('')}</div>
  \`;
  document.getElementById('modal-backdrop').classList.add('open');
}
function closeModal() { document.getElementById('modal-backdrop').classList.remove('open'); }

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderCards();
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.querySelectorAll('.week-tab').forEach(t => {
    t.addEventListener('click', () => {
      currentWeek = +t.dataset.w;
      document.querySelectorAll('.week-tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      renderCards();
    });
  });
  document.getElementById('modal-backdrop').addEventListener('click', e => {
    if (e.target.id === 'modal-backdrop') closeModal();
  });
});
</script>
</body>
</html>`;
}

function generateProgramCSS() {
  return `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap");

:root {
  /* AI Activation Studio palette — dark cinematic */
  --bg:           #0A0B1A;
  --bg-deep:      #06070F;
  --surface:      #12132A;
  --surface-alt:  #181A33;
  --surface-elev: #1C1E3D;
  --paper:        #0F1024;
  --text:         #F4F4F8;
  --text-strong:  #FFFFFF;
  --text-muted:   #9CA0BC;
  --text-soft:    #5F6489;
  --border:       #232544;
  --border-strong:#2F3260;
  --accent:       #A78BFA;
  --accent-hover: #C4B5FD;
  --accent-deep:  #8B5CF6;
  --accent-text:  #C7B9FF;
  --accent-soft:  rgba(167, 139, 250, 0.14);
  --accent-glow:  rgba(167, 139, 250, 0.45);
  --emerald:      #34D399;
  --emerald-soft: rgba(52, 211, 153, 0.16);
  --amber:        #FBBF24;
  --amber-soft:   rgba(251, 191, 36, 0.16);
  --pink:         #F472B6;
  --pink-soft:    rgba(244, 114, 182, 0.16);
  --grad-primary: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 50%, #C4B5FD 100%);
  --radius:       10px;
  --radius-lg:    16px;
  --radius-xl:    20px;
  --radius-pill:  9999px;
  --font:         "Inter", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --easing-out:   cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="light"] {
  /* Sunrise light variant */
  --bg:           #FFF8F0;
  --bg-deep:      #FBEFDC;
  --surface:      #FFFFFF;
  --surface-alt:  #FDF6EC;
  --surface-elev: #FFFFFF;
  --paper:        #FFFCF6;
  --text:         #0A0B1A;
  --text-strong:  #000000;
  --text-muted:   #475569;
  --text-soft:    #94A3B8;
  --border:       #E2E8F0;
  --border-strong:#CBD5E1;
  --accent:       #7C3AED;
  --accent-hover: #6D28D9;
  --accent-deep:  #5B21B6;
  --accent-text:  #6D28D9;
  --accent-soft:  rgba(124, 58, 237, 0.10);
  --accent-glow:  rgba(124, 58, 237, 0.35);
  --emerald:      #10B981;
  --emerald-soft: rgba(16, 185, 129, 0.10);
  --amber:        #F59E0B;
  --amber-soft:   rgba(245, 158, 11, 0.10);
  --pink:         #EC4899;
  --pink-soft:    rgba(236, 72, 153, 0.10);
  --grad-primary: linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { background: var(--bg); }
html, body {
  color: var(--text);
  font-family: var(--font);
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
body { background: transparent; min-height: 100vh; position: relative; }

/* Ambient horizon-glow under the content */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(900px circle at 15% 8%,  rgba(167, 139, 250, 0.16), transparent 50%),
    radial-gradient(700px circle at 92% 22%, rgba(232, 121, 249, 0.16), transparent 50%),
    radial-gradient(800px circle at 50% 100%,rgba(96, 165, 250, 0.16),  transparent 60%);
}
[data-theme="light"] body::before {
  background:
    radial-gradient(800px circle at 50% 100%, rgba(251, 146, 60, 0.30), transparent 60%),
    radial-gradient(700px circle at 15% 10%,  rgba(124, 58, 237, 0.08), transparent 50%);
}

button, input, select { font-family: inherit; font-size: inherit; color: inherit; }

/* Bracket label */
.bracket {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-text);
}
.bracket::before, .bracket::after { color: var(--text-soft); font-weight: 400; }
.bracket::before { content: "["; margin-right: 4px; }
.bracket::after  { content: "]"; margin-left: 4px; }

/* Nav */
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 75%, transparent);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--border);
}
.nav-inner { max-width: 1240px; margin: 0 auto; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 700; font-size: 15px; letter-spacing: -0.01em; }
.brand-dot {
  width: 26px; height: 26px;
  border-radius: 8px;
  background: var(--grad-primary);
  display: grid; place-items: center;
  box-shadow: 0 6px 16px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.25);
  position: relative;
}
.brand-dot::after {
  content: "";
  width: 11px; height: 11px;
  border: 2px solid white;
  border-radius: 3px;
  transform: rotate(45deg);
}
.theme-toggle {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--surface-alt);
  border: 1px solid var(--border);
  cursor: pointer;
  display: grid; place-items: center;
  color: var(--text);
  transition: all 200ms var(--easing-out);
}
.theme-toggle:hover { border-color: var(--accent); color: var(--accent); }

/* Layout */
.container { max-width: 1240px; margin: 0 auto; padding: 0 32px; }
@media (max-width: 720px) { .container, .nav-inner { padding-left: 20px; padding-right: 20px; } }

/* Hero */
.hero {
  text-align: center;
  padding: 88px 32px 56px;
  max-width: 920px;
  margin: 0 auto;
  position: relative;
}
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent-text);
  padding: 4px 12px;
  background: var(--accent-soft);
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
  border-radius: 9999px;
}
.hero-title {
  font-size: clamp(40px, 6vw, 80px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
  background: var(--grad-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero-sub {
  font-size: clamp(16px, 1.4vw, 19px);
  line-height: 1.55;
  color: var(--text-muted);
  max-width: 620px;
  margin: 0 auto 40px;
}
.stats-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 48px;
  padding: 28px 32px;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin: 0 32px;
}
.stat-n { font-size: 38px; font-weight: 700; letter-spacing: -0.025em; line-height: 1; }
.stat-l { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); margin-top: 8px; }

/* Progress */
.progress-wrap { margin: 48px 0 28px; }
.progress-bar { height: 8px; background: var(--surface-alt); border-radius: 9999px; overflow: hidden; border: 1px solid var(--border); }
.progress-fill { height: 100%; background: var(--grad-primary); border-radius: inherit; transition: width 500ms var(--easing-out); box-shadow: 0 0 12px var(--accent-glow); }
.progress-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

/* Week tabs */
.week-tabs { display: flex; gap: 6px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 4px; }
.week-tab {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9999px;
  padding: 7px 16px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  transition: all 180ms var(--easing-out);
}
.week-tab:hover { border-color: var(--accent); color: var(--accent); }
.week-tab.active { background: var(--accent); color: white; border-color: var(--accent); box-shadow: 0 4px 12px var(--accent-glow); }

/* Cards (glass) */
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
.card {
  position: relative;
  background:
    linear-gradient(180deg,
      rgba(255, 255, 255, 0.045) 0%,
      rgba(255, 255, 255, 0.015) 100%);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: var(--radius-lg);
  padding: 24px;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  box-shadow:
    0 12px 28px -10px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    inset 0 -1px 0 rgba(0, 0, 0, 0.30);
  transition: transform 280ms var(--easing-out), border-color 220ms ease, box-shadow 280ms ease;
}
.card::before {
  content: "";
  position: absolute;
  top: 0; left: 12%; right: 12%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
  pointer-events: none;
}
.card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow:
    0 18px 40px -12px rgba(0, 0, 0, 0.55),
    0 0 28px var(--accent-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}
.card.done { opacity: 0.55; }
[data-theme="light"] .card {
  background: linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,248,235,0.70) 100%);
  border-color: rgba(234, 88, 12, 0.14);
  box-shadow:
    0 12px 28px -10px rgba(180, 80, 12, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
}
[data-theme="light"] .card:hover {
  box-shadow:
    0 18px 40px -12px rgba(180, 80, 12, 0.22),
    0 0 28px rgba(251, 146, 60, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 1);
}

.card-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.card-day {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.card-check {
  width: 24px; height: 24px;
  border-radius: 50%;
  border: 1.5px solid var(--border-strong);
  background: var(--surface-alt);
  cursor: pointer;
  display: grid; place-items: center;
  font-size: 12px;
  font-weight: 700;
  color: transparent;
  transition: all 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.card-check.checked { background: var(--accent); border-color: transparent; color: white; box-shadow: 0 4px 12px var(--accent-glow); }
.card-emoji { font-size: 30px; margin-bottom: 12px; line-height: 1; }
.card-title { font-size: 17px; font-weight: 700; margin-bottom: 6px; letter-spacing: -0.01em; }
.card-desc { font-size: 13.5px; color: var(--text-muted); line-height: 1.55; margin-bottom: 12px; }
.card-meta {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-muted);
  display: flex; gap: 14px;
  flex-wrap: wrap;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Difficulty colour code on activity cards */
.card.diff-beginner     { border-top: 3px solid var(--emerald); }
.card.diff-intermediate { border-top: 3px solid var(--amber); }
.card.diff-advanced     { border-top: 3px solid var(--pink); }
.card-diff {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 9999px;
  border: 1px solid currentColor;
  background: color-mix(in srgb, currentColor 10%, transparent);
}
.card-diff.diff-beginner     { color: var(--emerald); }
.card-diff.diff-intermediate { color: var(--amber); }
.card-diff.diff-advanced     { color: var(--pink); }

/* Optional / Mandatory pill in the meta row */
.card-req {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-mono);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  padding: 2px 9px;
  border-radius: 9999px;
  border: 1px solid currentColor;
  background: color-mix(in srgb, currentColor 10%, transparent);
}
.card-req-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.card-req.req-optional  { color: var(--text-muted); }
.card-req.req-mandatory { color: var(--accent-text); }
.card.req-mandatory { box-shadow:
  inset 0 0 0 1px color-mix(in srgb, var(--accent) 35%, transparent),
  0 12px 28px -10px rgba(0, 0, 0, 0.45),
  inset 0 1px 0 rgba(255, 255, 255, 0.10); }
.card.req-mandatory:hover { box-shadow:
  inset 0 0 0 1px var(--accent),
  0 18px 40px -12px rgba(0, 0, 0, 0.55),
  0 0 28px var(--accent-glow); }

/* Footer */
.footer {
  border-top: 1px solid var(--border);
  padding: 28px 32px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--text-soft);
  margin-top: 64px;
}
.footer a { color: var(--accent); text-decoration: none; font-weight: 600; }
.footer a:hover { color: var(--accent-hover); text-decoration: underline; text-underline-offset: 3px; }

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(6, 7, 15, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 200;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
[data-theme="light"] .modal-backdrop { background: rgba(254, 215, 170, 0.55); }
.modal-backdrop.open { display: flex; }
.modal {
  background: var(--surface-elev);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  max-width: 600px;
  width: 100%;
  max-height: 88vh;
  overflow-y: auto;
  padding: 36px;
  position: relative;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.55);
}
.modal-close {
  position: absolute;
  top: 16px; right: 16px;
  background: var(--surface-alt);
  border: 1px solid var(--border);
  width: 32px; height: 32px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--text);
  font-size: 18px;
  transition: all 180ms var(--easing-out);
}
.modal-close:hover { background: rgba(248, 113, 113, 0.16); color: #F87171; transform: rotate(90deg); }
.modal-emoji { font-size: 40px; margin-bottom: 14px; line-height: 1; }
.modal h3 { font-size: 26px; font-weight: 700; letter-spacing: -0.015em; margin-bottom: 8px; line-height: 1.1; }
.modal-meta {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 18px;
  display: flex; gap: 16px;
  flex-wrap: wrap;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.modal p { color: var(--text); line-height: 1.65; margin-bottom: 14px; font-size: 14.5px; }
.modal h4 {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 20px 0 10px;
}
.tag-row { display: flex; flex-wrap: wrap; gap: 6px; }
.tag {
  background: var(--accent-soft);
  border-radius: 9999px;
  padding: 4px 12px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--accent-text);
  font-weight: 500;
  letter-spacing: 0.04em;
}

/* Resources */
.resources-section {
  margin-top: 56px;
  padding: 32px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
}
.resources-title { font-size: 22px; font-weight: 700; letter-spacing: -0.01em; margin-bottom: 6px; }
.resources-sub { font-size: 14px; color: var(--text-muted); margin-bottom: 22px; }
.resources-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; }
.res-card {
  background: var(--surface-alt);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 220ms var(--easing-out);
}
.res-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 20px var(--accent-glow); }
.res-card-top { display: flex; align-items: center; gap: 8px; }
.res-track { font-family: var(--font-mono); font-size: 10px; color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.10em; }
.res-cost {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 9999px;
  background: var(--surface);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 1px solid var(--border);
}
.res-cost-free { background: var(--emerald-soft); color: var(--emerald); border-color: var(--emerald-soft); }
.res-cost-included-li-learning { background: var(--accent-soft); color: var(--accent-text); border-color: var(--accent-soft); }
.res-cost-trial-available { background: var(--amber-soft); color: var(--amber); border-color: var(--amber-soft); }
.res-title { font-size: 15px; font-weight: 700; line-height: 1.3; letter-spacing: -0.005em; }
.res-provider { font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
.res-meta { font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
.res-cta {
  display: inline-block;
  margin-top: 6px;
  padding: 8px 14px;
  background: var(--accent);
  color: white !important;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  align-self: flex-start;
  transition: all 200ms var(--easing-out);
  box-shadow: 0 4px 12px var(--accent-glow);
}
.res-cta:hover { background: var(--accent-deep) !important; transform: translateY(-1px); }
`;
}

function escapeHtml(s) {
  return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}
