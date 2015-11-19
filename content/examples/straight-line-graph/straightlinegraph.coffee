

graph = new hx.Graph('#graph')
axis = graph.addAxis('linear', 'linear')
axis.xTitle = "x"
axis.yTitle = "y"
axis.yMin = 0
axis.yMax = 100
axis.xMin = 0
axis.xMax = 100

series = axis.addSeries('straight-line', 'Line Series 1')
series.color = 'rgb(49, 142, 228)'
series.setData({x: 70})

series = axis.addSeries('straight-line', 'Line Series 2')
series.color = 'rgb(228, 49, 142)'
series.setData({y: 90})

series = axis.addSeries('straight-line', 'Line Series 3')
series.color = 'rgb(49, 228, 142)'
series.setData({x: 50, y: 20, dx: 1, dy: 2})

graph.render()
