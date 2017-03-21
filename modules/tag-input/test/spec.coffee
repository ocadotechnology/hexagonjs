utils = require('modules/util/main/utils')
select = require('modules/selection/main')
userFacingText = require('modules/user-facing-text/main')
TagInput = require('../main').TagInput

chai = require('chai')
fakeTime = require('test/utils/fake-time')
emitEvent = require('test/utils/emit-event')

chai.should()

describe 'tag-input', ->
  origConsoleWarning = utils.consoleWarning

  dropdownAnimateDuration = 200

  beforeEach ->
    utils.consoleWarning = chai.spy()

  after ->
    utils.consoleWarning = origConsoleWarning

  it 'should have user facing text defined', ->
    userFacingText('tagInput','placeholder').should.equal('add tag...')

  describe 'api', ->
    it 'items: initial value is correct', ->
      ti = new TagInput(select.detached('div').node())
      ti.items().should.eql([])
      utils.consoleWarning.should.not.have.been.called()

    it 'items: setter/getter works',  ->
      ti = new TagInput(select.detached('div').node())
      ti.items().should.eql([])
      ti.items(["a", "b", "c"]).should.equal(ti)
      ti.items().should.eql(["a", "b", "c"])
      utils.consoleWarning.should.not.have.been.called()

    it 'items: should show a warning when trying to set the items to an invalid value', ->
      ti = new TagInput(select.detached('div').node())
      ti.items().should.eql([])
      utils.consoleWarning.should.not.have.been.called()
      ti.items('something')
      utils.consoleWarning.should.have.been.called.with(
        'TagInput.items was passed the wrong argument type',
        'TagInput.items only accepts an array argument, you supplied:',
        'something'
      )

    it 'remove: removes a tag',  ->
      ti = new TagInput(select.detached('div').node())
      ti.items(["a", "b", "c"])
      ti.remove('a')
      ti.items().should.eql(["b", "c"])
      utils.consoleWarning.should.not.have.been.called()

    it 'remove: returns the number of items removed',  ->
      ti = new TagInput(select.detached('div').node())
      ti.items(["a", "a", "b", "c"])
      ti.remove('a').should.equal(2)
      ti.remove('b').should.equal(1)
      utils.consoleWarning.should.not.have.been.called()

    it 'remove: without arguments removes all items',  ->
      ti = new TagInput(select.detached('div').node())
      ti.items(["a", "a", "b", "c"])
      ti.remove().should.eql(["a", "a", "b", "c"])
      ti.items().should.eql([])
      utils.consoleWarning.should.not.have.been.called()

    it 'add: adds a tag',  ->
      ti = new TagInput(select.detached('div').node())
      ti.items(["a", "b", "c"])
      ti.add('a')
      ti.items().should.eql(["a", "b", "c", "a"])
      utils.consoleWarning.should.not.have.been.called()

    it 'add: returns the right type',  ->
      ti = new TagInput(select.detached('div').node())
      ti.items(["a", "b", "c"])
      ti.add('a').should.equal(ti)
      utils.consoleWarning.should.not.have.been.called()

    it 'add: show a warning when trying to add undefined tags', ->
      ti = new TagInput(select.detached('div').node())
      ti.items().should.eql([])
      utils.consoleWarning.should.not.have.been.called()
      ti.add(undefined)
      utils.consoleWarning.should.have.been.called.with(
        'TagInput.add was passed the wrong argument type',
        'TagInput.add accepts an array or string argument, you supplied:',
        undefined
      )

  describe 'options', ->
    it 'classifier: should be called when adding a tag with the api', ->
      spy = chai.spy()
      ti = new TagInput(select.detached('div').node(), {
        classifier: spy
      })
      spy.should.not.have.been.called()
      ti.add('a')
      spy.should.have.been.called.with('a')
      utils.consoleWarning.should.not.have.been.called()

    it 'validator: should be called when adding a tag', ->
      spy = chai.spy()
      ti = new TagInput(select.detached('div').node(), {
        validator: spy
      })
      spy.should.not.have.been.called()
      ti.input.value('a')
      select.getHexagonElementDataObject(ti.input.node()).eventEmitter.emit('input')
      spy.should.have.been.called.with('a')
      utils.consoleWarning.should.not.have.been.called()

    it 'validator: should not be called when the input has no text', ->
      spy = chai.spy()
      ti = new TagInput(select.detached('div').node(), {
        validator: spy
      })
      spy.should.not.have.been.called()
      select.getHexagonElementDataObject(ti.input.node()).eventEmitter.emit('input')
      spy.should.not.have.been.called()
      utils.consoleWarning.should.not.have.been.called()

  describe 'autocomplete', ->
    it 'should have autocomplete if given an array of values', (done) ->
      ti = new TagInput(select.detached('div').node(), {
        autocompleteData: ['a', 'b', 'c']
      })
      ti._.autocomplete.should.be.defined
      acSpy = chai.spy (result) ->
        result.should.eql(['a', 'b', 'c'])
        done()
      ti._.autocomplete.data(undefined, acSpy)
      acSpy.should.have.been.called()

    it 'should have autocomplete if given a function that returns values', (done) ->
      ti = new TagInput(select.detached('div').node(), {
        autocompleteData: (t, cb) -> cb ['a', 'b', 'c']
      })
      ti._.autocomplete.should.be.defined
      acSpy = chai.spy (result) ->
        result.should.eql(['a', 'b', 'c'])
        done()
      ti._.autocomplete.data(undefined, acSpy)
      acSpy.should.have.been.called()

    it 'should filter out autocompletions by default if they are already tags', (done) ->
      ti = new TagInput(select.detached('div').node(), {
        autocompleteData: ['a', 'b', 'c']
      })
      ti._.autocomplete.should.be.defined
      acSpy = chai.spy (result) ->
        result.should.eql(['b', 'c'])
        done()

      ti.add 'a'
      ti._.autocomplete.data(undefined, acSpy)
      acSpy.should.have.been.called()

    it 'should not filter out autocompletions that are already tags if told not to', (done) ->
      ti = new TagInput(select.detached('div').node(), {
        autocompleteData: (t, cb) -> cb ['a', 'b', 'c']
        excludeTags: false
      })
      ti._.autocomplete.should.be.defined
      acSpy = chai.spy (result) ->
        result.should.eql(['a', 'b', 'c'])
        done()

      ti.add 'a'
      ti._.autocomplete.data(undefined, acSpy)
      acSpy.should.have.been.called()

    it 'should create the tag on pressing enter/tag on the autocompletion', ->
      ti = new TagInput(select.detached('div').node(), {
        autocompleteData: ['a', 'b', 'c']
      })
      ti._.autocomplete.should.be.defined
      chai.spy.on(ti, 'add')
      ti._.autocomplete.emit 'change', 'a'
      ti.add.should.have.been.called().with('a')

    it 'should open the dropdown again after the tag has been created', ->
      clock = fakeTime.installFakeTimers()

      selection = select('body').append('div')

      ti = new TagInput(selection.node(), {
        autocompleteData: ['a', 'b', 'c']
      })

      chai.spy.on(ti._.autocomplete, 'show')
      emitEvent(ti.input.node(), 'focus', {})
      clock.tick(dropdownAnimateDuration)

      ti._.autocomplete.show.should.have.been.called.once()
      ti._.autocomplete.emit 'change', 'a'
      clock.tick(dropdownAnimateDuration)
      ti._.autocomplete.show.should.have.been.called.twice()
      clock.restore()

      selection.remove()

    it 'should not log a warning if everything is set up correctly', ->
      utils.consoleWarning.should.not.have.been.called()
      ti = new TagInput(select.detached('div').node(), {
        autocompleteData: []
      })
      utils.consoleWarning.should.not.have.been.called()

    it 'should log a warning from the autocomplete if autocompleteData is neither an array nor a function', ->
      utils.consoleWarning.should.not.have.been.called()
      ti = new TagInput(select.detached('div').node(), {
        autocompleteData: "this is stupid"
      })
      utils.consoleWarning.should.have.been.called()

    it 'should filter out autocompleted items that do not pass the validity check', (done) ->
      ti = new TagInput(select.detached('div').node(), {
        autocompleteData: ['a', 'b', 'c', 1, 'd']
        validator: (name) -> if not isNaN(Number(name)) then "please enter text"
      })

      ti._.autocomplete.should.be.defined
      acSpy = chai.spy (result) ->
        result.should.eql(['a', 'b', 'c', 'd'])
        done()

      ti._.autocomplete.data(undefined, acSpy)
      acSpy.should.have.been.called()

    it 'should set the mustMatch option on the autocomplete options if the mustMatchAutocomplete option is true', ->
      ti = new TagInput(select.detached('div').node(), {
        autocompleteData: ['a', 'b', 'c']
      })
      ti._.autocomplete.options.mustMatch.should.be.true

    it 'should not set the mustMatch option on the autocomplete options if the mustMatchAutocomplete option is false', ->
      ti = new TagInput(select.detached('div').node(), {
        autocompleteData: ['a', 'b', 'c']
        mustMatchAutocomplete: false
      })
      ti._.autocomplete.options.mustMatch.should.be.false

    it 'should not add a tag when selecting the item via the autocomplete', ->
      ti = new TagInput(select.detached('div').node(), {
        autocompleteData: ['bob']
      })
      clock = fakeTime.installFakeTimers()
      emitEvent(ti.input.node(), 'focus', {})
      ti.input.value('b')
      emitEvent(ti.input.node(), 'input', {})
      clock.tick(dropdownAnimateDuration)

      dropdown = ti._.autocomplete._.menu.dropdown._.dropdown
      target = dropdown.select('.hx-menu-item').node()

      emitEvent(ti.input.node(), 'blur', {})
      emitEvent(dropdown.node(), 'click', {target: target})
      ti.items().should.eql(['bob'])
      clock.restore()
