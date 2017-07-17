import { userFacingText } from 'user-facing-text/main'

export default () ->
  describe 'form', ->
    it 'should have user facing text defined', ->
      userFacingText('form','missingRadioValue').should.equal('Please select one of these options')
      userFacingText('form','missingValue').should.equal('Please fill in this field')
      userFacingText('form','typeMismatch').should.equal('Please enter a valid value for this field')
