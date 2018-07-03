import { Series } from '../series'
import { select } from 'selection/main'
import { color } from 'color/main'
import { merge } from 'utils/main'
import { theme } from 'theme/main'

import { optionSetterGetter } from '../utils'

class BandSeries extends Series
  scale = (data, axis) -> {x: axis.xScale.apply(d.x), y: axis.yScale.apply(d.y)} for d in data

  constructor: (options) ->
    super(merge({
      fillColor: color(theme().plotColor3).alpha(0.2).toString()
      sampleThreshold: 200
    }, options))

    @_.type = 'band'

  fillColor: optionSetterGetter('fillColor')
  sampleThreshold: optionSetterGetter('sampleThreshold')

  legendColor: -> @_.options.fillColor

  updateSvg: (fillLayer) ->
    self = this

    @_.featheredData = splitAndFeather(@data(), @sampleThreshold(), (d) -> d.y1 != undefined and d.y2 != undefined)

    areas = for data in @_.featheredData
      preped = data.map((d) -> {x: d.x, y: d.y1}).concat(data.slice(0).reverse().map((d) -> {x: d.x, y: d.y2}))
      svgCurve(scale(preped, @axis), true)

    if Array.isArray(self.fillColor())
      gradientCols = self.fillColor().map (d) ->
        {
          value: d.value
          color: d.color
        }
      gradientId = createLinearGradient(fillLayer, gradientCols, this)
      fillCol = 'url(#' + gradientId + ')'
    else
      fillCol = self.fillColor()

    select(fillLayer).view('.hx-series-data', 'path', 'hx-series-area')
      .update (d) ->
        @attr('d', d)
        .class('hx-series-data ' + self.class())
        .attr('fill', fillCol)
      .apply(areas)

  bandSeriesDataInterpolator = (x, d1, d2, yInterp) ->
    if d1.y1? and d2.y1? and d1.y2? and d2.y2?
      {
        x: x
        y1: yInterp(d1.y1, d2.y1)
        y2: yInterp(d1.y2, d2.y2)
      }

  getLabelDetails: (x, y) ->
    if point = createLabelPoint(this, x, y, bandSeriesDataInterpolator)
      [
        makeLabelDetails(this, point, ((d) -> d.y1), 'x', 'y1')
        makeLabelDetails(this, point, ((d) -> d.y2), 'x', 'y2')
      ]
    else []

export {
  BandSeries
}