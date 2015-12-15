
createData = (z, a, b, c, d, e, offset, count=50) ->
  for i in [0...count]
    x: i + offset
    y: Math.abs(z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100))

graph = new hx.Graph('#graph')
axis = graph.addAxis('linear', 'linear')
axis.xTitle = "time"
axis.yTitle = "value"

series = axis.addSeries('line', 'Series 1')
series.setData(createData(0, 1, 1, 1, 1, 1, 20, 10))
series.color = hx.theme.plot.colors[2]
series.markers = true
series.group = 'some-group'
series.fill = true
series.fillColor = hx.color(hx.theme.plot.colors[2]).alpha(0.2).toString()

series = axis.addSeries('line', 'Series 2')
series.setData(createData(1, -1, 1, -1, 1, -1, 0.5))
series.color = hx.theme.plot.colors[3]
series.markers = true
series.group = 'some-group'
series.fill = true
series.fillColor = hx.color(hx.theme.plot.colors[3]).alpha(0.2).toString()

series = axis.addSeries('line', 'Series 3')
series.setData(createData(-1, 1, -1, -1, -1, 1, 10, 30))
series.color = hx.theme.plot.colors[4]
series.markers = true
series.group = 'some-group'
series.fill = true
series.fillColor = hx.color(hx.theme.plot.colors[4]).alpha(0.2).toString()

graph.render()
