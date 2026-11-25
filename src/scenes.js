/* ===== scenes: the same interaction language as the home page ===== */
const fontReady=()=>document.fonts.load('600 120px "Pixelify Sans"').catch(()=>{});
const seedf=i=>Math.abs(Math.sin(i*12.9898)*43758.5)%1;
const MB=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
const KID=["..####..",".#yyyy#.",".#y#y##.",".#yyyy#.","..####..",".#pppp#.","#.#pp#.#","..#..#.."],KID2=["..####..",".#yyyy#.",".#y#y##.",".#yyyy#.","..####..",".#pppp#.","#.#pp#.#",".#....#."];
const KC={'#':'#111','y':'#FFE7A9','p':'#F2A7E6','m':'#DBF5F0','l':'#ABABF5'};
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
    sprite(bx,rows,6+dx,8+dy,5,false,{'#':'#111','y':'#FFE7A9','p':'#F2A7E6'});if(mode==='think'){bx.fillStyle='#111';for(let k=0;k<3;k++)if(Math.floor(t/250)%3>=k)bx.fillRect(28+k*8,2,4,4)}requestAnimationFrame(f)})(0)}

/* 7 · office skies: a small pixel sky that is day or night where the office really is */
$$('canvas.osky').forEach(cv=>{const tz=cv.dataset.tz,c=cv.getContext('2d'),W=cv.width,H=cv.height;
  function draw(t){const h=+new Intl.DateTimeFormat('en-GB',{hour:'numeric',hourCycle:'h23',timeZone:tz}).format(new Date());const night=h<6||h>=20,dusk=(h>=6&&h<8)||(h>=18&&h<20);
    c.fillStyle=night?'#2B2B31':dusk?'#FFE3FB':'#DCEBFA';c.fillRect(0,0,W,H);
    if(night){for(let i=0;i<14;i++){if((Math.floor(t/600)+i)%5){c.fillStyle='#fff';c.fillRect((i*37)%W,(i*23)%(H-30),2,2)}}c.fillStyle='#FFE7A9';c.fillRect(W-40,12,14,14);c.fillStyle='#2B2B31';c.fillRect(W-34,10,12,12)}
    else{c.fillStyle='#F5C95C';c.fillRect(W-42,dusk?H-38:12,16,16);c.fillStyle='#fff';const cx=((t/60)%(W+60))-40;c.fillRect(cx,18,30,8);c.fillRect(cx+6,14,16,4)}
    c.fillStyle=night?'#4a4a52':'#B4DC55';for(let x=0;x<W;x+=4){const hh=10+Math.round(Math.sin(x*.07)*4);c.fillRect(x,H-hh,4,hh)}
    c.fillStyle=night?'#FFE7A9':'#111';c.fillRect(20,H-26,16,16);c.fillStyle=night?'#2B2B31':'#fff';c.fillRect(24,H-22,3,3);c.fillRect(29,H-22,3,3);requestAnimationFrame(draw)}requestAnimationFrame(draw)});

/* 8 · card deck: click to send the top card to the back */
$$('.deck').forEach(dk=>{const cards=[...dk.children];const lay=()=>cards.forEach((c,i)=>gsap.to(c,{x:i*10,y:i*10,rotation:i*1.5,zIndex:cards.length-i,scale:1-i*.03,duration:.5,ease:'power3.out'}));lay();
  const next=()=>{const top=cards.shift();gsap.to(top,{x:140,rotation:14,opacity:0,duration:.28,ease:'power2.in',onComplete:()=>{cards.push(top);gsap.set(top,{opacity:1});lay()}})};
  dk.addEventListener('click',next);dk.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();next()}});dk.dataset.c='next card'});

/* 9 · legal pages: a pixel reading bar */
const rb=$('.rbar i');if(rb)ScrollTrigger.create({start:0,end:'max',onUpdate:s=>rb.style.width=Math.round(s.progress*40)/40*100+'%'});
