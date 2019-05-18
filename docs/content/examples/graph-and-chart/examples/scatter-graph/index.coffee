

graph = new hx.Graph('#scatter-graph')
axis = graph.addAxis({
  x:
    title: 'x'
  y:
    title: 'y'
})

r = -> 0.5 + (Math.random()-0.5)*(Math.random()-0.5)

points = 2000 # Number of points on graph

scale = new hx.ColorScale(0, points,[
  {color: hx.theme.plot.colors[2], val:2/5}
  {color: hx.theme.plot.colors[1], val:1/5}
  {color: hx.theme.plot.colors[4], val:4/5}
  {color: hx.theme.plot.colors[3], val:3/5}
  {color: hx.theme.plot.colors[0], val:0}
  {color: hx.theme.plot.colors[5], val:1}
])

data = hx.range(points).map((d) -> {x: d/points, y: Math.pow(d/points, 2) + r(), fillColor: scale.apply(d+Math.random()*500-250), radius: Math.random()*Math.random()*10})

series = axis.addSeries('scatter', {
  title: 'Scatter Series'
  data: data
})

graph.render()
