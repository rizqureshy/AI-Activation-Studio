// ─── Preferences flow ────────────────────────────────────
// "Build My AI Program" path:
// Q1 Focus area → Q2 Team size → Q3 Time commitment → Q4 Skill level
// → Q5 Goal → MODE PICK (Build First vs Design First)
// → either drops user into a fully-populated builder, or shows the
//   designed structure first for confirmation, then populates.

const PREF_QS = [
  {
    id: 'focus',
    label: 'Q1 / 5',
    title: "What does your team mostly do?",
    sub: "We'll pick tracks that match their day-to-day.",
    options: [
      { v: 'sales',          label: 'Sales',                          sub: 'BD, AEs, sellers' },
      { v: 'cs',             label: 'Customer Success',               sub: 'Support, CX, ops' },
      { v: 'marketing',      label: 'Marketing',                      sub: 'Brand, content, comms' },
      { v: 'data',           label: 'Data / Ops',                     sub: 'Analysts, finance, ops' },
      { v: 'insights',       label: 'Insights & Reporting',           sub: 'Analytics, BI, reporting' },
      { v: 'transformation', label: 'Transformation & Change Mgmt',   sub: 'Change leads, PMO, enablement' },
      { v: 'leaders',        label: 'Leaders',                        sub: 'Execs, directors, VPs' },
      { v: 'mixed',          label: 'Mixed team',                     sub: 'Cross-functional' }
    ]
  },
  {
    id: 'size',
    label: 'Q2 / 5',
    title: "How big is the team?",
    sub: "Bigger groups need different rhythms.",
    options: [
      { v: 'xs',  label: '1–10',    sub: 'Tight team' },
      { v: 's',   label: '10–50',   sub: 'Department' },
      { v: 'm',   label: '50–200',  sub: 'Business unit' },
      { v: 'l',   label: '200+',    sub: 'Whole org' }
    ]
  },
  {
    id: 'time',
    label: 'Q3 / 5',
    title: "How much time can they commit per week?",
    sub: "Be honest — overcommitting kills programs.",
    options: [
      { v: 'light',    label: '< 1 hour',  sub: 'Lunch and learn' },
      { v: 'modest',   label: '1–3 hours', sub: 'Steady pace' },
      { v: 'serious',  label: '3–6 hours', sub: 'Real investment' },
      { v: 'intense',  label: 'Full day',  sub: 'Workshop / offsite' }
    ]
  },
  {
    id: 'skill',
    label: 'Q4 / 5',
    title: "What's their starting AI skill level?",
    sub: "We'll ramp difficulty to match.",
    options: [
      { v: 'beginner',     label: 'Beginners',     sub: 'New to AI' },
      { v: 'mixed',        label: 'Mixed',         sub: 'Some experience' },
      { v: 'intermediate', label: 'Intermediate',  sub: 'Used AI before' },
      { v: 'advanced',     label: 'Advanced',      sub: 'Power users' }
    ]
  },
  {
    id: 'goal',
    label: 'Q5 / 5',
    title: "What's the primary goal?",
    sub: "Shapes the activity mix.",
    options: [
      { v: 'fundamentals', label: 'Learn fundamentals', sub: 'Build literacy' },
      { v: 'habit',        label: 'Build a habit',      sub: 'Daily AI use' },
      { v: 'ship',         label: 'Ship outcomes',      sub: 'Real workflows' },
      { v: 'certify',      label: 'Get certified',      sub: 'Formal proof' }
    ]
  }
];

let prefAnswers = {};
let prefStep = 0; // 0–4 questions, 5 = mode pick

function openPreferences() {
  prefAnswers = {};
  prefStep = 0;
  document.getElementById('prefs-modal').classList.add('open');
  renderPreferences();
}
function closePreferences() {
  document.getElementById('prefs-modal').classList.remove('open');
}

function renderPreferences() {
  const modal = document.getElementById('prefs-modal');
  if (prefStep < PREF_QS.length) {
    const q = PREF_QS[prefStep];
    const selected = prefAnswers[q.id];
    modal.innerHTML = `
      <div class="modal modal-wide">
        <button class="modal-close" onclick="closePreferences()" aria-label="Close">×</button>
        <div class="bracket" style="margin-bottom:14px">[ Build My AI Program · ${q.label} ]</div>
        <h3>${q.title}</h3>
        <p style="color:var(--text-muted); margin-bottom:24px; font-size:15px;">${q.sub}</p>

        <div class="prefs-options">
          ${q.options.map(o => `
            <button class="prefs-opt ${selected === o.v ? 'selected' : ''}" data-v="${o.v}">
              ${o.label}
              ${o.sub ? `<span class="prefs-opt-sub">${o.sub}</span>` : ''}
            </button>
          `).join('')}
        </div>

        <div class="wizard-footer" style="margin-top:32px; padding-top:20px;">
          <button class="btn ghost" ${prefStep === 0 ? 'disabled' : `onclick="prefBack()"`}>← Back</button>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted); letter-spacing:0.1em; text-transform:uppercase;">
            ${prefStep + 1} of ${PREF_QS.length + 1}
          </div>
          <button class="btn primary" id="prefNextBtn" ${selected ? '' : 'disabled'} onclick="prefNext()">
            ${prefStep === PREF_QS.length - 1 ? 'Continue' : 'Next'} <span class="arrow">→</span>
          </button>
        </div>
      </div>
    `;
    // Wire option clicks
    modal.querySelectorAll('.prefs-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        prefAnswers[q.id] = btn.dataset.v;
        // Visual feedback
        modal.querySelectorAll('.prefs-opt').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('prefNextBtn').disabled = false;
      });
    });
  } else {
    // MODE PICK
    const previewSummary = derivePreviewSummary(prefAnswers);
    modal.innerHTML = `
      <div class="modal modal-wide">
        <button class="modal-close" onclick="closePreferences()" aria-label="Close">×</button>
        <div class="bracket" style="margin-bottom:14px">[ Build My AI Program · How should we proceed? ]</div>
        <h3>Choose your build mode.</h3>
        <p style="color:var(--text-muted); margin-bottom:8px; font-size:15px;">
          Based on your answers, we recommend a <b style="color:var(--text)">${previewSummary.formatName}</b> with <b style="color:var(--text)">${previewSummary.trackCount} tracks</b> and <b style="color:var(--text)">${previewSummary.activityCount} activities</b>.
        </p>

        <div class="mode-grid">

          <button class="mode-card" onclick="commitPreferences('build-first')">
            <div class="mode-icon">⚡</div>
            <div class="mode-title">Build First, Edit Later</div>
            <div class="mode-sub">We populate everything immediately. You land in the builder with a fully-loaded program — tweak any piece from there.</div>
          </button>

          <button class="mode-card" onclick="commitPreferences('design-first')">
            <div class="mode-icon">📐</div>
            <div class="mode-title">Design First, Build Later</div>
            <div class="mode-sub">We show you the proposed structure (format, tracks, schedule shape) first. You confirm or adjust, then we populate activities.</div>
          </button>

        </div>

        <div class="wizard-footer" style="margin-top:24px; padding-top:20px;">
          <button class="btn ghost" onclick="prefBack()">← Back to questions</button>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted); letter-spacing:0.1em; text-transform:uppercase;">Final step</div>
          <span></span>
        </div>
      </div>
    `;
  }
}

function prefNext() {
  const q = PREF_QS[prefStep];
  if (!prefAnswers[q.id]) return;
  prefStep++;
  renderPreferences();
}
function prefBack() {
  if (prefStep > 0) { prefStep--; renderPreferences(); }
}

// ─── Map answers → format + tracks + difficulty ──────────
function derivePreferences(a) {
  // Format from time commitment + size
  let format = 'monthly-marathon';
  if (a.time === 'light')   format = 'lunch-learn';
  else if (a.time === 'modest') format = a.size === 'l' ? 'self-paced' : 'monthly-marathon';
  else if (a.time === 'serious') format = a.goal === 'ship' ? 'weekly-sprint' : 'monthly-marathon';
  else if (a.time === 'intense') format = a.goal === 'ship' ? 'hackathon' : 'workshop';
  if (a.goal === 'certify') format = 'certification';

  // Tracks from focus area
  const trackMap = {
    sales:          ['prompt-engineering','content-generation','customer-intelligence','presentation'],
    cs:             ['prompt-engineering','content-generation','customer-intelligence','process-automation'],
    marketing:      ['prompt-engineering','content-generation','visual-creation','customer-intelligence'],
    data:           ['prompt-engineering','data-analysis','process-automation','content-generation'],
    insights:       ['prompt-engineering','data-analysis','presentation','content-generation'],
    transformation: ['prompt-engineering','research-strategy','presentation','learning-design','content-generation'],
    leaders:        ['prompt-engineering','research-strategy','presentation','content-generation'],
    mixed:          ['prompt-engineering','content-generation','data-analysis','application-building']
  };
  const tracks = trackMap[a.focus] || trackMap.mixed;

  // Difficulty from skill level
  const diffMap = { beginner: 'beginner', mixed: 'mixed', intermediate: 'intermediate', advanced: 'advanced' };
  const difficulty = diffMap[a.skill] || 'mixed';

  return { format, tracks, difficulty };
}

function derivePreviewSummary(a) {
  const p = derivePreferences(a);
  const fmt = FORMATS.find(f => f.id === p.format) || FORMATS[0];
  return {
    formatName: fmt.name,
    trackCount: p.tracks.length,
    activityCount: fmt.activityCount
  };
}

// ─── Commit preferences and route to mode ────────────────
function commitPreferences(mode) {
  resetState();
  const prefs = derivePreferences(prefAnswers);
  const fmt = FORMATS.find(f => f.id === prefs.format) || FORMATS[0];

  // Seed program meta
  state.program.name = suggestProgramName();
  state.program.format = prefs.format;
  state.preferences = { ...prefAnswers, mode };

  // Seed tracks (cap at 5)
  prefs.tracks.slice(0, 5).forEach(id => {
    state.tracks[id] = { selected: true, difficulty: prefs.difficulty };
  });

  saveState();
  closePreferences();

  if (mode === 'build-first') {
    // Populate activities immediately, land at preview
    state.step = 3;
    showPage('builder');
    renderStep();
    setTimeout(() => {
      if (typeof autoFill === 'function') autoFill();
      state.step = 4;
      renderStep();
      toast(`Built ${fmt.name} with ${prefs.tracks.length} tracks. Edit anything you like.`);
    }, 280);
  } else {
    // design-first: show step 1 / 2 for review, no activities filled yet
    state.step = 2;
    showPage('builder');
    renderStep();
    toast(`Structure designed. Review tracks, then move to curate.`);
  }
}

// Make sure the state has a preferences bucket
(function ensurePrefsState(){
  if (typeof state === 'object' && state && !state.preferences) state.preferences = {};
})();
