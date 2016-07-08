describe 'picker', ->
  it 'should have user facing text defined', ->
    hx.userFacingText('picker', 'chooseValue').should.equal('Choose a value...')