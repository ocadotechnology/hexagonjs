import { userFacingText } from 'user-facing-text'
import { Autocomplete } from 'autocomplete'
import { range } from 'utils'
import { select, div } from 'selection'
import { config as dropdownConfig } from 'dropdown'

export default () => {
  describe('autocomplete', () => {
    const fixture = div('hx-test-autocomplete')
    select('body').add(fixture)

    after(() => {
      fixture.remove()
    })

    beforeEach(() => {
      dropdownConfig.attachToSelector = fixture
    })

    afterEach(() => {
      dropdownConfig.attachToSelector = 'body'
      fixture.clear()
    })

    it('should have user facing text defined', () => {
      userFacingText('autocomplete', 'loading').should.equal('Loading...')
      userFacingText('autocomplete', 'noResultsFound').should.equal('No results found')
      userFacingText('autocomplete', 'otherResults').should.equal('Other Results')
      userFacingText('autocomplete', 'pleaseEnterMinCharacters').should.equal('Please enter $minLength or more characters')
    })

    it('should sort items correctly when using objects', () => {
      const selection = div()
      fixture.add(selection)

      const items = range(100).map(id => ({ id }))

      const ac = new Autocomplete(selection, items, {
        inputMap: ({id}) => id
      })

      ac.show()
      ac._.menu
        .items()
        .map(({id}) => id)
        .should.eql(range(100))
    })

    it('should sort disabled items correctly', () => {
      const selection = div()
      fixture.add(selection)

      const items = range(100).map(i => {
        return {
          id: i,
          disabled: (i % 2) === 0
        }
      })

      const ac = new Autocomplete(selection, items, {
        inputMap: ({id}) => id
      })

      ac.show()
      ac._.menu
        .items()
        .slice(0, 50)
        .map(({id}) => id)
        .should.eql(range(50).map(i => (2 * i) + 1))

      ac._.menu
        .items()
        .slice(50, 100)
        .map(({id}) => id)
        .should.eql(range(50).map(i => 2 * i))
    })
  })
}
