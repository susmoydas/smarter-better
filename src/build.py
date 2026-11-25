"""Builds every inner page of smartavatar-site from shared templates.
Run from the repo root:  python3 src/build.py
It reads index.html (home) for the shared styles, halftone shapes, footer and games,
so the inner pages always match the home page."""
import os, re, html
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
idx=open('index.html').read()
def between(a,b,src=idx,incl_a=True):
    i=src.index(a);j=src.index(b,i+len(a));return src[i if incl_a else i+len(a):j]
SITE='https://smartavatar-site.vercel.app'
# ---------- shared assets ----------
os.makedirs('assets',exist_ok=True)
home_css=between('<style>','</style>',incl_a=False)
open('assets/site.css','w').write(home_css+'\n'+open('src/inner.css').read())
HEAD_JS="const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t,ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;gsap.registerPlugin(ScrollTrigger);const DPR=Math.min(2,devicePixelRatio||1);\n"
shapes=between('/* ================= SHAPES','/* ================= LOADER')
footjs=between('/* ================= FOOTER: dot playground','/* ===== AVATAR RUN')
open('assets/site.js','w').write('(()=>{\n'+HEAD_JS+shapes+open('src/core.js').read()+'\n'+footjs+'\naddEventListener("load",()=>ScrollTrigger.refresh());\n})();\n')
racing=between('/* ===== AVATAR RUN',"if(matchMedia('(hover:hover) and (pointer:fine)')")
arcade=between('/* ===== ARCADE CARTRIDGES','/* ===== pixel transitions')
open('assets/arcade.js','w').write('(()=>{\nconst $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;\n'+racing+arcade+'\n})();\n')
arena=between('<div class="arena" id="arena">','\n</div></section>')
LINKS=[('href="#machines">Machines','href="/machines">Machines'),('href="#platform">Platform','href="/platform">Platform'),('href="#play">Play','href="/play">Play'),('href="#research">Research','href="/research">Research'),
       ('href="#team">BÅNDED','href="/banded">BÅNDED'),('<a href="#">Privacy</a>','<a href="/privacy">Privacy</a>'),('<a href="#">Terms</a>','<a href="/terms">Terms</a>'),('<a href="#">Verify certificate</a>','<a href="/verify">Verify certificate</a>')]
footer=between('<footer id="foot">','</footer>')+'</footer>'
for a,b in LINKS: footer=footer.replace(a,b)
FONTS='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@500;600;700&family=Silkscreen&display=swap" rel="stylesheet"><link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" rel="stylesheet">'
e=html.escape
def page(path,title,desc,section,body,extra_js=''):
    url=SITE+('/'+path if path else '')
    doc=f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="SmartAvatar"><meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:url" content="{url}"><meta property="og:image" content="{SITE}/assets/og.png">
<meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#F2F2EE">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
{FONTS}
<link rel="stylesheet" href="/assets/site.css">
</head>
<body data-page="{section}">
<a class="skip" href="#main">Skip to content</a>
<canvas id="pw" aria-hidden="true"></canvas>
<div class="top"><a href="/" aria-label="SmartAvatar home"><b>SmartAvatar</b></a><span class="mono" id="clock">Delft --:--</span></div>
<main id="main">
{body}
</main>
{footer}
<nav class="dock" id="dock" aria-label="Main"></nav>
<div id="toast" role="status"></div>
<div id="cur" aria-hidden="true"><div id="box"><b class="c1"></b><b class="c2"></b><b class="c3"></b><b class="c4"></b><span></span></div><i id="pt"></i></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="/assets/site.js"></script>
{extra_js}
</body>
</html>
'''
    out=(path or 'index')+'.html'
    os.makedirs(os.path.dirname(out) or '.',exist_ok=True)
    open(out,'w').write(doc);print('built',out)
def crumb(*parts):
    s='<div class="crumb mono"><a href="/">Home</a>'
    for label,href in parts: s+=f' <span>/</span> '+(f'<a href="{href}">{e(label)}</a>' if href else f'<span>{e(label)}</span>')
    return s+'</div>'
def hero(crumbs,title,lead,shape,color,tag,acts=''):
    return f'''<section class="wrap ph"><div>{crumbs}<h1 class="dt">{title}</h1><p class="lead">{lead}</p><div class="acts">{acts}</div></div>
<div class="art" style="--c:{color}" data-rv><span class="tag mono">{e(tag)}</span><canvas class="ill" data-shape="{shape}" aria-label="{e(tag)} illustration"></canvas></div></section>'''
def cta(text,label='Book a demo',href='/contact'):
    return f'<section class="wrap sec"><div class="cta-band" data-rv><h2 class="dt">{text}</h2><a class="more" href="{href}">{label} <i>→</i></a></div></section>'
def more(label,href,ghost=False): return f'<a class="more{" ghost" if ghost else ""}" href="{href}">{label} <i>→</i></a>'

# ---------- content ----------
FEAT=[
 dict(slug='live-twin',name='Live twin',color='#DBF5F0',icon='globe',demo='live-twin',
  lead='A live digital copy of every machine: where it is, how it’s doing and what it’s sending, updated as it happens.',
  steps=[('Connect','A small agent or gateway links the machine to the platform over a secure channel.'),('Mirror','Sensor data streams in and the avatar updates in real time.'),('Use','Dashboards, alerts and other services read from the avatar, not the machine itself.')],
  dtitle='Crane 07, live',dtext='The numbers on the right move with the real crane. Press refresh to pull a new reading.',btns=[('ping','Refresh reading')]),
 dict(slug='ota-updates',name='OTA updates',color='#FFE7A9',icon='chip',demo='ota',
  lead='Send new software to machines in the field. Every update is signed, checked when it arrives, and rolled back by itself if something goes wrong.',
  steps=[('Sign','Each release is signed, so a machine only installs software that really comes from you.'),('Deliver','Send it to one machine or a whole fleet, in stages you control.'),('Verify or roll back','The machine checks the update. If anything fails, it returns to the last good version.')],
  dtitle='Update a tractor',dtext='Push version 4.12 to the tractor, then try rolling it back.',btns=[('push','Push v4.12'),('rollback','Roll back')]),
 dict(slug='remote-control',name='Remote control',color='#DCEBFA',icon='pad',demo='remote',
  lead='Operate a machine from somewhere safer, with very little delay between your hands and its movement.',
  steps=[('Ask for access','Policy decides who may drive which machine, and when.'),('Take control','Live telemetry and video come to you; your commands go to the machine.'),('Hand back','Control returns to the machine or the next operator, and the session is logged.')],
  dtitle='Drive it yourself',dtext='Drag on the field or use the arrow keys to move the tractor.',btns=[]),
 dict(slug='edge-ai',name='Edge AI',color='#E3E3FF',icon='bolt',demo='edge-ai',
  lead='Small AI models run on the machine itself, so they react in time and spot wear before it turns into downtime.',
  steps=[('Train','Models learn from fleet data in the cloud.'),('Deploy','They are shipped to the machine with a normal OTA update.'),('Act locally','The machine decides on the spot, even when the network is slow.')],
  dtitle='Feel the vibration',dtext='Slide the vibration up and watch the model’s service estimate change.',btns=[]),
 dict(slug='zero-trust',name='Zero Trust',color='#FFE3FB',icon='shield',demo='zero-trust',
  lead='Nothing is trusted by default. Every command is checked against your rules and written to a tamper-evident ledger.',
  steps=[('Identify','Every person, service and device proves who it is.'),('Check','Each request is checked against policy before it reaches the machine.'),('Record','Actions are logged on Hyperledger, and personal data is handled under GDPR.')],
  dtitle='Try to get in',dtext='Send a signed command, then one from an unknown device.',btns=[('good','Signed command'),('bad','Unknown device')]),
]
FBY={f['slug']:f for f in FEAT}
CASES=[
 dict(slug='heavy-equipment',name='Heavy equipment',ind='Construction',color='#DCEBFA',shape='crane',lead='Cranes and excavators, run from a safe office instead of the cab.',
  ch='Operators work in loud, risky places, often far from home.',ap='Each machine gets an avatar with live video and telemetry. An operator in an office takes control through Remote control, and Zero Trust checks every command.',
  out='Safer work, and one operator can support sites in different places.',stat=('40 km','Example distance between operator and crane'),feats=['remote-control','zero-trust','live-twin']),
 dict(slug='robotics',name='Robotics',ind='Manufacturing',color='#E3E3FF',shape='robot',lead='The service gets booked before the part actually breaks.',
  ch='Unplanned stops on a production line are expensive and hard to see coming.',ap='Edge AI on the robot watches vibration and temperature. The live twin shows the trend to the maintenance team.',
  out='Maintenance moves from reacting to planning.',stat=('212 h','Example early warning before a joint fails'),feats=['edge-ai','live-twin','ota-updates']),
 dict(slug='healthcare',name='Healthcare',ind='Hospitals',color='#FFE3FB',shape='cart',lead='Medical data people can trust, with every access written down.',
  ch='Connected medical devices handle sensitive data that has to stay private and auditable.',ap='Policy-based access decides who sees what. Each access is logged on a tamper-evident ledger, and data handling follows GDPR.',
  out='A clear answer whenever someone asks who touched the data.',stat=('100%','Of data access logged'),feats=['zero-trust','live-twin','ota-updates']),
 dict(slug='insurance',name='Insurance',ind='Mobility',color='#FFE7A9',shape='car',lead='Clear proof of who drove, when, and how carefully.',
  ch='With shared cars it’s hard to know who was driving when something happened.',ap='The vehicle’s avatar records trips and driver identity, signed and stored so nobody can change them later.',
  out='Faster and fairer claims.',stat=('1 tap','To share proof of a trip'),feats=['live-twin','zero-trust','edge-ai']),
 dict(slug='agriculture',name='Agriculture',ind='Farming',color='#E9FAC0',shape='tractor',lead='Tractors that only take orders they can verify.',
  ch='Connected farm machines are a target, and a hijacked tractor is a real danger.',ap='Every command and every update is signed. Unknown devices are blocked before they reach the machine.',
  out='Farmers get connected features without giving up control.',stat=('0','Unverified commands accepted'),feats=['zero-trust','ota-updates','remote-control']),
 dict(slug='security',name='Security',ind='Fleets',color='#DBF5F0',shape='shield',lead='Spot an intruder anywhere in the fleet, the moment it happens.',
  ch='Fleets have thousands of entry points, and attacks often look like normal traffic.',ap='Edge AI on each machine learns what normal looks like and flags anything odd, while Zero Trust blocks unknown devices.',
  out='Problems are caught at the edge, before they spread.',stat=('Edge','Where anomalies are flagged first'),feats=['edge-ai','zero-trust','live-twin']),
]
PROJ=[('metacities','MetaCities',2023,2026,'#FFE7A9','globe','Digital twins of urban life, from traffic to public services.'),
      ('6g-icarus','6G-ICARUS',2024,2028,'#DCEBFA','chip','Intelligent 6G networks that adapt to the machines they connect.'),
      ('isac-newton','ISAC-NEWTON',2025,2029,'#DBF5F0','globe','Networks that sense as well as talk, for safer shared spaces.'),
      ('referee','REFEREE',2026,2029,'#FFE3FB','shield','Verification and trust for autonomous systems.'),
      ('ecoagent-6g','EcoAgent-6G',2026,2029,'#E9FAC0','bolt','AI agents that cut the energy use of networks and fleets.'),
      ('terahealth','TeraHealth',2027,2029,'#E3E3FF','cart','Terahertz links and secure data for connected care.')]

def feat_card(f):
    return f'<a class="card" href="/platform/{f["slug"]}" style="background:{f["color"]}" data-tilt data-rv><span class="mono">Platform</span><h3>{f["name"]}</h3><p>{f["lead"]}</p><img alt="" data-dot="{f["icon"]}" data-cell="7"><span class="go">Learn more <i>→</i></span></a>'
def case_card(c):
    return f'<a class="case-card" href="/machines/{c["slug"]}" data-ind="{c["ind"]}" style="background:{c["color"]}" data-tilt data-rv><span class="mono">{c["ind"]}</span><img alt="" data-dot="{c["shape"]}" data-cell="6" data-size="300"><h3>{c["name"]}</h3><p>{c["lead"]}</p><span class="go">Read the case →</span></a>'

# ---------- pages ----------
# platform hub
body=hero(crumb(('Platform',None)),'One avatar.<br>Five powers.','SmartAvatar’s real-time platform gives every machine a live, trusted avatar. These are the five things it does.','avatar','#DCEBFA','Platform',more('Book a demo','/contact')+more('See it on machines','/machines',True))
body+=f'<section class="wrap sec"><div class="sh"><h2 class="dt">What it does</h2><p>Pick one to see how it works, with a small demo you can try.</p></div><div class="grid g3">{"".join(feat_card(f) for f in FEAT)}<div class="card" style="background:var(--ink);color:#fff" data-rv><span class="mono" style="color:#aaa">From cloud to edge</span><h3>All five work together</h3><p style="color:#ddd">The live twin carries the data, OTA keeps software current, remote control lets people act, edge AI decides on the spot, and Zero Trust guards all of it.</p></div></div></section>'
body+=f'<section class="sec alt"><div class="wrap"><div class="sh"><h2 class="dt">How it fits</h2><p>Three layers, one avatar per machine.</p></div><div class="steps"><div class="step" data-rv><b>Machine</b><p>A small agent on the machine or a gateway nearby collects data and runs edge models.</p></div><div class="step" data-rv><b>Avatar</b><p>The live twin lives in the platform, with its own policies, history and software state.</p></div><div class="step" data-rv><b>Your apps</b><p>Dashboards, control rooms and partner services talk to the avatar through one secure interface.</p></div></div></div></section>'
body+=cta('See the platform on your own machines.')
page('platform','Platform · SmartAvatar','The SmartAvatar platform gives every machine a live, trusted avatar: live twin, OTA updates, remote control, edge AI and Zero Trust.','platform',body)
# feature pages
for i,f in enumerate(FEAT):
    nxt=FEAT[(i+1)%len(FEAT)]
    rel=[c for c in CASES if f['slug'] in c['feats']][:3]
    btns=''.join(f'<button class="more" data-act="{a}">{l} <i>→</i></button>' for a,l in f['btns'])
    extra=('<label class="mono" style="display:flex;flex-direction:column;gap:8px">Vibration<input type="range" min="0" max="100" value="20"></label>' if f['demo']=='edge-ai' else '')
    body=hero(crumb(('Platform','/platform'),(f['name'],None)),f['name'],f['lead'],f['icon'],f['color'],'Platform · '+f['name'],more('Try the demo','#demo')+more('Book a demo','/contact',True))
    body+=f'<section class="wrap sec"><div class="sh"><h2 class="dt">How it works</h2><p>Three steps, the same on every machine.</p></div><div class="steps">{"".join(f"<div class=step data-rv><b>{e(t)}</b><p>{e(d)}</p></div>" for t,d in f["steps"])}</div></section>'
    body+=f'<section class="sec alt" id="demo"><div class="wrap"><div class="sh"><h2 class="dt">Try it</h2><p>A small, simplified version of the real thing.</p></div><div class="demo" data-demo="{f["demo"]}"><div class="screen"><canvas width="320" height="200" aria-label="{e(f["name"])} demo"></canvas></div><div class="side"><span class="mono">Demo</span><h3>{e(f["dtitle"])}</h3><p>{e(f["dtext"])}</p>{extra}<div class="dbtns">{btns}</div><div class="dout" aria-live="polite"></div></div></div></div></section>'
    body+=f'<section class="wrap sec"><div class="sh"><h2 class="dt">Where it’s used</h2><p>Machines that rely on {e(f["name"].lower())}.</p></div><div class="grid g3">{"".join(case_card(c) for c in rel)}</div></section>'
    body+=f'<section class="wrap sec" style="padding-top:0"><div class="nextlink"><a href="/platform"><span class="mono">Back to</span><b>All five powers</b></a><a href="/platform/{nxt["slug"]}" style="background:{nxt["color"]}"><span class="mono">Next power</span><b>{nxt["name"]} →</b></a></div></section>'
    page('platform/'+f['slug'],f'{f["name"]} · SmartAvatar platform',f['lead'],'platform',body)
# machines hub
inds=['all']+[c['ind'] for c in CASES]
body=hero(crumb(('Machines',None)),'Six machines,<br>six stories.','The same platform, working in very different places: building sites, factories, hospitals, roads, farms and whole fleets.','crane','#E3E3FF','Machines',more('Book a demo','/contact')+more('Explore the platform','/platform',True))
body+=f'<section class="wrap sec"><div class="filters" role="group" aria-label="Filter by industry">{"".join(f"<button class={chr(34)}{"on" if x=="all" else ""}{chr(34)} data-f={chr(34)}{x}{chr(34)}>{"All" if x=="all" else x}</button>" for x in inds)}</div><div class="grid g3">{"".join(case_card(c) for c in CASES)}</div></section>'
body+=cta('Have a machine that should talk back?','Tell us about it')
page('machines','Machines · SmartAvatar','How SmartAvatar works on cranes, robots, medical carts, cars, tractors and whole fleets.','machines',body)
# case pages
for i,c in enumerate(CASES):
    nxt=CASES[(i+1)%len(CASES)]
    body=hero(crumb(('Machines','/machines'),(c['name'],None)),c['name'],c['lead'],c['shape'],c['color'],c['ind'],more('Book a demo','/contact')+more('All machines','/machines',True))
    body+=f'<section class="wrap sec"><div class="facts"><div class="fact" data-rv><span class="mono">The problem</span><p style="margin-top:10px;line-height:1.6">{e(c["ch"])}</p></div><div class="fact" data-rv><span class="mono">What SmartAvatar does</span><p style="margin-top:10px;line-height:1.6">{e(c["ap"])}</p></div><div class="fact" style="background:{c["color"]}" data-rv><span class="mono">{e(c["stat"][1])}</span><b>{e(c["stat"][0])}</b><p style="margin-top:10px;line-height:1.6">{e(c["out"])}</p></div></div></section>'
    body+=f'<section class="sec alt"><div class="wrap"><div class="sh"><h2 class="dt">Powers used</h2><p>The parts of the platform this machine relies on.</p></div><div class="grid g3">{"".join(feat_card(FBY[s]) for s in c["feats"])}</div></div></section>'
    body+=f'<section class="wrap sec"><div class="nextlink"><a href="/machines"><span class="mono">Back to</span><b>All machines</b></a><a href="/machines/{nxt["slug"]}" style="background:{nxt["color"]}"><span class="mono">Next case</span><b>{nxt["name"]} →</b></a></div></section>'
    page('machines/'+c['slug'],f'{c["name"]} · SmartAvatar',c['lead'],'machines',body)
# research hub
rows=''.join(f'<a class="tl-row" href="/research/{s}" style="--c:{col}" data-rv><b>{e(n)}</b><div class="track"><i style="left:{(a-2023)/7*100:.1f}%;width:{(b-a+1)/7*100:.1f}%"></i></div><span class="yrs mono">{a}–{b}</span></a>' for s,n,a,b,col,sh,d in PROJ)
body=hero(crumb(('Research',None)),'Six EU<br>programmes.','We work with partners across Europe on 6G, digital twins and AI you can trust, through Horizon Europe.','globe','#E9FAC0','Research',more('See the projects','#projects')+more('Work with us','/contact',True))
body+=f'<section class="wrap sec" id="projects"><div class="sh"><h2 class="dt">Timeline</h2><p>Each bar shows when a project runs. Click one to read more.</p></div><div class="tl-axis mono"><span></span><div><span>2023</span><span>2026</span><span>2029</span></div><span></span></div><div class="tl">{rows}</div></section>'
body+=f'<section class="sec alt"><div class="wrap"><div class="grid g3">{"".join(f"<a class=card href=/research/{s} style=background:{col} data-tilt data-rv><span class=mono>{a}–{b}</span><h3>{e(n)}</h3><p>{e(d)}</p><img alt={chr(34)}{chr(34)} data-dot={sh} data-cell=7><span class=go>View project <i>→</i></span></a>" for s,n,a,b,col,sh,d in PROJ)}</div></div></section>'
body+=cta('Building a consortium? Let’s talk.','Get in touch')
page('research','Research · SmartAvatar','SmartAvatar is a partner in six Horizon Europe programmes on 6G, digital twins and trustworthy AI.','research',body)
for i,(s,n,a,b,col,sh,d) in enumerate(PROJ):
    nx=PROJ[(i+1)%len(PROJ)];yrs=b-a+1
    body=hero(crumb(('Research','/research'),(n,None)),e(n),e(d),sh,col,f'Horizon Europe · {a}–{b}',more('All projects','/research')+more('Contact us','/contact',True))
    body+=f'<section class="wrap sec"><div class="facts"><div class="fact" data-rv><span class="mono">Runs</span><b>{a}–{b}</b></div><div class="fact" data-rv><span class="mono">Length</span><b>{yrs} years</b><div class="pxbar" style="margin-top:14px">{"<i></i>"*(yrs*10)}</div></div><div class="fact" style="background:{col}" data-rv><span class="mono">Programme</span><b>Horizon Europe</b></div></div></section>'
    body+=f'<section class="wrap sec" style="padding-top:0"><div class="prose" data-rv><h2>About the project</h2><p>{e(d)}</p><h2>Our part</h2><p>SmartAvatar takes part as a technology partner. We bring our work on live digital twins, edge AI and Zero Trust security for connected machines, and test ideas from the project on real equipment.</p><p>For partner details or project results, please <a href="/contact" style="text-decoration:underline">get in touch</a>.</p><p class="mono" style="font-size:11px;color:var(--grey);margin-top:28px">Funded by the European Union under Horizon Europe. Views and opinions expressed are those of the authors only.</p></div></section>'
    body+=f'<section class="wrap sec" style="padding-top:0"><div class="nextlink"><a href="/research"><span class="mono">Back to</span><b>All projects</b></a><a href="/research/{nx[0]}" style="background:{nx[4]}"><span class="mono">Next project</span><b>{e(nx[1])} →</b></a></div></section>'
    page('research/'+s,f'{n} · SmartAvatar research',d,'research',body)
# play
body=f'<section class="wrap ph" style="min-height:auto;padding-bottom:40px"><div>{crumb(("Play",None))}<h1 class="dt">Pocket<br>arcade.</h1><p class="lead">Four small games on one handheld. Start with the A4 race from Delft to Rotterdam, then swap the cartridge for snake, blocks or a shooter.</p></div><div class="card" style="background:var(--butter)" data-rv><span class="mono">Why games?</span><h3>Real life, smaller screen</h3><p>Our operators steer real cranes from kilometres away. These games run on the same idea: you press, something far away moves.</p></div></section>'
body+=f'<section class="app" id="play" style="padding-top:20px"><div class="wrap">{arena}\n</div></section>'
page('play','Play · SmartAvatar pocket arcade','Four pixel games on one handheld: race, snake, blocks and shooter. Remote control, made playable.','play',body,'<script src="/assets/arcade.js"></script>')
# team
body=hero(crumb(('Team',None)),'Who we are','A small team of engineers and researchers in the Netherlands, Bangladesh and Taiwan, building software for real machines.','people','#FFE3FB','Team',more('Work with us','#careers')+more('Contact','/contact',True))
offices=[('Delft','HQ · Registered office','Where it started, and where most of the work still happens.','#FFE7A9','Europe/Amsterdam','house'),('Amsterdam','By appointment','For partners and projects.','#DCEBFA','Europe/Amsterdam','globe'),('Mountain View','By appointment','For our US partners.','#DBF5F0','America/Los_Angeles','bolt')]
body+=f'<section class="wrap sec"><div class="sh"><h2 class="dt">Offices</h2><p>Three places, one team. The clocks are live.</p></div><div class="grid g3">{"".join(f"<div class=card2 style=background:{c} data-tilt data-rv><span class=mono>{e(k)}</span><h3 class=dt>{e(n)}</h3><p>{e(d)}</p><div class=tclk data-tz={tz}></div><img alt={chr(34)}{chr(34)} data-dot={ic} data-cell=10 data-size=144></div>" for n,k,d,c,tz,ic in offices)}</div></section>'
vals=[('Built for real machines','Everything we make has to work on equipment that is dirty, remote and expensive to stop.'),('Security first','Zero Trust isn’t a feature we add later. It’s how the platform is built.'),('Small team, real ownership','Engineers talk to customers, and researchers ship code.')]
body+=f'<section class="sec alt"><div class="wrap"><div class="sh"><h2 class="dt">How we work</h2></div><div class="steps">{"".join(f"<div class=step data-rv><b>{e(t)}</b><p>{e(d)}</p></div>" for t,d in vals)}</div></div></section>'
body+=f'<section class="wrap sec" id="careers"><div class="grid g2"><div class="card" style="background:var(--lime)" data-rv><span class="mono">Careers</span><h3>Want to build for real machines?</h3><p>We don’t list fixed roles right now. If you work on embedded systems, distributed software, security or AI, send us a short note about what you’d like to build.</p><a class="more" href="mailto:info@smartavatar.nl?subject=Open%20application">Send a note <i>→</i></a></div><a class="card" href="https://tuliptech.nl" target="_blank" rel="noopener" style="background:var(--lav)" data-tilt data-rv><span class="mono">Sister studio</span><h3>TulipTech</h3><p>Custom SaaS, AI mobile apps and medical AI.</p><img alt="" data-dot="avatar" data-cell="8"><span class="go">Visit tuliptech.nl <i>↗</i></span></a></div></section>'
body+=cta('Let’s build something that moves.','Say hi')
page('team','Team · SmartAvatar','Engineers and researchers in the Netherlands, Bangladesh and Taiwan, with offices in Delft, Amsterdam and Mountain View.','team',body)
# consulting
body=hero(crumb(('Consulting',None)),'We help<br>build it.','Beyond the platform, we help teams plan and deliver connected-machine projects, find funding and get security right.','chip','#FFFFFF','Consulting',more('Book a call','/contact'))
svc=[('Tech project consulting','From first idea to a working pilot: architecture, vendor choices and hands-on engineering.','#DCEBFA','robot'),('Secure innovation funding','Help finding and writing proposals for EU and national innovation programmes.','#E9FAC0','globe'),('Zero Trust security','Review and design of access, identity and logging for connected equipment.','#FFE3FB','shield')]
body+=f'<section class="wrap sec"><div class="grid g3">{"".join(f"<div class=card style=background:{c} data-tilt data-rv><span class=mono>Service</span><h3>{e(t)}</h3><p>{e(d)}</p><img alt={chr(34)}{chr(34)} data-dot={ic} data-cell=7></div>" for t,d,c,ic in svc)}</div></section>'
body+=f'<section class="sec alt"><div class="wrap"><div class="sh"><h2 class="dt">How we work</h2></div><div class="steps"><div class="step" data-rv><b>Talk</b><p>A short call to understand the machines, the people and the goal.</p></div><div class="step" data-rv><b>Plan</b><p>A clear plan with scope, risks and costs, written so everyone can read it.</p></div><div class="step" data-rv><b>Build</b><p>We work alongside your team until the pilot runs on real equipment.</p></div></div></div></section>'
body+=cta('Have a project in mind?','Book a call')
page('consulting','Consulting · SmartAvatar','Tech project consulting, secure innovation funding and Zero Trust security for connected machines.','team',body)
# banded
body=hero(crumb(('BÅNDED',None)),'BÅNDED','Our programme for public and non-profit organisations: cities, institutions, universities and NGOs.','people','#FFE3FB','Programme',more('Get in touch','/contact'))
grp=[('Institutions & cities','Digital twins and secure connectivity for public services and city equipment.','#FFE7A9','house'),('Universities & NGOs','Research partnerships and access to the platform for projects with public value.','#DCEBFA','globe'),('BåndFixIt','A practical track within BÅNDED. Ask us how it could work for your organisation.','#DBF5F0','chip')]
body+=f'<section class="wrap sec"><div class="grid g3">{"".join(f"<div class=card style=background:{c} data-tilt data-rv><span class=mono>BÅNDED</span><h3>{e(t)}</h3><p>{e(d)}</p><img alt={chr(34)}{chr(34)} data-dot={ic} data-cell=7></div>" for t,d,c,ic in grp)}</div></section>'
body+=cta('Working on something for the public good?','Talk to us')
page('banded','BÅNDED · SmartAvatar','BÅNDED brings SmartAvatar to cities, institutions, universities and NGOs.','team',body)
# contact
body=f'<section class="wrap ph" style="align-items:start"><div>{crumb(("Contact",None))}<h1 class="dt">Say hi.</h1><p class="lead">Tell us about your machines. We usually reply within two working days.</p><div class="grid" style="margin-top:28px;max-width:420px"><div class="card" style="min-height:auto;background:var(--butter)"><span class="mono">Email</span><h3 style="font-size:24px">info@smartavatar.nl</h3></div><div class="card" style="min-height:auto"><span class="mono">Delft · HQ</span><p>Registered office, Delft, the Netherlands. <span class="clk" data-tz="Europe/Amsterdam"></span></p></div></div></div>'
body+='<form class="form" id="cform" data-rv novalidate><label>Name<input name="name" autocomplete="name" required></label><label>Email<input name="email" type="email" autocomplete="email" required></label><label>Company<input name="company" autocomplete="organization"></label><label>Machines<select name="machine"><option>Robots</option><option>Vehicles</option><option>Heavy equipment</option><option>Medical devices</option><option>Farm machines</option><option>Something else</option></select></label><label class="full">Message<textarea name="msg" placeholder="What would you like your machines to do?"></textarea></label><button class="more" type="submit">Send <i>→</i></button><p class="full mono" style="font-size:10.5px;color:var(--grey)">This opens your own email app with the message filled in. Nothing is stored on this site.</p></form></section>'
page('contact','Contact · SmartAvatar','Book a demo or ask a question. SmartAvatar, Delft, the Netherlands.','contact',body)
# verify
body=f'<section class="wrap ph" style="min-height:70svh"><div>{crumb(("Verify certificate",None))}<h1 class="dt">Verify a<br>certificate.</h1><p class="lead">Got a SmartAvatar certificate? Enter its ID to check it.</p><form class="form" id="vform" style="grid-template-columns:1fr;margin-top:24px;max-width:520px"><label>Certificate ID<input name="cid" placeholder="SA-1234-ABCD" autocomplete="off"></label><button class="more" type="submit">Check <i>→</i></button></form><div id="vout" class="vout" aria-live="polite">IDs look like SA-1234-ABCD.</div></div><div class="art" style="--c:#DBF5F0"><span class="tag mono">Verify</span><canvas class="ill" data-shape="shield" aria-label="Shield illustration"></canvas></div></section>'
page('verify','Verify a certificate · SmartAvatar','Check a SmartAvatar certificate ID.','',body)
# legal
def legal(slug,title,parts):
    b=f'<section class="wrap sec" style="padding-top:140px">{crumb((title,None))}<h1 class="dt" style="font-size:clamp(44px,6vw,90px)">{title}</h1><div class="prose" style="margin-top:20px"><p>This is a plain-language summary. For the full legal text, email <a href="mailto:info@smartavatar.nl" style="text-decoration:underline">info@smartavatar.nl</a>.</p>'
    for h,p in parts: b+=f'<h2>{h}</h2><p>{p}</p>'
    b+='</div></section>'
    page(slug,f'{title} · SmartAvatar',f'{title} for smartavatar.nl, in plain language.','',b)
legal('privacy','Privacy',[('What we collect','This website doesn’t use tracking cookies or analytics. It stores only small things in your own browser, like your game high scores.'),('Contact form','The contact form opens your own email app. We only see what you choose to send us.'),('Your rights','You can ask what data we hold about you, and ask us to correct or delete it, under the GDPR.'),('Who we are','SmartAvatar B.V., Delft, the Netherlands.')])
legal('terms','Terms',[('Using this site','You’re welcome to browse, play the games and share links. Please don’t try to break or overload the site.'),('Content','Text, images and code on this site belong to SmartAvatar unless stated otherwise.'),('No warranty','We do our best to keep information correct, but it’s provided as is.'),('Questions','Email info@smartavatar.nl.')])
# 404
body='<section class="err"><div><h1 class="dt">404</h1><p>This page wandered off. Our robots are looking for it.</p><div style="display:flex;gap:10px;justify-content:center;margin-top:26px;flex-wrap:wrap"><a class="more" href="/">Back home <i>→</i></a><a class="more ghost" href="/play">Play a game <i>→</i></a></div><canvas class="ill" data-shape="robot" style="width:min(320px,70vw);height:min(320px,70vw);margin-top:30px" aria-label="Robot illustration"></canvas></div></section>'
page('404','Page not found · SmartAvatar','This page doesn’t exist.','',body)
# sitemap + robots
paths=['','platform']+['platform/'+f['slug'] for f in FEAT]+['machines']+['machines/'+c['slug'] for c in CASES]+['research']+['research/'+p[0] for p in PROJ]+['play','team','consulting','banded','contact','verify','privacy','terms']
open('sitemap.xml','w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>{SITE}/{p}</loc></url>\n' for p in paths)+'</urlset>\n')
open('robots.txt','w').write(f'User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n')
open('assets/favicon.svg','w').write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges"><rect width="16" height="16" rx="3" fill="#111"/><g fill="#FFE7A9"><rect x="4" y="4" width="8" height="6"/></g><g fill="#111"><rect x="6" y="6" width="1" height="2"/><rect x="9" y="6" width="1" height="2"/></g><rect x="7" y="2" width="2" height="2" fill="#F2A7E6"/><rect x="5" y="11" width="6" height="2" fill="#F2A7E6"/></svg>')
print('pages:',len(paths))
