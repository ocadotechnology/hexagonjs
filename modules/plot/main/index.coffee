userFacingText = require('modules/user-facing-text/main')

label = require('./labels')
Graph = require('./graph')
Axis = require('./axis')

LineSeries = require('./series/line-series')
BandSeries = require('./series/band-series')
ScatterSeries = require('./series/scatter-series')
BarSeries = require('./series/bar-series')
StraightLineSeries = require('./series/straight-line-series')

PieChart = require('./pie-chart')
Sparkline = require('./sparkline')

graphutils = require('./utils')

userFacingText({
  plot: {
    noData: 'No Data'
  }
})

graph = (options) ->
  selection = new select.detached('div')
  graph = new Graph(selection.node(), options)
  # There is no point rendering it now, the selection is of zero size.
  # The resize event should trigger a render when the div is added to the document
  selection

pieChart = (options) ->
  selection = select.detached('div')
  pieChart = new PieChart(selection.node(), options)
  selection

sparkline = (options) ->
  selection = select.detached('div')
  sparkline = new Sparkline(selection.node(), options)
  sparkline.render()
  selection

module.exports = {
  label,
  Axis,
  Graph,
  arcCurve: graphutils.arcCurve,
  svgCurve: graphutils.svgCurve,
  graph,
  LineSeries,
  BandSeries,
  ScatterSeries,
  BarSeries,
  StraightLineSeries,
  Sparkline,
  sparkline,
  PieChart,
  pieChart,

  # backwards compat
  hx: {
    plot: {
      label,
      arcCurve: graphutils.arcCurve,
      svgCurve: graphutils.svgCurve
    },
    Graph,
    Axis,
    graph,
    LineSeries,
    BandSeries,
    ScatterSeries,
    BarSeries,
    StraightLineSeries,
    Sparkline,
    sparkline,
    PieChart,
    pieChart
  }
}
