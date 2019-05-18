
createData = (z, a, b, c, d, e, breakPointStart=200, breakPointEnd=200) ->
  for i in [0..500]
    value = if breakPointStart < i < breakPointEnd then undefined else z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100)
    value = z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100)
    { x: i, y: value}

graph = new hx.Graph('#gradient-stroke-graph')
axis = graph.addAxis({
  x:
    title: 'X'
  y:
    title: 'Y'
    scalePaddingMax: 0.05
    scalePaddingMin: 0.05
})

axis.addSeries('line', {
  title: 'Series 1'
  data: createData(0, 1, 1, 1, 1, 1)
  sampleThreshold: false
  strokeColor: [
    {
      yValue: -3,
      color: hx.theme.plot.negativeCol
    },
    {
      yValue: 0,
      color: '#555'
    },
    {
      yValue: 0,
      color: '#555'
    },
    {
      yValue: 3,
      color: hx.theme.plot.negativeCol
    }
  ]
})


graph.render()
