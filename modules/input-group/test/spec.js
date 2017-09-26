import { Selection } from 'selection/main'
import { inputGroup } from 'input-group/main'

export default () => {
  describe('input-group', () => {
    it('should a detached div with the correct class', () => {
      inputGroup().should.be.an.instanceof(Selection)
      inputGroup().class().should.equal('hx-input-group')
    })
  })
}
