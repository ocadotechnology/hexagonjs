
createData = (z, a, b, c, d, e, breakPointStart=200, breakPointEnd=200) ->
  for i in [0..200]
    value = if breakPointStart < i < breakPointEnd then undefined else z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100)
    { x: i, y: value}

graph = new hx.Graph('#data-gap-line-graph')
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
  strokeColor: hx.theme.plot.colors[2]
})

axis.addSeries('line', {
  title: 'Series 2'
  data: createData(1, -1, 1, -1, 1, -1)
  strokeColor: hx.theme.plot.colors[4]
})

axis.addSeries('line', {
  title: 'Series 3'
  data: createData(-1, 1, -1, -1, -1, 1, 20, 50)
  strokeColor: hx.theme.plot.colors[5]
})

graph.render()
