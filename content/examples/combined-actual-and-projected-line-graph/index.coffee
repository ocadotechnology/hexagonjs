
createData = (start, z, a, b, c, d, e) ->
  for i in [start..start+200]
    x: i
    y: 4 + z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100)

graph = new hx.Graph('#graph')
axis = graph.addAxis('linear', 'linear')
axis.xTitle = "time"
axis.yTitle = "value"
axis.yMin = 0
axis.yScalePaddingMax = 0.1

col = hx.color(hx.theme.plot.colors[0]).alpha(0.1).toString()

series = axis.addSeries('line', 'Actual')
series.setData(createData(0, 0, 1, 1, 1, 1, 1))
series.label.interpolate = true
series.fillColor = col
series.fill = true

series = axis.addSeries('line', 'Predicted')
series.setData(createData(200, 0, 1, 1, 1, 1, 1))
series.label.interpolate = true
series.fill = true
series.fillColor = col
series.class = 'dashed-line'

graph.render()
