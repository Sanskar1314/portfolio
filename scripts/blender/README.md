# Explorer suit

Modeled with Blender 5.2 through Higgsfield's hosted Blender scene tools.
Project: https://higgsfield.ai/3d-jutsu/b3e66f53-0cd0-40e6-a0f1-9a7dda2f82c4
Final revision: 3.

- `explorer-suit.blend`: editable source, semantic mesh parts, studio camera and lighting.
- `../../public/models/explorer-suit.glb`: portable web export with the approved portrait embedded locally (3,152,088 bytes).
- `explorer_blockout.py`, `explorer_detail.py`, `explorer_finish.py`: sequential creation scripts for the hosted `bpy` + `artifacts` runtime. For standalone Blender, replace the artifact publishing lines with local render paths.

The earlier astronaut illustration guided the ivory cloth, graphite harness, amber fittings, helmet, and life-support pack. This is an original modeled interpretation, not image-to-3D reconstruction, a sculpted facial likeness, or a rigged character. Flight motion is applied to the model as a whole by the website's shared timeline.

Materials use portable Principled values; fabric folds are geometry. The site batches mesh pieces by material and excludes studio lights/camera from the rendered model.

The final GLB includes the existing approved face portrait projected onto the curved visor. Run `python3 scripts/blender/embed-portrait.py` after a fresh hosted export to restore this mapping. The editable Blender source has the original smoked visor; the portable GLB has the portrait material.
