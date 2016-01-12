

hx.plot = {}

hx.plot.label = hx_plot_label
hx.plot.arcCurve = arcCurve
hx.plot.svgCurve = svgCurve
hx.Axis = Axis
hx.Graph = Graph

hx.graph = (options) ->
  selection = new hx.detached 'div'
  graph = new Graph selection.node(), options
  # There is no point rendering it now, the selection is of zero size.
  selection.on 'resize', 'hx.plot', -> graph.render()
  selection

hx.LineSeries = LineSeries
hx.BandSeries = BandSeries
hx.ScatterSeries = ScatterSeries
hx.BarSeries = BarSeries
hx.StraightLineSeries = StraightLineSeries

hx.pieChart = (options) ->
  selection = hx.detached('div')
  pieChart = new PieChart(selection.node(), options)
  pieChart.render()
  selection

hx.PieChart = PieChart

hx.sparkline = (options) ->
  selection = hx.detached('div').classed('hx-sparkline', true) #XXX: should be added by the Sparkline component really...
  sparkline = new Sparkline(selection.node(), options)
  sparkline.render()
  selection

hx.Sparkline = Sparkline
