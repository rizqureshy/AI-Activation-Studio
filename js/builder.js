// ─── Step navigation ─────────────────────────────────────
function goToStep(n) {
  if (!canAdvanceTo(n)) return;
  state.step = n;
  renderStep();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function nextStep() { goToStep(state.step + 1); }
function prevStep() { if (state.step > 1) goToStep(state.step - 1); }

function canAdvanceTo(n) {
  if (n <= state.step) return true;
  if (n >= 2 && (!state.program.name || !state.program.format)) {
    toast('Add a program name and pick a format first.');
    return false;
  }
  if (n >= 3 && selectedTracks().length === 0) {
    toast('Pick at least one track.');
    return false;
  }
  if (n >= 4 && state.schedule.length === 0) {
    toast('Add at least one activity to your schedule.');
    return false;
  }
  return true;
}

function selectedTracks() {
  return Object.keys(state.tracks).filter(id => state.tracks[id]?.selected);
}

function renderStep() {
  document.getElementById('page-landing').classList.remove('active');
  document.getElementById('page-builder').classList.add('active');
  renderProgress();
  document.querySelectorAll('.step-pane').forEach(p => p.classList.remove('active'));
  document.getElementById('pane-' + state.step).classList.add('active');
  if (state.step === 1) renderStep1();
  if (state.step === 2) renderStep2();
  if (state.step === 3) renderStep3();
  if (state.step === 4) renderStep4();
  if (state.step === 5) renderStep5();
  saveState();
}

function renderProgress() {
  const labels = ['Setup', 'Tracks', 'Curate', 'Preview', 'Export'];
  const root = document.getElementById('wizard-progress');
  root.innerHTML = labels.map((l, i) => {
    const n = i + 1;
    const cls = n === state.step ? 'active' : n < state.step ? 'done' : '';
    const sep = n < labels.length ? '<div class="wp-bar"></div>' : '';
    return `<div class="wp-step ${cls}" onclick="goToStep(${n})">
      <div class="wp-circle"><span>${n}</span></div>
      <div class="wp-label">${l}</div>
    </div>${sep}`;
  }).join('');
}

// ─── Step intro data (editorial header) ─────────────────
const STEP_INTRO = {
  1: { eyebrow: 'Step 01 / 05',  title: 'Let\'s start with <em>the basics</em>.', sub: 'A name, an audience, a format. We\'ll tailor everything else around what you tell us.', metaN: '30s', metaL: 'to fill in' },
  2: { eyebrow: 'Step 02 / 05',  title: 'Pick your <em>tracks</em>.',              sub: 'These are the skill areas your team is going to build. We\'ve flagged the most relevant for you.', metaN: '1m',  metaL: 'to choose' },
  3: { eyebrow: 'Step 03 / 05',  title: 'Curate the <em>activities</em>.',         sub: 'Hand-pick from the library, or one-click auto-fill. Drag to reorder. Add custom ones too.', metaN: '2m',  metaL: 'or less' },
  4: { eyebrow: 'Step 04 / 05',  title: 'Here\'s what your <em>team will see</em>.', sub: 'A live preview of the program you just built. Looking good? Move to export.', metaN: '90%', metaL: 'done' },
  5: { eyebrow: 'Step 05 / 05',  title: '<em>Ship it.</em>',                       sub: 'Export in whatever shape your team needs. Then prep the launch.', metaN: '✓',   metaL: 'ready' }
};

function stepIntroHTML(n) {
  const i = STEP_INTRO[n] || {};
  // Convert old <em> markers to <span class="accent">
  const title = (i.title || '').replace(/<em>/g, '<span class="accent">').replace(/<\/em>/g, '</span>');
  return `
    <div class="step-h">
      <div>
        <div class="step-h-eyebrow bracket">[ ${(i.eyebrow || '').replace(' / ', ' · ')} ]</div>
        <h2 class="step-h-title">${title}</h2>
        <p class="step-h-sub">${i.sub}</p>
      </div>
      <div class="step-h-meta"><b>${i.metaN}</b>${i.metaL}</div>
    </div>
  `;
}

// Format suggestions based on (basic heuristics)
const FORMAT_TAGS = {
  'workshop':         { tag: null,         hint: 'Best when you have everyone in one room.' },
  'weekly-sprint':    { tag: 'Quick win',  hint: 'Great for a focused first taste of AI.' },
  'monthly-marathon': { tag: 'Most popular', hint: 'The AI April model. Builds real habits.' },
  'lunch-learn':      { tag: null,         hint: 'Low commitment, high reach. Good for big teams.' },
  'self-paced':       { tag: null,         hint: 'For async teams across time zones.' },
  'hackathon':        { tag: null,         hint: 'High-energy, team-based. Plan for outcomes.' },
  'certification':    { tag: null,         hint: 'When learners need formal validation.' },
  'custom':           { tag: null,         hint: 'Build your own shape.' }
};

// ─── Step 1: Setup ───────────────────────────────────────
function renderStep1() {
  const pane = document.getElementById('pane-1');
  // Suggest a default program name if empty
  const suggestedName = state.program.name || (typeof suggestProgramName === 'function' ? suggestProgramName() : '');
  pane.innerHTML = `
    ${stepIntroHTML(1)}

    <div class="tip">
      <div class="tip-emoji">💡</div>
      <div>
        <div class="tip-title">A name to get you started</div>
        <div class="tip-desc">We\'ll suggest <b>${escapeHtml(suggestedName)}</b> if you don\'t pick one. You can rename anytime.</div>
      </div>
    </div>

    <div class="form-grid">
      <div class="field">
        <label>Program name</label>
        <input id="f-name" placeholder="${escapeHtml(suggestedName)}" value="${escapeHtml(state.program.name)}">
      </div>
      <div class="field">
        <label>Team / audience <span class="field-hint">helps us suggest tracks</span></label>
        <input id="f-audience" placeholder="e.g. Customer Service Org" value="${escapeHtml(state.program.audience)}">
      </div>
      <div class="field">
        <label>Trainer name</label>
        <input id="f-trainer" placeholder="Your name" value="${escapeHtml(state.program.trainer)}">
      </div>
      <div class="field">
        <label>Start date</label>
        <input id="f-date" type="date" value="${state.program.startDate}">
      </div>
    </div>

    <h3 class="subhead">Pick a delivery format</h3>
    <p class="subhead-sub">We've highlighted the one most teams pick. You can change later.</p>
    <div class="format-grid" id="format-grid">
      ${FORMATS.map(f => {
        const meta = FORMAT_TAGS[f.id] || {};
        return `
        <div class="format-card ${state.program.format === f.id ? 'selected' : ''}" data-id="${f.id}">
          ${meta.tag ? `<div class="fc-tag">${meta.tag}</div>` : ''}
          <div class="fc-title">${f.name}</div>
          <div class="fc-meta">${f.duration} · ${f.activityCount} activities</div>
          <div class="fc-hint">${meta.hint || ''}</div>
        </div>
      `;}).join('')}
    </div>

    <div class="wizard-footer">
      <button class="btn ghost" onclick="showPage('landing')">← Home</button>
      <button class="btn" onclick="nextStep()">Continue →</button>
    </div>
  `;
  ['name','audience','trainer','date'].forEach(k => {
    document.getElementById('f-' + k).addEventListener('input', e => {
      const map = { name:'name', audience:'audience', trainer:'trainer', date:'startDate' };
      state.program[map[k]] = e.target.value;
      saveState();
    });
  });
  document.querySelectorAll('#format-grid .format-card').forEach(c => {
    c.addEventListener('click', () => {
      state.program.format = c.dataset.id;
      document.querySelectorAll('#format-grid .format-card').forEach(x => x.classList.remove('selected'));
      c.classList.add('selected');
    });
  });
}

// Recommended tracks for a given audience (simple keyword matching)
const TRACK_RECS = [
  { match: ['sales','revenue','bd','account','seller'], tracks: ['prompt-engineering','content-generation','customer-intelligence','presentation'] },
  { match: ['customer success','support','cs','cx','service','helpdesk'], tracks: ['prompt-engineering','content-generation','customer-intelligence'] },
  { match: ['marketing','comms','communication','brand','content'], tracks: ['prompt-engineering','content-generation','visual-creation','customer-intelligence'] },
  { match: ['data','analyst','analytics','finance','ops','operation'], tracks: ['prompt-engineering','data-analysis','process-automation','content-generation'] },
  { match: ['insight','reporting','report','bi','business intelligence','dashboard'], tracks: ['prompt-engineering','data-analysis','presentation','content-generation'] },
  { match: ['transformation','change','change management','transform','adoption','enablement program','pmo'], tracks: ['prompt-engineering','research-strategy','presentation','learning-design','content-generation'] },
  { match: ['hr','people','talent','l&d','learning','enablement'], tracks: ['prompt-engineering','content-generation','learning-design','process-automation'] },
  { match: ['leader','executive','exec','vp','director','c-suite'], tracks: ['prompt-engineering','research-strategy','presentation','content-generation'] }
];

function recommendedTracks() {
  const audience = (state.program.audience || '').toLowerCase();
  if (!audience) {
    // Generic default: the four most-broadly-useful
    return ['prompt-engineering','content-generation','data-analysis','application-building'];
  }
  for (const rule of TRACK_RECS) {
    if (rule.match.some(k => audience.includes(k))) return rule.tracks;
  }
  return ['prompt-engineering','content-generation','data-analysis'];
}

// ─── Step 2: Tracks ──────────────────────────────────────
function renderStep2() {
  const pane = document.getElementById('pane-2');
  const recs = new Set(recommendedTracks());
  const audience = state.program.audience;
  pane.innerHTML = `
    ${stepIntroHTML(2)}

    <div class="tip">
      <div class="tip-emoji">💡</div>
      <div style="flex:1; min-width:0;">
        <div class="tip-title">Recommended for ${audience ? '<b>' + escapeHtml(audience) + '</b>' : 'most teams'}</div>
        <div class="tip-desc">We've flagged ${recs.size} tracks that pair well together. Click "Apply suggestions" to add them all, or pick your own.</div>
      </div>
      <button class="btn small" onclick="applyRecommendedTracks()">Apply suggestions</button>
    </div>

    <div class="track-list" id="track-list">
      ${TRACKS.map(t => {
        const sel = state.tracks[t.id]?.selected;
        const diff = state.tracks[t.id]?.difficulty || 'mixed';
        const isRec = recs.has(t.id);
        return `
          <div class="track-row ${sel ? 'selected' : ''} ${isRec ? 'recommended' : ''}" data-id="${t.id}">
            <div class="track-check">${sel ? '✓' : ''}</div>
            <div class="track-icon">${t.icon}</div>
            <div class="track-body">
              <div class="track-name">${t.name} ${isRec ? '<span class="rec-tag">Recommended</span>' : ''}</div>
              <div class="track-desc">${t.desc}</div>
            </div>
            <select class="track-difficulty" data-id="${t.id}">
              <option value="mixed" ${diff==='mixed'?'selected':''}>Mixed</option>
              <option value="beginner" ${diff==='beginner'?'selected':''}>Beginner</option>
              <option value="intermediate" ${diff==='intermediate'?'selected':''}>Intermediate</option>
              <option value="advanced" ${diff==='advanced'?'selected':''}>Advanced</option>
            </select>
          </div>
        `;
      }).join('')}
    </div>

    <div class="selection-bar" id="track-summary"></div>

    <div class="wizard-footer">
      <button class="btn ghost" onclick="prevStep()">← Back</button>
      <button class="btn" onclick="nextStep()">Continue →</button>
    </div>
  `;
  document.querySelectorAll('#track-list .track-row').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.tagName === 'SELECT') return;
      const id = row.dataset.id;
      if (state.tracks[id]?.selected) {
        state.tracks[id].selected = false;
      } else {
        if (selectedTracks().length >= 5) {
          toast('You can pick at most 5 tracks.');
          return;
        }
        state.tracks[id] = { selected: true, difficulty: state.tracks[id]?.difficulty || 'mixed' };
      }
      renderStep2();
    });
  });
  document.querySelectorAll('.track-difficulty').forEach(sel => {
    sel.addEventListener('change', e => {
      const id = e.target.dataset.id;
      if (!state.tracks[id]) state.tracks[id] = { selected: true };
      state.tracks[id].difficulty = e.target.value;
    });
  });
  updateTrackSummary();
}

function updateTrackSummary() {
  const sel = selectedTracks();
  const available = filteredActivities();
  const el = document.getElementById('track-summary');
  if (!el) return;
  el.innerHTML = `
    <span>${sel.length} track${sel.length===1?'':'s'} selected · ~${available.length} activities available</span>
    <span style="color:var(--text-muted)">Min 1 · Max 5</span>
  `;
}

function filteredActivities() {
  const sel = selectedTracks();
  if (sel.length === 0) return [];
  return allActivities().filter(a => {
    if (!sel.includes(a.track)) return false;
    const trackDiff = state.tracks[a.track]?.difficulty || 'mixed';
    if (trackDiff !== 'mixed' && a.difficulty !== trackDiff) return false;
    return true;
  });
}

function applyRecommendedTracks() {
  const recs = recommendedTracks();
  recs.forEach(id => {
    if (selectedTracks().length >= 5) return;
    if (!state.tracks[id]?.selected) {
      state.tracks[id] = { selected: true, difficulty: state.tracks[id]?.difficulty || 'mixed' };
    }
  });
  saveState();
  renderStep2();
  toast(`Added ${recs.length} recommended tracks.`);
}

// ─── Step 3: Curate ──────────────────────────────────────
function renderStep3() {
  const format = FORMATS.find(f => f.id === state.program.format);
  const pane = document.getElementById('pane-3');
  const target = format.activityCount;
  const filled = state.schedule.length;
  const percent = Math.min(100, Math.round((filled / target) * 100));
  pane.innerHTML = `
    ${stepIntroHTML(3)}

    <div class="tip">
      <div class="tip-emoji">✨</div>
      <div style="flex:1; min-width:0;">
        <div class="tip-title">Skip ahead — let us pick for you</div>
        <div class="tip-desc">Auto-fill places ${target} activities, balanced across your tracks with difficulty ramped easy → hard. Edit anything after.</div>
      </div>
      <button class="btn small" onclick="autoFill()">Auto-fill ${target} activities</button>
    </div>

    <div class="curate-status">
      <div class="cs-meta">
        <span class="cs-count"><b>${filled}</b> / ${target} scheduled</span>
        <span class="cs-tip">Click <b>+</b> to add · Click an activity for details · Drag to reorder</span>
      </div>
      <div class="cs-bar"><div class="cs-bar-fill" style="width:${percent}%"></div></div>
    </div>

    <div style="display:flex; gap:8px; margin-bottom:20px; align-items:center; flex-wrap:wrap;">
      <button class="btn small ghost" onclick="openCustomActivityModal()">+ Add custom activity</button>
      <button class="btn small ghost" onclick="clearSchedule()">Clear schedule</button>
    </div>

    <div class="curate-grid">
      <div class="curate-col">
        <div class="curate-col-head">
          <h4>Activity library</h4>
          <span style="font-size:12px; color:var(--text-muted)" id="lib-count"></span>
        </div>
        <div class="curate-filters" id="diff-filters">
          ${['all','beginner','intermediate','advanced'].map(d => `
            <button class="chip ${state.filters.difficulty===d?'active':''}" data-diff="${d}">${d[0].toUpperCase()+d.slice(1)}</button>
          `).join('')}
        </div>
        <div class="curate-filters" id="track-filters">
          <button class="chip ${state.filters.track==='all'?'active':''}" data-trk="all">All tracks</button>
          ${selectedTracks().map(id => {
            const t = TRACKS.find(x => x.id===id);
            return `<button class="chip ${state.filters.track===id?'active':''}" data-trk="${id}">${t.icon} ${t.name.split(' ')[0]}</button>`;
          }).join('')}
        </div>
        <div class="activity-list" id="activity-list"></div>
      </div>

      <div class="curate-col">
        <div class="curate-col-head">
          <h4>Your schedule</h4>
          <span style="font-size:12px; color:var(--text-muted)">${state.schedule.length} / ${format.activityCount} target</span>
        </div>
        <div class="bulk-required" ${state.schedule.length === 0 ? 'hidden' : ''}>
          <span class="bulk-required-label">Mark all as:</span>
          <button type="button" class="bulk-btn bulk-opt" onclick="markAllSchedule('optional')">Optional</button>
          <button type="button" class="bulk-btn bulk-mand" onclick="markAllSchedule('mandatory')">Mandatory</button>
        </div>
        <div class="schedule-list" id="schedule-list"></div>
      </div>
    </div>

    <div class="curate-summary" id="curate-summary"></div>

    <div class="resources-section" id="resources-section"></div>

    <div class="wizard-footer">
      <button class="btn ghost" onclick="prevStep()">← Back</button>
      <button class="btn" onclick="nextStep()">Continue →</button>
    </div>
  `;
  document.querySelectorAll('#diff-filters .chip').forEach(c => {
    c.addEventListener('click', () => { state.filters.difficulty = c.dataset.diff; renderStep3(); });
  });
  document.querySelectorAll('#track-filters .chip').forEach(c => {
    c.addEventListener('click', () => { state.filters.track = c.dataset.trk; renderStep3(); });
  });
  renderActivityList();
  renderSchedule();
  renderCurateSummary();
  renderResourcesSection();
}

function renderActivityList() {
  const list = document.getElementById('activity-list');
  const scheduled = new Set(state.schedule.map(s => s.activityId));
  let acts = filteredActivities();
  if (state.filters.difficulty !== 'all') acts = acts.filter(a => a.difficulty === state.filters.difficulty);
  if (state.filters.track !== 'all') acts = acts.filter(a => a.track === state.filters.track);
  document.getElementById('lib-count').textContent = `${acts.length} available`;
  list.innerHTML = acts.map(a => `
    <div class="activity-item diff-${a.difficulty} ${scheduled.has(a.id)?'in-schedule':''}" data-id="${a.id}">
      <div class="activity-emoji">${a.emoji}</div>
      <div class="activity-body">
        <div class="activity-title">${a.title}</div>
        <div class="activity-meta">
          <span class="diff-stars diff-${a.difficulty}">${diffStars(a.difficulty)}</span>
          · ${a.timeEstimate}m · ${trackName(a.track)}
        </div>
      </div>
      <button class="activity-add" data-id="${a.id}" ${scheduled.has(a.id)?'disabled':''}>+</button>
    </div>
  `).join('') || '<div style="color:var(--text-muted); padding:20px; text-align:center;">No activities match these filters.</div>';
  list.querySelectorAll('.activity-add').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); addToSchedule(btn.dataset.id); });
  });
  list.querySelectorAll('.activity-item').forEach(item => {
    item.addEventListener('click', () => showActivityModal(item.dataset.id));
  });
}

function renderSchedule() {
  const list = document.getElementById('schedule-list');
  const format = FORMATS.find(f => f.id === state.program.format);
  const slots = generateSlots(format);
  list.innerHTML = slots.map((slot, i) => {
    const item = state.schedule[i];
    if (item) {
      const a = findActivity(item.activityId);
      if (!a) return '';
      const req = item.required === 'mandatory' ? 'mandatory' : 'optional';
      const reqLabel = req === 'mandatory' ? 'Mandatory' : 'Optional';
      return `
        <div class="schedule-slot filled diff-${a.difficulty} req-${req}" draggable="true" data-i="${i}">
          <div class="drag-handle" title="Drag to reorder">⋮⋮</div>
          <div class="slot-day">${slot.label}</div>
          <div class="slot-content">
            <span style="font-size:18px">${a.emoji}</span>
            <div style="flex:1; min-width:0">
              <div style="font-size:14px; font-weight:600;">${a.title}${a.custom ? ' <span class="custom-tag">custom</span>' : ''}</div>
              <div style="font-size:12px; color:var(--text-muted)"><span class="diff-stars diff-${a.difficulty}">${diffStars(a.difficulty)}</span> · ${a.timeEstimate}m · ${trackName(a.track)}</div>
            </div>
          </div>
          <button type="button" class="req-toggle req-${req}" data-i="${i}" title="Toggle required state" onclick="event.stopPropagation(); toggleSlotRequired(${i})">
            <span class="req-dot"></span>${reqLabel}
          </button>
          <button class="slot-remove" data-i="${i}" title="Remove">×</button>
        </div>
      `;
    }
    return `<div class="schedule-slot empty" data-drop-i="${i}"><div class="slot-day">${slot.label}</div><div class="slot-content">empty slot</div></div>`;
  }).join('');
  list.querySelectorAll('.slot-remove').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); state.schedule.splice(+btn.dataset.i, 1); renderStep3(); });
  });
  attachScheduleDnd(list);
}

// Drag-and-drop reordering within the schedule
let dragFromIndex = null;
function attachScheduleDnd(list) {
  list.querySelectorAll('.schedule-slot.filled').forEach(el => {
    el.addEventListener('dragstart', e => {
      dragFromIndex = +el.dataset.i;
      el.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      // Required for Firefox to fire drag events
      try { e.dataTransfer.setData('text/plain', String(dragFromIndex)); } catch (_) {}
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      list.querySelectorAll('.schedule-slot').forEach(s => s.classList.remove('drag-over'));
      dragFromIndex = null;
    });
    el.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      el.classList.add('drag-over');
    });
    el.addEventListener('dragleave', () => el.classList.remove('drag-over'));
    el.addEventListener('drop', e => {
      e.preventDefault();
      el.classList.remove('drag-over');
      const to = +el.dataset.i;
      if (dragFromIndex === null || dragFromIndex === to) return;
      const [moved] = state.schedule.splice(dragFromIndex, 1);
      state.schedule.splice(to, 0, moved);
      renderStep3();
    });
  });
}

function generateSlots(format) {
  const slots = [];
  for (let w = 1; w <= format.schedule.weeks; w++) {
    for (let d = 0; d < format.schedule.daysPerWeek; d++) {
      for (let s = 0; s < format.schedule.slotsPerDay; s++) {
        const dayName = format.schedule.daysPerWeek <= 5 ? DAY_NAMES[d] : `Day ${d+1}`;
        const wkPart = format.schedule.weeks > 1 ? `Wk ${w} · ` : '';
        const slotPart = format.schedule.slotsPerDay > 1 ? ` · Slot ${s+1}` : '';
        slots.push({ week: w, day: d, idx: s, label: `${wkPart}${dayName}${slotPart}` });
      }
    }
  }
  return slots;
}

function addToSchedule(id) {
  const format = FORMATS.find(f => f.id === state.program.format);
  const max = format.activityCount;
  if (state.schedule.length >= max) {
    toast(`Schedule is full (${max} slots). Remove one to add another.`);
    return;
  }
  if (state.schedule.find(s => s.activityId === id)) {
    toast('Already in schedule.');
    return;
  }
  state.schedule.push({ activityId: id, required: 'optional' });
  renderStep3();
}

function clearSchedule() {
  state.schedule = [];
  renderStep3();
}

// ─── Optional / Mandatory ────────────────────────────────
// Every schedule entry carries a `required` field: 'optional' | 'mandatory'.
// Default is 'optional' to match the playbook's "start small, build momentum".
// Legacy entries without the field are treated as 'optional' here.
function toggleSlotRequired(i) {
  const slot = state.schedule[i];
  if (!slot) return;
  slot.required = (slot.required === 'mandatory') ? 'optional' : 'mandatory';
  saveState();
  renderStep3();
}
function markAllSchedule(level) {
  if (level !== 'optional' && level !== 'mandatory') return;
  if (state.schedule.length === 0) { toast('Schedule is empty.'); return; }
  state.schedule = state.schedule.map(s => ({ ...s, required: level }));
  saveState();
  renderStep3();
  const word = level === 'mandatory' ? 'mandatory' : 'optional';
  toast(`All ${state.schedule.length} activities marked ${word}.`);
}

function autoFill() {
  const format = FORMATS.find(f => f.id === state.program.format);
  const target = format.activityCount;
  const sel = selectedTracks();
  if (sel.length === 0) { toast('Pick tracks first.'); return; }
  state.schedule = [];

  const all = filteredActivities();
  const byDiff = { beginner: [], intermediate: [], advanced: [] };
  all.forEach(a => byDiff[a.difficulty]?.push(a));
  Object.values(byDiff).forEach(arr => arr.sort(() => Math.random() - 0.5));

  const counts = {
    beginner: Math.round(target * format.mix.beginner),
    intermediate: Math.round(target * format.mix.intermediate),
    advanced: target - Math.round(target * format.mix.beginner) - Math.round(target * format.mix.intermediate)
  };

  const picks = [];
  ['beginner','intermediate','advanced'].forEach(d => {
    for (let i = 0; i < counts[d] && byDiff[d].length; i++) {
      picks.push(byDiff[d].shift());
    }
  });
  // Fill remainder if any track ran out
  while (picks.length < target && all.length > picks.length) {
    const remaining = all.filter(a => !picks.find(p => p.id === a.id));
    if (!remaining.length) break;
    picks.push(remaining[0]);
  }
  // Round-robin across tracks for coverage
  const byTrack = {};
  picks.forEach(a => { (byTrack[a.track] ||= []).push(a); });
  const interleaved = [];
  let added = true;
  while (added) {
    added = false;
    sel.forEach(t => {
      if (byTrack[t]?.length) { interleaved.push(byTrack[t].shift()); added = true; }
    });
  }
  // Ramp easier → harder
  const diffOrder = { beginner: 0, intermediate: 1, advanced: 2 };
  interleaved.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);

  state.schedule = interleaved.slice(0, target).map(a => ({ activityId: a.id, required: 'optional' }));
  renderStep3();
  toast(`Auto-filled ${state.schedule.length} activities.`);
}

function renderCurateSummary() {
  const root = document.getElementById('curate-summary');
  const tracksCovered = new Set(state.schedule.map(s => findActivity(s.activityId)?.track)).size;
  const totalMins = state.schedule.reduce((s, x) => s + (findActivity(x.activityId)?.timeEstimate || 0), 0);
  const hrs = (totalMins / 60).toFixed(1);
  root.innerHTML = `
    <div class="summary-tile"><div class="st-n">${state.schedule.length}</div><div class="st-l">Activities</div></div>
    <div class="summary-tile"><div class="st-n">${hrs}</div><div class="st-l">Total hours</div></div>
    <div class="summary-tile"><div class="st-n">${tracksCovered}</div><div class="st-l">Tracks covered</div></div>
    <div class="summary-tile"><div class="st-n">${selectedTracks().length}</div><div class="st-l">Tracks selected</div></div>
  `;
}

// ─── Activity modal ─────────────────────────────────────
function showActivityModal(id) {
  const a = findActivity(id);
  if (!a) return;
  const t = TRACKS.find(x => x.id === a.track);
  const m = document.getElementById('activity-modal');
  m.innerHTML = `
    <div class="modal">
      <button class="modal-close" onclick="closeModal()">×</button>
      <div class="modal-emoji">${a.emoji}</div>
      <h3>${a.title}</h3>
      <div class="modal-meta">
        <span>${t.icon} ${t.name}</span>
        <span>${diffStars(a.difficulty)} ${a.difficulty}</span>
        <span>⏱ ${a.timeEstimate} min</span>
      </div>
      <p>${a.description}</p>
      <h4>How to run it</h4>
      <p>${a.detailedInstructions}</p>
      <h4>Deliverable</h4>
      <p>${a.deliverable}</p>
      <h4>Skills built</h4>
      <div class="tag-row">${(a.skillsBuilt||[]).map(s => `<span class="tag">${s}</span>`).join('')}</div>
      <h4>Tools</h4>
      <div class="tag-row">${(a.tools||['any']).map(s => `<span class="tag">${s}</span>`).join('')}</div>
    </div>
  `;
  m.classList.add('open');
}
function closeModal() {
  document.getElementById('activity-modal').classList.remove('open');
}

function diffStars(d) { return d === 'advanced' ? '★★★' : d === 'intermediate' ? '★★' : '★'; }
function trackName(id) { return TRACKS.find(t => t.id === id)?.name || id; }

// ─── Custom activity creation ────────────────────────────
// Curated emoji set — matches the visual style of the built-in catalog.
const CUSTOM_EMOJIS = [
  '💬','✉️','📞','📢','📣','🗣️','💭','✨',
  '🧠','💡','🔍','🧐','🤔','🪄','🔮','🧪',
  '🎨','🖌️','✏️','🖼️','📐','📝','🪪','📋',
  '🎭','🎤','🎬','🎪','🎸','🎵','🎟️','📸',
  '🏗️','🛠️','🧰','🧩','⚡','🚀','🪛','🔧',
  '📊','📈','📉','🗃️','🔢','🧮','🗂️','💾',
  '💻','🖥️','🤖','📟','📡','🛰️','⚙️','🔌',
  '🎯','🧭','🗺️','🏆','💎','🌟','🔥','🎁'
];

// Open the form. opts.trackScope = 'selected' restricts the track
// dropdown to the program's selected tracks (in-builder context);
// 'all' shows all 12 tracks (Activities-browse context).
function openCustomActivityModal(opts) {
  opts = opts || {};
  const scope = opts.trackScope || 'selected';
  let trackOptions;
  if (scope === 'selected') {
    const sel = selectedTracks();
    if (sel.length === 0) { toast('Pick at least one track first.'); return; }
    trackOptions = sel.map(id => { const t = TRACKS.find(x => x.id === id); return `<option value="${id}">${t.icon} ${t.name}</option>`; }).join('');
  } else {
    trackOptions = TRACKS.map(t => `<option value="${t.id}">${t.icon} ${t.name}</option>`).join('');
  }

  const m = document.getElementById('activity-modal');
  m.innerHTML = `
    <div class="modal modal-wide ca-modal">
      <button class="modal-close" onclick="closeModal()">×</button>

      <div class="ca-head">
        <div class="bracket muted">[ Custom activity · matches catalog format ]</div>
        <h3>Create your own activity</h3>
        <p class="ca-sub">Fill the form below. The activity will appear alongside the 108 built-ins, ready to add to any program.</p>
      </div>

      <div class="ca-preview" id="ca-preview" aria-hidden="true">
        <div class="ca-preview-icon" id="ca-preview-icon">✨</div>
        <div class="ca-preview-body">
          <div class="ca-preview-title" id="ca-preview-title">Your activity title</div>
          <div class="ca-preview-meta">
            <span id="ca-preview-track" class="ca-preview-track">Track</span>
            <span class="gl-dot">·</span>
            <span id="ca-preview-time">15 min</span>
            <span class="gl-dot">·</span>
            <span id="ca-preview-pill" class="diff-pill diff-intermediate">★★ intermediate</span>
          </div>
        </div>
      </div>

      <div class="ca-section">
        <label class="ca-label" for="ca-title">Title</label>
        <input id="ca-title" class="ca-input" placeholder="e.g. Customer Email Sprint" maxlength="60">
        <div class="ca-hint">Short and active. 60 char max.</div>
      </div>

      <div class="ca-section">
        <label class="ca-label">Pick an icon</label>
        <div class="ca-emoji-grid" id="ca-emoji-grid"></div>
        <div class="ca-hint">Or type a custom emoji: <input id="ca-emoji" class="ca-emoji-custom" placeholder="✨" maxlength="4"></div>
      </div>

      <div class="ca-row-2">
        <div class="ca-section">
          <label class="ca-label" for="ca-track">Track</label>
          <select id="ca-track" class="ca-input">${trackOptions}</select>
        </div>
        <div class="ca-section">
          <label class="ca-label">Difficulty</label>
          <div class="ca-diff" id="ca-diff-group">
            <button type="button" class="ca-diff-opt diff-beginner"     data-d="beginner">★ Beginner</button>
            <button type="button" class="ca-diff-opt diff-intermediate selected" data-d="intermediate">★★ Intermediate</button>
            <button type="button" class="ca-diff-opt diff-advanced"     data-d="advanced">★★★ Advanced</button>
          </div>
          <input type="hidden" id="ca-diff" value="intermediate">
        </div>
      </div>

      <div class="ca-section">
        <label class="ca-label" for="ca-time">Time estimate</label>
        <div class="ca-time-row">
          <input id="ca-time" class="ca-input ca-time-input" type="number" min="5" max="180" step="5" value="15">
          <span class="ca-time-unit">minutes</span>
          <div class="ca-time-chips">
            ${[5,10,15,20,30,45,60].map(m => `<button type="button" class="ca-time-chip" data-t="${m}">${m}m</button>`).join('')}
          </div>
        </div>
      </div>

      <div class="ca-section">
        <label class="ca-label" for="ca-desc">Description</label>
        <textarea id="ca-desc" class="ca-input ca-textarea" rows="2" placeholder="One or two sentences. What will learners do, and what's the point?"></textarea>
      </div>

      <div class="ca-section">
        <label class="ca-label" for="ca-inst">How to run it</label>
        <textarea id="ca-inst" class="ca-input ca-textarea" rows="3" placeholder="Step-by-step instructions. The learner should be able to follow this without further explanation."></textarea>
        <div class="ca-hint">Optional but recommended — keeps the catalog format consistent.</div>
      </div>

      <div class="ca-section">
        <label class="ca-label" for="ca-deliv">Deliverable</label>
        <input id="ca-deliv" class="ca-input" placeholder="What learners post or share when done.">
        <div class="ca-hint">Optional. E.g. "Post your output in the team channel with a 1-line takeaway."</div>
      </div>

      <div class="ca-row-2">
        <div class="ca-section">
          <label class="ca-label" for="ca-tools">Tools</label>
          <input id="ca-tools" class="ca-input" placeholder="any, ChatGPT, Claude, Gemini, …" value="any">
          <div class="ca-hint">Comma-separated. Use "any" if it works with any LLM.</div>
        </div>
        <div class="ca-section">
          <label class="ca-label" for="ca-skills">Skills built</label>
          <input id="ca-skills" class="ca-input" placeholder="prompt-clarity, iteration, …">
          <div class="ca-hint">Comma-separated short tags.</div>
        </div>
      </div>

      <div class="ca-section">
        <label class="ca-label" for="ca-tags">Tags</label>
        <input id="ca-tags" class="ca-input" placeholder="warm-up, playful, day-1-friendly, …">
        <div class="ca-hint">Optional. Helps with search and filtering.</div>
      </div>

      <div class="ca-footer">
        <button class="btn ghost small" onclick="closeModal()">Cancel</button>
        <button class="btn small primary" onclick="saveCustomActivity()">
          <span>Save activity</span>
          <span class="arrow">→</span>
        </button>
      </div>
    </div>
  `;
  m.classList.add('open');

  // Build emoji grid
  const grid = document.getElementById('ca-emoji-grid');
  grid.innerHTML = CUSTOM_EMOJIS.map((e, i) =>
    `<button type="button" class="ca-emoji ${i === 7 ? 'selected' : ''}" data-e="${e}">${e}</button>`
  ).join('');
  // Default selected emoji ✨ is index 7
  const emojiHidden = document.getElementById('ca-emoji');
  emojiHidden.value = '✨';

  // Wire emoji grid clicks
  grid.querySelectorAll('.ca-emoji').forEach(btn => {
    btn.addEventListener('click', () => {
      grid.querySelectorAll('.ca-emoji').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      emojiHidden.value = btn.dataset.e;
      _updateCaPreview();
    });
  });
  // Custom emoji input also updates preview & deselects grid
  emojiHidden.addEventListener('input', () => {
    grid.querySelectorAll('.ca-emoji').forEach(b => b.classList.remove('selected'));
    _updateCaPreview();
  });

  // Wire difficulty buttons
  document.querySelectorAll('.ca-diff-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ca-diff-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      document.getElementById('ca-diff').value = btn.dataset.d;
      _updateCaPreview();
    });
  });

  // Wire time quick chips
  document.querySelectorAll('.ca-time-chip').forEach(c => {
    c.addEventListener('click', () => {
      document.getElementById('ca-time').value = c.dataset.t;
      _updateCaPreview();
    });
  });

  // Live preview wiring
  ['ca-title','ca-track','ca-time'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', _updateCaPreview);
    document.getElementById(id)?.addEventListener('change', _updateCaPreview);
  });

  _updateCaPreview();
  setTimeout(() => document.getElementById('ca-title')?.focus(), 60);
}

function _updateCaPreview() {
  const title = document.getElementById('ca-title')?.value.trim() || 'Your activity title';
  const emoji = document.getElementById('ca-emoji')?.value.trim() || '✨';
  const trackId = document.getElementById('ca-track')?.value;
  const diff = document.getElementById('ca-diff')?.value || 'intermediate';
  const time = +document.getElementById('ca-time')?.value || 15;
  const track = TRACKS.find(t => t.id === trackId);
  const stars = diff === 'advanced' ? '★★★' : diff === 'intermediate' ? '★★' : '★';
  const tEl = document.getElementById('ca-preview-title'); if (tEl) tEl.textContent = title;
  const iEl = document.getElementById('ca-preview-icon'); if (iEl) iEl.textContent = emoji;
  const trEl = document.getElementById('ca-preview-track'); if (trEl) trEl.textContent = track ? `${track.icon} ${track.name}` : '';
  const tmEl = document.getElementById('ca-preview-time'); if (tmEl) tmEl.textContent = `${time} min`;
  const pEl = document.getElementById('ca-preview-pill');
  if (pEl) { pEl.className = `diff-pill diff-${diff}`; pEl.textContent = `${stars} ${diff}`; }
}

// ─── Program-level resources (catalog items) ─────────────
function renderResourcesSection() {
  const root = document.getElementById('resources-section');
  if (!root || typeof CATALOG === 'undefined') return;
  const sel = selectedTracks();
  const suggestionCount = CATALOG.filter(c => sel.includes(c.track)).length;
  root.innerHTML = `
    <div class="resources-head">
      <div>
        <h3 class="resources-title">Learning resources</h3>
        <p class="resources-sub">Pin videos, courses, or labs from the catalog. They'll be included with the program.${suggestionCount ? ' <strong>' + suggestionCount + '</strong> match your tracks.' : ''}</p>
      </div>
      <button class="btn small" onclick="openResourcePicker()">+ Add resources</button>
    </div>
    ${state.resources.length === 0
      ? `<div class="resources-empty">No resources pinned yet. Optional — but they give learners a clear path into each track.</div>`
      : `<div class="resources-grid">${state.resources.map(resourceCard).join('')}</div>`
    }
  `;
}

function resourceCard(id) {
  const c = findCatalogItem(id);
  if (!c) return '';
  const t = TRACKS.find(x => x.id === c.track);
  const typeLabel = (typeof CATALOG_TYPES !== 'undefined' ? CATALOG_TYPES[c.type] : c.type) || c.type;
  return `
    <div class="res-card">
      <div class="res-card-top">
        <span class="res-track">${t ? t.icon + ' ' + t.name.split(' ')[0] : ''}</span>
        <span class="res-cost res-cost-${c.cost}">${costLabel(c.cost)}</span>
        <button class="res-remove" onclick="removeResource('${c.id}')" title="Remove">×</button>
      </div>
      <div class="res-title">${escapeHtml(c.title)}</div>
      <div class="res-meta">${escapeHtml(c.provider)}${c.instructor ? ' · ' + escapeHtml(c.instructor) : ''} · ${typeLabel} · ${formatDuration(c.duration)}</div>
    </div>
  `;
}

function removeResource(id) {
  state.resources = state.resources.filter(r => r !== id);
  renderResourcesSection();
  saveState();
}

let pickerFilters = { track: 'auto', difficulty: 'all', source: 'all', search: '' };

function openResourcePicker() {
  if (typeof CATALOG === 'undefined') { toast('Catalog not loaded.'); return; }
  pickerFilters = { track: 'auto', difficulty: 'all', source: 'all', search: '' };
  renderResourcePicker();
}

function renderResourcePicker() {
  const m = document.getElementById('activity-modal');
  const sel = selectedTracks();
  const trackOpts = [`<option value="auto" ${pickerFilters.track==='auto'?'selected':''}>My tracks</option>`,
                     `<option value="all" ${pickerFilters.track==='all'?'selected':''}>All tracks</option>`]
    .concat(TRACKS.map(t => `<option value="${t.id}" ${pickerFilters.track===t.id?'selected':''}>${t.icon} ${t.name}</option>`))
    .join('');
  const sourceOpts = [`<option value="all">All sources</option>`]
    .concat(Object.entries(CATALOG_SOURCES).map(([k,v]) => `<option value="${k}" ${pickerFilters.source===k?'selected':''}>${v.name}</option>`))
    .join('');

  let items = CATALOG.slice();
  if (pickerFilters.track === 'auto') items = items.filter(c => sel.includes(c.track));
  else if (pickerFilters.track !== 'all') items = items.filter(c => c.track === pickerFilters.track);
  if (pickerFilters.difficulty !== 'all') items = items.filter(c => c.difficulty === pickerFilters.difficulty);
  if (pickerFilters.source !== 'all') items = items.filter(c => c.source === pickerFilters.source);
  if (pickerFilters.search.trim()) {
    const q = pickerFilters.search.toLowerCase();
    items = items.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q) ||
      c.provider.toLowerCase().includes(q)
    );
  }
  items.sort((a,b) => (b.featured?1:0) - (a.featured?1:0));

  m.innerHTML = `
    <div class="modal modal-wide">
      <button class="modal-close" onclick="closeModal()">×</button>
      <h3 style="margin-bottom: 4px;">Add learning resources</h3>
      <p style="font-size:14px; color:var(--text-muted); margin-bottom:20px;">Pick from the catalog. ${state.resources.length} pinned so far.</p>

      <div class="picker-filters">
        <input id="pf-search" placeholder="Search…" value="${escapeHtml(pickerFilters.search)}" autofocus>
        <select id="pf-track">${trackOpts}</select>
        <select id="pf-difficulty">
          <option value="all" ${pickerFilters.difficulty==='all'?'selected':''}>Any level</option>
          <option value="beginner" ${pickerFilters.difficulty==='beginner'?'selected':''}>Beginner</option>
          <option value="intermediate" ${pickerFilters.difficulty==='intermediate'?'selected':''}>Intermediate</option>
          <option value="advanced" ${pickerFilters.difficulty==='advanced'?'selected':''}>Advanced</option>
        </select>
        <select id="pf-source">${sourceOpts}</select>
      </div>

      <div class="picker-count">${items.length} result${items.length===1?'':'s'}</div>

      <div class="picker-list">
        ${items.length === 0
          ? '<div style="padding:32px; text-align:center; color:var(--text-muted)">No items match. Try widening the filters.</div>'
          : items.map(c => pickerRow(c)).join('')}
      </div>

      <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:20px;">
        <button class="btn small" onclick="closeModal()">Done</button>
      </div>
    </div>
  `;
  m.classList.add('open');
  document.getElementById('pf-search').addEventListener('input', e => { pickerFilters.search = e.target.value; renderResourcePicker(); });
  ['track','difficulty','source'].forEach(k => {
    document.getElementById('pf-'+k).addEventListener('change', e => { pickerFilters[k] = e.target.value; renderResourcePicker(); });
  });
}

function pickerRow(c) {
  const added = state.resources.includes(c.id);
  const t = TRACKS.find(x => x.id === c.track);
  const typeLabel = CATALOG_TYPES[c.type] || c.type;
  return `
    <div class="picker-row ${added?'added':''}">
      <div style="flex:1; min-width:0;">
        <div class="picker-row-top">
          <span class="picker-track">${t ? t.icon + ' ' + t.name.split(' ')[0] : ''}</span>
          ${c.featured ? '<span class="cat-featured">Featured</span>' : ''}
          <span class="cat-cost cat-cost-${c.cost}">${costLabel(c.cost)}</span>
        </div>
        <div class="picker-title">${escapeHtml(c.title)}</div>
        <div class="picker-meta">${escapeHtml(c.provider)}${c.instructor?' · '+escapeHtml(c.instructor):''} · ${typeLabel} · ${formatDuration(c.duration)} · ${c.difficulty}</div>
      </div>
      <button class="picker-add ${added?'added':''}" onclick="toggleResource('${c.id}')">${added?'✓ Added':'+ Add'}</button>
    </div>
  `;
}

function toggleResource(id) {
  if (state.resources.includes(id)) {
    state.resources = state.resources.filter(r => r !== id);
  } else {
    state.resources.push(id);
  }
  saveState();
  renderResourcePicker();
  renderResourcesSection();
}

function _splitTags(s) {
  return (s || '').split(',').map(t => t.trim().toLowerCase().replace(/\s+/g, '-')).filter(Boolean);
}

// Remove a custom activity from the user's library.
// Also strips any program-schedule entries pointing at it, so we
// don't leave dangling activityId references that would render as
// blanks on Step 3 / preview.
function removeCustomActivity(id) {
  if (!id || !id.startsWith('CUSTOM-')) return;
  const a = (state.customActivities || []).find(x => x.id === id);
  if (!a) return;
  if (!confirm(`Remove "${a.title}"? This deletes it from your library and from any open program schedule.`)) return;
  state.customActivities = state.customActivities.filter(x => x.id !== id);
  const before = state.schedule.length;
  state.schedule = state.schedule.filter(s => s.activityId !== id);
  saveState();
  toast(`Removed "${a.title}".${state.schedule.length < before ? ' Also removed from schedule.' : ''}`);
  // Re-render whichever surface we're currently on
  const onBuilder = document.getElementById('page-builder')?.classList.contains('active');
  const onActivities = document.getElementById('page-activities')?.classList.contains('active');
  if (onBuilder && typeof renderStep3 === 'function') renderStep3();
  if (onActivities && typeof renderActivities === 'function') renderActivities();
}

function saveCustomActivity() {
  const title = document.getElementById('ca-title').value.trim();
  if (!title) { toast('Add a title.'); return; }
  const desc = document.getElementById('ca-desc').value.trim();
  if (!desc) { toast('Add a description.'); return; }
  const time = Math.max(5, Math.min(180, +document.getElementById('ca-time').value || 25));
  const tagsList = _splitTags(document.getElementById('ca-tags')?.value);
  const a = {
    id: 'CUSTOM-' + Date.now(),
    track: document.getElementById('ca-track').value,
    title,
    emoji: document.getElementById('ca-emoji').value.trim() || '✨',
    difficulty: document.getElementById('ca-diff').value,
    timeEstimate: time,
    description: desc,
    detailedInstructions: document.getElementById('ca-inst').value.trim() || desc,
    tools: _splitTags(document.getElementById('ca-tools')?.value) || ['any'],
    deliverable: document.getElementById('ca-deliv').value.trim() || 'Share your work in the team channel.',
    skillsBuilt: _splitTags(document.getElementById('ca-skills')?.value),
    tags: tagsList.includes('custom') ? tagsList : ['custom', ...tagsList],
    custom: true
  };
  if (!a.tools.length) a.tools = ['any'];
  state.customActivities.push(a);

  // Behaviour depends on where the user opened the form from.
  // If we're in the builder (page-builder is active), try to slot it into the schedule.
  // If we're in the Activities-browse context, just save and re-render the list.
  const onBuilder = document.getElementById('page-builder')?.classList.contains('active');
  if (onBuilder) {
    const format = FORMATS.find(f => f.id === state.program.format);
    if (format && state.schedule.length < format.activityCount) {
      state.schedule.push({ activityId: a.id, required: 'optional' });
      toast('Custom activity saved and added to schedule.');
    } else {
      toast('Saved to your library.');
    }
    closeModal();
    renderStep3();
  } else {
    toast('Saved to your library.');
    closeModal();
    // Re-render the activities browse so the new entry appears
    if (typeof renderActivities === 'function' &&
        document.getElementById('page-activities')?.classList.contains('active')) {
      renderActivities();
    }
  }
  saveState();
}
