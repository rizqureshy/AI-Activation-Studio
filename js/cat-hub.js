// ─── Activities & Learnings Catalog hub + browse pages ───
// Three new pages:
//   page-cat-hub   → 2 tiles (Activities, Learnings)
//   page-activities → glass-line list of all 108 activities
//   page-learnings  → glass-line list of all 66 catalog items
// Glass lines use native <details>/<summary> for collapse/expand.

const _browseState = {
  activities: { search: '', track: 'all', difficulty: 'all' },
  learnings:  { search: '', track: 'all', cost: 'all', type: 'all' }
};

// ── Hub ──────────────────────────────────────────────────
function openCatHub() {
  showPage('cat-hub');
  renderCatHub();
}

function renderCatHub() {
  const root = document.getElementById('cat-hub-root');
  if (!root) return;
  root.innerHTML = `
    <section class="section-hero">
      <div class="wrap">
        <div>
          <div class="sh-eyebrow bracket">[ Activities &amp; Learnings ]</div>
          <h1 class="sh-title">Browse the <span class="accent">full library</span>.</h1>
          <p class="sh-sub">Two collections — hands-on activities your team can run, and external learning resources you can point them to. Pick one to explore.</p>
        </div>
        <div class="sh-meta"><b>${ACTIVITIES.length + CATALOG.length}</b>total items</div>
      </div>
    </section>

    <div class="wrap" style="padding-top: 40px; padding-bottom: 80px;">
      <div class="res-tile-grid" style="grid-template-columns: 1fr 1fr; gap: 20px;">

        <button class="res-tile" onclick="openActivities()">
          <div class="res-tile-head">
            <div class="res-tile-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6v6H9z"/></svg>
            </div>
            <div class="res-tile-progress">
              <span class="rtp-count">${ACTIVITIES.length}</span>
              <span class="rtp-label">activities</span>
            </div>
          </div>
          <div class="res-tile-tag">[ 01 · Hands-on ]</div>
          <h3 class="res-tile-title">Activities</h3>
          <p class="res-tile-sub">Short prompt-and-build challenges your team can complete in 5–30 minutes. Across 12 capability tracks. Each one ships with instructions, deliverable, and skills built.</p>
          <div class="res-tile-cta">Browse activities <span class="arrow">→</span></div>
        </button>

        <button class="res-tile" onclick="openLearnings()">
          <div class="res-tile-head">
            <div class="res-tile-icon violet">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect width="15" height="14" x="1" y="5" rx="2"/></svg>
            </div>
            <div class="res-tile-progress">
              <span class="rtp-count">${CATALOG.length}</span>
              <span class="rtp-label">resources</span>
            </div>
          </div>
          <div class="res-tile-tag">[ 02 · External ]</div>
          <h3 class="res-tile-title">Learnings</h3>
          <p class="res-tile-sub">Vetted videos, courses, and labs from LinkedIn Learning, DeepLearning.AI, Anthropic, OpenAI, IBM, NVIDIA and more. Free, trial, or LinkedIn Learning included.</p>
          <div class="res-tile-cta">Browse learnings <span class="arrow">→</span></div>
        </button>

      </div>
    </div>
  `;
  if (typeof attachPathTilts === 'function') attachPathTilts();
}

// ── Activities browse ────────────────────────────────────
function openActivities() {
  showPage('activities');
  renderActivities();
}

function _trackOpts(selected) {
  return ['<option value="all">All tracks</option>']
    .concat(TRACKS.map(t => `<option value="${t.id}" ${selected===t.id?'selected':''}>${t.icon} ${t.name}</option>`))
    .join('');
}

function _difficultyStars(d) {
  return d === 'advanced' ? '★★★' : d === 'intermediate' ? '★★' : '★';
}

function getFilteredActivities() {
  const f = _browseState.activities;
  // Combine built-in activities with the user's custom ones — custom items
  // first so they're easy to find after saving.
  const custom = (state.customActivities || []).slice().reverse();
  let items = custom.concat(ACTIVITIES);
  if (f.track !== 'all') items = items.filter(a => a.track === f.track);
  if (f.difficulty !== 'all') items = items.filter(a => a.difficulty === f.difficulty);
  if (f.search.trim()) {
    const q = f.search.toLowerCase();
    items = items.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      (a.tags||[]).some(t => t.toLowerCase().includes(q)) ||
      (a.skillsBuilt||[]).some(s => s.toLowerCase().includes(q))
    );
  }
  return items;
}

function renderActivities() {
  const root = document.getElementById('activities-root');
  if (!root) return;
  const f = _browseState.activities;
  const items = getFilteredActivities();

  root.innerHTML = `
    <section class="section-hero">
      <div class="wrap">
        <div>
          <div class="sh-eyebrow bracket">[ 01 · Activities ]</div>
          <h1 class="sh-title">Hands-on <span class="accent">activities</span>.</h1>
          <p class="sh-sub">Click any line to expand. Each activity includes instructions, deliverable, time estimate, and the skills it builds.</p>
        </div>
        <div class="sh-meta"><b>${ACTIVITIES.length}</b>activities</div>
      </div>
    </section>

    <div class="wrap" style="padding-top: 32px; padding-bottom: 80px;">
      <div class="browse-filters">
        <input id="act-search" class="browse-search" placeholder="Search title, description, skill or tag…" value="${escapeHtml(f.search)}">
        <select id="act-track" class="browse-select">${_trackOpts(f.track)}</select>
        <select id="act-diff"  class="browse-select">
          <option value="all" ${f.difficulty==='all'?'selected':''}>All levels</option>
          <option value="beginner" ${f.difficulty==='beginner'?'selected':''}>★ Beginner</option>
          <option value="intermediate" ${f.difficulty==='intermediate'?'selected':''}>★★ Intermediate</option>
          <option value="advanced" ${f.difficulty==='advanced'?'selected':''}>★★★ Advanced</option>
        </select>
        <div class="diff-legend" title="Colour code">
          <span class="diff-beginner"><span class="diff-legend-dot"></span>Beginner</span>
          <span class="diff-intermediate"><span class="diff-legend-dot"></span>Intermediate</span>
          <span class="diff-advanced"><span class="diff-legend-dot"></span>Advanced</span>
        </div>
        <button class="create-btn" onclick="openCustomActivityModal({trackScope:'all'})" title="Create a custom activity">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span>Create activity</span>
        </button>
        <div class="browse-count"><strong>${items.length}</strong> of ${ACTIVITIES.length + (state.customActivities?.length || 0)}</div>
      </div>

      <div class="gl-list">
        ${items.length === 0
          ? `<div class="gl-empty">No activities match these filters.</div>`
          : items.map(activityLine).join('')}
      </div>
    </div>
  `;

  // Wire filters
  document.getElementById('act-search').addEventListener('input', e => {
    f.search = e.target.value;
    _rerenderActivitiesPreservingFocus();
  });
  document.getElementById('act-track').addEventListener('change', e => { f.track = e.target.value; renderActivities(); });
  document.getElementById('act-diff').addEventListener('change',  e => { f.difficulty = e.target.value; renderActivities(); });
}

function _rerenderActivitiesPreservingFocus() {
  renderActivities();
  const el = document.getElementById('act-search');
  if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
}

function activityLine(a) {
  const track = TRACKS.find(t => t.id === a.track);
  const diffClass = `diff-${a.difficulty}`;
  return `
    <div class="gl ${diffClass} ${a.custom ? 'gl-custom' : ''}">
      <button type="button" class="gl-summary" onclick="toggleGl(this)" aria-expanded="false">
        <span class="gl-emoji">${a.emoji || '•'}</span>
        <div class="gl-body">
          <div class="gl-title">${escapeHtml(a.title)}${a.custom ? ' <span class="custom-tag">custom</span>' : ''}</div>
          <div class="gl-meta">
            <span class="gl-track">${track ? track.icon + ' ' + track.name : ''}</span>
            <span class="gl-dot">·</span>
            <span>${a.timeEstimate} min</span>
            <span class="gl-dot">·</span>
            <span class="diff-pill ${diffClass}">${_difficultyStars(a.difficulty)} ${a.difficulty}</span>
          </div>
        </div>
        <span class="gl-arrow" aria-hidden="true">▾</span>
      </button>
      <div class="gl-detail-wrap">
        <div class="gl-detail">
          <p class="gl-summary-text">${escapeHtml(a.description)}</p>
          ${a.detailedInstructions ? `
            <div class="gl-section">
              <h4>How to run it</h4>
              <p>${escapeHtml(a.detailedInstructions)}</p>
            </div>` : ''}
          ${a.deliverable ? `
            <div class="gl-section">
              <h4>Deliverable</h4>
              <p>${escapeHtml(a.deliverable)}</p>
            </div>` : ''}
          <div class="gl-fields">
            <div class="gl-field"><span class="gl-field-label">Track</span><span class="gl-field-value">${track ? track.icon + ' ' + track.name : a.track}</span></div>
            <div class="gl-field"><span class="gl-field-label">Difficulty</span><span class="gl-field-value">${_difficultyStars(a.difficulty)} ${a.difficulty}</span></div>
            <div class="gl-field"><span class="gl-field-label">Time</span><span class="gl-field-value">${a.timeEstimate} min</span></div>
            ${a.tools && a.tools.length ? `<div class="gl-field"><span class="gl-field-label">Tools</span><span class="gl-field-value">${a.tools.join(', ')}</span></div>` : ''}
          </div>
          ${(a.skillsBuilt && a.skillsBuilt.length) ? `
            <div class="gl-tags">
              <span class="gl-tags-label">Skills built</span>
              ${a.skillsBuilt.map(s => `<span class="gl-tag">${escapeHtml(s)}</span>`).join('')}
            </div>` : ''}
          ${(a.tags && a.tags.length) ? `
            <div class="gl-tags">
              <span class="gl-tags-label">Tags</span>
              ${a.tags.map(s => `<span class="gl-tag muted">${escapeHtml(s)}</span>`).join('')}
            </div>` : ''}
          <div class="gl-actions">
            ${a.custom ? `<button type="button" class="gl-remove" onclick="event.stopPropagation(); removeCustomActivity('${a.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              Remove activity
            </button>` : ''}
            <span class="gl-id">${a.id}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Smooth open/close — toggles .open on the parent .gl
function toggleGl(btn) {
  const gl = btn.closest('.gl');
  if (!gl) return;
  const isOpen = gl.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// ── Learnings browse ─────────────────────────────────────
function openLearnings() {
  showPage('learnings');
  renderLearnings();
}

function getFilteredLearnings() {
  const f = _browseState.learnings;
  let items = CATALOG.slice();
  if (f.track !== 'all') items = items.filter(c => c.track === f.track);
  if (f.cost !== 'all') items = items.filter(c => c.cost === f.cost);
  if (f.type !== 'all') items = items.filter(c => c.type === f.type);
  if (f.search.trim()) {
    const q = f.search.toLowerCase();
    items = items.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.instructor||'').toLowerCase().includes(q) ||
      (c.provider||'').toLowerCase().includes(q) ||
      (c.skills||[]).some(s => s.toLowerCase().includes(q))
    );
  }
  return items;
}

function _learningDurationLabel(mins) {
  if (!mins) return 'Self-paced';
  if (mins < 60) return mins + ' min';
  const hrs = mins / 60;
  if (hrs < 10) return hrs.toFixed(hrs % 1 === 0 ? 0 : 1) + ' hr';
  return Math.round(hrs) + ' hr';
}

function _costLabel(cost) {
  return ({
    'free':                 'Free',
    'included-li-learning': 'LinkedIn Learning',
    'paid':                 'Paid',
    'trial-available':      'Trial available'
  })[cost] || cost;
}

function renderLearnings() {
  const root = document.getElementById('learnings-root');
  if (!root) return;
  const f = _browseState.learnings;
  const items = getFilteredLearnings();

  const typeOpts = ['<option value="all">All types</option>']
    .concat(Object.entries(CATALOG_TYPES).map(([k,v]) => `<option value="${k}" ${f.type===k?'selected':''}>${v}</option>`))
    .join('');

  root.innerHTML = `
    <section class="section-hero">
      <div class="wrap">
        <div>
          <div class="sh-eyebrow bracket">[ 02 · Learnings ]</div>
          <h1 class="sh-title">External <span class="accent">learning resources</span>.</h1>
          <p class="sh-sub">Click any line to expand. Vetted from LinkedIn Learning, DeepLearning.AI, Anthropic, OpenAI, IBM, NVIDIA and more.</p>
        </div>
        <div class="sh-meta"><b>${CATALOG.length}</b>resources</div>
      </div>
    </section>

    <div class="wrap" style="padding-top: 32px; padding-bottom: 80px;">
      <div class="browse-filters">
        <input id="lrn-search" class="browse-search" placeholder="Search title, instructor, provider, or skill…" value="${escapeHtml(f.search)}">
        <select id="lrn-track" class="browse-select">${_trackOpts(f.track)}</select>
        <select id="lrn-type"  class="browse-select">${typeOpts}</select>
        <select id="lrn-cost"  class="browse-select">
          <option value="all" ${f.cost==='all'?'selected':''}>Any cost</option>
          <option value="free" ${f.cost==='free'?'selected':''}>Free</option>
          <option value="included-li-learning" ${f.cost==='included-li-learning'?'selected':''}>LinkedIn Learning</option>
          <option value="trial-available" ${f.cost==='trial-available'?'selected':''}>Trial</option>
          <option value="paid" ${f.cost==='paid'?'selected':''}>Paid</option>
        </select>
        <div class="browse-count"><strong>${items.length}</strong> of ${CATALOG.length}</div>
      </div>

      <div class="gl-list">
        ${items.length === 0
          ? `<div class="gl-empty">No learnings match these filters.</div>`
          : items.map(learningLine).join('')}
      </div>
    </div>
  `;

  document.getElementById('lrn-search').addEventListener('input', e => {
    f.search = e.target.value;
    _rerenderLearningsPreservingFocus();
  });
  document.getElementById('lrn-track').addEventListener('change', e => { f.track = e.target.value; renderLearnings(); });
  document.getElementById('lrn-type').addEventListener('change',  e => { f.type  = e.target.value; renderLearnings(); });
  document.getElementById('lrn-cost').addEventListener('change',  e => { f.cost  = e.target.value; renderLearnings(); });
}

function _rerenderLearningsPreservingFocus() {
  renderLearnings();
  const el = document.getElementById('lrn-search');
  if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
}

function learningLine(c) {
  const track = TRACKS.find(t => t.id === c.track);
  const typeLabel = (typeof CATALOG_TYPES !== 'undefined' ? CATALOG_TYPES[c.type] : c.type) || c.type;
  return `
    <div class="gl">
      <button type="button" class="gl-summary" onclick="toggleGl(this)" aria-expanded="false">
        <span class="gl-emoji">${track ? track.icon : '•'}</span>
        <div class="gl-body">
          <div class="gl-title">${escapeHtml(c.title)}</div>
          <div class="gl-meta">
            <span>${escapeHtml(c.provider || '')}</span>
            <span class="gl-dot">·</span>
            <span>${typeLabel}</span>
            <span class="gl-dot">·</span>
            <span>${_learningDurationLabel(c.duration)}</span>
            <span class="gl-cost gl-cost-${c.cost}">${_costLabel(c.cost)}</span>
          </div>
        </div>
        <span class="gl-arrow" aria-hidden="true">▾</span>
      </button>
      <div class="gl-detail-wrap">
        <div class="gl-detail">
          <p class="gl-summary-text">${escapeHtml(c.description)}</p>
          <div class="gl-fields">
            ${c.instructor ? `<div class="gl-field"><span class="gl-field-label">Instructor</span><span class="gl-field-value">${escapeHtml(c.instructor)}</span></div>` : ''}
            <div class="gl-field"><span class="gl-field-label">Provider</span><span class="gl-field-value">${escapeHtml(c.provider || '')}</span></div>
            <div class="gl-field"><span class="gl-field-label">Type</span><span class="gl-field-value">${typeLabel}</span></div>
            <div class="gl-field"><span class="gl-field-label">Duration</span><span class="gl-field-value">${_learningDurationLabel(c.duration)}</span></div>
            <div class="gl-field"><span class="gl-field-label">Difficulty</span><span class="gl-field-value">${_difficultyStars(c.difficulty)} ${c.difficulty}</span></div>
            <div class="gl-field"><span class="gl-field-label">Track</span><span class="gl-field-value">${track ? track.icon + ' ' + track.name : c.track}</span></div>
            <div class="gl-field"><span class="gl-field-label">Cost</span><span class="gl-field-value">${_costLabel(c.cost)}</span></div>
          </div>
          ${(c.skills && c.skills.length) ? `
            <div class="gl-tags">
              <span class="gl-tags-label">Skills</span>
              ${c.skills.map(s => `<span class="gl-tag">${escapeHtml(s)}</span>`).join('')}
            </div>` : ''}
          <div class="gl-actions">
            ${c.url ? `<a class="btn small primary" href="${c.url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Open resource ↗</a>` : ''}
            <span class="gl-id">${c.id}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
