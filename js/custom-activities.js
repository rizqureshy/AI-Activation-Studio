// ─── Custom Activities — curated program sets with categories ───
// Purpose-built activity sets (e.g. a cohort week) that live apart from
// the standard 140-activity library. Rendered as flip cards: a punchy
// front, full details on the back — click to flip.

const CUSTOM_CATEGORIES = [
  {
    id: 'thinking-modes',
    icon: '🧠',
    label: 'AI Thinking Modes — Weekly Series',
    description: 'A five-day progression for advanced prompters. Four thinking-mode drills Monday–Thursday, converging in a Friday Situation Room that uses all four. Required/optional is set per program when you schedule them.'
  }
];

const CUSTOM_ACTIVITIES = [
  {
    id: 'CU-W1-MON', category: 'thinking-modes', track: 'prompt-engineering', difficulty: 'advanced',
    day: 'MON', emoji: '🧠', timeEstimate: 20,
    title: 'The Challenger',
    hook: 'Use AI to attack your idea — not to validate it.',
    mission: 'Bring one rough idea you\'re working on. Set AI up as a structured devil\'s advocate: find the weak points, expose the assumptions, argue the opposite position as hard as it can. Push back. Defend what deserves defending — let go of what doesn\'t.',
    submission: 'A decision log: what you brought in, what AI challenged, what changed, and what you consciously kept — and why. Post in the channel.',
    proTip: 'When you\'ve finished the brainstorm, ask AI to generate a structured log of the whole session — what was discussed, challenged, and decided. Let AI do the documenting so you stay focused on the thinking.',
    realSkill: 'Using AI as a critical evaluator. Most people use AI to confirm what they already think — this mode teaches you to stress-test it, and come out stronger.'
  },
  {
    id: 'CU-W1-TUE', category: 'thinking-modes', track: 'prompt-engineering', difficulty: 'advanced',
    day: 'TUE', emoji: '🎯', timeEstimate: 20,
    title: 'The Translator',
    hook: 'Profile the audience before you write a single word.',
    mission: 'Take Monday\'s idea and prepare it for three audiences: a senior leader, a customer, and a technical audience. Have AI profile each one FIRST — what they fear, what they want, what language lands, what loses them in ten seconds. Let the profile drive the message, not your instinct.',
    submission: 'For each audience: the AI-generated profile, their likely concern, the positioning angle you chose, and the final message. Post all three.',
    proTip: 'Profile all three audiences in a single prompt first for a comparison view, then go deep on each one separately — the differences in what they need to hear are often surprising.',
    realSkill: 'Using AI as a persona analyst before using it as a writer. The sequence matters: profile first, message second.'
  },
  {
    id: 'CU-W1-WED', category: 'thinking-modes', track: 'prompt-engineering', difficulty: 'advanced',
    day: 'WED', emoji: '💡', timeEstimate: 20,
    title: 'Make the Complex Simple',
    hook: 'Explain your idea with analogies — without making it wrong.',
    mission: 'Take your idea, product, process, or concept and have AI explain it through analogies for three different audiences. The goal: easier to understand without becoming inaccurate.',
    submission: 'Three audience-specific analogies + a short note on which worked best and what it may oversimplify. Post in the channel.',
    proTip: 'After the first set of analogies, ask: "which of these could be misunderstood, and how?" That follow-up is where the real refinement happens — and it writes your note for you.',
    realSkill: 'Using AI as a translation engine, philosopher, and simplifier — a thinking partner across registers. It transfers to every deck and every stakeholder conversation you\'ll ever have.'
  },
  {
    id: 'CU-W1-THU', category: 'thinking-modes', track: 'prompt-engineering', difficulty: 'advanced',
    day: 'THU', emoji: '🔍', timeEstimate: 20,
    title: 'Reverse Engineer the Prompt',
    hook: 'Think backwards from great output to great input.',
    mission: 'Find a strong piece of output — a compelling proposal, a sharp executive summary, a well-structured QBR, a clear slide outline. Ask AI what prompt most likely created it. Then improve that prompt, and keep iterating until it\'s genuinely better than where you started.',
    submission: 'Three things: the likely original prompt, your improved version, and the three quality instructions that made the biggest difference. Post in the channel.',
    proTip: 'Ask for the reverse-engineering in four parts — "what role, context, format instructions, and constraints would have produced this?" — a much richer start than asking for one prompt in one shot.',
    realSkill: 'The foundation of everyone who uses AI at a high level — and a skill you can teach others immediately.'
  },
  {
    id: 'CU-W1-FRI', category: 'thinking-modes', track: 'prompt-engineering', difficulty: 'advanced',
    day: 'FRI', emoji: '🎯', timeEstimate: 45,
    title: 'The Situation Room',
    hook: 'Navigate one genuinely messy, real situation — with all four modes.',
    mission: 'Take one ambiguous, multi-layered situation from your work: a relationship showing risk signals, a leadership ask with unclear scope, a proposal that must land with multiple stakeholders. Use all four modes from this week — Challenge the assumptions, Translate for your audiences, Simplify the core message, and Reverse-engineer what a great output looks like before building it.',
    submission: 'Four parts: (1) your AI-assisted read of what\'s really going on, (2) your recommended path with rationale, (3) one stakeholder communication for the most important audience, (4) a one-page reflection — where AI helped you think better, where it led you astray, and where human judgment was irreplaceable. Post all four.',
    proTip: 'Start with an unfiltered brain dump — paste everything you know about the situation in one go, then ask AI to structure what matters most BEFORE touching solutions. That clarity is what separates the best submissions.',
    realSkill: 'End-to-end AI-assisted judgment — not just production, navigation. You\'re building a repeatable thinking process you can use and teach for the rest of your career.'
  }
];

// ── Page ─────────────────────────────────────────────────
function openCustomActivities() {
  showPage('custom');
  renderCustomActivities();
}

function renderCustomActivities() {
  const root = document.getElementById('custom-root');
  if (!root) return;
  root.innerHTML = `
    <section class="section-hero">
      <div class="wrap">
        <div>
          <div class="sh-eyebrow bracket">[ 03 · Curated sets ]</div>
          <h1 class="sh-title">Custom <span class="accent">activities</span>.</h1>
          <p class="sh-sub">Purpose-built activity sets for specific programs and cohorts, organized by category. Click any card to flip it and read the full brief.</p>
        </div>
        <div class="sh-meta"><b>${CUSTOM_ACTIVITIES.length}</b>activities</div>
      </div>
    </section>

    <div class="wrap" style="padding-top: 32px; padding-bottom: 80px;">
      ${CUSTOM_CATEGORIES.map(cat => {
        const items = CUSTOM_ACTIVITIES.filter(a => a.category === cat.id);
        return `
          <div class="cs-cat">
            <div class="cs-cat-head">
              <span class="cs-cat-icon">${cat.icon}</span>
              <div>
                <h2 class="cs-cat-title">${escapeHtml(cat.label)}</h2>
                <p class="cs-cat-sub">${escapeHtml(cat.description)}</p>
              </div>
              <span class="cs-cat-count">${items.length} activities</span>
            </div>
            <div class="flip-grid">
              ${items.map(customActivityCard).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function customActivityCard(a) {
  const track = TRACKS.find(t => t.id === a.track);
  return `
    <div class="flip-card" onclick="this.classList.toggle('flipped')" role="button" tabindex="0"
         onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.classList.toggle('flipped');}">
      <div class="flip-inner">
        <div class="flip-face flip-front cu-day-${a.day.toLowerCase()}">
          <div class="cu-top">
            <span class="cu-day">${a.day}</span>
          </div>
          <div class="cu-emoji">${a.emoji}</div>
          <h3 class="cu-title">${escapeHtml(a.title)}</h3>
          <p class="cu-hook">${escapeHtml(a.hook)}</p>
          <div class="cu-meta">
            <span>${track ? track.icon + ' ' + track.name : ''}</span>
            <span class="cu-meta-row"><span class="diff-pill diff-${a.difficulty}">★★★ ${a.difficulty}</span> · ${a.timeEstimate} min</span>
          </div>
          <div class="cu-flip-hint">Flip for the full brief ⟲</div>
        </div>
        <div class="flip-face flip-back">
          <div class="cu-back-head">
            <span>${a.emoji} ${escapeHtml(a.title)}</span>
            <span class="cu-back-day">${a.day}</span>
          </div>
          <div class="cu-back-scroll">
            <div class="cu-sec"><h4>The mission</h4><p>${escapeHtml(a.mission)}</p></div>
            <div class="cu-sec"><h4>Your submission</h4><p>${escapeHtml(a.submission)}</p></div>
            <div class="cu-sec tip"><h4>💡 Pro tip</h4><p>${escapeHtml(a.proTip)}</p></div>
            <div class="cu-sec skill"><h4>The real skill</h4><p>${escapeHtml(a.realSkill)}</p></div>
          </div>
          <div class="cu-flip-hint">Flip back ⟲</div>
        </div>
      </div>
    </div>
  `;
}

if (typeof module !== 'undefined') module.exports = { CUSTOM_CATEGORIES, CUSTOM_ACTIVITIES };
