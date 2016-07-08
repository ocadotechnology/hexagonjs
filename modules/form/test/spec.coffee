describe 'form', ->
  it 'should have user facing text defined', ->
    hx.userFacingText('form','missingRadioValue').should.equal('Please select one of these options')
    hx.userFacingText('form','missingValue').should.equal('Please fill in this field')
    hx.userFacingText('form','typeMismatch').should.equal('Please enter a valid value for this field')