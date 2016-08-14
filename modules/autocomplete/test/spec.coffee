userFacingText = require('modules/user-facing-text/main')

describe 'autocomplete', ->
  it 'should have user facing text defined', ->
    userFacingText('autoComplete','loading').should.equal('Loading...')
    userFacingText('autoComplete','noResultsFound').should.equal('No results found')
    userFacingText('autoComplete','otherResults').should.equal('Other Results')
    userFacingText('autoComplete','pleaseEnterMinCharacters').should.equal('Please enter $minLength or more characters')
