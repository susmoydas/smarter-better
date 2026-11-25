# Inner pages, built from scenes that match the home page (run via build.py)
import json
STEP_SHAPES={'live-twin':['crane','avatar','globe'],'ota-updates':['chip','bolt','shield'],'remote-control':['shield','pad','car'],'edge-ai':['globe','chip','robot'],'zero-trust':['people','shield','chip']}
TOP_FEAT={c['slug']:c['feats'][0] for c in CASES}
FEAT_ICON={f['slug']:f['icon'] for f in FEAT}
def J(x): return e(json.dumps(x,ensure_ascii=False))
def dwhero(word,crumbs,lead,acts='',fill=.9):
    return f'''<section class="dwh"><div class="wrap">{crumbs}</div><h1 class="sr">{e(word)}</h1>
<canvas class="dw" data-word="{e(word)}" data-fill="{fill}" data-scroll aria-hidden="true"></canvas>
<div class="wrap dwh-b"><p class="lead">{lead}</p><div class="acts">{acts}</div></div><div class="kidhint mono"><i></i>scroll</div></section>'''
def ms(steps): return f'<section class="ms" data-steps="{J(steps)}"><div class="ms-pin"><div class="ms-text"></div><canvas aria-hidden="true"></canvas></div></section>'
def nextbig(word,href,label): return f'<section class="wrap"><a class="nextbig" href="{href}" data-c="go"><span class="mono">{e(label)}</span><canvas class="dw" data-word="{e(word)}" data-fill=".8" aria-hidden="true"></canvas><span class="sr">{e(word)}</span></a></section>'
def cartl(href,label,color,shape): return f'<a class="cartl" href="{href}" style="--c:{color}"><span class="lab"><img alt="" data-dot="{shape}" data-cell="9" data-size="120"><b>{e(label.upper())}</b></span></a>'
def case_card(c): return f'<a class="case-card" href="/machines/{c["slug"]}" style="background:{c["color"]}" data-tilt><span class="mono">{c["ind"]}</span><img alt="" data-dot="{c["shape"]}" data-cell="6" data-size="300"><h3>{c["name"]}</h3><p>{c["lead"]}</p><span class="go">Read the case →</span></a>'

# platform hub: the five powers as one morph story
body=dwhero('Platform',crumb(('Platform',None)),'Our real-time platform gives every machine a live, trusted avatar.',more('Book a demo','/contact'))
body+=ms([dict(shape=f['icon'],color=f['color'],kicker='Power',title=f['name'],text=f['lead'],href='/platform/'+f['slug'],cta='Open '+f['name']) for f in FEAT])
body+=nextbig('Machines','/machines','Next')
page('platform','Platform · SmartAvatar','The SmartAvatar platform gives every machine a live, trusted avatar: live twin, OTA updates, remote control, edge AI and Zero Trust.','platform',body)

# feature pages: steps as a morph story, a playable demo, the machines that use it
for i,f in enumerate(FEAT):
    nxt=FEAT[(i+1)%len(FEAT)];rel=[c for c in CASES if f['slug'] in c['feats']][:4]
    btns=''.join(f'<button class="more" data-act="{a}">{l} <i>→</i></button>' for a,l in f['btns'])
    extra=('<label class="mono" style="display:flex;flex-direction:column;gap:8px">Vibration<input type="range" min="0" max="100" value="20"></label>' if f['demo']=='edge-ai' else '')
    body=dwhero(f['name'],crumb(('Platform','/platform'),(f['name'],None)),f['lead'],more('Try it','#demo'),.86)
    body+=ms([dict(shape=STEP_SHAPES[f['slug']][k],color=f['color'],kicker='How it works',title=t,text=d) for k,(t,d) in enumerate(f['steps'])])
    body+=f'<section class="sec" id="demo"><div class="wrap"><div class="sh"><h2 class="dt">Try it</h2></div><div class="demo" data-demo="{f["demo"]}"><div class="screen"><canvas width="320" height="200" aria-label="{e(f["name"])} demo"></canvas></div><div class="side"><span class="mono">Demo</span><h3>{e(f["dtitle"])}</h3><p>{e(f["dtext"])}</p>{extra}<div class="dbtns">{btns}</div><div class="dout" aria-live="polite"></div></div></div></div></section>'
    body+=f'<section class="sec alt"><div class="wrap split"><div><h2 class="dt">Used on</h2></div><div class="carts-row">{"".join(cartl("/machines/"+c["slug"],c["name"],c["color"],c["shape"]) for c in rel)}</div></div></section>'
    body+=nextbig(nxt['name'],'/platform/'+nxt['slug'],'Next power')
    page('platform/'+f['slug'],f'{f["name"]} · SmartAvatar platform',f['lead'],'platform',body)

# machines hub: a sideways gallery
body=dwhero('Machines',crumb(('Machines',None)),'Six places where the same platform runs.',more('Book a demo','/contact'))
body+=f'<section class="hg"><div class="wrap hg-head"><h2 class="dt">Six machines,<br>six stories.</h2></div><div class="hg-track">{"".join(case_card(c) for c in CASES)}</div><div class="hg-bar"><i></i></div></section>'
body+=nextbig('Platform','/platform','Next')
page('machines','Machines · SmartAvatar','How SmartAvatar works on cranes, robots, medical carts, cars, tractors and whole fleets.','machines',body)

# case pages: problem → what we do → result, as a morph story
for i,c in enumerate(CASES):
    nxt=CASES[(i+1)%len(CASES)];tf=TOP_FEAT[c['slug']]
    body=dwhero(c['name'],crumb(('Machines','/machines'),(c['name'],None)),c['lead'],more('Book a demo','/contact'),.86)
    body+=ms([dict(shape=c['shape'],color=c['color'],kicker=c['ind'],title='The problem',text=c['ch']),
              dict(shape='avatar',color=c['color'],kicker=c['ind'],title='What SmartAvatar does',text=c['ap']),
              dict(shape=FEAT_ICON[tf],color=c['color'],kicker=c['ind'],title='The result',text=c['out'])])
    body+=f'<section class="sec alt"><div class="wrap split"><div><h2 class="dt">Powers used</h2></div><div class="carts-row">{"".join(cartl("/platform/"+s,FBY[s]["name"],FBY[s]["color"],FBY[s]["icon"]) for s in c["feats"])}</div></div></section>'
    body+=nextbig(nxt['name'],'/machines/'+nxt['slug'],'Next machine')
    page('machines/'+c['slug'],f'{c["name"]} · SmartAvatar',c['lead'],'machines',body)

# research hub: walk the years
PJ=[dict(slug=s,name=n,start=a,end=b,color=col) for s,n,a,b,col,sh,d in PROJ]
body=dwhero('Research',crumb(('Research',None)),'SmartAvatar is a partner in six Horizon Europe projects.',more('Work with us','/contact'))
body+=f'<section class="level" data-projects="{J(PJ)}"><div class="lv-pin"><canvas aria-hidden="true"></canvas><div class="lv-ui"><div class="lv-year">2023</div><div class="lv-list" aria-live="polite"></div></div></div></section>'
body+=f'<section class="sec"><div class="wrap split"><div><h2 class="dt">All six</h2></div><div class="carts-row">{"".join(cartl("/research/"+s,n,col,sh) for s,n,a,b,col,sh,d in PROJ)}</div></div></section>'
body+=nextbig('Team','/team','Next')
page('research','Research · SmartAvatar','SmartAvatar is a partner in six Horizon Europe programmes on 6G, digital twins and trustworthy AI.','research',body)
for i,(s,n,a,b,col,sh,d) in enumerate(PROJ):
    nx=PROJ[(i+1)%len(PROJ)]
    body=dwhero(n,crumb(('Research','/research'),(n,None)),e(d),more('All projects','/research'),.86)
    body+=f'<section class="sec"><div class="wrap"><div class="sh"><h2 class="dt">{a}–{b}</h2><p>Horizon Europe · {b-a+1} years</p></div><canvas class="ytrack" data-start="{a}" data-end="{b}" data-color="{col}" aria-label="Project runs {a} to {b}"></canvas></div></section>'
    body+=f'<section class="sec alt"><div class="wrap split"><div><h2 class="dt">Our part</h2><p>SmartAvatar is a partner in {e(n)}. For details, <a href="/contact" style="text-decoration:underline">get in touch</a>.</p><p class="mono" style="font-size:10.5px;color:var(--grey);margin-top:24px">Funded by the European Union under Horizon Europe. Views and opinions expressed are those of the authors only.</p></div><div class="art" style="--c:{col};position:relative;aspect-ratio:1;border-radius:28px;background:{col}"><canvas class="ill" data-shape="{sh}" style="position:absolute;inset:6%;width:88%;height:88%" aria-hidden="true"></canvas></div></div></section>'
    body+=nextbig(nx[1],'/research/'+nx[0],'Next project')
    page('research/'+s,f'{n} · SmartAvatar research',d,'research',body)

# play
body=dwhero('Play',crumb(('Play',None)),'Four small games on one handheld.',more('Start playing','#play'))
body+=f'<section class="app" id="play" style="padding-top:20px"><div class="wrap">{arena}\n</div></section>'
page('play','Play · SmartAvatar pocket arcade','Four pixel games on one handheld: race, snake, blocks and shooter. Remote control, made playable.','play',body,'<script src="/assets/arcade.js"></script>')

# team
body=dwhero('Team',crumb(('Team',None)),'Engineers and researchers in the Netherlands, Bangladesh and Taiwan.',more('Work with us','#careers'))
offices=[('Delft','HQ · Registered office','Delft, the Netherlands.','#FFE7A9','Europe/Amsterdam'),('Amsterdam','By appointment','Amsterdam, the Netherlands.','#DCEBFA','Europe/Amsterdam'),('Mountain View','By appointment','California, United States.','#DBF5F0','America/Los_Angeles')]
body+=f'<section class="sec"><div class="wrap"><div class="sh"><h2 class="dt">Offices</h2></div><div class="team">{"".join(f"<div class=card2 style=background:{c} data-tilt><span class=mono>{e(k)}</span><h3 class=dt>{e(n)}</h3><p>{e(d)}</p><div class=tclk data-tz={tz}></div><canvas class=osky data-tz={tz} width=240 height=80 aria-hidden=true></canvas></div>" for n,k,d,c,tz in offices)}</div></div></section>'
body+=f'<section class="sec" id="careers"><div class="wrap split"><div><h2 class="dt">Join us</h2><p>Want to work with us? Send us a note.</p><a class="more" href="mailto:info@smartavatar.nl?subject=Open%20application">Send a note <i>→</i></a></div><div class="carts-row">{cartl("/consulting","Consulting","#DCEBFA","chip")}{cartl("/banded","BÅNDED","#FFE3FB","people")}<a class="cartl" href="https://tuliptech.nl" target="_blank" rel="noopener" style="--c:#E3E3FF"><span class="lab"><img alt="" data-dot="avatar" data-cell="9" data-size="120"><b>TULIPTECH ↗</b></span></a></div></div></section>'
body+=nextbig('Say hi','/contact','Next')
page('team','Team · SmartAvatar','Engineers and researchers in the Netherlands, Bangladesh and Taiwan, with offices in Delft, Amsterdam and Mountain View.','team',body)

# consulting and BÅNDED: one morph story each
body=dwhero('Consulting',crumb(('Consulting',None)),'Tech project consulting, innovation funding and Zero Trust security.',more('Book a call','/contact'),.86)
body+=ms([dict(shape='robot',color='#DCEBFA',kicker='Service',title='Tech project consulting',text='Help with planning and delivering technology projects.'),
          dict(shape='globe',color='#E9FAC0',kicker='Service',title='Secure innovation funding',text='Help with finding and applying for innovation funding.'),
          dict(shape='shield',color='#FFE3FB',kicker='Service',title='Zero Trust security',text='Help with Zero Trust security for connected equipment.',href='/contact',cta='Book a call')])
body+=nextbig('Say hi','/contact','Next')
page('consulting','Consulting · SmartAvatar','Tech project consulting, secure innovation funding and Zero Trust security for connected machines.','team',body)
body=dwhero('BÅNDED',crumb(('BÅNDED',None)),'For institutions, cities, universities and NGOs.',more('Get in touch','/contact'))
body+=ms([dict(shape='house',color='#FFE7A9',kicker='BÅNDED',title='Institutions & cities',text='For institutions and cities.'),
          dict(shape='globe',color='#DCEBFA',kicker='BÅNDED',title='Universities & NGOs',text='For universities and NGOs.'),
          dict(shape='chip',color='#DBF5F0',kicker='BÅNDED',title='BåndFixIt',text='Ask us about BåndFixIt.',href='/contact',cta='Ask us')])
body+=nextbig('Say hi','/contact','Next')
page('banded','BÅNDED · SmartAvatar','BÅNDED brings SmartAvatar to cities, institutions, universities and NGOs.','team',body)

# contact: chat with the bot
body=dwhero('Say hi',crumb(('Contact',None)),'Tell our bot about your machines.',more('Start chatting','#chat'),.7)
body+=f'''<section class="sec" id="chat"><div class="wrap term-wrap"><div><h2 class="dt" style="font-size:clamp(34px,4.4vw,68px);line-height:.95">One question<br>at a time.</h2><p class="lead">At the end, your own email app opens with the message filled in.</p>
<div class="carts-row" style="margin-top:24px"><div class="cartl" style="--c:#FFE7A9;width:auto;aspect-ratio:auto"><span class="lab"><span class="mono">Email</span><b style="font-size:16px">info@smartavatar.nl</b></span></div><div class="cartl" style="--c:#DCEBFA;width:auto;aspect-ratio:auto"><span class="lab"><span class="mono">Delft · HQ</span><b style="font-size:16px"><span class="clk" data-tz="Europe/Amsterdam"></span> now</b></span></div></div></div>
<div id="term"><div class="tm-head"><canvas class="tm-bot" width="72" height="72" aria-hidden="true"></canvas><div><b>SmartAvatar bot</b><span class="mono" style="color:var(--grey)">online</span></div></div><div class="tm-log" aria-live="polite"></div><div class="tm-chips"></div><form autocomplete="on"><input aria-label="Your answer" placeholder="Type here and press Enter"><button class="more" type="submit">Send <i>→</i></button></form></div></div></section>'''
page('contact','Contact · SmartAvatar','Book a demo or ask a question. SmartAvatar, Delft, the Netherlands.','contact',body)

# verify
body=dwhero('Verify',crumb(('Verify certificate',None)),'Enter a SmartAvatar certificate ID to check it.','',.7)
body+=f'<section class="sec"><div class="wrap split"><div><form class="form" id="vform" style="grid-template-columns:1fr"><label>Certificate ID<input name="cid" placeholder="SA-1234-ABCD" autocomplete="off"></label><button class="more" type="submit">Check <i>→</i></button></form><div id="vout" class="vout" aria-live="polite">IDs look like SA-1234-ABCD.</div></div><div style="position:relative;aspect-ratio:1;border-radius:28px;background:#DBF5F0"><canvas class="ill" data-shape="shield" style="position:absolute;inset:6%;width:88%;height:88%" aria-hidden="true"></canvas></div></div></section>'
page('verify','Verify a certificate · SmartAvatar','Check a SmartAvatar certificate ID.','',body)

# legal
def legal(slug,title,parts):
    b=f'<div class="rbar" aria-hidden="true"><i></i></div><section class="wrap sec" style="padding-top:140px">{crumb((title,None))}<h1 class="dt" style="font-size:clamp(44px,6vw,90px)">{title}</h1><div class="prose" style="margin-top:20px"><p>A plain-language summary. For the full legal text, email <a href="mailto:info@smartavatar.nl" style="text-decoration:underline">info@smartavatar.nl</a>.</p>'
    for h,p in parts: b+=f'<h2>{h}</h2><p>{p}</p>'
    b+='</div></section>'
    page(slug,f'{title} · SmartAvatar',f'{title} for SmartAvatar, in plain language.','',b)
legal('privacy','Privacy',[('What we collect','This website doesn’t use tracking cookies or analytics. It only stores small things in your own browser, like your game high scores.'),('Contact','The contact chat opens your own email app. We only see what you choose to send us.'),('Your rights','You can ask what data we hold about you, and ask us to correct or delete it, under the GDPR.'),('Who we are','SmartAvatar B.V., Delft, the Netherlands.')])
legal('terms','Terms',[('Using this site','You’re welcome to browse, play the games and share links. Please don’t try to break or overload the site.'),('Content','Text, images and code on this site belong to SmartAvatar unless stated otherwise.'),('No warranty','We do our best to keep information correct, but it’s provided as is.'),('Questions','Email info@smartavatar.nl.')])

# 404
body='<section class="dwh" style="text-align:center"><h1 class="sr">Page not found</h1><canvas class="dw" data-word="404" data-fill=".5" aria-hidden="true"></canvas><div class="wrap"><p class="lead" style="margin:10px auto 0">This page wandered off. Push the dots around while our robots look for it.</p><div style="display:flex;gap:10px;justify-content:center;margin-top:26px;flex-wrap:wrap"><a class="more" href="/">Back home <i>→</i></a><a class="more ghost" href="/play">Play a game <i>→</i></a></div></div></section>'
page('404','Page not found · SmartAvatar','This page doesn’t exist.','',body)
