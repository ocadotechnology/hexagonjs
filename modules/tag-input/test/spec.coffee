import { select, div, getHexagonElementDataObject } from 'selection/main'
import { userFacingText } from 'user-facing-text/main'
import { TagInput } from 'tag-input/main'
import { config  as dropdownConfig } from 'dropdown/main'
import logger from 'logger/main'

import { installFakeTimers } from 'test/utils/fake-time'
import { emit } from 'test/utils/fake-event'

import chai from 'chai'
should = chai.should()

export default () ->
  describe 'tag-input', ->
    origConsoleWarning = logger.warn
    clock = undefined
    dropdownAnimateDuration = 200
    fixture = select('body').append(div('hx-test-tag-input'))

    beforeEach ->
      fixture.clear()
      clock = installFakeTimers()
      dropdownConfig.attachToSelector = fixture
      logger.warn = chai.spy()

    afterEach ->
      clock.restore()
      dropdownConfig.attachToSelector = 'body'
      logger.warn = origConsoleWarning

    after ->
      fixture.remove()

    it 'should have user facing text defined', ->
      userFacingText('tagInput', 'placeholder').should.equal('add tag...')

    describe 'api', ->
      it 'items: initial value is correct', ->
        ti = new TagInput(fixture.append(div()))
        ti.items().should.eql([])
        logger.warn.should.not.have.been.called()

      it 'items: setter/getter works',  ->
        ti = new TagInput(fixture.append(div()))
        ti.items().should.eql([])
        ti.items(["a", "b", "c"]).should.equal(ti)
        ti.items().should.eql(["a", "b", "c"])
        logger.warn.should.not.have.been.called()

      it 'items: should show a warning when trying to set the items to an invalid value', ->
        ti = new TagInput(fixture.append(div()))
        ti.items().should.eql([])
        logger.warn.should.not.have.been.called()
        ti.items('something')
        logger.warn.should.have.been.called.with(
          'TagInput::items',
          'Expected an array of items, you supplied:',
          'something'
        )

      it 'remove: removes a tag',  ->
        ti = new TagInput(fixture.append(div()))
        ti.items(["a", "b", "c"])
        ti.remove('a')
        ti.items().should.eql(["b", "c"])
        logger.warn.should.not.have.been.called()

      it 'remove: returns the number of items removed',  ->
        ti = new TagInput(fixture.append(div()))
        ti.items(["a", "a", "b", "c"])
        ti.remove('a').should.equal(2)
        ti.remove('b').should.equal(1)
        logger.warn.should.not.have.been.called()

      it 'remove: without arguments removes all items',  ->
        ti = new TagInput(fixture.append(div()))
        ti.items(["a", "a", "b", "c"])
        ti.remove().should.eql(["a", "a", "b", "c"])
        ti.items().should.eql([])
        logger.warn.should.not.have.been.called()

      it 'add: adds a tag',  ->
        ti = new TagInput(fixture.append(div()))
        ti.items(["a", "b", "c"])
        ti.add('a')
        ti.items().should.eql(["a", "b", "c", "a"])
        logger.warn.should.not.have.been.called()

      it 'add: returns the right type',  ->
        ti = new TagInput(fixture.append(div()))
        ti.items(["a", "b", "c"])
        ti.add('a').should.equal(ti)
        logger.warn.should.not.have.been.called()

      it 'add: show a warning when trying to add undefined tags', ->
        ti = new TagInput(fixture.append(div()))
        ti.items().should.eql([])
        logger.warn.should.not.have.been.called()
        ti.add(undefined)
        logger.warn.should.have.been.called.with(
          'TagInput::add',
          'Expected an array or string argument, you supplied:',
          undefined
        )

    describe 'options', ->
      it 'classifier: should be called when adding a tag with the api', ->
        spy = chai.spy()
        ti = new TagInput(fixture.append(div()), {
          classifier: spy
        })
        spy.should.not.have.been.called()
        ti.add('a')
        spy.should.have.been.called.with('a')
        logger.warn.should.not.have.been.called()

      it 'validator: should be called when adding a tag', ->
        spy = chai.spy()
        ti = new TagInput(fixture.append(div()), {
          validator: spy
        })
        spy.should.not.have.been.called()
        ti.input.value('a')
        getHexagonElementDataObject(ti.input.node()).eventEmitter.emit('input')
        spy.should.have.been.called.with('a')
        logger.warn.should.not.have.been.called()

      it 'validator: should not be called when the input has no text', ->
        spy = chai.spy()
        ti = new TagInput(fixture.append(div()), {
          validator: spy
        })
        spy.should.not.have.been.called()
        getHexagonElementDataObject(ti.input.node()).eventEmitter.emit('input')
        spy.should.not.have.been.called()
        logger.warn.should.not.have.been.called()

    describe 'autocomplete', ->
      it 'should have autocomplete if given an array of values', (done) ->
        ti = new TagInput(fixture.append(div()), {
          autocompleteData: ['a', 'b', 'c']
        })
        should.exist(ti._.autocomplete)
        acSpy = chai.spy (result) ->
          result.should.eql(['a', 'b', 'c'])
          done()
        ti._.autocomplete.data(undefined, acSpy)
        acSpy.should.have.been.called()

      it 'should have autocomplete if given a function that returns values', (done) ->
        ti = new TagInput(fixture.append(div()), {
          autocompleteData: (t, cb) -> cb ['a', 'b', 'c']
        })
        should.exist(ti._.autocomplete)
        acSpy = chai.spy (result) ->
          result.should.eql(['a', 'b', 'c'])
          done()
        ti._.autocomplete.data(undefined, acSpy)
        acSpy.should.have.been.called()

      it 'should filter out autocompletions by default if they are already tags', (done) ->
        ti = new TagInput(fixture.append(div()), {
          autocompleteData: ['a', 'b', 'c']
        })
        should.exist(ti._.autocomplete)
        acSpy = chai.spy (result) ->
          result.should.eql(['b', 'c'])
          done()

        ti.add 'a'
        ti._.autocomplete.data(undefined, acSpy)
        acSpy.should.have.been.called()

      it 'should not filter out autocompletions that are already tags if told not to', (done) ->
        ti = new TagInput(fixture.append(div()), {
          autocompleteData: (t, cb) -> cb ['a', 'b', 'c']
          excludeTags: false
        })
        should.exist(ti._.autocomplete)
        acSpy = chai.spy (result) ->
          result.should.eql(['a', 'b', 'c'])
          done()

        ti.add 'a'
        ti._.autocomplete.data(undefined, acSpy)
        acSpy.should.have.been.called()

      it 'should create the tag on pressing enter/tag on the autocompletion', ->
        ti = new TagInput(fixture.append(div()), {
          autocompleteData: ['a', 'b', 'c']
        })
        should.exist(ti._.autocomplete)
        chai.spy.on(ti, 'add')
        ti._.autocomplete.emit 'change', 'a'
        ti.add.should.have.been.called().with('a')

      it 'should open the dropdown again after the tag has been created', ->
        selection = fixture.append('div')

        ti = new TagInput(selection, {
          autocompleteData: ['a', 'b', 'c']
        })

        chai.spy.on(ti._.autocomplete, 'show')
        emit(ti.input.node(), 'focus', {})
        clock.tick(dropdownAnimateDuration)

        ti._.autocomplete.show.should.have.been.called.once
        ti._.autocomplete.emit 'change', 'a'
        clock.tick(dropdownAnimateDuration)
        ti._.autocomplete.show.should.have.been.called.twice
        clock.restore()

        selection.remove()

      it 'should not log a warning if everything is set up correctly', ->
        logger.warn.should.not.have.been.called()
        ti = new TagInput(fixture.append(div()), {
          autocompleteData: []
        })
        logger.warn.should.not.have.been.called()

      it 'should log a warning from the autocomplete if autocompleteData is neither an array nor a function', ->
        logger.warn.should.not.have.been.called()
        ti = new TagInput(fixture.append(div()), {
          autocompleteData: "this is stupid"
        })
        logger.warn.should.have.been.called()

      it 'should filter out autocompleted items that do not pass the validity check', (done) ->
        ti = new TagInput(fixture.append(div()), {
          autocompleteData: ['a', 'b', 'c', 1, 'd']
          validator: (name) -> if not isNaN(Number(name)) then "please enter text"
        })

        should.exist(ti._.autocomplete)
        acSpy = chai.spy (result) ->
          result.should.eql(['a', 'b', 'c', 'd'])
          done()

        ti._.autocomplete.data(undefined, acSpy)
        acSpy.should.have.been.called()

      it 'should set the mustMatch option on the autocomplete options if the mustMatchAutocomplete option is true', ->
        ti = new TagInput(fixture.append(div()), {
          autocompleteData: ['a', 'b', 'c']
        })
        ti._.autocomplete.options.mustMatch.should.be.true

      it 'should not set the mustMatch option on the autocomplete options if the mustMatchAutocomplete option is false', ->
        ti = new TagInput(fixture.append(div()), {
          autocompleteData: ['a', 'b', 'c']
          mustMatchAutocomplete: false
        })
        ti._.autocomplete.options.mustMatch.should.be.false

      it 'should not add a tag when selecting the item via the autocomplete', ->
        ti = new TagInput(fixture.append(div()), {
          autocompleteData: ['bob']
        })
        emit(ti.input.node(), 'focus', {})
        ti.input.value('b')
        emit(ti.input.node(), 'input', {})
        clock.tick(dropdownAnimateDuration)

        dropdown = fixture.select('.hx-dropdown')
        target = dropdown.select('.hx-menu-item').node()

        emit(ti.input.node(), 'blur', {})
        emit(dropdown.node(), 'click', {target: target})
        ti.items().should.eql(['bob'])
        clock.restore()
