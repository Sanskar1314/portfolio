# Sanskar Gupta · Across the Universe

A personal portfolio presented as a journey through space — from a rocket launch above Earth to a black-hole finale. Built to showcase my work in data science, machine learning, and AI through an interactive, scroll-driven experience.

**[Explore the live portfolio](https://sanskar-portfolio-gamma.vercel.app)** · [GitHub](https://github.com/Sanskar1314) · [LinkedIn](https://www.linkedin.com/in/sanskar-gupta-0a7b3529a/)

## The experience

- **Launch sequence:** a 3–2–1 countdown, rocket liftoff from Earth's horizon, and an upward screen transition into the home page. Skip the intro with the button or Escape.
- **Astronaut home page:** a photographic astronaut portrait and staggered text entrance introduce the journey.
- **Scroll-driven chapters:** twelve scenes share one timeline, with slower pacing for reading and a rocket traveling along the lower edge.
- **Interactive skills universe:** hover over, keyboard-focus, or tap a labeled planet to reveal its technologies. Clear hover/tap hints and gold + indicators make the interaction discoverable; pointer departure hides the panel.
- **Project missions:** MovieMind and SigmaLearn AI feature glass cards and animated detail dialogs with project links. Escape or the close button dismisses a dialog and returns focus to its trigger.
- **Black-hole finale:** a gold accretion disk frames the contact card, social links, and email.

Cream typography, muted gold accents, smoked glass, and natural planet colors connect the sections visually.

## Featured work

| Project | Focus | Repository |
| --- | --- | --- |
| MovieMind | Content-based movie recommendations using TF-IDF, cosine similarity, FastAPI, and Streamlit | [View source](https://github.com/Sanskar1314/Movie_Recommendation_End_to_End) |
| SigmaLearn AI | A RAG teaching assistant with course-video transcription, retrieval, and timestamped answers | [View source](https://github.com/Sanskar1314/RAG_Based_Teaching_Assistant) |
| Brain Tumor Detection | MRI image classification research using the Xception architecture | Described in the portfolio |

The portfolio also includes education, experience, achievements, and certifications. Portfolio content and links are maintained in [`lib/content.ts`](lib/content.ts).

## Built with

- **Next.js 16 and React 19** — App Router and server-rendered content
- **TypeScript** — application code and shared timeline
- **React Three Fiber and Three.js** — real-time space scenes
- **GLSL** — stars, nebulae, and black-hole effects
- **CSS and SVG** — responsive layouts, glass surfaces, orbital controls, and rocket animation
- **Playwright and ESLint** — browser checks and code quality

## Run locally

Use Node.js **20.9 or newer** and npm.

```sh
git clone https://github.com/Sanskar1314/portfolio.git
cd portfolio
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). No environment variables, API keys, or runtime image-generation services are required.

For a production preview:

```sh
npm run build -- --webpack
npm start
```

The webpack command above is the build path used for recent verification.

## Accessibility and performance

- **Read portfolio** switches to a conventional reading layout. Reduced-motion preferences select this mode automatically and bypass the animated intro.
- Server-rendered portfolio content remains available without JavaScript. WebGL failure or context loss falls back to reading mode.
- Planet controls support keyboard focus; project dialogs restore focus when closed.
- **Pause motion** stops idle animation while keeping scroll navigation available.
- Scrolling uses the browser's native behavior. Hidden scrollbar tracks do not disable scrolling.
- Mobile scenes reduce star count, geometry detail, shader work, and pixel ratio. Rendering can reduce pixel ratio further when frame times rise.

## Project structure

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Semantic portfolio sections and project content |
| `app/globals.css` | Design tokens, responsive layouts, and animation styles |
| `lib/content.ts` | Portfolio facts, skills, projects, and contact links |
| `lib/timeline.ts` | Chapter timing, shared progress, and scene blending |
| `components/cinematic/experience-shell.tsx` | Navigation, display modes, and scroll coordination |
| `components/cinematic/launch-intro.tsx` | Countdown, liftoff, and intro handoff |
| `components/cinematic/skill-system.tsx` | Interactive planet controls and skill details |
| `components/cinematic/mission-details.tsx` | Project detail dialogs |
| `components/cinematic/universe.tsx` | WebGL scene and adaptive rendering |
| `lib/shaders/space.ts` | Procedural space shaders |
| `public/` | Local images, textures, models, and asset credits |
| `tests/` | Playwright browser regression suite |

Historical model experiments are retained in the repository; the current hero uses the photographic astronaut asset.

## Validation

```sh
npm run lint
npm run typecheck
npm run build -- --webpack
```

Browser regression suite:

```sh
npx playwright install chromium
npm test

# Alternatively, use an installed Google Chrome:
PLAYWRIGHT_CHANNEL=chrome npm test
```

Playwright starts or reuses a development server on port 3000. Some regression tests predate the latest intro and project-dialog changes; the full suite has not been revalidated against those interactions. Recent targeted Chrome checks and build results are recorded in [`PROJECT_STATE.md`](PROJECT_STATE.md).

## Deployment

The live portfolio is hosted on Vercel. To deploy your own copy, import the repository, select the **Next.js** preset, and use the repository root (the directory containing `package.json`) as the project root. Set the build command to `npm run build -- --webpack`. No environment variables are needed.

If you fork this project, update the profile, project links, and `siteConfig.url` in `lib/content.ts` for your deployment, and replace personal imagery with your own assets.

## Assets and credits

See [`public/credits.html`](public/credits.html) and [`public/images/ASSETS.md`](public/images/ASSETS.md) for asset provenance and attribution, including generated imagery and retained third-party models. Asset-specific licenses still apply. The black-hole lensing is an artistic approximation, not a physical simulation.

## Contact

[Email](mailto:sanskargupta1314@gmail.com) · [LinkedIn](https://www.linkedin.com/in/sanskar-gupta-0a7b3529a/) · [GitHub](https://github.com/Sanskar1314)
