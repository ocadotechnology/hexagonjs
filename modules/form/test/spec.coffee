describe 'validateForm', ->
  fixture = hx.detached('div').class('hx-test-form')

  beforeEach ->
    hx.select('body').append(fixture)
    fixture.clear()

  after ->
    fixture.remove()

  it 'should have user facing text defined', ->
    hx.userFacingText('form','missingRadioValue').should.equal('Please select one of these options')
    hx.userFacingText('form','missingValue').should.equal('Please fill in this field')
    hx.userFacingText('form','typeMismatch').should.equal('Please enter a valid value for this field')

  makeInput = (text, val='', type='text') ->
    hx.detached('div')
      .add(hx.detached('label').text(text))
      .add(hx.detached('input').value(val).attr('type', type))

  describe 'with valid forms', ->
    validForm = undefined
    validation = undefined
    beforeEach () ->
      validForm = hx.detached('form')
        .add(makeInput('Text', 'something'))

      fixture.add(validForm)

      validation = hx.validateForm(validForm)

    it 'should validate the form with no errors', () ->
      validation.should.eql({
        valid: true,
        errors: []
      })

    it 'should not show any error messages', () ->
      validForm.selectAll('.hx-form-error').empty().should.equal(true)

    describe 'with showMessage false', ->
      beforeEach () ->
        validation = hx.validateForm(validForm, { showMessage: false })

      it 'returns valid true', () ->
        validation.valid.should.equal(true)

      it 'returns no errors', () ->
        validation.errors.should.eql([])

      it 'does not show any error messages', () ->
        validForm.selectAll('.hx-form-error').empty().should.equal(true)


  describe 'with invalid forms', ->
    invalidForm = undefined
    validation = undefined
    invalidNode = undefined
    inputContainer = undefined
    beforeEach () ->
      inputContainer = makeInput('Text')
      invalidNode = inputContainer.select('input')
        .attr('required', true)

      invalidNode.node().offsetParent = 'PhantomJS Workaround'

      invalidForm = hx.detached('form')
        .add(inputContainer)

      fixture.append(invalidForm)

      validation = hx.validateForm(invalidForm)

    it 'returns valid false', () ->
      validation.valid.should.equal(false)

    it 'returns the correct number of errors', () ->
      validation.errors.length.should.equal(1)

    # it 'returns the correct message', () ->
    #   validation.errors[0].message.should.equal(hx.userFacingText('form','missingValue'))

    it 'returns the correct node', () ->
      validation.errors[0].node.should.equal(invalidNode.node())

    it 'returns the correct validity', () ->
      validation.errors[0].validity.should.eql(invalidNode.node().validity)

    it 'returns the correct focused', () ->
      validation.errors[0].focused.should.equal(false)

    it 'shows a single error message', () ->
      invalidForm.selectAll('.hx-form-error').size().should.equal(1)

    # it 'shows the correct error text in the message', () ->
    #   invalidForm.selectAll('.hx-form-error').text().should.eql([hx.userFacingText('form', 'missingValue')])

    describe 'with showMessage false', ->
      beforeEach () ->
        invalidForm.selectAll('.hx-form-error').remove()
        validation = hx.validateForm(invalidForm, { showMessage: false })

      it 'returns valid false', () ->
        validation.valid.should.equal(false)

      it 'returns the correct number of errors', () ->
        validation.errors.length.should.equal(1)

      # it 'returns the correct message', () ->
      #   validation.errors[0].message.should.equal(hx.userFacingText('form','missingValue'))

      it 'returns the correct node', () ->
        validation.errors[0].node.should.equal(invalidNode.node())

      it 'returns the correct validity', () ->
        validation.errors[0].validity.should.eql(invalidNode.node().validity)

      it 'returns the correct focused', () ->
        validation.errors[0].focused.should.equal(false)

      it 'does not show any error messages', () ->
        invalidForm.selectAll('.hx-form-error').empty().should.equal(true)


  describe 'with form buttons', ->
    validForm = undefined
    validate = undefined

    beforeEach () ->
      validForm = hx.detached('form')
        .add(makeInput('Text', 'something'))
        .add(hx.detached('div').class('hx-form-buttons')
          .add(hx.detached('button').text('submit')))

      fixture.add(validForm)

      validate = ->
        hx.validateForm(validForm)

    it 'does not throw an error', ->
      expect(validate).not.to.throw()
