Series = require('../series')
select = require('modules/selection/main')
color = require('modules/color/main')
utils = require('modules/util/main/utils')
theme = require('modules/theme/main')()

graphutils = require('../utils')

updatePath = (series, element, _class, data, type, update) ->
  select(element).view('.hx-series-data', 'g')
    .update (d) ->
      @class('hx-series-data hx-series-line ' + series.class() )
      .view(_class, type).update(update).apply(d)
    .apply(data)

module.exports = class LineSeries extends Series

  scale = (data, axis) -> {x: axis.xScale.apply(d.x), y: axis.yScale.apply(d.y)} for d in data

  constructor: (options) ->
    super(utils.merge({
      strokeEnabled: true,
      strokeColor: theme.plotColor1,
      fillEnabled: false,
      fillColor: undefined,
      markersEnabled: false,
      markerRadius: 2,
      markerFillColor: undefined,
      sampleThreshold: 200,
      group: undefined
    }, options))

    @_.type = 'line'

  strokeEnabled: graphutils.optionSetterGetter('strokeEnabled')
  strokeColor: graphutils.optionSetterGetter('strokeColor')
  fillEnabled: graphutils.optionSetterGetter('fillEnabled')
  fillColor: graphutils.optionSetterGetter('fillColor')
  markersEnabled: graphutils.optionSetterGetter('markersEnabled')
  markerRadius: graphutils.optionSetterGetter('markerRadius')
  markerFillColor: graphutils.optionSetterGetter('markerFillColor')
  sampleThreshold: graphutils.optionSetterGetter('sampleThreshold')
  group: graphutils.optionSetterGetter('group')

  legendColor: -> @_.options.strokeColor


  updateSvg: (fillLayer, sparseLayer) ->
    self = this
    axis = @axis

    featheredData = graphutils.splitAndFeather(@data(), @sampleThreshold(), (d) -> d.y != undefined)
    @_.featheredData = featheredData

    applyStack = (dataToStack, calculateBaseline) ->
      for d in dataToStack
        x: d.x
        y: axis.getYStack(self._.type, self.group(), d.x, self._.seriesId) + if calculateBaseline then 0 else d.y

    if @fillEnabled()
      if Array.isArray(self.fillColor() or self.strokeColor())
        gradientCols = self.fillColor() or self.strokeColor().map (d) ->
          {
            value: d.value
            color: color(d.color).alpha(0.1).toString('rgba')
          }
        gradientId = graphutils.createLinearGradient(fillLayer, gradientCols, self)
        fillCol = 'url(#' + gradientId + ')'
      else
        fillCol = self.fillColor() or color(self.strokeColor()).alpha(0.1).toString()

      fillToY = Math.max(Math.min(@axis.yScale.domainMax, 0), @axis.yScale.domainMin)

      fillPreparedData =
        for data in featheredData
          applyStack(data).concat(applyStack(data.slice(0).reverse(), true))

      areas = (graphutils.svgCurve(scale(data, @axis), true) for data in fillPreparedData)

      updatePath this, fillLayer, '.hx-series-line-fill', areas, 'path', (d) ->
        @attr('d', d)
        .attr('fill', fillCol)

    if @strokeEnabled()
      if @axis.y.scaleType() != 'discrete'
        curves = (graphutils.svgCurve(scale(applyStack(data), @axis)) for data in featheredData)
      else
        curves = (graphutils.svgCurve(scale(data, @axis)) for data in featheredData)

      if Array.isArray(this.strokeColor())
        gradientId = graphutils.createLinearGradient(sparseLayer, this.strokeColor(), self)
        strokeCol = 'url(#' + gradientId + ')'
      else
        strokeCol = self.strokeColor()

      updatePath this, sparseLayer, '.hx-series-line-stroke', curves, 'path', (d) ->
        @attr('d', d)
        .attr('stroke', strokeCol)

    if @markersEnabled()
      preparedData = if @axis.y.scaleType() != 'discrete'
        applyStack(utils.flatten(featheredData))
      else
        utils.flatten(featheredData)

      updatePath this, sparseLayer, '.hx-series-line-markers', scale(preparedData, @axis), 'circle', (d) ->
        @attr('cx', d.x)
        .attr('cy', d.y)
        .attr('r', self.markerRadius())
        .attr('fill', self.markerFillColor() or self.strokeColor())

  # usage for line series
  lineSeriesDataInterpolator = (x, d1, d2, yInterp) ->
    if d1.y? and d2.y?
      {
        x: x,
        y: yInterp(d1.y, d2.y)
      }

  getLabelDetails: (x, y) ->
    if point = graphutils.createLabelPoint(this, x, y, lineSeriesDataInterpolator)
      [
        graphutils.makeLabelDetails(this, point, (d) => @axis.getYStack(@_.type, @group(), d.x, @_.seriesId) + d.y)
      ]
    else []
