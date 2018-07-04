import { div } from 'selection'
import { Crumbtrail } from 'crumbtrail'

export default () => {
  describe('crumbtrail', () =>

    it('items() should return the appropriate values', () => {
      const items = [
        'bob',
        'steve',
        'dave'
      ]

      const crumbtrail = new Crumbtrail(div(), {
        items
      })

      crumbtrail.items().should.not.contain(0)
    })
  )
}
