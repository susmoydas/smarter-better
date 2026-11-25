# SmartAvatar mark: an animated pixel avatar (blinks, antenna light pulses, gentle bob)
INK='#111111';P='#8B6CF0';PL='#E6DEFF';PK='#F2A7E6';W='#FFFFFF'
G=["......#.........",
   "......k.........",
   "......#.........",
   "...##########...",
   "..#pppppppppp#..",
   ".#pppppppppppp#.",
   ".#pwwwwwwwwwwp#.",
   ".#pwwwwwwwwwwp#.",
   ".#pwwwwwwwwwwp#.",
   ".#pwwwwwwwwwwp#.",
   ".#pcppppppppcp#.",
   "..#pppppppppp#..",
   "...##########...",
   "....#llllll#....",
   "..##llllllll##..",
   ".#llllllllllll#."]
EYES=[(5,7),(5,8),(10,7),(10,8)]
def svg(size=64,anim=True):
    s=size/16;fill={'#':INK,'p':P,'w':W,'c':PK,'l':PL}
    head,body=[],[]
    for y,row in enumerate(G):
        for x,ch in enumerate(row):
            if ch=='k':continue
            if ch in fill:(body if y>=13 else head).append(f'<rect x="{x*s:g}" y="{y*s:g}" width="{s:g}" height="{s:g}" fill="{fill[ch]}"/>')
    eyes=''.join(f'<rect x="{x*s:g}" y="{y*s:g}" width="{s:g}" height="{s:g}"/>' for x,y in EYES)
    css=('<style>.h{animation:b 2.4s steps(1) infinite}.e{transform-origin:50% 47%;transform-box:view-box;animation:k 4s steps(1) infinite}.t{animation:t 1.2s steps(1) infinite}'
         '@keyframes b{50%{transform:translateY('+format(-s*0.5,'g')+'px)}}@keyframes k{0%,92%,100%{transform:scaleY(1)}94%,98%{transform:scaleY(.15)}}@keyframes t{50%{fill:'+P+'}}</style>') if anim else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" shape-rendering="crispEdges">{css}'
            f'<g class="h">{"".join(head)}<rect class="t" x="{6*s:g}" y="{1*s:g}" width="{s:g}" height="{s:g}" fill="{PK}"/><g class="e" fill="{INK}">{eyes}</g></g>{"".join(body)}</svg>')
open('assets/logo.svg','w').write(svg(64))
open('assets/favicon.svg','w').write(svg(32))
open('assets/logo-static.svg','w').write(svg(64,False))
import os
if os.path.exists('assets/logo-light.svg'):os.remove('assets/logo-light.svg')
print('logo ok')
