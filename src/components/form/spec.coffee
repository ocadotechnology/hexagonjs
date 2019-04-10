import { userFacingText } from 'utils/user-facing-text'
import { div, select, detached } from 'utils/selection'

import { Form, validateForm } from 'components/form'

export default () ->
  describe 'form', ->
    it 'should have user facing text defined', ->
      userFacingText('form', 'missingRadioValue').should.equal('Please select one of these options')
      userFacingText('form', 'missingValue').should.equal('Please fill in this field')
      userFacingText('form', 'pleaseAddAValue').should.equal('Please add at least one item')
      userFacingText('form', 'pleaseSelectAValue').should.equal('Please select a value from the list')
      userFacingText('form', 'typeMismatch').should.equal('Please enter a valid value for this field')

    describe 'validateForm', () ->
      fixture = div('hx-test-form')

      beforeEach ->
        select('body').append(fixture)
        fixture.clear()

      after ->
        fixture.remove()

      makeInput = (text, val='', type='text') ->
        div()
          .add(detached('label').text(text))
          .add(detached('input').value(val).attr('type', type))

      describe 'with valid forms', ->
        validForm = undefined
        validation = undefined
        beforeEach () ->
          validForm = detached('form')
            .add(makeInput('Text', 'something'))

          fixture.add(validForm)

          validation = validateForm(validForm)

        it 'should validate the form with no errors', () ->
          validation.should.eql({
            valid: true,
            errors: []
          })

        it 'should not show any error messages', () ->
          validForm.selectAll('.hx-form-error').empty().should.equal(true)

        describe 'with showMessage false', ->
          beforeEach () ->
            validation = validateForm(validForm, { showMessage: false })

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

          invalidForm = detached('form')
            .add(inputContainer)

          fixture.append(invalidForm)

          validation = validateForm(invalidForm)

        it 'returns valid false', () ->
          validation.valid.should.equal(false)

        it 'returns the correct number of errors', () ->
          validation.errors.length.should.equal(1)

        # it 'returns the correct message', () ->
        #   validation.errors[0].message.should.equal(userFacingText('form','missingValue'))

        it 'returns the correct node', () ->
          validation.errors[0].node.should.equal(invalidNode.node())

        it 'returns the correct validity', () ->
          validation.errors[0].validity.should.eql(invalidNode.node().validity)

        it 'returns the correct focused', () ->
          validation.errors[0].focused.should.equal(false)

        it 'shows a single error message', () ->
          invalidForm.selectAll('.hx-form-error').size().should.equal(1)

        # it 'shows the correct error text in the message', () ->
        #   invalidForm.selectAll('.hx-form-error').text().should.eql([userFacingText('form', 'missingValue')])

        describe 'with showMessage false', ->
          beforeEach () ->
            invalidForm.selectAll('.hx-form-error').remove()
            validation = validateForm(invalidForm, { showMessage: false })

          it 'returns valid false', () ->
            validation.valid.should.equal(false)

          it 'returns the correct number of errors', () ->
            validation.errors.length.should.equal(1)

          # it 'returns the correct message', () ->
          #   validation.errors[0].message.should.equal(userFacingText('form','missingValue'))

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
          validForm = detached('form')
            .add(makeInput('Text', 'something'))
            .add(div().class('hx-form-buttons')
              .add(detached('button').text('submit')))

          fixture.add(validForm)

          validate = -> validateForm(validForm)

        it 'does not throw an error', ->
          validate.should.not.throw()

    describe 'Form', () ->
      it 'should return the value for disabled fields', ->
        form = new Form(div())
          .addText('Text')
          .addText('Text', { key: 'text' })

        form.data({
          'text': '123',
          'Text': '456'
        })

        form.disabled('Text', true)

        form.data().should.eql({ Text: '456', text: '123' })


      it 'should not return the value for hidden fields', ->
        form = new Form(div())
          .addText('Text')
          .addText('Text', { key: 'text' })

        form.data({
          'text': '123',
          'Text': '456'
        })

        form.hidden('Text', true)

        form.data().should.eql({ text: '123' })


      it 'should disable and hide fields when they are added', ->
        form = new Form(div())
          .addText('Text')
          .addText('Text', { key: 'text' })
          .addText('Text', { key: 'd1', disabled: true })
          .addText('Text', { key: 'h1', hidden: true })
          .addText('Text', { key: 'hd1', hidden: true, disabled: true })
          .addText('d2', { disabled: true })
          .addText('h2', { hidden: true })
          .addText('hd2', { hidden: true, disabled: true })

        form.disabled('Text').should.equal(false)
        form.hidden('text').should.equal(false)
        form.disabled('d1').should.equal(true)
        form.disabled('d2').should.equal(true)
        form.hidden('h1').should.equal(true)
        form.hidden('h2').should.equal(true)
        form.disabled('hd1').should.equal(true)
        form.disabled('hd2').should.equal(true)
        form.hidden('hd1').should.equal(true)
        form.hidden('hd2').should.equal(true)

      it 'should allow html fields to be initialised with a value', ->
        form = new Form(div())
          .addText('Text', { value: 'Something'})
          .addTextArea('Text Area', { value: 'Something Else'})
          .addEmail('Email', { value: 'a@a.a'})
          .addUrl('Url', { value: 'http://www.a.co'})
          .addNumber('Number', { value: 10 })
          .addCheckbox('Checkbox', { value: true })
          .addPassword('Password', { value: 'abc' })
          .addRadio('Radio', ['One', 'Two', 'Three'], { value: 'Two' })

        form.data().should.eql({
          'Text': 'Something'
          'Text Area': 'Something Else'
          'Email': 'a@a.a'
          'Url': 'http://www.a.co'
          'Number': '10'
          'Checkbox': true
          'Password': 'abc'
          'Radio': 'Two'
        })
