import { select, div } from 'utils/selection'
import { mergeDefined } from 'utils/utils'

class ProgressBar
  constructor: (@selector, options) ->
    options = mergeDefined {
      segments: undefined
      value: 0
      animate: false
    }, options

    @selection = select(@selector)
      .classed('hx-progress-bar', true)
      .api('progress-bar', this)
      .api(this)

    @innerBars = @selection.append('div').attr('class', 'hx-progress-bar-inner')

    @value(options.value)

    if options.segments?
      @segments(options.segments, true)

    if options.animate
      @selection.classed('hx-animate', true)


  value: (value) ->
    if arguments.length > 0
      if not isNaN(value)
        @progress = Math.max(0, Math.min(1, value))
        @innerBars.style('width', (@progress*100) + '%')
      this
    else
      @progress

  segments: (segments, retainProgress) ->
    if arguments.length > 0

      if segments?
        @progressSegments = segments.filter (e) -> e.value? or e.ratio? or e.class?

        if @progressSegments.length > 0
          @selection.selectAll('.hx-progress-bar-inner').remove()
          if not @progressSegments.some((e) -> e.value?)
            runningTotal = 0
            total = @progressSegments.map((e) -> e.ratio or 1).reduce (a, b) -> a + b
          else
            @progressSegments = @progressSegments.sort (a, b) -> (a.value or 1) - (b.value or 1)

          @progressSegments.forEach (segment, i) =>

            # Create a new bar for each segment
            bar = @selection.append('div').attr('class', 'hx-progress-bar-inner')

            # If a class is not provided, the class applied to the @selector will be used by the css
            if segment.class?
              bar.classed(segment.class, true)

            maxWidth = if not runningTotal?
              # Percentage value provided in the unit range (0-1)
              (segment.value or 1) * 100
            else
              # If ratio is provided, the max width for the segment is calculated using the total. Ratio defaults to 1.
              runningTotal += segment.ratio or 1
              runningTotal / total * 100

            # max-width limits the size of each bar - allowing the existing @value method to work.
            # z-index layers the bars in the correct order (smallest on top)
            bar.style('max-width', maxWidth + '%')
              .style('z-index', @progressSegments.length - i)
      else
        @progressSegments = undefined
        @selection.selectAll('.hx-progress-bar-inner').remove()
        @selection.append('div').attr('class', 'hx-progress-bar-inner')

      @innerBars = @selection.selectAll('.hx-progress-bar-inner')
      if retainProgress
        @value @progress
      else
        @progress = 0
      this
    else
      @progressSegments

progressBar = (options) ->
  selection = div()
  new ProgressBar(selection.node(), options)
  selection

export { progressBar, ProgressBar }
