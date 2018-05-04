import chai from 'chai'
import logger from 'logger/main'

export default () => {
  describe('logger', () => {
    it('deprecated should make the correct console calls (single argument)', () => {
      const warn = chai.spy.on(console, 'warn')
      logger.deprecated('something')
      warn.should.have.been.called()
      chai.spy.restore()
    })

    it('deprecated should make the correct console calls (multi argument)', () => {
      const warn = chai.spy.on(console, 'warn')
      logger.deprecated('something', 'do something else')
      warn.should.have.been.called()
      chai.spy.restore()
    })

    it('warn should make the correct console calls (single argument)', () => {
      const warn = chai.spy.on(console, 'warn')
      logger.warn('something')
      warn.should.have.been.called()
      chai.spy.restore()
    })

    it('warn should make the correct console calls (multi argument)', () => {
      const warn = chai.spy.on(console, 'warn')
      logger.warn('something', 'you are doing something silly')
      warn.should.have.been.called()
      chai.spy.restore()
    })
  })
}