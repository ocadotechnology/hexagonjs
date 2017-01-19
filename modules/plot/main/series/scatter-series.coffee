Series = require('../series')
select = require('modules/selection/main')
color = require('modules/color/main')
utils = require('modules/util/main/utils')

graphutils = require('../utils')

module.exports = class ScatterSeries extends Series

  # private functions
  filter = (data) -> data.filter((d) -> d.x!=undefined && d.y!=undefined)
  scale = (data, axis) -> {x: axis.xScale.apply(d.x), y: axis.yScale.apply(d.y), radius: d.radius, fillColor: d.fillColor, color: d.color, size: d.size} for d in data

  constructor: (options) ->
    super(utils.merge({
      fillColor: ''
      radius: 2
    }, options))

    @_.type = 'scatter'

  fillColor: graphutils.optionSetterGetter('fillColor')
  radius: graphutils.optionSetterGetter('radius')

  legendColor: -> @_.options.fillColor

  updateSvg: (fillLayer, sparseLayer) ->
    self = this
    select(sparseLayer).view('.hx-series-data', 'circle')
      .update (d) ->
        @class('hx-series-data hx-series-scatter ' + self.class())
        .attr('cx', d.x)
        .attr('cy', d.y)
        .attr('r', Math.max(d.radius or self.radius(), 0))
        .style('fill', d.fillColor or self.fillColor())
      .apply(scale(filter(@data()), @axis))

  getLabelDetails: (x, y) ->
    if @labelsEnabled()

      # find the closest point - this has the potential to be slow, so might have to rethink this one
      best = undefined
      bestSquaredDistance = 0
      for d in filter(@data())
        squaredDistance = (@axis.xScale.apply(d.x) - x) * (@axis.xScale.apply(d.x) - x) + (@axis.yScale.apply(d.y) - y) * (@axis.yScale.apply(d.y) - y)
        if best == undefined or squaredDistance < bestSquaredDistance
          best = d
          bestSquaredDistance = squaredDistance

      if best
        meta = {
          series: this,
          title: @title(),
          x: @axis.xScale.apply(best.x),
          y: @axis.yScale.apply(best.y),
          color: best.color or @fillColor(),
          values: @labelValuesExtractor()(this, best)
        }

        [meta]
    else
      []
