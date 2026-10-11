export const screenVertex = `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
// Analytical, physically inspired lensing: photon ring + back-side disk bent over the horizon.
// This is intentionally not a relativistic ray tracer; bounded work keeps the finale usable on phones.
export const spaceFragment = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uProgress;
uniform float uAspect;
uniform float uQuality;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){if(i>=2 && uQuality<.5)break;v+=noise(p)*a;p=p*2.04+vec2(8.1,4.7);a*=.5;}return v;}
void main(){
 vec2 p=vUv-.5;p.x*=uAspect;
 float deep=smoothstep(.79,.88,uProgress);
 vec3 col=vec3(.003,.005,.012);
 float cloud=fbm(p*3.+vec2(uTime*.004,0.));
 float veil=pow(max(0.,cloud-.30),3.)*2.;
 float nebula=smoothstep(.59,.64,uProgress)*(1.-smoothstep(.70,.79,uProgress));
 col+=mix(vec3(.035,.11,.22),vec3(.15,.10,.20),nebula)*veil*(1.-deep)*2.;
 float nebulaBand=exp(-pow(p.y+.22*sin(p.x*2.4),2.)*5.);
 float mist=pow(fbm(p*vec2(2.5,4.2)+vec2(uTime*.008,0.)),2.);
 vec3 gas=mix(vec3(.045,.14,.30),vec3(.24,.065,.14),noise(p*3.));
 col+=gas*mist*nebulaBand*nebula*2.8;
 // Fine distant stars remain stable in world-like coordinates.
 vec2 stars=p*230.; vec2 cell=floor(stars); vec2 point=fract(stars)-.5;
 float rnd=hash(cell); float star=pow(max(0.,1.-length(point)*2.),12.)*step(.988,rnd);
 col+=vec3(.6,.7,.85)*star*(1.-deep*.93);

 float arrival=smoothstep(.845,.985,uProgress);
 if(arrival>.001){
   vec2 center=vec2(mix(.30,.20,arrival),.06);
   vec2 q=(p-center)/mix(.025,.58,arrival);
   float r=length(q);float angle=atan(q.y,q.x);
   float horizon=.47;
   float ring=exp(-abs(r-horizon)*125.);
   float halo=exp(-abs(r-.53)*8.)*.17;
   // Lensed back disk appears above and below the event horizon.
   float band=abs(r-(.52+.025*sin(angle*2.)));
   float warp=exp(-band*55.)*(.3+.7*abs(sin(angle)));
   float orbital=angle-mod(uTime,200.)*.32;
   float lanes=fbm(vec2(cos(orbital)*7.,sin(orbital)*7.)+r*65.);
   // Curve the foreground flow down toward the lower lensed image; bound time
   // before evaluating noise to avoid precision breakdown during long sessions.
   float clock=mod(uTime,200.);
   float bend=.025*exp(-pow(q.x/.53,2.));
   vec2 disk=vec2(q.x,(q.y+bend)*6.5);
   float dr=length(disk);
   float diskMask=smoothstep(.47,.57,dr)*(1.-smoothstep(1.2,2.2,dr));
   float da=atan(disk.y,disk.x);
   float flow=da-clock*.28;
   float turbulence=fbm(vec2(dr*18.,sin(flow)*3.+cos(flow)*2.));
   float frequency=75.;
   float attenuation=1.-smoothstep(.3,1.2,fwidth(dr)*frequency);
   float filaments=(.5+.5*sin(dr*frequency+turbulence*4.-clock*.6))*attenuation;
   float diskLight=diskMask*(.12+turbulence*turbulence*1.7+filaments*.22)/max(.7,dr*dr);
   diskLight*=1.+.25*cos(da);
   float front=1.-smoothstep(-.025,.025,q.y+bend);
   diskLight*=mix(smoothstep(horizon,horizon+.035,r),1.,front);
   // Continuous lower arc uses the same radial flow as the upper lensed disk.
   float lowerArc=exp(-abs(r-.515)*48.)*smoothstep(.05,.4,-q.y);
   float arcFlow=.6+.4*sin(angle*12.-clock*.5+r*40.);
   diskLight+=lowerArc*(.25+.25*arcFlow);
   float beams=exp(-abs(q.y+.012)*40.)*exp(-abs(q.x)*1.1)*smoothstep(.43,.53,abs(q.x));
   vec3 gold=vec3(1.,.42,.105);vec3 hot=vec3(1.,.88,.63);
   vec3 bh=gold*(halo+warp*(.7+lanes)+diskLight+beams*.6)+hot*ring*1.5;
   float shadow=1.-smoothstep(horizon-.01,horizon,r);
   col*=1.-shadow*arrival;
   // Sparse displaced stars make the lensing outside the photon ring visible.
   vec2 lensed=q*(1.+.10/max(.16,r*r));
   vec2 lgrid=lensed*70.;float ls=step(.997,hash(floor(lgrid)))*pow(max(0.,1.-length(fract(lgrid)-.5)*2.),10.);
   bh+=ls*vec3(.8,.7,.55)*smoothstep(.58,.8,r);
   col+=bh*arrival;
 }
 col*=1.-.28*length(vUv-.5);
 gl_FragColor=vec4(col,1.);
}`;
export const planetVertex = `varying vec2 vMapUv;varying vec3 vNormal;varying vec3 vPosition;void main(){vMapUv=uv;vNormal=normalize(normalMatrix*normal);vPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
export const planetFragment = `precision highp float;
varying vec2 vMapUv; varying vec3 vNormal; varying vec3 vPosition;
uniform sampler2D uMap; uniform vec3 uColor; uniform float uOpacity; uniform float uKind;
void main(){
 vec3 normal=normalize(vNormal);
 vec3 detail=texture2D(uMap,vMapUv).rgb;
 if(uKind==0. || uKind==2.){
   vec2 projected=vec2(vPosition.x*.5+.5,vPosition.y*.5+.5);
   vec2 photoUv=uKind==2. ? vec2(799./1600.,1.-535./1065.)+vPosition.xy*vec2(404./1600.,404./1065.) : projected*.99+.005;
   detail=texture2D(uMap,photoUv).rgb;
   gl_FragColor=vec4(detail*(.88+.12*max(0.,normal.z)),uOpacity);
   return;
 }
 float luma=dot(detail,vec3(.2126,.7152,.0722));
 vec3 tinted=mix(detail,vec3(luma)*uColor*1.35,.48);
 float light=max(0.,dot(normal,normalize(vec3(-.7,.6,1.2))));
 float rim=pow(1.-max(0.,normal.z),4.);
 vec3 color=tinted*(.30+light*.92)+uColor*rim*.17;
 gl_FragColor=vec4(color,uOpacity);
}`;
export const atmosphereFragment = `precision highp float;varying vec3 vNormal;varying vec3 vPosition;uniform vec3 uColor;uniform float uOpacity;
void main(){float rim=pow(max(0.,1.-abs(normalize(vNormal).z)),4.);gl_FragColor=vec4(uColor*1.1,rim*.28*uOpacity);}`;
