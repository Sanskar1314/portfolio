# Original Goal
Build Sanskar Gupta’s cinematic astronaut portfolio inside the existing Next.js repository: scroll-scrubbed space travel, useful real portfolio content, gold black-hole finale, mobile and accessible fallbacks, Vercel-compatible build.

## Visual Direction
Reviewed ../Branding/Astronaut Portfolio Across the Universe.png, ../Branding/compressed_Untitled design (1).jpg and public/profile.png. Preserve near-black space, editorial cream text, blue environmental light and restrained gold finale. Original branding/photos remain untouched. Avoid neon/dashboard redesigns.

## Architecture
- Next.js 16.4, React 19, TypeScript, npm; React Three Fiber + Three.js loaded dynamically in a client-only Canvas.
- Server-rendered content defaults to reader mode (works without JavaScript). After hydration, reduced-motion users stay in reader mode; others enter the cinematic mode.
- Native sections are scroll tracks. Twelve fixed scene panels share one normalized, damped timeline with WebGL. No scroll interception or speed-dependent animation. Native hash links work forward/backward.
- Desktop 900 star streaks; mobile 280, reduced sphere tessellation, fewer procedural noise samples, DPR 1. Measured frame time can reduce DPR further.
- Original photographic astronaut hero restored by user request. No active 3D suit. Scroll-driven rocket travels left to right along the lower edge. Sequential text fades prevent ghosted headlines. Supplied Mars/Jupiter references and generated ocean planet remain in the universe.
- No audio, external runtime generation service, API key or environment variable required.

## Repository Map
- app/page.tsx: semantic scene content and real project/contact links
- app/globals.css: design tokens, scene composition, explicit mobile/reader layouts
- app/layout.tsx: metadata; system fonts avoid build-time font downloads
- lib/content.ts: factual project/profile/skills/experience/certification data
- lib/timeline.ts: chapter durations and shared animation state; small boundary tolerance handles fractional CSS pixels
- components/cinematic/experience-shell.tsx: navigation, display modes, timeline and pinned panels
- components/cinematic/universe.tsx: Canvas, adaptive DPR, stars, worlds, context-loss handling
- components/cinematic/astronaut-3d.tsx: original mesh suit and forward-only depth travel
- components/cinematic/worlds.tsx: independently blended, lit procedural skill/project planets
- components/cinematic/skill-system.tsx: five always-labeled constellation groups (29 tools), no click-to-reveal
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
Latest visual feedback implemented locally (2026-10-09): centered launch, full-width two-column About glass panel, dark glass mission cards, warm contact glass, brighter/larger copy and technology chips, larger stylized orbit labels. Desktop pointer has a subtle orbital ring that expands over links, preserves the native cursor, and disables for coarse pointers, reduced motion and Pause motion.

## Remaining
- User visual review of the new glass composition.
- Physical iOS/Safari/Android testing and Vercel deployment have not been performed.
- Small screens vertically scroll the single-column constellation; all 29 tools remain accessible.

## Generated Assets
- public/images/planet-ocean-original.png and planet-ocean.webp: built-in imagegen equirectangular texture; exact prompt in ASSETS.md; WebP about 652 KB.
- public/images/astronaut-original.png: built-in imagegen, one identity-preserve generation using the actual user photo; preserved original.
- public/images/astronaut.webp: final delivery encoding, approximately 224 KB; same generated image. Full prompt in ASSETS.md.
- public/images/astronaut-rear-original.png and astronaut-rear.webp: built-in imagegen matching rear suit, optimized locally; exact prompt in ASSETS.md.
- public/models/astronaut.glb: retained historical prototype, no longer loaded. NOT generated. Astronaut by Poly, CC BY 2.0, via Google model-viewer. Texture resized/recompressed; 2,869,044 → 265,160 bytes. Public credits linked in footer.
- docs/previews/desktop.png and black-hole.png: production browser screenshots, not generated scene art.
- Higgsfield hosted Blender 5.2 created the suit, project b3e66f53-0cd0-40e6-a0f1-9a7dda2f82c4, revision 3. The portable GLB then received the existing portrait locally via scripts/blender/embed-portrait.py. No new face was generated or uploaded.
- public/models/explorer-suit.glb: final portable model with embedded portrait, 3,152,088 bytes. scripts/blender/explorer-suit.blend: editable geometry and studio lighting before local portrait embedding.

## Important Decisions
- Initial local content called the teaching project TeachRAG. Current upstream README at https://github.com/Sanskar1314/RAG_Based_Teaching_Assistant verifies SigmaLearn AI, Next.js/React/Gemini/Whisper and https://sigmalearn-ai.vercel.app (HTTP 200 checked). Preserve this correction. Chapter anchor is #sigmalearn.
- Existing local content is the source for education, internship, awards and dates. Do not import extra metrics from the concept board. No publication URL was available; none fabricated. Research accuracy metric omitted from display.
- Identity-preserved front image and matching rear generation; do not replace the interactive universe with a video.
- No remote Google Fonts dependency. No fake loading percentage. User explicitly requested a 3-2-1 launch intro; five-second sequence has Skip/Escape and reduced-motion bypass.
- Never put side-effectful fallback components inside Canvas fallback: its fallback DOM children may mount even when WebGL works.

## Known Problems / Compromises
- Blender experiments and models are retained but unused. Do not reactivate: user chose the original portrait plus rocket. Supplied planet photos show one hemisphere; gentle axial oscillation preserves their appearance rather than fabricating a backside.
- Lensing is a physically inspired analytical approximation, not ray-traced general relativity. Skills use five constellation groups with always-visible category names and tools, with no selection interaction.
- No verified Brain Tumor Detection publication URL or MovieMind live demo was found. Existing résumé/certification Drive and LinkedIn URLs retained; their authenticated/private content was not independently verified.
- Five development-only npm audit advisories remain in eslint-config-next → fast-glob → braces, with no compatible upstream fix offered. Do not force-downgrade Next lint tooling. Production audit reports zero.
- Machine Homebrew Node fails loading libsimdjson. Use a working Node or /Users/sanskar/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node (put its directory first on PATH). This is not required on Vercel.

## Testing Status
Latest checks 2026-10-09:
- Production build and TypeScript pass: npm run build -- --webpack.
- Lint and git diff --check pass.
- CUA visual review of desktop About, MovieMind, skills, contact and 390x844 contact. No observed browser console errors.
- Previous 16/16 browser suite passed at c21fc6e; not rerun for this revision. Do not report it as current verification.
- Production preview is running at http://127.0.0.1:3001 (session 95102).

## Resume Point
Read AGENTS.md and this file. Continue user visual feedback without restarting architecture. Active hero uses astronaut.webp; RocketTraveler replaces the model. Latest glass/layout overrides are at the end of app/globals.css; OrbitPointer is mounted by ExperienceShell. Skills now follow the supplied ideation: five glass cards with colored planet badges and orbital paths around a gold world, all 29 tools retained. Mars and Jupiter are the user's supplied images in public/images. Retained Blender files are historical only.

## Next Actions
1. Refine from user review while preserving original portrait, supplied planets and factual content.
2. Verify future changes in browser and rebuild; deploy only when requested.

## Latest review refinements
Neutral smoked glass replaces navy mission/About panels; cream metadata and chips. Chapter captions align with the 9% content edge (7% on small screens). Contact shifts 3vw left on desktop and its message uses Georgia serif. Skills replaced with a connected constellation; all 29 tools fit the desktop panel without scrolling. Production webpack build, TypeScript, lint and whitespace checks pass; desktop constellation/contact/research reviewed.

## 2026-10-10 update
- Added half-visible stylized Earth (existing ocean texture) at bottom center of countdown and hero, replacing the diagonal shader horizon. Sized below the main copy.
- Unified interface accent tokens to muted gold, cream copy, and neutral charcoal glass; planets keep natural color.
- LaunchIntro provides countdown/vertical rocket, Skip and Escape, reduced-motion bypass, scroll/focus restoration and timer cleanup.
- Skills reference is pending: only a screenshot of the current manifest was supplied so far.
- Webpack production build + TypeScript and lint passed; desktop opening visually reviewed.

## Latest correction
Earth is ONLY in LaunchIntro, removed from the portrait hero. Rocket nozzle aligns to the top of the globe via the shared --launch-earth size; launch is vertical. Skills reference received and implemented with real HTML cards/chips, textured planet badges and CSS orbits; responsive layout stacks cards. Production webpack build, TypeScript and lint pass. Countdown origin visually checked; hero Earth absent in DOM.

Latest sizing adjustment: countdown Earth now shows only a shallow top cap (16vh, bounded 75–150px), not a hemisphere. Rocket launch origin uses the same visible-height variable on desktop and phone.

## Current interaction (2026-10-10)
User supersedes always-visible skills: hover/focus/tap a named planet to reveal its category in a shared glass panel. Details close immediately on pointer leave or keyboard blur; another planet changes them; Escape closes them. No panel or placeholder is shown with no selection. Reader mode retains all skill lists. Earth remains only in countdown, now 160vw minimum diameter (200vw mobile) with the same shallow cap height and rocket origin. Build/TypeScript/lint pass; browser verified reveal, Tab selection, Escape dismissal and wider Earth.

2026-10-11: Changed planet details to dismiss on pointer leave, with blur cleanup and a hidden empty panel. Touch selection remains available.

2026-10-11 visual adjustment: Data Science planet lowered 14px on desktop; hover panel still clears its label. Countdown Earth now uses earth-day.jpg from Three.js examples, with temperate land/ocean positioned within the existing shallow, wide cap. No Earth added to the portrait hero. Production webpack build and TypeScript passed; browser checked countdown surface/rocket origin and Data Science panel spacing. Preview port 3001 session 36848.

2026-10-11 follow-up: Data Science moved another 32px lower on desktop (46px total offset from 40%). Its revealed panel uses tighter vertical padding to clear the label. Browser verified selected state; webpack production build and TypeScript passed. Preview session 87585 on port 3001.

2026-10-11 scrollbar refinement: hidden scrollbar tracks globally, including all overflowing cards, while retaining existing overflow and scroll behavior. Verified expanded MovieMind card scrolls to its GitHub link without a visible scrollbar. Production webpack build, TypeScript and diff whitespace check passed. Preview port 3001 session 54661.

2026-10-11 Chrome layout investigation: native Chrome opening screenshot appeared intact; subsequent native capture failed. Reproduced short desktop viewport skills detail overlap at 1366x600 in IAB. Removed cinematic scene 650px minimum height, use 100dvh; <=700px-high desktop gets tighter hero typography and skills details below the left heading, avoiding planet hover occlusion. Verified short-window Data Science details; reset viewport override. Build/TypeScript and diff check passed. Preview session 4397. Asked user which Chrome section shifts; exact reported Chrome issue still requires their clarification if it persists.

2026-10-11 contact overlap fix: contact chapter now reserves explicit space for caption (36px above card), card (bounded above footer with internal scrolling), and copyright footer (95px from bottom). Removes inherited mobile top margins; compact typography on short screens. Verified no overlap at 1366x600. Build/TypeScript passed; preview session 58252. This addresses the user's clarified Chrome issue at the black-hole finale.

2026-10-11 contact typography: reduced “What’s next?” to a viewport-height-aware 32–56px heading (6dvh), line-height 1.08. Email visible without card scrolling in desktop preview. Build/TypeScript and diff check passed; preview session 6386.

2026-10-12 project interaction: replaced inline expanding project details with shared MissionDetails client component. Native modal dialog opens with a restrained fade/scale and blurred backdrop, numbered factual highlights, technology chips, persistent GitHub/live actions, close button and Escape dismissal. Keeps the original native details as no-JS fallback. Locks background scroll and explicitly restores scroll position/focus after native dialog autofocus; prevents return-to-hero jumps. Both projects verified in browser: MovieMind mouse/keyboard open, Escape and Close, same-section restoration; SigmaLearn mobile 390x844 view with both actions visible. Viewport reset. Production webpack build, TypeScript, lint and diff check pass. Preview port 3001 session 5014.

2026-10-12 launch animation: added 24 deterministic star trails and ignition glow; lifting phase now drops Earth downward, fades launch labels, and accelerates the entire intro screen upward over the existing 2.1-second handoff. Brief 2px ignition movement; reduced-motion bypass retained, Skip/Escape unchanged. Browser verified countdown/lifting DOM and completion to hero; production webpack build, TypeScript, lint and diff check passed. Preview session 9855.

2026-10-12 home entrance: after LaunchIntro unmounts (natural completion or skip), astronaut drifts in over 1.5s and hero eyebrow/name/role/intro/CTA enter with staggered opacity/translate animations. Scroll cue and home note arrive last. Scoped to cinematic mode and no-preference motion; reader/reduced-motion remain static. Build/TypeScript and diff check pass; browser verified completed hero reveal. Preview session 31276.

2026-10-12 intro landing fix: ExperienceShell now owns intro completion. While countdown runs, timeline stays at home and hash/load/pageshow restoration cannot select another chapter. Natural completion, Skip, Escape and reduced-motion bypass reset progress, active chapter, scroll and URL (#top) before revealing home. Later section navigation remains enabled. Verified reload from #contact completes at home; Projects navigation works; reload from #work plus Escape returns home. Build/TypeScript/lint and diff check passed. Preview session 54450. Not yet committed/pushed.

2026-10-12 skills discoverability: added an explicit gold-accented “Hover over a planet to reveal my skills” cue below the section heading, switched to “Tap” on coarse/touch pointers. Each planet label now has a small plus affordance with hover/focus feedback and an accessible description. Existing immediate pointer-leave dismissal preserved. Production webpack build (including TypeScript), lint and diff check pass. Installed Chrome headless verified desktop/touch hint visibility and hover-open/leave-close; desktop screenshot visually reviewed. New preview at http://localhost:3002 (session 30998). Changes remain local, not pushed.

2026-10-12 scroll pacing: increased the native journey distance by 50% (desktop 18vh → 27vh per unit, mobile 23svh → 34.5svh). The same scroll input now advances the cinematic timeline one-third less, giving each scene more reading time without wheel interception or additional lag. Reader mode and card scrolling unchanged. Production webpack build/TypeScript and diff check passed; installed Chrome desktop/mobile confirmed new scroll ranges and working MovieMind navigation. Preview http://localhost:3002 session 87304. Changes local, not pushed.

2026-10-13: removed the fixed page-progress line along the bottom edge below the rocket, including its DOM, styles and per-frame update. Rocket traveler and chapter navigation remain intact. Production webpack build/TypeScript passed. Local preview remains on port 3002; not pushed.
