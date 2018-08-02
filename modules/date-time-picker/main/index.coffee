class DateTimePicker extends hx.EventEmitter
  constructor: (@selector, options) ->
    super

    @options = hx.merge({
      datePickerOptions: {}
      timePickerOptions: {}
    }, options)

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

    updateTimePicker = (data) =>
      @timePicker.suppressed('change', true)
      @timePicker.date(@datePicker.date(), true)
      @timePicker.suppressed('change', false)

      if data?
        # Called here as otherwise calling @date() would return the previously set date
        @emit 'date.change', data
        @emit 'change', @date()

    updateDatePicker = (data) =>
      @datePicker.suppressed('change', true)
      @datePicker.date(hx.preferences.applyTimezoneOffset(@date()))
      @datePicker.suppressed('change', false)

      if data?
        # Called here as otherwise calling @date() would return the previously set date
        @emit 'time.change', data
        @emit 'change', @date()

    @datePicker.on 'change', 'hx.date-time-picker', updateTimePicker
    @timePicker.on 'change', 'hx.date-time-picker', updateDatePicker

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
      @datePicker.localizer.locale(locale)
      @timePicker.localizer.locale(locale)
      this
    else
      @datePicker.localizer.locale()

  timezone: (timezone) ->
    if arguments.length > 0
      @timePicker.localizer.timezone(timezone)
      this
    else
      @timePicker.localizer.timezone()

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
