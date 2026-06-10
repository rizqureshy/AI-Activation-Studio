// ─── Step 4: Preview ─────────────────────────────────────
let previewWeek = 1;

function pickPlaybookTip() {
  const fmt = state.program.format;
  if (fmt === 'monthly-marathon' || fmt === 'weekly-sprint') {
    return { icon: '🎯', title: 'Start small, build momentum',
             body: 'Week 1 activities should take under 5 minutes. Lower the barrier to that first submission — early wins create the habit.' };
  }
  if (fmt === 'workshop' || fmt === 'hackathon') {
    return { icon: '🧑‍💼', title: 'Leaders must participate',
             body: 'The exec opens, the lead participates visibly. When leaders do it, permission is granted for everyone else.' };
  }
  if (fmt === 'lunch-learn' || fmt === 'self-paced') {
    return { icon: '💬', title: 'Comment on everything',
             body: 'Every submission deserves a reaction or comment within 24 hours. Specific feedback beats generic praise — and silence kills programs.' };
  }
  return { icon: '🏆', title: 'Identify champions early',
           body: 'By end of Week 1, you\'ll see who\'s energised. Highlight them publicly, invite them to share — and pre-select your Demo Day presenters.' };
}

function renderStep4() {
  const pane = document.getElementById('pane-4');
  const format = FORMATS.find(f => f.id === state.program.format);
  const totalMins = state.schedule.reduce((s, x) => s + (findActivity(x.activityId)?.timeEstimate || 0), 0);
  const tracksCovered = new Set(state.schedule.map(s => findActivity(s.activityId)?.track)).size;
  const startStr = state.program.startDate ? new Date(state.program.startDate + 'T00:00').toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : '';

  // Playbook tip selected based on format
  const playbookTip = pickPlaybookTip();
  pane.innerHTML = `
    ${typeof stepIntroHTML === 'function' ? stepIntroHTML(4) : ''}

    <div class="tip">
      <div class="tip-emoji">${playbookTip.icon}</div>
      <div style="flex:1; min-width:0;">
        <div class="tip-title">From the Playbook · ${playbookTip.title}</div>
        <div class="tip-desc">${playbookTip.body}</div>
      </div>
      <button class="btn small ghost" onclick="openPlaybook()">See all 9</button>
    </div>

    <div class="preview-frame">
      <div class="preview-hero">
        <div style="font-size:13px; color:var(--accent); font-weight:500; margin-bottom:12px;">${format.name}${startStr ? ' · ' + startStr : ''}</div>
        <h2>${state.program.name || 'Your AI Program'}</h2>
        <p class="ph-sub">${state.program.audience ? `For ${state.program.audience}` : 'A hands-on AI skills program.'} Built with AI Activation Studio.</p>
        <div class="preview-stats">
          <div class="ps"><b>${state.schedule.length}</b>Activities</div>
          <div class="ps"><b>${(totalMins/60).toFixed(1)}h</b>Total time</div>
          <div class="ps"><b>${tracksCovered}</b>Tracks</div>
          <div class="ps"><b>${format.schedule.weeks}</b>Week${format.schedule.weeks===1?'':'s'}</div>
        </div>
      </div>

      ${format.schedule.weeks > 1 ? `
        <div class="preview-week-tabs" id="preview-week-tabs">
          ${Array.from({length: format.schedule.weeks}, (_, i) => `
            <button class="preview-week-tab ${previewWeek===i+1?'active':''}" data-w="${i+1}">Week ${i+1}</button>
          `).join('')}
        </div>
      ` : ''}

      <div class="preview-cards" id="preview-cards"></div>

      ${state.resources.length > 0 ? `
        <div class="preview-resources">
          <h3 class="preview-resources-h">📚 Recommended resources</h3>
          <div class="resources-grid">
            ${state.resources.map(id => {
              const c = findCatalogItem(id);
              if (!c) return '';
              const t = TRACKS.find(x => x.id === c.track);
              const typeLabel = (CATALOG_TYPES[c.type] || c.type);
              return `<div class="res-card">
                <div class="res-card-top">
                  <span class="res-track">${t ? t.icon + ' ' + t.name.split(' ')[0] : ''}</span>
                  <span class="res-cost res-cost-${c.cost}">${costLabel(c.cost)}</span>
                </div>
                <div class="res-title">${c.title}</div>
                <div class="res-meta">${c.provider}${c.instructor?' · '+c.instructor:''} · ${typeLabel} · ${formatDuration(c.duration)}</div>
              </div>`;
            }).join('')}
          </div>
        </div>
      ` : ''}
    </div>

    <div class="wizard-footer">
      <button class="btn ghost" onclick="prevStep()">← Back</button>
      <button class="btn" onclick="nextStep()">Export →</button>
    </div>
  `;

  document.querySelectorAll('.preview-week-tab').forEach(b => {
    b.addEventListener('click', () => { previewWeek = +b.dataset.w; renderStep4(); });
  });
  renderPreviewCards();
}

function renderPreviewCards() {
  const format = FORMATS.find(f => f.id === state.program.format);
  const slots = generateSlots(format);
  const root = document.getElementById('preview-cards');
  const scheduled = state.schedule;
  const cards = scheduled.map((entry, i) => {
    const slot = slots[i];
    if (!slot) return '';
    if (format.schedule.weeks > 1 && slot.week !== previewWeek) return '';
    const a = findActivity(entry.activityId);
    if (!a) return '';
    const req = entry.required === 'mandatory' ? 'mandatory' : 'optional';
    return `
      <div class="preview-card diff-${a.difficulty} req-${req}" data-id="${a.id}">
        <div class="pc-day">${slot.label}</div>
        <div class="pc-emoji">${a.emoji}</div>
        <div class="pc-title">${a.title}</div>
        <div class="pc-desc">${a.description}</div>
        <div class="pc-meta">
          <span class="diff-pill diff-${a.difficulty}">${diffStars(a.difficulty)} ${a.difficulty}</span>
          <span class="req-pill req-${req}"><span class="req-dot"></span>${req === 'mandatory' ? 'Mandatory' : 'Optional'}</span>
          <span>⏱ ${a.timeEstimate} min</span>
          <span>${trackName(a.track)}</span>
        </div>
      </div>
    `;
  }).join('');
  root.innerHTML = cards || '<div style="padding:40px; text-align:center; color:var(--text-muted)">No activities scheduled for this week.</div>';
  root.querySelectorAll('.preview-card').forEach(c => {
    c.addEventListener('click', () => showActivityModal(c.dataset.id));
  });
}
