import { div } from 'selection'
import { Crumbtrail } from 'crumbtrail'

export default () ->
  describe 'crumbtrail', ->

    it 'items() should return the appropriate values', ->
      items = [
        'bob'
        'steve'
        'dave'
      ]

      crumbtrail = new Crumbtrail(div(), {
        items: items
      })

      crumbtrail.items().should.not.contain(0)
