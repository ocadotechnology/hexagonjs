drawing = new hx.Drawing('#drawing')
drawing.enablePerformanceGauge()
drawing.enableZoom()
drawing.enablePan()

drawing.camera.position.x = drawing.width/2
drawing.camera.position.y = drawing.height/2

circles = (drawing.create('circle') for _ in [0..1000])

for circle, i in circles

  # initial value
  circle.set('position.x', drawing.width/2)
  circle.set('position.y', drawing.height/2)
  circle.set('radius', 2)
  circle.set('fill.color', hx.cycle(hx.theme.plot.colors, i))

  # animate
  circle.set('position.x', (Math.random() - 0.5) * drawing.width/2 + drawing.width/2 , 100 + Math.random() * 5000)
  circle.set('position.y', (Math.random() - 0.5) * drawing.height/2 + drawing.height/2, 100 + Math.random() * 5000)
  circle.set('radius', 10, 10000)
  circle.set('fill.color', hx.theme.plot.colors[0], 10000)