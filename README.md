# AI Activation Studio

> **Thinking in the Age of AI, and Learning by Doing.**
> A self-service platform where trainers build and deploy AI skills development programs for their teams — without writing code or designing curriculum from scratch.

## What it does

AI Activation Studio is a browser-based command center for trainers running an AI skills program. Four operational sections plus a five-step program builder.

**Operational sections** (run the program):
- 🚀 **Launch Kit** — interactive pre-launch checklist (7 steps, progress-tracked, persists) plus the executive kick-off announcement template
- 📖 **Playbook** — 9 hard-won principles from running an AI challenge month
- 📋 **Templates** — 7 copy-ready comms (kick-off, daily, weekly winner, mid-program boost, demo day agenda, wrap-up)
- 🎬 **Catalog** — 98 vetted videos, courses, and labs, all with direct URLs

**Program Builder** (design the program):
1. **Define** — name, audience, delivery format, start date.
2. **Tracks** — pick 1–5 capability tracks, set difficulty.
3. **Curate** — auto-fill or hand-pick activities; attach learning resources from the catalog.
4. **Preview** — see exactly what your learners will see.
5. **Export** — HTML site, ZIP repo, PDF guide, PowerPoint deck, or JSON backup.

## What's in the box

- **100+ hands-on activities** across 12 capability tracks (prompt engineering, content, data, visual, app building, automation, presentation, creative, customer intel, research, learning design, code)
- **100-item learning catalog** — vetted videos, courses, and labs from LinkedIn Learning (45 items, included with Equinix's organizational membership), DeepLearning.AI, Coursera, Microsoft Learn, IBM SkillsBuild, Nvidia DLI, Anthropic, OpenAI, Hugging Face, fast.ai, Kaggle, Stanford, and YouTube (Karpathy, 3Blue1Brown)
- **8 delivery formats** (workshop, weekly sprint, monthly marathon, lunch & learn, self-paced, hackathon, certification, custom)
- **Clean Apple-style UI** — monochrome + Apple blue, generous whitespace, light + dark mode
- **No backend, no build step** — vanilla HTML/CSS/JS, deployable anywhere

## Catalog

Browse at `/catalog` (or via the **Catalog** button in the nav). Each item has:

- Title, provider, instructor
- Track, type (course / video / hands-on / doc / lecture series / specialization / certificate)
- Duration, difficulty
- Skills tags
- Direct URL when available, or a "Copy search hint" button for LinkedIn Learning items (URLs not hard-coded since LinkedIn slugs change)
- Cost label: **Free**, **LinkedIn Learning** (included for Equinix), **Paid**, or **Trial**

Filter by track, level, type, source, cost, or full-text search. Featured items per track are highlighted as recommended starting points.

> **Verify URLs before promoting.** External course URLs change. Treat the catalog as a curated starting point — your team should do a one-pass URL verification before broad rollout.

## Run it locally

No build required. Just serve the folder:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then open `http://localhost:8080`.

Opening `index.html` directly via `file://` also works.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages → Source: `main` / root**.
3. Your hub goes live at `https://YOUR-USER.github.io/AI-Trainer-Hub`.

## Exported programs

The HTML export is a single self-contained file — drop it on any host, or use the ZIP export which includes a README with deploy instructions.

Each exported program includes:
- Hero with program details
- Progress bar (learner progress saved in localStorage)
- Activity cards with detail modals
- Per-week tabs (if multi-week)
- Light + dark mode toggle

## File structure

```
AI-Trainer-Hub/
├── index.html              # Landing + wizard shell
├── css/
│   ├── tokens.css          # Design tokens (light + dark)
│   └── styles.css          # Component styles
├── js/
│   ├── tracks.js           # 12 capability tracks
│   ├── formats.js          # 8 delivery formats
│   ├── activities.js       # 60+ activities
│   ├── app.js              # Init, theme, navigation
│   ├── builder.js          # Wizard state, steps 1-3, auto-fill
│   ├── preview.js          # Step 4 — live preview
│   ├── export.js           # Step 5 — all exporters
│   └── program-template.js # Standalone HTML template for exports
└── README.md
```

## Tech

- Vanilla HTML / CSS / JS — no framework, no build
- CSS custom properties for theming
- CDN libraries used for export only:
  - [JSZip](https://stuk.github.io/jszip/) for ZIP
  - [jsPDF](https://github.com/parallax/jsPDF) for PDF
  - [PptxGenJS](https://gitbrent.github.io/PptxGenJS/) for PowerPoint

## Design

Apple-style aesthetic: monochrome palette, single accent blue (`#0071e3` light / `#2997ff` dark), `-apple-system` / SF Pro Display / Inter typography, generous whitespace, 12–20px border-radius, subtle shadows. Light and dark mode driven by CSS variables; toggle in the nav respects `prefers-color-scheme` by default.
