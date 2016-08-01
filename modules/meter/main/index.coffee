hx.userFacingText({
  meter: {
    of: 'of'
  }
})

class Meter extends hx.EventEmitter
  constructor: (selector, options) ->
    super()

    hx.component.register(selector, this)

    @_ = _ = {}

    _.data = {
      total: 0
      completed: 0
    }

    @options = hx.merge({
      useMarker: true
      useTracker: true
      trackerWidth: 0.03
      progressWidth: 0.175
      markerSize: 0.01
      markerInnerExtend: 0.01
      markerOuterExtend: -0.01
      arcPadding: 0.02
      markerPadding: 0.1
      progressBackgroundCol: hx.color(hx.theme.palette.contrastCol).alpha(0.05).toString()
      progressCol: hx.theme.plot.positiveCol
      trackerCol: hx.color(hx.theme.plot.positiveCol).alpha(0.5).toString()
      trackerBackgroundCol: hx.color(hx.theme.palette.contrastCol).alpha(0.05).toString()
      markerCol: hx.theme.palette.contrastCol
      valueFormatter: (value, isTotal) -> if isTotal then "#{hx.userFacingText('meter', 'of')} #{value}" else value
    }, options)

    randomId = hx.randomId()

    _.selection = selection = hx.select(selector)
      .classed('hx-meter', true)
      .on 'resize', => @render('user')

    _.container = container = selection.append('div').class('hx-meter-container')

    _.svg = svg = container.append('svg')
      .style('width', '100%')
      .style('height', '100%')

    _.progressBackgroundArc = svg.append('path')
    _.progressArc = svg.append('path')
    _.trackerBackgroundArc = svg.append('path')
    _.trackerArc = svg.append('path')
    _.markerArc = svg.append('path')
    _.markerTextCurve = svg.append('defs').append('path').attr('id', randomId)

    _.markerText = svg.append('g').append('text')
      .class('hx-meter-marker-text')
      .append('textPath')
        .attr('xlink:href', '#' + randomId)

    innerText = container.append('div').class('hx-meter-inner-text')
    _.completedText = innerText.append('div').class('hx-meter-completed')
    _.totalText = innerText.append('div').class('hx-meter-total')
    _.typeText = innerText.append('div').class('hx-meter-type')

  value: (data) ->
    if arguments.length > 0
      @_.data = hx.merge(@_.data, data)
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
      path = hx.plot.arcCurve(x, y, innerRadius, outerRadius, startRadians, endRadians, padding)

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

      path = hx.plot.svgCurve(points, false)

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

hx.meter = (options) ->
  selection = hx.detached('div')
  new Meter(selection.node(), options)
  selection

hx.Meter = Meter
