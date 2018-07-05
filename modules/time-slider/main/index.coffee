class TimeSlider extends hx.Slider
  constructor: (selector, opts = {}) ->
    # no need to register this as a component - hx.Slider does that for us

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


    options = hx.merge({
      renderer: (slider, elem, value) -> hx.select(elem).text(slider.options.formatter(new Date(value))),
    }, opts)

    options.min = min
    options.max = max

    if moment?
      options.formatter ?= (date) -> moment(date).format('HH:mm')
    else
      options.formatter ?= (date) -> hx.zeroPad(date.getHours()) + ':' + hx.zeroPad(date.getMinutes())

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

hx.timeSlider = (options) ->
  selection = hx.detached('div')
  new TimeSlider(selection.node(), options)
  selection

hx.TimeSlider = TimeSlider
