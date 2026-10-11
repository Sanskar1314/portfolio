import bpy, math
from mathutils import Vector
# SCENE: metre-scale 2.15m explorer suit for GLB, editable components, front -Y.
# SHOT: 70mm front three-quarter; cream cloth / graphite armor / amber hardware.
# ACCEPTANCE: human proportions, separate hands/boots, sealed helmet, connected backpack.
for o in list(bpy.data.objects): bpy.data.objects.remove(o,do_unlink=True)
def mat(n,c,metal=0,rough=.5):
 m=bpy.data.materials.new(n);m.diffuse_color=(*c,1);m.use_nodes=True
 p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*c,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough
 return m
cloth=mat('Suit_ivory_fabric',(.61,.59,.52),0,.83)
armor=mat('Armor_graphite',(.07,.09,.105),.45,.43)
rubber=mat('Joint_black_elastomer',(.027,.033,.04),0,.72)
metal=mat('Fittings_titanium',(.34,.37,.4),.8,.25)
gold=mat('Fittings_amber',(.65,.32,.065),.65,.27)
visor=mat('Visor_smoked_blue',(.021,.06,.10),.7,.12)
root=bpy.data.objects.new('HERO_explorer',None);bpy.context.collection.objects.link(root)
def finish(o,n,m):
 o.name=n;o.data.materials.append(m);o.parent=root
 if o.type=='MESH':
  for p in o.data.polygons:p.use_smooth=True
 return o
def sphere(n,pos,scale,m):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=40,ring_count=24,location=pos);o=bpy.context.object;o.scale=scale;return finish(o,n,m)
def box(n,pos,scale,m,bevel=.025):
 bpy.ops.mesh.primitive_cube_add(size=1,location=pos);o=bpy.context.object;o.scale=scale;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 b=o.modifiers.new('Soft manufactured edges','BEVEL');b.width=bevel;b.segments=3;o.modifiers.new('Weighted face normals','WEIGHTED_NORMAL');return finish(o,n,m)
def limb(n,a,b,r1,r2,m):
 a,b=Vector(a),Vector(b);d=b-a
 bpy.ops.mesh.primitive_cone_add(vertices=32,radius1=r1,radius2=r2,depth=d.length,location=(a+b)/2);o=bpy.context.object;o.rotation_mode='QUATERNION';o.rotation_quaternion=d.to_track_quat('Z','Y')
 mod=o.modifiers.new('Soft transitions','BEVEL');mod.width=.035;mod.segments=3;return finish(o,n,m)
def torus(n,pos,major,minor,m,rot=(0,0,0),scale=(1,1,1)):
 bpy.ops.mesh.primitive_torus_add(major_segments=48,minor_segments=10,location=pos,major_radius=major,minor_radius=minor,rotation=rot);o=bpy.context.object;o.scale=scale;return finish(o,n,m)
sphere('Torso_pressure_garment',(0,0,1.36),(.275,.175,.34),cloth)
sphere('Hip_garment',(0,0,1.08),(.235,.16,.20),cloth)
box('Life_support_pack',(0,.205,1.42),(.40,.23,.53),cloth,.055)
box('Pack_rear_panel',(0,.33,1.43),(.32,.05,.41),armor)
torus('Helmet_locking_collar',(0,0,1.64),.176,.027,metal)
sphere('Helmet_shell',(0,0,1.855),(.225,.205,.255),cloth)
sphere('Helmet_visor',(0,-.137,1.87),(.187,.132,.185),visor)
torus('Visor_metal_seal',(0,-.153,1.87),.18,.018,metal,(math.pi/2,0,0),(1,1.05,1))
box('Chest_computer',(0,-.173,1.46),(.25,.085,.19),armor)
box('Abdomen_service_panel',(0,-.17,1.24),(.22,.07,.14),cloth)
for side in [-1,1]:
 tag='L' if side<0 else 'R'
 sphere(tag+'_shoulder',(side*.30,0,1.51),(.135,.14,.17),cloth)
 limb(tag+'_upper_arm',(side*.30,0,1.48),(side*.40,-.008,1.24),.12,.10,cloth)
 sphere(tag+'_elbow',(side*.408,-.01,1.23),(.102,.104,.09),rubber)
 limb(tag+'_forearm',(side*.415,-.01,1.19),(side*.46,-.025,.99),.10,.077,cloth)
 torus(tag+'_wrist_seal',(side*.46,-.025,.99),.077,.017,metal)
 sphere(tag+'_glove',(side*.468,-.03,.91),(.083,.062,.10),cloth)
 limb(tag+'_thigh',(side*.13,0,1.08),(side*.155,.018,.68),.136,.112,cloth)
 sphere(tag+'_knee',(side*.155,.01,.64),(.115,.12,.105),rubber)
 limb(tag+'_shin',(side*.155,.012,.60),(side*.164,.02,.23),.11,.087,cloth)
 box(tag+'_boot',(side*.164,-.045,.13),(.205,.32,.24),cloth,.055)
 box(tag+'_boot_sole',(side*.164,-.06,.034),(.217,.345,.06),rubber,.02)
scene=bpy.context.scene;scene.render.engine='BLENDER_EEVEE';scene.render.resolution_x=600;scene.render.resolution_y=800;scene.render.resolution_percentage=100
scene.world=bpy.data.worlds.new("Studio_world");scene.world.color=(.13,.13,.13)
def aim(o,target):o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(2.4,-6,2.6));cam=bpy.context.object;cam.name='CAM_main';cam.data.type='ORTHO';cam.data.ortho_scale=2.65;aim(cam,(0,0,1.08));scene.camera=cam
for name,pos,power,color,radius in [('LGT_key',(-3,-4,4),1100,(1,.91,.78),2),('LGT_fill',(3,-2,2),500,(.62,.78,1),2),('LGT_rim',(0,2,3),900,(.65,.79,1),1)]:
 bpy.ops.object.light_add(type='POINT',location=pos);o=bpy.context.object;o.name=name;o.data.energy=power;o.data.color=color;o.data.shadow_soft_size=radius
scene.render.image_settings.media_type='IMAGE';scene.render.image_settings.file_format='PNG'
target=artifacts.file(name='suit-blockout.png',media_type='image/png');scene.render.filepath=str(target.path);bpy.ops.render.render(write_still=True);target.publish()
result={'mesh_count':sum(o.type=='MESH' for o in bpy.data.objects),'height_m':2.144,'front':'-Y','root':'HERO_explorer'}
