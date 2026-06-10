// AI Activation Studio — Learning Catalog
// Curated for basic-to-intermediate learners at Equinix.
// Focus: prompt engineering · productivity with AI · data analysis with AI ·
//        basic app & dashboard creation. Nothing engineer-only or theory-heavy.
//
// Every entry has a real clickable URL.
// LinkedIn Learning items use linkedin.com/learning/search?keywords=... so the link
// opens results directly inside Equinix's LinkedIn Learning portal.
// No Coursera, no search-hint text, no deep ML theory courses.

const CATALOG = [

  // ════════════════════════════════════════════════════════════════
  // 💬 PROMPT ENGINEERING FUNDAMENTALS
  // ════════════════════════════════════════════════════════════════
  {
    id: 'CAT-PE-001', track: 'prompt-engineering',
    title: 'ChatGPT Prompt Engineering for Developers',
    provider: 'DeepLearning.AI', source: 'deeplearning-ai',
    instructor: 'Isa Fulford & Andrew Ng',
    type: 'short-course', duration: 60, difficulty: 'beginner', format: 'video+code',
    description: 'The canonical free short course on prompt engineering. Hands-on with the OpenAI Playground — works fine for non-developers too.',
    skills: ['prompt-design', 'iteration', 'specificity'],
    cost: 'free',
    url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    featured: true
  },
  {
    id: 'CAT-PE-002', track: 'prompt-engineering',
    title: 'Anthropic Prompt Engineering Interactive Tutorial',
    provider: 'Anthropic', source: 'anthropic',
    instructor: 'Anthropic Education Team',
    type: 'hands-on', duration: 180, difficulty: 'beginner', format: 'interactive',
    description: 'Free Jupyter-notebook tutorial — Claude prompting from basics to common patterns. Work through it at your own pace.',
    skills: ['claude-specific', 'role-prompts', 'examples'],
    cost: 'free',
    url: 'https://github.com/anthropics/courses',
    featured: true
  },
  {
    id: 'CAT-PE-003', track: 'prompt-engineering',
    title: 'Microsoft Generative AI Fundamentals',
    provider: 'Microsoft Learn', source: 'microsoft-learn',
    instructor: 'Microsoft',
    type: 'tutorial', duration: 60, difficulty: 'beginner', format: 'reading',
    description: 'Free official Microsoft module covering generative AI basics, prompt patterns, and Copilot/Azure OpenAI concepts. Quick, clean read.',
    skills: ['fundamentals', 'copilot', 'azure-openai'],
    cost: 'free',
    url: 'https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/',
    featured: true
  },
  {
    id: 'CAT-PE-004', track: 'prompt-engineering',
    title: 'Claude Prompt Engineering — Official Guide',
    provider: 'Anthropic', source: 'anthropic',
    instructor: 'Anthropic',
    type: 'doc', duration: 45, difficulty: 'beginner', format: 'reading',
    description: 'Anthropic\'s plain-English guide to prompting Claude: clarity, examples, role assignment, structured output.',
    skills: ['claude', 'clarity', 'structure'],
    cost: 'free',
    url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview'
  },
  {
    id: 'CAT-PE-005', track: 'prompt-engineering',
    title: 'OpenAI Prompt Engineering Guide',
    provider: 'OpenAI', source: 'openai',
    instructor: 'OpenAI',
    type: 'doc', duration: 30, difficulty: 'beginner', format: 'reading',
    description: 'Official OpenAI strategies for writing effective prompts. Short, opinionated, high-signal.',
    skills: ['chatgpt', 'best-practices'],
    cost: 'free',
    url: 'https://platform.openai.com/docs/guides/prompt-engineering'
  },
  {
    id: 'CAT-PE-006', track: 'prompt-engineering',
    title: 'Prompt Engineering Guide (DAIR.AI)',
    provider: 'promptingguide.ai', source: 'other',
    instructor: 'Elvis Saravia & contributors',
    type: 'doc', duration: 0, difficulty: 'intermediate', format: 'reading',
    description: 'Comprehensive open-source reference with copy-pastable examples. Best as a desk reference when you hit a tricky prompt.',
    skills: ['reference', 'patterns'],
    cost: 'free',
    url: 'https://www.promptingguide.ai/'
  },
  {
    id: 'CAT-PE-007', track: 'prompt-engineering',
    title: 'Prompt Engineering — LinkedIn Learning library',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'LinkedIn Learning\'s full prompt-engineering library — multiple short courses, all included with Equinix membership.',
    skills: ['prompt-design', 'business-use-cases'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Prompt%20Engineering'
  },
  {
    id: 'CAT-PE-008', track: 'prompt-engineering',
    title: 'ChatGPT for Business — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Practical ChatGPT courses for non-technical users. Use cases by role and department.',
    skills: ['chatgpt', 'use-cases'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=ChatGPT'
  },
  {
    id: 'CAT-PE-009', track: 'prompt-engineering',
    title: 'IBM Technology — Generative AI explainers',
    provider: 'IBM Technology', source: 'youtube',
    instructor: 'Martin Keen & IBM team',
    type: 'playlist', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Short whiteboard-style YouTube explainers from IBM on how LLMs work, what prompts do, and how generative AI applies to business.',
    skills: ['concepts', 'mental-models'],
    cost: 'free',
    url: 'https://www.youtube.com/@IBMTechnology/search?query=prompt%20engineering'
  },

  // ════════════════════════════════════════════════════════════════
  // ✍️ CONTENT GENERATION & PRODUCTIVITY  (largest cluster)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'CAT-CG-001', track: 'content-generation',
    title: 'Microsoft 365 Copilot — LinkedIn Learning library',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'The full M365 Copilot training library — courses spanning Word, Outlook, Teams, Excel, PowerPoint. The single biggest productivity unlock for Equinix users.',
    skills: ['m365-copilot', 'outlook', 'word', 'teams', 'excel'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Microsoft%20365%20Copilot',
    featured: true
  },
  {
    id: 'CAT-CG-002', track: 'content-generation',
    title: 'ChatGPT for Beginners — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Jess Stratton & others',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Hands-on ChatGPT for daily work — emails, summaries, brainstorming, meeting notes. The most popular productivity starter on LinkedIn Learning.',
    skills: ['chatgpt', 'daily-productivity'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=ChatGPT%20for%20Beginners',
    featured: true
  },
  {
    id: 'CAT-CG-003', track: 'content-generation',
    title: 'Microsoft 365 Copilot — Official Learning Path',
    provider: 'Microsoft Learn', source: 'microsoft-learn',
    instructor: 'Microsoft',
    type: 'tutorial', duration: 120, difficulty: 'beginner', format: 'reading',
    description: 'Microsoft\'s free, official path: features by app, prompt patterns, admin considerations. Pairs nicely with the LinkedIn Learning library.',
    skills: ['m365-copilot', 'official-docs'],
    cost: 'free',
    url: 'https://learn.microsoft.com/en-us/training/paths/get-started-with-microsoft-365-copilot/',
    featured: true
  },
  {
    id: 'CAT-CG-004', track: 'content-generation',
    title: 'Streamlining Work with Microsoft Copilot — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Nick Brazzi & others',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Use-case driven Copilot training across the Office suite. Patterns you can apply the same afternoon.',
    skills: ['m365-copilot', 'workflow'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Streamlining%20Work%20Microsoft%20Copilot'
  },
  {
    id: 'CAT-CG-005', track: 'content-generation',
    title: 'Copilot in Outlook — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Drafting, summarizing, and triaging email with Copilot. Tight focus on the app most knowledge workers live in.',
    skills: ['outlook-copilot', 'email'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Copilot%20Outlook'
  },
  {
    id: 'CAT-CG-006', track: 'content-generation',
    title: 'Copilot in Word — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Drafting, rewriting, summarizing, and editing in Word with Copilot. Direct ROI for anyone writing docs.',
    skills: ['word-copilot', 'writing'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Copilot%20Word'
  },
  {
    id: 'CAT-CG-007', track: 'content-generation',
    title: 'Copilot in Teams — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Meeting summaries, action item capture, and chat assist in Teams. Stop taking notes — let Copilot handle it.',
    skills: ['teams-copilot', 'meetings'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Copilot%20Teams'
  },
  {
    id: 'CAT-CG-008', track: 'content-generation',
    title: 'Writing with AI — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Writing-with-AI courses covering tone, audience targeting, brand voice, and editorial discipline.',
    skills: ['writing', 'editorial', 'tone'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Writing%20with%20AI'
  },
  {
    id: 'CAT-CG-009', track: 'content-generation',
    title: 'Use cases: writing with Claude',
    provider: 'Anthropic', source: 'anthropic',
    instructor: 'Anthropic',
    type: 'doc', duration: 30, difficulty: 'beginner', format: 'reading',
    description: 'Anthropic\'s worked examples of drafting, editing, and rewriting with Claude. Concrete patterns you can copy.',
    skills: ['claude', 'writing', 'editing'],
    cost: 'free',
    url: 'https://docs.anthropic.com/en/docs/about-claude/use-case-guides/overview'
  },
  {
    id: 'CAT-CG-010', track: 'content-generation',
    title: 'Microsoft 365 Copilot — Official Documentation',
    provider: 'Microsoft', source: 'microsoft-learn',
    instructor: 'Microsoft',
    type: 'doc', duration: 0, difficulty: 'beginner', format: 'reading',
    description: 'Official Copilot for M365 docs — feature reference, prompt patterns by app, and rollout playbooks. Bookmark it.',
    skills: ['m365-copilot', 'reference'],
    cost: 'free',
    url: 'https://learn.microsoft.com/en-us/copilot/microsoft-365/'
  },
  {
    id: 'CAT-CG-011', track: 'content-generation',
    title: 'IBM Technology — LLM & content generation explainers',
    provider: 'IBM Technology', source: 'youtube',
    instructor: 'IBM team',
    type: 'playlist', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'IBM YouTube explainers on how LLMs generate text, where they help, and where they fail. Useful background for productivity rollouts.',
    skills: ['llms', 'concepts'],
    cost: 'free',
    url: 'https://www.youtube.com/@IBMTechnology/search?query=large%20language%20model'
  },

  // ════════════════════════════════════════════════════════════════
  // 📊 DATA ANALYSIS & INSIGHTS
  // ════════════════════════════════════════════════════════════════
  {
    id: 'CAT-DA-001', track: 'data-analysis',
    title: 'Excel with Copilot / ChatGPT — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Use AI to write Excel formulas, build pivot tables, clean data, and surface insights. Immediate ROI for any analyst or ops role.',
    skills: ['excel', 'formulas', 'pivot-tables'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Excel%20Copilot',
    featured: true
  },
  {
    id: 'CAT-DA-002', track: 'data-analysis',
    title: 'Power BI Copilot — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Build reports, generate DAX, and produce narrative summaries with Copilot in Power BI. For BI authors and analysts.',
    skills: ['power-bi', 'dax', 'reporting'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Power%20BI%20Copilot',
    featured: true
  },
  {
    id: 'CAT-DA-003', track: 'data-analysis',
    title: 'Power BI Copilot — Official Guide',
    provider: 'Microsoft Learn', source: 'microsoft-learn',
    instructor: 'Microsoft',
    type: 'tutorial', duration: 60, difficulty: 'beginner', format: 'reading',
    description: 'Official walkthrough of generating reports, narratives, and DAX with Copilot in Power BI.',
    skills: ['power-bi', 'dax', 'reporting'],
    cost: 'free',
    url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-introduction'
  },
  {
    id: 'CAT-DA-004', track: 'data-analysis',
    title: 'Data Analysis with ChatGPT — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Upload CSVs, ask questions, generate charts, get narratives. Practical data-analysis-with-ChatGPT workflows.',
    skills: ['chatgpt', 'data-analysis', 'csv'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Data%20Analysis%20ChatGPT'
  },
  {
    id: 'CAT-DA-005', track: 'data-analysis',
    title: 'AI for Business Analysts — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'How analysts use generative AI across the workflow — requirements, data prep, insight narratives, and stakeholder reporting.',
    skills: ['business-analysis', 'narrative', 'requirements'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=AI%20for%20Business%20Analysts'
  },
  {
    id: 'CAT-DA-006', track: 'data-analysis',
    title: 'Intro to Machine Learning',
    provider: 'Kaggle Learn', source: 'kaggle',
    instructor: 'Kaggle',
    type: 'hands-on', duration: 180, difficulty: 'beginner', format: 'interactive',
    description: 'Free hands-on micro-course in browser notebooks. Best practical starting point for someone new to predictive modeling.',
    skills: ['ml-basics', 'python', 'sklearn'],
    cost: 'free',
    url: 'https://www.kaggle.com/learn/intro-to-machine-learning'
  },
  {
    id: 'CAT-DA-007', track: 'data-analysis',
    title: 'Pandas',
    provider: 'Kaggle Learn', source: 'kaggle',
    instructor: 'Kaggle',
    type: 'hands-on', duration: 240, difficulty: 'beginner', format: 'interactive',
    description: 'Free browser-based pandas tutorial. Fastest way to get an analyst productive in Python data wrangling.',
    skills: ['pandas', 'python', 'data-wrangling'],
    cost: 'free',
    url: 'https://www.kaggle.com/learn/pandas'
  },
  {
    id: 'CAT-DA-008', track: 'data-analysis',
    title: 'Data Visualization',
    provider: 'Kaggle Learn', source: 'kaggle',
    instructor: 'Kaggle',
    type: 'hands-on', duration: 240, difficulty: 'beginner', format: 'interactive',
    description: 'Browser-based course on building clean charts in Python. Pairs naturally with the pandas course.',
    skills: ['visualization', 'matplotlib', 'seaborn'],
    cost: 'free',
    url: 'https://www.kaggle.com/learn/data-visualization'
  },
  {
    id: 'CAT-DA-009', track: 'data-analysis',
    title: 'AI Python for Beginners',
    provider: 'DeepLearning.AI', source: 'deeplearning-ai',
    instructor: 'Andrew Ng',
    type: 'short-course', duration: 240, difficulty: 'beginner', format: 'video+code',
    description: 'Andrew Ng\'s gentle Python intro using AI as a co-pilot. Perfect for analysts and ops folks who want to start coding light scripts.',
    skills: ['python', 'fundamentals', 'ai-assisted-coding'],
    cost: 'free',
    url: 'https://www.deeplearning.ai/short-courses/ai-python-for-beginners/'
  },
  {
    id: 'CAT-DA-010', track: 'data-analysis',
    title: 'IBM Cognitive Class — Data Analysis fundamentals',
    provider: 'IBM Cognitive Class', source: 'ibm-skillsbuild',
    instructor: 'IBM',
    type: 'course', duration: 600, difficulty: 'beginner', format: 'mixed',
    description: 'IBM\'s free Cognitive Class — data analysis, Python, SQL, and visualization courses with hands-on labs. Solid free path.',
    skills: ['data-analysis', 'python', 'sql'],
    cost: 'free',
    url: 'https://cognitiveclass.ai/learn/data-science'
  },

  // ════════════════════════════════════════════════════════════════
  // 🎨 VISUAL CREATION & DESIGN
  // ════════════════════════════════════════════════════════════════
  {
    id: 'CAT-VC-001', track: 'visual-creation',
    title: 'Generative AI Image Generation — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Practical overview of DALL-E, Firefly, and Midjourney for everyday work — slide visuals, social posts, mockups.',
    skills: ['image-generation', 'visual-prompting'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Generative%20AI%20Image',
    featured: true
  },
  {
    id: 'CAT-VC-002', track: 'visual-creation',
    title: 'Microsoft Designer with Copilot — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Designer + Copilot for fast presentation visuals, social graphics, and brand-consistent imagery. Approachable for non-designers.',
    skills: ['microsoft-designer', 'visuals'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Microsoft%20Designer%20Copilot'
  },
  {
    id: 'CAT-VC-003', track: 'visual-creation',
    title: 'Adobe Firefly — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Firefly inside Photoshop, Illustrator, and Express. For teams already using Adobe.',
    skills: ['firefly', 'adobe'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Adobe%20Firefly'
  },
  {
    id: 'CAT-VC-004', track: 'visual-creation',
    title: 'Midjourney for Professionals — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Workflows, prompt patterns, and style consistency for Midjourney. Useful for marketing and brand teams.',
    skills: ['midjourney', 'style-consistency'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Midjourney'
  },
  {
    id: 'CAT-VC-005', track: 'visual-creation',
    title: 'NVIDIA — Generative AI Explained',
    provider: 'NVIDIA DLI', source: 'nvidia-dli',
    instructor: 'NVIDIA',
    type: 'course', duration: 120, difficulty: 'beginner', format: 'video',
    description: 'NVIDIA\'s free self-paced course explaining generative AI concepts (including images) at a conceptual level. No GPU required.',
    skills: ['generative-ai', 'concepts'],
    cost: 'free',
    url: 'https://learn.nvidia.com/courses/course-detail?course_id=course-v1:DLI+S-FX-07+V1'
  },

  // ════════════════════════════════════════════════════════════════
  // ⚡ APPLICATION BUILDING  (no-code / low-code only)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'CAT-AB-001', track: 'application-building',
    title: 'Microsoft Copilot Studio — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Build conversational AI agents and copilots using Copilot Studio — low-code, drag-and-drop. Great match for ops/IT without deep coding.',
    skills: ['copilot-studio', 'low-code', 'agents'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Copilot%20Studio',
    featured: true
  },
  {
    id: 'CAT-AB-002', track: 'application-building',
    title: 'Microsoft Power Apps with Copilot — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Build internal business apps with Power Apps using natural-language Copilot guidance. No-code path to real apps.',
    skills: ['power-apps', 'low-code'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Power%20Apps%20Copilot'
  },
  {
    id: 'CAT-AB-003', track: 'application-building',
    title: 'No-Code AI App Building — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Survey of no-code AI tools — Lovable, Bubble, Glide, and others — for building working apps without writing code.',
    skills: ['no-code', 'vibe-coding'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=No-Code%20AI%20App'
  },
  {
    id: 'CAT-AB-004', track: 'application-building',
    title: 'Building Dashboards with AI — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Build interactive dashboards in Power BI, Excel, and other tools using AI to generate the charts, narratives, and layouts.',
    skills: ['dashboards', 'power-bi', 'visualization'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Building%20Dashboards%20AI',
    featured: true
  },
  {
    id: 'CAT-AB-005', track: 'application-building',
    title: 'Generative AI for Beginners (App-building chapters)',
    provider: 'Microsoft (GitHub)', source: 'github',
    instructor: 'Microsoft Cloud Advocates',
    type: 'course', duration: 600, difficulty: 'beginner', format: 'mixed',
    description: 'Free Microsoft GitHub course. Skip the engineering-heavy lessons and focus on the chatbot, search, and low-code app modules.',
    skills: ['generative-ai', 'building'],
    cost: 'free',
    url: 'https://github.com/microsoft/generative-ai-for-beginners'
  },
  {
    id: 'CAT-AB-006', track: 'application-building',
    title: 'Power Platform with AI — Microsoft Learn',
    provider: 'Microsoft Learn', source: 'microsoft-learn',
    instructor: 'Microsoft',
    type: 'tutorial', duration: 180, difficulty: 'beginner', format: 'reading',
    description: 'Free official path covering AI Builder, Copilot Studio, and Power Apps Copilot. The official no-code AI on-ramp.',
    skills: ['power-platform', 'ai-builder', 'low-code'],
    cost: 'free',
    url: 'https://learn.microsoft.com/en-us/training/paths/get-started-ai-builder/'
  },

  // ════════════════════════════════════════════════════════════════
  // 🔄 PROCESS AUTOMATION
  // ════════════════════════════════════════════════════════════════
  {
    id: 'CAT-PA-001', track: 'process-automation',
    title: 'Power Automate with AI — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Build automation flows that incorporate AI Builder, document processing, and Copilot prompt actions. Direct ROI for ops.',
    skills: ['power-automate', 'ai-builder'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Power%20Automate%20AI',
    featured: true
  },
  {
    id: 'CAT-PA-002', track: 'process-automation',
    title: 'AI Builder — Microsoft Learn',
    provider: 'Microsoft Learn', source: 'microsoft-learn',
    instructor: 'Microsoft',
    type: 'tutorial', duration: 240, difficulty: 'intermediate', format: 'reading',
    description: 'Microsoft\'s free learning path for AI Builder — prebuilt models, custom models, and embedding AI in Power Platform apps.',
    skills: ['ai-builder', 'power-platform'],
    cost: 'free',
    url: 'https://learn.microsoft.com/en-us/training/paths/get-started-ai-builder/'
  },
  {
    id: 'CAT-PA-003', track: 'process-automation',
    title: 'Automate Your Work with Copilot — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Practical automation patterns inside Microsoft 365 — flows, scheduling, reminders, and templates with Copilot assist.',
    skills: ['m365-automation', 'copilot'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Automate%20Work%20Copilot'
  },
  {
    id: 'CAT-PA-004', track: 'process-automation',
    title: 'AI for IT Operations — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'IT-focused use cases: ticket triage, runbook automation, incident summary, knowledge-base creation. Direct fit for Equinix ops.',
    skills: ['itops', 'incident-management', 'runbooks'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=AI%20IT%20Operations'
  },
  {
    id: 'CAT-PA-005', track: 'process-automation',
    title: 'IBM Technology — AI agents and automation',
    provider: 'IBM Technology', source: 'youtube',
    instructor: 'IBM team',
    type: 'playlist', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'IBM YouTube videos on AI agents, RAG basics, and how AI fits into automation patterns. Conceptual, not engineering-heavy.',
    skills: ['agents', 'automation', 'concepts'],
    cost: 'free',
    url: 'https://www.youtube.com/@IBMTechnology/search?query=AI%20agents'
  },

  // ════════════════════════════════════════════════════════════════
  // 🎤 PRESENTATION & COMMUNICATION
  // ════════════════════════════════════════════════════════════════
  {
    id: 'CAT-PR-001', track: 'presentation',
    title: 'Copilot in PowerPoint — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Heather Severino & others',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Generate decks, design polish, and speaker notes with PowerPoint Copilot. Direct ROI for anyone who builds presentations.',
    skills: ['powerpoint-copilot', 'deck-design'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Copilot%20PowerPoint',
    featured: true
  },
  {
    id: 'CAT-PR-002', track: 'presentation',
    title: 'PowerPoint Designer with AI — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Beyond Copilot — using Designer, Morph, and other PowerPoint AI features for faster, more polished decks.',
    skills: ['powerpoint-designer', 'visual-polish'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=PowerPoint%20Designer'
  },
  {
    id: 'CAT-PR-003', track: 'presentation',
    title: 'Storytelling with AI — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Using generative AI to structure narrative arcs, sharpen openings, and tailor messages for different audiences.',
    skills: ['narrative', 'audience-targeting'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Storytelling%20AI'
  },
  {
    id: 'CAT-PR-004', track: 'presentation',
    title: 'Data Storytelling with AI — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Turning datasets and metrics into clear narratives, charts, and executive summaries using ChatGPT/Copilot.',
    skills: ['data-storytelling', 'exec-comms'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Data%20Storytelling%20AI'
  },
  {
    id: 'CAT-PR-005', track: 'presentation',
    title: 'Pitch and Persuade with AI — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Crafting executive pitches, sales decks, and stakeholder narratives with AI assistance.',
    skills: ['executive-pitch', 'persuasion'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Pitch%20AI'
  },

  // ════════════════════════════════════════════════════════════════
  // 🎭 CREATIVE & STORYTELLING  (minimal — not the core audience)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'CAT-CS-001', track: 'creative-storytelling',
    title: 'Generative AI for Creators — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Cross-medium overview for creative professionals — writing, images, music, video. A starting survey for content/marketing roles.',
    skills: ['creative-ai', 'cross-medium'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Generative%20AI%20Creators'
  },
  {
    id: 'CAT-CS-002', track: 'creative-storytelling',
    title: 'AI for Video and Image — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Practical video and image generation workflows using current consumer-grade tools.',
    skills: ['video-generation', 'image-generation'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=AI%20Video%20Image'
  },

  // ════════════════════════════════════════════════════════════════
  // 🎯 CUSTOMER INTELLIGENCE
  // ════════════════════════════════════════════════════════════════
  {
    id: 'CAT-CI-001', track: 'customer-intelligence',
    title: 'AI for Sales Professionals — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Prospecting, outreach, account research, and call-prep using generative AI. Strong fit for Equinix sales teams.',
    skills: ['sales', 'prospecting'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=AI%20for%20Sales',
    featured: true
  },
  {
    id: 'CAT-CI-002', track: 'customer-intelligence',
    title: 'AI for Customer Service — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Sentiment analysis, ticket triage, knowledge-base authoring, and assisted responses for CS teams.',
    skills: ['customer-service', 'sentiment', 'triage'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=AI%20Customer%20Service'
  },
  {
    id: 'CAT-CI-003', track: 'customer-intelligence',
    title: 'Dynamics 365 Copilot for Sales',
    provider: 'Microsoft Learn', source: 'microsoft-learn',
    instructor: 'Microsoft',
    type: 'tutorial', duration: 120, difficulty: 'intermediate', format: 'reading',
    description: 'Free Microsoft path for sellers using D365 Copilot — call summaries, email drafting, opportunity insights.',
    skills: ['dynamics-365', 'sales-copilot'],
    cost: 'free',
    url: 'https://learn.microsoft.com/en-us/training/paths/sales-copilot-fundamentals/'
  },
  {
    id: 'CAT-CI-004', track: 'customer-intelligence',
    title: 'Generative AI for Marketing — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Campaign ideation, persona building, content variants, and performance analysis with generative AI.',
    skills: ['marketing-ai', 'personas', 'campaigns'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Generative%20AI%20Marketing'
  },
  {
    id: 'CAT-CI-005', track: 'customer-intelligence',
    title: 'Voice of Customer with AI — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Using AI to cluster customer feedback, NPS, support tickets, and survey data into themes and actions.',
    skills: ['voc', 'feedback-analysis'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Voice%20of%20Customer%20AI'
  },

  // ════════════════════════════════════════════════════════════════
  // 🔍 RESEARCH & STRATEGY  (minimal — keep practical only)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'CAT-RS-001', track: 'research-strategy',
    title: 'AI for Research and Information Gathering — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'Practical use of ChatGPT, Claude, and Copilot for research — gathering information, summarizing sources, drafting briefs.',
    skills: ['research', 'summarization'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=AI%20Research'
  },
  {
    id: 'CAT-RS-002', track: 'research-strategy',
    title: 'Competitive Analysis with AI — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Using AI to map competitors, identify gaps, and produce briefings. Direct fit for product, BD, and strategy.',
    skills: ['competitive-analysis', 'market-mapping'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Competitive%20Analysis%20AI'
  },

  // ════════════════════════════════════════════════════════════════
  // 🎓 LEARNING & TRAINING DESIGN
  // ════════════════════════════════════════════════════════════════
  {
    id: 'CAT-LD-001', track: 'learning-design',
    title: 'Designing Learning with AI — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'For L&D teams: using generative AI for needs analysis, course outlining, assessment design, and learner support.',
    skills: ['instructional-design', 'l-and-d'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Designing%20Learning%20AI'
  },
  {
    id: 'CAT-LD-002', track: 'learning-design',
    title: 'Instructional Design with ChatGPT — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Practical ChatGPT prompting for instructional designers — learning objectives, scenarios, scripts, rubrics, scaffolding.',
    skills: ['instructional-design', 'chatgpt'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Instructional%20Design%20ChatGPT'
  },
  {
    id: 'CAT-LD-003', track: 'learning-design',
    title: 'Articulate 360 with AI — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Various',
    type: 'video', duration: 0, difficulty: 'intermediate', format: 'video',
    description: 'Using AI features in Articulate Storyline and Rise for faster eLearning production.',
    skills: ['articulate', 'elearning'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=Articulate%20AI'
  },

  // ════════════════════════════════════════════════════════════════
  // 💻 CODE & TECHNICAL  (minimal — only what helps analysts dip in)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'CAT-CT-001', track: 'code-technical',
    title: 'AI Python for Beginners',
    provider: 'DeepLearning.AI', source: 'deeplearning-ai',
    instructor: 'Andrew Ng',
    type: 'short-course', duration: 240, difficulty: 'beginner', format: 'video+code',
    description: 'Andrew Ng\'s gentle Python intro using AI as a co-pilot. For analysts and non-engineers who want to write light scripts.',
    skills: ['python', 'ai-assisted-coding', 'fundamentals'],
    cost: 'free',
    url: 'https://www.deeplearning.ai/short-courses/ai-python-for-beginners/',
    featured: true
  },
  {
    id: 'CAT-CT-002', track: 'code-technical',
    title: 'GitHub Copilot Essential Training — LinkedIn Learning',
    provider: 'LinkedIn Learning', source: 'linkedin-learning',
    instructor: 'Ronnie Sheer & others',
    type: 'video', duration: 0, difficulty: 'beginner', format: 'video',
    description: 'For anyone touching code: GitHub Copilot in VS Code — inline suggestions, chat, slash commands.',
    skills: ['github-copilot', 'ide'],
    cost: 'included-li-learning',
    url: 'https://www.linkedin.com/learning/search?keywords=GitHub%20Copilot'
  },
  {
    id: 'CAT-CT-003', track: 'code-technical',
    title: 'GitHub Copilot Fundamentals — Microsoft Learn',
    provider: 'Microsoft Learn', source: 'microsoft-learn',
    instructor: 'Microsoft',
    type: 'tutorial', duration: 60, difficulty: 'beginner', format: 'reading',
    description: 'Free, official Microsoft path for GitHub Copilot — installation, basic use, security considerations.',
    skills: ['github-copilot', 'fundamentals'],
    cost: 'free',
    url: 'https://learn.microsoft.com/en-us/training/paths/copilot/'
  }
];

const CATALOG_SOURCES = {
  'linkedin-learning': { name: 'LinkedIn Learning', short: 'LinkedIn', accent: 'Included with Equinix membership' },
  'deeplearning-ai':   { name: 'DeepLearning.AI',   short: 'DLAI',     accent: 'Free short courses' },
  'microsoft-learn':   { name: 'Microsoft Learn',   short: 'MS Learn', accent: 'Free, official' },
  'ibm-skillsbuild':   { name: 'IBM SkillsBuild',   short: 'IBM',      accent: 'Free' },
  'nvidia-dli':        { name: 'NVIDIA DLI',        short: 'NVIDIA',   accent: 'Free self-paced' },
  'anthropic':         { name: 'Anthropic',         short: 'Anthropic',accent: 'Free' },
  'openai':            { name: 'OpenAI',            short: 'OpenAI',   accent: 'Free docs' },
  'github':            { name: 'GitHub',            short: 'GitHub',   accent: 'Free' },
  'kaggle':            { name: 'Kaggle Learn',      short: 'Kaggle',   accent: 'Free' },
  'youtube':           { name: 'YouTube',           short: 'YouTube',  accent: 'Free' },
  'other':             { name: 'Other',             short: 'Other',    accent: '' }
};

const CATALOG_TYPES = {
  'short-course':    'Short course',
  'course':          'Course',
  'video':           'Video series',
  'tutorial':        'Tutorial',
  'doc':             'Documentation',
  'hands-on':        'Hands-on lab',
  'playlist':        'Playlist / channel'
};

if (typeof module !== 'undefined') module.exports = { CATALOG, CATALOG_SOURCES, CATALOG_TYPES };
