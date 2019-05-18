import { select } from 'utils/selection'
import { merge } from 'utils/utils'
import { theme } from 'utils/theme'

import { Series } from '../series'
import { optionSetterGetter } from '../utils'

class StraightLineSeries extends Series

  constructor: (options) ->
    super(merge({
      strokeColor: theme().plotColor5,
      data: {}
    }, options))

    @_.type = 'straight-line'

  strokeColor: optionSetterGetter('strokeColor')

  legendColor: -> @_.options.strokeColor

  updateSvg: (fillLayer, sparseLayer) ->

    data = endpoints.call(this)

    if data
      self = this
      select(sparseLayer).view('.hx-series-data', 'line')
        .update (d) ->
          @class('hx-series-data hx-series-constant ' + self.class())
          .attr('x1', self.axis.xScale.apply(d[0].x))
          .attr('y1', self.axis.yScale.apply(d[0].y))
          .attr('x2', self.axis.xScale.apply(d[1].x))
          .attr('y2', self.axis.yScale.apply(d[1].y))
          .attr('d', d).attr('stroke', self.strokeColor())
        .apply([data])

  # should return a list of LabelMetas
  getLabelDetails: (x, y) ->
    data = @data()
    if @labelsEnabled()

      dx = data.dx || 0
      dy = data.dy || 0

      xx = @axis.xScale.inverse(x)
      yy = @axis.yScale.inverse(y)

      if dx != 0 && dy!=0 and data.x? and data.y?
        yy = data.y + (xx - data.x) * dy / dx
      else if data.x?
        xx = data.x
      else if data.y?
        yy = data.y

      if @axis.xScale.domainMin < xx < @axis.xScale.domainMax and @axis.yScale.domainMin < yy < @axis.yScale.domainMax

        meta = {
          series: this,
          title: @title(),
          x: @axis.xScale.apply(xx),
          y: @axis.yScale.apply(yy),
          color: @strokeColor(),
          values: @labelValuesExtractor()(this, {x: xx, y: yy})
        }

        [meta]
      else
        []
    else
      []

  endpoints = ->
    data = @data()
    dx = data.dx || 0
    dy = data.dy || 0

    if dx!=0 && dy!=0 && data.x? && data.y?
      # The maths for this was worked out on some paper, and will be a bit
      # fiddly to type up the details here. Essentially what this does is figure
      # out where the line will cross the axis, and computes the start and end
      # points of a line with gradient dy/dx. It works even when dx = 0
      x = data.x || 0
      y = data.y || 0
      domX1 = @axis.xScale.domainMin
      domX2 = @axis.xScale.domainMax
      domY1 = @axis.yScale.domainMin
      domY2 = @axis.yScale.domainMax

      domdx = x - domX1
      domdy = y - domY1
      quotient = domdy*dx - dy*domdx

      p1 = switch
        when quotient > 0 # when it crosses the y axis
          x0 = domX1
          t = (domX1 - x) / dx
          y0 = y + t * dy
          {x: x0, y: y0}
        when quotient == 0 # when it crosses the axis origin
          x0 = domX1
          y0 = domY1
          {x: x0, y: y0}
        when quotient < 0 # when it crosses the x axis
          y0 = domY1
          t = (domY1 - y) / dy
          x0 = x + t * dx
          {x: x0, y: y0}

      domdx = x - domX2
      domdy = y - domY2
      quotient = domdy*dx - dy*domdx

      p2 = switch
        when quotient < 0 # when it crosses the y axis (far side)
          x1 = domX2
          t = (domX2 - x) / dx
          y1 = y + t * dy
          {x: x1, y: y1}
        when quotient == 0 # when it crosses the top corner
          x1 = domX2
          y1 = domY2
          {x: x1, y: y1}
        when quotient > 0 # when it crosses the x axis (top)
          y1 = domY2
          t = (domY2 - y) / dy
          x1 = x + t * dx
          {x: x1, y: y1}

      [p1, p2]
    else if data.x?
      {x: data.x, y: y} for y in [@axis.yScale.domainMin, @axis.yScale.domainMax]
    else if data.y?
      {x: x, y: data.y} for x in [@axis.xScale.domainMin, @axis.xScale.domainMax]


export {
  StraightLineSeries
}
