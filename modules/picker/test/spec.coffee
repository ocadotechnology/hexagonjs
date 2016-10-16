picker = require('modules/picker/main')
userFacingText = require('modules/user-facing-text/main')

describe 'picker', ->
  it 'should have user facing text defined', ->
    # XXX: this feels not quite right - we are doing side affecting stuff just
    # by requiring a file...
    userFacingText('picker', 'chooseValue').should.equal('Choose a value...')
