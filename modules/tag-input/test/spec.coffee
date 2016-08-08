describe 'tag-input', ->
  origConsoleWarning = hx.consoleWarning
  hx.consoleWarning = chai.spy()

  beforeEach ->
    hx.consoleWarning.reset()

  after ->
    hx.consoleWarning = origConsoleWarning


  it 'should have user facing text defined', ->
    hx.userFacingText('tagInput','placeholder').should.equal('add tag...')

  describe 'api', ->
    it 'items: initial value is correct', ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items().should.eql([])
      hx.consoleWarning.should.not.have.been.called()

    it 'items: setter/getter works',  ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items().should.eql([])
      ti.items(["a", "b", "c"]).should.equal(ti)
      ti.items().should.eql(["a", "b", "c"])
      hx.consoleWarning.should.not.have.been.called()

    it 'items: should show a warning when trying to set the items to an invalid value', ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items().should.eql([])
      hx.consoleWarning.should.not.have.been.called()
      ti.items('something')
      hx.consoleWarning.should.have.been.called.with(
        'TagInput.items was passed the wrong argument type',
        'TagInput.items only accepts an array argument, you supplied:',
        'something'
      )

    it 'remove: removes a tag',  ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items(["a", "b", "c"])
      ti.remove('a')
      ti.items().should.eql(["b", "c"])
      hx.consoleWarning.should.not.have.been.called()

    it 'remove: returns the number of items removed',  ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items(["a", "a", "b", "c"])
      ti.remove('a').should.equal(2)
      ti.remove('b').should.equal(1)
      hx.consoleWarning.should.not.have.been.called()

    it 'remove: without arguments removes all items',  ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items(["a", "a", "b", "c"])
      ti.remove().should.eql(["a", "a", "b", "c"])
      ti.items().should.eql([])
      hx.consoleWarning.should.not.have.been.called()

    it 'add: adds a tag',  ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items(["a", "b", "c"])
      ti.add('a')
      ti.items().should.eql(["a", "b", "c", "a"])
      hx.consoleWarning.should.not.have.been.called()

    it 'add: returns the right type',  ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items(["a", "b", "c"])
      ti.add('a').should.equal(ti)
      hx.consoleWarning.should.not.have.been.called()

    it 'add: show a warning when trying to add undefined tags', ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items().should.eql([])
      hx.consoleWarning.should.not.have.been.called()
      ti.add(undefined)
      hx.consoleWarning.should.have.been.called.with(
        'TagInput.add was passed the wrong argument type',
        'TagInput.add accepts an array or string argument, you supplied:',
        undefined
      )

  describe 'options', ->
    it 'classifier: should be called when adding a tag with the api', ->
      spy = chai.spy()
      ti = new hx.TagInput(hx.detached('div').node(), {
        classifier: spy
      })
      spy.should.not.have.been.called()
      ti.add('a')
      spy.should.have.been.called.with('a')
      hx.consoleWarning.should.not.have.been.called()

    it 'validator: should be called when adding a tag', ->
      spy = chai.spy()
      ti = new hx.TagInput(hx.detached('div').node(), {
        validator: spy
      })
      spy.should.not.have.been.called()
      ti.input.value('a')
      hx.select.getHexagonElementDataObject(ti.input.node()).eventEmitter.emit('input')
      spy.should.have.been.called.with('a')
      hx.consoleWarning.should.not.have.been.called()

    it 'validator: should not be called when the input has no text', ->
      spy = chai.spy()
      ti = new hx.TagInput(hx.detached('div').node(), {
        validator: spy
      })
      spy.should.not.have.been.called()
      hx.select.getHexagonElementDataObject(ti.input.node()).eventEmitter.emit('input')
      spy.should.not.have.been.called()
      hx.consoleWarning.should.not.have.been.called()
