describe 'time-picker', ->
  describe 'api', ->
    it 'hour', ->
      tp = new hx.TimePicker(document.createElement('div'))
      expect(tp.hour(5)).toEqual(tp)
      expect(tp.hour()).toEqual(5)

    it 'minute', ->
      tp = new hx.TimePicker(document.createElement('div'))
      expect(tp.minute(5)).toEqual(tp)
      expect(tp.minute()).toEqual(5)

    it 'second', ->
      tp = new hx.TimePicker(document.createElement('div'))
      expect(tp.second(5)).toEqual(tp)
      expect(tp.second()).toEqual(5)

    it 'date', ->
      tp = new hx.TimePicker(document.createElement('div'))
      date = new Date
      expect(tp.date(date)).toEqual(tp)
      expect(tp.date()).toEqual(date)

    it 'locale', ->
      tp = new hx.TimePicker(document.createElement('div'))
      expect(tp.locale('en-gb')).toEqual(tp)
      expect(tp.locale()).toEqual('en-gb')