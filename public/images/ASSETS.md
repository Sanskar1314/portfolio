# Asset provenance

## astronaut.webp / astronaut-original.png
Purpose: identity-consistent hero and static fallback astronaut, final generated asset (human likeness review welcomed).
Tool: built-in imagegen, one generation, 2026-10-08. No generation service needed at runtime.
Reference: ../../../Branding/compressed_Untitled design (1).jpg (original user photo; glasses and facial identity retained).
Original generation: exec-0105c1f7-4a1b-4664-9a71-10156bed45f8.png. Original PNG preserved; WebP is delivery encoding.
Prompt: “Use case: identity-preserve. Create a photorealistic cinematic full-body astronaut cutout for this person's personal portfolio, using the supplied photograph as identity reference. Preserve his recognizable face, glasses, hair, skin tone and normal slim proportions. His actual face visible naturally INSIDE a clear subtly reflected glass visor, not pasted over it. Functional detailed graphite and ivory EVA suit, ribbed joints, backpack, restrained tiny amber fittings, no weapons, no logos, no text. Full body floating upright with knees slightly relaxed and arms naturally away from sides, three-quarter body but face near frontal. Helmet and both boots completely inside image with generous transparent margins. Cool blue rim light from right and soft warm face light, premium realistic film prop materials. Subject only, genuinely transparent background. Portrait aspect ratio. This will be used as an identity-based hero asset alongside a real-time 3D astronaut, not as a background scene.”

No Higgsfield asset was generated: its local-file identity upload route is constrained; built-in imagegen directly accepts local identity references. No video, movie frame or third-party space texture is used. World shaders are original code. The distant astronaut model uses a credited third-party suit texture; see ../credits.html.

## ../models/astronaut.glb
Astronaut by Poly, CC BY 2.0, distributed by Google model-viewer. Downloaded from https://modelviewer.dev/shared-assets/models/Astronaut.glb. Texture recompressed to JPEG at 1024 px using scripts/optimize-model.mjs; file reduced from 2,869,044 to 265,160 bytes. This is the distant travel/finale model, not a bespoke 3D scan of Sanskar. Public attribution: /credits.html.

## astronaut-rear-original.png / astronaut-rear.webp — feedback revision
Purpose: matched rear view for the persistent traveler, replacing the unrelated low-poly prototype suit. Final WebP delivery asset; original preserved. Generated once with built-in imagegen on 2026-10-08, using astronaut-original.png as the exact suit reference. The character is now a two-sided 2.5D plate moving continuously over the real-time 3D universe, not a claimed rigged 3D person.

Prompt: “Use case: identity-preserve / character turnaround. Create the REAR VIEW of the exact astronaut suit in the reference image, as a photorealistic full-body transparent cutout for continuous animation in a cinematic portfolio. Same cream/ivory woven EVA suit, charcoal ribbed joints, functional realistic engineering, same proportions and helmet, same small warm amber fittings, same gloves and boots. Camera directly behind astronaut, looking at rear backpack, face not visible, no additional person. Full astronaut with helmet and boots completely in frame and generous transparent margins, upright floating with gently relaxed bent legs and arms slightly out. Compact detailed graphite and ivory rectangular life-support backpack with hoses and realistic fabric straps. No red bands, no flags, no text, no logos. Cool blue rim lighting and subtle amber reflections, mostly shadowed back. Match the supplied astronaut's realism, scale, angle and palette as closely as possible so the two images can crossfade while shrinking into space. Genuinely transparent background, portrait 2:3 composition. Do not include stars or any backdrop.”

The previous public/models/astronaut.glb is retained only as an unused prototype/reference asset. No longer loaded or displayed by the site.

## Sharp ocean world texture — revision 3

Built-in imagegen generation, 2026-10-08. Original: `planet-ocean-original.png`; production WebP (quality 92): `planet-ocean.webp`. Applied as an equirectangular map on live rotating 3D spheres. No external runtime generation. Source retained unchanged; WebP is delivery compression only.

Exact prompt:
> Use case: stylized-concept. Asset type: high-resolution equirectangular albedo texture for a rotating real-time 3D planet. Generate a very sharp 2:1 rectangular planetary surface map, edge-to-edge coverage, NOT a picture of a sphere. Oceanic alien blue world with intricate ivory ice coastlines, dark navy oceans, cobalt shallow seas, rugged mineral islands, delicate white atmospheric cloud filaments and circular storm systems. Rich fine-scale satellite detail, crisp coastlines, natural geological variation. Flat even illumination with no baked directional light, no shadow, no horizon, no space background, no text, no labels. Seamless left/right boundary, polar regions at top and bottom. Cinematic realistic orbital photography aesthetic. Output 3072x1536 if available.

The traveling suit is now original volumetric geometry authored in `components/cinematic/astronaut-3d.tsx`, with smooth helmet, articulated limbs, backpack, fittings, and hoses. The generated portrait is retained at the opening and fades face-on before departure; neither front nor rear image is rotated edge-on. The rear photographic asset is retained as an unused reference.
