import chai from 'chai'
import logger from 'logger/main'

export default () ->
  describe 'logger', ->
    it 'deprecated should make the correct console calls (single argument)', ->
      trace = chai.spy.on(console, 'trace')
      logger.deprecated('something')
      trace.should.have.been.called()

    it 'deprecated should make the correct console calls (multi argument)', ->
      warn = chai.spy.on(console, 'warn')
      trace = chai.spy.on(console, 'trace')
      logger.deprecated('something', 'do something else')
      warn.should.have.been.called()
      trace.should.have.been.called()

    it 'warn should make the correct console calls (single argument)', ->
      trace = chai.spy.on(console, 'trace')
      logger.warn('something')
      trace.should.have.been.called()

    it 'warn should make the correct console calls (multi argument)', ->
      warn = chai.spy.on(console, 'warn')
      trace = chai.spy.on(console, 'trace')
      logger.warn('something', 'you are doing something silly')
      warn.should.have.been.called()
      trace.should.have.been.called()
