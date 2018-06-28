import { div } from 'selection/main'
import { DateTimePicker } from 'date-time-picker/main'

export default () ->
  describe 'date-time-picker', ->
    describe 'return types:', ->
      dp = undefined

      beforeEach ->
        dp = new DateTimePicker(div())

      describe 'should return this for getter setters with parameters:', ->
        it 'date', -> dp.date(new Date).should.equal(dp)
        it 'day', -> dp.day(10).should.equal(dp)
        it 'hour', -> dp.hour(10).should.equal(dp)
        it 'minute', -> dp.minute(10).should.equal(dp)
        it 'month', -> dp.month(10).should.equal(dp)
        it 'second', -> dp.second(10).should.equal(dp)
        it 'year', -> dp.year(10).should.equal(dp)
        it 'locale', -> dp.locale('en-GB').should.equal(dp)
        it 'disabled', -> dp.disabled(true).should.equal(dp)

      describe 'should return values for setter/getters without parameters:', ->
        it 'date', ->
          date = new Date
          dp.date(date).date().should.eql(date)

        it 'day', -> dp.day(10).day().should.equal(10)
        it 'hour', -> dp.hour(10).hour().should.equal(10)
        it 'minute', -> dp.minute(10).minute().should.equal(10)
        it 'month', -> dp.month(10).month().should.equal(10)
        it 'second', -> dp.second(10).second().should.equal(10)
        it 'year', -> dp.year(10).year().should.equal(10)
        it 'locale', -> dp.locale('en-GB').locale().should.equal('en-GB')
        it 'disabled', -> dp.disabled(true).disabled().should.equal(true)
