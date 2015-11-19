xLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
stackCategories = hx.range(20).map((d) -> 'category-' + d)

data = for category, i in xLabels
  x: category
  y: Math.random()*0.5+0.05
  color: hx.cycle(hx.theme.plot.colors, i)

graph = new hx.Graph('#graph')
axis = graph.addAxis('discrete', 'linear')
axis.yMin = 0
axis.xDiscreteLabels = xLabels
axis.xFormatter = (d) -> d
axis.xTitle = "category"
axis.yTitle = "value"

series = axis.addSeries('bar', 'Bar Series')
series.setData(data)

graph.render()
