"""Embed the existing approved portrait into the exported curved visor (no new image)."""
from pathlib import Path
import json, struct
root=Path(__file__).resolve().parents[2]
path=root/'public/models/explorer-suit.glb'
raw=path.read_bytes();json_len=struct.unpack_from('<I',raw,12)[0]
doc=json.loads(raw[20:20+json_len]);binary=bytearray(raw[28+json_len:])
if any(m.get('name')=='Portrait_inside_visor' for m in doc['materials']):
 print('Portrait is already embedded.');raise SystemExit
node=next(n for n in doc['nodes'] if n.get('name')=='Helmet_visor')
primitive=doc['meshes'][node['mesh']]['primitives'][0]
accessor=doc['accessors'][primitive['attributes']['POSITION']];view=doc['bufferViews'][accessor['bufferView']]
offset=view.get('byteOffset',0)+accessor.get('byteOffset',0);stride=view.get('byteStride',12)
def append_view(data):
 while len(binary)%4:binary.append(0)
 start=len(binary);binary.extend(data);idx=len(doc['bufferViews']);doc['bufferViews'].append({'buffer':0,'byteOffset':start,'byteLength':len(data)});return idx
uv=bytearray()
for i in range(accessor['count']):
 x,y,z=struct.unpack_from('<fff',binary,offset+i*stride)
 # glTF uses top-origin image coordinates. Match the website portrait projection.
 u=(420+230*(x+1)/2)/1024;v=(60+235*(1-(y+1)/2))/1536
 uv.extend(struct.pack('<ff',u,v))
uv_view=append_view(uv);uv_accessor=len(doc['accessors']);doc['accessors'].append({'bufferView':uv_view,'componentType':5126,'count':accessor['count'],'type':'VEC2'})
primitive['attributes']['TEXCOORD_0']=uv_accessor
image_view=append_view((root/'public/images/astronaut.webp').read_bytes())
images=doc.setdefault('images',[]);image_index=len(images);images.append({'bufferView':image_view,'mimeType':'image/webp','name':'Approved_identity_portrait'})
textures=doc.setdefault('textures',[]);texture_index=len(textures);textures.append({'extensions':{'EXT_texture_webp':{'source':image_index}}})
for key in ['extensionsUsed','extensionsRequired']:
 entries=doc.setdefault(key,[])
 if 'EXT_texture_webp' not in entries:entries.append('EXT_texture_webp')
material=doc['materials'][primitive['material']];material.update({'name':'Portrait_inside_visor','emissiveFactor':[.3,.3,.3],'emissiveTexture':{'index':texture_index}})
material['pbrMetallicRoughness']={'baseColorFactor':[1,1,1,1],'baseColorTexture':{'index':texture_index},'metallicFactor':0,'roughnessFactor':.65}
material['extensions']={'KHR_materials_clearcoat':{'clearcoatFactor':.18,'clearcoatRoughnessFactor':.2}}
if 'KHR_materials_clearcoat' not in doc['extensionsUsed']:doc['extensionsUsed'].append('KHR_materials_clearcoat')
doc['buffers'][0]['byteLength']=len(binary)
while len(binary)%4:binary.append(0)
encoded=json.dumps(doc,separators=(',',':')).encode()
encoded+=b' '*((-len(encoded))%4)
out=struct.pack('<III',0x46546c67,2,28+len(encoded)+len(binary))+struct.pack('<II',len(encoded),0x4e4f534a)+encoded+struct.pack('<II',len(binary),0x004e4942)+binary
path.write_bytes(out);print(f'Embedded portrait: {len(out):,} bytes')
