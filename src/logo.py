# SA monogram: pixel letters on an ink tile with gently rounded corners
S=[".###.","#...#","#....",".###.","....#","#...#",".###."]
A=[".###.","#...#","#...#","#####","#...#","#...#","#...#"]
def tile(size=32,cell=2,fg='#FFE7A9',bg='#111111',r=7):
    w=5*cell*2+cell*2;ox=(size-w)//2;oy=(size-7*cell)//2
    rects=[]
    for gi,g in enumerate((S,A)):
        for y,row in enumerate(g):
            for x,ch in enumerate(row):
                if ch=='#':rects.append(f'<rect x="{ox+gi*(6*cell)+x*cell}" y="{oy+y*cell}" width="{cell}" height="{cell}"/>')
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" shape-rendering="crispEdges"><rect width="{size}" height="{size}" rx="{r}" fill="{bg}"/><g fill="{fg}">{"".join(rects)}</g></svg>'
open('assets/favicon.svg','w').write(tile())
open('assets/logo.svg','w').write(tile(64,4,r=14))
open('assets/logo-light.svg','w').write(tile(64,4,fg='#111111',bg='#FFE7A9',r=14))
print('logo ok')
