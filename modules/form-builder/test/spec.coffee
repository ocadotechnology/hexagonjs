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
