setupTimepicker = (timepicker) ->
  screenTime = timepicker.getScreenTime().split(':')

  timepicker.hourPicker.suppressed('change', true)
  timepicker.minutePicker.suppressed('change', true)
  timepicker.secondPicker.suppressed('change', true)
  timepicker.hourPicker.value(timepicker.hour(), screenTime[0])
  timepicker.minutePicker.value(timepicker.minute(), screenTime[1])
  timepicker.secondPicker.value(timepicker.second(), screenTime[2])
  timepicker.hourPicker.suppressed('change', false)
  timepicker.minutePicker.suppressed('change', false)
  timepicker.secondPicker.suppressed('change', false)

setupInput = (timepicker) ->
  timepicker.input.classed('hx-short-time', not timepicker.options.showSeconds)
  timepicker.input.value(timepicker.getScreenTime(timepicker.options.showSeconds))

updateTimePicker = (timepicker, suppress) ->
  if not timepicker.preventFeedback
    _ = timepicker._
    timepicker.preventFeedback = true
    timepicker.input.classed('hx-time-error', false)
    setupInput timepicker
    if not suppress
      timepicker.emit 'change', {type: if _.userEvent then 'user' else 'api'}
    _.userEvent = false
    timepicker.preventFeedback = false
    setupTimepicker timepicker


class TimePicker extends hx.EventEmitter
  constructor: (@selector, options) ->
    super

    @options = hx.merge {
      showSeconds: false
      buttonClass: 'hx-btn-invert'
      disabled: false
    }, options

    hx.component.register(@selector, this)

    _ = @_ = {
      disabled: @options.disabled
    }

    @localizer = hx.dateTimeLocalizer()
    @localizer.on 'localechange', 'hx.time-picker', => updateTimePicker this, true
    @localizer.on 'timezonechange', 'hx.time-picker', => updateTimePicker this, true

    _.selectedDate = new Date
    _.selectedDate.setMilliseconds(0)
    if not @showSeconds
      _.selectedDate.setSeconds(0)

    # set up everything that is needed to turn the div into a calendar input
    @selection = hx.select(@selector).classed('hx-time-picker', true)

    # input text box + icon
    inputContainer = @selection.append('div').class('hx-time-input-container')
    icon = inputContainer.append('i').class('hx-icon hx-icon-clock-o')
    @input = inputContainer.append('input').class('hx-time-input')

    timeout = undefined

    if hx.supports('date') and hx.supports('touch')
      # disable text input for touch devices as it conflicts with the dropdown
      @input.attr('readonly', true)
      @input.on 'click', 'hx.time-picker', (event) ->
        event.preventDefault()
    else
      @input.on 'input', 'hx.time-picker', (event) =>
        clearTimeout(timeout)
        timeout = setTimeout =>
          time = event.target.value.split(':')
          time[2] ?= 0
          if @localizer.checkTime(time)
            @hour(time[0])
            @minute(time[1])
            @second(time[2] or 0)
          else
            @input.classed('hx-time-error', true)
        , 200
    setupInput this

    # set up datepicker nodes for attaching to dropdown
    hourNode = hx.detached('div').node()
    minuteNode = hx.detached('div').node()
    second = hx.detached('div').node()

    @hourPicker = new hx.NumberPicker hourNode, {buttonClass: @options.buttonClass}
      .on 'change', 'hx.time-picker', (e) =>
        _.userEvent = true
        @hour e.value
    @hourPicker.selectInput.attr('tabindex', 1)
      .attr('maxlength','2')

    @minutePicker = new hx.NumberPicker minuteNode, {buttonClass: @options.buttonClass}
      .on 'change', 'hx.time-picker', (e) =>
        _.userEvent = true
        @minute e.value
    @minutePicker.selectInput.attr('tabindex', 2)
      .attr('maxlength','2')

    @secondPicker = new hx.NumberPicker second, {buttonClass: @options.buttonClass}
      .on 'change', 'hx.time-picker', (e) =>
        _.userEvent = true
        @second e.value
    @secondPicker.selectInput.attr('tabindex', 3)
      .attr('maxlength','2')

    setupDropdown = (elem) =>
      if not _.disabled
        if @input.attr('disabled') is undefined
          selection = hx.select(elem)
          selection.append hourNode
          selection.append minuteNode
          if @options.showSeconds
            selection.append second
          setupTimepicker this
        else @dropdown.hide()

    @dropdown = new hx.Dropdown(@selector, setupDropdown, {
      matchWidth: false
      ddClass: 'hx-time-picker-dropdown'
    })

    # showstart etc. don't make sense here as we don't care about the animations
    @dropdown.on 'hidestart', => @emit 'hide'
    @dropdown.on 'showstart', => @emit 'show'

    if _.disabled then @disabled(_.disabled)

  date: (date, retainTime) ->
    _ = @_
    if arguments.length > 0 and date?
      date = new Date date.getTime()
      if retainTime
        date.setHours(@hour(), @minute(), @second(), 0)
      _.selectedDate = date
      updateTimePicker this
      this
    else
      new Date _.selectedDate.getTime()

  hour: (hour) ->
    _ = @_
    if arguments.length > 0 and hour?
      _.selectedDate.setHours(hour)
      updateTimePicker this
      this
    else
      _.selectedDate.getHours()

  minute: (minute) ->
    _ = @_
    if arguments.length > 0 and minute?
      _.selectedDate.setMinutes(minute)
      updateTimePicker this
      this
    else
      _.selectedDate.getMinutes()

  second: (second) ->
    _ = @_
    if arguments.length > 0 and second?
      _.selectedDate.setSeconds(second)
      updateTimePicker this
      this
    else
      _.selectedDate.getSeconds()

  getScreenTime: -> @localizer.time(@date(), @options.showSeconds)

  locale: (locale) ->
    if arguments.length > 0
      @localizer.locale(locale)
      this
    else
      @localizer.locale()

  timezone: (timezone) ->
    if arguments.length > 0
      @localizer.timezone(timezone)
      this
    else
      @localizer.timezone()

  disabled: (disable) ->
    _ = @_
    if disable?
      if @dropdown? and @dropdown.isOpen() then @dropdown.hide()
      _.disabled = disable
      val = if disable then '' else undefined
      @input.attr('disabled', val)
      this
    else
      !!_.disabled

hx.timePicker = (options) ->
  selection = hx.detached('div')
  new TimePicker(selection.node(), options)
  selection

hx.TimePicker = TimePicker
