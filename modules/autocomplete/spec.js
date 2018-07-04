import { userFacingText } from 'user-facing-text'
import { Autocomplete } from 'autocomplete'
import { range } from 'utils'
import { select, div } from 'selection'
import { config as dropdownConfig } from 'dropdown'

export default () ->
  describe 'autocomplete', ->
    fixture = select('body').append(div('hx-test-autocomplete'))

    beforeEach ->
      dropdownConfig.attachToSelector = fixture

    afterEach ->
      dropdownConfig.attachToSelector = 'body'
      fixture.clear()

    after ->
      fixture.remove()

    it 'should have user facing text defined', ->
      userFacingText('autocomplete','loading').should.equal('Loading...')
      userFacingText('autocomplete','noResultsFound').should.equal('No results found')
      userFacingText('autocomplete','otherResults').should.equal('Other Results')
      userFacingText('autocomplete','pleaseEnterMinCharacters').should.equal('Please enter $minLength or more characters')

    it 'should sort items correctly when using objects', ->
      itemsObjects = range(100).map((i) -> { id: i })

      ac = new Autocomplete(fixture.append(div()), itemsObjects, { inputMap: ({id}) -> id })

      ac.show()
      ac._.menu.items().map(({id}) -> id).should.eql(range(100))

    it 'should sort disabled items correctly', ->
      itemsObjects = range(100).map((i) -> { id: i, disabled: i % 2 == 0 })

      ac = new Autocomplete(fixture.append(div()), itemsObjects, { inputMap: ({id}) -> id })

      ac.show()
      ac._.menu.items().slice(0, 50).map(({id}) -> id).should.eql(range(50).map (i) -> 2 * i + 1)
      ac._.menu.items().slice(50, 100).map(({id}) -> id).should.eql(range(50).map (i) -> 2 * i)
