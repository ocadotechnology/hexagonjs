
# set up the drawing
drawing = new hx.Drawing('#drawing')
drawing.enablePan()
drawing.enableZoom()
drawing.enablePerformanceGauge()
drawing.enableSelection()

drawing.on 'select', (obj) ->
  drawing.follow(obj)

size = 10
edges = 10

curve = for i in [0...edges+1]
  [
    Math.sin((2*i + 1) * Math.PI / edges) * size
    Math.cos((2*i + 1) * Math.PI / edges) * size
    Math.sin((2*i + 2) * Math.PI / edges) * size*0.5
    Math.cos((2*i + 2) * Math.PI / edges) * size*0.5
  ]

composite = drawing.create('composite')
composite.set('selectable', true)

composite.create('shape', 'one')
composite.create('shape', 'two')
composite.create('shape', 'three')

composite.set('one.curve', curve)
composite.set('one.fill.color', hx.theme.plot.colors[0])

composite.set('two.curve', curve)
composite.set('two.fill.color', hx.theme.plot.colors[1])
composite.set('two.position.x', 10)
composite.set('two.position.y', 15)

composite.set('three.curve', curve)
composite.set('three.fill.color', hx.theme.plot.colors[2])
composite.set('three.position.x', -10)
composite.set('three.position.y', 15)


drawing.follow(drawing)



