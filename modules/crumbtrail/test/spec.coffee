select = require('modules/selection/main')
Crumbtrail = require('modules/crumbtrail/main').Crumbtrail

describe 'hx-crumbtrail', ->

  it 'items() should return the appropriate values', ->
    items = [
      'bob'
      'steve'
      'dave'
    ]

    crumbtrail = new Crumbtrail(select.detached('div').node(), {
      items: items
    })

    crumbtrail.items().should.not.contain(0)
