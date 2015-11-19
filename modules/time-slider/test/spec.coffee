describe 'time-slider', ->
  describe 'api', ->
    it 'value: setter/getter works', ->
      ts = new hx.TimeSlider(document.createElement('div'))
      date = (new Date)
      expect(ts.value(date)).toEqual(ts)
      expect(ts.value()).toEqual(date)

    it 'value: setter/getter works for range', ->
      ts = new hx.TimeSlider(document.createElement('div'), {type: 'range'})
      range = {
        start: (new Date((new Date).getTime() - 1000))
        end: (new Date)
      }
      expect(ts.value(range)).toEqual(ts)
      expect(ts.value()).toEqual(range)

    it 'min: setter/getter works with a Date', ->
      ts = new hx.TimeSlider(document.createElement('div'))
      date = (new Date)
      expect(ts.min(date)).toEqual(ts)
      expect(ts.min()).toEqual(date)

    it 'min: setter/getter works with a Number', ->
      ts = new hx.TimeSlider(document.createElement('div'))
      date = 123452
      expect(ts.min(date)).toEqual(ts)
      expect(ts.min()).toEqual(new Date(date))

    it 'max: setter/getter works with a Date', ->
      ts = new hx.TimeSlider(document.createElement('div'))
      date = (new Date)
      expect(ts.max(date)).toEqual(ts)
      expect(ts.max()).toEqual(date)

    it 'max: setter/getter works with a Number', ->
      ts = new hx.TimeSlider(document.createElement('div'))
      date = 123452
      expect(ts.max(date)).toEqual(ts)
      expect(ts.max()).toEqual(new Date(date))