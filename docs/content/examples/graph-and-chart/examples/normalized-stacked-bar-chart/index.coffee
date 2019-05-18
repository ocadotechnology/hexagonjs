colors = hx.theme.plot.colors

xLabels = 'ABCDEFGH'.split('')

createData = ->
  for label in xLabels
    x: label
    y: Math.random()*50+5

normalize = (data) ->
  transposed = hx.transpose(data)
  sliceYs = transposed.map((slice) -> slice.map((d) -> d.y))
  sliceSums = sliceYs.map((slice) -> hx.sum(slice))
  zipped = hx.zip([sliceSums, transposed])
  normalized = zipped.map ([total, series]) ->
    series.map (d) ->
      x: d.x,
      y: d.y/total
      yLabel: d.y
  hx.transpose(normalized)


graph = new hx.Graph('#normalized-stacked-bar-chart')
axis = graph.addAxis({
  x:
    title: 'category'
    scaleType: 'discrete'
    formatter: (d) -> d
    discreteLabels: xLabels
  y:
    title: 'value'
    scalePaddingMax: 0.05
    min: 0
})

seriesList1 = normalize(hx.range(3).map(createData))

percentFormatter = hx.format.si(3)
createLabelValues = (series, dataPoint) ->
  [
    {
      name: axis.x.title(),
      value: dataPoint.x,
      formatter: (d) -> d
    },
    {
      name: axis.y.title(),
      value: dataPoint.y,
      formatter: (d) -> d
    },
    {
      name: "percent",
      value: dataPoint.y,
      formatter: (x) -> percentFormatter(x * 100) + '%'
    }
  ]

for data, i in seriesList1
  axis.addSeries('bar', {
    title: 'Stacked Bar Series ' + (i+1)
    data: data
    group: 'group-1'
    fillColor: hx.cycle(colors, i)
    labelValuesExtractor: createLabelValues
  })

graph.render()
