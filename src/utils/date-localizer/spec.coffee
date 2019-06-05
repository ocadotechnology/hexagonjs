import {
  DateTimeLocalizerMoment,
  IntlDateTimeLocalizer,
  DateTimeLocalizer,
} from 'utils/date-localizer'

import { zeroPad } from 'utils/format'
import { preferences, defaultTimezoneLookup } from 'utils/preferences'
import logger from 'utils/logger'


export default () ->
  describe 'date-localizer', ->
    describe 'DateTimeLocalizerMoment', ->
      # Not sure how to test this...

    # PhantomJS doesn't support `Intl` and the polyfill doesn't support timezones...
    if navigator.userAgent.indexOf("PhantomJS") is -1
      describe 'IntlDateTimeLocalizer', ->
        intlLocalizer = undefined
        timezonesOffsetPattern = /(.)(\d{2}):(\d{2})$/

        testDate = new Date(1452130200000) # Thu Jan 07 2016 01:30:00 UTC
        zeroHourDate = new Date(1452124800000) # Thu Jan 07 2016 00:00:00 UTC
        invalidDate = new Date('Invalid Date')
        timeZones = ['Europe/London', 'Europe/Sofia', 'Europe/Krakow', 'Asia/Tokyo', 'America/Phoenix']
        locales = ['en-GB', 'en-US', 'fr']

        origWarning = logger.warn

        beforeEach ->
          logger.warn = chai.spy()
          preferences.setup({
            featureFlags: {
              useIntlFormat: true,
            },
          });
          preferences.timezone('UTC');
          intlLocalizer = new IntlDateTimeLocalizer()

        afterEach ->
          logger.warn = origWarning
          preferences.off()
          intlLocalizer.off()


        describe 'dateOrder', ->
          it 'gets the display order for the date so dates can be displayed correctly when localized', ->
            intlLocalizer.dateOrder().should.eql(['DD','MM','YYYY'])


        describe 'weekStart', ->
          it 'returns Monday as the week start (Sunday - Saturday, 0 - 6)', ->
            intlLocalizer.weekStart().should.equal(1)


        describe 'weekDays', ->
          it 'localizes the days of the week and return as array of 2 char days', ->
            intlLocalizer.weekDays().should.eql(['M', 'T', 'W', 'T', 'F', 'S', 'S'])


        describe 'todayText', ->
          it 'localizes "today" text', ->
            intlLocalizer.todayText().should.equal('Today')


        describe 'day', ->
          it 'localizes the day of the month', ->
            intlLocalizer.day(1).should.equal(1)
            intlLocalizer.day(15).should.equal(15)

          it 'zeropads correctly the day of the month', ->
            intlLocalizer.day(1, true).should.equal('01')
            intlLocalizer.day(15, true).should.equal('15')


        describe 'month', ->
          it 'localizes the month in the format of mmm', ->
            intlLocalizer.month(0).should.equal('Jan')

          it 'localizes the month in the form at of MM', ->
            intlLocalizer.month(0, true).should.equal('01')


        describe 'fullMonth', ->
          it 'localizes the month in the format of mmmm', ->
            intlLocalizer.fullMonth(0).should.equal('January')

        describe 'year', ->
          it 'localizes the full year in the format of yyyy', ->
            intlLocalizer.year(2015).should.equal('2015')

        describe 'date', ->
          it 'localizes a date object to return a date string of dd/mm/yyyy', ->
            intlLocalizer.date(testDate).should.equal('07/01/2016')

          it 'when using inbuilt date fields, localizes a date object to return a date string of yyyy-mm-dd', ->
            intlLocalizer.date(testDate, true).should.equal('2016-01-07')

          describe 'when in a different timezone', ->
            beforeEach ->
              preferences.timezone('America/Los_Angeles');

            it 'localizes a date object to return a date string of dd/mm/yyyy', ->
              intlLocalizer.date(testDate).should.equal('06/01/2016')

            it 'when using inbuilt date fields, localizes a date object to return a date string of yyyy-mm-dd', ->
              intlLocalizer.date(testDate, true).should.equal('2016-01-06')


        describe 'time', ->
          it 'localizes a date object to return a time string of hh:mm', ->
            intlLocalizer.time(testDate).should.equal('01:30')

          it 'localizes a date object to return a time string of hh:mm:ss', ->
            intlLocalizer.time(testDate, true).should.equal('01:30:00')

          it 'localizes a date object to return a time in a given timezone from preferences', ->
            preferences.timezone('America/Los_Angeles');
            intlLocalizer.time(testDate).should.equal('17:30');

          it 'localizes a date object to return a time in a given timezone from preferences (with seconds)', ->
            preferences.timezone('America/Los_Angeles');
            intlLocalizer.time(testDate, true).should.equal('17:30:00');


        describe 'checkTime', ->
          it 'returns true when time is valid', ->
            intlLocalizer.checkTime('1:30:00'.split(':')).should.equal(true)

          it 'returns false when time is not valid', ->
            intlLocalizer.checkTime('a:30'.split(':')).should.equal(false)
            intlLocalizer.checkTime('1:b:00'.split(':')).should.equal(false)


        describe 'stringToDate', ->
          it 'converts a localized date string back to a date object', ->
            intlLocalizer.stringToDate('07/01/2016').should.eql(zeroHourDate)

          it 'converts a localized date string back to a date object for inbuilt dates', ->
            intlLocalizer.stringToDate('2016-01-07', true).should.eql(zeroHourDate)

          it 'handles dates with short years correctly', ->
            intlLocalizer.stringToDate('07/01/16').should.eql(zeroHourDate)

          it 'returns an invalid date object when passed an incomplete date', ->
            intlLocalizer.stringToDate('07/01').should.eql(invalidDate)

          it 'returns an invalid date object when the day is invalid', ->
            intlLocalizer.stringToDate('/01/16').should.eql(invalidDate)
            intlLocalizer.stringToDate('999/01/16').should.eql(invalidDate)

          it 'returns an invalid date object when the month is invalid', ->
            intlLocalizer.stringToDate('07//16').should.eql(invalidDate)
            intlLocalizer.stringToDate('07/999/16').should.eql(invalidDate)

          it 'returns an invalid date object when the year is invalid', ->
            intlLocalizer.stringToDate('07/01/').should.eql(invalidDate)
            intlLocalizer.stringToDate('07/01/99999').should.eql(invalidDate)


        describe 'locale', ->
          it 'returns the preferences locale by default', ->
            intlLocalizer.locale().should.equal(preferences.locale())

          describe 'when setting an invalid locale', ->
            beforeEach ->
              intlLocalizer.locale('bob')

            it 'shows a console warning', ->
              logger.warn.should.have.been.called.with('bob is not a valid locale. If you think the locale should be added to the list contact the maintainers of hexagon')

            it 'does not update the timezone', ->
              intlLocalizer.timezone().should.equal(preferences.timezone())

          describe 'when changing preferences locale', ->
            localeSpy = undefined
            beforeEach ->
              localeSpy = chai.spy()
              intlLocalizer.on 'localechange', localeSpy
              preferences.locale('vi')

            it 'fires the localechange event', ->
              localeSpy.should.have.been.called.with({ cause: 'api', value: 'vi' })

          describe 'when changing preferences locale with custom instance locale', ->
            localeSpy = undefined
            beforeEach ->
              localeSpy = chai.spy()
              intlLocalizer.locale('af')
              intlLocalizer.on 'localechange', localeSpy
              preferences.locale('vi')

            it 'does not fire the localechange event', ->
              localeSpy.should.not.have.been.called()

            describe 'and un-setting the instance locale', ->
              beforeEach ->
                localeSpy = chai.spy()
                intlLocalizer.on 'localechange', localeSpy
                intlLocalizer.locale(undefined)

              it 'fires the localechange event', ->
                localeSpy.should.have.been.called.with({ cause: 'api', value: preferences.locale() })



        describe 'timezone', ->
          it 'returns the preferences timezone by default', ->
            intlLocalizer.timezone().should.equal(preferences.timezone())

          describe 'when setting an invalid timezone', ->
            beforeEach ->
              intlLocalizer.timezone('bob')

            it 'shows a console warning', ->
              logger.warn.should.have.been.called.with('bob is not a valid timezone')

            it 'does not update the timezone', ->
              intlLocalizer.timezone().should.equal(preferences.timezone())

          describe 'when changing preferences timezone', ->
            timezoneSpy = undefined
            beforeEach ->
              timezoneSpy = chai.spy()
              intlLocalizer.on 'timezonechange', timezoneSpy
              preferences.timezone('America/Los_Angeles')

            it 'fires the timezonechange event', ->
              timezoneSpy.should.have.been.called.with({ cause: 'api', value: 'America/Los_Angeles' })

          describe 'when changing preferences timezone with custom instance timezone', ->
            timezoneSpy = undefined
            beforeEach ->
              timezoneSpy = chai.spy()
              intlLocalizer.timezone('Europe/Sofia')
              intlLocalizer.on 'timezonechange', timezoneSpy
              preferences.timezone('America/Los_Angeles')

            it 'does not fire the timezonechange event', ->
              timezoneSpy.should.not.have.been.called()

            describe 'and un-setting the instance timezone', ->
              beforeEach ->
                timezoneSpy = chai.spy()
                intlLocalizer.on 'timezonechange', timezoneSpy
                intlLocalizer.timezone(undefined)

              it 'fires the timezonechange event', ->
                timezoneSpy.should.have.been.called.with({ cause: 'api', value: preferences.timezone() })


    describe 'DateTimeLocalizer', ->
      dateLocalizer = undefined
      timezonesOffsetPattern = /(.)(\d{2}):(\d{2})$/

      testDate = new Date(1452130200000) # Thu Jan 07 2016 01:30:00 GMT+0000 (GMT)
      zeroHourDate = new Date(1452124800000) # Thu Jan 07 2016 00:00:00 GMT+0000 (GMT)
      invalidDate = new Date('Invalid Date')
      # 0 - London, -540 Tokio, 420 Pinal (Arizona/United states)
      timezonesOffsets = [0, -540, 420]

      origWarning = logger.warn

      beforeEach ->
        preferences.setup()
        dateLocalizer = new DateTimeLocalizer()
        preferences.timezone('UTC+00:00')
        logger.warn = chai.spy()

      afterEach ->
        logger.warn = origWarning
        preferences.off()
        dateLocalizer.off()

      getHexagonTimeZoneOffset = ->
        timezonesOffsetParts = timezonesOffsetPattern.exec(preferences.timezone())
        if timezonesOffsetParts
          [..., sign, hours, minutes] = timezonesOffsetParts;
          (Number(sign + hours) * 60) + Number(minutes)
        else
          logger.warn('Cannot calculate Hexagon internal timezone offset')
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
          # preferences.timezone(timeZone)
          # really work.
          Date = do (newDate = Date) ->
            ->
              dateResult = new (Function.prototype.bind.apply(newDate, arguments))
              dateResult.setTime(dateResult.getTime() + (currentOffset * 60000))
              dateResult
          func()
          Date = oldDate
          oldTimeZone = preferences.timezone()
          timeZone = defaultTimezoneLookup(currentOffset)
          preferences.timezone(timeZone)
          func()
          preferences.timezone(oldTimeZone)


      describe 'dateOrder', ->
        it 'gets the display order for the date so dates can be displayed correctly when localized', ->
          dateLocalizer.dateOrder().should.eql(['DD','MM','YYYY'])

        it 'gets the display order for the date so dates can be displayed correctly when localized in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.dateOrder().should.eql(['DD','MM','YYYY'])


      describe 'weekStart', ->
        it 'returns Monday as the week start (Sunday - Saturday, 0 - 6)', ->
          dateLocalizer.weekStart().should.equal(1)

        it 'returns Monday as the week start (Sunday - Saturday, 0 - 6) in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.weekStart().should.equal(1)


      describe 'weekDays', ->
        it 'localizes the days of the week and return as array of 2 char days', ->
          dateLocalizer.weekDays().should.eql(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'])

        it 'localizes the days of the week and return as array of 2 char days in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.weekDays().should.eql(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'])


      describe 'todayText', ->
        it 'localizes "today" text', ->
          dateLocalizer.todayText().should.equal('Today')

        it 'localizes "today" text in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.todayText().should.equal('Today')


      describe 'day', ->
        it 'localizes the day of the month', ->
          dateLocalizer.day(1).should.equal(1)
          dateLocalizer.day(15).should.equal(15)

        it 'localizes the day of the month in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.day(1).should.equal(1)
            dateLocalizer.day(15).should.equal(15)

        it 'zeropads correctly the day of the month', ->
          dateLocalizer.day(1, true).should.equal('01')
          dateLocalizer.day(15, true).should.equal('15')

        it 'zeropads correctly the day of the month in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.day(1, true).should.equal('01')
            dateLocalizer.day(15, true).should.equal('15')


      describe 'month', ->
        it 'localizes the month in the format of mmm', ->
          dateLocalizer.month(0).should.equal('Jan')

        it 'localizes the month in the format of mmm in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.month(0).should.equal('Jan')

        it 'localizes the month in the form at of MM', ->
          dateLocalizer.month(0, true).should.equal('01')

        it 'localizes the month in the form at of MM in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.month(0, true).should.equal('01')

      describe 'fullMonth', ->
        it 'localizes the month in the format of mmmm', ->
          dateLocalizer.fullMonth(0).should.equal('January')

        it 'localizes the month in the format of mmmm in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.fullMonth(0).should.equal('January')

      describe 'year', ->
        it 'localizes the full year in the format of yyyy', ->
          dateLocalizer.year(2015).should.equal(2015)

        it 'localizes the full year in the format of yyyy in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.year(2015).should.equal(2015)


      describe 'date', ->
        it 'localizes a date object to return a date string of dd/mm/yyyy', ->
          expectedDate = zeroPad(testDate.getDate()) + "/" + zeroPad(testDate.getMonth() + 1) + "/" + zeroPad(testDate.getFullYear())
          dateLocalizer.date(testDate).should.equal(expectedDate)

        it 'localizes a date object to return a date string of dd/mm/yyyy in all timezones', ->
          executeFunctionInAllTimeZones ->
            localeDate = new Date(testDate.getTime())
            expectedDate = zeroPad(localeDate.getDate()) + "/" + zeroPad(localeDate.getMonth() + 1) + "/" + zeroPad(localeDate.getFullYear())
            dateLocalizer.date(localeDate).should.equal(expectedDate, getHexagonTimeZoneOffset())

        it 'localizes a date object to return a date string of yyyy-mm-dd', ->
          expectedDate = zeroPad(testDate.getFullYear()) + "-" + zeroPad(testDate.getMonth() + 1) + "-" + zeroPad(testDate.getDate())
          dateLocalizer.date(testDate, true).should.equal(expectedDate)

        it 'localizes a date object to return a date string of yyyy-mm-dd in all timezones', ->
          executeFunctionInAllTimeZones ->
            expectedDate = zeroPad(testDate.getFullYear()) + "-" + zeroPad(testDate.getMonth() + 1) + "-" + zeroPad(testDate.getDate())
            dateLocalizer.date(testDate, true).should.equal(expectedDate)


      describe 'time', ->
        it 'localizes a date object to return a time string of hh:mm', ->
          expectedValue = testDate.getHours() + ":" + testDate.getMinutes()
          dateLocalizer.time(testDate).should.equal(expectedValue)

        it 'localizes a date object to return a time string of hh:mm in all timezones', ->
          executeFunctionInAllTimeZones ->
            localeDate = new Date(testDate.getTime())
            localeDate.setTime(localeDate.getTime() + (getHexagonTimeZoneOffset() * 60000))
            localeDate.setTime(localeDate.getTime() + localeDate.getTimezoneOffset() * 60 * 1000)
            localeDateString = localeDate.getHours() + ":" + localeDate.getMinutes()
            dateLocalizer.time(testDate).should.equal(localeDateString)

        it 'localizes a date object to return a time string of hh:mm:ss', ->
          localDate = new Date(testDate.getTime())
          localDate.setTime(localDate.getTime() + localDate.getTimezoneOffset() * 60 * 1000)
          dateLocalizer.time(localDate, true).should.equal('1:30:00')


      describe 'checkTime', ->
        it 'returns true when time is valid', ->
          dateLocalizer.checkTime('1:30:00'.split(':')).should.equal(true)

        it 'returns false when time is not valid', ->
          dateLocalizer.checkTime('a:30'.split(':')).should.equal(false)
          dateLocalizer.checkTime('1:b:00'.split(':')).should.equal(false)

      describe 'stringToDate', ->
        it 'converts a localized date string back to a date object', ->
          dateLocalizer.stringToDate('07/01/2016').should.eql(zeroHourDate)

        it 'converts a localized date string back to a date object in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.stringToDate('07/01/2016').should.eql(zeroHourDate)

        it 'converts a localized date string back to a date object for inbuilt dates', ->
          dateLocalizer.stringToDate('2016-01-07', true).should.eql(zeroHourDate)

        it 'converts a localized date string back to a date object for inbuilt dates in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.stringToDate('2016-01-07', true).should.eql(zeroHourDate)

        it 'handles dates with short years correctly', ->
          dateLocalizer.stringToDate('07/01/16').should.eql(zeroHourDate)

        it 'handles dates with short years correctly in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.stringToDate('07/01/16').should.eql(zeroHourDate)

        it 'returns an invalid date object when passed an incomplete date', ->
          dateLocalizer.stringToDate('07/01').should.eql(invalidDate)

        it 'returns an invalid date object when passed an incomplete date in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.stringToDate('07/01').should.eql(invalidDate)

        it 'returns an invalid date object when the day is invalid', ->
          dateLocalizer.stringToDate('/01/16').should.eql(invalidDate)
          dateLocalizer.stringToDate('999/01/16').should.eql(invalidDate)

        it 'returns an invalid date object when the day is invalid in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.stringToDate('/01/16').should.eql(invalidDate)
            dateLocalizer.stringToDate('999/01/16').should.eql(invalidDate)

        it 'returns an invalid date object when the month is invalid', ->
          dateLocalizer.stringToDate('07//16').should.eql(invalidDate)
          dateLocalizer.stringToDate('07/999/16').should.eql(invalidDate)

        it 'returns an invalid date object when the month is invalid in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.stringToDate('07//16').should.eql(invalidDate)
            dateLocalizer.stringToDate('07/999/16').should.eql(invalidDate)

        it 'returns an invalid date object when the year is invalid', ->
          dateLocalizer.stringToDate('07/01/').should.eql(invalidDate)
          dateLocalizer.stringToDate('07/01/99999').should.eql(invalidDate)

        it 'returns an invalid date object when the year is invalid in all timezones', ->
          executeFunctionInAllTimeZones ->
            dateLocalizer.stringToDate('07/01/').should.eql(invalidDate)
            dateLocalizer.stringToDate('07/01/99999').should.eql(invalidDate)


      describe 'locale', ->
        it 'returns the preferences locale by default', ->
          dateLocalizer.locale().should.equal(preferences.locale())

        describe 'when setting an invalid locale', ->
          beforeEach ->
            dateLocalizer.locale('bob')

          it 'shows a console warning', ->
            logger.warn.should.have.been.called.with('bob is not a valid locale. If you think the locale should be added to the list contact the maintainers of hexagon')

          it 'does not update the timezone', ->
            dateLocalizer.timezone().should.equal(preferences.timezone())

        describe 'when changing preferences locale', ->
          localeSpy = undefined
          beforeEach ->
            localeSpy = chai.spy()
            dateLocalizer.on 'localechange', localeSpy
            preferences.locale('fy')

          it 'fires the localechange event', ->
            localeSpy.should.have.been.called.with({ cause: 'api', value: 'fy' })

        describe 'when changing preferences locale with custom instance locale', ->
          localeSpy = undefined
          beforeEach ->
            localeSpy = chai.spy()
            dateLocalizer.locale('af')
            dateLocalizer.on 'localechange', localeSpy
            preferences.locale('fy')

          it 'does not fire the localechange event', ->
            localeSpy.should.not.have.been.called()

          describe 'and un-setting the instance locale', ->
            beforeEach ->
              localeSpy = chai.spy()
              dateLocalizer.on 'localechange', localeSpy
              dateLocalizer.locale(undefined)

            it 'fires the localechange event', ->
              localeSpy.should.have.been.called.with({ cause: 'api', value: preferences.locale() })



      describe 'timezone', ->
        it 'returns the preferences timezone by default', ->
          dateLocalizer.timezone().should.equal(preferences.timezone())

        describe 'when setting an invalid timezone', ->
          beforeEach ->
            dateLocalizer.timezone('bob')

          it 'shows a console warning', ->
            logger.warn.should.have.been.called.with('bob is not a valid timezone')

          it 'does not update the timezone', ->
            dateLocalizer.timezone().should.equal(preferences.timezone())

        describe 'when changing preferences timezone', ->
          timezoneSpy = undefined
          beforeEach ->
            timezoneSpy = chai.spy()
            dateLocalizer.on 'timezonechange', timezoneSpy
            preferences.timezone('UTC+09:30')

          it 'fires the timezonechange event', ->
            timezoneSpy.should.have.been.called.with({ cause: 'api', value: 'UTC+09:30' })

        describe 'when changing preferences timezone with custom instance timezone', ->
          timezoneSpy = undefined
          beforeEach ->
            timezoneSpy = chai.spy()
            dateLocalizer.timezone('UTC+08:30')
            dateLocalizer.on 'timezonechange', timezoneSpy
            preferences.timezone('UTC+09:30')

          it 'does not fire the timezonechange event', ->
            timezoneSpy.should.not.have.been.called()

          describe 'and un-setting the instance timezone', ->
            beforeEach ->
              timezoneSpy = chai.spy()
              dateLocalizer.on 'timezonechange', timezoneSpy
              dateLocalizer.timezone(undefined)

            it 'fires the timezonechange event', ->
              timezoneSpy.should.have.been.called.with({ cause: 'api', value: preferences.timezone() })


