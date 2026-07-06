// ─── Custom Activities — the program library ────────────────────
// Activity sets organized by the PROGRAMS we run, so any set can be
// pulled into a new program build and reused. Each activity carries a
// default required/optional status from its home program — shown here
// as "Default", and changeable per program in the builder (design
// mode) via the schedule's Mandatory/Optional toggle.
// Rendered as flip cards: punchy front, full brief on the back.

const CUSTOM_PROGRAMS = [
  {
    id: 'cs-ttt-cohort',
    icon: '🎓',
    label: 'Customer Success · Train-the-Trainer Cohort',
    status: 'running',
    description: 'Four-week Train-the-Trainer cohort for the CS team. Mon–Thu practice activities build into a Friday submission each week. Defaults reflect the cohort design — change them per program when you reuse these.'
  },
  {
    id: 'ai-april',
    icon: '🚀',
    label: 'AI April',
    status: 'completed',
    description: 'The original AI challenge month — 22 daily challenges across five weeks, April 1–30. Mon–Thu light and playful, Friday flagship challenges mandatory in the original run. This is the program the Studio\'s playbook and launch kit were built from.'
  }
];

const CUSTOM_ACTIVITIES = [
  {
    id: 'CU-W1-MON', program: 'cs-ttt-cohort', group: 'Week 1 — AI Thinking Modes', track: 'prompt-engineering', difficulty: 'advanced',
    day: 'MON', requirement: 'optional', emoji: '🧠', timeEstimate: 20,
    title: 'The Challenger',
    hook: 'Use AI to attack your idea — not to validate it.',
    mission: 'Bring one rough idea you\'re working on. Set AI up as a structured devil\'s advocate: find the weak points, expose the assumptions, argue the opposite position as hard as it can. Push back. Defend what deserves defending — let go of what doesn\'t.',
    submission: 'A decision log: what you brought in, what AI challenged, what changed, and what you consciously kept — and why. Post in the channel.',
    proTip: 'When you\'ve finished the brainstorm, ask AI to generate a structured log of the whole session — what was discussed, challenged, and decided. Let AI do the documenting so you stay focused on the thinking.',
    realSkill: 'Using AI as a critical evaluator. Most people use AI to confirm what they already think — this mode teaches you to stress-test it, and come out stronger.'
  },
  {
    id: 'CU-W1-TUE', program: 'cs-ttt-cohort', group: 'Week 1 — AI Thinking Modes', track: 'prompt-engineering', difficulty: 'advanced',
    day: 'TUE', requirement: 'optional', emoji: '🎯', timeEstimate: 20,
    title: 'The Translator',
    hook: 'Profile the audience before you write a single word.',
    mission: 'Take Monday\'s idea and prepare it for three audiences: a senior leader, a customer, and a technical audience. Have AI profile each one FIRST — what they fear, what they want, what language lands, what loses them in ten seconds. Let the profile drive the message, not your instinct.',
    submission: 'For each audience: the AI-generated profile, their likely concern, the positioning angle you chose, and the final message. Post all three.',
    proTip: 'Profile all three audiences in a single prompt first for a comparison view, then go deep on each one separately — the differences in what they need to hear are often surprising.',
    realSkill: 'Using AI as a persona analyst before using it as a writer. The sequence matters: profile first, message second.'
  },
  {
    id: 'CU-W1-WED', program: 'cs-ttt-cohort', group: 'Week 1 — AI Thinking Modes', track: 'prompt-engineering', difficulty: 'advanced',
    day: 'WED', requirement: 'optional', emoji: '💡', timeEstimate: 20,
    title: 'Make the Complex Simple',
    hook: 'Explain your idea with analogies — without making it wrong.',
    mission: 'Take your idea, product, process, or concept and have AI explain it through analogies for three different audiences. The goal: easier to understand without becoming inaccurate.',
    submission: 'Three audience-specific analogies + a short note on which worked best and what it may oversimplify. Post in the channel.',
    proTip: 'After the first set of analogies, ask: "which of these could be misunderstood, and how?" That follow-up is where the real refinement happens — and it writes your note for you.',
    realSkill: 'Using AI as a translation engine, philosopher, and simplifier — a thinking partner across registers. It transfers to every deck and every stakeholder conversation you\'ll ever have.'
  },
  {
    id: 'CU-W1-THU', program: 'cs-ttt-cohort', group: 'Week 1 — AI Thinking Modes', track: 'prompt-engineering', difficulty: 'advanced',
    day: 'THU', requirement: 'optional', emoji: '🔍', timeEstimate: 20,
    title: 'Reverse Engineer the Prompt',
    hook: 'Think backwards from great output to great input.',
    mission: 'Find a strong piece of output — a compelling proposal, a sharp executive summary, a well-structured QBR, a clear slide outline. Ask AI what prompt most likely created it. Then improve that prompt, and keep iterating until it\'s genuinely better than where you started.',
    submission: 'Three things: the likely original prompt, your improved version, and the three quality instructions that made the biggest difference. Post in the channel.',
    proTip: 'Ask for the reverse-engineering in four parts — "what role, context, format instructions, and constraints would have produced this?" — a much richer start than asking for one prompt in one shot.',
    realSkill: 'The foundation of everyone who uses AI at a high level — and a skill you can teach others immediately.'
  },
  {
    id: 'CU-W1-FRI', program: 'cs-ttt-cohort', group: 'Week 1 — AI Thinking Modes', track: 'prompt-engineering', difficulty: 'advanced',
    day: 'FRI', requirement: 'mandatory', emoji: '🎯', timeEstimate: 45,
    title: 'The Situation Room',
    hook: 'Navigate one genuinely messy, real situation — with all four modes.',
    mission: 'Take one ambiguous, multi-layered situation from your work: a relationship showing risk signals, a leadership ask with unclear scope, a proposal that must land with multiple stakeholders. Use all four modes from this week — Challenge the assumptions, Translate for your audiences, Simplify the core message, and Reverse-engineer what a great output looks like before building it.',
    submission: 'Four parts: (1) your AI-assisted read of what\'s really going on, (2) your recommended path with rationale, (3) one stakeholder communication for the most important audience, (4) a one-page reflection — where AI helped you think better, where it led you astray, and where human judgment was irreplaceable. Post all four.',
    proTip: 'Start with an unfiltered brain dump — paste everything you know about the situation in one go, then ask AI to structure what matters most BEFORE touching solutions. That clarity is what separates the best submissions.',
    realSkill: 'End-to-end AI-assisted judgment — not just production, navigation. You\'re building a repeatable thinking process you can use and teach for the rest of your career.'
  },
  {
    id: 'CU-W2-MON', program: 'cs-ttt-cohort', group: 'Week 2 — Data Intelligence', track: 'data-analysis', difficulty: 'advanced',
    day: 'MON', requirement: 'optional', emoji: '📊', timeEstimate: 20,
    title: 'Make the Data Real',
    hook: 'AI isn\'t just a content generator — make it engineer data.',
    mission: 'Use AI to generate a clean, realistic synthetic dataset for a scenario from your role: customer health scores, renewal pipeline, support ticket trends, onboarding completion. Don\'t stop at rows — push AI to engineer patterns in: regional trends, time-based shifts, anomalies, outliers, correlations. This dataset is the prototype foundation for Friday\'s live dashboard. Before submitting, ask AI: what story does this data tell, and what should a dashboard surface first?',
    submission: 'Your dataset (CSV or table) + the AI-generated pattern summary. Post in the channel.',
    proTip: 'Have AI build two competing patterns in — one that confirms what you\'d expect, one that surprises you. Pattern recognition only becomes a skill when the data doesn\'t behave the way you assumed.',
    realSkill: 'AI can generate structured synthetic data engineered for pattern recognition and prototyping — a capability most professionals have never touched. It changes how you think about building with data.'
  },
  {
    id: 'CU-W2-TUE', program: 'cs-ttt-cohort', group: 'Week 2 — Data Intelligence', track: 'data-analysis', difficulty: 'advanced',
    day: 'TUE', requirement: 'optional', emoji: '🔍', timeEstimate: 20,
    title: 'Data Detective',
    hook: 'AI is built on pattern recognition. Point it at your data.',
    mission: 'Take Monday\'s dataset — or real business data you have access to — and have AI digest it completely. Don\'t ask for a summary; ask for the what, how, where, why, and the prediction: what\'s happening, how it got here, where it\'s concentrated, why it looks this way, and where it\'s heading if nothing changes. Push until AI surfaces something you genuinely didn\'t see. Then push further: what would a skeptical CFO challenge? What can\'t the data explain? What additional data would change the picture entirely?',
    submission: 'Your most powerful insight + the prompt sequence that unlocked it. Post in the channel.',
    proTip: 'After the first round of analysis, ask AI: "what am I not asking that I should be?" That single follow-up consistently unlocks the most valuable insight of the session.',
    realSkill: 'AI was built on pattern recognition — most people never use it that way. Once you\'ve surfaced a hidden pattern in real data, you\'ll never look at a spreadsheet the same way again.'
  },
  {
    id: 'CU-W2-WED', program: 'cs-ttt-cohort', group: 'Week 2 — Data Intelligence', track: 'data-analysis', difficulty: 'advanced',
    day: 'WED', requirement: 'optional', emoji: '🌐', timeEstimate: 25,
    title: 'Connect to the Real World',
    hook: 'Your data doesn\'t exist in a vacuum — wire it to the world.',
    mission: 'Real data is shaped by forces outside the spreadsheet. Feed AI relevant outside signals — market shifts, industry news, economic indicators, competitor moves, sentiment trends — anything that could plausibly bend Tuesday\'s patterns. Ask it to connect those external forces to your internal data and project a future state: what does this data look like in 12 months if these forces continue? What risks emerge, what opportunities appear, and which of your data\'s assumptions become dangerous?',
    submission: 'Your real-world connector summary + the AI-generated future-state projection. Post in the channel.',
    proTip: 'Ask for three future states — optimistic, pessimistic, and most likely. The gap between those three is where the most important strategic questions live.',
    realSkill: 'AI as a signal synthesizer — connecting external reality to internal data for forward-looking intelligence. Analysts and strategists spend weeks doing this manually; with AI it\'s a session.'
  },
  {
    id: 'CU-W2-THU', program: 'cs-ttt-cohort', group: 'Week 2 — Data Intelligence', track: 'data-analysis', difficulty: 'advanced',
    day: 'THU', requirement: 'optional', emoji: '📝', timeEstimate: 30,
    title: 'The Intelligence Report',
    hook: 'Turn the week\'s data work into a brief a leader can act on.',
    mission: 'Write the analytical backbone of Friday\'s dashboard — a four-section Data Intelligence Report. 1) Data Analysis: what the dataset shows, key metrics, the overall picture. 2) Anomalies & Hidden Patterns: what doesn\'t fit, what surprised you, what the human eye would have missed. 3) Key Insights & Implications: the so-what and why it matters for the business. 4) Future State Argument: drawing on Wednesday\'s connectors, where this data is heading, what forces drive it, and what leadership should consider acting on now. The clearer this brief, the stronger your dashboard.',
    submission: 'The full four-section report. Post in the channel.',
    proTip: 'After AI drafts each section, ask: "what is the single most important sentence in this section — and is it currently the most prominent?" Forcing AI to rank its own findings improves every section.',
    realSkill: 'Synthesizing a week of data work into one coherent intelligence document. Data without a structured argument is just noise — this turns it into something a senior leader can read, trust, and act on.'
  },
  {
    id: 'CU-W2-FRI', program: 'cs-ttt-cohort', group: 'Week 2 — Data Intelligence', track: 'data-analysis', difficulty: 'advanced',
    day: 'FRI', requirement: 'mandatory', emoji: '🖥️', timeEstimate: 60,
    title: 'The Live Dashboard',
    hook: 'The week comes together: one live artifact that speaks for itself.',
    mission: 'You have the data, the patterns, the real-world connections, and the intelligence report. Now build the dashboard that brings it all to life. Use AI to build a fully functional live dashboard that visualizes your dataset and tells the complete story — what the data shows, what\'s hidden inside it, what the world outside is doing to it, and where it\'s heading. Must include at least three chart types, a key-insights panel, an anomalies callout, and a future-state projection section. The bar: polished enough to open a leadership meeting without apology — credible enough that a CFO asks follow-up questions instead of dismissing it.',
    submission: 'Your live dashboard link or HTML file + Thursday\'s Intelligence Report as the companion document. Post both in the channel.',
    proTip: 'Before building, paste Thursday\'s report into AI and ask: "what must this dashboard communicate in the first ten seconds to a senior leader?" Let that answer drive the layout, headline metrics, and visual hierarchy — not your instinct about what looks good.',
    realSkill: 'Turning a week of thinking into a single artifact — data, patterns, real-world intelligence, narrative, and design, all in one place, all working together, ready for a leadership conversation.'
  },
  {
    id: 'CU-W3-MON', program: 'cs-ttt-cohort', group: 'Week 3 — Design It, Build It, Ship It', track: 'process-automation', difficulty: 'advanced',
    day: 'MON', requirement: 'optional', emoji: '✏️', timeEstimate: 25,
    title: 'Design the Process',
    hook: 'Think with your hands first — then let AI read the drawing.',
    mission: 'Before touching any AI tool, design a new or improved CS process from scratch — a customer onboarding flow, a renewal readiness check, a health-score intervention path, an escalation framework. Draw it BY HAND: every stage, decision point, and handoff. Photograph it. Then feed the photo to an AI vision tool and ask it to interpret the drawing, refine the logic, and write a polished one-page process brief — what it is, how it flows, who owns each stage, and why it matters. Data note: if your scenario draws on real Equinix customers or internal data, use ACE, Copilot, or SideKick only — never external tools.',
    submission: 'Two artifacts: the photo of your hand-drawn design + the AI-generated process brief. Post both in the channel.',
    proTip: 'Tell AI: "interpret this hand-drawn process diagram, identify any gaps or logical inconsistencies, and write a structured one-page brief — what this process is, how it flows, and what value it delivers." The more specific the instruction, the more useful the brief.',
    realSkill: 'AI as a visual interpreter and articulator. You provide the thinking in its rawest, most honest form; AI structures it and gives it language. Analog first, AI second — that sequence beats starting from a blank prompt, every time.'
  },
  {
    id: 'CU-W3-TUE', program: 'cs-ttt-cohort', group: 'Week 3 — Design It, Build It, Ship It', track: 'application-building', difficulty: 'advanced',
    day: 'TUE', requirement: 'optional', emoji: '🎬', timeEstimate: 30,
    title: 'Build the App',
    hook: 'Yesterday\'s sketch becomes a living application today.',
    mission: 'Feed Monday\'s photograph AND process brief into an AI builder tool — together. Ask for a fully functional animated HTML application that brings your process to life: each stage appearing in sequence with smooth transitions, interactive elements a user can click through, and a design polished enough to share with a colleague. Don\'t accept the first output — iterate until the animation matches your intent and the interactions feel intuitive. Same data rule as Monday: internal content stays in ACE, Copilot, or SideKick.',
    submission: 'Your working HTML file. Post in the channel.',
    proTip: 'One prompt, both inputs: "use the hand-drawn diagram as the structural reference and the brief as the content guide — build an animated interactive HTML flow a CS professional could walk through in under three minutes." Both inputs together produces a more faithful result than feeding them separately.',
    realSkill: 'Transforming a hand-drawn concept into a functional interactive application without writing a single line of code. The distance between an idea on paper and a working app just collapsed to one well-constructed prompt and a willingness to iterate.'
  },
  {
    id: 'CU-W3-WED', program: 'cs-ttt-cohort', group: 'Week 3 — Design It, Build It, Ship It', track: 'application-building', difficulty: 'advanced',
    day: 'WED', requirement: 'optional', emoji: '🔧', timeEstimate: 25,
    title: 'Perfect and Package',
    hook: 'A working app and a deployable app are two different things.',
    mission: 'Close the gap between working and deployable. Three jobs: 1) Perfect the experience — fix anything that feels rough, unclear, or unfinished. 2) Clean the code — have AI review the HTML, remove redundancies, and make the file structure logical and maintainable. 3) Decompose it into a proper package — separate files, cleanly organized, ready to upload to a repository.',
    submission: 'The finished packaged app as a compressed folder. Post in the channel.',
    proTip: 'Before finalizing, ask AI: "review this application and tell me three things that would confuse a first-time user, three things that look unpolished, and three code-structure improvements before deployment." That one prompt surfaces more refinements than you\'d catch yourself.',
    realSkill: 'AI as a quality-assurance and packaging tool. Building something is one skill — shipping something clean is another. Today you learn the difference.'
  },
  {
    id: 'CU-W3-THU', program: 'cs-ttt-cohort', group: 'Week 3 — Design It, Build It, Ship It', track: 'code-technical', difficulty: 'beginner',
    day: 'THU', requirement: 'optional', emoji: '📺', timeEstimate: 30,
    title: 'Learn GitHub',
    hook: 'Before you ship to the world, learn where your work will live.',
    mission: 'Watch the beginner video "GitHub Basics Made Easy" by Skill Foundry (youtube.com/watch?v=Oaj3RBIoGFc) — what GitHub is, how it works, and how to clone, commit, push, and pull. No coding background needed. Watch it fully and take notes. No tools needed today — learn only.',
    submission: 'One thing that surprised you + one question you still have. Post both in the channel.'
  },
  {
    id: 'CU-W3-FRI', program: 'cs-ttt-cohort', group: 'Week 3 — Design It, Build It, Ship It', track: 'code-technical', difficulty: 'advanced',
    day: 'FRI', requirement: 'mandatory', emoji: '🚀', timeEstimate: 45,
    title: 'Ship It',
    hook: 'Sketch on Monday. Live URL on Friday. Ship it.',
    mission: 'Everything this week has been building to this. Create your GitHub account using your Equinix credentials. Create a new public repository. Upload your Week 3 packaged application. Enable GitHub Pages and publish it live. You now have a real URL — a CS process tool you designed by hand on Monday, built with AI on Tuesday, refined on Wednesday, and shipped to the world on Friday.',
    submission: 'Your live GitHub Pages link + Monday\'s process brief as the companion document. Post both in the channel.',
    proTip: 'Once your link is live, open it on your phone and share it with someone outside the program before you post it. If they understand what it does in 30 seconds without any explanation, it\'s ready. If not, add one clarifying element before submitting.',
    realSkill: 'Taking an idea from analog sketch to live deployed application in five days — nothing but great thinking, smart prompting, and the right tools in the right sequence. That\'s not a training exercise. That\'s a professional capability.'
  },
  {
    id: 'AA-D01', program: 'ai-april', group: 'Week 1 — Apr 1–3 · 3-Day Kickoff', track: 'creative-storytelling', difficulty: 'beginner',
    day: 'WED', requirement: 'optional', emoji: '🦸', timeEstimate: 15,
    title: 'AI Alter Ego',
    hook: 'Your professional bio, but make it superhero.',
    mission: 'Rewrite your professional bio as a superhero origin story — your superpower, your origin moment, and your nemesis. Have Copilot reformat it as a LinkedIn post.',
    submission: 'Share both versions — the origin story and the LinkedIn post.'
  },
  {
    id: 'AA-D02', program: 'ai-april', group: 'Week 1 — Apr 1–3 · 3-Day Kickoff', track: 'visual-creation', difficulty: 'beginner',
    day: 'THU', requirement: 'optional', emoji: '🎨', timeEstimate: 15,
    title: 'Triple Style Portrait',
    hook: 'Same you, three wildly different art styles.',
    mission: 'Generate yourself in 3 wildly different art styles using Copilot Designer: watercolour, cyberpunk neon, and Renaissance oil painting. Same description, only the style tag changes.',
    submission: 'The 3 portraits with the prompts used.'
  },
  {
    id: 'AA-D03', program: 'ai-april', group: 'Week 1 — Apr 1–3 · 3-Day Kickoff', track: 'presentation', difficulty: 'intermediate',
    day: 'FRI', requirement: 'mandatory', emoji: '📊', timeEstimate: 45,
    title: 'AI Strategy Deck',
    hook: 'Friday flagship: the AI-in-our-team strategy deck.',
    mission: 'Build a 6-slide "AI in Our Team" strategy deck using Copilot in PowerPoint. Must include: Current State, AI Opportunity, 3 Recommended Tools with use cases, Implementation Roadmap, Risks & Mitigations, and Success Metrics. Use Copilot to write every slide, then add speaker notes.',
    submission: 'The final 6-slide deck with speaker notes.'
  },
  {
    id: 'AA-D04', program: 'ai-april', group: 'Week 2 — Apr 6–10 · First Full Week', track: 'content-generation', difficulty: 'beginner',
    day: 'MON', requirement: 'optional', emoji: '🎭', timeEstimate: 15,
    title: 'Tone Tornado',
    hook: 'One late-email, five outrageous tones.',
    mission: 'Write one email saying you’ll be 5 minutes late. Have AI rewrite it in 5 very different tones: Shakespearean, passive-aggressive, Gen Z, corporate buzzword soup, and pirate.',
    submission: 'All 5 versions.'
  },
  {
    id: 'AA-D05', program: 'ai-april', group: 'Week 2 — Apr 6–10 · First Full Week', track: 'visual-creation', difficulty: 'intermediate',
    day: 'TUE', requirement: 'optional', emoji: '🌌', timeEstimate: 20,
    title: 'Alternate Universe Office',
    hook: 'Your office, three alternate realities.',
    mission: 'Generate your workplace reimagined in 3 alternate realities using Copilot Designer: underwater research lab, medieval castle, and space station. Should feel like the same place — different universe.',
    submission: 'The 3 images.'
  },
  {
    id: 'AA-D06', program: 'ai-april', group: 'Week 2 — Apr 6–10 · First Full Week', track: 'creative-storytelling', difficulty: 'intermediate',
    day: 'WED', requirement: 'optional', emoji: '🎸', timeEstimate: 20,
    title: 'Mood Soundtrack',
    hook: 'Three work moods, three AI-generated tracks.',
    mission: 'Generate 3 music tracks for 3 work scenarios: deep focus session, Friday afternoon wind-down, and a high-pressure incident. One Gemini prompt each.',
    submission: 'The 3 tracks + which prompt captured its mood best.'
  },
  {
    id: 'AA-D07', program: 'ai-april', group: 'Week 2 — Apr 6–10 · First Full Week', track: 'process-automation', difficulty: 'intermediate',
    day: 'THU', requirement: 'optional', emoji: '🔄', timeEstimate: 25,
    title: 'Process Flow Animation',
    hook: 'Turn a 5-step process into an animated flowchart.',
    mission: 'Describe any 5-step work process to Claude. Ask it to build an animated HTML flowchart where each step reveals in sequence with smooth transitions. Must be click-through interactive.',
    submission: 'The working interactive flowchart.'
  },
  {
    id: 'AA-D08', program: 'ai-april', group: 'Week 2 — Apr 6–10 · First Full Week', track: 'application-building', difficulty: 'advanced',
    day: 'FRI', requirement: 'mandatory', emoji: '📈', timeEstimate: 60,
    title: 'Live Team Dashboard',
    hook: 'Friday flagship: a live team ops dashboard.',
    mission: 'Build a fully functional live team operations dashboard using Claude Artifacts. Must include: at least 4 chart types, animated metrics, status indicators, and a team progress tracker. Use ChatGPT to design the data story first, then Claude to build the live app.',
    submission: 'The live dashboard — polished enough to show leadership.'
  },
  {
    id: 'AA-D09', program: 'ai-april', group: 'Week 3 — Apr 13–17 · Storytelling, Data & Multi-Tool', track: 'content-generation', difficulty: 'intermediate',
    day: 'MON', requirement: 'optional', emoji: '📢', timeEstimate: 20,
    title: 'Content Multiplier',
    hook: 'One idea, five formats, one session.',
    mission: 'Take one real idea from your current project. Expand it into 5 formats in a single AI session: a tweet thread, a LinkedIn post, an internal email, a meeting talking point, and a one-pager headline.',
    submission: 'All 5 formats.'
  },
  {
    id: 'AA-D10', program: 'ai-april', group: 'Week 3 — Apr 13–17 · Storytelling, Data & Multi-Tool', track: 'creative-storytelling', difficulty: 'intermediate',
    day: 'TUE', requirement: 'optional', emoji: '🌟', timeEstimate: 25,
    title: 'Your Origin Story',
    hook: 'Your career as a 4-panel graphic novel.',
    mission: 'Write your professional journey — how you got here — using ChatGPT. Illustrate it as a 4-panel graphic novel with DALL·E. Each panel must match a real scene from your story.',
    submission: 'The 4-panel graphic novel.'
  },
  {
    id: 'AA-D11', program: 'ai-april', group: 'Week 3 — Apr 13–17 · Storytelling, Data & Multi-Tool', track: 'creative-storytelling', difficulty: 'intermediate',
    day: 'WED', requirement: 'optional', emoji: '🎤', timeEstimate: 25,
    title: 'AI Original Song',
    hook: 'Write the song. Generate the music. Submit both.',
    mission: 'Write full original lyrics about your job, team, or project with ChatGPT — pick a real genre, include verse, chorus, and bridge. Then use Gemini to generate the actual music.',
    submission: 'Both — the lyrics and the track.'
  },
  {
    id: 'AA-D12', program: 'ai-april', group: 'Week 3 — Apr 13–17 · Storytelling, Data & Multi-Tool', track: 'creative-storytelling', difficulty: 'intermediate',
    day: 'THU', requirement: 'optional', emoji: '📅', timeEstimate: 25,
    title: 'Animated Project Timeline',
    hook: 'A project timeline that draws itself.',
    mission: 'Give Claude a real or fictional project with 6 milestones and dates. Ask it to build an animated horizontal timeline that draws itself left to right with milestone labels and status indicators.',
    submission: 'The animated timeline.'
  },
  {
    id: 'AA-D13', program: 'ai-april', group: 'Week 3 — Apr 13–17 · Storytelling, Data & Multi-Tool', track: 'presentation', difficulty: 'advanced',
    day: 'FRI', requirement: 'mandatory', emoji: '🎬', timeEstimate: 60,
    title: 'AI-Powered Project Pitch',
    hook: 'Friday flagship: the four-format project pitch.',
    mission: 'Create a complete multi-format pitch for a real initiative from your work: (1) a polished 5-slide Copilot PPT deck, (2) a 60-second explainer video script with storyboard (ChatGPT), (3) an animated process workflow diagram (Claude), and (4) a Gemini-generated music track for the presentation.',
    submission: 'All four deliverables, submitted together.'
  },
  {
    id: 'AA-D14', program: 'ai-april', group: 'Week 4 — Apr 22–25 · Build Week', track: 'data-analysis', difficulty: 'intermediate',
    day: 'MON', requirement: 'optional', emoji: '📊', timeEstimate: 20,
    title: 'Chart from Chaos',
    hook: 'Raw data in, three charts and an insight out.',
    mission: 'Take any raw data from your work (or invent realistic data). Use Copilot in Excel to generate 3 different chart types.',
    submission: 'All 3 charts with a one-line insight each — let the data speak.'
  },
  {
    id: 'AA-D15', program: 'ai-april', group: 'Week 4 — Apr 22–25 · Build Week', track: 'data-analysis', difficulty: 'intermediate',
    day: 'TUE', requirement: 'optional', emoji: '🔢', timeEstimate: 25,
    title: 'Formula Wizard',
    hook: 'Three formulas you genuinely need, written for you.',
    mission: 'Describe 3 Excel calculations you genuinely need at work. Use Copilot to write the formulas, explain them in plain English, and demonstrate them on sample data.',
    submission: 'The results — formulas, explanations, demos.'
  },
  {
    id: 'AA-D16', program: 'ai-april', group: 'Week 4 — Apr 22–25 · Build Week', track: 'application-building', difficulty: 'intermediate',
    day: 'WED', requirement: 'optional', emoji: '💬', timeEstimate: 30,
    title: 'Standup Bot',
    hook: 'A standup assistant that formats and copies for you.',
    mission: 'Build a daily standup assistant — asks the 3 standup questions one by one, collects answers, formats and copies a clean post to clipboard. Ready to paste straight into Slack or Teams.',
    submission: 'The working standup bot.'
  },
  {
    id: 'AA-D17', program: 'ai-april', group: 'Week 4 — Apr 22–25 · Build Week', track: 'visual-creation', difficulty: 'intermediate',
    day: 'THU', requirement: 'optional', emoji: '📦', timeEstimate: 25,
    title: 'Product Concept Art',
    hook: 'Three plausible products that don’t exist — yet.',
    mission: 'Invent 3 products from your industry that don’t yet exist. Generate professional concept art for each with Copilot Designer. Must look plausible and launchable — not joke items.',
    submission: 'The 3 concept-art pieces.'
  },
  {
    id: 'AA-D18', program: 'ai-april', group: 'Week 4 — Apr 22–25 · Build Week', track: 'application-building', difficulty: 'advanced',
    day: 'FRI', requirement: 'mandatory', emoji: '🛠️', timeEstimate: 60,
    title: 'Vibe Code a Real Work Tool',
    hook: 'Friday flagship: ship a real tool at a live URL.',
    mission: 'Build and ship a fully functional app that solves a real problem your team faces — using Lovable.dev, Base44, or Replit. Must be live at a shareable URL.',
    submission: 'The live link + a 3-sentence explanation of the problem it solves and who it helps.'
  },
  {
    id: 'AA-D19', program: 'ai-april', group: 'Week 5 — Apr 27–30 · Final Week', track: 'content-generation', difficulty: 'intermediate',
    day: 'MON', requirement: 'optional', emoji: '📋', timeEstimate: 20,
    title: 'Meeting Recap Machine',
    hook: 'Chaos notes in — summary, actions, email out.',
    mission: 'Paste your roughest, most chaotic meeting notes into ChatGPT or Copilot. Extract: a clean 5-line summary, 5 action items with owners, and a ready-to-send follow-up email — all from the same messy input.',
    submission: 'All three artifacts.'
  },
  {
    id: 'AA-D20', program: 'ai-april', group: 'Week 5 — Apr 27–30 · Final Week', track: 'creative-storytelling', difficulty: 'intermediate',
    day: 'TUE', requirement: 'optional', emoji: '🔮', timeEstimate: 25,
    title: 'Industry Fable',
    hook: 'Your industry, five years out, as a fable.',
    mission: 'Write a short fable set in your industry 5 years from now. Characters: the innovator, the skeptic, the manager, the intern. Illustrate 2 key scenes and each character with DALL·E.',
    submission: 'The fable + illustrations.'
  },
  {
    id: 'AA-D21', program: 'ai-april', group: 'Week 5 — Apr 27–30 · Final Week', track: 'application-building', difficulty: 'advanced',
    day: 'WED', requirement: 'optional', emoji: '📡', timeEstimate: 30,
    title: 'Live Ops Dashboard',
    hook: 'A dashboard that looks like a real monitoring screen.',
    mission: 'Ask Claude to build an animated operations dashboard — live-updating metrics, pulsing status indicators, filling progress bars. Must look like a real monitoring screen, not a static wireframe.',
    submission: 'The animated dashboard.'
  },
  {
    id: 'AA-D22', program: 'ai-april', group: 'Week 5 — Apr 27–30 · Final Week', track: 'application-building', difficulty: 'intermediate',
    day: 'THU', requirement: 'optional', emoji: '🌐', timeEstimate: 25,
    title: 'Clickable Org Chart',
    hook: 'An org chart people can actually click.',
    mission: 'Describe your team structure to Claude. Ask it to build an animated org chart where clicking any person expands their role and responsibilities. Must be at least 3 levels deep.',
    submission: 'The clickable org chart.'
  }
];

// ── Builder integration — pull program sets into any new program ──
// Adapts set activities to the standard activity shape so the builder
// library, schedule, preview, and exports all handle them natively.
// The set's default required/optional seeds the schedule slot, which
// stays changeable via the slot's Mandatory/Optional toggle.
function customSetActivities() {
  return CUSTOM_ACTIVITIES.map(a => {
    const prog = CUSTOM_PROGRAMS.find(p => p.id === a.program);
    return {
      id: a.id,
      track: a.track,
      title: a.title,
      emoji: a.emoji,
      difficulty: a.difficulty,
      timeEstimate: a.timeEstimate,
      description: a.hook,
      detailedInstructions: a.mission + (a.proTip ? ' Pro tip: ' + a.proTip : ''),
      deliverable: a.submission,
      skillsBuilt: [],
      tags: [prog ? prog.label : a.program, a.group].filter(Boolean),
      fromProgram: a.program,
      fromProgramIcon: prog ? prog.icon : '★',
      defaultRequired: a.requirement || 'optional'
    };
  });
}

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
          <div class="sh-eyebrow bracket">[ 03 · Program sets ]</div>
          <h1 class="sh-title">Custom <span class="accent">activities</span>.</h1>
          <p class="sh-sub">Activity sets from the programs we run, organized by program — pull any of them into a new program from the builder. Defaults shown here are each activity’s status in its home program; you set required/optional per program in design mode.</p>
        </div>
        <div class="sh-meta"><b>${CUSTOM_ACTIVITIES.length}</b>activities</div>
      </div>
    </section>

    <div class="wrap" style="padding-top: 32px; padding-bottom: 80px;">
      ${CUSTOM_PROGRAMS.map(prog => {
        const items = CUSTOM_ACTIVITIES.filter(a => a.program === prog.id);
        const groups = [...new Set(items.map(a => a.group))];
        return `
          <div class="cs-cat">
            <div class="cs-cat-head">
              <span class="cs-cat-icon">${prog.icon}</span>
              <div>
                <h2 class="cs-cat-title">${escapeHtml(prog.label)} <span class="prog-status ${prog.status}">${prog.status}</span></h2>
                <p class="cs-cat-sub">${escapeHtml(prog.description)}</p>
              </div>
              <span class="cs-cat-count">${items.length} activities</span>
              ${items.length ? `
              <div class="cs-cat-actions">
                <button class="btn small ghost" onclick="exportCustomSetHTML('${prog.id}')" title="Download this program's set as a standalone HTML page (long-card layout)">⬇ Export HTML</button>
                <button class="btn small ghost" onclick="printCustomSet('${prog.id}')" title="Open a print-ready view — save as PDF from the print dialog">🖨 Print / PDF</button>
              </div>` : ''}
            </div>
            ${items.length === 0
              ? `<div class="cs-empty">No activities imported yet — this program’s set is on its way.</div>`
              : groups.map(g => `
                ${g ? `<h3 class="cs-group">${escapeHtml(g)}</h3>` : ''}
                <div class="flip-grid">
                  ${items.filter(a => a.group === g).map(customActivityCard).join('')}
                </div>
              `).join('')}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function customActivityCard(a) {
  const track = TRACKS.find(t => t.id === a.track);
  const def = a.requirement === 'mandatory'
    ? '<span class="cu-def mandatory" title="Status in its home program — changeable per program in the builder">Default: Mandatory</span>'
    : '<span class="cu-def" title="Status in its home program — changeable per program in the builder">Default: Optional</span>';
  return `
    <div class="flip-card" onclick="this.classList.toggle('flipped')" role="button" tabindex="0"
         onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.classList.toggle('flipped');}">
      <div class="flip-inner">
        <div class="flip-face flip-front cu-day-${a.day.toLowerCase()}">
          <div class="cu-top">
            <span class="cu-day">${a.day}</span>
            ${def}
          </div>
          <div class="cu-emoji">${a.emoji}</div>
          <h3 class="cu-title">${escapeHtml(a.title)}</h3>
          <p class="cu-hook">${escapeHtml(a.hook)}</p>
          <div class="cu-meta">
            <span>${track ? track.icon + ' ' + track.name : ''}</span>
            <span class="cu-meta-row"><span class="diff-pill diff-${a.difficulty}">★★★ ${a.difficulty}</span> · ${a.timeEstimate} min</span>
          </div>
          <span class="cu-flip-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v4h4"/></svg>
            Flip for the full brief
          </span>
        </div>
        <div class="flip-face flip-back">
          <div class="cu-back-head">
            <span>${a.emoji} ${escapeHtml(a.title)}</span>
            <span class="cu-back-day">${a.day}</span>
          </div>
          <div class="cu-back-scroll">
            <div class="cu-sec"><h4>The mission</h4><p>${escapeHtml(a.mission)}</p></div>
            <div class="cu-sec"><h4>Your submission</h4><p>${escapeHtml(a.submission)}</p></div>
            ${a.proTip ? `<div class="cu-sec tip"><h4>💡 Pro tip</h4><p>${escapeHtml(a.proTip)}</p></div>` : ''}
            ${a.realSkill ? `<div class="cu-sec skill"><h4>The real skill</h4><p>${escapeHtml(a.realSkill)}</p></div>` : ''}
          </div>
          <span class="cu-flip-btn back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v4h-4"/></svg>
            Flip back
          </span>
        </div>
      </div>
    </div>
  `;
}

// ── Static exports — long cards, no flipping in static media ────
// Used for the downloadable HTML and the print/PDF view: every card
// is rendered full-length with the complete brief laid out flat.
function _customSetStaticHTML(progId) {
  const prog = CUSTOM_PROGRAMS.find(p => p.id === progId);
  const items = CUSTOM_ACTIVITIES.filter(a => a.program === progId);
  const groups = [...new Set(items.map(a => a.group))];
  const esc = s => String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
  const dayColors = { MON:'#7C3AED', TUE:'#0EA5E9', WED:'#F59E0B', THU:'#EC4899', FRI:'#10B981' };
  const card = a => {
    const track = TRACKS.find(t => t.id === a.track);
    const dc = dayColors[a.day] || '#7C3AED';
    const def = a.requirement === 'mandatory'
      ? '<span class="def mand">Default: Mandatory</span>'
      : '<span class="def">Default: Optional</span>';
    return `
    <div class="card">
      <div class="card-head">
        <span class="day" style="color:${dc}; border-color:${dc}; background:${dc}14">${esc(a.day)}</span>
        <span class="emoji">${a.emoji}</span>
        <div class="titles">
          <h2>${esc(a.title)}</h2>
          <div class="meta">${track ? track.icon + ' ' + esc(track.name) : ''} · ★★★ ${esc(a.difficulty)} · ${a.timeEstimate} min</div>
        </div>
        ${def}
      </div>
      <p class="hook">${esc(a.hook)}</p>
      <div class="sec"><h3>The mission</h3><p>${esc(a.mission)}</p></div>
      <div class="sec"><h3>Your submission</h3><p>${esc(a.submission)}</p></div>
      ${a.proTip ? `<div class="sec tip"><h3>💡 Pro tip</h3><p>${esc(a.proTip)}</p></div>` : ''}
      ${a.realSkill ? `<div class="sec"><h3>The real skill</h3><p>${esc(a.realSkill)}</p></div>` : ''}
    </div>`;
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(prog.label)} — Custom Activities</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: "Helvetica Neue", Arial, sans-serif; color: #14152B; background: #FAFAFC; padding: 40px 20px; line-height: 1.5; }
  .wrap { max-width: 760px; margin: 0 auto; }
  .head { display: flex; align-items: flex-start; gap: 14px; border-bottom: 2px solid #14152B; padding-bottom: 16px; margin-bottom: 10px; }
  .head .icon { font-size: 34px; }
  .head h1 { font-size: 22px; letter-spacing: -0.01em; }
  .head .sub { color: #5F6489; font-size: 13px; margin-top: 4px; max-width: 60ch; }
  .brand { font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase; color: #8A8FB0; margin: 10px 0 26px; }
  .brand b { color: #5B21B6; }
  .group { font-size: 13px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #5B21B6; margin: 22px 0 12px; padding-left: 9px; border-left: 3px solid #7C3AED; }
  .card { background: #fff; border: 1px solid #E4E4EE; border-radius: 12px; padding: 22px 24px; margin-bottom: 18px; break-inside: avoid; page-break-inside: avoid; }
  .card-head { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .day { font-family: ui-monospace, Menlo, monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; padding: 3px 10px; border-radius: 999px; border: 1.5px solid; }
  .emoji { font-size: 26px; }
  .titles { flex: 1; }
  .titles h2 { font-size: 17px; letter-spacing: -0.01em; }
  .meta { font-size: 11.5px; color: #8A8FB0; margin-top: 2px; }
  .def { font-family: ui-monospace, Menlo, monospace; font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: #8A8FB0; border: 1px dashed #CBD5E1; border-radius: 999px; padding: 3px 9px; white-space: nowrap; }
  .def.mand { color: #C2410C; border: 1px solid #FDBA74; background: #FFF7ED; font-weight: 700; }
  .hook { font-size: 13.5px; font-style: italic; color: #5B21B6; margin-bottom: 12px; }
  .sec { margin-bottom: 10px; }
  .sec h3 { font-family: ui-monospace, Menlo, monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #7C3AED; margin-bottom: 3px; }
  .sec p { font-size: 12.5px; color: #33344E; }
  .sec.tip { background: #F3EFFF; border-radius: 8px; padding: 9px 12px; }
  .note { font-size: 10.5px; color: #8A8FB0; margin-bottom: 20px; }
  .foot { text-align: center; font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase; color: #8A8FB0; margin-top: 26px; }
  @media print {
    body { background: #fff; padding: 0; }
    .card { border-color: #D8D8E4; }
  }
</style>
</head>
<body>
<div class="wrap">
  <div class="head">
    <span class="icon">${prog.icon}</span>
    <div>
      <h1>${esc(prog.label)}</h1>
      <p class="sub">${esc(prog.description)}</p>
    </div>
  </div>
  <div class="brand"><b>AI Activation Studio</b> · Custom Activities · ${items.length} activities</div>
  <p class="note">"Default" is each activity's status in this program's original design — when the set is reused in a new program, required/optional is set per program in the builder.</p>
  ${groups.map(g => `${g ? `<div class="group">${esc(g)}</div>` : ''}${items.filter(a => a.group === g).map(card).join('')}`).join('')}
  <div class="foot">AI Activation Studio · Plan · Build · Execute</div>
</div>
</body>
</html>`;
}

function exportCustomSetHTML(progId) {
  const prog = CUSTOM_PROGRAMS.find(p => p.id === progId);
  if (!prog) return;
  const html = _customSetStaticHTML(progId);
  downloadBlob(new Blob([html], { type: 'text/html' }), safeFileName(prog.label) + '.html');
  if (typeof toast === 'function') toast('Set exported as HTML — long-card layout, print-ready.');
}

function printCustomSet(progId) {
  const prog = CUSTOM_PROGRAMS.find(p => p.id === progId);
  if (!prog) return;
  const html = _customSetStaticHTML(progId);
  const w = window.open('', '_blank');
  if (!w) { if (typeof toast === 'function') toast('Pop-up blocked — allow pop-ups to print.'); return; }
  w.document.write(html);
  w.document.close();
  w.addEventListener('load', () => setTimeout(() => w.print(), 250));
}

if (typeof module !== 'undefined') module.exports = { CUSTOM_PROGRAMS, CUSTOM_ACTIVITIES, customSetActivities };
