
createData = (z, a, b, c, d, e, breakPointStart=200, breakPointEnd=200) ->
  for i in [0..1000]
    value = if breakPointStart < i < breakPointEnd then undefined else z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100)
    value = z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100)
    { x: i, y: value}

graph = new hx.Graph('#graph')
axis = graph.addAxis('linear', 'linear')
axis.xTitle = "time"
axis.yTitle = "value"

series = axis.addSeries('line', 'Series 3')
series.setData(createData(-1, 1, -1, -1, -1, 1, 20, 50))
series.color = [
  {
    yValue: -4,
    color: hx.theme.plot.negativeCol
  },
  {
    yValue: 0,
    color: '#999'
  }
  {
    yValue: 4,
    color: hx.theme.plot.positiveCol
  }
]
series.feather = false

series.label.interpolate = true
series.fill = true
series.fillColor = [
  {
    yValue: -4,
    color: hx.color(hx.theme.plot.negativeCol).alpha(0.25).toString()
  },
  {
    yValue: 0,
    color: hx.color('#AAA').alpha(0.05).toString()
  },
  {
    yValue: 4,
    color: hx.color(hx.theme.plot.positiveCol).alpha(0.25).toString()
  }
]
series.feather = false

graph.render()
