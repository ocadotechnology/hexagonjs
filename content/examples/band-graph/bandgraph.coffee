
createData = ->
  for i in [0..200]
    y1 = 5 - Math.sin(i/10) + Math.sin(i/20) - Math.sin(i/40) + Math.sin(i/50) - Math.sin(i/100)
    y2 = -5 + Math.sin(i/10) - Math.sin(i/20) - Math.sin(i/40) - Math.sin(i/50) + Math.sin(i/100)
    {
      x: i
      y: (y1+y2)/2
      y1: y1
      y2: y2
    }

graph = new hx.Graph('#graph')
axis = graph.addAxis('linear', 'linear')
axis.xTitle = "time"
axis.yTitle = "value"

data = createData()

series = axis.addSeries('band', 'Band Series')
series.setData(data)
series.color = 'rgba(49, 142, 228, 0.17)'

series = axis.addSeries('line', 'Line Series')
series.setData(data)
series.color = 'rgba(49, 142, 228, 0.17)'
series.markers = true

graph.render()
