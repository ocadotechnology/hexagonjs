userFacingText = require('modules/user-facing-text/main')
AutoComplete = require('modules/autocomplete/main').AutoComplete
utils = require('modules/util/main/utils')
selection = require('modules/selection/main')

describe 'autocomplete', ->
  it 'should have user facing text defined', ->
    userFacingText('autoComplete','loading').should.equal('Loading...')
    userFacingText('autoComplete','noResultsFound').should.equal('No results found')
    userFacingText('autoComplete','otherResults').should.equal('Other Results')
    userFacingText('autoComplete','pleaseEnterMinCharacters').should.equal('Please enter $minLength or more characters')

  it 'should sort items correctly when using objects', ->
    itemsObjects = utils.range(100).map((i) -> { id: i })

    ac = new AutoComplete(selection.detached('div').node(), itemsObjects, { inputMap: ({id}) -> id })

    ac.show()
    ac._.menu.items().map(({id}) -> id).should.eql(utils.range(100))

  it 'should sort disabled items correctly', ->
    itemsObjects = utils.range(100).map((i) -> { id: i, disabled: i % 2 == 0 })

    ac = new AutoComplete(selection.detached('div').node(), itemsObjects, { inputMap: ({id}) -> id })

    ac.show()
    ac._.menu.items().slice(0, 50).map(({id}) -> id).should.eql(utils.range(50).map (i) -> 2 * i + 1)
    ac._.menu.items().slice(50, 100).map(({id}) -> id).should.eql(utils.range(50).map (i) -> 2 * i)
