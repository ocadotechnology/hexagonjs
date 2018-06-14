describe 'dateTimeLocalizerMoment', ->
  # Not sure how to test this...

describe 'dateTimeLocalizer', ->
  localizer = hx.dateTimeLocalizer()
  zeroPad = hx.format.zeroPad(2)
  timezonesOffsetPattern = /(.)(\d{2}):(\d{2})$/
  testDate = new Date(1452130200000) # Thu Jan 07 2016 01:30:00 GMT+0000 (GMT)
  zeroHourDate = new Date(1452124800000) # Thu Jan 07 2016 00:00:00 GMT+0000 (GMT)
  invalidDate = new Date('Invalid Date')
  # 0 - London, -120 - Sofia, -60 Krakow, -540 Tokio, 420 Pinal (Arizona/United states)
  timezonesOffsets = [0, -120, -60, -540, 420]

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


  it 'dateOrder: should get the display order for the date so dates can be displayed correctly when localized', ->
    localizer.dateOrder().should.eql(['DD','MM','YYYY'])

  it 'dateOrder: should get the display order for the date so dates can be displayed correctly when localized in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.dateOrder().should.eql(['DD','MM','YYYY'])

  it 'weekStart: should return Monday as the week start (Sunday - Saturday, 0 - 6)', ->
    localizer.weekStart().should.equal(1)

  it 'weekStart: should return Monday as the week start (Sunday - Saturday, 0 - 6) in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.weekStart().should.equal(1)

  it 'weekDays: should localize the days of the week and return as array of 2 char days', ->
    localizer.weekDays().should.eql(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'])

  it 'weekDays: should localize the days of the week and return as array of 2 char days in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.weekDays().should.eql(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'])

  it 'todayText: should localize "today" text', ->
    localizer.todayText().should.equal('Today')

  it 'todayText: should localize "today" text in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.todayText().should.equal('Today')

  it 'day: should localize the day of the month', ->
    localizer.day(1).should.equal(1)
    localizer.day(15).should.equal(15)

  it 'day: should localize the day of the month in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.day(1).should.equal(1)
      localizer.day(15).should.equal(15)

  it 'day: should zeropad correctly localize the day of the month', ->
    localizer.day(1, true).should.equal('01')
    localizer.day(15, true).should.equal('15')

  it 'day: should zeropad correctly localize the day of the month in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.day(1, true).should.equal('01')
      localizer.day(15, true).should.equal('15')

  it 'month: should localize the month in the format of mmm', ->
    localizer.month(0).should.equal('Jan')

  it 'month: should localize the month in the format of mmm in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.month(0).should.equal('Jan')

  it 'month: should localize the month in the form at of MM', ->
    localizer.month(0, true).should.equal('01')

  it 'month: should localize the month in the form at of MM in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.month(0, true).should.equal('01')

  it 'year: should localize the full year in the format of yyyy', ->
    localizer.year(2015).should.equal(2015)

  it 'year: should localize the full year in the format of yyyy in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.year(2015).should.equal(2015)

  it 'date: should localize a date object to return a date string of dd/mm/yyyy', ->
    expectedDate = zeroPad(testDate.getDate()) + "/" + zeroPad(testDate.getMonth() + 1) + "/" + zeroPad(testDate.getFullYear())
    localizer.date(testDate).should.equal(expectedDate)

  it 'date: should localize a date object to return a date string of dd/mm/yyyy in all timezones', ->
    executeFunctionInAllTimeZones ->
      localeDate = new Date(testDate.getTime())
      expectedDate = zeroPad(localeDate.getDate()) + "/" + zeroPad(localeDate.getMonth() + 1) + "/" + zeroPad(localeDate.getFullYear())
      localizer.date(localeDate).should.equal(expectedDate, getHexagonTimeZoneOffset())

  it 'date: should localize a date object to return a date string of yyyy-mm-dd', ->
    expectedDate = zeroPad(testDate.getFullYear()) + "-" + zeroPad(testDate.getMonth() + 1) + "-" + zeroPad(testDate.getDate())
    localizer.date(testDate, true).should.equal(expectedDate)

  it 'date: should localize a date object to return a date string of yyyy-mm-dd in all timezones', ->
    executeFunctionInAllTimeZones ->
      expectedDate = zeroPad(testDate.getFullYear()) + "-" + zeroPad(testDate.getMonth() + 1) + "-" + zeroPad(testDate.getDate())
      localizer.date(testDate, true).should.equal(expectedDate)

  it 'time: should localize a date object to return a time string of hh:mm', ->
    expectedValue = testDate.getHours() + ":" + testDate.getMinutes()
    localizer.time(testDate).should.equal(expectedValue)

  it 'time: should localize a date object to return a time string of hh:mm in all timezones', ->
    executeFunctionInAllTimeZones ->
      localeDate = new Date(testDate.getTime())
      localeDate.setTime(localeDate.getTime() + (getHexagonTimeZoneOffset() * 60000))
      localeDate.setTime(localeDate.getTime() + localeDate.getTimezoneOffset() * 60 * 1000)
      localeDateString = localeDate.getHours() + ":" + localeDate.getMinutes()
      localizer.time(testDate).should.equal(localeDateString)

  it 'time: should localize a date object to return a time string of hh:mm:ss', ->
    localDate = new Date(testDate.getTime())
    localDate.setTime(localDate.getTime() + localDate.getTimezoneOffset() * 60 * 1000)
    localizer.time(localDate, true).should.equal('1:30:00')

  it 'checkTime: should return true when time is valid', ->
    localizer.checkTime('1:30:00'.split(':')).should.equal(true)

  it 'checkTime: should return true when time is valid in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.checkTime('1:30:00'.split(':')).should.equal(true)

  it 'checkTime: should return false when time is not valid', ->
    localizer.checkTime('a:30'.split(':')).should.equal(false)
    localizer.checkTime('1:b:00'.split(':')).should.equal(false)

  it 'checkTime: should return false when time is not valid in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.checkTime('a:30'.split(':')).should.equal(false)
      localizer.checkTime('1:b:00'.split(':')).should.equal(false)

  it 'stringToDate: should convert a localized date string back to a date object', ->
    localizer.stringToDate('07/01/2016').should.eql(zeroHourDate)

  it 'stringToDate: should convert a localized date string back to a date object in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.stringToDate('07/01/2016').should.eql(zeroHourDate)

  it 'stringToDate: should convert a localized date string back to a date object for inbuilt dates', ->
    localizer.stringToDate('2016-01-07', true).should.eql(zeroHourDate)

  it 'stringToDate: should convert a localized date string back to a date object for inbuilt dates in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.stringToDate('2016-01-07', true).should.eql(zeroHourDate)

  it 'stringToDate: should handle dates with short years correctly', ->
    localizer.stringToDate('07/01/16').should.eql(zeroHourDate)

  it 'stringToDate: should handle dates with short years correctly in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.stringToDate('07/01/16').should.eql(zeroHourDate)

  it 'stringToDate: should return an invalid date object when passed an incomplete date', ->
    localizer.stringToDate('07/01').should.eql(invalidDate)

  it 'stringToDate: should return an invalid date object when passed an incomplete date in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.stringToDate('07/01').should.eql(invalidDate)

  it 'stringToDate: should return an invalid date object when the day is invalid', ->
    localizer.stringToDate('/01/16').should.eql(invalidDate)
    localizer.stringToDate('999/01/16').should.eql(invalidDate)

  it 'stringToDate: should return an invalid date object when the day is invalid in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.stringToDate('/01/16').should.eql(invalidDate)
      localizer.stringToDate('999/01/16').should.eql(invalidDate)

  it 'stringToDate: should return an invalid date object when the month is invalid', ->
    localizer.stringToDate('07//16').should.eql(invalidDate)
    localizer.stringToDate('07/999/16').should.eql(invalidDate)

  it 'stringToDate: should return an invalid date object when the month is invalid in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.stringToDate('07//16').should.eql(invalidDate)
      localizer.stringToDate('07/999/16').should.eql(invalidDate)

  it 'stringToDate: should return an invalid date object when the year is invalid', ->
    localizer.stringToDate('07/01/').should.eql(invalidDate)
    localizer.stringToDate('07/01/99999').should.eql(invalidDate)

  it 'stringToDate: should return an invalid date object when the year is invalid in all timezones', ->
    executeFunctionInAllTimeZones ->
      localizer.stringToDate('07/01/').should.eql(invalidDate)
      localizer.stringToDate('07/01/99999').should.eql(invalidDate)
