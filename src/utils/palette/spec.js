import chai from 'chai'

import logger from 'utils/logger'
import { div } from 'utils/selection'
import { palette } from 'utils/palette'

export default () => {
  const should = chai.should()

  describe('Palette', () => {
    const origConsoleWarning = logger.warn

    beforeEach(() => {
      logger.warn = chai.spy()
    })

    after(() => {
      logger.warn = origConsoleWarning
    })

    function testPaletteContextType (type, testContexts, prefix) {
      describe(`hx.palette.${type} should correctly class an element`, () => {
        function testContext (name, context) {
          it(name, () => {
            const selection = div()
            palette[type](selection, context).should.equal(selection)
            if (context) {
              selection.classed(prefix + '-' + context).should.equal(true)
              palette[type](selection.node()).should.equal(context)
            } else {
              should.not.exist(palette[type](selection.node()))
            }
            logger.warn.should.not.have.been.called()
          })
        }

        testContexts.forEach(d => {
          testContext(d, d)
        })

        testContext('undefined', undefined)

        it('should return undefined if there is no context', () => {
          should.not.exist(palette.context(div()))
          logger.warn.should.not.have.been.called()
        })

        it('should remove existing context classes', () => {
          const selection = div(prefix + '-positive ' + prefix + '-negative')
          palette[type](selection, 'positive').should.equal(selection)
          selection.classed(prefix + '-positive').should.equal(true)
          selection.classed(prefix + '-negative').should.equal(false)
          logger.warn.should.not.have.been.called()
        })

        it('supplying undefined should remove existing context classes', () => {
          const selection = div(prefix + '-positive ' + prefix + '-negative')
          palette[type](selection, undefined).should.equal(selection)
          selection.classed(prefix + '-positive').should.equal(false)
          selection.classed(prefix + '-negative').should.equal(false)
          logger.warn.should.not.have.been.called()
        })

        it('should log a warning when a context is not known', () => {
          palette[type](div(), 'bob')
          logger.warn.should.have.been.called()
        })
      })
    }

    const contexts = ['action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled']
    testPaletteContextType('context', contexts, 'hx')

    const paletteContexts = ['default', 'action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled']
    const types = ['textContext', 'backgroundContext', 'borderContext']
    const typePrefixes = ['hx-text', 'hx-background', 'hx-border']

    types.forEach((type, index) => {
      testPaletteContextType(type, paletteContexts, typePrefixes[index])
    })
  })
}
