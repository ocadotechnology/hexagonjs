
graph = new hx.Graph('#graph')
axis = graph.addAxis('linear', 'linear')
axis.xTitle = "time"
axis.yTitle = "value"
axis.yMin = 0

axis2 = graph.addAxis('linear', 'linear')
axis2.xTitle = "time"
axis2.yTitle = "another value"
axis2.xVisible = false
axis2.yMin = 0

data1 = for i in [0..500]
  x: i
  y: 5+Math.sin(i/10) + Math.sin(i/20) + Math.sin(i/40) + Math.sin(i/50) + Math.sin(i/100)
series = axis.addSeries('line', "Area Series 1")
series.setData(data1)
series.color = hx.color(hx.theme.plot.colors[0]).alpha(0.2).toString()
series.fill = true
series.fillColor = hx.color(hx.theme.plot.colors[0]).alpha(0.2).toString()

data2 = for i in [0..500]
  x: i
  y: 3+Math.sin(i/10) - Math.sin(i/20) - Math.sin(i/40) - Math.sin(i/50) + Math.sin(i/100)
series = axis2.addSeries('line', "Area Series 2")
series.setData(data2)
series.color = hx.color(hx.theme.plot.colors[1]).alpha(0.2).toString()
series.fill = true
series.fillColor = hx.color(hx.theme.plot.colors[1]).alpha(0.2).toString()

graph.render()