DatePicker = require('../main').DatePicker
utils = require('modules/util/main/utils')
select = require('modules/selection/main')
chai = require('chai')

chai.should()

describe 'hx-date-picker', ->
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

  origConsoleWarning = utils.consoleWarning

  beforeEach ->
    utils.consoleWarning = chai.spy()

  afterEach ->
    utils.consoleWarning = origConsoleWarning

  describe 'test return types:', ->

    describe 'should return this for getter setters with parameters:', ->
      it 'dp.date', ->
        dp = new DatePicker(select.detached('div').node())
        dp.date(roundedDate()).should.equal(dp)

      it 'dp.day', ->
        dp = new DatePicker(select.detached('div').node())
        dp.day(10).should.equal(dp)

      it 'dp.month', ->
        dp = new DatePicker(select.detached('div').node())
        dp.month(10).should.equal(dp)

      it 'dp.year', ->
        dp = new DatePicker(select.detached('div').node())
        dp.year(10).should.equal(dp)

      it 'dp.locale', ->
        dp = new DatePicker(select.detached('div').node())
        dp.locale('en-GB').should.equal(dp)

    describe 'should return values for setter/getters without parameters:', ->

      it 'dp.date', ->
        dp = new DatePicker(select.detached('div').node())
        date = roundedDate()
        dp.date(date).date().should.eql(date)

      it 'dp.day', ->
        dp = new DatePicker(select.detached('div').node())
        dp.day(10).day().should.equal(10)

      it 'dp.month', ->
        dp = new DatePicker(select.detached('div').node())
        dp.month(10).month().should.equal(10)

      it 'dp.year', ->
        dp = new DatePicker(select.detached('div').node())
        dp.year(10).year().should.equal(10)

      it 'dp.locale', ->
        dp = new DatePicker(select.detached('div').node())
        dp.locale('en-GB').locale().should.equal('en-GB')


    it 'should return this for show', ->
      dp = new DatePicker(select.detached('div').node())
      dp.show().should.equal(dp)

    it 'should return this for hide', ->
      dp = new DatePicker(select.detached('div').node())
      dp.hide().should.equal(dp)

    it 'should return this for visibleMonth', ->
      dp = new DatePicker(select.detached('div').node())
      dp.visibleMonth(10, 2015).should.equal(dp)
      dp.visibleMonth().should.eql({month: 10, year: 2015})

    it 'should return this for range', ->
      dp = new DatePicker(select.detached('div', {}).node())
      dp.range(roundedDate(), roundedDate()).should.equal(dp)

    describe 'validRange', ->

      it 'set both ends in one go and get should work', ->
        dp = new DatePicker(select.detached('div').node())
        range = {start: roundedDate(), end: roundedDate()}
        dp.validRange(range).should.equal(dp)
        dp.validRange().should.eql(range)

      it 'set start and get should work', ->
        dp = new DatePicker(select.detached('div').node())
        range = {start: roundedDate()}
        dp.validRange(range).should.equal(dp)
        dp.validRange().should.eql({start: range.start, end: undefined})

      it 'set end and get should work', ->
        dp = new DatePicker(select.detached('div').node())
        range = {end: roundedDate()}
        dp.validRange(range).should.equal(dp)
        dp.validRange().should.eql({start: undefined, end: range.end})

      it 'set both ends individually and get should work', ->
        dp = new DatePicker(select.detached('div').node())
        start = {start: roundedDate()}
        end = {end: roundedDate()}
        dp.validRange(start).should.equal(dp)
        dp.validRange(end).should.equal(dp)
        dp.validRange().should.eql({start: start.start, end: end.end})

      it 'using undefined should remove the start range', ->
        dp = new DatePicker(select.detached('div').node())
        range1 = {start: roundedDate(), end: roundedDate()}
        range2 = {start: undefined}
        dp.validRange(range1).should.equal(dp)
        dp.validRange(range2).should.equal(dp)
        dp.validRange().should.eql({start: undefined, end: range1.end})

      it 'using undefined should remove the end range', ->
        dp = new DatePicker(select.detached('div').node())
        range1 = {start: roundedDate(), end: roundedDate()}
        range2 = {end: undefined}
        dp.validRange(range1).should.equal(dp)
        dp.validRange(range2).should.equal(dp)
        dp.validRange().should.eql({start: range1.start, end: undefined})

      it 'using undefined should remove both ends range', ->
        dp = new DatePicker(select.detached('div').node())
        range1 = {start: roundedDate(), end: roundedDate()}
        range2 = {start: undefined, end: undefined}
        dp.validRange(range1).should.equal(dp)
        dp.validRange(range2).should.equal(dp)
        dp.validRange().should.eql({start: undefined, end: undefined})

      it 'defaults should be undefined', ->
        dp = new DatePicker(select.detached('div').node())
        dp.validRange().should.eql({start: undefined, end: undefined})

    describe 'range', ->
      it 'should do nothing when attempting to use without setting selectRange', ->
        dp = new DatePicker(select.detached('div').node())
        dp.range({start: roundedDate(true), end: roundedDate()})
        utils.consoleWarning.should.have.been.called.with('datePicker.range can only be used for datepickers with \'selectRange\' of true')

      it 'set both ends in one go and get should work', ->
        dp = new DatePicker(select.detached('div').node(), {selectRange: true})
        range = {start: roundedDate(true), end: roundedDate()}
        dp.range(range).should.equal(dp)
        dp.range().should.eql(whichDateFirst(range))

      it 'set start and get should work', ->
        dp = new DatePicker(select.detached('div').node(), {selectRange: true})
        range = {start: roundedDate(true)}
        dp.range(range).should.equal(dp)
        dp.range().should.eql(whichDateFirst({start: range.start, end: roundedDate(null, true)}))

      it 'set end and get should work', ->
        dp = new DatePicker(select.detached('div').node(), {selectRange: true})
        range = {end: roundedDate()}
        dp.range(range).should.equal(dp)
        dp.range().should.eql(whichDateFirst({start: roundedDate(null, true), end: range.end}))

      it 'set both ends individually and get should work', ->
        dp = new DatePicker(select.detached('div').node(), {selectRange: true})
        start = {start: roundedDate(true)}
        end = {end: roundedDate()}
        dp.range(start).should.equal(dp)
        dp.range(end).should.equal(dp)
        dp.range().should.eql(whichDateFirst({start: start.start, end: end.end}))

      it 'defaults should be today', ->
        dp = new DatePicker(select.detached('div').node(), {selectRange: true})
        dp.range().should.eql({start: roundedDate(null, true), end: roundedDate(null, true)})
