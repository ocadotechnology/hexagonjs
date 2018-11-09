describe 'time-slider', ->
  describe 'api', ->
    it 'value: setter/getter works', ->
      ts = new hx.TimeSlider(document.createElement('div'))
      date = (new Date)
      ts.value(date).should.equal(ts)
      ts.value().should.eql(date)

    it 'value: setter/getter works for range', ->
      ts = new hx.TimeSlider(document.createElement('div'), {type: 'range'})
      range = {
        start: (new Date(new Date().getTime() + 6000))
        end: (new Date(new Date().getTime() + 12000))
      }
      ts.value(range).should.equal(ts)
      ts.value().should.eql(range)

    it 'min: setter/getter works with a Date', ->
      ts = new hx.TimeSlider(document.createElement('div'))
      date = (new Date)
      ts.min(date).should.equal(ts)
      ts.min().should.eql(date)

    it 'min: setter/getter works with a Number', ->
      ts = new hx.TimeSlider(document.createElement('div'))
      date = 123452
      ts.min(date).should.equal(ts)
      ts.min().should.eql(new Date(date))

    it 'max: setter/getter works with a Date', ->
      ts = new hx.TimeSlider(document.createElement('div'))
      date = (new Date)
      ts.max(date).should.equal(ts)
      ts.max().should.eql(date)

    it 'max: setter/getter works with a Number', ->
      ts = new hx.TimeSlider(document.createElement('div'))
      date = 123452
      ts.max(date).should.equal(ts)
      ts.max().should.eql(new Date(date))
