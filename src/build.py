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
open('assets/site.css','w').write(home_css+'\n'+open('src/inner.css').read()+'\n'+open('src/scenes.css').read())
HEAD_JS="const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t,ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;gsap.registerPlugin(ScrollTrigger);const DPR=Math.min(2,devicePixelRatio||1);\n"
shapes=between('/* ================= SHAPES','/* ================= LOADER')
footjs=between('/* ================= FOOTER: dot playground','/* ===== AVATAR RUN')
open('assets/site.js','w').write('(()=>{\n'+HEAD_JS+shapes+open('src/core.js').read()+'\n'+open('src/scenes.js').read()+'\n'+footjs+'\naddEventListener("load",()=>ScrollTrigger.refresh());\n})();\n')
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
<a class="mark" href="/" aria-label="SmartAvatar home"><img src="/assets/logo.svg" alt="" width="34" height="34"></a>
<div class="top"><a href="/" tabindex="-1"><b>SmartAvatar</b></a><span class="mono" id="clock">Delft --:--</span></div>
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
 dict(slug='ota-updates',name='OTA updates',color='#E6DEFF',icon='chip',demo='ota',
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
 dict(slug='insurance',name='Insurance',ind='Mobility',color='#E6DEFF',shape='car',lead='Clear proof of who drove, when, and how carefully.',
  ch='With shared cars it’s hard to know who was driving when something happened.',ap='The vehicle’s avatar records trips and driver identity, signed and stored so nobody can change them later.',
  out='Faster and fairer claims.',stat=('1 tap','To share proof of a trip'),feats=['live-twin','zero-trust','edge-ai']),
 dict(slug='agriculture',name='Agriculture',ind='Farming',color='#E9FAC0',shape='tractor',lead='Tractors that only take orders they can verify.',
  ch='Connected farm machines are a target, and a hijacked tractor is a real danger.',ap='Every command and every update is signed. Unknown devices are blocked before they reach the machine.',
  out='Farmers get connected features without giving up control.',stat=('0','Unverified commands accepted'),feats=['zero-trust','ota-updates','remote-control']),
 dict(slug='security',name='Security',ind='Fleets',color='#DBF5F0',shape='shield',lead='Spot an intruder anywhere in the fleet, the moment it happens.',
  ch='Fleets have thousands of entry points, and attacks often look like normal traffic.',ap='Edge AI on each machine learns what normal looks like and flags anything odd, while Zero Trust blocks unknown devices.',
  out='Problems are caught at the edge, before they spread.',stat=('Edge','Where anomalies are flagged first'),feats=['edge-ai','zero-trust','live-twin']),
]
PROJ=[('metacities','MetaCities',2023,2026,'#E6DEFF','globe','Digital twins of urban life, from traffic to public services.'),
      ('6g-icarus','6G-ICARUS',2024,2028,'#DCEBFA','chip','Intelligent 6G networks that adapt to the machines they connect.'),
      ('isac-newton','ISAC-NEWTON',2025,2029,'#DBF5F0','globe','Networks that sense as well as talk, for safer shared spaces.'),
      ('referee','REFEREE',2026,2029,'#FFE3FB','shield','Verification and trust for autonomous systems.'),
      ('ecoagent-6g','EcoAgent-6G',2026,2029,'#E9FAC0','bolt','AI agents that cut the energy use of networks and fleets.'),
      ('terahealth','TeraHealth',2027,2029,'#E3E3FF','cart','Terahertz links and secure data for connected care.')]

def feat_card(f): return ''
exec(open('src/pages.py').read())
# sitemap + robots
paths=['','platform']+['platform/'+f['slug'] for f in FEAT]+['machines']+['machines/'+c['slug'] for c in CASES]+['research']+['research/'+p[0] for p in PROJ]+['play','team','consulting','banded','contact','verify','privacy','terms']
open('sitemap.xml','w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>{SITE}/{p}</loc></url>\n' for p in paths)+'</urlset>\n')
open('robots.txt','w').write(f'User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n')
open('assets/favicon.svg','w').write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges"><rect width="16" height="16" rx="3" fill="#111"/><g fill="#E6DEFF"><rect x="4" y="4" width="8" height="6"/></g><g fill="#111"><rect x="6" y="6" width="1" height="2"/><rect x="9" y="6" width="1" height="2"/></g><rect x="7" y="2" width="2" height="2" fill="#F2A7E6"/><rect x="5" y="11" width="6" height="2" fill="#F2A7E6"/></svg>')
print('pages:',len(paths))
