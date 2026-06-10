// ─── Playbook — operational principles from running AI April ───────
const PLAYBOOK = [
  {
    icon: '🎯', title: 'Start small, build momentum',
    bullets: [
      'First-week activities should be completable in under 5 minutes — lower the barrier to the first submission.',
      'Complexity should increase week by week as confidence builds.',
      'Never front-load hard challenges; early wins create the habit.'
    ]
  },
  {
    icon: '👀', title: 'Check in on non-starters',
    bullets: [
      'By Day 3, identify who hasn\'t submitted — reach out personally, not via broadcast.',
      'Ask "is there something stopping you?" not "why haven\'t you done it?"',
      'The barrier is usually confusion or intimidation, not lack of interest.'
    ]
  },
  {
    icon: '🧑‍💼', title: 'Leaders must participate',
    bullets: [
      'The team lead must submit challenges alongside the team — not optional.',
      'The executive must participate visibly and comment on submissions.',
      'When leaders do it, permission is granted for everyone else.'
    ]
  },
  {
    icon: '💬', title: 'Comment on everything',
    bullets: [
      'Every submission deserves a reaction or comment from the lead within 24 hours.',
      'Specific feedback ("love how you used the prompt structure here") beats generic praise.',
      'Comments from the executive carry 10× the motivational weight.'
    ]
  },
  {
    icon: '🏆', title: 'Identify champions early',
    bullets: [
      'By end of Week 1, you\'ll see who\'s energised — highlight them publicly.',
      'Invite early champions to share at Drop-In sessions.',
      'Pre-select 2–3 Demo Day presenters by Week 2 so they can prepare.'
    ]
  },
  {
    icon: '📣', title: 'Keep encouraging throughout',
    bullets: [
      'Engagement dips in Week 2–3 — plan a mid-program boost: surprise bonus challenge, guest appearance, inter-team leaderboard.',
      'Celebrate streaks: "X has submitted every day this week 🔥"',
      'Never let the channel go quiet for more than two days.'
    ]
  },
  {
    icon: '☕', title: 'Run AI Drop-Ins twice a week',
    bullets: [
      '30–45 minute casual sessions, twice weekly.',
      'Format: 5-min update → open co-working → anyone shares what they\'re building.',
      'No agenda required — the vibe is "coffee chat + building." Breakthroughs happen here.'
    ]
  },
  {
    icon: '🎪', title: 'Demo Day is non-negotiable',
    bullets: [
      'End every program with a live Demo Day session — minimum 30 minutes.',
      'Champions present their capstone or best work to the full team.',
      'Executive opens and closes the session. Award the winner publicly with genuine ceremony.'
    ]
  },
  {
    icon: '🎯', title: 'The goal is fun first',
    bullets: [
      'Fun → discovery → problem-solving is the correct order.',
      'If it feels like homework, something is wrong — adjust the challenge or the support.',
      'The metric that matters most in Month 1 is participation rate, not output quality.'
    ]
  }
];

function openPlaybook() {
  showPage('playbook');
  renderPlaybook();
}

function renderPlaybook() {
  const root = document.getElementById('playbook-root');
  if (!root) return;
  root.innerHTML = `
    <section class="section-hero">
      <div class="wrap">
        <div>
          <div class="sh-eyebrow bracket">[ The playbook ]</div>
          <h1 class="sh-title">Nine principles <span class="accent">from running it the hard way</span>.</h1>
          <p class="sh-sub">Operational guidance for trainers running an AI challenge program. Hard-won lessons, not theory.</p>
        </div>
        <div class="sh-meta"><b>09</b>principles</div>
      </div>
    </section>

    <div class="wrap" style="padding-top: 40px;">
      <div class="pb-grid reveal-stagger">
        ${PLAYBOOK.map((p, i) => `
          <article class="pb-card">
            <div class="pb-icon">${p.icon}</div>
            <div class="pb-num">${String(i+1).padStart(2,'0')}</div>
            <h3 class="pb-title">${p.title}</h3>
            <ul class="pb-bullets">
              ${p.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </article>
        `).join('')}
      </div>
    </div>

    <section class="land-manifesto reveal">
      <div class="wrap-tight">
        <h2 class="lm-h">Ready to <em>put it into practice</em>?</h2>
        <p class="lm-sub">Start with the Launch Kit, or jump into the Builder.</p>
        <div class="lm-ctas">
          <button class="btn xl primary" onclick="openLaunchKit()"><span>Open Launch Kit</span><span class="arrow">→</span></button>
          <button class="btn xl ghost" onclick="startBuilder()">Open Builder</button>
        </div>
      </div>
    </section>
  `;
  initRevealObserver();
}
