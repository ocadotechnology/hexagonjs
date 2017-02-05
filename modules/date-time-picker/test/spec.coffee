select = require('modules/selection/main')
DateTimePicker = require('modules/date-time-picker/main').DateTimePicker

describe 'date-time-picker', ->
  describe 'test return types:', ->
    dp = new DateTimePicker(select.detached('div').node())

    describe 'should return this for getter setters with parameters:', ->
      it 'datetimepicker.date', -> dp.date(new Date).should.equal(dp)
      it 'datetimepicker.day', -> dp.day(10).should.equal(dp)
      it 'datetimepicker.hour', -> dp.hour(10).should.equal(dp)
      it 'datetimepicker.minute', -> dp.minute(10).should.equal(dp)
      it 'datetimepicker.month', -> dp.month(10).should.equal(dp)
      it 'datetimepicker.second', -> dp.second(10).should.equal(dp)
      it 'datetimepicker.year', -> dp.year(10).should.equal(dp)
      it 'datetimepicker.locale', -> dp.locale('en-GB').should.equal(dp)
      it 'datetimepicker.disabled', -> dp.disabled(true).should.equal(dp)

    describe 'should return values for setter/getters without parameters:', ->

      it 'datetimepicker.date', ->
        date = new Date
        dp.date(date).date().should.eql(date)

      it 'datetimepicker.day', -> dp.day(10).day().should.equal(10)
      it 'datetimepicker.hour', -> dp.hour(10).hour().should.equal(10)
      it 'datetimepicker.minute', -> dp.minute(10).minute().should.equal(10)
      it 'datetimepicker.month', -> dp.month(10).month().should.equal(10)
      it 'datetimepicker.second', -> dp.second(10).second().should.equal(10)
      it 'datetimepicker.year', -> dp.year(10).year().should.equal(10)
      it 'datetimepicker.locale', -> dp.locale('en-GB').locale().should.equal('en-GB')
      it 'datetimepicker.disabled', -> dp.disabled(true).disabled().should.equal(true)
