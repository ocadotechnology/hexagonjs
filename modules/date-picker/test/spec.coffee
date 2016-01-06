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


  describe 'test return types:', ->

    describe 'should return this for getter setters with parameters:', ->
      it 'dp.date', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        expect(dp.date(roundedDate())).toEqual(dp)

      it 'dp.day', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        expect(dp.day(10)).toEqual(dp)

      it 'dp.month', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        expect(dp.month(10)).toEqual(dp)

      it 'dp.year', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        expect(dp.year(10)).toEqual(dp)

      it 'dp.locale', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        expect(dp.locale('en-GB')).toEqual(dp)

    describe 'should return values for setter/getters without parameters:', ->

      it 'dp.date', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        date = roundedDate()
        expect(dp.date(date).date()).toEqual(date)

      it 'dp.day', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        expect(dp.day(10).day()).toEqual(10)

      it 'dp.month', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        expect(dp.month(10).month()).toEqual(10)

      it 'dp.year', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        expect(dp.year(10).year()).toEqual(10)

      it 'dp.locale', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        expect(dp.locale('en-GB').locale()).toEqual('en-GB')


    it 'should return this for show', ->
      dp = new hx.DatePicker(hx.detached('div').node())
      expect(dp.show()).toEqual(dp)

    it 'should return this for hide', ->
      dp = new hx.DatePicker(hx.detached('div').node())
      expect(dp.hide()).toEqual(dp)

    it 'should return this for visibleMonth', ->
      dp = new hx.DatePicker(hx.detached('div').node())
      expect(dp.visibleMonth(10, 2015)).toEqual(dp)
      expect(dp.visibleMonth()).toEqual({month: 10, year: 2015})

    it 'should return this for range', ->
      dp = new hx.DatePicker(hx.detached('div').node())
      expect(dp.range(roundedDate(), roundedDate())).toEqual(dp)



    describe 'validRange', ->

      it 'set both ends in one go and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        range = {start: roundedDate(), end: roundedDate()}
        expect(dp.validRange(range)).toEqual(dp)
        expect(dp.validRange()).toEqual(range)

      it 'set start and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        range = {start: roundedDate()}
        expect(dp.validRange(range)).toEqual(dp)
        expect(dp.validRange()).toEqual({start: range.start, end: undefined})

      it 'set end and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        range = {end: roundedDate()}
        expect(dp.validRange(range)).toEqual(dp)
        expect(dp.validRange()).toEqual({start: undefined, end: range.end})

      it 'set both ends individually and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        start = {start: roundedDate()}
        end = {end: roundedDate()}
        expect(dp.validRange(start)).toEqual(dp)
        expect(dp.validRange(end)).toEqual(dp)
        expect(dp.validRange()).toEqual({start: start.start, end: end.end})

      it 'using undefined should remove the start range', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        range1 = {start: roundedDate(), end: roundedDate()}
        range2 = {start: undefined}
        expect(dp.validRange(range1)).toEqual(dp)
        expect(dp.validRange(range2)).toEqual(dp)
        expect(dp.validRange()).toEqual({start: undefined, end: range1.end})

      it 'using undefined should remove the end range', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        range1 = {start: roundedDate(), end: roundedDate()}
        range2 = {end: undefined}
        expect(dp.validRange(range1)).toEqual(dp)
        expect(dp.validRange(range2)).toEqual(dp)
        expect(dp.validRange()).toEqual({start: range1.start, end: undefined})

      it 'using undefined should remove both ends range', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        range1 = {start: roundedDate(), end: roundedDate()}
        range2 = {start: undefined, end: undefined}
        expect(dp.validRange(range1)).toEqual(dp)
        expect(dp.validRange(range2)).toEqual(dp)
        expect(dp.validRange()).toEqual({start: undefined, end: undefined})

      it 'defaults should be undefined', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        expect(dp.validRange()).toEqual({start: undefined, end: undefined})


    describe 'range', ->
      it 'should do nothing when attempting to use without setting selectRange', ->
        dp = new hx.DatePicker(hx.detached('div').node())
        spyOn hx, 'consoleWarning'
        dp.range({start: roundedDate(true), end: roundedDate()})
        expect(hx.consoleWarning).toHaveBeenCalledWith('datePicker.range can only be used for datepickers with \'selectRange\' of true')

      it 'set both ends in one go and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node(), {selectRange: true})
        range = {start: roundedDate(true), end: roundedDate()}
        expect(dp.range(range)).toEqual(dp)
        expect(dp.range()).toEqual(whichDateFirst(range))

      it 'set start and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node(), {selectRange: true})
        range = {start: roundedDate(true)}
        expect(dp.range(range)).toEqual(dp)
        expect(dp.range()).toEqual(whichDateFirst({start: range.start, end: roundedDate(null, true)}))

      it 'set end and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node(), {selectRange: true})
        range = {end: roundedDate()}
        expect(dp.range(range)).toEqual(dp)
        expect(dp.range()).toEqual(whichDateFirst({start: roundedDate(null, true), end: range.end}))

      it 'set both ends individually and get should work', ->
        dp = new hx.DatePicker(hx.detached('div').node(), {selectRange: true})
        start = {start: roundedDate(true)}
        end = {end: roundedDate()}
        expect(dp.range(start)).toEqual(dp)
        expect(dp.range(end)).toEqual(dp)
        expect(dp.range()).toEqual(whichDateFirst({start: start.start, end: end.end}))

      it 'defaults should be today', ->
        dp = new hx.DatePicker(hx.detached('div').node(), {selectRange: true})
        expect(dp.range()).toEqual({start: roundedDate(null, true), end: roundedDate(null, true)})
