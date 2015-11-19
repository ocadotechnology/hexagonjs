
### DEPRECATED CODE START ###

axisProperties = hx.flatten([
  'Visible',
  'Formatter',
  'TickRotation',
  'Min',
  'Max',
  'DiscretePadding',
  'DiscreteLabels',
  'TickSpacing',
  'Title',
  'ScalePaddingMin',
  'ScalePaddingMax',
  'TicksAll',
  'GridLines',
  'NthTickVisible'
].map((d) -> ['x'+d, 'y'+d]))

seriesProperties = [
  'class',
  'stroke',
  'color',
  'fill',
  'fillColor',
  'feather',
  'markers',
  'markerRadius',
  'markerColor',
  'group',
  'size'
]

graph = (selector, data) ->
  graph = new hx.Graph(selector)
  for axisData in data.axes
    axis = graph.addAxis(axisData.xType or 'linear', axisData.yType or 'linear')
    for p in axisProperties
      if hx.defined(axisData[p]) then axis[p] = axisData[p]

    for seriesData in axisData.series
      series = axis.addSeries(seriesData.type or 'line', seriesData.name)
      series.setData(seriesData.data)
      series.label.interpolate = seriesData.label.interpolate
      for p in seriesProperties
        if hx.defined(seriesData[p]) then series[p] = seriesData[p]

  graph.render()
  graph

pieProperties = [
  'segmentPadding',
  'innerPadding',
  'ringPadding',
  'totalAngle',
  'startAngle',
  'color',
  'label',
  'formatter'
]

pie = (selector, data) ->
  graph = new hx.PieChart(selector)
  for p in pieProperties
    if hx.defined(data[p]) then graph[p] = data[p]
  graph.setData(data.series)
  graph.render()
  graph

plot = (selector, data) ->
  hx.deprecatedWarning('hx.plot(selector, data)', 'the standard api can now be constructed in a declarative fashion, so there is no longer any need for this api.')
  switch data.type
    when 'pie' then pie(selector, data)
    else graph(selector, data)

### DEPRECATED CODE END ###