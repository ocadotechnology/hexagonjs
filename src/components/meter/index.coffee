import { color } from 'utils/color'
import logger from 'utils/logger'
import { EventEmitter } from 'utils/event-emitter'
import { merge, randomId } from 'utils/utils'
import { arcCurve, svgCurve } from 'components/plot'
import { detached, select } from 'utils/selection'
import { theme } from 'theme'
import { userFacingText } from 'utils/user-facing-text'

userFacingText({
  meter: {
    of: 'of'
  }
})

export class Meter extends EventEmitter
  constructor: (selector, options) ->
    super()
    logger.deprecated('Meter is deprecated and will be removed from Hexagon in the next major release.')

    @_ = _ = {}

    _.data = {
      total: 0
      completed: 0
    }

    @options = merge({
      useMarker: true
      useTracker: true
      trackerWidth: 0.03
      progressWidth: 0.175
      markerSize: 0.01
      markerInnerExtend: 0.01
      markerOuterExtend: -0.01
      arcPadding: 0.02
      markerPadding: 0.1
      progressBackgroundCol: color(theme().palette.contrastCol).alpha(0.05).toString()
      progressCol: theme().palette.positiveCol
      trackerCol: color(theme().palette.positiveCol).alpha(0.5).toString()
      trackerBackgroundCol: color(theme().palette.contrastCol).alpha(0.05).toString()
      markerCol: theme().palette.contrastCol
      valueFormatter: (value, isTotal) -> if isTotal then "#{userFacingText('meter', 'of')} #{value}" else value
      redrawOnResize: true
    }, options)

    meterRandomId = randomId()

    _.selection = selection = select(selector)
      .api('meter', this)
      .api(this)
      .classed('hx-meter', true)
      .on 'resize', =>
        @render('user') if @options.redrawOnResize

    _.container = container = selection.append('div').class('hx-meter-container')

    _.svg = svg = container.append('svg')
      .style('width', '100%')
      .style('height', '100%')

    _.progressBackgroundArc = svg.append('path')
    _.progressArc = svg.append('path')
    _.trackerBackgroundArc = svg.append('path')
    _.trackerArc = svg.append('path')
    _.markerArc = svg.append('path')
    _.markerTextCurve = svg.append('defs').append('path').attr('id', meterRandomId)

    _.markerText = svg.append('g').append('text')
      .class('hx-meter-marker-text')
      .append('textPath')
        .attr('xlink:href', '#' + meterRandomId)

    innerText = container.append('div').class('hx-meter-inner-text')
    _.completedText = innerText.append('div').class('hx-meter-completed')
    _.totalText = innerText.append('div').class('hx-meter-total')
    _.typeText = innerText.append('div').class('hx-meter-type')

  value: (data) ->
    if arguments.length > 0
      @_.data = merge(@_.data, data)
      @render()
      this
    else
      @_.data

  render: (cause = 'api') ->
    _ = @_
    options = @options
    data = _.data
    selection = _.selection
    container = _.container
    svg = _.svg
    progress = Math.max(0, Math.min(1, (data.completed / data.total) or 0))
    trackerProgress = Math.max(0, Math.min(1, (data.tracker / data.total) or 0))
    markerProgress = Math.max(0, Math.min(1, (data.marker / data.total) or 0))

    _.completedText.text(options.valueFormatter(data.completed, false))
    _.totalText.text(options.valueFormatter(data.total, true))
    _.typeText.text(data.unitText)

    size = Math.min(selection.width(), selection.height() * 2)

    if size > 0
      # 14 is the standard font size, 150 is the assumed size, and size is the actual
      # size of the container. This scales the fonts appropriately
      container.style('font-size', Math.round(14 / 150 * (size / 2)) + 'px')
      textOffset = 10 * (size / 2) /  150

      x = size / 2
      y = size / 2

      markerR2 = 1 + options.markerOuterExtend

      trackerR2 = if options.useMarker then 1 - options.markerPadding else 1
      trackerR1 = trackerR2 - options.trackerWidth

      if options.useTracker
        progressR2 = trackerR1 - options.arcPadding
      else
        progressR2 = if options.useMarker then 1 - options.markerPadding else 1

      progressR1 = progressR2 - options.progressWidth
      markerR1 = progressR1 - options.markerInnerExtend
      markerWidth = options.markerWidth

      updateArc = (selection, start, end, r1, r2, col) ->
        innerRadius = size/2*r1
        outerRadius = size/2*r2
        startRadians = Math.PI + Math.PI*start
        endRadians = Math.PI + Math.PI*end
        padding = 0
        path = arcCurve(x, y, innerRadius, outerRadius, startRadians, endRadians, padding)

        selection
          .attr('d', path)
          .attr('fill', col)
          .style('visibility', undefined)

      # update the inner container size to match the outer container
      container.style('width', size + 'px')
      container.style('height', size/2 + 'px')

      # main progress
      updateArc(_.progressArc, 0, progress, progressR1, progressR2, options.progressCol)
      updateArc(_.progressBackgroundArc, progress, 1, progressR1, progressR2, options.progressBackgroundCol)

      # tracker progress
      if options.useTracker
        updateArc(_.trackerArc, 0, trackerProgress, trackerR1, trackerR2, options.trackerCol)
        updateArc(_.trackerBackgroundArc, trackerProgress, 1, trackerR1, trackerR2, options.trackerBackgroundCol)
      else
        _.trackerArc.style('visibility', 'hidden')
        _.trackerBackgroundArc.style('visibility', 'hidden')

      # marker
      if options.useMarker
        startRadians = Math.PI
        endRadians = Math.PI*2
        radius = size/2-textOffset
        points = for i in [0..100]
          x: x + radius * Math.cos((i/100 + 1)*Math.PI)
          y: y + radius * Math.sin((i/100 + 1)*Math.PI)

        path = svgCurve(points, false)

        _.markerTextCurve.attr('d', path)

        if markerProgress < 0.5
          _.markerText
            .attr('startOffset', (markerProgress*100+1) + '%')
            .attr('text-anchor', 'start')
        else
          _.markerText
            .attr('startOffset', (markerProgress*100-1) + '%')
            .attr('text-anchor', 'end')

        _.markerText
          .style('visibility', undefined)
          .text(data.markerText)

        updateArc(_.markerArc, markerProgress-options.markerSize/2, markerProgress+options.markerSize/2, markerR1, markerR2, @options.markerCol)
      else
        _.markerArc.style('visibility', 'hidden')
        _.markerText.style('visibility', 'hidden')

      @emit 'render', { cause, data }

    this

export meter = (options) ->
  selection = detached('div')
  new Meter(selection.node(), options)
  selection
