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
