describe 'dateTimeLocalizerMoment', ->
  # Not sure how to test this...

describe 'dateTimeLocalizer', ->
  localizer = hx.dateTimeLocalizer()

  testDate = new Date(1452130200000) # Thu Jan 07 2016 01:30:00 GMT+0000 (GMT)
  zeroHourDate = new Date(1452124800000) # Thu Jan 07 2016 00:00:00 GMT+0000 (GMT)
  invalidDate = new Date('Invalid Date')

  it 'dateOrder: should get the display order for the date so dates can be displayed correctly when localized', ->
    localizer.dateOrder().should.eql(['DD','MM','YYYY'])

  it 'weekStart: should get the day the week starts on, 0 for sunday, 1 for monday etc.', ->
    localizer.weekStart().should.equal(0)

  it 'weekDays: should localize the days of the week and return as array of 2 char days', ->
    localizer.weekDays().should.eql(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])

  it 'todayText: should localize "today" text', ->
    localizer.todayText().should.equal('Today')

  it 'day: should localize the day of the month', ->
    localizer.day(1).should.equal(1)
    localizer.day(15).should.equal(15)

  it 'day: should zeropad correctly localize the day of the month', ->
    localizer.day(1, true).should.equal('01')
    localizer.day(15, true).should.equal('15')

  it 'month: should localize the month in the format of mmm', ->
    localizer.month(0).should.equal('Jan')

  it 'month: should localize the month in the form at of MM', ->
    localizer.month(0, true).should.equal('01')

  it 'year: should localize the full year in the format of yyyy', ->
    localizer.year(2015).should.equal(2015)

  it 'date: should localize a date object to return a date string of dd/mm/yyyy', ->
    localizer.date(testDate).should.equal('07/01/2016')

  it 'date: should localize a date object to return a date string of yyyy-mm-dd', ->
    localizer.date(testDate, true).should.equal('2016-01-07')

  it 'time: should localize a date object to return a time string of hh:mm', ->
    localizer.time(testDate).should.equal('1:30')

  it 'time: should localize a date object to return a time string of hh:mm:ss', ->
    localizer.time(testDate, true).should.equal('1:30:00')

  it 'checkTime: should return true when time is valid', ->
    localizer.checkTime('1:30:00'.split(':')).should.equal(true)

  it 'checkTime: should return false when time is not valid', ->
    localizer.checkTime('a:30'.split(':')).should.equal(false)
    localizer.checkTime('1:b:00'.split(':')).should.equal(false)

  it 'stringToDate: should convert a localized date string back to a date object', ->
    localizer.stringToDate('07/01/2016').should.eql(zeroHourDate)

  it 'stringToDate: should convert a localized date string back to a date object for inbuilt dates', ->
    localizer.stringToDate('2016-01-07', true).should.eql(zeroHourDate)

  it 'stringToDate: should handle dates with short years correctly', ->
    localizer.stringToDate('07/01/16').should.eql(zeroHourDate)

  it 'stringToDate: should return an invalid date object when passed an incomplete date', ->
    localizer.stringToDate('07/01').should.eql(invalidDate)

  it 'stringToDate: should return an invalid date object when the day is invalid', ->
    localizer.stringToDate('/01/16').should.eql(invalidDate)
    localizer.stringToDate('999/01/16').should.eql(invalidDate)

  it 'stringToDate: should return an invalid date object when the month is invalid', ->
    localizer.stringToDate('07//16').should.eql(invalidDate)
    localizer.stringToDate('07/999/16').should.eql(invalidDate)

  it 'stringToDate: should return an invalid date object when the year is invalid', ->
    localizer.stringToDate('07/01/').should.eql(invalidDate)
    localizer.stringToDate('07/01/99999').should.eql(invalidDate)