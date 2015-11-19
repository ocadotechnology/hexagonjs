new hx.Dropdown '#dropdown-1', ((element) -> makeGraph(element)), 'click'
new hx.Dropdown '#dropdown-2', ((element) -> makeGraph(element)), 'hover'

# fills the dropdown with some content (for this example)
makeGraph = (selector) ->
  node = hx.select(selector).append('div').class('graph').node()
  graph = new hx.Graph(node)
  axis = graph.addAxis()
  axis.xScalePaddingMax = 0.1
  axis.xScalePaddingMin = 0.1
  axis.yScalePaddingMax = 0.1
  axis.yScalePaddingMin = 0.1
  series = axis.addSeries('scatter', 'Scatter Series')
  data = hx.range(100).map (d) ->
    x: d/10 + Math.random()*2
    y: d*d/10 + Math.random()*2
    color: hx.cycle(hx.theme.plot.colors, d)

  series.setData data
  graph.render()
