
createData = (z, a, b, c, d, e, breakPointStart=200, breakPointEnd=200) ->
  for i in [0..500]
    value = if breakPointStart < i < breakPointEnd then undefined else z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100)
    value = z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100)
    { x: i, y: value}

graph = new hx.Graph('#graph')
axis = graph.addAxis('linear', 'linear')
axis.xTitle = "time"
axis.yTitle = "value"

series = axis.addSeries('line', 'Series 1')
series.setData(createData(0, 1, 1, 1, 1, 1))
series.color = [
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
series.label.interpolate = true

graph.render()
