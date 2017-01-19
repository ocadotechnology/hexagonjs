Series = require('../series')
select = require('modules/selection/main')
utils = require('modules/util/main/utils')

graphutils = require('../utils')

module.exports = class BarSeries extends Series

  constructor: (options) ->
    super(utils.merge({
      fillColor: theme.plotColor2,
      group: undefined
    }, options))

    @_.type = 'bar'


  fillColor: graphutils.optionSetterGetter('fillColor')
  group: graphutils.optionSetterGetter('group')

  legendColor: -> @_.options.fillColor

  updateSvg: (fillLayer) ->
    self = this
    axis = @axis
    select(fillLayer).view('.hx-series-data', 'rect')
      .update (d) ->

        if axis.x.scaleType() is 'discrete'

          # width of the category
          width = axis.xScale.tickWidth() / self._.typeSize

          # x position of the bar
          x = axis.xScale.apply(d.x) - width * self._.typeSize / 2 + self.groupId * width

          # height of the bar in pixels
          height = Math.abs(axis.yScale.apply(d.y) - axis.yScale.apply(0))

          # y position of the bar
          y = axis.yScale.apply(axis.getYStack(self._.type, self.group(), d.x, self._.seriesId))
          if d.y > 0 then y -= height

        else

          # width of the category
          width = Math.abs(axis.xScale.apply(d.x) - axis.xScale.apply(0))

          # x position of the bar
          x = axis.xScale.apply(axis.getXStack(self._.type, self.group(), d.y, self._.seriesId))

          # height of the bar in pixels
          height = Math.abs(axis.yScale.tickWidth() / self._.typeSize)

          # y position of the bar
          y = axis.yScale.apply(d.y) - height * self._.typeSize / 2 + self.groupId * height
          if d.y > 0 then y -= height

        @class('hx-series-data hx-series-bar ' + self.class())
        .attr("y", y)
        .attr("x", x)
        .attr("height", Math.max(height, 0))
        .attr("width", Math.max(width, 0))
        .style("fill", d.color or self.fillColor())

      .apply(@data())

  getLabelDetails: (x, y) ->
    if @labelsEnabled()
      xx = @axis.xScale.inverse(x)
      yy = @axis.yScale.inverse(y)

      barData = utils.find(@data(), (d) -> d.x == xx)

      # XXX: this only works for vertically stacked bars

      if barData

        # width of the bar
        width =  @axis.xScale.tickWidth() / @_.typeSize

        # x position of the bar
        barX = @axis.xScale.apply(barData.x) - width * @_.typeSize / 2 + @groupId * width

        # height of the bar in pixels
        height = Math.abs(@axis.yScale.apply(barData.y) - @axis.yScale.apply(0))

        # y position of the bar
        barY = @axis.yScale.apply(@axis.getYStack(@_.type, @group(), barData.x, @_.seriesId))
        if barData.y > 0 then barY -= height

        if xx? and yy? and barData? # and barX <= x < barX + width

          min = Math.min(barY, @axis.yScale.apply(0))
          max = Math.max(barY, barY + height)
          yy = utils.clamp(min, max, @axis.yScale.apply(yy))

          meta = {
            series: this,
            title: @title(),
            x: barX + width/2,
            y: yy,
            color: barData.color or @fillColor(),
            values: @labelValuesExtractor()(this, barData)
          }

          [meta]
        else []
      else
        []
    else
      []
