drawing = new hx.Drawing('#drawing')
drawing.enableZoom()
drawing.enablePan()

drawing.camera.maxZoom = 50
drawing.camera.minZoom = 0.1

for _ in [0..999] by 1
  line = drawing.create('line')
  line.set('start.x', Math.random()*1000)
  line.set('start.y', Math.random()*1000)
  line.set('end.x', Math.random()*1000)
  line.set('end.y', Math.random()*1000)
  line.set('width', 0) #dont apply the camera scale to the line widths

drawing.follow(drawing)