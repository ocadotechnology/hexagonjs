describe 'autocomplete', ->
  it 'should have user facing text defined', ->
    hx.userFacingText('autoComplete','loading').should.equal('Loading...')
    hx.userFacingText('autoComplete','noResultsFound').should.equal('No results found')
    hx.userFacingText('autoComplete','otherResults').should.equal('Other Results')
    hx.userFacingText('autoComplete','pleaseEnterMinCharacters').should.equal('Please enter $minLength or more characters')
