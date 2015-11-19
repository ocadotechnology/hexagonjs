describe 'hx-slider', ->
  describe 'api', ->

    it 'value: single initial value is correct',  ->
      s = new hx.Slider(document.createElement('div'))
      expect(s.value()).toEqual(0.5)

    it 'value: single value setter/getter works',  ->
      s = new hx.Slider(document.createElement('div'))
      expect(s.value()).toEqual(0.5)
      expect(s.value(0.8)).toEqual(s)
      expect(s.value()).toEqual(0.8)

    it 'value: range initial value is correct',  ->
      s = new hx.Slider(document.createElement('div'), {type: 'range'})
      expect(s.value()).toEqual({ start: 0.25, end: 0.75 })

    it 'value: range value setter/getter works',  ->
      s = new hx.Slider(document.createElement('div'), {type: 'range'})
      expect(s.value()).toEqual({ start: 0.25, end: 0.75 })
      expect(s.value({ start: 0.2, end: 0.8 })).toEqual(s)
      expect(s.value()).toEqual({ start: 0.2, end: 0.8 })

    it 'discreteValues: initial value is correct',  ->
      s = new hx.Slider(document.createElement('div'))
      expect(s.discreteValues()).toEqual(undefined)

    it 'discreteValues: setter/getter works',  ->
      s = new hx.Slider(document.createElement('div'))
      expect(s.discreteValues()).toEqual(undefined)
      expect(s.discreteValues([1, 2, 3])).toEqual(s)
      expect(s.discreteValues()).toEqual([1, 2, 3])

    it 'min: initial value is correct',  ->
      s = new hx.Slider(document.createElement('div'))
      expect(s.min()).toEqual(0)

    it 'min: setter/getter works',  ->
      s = new hx.Slider(document.createElement('div'))
      expect(s.min()).toEqual(0)
      expect(s.min(0.5)).toEqual(s)
      expect(s.min()).toEqual(0.5)

    it 'max: initial value is correct',  ->
      s = new hx.Slider(document.createElement('div'))
      expect(s.max()).toEqual(1)

    it 'max: setter/getter works',  ->
      s = new hx.Slider(document.createElement('div'))
      expect(s.max()).toEqual(1)
      expect(s.max(0.5)).toEqual(s)
      expect(s.max()).toEqual(0.5)

    it 'step: initial value is correct',  ->
      s = new hx.Slider(document.createElement('div'))
      expect(s.step()).toEqual(undefined)

    it 'step: setter/getter works',  ->
      s = new hx.Slider(document.createElement('div'))
      expect(s.step()).toEqual(undefined)
      expect(s.step(0.5)).toEqual(s)
      expect(s.step()).toEqual(0.5)

    it 'renderer: initial value is correct',  ->
      s = new hx.Slider(document.createElement('div'))
      expect(s.renderer()).toEqual(jasmine.any(Function))

    it 'renderer: setter/getter works',  ->
      f = ->
      s = new hx.Slider(document.createElement('div'))
      expect(s.renderer()).toEqual(jasmine.any(Function))
      expect(s.renderer(f)).toEqual(s)
      expect(s.renderer()).toEqual(f)
