// ─── Saved-plan library ──────────────────────────────────
// Multiple named plans persist in localStorage. Each plan is a
// complete snapshot of the program state (program, tracks, schedule,
// resources, customActivities). Plans can be loaded back into the
// builder for editing, renamed, or deleted.

const PLANS_KEY = 'aas-plans-v1';

function listPlans() {
  try { return JSON.parse(localStorage.getItem(PLANS_KEY) || '[]'); }
  catch (_) { return []; }
}

function _writePlans(plans) {
  try { localStorage.setItem(PLANS_KEY, JSON.stringify(plans)); }
  catch (_) {}
}

function _planByName(name) {
  const n = (name || '').trim().toLowerCase();
  return listPlans().find(p => p.name.toLowerCase() === n) || null;
}

function _planById(id) {
  return listPlans().find(p => p.id === id) || null;
}

function _planSummary(p) {
  const sched = p.schedule || [];
  return {
    activityCount: sched.length,
    mandatoryCount: sched.filter(s => s.required === 'mandatory').length,
    trackCount: Object.values(p.tracks || {}).filter(t => t && t.selected).length,
    format: p.program && p.program.format ? p.program.format : ''
  };
}

// Save the current state as a plan with the given name.
//   opts.overwriteId — if set, replace that plan's contents instead
//                      of looking up by name.
// Returns { plan } on success or { error, takenBy } on name conflict.
function savePlan(name, opts) {
  opts = opts || {};
  name = (name || '').trim();
  if (!name) return { error: 'Plan name cannot be empty.' };

  const plans = listPlans();
  let target;

  if (opts.overwriteId) {
    target = plans.find(p => p.id === opts.overwriteId);
  }

  if (!target) {
    const byName = _planByName(name);
    if (byName) {
      // Caller may want to confirm before overwriting
      if (!opts.confirmOverwrite) return { error: 'A plan with that name already exists.', takenBy: byName };
      target = byName;
    }
  }

  const snapshot = {
    id: target ? target.id : ('plan-' + Date.now()),
    name,
    savedAt: new Date().toISOString(),
    program: { ...state.program },
    tracks: JSON.parse(JSON.stringify(state.tracks || {})),
    schedule: (state.schedule || []).map(s => ({
      activityId: s.activityId,
      required: s.required === 'mandatory' ? 'mandatory' : 'optional'
    })),
    resources: (state.resources || []).slice(),
    customActivities: JSON.parse(JSON.stringify(state.customActivities || []))
  };

  if (target) {
    const idx = plans.indexOf(target);
    plans[idx] = snapshot;
  } else {
    plans.push(snapshot);
  }

  _writePlans(plans);
  state.loadedPlanId = snapshot.id;
  saveState();
  return { plan: snapshot };
}

function loadPlanIntoState(id) {
  const p = _planById(id);
  if (!p) return false;
  resetState();
  Object.assign(state.program, p.program || {});
  state.tracks = p.tracks || {};
  state.schedule = (p.schedule || []).map(s => ({
    activityId: s.activityId,
    required: s.required === 'mandatory' ? 'mandatory' : 'optional'
  }));
  state.resources = p.resources || [];
  state.customActivities = p.customActivities || [];
  state.loadedPlanId = p.id;
  saveState();
  return true;
}

function deletePlan(id) {
  const plans = listPlans().filter(p => p.id !== id);
  _writePlans(plans);
  if (state.loadedPlanId === id) {
    state.loadedPlanId = null;
    saveState();
  }
}

function renamePlan(id, newName) {
  newName = (newName || '').trim();
  if (!newName) return false;
  const plans = listPlans();
  const p = plans.find(x => x.id === id);
  if (!p) return false;
  // Block duplicate names on rename, unless it's the same plan
  if (plans.some(x => x.id !== id && x.name.toLowerCase() === newName.toLowerCase())) return false;
  p.name = newName;
  _writePlans(plans);
  return true;
}

// ─── Plans modal UI ──────────────────────────────────────
function openPlansModal() {
  const m = document.getElementById('activity-modal');
  if (!m) return;
  const plans = listPlans()
    .slice()
    .sort((a, b) => (b.savedAt || '').localeCompare(a.savedAt || ''));

  m.innerHTML = `
    <div class="modal modal-wide plans-modal">
      <button class="modal-close" onclick="closeModal()">×</button>
      <div class="bracket muted" style="margin-bottom: 10px;">[ My Plans ]</div>
      <h3>Saved plans</h3>
      <p class="plans-sub">${plans.length} plan${plans.length === 1 ? '' : 's'} saved on this device. ${plans.length ? 'Click any to load it back into the builder for editing.' : ''}</p>

      ${plans.length === 0 ? `
        <div class="plans-empty">
          <div class="plans-empty-icon">📂</div>
          <div class="plans-empty-title">No saved plans yet</div>
          <div class="plans-empty-sub">Build a program in the wizard, then save it from the Export step. Saved plans stay in this browser — no backend, no account.</div>
          <button class="btn small primary" style="margin-top: 18px;" onclick="closeModal(); startBuilder();">
            <span>Open the builder</span><span class="arrow">→</span>
          </button>
        </div>
      ` : `
        <div class="plans-list">
          ${plans.map(p => {
            const s = _planSummary(p);
            const fmt = FORMATS.find(f => f.id === s.format);
            const savedAt = new Date(p.savedAt);
            const savedLabel = savedAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
            const isCurrent = state.loadedPlanId === p.id;
            return `
              <div class="plan-row ${isCurrent ? 'current' : ''}">
                <div class="plan-body">
                  <div class="plan-name-row">
                    <div class="plan-name">${escapeHtml(p.name)}</div>
                    ${isCurrent ? '<span class="plan-current-tag">Currently loaded</span>' : ''}
                  </div>
                  <div class="plan-meta">
                    <span class="plan-meta-fmt">${escapeHtml(fmt ? fmt.name : (s.format || 'No format'))}</span>
                    <span class="plan-dot">·</span>
                    <span>${s.activityCount} activit${s.activityCount === 1 ? 'y' : 'ies'}</span>
                    ${s.mandatoryCount ? `<span class="plan-dot">·</span><span class="plan-mand">${s.mandatoryCount} mandatory</span>` : ''}
                    <span class="plan-dot">·</span>
                    <span>${s.trackCount} track${s.trackCount === 1 ? '' : 's'}</span>
                    <span class="plan-dot">·</span>
                    <span class="plan-saved">Saved ${savedLabel}</span>
                  </div>
                </div>
                <div class="plan-actions">
                  <button class="btn small primary" onclick="_loadPlanAndGo('${p.id}')">Load <span class="arrow">→</span></button>
                  <button class="plan-icon-btn" onclick="_renamePlanPrompt('${p.id}')" title="Rename" aria-label="Rename">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
                  </button>
                  <button class="plan-icon-btn plan-danger" onclick="_deletePlanPrompt('${p.id}')" title="Delete" aria-label="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;
  m.classList.add('open');
}

function _loadPlanAndGo(id) {
  if (!loadPlanIntoState(id)) { toast('Could not load that plan.'); return; }
  closeModal();
  state.step = 3;
  showPage('builder');
  renderStep();
  const p = _planById(id);
  toast(`Loaded "${p ? p.name : 'plan'}". Edit anything, then save again.`);
  _refreshMyPlansChip();
}

function _renamePlanPrompt(id) {
  const p = _planById(id);
  if (!p) return;
  const next = prompt(`Rename "${p.name}" to:`, p.name);
  if (next == null) return;
  const trimmed = next.trim();
  if (!trimmed || trimmed === p.name) return;
  if (!renamePlan(id, trimmed)) {
    toast('A plan with that name already exists.');
    return;
  }
  openPlansModal();
  _refreshMyPlansChip();
  toast(`Renamed to "${trimmed}".`);
}

function _deletePlanPrompt(id) {
  const p = _planById(id);
  if (!p) return;
  if (!confirm(`Delete plan "${p.name}"? This can't be undone.`)) return;
  deletePlan(p.id);
  openPlansModal();
  _refreshMyPlansChip();
  toast(`Deleted "${p.name}".`);
}

// ─── Step 5 save-plan card ───────────────────────────────
function savePlanFromStep5() {
  const input = document.getElementById('save-plan-name');
  if (!input) return;
  const name = input.value.trim();
  if (!name) { toast('Give your plan a name.'); input.focus(); return; }

  // If we already have a loaded plan, update it in place
  const r1 = savePlan(name, { overwriteId: state.loadedPlanId || null });
  if (r1.plan) { _afterSave(r1.plan, !!state.loadedPlanId); return; }

  // Otherwise check for name conflict
  if (r1.takenBy) {
    const ok = confirm(`A plan named "${r1.takenBy.name}" already exists. Overwrite it?`);
    if (!ok) { input.focus(); input.select(); return; }
    const r2 = savePlan(name, { confirmOverwrite: true });
    if (r2.plan) { _afterSave(r2.plan, true); return; }
  }

  if (r1.error) toast(r1.error);
}

function _afterSave(plan, wasUpdate) {
  _refreshMyPlansChip();
  // Re-render Step 5 so the "currently editing" line shows up
  if (document.getElementById('page-builder')?.classList.contains('active') && state.step === 5) {
    renderStep5();
  }
  toast(wasUpdate ? `Updated plan "${plan.name}".` : `Saved plan "${plan.name}".`);
}

// ─── Landing "My Plans" chip ─────────────────────────────
function _refreshMyPlansChip() {
  const wrap = document.getElementById('my-plans-link');
  const count = document.getElementById('my-plans-count');
  if (!wrap || !count) return;
  const n = listPlans().length;
  if (n === 0) {
    wrap.style.display = 'none';
  } else {
    wrap.style.display = '';
    count.textContent = `${n} saved plan${n === 1 ? '' : 's'}`;
  }
}

// Make sure state has loadedPlanId
(function ensureLoadedPlanIdField(){
  if (typeof state === 'object' && state && state.loadedPlanId === undefined) {
    state.loadedPlanId = null;
  }
})();
