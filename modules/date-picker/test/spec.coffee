describe 'hx-date-picker', ->
  oneDayMs = 1000 * 60 * 60 * 24
  oneMonthMs = 31 * oneDayMs
  animationDelay = 301

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

  origConsoleWarning = hx.consoleWarning

  beforeEach ->
    hx.consoleWarning = chai.spy()

  afterEach ->
    hx.consoleWarning = origConsoleWarning

  describe 'test return types:', ->

    describe 'should return this for getter setters with parameters:', ->
      it 'dp.date', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        dp.date(roundedDate()).should.equal(dp)

      it 'dp.day', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        dp.day(10).should.equal(dp)

      it 'dp.month', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        dp.month(10).should.equal(dp)

      it 'dp.year', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        dp.year(10).should.equal(dp)

      it 'dp.locale', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        dp.locale('en-GB').should.equal(dp)

    describe 'should return values for setter/getters without parameters:', ->

      it 'dp.date', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        date = roundedDate()
        dp.date(date).date().should.eql(date)

      it 'dp.day', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        dp.day(10).day().should.equal(10)

      it 'dp.month', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        dp.month(10).month().should.equal(10)

      it 'dp.year', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        dp.year(10).year().should.equal(10)

      it 'dp.locale', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        dp.locale('en-GB').locale().should.equal('en-GB')


    it 'should return this for show', ->
      dp = new hx.DatePicker(hx.detached('div').node())
      dp.show().should.equal(dp)

    it 'should return this for hide', ->
      dp = new hx.DatePicker(hx.detached('div').node())
      dp.hide().should.equal(dp)

    it 'should return this for visibleMonth', ->
      dp = new hx.DatePicker(hx.detached('div').node())
      dp.visibleMonth(10, 2015).should.equal(dp)
      dp.visibleMonth().should.eql({month: 10, year: 2015})

    it 'should return this for range', ->
      dp = new hx.DatePicker(hx.detached('div', {}).node())
      dp.range(roundedDate(), roundedDate()).should.equal(dp)



    describe 'validRange', ->

      it 'set both ends in one go and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        range = {start: roundedDate(), end: roundedDate()}
        dp.validRange(range).should.equal(dp)
        dp.validRange().should.eql(range)

      it 'set start and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        range = {start: roundedDate()}
        dp.validRange(range).should.equal(dp)
        dp.validRange().should.eql({start: range.start, end: undefined})

      it 'set end and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        range = {end: roundedDate()}
        dp.validRange(range).should.equal(dp)
        dp.validRange().should.eql({start: undefined, end: range.end})

      it 'set both ends individually and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        start = {start: roundedDate()}
        end = {end: roundedDate()}
        dp.validRange(start).should.equal(dp)
        dp.validRange(end).should.equal(dp)
        dp.validRange().should.eql({start: start.start, end: end.end})

      it 'using undefined should remove the start range', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        range1 = {start: roundedDate(), end: roundedDate()}
        range2 = {start: undefined}
        dp.validRange(range1).should.equal(dp)
        dp.validRange(range2).should.equal(dp)
        dp.validRange().should.eql({start: undefined, end: range1.end})

      it 'using undefined should remove the end range', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        range1 = {start: roundedDate(), end: roundedDate()}
        range2 = {end: undefined}
        dp.validRange(range1).should.equal(dp)
        dp.validRange(range2).should.equal(dp)
        dp.validRange().should.eql({start: range1.start, end: undefined})

      it 'using undefined should remove both ends range', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        range1 = {start: roundedDate(), end: roundedDate()}
        range2 = {start: undefined, end: undefined}
        dp.validRange(range1).should.equal(dp)
        dp.validRange(range2).should.equal(dp)
        dp.validRange().should.eql({start: undefined, end: undefined})

      it 'defaults should be undefined', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        dp.validRange().should.eql({start: undefined, end: undefined})

      it 'can be set in the constructor', ->
        validRange = {
          start: roundedDate(),
          end: roundedDate()
        }
        dp = new hx.DatePicker(hx.detached('div'), { validRange })
        dp.validRange().should.eql(validRange)


    describe 'range', ->
      it 'should do nothing when attempting to use without setting selectRange', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        dp.range({start: roundedDate(true), end: roundedDate()})
        hx.consoleWarning.should.have.been.called.with('datePicker.range can only be used for datepickers with \'selectRange\' of true')

      it 'set both ends in one go and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node(), {selectRange: true})
        range = {start: roundedDate(true), end: roundedDate()}
        dp.range(range).should.equal(dp)
        dp.range().should.eql(whichDateFirst(range))

      it 'set start and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node(), {selectRange: true})
        range = {start: roundedDate(true)}
        dp.range(range).should.equal(dp)
        dp.range().should.eql(whichDateFirst({start: range.start, end: roundedDate(null, true)}))

      it 'set end and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node(), {selectRange: true})
        range = {end: roundedDate()}
        dp.range(range).should.equal(dp)
        dp.range().should.eql(whichDateFirst({start: roundedDate(null, true), end: range.end}))

      it 'set both ends individually and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node(), {selectRange: true})
        start = {start: roundedDate(true)}
        end = {end: roundedDate()}
        dp.range(start).should.equal(dp)
        dp.range(end).should.equal(dp)
        dp.range().should.eql(whichDateFirst({start: start.start, end: end.end}))

      it 'defaults should be today', ->
        dp = new hx.DatePicker(hx.detached('div').node(), {selectRange: true})
        dp.range().should.eql({start: roundedDate(null, true), end: roundedDate(null, true)})

      it 'can be set in the constructor', ->
        range = {start: roundedDate(true), end: roundedDate()}
        dp = new hx.DatePicker(hx.detached('div'), { selectRange: true, range: range })
        dp.range().should.eql({start: roundedDate(true), end: roundedDate()})


    describe 'options', ->
      origDateNow = Date.now
      origAttachSelector = hx._.dropdown.attachToSelector

      fixture = undefined
      clock = undefined
      body = hx.select('body')

      before ->
        clock = sinon.useFakeTimers()
        Date.now = () -> 1541675114940

      after ->
        clock.restore()
        Date.now = origDateNow

      beforeEach ->
        fixture = body.append('div').class('hx-test-date-picker')
        hx._.dropdown.attachToSelector = fixture

      afterEach ->
        hx._.dropdown.attachToSelector = origAttachSelector
        fixture.remove()

      describe 'allowViewChange', ->
        dp = undefined
        div = undefined
        headerElem = undefined

        beforeEach ->
          div = fixture.append('div')

        describe 'when false', ->
          beforeEach ->
            dp = new hx.DatePicker(div, {
              allowViewChange: false,
              defaultView: 'y',
            })
            dp.show()
            clock.tick(animationDelay)
            headerElem = fixture.select('.hx-calendar-header-title')

          it 'creates a div for the header text', ->
            headerElem.node().nodeName = 'DIV'

          it 'changes the default view to month', ->
            dp.options.defaultView.should.equal('m')

        describe 'when true', ->
          beforeEach ->
            dp = new hx.DatePicker(div, {
              allowViewChange: true,
              defaultView: 'd'
            })
            dp.show()
            clock.tick(animationDelay)

          it 'creates a button for the header text', ->
            headerElem.node().nodeName = 'BUTTON'

          it 'allows the default view of decade', ->
            dp.options.defaultView.should.equal('d')


      describe 'v2Features', ->
        describe 'when using an input', ->
          dp = undefined
          input = undefined

          beforeEach ->
            input = fixture.append('input')
            console.log('Test tagName', input.node().tagName)
            dp = new hx.DatePicker(input, { v2Features: true })

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

              dp = new hx.DatePicker(input, {
                v2Features: true
                dateValidityCallback: dateValidityCallback,
                validRange: {
                  start: new Date(Date.now() - (oneDayMs * 4))
                  end: new Date(Date.now() + (oneDayMs * 4))
                }
              })

            describe 'when the date is valid', ->
              beforeEach ->
                input.value('8/11/2018')
                testHelpers.fakeNodeEvent(input.node(), 'input')()
                clock.tick(inputDebounceDelay)

              it 'calls the function with true', ->
                dateValidityCallback.should.have.been.called.with(true, undefined)

              it 'calls the function once', ->
                dateValidityCallback.should.have.been.called.exactly(1)


            describe 'when the date is invalid', ->
              beforeEach ->
                input.value('bob')
                testHelpers.fakeNodeEvent(input.node(), 'input')()
                clock.tick(inputDebounceDelay)

              it 'calls the function with false and INVALID_DATE', ->
                dateValidityCallback.should.have.been.called.with(false, 'INVALID_DATE')

              it 'calls the function twice', ->
                dateValidityCallback.should.have.been.called.exactly(2)

              describe 'and clearing the input value', ->
                beforeEach ->
                  input.value('')
                  testHelpers.fakeNodeEvent(input.node(), 'input')()
                  clock.tick(inputDebounceDelay)

                it 'calls the function with true', ->
                  dateValidityCallback.should.have.been.called.with(true, undefined)

                it 'calls the function three times', ->
                  dateValidityCallback.should.have.been.called.exactly(3)


            describe 'when the date is before the valid range', ->
              beforeEach ->
                input.value('1/11/2018')
                testHelpers.fakeNodeEvent(input.node(), 'input')()
                clock.tick(inputDebounceDelay)

              it 'calls the function with false and DATE_OUTSIDE_RANGE_START', ->
                dateValidityCallback.should.have.been.called.with(false, 'DATE_OUTSIDE_RANGE_START')

              it 'calls the function twice', ->
                dateValidityCallback.should.have.been.called.exactly(3)

              describe 'and clearing the input value', ->
                beforeEach ->
                  input.value('')
                  testHelpers.fakeNodeEvent(input.node(), 'input')()
                  clock.tick(inputDebounceDelay)

                it 'calls the function with true', ->
                  dateValidityCallback.should.have.been.called.with(true, undefined)

                it 'calls the function three times', ->
                  dateValidityCallback.should.have.been.called.exactly(4)


            describe 'when the date is after the valid range', ->
              beforeEach ->
                input.value('30/11/2018')
                testHelpers.fakeNodeEvent(input.node(), 'input')()
                clock.tick(inputDebounceDelay)

              it 'calls the function with false and DATE_OUTSIDE_RANGE_END', ->
                dateValidityCallback.should.have.been.called.with(false, 'DATE_OUTSIDE_RANGE_END')

              it 'calls the function twice', ->
                dateValidityCallback.should.have.been.called.exactly(3)

              describe 'and clearing the input value', ->
                beforeEach ->
                  input.value('')
                  testHelpers.fakeNodeEvent(input.node(), 'input')()
                  clock.tick(inputDebounceDelay)

                it 'calls the function with true', ->
                  dateValidityCallback.should.have.been.called.with(true, undefined)

                it 'calls the function three times', ->
                  dateValidityCallback.should.have.been.called.exactly(4)


          describe 'and selectRange', ->
            beforeEach ->
              input.remove()
              input = fixture.append('input')
              console.log('Test tagName', input.node().tagName)
              dp = new hx.DatePicker(input, {
                v2Features: true
                selectRange: true
              })

            it 'sets selectRange to false', ->
              dp.options.selectRange.should.equal(false)

            it 'logs a console warning', ->
              hx.consoleWarning.should.have.been.called.with('DatePicker: options.selectRange is not supported when using an input')

          describe 'and setting the date', ->
            beforeEach ->
              dp.date(new Date(Date.now() - (2 * oneMonthMs)))

            it 'updates the visible month', ->
              dp.visibleMonth().should.eql({ month: 9, year: 2018 })
