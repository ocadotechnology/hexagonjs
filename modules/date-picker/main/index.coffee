# Builds the array of days to display on the calendar in 'm' view
getCalendarMonth = (year, month, weekStart) ->
  start = (new Date(year, month)).getDay() - weekStart
  if start < 0 then start += 7
  end = new Date(year, month + 1, 0).getDate()
  results = []
  results.push if start > 0 then (undefined for _ in [0..start-1]).concat([1..7-start]) else [1..7]
  i = 1 - start
  while i < end
    i += 7
    e = Math.min(i + 6, end)
    if i <= e then results.push [i..e]

  if results[results.length - 1].length < 7
    results[results.length - 1].length = 7
  results

# Returns the array of months to display on the calendar in 'y' view
getCalendarYear = ->
  [
    [0,1,2]
    [3,4,5]
    [6,7,8]
    [9,10,11]
  ]

# Builds the array of years to display on the calendar in 'd' view
getCalendarDecade = (year) ->
  # Get start of current decade
  while year % 10 isnt 0
    year -= 1

  res = []
  row = []
  for i in [0..11]
    if i > 0 and i % 3 is 0
      res.push row
      row = []
    row.push year - 1 + i
  res.push row
  res

isSelectable = (datepicker, year, month, day) ->
  validRange = datepicker.validRange()
  if validRange.start?
    validStart = new Date(validRange.start.getTime())

  if validRange.end?
    validEnd = new Date(validRange.end.getTime())

  # If we don't pass in month/day here then we assume the month/day will be
  # halfway through the year/month and use that to validate against.
  if year? and not month? and not day?
    month = 6
    day = 15
    validStart?.setDate(0)
    validEnd?.setDate(28)
    validStart?.setMonth(0)
    validEnd?.setMonth(11)

  if month? and not day?
    day = 15
    validStart?.setDate(0)
    validEnd?.setDate(28)

  visible = datepicker.visibleMonth()

  year ?= visible.year
  month ?= visible.month

  testDate = new Date(year, month, day)
  startIsSelectable = if validStart? then testDate >= validStart else true
  endIsSelectable = if validEnd? then testDate <= validEnd else true
  startIsSelectable and endIsSelectable


isSelected = (selectedDate, year, month, day) ->
  selectedDate.getFullYear() is year and
  (not month? or selectedDate.getMonth() is month) and
  (not day? or selectedDate.getDate() is day)


isBetweenDates = (range, year, month, day) ->
  testDate = new Date(year, month, day)
  testDate > range.start and testDate < range.end

isToday = (year, month, day) ->
  today = new Date()
  date = new Date(year, month, day)
  date.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  date.toString() is today.toString()



# Checks that the start and end dates fall within the valid range and that the
# end date is always after the start date.
validateDates = (datepicker) ->
  _ = datepicker._
  isRangePicker = datepicker.options.selectRange

  if _.validRange?
    if _.validRange.start?
      if _.startDate < _.validRange.start
        _.startDate = new Date(_.validRange.start.getTime())

      if isRangePicker and _.endDate < _.validRange.start
        _.endDate = new Date(_.validRange.start.getTime())

    if _.validRange.end?
      if _.startDate > _.validRange.end
        _.startDate = new Date(_.validRange.end.getTime())

      if isRangePicker and _.endDate > _.validRange.end
        _.endDate = new Date(_.validRange.end.getTime())

  if not isRangePicker
    _.endDate = _.startDate
  else
    if _.endDate < _.startDate
      tDate = _.endDate

      _.endDate = _.startDate
      _.startDate = tDate

  _.endDate.setHours(0, 0, 0, 0)
  _.startDate.setHours(0, 0, 0, 0)
  return


# Functions for setting up the calendar picker
buildCalendar = (datepicker, mode) ->
  _ = datepicker._

  _.calendarGrid.selectAll('.hx-grid-row').remove()
  _.calendarView = _.calendarGrid.view('.hx-grid-row', 'div')
    .update (d, e, i) -> calendarGridUpdate datepicker, d, e, i, mode

  mode ?= _.mode
  _.mode = mode

  localizer = datepicker.localizer

  visible = datepicker.visibleMonth()

  switch mode
    when 'd'
      data = getCalendarDecade(visible.year)
      cls = 'hx-calendar-decade'
      text = localizer.year(data[0][1]) + ' - ' + localizer.year(data[3][1])
    when 'y'
      data = getCalendarYear()
      cls = 'hx-calendar-year'
      text = localizer.year(visible.year)
    else
      data = getCalendarMonth(visible.year, visible.month - 1, localizer.weekStart())
      data.unshift 'days' # When the update gets to this it adds the days of the week as a row
      cls = 'hx-calendar-month'
      text = localizer.month(visible.month - 1) + ' / ' + localizer.year(visible.year)

  _.calendarGrid.class('hx-calendar-grid ' + cls)
  _.calendarHeadBtn.text(text)
  _.calendarTodayButton?.text(localizer.todayText())
  _.calendarView.apply(data)

calendarGridUpdate = (datepicker, data, elem, index, mode) ->
  _ = datepicker._
  element = hx.select(elem)

  if data is 'days'
    element
      .classed 'hx-grid-row-heading', true
      .view '.hx-grid'
      .update (d) -> @text(d).node()
      .apply(datepicker.localizer.weekDays())
  else
    element.view('.hx-grid')
      .enter (d) ->
        node = @append('div').class('hx-grid')
        if datepicker.options.selectRange
          node.append('div').class('hx-grid-range-bg')
        node.append('div').class('hx-grid-text')
        node.node()
      .update (d, e, i) -> calendarGridRowUpdate datepicker, d, e, i, index, mode
      .apply(data)

calendarGridRowUpdate = (datepicker, data, elem, index, rowIndex, mode) ->
  _ = datepicker._
  element = hx.select(elem)
  if not data?
    element.classed('hx-grid-out-of-range', true)
      .classed('hx-grid-selected', false)
      .classed('hx-grid-selected-start', false)
      .classed('hx-grid-selected-end', false)
      .classed('hx-grid-selected-range', false)
      .classed('hx-grid-today', false)
  else
    year = null
    month = null
    day = null

    visible = datepicker.visibleMonth()

    selectable = true

    switch mode
      when 'd'
        year = data
        screenVal = datepicker.localizer.year(data)
        selectable = if rowIndex is 0 then index isnt 0 else if rowIndex is 3 then index isnt 2 else true
      when 'y'
        month = data
        year = visible.year
        screenVal = datepicker.localizer.month(data)
      else
        day = data
        month = visible.month - 1
        year = visible.year
        screenVal = datepicker.localizer.day(data)

    isValid = isSelectable(datepicker, year, month, day) and selectable

    if datepicker.options.selectRange
      range = datepicker.range()
      selectedS = isSelected(range.start, year, month, day)
      selectedE = isSelected(range.end, year, month, day)
      betweenDates = isBetweenDates(range, year, month, day)
      selected = selectedS or selectedE
    else
      selected = isSelected(datepicker.date(), year, month, day)

    today = day and isToday(year, month, day)

    element.classed('hx-grid-out-of-range', not isValid)
      .classed('hx-grid-selected', selected)
      .classed('hx-grid-selected-start', selectedS)
      .classed('hx-grid-selected-end', selectedE)
      .classed('hx-grid-selected-range', betweenDates)
      .classed('hx-grid-today', today)

    element.select('.hx-grid-text').text(screenVal)

    if isValid
      element.on 'click', 'hx-date-picker', ->
        _.userEvent = true
        if mode isnt 'd' and mode isnt 'y'
          if day?
            date = new Date(visible.year, visible.month - 1, day)
            if not datepicker.options.selectRange
              datepicker.date(date)
              if datepicker.options.closeOnSelect then datepicker.hide()
            else
              _.clickStart ?= true

              if _.clickStart
                _.clickStart = false
                datepicker.range({
                  start: date
                  end: date
                })
              else
                _.clickStart = true
                datepicker.range({
                  start: datepicker.date()
                  end: date
                })
                if datepicker.options.closeOnSelect then datepicker.hide()
        else
          if mode is 'd'
            nMode = 'y'
            datepicker.visibleMonth(6, data)
          else
            nMode = 'm'
            datepicker.visibleMonth(data + 1, visible.year)

        setupInput datepicker
        buildCalendar datepicker, nMode
    else
      element.on 'click', -> return


# Functions for setting up the datepicker picker
buildDatepicker = (datepicker) ->
  _ = datepicker._

  day = datepicker.day()
  month = datepicker.month()
  year = datepicker.year()
  localizer = datepicker.localizer
  _.dayPicker.suppressed 'change', true
  _.monthPicker.suppressed 'change', true
  _.yearPicker.suppressed 'change', true
  _.dayPicker.value(day, localizer.day(day, true))
  _.monthPicker.value(month, localizer.month(month - 1, true))
  _.yearPicker.value(year, localizer.year(year))
  _.dayPicker.suppressed 'change', false
  _.monthPicker.suppressed 'change', false
  _.yearPicker.suppressed 'change', false



# Shared Functions for both picker types
setupInput = (datepicker) ->
  _ = datepicker._

  if datepicker.options.selectRange
    range = datepicker.range()
    _.inputStart.value(datepicker.localizer.date range.start, _.useInbuilt)
    _.inputEnd.value(datepicker.localizer.date range.end or range.start, _.useInbuilt)
  else
    _.input.value(datepicker.localizer.date datepicker.date(), _.useInbuilt)


# Function for updating the input fields and emitting the change event.
updateDatepicker = (datepicker, suppress) ->
  _ = datepicker._
  validateDates(datepicker)
  if not _.preventFeedback
    _.preventFeedback = true
    if datepicker.options.selectRange
      _.inputStart.classed('hx-date-error', false)
      _.inputEnd.classed('hx-date-error', false)
    else
      _.input.classed('hx-date-error', false)
    setupInput datepicker
    if not suppress
      datepicker.emit 'change', {type: if _.userEvent then 'user' else 'api'}
    _.userEvent = false
    _.preventFeedback = false

    if datepicker.options.type == 'calendar'
      buildCalendar datepicker
    else
      buildDatepicker datepicker


class DatePicker extends hx.EventEmitter
  constructor: (@selector, options) ->
    super

    hx.component.register(@selector, this)

    self = this

    @options = hx.merge.defined({
      type: 'calendar' # 'calendar' or 'datepicker'
      defaultView: 'm' # 'm' for month, 'y' for year, or 'd' for decade
      closeOnSelect: true
      selectRange: false
      showTodayButton: true
      allowInbuiltPicker: true # Option to allow preventing use of the inbuilt datepicker
      disabled: false
    }, options)

    _ = @_ = {
      disabled: @options.disabled
      mode: @options.defaultView
      startDate: new Date
      endDate: new Date
      uniqueId: hx.randomId()
    }

    hx.preferences.on 'localechange', 'hx.date-picker-' + _.uniqueId, => updateDatepicker this, true
    hx.preferences.on 'timezonechange', 'hx.date-picker-' + _.uniqueId, => updateDatepicker this, true

    _.startDate.setHours(0, 0, 0, 0)
    _.endDate.setHours(0, 0, 0, 0)

    @localizer = hx.dateTimeLocalizer()

    @selection = hx.select(@selector).classed('hx-date-picker', true)

    inputContainer = @selection.append('div').class('hx-date-input-container')
    icon = inputContainer.append('i').class('hx-icon hx-icon-calendar')

    timeout = undefined

    if @options.selectRange
      # For range selection, we don't want the today button and have to use a calendar.
      @options.type = 'calendar'
      @options.showTodayButton = false
      _.preventFeedback = true
      @range({})
      _.preventFeedback = false

      inputUpdate = (which) ->
        self.hide()
        clearTimeout timeout
        timeout = setTimeout ->
          date1 = self.localizer.stringToDate(_.inputStart.value(), _.useInbuilt)
          date2 = self.localizer.stringToDate(_.inputEnd.value(), _.useInbuilt)
          if which and date2 < date1
            date1 = date2
            _.inputStart.value(_.inputEnd.value())
          else if not which and date1 > date2
            date2 = date1
            _.inputEnd.value(_.inputStart.value())
          startValid = date1.getTime()
          endValid = date2.getTime()
          if startValid and endValid
            self.range({start: date1, end: date2})
            self.visibleMonth(date1.getMonth() + 1, date1.getFullYear())

          _.inputStart.classed('hx-date-error', not startValid)
          _.inputEnd.classed('hx-date-error', not endValid)
        , 500

      _.inputStart = inputContainer.append('input').class('hx-date-input')
        .on 'input', 'hx.date-picker', -> inputUpdate(false)

      inputContainer.append('i').class('hx-date-to-icon hx-icon hx-icon-angle-double-right')

      _.inputEnd = inputContainer.append('input').class('hx-date-input')
        .on 'input', 'hx.date-picker', -> inputUpdate(true)
    else
      _.useInbuilt = if @options.allowInbuiltPicker
        not moment? and hx.supports('date') and hx.supports('touch')
      else false

      _.input = inputContainer.append('input').class('hx-date-input')
        .on (if _.useInbuilt then 'blur' else 'input'), 'hx.date-picker', ->
          self.hide()
          clearTimeout timeout
          timeout = setTimeout ->
            date = self.localizer.stringToDate(_.input.value(), _.useInbuilt)
            if date.getTime()
              if date.getTime() isnt self.date().getTime()
                self.date(date)
                if self.options.type is 'calendar'
                  self.visibleMonth(date.getMonth() + 1, date.getFullYear())
            else
              _.input.classed('hx-date-error', true)
          , 500

      if _.useInbuilt
        _.input.attr('type', 'date')
          .on 'focus', 'hx.date-picker', ->
            self.emit('show')

    if @options.type is 'calendar'
      @visibleMonth(undefined)

      changeVis = (multiplier = 1) ->
        visible = self.visibleMonth()
        switch _.mode
          when 'd'
            month = visible.month
            year = visible.year + (10 * multiplier)
          when 'y'
            month = visible.month
            year = visible.year + (1 * multiplier)
          else
            month = visible.month + (1 * multiplier)
            year = visible.year

        self.visibleMonth(month, year)
        buildCalendar self

      calendarElem = hx.detached('div')
      calendarElem.class('hx-date-picker-calendar')

      calendarHeader = calendarElem.append('div')
        .class('hx-calendar-header hx-input-group')

      calendarHeader.append('button')
        .class('hx-btn hx-btn-invert hx-calendar-back')
        .on 'click', 'hx.date-picker', -> changeVis(-1)
        .append('i').class('hx-icon hx-icon-chevron-left')

      _.calendarHeadBtn = calendarHeader.append('button')
        .class('hx-btn hx-btn-invert')
        .on 'click', 'hx.date-picker', ->
          switch _.mode
            when 'd' then return
            when 'y' then buildCalendar self, 'd'
            else buildCalendar self, 'y'

      calendarHeader.append('button')
        .class('hx-btn hx-btn-invert hx-calendar-forward')
        .on 'click', 'hx.date-picker', -> changeVis()
        .append('i').class('hx-icon hx-icon-chevron-right')

      _.calendarGrid = calendarElem.append('div').class('hx-calendar-grid')

      if @options.showTodayButton
        _.calendarTodayButton = calendarElem.append('div')
          .class('hx-calendar-today-btn')
          .append('button')
          .class('hx-btn hx-btn-invert')
          .on 'click', 'hx.date-picker', ->
            date = new Date()
            date.setHours(0,0,0,0)
            self.date(date)
            buildCalendar self, 'm'
            if self.options.closeOnSelect
              self.hide()

      setupDropdown = (elem) ->
        if not _.disabled
          _.clickStart = true
          selection = hx.select(elem)
          selection.append(calendarElem)
          buildCalendar self, self.options.defaultView
        else
          self.hide()
    else
      # set up datepicker nodes for attaching to dropdown
      dayNode = hx.detached('div').node()
      monthNode = hx.detached('div').node()
      yearNode = hx.detached('div').node()

      _.dayPicker = new hx.NumberPicker(dayNode, {buttonClass: 'hx-btn-invert'})
        .on 'change', 'hx.date-picker', (e) ->
          _.userEvent = true
          self.day e.value

      _.monthPicker = new hx.NumberPicker(monthNode, {buttonClass: 'hx-btn-invert'})
        .on 'change', 'hx.date-picker', (e) ->
          _.userEvent = true
          self.month e.value

      _.yearPicker = new hx.NumberPicker(yearNode, {buttonClass: 'hx-btn-invert'})
        .on 'change', 'hx.date-picker', (e) ->
          _.userEvent = true
          self.year e.value

      _.dayPicker.selectInput.attr('tabindex', 1)
      _.monthPicker.selectInput.attr('tabindex', 2)
      _.yearPicker.selectInput.attr('tabindex', 3)

      setupDropdown = (elem) ->
        if not _.disabled
          selection = hx.select(elem)

          # add nodes in the correct order
          for i in self.localizer.dateOrder()
            switch i
              when 'DD' then selection.append dayNode
              when 'MM' then selection.append monthNode
              when 'YYYY' then selection.append yearNode
          buildDatepicker self
        else self.dropdown.hide()

    if not _.useInbuilt
      @dropdown = new hx.Dropdown(@selector, setupDropdown, {
        matchWidth: false
      })

      # showstart etc. don't make sense here as we don't care about the animations
      @dropdown.on 'hidestart', => @emit 'hide'
      @dropdown.on 'showstart', => @emit 'show'

    setupInput this
    if _.disable then @disabled(_.disabled)


  disabled: (disable) ->
    _ = @_
    if disable?
      if @dropdown? and @dropdown.isOpen() then @dropdown.hide()
      val = if disable then '' else undefined
      _.disabled = disable
      if @options.selectRange
        _.inputStart.attr('disabled', val)
        _.inputEnd.attr('disabled', val)
      else
        _.input.attr('disabled', val)
      this
    else
      !!_.disabled

  show: ->
    if not @_.useInbuilt then @dropdown.show()
    else @_.input.node().focus()
    this

  hide: ->
    if not @_.useInbuilt then @dropdown.hide()
    else @emit 'hide'
    this

  getScreenDate: (endDate) ->
    @localizer.date if not endDate then _.startDate else _.endDate

  visibleMonth: (month, year) ->
    _ = @_
    if @options.type is 'calendar'
      if arguments.length > 0
        year ?= _.visibleYear or @year()
        month ?= _.visibleMonth or @month()

        if month < 1
          month += 12
          year -= 1

        if month > 12
          month = month % 12
          year += 1

        _.visibleMonth = month - 1
        _.visibleYear = year
        this
      else
        {
          month: _.visibleMonth + 1
          year: _.visibleYear
        }
    else
      hx.consoleWarning 'Setting the visible month only applies to date pickers of type \'calendar\''
      this

  date: (date) ->
    _ = @_
    if date?
      date = new Date date.getTime()
      date.setHours(0, 0, 0, 0)
      _.startDate = date
      updateDatepicker(this)
      this
    else
      new Date _.startDate.getTime()

  day: (day) ->
    _ = @_
    if day?
      _.startDate.setDate(day)
      updateDatepicker(this)
      this
    else
      _.startDate.getDate()

  month: (month) ->
    _ = @_
    if month?
      _.startDate.setMonth(month - 1) # JS month is 0 based
      updateDatepicker(this)
      this
    else
      _.startDate.getMonth() + 1

  year: (year) ->
    _ = @_
    if year?
      _.startDate.setFullYear(year)
      updateDatepicker(this)
      this
    else
      _.startDate.getFullYear()

  range: (range) ->
    _ = @_
    if @options.selectRange
      if arguments.length > 0
        if range.start?
          range.start.setHours(0, 0, 0, 0)
          _.startDate = range.start

        if range.end?
          range.end.setHours(0, 0, 0, 0)
          _.endDate = range.end

        updateDatepicker(this)
        this
      else
        {
          start: _.startDate
          end: _.endDate
        }
    else
      hx.consoleWarning 'datePicker.range can only be used for datepickers with \'selectRange\' of true'
      return this

  validRange: (validRange) ->
    _ = @_
    _.validRange ?= {
      start: undefined
      end: undefined
    }
    if arguments.length > 0
      if 'start' of validRange
        _.validRange.start = validRange.start

      if 'end' of validRange
        _.validRange.end = validRange.end

      _.validRange.start?.setHours(0, 0, 0, 0)
      _.validRange.end?.setHours(0, 0, 0, 0)

      updateDatepicker(this)
      this
    else
      _.validRange

  locale: (locale) ->
    hx.deprecatedWarning 'hx.DatePicker::locale is deprecated. Use hx.preferences.locale instead.'
    if arguments.length > 0
      hx.preferences.locale locale
      this
    else
      hx.preferences.locale()

hx.datePicker = (options) ->
  selection = hx.detached('div')
  new DatePicker(selection.node(), options)
  selection

hx.DatePicker = DatePicker
