(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t,ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;gsap.registerPlugin(ScrollTrigger);const DPR=Math.min(2,devicePixelRatio||1);
/* ================= SHAPES (drawn in a 200×200 box, shaded so the halftone has tone) ================= */
function gr(c,x0,y0,x1,y1,a='#000',b='#9A9A9A'){const g=c.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,a);g.addColorStop(1,b);return g}
function rr(c,x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r);c.fill()}
function circ(c,x,y,r){c.beginPath();c.arc(x,y,r,0,7);c.fill()}
const W_='#fff';
const SH={
 robot(c){c.fillStyle=gr(c,60,160,140,190);rr(c,55,166,90,24,8);c.fillStyle=gr(c,80,140,120,180,'#111','#777');circ(c,100,158,20);
   c.save();c.translate(100,156);c.rotate(-.55);c.fillStyle=gr(c,-14,-90,14,0,'#222','#888');rr(c,-13,-88,26,92,13);c.fillStyle='#000';circ(c,0,-84,15);c.fillStyle=W_;circ(c,0,-84,5);
   c.translate(0,-84);c.rotate(1.45);c.fillStyle=gr(c,-11,-76,11,0,'#333','#aaa');rr(c,-11,-74,22,78,11);c.translate(0,-72);c.fillStyle='#000';rr(c,-16,-10,32,14,4);rr(c,-16,-30,7,22,3);rr(c,9,-30,7,22,3);c.restore()},
 tractor(c){c.fillStyle=gr(c,70,85,180,135,'#111','#999');rr(c,72,88,112,48,8);c.fillStyle=gr(c,52,36,116,100,'#000','#777');rr(c,52,36,66,66,10);c.fillStyle=W_;rr(c,62,46,46,30,5);
   c.fillStyle='#222';rr(c,152,52,9,38,3);const R=c.createRadialGradient(56,128,6,62,140,44);R.addColorStop(0,'#bbb');R.addColorStop(1,'#000');c.fillStyle=R;circ(c,62,140,44);c.fillStyle=W_;circ(c,62,140,13);
   const R2=c.createRadialGradient(150,148,4,154,154,28);R2.addColorStop(0,'#bbb');R2.addColorStop(1,'#000');c.fillStyle=R2;circ(c,154,154,28);c.fillStyle=W_;circ(c,154,154,8)},
 crane(c){c.fillStyle=gr(c,40,30,58,190);rr(c,40,34,18,156,2);c.strokeStyle=W_;c.lineWidth=3;for(let y=44;y<186;y+=18){c.beginPath();c.moveTo(42,y);c.lineTo(56,y+16);c.stroke()}
   c.fillStyle=gr(c,10,26,195,40,'#000','#888');rr(c,10,26,186,14,2);c.fillStyle='#111';rr(c,12,40,30,16,3);c.fillStyle='#000';c.fillRect(160,40,3,64);
   c.fillStyle=gr(c,130,104,190,146,'#333','#bbb');rr(c,128,104,62,40,4);c.fillStyle=W_;for(let x=138;x<186;x+=10)c.fillRect(x,110,3,28);c.fillStyle='#000';rr(c,20,184,60,8,2)},
 cart(c){c.fillStyle=gr(c,30,60,170,140,'#111','#aaa');rr(c,28,62,144,80,12);c.fillStyle=W_;c.fillRect(91,76,18,52);c.fillRect(74,93,52,18);
   c.fillStyle='#222';c.fillRect(96,36,8,28);c.fillStyle=gr(c,60,14,140,52,'#000','#888');rr(c,58,12,84,44,8);c.fillStyle=W_;rr(c,66,20,68,28,4);c.fillStyle='#000';c.lineWidth=3;c.strokeStyle='#000';c.beginPath();c.moveTo(70,36);c.lineTo(86,36);c.lineTo(92,26);c.lineTo(100,44);c.lineTo(106,34);c.lineTo(130,34);c.stroke();
   c.fillStyle='#000';circ(c,54,162,15);circ(c,146,162,15);c.fillStyle=W_;circ(c,54,162,5);circ(c,146,162,5);c.fillStyle='#111';rr(c,170,70,14,10,3)},
 car(c){c.fillStyle=gr(c,20,90,180,150,'#111','#aaa');rr(c,18,96,164,50,18);c.fillStyle=gr(c,50,56,150,100,'#000','#777');rr(c,48,58,104,48,22);c.fillStyle=W_;rr(c,60,66,36,28,8);rr(c,104,66,36,28,8);
   c.fillStyle='#000';circ(c,56,148,20);circ(c,146,148,20);c.fillStyle=W_;circ(c,56,148,7);circ(c,146,148,7);c.fillStyle=W_;rr(c,22,108,16,8,3)},
 shield(c){c.fillStyle=gr(c,40,20,160,190,'#000','#aaa');c.beginPath();c.moveTo(100,18);c.lineTo(168,42);c.quadraticCurveTo(168,140,100,186);c.quadraticCurveTo(32,140,32,42);c.closePath();c.fill();
   c.fillStyle=W_;rr(c,78,92,44,40,6);c.strokeStyle=W_;c.lineWidth=8;c.beginPath();c.arc(100,90,15,Math.PI,0);c.stroke();c.fillStyle='#000';circ(c,100,108,5)},
 avatar(c){c.fillStyle=gr(c,40,30,160,150,'#000','#a0a0a0');rr(c,38,44,124,108,44);c.fillStyle=W_;rr(c,58,78,84,38,19);c.fillStyle='#000';circ(c,82,97,9);circ(c,118,97,9);c.fillStyle=W_;circ(c,85,94,3);circ(c,121,94,3);
   c.fillStyle='#111';c.fillRect(97,18,6,28);circ(c,100,16,9);c.fillStyle=gr(c,50,150,150,200,'#222','#999');rr(c,52,154,96,46,24)},
 house(c){c.fillStyle='#000';c.beginPath();c.moveTo(100,22);c.lineTo(182,96);c.lineTo(18,96);c.closePath();c.fill();c.fillStyle=gr(c,40,96,160,180,'#111','#888');c.fillRect(40,92,120,88);c.fillStyle=W_;rr(c,86,122,28,58,4)},
 chip(c){c.fillStyle='#000';for(let i=0;i<5;i++){const p=56+i*22;c.fillRect(p-3,24,6,22);c.fillRect(p-3,154,6,22);c.fillRect(24,p-3,22,6);c.fillRect(154,p-3,22,6)}c.fillStyle=gr(c,44,44,156,156,'#000','#888');rr(c,44,44,112,112,12);c.fillStyle=W_;rr(c,74,74,52,52,6)},
 pad(c){c.fillStyle=gr(c,20,60,180,150,'#000','#999');rr(c,18,62,164,84,42);c.fillStyle=W_;c.fillRect(48,96,40,14);c.fillRect(61,83,14,40);circ(c,130,92,9);circ(c,152,110,9)},
 globe(c){const R=c.createRadialGradient(80,70,10,100,100,82);R.addColorStop(0,'#aaa');R.addColorStop(1,'#000');c.fillStyle=R;circ(c,100,100,80);c.strokeStyle=W_;c.lineWidth=5;c.beginPath();c.ellipse(100,100,34,80,0,0,7);c.stroke();c.beginPath();c.moveTo(20,100);c.lineTo(180,100);c.stroke();c.beginPath();c.moveTo(100,20);c.lineTo(100,180);c.stroke()},
 people(c){c.fillStyle='#000';circ(c,70,64,26);circ(c,134,72,22);c.fillStyle=gr(c,20,100,110,180,'#111','#999');rr(c,22,100,96,80,40);c.fillStyle=gr(c,100,104,180,180,'#222','#aaa');rr(c,100,104,80,72,34)},
 mail(c){c.fillStyle=gr(c,20,48,180,152,'#000','#999');rr(c,20,48,160,106,12);c.strokeStyle=W_;c.lineWidth=8;c.beginPath();c.moveTo(30,60);c.lineTo(100,112);c.lineTo(170,60);c.stroke()},
 bolt(c){c.fillStyle=gr(c,60,10,140,190,'#000','#999');c.beginPath();c.moveTo(118,14);c.lineTo(50,112);c.lineTo(96,112);c.lineTo(80,188);c.lineTo(152,82);c.lineTo(106,82);c.closePath();c.fill()}
};
/* halftone sampler: shape → dots [{x,y,r}] in 0..1 space */
const off=document.createElement('canvas');off.width=off.height=200;const oc=off.getContext('2d',{willReadFrequently:true});
function sample(name,cell){oc.setTransform(1,0,0,1,0,0);oc.fillStyle='#fff';oc.fillRect(0,0,200,200);SH[name](oc);const d=oc.getImageData(0,0,200,200).data,out=[];
  for(let y=cell/2;y<200;y+=cell)for(let x=cell/2;x<200;x+=cell){let s=0,n=0;for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++){const xx=clamp(Math.round(x+i*cell/3),0,199),yy=clamp(Math.round(y+j*cell/3),0,199);s+=d[(yy*200+xx)*4];n++}
    const v=1-s/n/255;if(v>.06)out.push({x:x/200,y:y/200,r:Math.pow(v,.75)})}return out}
const imgCache={};
const PAL=['#B9A6F2','#9CC3EE','#8FD9C9','#F2A7E6','#ABABF5','#C5E86C'];
const tint=(x,y)=>{const h=Math.abs(Math.sin(x*91.7+y*47.3)*43758.5)%1;return h<.075?PAL[Math.floor(h*1000)%PAL.length]:null};
function dotImg(name,cell=7,color='#111',size=200,colorful=size>=140){const k=name+cell+color+size+colorful;if(imgCache[k])return imgCache[k];const c=document.createElement('canvas');c.width=c.height=size;const x=c.getContext('2d');
  const sc=size/200;sample(name,cell).forEach(p=>{const t=colorful&&tint(p.x,p.y);x.fillStyle=t||color;x.beginPath();x.arc(p.x*size,p.y*size,p.r*cell*(t?.62:.5)*sc,0,7);x.fill()});return imgCache[k]=c.toDataURL()}

/* ===== shared page behaviour (inner pages) ===== */
const PAGE=document.body.dataset.page||'';
/* dock */
const APPS=[['/','Home','#E6E6E0','house','home'],['/machines','Machines','#E3E3FF','robot','machines'],['/platform','Platform','#DCEBFA','chip','platform'],['/research','Research','#E9FAC0','bolt','research'],['/play','Play','#E6DEFF','pad','play'],['/team','Team','#FFE3FB','people','team'],['/contact','Contact','#E6E6E0','mail','contact']];
const dockEl=$('#dock');
if(dockEl){dockEl.innerHTML=APPS.map((a,i)=>`${i===APPS.length-1?'<span class="dsep"></span>':''}<a href="${a[0]}" style="--bg:${a[2]}" class="${PAGE===a[4]?'on':''} ${i===0||i===APPS.length-1?'edge':''}" aria-label="${a[1]}"><span class="tip">${a[1]}</span><img alt="" src="${dotImg(a[3],12,'#111',96)}"></a>${i===0?'<span class="dsep"></span>':''}`).join('');
  const dI=$$('#dock a');if(matchMedia('(hover:hover)').matches&&!RM){dockEl.addEventListener('mousemove',e=>dI.forEach(a=>{const r=a.getBoundingClientRect(),d=Math.abs(e.clientX-(r.left+r.width/2));a.style.transform=`scale(${(1+.55*Math.max(0,1-d/130)).toFixed(3)})`}));dockEl.addEventListener('mouseleave',()=>dI.forEach(a=>a.style.transform=''))}}
/* clocks */
function clocks(){const f=tz=>new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:tz}).format(new Date());const c=$('#clock');if(c)c.textContent='Delft '+f('Europe/Amsterdam');$$('.clk').forEach(c=>c.textContent=f(c.dataset.tz))}clocks();setInterval(clocks,20000);
/* smooth scroll */
if('scrollRestoration' in history)history.scrollRestoration='manual';
let lenis=null;
if(window.Lenis&&!RM){lenis=new Lenis({lerp:.075,smoothWheel:true,wheelMultiplier:.9,touchMultiplier:1.4});window.lenis=lenis;lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);ScrollTrigger.addEventListener('refresh',()=>lenis.resize())}
/* toast */
let toastT=null;const toast=m=>{const t=$('#toast');if(!t)return;t.textContent=m;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2200)};
/* page wipe: pixels cover the screen when leaving and clear when a page opens */
const PW=(function(){const cv=$('#pw');if(!cv)return null;const c=cv.getContext('2d');const BAY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];let cs=44,cols=0,rows=0,cells=[];
  const rnd=i=>Math.abs(Math.sin(i*127.1)*43758.5)%1;
  function size(){cs=innerWidth<600?28:44;cv.width=innerWidth;cv.height=innerHeight;cols=Math.ceil(innerWidth/cs);rows=Math.ceil(innerHeight/cs);cells=[];for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const h=rnd(x*91+y*17);cells.push({x,y,r:(BAY[(y%4)*4+x%4]+rnd(x*31+y)*.9)/16.9,col:h<.1?PAL[Math.floor(h*60)%PAL.length]:'#111'})}}
  size();addEventListener('resize',size);
  function draw(v){c.clearRect(0,0,cv.width,cv.height);for(const k of cells){if(k.r<v){const e=Math.min(1,(v-k.r)*6),sz=cs*e;c.fillStyle=k.col;c.fillRect(k.x*cs+(cs-sz)/2,k.y*cs+(cs-sz)/2,sz+.5,sz+.5)}}}
  return {draw,cover(done){const o={v:0};gsap.to(o,{v:1.2,duration:.5,ease:'power1.in',onUpdate:()=>draw(o.v),onComplete:done})},reveal(){const o={v:1.2};draw(1.2);gsap.to(o,{v:0,duration:.6,delay:.05,ease:'power1.out',onUpdate:()=>draw(o.v),onComplete:()=>draw(0)})}}})();
if(PW){if(RM)PW.draw(0);else PW.reveal()}
addEventListener('pageshow',e=>{if(e.persisted&&PW)PW.draw(0)});
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;const h=a.getAttribute('href')||'';const pg=a.dataset.page;
  if(pg&&h==='#'){e.preventDefault();toast('Opens '+pg+' soon');return}
  if(h.startsWith('#')&&h.length>1){const el=document.querySelector(h);if(el){e.preventDefault();lenis?lenis.scrollTo(el,{duration:1.2}):el.scrollIntoView({behavior:'smooth'})}return}
  if(a.target==='_blank'||h.startsWith('mailto:')||h.startsWith('http')||e.metaKey||e.ctrlKey)return;
  if(h.startsWith('/')&&PW&&!RM){e.preventDefault();PW.cover(()=>{location.href=h})}});
/* reveal on scroll */
$$('[data-rv]').forEach((el,i)=>{if(RM)return;gsap.fromTo(el,{y:40,opacity:0},{y:0,opacity:1,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',toggleActions:'play none none reverse'}})});
/* halftone illustrations that push away from the mouse */
$$('canvas.ill').forEach(cv=>{const shape=cv.dataset.shape;const c=cv.getContext('2d');let W=0,H=0,dots=[],mx=-999,my=-999,vis=false;
  function build(){const r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*DPR;cv.height=H*DPR;const S=Math.min(W,H)*.92,ox=(W-S)/2,oy=(H-S)/2,cell=5;
    dots=sample(shape,cell).map(p=>({hx:ox+p.x*S,hy:oy+p.y*S,x:ox+p.x*S,y:oy+p.y*S,vx:0,vy:0,r:Math.min(p.r,.9)*cell*S/200*.5,t:tint(p.x,p.y)}))}
  function frame(){if(vis){c.setTransform(DPR,0,0,DPR,0,0);c.clearRect(0,0,W,H);const tt=performance.now()/1000;
    for(const d of dots){const dx=d.x-mx,dy=d.y-my,dd=dx*dx+dy*dy;if(dd<8100){const l=Math.sqrt(dd)+1,f=(1-l/90)*2.4;d.vx+=dx/l*f;d.vy+=dy/l*f}
      d.vx+=(d.hx-d.x)*.06;d.vy+=(d.hy+Math.sin(tt*1.4+d.hx*.02)*2-d.y)*.06;d.vx*=.84;d.vy*=.84;d.x+=d.vx;d.y+=d.vy;c.fillStyle=d.t||'#111';c.beginPath();c.arc(d.x,d.y,d.t?d.r*1.25:d.r,0,7);c.fill()}}requestAnimationFrame(frame)}
  build();frame();addEventListener('resize',build);new IntersectionObserver(e=>{vis=e[0].isIntersecting},{threshold:0}).observe(cv);
  cv.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});cv.addEventListener('pointerleave',()=>{mx=my=-999});
  cv.addEventListener('click',()=>dots.forEach(d=>{d.vx+=(Math.random()-.5)*30;d.vy+=(Math.random()-.5)*30}));cv.dataset.c='push'});
/* dot images */
$$('img[data-dot]').forEach(im=>{im.src=dotImg(im.dataset.dot,+im.dataset.cell||7,'#111',+im.dataset.size||240)});
/* cards tilt */
$$('[data-tilt]').forEach(c=>{if(!matchMedia('(hover:hover)').matches)return;gsap.set(c,{transformPerspective:800});const rx=gsap.quickTo(c,'rotationX',{duration:.4}),ry=gsap.quickTo(c,'rotationY',{duration:.4});
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();rx(((e.clientY-r.top)/r.height-.5)*-7);ry(((e.clientX-r.left)/r.width-.5)*9)});c.addEventListener('pointerleave',()=>{rx(0);ry(0)});
  const im=c.querySelector('img');if(im)c.addEventListener('pointerenter',()=>gsap.fromTo(im,{y:0,rotation:0},{y:-10,rotation:8,duration:.22,yoyo:true,repeat:1}))});
/* cursor: retro selection brackets */
if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!RM&&$('#cur')){const cur=$('#cur'),box=$('#box'),lab=box.querySelector('span'),pt=$('#pt');document.documentElement.classList.add('hascur');cur.style.display='block';
  const snap=v=>Math.round(v/4)*4;let target=null,mxp=0,myp=0;
  function place(){if(target&&target.isConnected&&target.tagName!=='CANVAS'){const r=target.getBoundingClientRect();gsap.to(box,{x:r.left-6,y:r.top-6,width:r.width+12,height:r.height+12,duration:.28,ease:'power3.out',overwrite:true})}else gsap.to(box,{x:snap(mxp)-13,y:snap(myp)-13,width:26,height:26,duration:.18,ease:'power3.out',overwrite:true})}
  addEventListener('pointermove',e=>{mxp=e.clientX;myp=e.clientY;gsap.set(pt,{x:snap(mxp),y:snap(myp)});const t=e.target.closest('[data-c],a,button,input,select,textarea');
    if(t!==target){target=t;if(t){cur.classList.add('big');lab.textContent=t.dataset.c||(t.tagName==='A'?'go':t.matches('input,select,textarea')?'type':'click')}else cur.classList.remove('big')}
    cur.classList.toggle('dark',!!e.target.closest('.dark-sec'));place()});
  addEventListener('scroll',()=>{if(target)place()},{passive:true});addEventListener('pointerdown',()=>gsap.fromTo(box,{scale:.85},{scale:1,duration:.3,ease:'back.out(3)'}));
  document.addEventListener('pointerleave',()=>gsap.to(cur,{opacity:0}));document.addEventListener('pointerenter',()=>gsap.to(cur,{opacity:1}))}

/* ===== page features ===== */
/* machines filter */
$$('.filters button').forEach(b=>b.addEventListener('click',()=>{$$('.filters button').forEach(x=>x.classList.toggle('on',x===b));const f=b.dataset.f;$$('.case-card').forEach(c=>{const show=f==='all'||c.dataset.ind===f;gsap.to(c,{opacity:show?1:.15,scale:show?1:.96,duration:.35});c.style.pointerEvents=show?'auto':'none'})}));
/* research timeline */
$$('.tl-row').forEach(r=>r.addEventListener('mouseenter',()=>$$('.tl-row').forEach(x=>x.classList.toggle('on',x===r))));
$$('.pxbar').forEach(l=>gsap.fromTo(l.children,{scale:0},{scale:1,stagger:{each:.015,from:'end'},ease:'none',scrollTrigger:{trigger:l,start:'top 90%',end:'top 50%',scrub:.6}}));
/* team clocks */
$$('.tclk').forEach(t=>{const tz=t.dataset.tz;const f=()=>{const d=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:tz}).formatToParts(new Date()),g=k=>d.find(x=>x.type===k).value;t.innerHTML=`${g('hour')}<i>:</i>${g('minute')}<small>${g('second')}</small>`};f();setInterval(f,1000)});
/* contact form → opens the visitor's email app */
const cf=$('#cform');if(cf)cf.addEventListener('submit',e=>{e.preventDefault();const v=n=>(cf.elements[n].value||'').trim();if(!v('name')||!v('email')){toast('Please add your name and email');return}
  const body=`Name: ${v('name')}\nEmail: ${v('email')}\nCompany: ${v('company')}\nMachines: ${v('machine')}\n\n${v('msg')}`;location.href=`mailto:info@smartavatar.nl?subject=${encodeURIComponent('Demo request: '+(v('company')||v('name')))}&body=${encodeURIComponent(body)}`;toast('Opening your email app…')});
/* verify */
const vf=$('#vform');if(vf)vf.addEventListener('submit',e=>{e.preventDefault();const id=vf.elements.cid.value.trim().toUpperCase();const out=$('#vout');
  if(!/^SA-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(id)){out.className='vout bad';out.innerHTML='<b>That doesn’t look like a SmartAvatar ID.</b> IDs look like SA-1234-ABCD.';return}
  out.className='vout wait';out.innerHTML='<b>Scanning…</b>';setTimeout(()=>{out.className='vout ok';out.innerHTML=`<b>${id} has the right format.</b> To confirm it’s genuine, <a href="mailto:info@smartavatar.nl?subject=${encodeURIComponent('Verify certificate '+id)}">ask us by email</a> and we’ll confirm it.`},900)});

/* ===== demos on the platform feature pages ===== */
const demo=$('[data-demo]');
if(demo){const kind=demo.dataset.demo,cv=demo.querySelector('canvas'),c=cv.getContext('2d'),W=320,H=200;c.imageSmoothingEnabled=false;const out=demo.querySelector('.dout');const btns=demo.querySelectorAll('[data-act]');
  const S={t:0,prog:0,ver:'4.11',state:'idle',x:150,y:120,keys:{},wear:20,log:[],blocked:0,ok:0};
  const TR=["..........###...","..........#s#...","....gggggg###...","...ggggggggggg..","..###.....####..",".#####...######.",".##w##...##ww##.",".#####...######.","..###.....####.."];
  const CC={'#':'#111','g':'#C5E86C','s':'#DCEBFA','w':'#fff','y':'#B9A6F2','p':'#F2A7E6'};
  const spr=(rows,x,y,s)=>rows.forEach((r,j)=>[...r].forEach((ch,i)=>{if(CC[ch]){c.fillStyle=CC[ch];c.fillRect(Math.round(x+i*s),Math.round(y+j*s),s,s)}}));
  const bg=()=>{c.fillStyle='#fff';c.fillRect(0,0,W,H);c.fillStyle='rgba(17,17,17,.08)';for(let y=6;y<H;y+=12)for(let x=6;x<W;x+=12)c.fillRect(x,y,2,2)};
  const say=t=>{S.log.unshift(t);S.log=S.log.slice(0,4);if(out)out.innerHTML=S.log.map(l=>`<div>› ${l}</div>`).join('')};
  btns.forEach(b=>b.addEventListener('click',()=>act(b.dataset.act)));
  function act(a){if(kind==='ota'){if(a==='push'&&S.state!=='updating'){S.state='updating';S.prog=0;say('pushing signed update v4.12')}if(a==='rollback'&&S.ver==='4.12'){S.ver='4.11';S.state='idle';say('rolled back to v4.11 in 2 s')}}
    if(kind==='zero-trust'){if(a==='good'){S.ok++;say('operator · move arm · signed ✓ allowed')}if(a==='bad'){S.blocked++;say('unknown device · open valve · blocked ✕');S.flash=20}}
    if(kind==='live-twin'&&a==='ping'){S.ping=30;say('twin refreshed · 18 ms')}}
  if(kind==='remote'){addEventListener('keydown',e=>{if(!demo.matches(':hover')&&document.activeElement!==cv)return;const k={ArrowLeft:'l',ArrowRight:'r',ArrowUp:'u',ArrowDown:'d'}[e.key];if(k){e.preventDefault();S.keys[k]=true}});addEventListener('keyup',e=>{const k={ArrowLeft:'l',ArrowRight:'r',ArrowUp:'u',ArrowDown:'d'}[e.key];if(k)S.keys[k]=false});
    cv.addEventListener('pointerdown',e=>{const r=cv.getBoundingClientRect();S.tx=(e.clientX-r.left)/r.width*W;S.ty=(e.clientY-r.top)/r.height*H});cv.addEventListener('pointermove',e=>{if(e.buttons){const r=cv.getBoundingClientRect();S.tx=(e.clientX-r.left)/r.width*W;S.ty=(e.clientY-r.top)/r.height*H}});cv.tabIndex=0;say('you have control · drag or use arrow keys')}
  const range=demo.querySelector('input[type=range]');if(range)range.addEventListener('input',()=>{S.wear=+range.value});
  if(kind==='ota')say('tractor_412 on v4.11');if(kind==='zero-trust')say('policy: only signed operators');if(kind==='live-twin')say('crane_07 mirrored live');if(kind==='edge-ai')say('model running on the machine');
  function loop(){S.t++;bg();
    if(kind==='live-twin'){const sway=Math.sin(S.t/40)*20;c.fillStyle='#111';c.fillRect(60,40,12,140);c.fillRect(40,34,200,10);c.fillRect(190+sway,44,2,60);c.fillStyle='#B9A6F2';c.fillRect(176+sway,104,30,18);c.fillStyle='#111';c.fillRect(176+sway,104,30,2);
      const load=(18+Math.sin(S.t/30)*.6).toFixed(1),wind=(6+Math.sin(S.t/55)*1.2).toFixed(1);c.font='9px Silkscreen';c.fillStyle='#111';[['LOAD '+load+'T',230,70],['WIND '+wind+' M/S',230,86],['LINK '+(16+(S.t>>4)%5)+' MS',230,102]].forEach(([t,x,y])=>{c.fillStyle='#DBF5F0';c.fillRect(x-4,y-9,86,13);c.fillStyle='#111';c.fillText(t,x,y)});
      if(S.ping>0){S.ping--;c.strokeStyle='#8FD9C9';c.lineWidth=2;c.strokeRect(150-(30-S.ping)*3,60-(30-S.ping)*2,(30-S.ping)*6+40,(30-S.ping)*4+60)}}
    if(kind==='ota'){spr(TR,110,96,6);if(S.state==='updating'){S.prog=Math.min(1,S.prog+.008);c.fillStyle='#111';c.fillRect(100,70,120,10);c.fillStyle='#8FD9C9';c.fillRect(102,72,116*S.prog,6);if(S.prog>=1){S.state='idle';S.ver='4.12';say('v4.12 verified and running ✓')}}
      c.font='10px Silkscreen';c.fillStyle='#111';c.fillText('FIRMWARE V'+S.ver,104,60)}
    if(kind==='remote'){const sp=2;if(S.keys.l)S.x-=sp;if(S.keys.r)S.x+=sp;if(S.keys.u)S.y-=sp;if(S.keys.d)S.y+=sp;if(S.tx!=null){S.x+=(S.tx-S.x-48)*.06;S.y+=(S.ty-S.y-27)*.06}S.x=clamp(S.x,0,W-96);S.y=clamp(S.y,20,H-56);
      c.fillStyle='#E9FAC0';for(let i=0;i<W;i+=24)c.fillRect(i,0,12,H);spr(TR,S.x,S.y,6);c.font='9px Silkscreen';c.fillStyle='#111';c.fillText('DELAY '+(16+(S.t>>5)%4)+' MS',8,14)}
    if(kind==='edge-ai'){const v=S.wear;for(let i=0;i<W;i+=2){const y=110+Math.sin(i*.12+S.t*.2)*v*.35+Math.sin(i*.31+S.t*.13)*v*.15;c.fillStyle=v>70?'#F2A7E6':'#111';c.fillRect(i,y,2,2)}
      const hours=Math.max(4,Math.round(600-v*6));c.font='11px Silkscreen';c.fillStyle='#111';c.fillText('VIBRATION '+v+'%',10,24);c.fillStyle=v>70?'#F2A7E6':'#DBF5F0';c.fillRect(10,160,220,24);c.fillStyle='#111';c.fillText(v>70?'SERVICE NOW · '+hours+' H LEFT':'HEALTHY · SERVICE IN '+hours+' H',16,176)}
    if(kind==='zero-trust'){c.fillStyle='#FFE3FB';c.fillRect(150,30,8,150);c.fillStyle='#111';c.fillRect(150,30,1,150);spr(TR,190,96,5);c.font='9px Silkscreen';c.fillStyle='#111';c.fillText('ALLOWED '+S.ok,10,20);c.fillText('BLOCKED '+S.blocked,10,34);
      if(S.flash>0){S.flash--;c.fillStyle='#F2A7E6';c.fillRect(120,90,24,16);c.fillStyle='#111';c.fillText('✕',128,102)}}
    requestAnimationFrame(loop)}
  loop()}

/* ===== scenes: the same interaction language as the home page ===== */
const fontReady=()=>document.fonts.load('600 120px "Pixelify Sans"').catch(()=>{});
const seedf=i=>Math.abs(Math.sin(i*12.9898)*43758.5)%1;
const MB=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
const KID=["..####..",".#yyyy#.",".#y#y##.",".#yyyy#.","..####..",".#pppp#.","#.#pp#.#","..#..#.."],KID2=["..####..",".#yyyy#.",".#y#y##.",".#yyyy#.","..####..",".#pppp#.","#.#pp#.#",".#....#."];
const KC={'#':'#111','y':'#E6DEFF','p':'#F2A7E6','m':'#DBF5F0','l':'#ABABF5'};
function sprite(c,rows,x,y,s,flip,pal=KC){rows.forEach((r,j)=>[...r].forEach((ch,i)=>{const col=pal[ch];if(!col)return;c.fillStyle=col;c.fillRect(Math.round(x+(flip?7-i:i)*s),Math.round(y+j*s),Math.ceil(s),Math.ceil(s))}))}

/* 1 · dot words: the page name drawn in dots you can push; it scatters as you scroll away */
function textDots(text,W,H,fill){const cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');let fs=H*.72;x.font=`600 ${fs}px "Pixelify Sans", monospace`;const tw=x.measureText(text).width;if(tw>W*fill)fs*=W*fill/tw;
  x.font=`600 ${fs}px "Pixelify Sans", monospace`;x.textAlign='center';x.textBaseline='middle';x.fillStyle='#000';x.fillText(text,W/2,H*.54);const step=Math.max(4,Math.round(fs/19));const d=x.getImageData(0,0,W,H).data,o=[];
  for(let y=Math.floor(step/2);y<H;y+=step)for(let xx=Math.floor(step/2);xx<W;xx+=step)if(d[(y*W+xx)*4+3]>110)o.push({hx:xx,hy:y});return {dots:o,step}}
$$('canvas.dw').forEach(async cv=>{await fontReady();const c=cv.getContext('2d');let W=0,H=0,D=[],step=6,mx=-999,my=-999,vis=true,scat=0,hov=0,hs=0;
  function build(){const r=cv.getBoundingClientRect();W=Math.round(r.width);H=Math.round(r.height);if(!W||!H){setTimeout(build,250);return}cv.width=W*DPR;cv.height=H*DPR;const t=textDots(cv.dataset.word,W,H,+cv.dataset.fill||.9);step=t.step;
    D=t.dots.map((p,i)=>({...p,x:p.hx+(seedf(i)-.5)*W,y:p.hy+(seedf(i*3)-.5)*H*1.6,vx:0,vy:0,a:seedf(i*5)*6.283,s:.35+seedf(i*7)}))}
  build();addEventListener('resize',()=>{clearTimeout(cv._r);cv._r=setTimeout(build,250)});
  new IntersectionObserver(e=>{vis=e[0].isIntersecting},{threshold:0}).observe(cv);
  cv.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});cv.addEventListener('pointerleave',()=>{mx=my=-999});
  const link=cv.closest('a');if(link){link.addEventListener('pointerenter',()=>hov=1);link.addEventListener('pointerleave',()=>hov=0)}
  else{cv.addEventListener('click',()=>D.forEach(d=>{d.vx+=(Math.random()-.5)*42;d.vy+=(Math.random()-.5)*42}));cv.dataset.c='push'}
  if('scroll' in cv.dataset)ScrollTrigger.create({trigger:cv.closest('section'),start:'top top',end:'bottom top',onUpdate:s=>scat=s.progress});
  (function f(){hs+=(hov-hs)*.12;if(vis&&W){c.setTransform(DPR,0,0,DPR,0,0);c.clearRect(0,0,W,H);c.fillStyle='#111';const r=step*.42;
    for(const d of D){const sp=scat*H*.9+hs*step*2.2;const ox=Math.cos(d.a)*sp*d.s,oy=Math.sin(d.a)*hs*step*2.2*d.s-scat*H*1.1*d.s;
      const dx=d.x-mx,dy=d.y-my,dd=dx*dx+dy*dy;if(dd<6400){const l=Math.sqrt(dd)+1,k=(1-l/80)*2.6;d.vx+=dx/l*k;d.vy+=dy/l*k}
      d.vx+=(d.hx+ox-d.x)*.07;d.vy+=(d.hy+oy-d.y)*.07;d.vx*=.82;d.vy*=.82;d.x+=d.vx;d.y+=d.vy;c.beginPath();c.arc(d.x,d.y,r,0,7);c.fill()}}requestAnimationFrame(f)})()});

/* 2 · morph story: a pinned scene, one halftone shape per step, morphing in a dither pattern (like the home machines scene) */
$$('.ms').forEach(sec=>{const steps=JSON.parse(sec.dataset.steps);const pin=sec.querySelector('.ms-pin'),cv=sec.querySelector('canvas'),c=cv.getContext('2d'),tEl=sec.querySelector('.ms-text');const N=1300;
  const toN=d=>{d=d.slice().sort((a,b)=>(a.y*3+a.x)-(b.y*3+b.x));const o=[];if(d.length>=N){for(let i=0;i<N;i++)o.push(d[Math.floor(i*d.length/N)])}else{const ex=N-d.length;let e=0;d.forEach((q,i)=>{o.push(q);const w=Math.floor((i+1)*ex/d.length);while(e<w){o.push({x:q.x,y:q.y,r:0});e++}})}return o};
  const SETS=steps.map(s=>toN(sample(s.shape,5)));const MD=SETS[0].map(()=>({ox:0,oy:0,vx:0,vy:0}));
  let W=0,H=0,prog=0,ps=0,vis=false,mx=-999,my=-999,cur=-1;
  function size(){const r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*DPR;cv.height=H*DPR}size();addEventListener('resize',size);
  cv.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});cv.addEventListener('pointerleave',()=>{mx=my=-999});
  cv.addEventListener('click',()=>MD.forEach(d=>{d.vx+=(Math.random()-.5)*36;d.vy+=(Math.random()-.5)*36}));cv.dataset.c='push';
  const pad=n=>String(n).padStart(2,'0');
  function show(i){if(i===cur)return;cur=i;const s=steps[i];sec.style.setProperty('--msc',s.color||'#fff');
    tEl.innerHTML=`<div class="ms-top mono"><span>${pad(i+1)} / ${pad(steps.length)}</span>${s.kicker?`<span>${s.kicker}</span>`:''}</div><h2 class="dt">${s.title}</h2><p>${s.text}</p>${s.stat?`<div class="ms-stat dt">${s.stat}</div><div class="mono ms-sl">${s.statLabel||''}</div>`:''}${s.href?`<a class="more" href="${s.href}">${s.cta||'Open'} <i>→</i></a>`:''}<div class="ms-dots">${steps.map((_,j)=>`<i class="${j<=i?'on':''}"></i>`).join('')}</div>`;
    gsap.fromTo(tEl.children,{opacity:0,y:14},{opacity:1,y:0,stagger:.05,duration:.45,ease:'power2.out'});
    const st=tEl.querySelector('.ms-stat');if(st){const m=String(s.stat).match(/^([^\d]*)(\d+)(.*)$/);if(m){const o={v:0};gsap.to(o,{v:+m[2],duration:1.1,ease:'power2.out',onUpdate:()=>st.textContent=m[1]+Math.round(o.v)+m[3]})}}}
  show(0);
  ScrollTrigger.create({trigger:sec,start:'top top',end:()=>'+='+Math.round((steps.length*85+45)*innerHeight/100),pin:pin,onUpdate:s=>prog=clamp((s.progress-.06)/.8,0,1)});
  new IntersectionObserver(e=>{vis=e[0].isIntersecting},{threshold:0}).observe(sec);
  (function f(){ps+=(prog-ps)*.12;if(vis&&W){const n=SETS.length-1,seg=ps*n,i=Math.max(0,Math.min(n-1,Math.floor(seg))),t=n?ease(clamp(seg-i,0,1)):0;show(Math.round(seg));
    c.setTransform(DPR,0,0,DPR,0,0);c.clearRect(0,0,W,H);const S=Math.min(W,H)*.86,ox=(W-S)/2,oy=(H-S)/2,cell=5*S/200;const A=SETS[i],B=SETS[i+1]||A;
    for(let k=0;k<N;k++){const a=A[k],b=B[k],d=MD[k];const bv=MB[(Math.floor(a.y*48)%4)*4+Math.floor(a.x*48)%4]/16;const tk=ease(clamp((t-bv*.6)/.34,0,1));const r=lerp(a.r,b.r,tk);if(r<.04)continue;
      const lift=Math.sin(tk*Math.PI);const x=ox+lerp(a.x,b.x,tk)*S,y=oy+lerp(a.y,b.y,tk)*S-lift*S*.012;
      const dx=x+d.ox-mx,dy=y+d.oy-my,dd=dx*dx+dy*dy;if(dd<6400){const l=Math.sqrt(dd)+1,q=(1-l/80)*2.2;d.vx+=dx/l*q;d.vy+=dy/l*q}d.vx-=d.ox*.08;d.vy-=d.oy*.08;d.vx*=.82;d.vy*=.82;d.ox+=d.vx;d.oy+=d.vy;
      const tc=tint(a.x,a.y),rr=Math.min(r,.85)*cell*.48*(1-lift*.5);c.fillStyle=tc||'#111';if(lift>.2)c.fillRect(x+d.ox-rr,y+d.oy-rr,rr*2,rr*2);else{c.beginPath();c.arc(x+d.ox,y+d.oy,tc?rr*1.25:rr,0,7);c.fill()}}}requestAnimationFrame(f)})()});

/* 3 · horizontal gallery: cards slide sideways while you scroll down */
$$('.hg').forEach(sec=>{const track=sec.querySelector('.hg-track'),bar=sec.querySelector('.hg-bar i');const dist=()=>Math.max(0,track.scrollWidth-innerWidth+48);
  gsap.to(track,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:sec,start:'top top',end:()=>'+='+Math.round(dist()+innerHeight*.5),pin:true,scrub:.6,invalidateOnRefresh:true,onUpdate:s=>{if(bar)bar.style.width=(s.progress*100)+'%'}}});
  [...track.children].forEach((card,i)=>gsap.fromTo(card,{rotation:i%2?3:-3,y:30},{rotation:0,y:0,ease:'none',scrollTrigger:{trigger:sec,start:'top 80%',end:'top top',scrub:true}}))});

/* 4 · level path: a pixel kid walks 2023 → 2029; each year shows the projects running */
$$('.level').forEach(sec=>{const P=JSON.parse(sec.dataset.projects);const cv=sec.querySelector('canvas'),c=cv.getContext('2d'),yearEl=sec.querySelector('.lv-year'),list=sec.querySelector('.lv-list');let W=0,H=0,prog=0,ps=0,vis=false,lastY=null;
  const Y0=2023,Y1=2029.95;function size(){const r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*DPR;cv.height=H*DPR}size();addEventListener('resize',size);
  ScrollTrigger.create({trigger:sec,start:'top top',end:()=>'+='+Math.round(innerHeight*3.2),pin:sec.querySelector('.lv-pin'),onUpdate:s=>prog=clamp((s.progress-.05)/.85,0,1)});
  new IntersectionObserver(e=>{vis=e[0].isIntersecting}).observe(sec);
  (function f(t){ps+=(prog-ps)*.1;if(vis&&W){c.setTransform(DPR,0,0,DPR,0,0);c.clearRect(0,0,W,H);const padx=Math.min(60,W*.06),gy=Math.round(H*.62),X=y=>padx+(y-Y0)/(Y1-Y0)*(W-padx*2),bs=12;
      for(let i=0;i<5;i++){const cx=((i*W/4.2-t*.012*(i+1))%(W+120)+W+120)%(W+120)-80;c.fillStyle='#fff';c.fillRect(cx,30+i%3*26,60,12);c.fillRect(cx+12,22+i%3*26,32,8)}
      for(let x=0;x<W;x+=bs){c.fillStyle=(x/bs)%2?'#C5E86C':'#B4DC55';c.fillRect(x,gy,bs,bs);c.fillStyle='#9CCB45';c.fillRect(x,gy+bs,bs,H-gy-bs)}
      c.font='12px Silkscreen';c.textAlign='center';c.textBaseline='top';for(let y=2023;y<=2029;y++){c.fillStyle='#111';c.fillRect(X(y)-1,gy-6,2,6);c.fillText(y,X(y),gy+bs+10)}
      P.forEach((p,j)=>{const same=P.filter((q,k)=>k<j&&q.start===p.start).length;const fx=X(p.start)+same*30,h=46+same*20;c.fillStyle='#111';c.fillRect(fx,gy-h,3,h);c.fillStyle=p.color;c.fillRect(fx+3,gy-h,26,16);c.fillStyle='#111';c.fillRect(fx+3,gy-h,26,2);c.fillRect(fx+3,gy-h+14,26,2);c.fillRect(fx+27,gy-h,2,16)});
      const year=Y0+ps*(Y1-Y0),kx=X(year),walking=Math.abs(prog-ps)>.0008,s=Math.max(4,Math.min(6,W/180));sprite(c,walking&&Math.floor(t/140)%2?KID2:KID,kx-4*s,gy-8*s-(walking&&Math.floor(t/140)%2?2:0),s,false);
      const yi=Math.floor(year);if(yi!==lastY){lastY=yi;yearEl.textContent=yi;const act=P.filter(p=>p.start<=yi&&p.end>=yi);
        list.innerHTML=act.length?act.map(p=>`<a href="/research/${p.slug}" style="--c:${p.color}"><b>${p.name}</b><span class="mono">${p.start}–${p.end}</span></a>`).join(''):'<span class="mono">Warming up…</span>';gsap.fromTo(list.children,{y:12,opacity:0},{y:0,opacity:1,stagger:.06,duration:.3})}}
    requestAnimationFrame(f)})(0)});

/* 5 · year track on a project page: the kid walks across the project's years as you scroll past */
$$('canvas.ytrack').forEach(cv=>{const a=+cv.dataset.start,b=+cv.dataset.end,col=cv.dataset.color,c=cv.getContext('2d');let W=0,H=0,p=0,ps=0,vis=false;
  function size(){const r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*DPR;cv.height=H*DPR}size();addEventListener('resize',size);
  ScrollTrigger.create({trigger:cv,start:'top 85%',end:'bottom 25%',onUpdate:s=>p=s.progress});new IntersectionObserver(e=>{vis=e[0].isIntersecting}).observe(cv);
  (function f(t){ps+=(p-ps)*.1;if(vis&&W){c.setTransform(DPR,0,0,DPR,0,0);c.clearRect(0,0,W,H);const padx=30,gy=Math.round(H*.6),X=y=>padx+(y-2023)/7*(W-padx*2),bs=10;
      for(let x=0;x<W;x+=bs){c.fillStyle=(x/bs)%2?'#E6E6E0':'#DCDCD5';c.fillRect(x,gy,bs,bs)}c.fillStyle=col;c.fillRect(X(a),gy,X(b+1)-X(a),bs);c.fillStyle='#111';c.fillRect(X(a),gy,X(b+1)-X(a),2);
      c.font='11px Silkscreen';c.textAlign='center';c.textBaseline='top';for(let y=2023;y<=2030;y++){c.fillStyle=y>=a&&y<=b?'#111':'#999';c.fillText(y,X(y),gy+bs+8)}
      const kx=X(a)+ps*(X(b+1)-X(a)),s=5,step=Math.floor(t/150)%2;sprite(c,step?KID2:KID,kx-4*s,gy-8*s,s,false)}requestAnimationFrame(f)})(0)});

/* 6 · chat contact: the pixel bot asks one question at a time, then opens the visitor's email app */
const tm=$('#term');if(tm){const log=tm.querySelector('.tm-log'),inp=tm.querySelector('input'),form=tm.querySelector('form'),chips=tm.querySelector('.tm-chips'),bc=tm.querySelector('.tm-bot'),bx=bc.getContext('2d');const A={};let mode='idle',modeT=0,i=0,touched=false;
  const Q=[{k:'name',q:()=>'Hi, I’m the SmartAvatar bot. What’s your name?'},{k:'email',q:()=>`Nice to meet you, ${A.name}. Which email should we reply to?`,check:v=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),err:'That email doesn’t look quite right. Try again?'},
    {k:'company',q:()=>'Which company or team are you with?',chips:['Skip']},{k:'machine',q:()=>'What kind of machines are we talking about?',chips:['Robots','Vehicles','Heavy equipment','Medical devices','Farm machines','Something else']},{k:'msg',q:()=>'Last one. What would you like your machines to do?'}];
  const bot=m=>{mode=m;modeT=performance.now()};
  const say=(t,who)=>{const d=document.createElement('div');d.className='tm-msg '+(who||'bot');d.textContent=t;log.appendChild(d);gsap.fromTo(d,{y:10,opacity:0},{y:0,opacity:1,duration:.3});log.scrollTop=log.scrollHeight;if(!who)bot('talk')};
  function ask(){const s=Q[i];bot('think');setTimeout(()=>{say(s.q());chips.innerHTML=(s.chips||[]).map(x=>`<button type="button" class="chip">${x}</button>`).join('');chips.querySelectorAll('button').forEach(b=>b.onclick=()=>answer(b.textContent));if(touched)inp.focus({preventScroll:true})},450)}
  function answer(v){v=v.trim();if(!v)return;touched=true;const s=Q[i];say(v,'me');inp.value='';if(s.check&&!s.check(v)){setTimeout(()=>{say(s.err);bot('no')},300);return}A[s.k]=s.k==='company'&&/^skip$/i.test(v)?'':v;i++;if(i<Q.length)ask();else done()}
  function done(){chips.innerHTML='';inp.disabled=true;setTimeout(()=>{say(`Thanks, ${A.name}. Press send and your email app opens with everything filled in.`);bot('cheer');
    const body=`Name: ${A.name}\nEmail: ${A.email}\nCompany: ${A.company||'-'}\nMachines: ${A.machine}\n\n${A.msg}`;
    chips.innerHTML=`<a class="more" href="mailto:info@smartavatar.nl?subject=${encodeURIComponent('Hello from '+(A.company||A.name))}&body=${encodeURIComponent(body)}">Send it <i>→</i></a><button type="button" class="more ghost" id="tm-again">Start over</button>`;
    $('#tm-again').onclick=()=>{log.innerHTML='';i=0;inp.disabled=false;for(const k in A)delete A[k];ask()}},450)}
  form.addEventListener('submit',e=>{e.preventDefault();answer(inp.value)});inp.addEventListener('input',()=>bot('listen'));ask();
  const HEAD=["...######...","..#yyyyyy#..",".#yyyyyyyy#.",".#y##yy##y#.",".#y##yy##y#.",".#yyyyyyyy#.",".#yy####yy#.","..#yyyyyy#..","...######...","..#pppppp#..",".#pppppppp#."],
        BLINK=["...######...","..#yyyyyy#..",".#yyyyyyyy#.",".#yyyyyyyy#.",".#y##yy##y#.",".#yyyyyyyy#.",".#yy####yy#.","..#yyyyyy#..","...######...","..#pppppp#..",".#pppppppp#."],
        TALK=["...######...","..#yyyyyy#..",".#yyyyyyyy#.",".#y##yy##y#.",".#y##yy##y#.",".#yyyyyyyy#.",".#yyy##yyy#.","..#yy##yy#..","...######...","..#pppppp#..",".#pppppppp#."];
  (function f(t){bx.clearRect(0,0,bc.width,bc.height);const age=t-modeT;if(age>1400&&mode!=='idle')mode='idle';let rows=Math.floor(t/2600)%14===0?BLINK:HEAD,dy=0,dx=0;
    if(mode==='talk')rows=Math.floor(t/120)%2?TALK:HEAD;if(mode==='cheer')dy=-Math.abs(Math.sin(t/120))*6;if(mode==='no')dx=Math.sin(t/40)*3;if(mode==='think')dy=Math.sin(t/200)*2;if(mode==='listen')dy=-1;
    sprite(bx,rows,6+dx,8+dy,5,false,{'#':'#111','y':'#E6DEFF','p':'#F2A7E6'});if(mode==='think'){bx.fillStyle='#111';for(let k=0;k<3;k++)if(Math.floor(t/250)%3>=k)bx.fillRect(28+k*8,2,4,4)}requestAnimationFrame(f)})(0)}

/* 7 · office skies: a small pixel sky that is day or night where the office really is */
$$('canvas.osky').forEach(cv=>{const tz=cv.dataset.tz,c=cv.getContext('2d'),W=cv.width,H=cv.height;
  function draw(t){const h=+new Intl.DateTimeFormat('en-GB',{hour:'numeric',hourCycle:'h23',timeZone:tz}).format(new Date());const night=h<6||h>=20,dusk=(h>=6&&h<8)||(h>=18&&h<20);
    c.fillStyle=night?'#2B2B31':dusk?'#FFE3FB':'#DCEBFA';c.fillRect(0,0,W,H);
    if(night){for(let i=0;i<14;i++){if((Math.floor(t/600)+i)%5){c.fillStyle='#fff';c.fillRect((i*37)%W,(i*23)%(H-30),2,2)}}c.fillStyle='#E6DEFF';c.fillRect(W-40,12,14,14);c.fillStyle='#2B2B31';c.fillRect(W-34,10,12,12)}
    else{c.fillStyle='#B9A6F2';c.fillRect(W-42,dusk?H-38:12,16,16);c.fillStyle='#fff';const cx=((t/60)%(W+60))-40;c.fillRect(cx,18,30,8);c.fillRect(cx+6,14,16,4)}
    c.fillStyle=night?'#4a4a52':'#B4DC55';for(let x=0;x<W;x+=4){const hh=10+Math.round(Math.sin(x*.07)*4);c.fillRect(x,H-hh,4,hh)}
    c.fillStyle=night?'#E6DEFF':'#111';c.fillRect(20,H-26,16,16);c.fillStyle=night?'#2B2B31':'#fff';c.fillRect(24,H-22,3,3);c.fillRect(29,H-22,3,3);requestAnimationFrame(draw)}requestAnimationFrame(draw)});

/* 8 · card deck: click to send the top card to the back */
$$('.deck').forEach(dk=>{const cards=[...dk.children];const lay=()=>cards.forEach((c,i)=>gsap.to(c,{x:i*10,y:i*10,rotation:i*1.5,zIndex:cards.length-i,scale:1-i*.03,duration:.5,ease:'power3.out'}));lay();
  const next=()=>{const top=cards.shift();gsap.to(top,{x:140,rotation:14,opacity:0,duration:.28,ease:'power2.in',onComplete:()=>{cards.push(top);gsap.set(top,{opacity:1});lay()}})};
  dk.addEventListener('click',next);dk.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();next()}});dk.dataset.c='next card'});

/* 9 · legal pages: a pixel reading bar */
const rb=$('.rbar i');if(rb)ScrollTrigger.create({start:0,end:'max',onUpdate:s=>rb.style.width=Math.round(s.progress*40)/40*100+'%'});

/* ================= FOOTER: dot playground ================= */
const fc=$('#fc'),fx=fc.getContext('2d');let FD=[],fW=0,fH=0,fVis=false,fm={x:-999,y:-999,down:false};
function fBuild(){const r=fc.getBoundingClientRect();fW=Math.round(r.width);fH=Math.round(r.height);if(!fW||!fH){setTimeout(fBuild,300);return}fc.width=fW*DPR;fc.height=fH*DPR;
  const t=document.createElement('canvas');t.width=fW;t.height=fH;const c=t.getContext('2d');c.fillStyle='#000';c.textAlign='center';c.textBaseline='middle';
  const fs=Math.min(fW<600?fW/3.6:fW/4.6,fH*.36);c.font=`900 ${fs}px Satoshi, sans-serif`;c.fillText('SAY HI',fW/2,fH*.44);
  const d=c.getImageData(0,0,fW,fH).data,step=fW<600?7:10;FD=[];
  for(let y=0;y<fH;y+=step)for(let x=0;x<fW;x+=step){const on=d[(y*fW+x)*4+3]>128;if(on)FD.push({hx:x,hy:y,x:x+(Math.random()-.5)*fW,y:y+(Math.random()-.5)*fH,vx:0,vy:0,r:step*.36,c:Math.random()<.12?['#E6DEFF','#DCEBFA','#DBF5F0','#FFE3FB','#E3E3FF'][Math.random()*5|0]:'#111'})}}
function fDraw(){fx.setTransform(DPR,0,0,DPR,0,0);fx.clearRect(0,0,fW,fH);
  for(const p of FD){const dx=p.x-fm.x,dy=p.y-fm.y,dd=dx*dx+dy*dy;if(dd<14400){const d=Math.sqrt(dd)+1,f=(1-d/120)*3;p.vx+=dx/d*f;p.vy+=dy/d*f}
    p.vx+=(p.hx-p.x)*.03;p.vy+=(p.hy-p.y)*.03;p.vx*=.86;p.vy*=.86;p.x+=p.vx;p.y+=p.vy;fx.fillStyle=p.c;fx.beginPath();fx.arc(p.x,p.y,p.r*(p.c==='#111'?1:1.5),0,7);fx.fill()}}
function fLoop(){if(fVis)fDraw();requestAnimationFrame(fLoop)}
document.fonts.ready.then(()=>{fBuild();fLoop()});addEventListener('resize',()=>fBuild());
new IntersectionObserver(e=>{fVis=e[0].isIntersecting},{threshold:0}).observe(fc);
$('#foot').addEventListener('pointermove',e=>{const r=fc.getBoundingClientRect();fm.x=e.clientX-r.left;fm.y=e.clientY-r.top});
$('#foot').addEventListener('pointerleave',()=>{fm.x=fm.y=-999});
fc.addEventListener('click',e=>{const r=fc.getBoundingClientRect(),cx=e.clientX-r.left,cy=e.clientY-r.top;FD.forEach(p=>{const dx=p.x-cx,dy=p.y-cy,d=Math.sqrt(dx*dx+dy*dy)+1;p.vx+=dx/d*(30+Math.random()*30);p.vy+=dy/d*(30+Math.random()*30)})});
ScrollTrigger.create({trigger:'#foot',start:'top 70%',onEnter:scatterIn,onEnterBack:scatterIn});
function scatterIn(){FD.forEach(p=>{p.x=p.hx+(Math.random()-.5)*fW*1.2;p.y=p.hy+(Math.random()-.5)*fH*1.2})}
(function(){const IC={li:["..........",".##.......",".##.......","..........",".##.##.##.",".##.######",".##.##..##",".##.##..##",".##.##..##",".........."],
  yt:["..........","...#......","...##.....","...###....","...####...","...####...","...###....","...##.....","...#......",".........."],
  ig:["..........",".########.",".#......#.",".#..##.##.",".#.#..#.#.",".#.#..#.#.",".#..##..#.",".#......#.",".########.",".........."],
  x:["..........",".##....##.","..##..##..","...####...","....##....","....##....","...####...","..##..##..",".##....##.",".........."]};
  $$('#foot .soc canvas').forEach(c=>{const g=c.getContext('2d');g.fillStyle='#fff';IC[c.dataset.ico].forEach((r,y)=>[...r].forEach((ch,x)=>{if(ch==='#'){g.beginPath();g.arc(x*2+1,y*2+1,1.05,0,7);g.fill()}}))})})();
$('#copy').addEventListener('click',()=>{try{navigator.clipboard.writeText('info@smartavatar.nl')}catch(e){}$('#copy').textContent='Copied ✓';setTimeout(()=>$('#copy').textContent='Copy',1600)});


/* pixel icons for the cartridges: cells on a 12×12 grid, outlined in ink */
(function(){const rect=(x0,y0,x1,y1)=>{const o=[];for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)o.push([x,y]);return o};
  const I={race:[[rect(1,5,10,7),'C'],[rect(3,3,8,4),'C'],[rect(4,3,7,4),'#fff'],[[[1,6]],'#F2A7E6'],[[[10,6]],'#fff'],[rect(2,8,3,9).concat(rect(8,8,9,9)),'#111']],
    snake:[[[[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[7,3],[7,4],[6,4],[5,4],[4,4],[3,4],[2,4],[2,5],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[8,7],[8,8]],'C'],[[[8,9],[8,10]],'C'],[[[9,10]],'#fff'],[[[10,3],[10,4]],'#F2A7E6']],
    blocks:[[[[2,9],[3,9],[4,9],[3,8]],'C'],[[[6,7],[6,8],[6,9],[7,9]],'#F2A7E6'],[[[8,8],[9,8],[8,9],[9,9]],'#9CC3EE'],[[[4,2],[4,3],[4,4],[4,5]],'C']],
    shooter:[[[[5,7],[6,7]].concat(rect(4,8,7,8),rect(3,9,8,9),[[3,10],[8,10]]),'C'],[[[5,9],[6,9]],'#fff'],[[[5,4],[5,5]],'#fff'],[rect(2,1,3,2).concat(rect(8,1,9,2)),'#F2A7E6']]};
  window.pixIcon=(g,id,ox,oy,s,col)=>{const L=I[id];if(!L)return;g.fillStyle='#111';L.forEach(([cells,c])=>cells.forEach(([x,y])=>g.fillRect(ox+(x-1)*s,oy+(y-1)*s,s*3,s*3)));
    L.forEach(([cells,c])=>{g.fillStyle=c==='C'?col:c;cells.forEach(([x,y])=>g.fillRect(ox+x*s,oy+y*s,s,s))})}})();

addEventListener("load",()=>ScrollTrigger.refresh());
})();
