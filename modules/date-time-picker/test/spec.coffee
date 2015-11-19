describe 'date-time-picker', ->
  describe 'test return types:', ->
    dp = new hx.DateTimePicker(hx.detached('div').node())

    describe 'should return this for getter setters with parameters:', ->
      it 'datetimepicker.date', -> expect(dp.date(new Date)).toEqual(dp)
      it 'datetimepicker.day', -> expect(dp.day(10)).toEqual(dp)
      it 'datetimepicker.hour', -> expect(dp.hour(10)).toEqual(dp)
      it 'datetimepicker.minute', -> expect(dp.minute(10)).toEqual(dp)
      it 'datetimepicker.month', -> expect(dp.month(10)).toEqual(dp)
      it 'datetimepicker.second', -> expect(dp.second(10)).toEqual(dp)
      it 'datetimepicker.year', -> expect(dp.year(10)).toEqual(dp)
      it 'datetimepicker.locale', -> expect(dp.locale('en-gb')).toEqual(dp)

    describe 'should return values for setter/getters without parameters:', ->

      it 'datetimepicker.date', ->
        date = new Date
        expect(dp.date(date).date()).toEqual(date)

      it 'datetimepicker.day', -> expect(dp.day(10).day()).toEqual(10)
      it 'datetimepicker.hour', -> expect(dp.hour(10).hour()).toEqual(10)
      it 'datetimepicker.minute', -> expect(dp.minute(10).minute()).toEqual(10)
      it 'datetimepicker.month', -> expect(dp.month(10).month()).toEqual(10)
      it 'datetimepicker.second', -> expect(dp.second(10).second()).toEqual(10)
      it 'datetimepicker.year', -> expect(dp.year(10).year()).toEqual(10)
      it 'datetimepicker.locale', -> expect(dp.locale('en-gb').locale()).toEqual('en-gb')


    it 'should return this for disable', -> expect(dp.disable()).toEqual(dp)
    it 'should return this for enable', -> expect(dp.enable()).toEqual(dp)