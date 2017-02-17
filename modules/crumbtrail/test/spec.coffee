describe 'hx-crumbtrail tests', ->

  it 'items() should return the appropriate values', ->
    items = [
      'bob'
      'steve'
      'dave'
    ]

    crumbtrail = new hx.Crumbtrail(hx.detached('div').node(), {
      items: items
    })

    crumbtrail.items().should.not.contain(0)
