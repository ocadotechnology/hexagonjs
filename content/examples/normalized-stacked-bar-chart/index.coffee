
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


graph = new hx.Graph('#graph')
axis = graph.addAxis('discrete', 'linear')

axis.xDiscreteLabels = xLabels
axis.xFormatter = (d) -> d
axis.xTitle = "category"
axis.yTitle = "value"
axis.yMin = 0
axis.yScalePaddingMax = 0.05

seriesList1 = normalize(hx.range(3).map(createData))

percentFormatter = hx.format.si(3)
createLabelValues = (dataPoint) ->
  [
    {
      name: @axis.xTitle,
      value: dataPoint.xLabel or dataPoint.x,
      formatter: @label.formatters[@axis.xTitle] or @axis.xFormatter
    },
    {
      name: @axis.yTitle,
      value: dataPoint.yLabel,
      formatter: @label.formatters[@axis.yTitle] or @axis.yFormatter
    },
    {
      name: "percent",
      value: dataPoint.y,
      formatter: (x) -> percentFormatter(x * 100) + '%'
    }
  ]

for data, i in seriesList1
  series = axis.addSeries('bar', 'Stacked Bar Series')
  series.setData(data)
  series.color = hx.cycle(colors, i)
  series.group = 'group-1'
  series.createLabelValues = createLabelValues

graph.render()
