
createData = (start, z, a, b, c, d, e) ->
  for i in [start..start+200]
    x: i
    y: 4 + z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100)

graph = new hx.Graph('#graph')
axis = graph.addAxis({
  x: {
    title: 'time'
  },
  y: {
    title: 'value',
    min: 0,
    scalePaddingMax: 0.1
  }
})
col = hx.color(hx.theme.plot.colors[0]).alpha(0.1).toString()

axis.addSeries('line', {
  title: 'Actual',
  data: createData(0, 0, 1, 1, 1, 1, 1),
  fillColor: col,
  fillEnabled: true
})
axis.addSeries('line', {
  title: 'Predicted',
  data: createData(200, 0, 1, 1, 1, 1, 1),
  fillColor: col,
  fillEnabled: true,
  class: 'dashed-line'
})

graph.render()
