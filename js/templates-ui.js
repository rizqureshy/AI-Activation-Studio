// ─── Templates — copy-ready comms for every moment of the program ───
const TEMPLATES = [
  {
    id: 'exec-announcement',
    title: 'Executive Kick-Off Announcement',
    desc: 'Sent by the team executive before Day 1. Sets the tone and grants permission.',
    when: 'Before launch',
    body: EXEC_ANNOUNCEMENT
  },
  {
    id: 'channel-welcome',
    title: 'Channel Welcome Message',
    desc: 'Pinned to the top of the program channel so new joiners always see the rules.',
    when: 'Day 1 — pinned',
    body: `📌 Welcome to #[PROGRAM-NAME]!

This is your home for the next [X] weeks. Here's how it works:

🎯 CHALLENGES — Posted every weekday. Optional ones are worth 5 pts. Mandatory Fridays are graded.
📬 SUBMISSIONS — Reply in a thread under each challenge post with your work + which AI tool you used.
☕ DROP-INS — Join us [DAY] and [DAY] at [TIME] for casual AI co-working (link in calendar invite).
🏆 SCORING — Challenges (5pts) + Friday quality scores + Capstone (50pts) = your total.

Tag your posts: #[CHALLENGE-NAME] | Tool used: [TOOL NAME]

Any questions? Just ask here. Let's build something great. 🚀`
  },
  {
    id: 'daily-post',
    title: 'Daily Challenge Post',
    desc: 'The format for posting each weekday\'s challenge to the channel.',
    when: 'Every weekday',
    body: `🎯 DAY [N] CHALLENGE — [CHALLENGE NAME]
[TRACK] · [TOOL] · [DURATION] · [OPTIONAL / MANDATORY]

[One paragraph description of the challenge]

✅ TO SUBMIT: Reply in this thread with your output + the AI tool you used
⏰ DEADLINE: End of day [DATE]
💡 TIP: [One helpful tip specific to this challenge]

Good luck! 🔥`
  },
  {
    id: 'weekly-winner',
    title: 'Weekly Winner Announcement',
    desc: 'Posted Friday or Monday to recognise that week\'s standout.',
    when: 'Weekly',
    body: `🏆 WEEK [N] WINNER — [NAME]

This week's winner is [NAME] for their incredible work on [CHALLENGE NAME].

[1–2 sentences describing what made their submission stand out]

[NAME] takes the Week [N] crown and earns [X] bonus points. 🎉

Full leaderboard 👇
[Paste leaderboard here]

Keep building, everyone — Week [N+1] starts Monday!`
  },
  {
    id: 'mid-boost',
    title: 'Mid-Program Boost',
    desc: 'Sent at the halfway mark to re-engage anyone who hasn\'t started yet.',
    when: 'Mid-program',
    body: `⚡ HALFWAY THERE — HERE'S WHERE WE STAND

We're [X] days in and [N] of you have submitted at least one challenge. That's amazing.

Quick shoutouts this week:
🔥 [NAME] — [what they built]
🔥 [NAME] — [what they built]

If you haven't started yet — this week is your week. [THIS WEEK'S EASIEST CHALLENGE] takes less than 5 minutes. Jump in.

Drop-In this [DAY] at [TIME] if you want a hand getting started. No experience needed.`
  },
  {
    id: 'demo-day',
    title: 'Demo Day Agenda',
    desc: 'Posted ahead of the closing Demo Day session. Set expectations.',
    when: 'End of program',
    body: `🎪 DEMO DAY — [DATE] [TIME]

[EXECUTIVE NAME] opens (5 min)

PRESENTATIONS (5 min each):
• [CHAMPION 1] — [Project Name]
• [CHAMPION 2] — [Project Name]
• [CHAMPION 3] — [Project Name]

Q&A + reactions (10 min)

🏆 WINNER ANNOUNCEMENT — [EXECUTIVE NAME] crowns the champion

[EXECUTIVE NAME] closes + what's next (5 min)

Total: ~45 minutes
Join: [MEETING LINK]`
  },
  {
    id: 'wrap-up',
    title: 'Post-Program Wrap-Up',
    desc: 'Sent the day after Demo Day. Closes the loop and credits everyone.',
    when: 'After Demo Day',
    body: `🏁 [PROGRAM NAME] — THAT'S A WRAP

[X] challenges. [N] participants. [Y] submissions. One incredible month.

🏆 YOUR CHAMPION: [NAME]

Top performers:
1. [NAME] — [score] pts
2. [NAME] — [score] pts
3. [NAME] — [score] pts

This was just the beginning. The skills you built this month are real and transferable.

Thank you to everyone who participated, submitted, encouraged, and built. Special thanks to [EXECUTIVE NAME] for leading from the front.

See you in the next one. 🚀`
  }
];

function openTemplates() {
  showPage('templates');
  renderTemplates();
}

function renderTemplates() {
  const root = document.getElementById('templates-root');
  if (!root) return;
  root.innerHTML = `
    <section class="section-hero">
      <div class="wrap">
        <div>
          <div class="sh-eyebrow bracket">[ Templates ]</div>
          <h1 class="sh-title">Copy. Replace. <span class="accent">Send.</span></h1>
          <p class="sh-sub">Seven copy-ready messages for every moment of the program. Replace the [BRACKETS] and ship.</p>
        </div>
        <div class="sh-meta"><b>07</b>templates</div>
      </div>
    </section>

    <div class="wrap" style="padding-top: 40px;">
      <div class="tpl-list">
        ${TEMPLATES.map(t => `
          <article class="tpl-card">
            <header class="tpl-head">
              <div>
                <div class="tpl-when">${t.when}</div>
                <h3 class="tpl-title">${t.title}</h3>
                <p class="tpl-desc">${t.desc}</p>
              </div>
              <button class="btn small" onclick="copyText(document.getElementById('tpl-${t.id}').textContent, '${t.title} copied.')">Copy</button>
            </header>
            <pre class="tpl-pre" id="tpl-${t.id}">${escapeHtml(t.body)}</pre>
          </article>
        `).join('')}
      </div>
    </div>

    <section class="land-manifesto reveal">
      <div class="wrap-tight">
        <h2 class="lm-h">Need a program for these messages to <em>live in</em>?</h2>
        <div class="lm-ctas"><button class="btn xl primary" onclick="startBuilder()"><span>Open Program Builder</span><span class="arrow">→</span></button></div>
      </div>
    </section>
  `;
  initRevealObserver();
}
