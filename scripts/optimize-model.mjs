// Repack a GLB with a bounded JPEG color texture. Geometry and UVs are unchanged.
import fs from "node:fs";
import sharp from "sharp";
async function optimize(path) {
  const file = fs.readFileSync(path);
  const jsonLength = file.readUInt32LE(12);
  const json = JSON.parse(file.subarray(20, 20 + jsonLength).toString());
  const binary = file.subarray(28 + jsonLength);
  const imageViews = new Set(json.images.map((image) => image.bufferView));
  const chunks = [];
  let offset = 0;
  for (const [index, view] of json.bufferViews.entries()) {
    let bytes = binary.subarray(
      view.byteOffset || 0,
      (view.byteOffset || 0) + view.byteLength,
    );
    if (imageViews.has(index))
      bytes = await sharp(bytes)
        .resize({
          width: 1024,
          height: 1024,
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 86 })
        .toBuffer();
    const padding = Buffer.alloc((4 - (bytes.length % 4)) % 4);
    view.byteOffset = offset;
    view.byteLength = bytes.length;
    chunks.push(bytes, padding);
    offset += bytes.length + padding.length;
  }
  json.images.forEach((image) => {
    image.mimeType = "image/jpeg";
  });
  json.buffers[0].byteLength = offset;
  const jsonBytes = Buffer.from(JSON.stringify(json));
  const jsonPadding = Buffer.alloc((4 - (jsonBytes.length % 4)) % 4, 32);
  const jsonHeader = Buffer.alloc(8);
  jsonHeader.writeUInt32LE(jsonBytes.length + jsonPadding.length);
  jsonHeader.writeUInt32LE(0x4e4f534a, 4);
  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(offset);
  binHeader.writeUInt32LE(0x004e4942, 4);
  const header = Buffer.from(file.subarray(0, 12));
  header.writeUInt32LE(
    12 + 8 + jsonBytes.length + jsonPadding.length + 8 + offset,
    8,
  );
  const output = Buffer.concat([
    header,
    jsonHeader,
    jsonBytes,
    jsonPadding,
    binHeader,
    ...chunks,
  ]);
  fs.writeFileSync(path, output);
  console.log(`${path}: ${file.length} → ${output.length} bytes`);
}
optimize(process.argv[2] || "public/models/astronaut.glb").catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
