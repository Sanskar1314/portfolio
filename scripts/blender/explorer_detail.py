import bpy, math
from mathutils import Vector
root=bpy.data.objects['HERO_explorer']
cloth=bpy.data.materials['Suit_ivory_fabric'];armor=bpy.data.materials['Armor_graphite'];rubber=bpy.data.materials['Joint_black_elastomer'];metal=bpy.data.materials['Fittings_titanium'];gold=bpy.data.materials['Fittings_amber']
def mat(n,c,metallic=0,rough=.5):
 m=bpy.data.materials.new(n);m.diffuse_color=(*c,1);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*c,1);p.inputs['Metallic'].default_value=metallic;p.inputs['Roughness'].default_value=rough;return m
seam=mat('Stitched_canvas',(.34,.33,.28),0,.9);screen=mat('Instrument_glass',(.04,.14,.19),.3,.23);white=mat('Ceramic_markings',(.82,.81,.73),0,.6)
def finish(o,n,m):
 o.name=n;o.data.materials.append(m);o.parent=root
 if o.type=='MESH':
  for p in o.data.polygons:p.use_smooth=True
 return o
def box(n,pos,size,m,b=.01):
 bpy.ops.mesh.primitive_cube_add(size=1,location=pos);o=bpy.context.object;o.scale=size;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);v=o.modifiers.new('Rounded edges','BEVEL');v.width=b;v.segments=3;o.modifiers.new('Face normals','WEIGHTED_NORMAL');return finish(o,n,m)
def sphere(n,pos,size,m):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=24,ring_count=16,location=pos);o=bpy.context.object;o.scale=size;return finish(o,n,m)
def ring(n,pos,r,t,m,rot=(0,0,0),scale=(1,1,1)):
 bpy.ops.mesh.primitive_torus_add(major_segments=40,minor_segments=8,location=pos,major_radius=r,minor_radius=t,rotation=rot);o=bpy.context.object;o.scale=scale;return finish(o,n,m)
def tube(n,points,r,m):
 c=bpy.data.curves.new(n,'CURVE');c.dimensions='3D';c.resolution_u=12;c.bevel_depth=r;c.bevel_resolution=3;s=c.splines.new('BEZIER');s.bezier_points.add(len(points)-1)
 for p,co in zip(s.bezier_points,points):p.co=co;p.handle_left_type='AUTO';p.handle_right_type='AUTO'
 o=bpy.data.objects.new(n,c);bpy.context.collection.objects.link(o);finish(o,n,m);bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.convert(target='MESH');o.select_set(False);return o
def fabric(n,a,b,r1,r2,flat=1):
 old=bpy.data.objects.get(n)
 if old:bpy.data.objects.remove(old,do_unlink=True)
 a,b=Vector(a),Vector(b);axis=b-a;q=axis.to_track_quat('Z','Y');verts=[];faces=[];rows=32;cols=40
 for j in range(rows+1):
  t=j/rows;rad=r1*(1-t)+r2*t;envelope=math.sin(math.pi*t)**.5
  for i in range(cols):
   theta=2*math.pi*i/cols;fold=(.007*math.sin(t*61+2*math.sin(theta*3))+.003*math.sin(t*111-theta*5))*envelope
   r=rad+fold+.007*math.sin(math.pi*t);p=a+q@Vector((r*math.cos(theta),flat*r*math.sin(theta),axis.length*t));verts.append(p)
 for j in range(rows):
  for i in range(cols):
   k=j*cols+i;kk=j*cols+(i+1)%cols;faces.append((k,kk,kk+cols,k+cols))
 faces.append(tuple(reversed(range(cols))));faces.append(tuple(rows*cols+i for i in range(cols)))
 mesh=bpy.data.meshes.new(n);mesh.from_pydata(verts,[],faces);mesh.update();o=bpy.data.objects.new(n,mesh);bpy.context.collection.objects.link(o);return finish(o,n,cloth)
# Pressure sleeves carry actual shallow folds, retained in the portable mesh.
for side in [-1,1]:
 t='L' if side<0 else 'R'
 fabric(t+'_upper_arm',(side*.30,0,1.48),(side*.40,-.008,1.24),.118,.10)
 fabric(t+'_forearm',(side*.415,-.01,1.19),(side*.46,-.025,.99),.102,.077)
 fabric(t+'_thigh',(side*.13,0,1.08),(side*.155,.018,.68),.134,.112,.94)
 fabric(t+'_shin',(side*.155,.012,.60),(side*.164,.02,.23),.109,.087)
 # Accordion flex seals and outer protective kneepads.
 for i in range(8):
  ring(t+'_knee_bellow_%02d'%i,(side*.155,.01,.583+i*.016),.112,.008,rubber,scale=(1,1.03,1))
  ring(t+'_elbow_bellow_%02d'%i,(side*(.397+i*.003),-.01,1.174+i*.015),.097,.0065,rubber,rot=(0,side*.25,0))
 box(t+'_knee_guard',(side*.155,-.104,.643),(.13,.043,.125),armor,.025)
 box(t+'_knee_guard_inlay',(side*.155,-.130,.65),(.09,.011,.069),metal,.01)
 # Shoulder yokes, rank plate, forearm service console.
 shoulder=box(t+'_shoulder_yoke',(side*.30,-.106,1.53),(.155,.06,.145),armor,.028);shoulder.rotation_euler.y=side*.22
 box(t+'_shoulder_amber_inset',(side*.32,-.14,1.53),(.058,.012,.065),gold,.005)
 box(t+'_forearm_pad',(side*.449,-.098,1.10),(.104,.035,.125),armor,.015)
 for i in range(3):box(t+'_forearm_bar_'+str(i),(side*.449,-.12,1.07+i*.025),(.071,.007,.01),metal,.002)
 # Graphite harness follows front and shoulder silhouette to the backpack.
 tube(t+'_harness',[(side*.20,.20,1.62),(side*.24,-.005,1.64),(side*.185,-.173,1.53),(side*.17,-.202,1.30),(side*.20,-.154,1.10)],.026,armor)
 tube(t+'_harness_piping',[(side*.204,-.002,1.648),(side*.165,-.193,1.52),(side*.150,-.223,1.29),(side*.178,-.174,1.12)],.004,seam)
 for z in [1.54,1.32,1.13]:
  box(t+'_buckle_'+str(z),(side*.178,-.229 if z>1.2 else -.185,z),(.063,.02,.053),gold,.006)
  box(t+'_buckle_slot_'+str(z),(side*.178,-.241 if z>1.2 else -.197,z),(.037,.008,.027),armor,.003)
 # Breathing hoses and quick-disconnect hardware.
 tube(t+'_oxygen_hose',[(side*.089,-.226,1.245),(side*.24,-.25,1.20),(side*.285,-.20,1.06),(side*.26,.10,1.08),(side*.23,.255,1.20)],.019,rubber)
 for i in range(5):ring(t+'_port_rib_'+str(i),(side*.09,-.218-i*.008,1.245),.028,.005,gold,(math.pi/2,0,0))
 box(t+'_hip_pouch',(side*.228,-.09,1.04),(.13,.13,.175),cloth,.025)
 box(t+'_hip_pouch_flap',(side*.228,-.16,1.087),(.135,.016,.068),seam,.012)
 box(t+'_thigh_pocket',(side*.155,-.108,.865),(.14,.045,.20),cloth,.025)
 box(t+'_pocket_lid',(side*.155,-.138,.94),(.145,.015,.049),seam,.009)
 tube(t+'_leg_seam',[(side*.242,-.034,1.02),(side*.252,-.035,.90),(side*.261,-.035,.74)],.0035,seam)
 # Shaped glove palms with individual curled fingers and thumb.
 bpy.data.objects.remove(bpy.data.objects[t+'_glove'],do_unlink=True)
 sphere(t+'_glove_palm',(side*.472,-.031,.928),(.071,.055,.061),cloth)
 box(t+'_glove_back',(side*.472,.008,.93),(.095,.04,.082),armor,.016)
 for i in range(4):
  x=side*.472+(i-1.5)*.031;z=.894-abs(i-1.5)*.003
  tube(t+'_finger_'+str(i),[(x,-.032,z),(x,-.042,z-.044),(x,-.070,z-.058)],.016,cloth)
  ring(t+'_finger_joint_'+str(i),(x,-.047,z-.029),.016,.0028,rubber)
 tube(t+'_thumb',[(side*.417,-.025,.941),(side*.397,-.071,.914),(side*.418,-.093,.885)],.022,cloth)
 # Boots: instep gaiter, toe armor, ribbed soles and ankle seals.
 box(t+'_toe_cap',(side*.164,-.153,.115),(.188,.13,.116),armor,.031)
 for i in range(4):ring(t+'_ankle_fold_'+str(i),(side*.164,.02,.229+i*.017),.089,.009,seam)
 for i in range(6):box(t+'_sole_tread_'+str(i),(side*.164,-.191+i*.054,.018),(.225,.02,.021),armor,.003)
 box(t+'_boot_strap',(side*.164,-.12,.228),(.158,.035,.035),seam,.007)
 # Twin oxygen tanks and rear pack attachment points.
 sphere(t+'_oxygen_tank',(side*.225,.228,1.40),(.072,.078,.23),metal)
 for z in [1.27,1.52]:ring(t+'_tank_band_'+str(z),(side*.225,.228,z),.073,.01,armor)
 tube(t+'_rear_conduit',[(side*.19,.32,1.64),(side*.27,.34,1.58),(side*.27,.33,1.27)],.016,gold)
 # Helmet ear assemblies, pivot bolts, lower collar flanges.
 sphere(t+'_helmet_ear',(side*.212,.0,1.87),(.04,.092,.095),armor)
 ring(t+'_helmet_ear_trim',(side*.245,0,1.87),.065,.009,metal,(0,math.pi/2,0))
 sphere(t+'_helmet_hinge',(side*.253,-.006,1.87),(.012,.026,.026),gold)
for z,r,m in [(1.611,.176,rubber),(1.631,.192,armor),(1.66,.19,metal)]:ring('Collar_layer_'+str(z),(0,0,z),r,.012,m)
for i in range(12):
 a=i*math.tau/12;sphere('Collar_lock_'+str(i),(.198*math.cos(a),.198*math.sin(a),1.646),(.009,.009,.011),gold)
# Layered rim follows the visor; improve seal thickness without changing face opening.
ring('Visor_outer_gasket',(0,-.150,1.87),.196,.009,rubber,(math.pi/2,0,0),(1,1.05,1))
for i in range(10):
 a=i*math.tau/10;sphere('Visor_fastener_'+str(i),(.19*math.cos(a),-.174,1.87+.2*math.sin(a)),(.007,.006,.007),gold)
box('Helmet_top_mount',(0,.018,2.104),(.09,.10,.025),armor,.012)
box('Helmet_top_strip',(0,-.007,2.12),(.038,.065,.008),gold,.004)
# Instrument chest with recessed display, switch row and four captive screws.
box('Chest_screen',(0,-.222,1.478),(.185,.016,.095),screen,.012)
for i in range(4):
 box('Display_trace_'+str(i),(-.044,-.232,1.50-i*.017),(.077-i*.008,.004,.0028),white,.001)
for x in [-.07,0,.07]:sphere('Chest_button_'+str(x),(x,-.228,1.402),(.014,.008,.014),gold)
for x in [-.109,.109]:
 for z in [1.389,1.538]:sphere('Chest_screw_'+str(x)+str(z),(x,-.22,z),(.005,.004,.005),metal)
box('Abdomen_panel_inset',(0,-.21,1.29),(.112,.012,.028),armor,.005)
for i in range(8):box('Backpack_vent_'+str(i),(0,.360,1.32+i*.025),(.22,.009,.009),metal,.003)
box('Pack_id_plate',(0,.36,1.58),(.14,.012,.06),cloth,.005)
# Waist belt sits over the pressure garment and joins both side bags.
ring('Waist_webbing',(0,0,1.10),.221,.027,armor,scale=(1,.74,1))
box('Waist_buckle',(0,-.183,1.103),(.085,.034,.06),metal,.008)
# Calm the spherical highlight and render a closer studio inspection.
p=bpy.data.materials['Visor_smoked_blue'].node_tree.nodes.get('Principled BSDF');p.inputs['Roughness'].default_value=.24;p.inputs['Metallic'].default_value=.55
scene=bpy.context.scene;scene.render.resolution_x=750;scene.render.resolution_y=1000
scene.camera.location=(1.5,-6,2.4);scene.camera.rotation_euler=(Vector((0,0,1.08))-scene.camera.location).to_track_quat('-Z','Y').to_euler();scene.camera.data.ortho_scale=2.46
scene.render.image_settings.media_type='IMAGE';scene.render.image_settings.file_format='PNG'
target=artifacts.file(name='explorer-detail.png',media_type='image/png');scene.render.filepath=str(target.path);bpy.ops.render.render(write_still=True);target.publish()
result={'objects':len(root.children),'detail':'cloth folds, harness, gloves, seals, backpack, hardware'}
