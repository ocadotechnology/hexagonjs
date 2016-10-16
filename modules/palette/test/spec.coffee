select = require('modules/selection/main')
utils = require('modules/util/main/utils')
palette = require('modules/palette/main')
chai = require('chai')
spies = require('chai-spies')
chai.use(spies)
should = chai.should()

describe 'Palette', ->
  origConsoleWarning = utils.consoleWarning

  beforeEach ->
    utils.consoleWarning = chai.spy()

  after ->
    utils.consoleWarning = origConsoleWarning

  testPaletteContextType = (type, testContexts, prefix) ->
    describe 'hx.palette.' + type + ' should correctly class an element', ->
      testContext = (context) ->
        it context, ->
          selection = select.detached('div')
          palette[type](selection, context).should.equal(selection)
          if (context)
            selection.classed(prefix + '-' + context).should.equal(true)
            palette[type](selection.node()).should.equal(context)
          else
            should.not.exist(palette[type](selection.node()))
          utils.consoleWarning.should.not.have.been.called()

      testContexts.forEach testContext

      testContext(undefined)

      it 'should return undefined if there is no context', ->
        should.not.exist(palette.context(select.detached('div')))
        utils.consoleWarning.should.not.have.been.called()

      it 'should remove existing context classes', ->
        selection = select.detached('div').class(prefix + '-positive ' + prefix + '-negative')
        palette[type](selection, 'positive').should.equal(selection)
        selection.classed(prefix + '-positive').should.equal(true)
        selection.classed(prefix + '-negative').should.equal(false)
        utils.consoleWarning.should.not.have.been.called()

      it 'supplying undefined should remove existing context classes', ->
        selection = select.detached('div').class(prefix + '-positive ' + prefix + '-negative')
        palette[type](selection, undefined).should.equal(selection)
        selection.classed(prefix + '-positive').should.equal(false)
        selection.classed(prefix + '-negative').should.equal(false)
        utils.consoleWarning.should.not.have.been.called()

      it 'should log a warning when a context is not known', ->
        palette[type](select.detached('div'), 'bob')
        utils.consoleWarning.should.have.been.called()


  contexts = ['action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled']
  testPaletteContextType 'context', contexts, 'hx'

  paletteContexts = ['default', 'action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled']
  types = ['textContext', 'backgroundContext', 'borderContext']
  typePrefixes = ['hx-text', 'hx-background', 'hx-border']

  types.forEach (type, index) ->
    testPaletteContextType type, paletteContexts, typePrefixes[index]
