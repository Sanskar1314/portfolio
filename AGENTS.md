# Portfolio instructions

- Read PROJECT_STATE.md before changing code; continue its Resume Point rather than restarting.
- Inspect existing implementation and preserve useful assets. Branding references live in ../Branding.
- Maintain a cinematic, near-black, cream editorial space journey with blue environmental light and a gold black-hole finale. Avoid dashboard/neon styling.
- Keep facts in lib/content.ts. Do not invent metrics, credentials, employers, dates or URLs. The current upstream project README verifies the teaching project as SigmaLearn AI (formerly TeachRAG in the original local data).
- Keep one centralized scroll timeline; semantic content must work without WebGL and with reduced motion.
- Preserve npm and Next.js. Bound GPU work and DPR; no runtime generation services or secrets.
- Update PROJECT_STATE.md after meaningful milestones and keep exact resume instructions.
- Run TypeScript, lint and production builds regularly. Never claim completion without a successful production build and report untested behavior honestly.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
