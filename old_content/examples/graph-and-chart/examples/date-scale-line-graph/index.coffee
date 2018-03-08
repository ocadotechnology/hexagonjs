createData = (num, z, a, b, c, d, e) ->
  for i in [0..num]
    x: new Date().getTime() + i * 60000
    y: z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100)

graph = new hx.Graph('#date-graph')
axis = graph.addAxis({
  x:
    title: "time"
    scaleType: 'date'
    tickSpacing: 80
    formatter: (val) ->
      moment(val).format('DD/MM HH:mm')
  y:
    title: "value"
    scalePaddingMax: 0.05
})


series1 = axis.addSeries('line', {
  title: 'Series 1'
  strokeColor: hx.theme.plot.colors[2]
})

series2 = axis.addSeries('line', {
  title: 'Series 2'
  strokeColor: hx.theme.plot.colors[4]
})

series3 = axis.addSeries('line', {
  title: 'Series 3'
  strokeColor: hx.theme.plot.colors[0]
})


renderGraph = (value) ->
  series1.data(createData(value, 0, 1, 1, 1, 1, 1))
  series2.data(createData(value, 1, -1, 1, -1, 1, -1))
  series3.data(createData(value, -1, 1, -1, -1, -1, 1))
  graph.render()

input = hx.select('#graphInput').on 'input', (e) ->
  if e.target.value <= 100000
    renderGraph(e.target.value)
  else
    e.target.value = 100000

renderGraph(input.value())