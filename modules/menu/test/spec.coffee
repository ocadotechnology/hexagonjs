import { Menu } from 'modules/menu/main'
import { div } from 'modules/selection/main'

export default () ->
  describe 'menu', ->
    describe 'api', ->
      it 'should use the items passed in', ->
        menu = new Menu(div(), {items: [1, 2, 3]})
        menu.items().should.eql([1, 2, 3])

      it 'should use the disabled flag', ->
        menu = new Menu(div(), {disabled: true})
        menu.disabled().should.equal(true)
