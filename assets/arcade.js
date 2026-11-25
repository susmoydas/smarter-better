(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
/* ===== AVATAR RUN (original retro racer) ===== */
const cv=$('#screen'), x=cv.getContext('2d'); x.imageSmoothingEnabled=false;
const W=240,H=200,HOR=76,ROADB=H-44, gb=$('#gb');
let best=0; try{best=+localStorage.getItem('sa-run-best')||0}catch(e){} $('#best').textContent=best;
const G={state:'title',t:0,pos:0,speed:0,px:0,time:45,score:0,curve:0,curveT:0,target:0,cars:[],orbs:[],flash:0,msg:'',paused:false,crash:0,next:3000};
const keys={left:false,right:false,gas:false}; let engaged=false; const MAX=11;
let focusOn=false;function setFocus(v){if(v===focusOn)return;focusOn=v;document.body.classList.toggle('focus',v)}
function start(){Object.assign(G,{state:'play',pos:0,speed:0,px:0,time:45,score:0,curve:0,curveT:0,target:0,cars:[],orbs:[],flash:0,paused:false,crash:0,next:3000});engaged=true;beep(660,.08)}
let ac=null;function beep(f,d){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.type='square';o.frequency.value=f;g.gain.value=.03;o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}}
let last=performance.now();
function step(now){if(window.ARC&&ARC.active){last=now;requestAnimationFrame(step);return}const dt=Math.min(.05,(now-last)/1000);last=now;G.t++;
  if(G.state==='play'&&!G.paused){
    if(G.crash>0){G.crash-=dt;G.speed*=.9}else if(keys.gas)G.speed=Math.min(MAX,G.speed+dt*6);else G.speed=Math.max(0,G.speed-dt*4);
    if(Math.abs(G.px)>1)G.speed=Math.max(0,G.speed-dt*9);
    const st=(keys.right?1:0)-(keys.left?1:0);G.px+=st*dt*1.9*(G.speed/MAX+.3)-G.curve*dt*G.speed*.06;G.px=clamp(G.px,-1.6,1.6);
    G.pos+=G.speed*dt*60;G.score=Math.floor(G.pos/10);
    G.curveT-=dt;if(G.curveT<=0){G.curveT=2+Math.random()*3;G.target=Math.random()<.35?0:(Math.random()-.5)*3.2}G.curve+=(G.target-G.curve)*dt*.8;
    if(Math.random()<dt*(.5+G.speed/MAX))G.cars.push({x:Math.random()*1.6-.8,z:1,v:.12+Math.random()*.12,c:['#F2A7E6','#9CC3EE','#FFFFFF','#C5E86C'][Math.random()*4|0]});
    if(Math.random()<dt*.6)G.orbs.push({x:Math.random()*1.6-.8,z:1});
    const adv=G.speed/MAX*dt*.9;G.cars.forEach(c=>c.z-=adv-c.v*dt*.5*(G.speed/MAX));G.orbs.forEach(o=>o.z-=adv);
    G.cars=G.cars.filter(c=>c.z>-.05&&c.z<1.1);G.orbs=G.orbs.filter(o=>o.z>-.05&&!o.got);
    G.cars.forEach(c=>{if(c.z<.08&&c.z>0&&Math.abs(c.x-G.px)<.32&&G.crash<=0){G.crash=1;G.time=Math.max(0,G.time-3);G.flash=20;G.msg='CRASH -3s';gb.classList.remove('shake');void gb.offsetWidth;gb.classList.add('shake');beep(120,.25)}});
    G.orbs.forEach(o=>{if(o.z<.08&&Math.abs(o.x-G.px)<.3){o.got=true;G.time+=2;G.flash=14;G.msg='SIGNAL +2s';beep(990,.06)}});
    if(G.pos/10>=G.next){G.next+=3000;G.time+=12;G.flash=24;G.msg='CHECKPOINT +12s';beep(1320,.12)}
    G.time-=dt;if(G.time<=0){G.time=0;G.state='over';if(G.score>best){best=G.score;try{localStorage.setItem('sa-run-best',best)}catch(e){}$('#best').textContent=best}}}
  setFocus(G.state==='play'&&!G.paused&&playVisible());if(G.t%8===0&&G.state==='play')$('#now').textContent='Now '+G.score+' · '+Math.ceil(G.time)+'s left';if(G.state==='over'&&G.t%30===0)$('#now').textContent='Last run '+G.score;
  draw();requestAnimationFrame(step)}
const scrToZ=y=>(y-HOR)/(ROADB-HOR);
const CL=[[14,10,1.2],[96,6,1],[170,14,1.3],[52,30,.9],[130,32,1.1],[206,26,.8]];
function cloud(cx,cy,s){[[0,4,10,4],[4,0,10,4],[10,2,12,6],[18,5,10,4],[2,7,22,3]].forEach(([a,b,w,h])=>{x.fillStyle='#fff';x.fillRect(cx+a*s,cy+b*s,w*s,h*s);x.fillStyle='#C6D8EC';x.fillRect(cx+a*s,cy+(b+h-1)*s,w*s,s)})}
const mids=[];
function draw(){
  x.fillStyle='#DCEBFA';x.fillRect(0,0,W,HOR);const dr=G.pos*.015-G.curve*12;CL.forEach(([cx,cy,s])=>cloud(Math.round((((cx-dr)%(W+40))+W+40)%(W+40)-30),cy,s*2));
  x.fillStyle='#EEF4FA';x.fillRect(0,HOR-8,W,6);x.fillStyle='#C6D8EC';x.fillRect(0,HOR-3,W,3);
  x.fillStyle='#8E9BA8';for(let i=((-G.curve*8)%18+18)%18;i<W;i+=18){x.fillRect(i,HOR-7,1,4);x.fillRect(i-2,HOR-8,5,1)}
  let acc=0;for(let y=HOR;y<ROADB;y++){const p=scrToZ(y),wd=6+p*200,z=1/(p+.035);acc+=G.curve*(1-p)*.9;const m=W/2+acc*(1-p)*3-G.px*wd*.42,b=Math.floor(z*3.5+G.pos*.05)%2;
    x.fillStyle=b?'#C5E86C':'#B4DC55';x.fillRect(0,y,W,1);x.fillStyle=b?'#FFFFFF':'#F2A7E6';x.fillRect(m-wd/2-wd*.07,y,wd*1.14,1);x.fillStyle=b?'#2B2B2F':'#262629';x.fillRect(m-wd/2,y,wd,1);
    if(b){x.fillStyle='#fff';const lw=Math.max(1,wd*.02);x.fillRect(m-wd/6-lw/2,y,lw,1);x.fillRect(m+wd/6-lw/2,y,lw,1)}mids[y]=[m,wd]}
  [...G.orbs.map(o=>({...o,k:'o'})),...G.cars.map(c=>({...c,k:'c'}))].sort((a,b)=>b.z-a.z).forEach(o=>{if(o.z<0||o.z>1)return;const p=1-o.z,y=Math.round(HOR+p*(ROADB-HOR)),m=mids[Math.min(ROADB-1,y)];if(!m)return;const sx=m[0]+o.x*m[1]*.42,s=Math.max(.12,p);
    if(o.k==='c'){const w=30*s,h=14*s;x.fillStyle='#111111';x.fillRect(sx-w/2,y-h,w,h);x.fillStyle=o.c;x.fillRect(sx-w/2+1,y-h+1,w-2,h*.55);x.fillStyle='#FF5A4A';x.fillRect(sx-w/2+1,y-h*.4,w*.18,h*.18);x.fillRect(sx+w/2-1-w*.18,y-h*.4,w*.18,h*.18)}
    else{const r=Math.max(2,6*s);x.fillStyle='#111111';x.fillRect(sx-r-1,y-r*2.6-1,r*2+2,r*2+2);x.fillStyle='#8FD9C9';x.fillRect(sx-r,y-r*2.6,r*2,r*2)}});
  const bob=G.state==='play'&&G.speed>0&&G.t%6<3?1:0,ln=((keys.right?1:0)-(keys.left?1:0))*3,cx=W/2,by=ROADB-4+bob;
  x.fillStyle='rgba(0,0,0,.25)';x.fillRect(cx-34,by,68,3);x.fillStyle='#111111';x.fillRect(cx-33,by-8,12,9);x.fillRect(cx+21,by-8,12,9);x.fillRect(cx-34+ln,by-24,68,18);
  x.fillStyle='#B9A6F2';x.fillRect(cx-32+ln,by-22,64,14);x.fillStyle='#111111';x.fillRect(cx-24+ln,by-34,48,12);x.fillStyle='#B9A6F2';x.fillRect(cx-22+ln,by-32,44,10);
  x.fillStyle='#2B2B2F';x.fillRect(cx-18+ln,by-30,36,6);x.fillStyle='#F2A7E6';x.fillRect(cx-28+ln,by-18,10,4);x.fillRect(cx+18+ln,by-18,10,4);x.fillStyle='#7E6AD1';x.fillRect(cx-10+ln,by-12,20,3);
  x.fillStyle='#111111';x.fillRect(0,ROADB,W,H-ROADB);x.fillStyle='#1B1B1E';x.fillRect(2,ROADB+2,W-4,H-ROADB-4);
  const rev=Math.round(G.speed/MAX*16);for(let i=0;i<16;i++){x.fillStyle=i<rev?(i<9?'#8FD9C9':i<13?'#B9A6F2':'#F2A7E6'):'#333338';x.fillRect(74+i*6,ROADB+5,4,4)}
  const bx=(a,b,w,h)=>{x.fillStyle='#000000';x.fillRect(a,b,w,h)};x.textBaseline='top';x.font='8px Silkscreen';
  bx(20,ROADB+12,40,10);x.fillStyle='#F2F2EE';x.fillText('TIME',27,ROADB+13);bx(176,ROADB+12,48,10);x.fillStyle='#F2F2EE';x.fillText('SCORE',182,ROADB+13);
  bx(72,ROADB+12,96,12);x.fillStyle='#F2F2EE';x.font='10px Silkscreen';x.fillText(String(Math.round(G.speed/MAX*240)).padStart(3,' ')+' KM/H',86,ROADB+13);
  bx(20,ROADB+26,40,13);x.fillStyle='#F2F2EE';x.fillText(String(Math.ceil(G.time)).padStart(3,'0'),27,ROADB+28);bx(176,ROADB+26,48,13);x.fillStyle='#F2F2EE';x.fillText(String(G.score).padStart(5,'0'),180,ROADB+28);
  bx(72,ROADB+28,96,11);x.fillStyle='#F2F2EE';x.font='8px Silkscreen';x.fillText('S',76,ROADB+30);x.fillText('G',160,ROADB+30);const pr=((G.pos/10)%3000)/3000;for(let i=0;i<14;i++){x.fillStyle=i/14<pr?'#ABABF5':'#333338';x.fillRect(86+i*5,ROADB+31,3,5)}
  if(G.flash>0){G.flash--;x.fillStyle='#111111';x.font='12px Silkscreen';x.textAlign='center';x.fillText(G.msg,W/2,HOR+10);x.textAlign='left'}
  if(G.state==='title')panel('AVATAR RUN','PRESS START');if(G.state==='over')panel('TIME UP','SCORE '+G.score+' · START');if(G.paused&&G.state==='play')panel('PAUSED','PRESS B',1)}
function panel(a,b,still){x.fillStyle='rgba(255,255,255,.92)';x.fillRect(30,58,180,62);x.strokeStyle='#111111';x.lineWidth=2;x.strokeRect(30,58,180,62);x.fillStyle='#111111';x.textAlign='center';x.font='16px Silkscreen';x.fillText(a,W/2,70);x.font='10px Silkscreen';if(still||Math.floor(G.t/24)%2===0)x.fillText(b,W/2,96);x.textAlign='left'}
requestAnimationFrame(step);setInterval(()=>{$('#lat').textContent=16+Math.round(Math.random()*5)},1400);
$$('.gb [data-k]').forEach(btn=>{const k=btn.dataset.k;
  btn.addEventListener('pointerdown',e=>{e.preventDefault();engaged=true;btn.classList.add('on');if(window.ARC&&ARC.active){ARC.press(k==='select'?'start':k);return}if(k==='left'||k==='right')keys[k]=true;if(k==='a'){if(G.state!=='play')start();keys.gas=true}if(k==='start'&&G.state!=='play')start();if(k==='select')start();if(k==='b'&&G.state==='play')G.paused=!G.paused});
  const up=()=>{btn.classList.remove('on');if(window.ARC&&ARC.active){ARC.press(k,false);return}if(k==='left'||k==='right')keys[k]=false;if(k==='a')keys.gas=false};btn.addEventListener('pointerup',up);btn.addEventListener('pointerleave',up)});
$('#gb').addEventListener('pointerdown',()=>{window.__dev='run'});
cv.addEventListener('pointerdown',()=>{engaged=true;if(window.ARC&&ARC.active){ARC.press(ARC.playing()?'a':'start');return}if(G.state!=='play')start()});
const playVisible=()=>{const r=$('#gb').getBoundingClientRect();return r.top<innerHeight&&r.bottom>0};
addEventListener('scroll',()=>{if(!playVisible()){engaged=false;keys.gas=keys.left=keys.right=false;if(G.state==='play')G.paused=true}},{passive:true});
addEventListener('keydown',e=>{if(!playVisible()||(window.ARC&&ARC.active))return;const k=e.key;if(k==='Enter'){e.preventDefault();engaged=true;if(G.state!=='play')start();else if(G.paused)G.paused=false;return}if(!engaged)return;
  if(k==='ArrowLeft'){e.preventDefault();keys.left=true}if(k==='ArrowRight'){e.preventDefault();keys.right=true}if(k==='ArrowUp'||k===' '||k==='a'||k==='A'){e.preventDefault();keys.gas=true}if(k==='ArrowDown')e.preventDefault();if(k==='b'||k==='B'||k==='Escape'){if(G.state==='play')G.paused=!G.paused}});
addEventListener('keyup',e=>{if(e.key==='ArrowLeft')keys.left=false;if(e.key==='ArrowRight')keys.right=false;if(['ArrowUp',' ','a','A'].includes(e.key))keys.gas=false});


gsap.fromTo('#gb',{rotationX:28,y:60,scale:.88,transformPerspective:900},{rotationX:0,y:0,scale:1,ease:'none',scrollTrigger:{trigger:'#arena',start:'top 95%',end:'top 35%',scrub:true}});
gsap.fromTo('#arena .panel',{y:40,opacity:0},{y:0,opacity:1,stagger:.08,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'#arena',start:'top 80%',toggleActions:'play none none reverse'}});
/* ===== ARCADE CARTRIDGES: snake · blocks · shooter run inside the same handheld ===== */
(function(){const scr=$('#screen');if(!scr)return;const sx=scr.getContext('2d');const cv=document.createElement('canvas');cv.width=256;cv.height=160;const x=cv.getContext('2d');const W=256,H=160;
  const NAMES=['SNAKE','BLOCKS','SHOOTER'],ACC=['#8FD9C9','#ABABF5','#F2A7E6'],BG='#F2F2EE',INK='#111111';
  const GW={g:0,st:'title',paused:false,t:0,k:{left:false,right:false,down:false,a:false}};let best=[0,0,0];try{best=JSON.parse(localStorage.getItem('sa-cart-best'))||[0,0,0]}catch(e){}
  let ac=null;const beep=(f,d)=>{try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.type='square';o.frequency.value=f;g.gain.value=.025;o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}};
  const txt=(t,X,Y,c=INK,sz=8,al='left')=>{x.fillStyle=c;x.font=sz+'px Silkscreen';x.textAlign=al;x.textBaseline='top';x.fillText(t,X,Y);x.textAlign='left'};
  const dots=(c='rgba(17,17,17,.08)')=>{x.fillStyle=c;for(let yy=4;yy<H;yy+=8)for(let xx=4;xx<W;xx+=8)x.fillRect(xx,yy,1,1)};
  const showBest=()=>{$('#best').textContent=best[GW.g]};
  function over(score){GW.st='over';GW.score=score;if(score>best[GW.g]){best[GW.g]=score;try{localStorage.setItem('sa-cart-best',JSON.stringify(best))}catch(e){}showBest()}$('#now').textContent='Last run '+score;beep(140,.3)}
  /* snake */
  let SN;const snInit=()=>{SN={b:[[8,10],[7,10],[6,10]],d:[1,0],nd:[1,0],f:[20,10],acc:0,sp:.12,score:0}};
  const snFood=()=>{do{SN.f=[(Math.random()*32)|0,2+((Math.random()*18)|0)]}while(SN.b.some(p=>p[0]===SN.f[0]&&p[1]===SN.f[1]))};
  function snUpd(dt){SN.acc+=dt;while(SN.acc>SN.sp){SN.acc-=SN.sp;SN.d=SN.nd;const h=[SN.b[0][0]+SN.d[0],SN.b[0][1]+SN.d[1]];if(h[0]<0||h[1]<2||h[0]>=32||h[1]>=20||SN.b.some(p=>p[0]===h[0]&&p[1]===h[1])){over(SN.score);return}
    SN.b.unshift(h);if(h[0]===SN.f[0]&&h[1]===SN.f[1]){SN.score+=10;SN.sp=Math.max(.055,SN.sp-.004);snFood();beep(880,.05)}else SN.b.pop()}}
  function scene(night){x.fillStyle=night?'#E3E3FF':'#DCEBFA';x.fillRect(0,0,W,H);x.fillStyle=night?'#ECEBFF':'#E8F2FC';x.fillRect(0,H*.32,W,H*.2);
    [[20,24,1],[120,14,1.3],[200,36,.9]].forEach(([cx,cy,sc],i)=>{const xx=((cx-GW.t*.15*(i+1))%(W+60)+W+60)%(W+60)-40;x.fillStyle='#fff';x.fillRect(xx,cy,26*sc,6*sc);x.fillRect(xx+6*sc,cy-4*sc,14*sc,4*sc)});
    x.fillStyle='#B4DC55';for(let i=0;i<W;i+=4){const h=18+Math.round(Math.sin(i*.035)*8+Math.sin(i*.09)*4);x.fillRect(i,H-h-14,4,h+14)}
    x.fillStyle='#C5E86C';for(let i=0;i<W;i+=4){const h=10+Math.round(Math.sin(i*.05+2)*5);x.fillRect(i,H-h-6,4,h+6)}x.fillStyle='#9CCB45';x.fillRect(0,H-6,W,6)}
  function snDraw(){for(let yy=0;yy<H;yy+=8)for(let xx=0;xx<W;xx+=8){x.fillStyle=((xx+yy)/8)%2?'#D6EFB4':'#CDEBA6';x.fillRect(xx,yy,8,8)}x.fillStyle=INK;x.fillRect(0,15,W,1);
    x.fillStyle='#F2A7E6';x.fillRect(SN.f[0]*8+1,SN.f[1]*8+1,6,6);if(GW.t%20<10){x.fillStyle=INK;x.fillRect(SN.f[0]*8+3,SN.f[1]*8+3,2,2)}
    SN.b.forEach((p,i)=>{x.fillStyle=INK;x.fillRect(p[0]*8,p[1]*8,8,8);x.fillStyle=i===0?'#B9A6F2':'#8FD9C9';x.fillRect(p[0]*8+1,p[1]*8+1,6,6)});
    txt('SCORE '+String(SN.score).padStart(4,'0'),4,4);txt('BEST '+best[0],W-4,4,INK,8,'right')}
  /* blocks */
  const PCS=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]],[[1,1,0],[0,1,1]],[[0,1,1],[1,1,0]]],PC=['#8FD9C9','#B9A6F2','#ABABF5','#9CC3EE','#F2A7E6','#C5E86C','#F2A7E6'];
  let BL;const rot=m=>m[0].map((_,i)=>m.map(r=>r[i]).reverse());
  const fits=(m,px,py)=>m.every((r,j)=>r.every((v,i)=>!v||(px+i>=0&&px+i<10&&py+j<19&&(py+j<0||!BL.g[py+j][px+i]))));
  const blSpawn=()=>{BL.i=BL.n;BL.m=PCS[BL.i];BL.n=(Math.random()*7)|0;BL.x=3;BL.y=0;if(!fits(BL.m,BL.x,BL.y))over(BL.score)};
  const blInit=()=>{BL={g:Array.from({length:19},()=>Array(10).fill(0)),n:(Math.random()*7)|0,acc:0,sp:.6,score:0,lines:0};blSpawn()};
  function blLock(){BL.m.forEach((r,j)=>r.forEach((v,i)=>{if(v&&BL.y+j>=0)BL.g[BL.y+j][BL.x+i]=BL.i+1}));let c=0;for(let j=18;j>=0;j--){if(BL.g[j].every(v=>v)){BL.g.splice(j,1);BL.g.unshift(Array(10).fill(0));c++;j++}}
    if(c){BL.lines+=c;BL.score+=[0,40,100,300,1200][c];BL.sp=Math.max(.12,.6-BL.lines*.02);beep(1200,.08)}else beep(300,.03);blSpawn()}
  function blUpd(dt){BL.acc+=dt;const sp=GW.k.down?.04:BL.sp;if(BL.acc>sp){BL.acc=0;if(fits(BL.m,BL.x,BL.y+1))BL.y++;else blLock()}}
  function blDraw(){scene();const ox=88,oy=4,c=8;x.fillStyle=INK;x.fillRect(ox-2,oy-2,84,156);x.fillStyle='#FBFBF8';x.fillRect(ox,oy,80,152);
    const cell=(i,j,col)=>{x.fillStyle=INK;x.fillRect(ox+i*c,oy+j*c,c,c);x.fillStyle=col;x.fillRect(ox+i*c+1,oy+j*c+1,c-2,c-2);x.fillStyle='rgba(255,255,255,.6)';x.fillRect(ox+i*c+1,oy+j*c+1,c-2,1)};
    BL.g.forEach((r,j)=>r.forEach((v,i)=>{if(v)cell(i,j,PC[v-1])}));if(GW.st==='play'){let gy=BL.y;while(fits(BL.m,BL.x,gy+1))gy++;BL.m.forEach((r,j)=>r.forEach((v,i)=>{if(v){x.fillStyle='rgba(17,17,17,.12)';x.fillRect(ox+(BL.x+i)*c+1,oy+(gy+j)*c+1,c-2,c-2)}}))}
    BL.m.forEach((r,j)=>r.forEach((v,i)=>{if(v&&BL.y+j>=0)cell(BL.x+i,BL.y+j,PC[BL.i])}));
    txt('SCORE',12,12);txt(String(BL.score).padStart(5,'0'),12,24,INK,10);txt('LINES',12,48);txt(String(BL.lines),12,60,INK,10);txt('BEST',12,84);txt(String(best[1]),12,96,INK,10);
    txt('NEXT',184,12);PCS[BL.n].forEach((r,j)=>r.forEach((v,i)=>{if(v){x.fillStyle=INK;x.fillRect(184+i*8,28+j*8,8,8);x.fillStyle=PC[BL.n];x.fillRect(185+i*8,29+j*8,6,6)}}))}
  /* shooter: pastel drones sweep in, you defend the line */
  let SH;const shWave=n=>{const f=[];for(let j=0;j<3;j++)for(let i=0;i<8;i++)f.push({x:28+i*26,y:22+j*16,c:PC[(i+j)%7],on:true});return f};
  const shInit=()=>{SH={px:124,shots:[],es:[],foes:shWave(1),dx:0,dir:1,cool:0,score:0,lives:3,wave:1,inv:0}};
  function shUpd(dt){const k=GW.k;if(k.left)SH.px-=150*dt;if(k.right)SH.px+=150*dt;SH.px=clamp(SH.px,6,W-14);SH.cool-=dt;SH.inv-=dt;
    if(k.a&&SH.cool<=0){SH.shots.push({x:SH.px+3,y:136});SH.cool=.28;beep(1100,.02)}
    SH.shots.forEach(s=>s.y-=200*dt);SH.shots=SH.shots.filter(s=>s.y>10);
    const sp=(14+SH.wave*6)*dt;SH.dx+=SH.dir*sp;const xs=SH.foes.filter(f=>f.on).map(f=>f.x+SH.dx);if(xs.length&&(Math.max(...xs)>W-16||Math.min(...xs)<6)){SH.dir*=-1;SH.foes.forEach(f=>f.y+=6)}
    SH.foes.forEach(f=>{if(!f.on)return;SH.shots.forEach(s=>{if(s.y>0&&s.x>f.x+SH.dx-1&&s.x<f.x+SH.dx+12&&s.y>f.y&&s.y<f.y+9){f.on=false;s.y=-9;SH.score+=10;beep(700,.04)}});if(f.y>124)over(SH.score);if(Math.random()<dt*.08*SH.wave)SH.es.push({x:f.x+SH.dx+5,y:f.y+9})});
    SH.es.forEach(e=>e.y+=90*dt);SH.es=SH.es.filter(e=>{if(e.y>134&&e.y<146&&e.x>SH.px-1&&e.x<SH.px+10&&SH.inv<=0){SH.lives--;SH.inv=1.2;beep(160,.2);if(SH.lives<=0)over(SH.score);return false}return e.y<H});
    if(SH.foes.every(f=>!f.on)){SH.wave++;SH.foes=shWave(SH.wave);SH.dx=0}}
  function shDraw(){scene(true);for(let i=0;i<30;i++){x.fillStyle='rgba(17,17,17,.12)';x.fillRect((i*53+GW.t*.3)%W,(i*37+GW.t*.6)%H,1,1)}x.fillStyle=INK;x.fillRect(0,13,W,1);x.fillRect(0,150,W,1);
    SH.foes.forEach(f=>{if(!f.on)return;const fx=Math.round(f.x+SH.dx),fy=Math.round(f.y),wob=GW.t%30<15?0:1;x.fillStyle=INK;x.fillRect(fx,fy,12,9);x.fillStyle=f.c;x.fillRect(fx+1,fy+1,10,6);x.fillStyle=INK;x.fillRect(fx+3,fy+3,2,2);x.fillRect(fx+7,fy+3,2,2);x.fillRect(fx+1+wob,fy+9,2,2);x.fillRect(fx+9-wob,fy+9,2,2)});
    x.fillStyle=INK;SH.shots.forEach(s=>x.fillRect(s.x,s.y,2,5));x.fillStyle='#F2A7E6';SH.es.forEach(e=>{x.fillRect(e.x,e.y,3,3)});
    if(SH.inv<=0||GW.t%6<3){const p=Math.round(SH.px);x.fillStyle=INK;x.fillRect(p+3,134,4,3);x.fillRect(p,137,10,6);x.fillStyle='#B9A6F2';x.fillRect(p+1,138,8,4);x.fillStyle=INK;x.fillRect(p+4,138,2,2)}
    txt('SCORE '+String(SH.score).padStart(4,'0'),4,3);txt('WAVE '+SH.wave,W/2,3,INK,8,'center');for(let i=0;i<SH.lives;i++){x.fillStyle='#B9A6F2';x.fillRect(W-12-i*10,4,6,6);x.fillStyle=INK;x.fillRect(W-12-i*10,4,6,1)}}
  const INIT=[snInit,blInit,shInit],UPD=[snUpd,blUpd,shUpd],DRAW=[snDraw,blDraw,shDraw];INIT[0]();
  function title(){scene();const a=ACC[GW.g];x.fillStyle=INK;x.fillRect(W/2-46,22,92,46);x.fillStyle=a;x.fillRect(W/2-44,24,88,42);
    if(GW.g===0){for(let i=0;i<6;i++){x.fillStyle=INK;x.fillRect(W/2-30+i*8,42,8,8);x.fillStyle=i===5?'#B9A6F2':'#fff';x.fillRect(W/2-29+i*8,43,6,6)}x.fillStyle='#F2A7E6';x.fillRect(W/2+28,43,6,6)}
    if(GW.g===1){[[0,0],[1,0],[2,0],[1,1],[4,1],[5,1],[4,0],[5,0]].forEach(([i,j])=>{x.fillStyle=INK;x.fillRect(W/2-24+i*8,36+j*8,8,8);x.fillStyle=i<3?'#fff':'#9CC3EE';x.fillRect(W/2-23+i*8,37+j*8,6,6)})}
    if(GW.g===2){for(let i=0;i<3;i++){const fx=W/2-34+i*24;x.fillStyle=INK;x.fillRect(fx,32,12,9);x.fillStyle='#fff';x.fillRect(fx+1,33,10,6);x.fillStyle=INK;x.fillRect(fx+3,35,2,2);x.fillRect(fx+7,35,2,2)}x.fillStyle=INK;x.fillRect(W/2-5,56,10,6);x.fillRect(W/2-1,46,2,6)}
    txt(NAMES[GW.g],W/2,78,INK,16,'center');if(GW.t%40<26)txt('PRESS START',W/2,108,INK,8,'center');txt('BEST '+best[GW.g],W/2,128,'#666',8,'center')}
  let last=performance.now(),load=0;
  function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(ARC.active){GW.t++;
    if(load>0){load-=dt;x.fillStyle=INK;x.fillRect(0,0,W,H);txt('LOADING',W/2,66,'#F2F2EE',12,'center');const n=Math.floor((1-load/.9)*12);for(let i=0;i<12;i++){x.fillStyle=i<n?ACC[GW.g]:'#333';x.fillRect(W/2-48+i*8,90,6,6)}}
    else if(GW.st==='title')title();else{if(GW.st==='play'&&!GW.paused)UPD[GW.g](dt);DRAW[GW.g]();
      if(GW.paused&&GW.st==='play'){x.fillStyle='rgba(242,242,238,.88)';x.fillRect(60,56,136,40);txt('PAUSED',W/2,70,INK,12,'center')}
      if(GW.st==='over'){x.fillStyle='rgba(242,242,238,.92)';x.fillRect(48,44,160,72);x.fillStyle=INK;x.fillRect(48,44,160,2);x.fillRect(48,114,160,2);txt('GAME OVER',W/2,56,INK,14,'center');txt('SCORE '+GW.score,W/2,80,INK,8,'center');if(GW.t%40<26)txt('START = AGAIN',W/2,96,'#666',8,'center')}
      if(GW.st==='play'&&GW.t%10===0){const sc=[SN,BL,SH][GW.g].score;$('#now').textContent='Now '+sc}}
    sx.fillStyle='#111';sx.fillRect(0,0,240,200);sx.imageSmoothingEnabled=false;sx.drawImage(cv,0,25,240,150);
    sx.fillStyle='#F2F2EE';sx.font='8px Silkscreen';sx.textBaseline='top';sx.fillText('CART · '+NAMES[GW.g],8,9);sx.textAlign='right';sx.fillText('SELECT = RESTART',232,183);sx.textAlign='left';
    sx.fillStyle=ACC[GW.g];sx.fillRect(220,9,12,8)}
    requestAnimationFrame(loop)}
  requestAnimationFrame(loop);
  function press(k,down=true){if(!down){if(k in GW.k)GW.k[k]=false;return}
    if(k==='start'){if(GW.st!=='play'){INIT[GW.g]();GW.st='play';GW.paused=false;beep(990,.06)}else GW.paused=!GW.paused;return}
    if(GW.st==='title'||GW.st==='over'){if(k==='a'){INIT[GW.g]();GW.st='play';beep(990,.06)}return}
    if(k==='b'&&GW.g!==1){GW.paused=!GW.paused;return}
    if(GW.paused)return;if(k in GW.k)GW.k[k]=true;
    if(GW.g===0){const d=SN.d;if(k==='left'&&d[0]!==1)SN.nd=[-1,0];if(k==='right'&&d[0]!==-1)SN.nd=[1,0];if(k==='up'&&d[1]!==1)SN.nd=[0,-1];if(k==='down'&&d[1]!==-1)SN.nd=[0,1]}
    if(GW.g===1){if(k==='left'&&fits(BL.m,BL.x-1,BL.y))BL.x--;if(k==='right'&&fits(BL.m,BL.x+1,BL.y))BL.x++;if(k==='up'||k==='a'){const r=rot(BL.m);if(fits(r,BL.x,BL.y))BL.m=r;else if(fits(r,BL.x-1,BL.y)){BL.m=r;BL.x--}else if(fits(r,BL.x+1,BL.y)){BL.m=r;BL.x++}}if(k==='b'){while(fits(BL.m,BL.x,BL.y+1))BL.y++;blLock()}}}
  window.ARC={active:false,press,playing:()=>GW.st==='play'&&!GW.paused,set(i){GW.g=i;GW.st='title';GW.paused=false;load=.9;showBest()}};
  const vis=()=>{const r=$('#gb').getBoundingClientRect();return r.top<innerHeight&&r.bottom>0};
  const KM={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down',' ':'a',a:'a',A:'a',z:'a',b:'b',B:'b',x:'b',Enter:'start',Escape:'b'};
  addEventListener('keydown',e=>{if(!ARC.active||!vis())return;const k=KM[e.key];if(!k)return;e.preventDefault();if(!e.repeat||k==='left'||k==='right'||k==='down'||k==='a')press(k)});
  addEventListener('keyup',e=>{const k=KM[e.key];if(k)press(k,false)});
  addEventListener('scroll',()=>{if(ARC.active&&!vis()&&GW.st==='play')GW.paused=true},{passive:true});
  /* cartridges */
  const ICO={race:["........","..####..",".#yyyy#.","########","#y####y#","########",".##..##.","........"],snake:["........",".######.",".#mmmm#.",".#m####.",".#mmmm#.",".####m#.","..#mmm#p","..####.."],
    blocks:["........","###.....","#l#.....","########","#l##l##l","########","........","........"],shooter:["...##...","...##...","..####..",".#yyyy#.","########","##....##","........","........"]};
  const ICC={'#':'#111','p':'#111'};
  $$('.cart').forEach(c=>{const g=c.querySelector('canvas').getContext('2d'),cc=getComputedStyle(c).getPropertyValue('--c').trim();ICO[c.dataset.cart].forEach((r,y)=>[...r].forEach((ch,i)=>{const col=ICC[ch]||((ch==='y'||ch==='m'||ch==='l')?cc:null);if(col){g.fillStyle=col;g.beginPath();g.arc(i*2+1,y*2+1,1.05,0,7);g.fill()}}))});
  const HOW={race:['Reach Rotterdam before the clock runs out.',[['#E6DEFF','Signal','+2 s'],['#DBF5F0','Checkpoint','+12 s'],['#FFE3FB','Crash','−3 s']],[['Enter','Start'],['← →','Steer'],['↑ A','Hold to drive'],['B','Pause']],'A4 · DELFT → ROTTERDAM'],
    snake:['Eat the signals, grow your avatar, never bite yourself.',[['#FFE3FB','Signal','+10'],['#DBF5F0','Faster each bite',''],['#E3E3FF','Hit a wall','end']],[['Enter','Start'],['← ↑ → ↓','Turn'],['B','Pause']],'GRID · 32 × 18'],
    blocks:['Stack the blocks and clear full lines.',[['#E3E3FF','1 line','+40'],['#E6DEFF','4 lines','+1200'],['#FFE3FB','Top out','end']],[['Enter','Start'],['← →','Move'],['↑ A','Rotate'],['↓','Soft drop'],['B','Hard drop']],'STACK · 10 × 19'],
    shooter:['Defend the network from rogue drones.',[['#FFE3FB','Drone','+10'],['#DCEBFA','New wave','faster'],['#E6DEFF','3 lives','']],[['Enter','Start'],['← →','Move'],['A','Hold to fire'],['B','Pause']],'NETWORK · DEFENCE']};
  function setHow(id){const h=HOW[id];$('#howh').textContent=h[0];$('#howr').innerHTML=h[1].map(r=>`<li><i style="background:${r[0]}"></i><span>${r[1]}</span><b>${r[2]}</b></li>`).join('');$('#howk').innerHTML=h[2].map(k=>`<li><span>${k[0].split(' ').map(t=>`<kbd>${t}</kbd>`).join('')}</span>${k[1]}</li>`).join('');$('#bzr').textContent=h[3]}
  setHow('race');
  const IDX={snake:0,blocks:1,shooter:2};
  function insert(c){const id=c.dataset.cart;if(c.classList.contains('on'))return;$$('.cart').forEach(o=>o.classList.remove('on'));c.classList.add('on');
    const r=c.getBoundingClientRect(),sl=$('#slot').getBoundingClientRect(),gh=c.cloneNode(true);gh.style.cssText+=`;position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;margin:0;z-index:150;pointer-events:none;transform:none;outline:none`;document.body.appendChild(gh);
    gsap.timeline({onComplete:()=>gh.remove()}).to(gh,{x:sl.left+sl.width/2-(r.left+r.width/2),y:sl.top-r.height*.2-r.top,rotation:0,scale:.55,duration:.55,ease:'power3.inOut'}).to(gh,{y:'+='+(r.height*.35),opacity:0,duration:.25,ease:'power2.in'});
    gsap.fromTo('#slot',{y:-14},{y:0,duration:.35,delay:.6,ease:'bounce.out'});
    setTimeout(()=>{const lab=$('#slotlab');lab.textContent=c.querySelector('b').textContent;lab.style.setProperty('--c',getComputedStyle(c).getPropertyValue('--c'));$('#gb').classList.remove('shake');void $('#gb').offsetWidth;$('#gb').classList.add('shake');beep(520,.05);
      setHow(id);$('#bestlab').textContent='Your best · '+c.querySelector('b').textContent[0]+c.querySelector('b').textContent.slice(1).toLowerCase();
      if(id==='race'){ARC.active=false;let b=0;try{b=+localStorage.getItem('sa-run-best')||0}catch(e){}$('#best').textContent=b;$('#now').textContent='Press start to play'}else{ARC.active=true;ARC.set(IDX[id]);$('#now').textContent='Press start to play'}},560)}
  $$('.cart').forEach(c=>c.addEventListener('click',()=>insert(c)));
})();


})();
