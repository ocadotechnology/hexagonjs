import { EventEmitter } from 'utils/event-emitter'
import { select, div } from 'utils/selection'
import { sum, merge, clamp, flatten } from 'utils/utils'
import { format } from 'utils/format'

import { theme } from 'theme'

import { plotLabelStandard } from './labels'
import { optionSetterGetter } from './utils'

# not part of the core graphing api, since polar coordinates are difficult to mix with axes

class PieChart extends EventEmitter

  defaultLabelValuesExtractor = (segment, ring, pie) ->
    [
      {
        name: segment.name,
        value: segment.size,
        formatter: pie.labelFormatter()
      }
    ]

  defaultSegmentTextFormatter = (segment, segments) ->
    if segment.size / sum(segments.map((s) -> s.size)) > 0.05 then segment.size else ''

  defaultLabelFormatter = format.si(2)

  constructor: (@selector, options) ->
    super()

    selection = select(@selector)
      .classed('hx-pie-chart', true)
      .on('resize', 'hx.plot', => @render())
      .api(this)

    @_ = {
      options: merge({
        segmentPadding: 0
        innerPadding: 0
        ringPadding: 0.1
        totalAngle: Math.PI * 2
        startAngle: 0
        fillColor: theme().plotColor1
        labelsEnabled: true
        labelRenderer: plotLabelStandard
        labelValuesExtractor: defaultLabelValuesExtractor
        labelFormatter: defaultLabelFormatter
        segmentTextEnabled: false
        segmentTextFormatter: defaultSegmentTextFormatter
        legendEnabled: false
        legendLocation: 'auto',
      }, options)
    }


  labelsEnabled: optionSetterGetter('labelsEnabled')
  legendEnabled: optionSetterGetter('legendEnabled')
  legendLocation: optionSetterGetter('legendLocation')
  fillColor: optionSetterGetter('fillColor')
  segmentTextEnabled: optionSetterGetter('segmentTextEnabled')
  segmentTextFormatter: optionSetterGetter('segmentTextFormatter')
  labelValuesExtractor: optionSetterGetter('labelValuesExtractor')
  labelFormatter: optionSetterGetter('labelFormatter')
  labelRenderer: optionSetterGetter('labelRenderer')

  segmentPadding: optionSetterGetter('segmentPadding')
  innerPadding: optionSetterGetter('innerPadding')
  ringPadding: optionSetterGetter('ringPadding')
  totalAngle: optionSetterGetter('totalAngle')
  startAngle: optionSetterGetter('startAngle')

  data: optionSetterGetter('data')

  calculateTotal = (segments) ->
    allZero = false
    preTotal = sum(segments.map((x) -> x.size))
    total = if preTotal is 0
      allZero = true
      segments.length
    else
      sum(segments.map((x) -> getSegmentSize(x, preTotal)))
    {
      total: total,
      allZero: allZero
    }

  getSegmentSize = (segment, total, allZero) ->
    if allZero then 1
    else if segment.size > 0 then segment.size
    else total / 100

  render: ->
    self = this
    selection = select(@selector)
    width = selection.width()
    height = selection.height()
    r = Math.min(width, height) / 2
    @circle =
      x: width / 2
      y: height / 2
      r: r

    startAngle = @startAngle()
    totalAngle = @totalAngle()

    P = Math.PI
    startAngle += 2 * P while startAngle < 0

    switch
      # When the start angle is a multiple of PI / 2 radians (1 / 4 of a circle) and the total angle is half a circle
      when totalAngle is P and startAngle % (P / 2) is 0
        switch
          when startAngle is 0 or startAngle % (2 * P) is 0 or startAngle % P is 0
            r = clamp(0, height / 2,r * 2)
          when startAngle % (P * (3 / 2)) is 0 or startAngle % (P / 2) is 0
            r = clamp(0, width / 2,r * 2)
        switch
          when startAngle is 0 or startAngle % (2 * P) is 0
            diffX =  - r / 2
            diffY = 0
          when startAngle % (P * (3 / 2)) is 0
            diffX = 0
            diffY = r / 2
          when startAngle % P is 0
            diffX = r / 2
            diffY = 0
          when startAngle % (P / 2) is 0
            diffX = 0
            diffY =  - r / 2
          else
            diffX = 0
            diffY = 0

        @circle.x += diffX
        @circle.y += diffY
        @circle.r = r

    data = @data()
    if not Array.isArray(data)
      data = [data]

    approxRingSize = (r * (1 - @.innerPadding())) / data.length + (r * (1 - @.innerPadding()) / data.length * @ringPadding() / data.length)
    segmentPadding = approxRingSize * @segmentPadding()
    innerRadius = r * @.innerPadding()
    radius = r - innerRadius
    outerRadius = r
    ringSize = radius / data.length + (radius / data.length * @ringPadding() / data.length)

    updateSegment = (selection, size, color, runningTotal, total, ring, minimumInnerRadius) ->
      startOffset = self.startAngle() + Math.PI * 1.5
      start = startOffset + runningTotal / total * self.totalAngle()
      end = startOffset + (runningTotal + size) / total * self.totalAngle()

      straightInnerSegments = ring is 0 and innerRadius is 0

      actualInnerRadius = if straightInnerSegments
        Math.max(innerRadius + ringSize * ring, arcCurveMinimumRadius(start, end, segmentPadding))
      else
        Math.max(innerRadius + ringSize * ring, minimumInnerRadius)

      diameter = arcCurve(
        self.circle.x,
        self.circle.y,
        actualInnerRadius,
        innerRadius + ringSize * (ring + 1 - self.ringPadding()),
        start,
        end,
        segmentPadding,
        straightInnerSegments
      )

      selection.attr('d', diameter).attr('fill', color)

    updateRing = (d, e, i) ->
      segments = d.segments

      {total, allZero} = calculateTotal(segments)

      runningTotal = 0
      minimumInnerRadius = 0
      for segment in segments
        size = getSegmentSize(segment, total, allZero)
        startOffset = self.startAngle() + Math.PI * 1.5
        start = startOffset + runningTotal / total * self.totalAngle()
        end = startOffset + (runningTotal + size) / total * self.totalAngle()
        minimumInnerRadius = Math.max(arcCurveMinimumRadius(start, end, segmentPadding), minimumInnerRadius)

      {total, allZero} = calculateTotal(segments)
      runningTotal = 0
      @view('.hx-pie-segment', 'path')
        .update (s) ->
          size = getSegmentSize(s, total, allZero)
          updateSegment(this, size, s.fillColor, runningTotal, total, i, minimumInnerRadius)
          runningTotal += size
        .apply(segments)

    midpoint = (size, runningTotal, total, ring, count) ->
      startOffset = self.startAngle() + Math.PI * 1.5
      start = startOffset + runningTotal / total * self.totalAngle()
      end = startOffset + (runningTotal + size) / total * self.totalAngle()

      {
        x: self.circle.x + Math.cos((start+end)/2) * (innerRadius + (ring + 0.5) * ringSize),
        y: self.circle.y + Math.sin((start+end)/2) * (innerRadius + (ring + 0.5) * ringSize)
      }

    updateText = (d, e, i) ->
      segments = d.segments
      runningTotal = 0
      {total, allZero} = calculateTotal(segments)
      @view('.hx-pie-segment-text', 'text')
        .update (s) ->
          size = getSegmentSize(s, total, allZero)
          {x, y} = midpoint(size, runningTotal, total, i, segments.length)
          this.text(self.segmentTextFormatter()(s, segments))
            .attr('x', x)
            .attr('y', y)
          runningTotal += size
        .apply(segments)

    enterChart = (d) ->
      self.svgTarget = @append('svg').class('hx-graph')
      self.plotTarget = self.svgTarget.append('g').class('hx-plot')
      labelGroup = self.svgTarget.append('g').class('hx-label')

      self.svgTarget.on 'pointermove', 'hx.plot', (p) ->

        x = Math.round(p.x - selection.box().left)
        y = Math.round(p.y - selection.box().top)
        if self.labelsEnabled()
          updateLabels(self, x, y)

        if self.legendEnabled()

          legendContainer = self.svgTarget.select('.hx-legend-container')

          if self.legendLocation() is 'hover'
            legendContainer.style('display', '')

          # update the legend position
          if (self.legendLocation() is 'auto' || self.legendLocation() is 'hover')
            width = self.svgTarget.width()
            height = self.svgTarget.height()
            if x < width / 2
              # bottom-right
              legendContainer.attr('transform', 'translate(' + (width - 10 - legendContainer.width()) + ', 10)')
            else
              # top-left
              legendContainer.attr('transform', 'translate(10, 10)')


      self.svgTarget.on 'pointerleave', 'hx.plot', ->
        if self.legendEnabled() && self.legendLocation() is 'hover'
          self.svgTarget.select('.hx-legend-container').style('display', 'none')

      self.svgTarget.on 'click', 'hx.plot', (p) ->
        if self.closestMeta?
          self.emit 'click', {event: p, data: self.closestMeta.values, series: self.closestMeta.series}

      self.svgTarget.node()

    updateChart = (d) ->
      data = d.data()
      if not Array.isArray(data)
        data = [data]
      @select('.hx-plot').view('.hx-pie-ring', 'g')
        .update(updateRing)
        .apply(data)

      @select('.hx-plot').view('.hx-pie-text', 'g')
        .update(updateText)
        .apply(if self.segmentTextEnabled() then data else [])

    selection.view('.hx-graph', 'svg')
      .enter(enterChart)
      .update(updateChart)
      .apply(this)

    svgWidth = Number(@svgTarget.style('width').slice(0, -2))
    svgHeight = Number(@svgTarget.style('height').slice(0, -2))

    if @legendEnabled()
      legendContainer = @svgTarget.select('.hx-legend-container')
      if legendContainer.size() == 0
        legendContainer = @svgTarget.append('g').class('hx-legend-container')

      # collect up the series and update the legend container
      data = @data()
      if not Array.isArray(data)
        data = [data]
      populateLegendSeries(legendContainer, flatten(data.map((d) -> d.segments)))

      switch @legendLocation()
        when 'top-left'
          legendContainer.attr('transform', 'translate(10, 10)')
        when 'bottom-right'
          legendContainer.attr('transform', 'translate(' + (width - 10 - legendContainer.width()) + ',' + (height - 5 - legendContainer.height()) + ')')
        when 'bottom-left'
          legendContainer.attr('transform', 'translate(10, ' + (height - 5 - legendContainer.height()) + ')')
        when 'hover'
          legendContainer.style('display', 'none')
        else
          legendContainer.attr('transform', 'translate(' + (width - 10 - legendContainer.width()) + ', 10)')

    else
      @svgTarget.select('.hx-legend-container').remove()

  getClosestMeta = (pie, x, y) ->
    data = pie.data()
    if not Array.isArray(data)
      data = [data]

    selection = select(pie.selector)
    width = selection.width()
    height = selection.height()
    r = pie.circle.r
    approxRingSize = (r * (1 - pie.innerPadding())) / pie.data.length + (r * (1 - pie.innerPadding()) / data.length * pie.ringPadding() / data.length)
    segmentPadding = approxRingSize * pie.segmentPadding()
    innerRadius = r * pie.innerPadding()
    radius = r - innerRadius
    outerRadius = r
    ringSize = radius / data.length + (radius / data.length * pie.ringPadding() / data.length)

    cx = pie.circle.x
    cy = pie.circle.y
    r = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy))

    if r < innerRadius or r > outerRadius
      return

    # find out which ring we are in
    whichRing = clamp(0, data.length - 1, Math.floor((r + pie.ringPadding() * ringSize / 2 - innerRadius) / ringSize))
    ring = data[whichRing]

    # find out which segment we are in
    angle = (Math.atan2((y - cy), (x - cx)) + Math.PI * 0.5) - pie.startAngle()
    if angle < 0 then angle += Math.PI * 2
    chosenSegment = undefined
    runningTotal = 0
    {total, allZero} = calculateTotal(ring.segments)

    for segment in ring.segments
      size = getSegmentSize(segment, total, allZero)
      a1 = (runningTotal / total * pie.totalAngle())
      a2 = ((runningTotal + size) / total * pie.totalAngle())

      start = Math.min(a1, a2)
      end = Math.max(a1, a2)

      if start < angle < end
        chosenSegment = segment
        chosenSegmentAngleStart = start
        chosenSegmentAngleEnd = end
        chosenSegmentAngleMid = (end - start) / 2 + start - (Math.PI / 2) + pie.startAngle()
        break

      runningTotal += size

    if chosenSegment
      labelRadius = (ringSize * whichRing) + ((radius / data.length) / 2) + innerRadius
      labelX = cx + (labelRadius * Math.cos(chosenSegmentAngleMid))
      labelY = cy + (labelRadius * Math.sin(chosenSegmentAngleMid))


      {
        series: ring,
        title: ring.title,
        color: chosenSegment.fillColor or pie.fillColor(),
        x: labelX,
        y: labelY,
        bounding: {
          x1: 0
          x2: width
          y1: 0
          y2: height
        },
        values: pie.labelValuesExtractor()(chosenSegment, ring, pie)
      }


  clearLabels = () ->
    select('body')
      .select('.hx-plot-label-container')
      .clear()

  updateLabels = (pie, x, y) ->

    updateLabel = (data, element) ->
      select(element)
        .style('left', Math.round(window.pageXOffset + pie.svgTarget.box().left + data.x) + 'px')
        .style('top', Math.round(window.pageYOffset + pie.svgTarget.box().top + data.y) + 'px')

      pie.labelRenderer()(element, data)

    bestMeta = getClosestMeta(pie, x, y)

    if select('body').select('.hx-plot-label-container').empty()
      select('body').append('div').class('hx-plot-label-container')

    select('body')
      .select('.hx-plot-label-container')
      .view('.hx-plot-label', 'div')
        .update(updateLabel)
        .apply(if bestMeta then bestMeta else [])

pieChart = (options) ->
  selection = div()
  pieChart = new PieChart(selection.node(), options)
  selection

export {
  pieChart,
  PieChart
}
