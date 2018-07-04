import { label } from 'label'
import { Selection } from 'selection'

export default () => {
  describe('label', () => {
    it('should create a label with the correct class', () => {
      label().should.be.an.instanceof(Selection)
      label().class().should.equal('hx-label')
      label({ context: 'positive' }).class().should.equal('hx-label hx-positive')
    })
  })
}
