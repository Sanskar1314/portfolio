# Original Goal
Build Sanskar Gupta’s cinematic astronaut portfolio inside the existing Next.js repository: scroll-scrubbed space travel, useful real portfolio content, gold black-hole finale, mobile and accessible fallbacks, Vercel-compatible build.

## Visual Direction
Reviewed ../Branding/Astronaut Portfolio Across the Universe.png, ../Branding/compressed_Untitled design (1).jpg and public/profile.png. Preserve near-black space, editorial cream text, blue environmental light and restrained gold finale. Original branding/photos remain untouched. Avoid neon/dashboard redesigns.

## Architecture
- Next.js 16.4, React 19, TypeScript, npm; React Three Fiber + Three.js loaded dynamically in a client-only Canvas.
- Server-rendered content defaults to reader mode (works without JavaScript). After hydration, reduced-motion users stay in reader mode; others enter the cinematic mode.
- Native sections are scroll tracks. Twelve fixed scene panels share one normalized, damped timeline with WebGL. No scroll interception or speed-dependent animation. Native hash links work forward/backward.
- Desktop 900 star streaks; mobile 280, reduced sphere tessellation, fewer procedural noise samples, DPR 1. Measured frame time can reduce DPR further.
- Face-on portrait dissolves into an original volumetric 3D suit; fixed screen lane and forward depth travel; continuous reversible chapter crossfades. Generated high-detail surface map on rotating planets; procedural nebula, stars, hyperspace and flowing analytical accretion disk.
- No audio, external runtime generation service, API key or environment variable required.

## Repository Map
- app/page.tsx: semantic scene content and real project/contact links
- app/globals.css: design tokens, scene composition, explicit mobile/reader layouts
- app/layout.tsx: metadata; system fonts avoid build-time font downloads
- lib/content.ts: factual project/profile/skills/experience/certification data
- lib/timeline.ts: chapter durations and shared animation state; small boundary tolerance handles fractional CSS pixels
- components/cinematic/experience-shell.tsx: navigation, display modes, timeline and pinned panels
- components/cinematic/universe.tsx: Canvas, adaptive DPR, stars, worlds, context-loss handling
- components/cinematic/traveler.tsx: opening portrait fade (never rotates edge-on)
- components/cinematic/astronaut-3d.tsx: original mesh suit and forward-only depth travel
- components/cinematic/worlds.tsx: independently blended, lit procedural skill/project planets
- components/cinematic/skill-system.tsx: keyboard/touch skill worlds and disclosure
- lib/shaders/space.ts: original procedural GLSL
- public/images/ASSETS.md: complete generation prompt/provenance
- public/models/astronaut.glb and public/credits.html: optimized model and required attribution
- scripts/optimize-model.mjs: reproducible texture recompression / GLB repacking
- tests/portfolio.spec.ts and playwright.config.ts: 16 browser regression tests
- docs/previews/: production desktop hero, black-hole and review-viewport screenshots
- README.md / AGENTS.md: setup, deployment, durable agent instructions

## Completed
- Existing app/branding/factual-source audit; npm preserved; dead former UI components and unused dependencies removed.
- All twelve chapters: hero, acceleration, about, skills, three missions, nebula, journey, achievements, deep space, finale/contact.
- Supplied-face hero asset; volumetric 3D traveler; gold disk with lensed arcs and background-star distortion.
- Skill selection, project disclosures, résumé, GitHub, LinkedIn, email and verified SigmaLearn live link.
- Desktop/mobile navigation, backward scrolling, direct hash links, pause idle animation, full reading mode.
- Reduced-motion default, no-JavaScript content, WebGL context-loss fallback, keyboard interaction, small-phone overflow handling.
- Lazy Canvas bundle, compressed assets, adaptive rendering quality; no runtime secrets.
- Successful production build, static prerender, TypeScript, lint, browser suite and production smoke test.

## In Progress
Complete. Production preview refreshed following user visual feedback. Second feedback round implemented: volumetric suit; fixed-lane depth movement; one-field skills navigator preserving every tool and description; generated sharp planet texture; flowing black-hole light.

## Remaining
- User visual review, particularly likeness and the revised continuous transitions.
- Physical iOS/Safari/Android GPU testing is not performed; mobile Chrome viewport emulation is verified.
- Vercel deployment is not performed. Use the portfolio directory as root, Next.js preset; no env required.
- Optional visual refinement: scanned/facially rigged astronaut likeness, more elaborate physically based lensing, richer per-project world geometry. Current versions are functional approximations.

## Generated Assets
- public/images/planet-ocean-original.png and planet-ocean.webp: built-in imagegen equirectangular texture; exact prompt in ASSETS.md; WebP about 652 KB.
- public/images/astronaut-original.png: built-in imagegen, one identity-preserve generation using the actual user photo; preserved original.
- public/images/astronaut.webp: final delivery encoding, approximately 224 KB; same generated image. Full prompt in ASSETS.md.
- public/images/astronaut-rear-original.png and astronaut-rear.webp: built-in imagegen matching rear suit, optimized locally; exact prompt in ASSETS.md.
- public/models/astronaut.glb: retained historical prototype, no longer loaded. NOT generated. Astronaut by Poly, CC BY 2.0, via Google model-viewer. Texture resized/recompressed; 2,869,044 → 265,160 bytes. Public credits linked in footer.
- docs/previews/desktop.png and black-hole.png: production browser screenshots, not generated scene art.
- Higgsfield was considered; no credits spent. Built-in imagegen supported the supplied local identity reference directly.

## Important Decisions
- Initial local content called the teaching project TeachRAG. Current upstream README at https://github.com/Sanskar1314/RAG_Based_Teaching_Assistant verifies SigmaLearn AI, Next.js/React/Gemini/Whisper and https://sigmalearn-ai.vercel.app (HTTP 200 checked). Preserve this correction. Chapter anchor is #sigmalearn.
- Existing local content is the source for education, internship, awards and dates. Do not import extra metrics from the concept board. No publication URL was available; none fabricated. Research accuracy metric omitted from display.
- Identity-preserved front image and matching rear generation; do not replace the interactive universe with a video.
- No remote Google Fonts dependency. No fake loading percentage or artificial wait.
- Never put side-effectful fallback components inside Canvas fallback: its fallback DOM children may mount even when WebGL works.

## Known Problems / Compromises
- The volumetric suit is an original stylized mesh model, not a scan or facially rigged likeness. The opening portrait stays photographic and dissolves before the 3D turn. Previous rear plate and GLB are retained unused.
- Lensing is a physically inspired analytical approximation, not ray-traced general relativity. Skills use five compact accessible controls, one field and its full tools, and a description disclosure.
- No verified Brain Tumor Detection publication URL or MovieMind live demo was found. Existing résumé/certification Drive and LinkedIn URLs retained; their authenticated/private content was not independently verified.
- Five development-only npm audit advisories remain in eslint-config-next → fast-glob → braces, with no compatible upstream fix offered. Do not force-downgrade Next lint tooling. Production audit reports zero.
- Machine Homebrew Node fails loading libsimdjson. Use a working Node or /Users/sanskar/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node (put its directory first on PATH). This is not required on Vercel.

## Testing Status
Verified 2026-10-09 (Asia/Kolkata):
- dev: verified on http://127.0.0.1:3000; production preview uses port 3001.
- lint: pass; TypeScript: pass.
- production build: pass, Next.js 16.4.0, static / and /_not-found.
- browser suite: 16/16 pass using PLAYWRIGHT_CHANNEL=chrome npm test.
- responsive: 1440×900/1000, review viewports 1126×771 and 662×771, 390×844 and 360×640; no horizontal overflow, disclosures remain reachable.
- behaviors: fixed-lane forward 3D travel, all five focused skill categories, light-flow/pause screenshot comparison (moving pixel difference 6.85; paused 0), forward/backward navigation, skill keyboard activation, project details, reader toggle, pause, reduced motion, context loss and JavaScript disabled verified.
- production server: http://127.0.0.1:3001. Direct #skills/#sigmalearn/#nebula/#contact verified; no console errors. Frame sampling is local headless Chrome only, not a physical-device benchmark.
- production dependencies: npm audit --omit=dev reports zero vulnerabilities.
- Git diff whitespace check: pass. Original branding/photo assets preserved.

## Resume Point
Read AGENTS.md and this file. Implementation is built and verified; do not restart or redesign it. Open the local preview (start npm run dev if needed) and continue from concrete user feedback. For a requested character upgrade, begin in components/cinematic/traveler.tsx and preserve the tested timeline and fallback behavior. For deployment, use README.md and verify the production build before publishing.

## Next 5 Actions
1. Review the local production preview and existing screenshots with the user.
2. Apply specific requested visual/likeness refinements without rebuilding the architecture.
3. If physical devices are available, check Safari/iOS and Android scrolling, GPU load and text sizing.
4. Deploy to Vercel when requested, using the portfolio directory as root.
5. After changes, run lint/typecheck/browser tests/build and update this file.
