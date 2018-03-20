
createData = (z, a, b, c, d, e) ->
  for i in [0..50]
    x: i
    y: Math.abs(z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100))

graph = new hx.Graph('#stacked-area')
axis = graph.addAxis({
  x:
    title: 'X'
  y:
    title: 'Y'
    scalePaddingMax: 0.05
})


axis.addSeries('line', {
  title: 'Series 1'
  data: createData(0, 1, 1, 1, 1, 1)
  fillEnabled: true
  markersEnabled: true
  group: 'group-1'
  strokeColor: hx.theme.plot.colors[2]
  fillColor: hx.color(hx.theme.plot.colors[2]).alpha(0.2).toString()
})

axis.addSeries('line', {
  title: 'Series 2'
  data: createData(1, -1, 1, -1, 1, -1)
  fillEnabled: true
  markersEnabled: true
  group: 'group-1'
  strokeColor: hx.theme.plot.colors[4]
  fillColor: hx.color(hx.theme.plot.colors[4]).alpha(0.2).toString()
})

axis.addSeries('line', {
  title: 'Series 3'
  data: createData(-1, 1, -1, -1, -1, 1)
  fillEnabled: true
  markersEnabled: true
  group: 'group-1'
  strokeColor: hx.theme.plot.colors[5]
  fillColor: hx.color(hx.theme.plot.colors[5]).alpha(0.2).toString()
})

graph.render()
