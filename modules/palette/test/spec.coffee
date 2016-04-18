describe 'Palette', ->
  origConsoleWarning = hx.consoleWarning

  beforeEach ->
    hx.consoleWarning = chai.spy()

  after ->
    hx.consoleWarning = origConsoleWarning

  testPaletteContextType = (type, testContexts, prefix) ->
    describe "hx.palette.#{type} should correctly class an element", ->
      testContext = (context) ->
        it context, ->
          selection = hx.detached('div')
          hx.palette[type](selection, context).should.equal(selection)
          selection.classed("#{prefix}-#{context}").should.equal(true)
          hx.palette[type](selection.node()).should.equal(context)
          hx.consoleWarning.should.not.have.been.called()

      testContexts.forEach testContext

      it 'should return undefined if there is no context', ->
        should.not.exist(hx.palette.context(hx.detached('div')))
        hx.consoleWarning.should.not.have.been.called()

      it 'should remove existing context classes', ->
        selection = hx.detached('div').class("#{prefix}-positive #{prefix}-negative")
        hx.palette[type](selection, 'positive')
        selection.classed("#{prefix}-positive").should.equal(true)
        selection.classed("#{prefix}-negative").should.equal(false)
        hx.consoleWarning.should.not.have.been.called()

      it 'supplying undefined should remove existing context classes', ->
        selection = hx.detached('div').class("#{prefix}-positive #{prefix}-negative")
        hx.palette[type](selection, undefined)
        selection.classed("#{prefix}-positive").should.equal(false)
        selection.classed("#{prefix}-negative").should.equal(false)
        hx.consoleWarning.should.not.have.been.called()

      it 'should log a warning when a context is not known', ->
        hx.palette[type](hx.detached('div'), 'bob')
        hx.consoleWarning.should.have.been.called()


  contexts = ['action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast']
  testPaletteContextType 'context', contexts, 'hx'

  paletteContexts = ['default', 'action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast']
  types = ['textContext', 'backgroundContext', 'borderContext']
  typePrefixes = ['hx-text', 'hx-background', 'hx-border']

  types.forEach (type, index) ->
    testPaletteContextType type, paletteContexts, typePrefixes[index]