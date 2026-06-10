// ─── Launch Kit — pre-launch checklist + executive announcement ────────
const LAUNCH_CHECKLIST = [
  { id: 'exec', title: 'Executive Announcement', time: '5 min',
    desc: 'Confirm your team executive will make the formal kick-off announcement.',
    example: '<b>What worked for us:</b> Our VP recorded a 90-second Loom on a Friday afternoon: "Hey team — starting Monday we\'re running AI April. I\'m doing it with you. No grades, no shame, just 30 days of figuring out what AI can actually do for our work." Posted it to the channel Sunday night. Day-1 participation jumped from an expected 40% to <b>74%</b>.'
  },
  { id: 'channel', title: 'Set Up Your Channel', time: '10 min',
    desc: 'Create a dedicated Teams or Slack channel (e.g. #ai-q3).',
    example: '<b>Naming matters:</b> we tested #ai-training-program (formal, low engagement) vs #ai-april-2024 (time-bound, high energy). The named cohort channel got <b>3.2× more posts</b> per day. Add a clear pinned message, set the channel description to the goal, and use an emoji avatar 🤖 that signals "this is the fun place."'
  },
  { id: 'invite', title: 'Invite Your Team', time: '5 min',
    desc: 'Add all participants to the channel before Day 1.',
    example: '<b>Auto-add, don\'t ask people to join.</b> Opt-in dropped us to 28% participation. When we added everyone by default (with one note: "leave anytime, no questions"), participation hit <b>72%</b>. Only 4 of 180 people left.'
  },
  { id: 'submissions', title: 'Configure Submission Format', time: '10 min',
    desc: 'Pin a message explaining thread-based submissions and required fields.',
    example: '<b>Friction kills programs.</b> We tried a Google Form for Week 1 — got 6 submissions. Switched to "reply to the challenge post" in Week 2 — got <b>54 submissions</b>. The format we landed on: <i>"Reply in thread with your output + the AI tool you used."</i> That\'s it. No screenshots required, no rubric.'
  },
  { id: 'build', title: 'Build Your Program', time: '30 min',
    desc: 'Use the Program Builder to select your tracks, activities, and timeline.',
    action: 'Open builder', actionFn: 'startBuilder',
    example: '<b>Build for Tuesday, not Monday.</b> Week-1 activities should take <b>under 5 minutes</b> — the first submission is the hardest. Save your hard challenges for Week 3 when habits are formed. Difficulty ramp matters more than activity count.'
  },
  { id: 'dropins', title: 'Schedule Drop-In Sessions', time: '15 min',
    desc: 'Block two weekly AI Drop-In office hours in the team calendar.',
    example: '<b>Twice a week, 30-45 min, recurring.</b> Tuesdays 12pm and Thursdays 4pm worked for us. Format: 5 min "what are we seeing?" → open co-working → anyone shares. <b>3 of our 4 best ideas came out of Drop-Ins</b>, not the challenges themselves. Don\'t make them mandatory or they become meetings.'
  },
  { id: 'champions', title: 'Identify Potential Champions', time: '10 min',
    desc: 'Review your team roster and identify likely early adopters to nudge.',
    example: '<b>Your champions are not always your top performers.</b> Look for: people who try new tools unprompted, people who answer Slack questions even when not asked, people who built side projects last year. Reach out to 3-5 of them privately one week before launch. By Week 2 they\'ll have pulled in 10× their number.'
  }
];

const EXEC_ANNOUNCEMENT = `Subject: Introducing [PROGRAM NAME] — Starting [DATE]

Team,

I'm excited to announce we're launching [PROGRAM NAME], our team's AI challenge program starting [DATE].

Over the next [X weeks], you'll have the opportunity to explore AI tools through daily challenges — writing, designing, building, and creating with tools like ChatGPT, Claude, Copilot, and more.

No coding experience required. The aim is simple: have fun, discover what's possible, and solve real problems with AI.

Here's what to expect:
• Daily optional challenges (5 pts each)
• Mandatory Friday challenges (graded)
• 2x weekly AI Drop-In sessions for support and sharing
• A capstone Demo Day on [DATE] where our champions present their work
• A team champion crowned at the end 🏆

Join our channel: [CHANNEL LINK]

I'll be participating alongside you — see you in the channel.

[EXECUTIVE NAME]`;

const LK_STORAGE = 'ath-launch-kit-v1';

function getLaunchChecked() {
  try { return JSON.parse(localStorage.getItem(LK_STORAGE) || '[]'); }
  catch { return []; }
}
function setLaunchChecked(arr) {
  localStorage.setItem(LK_STORAGE, JSON.stringify(arr));
}
function toggleLaunchItem(id) {
  const checked = getLaunchChecked();
  const i = checked.indexOf(id);
  if (i >= 0) checked.splice(i, 1); else checked.push(id);
  setLaunchChecked(checked);
  renderChecklist();
}

function openLaunchKit() {
  showPage('launch-kit');
  renderLaunchKit();
}
function openChecklist() {
  showPage('checklist');
  renderChecklist();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Launch & Run hub — three tiles ──────────────────────
function renderLaunchKit() {
  const root = document.getElementById('launch-kit-root');
  if (!root) return;
  const checked = getLaunchChecked();
  const done = LAUNCH_CHECKLIST.filter(i => checked.includes(i.id)).length;

  root.innerHTML = `
    <section class="section-hero">
      <div class="wrap">
        <div>
          <div class="sh-eyebrow bracket">[ Launch and Run ]</div>
          <h1 class="sh-title">Self-Enablement <span class="accent">Playbook</span>.</h1>
          <p class="sh-sub">Three pieces — a deployment checklist, the comms templates, and the operating principles. Use them in order.</p>
        </div>
        <div class="sh-meta"><b>03</b>resources</div>
      </div>
    </section>

    <div class="wrap" style="padding-top: 40px; padding-bottom: 80px;">
      <div class="res-tile-grid res-tile-grid-3">

        <button class="res-tile" onclick="openChecklist()">
          <div class="res-tile-head">
            <div class="res-tile-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
            <div class="res-tile-progress">
              <span class="rtp-count">${done}/${LAUNCH_CHECKLIST.length}</span>
              <span class="rtp-label">done</span>
            </div>
          </div>
          <div class="res-tile-tag">[ 01 · Deployment ]</div>
          <h3 class="res-tile-title">Pre-launch Checklist</h3>
          <p class="res-tile-sub">Seven steps to do before Day 1. Each step includes a real-world AI April example. Progress is saved across sessions.</p>
          <div class="res-tile-cta">Open checklist <span class="arrow">→</span></div>
        </button>

        <button class="res-tile" onclick="openTemplates()">
          <div class="res-tile-head">
            <div class="res-tile-icon violet">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
            </div>
            <div class="res-tile-progress">
              <span class="rtp-count">07</span>
              <span class="rtp-label">templates</span>
            </div>
          </div>
          <div class="res-tile-tag">[ 02 · Comms ]</div>
          <h3 class="res-tile-title">Message Templates</h3>
          <p class="res-tile-sub">Seven copy-ready messages for every moment — kick-off, daily challenge post, weekly winner, demo day, wrap-up.</p>
          <div class="res-tile-cta">Open templates <span class="arrow">→</span></div>
        </button>

        <button class="res-tile" onclick="openPlaybook()">
          <div class="res-tile-head">
            <div class="res-tile-icon sky">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <div class="res-tile-progress">
              <span class="rtp-count">09</span>
              <span class="rtp-label">principles</span>
            </div>
          </div>
          <div class="res-tile-tag">[ 03 · Principles ]</div>
          <h3 class="res-tile-title">Operator's Playbook</h3>
          <p class="res-tile-sub">Nine hard-won principles from running an AI challenge month — what to do when, what to avoid, what kills programs.</p>
          <div class="res-tile-cta">Read the playbook <span class="arrow">→</span></div>
        </button>

      </div>
    </div>
  `;

  if (typeof attachPathTilts === 'function') attachPathTilts();
}

// ─── Pre-launch Checklist detail page ────────────────────
function renderChecklist() {
  const root = document.getElementById('checklist-root');
  if (!root) return;
  const checked = getLaunchChecked();
  const done = LAUNCH_CHECKLIST.filter(i => checked.includes(i.id)).length;
  const pct = Math.round((done / LAUNCH_CHECKLIST.length) * 100);

  root.innerHTML = `
    <section class="section-hero">
      <div class="wrap">
        <div>
          <div class="sh-eyebrow bracket">[ 01 · Pre-launch Checklist ]</div>
          <h1 class="sh-title">Ready to <span class="accent">launch</span>?</h1>
          <p class="sh-sub">Complete these steps before your program starts. Order matters. Each one has a real-world example from AI April.</p>
        </div>
        <div class="sh-meta"><b>${done}/${LAUNCH_CHECKLIST.length}</b>complete</div>
      </div>
    </section>

    <div class="wrap" style="padding-top: 40px;">
      <div class="lk-progress">
        <div class="lk-progress-meta">
          <span class="lk-progress-label">Pre-launch checklist</span>
          <span class="lk-progress-count"><strong>${done}</strong> / ${LAUNCH_CHECKLIST.length} complete</span>
        </div>
        <div class="lk-progress-bar"><div class="lk-progress-fill" style="width:${pct}%"></div></div>
      </div>

      <div class="lk-tile-grid">
        ${LAUNCH_CHECKLIST.map((item, i) => {
          const isDone = checked.includes(item.id);
          return `
            <div class="lk-tile res-tile ${isDone ? 'done' : ''}" onclick="toggleLaunchItem('${item.id}')">
              <div class="lk-tile-head">
                <div class="lk-tile-num">${String(i+1).padStart(2,'0')}</div>
                <div class="lk-tile-meta">
                  <span class="lk-tile-time">${item.time}</span>
                  <div class="lk-tile-check" aria-label="${isDone ? 'Done' : 'Mark done'}">${isDone ? '✓' : ''}</div>
                </div>
              </div>
              <h3 class="lk-tile-title">${item.title}</h3>
              <p class="lk-tile-desc">${item.desc}</p>
              ${item.example ? `<div class="rw-example" onclick="event.stopPropagation();">
                <div class="rw-example-label">▶ Real-world example · AI April</div>
                ${item.example}
              </div>` : ''}
              ${item.action ? `<button class="btn small ghost lk-action" onclick="event.stopPropagation(); ${item.actionFn}()">${item.action} →</button>` : ''}
            </div>
          `;
        }).join('')}

        <details class="lk-tile res-tile lk-tile-template" onclick="event.stopPropagation();">
          <summary class="lk-tile-summary">
            <div class="lk-tile-head">
              <div class="lk-tile-num" style="color: var(--violet);">📜</div>
              <div class="lk-tile-meta">
                <span class="lk-tile-time">Template</span>
                <span class="lk-template-arrow">▾</span>
              </div>
            </div>
            <h3 class="lk-tile-title">Executive Kick-Off Announcement</h3>
            <p class="lk-tile-desc">Copy-paste, replace the placeholders, ship. Sent by the exec before Day 1.</p>
          </summary>
          <div class="lk-template-body">
            <pre class="lk-template-pre" id="lk-exec-pre">${escapeHtml(EXEC_ANNOUNCEMENT)}</pre>
            <button class="btn small" onclick="event.stopPropagation(); copyText(document.getElementById('lk-exec-pre').textContent, 'Announcement copied.')">Copy announcement</button>
          </div>
        </details>
      </div>
    </div>

  `;
  initRevealObserver();
  if (typeof attachPathTilts === 'function') attachPathTilts();
}

function copyText(text, message) {
  if (!text) return;
  navigator.clipboard?.writeText(text).then(() => toast(message || 'Copied.'));
}
