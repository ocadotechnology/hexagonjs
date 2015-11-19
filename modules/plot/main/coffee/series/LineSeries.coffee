
updatePath = (series, element, _class, data, type, update) ->
  hx.select(element).view('.hx-series-data', 'g')
    .update (d) ->
      @class('hx-series-data hx-series-line ' + series.class() )
      .view(_class, type).update(update).apply(d)
    .apply(data)

class LineSeries extends Series

  scale = (data, axis) -> {x: axis.xScale.apply(d.x), y: axis.yScale.apply(d.y)} for d in data

  constructor: (options) ->
    super(hx.merge({
      strokeEnabled: true,
      strokeColor: hx.theme.plot.colors[0],
      fillEnabled: false,
      fillColor: undefined,
      markersEnabled: false,
      markerRadius: 2,
      markerFillColor: undefined,
      sampleThreshold: 200,
      group: undefined
    }, options))

    @_.type = 'line'

  strokeEnabled: optionSetterGetter('strokeEnabled')
  strokeColor: optionSetterGetter('strokeColor')
  fillEnabled: optionSetterGetter('fillEnabled')
  fillColor: optionSetterGetter('fillColor')
  markersEnabled: optionSetterGetter('markersEnabled')
  markerRadius: optionSetterGetter('markerRadius')
  markerFillColor: optionSetterGetter('markerFillColor')
  sampleThreshold: optionSetterGetter('sampleThreshold')
  group: optionSetterGetter('group')

  legendColor: -> @_.options.strokeColor


  updateSvg: (fillLayer, sparseLayer) ->
    self = this
    axis = @axis

    featheredData = splitAndFeather(@data(), @sampleThreshold(), (d) -> d.y != undefined)
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
            color: hx.color(d.color).alpha(0.1).toString('rgba')
          }
        gradientId = createLinearGradient(fillLayer, gradientCols, self)
        fillCol = 'url(#' + gradientId + ')'
      else
        fillCol = self.fillColor() or hx.color(self.strokeColor()).alpha(0.1).toString()

      fillToY = Math.max(Math.min(@axis.yScale.domainMax, 0), @axis.yScale.domainMin)

      fillPreparedData =
        for data in featheredData
          applyStack(data).concat(applyStack(data.slice(0).reverse(), true))

      areas = (svgCurve(scale(data, @axis), true) for data in fillPreparedData)

      updatePath this, fillLayer, '.hx-series-line-fill', areas, 'path', (d) ->
        @attr('d', d)
        .attr('fill', fillCol)

    if @strokeEnabled()
      if @axis.y.scaleType() != 'discrete'
        curves = (svgCurve(scale(applyStack(data), @axis)) for data in featheredData)
      else
        curves = (svgCurve(scale(data, @axis)) for data in featheredData)

      if Array.isArray(this.strokeColor())
        gradientId = createLinearGradient(sparseLayer, this.strokeColor(), self)
        strokeCol = 'url(#' + gradientId + ')'
      else
        strokeCol = self.strokeColor()

      updatePath this, sparseLayer, '.hx-series-line-stroke', curves, 'path', (d) ->
        @attr('d', d)
        .attr('stroke', strokeCol)

    if @markersEnabled()
      preparedData = if @axis.y.scaleType() != 'discrete'
        applyStack(hx.flatten(featheredData))
      else
        hx.flatten(featheredData)

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
    if point = createLabelPoint(this, x, y, lineSeriesDataInterpolator)
      [
        makeLabelDetails(this, point, (d) => @axis.getYStack(@_.type, @group(), d.x, @_.seriesId) + d.y)
      ]
    else []