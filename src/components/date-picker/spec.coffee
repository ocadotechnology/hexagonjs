import chai from 'chai'

import { select, div } from 'utils/selection'
import logger from 'utils/logger'
import { preferences } from 'utils/preferences'

import { DatePicker } from 'components/date-picker'
import { config as dropdownConfig } from 'components/dropdown'

import emit from 'test/utils/fake-event'
import installFakeTimers from 'test/utils/fake-time'

export default () ->
  describe 'date-picker', ->
    oneDayMs = 1000 * 60 * 60 * 24
    oneMonthMs = 31 * oneDayMs
    animationDelay = 301
    origAttachSelector = dropdownConfig.attachToSelector
    originalLoggerWarn = logger.warn

    fixture = undefined
    body = select('body')

    beforeEach ->
      logger.warn = chai.spy()
      fixture = body.append('div').class('hx-test-date-picker')
      dropdownConfig.attachToSelector = fixture

    afterEach ->
      logger.warn = originalLoggerWarn
      dropdownConfig.attachToSelector = origAttachSelector
      fixture.remove()


    roundedDate = (start, today) ->
      date = new Date
      if today? and not today
        day = (new Date).getDate()
        if start
          date.setDate(day - 2)
        else
          date.setDate(day + 2)
      date.setHours(0, 0, 0, 0)
      date

    # The datepicker re-orders the start and end in case they are accidentally
    # supplied in the wrong order so this is a helper for re-ordering them.
    whichDateFirst = (range) ->
      if range.start > range.end
        {
          start: range.end
          end: range.start
        }
      else
        range

    describe 'test return types:', ->

      describe 'should return this for getter setters with parameters:', ->
        it 'dp.date', ->
          dp = new DatePicker(div())
          dp.date(roundedDate()).should.equal(dp)

        it 'dp.day', ->
          dp = new DatePicker(div())
          dp.day(10).should.equal(dp)

        it 'dp.month', ->
          dp = new DatePicker(div())
          dp.month(10).should.equal(dp)

        it 'dp.year', ->
          dp = new DatePicker(div())
          dp.year(10).should.equal(dp)

        it 'dp.locale', ->
          dp = new DatePicker(div())
          dp.locale('en-GB').should.equal(dp)

      describe 'should return values for setter/getters without parameters:', ->

        it 'dp.date', ->
          dp = new DatePicker(div())
          date = roundedDate()
          dp.date(date).date().should.eql(date)

        it 'dp.day', ->
          dp = new DatePicker(div())
          dp.day(10).day().should.equal(10)

        it 'dp.month', ->
          dp = new DatePicker(div())
          dp.month(10).month().should.equal(10)

        it 'dp.year', ->
          dp = new DatePicker(div())
          dp.year(10).year().should.equal(10)

        it 'dp.locale', ->
          dp = new DatePicker(div())
          dp.locale('en-GB').locale().should.equal('en-GB')


      it 'should return this for show', ->
        dp = new DatePicker(div())
        dp.show().should.equal(dp)

      it 'should return this for hide', ->
        dp = new DatePicker(div())
        dp.hide().should.equal(dp)

      it 'should return this for visibleMonth', ->
        dp = new DatePicker(div())
        dp.visibleMonth(10, 2015).should.equal(dp)
        dp.visibleMonth().should.eql({month: 10, year: 2015})

      it 'should return this for range', ->
        dp = new DatePicker(div())
        dp.range(roundedDate(), roundedDate()).should.equal(dp)

      describe 'validRange', ->

        it 'set both ends in one go and get should work', ->
          dp = new DatePicker(div())
          range = {start: roundedDate(), end: roundedDate()}
          dp.validRange(range).should.equal(dp)
          dp.validRange().should.eql(range)

        it 'set start and get should work', ->
          dp = new DatePicker(div())
          range = {start: roundedDate()}
          dp.validRange(range).should.equal(dp)
          dp.validRange().should.eql({start: range.start, end: undefined})

        it 'set end and get should work', ->
          dp = new DatePicker(div())
          range = {end: roundedDate()}
          dp.validRange(range).should.equal(dp)
          dp.validRange().should.eql({start: undefined, end: range.end})

        it 'set both ends individually and get should work', ->
          dp = new DatePicker(div())
          start = {start: roundedDate()}
          end = {end: roundedDate()}
          dp.validRange(start).should.equal(dp)
          dp.validRange(end).should.equal(dp)
          dp.validRange().should.eql({start: start.start, end: end.end})

        it 'using undefined should remove the start range', ->
          dp = new DatePicker(div())
          range1 = {start: roundedDate(), end: roundedDate()}
          range2 = {start: undefined}
          dp.validRange(range1).should.equal(dp)
          dp.validRange(range2).should.equal(dp)
          dp.validRange().should.eql({start: undefined, end: range1.end})

        it 'using undefined should remove the end range', ->
          dp = new DatePicker(div())
          range1 = {start: roundedDate(), end: roundedDate()}
          range2 = {end: undefined}
          dp.validRange(range1).should.equal(dp)
          dp.validRange(range2).should.equal(dp)
          dp.validRange().should.eql({start: range1.start, end: undefined})

        it 'using undefined should remove both ends range', ->
          dp = new DatePicker(div())
          range1 = {start: roundedDate(), end: roundedDate()}
          range2 = {start: undefined, end: undefined}
          dp.validRange(range1).should.equal(dp)
          dp.validRange(range2).should.equal(dp)
          dp.validRange().should.eql({start: undefined, end: undefined})

        it 'defaults should be undefined', ->
          dp = new DatePicker(div())
          dp.validRange().should.eql({start: undefined, end: undefined})

        it 'can be set in the constructor', ->
          validRange = {
            start: roundedDate(),
            end: roundedDate()
          }
          dp = new DatePicker(div(), { validRange })
          dp.validRange().should.eql(validRange)

      describe 'range', ->
        it 'should do nothing when attempting to use without setting selectRange', ->
          dp = new DatePicker(div())
          dp.range({start: roundedDate(true), end: roundedDate()})
          logger.warn.should.have.been.called.with('datePicker.range can only be used for datepickers with \'selectRange\' of true')

        it 'set both ends in one go and get should work', ->
          dp = new DatePicker(div(), {selectRange: true})
          range = {start: roundedDate(true), end: roundedDate()}
          dp.range(range).should.equal(dp)
          dp.range().should.eql(whichDateFirst(range))

        it 'set start and get should work', ->
          dp = new DatePicker(div(), {selectRange: true})
          range = {start: roundedDate(true)}
          dp.range(range).should.equal(dp)
          dp.range().should.eql(whichDateFirst({start: range.start, end: roundedDate(null, true)}))

        it 'set end and get should work', ->
          dp = new DatePicker(div(), {selectRange: true})
          range = {end: roundedDate()}
          dp.range(range).should.equal(dp)
          dp.range().should.eql(whichDateFirst({start: roundedDate(null, true), end: range.end}))

        it 'set both ends individually and get should work', ->
          dp = new DatePicker(div(), {selectRange: true})
          start = {start: roundedDate(true)}
          end = {end: roundedDate()}
          dp.range(start).should.equal(dp)
          dp.range(end).should.equal(dp)
          dp.range().should.eql(whichDateFirst({start: start.start, end: end.end}))

        it 'defaults should be today', ->
          dp = new DatePicker(div(), {selectRange: true})
          dp.range().should.eql({start: roundedDate(null, true), end: roundedDate(null, true)})

        it 'can be set in the constructor', ->
          range = {start: roundedDate(true), end: roundedDate()}
          dp = new DatePicker(div(), { selectRange: true, range: range })
          dp.range().should.eql({start: roundedDate(true), end: roundedDate()})


      describe 'options', ->
        origDateNow = Date.now
        clock = undefined

        before ->
          clock = installFakeTimers()
          Date.now = () -> 1541675114940

        after ->
          clock.restore()
          Date.now = origDateNow

        describe 'allowViewChange', ->
          dp = undefined
          innerFixture = undefined
          headerElem = undefined

          beforeEach ->
            innerFixture = fixture.append('div')

          describe 'when false', ->
            beforeEach ->
              dp = new DatePicker(innerFixture, {
                allowViewChange: false,
                defaultView: 'y',
              })
              dp.show()
              clock.tick(animationDelay)
              headerElem = fixture.select('.hx-calendar-header-title')

            it 'creates a div for the header text', ->
              headerElem.node().tagName.toLowerCase().should.equal('div')

            it 'changes the default view to month', ->
              dp.options.defaultView.should.equal('m')

          describe 'when true', ->
            beforeEach ->
              dp = new DatePicker(innerFixture, {
                allowViewChange: true,
                defaultView: 'd'
              })
              dp.show()
              clock.tick(animationDelay)
              headerElem = fixture.select('.hx-calendar-header-title')

            it 'creates a button for the header text', ->
              headerElem.node().tagName.toLowerCase().should.equal('button')

            it 'allows the default view of decade', ->
              dp.options.defaultView.should.equal('d')


        describe 'v2Flags', ->
          describe 'when using an input', ->
            dp = undefined
            input = undefined

            beforeEach ->
              input = fixture.append('input')
              dp = new DatePicker(input, { v2Features: {
                dontModifyDateOnError: true,
                displayLongMonthInCalendar: true,
                dontSetInitialInputValue: true,
                updateVisibleMonthOnDateChange: true,
              }})

            it 'does not set the initial value', ->
              input.value().should.equal('')

            it 'has the correct visible month', ->
              dp.visibleMonth().should.eql({ month: 11, year: 2018 })


            describe 'when opening the picker', ->
              beforeEach ->
                dp.show()

              it 'renders the month header as MMMM YYYY', ->
                fixture.select('.hx-calendar-header-title').text().should.equal('November 2018')

            describe 'and passing a dateValidityCallback', ->
              dateValidityCallback = undefined
              inputDebounceDelay = 501

              beforeEach ->
                input.remove()
                input = fixture.append('input')
                dateValidityCallback = chai.spy()

                dp = new DatePicker(input, {
                  v2Features: {
                    dontModifyDateOnError: true,
                    displayLongMonthInCalendar: true,
                    dontSetInitialInputValue: true,
                    updateVisibleMonthOnDateChange: true,
                    dateValidityCallback: dateValidityCallback,
                  },
                  validRange: {
                    start: new Date(Date.now() - (oneDayMs * 4))
                    end: new Date(Date.now() + (oneDayMs * 4))
                  }
                })

              describe 'when the date is valid', ->
                beforeEach ->
                  input.value('8/11/2018')
                  emit(input.node(), 'input')
                  clock.tick(inputDebounceDelay)

                it 'calls the function with true', ->
                  dateValidityCallback.should.have.been.called.with(true, undefined)

                it 'calls the function twice', ->
                  dateValidityCallback.should.have.been.called.exactly(2)


              describe 'when the date is invalid', ->
                beforeEach ->
                  input.value('bob')
                  emit(input.node(), 'input')
                  clock.tick(inputDebounceDelay)

                it 'calls the function with false and INVALID_DATE', ->
                  dateValidityCallback.should.have.been.called.with(false, 'INVALID_DATE')

                it 'calls the function twice', ->
                  dateValidityCallback.should.have.been.called.exactly(2)

                describe 'and clearing the input value', ->
                  beforeEach ->
                    input.value('')
                    emit(input.node(), 'input')
                    clock.tick(inputDebounceDelay)

                  it 'calls the function with true', ->
                    dateValidityCallback.should.have.been.called.with(true, undefined)

                  it 'calls the function three times', ->
                    dateValidityCallback.should.have.been.called.exactly(3)


              describe 'when the date is before the valid range', ->
                beforeEach ->
                  input.value('1/11/2018')
                  emit(input.node(), 'input')
                  clock.tick(inputDebounceDelay)

                it 'calls the function with false and DATE_OUTSIDE_RANGE_START', ->
                  dateValidityCallback.should.have.been.called.with(false, 'DATE_OUTSIDE_RANGE_START')

                it 'calls the function twice', ->
                  dateValidityCallback.should.have.been.called.exactly(3)

                describe 'and clearing the input value', ->
                  beforeEach ->
                    input.value('')
                    emit(input.node(), 'input')
                    clock.tick(inputDebounceDelay)

                  it 'calls the function with true', ->
                    dateValidityCallback.should.have.been.called.with(true, undefined)

                  it 'calls the function three times', ->
                    dateValidityCallback.should.have.been.called.exactly(4)


              describe 'when the date is after the valid range', ->
                beforeEach ->
                  input.value('30/11/2018')
                  emit(input.node(), 'input')
                  clock.tick(inputDebounceDelay)

                it 'calls the function with false and DATE_OUTSIDE_RANGE_END', ->
                  dateValidityCallback.should.have.been.called.with(false, 'DATE_OUTSIDE_RANGE_END')

                it 'calls the function twice', ->
                  dateValidityCallback.should.have.been.called.exactly(3)

                describe 'and clearing the input value', ->
                  beforeEach ->
                    input.value('')
                    emit(input.node(), 'input')
                    clock.tick(inputDebounceDelay)

                  it 'calls the function with true', ->
                    dateValidityCallback.should.have.been.called.with(true, undefined)

                  it 'calls the function three times', ->
                    dateValidityCallback.should.have.been.called.exactly(4)


            describe 'and selectRange', ->
              beforeEach ->
                input.remove()
                input = fixture.append('input')
                dp = new DatePicker(input, {
                  v2Features: {
                    dontModifyDateOnError: true,
                    displayLongMonthInCalendar: true,
                    dontSetInitialInputValue: true,
                    updateVisibleMonthOnDateChange: true,
                  },
                  selectRange: true
                })

              it 'sets selectRange to false', ->
                dp.options.selectRange.should.equal(false)

              it 'logs a console warning', ->
                logger.warn.should.have.been.called.with('DatePicker: options.selectRange is not supported when using an input')

            describe 'and setting the date', ->
              beforeEach ->
                dp.date(new Date(Date.now() - (2 * oneMonthMs)))

              it 'updates the visible month', ->
                dp.visibleMonth().should.eql({ month: 9, year: 2018 })


    describe 'localized timezones', () ->
      testDateMs = Date.UTC(2019, 4, 22, 0, 20)
      origDateNow = Date.now

      beforeEach () ->
        Date.now = ()-> testDateMs

      afterEach () ->
        Date.now = origDateNow

      describe 'when using en-GB and UTC+01:00', () ->
        stdDp = undefined

        beforeEach () ->
          preferences.locale('en-GB')
          preferences.timezone('UTC+01:00')
          stdDp = new DatePicker(fixture.append(div()))

        it 'has the correct screen date', () ->
          stdDp.getScreenDate().should.equal('22/05/2019')

        it 'has the correct date', () ->
          stdDp.date().should.eql(new Date(2019, 4, 22))

      # Default date localizer doesn't support timezones
      describe 'when using en-GB and UTC-07:00', () ->
        stdDp = undefined

        beforeEach () ->
          preferences.locale('en-GB')
          preferences.timezone('UTC-07:00')
          stdDp = new DatePicker(fixture.append(div()))

        it 'has the correct screen date', () ->
          stdDp.getScreenDate().should.equal('22/05/2019')

        it 'has the correct date', () ->
          stdDp.date().should.eql(new Date(2019, 4, 22))

    # PhantomJS doesn't support `Intl` and the polyfill doesn't support timezones...
    if navigator.userAgent.indexOf('PhantomJS') is -1
      describe 'localized timezones (preferences Intl API)', () ->
        testDateMs = Date.UTC(2019, 4, 22, 0, 20)
        origDateNow = Date.now

        beforeEach () ->
          Date.now = ()-> testDateMs
          preferences.setup({
            featureFlags: {
              useIntlFormat: true,
            },
          })

        afterEach () ->
          Date.now = origDateNow
          preferences.off()
          preferences.setup()

        describe 'default behaviour', ->
          describe 'when using en-GB and Europe/London', () ->
            intlDp = undefined

            beforeEach () ->
              preferences.locale('en-GB')
              preferences.timezone('Europe/London')
              intlDp = new DatePicker(fixture.append(div()))

            it 'has the correct screen date', () ->
              intlDp.getScreenDate().should.equal('22/05/2019')

            it 'has the correct date', () ->
              intlDp.date().should.eql(new Date(2019, 4, 22))

          describe 'when using en-US and America/Los_Angeles', () ->
            intlDp = undefined

            beforeEach () ->
              preferences.locale('en')
              preferences.timezone('America/Los_Angeles')
              intlDp = new DatePicker(fixture.append(div()))

            it 'has the correct screen date', () ->
              intlDp.getScreenDate().should.equal('5/21/2019')

            it 'has the correct date', () ->
              intlDp.date().should.eql(new Date(2019, 4, 22))

            describe 'then changing to Europe/London', ->
              beforeEach ->
                preferences.timezone('Europe/London')

              it 'has the correct screen date', () ->
                intlDp.getScreenDate().should.equal('5/22/2019')

              it 'has the correct date', () ->
                intlDp.date().should.eql(new Date(2019, 4, 22))

          describe 'when using fr and Pacific/Auckland', () ->
            intlDp = undefined

            beforeEach () ->
              preferences.locale('fr')
              preferences.timezone('Pacific/Auckland')
              intlDp = new DatePicker(fixture.append(div()), {
                date: new Date(Date.UTC(2019, 4, 22, 20, 0))
              })

            it 'has the correct screen date', () ->
              intlDp.getScreenDate().should.equal('23/05/2019')

            it 'has the correct date', () ->
              intlDp.date().should.eql(new Date(2019, 4, 22))

            describe 'then changing to Europe/London', ->
              beforeEach ->
                preferences.timezone('Europe/London')

              it 'has the correct screen date', () ->
                intlDp.getScreenDate().should.equal('22/05/2019')

              it 'has the correct date', () ->
                intlDp.date().should.eql(new Date(2019, 4, 22))


        describe 'outputFullDate behaviour', ->
          describe 'when using en-GB and Europe/London', () ->
            intlDp = undefined

            beforeEach () ->
              preferences.locale('en-GB')
              preferences.timezone('Europe/London')
              intlDp = new DatePicker(fixture.append(div()), {
                outputFullDate: true
              })

            it 'has the correct screen date', () ->
              intlDp.getScreenDate().should.equal('22/05/2019')

            it 'has the correct date', () ->
              intlDp.date().should.eql(new Date(testDateMs))

          describe 'when using en-US and America/Los_Angeles', () ->
            intlDp = undefined

            beforeEach () ->
              preferences.locale('en')
              preferences.timezone('America/Los_Angeles')
              intlDp = new DatePicker(fixture.append(div()), {
                outputFullDate: true
              })

            it 'has the correct screen date', () ->
              intlDp.getScreenDate().should.equal('5/21/2019')

            it 'has the correct date', () ->
              intlDp.date().should.eql(new Date(testDateMs))

            describe 'then changing to Europe/London', ->
              beforeEach ->
                preferences.timezone('Europe/London')

              it 'has the correct screen date', () ->
                intlDp.getScreenDate().should.equal('5/22/2019')

              it 'has the correct date', () ->
                intlDp.date().should.eql(new Date(testDateMs))

          describe 'when using fr and Pacific/Auckland', () ->
            intlDp = undefined
            nzTestDate = Date.UTC(2019, 4, 22, 20, 0)

            beforeEach () ->
              preferences.locale('fr')
              preferences.timezone('Pacific/Auckland')
              intlDp = new DatePicker(fixture.append(div()), {
                date: new Date(nzTestDate),
                outputFullDate: true
              })

            it 'has the correct screen date', () ->
              intlDp.getScreenDate().should.equal('23/05/2019')

            it 'has the correct date', () ->
              intlDp.date().should.eql(new Date(nzTestDate))

            describe 'then changing to Europe/London', ->
              beforeEach ->
                preferences.timezone('Europe/London')

              it 'has the correct screen date', () ->
                intlDp.getScreenDate().should.equal('22/05/2019')

              it 'has the correct date', () ->
                intlDp.date().should.eql(new Date(nzTestDate))
