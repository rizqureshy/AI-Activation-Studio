// ─── Catalog browse page ─────────────────────────────────
const catalogFilters = {
  track: 'all',
  difficulty: 'all',
  type: 'all',
  source: 'all',
  cost: 'all',
  search: '',
  sort: 'featured'
};

function openCatalog() {
  showPage('catalog');
  renderCatalog();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setCatalogFilter(key, value) {
  catalogFilters[key] = value;
  renderCatalog();
}

function clearCatalogFilters() {
  Object.assign(catalogFilters, { track:'all', difficulty:'all', type:'all', source:'all', cost:'all', search:'' });
  renderCatalog();
}

function getFilteredCatalog() {
  let items = CATALOG.slice();
  if (catalogFilters.track !== 'all') items = items.filter(c => c.track === catalogFilters.track);
  if (catalogFilters.difficulty !== 'all') items = items.filter(c => c.difficulty === catalogFilters.difficulty);
  if (catalogFilters.type !== 'all') items = items.filter(c => c.type === catalogFilters.type);
  if (catalogFilters.source !== 'all') items = items.filter(c => c.source === catalogFilters.source);
  if (catalogFilters.cost !== 'all') items = items.filter(c => c.cost === catalogFilters.cost);
  if (catalogFilters.search.trim()) {
    const q = catalogFilters.search.toLowerCase();
    items = items.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q) ||
      c.provider.toLowerCase().includes(q) ||
      (c.skills||[]).some(s => s.toLowerCase().includes(q))
    );
  }
  // Sort
  if (catalogFilters.sort === 'featured') {
    items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  } else if (catalogFilters.sort === 'shortest') {
    items.sort((a, b) => (a.duration || 9999) - (b.duration || 9999));
  } else if (catalogFilters.sort === 'longest') {
    items.sort((a, b) => (b.duration || 0) - (a.duration || 0));
  } else if (catalogFilters.sort === 'difficulty') {
    const order = { beginner:0, intermediate:1, advanced:2 };
    items.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  }
  return items;
}

function formatDuration(mins) {
  if (!mins) return 'Self-paced';
  if (mins < 60) return mins + ' min';
  const hrs = mins / 60;
  if (hrs < 10) return hrs.toFixed(hrs % 1 === 0 ? 0 : 1) + ' hr';
  return Math.round(hrs) + ' hr';
}

function costLabel(cost) {
  return {
    'free':                 'Free',
    'included-li-learning': 'LinkedIn Learning',
    'paid':                 'Paid',
    'trial-available':      'Trial available'
  }[cost] || cost;
}

function difficultyStars(d) {
  return d === 'advanced' ? '★★★' : d === 'intermediate' ? '★★' : '★';
}

function renderCatalog() {
  const root = document.getElementById('catalog-root');
  if (!root) return;
  const items = getFilteredCatalog();

  const trackOpts = [`<option value="all">All tracks</option>`]
    .concat(TRACKS.map(t => `<option value="${t.id}" ${catalogFilters.track===t.id?'selected':''}>${t.icon}  ${t.name}</option>`))
    .join('');
  const typeOpts = [`<option value="all">All types</option>`]
    .concat(Object.entries(CATALOG_TYPES).map(([k,v]) => `<option value="${k}" ${catalogFilters.type===k?'selected':''}>${v}</option>`))
    .join('');
  const sourceOpts = [`<option value="all">All sources</option>`]
    .concat(Object.entries(CATALOG_SOURCES).map(([k,v]) => `<option value="${k}" ${catalogFilters.source===k?'selected':''}>${v.name}</option>`))
    .join('');

  root.innerHTML = `
    <section class="section-hero">
      <div class="wrap">
        <div>
          <div class="sh-eyebrow bracket">[ Learning catalog ]</div>
          <h1 class="sh-title">Real videos, courses, and labs. <span class="accent">Organized by skill.</span></h1>
          <p class="sh-sub">${CATALOG.length} hand-picked items from LinkedIn Learning, DeepLearning.AI, Microsoft Learn, IBM, NVIDIA, Anthropic, OpenAI, and more.</p>
        </div>
        <div class="sh-meta"><b>${CATALOG.length}</b>resources</div>
      </div>
    </section>

    <div class="wrap">
      <div class="catalog-filters">
        <div class="cf-search">
          <input id="cf-search" placeholder="Search title, instructor, or skill…" value="${escapeHtml(catalogFilters.search)}">
        </div>
        <div class="cf-row">
          <select id="cf-track" class="cf-select">${trackOpts}</select>
          <select id="cf-difficulty" class="cf-select">
            <option value="all" ${catalogFilters.difficulty==='all'?'selected':''}>All levels</option>
            <option value="beginner" ${catalogFilters.difficulty==='beginner'?'selected':''}>★ Beginner</option>
            <option value="intermediate" ${catalogFilters.difficulty==='intermediate'?'selected':''}>★★ Intermediate</option>
            <option value="advanced" ${catalogFilters.difficulty==='advanced'?'selected':''}>★★★ Advanced</option>
          </select>
          <select id="cf-type" class="cf-select">${typeOpts}</select>
          <select id="cf-source" class="cf-select">${sourceOpts}</select>
          <select id="cf-cost" class="cf-select">
            <option value="all" ${catalogFilters.cost==='all'?'selected':''}>Any cost</option>
            <option value="free" ${catalogFilters.cost==='free'?'selected':''}>Free</option>
            <option value="included-li-learning" ${catalogFilters.cost==='included-li-learning'?'selected':''}>LinkedIn Learning</option>
            <option value="paid" ${catalogFilters.cost==='paid'?'selected':''}>Paid</option>
            <option value="trial-available" ${catalogFilters.cost==='trial-available'?'selected':''}>Trial</option>
          </select>
          <select id="cf-sort" class="cf-select">
            <option value="featured" ${catalogFilters.sort==='featured'?'selected':''}>Sort: Featured</option>
            <option value="shortest" ${catalogFilters.sort==='shortest'?'selected':''}>Shortest first</option>
            <option value="longest" ${catalogFilters.sort==='longest'?'selected':''}>Longest first</option>
            <option value="difficulty" ${catalogFilters.sort==='difficulty'?'selected':''}>Beginner → Advanced</option>
          </select>
          <button class="btn small ghost" onclick="clearCatalogFilters()">Clear</button>
        </div>
        <div class="cf-meta">
          <span><strong>${items.length}</strong> result${items.length===1?'':'s'} ${catalogFilters.track !== 'all' ? `in ${TRACKS.find(t=>t.id===catalogFilters.track)?.name || ''}` : 'across all tracks'}</span>
          <span class="cf-equinix">${CATALOG.filter(c=>c.cost==='included-li-learning').length} items via Equinix LinkedIn Learning</span>
        </div>
      </div>

      <div class="catalog-grid">
        ${items.length === 0
          ? `<div class="catalog-empty">No items match these filters. <button class="btn small ghost" onclick="clearCatalogFilters()">Clear filters</button></div>`
          : items.map(catalogCard).join('')}
      </div>
    </div>

    <section class="land-manifesto reveal">
      <div class="wrap-tight">
        <h2 class="lm-h">Ready to <em>build a program</em> with this content?</h2>
        <div class="lm-ctas"><button class="btn xl primary" onclick="startBuilder()"><span>Open Program Builder</span><span class="arrow">→</span></button></div>
      </div>
    </section>
  `;

  // Wire filter inputs
  document.getElementById('cf-search').addEventListener('input', e => { catalogFilters.search = e.target.value; renderCatalog(); document.getElementById('cf-search').focus(); });
  ['track','difficulty','type','source','cost','sort'].forEach(k => {
    document.getElementById('cf-' + k).addEventListener('change', e => setCatalogFilter(k, e.target.value));
  });
}

function catalogCard(c) {
  const t = TRACKS.find(x => x.id === c.track);
  const src = CATALOG_SOURCES[c.source];
  const typeLabel = CATALOG_TYPES[c.type] || c.type;
  const featuredBadge = c.featured ? '<span class="cat-featured">Featured</span>' : '';
  const ctaLabel = c.source === 'linkedin-learning' ? 'Open in LinkedIn Learning ↗'
                 : c.source === 'youtube' ? 'Watch on YouTube ↗'
                 : c.source === 'github' ? 'Open on GitHub ↗'
                 : 'Open ↗';
  return `
    <article class="cat-card">
      <div class="cat-card-top">
        <span class="cat-track" title="${escapeHtml(t.name)}">${t.icon} ${escapeHtml(t.name.split(' ')[0])}</span>
        ${featuredBadge}
        <span class="cat-cost cat-cost-${c.cost}">${costLabel(c.cost)}</span>
      </div>
      <h3 class="cat-title">${escapeHtml(c.title)}</h3>
      <div class="cat-provider">${escapeHtml(c.provider)}${c.instructor ? ' · ' + escapeHtml(c.instructor) : ''}</div>
      <p class="cat-desc">${escapeHtml(c.description)}</p>
      <div class="cat-meta">
        <span>${typeLabel}</span>
        <span>${formatDuration(c.duration)}</span>
        <span class="diff-stars">${difficultyStars(c.difficulty)} ${c.difficulty}</span>
      </div>
      ${c.skills?.length ? `<div class="cat-skills">${c.skills.slice(0,4).map(s => `<span class="cat-skill">${escapeHtml(s)}</span>`).join('')}</div>` : ''}
      <div class="cat-cta"><a class="btn small" href="${c.url}" target="_blank" rel="noopener">${ctaLabel}</a></div>
    </article>
  `;
}

function copyHint() { /* deprecated — all items have direct URLs now */ }
