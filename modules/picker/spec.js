
import { picker } from 'picker'
import { userFacingText } from 'user-facing-text'

export default () => {
  describe('picker', () => {
    it('should have user facing text defined', () => {
      userFacingText('picker', 'chooseValue').should.equal('Choose a value...')
    })
  })
}
