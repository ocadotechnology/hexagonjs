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
