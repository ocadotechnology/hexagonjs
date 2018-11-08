describe 'dateTimeLocalizerMoment', ->
  # Not sure how to test this...

describe 'dateTimeLocalizer', ->
  localizer = undefined
  timezonesOffsetPattern = /(.)(\d{2}):(\d{2})$/
  testDate = new Date(1452130200000) # Thu Jan 07 2016 01:30:00 GMT+0000 (GMT)
  zeroHourDate = new Date(1452124800000) # Thu Jan 07 2016 00:00:00 GMT+0000 (GMT)
  invalidDate = new Date('Invalid Date')
  # 0 - London, -120 - Sofia, -60 Krakow, -540 Tokio, 420 Pinal (Arizona/United states)
  timezonesOffsets = [0, -120, -60, -540, 420]

  origWarning = hx.consoleWarning()
  origLocale = hx.preferences.locale()
  origTimezone = hx.preferences.timezone()

  beforeEach ->
    hx.consoleWarning = chai.spy()
    localizer = hx.dateTimeLocalizer()

  afterEach ->
    hx.consoleWarning = origWarning
    hx.preferences.locale(origLocale)
    hx.preferences.timezone(origTimezone)

  getHexagonTimeZoneOffset = ->
    timezonesOffsetParts = timezonesOffsetPattern.exec(hx.preferences.timezone())
    if timezonesOffsetParts
      [..., sign, hours, minutes] = timezonesOffsetParts;
      (Number(sign + hours) * 60) + Number(minutes)
    else
      hx.consoleWarning('Cannot calculate Hexagon internal timezone offset')
      false

  # This is helper function. It accepts
  # function as a argument and execute it
  # in all timezones that is provided
  executeFunctionInAllTimeZones = (func) ->
    for currentOffset in timezonesOffsets
      oldDate = Date
      # This replace of date constructor
      # working properly under browser
      # but under test this don't have
      # effect. I tried big set of things
      # with sinon also.
      # The atempt below with
      # hx.preferences.timezone(timeZone)
      # really work.
      Date = do (newDate = Date) ->
        ->
          dateResult = new (Function.prototype.bind.apply(newDate, arguments))
          dateResult.setTime(dateResult.getTime() + (currentOffset * 60000))
          dateResult
      func()
      Date = oldDate
      oldTimeZone = hx.preferences.timezone()
      timeZone = hx._.preferences.defaultTimezoneLookup(currentOffset)
      hx.preferences.timezone(timeZone)
      func()
      hx.preferences.timezone(oldTimeZone)


  describe 'dateOrder', ->
    it 'gets the display order for the date so dates can be displayed correctly when localized', ->
      localizer.dateOrder().should.eql(['DD','MM','YYYY'])

    it 'gets the display order for the date so dates can be displayed correctly when localized in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.dateOrder().should.eql(['DD','MM','YYYY'])


  describe 'weekStart', ->
    it 'returns Monday as the week start (Sunday - Saturday, 0 - 6)', ->
      localizer.weekStart().should.equal(1)

    it 'returns Monday as the week start (Sunday - Saturday, 0 - 6) in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.weekStart().should.equal(1)


  describe 'weekDays', ->
    it 'localizes the days of the week and return as array of 2 char days', ->
      localizer.weekDays().should.eql(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'])

    it 'localizes the days of the week and return as array of 2 char days in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.weekDays().should.eql(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'])


  describe 'todayText', ->
    it 'localizes "today" text', ->
      localizer.todayText().should.equal('Today')

    it 'localizes "today" text in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.todayText().should.equal('Today')


  describe 'day', ->
    it 'localizes the day of the month', ->
      localizer.day(1).should.equal(1)
      localizer.day(15).should.equal(15)

    it 'localizes the day of the month in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.day(1).should.equal(1)
        localizer.day(15).should.equal(15)

    it 'zeropads correctly the day of the month', ->
      localizer.day(1, true).should.equal('01')
      localizer.day(15, true).should.equal('15')

    it 'zeropads correctly the day of the month in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.day(1, true).should.equal('01')
        localizer.day(15, true).should.equal('15')


  describe 'month', ->
    it 'localizes the month in the format of mmm', ->
      localizer.month(0).should.equal('Jan')

    it 'localizes the month in the format of mmm in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.month(0).should.equal('Jan')

    it 'localizes the month in the form at of MM', ->
      localizer.month(0, true).should.equal('01')

    it 'localizes the month in the form at of MM in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.month(0, true).should.equal('01')


  describe 'fullMonth', ->
    it 'localizes the month in the format of mmmm', ->
      localizer.fullMonth(0).should.equal('January')

    it 'localizes the month in the format of mmmm in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.fullMonth(0).should.equal('January')


  describe 'year', ->
    it 'localizes the full year in the format of yyyy', ->
      localizer.year(2015).should.equal(2015)

    it 'localizes the full year in the format of yyyy in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.year(2015).should.equal(2015)


  describe 'date', ->
    it 'localizes a date object to return a date string of dd/mm/yyyy', ->
      expectedDate = hx.zeroPad(testDate.getDate()) + "/" + hx.zeroPad(testDate.getMonth() + 1) + "/" + hx.zeroPad(testDate.getFullYear())
      localizer.date(testDate).should.equal(expectedDate)

    it 'localizes a date object to return a date string of dd/mm/yyyy in all timezones', ->
      executeFunctionInAllTimeZones ->
        localeDate = new Date(testDate.getTime())
        expectedDate = hx.zeroPad(localeDate.getDate()) + "/" + hx.zeroPad(localeDate.getMonth() + 1) + "/" + hx.zeroPad(localeDate.getFullYear())
        localizer.date(localeDate).should.equal(expectedDate, getHexagonTimeZoneOffset())

    it 'localizes a date object to return a date string of yyyy-mm-dd', ->
      expectedDate = hx.zeroPad(testDate.getFullYear()) + "-" + hx.zeroPad(testDate.getMonth() + 1) + "-" + hx.zeroPad(testDate.getDate())
      localizer.date(testDate, true).should.equal(expectedDate)

    it 'localizes a date object to return a date string of yyyy-mm-dd in all timezones', ->
      executeFunctionInAllTimeZones ->
        expectedDate = hx.zeroPad(testDate.getFullYear()) + "-" + hx.zeroPad(testDate.getMonth() + 1) + "-" + hx.zeroPad(testDate.getDate())
        localizer.date(testDate, true).should.equal(expectedDate)


  describe 'time', ->
    it 'localizes a date object to return a time string of hh:mm', ->
      expectedValue = testDate.getHours() + ":" + testDate.getMinutes()
      localizer.time(testDate).should.equal(expectedValue)

    it 'localizes a date object to return a time string of hh:mm in all timezones', ->
      executeFunctionInAllTimeZones ->
        localeDate = new Date(testDate.getTime())
        localeDate.setTime(localeDate.getTime() + (getHexagonTimeZoneOffset() * 60000))
        localeDate.setTime(localeDate.getTime() + localeDate.getTimezoneOffset() * 60 * 1000)
        localeDateString = localeDate.getHours() + ":" + localeDate.getMinutes()
        localizer.time(testDate).should.equal(localeDateString)

    it 'localizes a date object to return a time string of hh:mm:ss', ->
      localDate = new Date(testDate.getTime())
      localDate.setTime(localDate.getTime() + localDate.getTimezoneOffset() * 60 * 1000)
      localizer.time(localDate, true).should.equal('1:30:00')


  describe 'checkTime', ->
    it 'returns true when time is valid', ->
      localizer.checkTime('1:30:00'.split(':')).should.equal(true)

    it 'returns true when time is valid in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.checkTime('1:30:00'.split(':')).should.equal(true)

    it 'returns false when time is not valid', ->
      localizer.checkTime('a:30'.split(':')).should.equal(false)
      localizer.checkTime('1:b:00'.split(':')).should.equal(false)

    it 'returns false when time is not valid in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.checkTime('a:30'.split(':')).should.equal(false)
        localizer.checkTime('1:b:00'.split(':')).should.equal(false)


  describe 'stringToDate', ->
    it 'converts a localized date string back to a date object', ->
      localizer.stringToDate('07/01/2016').should.eql(zeroHourDate)

    it 'converts a localized date string back to a date object in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.stringToDate('07/01/2016').should.eql(zeroHourDate)

    it 'converts a localized date string back to a date object for inbuilt dates', ->
      localizer.stringToDate('2016-01-07', true).should.eql(zeroHourDate)

    it 'converts a localized date string back to a date object for inbuilt dates in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.stringToDate('2016-01-07', true).should.eql(zeroHourDate)

    it 'handles dates with short years correctly', ->
      localizer.stringToDate('07/01/16').should.eql(zeroHourDate)

    it 'handles dates with short years correctly in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.stringToDate('07/01/16').should.eql(zeroHourDate)

    it 'returns an invalid date object when passed an incomplete date', ->
      localizer.stringToDate('07/01').should.eql(invalidDate)

    it 'returns an invalid date object when passed an incomplete date in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.stringToDate('07/01').should.eql(invalidDate)

    it 'returns an invalid date object when the day is invalid', ->
      localizer.stringToDate('/01/16').should.eql(invalidDate)
      localizer.stringToDate('999/01/16').should.eql(invalidDate)

    it 'returns an invalid date object when the day is invalid in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.stringToDate('/01/16').should.eql(invalidDate)
        localizer.stringToDate('999/01/16').should.eql(invalidDate)

    it 'returns an invalid date object when the month is invalid', ->
      localizer.stringToDate('07//16').should.eql(invalidDate)
      localizer.stringToDate('07/999/16').should.eql(invalidDate)

    it 'returns an invalid date object when the month is invalid in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.stringToDate('07//16').should.eql(invalidDate)
        localizer.stringToDate('07/999/16').should.eql(invalidDate)

    it 'returns an invalid date object when the year is invalid', ->
      localizer.stringToDate('07/01/').should.eql(invalidDate)
      localizer.stringToDate('07/01/99999').should.eql(invalidDate)

    it 'returns an invalid date object when the year is invalid in all timezones', ->
      executeFunctionInAllTimeZones ->
        localizer.stringToDate('07/01/').should.eql(invalidDate)
        localizer.stringToDate('07/01/99999').should.eql(invalidDate)


  describe 'locale', ->
    it 'returns the preferences locale by default', ->
      localizer.locale().should.equal(hx.preferences.locale())

    describe 'when setting an invalid locale', ->
      beforeEach ->
        localizer.locale('bob')

      it 'shows a console warning', ->
        hx.consoleWarning.should.have.been.called.with('bob is not a valid locale. If you think the locale should be added to the list contact the maintainers of hexagon')

      it 'does not update the timezone', ->
        localizer.timezone().should.equal(hx.preferences.timezone())

    describe 'when changing preferences locale', ->
      localeSpy = undefined
      beforeEach ->
        localeSpy = chai.spy()
        localizer.on 'localechange', localeSpy
        hx.preferences.locale('fy')

      it 'fires the localechange event', ->
        localeSpy.should.have.been.called.with({ cause: 'api', value: 'fy' })

    describe 'when changing preferences locale with custom instance locale', ->
      localeSpy = undefined
      beforeEach ->
        localeSpy = chai.spy()
        localizer.locale('af')
        localizer.on 'localechange', localeSpy
        hx.preferences.locale('fy')

      it 'does not fire the localechange event', ->
        localeSpy.should.not.have.been.called()

      describe 'and un-setting the instance locale', ->
        beforeEach ->
          localeSpy = chai.spy()
          localizer.on 'localechange', localeSpy
          localizer.locale(undefined)

        it 'fires the localechange event', ->
          localeSpy.should.have.been.called.with({ cause: 'api', value: hx.preferences.locale() })



  describe 'timezone', ->
    it 'returns the preferences timezone by default', ->
      localizer.timezone().should.equal(hx.preferences.timezone())

    describe 'when setting an invalid timezone', ->
      beforeEach ->
        localizer.timezone('bob')

      it 'shows a console warning', ->
        hx.consoleWarning.should.have.been.called.with('bob is not a valid timezone')

      it 'does not update the timezone', ->
        localizer.timezone().should.equal(hx.preferences.timezone())

    describe 'when changing preferences timezone', ->
      timezoneSpy = undefined
      beforeEach ->
        timezoneSpy = chai.spy()
        localizer.on 'timezonechange', timezoneSpy
        hx.preferences.timezone('UTC+09:30')

      it 'fires the timezonechange event', ->
        timezoneSpy.should.have.been.called.with({ cause: 'api', value: 'UTC+09:30' })

    describe 'when changing preferences timezone with custom instance timezone', ->
      timezoneSpy = undefined
      beforeEach ->
        timezoneSpy = chai.spy()
        localizer.timezone('UTC+08:30')
        localizer.on 'timezonechange', timezoneSpy
        hx.preferences.timezone('UTC+09:30')

      it 'does not fire the timezonechange event', ->
        timezoneSpy.should.not.have.been.called()

      describe 'and un-setting the instance timezone', ->
        beforeEach ->
          timezoneSpy = chai.spy()
          localizer.on 'timezonechange', timezoneSpy
          localizer.timezone(undefined)

        it 'fires the timezonechange event', ->
          timezoneSpy.should.have.been.called.with({ cause: 'api', value: hx.preferences.timezone() })


