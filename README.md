# Sanskar Gupta · Across the universe

Cinematic portfolio built with Next.js 16, TypeScript, React Three Fiber and procedural GLSL. npm is the package manager. Requires Node.js 20.9+ (Node 22 LTS recommended).

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm start
```

Deploy to Vercel with this `portfolio` directory as the project root and the Next.js preset. No environment variables or generation services are required at runtime. The site has not been deployed by the coding agent.

## Browser tests

```sh
npx playwright install chromium
npm test
# Or use an existing local Chrome installation:
PLAYWRIGHT_CHANNEL=chrome npm test
```

The tests start or reuse a local development server. They cover loading, local assets, navigation, backward scrolling, keyboard skill selection, project details, reading mode, pause controls, mobile layouts, reduced motion, WebGL context loss, no-JavaScript access, continuous chapter blending and the 662×771 feedback viewport.

## Architecture

- `lib/content.ts`: portfolio facts, projects, skills and contact URLs.
- `lib/timeline.ts`: central chapter durations and shared animation state.
- `components/cinematic/`: pinned scene content, navigation, WebGL world and astronaut.
- `lib/shaders/space.ts`: procedural planets, nebula, star background and analytical black-hole effect.
- `app/page.tsx`: server-rendered semantic content; accessible without WebGL or JavaScript.
- `PROJECT_STATE.md`: latest QA and precise handoff.

“Read portfolio” removes the cinematic layer. Reduced-motion preferences select it automatically. “Pause motion” stops idle animation while preserving scroll navigation. Mobile uses fewer stars, lower geometry resolution, fewer noise samples and lower DPR. DPR also drops if measured frame time is high. Context loss selects readable content.

The opening keeps the generated portrait face-on, then dissolves into an original volumetric 3D suit before launch. The suit has a smooth helmet, torso, backpack, articulated limbs, gloves, boots and hoses; it turns in 3D and travels into depth along a fixed screen lane. It is a stylized code-built model, not a scanned or facially rigged likeness. Planets use a sharp generated equirectangular surface texture on live rotating spheres. Skills present one category at a time with all tools retained and optional descriptions. The black-hole disk has differential orbital flow, traveling highlights and lensed arcs; pause stops this motion. Lensing remains an artistic approximation. See `/credits.html` and `public/images/ASSETS.md` for provenance.

The current upstream project README confirms **SigmaLearn AI** (called TeachRAG in the original local source). Its public live demo is included. Original photos and branding remain unchanged. No research publication URL has been invented.

Local environment note: this machine’s Homebrew Node currently cannot load `libsimdjson.29.dylib`. Verification used the bundled Node 24 runtime; this is a machine issue, not a project runtime dependency. Use a working Node installation for the commands above.
