describe 'autocomplete', ->
  it 'should have user facing text defined', ->
    hx.userFacingText('autoComplete','loading').should.equal('Loading...')
    hx.userFacingText('autoComplete','noResultsFound').should.equal('No results found')
    hx.userFacingText('autoComplete','otherResults').should.equal('Other Results')
    hx.userFacingText('autoComplete','pleaseEnterMinCharacters').should.equal('Please enter $minLength or more characters')


  it 'should sort items correctly when using objects', ->
    itemsObjects = hx.range(100).map((i) -> { id: i })

    ac = new hx.AutoComplete(hx.detached('div').node(), itemsObjects)

    ac.show()
    ac._.menu.items().map(({id}) -> id).should.eql(hx.range(100))

  it 'should sort disabled items correctly', ->
    itemsObjects = hx.range(100).map((i) -> { id: i, disabled: i % 2 == 0 })

    ac = new hx.AutoComplete(hx.detached('div').node(), itemsObjects, { inputMap: ({id}) -> id })

    ac.show()
    ac._.menu.items().slice(0, 50).map(({id}) -> id).should.eql(hx.range(50).map (i) -> 2 * i + 1)
    ac._.menu.items().slice(50, 100).map(({id}) -> id).should.eql(hx.range(50).map (i) -> 2 * i)

  it 'should set the value from the constructor', ->
    itemsObjects = hx.range(100).map((_, i) -> i)
    sel = hx.detached('input')

    ac = new hx.AutoComplete(sel.node(), itemsObjects, { value: 1 })
    ac.value().should.equal('1')
    sel.value().should.equal('1')
