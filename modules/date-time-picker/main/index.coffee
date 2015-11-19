class DateTimePicker extends hx.EventEmitter
  constructor: (@selector, options) ->
    super

    @options = hx.merge {
      datePickerOptions: {}
      timePickerOptions: {}
    }

    # You can't select a range for a date-time picker.
    delete @options.datePickerOptions.selectRange

    hx.component.register(@selector, this)

    @suppressCallback = false

    @selection = hx.select(@selector).classed('hx-date-time-picker', true)

    dtNode = @selection.append('div').node()
    tpNode = @selection.append('div').node()

    # To prevent the two pickers being initialised with separate disabled properties.
    @options.timePickerOptions.disabled = @options.datePickerOptions.disabled

    @datePicker = new hx.DatePicker(dtNode, @options.datePickerOptions)
    @timePicker = new hx.TimePicker(tpNode, @options.timePickerOptions)

    @datePicker.pipe(this, 'date', ['show', 'hide'])
    @timePicker.pipe(this, 'time', ['show', 'hide'])

    @datePicker.on 'change', 'hx.date-time-picker', (data) =>
      @timePicker.suppressed('change', true)
      @timePicker.date(new Date(@datePicker.date().getTime()), true)
      @timePicker.suppressed('change', false)

      # Called here as otherwise calling @date() would return the previously set date
      @emit 'date.change', data
      @emit 'change', @date()

    @timePicker.on 'change', 'hx.date-time-picker', (data) =>
      @datePicker.suppressed('change', true)
      @datePicker.date(new Date(@date().getTime()))
      @datePicker.suppressed('change', false)

      # Called here as otherwise calling @date() would return the previously set date
      @emit 'time.change', data
      @emit 'change', @date()

  date: (val, retainTime) ->
    if arguments.length > 0
      @timePicker.date val, retainTime
      this
    else @timePicker.date()

  year: (val) ->
    if arguments.length > 0
      @datePicker.year val
      this
    else @datePicker.year()

  month: (val) ->
    if arguments.length > 0
      @datePicker.month val
      this
    else @datePicker.month()

  day: (val) ->
    if arguments.length > 0
      @datePicker.day val
      this
    else @datePicker.day()

  hour: (val) ->
    if arguments.length > 0
      @timePicker.hour val
      this
    else @timePicker.hour()

  minute: (val) ->
    if arguments.length > 0
      @timePicker.minute val
      this
    else @timePicker.minute()

  second: (val) ->
    if arguments.length > 0
      @timePicker.second val
      this
    else @timePicker.second()

  getScreenDate: -> @datePicker.getScreenDate()
  getScreenTime: -> @timePicker.getScreenTime()

  locale: (locale) ->
    if arguments.length > 0
      @timePicker.locale(locale)
      @datePicker.locale(locale)
      this
    else
      @timePicker.locale()

  disable: ->
    hx.deprecatedWarning 'hx.DateTimePicker.disable()', 'Use disabled(true) instead.'
    @disabled(true)

  enable: ->
    hx.deprecatedWarning 'hx.DateTimePicker.enable()', 'Use disabled(false) instead.'
    @disabled(false)

  disabled: (disable) ->
    dpDisabled = @datePicker.disabled(disable)
    @timePicker.disabled(disable)
    if disable?
      this
    else
      dpDisabled


hx.dateTimePicker = (options) ->
  selection = hx.detached('div')
  new DateTimePicker(selection.node(), options)
  selection

hx.DateTimePicker = DateTimePicker
