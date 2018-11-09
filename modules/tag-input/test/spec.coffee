describe 'tag-input', ->
  origConsoleWarning = hx.consoleWarning
  dropdownAnimateDuration = 200

  fixture = undefined

  beforeEach ->
    hx.consoleWarning = chai.spy()
    fixture = hx.select('body').append('div').class('hx-test-tag-input')

  afterEach ->
    hx.consoleWarning = origConsoleWarning
    fixture.remove()


  it 'should have user facing text defined', ->
    hx.userFacingText('tagInput','placeholder').should.equal('add tag...')

  describe 'api', ->
    it 'items: initial value is correct', ->
      ti = new hx.TagInput(fixture.append('div'))
      ti.items().should.eql([])
      hx.consoleWarning.should.not.have.been.called()

    it 'items: setter/getter works',  ->
      ti = new hx.TagInput(fixture.append('div'))
      ti.items().should.eql([])
      ti.items(["a", "b", "c"]).should.equal(ti)
      ti.items().should.eql(["a", "b", "c"])
      hx.consoleWarning.should.not.have.been.called()

    it 'items: should show a warning when trying to set the items to an invalid value', ->
      ti = new hx.TagInput(fixture.append('div'))
      ti.items().should.eql([])
      hx.consoleWarning.should.not.have.been.called()
      ti.items('something')
      hx.consoleWarning.should.have.been.called.with(
        'TagInput.items was passed the wrong argument type',
        'TagInput.items only accepts an array argument, you supplied:',
        'something'
      )

    it 'remove: removes a tag',  ->
      ti = new hx.TagInput(fixture.append('div'))
      ti.items(["a", "b", "c"])
      ti.remove('a')
      ti.items().should.eql(["b", "c"])
      hx.consoleWarning.should.not.have.been.called()

    it 'remove: returns the number of items removed',  ->
      ti = new hx.TagInput(fixture.append('div'))
      ti.items(["a", "a", "b", "c"])
      ti.remove('a').should.equal(2)
      ti.remove('b').should.equal(1)
      hx.consoleWarning.should.not.have.been.called()

    it 'remove: without arguments removes all items',  ->
      ti = new hx.TagInput(fixture.append('div'))
      ti.items(["a", "a", "b", "c"])
      ti.remove().should.eql(["a", "a", "b", "c"])
      ti.items().should.eql([])
      hx.consoleWarning.should.not.have.been.called()

    it 'add: adds a tag',  ->
      ti = new hx.TagInput(fixture.append('div'))
      ti.items(["a", "b", "c"])
      ti.add('a')
      ti.items().should.eql(["a", "b", "c", "a"])
      hx.consoleWarning.should.not.have.been.called()

    it 'add: returns the right type',  ->
      ti = new hx.TagInput(fixture.append('div'))
      ti.items(["a", "b", "c"])
      ti.add('a').should.equal(ti)
      hx.consoleWarning.should.not.have.been.called()

    it 'add: show a warning when trying to add undefined tags', ->
      ti = new hx.TagInput(fixture.append('div'))
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
      ti = new hx.TagInput(fixture.append('div'), {
        classifier: spy
      })
      spy.should.not.have.been.called()
      ti.add('a')
      spy.should.have.been.called.with('a')
      hx.consoleWarning.should.not.have.been.called()

    it 'validator: should be called when adding a tag', ->
      spy = chai.spy()
      ti = new hx.TagInput(fixture.append('div'), {
        validator: spy
      })
      spy.should.not.have.been.called()
      ti.input.value('a')
      hx.select.getHexagonElementDataObject(ti.input.node()).eventEmitter.emit('input')
      spy.should.have.been.called.with('a')
      hx.consoleWarning.should.not.have.been.called()

    it 'validator: should not be called when the input has no text', ->
      spy = chai.spy()
      ti = new hx.TagInput(fixture.append('div'), {
        validator: spy
      })
      spy.should.not.have.been.called()
      hx.select.getHexagonElementDataObject(ti.input.node()).eventEmitter.emit('input')
      spy.should.not.have.been.called()
      hx.consoleWarning.should.not.have.been.called()

  describe 'autocomplete', ->
    it 'should have autocomplete if given an array of values', (done) ->
      ti = new hx.TagInput(fixture.append('div'), {
        autocompleteData: ['a', 'b', 'c']
      })
      expect(ti._.autocomplete).to.not.be.undefined
      acSpy = chai.spy (result) ->
        result.should.eql(['a', 'b', 'c'])
        done()
      ti._.autocomplete.data(undefined, acSpy)
      acSpy.should.have.been.called()

    it 'should have autocomplete if given a function that returns values', (done) ->
      ti = new hx.TagInput(fixture.append('div'), {
        autocompleteData: (t, cb) -> cb ['a', 'b', 'c']
      })
      expect(ti._.autocomplete).to.not.be.undefined
      acSpy = chai.spy (result) ->
        result.should.eql(['a', 'b', 'c'])
        done()
      ti._.autocomplete.data(undefined, acSpy)
      acSpy.should.have.been.called()

    it 'should filter out autocompletions by default if they are already tags', (done) ->
      ti = new hx.TagInput(fixture.append('div'), {
        autocompleteData: ['a', 'b', 'c']
      })
      expect(ti._.autocomplete).to.not.be.undefined
      acSpy = chai.spy (result) ->
        result.should.eql(['b', 'c'])
        done()

      ti.add 'a'
      ti._.autocomplete.data(undefined, acSpy)
      acSpy.should.have.been.called()

    it 'should not filter out autocompletions that are already tags if told not to', (done) ->
      ti = new hx.TagInput(fixture.append('div'), {
        autocompleteData: (t, cb) -> cb ['a', 'b', 'c']
        excludeTags: false
      })
      expect(ti._.autocomplete).to.not.be.undefined
      acSpy = chai.spy (result) ->
        result.should.eql(['a', 'b', 'c'])
        done()

      ti.add 'a'
      ti._.autocomplete.data(undefined, acSpy)
      acSpy.should.have.been.called()

    it 'should create the tag on pressing enter/tag on the autocompletion', ->
      ti = new hx.TagInput(fixture.append('div'), {
        autocompleteData: ['a', 'b', 'c']
      })
      expect(ti._.autocomplete).to.not.be.undefined
      chai.spy.on(ti, 'add')
      ti._.autocomplete.emit 'change', 'a'
      ti.add.should.have.been.called().with('a')

    it 'should create the tag using the autocomplete input map', ->
      ti = new hx.TagInput(fixture.append('div'), {
        autocompleteData: ['a', 'b', 'c'],
        autocompleteOptions: {
          inputMap: (item) -> "#{item} Text"
        }
      })
      expect(ti._.autocomplete).to.not.be.undefined
      chai.spy.on(ti, 'add')
      ti._.autocomplete.emit 'change', 'a'
      ti.add.should.have.been.called().with('a Text')

    it 'should open the dropdown again after the tag has been created', ->
      clock = sinon.useFakeTimers()

      selection = fixture.append('div')

      ti = new hx.TagInput(selection, {
        autocompleteData: ['a', 'b', 'c']
      })

      chai.spy.on(ti._.autocomplete, 'show')
      testHelpers.fakeNodeEvent(ti.input.node(), 'focus')({})
      clock.tick(dropdownAnimateDuration)

      ti._.autocomplete.show.should.have.been.called.once
      ti._.autocomplete.emit 'change', 'a'
      clock.tick(dropdownAnimateDuration)
      ti._.autocomplete.show.should.have.been.called.twice
      clock.uninstall()

    it 'should not log a warning if everything is set up correctly', ->
      hx.consoleWarning.should.not.have.been.called()
      ti = new hx.TagInput(fixture.append('div'), {
        autocompleteData: []
      })
      hx.consoleWarning.should.not.have.been.called()

    it 'should log a warning from the autocomplete if autocompleteData is neither an array nor a function', ->
      hx.consoleWarning.should.not.have.been.called()
      ti = new hx.TagInput(fixture.append('div'), {
        autocompleteData: "this is stupid"
      })
      hx.consoleWarning.should.have.been.called()

    it 'should filter out autocompleted items that do not pass the validity check', (done) ->
      ti = new hx.TagInput(fixture.append('div'), {
        autocompleteData: ['a', 'b', 'c', 1, 'd']
        validator: (name) -> if not isNaN(Number(name)) then "please enter text"
      })

      expect(ti._.autocomplete).to.not.be.undefined
      acSpy = chai.spy (result) ->
        result.should.eql(['a', 'b', 'c', 'd'])
        done()

      ti._.autocomplete.data(undefined, acSpy)
      acSpy.should.have.been.called()

    it 'should set the mustMatch option on the autocomplete options if the mustMatchAutocomplete option is true', ->
      ti = new hx.TagInput(fixture.append('div'), {
        autocompleteData: ['a', 'b', 'c']
      })
      expect(ti._.autocomplete.options.mustMatch).to.be.true

    it 'should not set the mustMatch option on the autocomplete options if the mustMatchAutocomplete option is false', ->
      ti = new hx.TagInput(fixture.append('div'), {
        autocompleteData: ['a', 'b', 'c']
        mustMatchAutocomplete: false
      })
      expect(ti._.autocomplete.options.mustMatch).to.be.false

    it 'should not add a tag when selecting the item via the autocomplete', ->
      ti = new hx.TagInput(fixture.append('div'), {
        autocompleteData: ['bob']
      })
      clock = sinon.useFakeTimers()
      testHelpers.fakeNodeEvent(ti.input.node(), 'focus')({})
      ti.input.value('b')
      testHelpers.fakeNodeEvent(ti.input.node(), 'input')({})
      clock.tick(dropdownAnimateDuration)

      dropdown = ti._.autocomplete._.menu.dropdown._.dropdown
      target = dropdown.select('.hx-menu-item').node()

      testHelpers.fakeNodeEvent(ti.input.node(), 'blur')({})
      testHelpers.fakeNodeEvent(dropdown.node(), 'click')({target: target})
      ti.items().should.eql(['bob'])
      clock.uninstall()


