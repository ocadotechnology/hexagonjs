import { format } from 'utils/format'
import { select, div } from 'utils/selection'
import { merge } from 'utils/utils'

import { Slider } from 'components/slider'

zeroPad = format.zeroPad(2)

class TimeSlider extends Slider
  constructor: (selector, opts = {}) ->
    # no need to register this as a component - Slider does that for us

    min = if opts.min?
      maybeDateToMillis(opts.min)
    else
      start = new Date()
      start.setMilliseconds(0)
      start.setSeconds(0)
      start.setMinutes(0)
      start.setHours(0)
      (new Date(start.getTime())).getTime()

    max = if opts.max? then maybeDateToMillis(opts.max) else min + 24 * 60 * 60 * 1000 - 1


    options = merge({
      renderer: (slider, elem, value) -> select(elem).text(slider.options.formatter(new Date(value))),
    }, opts)

    options.min = min
    options.max = max

    if moment?
      options.formatter ?= (date) -> moment(date).format('HH:mm')
    else
      options.formatter ?= (date) -> zeroPad(date.getHours()) + ':' + zeroPad(date.getMinutes())

    super(selector, options)

  maybeDateToMillis = (date) -> if date instanceof Date then date.getTime() else date

  value: (value) ->

    if arguments.length > 0
      if @options.type is 'range'

        start = if value.start? then maybeDateToMillis(value.start)
        end = if value.end? then maybeDateToMillis(value.end)

        super({start: start, end: end})
      else
        super(maybeDateToMillis(value))
      this
    else
      if @options.type is 'range'
        {
          start: new Date(@values.start)
          end: new Date(@values.end)
        }
      else
        new Date(@values.value)

  min: (min) -> if arguments.length > 0 then super(maybeDateToMillis(min)) else new Date(super())

  max: (max) -> if arguments.length > 0 then super(maybeDateToMillis(max)) else new Date(super())

timeSlider = (options) ->
  selection = div()
  new TimeSlider(selection.node(), options)
  selection

export {
  timeSlider,
  TimeSlider
}
