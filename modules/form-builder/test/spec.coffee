describe "hx-form-builder", ->
  it 'should return the value for disabled fields', ->
    form = new hx.Form(hx.detached('div').node())
      .addText('Text')
      .addText('Text', { key: 'text' })

    form.data({
      'text': '123',
      'Text': '456'
    })

    form.disabled('Text', true)

    form.data().should.eql({ Text: '456', text: '123' })


  it 'should not return the value for hidden fields', ->
    form = new hx.Form(hx.detached('div').node())
      .addText('Text')
      .addText('Text', { key: 'text' })

    form.data({
      'text': '123',
      'Text': '456'
    })

    form.hidden('Text', true)

    form.data().should.eql({ text: '123' })


  it 'should disable and hide fields when they are added', ->
    form = new hx.Form(hx.detached('div').node())
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
    form = new hx.Form(hx.detached('div').node())
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

  it 'should allow buttons to be disabled', () ->
    noop = () -> undefined
    form = new hx.Form(hx.detached('div'))
      .addButton('Button 1', noop)
      .addButton('Button 2', noop, { disabled: true })
      .addSubmit('Submit')

    form.disabled('Button 1').should.equal(false)
    form.disabled('Button 1', true).should.equal(form)
    form.disabled('Button 1').should.equal(true)

    form.disabled('Button 2').should.equal(true)
    form.disabled('Button 2', false).should.equal(form)
    form.disabled('Button 2').should.equal(false)

    console.log(form.disabled('Submit'))

    form.disabled('Submit').should.equal(false)
    form.disabled('Submit', true).should.equal(form)
    form.disabled('Submit').should.equal(true)

  it 'should allow buttons to be hidden', () ->
    noop = () -> undefined
    form = new hx.Form(hx.detached('div'))
      .addButton('Button 1', noop)
      .addButton('Button 2', noop, { hidden: true })
      .addSubmit('Submit')

    form.hidden('Button 1').should.equal(false)
    form.hidden('Button 1', true).should.equal(form)
    form.hidden('Button 1').should.equal(true)

    form.hidden('Button 2').should.equal(true)
    form.hidden('Button 2', false).should.equal(form)
    form.hidden('Button 2').should.equal(false)

    form.hidden('Submit').should.equal(false)
    form.hidden('Submit', true).should.equal(form)
    form.hidden('Submit').should.equal(true)
