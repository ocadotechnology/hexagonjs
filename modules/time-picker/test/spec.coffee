TimePicker = require('../main').TimePicker

describe 'time-picker', ->
  describe 'api', ->
    it 'hour', ->
      tp = new TimePicker(document.createElement('div'))
      tp.hour(5).should.equal(tp)
      tp.hour().should.equal(5)

    it 'minute', ->
      tp = new TimePicker(document.createElement('div'))
      tp.minute(5).should.equal(tp)
      tp.minute().should.equal(5)

    it 'second', ->
      tp = new TimePicker(document.createElement('div'))
      tp.second(5).should.equal(tp)
      tp.second().should.equal(5)

    it 'date', ->
      tp = new TimePicker(document.createElement('div'))
      date = new Date
      tp.date(date).should.equal(tp)
      tp.date().should.eql(date)

    it 'locale', ->
      tp = new TimePicker(document.createElement('div'))
      tp.locale('en-GB').should.equal(tp)
      tp.locale().should.equal('en-GB')
