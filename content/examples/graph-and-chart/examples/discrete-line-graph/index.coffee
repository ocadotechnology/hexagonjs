
createData = (z, a, b, c, d, e) ->
  for i in [0..10]
    x: i
    y: z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100)

graph = new hx.Graph('#discrete-line-graph')
axis = graph.addAxis({
  x:
    title: 'X'
    scaleType: 'discrete'
    discreteLabels: [0..10]
  y:
    title: 'Y'
})

axis.addSeries('line', {
  title: 'Series 1'
  data: createData(0, 1, 1, 1, 1, 1)
  strokeColor: hx.theme.plot.colors[2]
  markersEnabled: true
})

axis.addSeries('line', {
  title: 'Series 2'
  data: createData(1, -1, 1, -1, 1, -1)
  strokeColor: hx.theme.plot.colors[4]
  markersEnabled: true
})

axis.addSeries('line', {
  title: 'Series 3'
  data: createData(-1, 1, -1, -1, -1, 1)
  strokeColor: hx.theme.plot.colors[5]
  markersEnabled: true
})

graph.render()
