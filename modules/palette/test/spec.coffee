describe 'palette', ->
  describe 'hx.palette.context should correctly class an element', ->
    testContext = (context) ->
      selection = hx.detached('div')
      hx.palette.context(selection, context).should.equal(selection)
      selection.classed('hx-' + context).should.equal(true)
      hx.palette.context(selection.node()).should.equal(context)

    it 'positive', -> testContext('positive')
    it 'warning', -> testContext('warning')
    it 'negative', -> testContext('negative')
    it 'info', -> testContext('info')
    it 'action', -> testContext('action')
    it 'compliment', -> testContext('compliment')
    it 'contrast', -> testContext('contrast')

    it 'should return undefined if there is no context', ->
      expect(hx.palette.context(hx.detached('div'))).toEqual(undefined)

    it 'should remove existing context classes', ->
      selection = hx.detached('div').class('hx-positive hx-negative')
      hx.palette.context(selection, 'positive')
      selection.classed('hx-positive').should.equal(true)
      selection.classed('hx-negative').should.equal(false)

    it 'supplying undefined should remove existing context classes', ->
      selection = hx.detached('div').class('hx-positive hx-negative')
      hx.palette.context(selection, undefined)
      selection.classed('hx-positive').should.equal(false)
      selection.classed('hx-negative').should.equal(false)

  describe 'hx.palette.textContext should correctly class an element', ->
    testContext = (context) ->
      selection = hx.detached('div')
      hx.palette.textContext(selection, context).should.equal(selection)
      selection.classed('hx-text-' + context).should.equal(true)
      hx.palette.textContext(selection.node()).should.equal(context)

    it 'default', -> testContext('default')
    it 'positive', -> testContext('positive')
    it 'warning', -> testContext('warning')
    it 'negative', -> testContext('negative')
    it 'info', -> testContext('info')
    it 'action', -> testContext('action')
    it 'compliment', -> testContext('compliment')
    it 'contrast', -> testContext('contrast')

    it 'should return undefined if there is no context', ->
      expect(hx.palette.textContext(hx.detached('div'))).toEqual(undefined)

    it 'should remove existing textContext classes', ->
      selection = hx.detached('div').class('hx-text-positive hx-text-negative')
      hx.palette.textContext(selection, 'positive')
      selection.classed('hx-text-positive').should.equal(true)
      selection.classed('hx-text-negative').should.equal(false)

    it 'supplying undefined should remove existing context classes', ->
      selection = hx.detached('div').class('hx-text-positive hx-text-negative')
      hx.palette.textContext(selection, undefined)
      selection.classed('hx-text-positive').should.equal(false)
      selection.classed('hx-text-negative').should.equal(false)


  describe 'hx.palette.backgroundContext should correctly class an element', ->
    testContext = (context) ->
      selection = hx.detached('div')
      hx.palette.backgroundContext(selection, context).should.equal(selection)
      selection.classed('hx-background-' + context).should.equal(true)
      hx.palette.backgroundContext(selection.node()).should.equal(context)

    it 'default', -> testContext('default')
    it 'positive', -> testContext('positive')
    it 'warning', -> testContext('warning')
    it 'negative', -> testContext('negative')
    it 'info', -> testContext('info')
    it 'action', -> testContext('action')
    it 'compliment', -> testContext('compliment')
    it 'contrast', -> testContext('contrast')

    it 'should return undefined if there is no context', ->
      expect(hx.palette.backgroundContext(hx.detached('div'))).toEqual(undefined)

    it 'should remove existing backgroundContext classes', ->
      selection = hx.detached('div').class('hx-background-positive hx-background-negative')
      hx.palette.backgroundContext(selection, 'positive')
      selection.classed('hx-background-positive').should.equal(true)
      selection.classed('hx-background-negative').should.equal(false)

    it 'should remove existing backgroundContext classes', ->
      selection = hx.detached('div').class('hx-background-positive hx-background-negative')
      hx.palette.backgroundContext(selection, undefined)
      selection.classed('hx-background-positive').should.equal(false)
      selection.classed('hx-background-negative').should.equal(false)