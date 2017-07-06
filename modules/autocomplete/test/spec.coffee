import { userFacingText } from 'modules/user-facing-text/main'
import { AutoComplete } from 'modules/autocomplete/main'
import { range } from 'modules/utils/main'
import { div } from 'modules/selection/main'

export default () ->
  describe 'autocomplete', ->
    it 'should have user facing text defined', ->
      userFacingText('autoComplete','loading').should.equal('Loading...')
      userFacingText('autoComplete','noResultsFound').should.equal('No results found')
      userFacingText('autoComplete','otherResults').should.equal('Other Results')
      userFacingText('autoComplete','pleaseEnterMinCharacters').should.equal('Please enter $minLength or more characters')

    it 'should sort items correctly when using objects', ->
      itemsObjects = range(100).map((i) -> { id: i })

      ac = new AutoComplete(div().node(), itemsObjects, { inputMap: ({id}) -> id })

      ac.show()
      ac._.menu.items().map(({id}) -> id).should.eql(range(100))

    it 'should sort disabled items correctly', ->
      itemsObjects = range(100).map((i) -> { id: i, disabled: i % 2 == 0 })

      ac = new AutoComplete(div().node(), itemsObjects, { inputMap: ({id}) -> id })

      ac.show()
      ac._.menu.items().slice(0, 50).map(({id}) -> id).should.eql(range(50).map (i) -> 2 * i + 1)
      ac._.menu.items().slice(50, 100).map(({id}) -> id).should.eql(range(50).map (i) -> 2 * i)
