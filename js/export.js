// ─── Step 5: Export ──────────────────────────────────────
function renderStep5() {
  const pane = document.getElementById('pane-5');
  pane.innerHTML = `
    ${typeof stepIntroHTML === 'function' ? stepIntroHTML(5) : ''}

    <div class="celebration-banner">
      <div class="celeb-emoji">🎉</div>
      <div>
        <div class="celeb-title">Your program is <em style="font-style:italic;color:var(--accent)">built and ready</em>.</div>
        <div class="celeb-sub">Now: save it, ship it, run it. Here\'s your toolkit.</div>
      </div>
    </div>

    ${(function(){
      const loadedId = state.loadedPlanId;
      const loaded = loadedId && typeof _planById === 'function' ? _planById(loadedId) : null;
      const totalSaved = typeof listPlans === 'function' ? listPlans().length : 0;
      const placeholder = state.program.name || (typeof suggestProgramName === 'function' ? suggestProgramName() : 'My AI Program');
      return `
        <div class="save-plan-card">
          <div class="save-plan-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
          </div>
          <div class="save-plan-body">
            <div class="bracket muted">[ ${loaded ? 'Update saved plan' : 'Save your plan'} ]</div>
            <h3 class="save-plan-title">${loaded ? 'Update this plan' : 'Save this plan to your library'}</h3>
            <p class="save-plan-sub">Saved plans can be reloaded any time to edit. They live in your browser — no backend, no account. ${totalSaved ? `You currently have <b>${totalSaved}</b> saved.` : ''}</p>
            <div class="save-plan-form">
              <input id="save-plan-name" class="save-plan-input" placeholder="${escapeHtml(placeholder)}" value="${escapeHtml(state.program.name || (loaded ? loaded.name : ''))}">
              <button class="btn small primary" onclick="savePlanFromStep5()">
                <span>${loaded ? 'Update plan' : 'Save plan'}</span>
                <span class="arrow">→</span>
              </button>
            </div>
            ${loaded ? `<div class="save-plan-loaded">
              <span class="live-dot" style="background: var(--accent); box-shadow: 0 0 8px var(--accent-glow);"></span>
              Currently editing <b>${escapeHtml(loaded.name)}</b> · saved ${new Date(loaded.savedAt).toLocaleDateString()}
            </div>` : ''}
            ${totalSaved ? `<button class="save-plan-link" onclick="openPlansModal()">Open my plans library →</button>` : ''}
          </div>
        </div>
      `;
    })()}

    <h3 class="subhead">Take it <em>home</em>.</h3>
    <p class="subhead-sub">Download in whatever shape your team needs.</p>
    <div class="export-grid">
      <div class="export-card">
        <div class="ec-icon">🌐</div>
        <div class="ec-title">HTML Site</div>
        <div class="ec-desc">Self-contained single page. Drop on GitHub Pages or any host.</div>
        <button class="btn small" onclick="exportHTML()">Download HTML</button>
      </div>
      <div class="export-card">
        <div class="ec-icon">📦</div>
        <div class="ec-title">Full Repo (.zip)</div>
        <div class="ec-desc">Complete folder with README and deploy instructions.</div>
        <button class="btn small" onclick="exportZIP()">Download ZIP</button>
      </div>
      <div class="export-card">
        <div class="ec-icon">📄</div>
        <div class="ec-title">PDF Program Guide</div>
        <div class="ec-desc">Printable curriculum with activity details.</div>
        <button class="btn small" onclick="exportPDF()">Download PDF</button>
      </div>
      <div class="export-card">
        <div class="ec-icon">📊</div>
        <div class="ec-title">PowerPoint Deck</div>
        <div class="ec-desc">Presentation-ready overview for stakeholders.</div>
        <button class="btn small" onclick="exportPPTX()">Download PPTX</button>
      </div>
      <div class="export-card">
        <div class="ec-icon">📋</div>
        <div class="ec-title">JSON Backup</div>
        <div class="ec-desc">Save your program data to load again later.</div>
        <button class="btn small" onclick="exportJSON()">Download JSON</button>
      </div>
    </div>

    <h3 class="subhead">Before you launch — <em>three things to do</em>.</h3>
    <p class="subhead-sub">We've built these to make week-one painless. Ready when you are.</p>
    <div class="post-export-grid">
      <button class="pe-card" onclick="openLaunchKit()">
        <div class="pe-icon">🚀</div>
        <div class="pe-title">Run the Launch Kit</div>
        <div class="pe-desc">7-step pre-launch checklist with progress tracking and the executive kick-off announcement, ready to copy.</div>
        <div class="pe-cta">Open Launch Kit →</div>
      </button>
      <button class="pe-card" onclick="openTemplates()">
        <div class="pe-icon">📋</div>
        <div class="pe-title">Grab your comms templates</div>
        <div class="pe-desc">7 copy-ready messages — channel welcome, daily challenge post, weekly winner, demo day, wrap-up.</div>
        <div class="pe-cta">Open Templates →</div>
      </button>
      <button class="pe-card" onclick="openPlaybook()">
        <div class="pe-icon">📖</div>
        <div class="pe-title">Read the Playbook</div>
        <div class="pe-desc">9 hard-won principles from running an AI challenge month. 10 minutes to read, weeks of wisdom.</div>
        <div class="pe-cta">Open Playbook →</div>
      </button>
    </div>

    <div class="wizard-footer">
      <button class="btn ghost" onclick="prevStep()">← Back to preview</button>
      <button class="btn ghost" onclick="showPage('landing'); window.scrollTo(0,0)">Build another →</button>
    </div>
  `;
}

// ─── Build program payload (used by all exporters) ──────
function buildProgramPayload() {
  const format = FORMATS.find(f => f.id === state.program.format);
  const slots = generateSlots(format);
  const tracksCovered = new Set(state.schedule.map(s => findActivity(s.activityId)?.track)).size;
  const totalMins = state.schedule.reduce((s, x) => s + (findActivity(x.activityId)?.timeEstimate || 0), 0);
  const activities = state.schedule.map((entry, i) => {
    const a = findActivity(entry.activityId);
    const slot = slots[i] || { week: 1, day: 0, idx: 0, label: `Slot ${i+1}` };
    return {
      ...a,
      week: slot.week,
      day: slot.day,
      slotLabel: slot.label,
      trackName: TRACKS.find(t => t.id === a.track)?.name || a.track,
      required: entry.required === 'mandatory' ? 'mandatory' : 'optional'
    };
  });
  const mandatoryCount = activities.filter(a => a.required === 'mandatory').length;
  return {
    id: 'p-' + Date.now(),
    name: state.program.name || 'AI Training Program',
    audience: state.program.audience,
    trainer: state.program.trainer,
    format: format.name,
    formatId: format.id,
    weeks: format.schedule.weeks,
    startDate: state.program.startDate,
    dateStr: state.program.startDate
      ? new Date(state.program.startDate + 'T00:00').toLocaleDateString(undefined, { month:'long', year:'numeric' })
      : '',
    activities,
    totalHours: (totalMins/60).toFixed(1),
    mandatoryCount,
    optionalCount: activities.length - mandatoryCount,
    tracksCovered,
    tracks: selectedTracks().map(id => TRACKS.find(t => t.id === id)),
    resources: (state.resources || [])
      .map(id => findCatalogItem(id))
      .filter(Boolean)
      .map(c => ({
        id: c.id,
        track: c.track,
        trackName: TRACKS.find(t => t.id === c.track)?.name || c.track,
        trackIcon: TRACKS.find(t => t.id === c.track)?.icon || '',
        title: c.title,
        provider: c.provider,
        instructor: c.instructor,
        type: c.type,
        typeLabel: (typeof CATALOG_TYPES !== 'undefined' ? CATALOG_TYPES[c.type] : c.type) || c.type,
        duration: c.duration,
        durationLabel: (c.duration ? (c.duration < 60 ? c.duration + ' min' : (c.duration/60).toFixed(c.duration%60?1:0) + ' hr') : 'Self-paced'),
        difficulty: c.difficulty,
        format: c.format,
        description: c.description,
        cost: c.cost,
        costLabel: ({ 'free':'Free','included-li-learning':'LinkedIn Learning','paid':'Paid','trial-available':'Trial available' })[c.cost] || c.cost,
        url: c.url || null,
        searchHint: c.searchHint || null
      }))
  };
}

function safeFileName(s) {
  return (s || 'program').replace(/[^a-z0-9-_]/gi, '-').replace(/-+/g, '-').toLowerCase().slice(0, 60);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ─── HTML Export ─────────────────────────────────────────
function exportHTML() {
  const payload = buildProgramPayload();
  const html = generateProgramHTML(payload);
  downloadBlob(new Blob([html], { type: 'text/html' }), safeFileName(payload.name) + '.html');
  toast('HTML site downloaded.');
}

// ─── ZIP Export ──────────────────────────────────────────
function exportZIP() {
  if (typeof JSZip === 'undefined') { toast('Loading ZIP library...'); return; }
  const payload = buildProgramPayload();
  const html = generateProgramHTML(payload);
  const readme = generateReadme(payload);
  const zip = new JSZip();
  zip.file('index.html', html);
  zip.file('README.md', readme);
  zip.file('program.json', JSON.stringify(payload, null, 2));
  zip.generateAsync({ type: 'blob' }).then(blob => {
    downloadBlob(blob, safeFileName(payload.name) + '.zip');
    toast('Repo bundle downloaded.');
  });
}

function generateReadme(p) {
  return `# ${p.name}

> A ${p.format} for ${p.audience || 'your team'}, built with AI Activation Studio.

## Quick start

1. Open \`index.html\` in any browser.
2. Or deploy to GitHub Pages:
   - Create a new repo
   - Push these files to the \`main\` branch
   - Enable Pages in repo Settings → Pages
   - Site goes live at \`https://YOUR-USER.github.io/REPO-NAME\`

## What's inside

- **${p.activities.length} activities** across **${p.tracksCovered} tracks**
- **${p.totalHours} hours** of total content
- **${p.weeks} week${p.weeks===1?'':'s'}** of structured learning

## Tracks covered

${p.tracks.map(t => `- ${t.icon} **${t.name}** — ${t.desc}`).join('\n')}

## Activity schedule

${p.activities.map(a => `- **${a.slotLabel}** · ${a.emoji} ${a.title} *(${a.difficulty}, ${a.timeEstimate}m)*`).join('\n')}

${p.resources && p.resources.length ? `## Recommended learning resources

${p.resources.map(r => `- **${r.title}** — ${r.provider}${r.instructor ? ' (' + r.instructor + ')' : ''} · ${r.typeLabel} · ${r.durationLabel} · ${r.difficulty} · ${r.costLabel}\n  - ${r.url}`).join('\n')}

` : ''}## Trainer

${p.trainer || 'Add your name here.'}

---

Generated by AI Activation Studio.
`;
}

// ─── PDF Export ──────────────────────────────────────────
// Themed to match the Studio: deep navy pages, violet accent
// headings, light text. Color-coded difficulty pills.
function exportPDF() {
  if (typeof window.jspdf === 'undefined') { toast('Loading PDF library...'); return; }
  const { jsPDF } = window.jspdf;
  const p = buildProgramPayload();
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const margin = 56;
  let y = margin;

  // Studio palette (RGB)
  const COLOR = {
    bg:       [10, 11, 26],     // #0A0B1A
    surface:  [24, 26, 51],     // #181A33
    text:     [244, 244, 248],  // #F4F4F8
    muted:    [156, 160, 188],  // #9CA0BC
    soft:     [95, 100, 137],   // #5F6489
    accent:   [167, 139, 250],  // #A78BFA  (violet)
    accentDp: [139, 92, 246],   // #8B5CF6
    border:   [47, 50, 96],     // #2F3260
    emerald:  [52, 211, 153],
    amber:    [251, 191, 36],
    pink:     [244, 114, 182]
  };

  // Paint the page background dark navy
  function paintPage() {
    doc.setFillColor(...COLOR.bg);
    doc.rect(0, 0, W, H, 'F');
  }
  function newPageIf(needed) {
    if (y + needed > H - margin - 30) {
      doc.addPage();
      paintPage();
      y = margin;
    }
  }
  function rgb(c) { doc.setTextColor(...c); }
  function fill(c) { doc.setFillColor(...c); }
  function stroke(c) { doc.setDrawColor(...c); }
  function difficultyColor(d) {
    if (d === 'beginner') return COLOR.emerald;
    if (d === 'intermediate') return COLOR.amber;
    return COLOR.pink;
  }
  function diffStars(d) { return d === 'advanced' ? '★★★' : d === 'intermediate' ? '★★' : '★'; }

  paintPage();

  // ── Cover ────────────────────────────────────────────
  // Accent bracket eyebrow
  rgb(COLOR.accent);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  doc.text(`[ ${p.format.toUpperCase()}${p.dateStr ? ' · ' + p.dateStr.toUpperCase() : ''} ]`, margin, y);
  y += 28;

  // Title — bold, large, light
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32); rgb(COLOR.text);
  const titleLines = doc.splitTextToSize(p.name, W - margin * 2);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 36 + 4;

  if (p.audience) {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(14); rgb(COLOR.muted);
    doc.text('For ' + p.audience, margin, y); y += 22;
  }
  y += 12;

  // Accent rule
  stroke(COLOR.accent); doc.setLineWidth(1.5);
  doc.line(margin, y, margin + 64, y);
  y += 28;

  // ── Stats grid ────────────────────────────────────────
  const stats = [
    [p.activities.length,                                                     'Activities'],
    [p.mandatoryCount + '/' + p.activities.length,                            'Mandatory'],
    [p.totalHours + 'h',                                                      'Total time'],
    [p.weeks,                                                                 'Week' + (p.weeks===1?'':'s')]
  ];
  const colW = (W - margin*2) / stats.length;
  stats.forEach((s, i) => {
    const cx = margin + i*colW;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(28); rgb(COLOR.text);
    doc.text(String(s[0]), cx, y);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); rgb(COLOR.muted);
    doc.text(String(s[1]).toUpperCase(), cx, y + 16, { charSpace: 0.6 });
  });
  y += 44;
  stroke(COLOR.border); doc.setLineWidth(0.5);
  doc.line(margin, y, W - margin, y); y += 32;

  // ── Tracks ────────────────────────────────────────────
  rgb(COLOR.accent); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
  doc.text('[ CAPABILITY TRACKS ]', margin, y); y += 20;
  p.tracks.forEach(t => {
    newPageIf(36);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(12); rgb(COLOR.text);
    doc.text(t.name, margin, y);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); rgb(COLOR.muted);
    const descLines = doc.splitTextToSize(t.desc, W - margin*2);
    doc.text(descLines, margin, y + 14);
    y += 14 + descLines.length * 12 + 12;
  });
  y += 16;

  // ── Activities ────────────────────────────────────────
  newPageIf(48);
  rgb(COLOR.accent); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
  doc.text('[ ACTIVITY SCHEDULE ]', margin, y); y += 20;

  p.activities.forEach(a => {
    newPageIf(100);

    // Card surface
    const cardTop = y - 4;
    const cardHeight = 0;  // computed after content

    // Day label in accent
    rgb(COLOR.accent); doc.setFont('helvetica', 'bold'); doc.setFontSize(9);
    doc.text(a.slotLabel.toUpperCase(), margin, y); y += 16;

    // Title
    doc.setFont('helvetica', 'bold'); doc.setFontSize(14); rgb(COLOR.text);
    const tLines = doc.splitTextToSize(a.title, W - margin*2 - 80);
    doc.text(tLines, margin, y); y += tLines.length * 16 + 4;

    // Difficulty pill + Required pill (right-aligned) + time + track on left
    const diffColor = difficultyColor(a.difficulty);
    const diffPillText = `${diffStars(a.difficulty)} ${a.difficulty.toUpperCase()}`;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
    const diffPillW = doc.getTextWidth(diffPillText) + 12;

    const reqLevel = a.required === 'mandatory' ? 'mandatory' : 'optional';
    const reqText = reqLevel.toUpperCase();
    const reqPillW = doc.getTextWidth(reqText) + 12;
    const reqColor = reqLevel === 'mandatory' ? COLOR.accent : COLOR.muted;

    // Required pill first (rightmost)
    fill(reqColor);
    doc.roundedRect(W - margin - reqPillW, y - 18, reqPillW, 14, 7, 7, 'F');
    rgb(COLOR.bg);
    doc.text(reqText, W - margin - reqPillW/2, y - 9, { align: 'center' });

    // Difficulty pill to the left of required
    fill(diffColor);
    doc.roundedRect(W - margin - reqPillW - 6 - diffPillW, y - 18, diffPillW, 14, 7, 7, 'F');
    rgb(COLOR.bg);
    doc.text(diffPillText, W - margin - reqPillW - 6 - diffPillW/2, y - 9, { align: 'center' });

    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); rgb(COLOR.muted);
    doc.text(`${a.timeEstimate} MIN · ${a.trackName.toUpperCase()}`, margin, y, { charSpace: 0.5 });
    y += 14;

    // Description
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); rgb(COLOR.text);
    const descLines = doc.splitTextToSize(a.description, W - margin*2);
    doc.text(descLines, margin, y); y += descLines.length * 13 + 6;

    // Deliverable
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); rgb(COLOR.accent);
    doc.text('DELIVERABLE', margin, y); y += 11;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); rgb(COLOR.muted);
    const delLines = doc.splitTextToSize(a.deliverable, W - margin*2);
    doc.text(delLines, margin, y); y += delLines.length * 12 + 16;

    // Separator
    stroke(COLOR.border); doc.setLineWidth(0.4);
    doc.line(margin, y - 8, W - margin, y - 8);
    y += 6;
  });

  // ── Footer on every page ──────────────────────────────
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    // Footer accent bar
    fill(COLOR.accentDp);
    doc.rect(0, H - 14, W, 14, 'F');
    rgb(COLOR.text); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
    doc.text(p.name, margin, H - 4);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); rgb(COLOR.text);
    doc.text(`${i} / ${pages}`, W/2, H - 4, { align: 'center' });
    doc.text('AI Activation Studio', W - margin, H - 4, { align: 'right' });
  }

  doc.save(safeFileName(p.name) + '.pdf');
  toast('PDF guide downloaded.');
}

// ─── PPTX Export ─────────────────────────────────────────
// Themed to match the Studio: deep navy slides, violet accents,
// light text. Each activity slide carries a colour-coded difficulty.
function exportPPTX() {
  if (typeof PptxGenJS === 'undefined') { toast('Loading PPTX library...'); return; }
  const p = buildProgramPayload();
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';   // 13.33" × 7.5"

  // Studio palette as hex (no #)
  const C = {
    bg:       '0A0B1A',
    surface:  '181A33',
    elev:     '1C1E3D',
    text:     'F4F4F8',
    muted:    '9CA0BC',
    soft:     '5F6489',
    accent:   'A78BFA',
    accentDp: '8B5CF6',
    accentSft:'1E1B45',
    border:   '2F3260',
    emerald:  '34D399',
    amber:    'FBBF24',
    pink:     'F472B6'
  };
  const FONT = 'Inter';
  function diffColor(d) { return d === 'beginner' ? C.emerald : d === 'intermediate' ? C.amber : C.pink; }
  function diffStars(d) { return d === 'advanced' ? '★★★' : d === 'intermediate' ? '★★' : '★'; }

  // Master slide — dark navy background, violet accent bar at top, footer line
  pptx.defineSlideMaster({
    title: 'STUDIO',
    background: { color: C.bg },
    objects: [
      // Top accent strip
      { rect: { x: 0, y: 0, w: 13.33, h: 0.08, fill: { color: C.accent } } },
      // Footer line
      { line: { x: 0.6, y: 7.1, w: 12.13, h: 0, line: { color: C.border, width: 0.5 } } },
      // Footer brand
      { text: {
          text: 'AI Activation Studio',
          options: { x: 0.6, y: 7.15, w: 6, h: 0.25, fontSize: 9, color: C.soft, fontFace: FONT, bold: false }
        }
      }
    ]
  });

  // ── Cover ────────────────────────────────────────────
  let s = pptx.addSlide({ masterName: 'STUDIO' });
  // bracket eyebrow
  s.addText(`[ ${(p.format + (p.dateStr ? ' · ' + p.dateStr : '')).toUpperCase()} ]`, {
    x: 0.6, y: 1.4, w: 12, h: 0.4, fontSize: 12, color: C.accent, fontFace: FONT, bold: true, charSpacing: 2
  });
  // Title
  s.addText(p.name, {
    x: 0.6, y: 1.9, w: 12, h: 2.2, fontSize: 60, color: C.text, fontFace: FONT, bold: true,
    valign: 'top'
  });
  if (p.audience) s.addText('For ' + p.audience, {
    x: 0.6, y: 4.4, w: 12, h: 0.6, fontSize: 20, color: C.muted, fontFace: FONT
  });
  // Big accent rule under title
  s.addShape(pptx.ShapeType.rect, { x: 0.6, y: 4.0, w: 0.8, h: 0.04, fill: { color: C.accent } });

  // ── At a glance ──────────────────────────────────────
  s = pptx.addSlide({ masterName: 'STUDIO' });
  s.addText('[ AT A GLANCE ]', {
    x: 0.6, y: 0.6, w: 12, h: 0.4, fontSize: 11, color: C.accent, fontFace: FONT, bold: true, charSpacing: 2
  });
  s.addText('By the numbers', {
    x: 0.6, y: 1.0, w: 12, h: 0.7, fontSize: 32, color: C.text, fontFace: FONT, bold: true
  });
  const stats = [
    [String(p.activities.length),                              'Activities'],
    [p.mandatoryCount + '/' + p.activities.length,             'Mandatory'],
    [p.totalHours + 'h',                                       'Total time'],
    [String(p.weeks),                                          'Week' + (p.weeks===1?'':'s')]
  ];
  const statW = 2.95, statY = 2.6, statGap = 0.15;
  stats.forEach((st, i) => {
    const x = 0.6 + i * (statW + statGap);
    // Glass card
    s.addShape(pptx.ShapeType.roundRect, {
      x, y: statY, w: statW, h: 2.6,
      fill: { color: C.surface },
      line: { color: C.border, width: 1 },
      rectRadius: 0.12
    });
    // Big number
    s.addText(st[0], {
      x, y: statY + 0.5, w: statW, h: 1.3,
      fontSize: 64, color: C.text, fontFace: FONT, bold: true, align: 'center', valign: 'middle'
    });
    // Label
    s.addText(st[1].toUpperCase(), {
      x, y: statY + 1.85, w: statW, h: 0.4,
      fontSize: 11, color: C.muted, fontFace: FONT, bold: false, align: 'center', charSpacing: 3
    });
  });

  // ── Tracks ───────────────────────────────────────────
  s = pptx.addSlide({ masterName: 'STUDIO' });
  s.addText('[ CAPABILITY TRACKS ]', {
    x: 0.6, y: 0.6, w: 12, h: 0.4, fontSize: 11, color: C.accent, fontFace: FONT, bold: true, charSpacing: 2
  });
  s.addText('What your team will build', {
    x: 0.6, y: 1.0, w: 12, h: 0.7, fontSize: 32, color: C.text, fontFace: FONT, bold: true
  });

  // Track tiles, up to 4-across
  const tracksPerRow = 2;
  const trackW = 6.05, trackH = 1.05, trackGap = 0.15;
  p.tracks.slice(0, 6).forEach((t, i) => {
    const col = i % tracksPerRow, row = Math.floor(i / tracksPerRow);
    const tx = 0.6 + col * (trackW + trackGap);
    const ty = 2.2 + row * (trackH + trackGap);
    s.addShape(pptx.ShapeType.roundRect, {
      x: tx, y: ty, w: trackW, h: trackH,
      fill: { color: C.surface },
      line: { color: C.border, width: 1 },
      rectRadius: 0.10
    });
    s.addText(t.name, {
      x: tx + 0.25, y: ty + 0.15, w: trackW - 0.5, h: 0.4,
      fontSize: 16, color: C.text, fontFace: FONT, bold: true
    });
    s.addText(t.desc, {
      x: tx + 0.25, y: ty + 0.55, w: trackW - 0.5, h: 0.45,
      fontSize: 11, color: C.muted, fontFace: FONT
    });
  });

  // ── One slide per week (or single 'Schedule' if 1 week) ──
  for (let w = 1; w <= p.weeks; w++) {
    const acts = p.activities.filter(a => a.week === w);
    if (!acts.length) continue;
    s = pptx.addSlide({ masterName: 'STUDIO' });
    s.addText(p.weeks > 1 ? `[ WEEK ${String(w).padStart(2,'0')} ]` : '[ SCHEDULE ]', {
      x: 0.6, y: 0.6, w: 12, h: 0.4, fontSize: 11, color: C.accent, fontFace: FONT, bold: true, charSpacing: 2
    });
    s.addText(p.weeks > 1 ? `Week ${w}` : 'Schedule', {
      x: 0.6, y: 1.0, w: 12, h: 0.7, fontSize: 32, color: C.text, fontFace: FONT, bold: true
    });

    // Studio-styled table
    const headerOpts = { bold: true, color: C.accent, fontFace: FONT, fill: { color: C.elev }, valign: 'middle' };
    const rows = [
      [
        { text: 'WHEN',     options: { ...headerOpts, fontSize: 10, charSpacing: 2 } },
        { text: 'ACTIVITY', options: { ...headerOpts, fontSize: 10, charSpacing: 2 } },
        { text: 'TRACK',    options: { ...headerOpts, fontSize: 10, charSpacing: 2 } },
        { text: 'LEVEL',    options: { ...headerOpts, fontSize: 10, charSpacing: 2 } },
        { text: 'REQUIRED', options: { ...headerOpts, fontSize: 10, charSpacing: 2 } },
        { text: 'TIME',     options: { ...headerOpts, fontSize: 10, charSpacing: 2 } }
      ],
      ...acts.map(a => [
        { text: a.slotLabel, options: { color: C.muted, fontSize: 11, fontFace: FONT, valign: 'middle' } },
        { text: a.emoji + '  ' + a.title, options: { color: C.text, fontSize: 11, fontFace: FONT, bold: true, valign: 'middle' } },
        { text: a.trackName, options: { color: C.muted, fontSize: 11, fontFace: FONT, valign: 'middle' } },
        { text: diffStars(a.difficulty) + ' ' + a.difficulty, options: { color: diffColor(a.difficulty), fontSize: 11, fontFace: FONT, bold: true, valign: 'middle' } },
        { text: a.required === 'mandatory' ? '● Mandatory' : '○ Optional', options: { color: a.required === 'mandatory' ? C.accent : C.muted, fontSize: 11, fontFace: FONT, bold: a.required === 'mandatory', valign: 'middle' } },
        { text: a.timeEstimate + ' min', options: { color: C.muted, fontSize: 11, fontFace: FONT, valign: 'middle' } }
      ])
    ];
    s.addTable(rows, {
      x: 0.6, y: 2.0, w: 12.13,
      colW: [1.4, 4.5, 2.4, 1.4, 1.5, 0.93],
      border: { type: 'solid', color: C.border, pt: 0.5 },
      fontFace: FONT,
      rowH: 0.45
    });
  }

  // ── Resources (if any) ───────────────────────────────
  if (p.resources && p.resources.length) {
    s = pptx.addSlide({ masterName: 'STUDIO' });
    s.addText('[ LEARNING RESOURCES ]', {
      x: 0.6, y: 0.6, w: 12, h: 0.4, fontSize: 11, color: C.accent, fontFace: FONT, bold: true, charSpacing: 2
    });
    s.addText('Curated to support this program', {
      x: 0.6, y: 1.0, w: 12, h: 0.7, fontSize: 32, color: C.text, fontFace: FONT, bold: true
    });
    const resRows = [
      [
        { text: 'TITLE',    options: { bold: true, color: C.accent, fill: { color: C.elev }, fontSize: 10, fontFace: FONT, charSpacing: 2 } },
        { text: 'PROVIDER', options: { bold: true, color: C.accent, fill: { color: C.elev }, fontSize: 10, fontFace: FONT, charSpacing: 2 } },
        { text: 'TYPE',     options: { bold: true, color: C.accent, fill: { color: C.elev }, fontSize: 10, fontFace: FONT, charSpacing: 2 } },
        { text: 'COST',     options: { bold: true, color: C.accent, fill: { color: C.elev }, fontSize: 10, fontFace: FONT, charSpacing: 2 } }
      ],
      ...p.resources.slice(0, 10).map(r => [
        { text: r.title,        options: { color: C.text,  fontSize: 11, fontFace: FONT, bold: true } },
        { text: r.provider,     options: { color: C.muted, fontSize: 11, fontFace: FONT } },
        { text: r.typeLabel,    options: { color: C.muted, fontSize: 11, fontFace: FONT } },
        { text: r.costLabel,    options: { color: C.accent,fontSize: 11, fontFace: FONT, bold: true } }
      ])
    ];
    s.addTable(resRows, {
      x: 0.6, y: 2.0, w: 12.13,
      colW: [5.5, 3.0, 2.2, 1.43],
      border: { type: 'solid', color: C.border, pt: 0.5 },
      fontFace: FONT, rowH: 0.42
    });
  }

  // ── Closing slide ────────────────────────────────────
  s = pptx.addSlide({ masterName: 'STUDIO' });
  s.addText('[ END ]', {
    x: 0.6, y: 2.4, w: 12, h: 0.4, fontSize: 11, color: C.accent, fontFace: FONT, bold: true, charSpacing: 2, align: 'center'
  });
  s.addText('Built with AI Activation Studio', {
    x: 0.6, y: 3.0, w: 12, h: 1.0, fontSize: 40, color: C.text, fontFace: FONT, bold: true, align: 'center'
  });
  s.addText('Thinking in the Age of AI, and Learning by Doing.', {
    x: 0.6, y: 4.2, w: 12, h: 0.6, fontSize: 16, color: C.muted, fontFace: FONT, italic: true, align: 'center'
  });
  // Big accent rule
  s.addShape(pptx.ShapeType.rect, { x: 6.27, y: 5.0, w: 0.8, h: 0.04, fill: { color: C.accent } });

  pptx.writeFile({ fileName: safeFileName(p.name) + '.pptx' });
  toast('PowerPoint deck downloaded.');
}

// ─── JSON Export ─────────────────────────────────────────
function exportJSON() {
  const p = buildProgramPayload();
  downloadBlob(new Blob([JSON.stringify({ state, payload: p }, null, 2)], { type: 'application/json' }), safeFileName(p.name) + '.json');
  toast('JSON backup downloaded.');
}
