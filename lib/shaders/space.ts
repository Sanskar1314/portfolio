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
 float opening=1.-smoothstep(.07,.17,uProgress);
 vec2 earth=p-vec2(.90,-1.34);float er=length(earth);
 float atmosphere=exp(-abs(er-1.20)*95.);
 float surface=1.-smoothstep(1.19,1.20,er);
 col+=vec3(.16,.40,.72)*atmosphere*opening;
 col=mix(col,vec3(.007,.022,.045)+vec3(.025,.07,.105)*fbm(earth*17.),surface*opening);
 col+=vec3(.9,.60,.28)*exp(-length(earth-vec2(-.4,1.12))*32.)*opening;
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
   float orbital=angle-uTime*.32;
   float lanes=fbm(vec2(cos(orbital)*7.,sin(orbital)*7.)+r*65.);
   vec2 disk=vec2(q.x,q.y*6.5+.12*sin(q.x*2.));
   float dr=length(disk);
   float diskMask=smoothstep(.47,.57,dr)*(1.-smoothstep(1.2,2.2,dr));
   float da=atan(disk.y,disk.x);
   float flow=da-uTime*(.48/pow(max(dr,.5),1.5));
   float turbulence=fbm(vec2(cos(flow),sin(flow))*9.+dr*35.);
   float filaments=.5+.5*sin(dr*180.+turbulence*7.+flow*3.);
   float hotspot=pow(max(0.,cos(flow-.7)),12.);
   float diskLight=diskMask*(.16+pow(turbulence,2.)*2.7+filaments*.17+hotspot*.28)/max(.7,dr*dr);
   diskLight*=1.+.28*cos(da);
   float front=step(q.y,0.);diskLight*=mix(smoothstep(horizon,horizon+.025,r),1.,front);
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
 float luma=dot(detail,vec3(.2126,.7152,.0722));
 vec3 tinted=mix(detail,vec3(luma)*uColor*1.35,.48);
 float light=max(0.,dot(normal,normalize(vec3(-.7,.6,1.2))));
 float rim=pow(1.-max(0.,normal.z),4.);
 vec3 color=tinted*(.30+light*.92)+uColor*rim*.17;
 gl_FragColor=vec4(color,uOpacity);
}`;
export const atmosphereFragment = `precision highp float;varying vec3 vNormal;varying vec3 vPosition;uniform vec3 uColor;uniform float uOpacity;
void main(){float rim=pow(max(0.,1.-abs(normalize(vNormal).z)),4.);gl_FragColor=vec4(uColor*1.1,rim*.28*uOpacity);}`;
