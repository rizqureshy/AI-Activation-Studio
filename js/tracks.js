const TRACKS = [
  { id: 'prompt-engineering',  icon: '💬', name: 'Prompt Engineering Fundamentals', desc: 'Crafting effective prompts, iterating, prompt patterns.', audience: 'Everyone' },
  { id: 'content-generation',  icon: '✍️', name: 'Content Generation & Writing',    desc: 'Emails, reports, summaries, social posts, documentation.', audience: 'Marketing, Comms, All' },
  { id: 'data-analysis',       icon: '📊', name: 'Data Analysis & Insights',         desc: 'Synthetic data, pattern recognition, dashboards, storytelling.', audience: 'Analysts, Finance, Ops' },
  { id: 'visual-creation',     icon: '🎨', name: 'Visual Creation & Design',         desc: 'Image generation, presentations, concept art, brand visuals.', audience: 'Marketing, Product, Design' },
  { id: 'application-building',icon: '⚡', name: 'Application Building',             desc: 'No-code/vibe-coded apps, tools, dashboards, bots.', audience: 'Engineering-adjacent, Ops' },
  { id: 'process-automation',  icon: '🔄', name: 'Process Automation',               desc: 'Workflow automation, SOPs, decision trees, process mapping.', audience: 'Operations, IT, HR' },
  { id: 'presentation',        icon: '🎤', name: 'Presentation & Communication',     desc: 'Decks, pitch materials, executive summaries, video scripts.', audience: 'Sales, Leadership, PM' },
  { id: 'creative-storytelling',icon: '🎭', name: 'Creative & Storytelling',          desc: 'Narratives, fables, graphic novels, music, multimedia.', audience: 'All — engagement-focused' },
  { id: 'customer-intelligence',icon: '🎯', name: 'Customer Intelligence',            desc: 'Sentiment analysis, customer journey mapping, persona building.', audience: 'CS, Sales, CX' },
  { id: 'research-strategy',   icon: '🔍', name: 'Research & Strategy',              desc: 'Market research, competitive analysis, strategic planning.', audience: 'Strategy, Product, BD' },
  { id: 'learning-design',     icon: '🎓', name: 'Learning & Training Design',       desc: 'Course creation, quiz building, knowledge base, onboarding.', audience: 'L&D, HR, Enablement' },
  { id: 'code-technical',      icon: '💻', name: 'Code & Technical',                 desc: 'Code generation, debugging, documentation, API integration.', audience: 'Engineering, DevOps' }
];

if (typeof module !== 'undefined') module.exports = { TRACKS };
