describe 'tag-input', ->
  describe 'api', ->
    it 'items: initial value is correct', ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items().should.eql([])

    it 'items: setter/getter works',  ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items().should.eql([])
      ti.items(["a", "b", "c"]).should.equal(ti)
      ti.items().should.eql(["a", "b", "c"])

    it 'remove: removes a tag',  ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items(["a", "b", "c"])
      ti.remove('a')
      ti.items().should.eql(["b", "c"])

    it 'remove: returns the number of items removed',  ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items(["a", "a", "b", "c"])
      ti.remove('a').should.equal(2)
      ti.remove('b').should.equal(1)

    it 'remove: without arguments removes all items',  ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items(["a", "a", "b", "c"])
      ti.remove().should.eql(["a", "a", "b", "c"])
      ti.items().should.eql([])

    it 'add: adds a tag',  ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items(["a", "b", "c"])
      ti.add('a')
      ti.items().should.eql(["a", "b", "c", "a"])

    it 'add: returns the right type',  ->
      ti = new hx.TagInput(hx.detached('div').node())
      ti.items(["a", "b", "c"])
      ti.add('a').should.equal(ti)

  describe 'options', ->
    it 'classifier: should be called when adding a tag with the api', ->
      spy = chai.spy()
      ti = new hx.TagInput(hx.detached('div').node(), {
        classifier: spy
      })
      spy.should.not.have.been.called()
      ti.add('a')
      spy.should.have.been.called.with('a')

    it 'validator: should be called when adding a tag', ->
      spy = chai.spy()
      ti = new hx.TagInput(hx.detached('div').node(), {
        validator: spy
      })
      spy.should.not.have.been.called()
      ti.input.value('a')
      hx.select.getHexagonElementDataObject(ti.input.node()).eventEmitter.emit('input')
      spy.should.have.been.called.with('a')

    it 'validator: should not be called when the input has no text', ->
      spy = chai.spy()
      ti = new hx.TagInput(hx.detached('div').node(), {
        validator: spy
      })
      spy.should.not.have.been.called()
      hx.select.getHexagonElementDataObject(ti.input.node()).eventEmitter.emit('input')
      spy.should.not.have.been.called()