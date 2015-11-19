createData = (num, z, a, b, c, d, e) ->
  for i in [0..num]
    x: new Date().getTime() + i * 60000
    y: z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100)

graph = new hx.Graph('#graph')
axis = graph.addAxis('date', 'linear')
axis.xTitle = "time"
axis.yTitle = "value"
axis.xTickSpacing = 80

axis.xFormatter = (val) ->
  moment(val).format('DD/MM HH:mm')

series1 = axis.addSeries('line', 'Series 1')

series1.color = hx.theme.plot.colors[2]
series1.label.interpolate = true

series2 = axis.addSeries('line', 'Series 2')

series2.color = hx.theme.plot.colors[4]
series2.label.interpolate = true

series3 = axis.addSeries('line', 'Series 3')

series3.color = hx.theme.plot.colors[0]
series3.label.interpolate = true

renderGraph = (value) ->
  series1.setData(createData(value, 0, 1, 1, 1, 1, 1))
  series2.setData(createData(value, 1, -1, 1, -1, 1, -1))
  series3.setData(createData(value, -1, 1, -1, -1, -1, 1))
  graph.render()

input = hx.select('#graphInput').on 'input', (e) ->
  if e.target.value <= 100000
    renderGraph(e.target.value)
  else
    e.target.value = 100000

renderGraph(input.value())