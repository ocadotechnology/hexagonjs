import { div } from 'selection/main'
import { Crumbtrail } from 'crumbtrail/main'

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
