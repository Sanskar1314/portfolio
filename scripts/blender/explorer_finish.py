import bpy, math
from mathutils import Vector
# Break up the initial evenly spaced folds into softer, irregular cloth creases.
for side in [-1,1]:
 tag='L' if side<0 else 'R'
 specs=[('upper_arm',(side*.30,0,1.48),(side*.40,-.008,1.24),.118,.10,1),('forearm',(side*.415,-.01,1.19),(side*.46,-.025,.99),.102,.077,1),('thigh',(side*.13,0,1.08),(side*.155,.018,.68),.134,.112,.94),('shin',(side*.155,.012,.60),(side*.164,.02,.23),.109,.087,1)]
 for name,aa,bb,r1,r2,flat in specs:
  o=bpy.data.objects[tag+'_'+name];a,b=Vector(aa),Vector(bb);axis=b-a;q=axis.to_track_quat('Z','Y')
  for v in o.data.vertices:
   local=q.inverted()@(v.co-a);t=max(0,min(1,local.z/axis.length));theta=math.atan2(local.y/flat,local.x)
   envelope=math.sin(math.pi*t)**.5;rad=r1*(1-t)+r2*t
   fold=(.0035*math.sin(t*37+3*math.sin(theta*2))+.002*math.sin(t*79+theta*7))*envelope
   r=rad+fold+.007*math.sin(math.pi*t);v.co=a+q@Vector((r*math.cos(theta),flat*r*math.sin(theta),axis.length*t))
scene=bpy.context.scene
scene.render.image_settings.media_type='IMAGE';scene.render.image_settings.file_format='PNG'
for name,position in [('explorer-front.png',(1.5,-6,2.4)),('explorer-back.png',(-2,6,2.5))]:
 scene.camera.location=position;scene.camera.rotation_euler=(Vector((0,0,1.08))-scene.camera.location).to_track_quat('-Z','Y').to_euler()
 target=artifacts.file(name=name,media_type='image/png');scene.render.filepath=str(target.path);bpy.ops.render.render(write_still=True);target.publish()
scene.camera.location=(1.5,-6,2.4);scene.camera.rotation_euler=(Vector((0,0,1.08))-scene.camera.location).to_track_quat('-Z','Y').to_euler()
result={'mesh_count':sum(o.type=='MESH' for o in bpy.data.objects),'source':'original modeled geometry; previous suit used as visual design reference','has_textures':False}
