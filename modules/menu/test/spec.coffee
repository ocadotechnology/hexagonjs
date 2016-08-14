Menu = require('modules/menu/main')

describe 'menu', ->
  describe 'api', ->
    it 'should use the items passed in', ->
      menu = new Menu(hx.detached('div').node(), {items: [1, 2, 3]})
      menu.items().should.eql([1, 2, 3])

    it 'should use the disabled flag', ->
      menu = new Menu(hx.detached('div').node(), {disabled: true})
      menu.disabled().should.equal(true)
