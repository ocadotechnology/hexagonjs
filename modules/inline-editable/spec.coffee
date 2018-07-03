describe 'inline-editable', ->
  fixture = undefined

  before ->
    fixture = hx.detached('div')
    hx.select('body').add(fixture)

  beforeEach ->
    fixture.clear()

  after ->
    fixture.remove()

  it 'should have user facing text defined', ->
    hx.userFacingText('inlineEditable', 'enterValue').should.equal('Enter Value')

  it 'should use the text of the selection used to create it as the value', ->
    container = fixture.append('div').text('test')
    ie = new hx.InlineEditable(container.node())
    ie.value().should.equal('test')

  it 'should correctly set the input value', ->
    container = fixture.append('div').text('test')
    ie = new hx.InlineEditable(container.node())
    input = container.select('.hx-name')
    input.value().should.equal('')
    testHelpers.fakeNodeEvent(container.select('.hx-morph-toggle').node())()
    input.value().should.equal('test')

  it 'should use the value option correctly', ->
    container = fixture.append('div').text('test')
    ie = new hx.InlineEditable(container.node(), {
      value: 'Dave'
    })
    ie.value().should.equal('Dave')

  it 'should emit the change event when the value is updated using the api', ->
    container = fixture.append('div')
    ie = new hx.InlineEditable(container.node())
    spy = chai.spy()
    ie.on 'change', spy
    ie.value('test')
    spy.should.have.been.called.with({
      cause: 'api',
      value: 'test'
    })

  it 'should emit the change event when the value is updated', ->
    container = fixture.append('div')
    ie = new hx.InlineEditable(container.node())
    spy = chai.spy()
    ie.on 'change', spy
    input = container.select('.hx-name')
    testHelpers.fakeNodeEvent(container.select('.hx-morph-toggle').node())()
    input.value('bob')
    testHelpers.fakeNodeEvent(container.select('.hx-confirm').node())()
    spy.should.have.been.called.with({
      cause: 'user',
      value: 'bob'
    })

  it 'should show and focus the input when clicked', ->
    container = fixture.append('div')
    ie = new hx.InlineEditable(container.node())
    input = container.select('.hx-name').node()
    content = container.select('.hx-morph-content')
    input.should.not.equal(document.activeElement)
    content.style('display').should.equal('none')
    testHelpers.fakeNodeEvent(container.select('.hx-morph-toggle').node())()
    input.should.equal(document.activeElement)
    content.style('display').should.equal('block')

  it 'should show the enterValueText when no value is provided', ->
    container = fixture.append('div')
    ie = new hx.InlineEditable(container.node())
    container.text().should.equal('Enter Value')

  it 'should use the provided enterValueText', ->
    container = fixture.append('div')
    ie = new hx.InlineEditable(container.node(), {
      enterValueText: 'Bob'
    })
    container.text().should.equal('Bob')

  it 'should show the enterValueText when the value is cleared', ->
    container = fixture.append('div').text('test')
    ie = new hx.InlineEditable(container.node())
    input = container.select('.hx-name')
    testHelpers.fakeNodeEvent(container.select('.hx-morph-toggle').node())()
    input.value('')
    testHelpers.fakeNodeEvent(container.select('.hx-confirm').node())()
    container.text().should.equal('Enter Value')

  it 'should set the value when enter is pressed', ->
    container = fixture.append('div')
    ie = new hx.InlineEditable(container.node())
    spy = chai.spy()
    ie.on 'change', spy
    input = container.select('.hx-name')
    testHelpers.fakeNodeEvent(container.select('.hx-morph-toggle').node())()
    input.value('bob')
    testHelpers.fakeNodeEvent(input.node(), 'keydown')({ key: 'Enter' })
    spy.should.have.been.called.with({
      cause: 'user',
      value: 'bob'
    })

  it 'should support deprecated event values', ->
    container = fixture.append('div')
    ie = new hx.InlineEditable(container.node())
    spy = chai.spy()
    ie.on 'change', spy
    input = container.select('.hx-name')
    testHelpers.fakeNodeEvent(container.select('.hx-morph-toggle').node())()
    input.value('bob')
    testHelpers.fakeNodeEvent(input.node(), 'keydown')({ keyCode: 13 })
    spy.should.have.been.called.with({
      cause: 'user',
      value: 'bob'
    })
    testHelpers.fakeNodeEvent(container.select('.hx-morph-toggle').node())()
    input.value('steve')
    testHelpers.fakeNodeEvent(input.node(), 'keydown')({ which: 13 })
    spy.should.have.been.called.with({
      cause: 'user',
      value: 'steve'
    })

  it 'should allow the user to enter text', ->
    container = fixture.append('div')
    ie = new hx.InlineEditable(container.node())
    spy = chai.spy()
    ie.on 'change', spy
    input = container.select('.hx-name')
    testHelpers.fakeNodeEvent(container.select('.hx-morph-toggle').node())()
    input.value('bob')
    testHelpers.fakeNodeEvent(input.node(), 'keydown')({})
    spy.should.not.have.been.called()

  it 'should show the enterValueText when the value is cleared', ->
    container = fixture.append('div').text('test')
    ie = new hx.InlineEditable(container.node(), {
      enterValueText: 'Bob'
    })
    input = container.select('.hx-name')
    testHelpers.fakeNodeEvent(container.select('.hx-morph-toggle').node())()
    input.value('')
    testHelpers.fakeNodeEvent(container.select('.hx-confirm').node())()
    container.text().should.equal('Bob')

  describe 'fluid', ->
    it 'should return a selection', ->
      (hx.inlineEditable() instanceof hx.Selection).should.equal(true)

    it 'should use the value option', ->
      ie = hx.inlineEditable({
        value: 'Bob'
      })
      ie.api().value().should.equal('Bob')

    it 'should use the enterValueText option', ->
      ie = hx.inlineEditable({
        value: 'Bob'
      })
      ie.api().value().should.equal('Bob')
