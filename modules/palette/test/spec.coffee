import chai from 'chai'

import logger from 'modules/logger/main'
import { div } from 'modules/selection/main'
import { palette } from 'modules/palette/main'

should = chai.should()

export default () ->
  describe 'Palette', ->
    origConsoleWarning = logger.warn

    beforeEach ->
      logger.warn = chai.spy()

    after ->
      logger.warn = origConsoleWarning

    testPaletteContextType = (type, testContexts, prefix) ->
      describe 'hx.palette.' + type + ' should correctly class an element', ->
        testContext = (name, context) ->
          it name, ->
            selection = div()
            palette[type](selection, context).should.equal(selection)
            if (context)
              selection.classed(prefix + '-' + context).should.equal(true)
              palette[type](selection.node()).should.equal(context)
            else
              should.not.exist(palette[type](selection.node()))
            logger.warn.should.not.have.been.called()

        testContexts.forEach (d) -> testContext(d, d)

        testContext("undefined", undefined)

        it 'should return undefined if there is no context', ->
          should.not.exist(palette.context(div()))
          logger.warn.should.not.have.been.called()

        it 'should remove existing context classes', ->
          selection = div(prefix + '-positive ' + prefix + '-negative')
          palette[type](selection, 'positive').should.equal(selection)
          selection.classed(prefix + '-positive').should.equal(true)
          selection.classed(prefix + '-negative').should.equal(false)
          logger.warn.should.not.have.been.called()

        it 'supplying undefined should remove existing context classes', ->
          selection = div(prefix + '-positive ' + prefix + '-negative')
          palette[type](selection, undefined).should.equal(selection)
          selection.classed(prefix + '-positive').should.equal(false)
          selection.classed(prefix + '-negative').should.equal(false)
          logger.warn.should.not.have.been.called()

        it 'should log a warning when a context is not known', ->
          palette[type](div(), 'bob')
          logger.warn.should.have.been.called()


    contexts = ['action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled']
    testPaletteContextType 'context', contexts, 'hx'

    paletteContexts = ['default', 'action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled']
    types = ['textContext', 'backgroundContext', 'borderContext']
    typePrefixes = ['hx-text', 'hx-background', 'hx-border']

    types.forEach (type, index) ->
      testPaletteContextType type, paletteContexts, typePrefixes[index]
