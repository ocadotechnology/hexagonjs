
# set up the drawing
drawing = new hx.Drawing('#drawing')
drawing.enablePan()
drawing.enableZoom()
drawing.enablePerformanceGauge()
drawing.enableSelection()

size = 10
edges = 10
#curve = ([Math.sin((2*i + 1) * Math.PI / edges) * size, Math.cos((2*i + 1) * Math.PI / edges) * size] for i in [0...edges])

curve = for i in [0...edges+1]
  [
    Math.sin((2*i + 1) * Math.PI / edges) * size
    Math.cos((2*i + 1) * Math.PI / edges) * size
    Math.sin((2*i + 2) * Math.PI / edges) * size*0.5
    Math.cos((2*i + 2) * Math.PI / edges) * size*0.5
  ]

shape = drawing.create('shape')
shape.set('curve', curve)
shape.set('fill.color', hx.theme.plot.colors[0])
shape.set('selectable', true)

shape = drawing.create('shape')
shape.set('curve', curve)
shape.set('fill.color', hx.theme.plot.colors[1])
shape.set('position.x', 10)
shape.set('position.y', 15)
shape.set('selectable', true)

shape = drawing.create('shape')
shape.set('curve', curve)
shape.set('fill.color', hx.theme.plot.colors[2])
shape.set('position.x', -10)
shape.set('position.y', 15)
shape.set('selectable', true)

drawing.follow(drawing)


