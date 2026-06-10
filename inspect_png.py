from PIL import Image
path = r'c:\wamp64\www\qr-bell-pages\landing page.png'
img = Image.open(path)
print('size', img.size, 'mode', img.mode)
points=[(50,50),(400,90),(1000,120),(2600,180),(1200,350),(1800,140),(100,900),(100,1200),(1500,2300)]
for p in points:
    x,y=p
    if x<img.width and y<img.height:
        print(p, img.getpixel(p))
