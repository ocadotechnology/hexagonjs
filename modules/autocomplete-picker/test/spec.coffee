describe 'autocomplete-picker', ->

  origDropdownAttachSelector = hx._.dropdown.attachToSelector
  hx._.dropdown.attachToSelector = '#fixture'

  clock = sinon.useFakeTimers()

  origConsoleWarning = hx.consoleWarning
  hx.consoleWarning = chai.spy()
  fixture = undefined

  fakeEvent = {
    # fake some dom event stuff
    stopPropagation: ->
  }

  dropdownAnimationWait = 200
  inputDebounceWait = 200

  trivialItems = ['a','b','c']
  trivialAsyncWait = 1000
  trivialAsyncItems = (term, callback) ->
    cb = ->
      callback(trivialItems)
    setTimeout(cb, trivialAsyncWait)

  beforeEach ->
    hx.consoleWarning.reset()
    fixture?.remove()
    fixture = hx.select('body').append('div').attr('id', 'fixture')

  after ->
    hx._.dropdown.attachToSelector = origDropdownAttachSelector
    hx.consoleWarning = origConsoleWarning
    fixture.remove()
    clock.restore()

  testAutocomplete = (openAutocomplete, items, options, test) ->
    button = fixture.append('div').node()
    ap = new hx.AutocompletePicker(button, items, options)
    hx.consoleWarning.should.not.have.been.called()
    if openAutocomplete
      testHelpers.fakeNodeEvent(button, 'click')(fakeEvent)
      unless options?.disabled
        ap._.menu.dropdown.isOpen().should.equal(true)
      clock.tick(dropdownAnimationWait)
    test(ap)

  testClosedAutocomplete = (items, options, test) ->
    testAutocomplete(false, items, options, test)

  testOpenAutocomplete = (items, options, test) ->
    testAutocomplete(true, items, options, test)

  invalidItemsMessage = (value) ->
    "hx.AutocompletePicker: the items was expected to be an array of items or a function, you supplied: #{value}"


  it 'should have user facing text to use as defaults', ->
    hx.userFacingText('autocompletePicker', 'chooseValue').should.equal('Choose a value...')
    hx.userFacingText('autocompletePicker', 'loading').should.equal('Loading...')
    hx.userFacingText('autocompletePicker', 'noResults').should.equal('No Results Found')
    hx.userFacingText('autocompletePicker', 'otherResults').should.equal('Other Results')


  it 'should have the correct default options defined', ->
    testClosedAutocomplete trivialItems, undefined, (ap) ->
      ap._.options.should.eql({
        filter: undefined
        filterOptions: undefined
        matchType: undefined
        useCache: undefined
        showOtherResults: undefined
        trimTrailingSpaces: undefined
        valueLookup: undefined

        buttonClass: undefined
        disabled: false
        renderer: undefined
        value: undefined

        chooseValueText: hx.userFacingText('autocompletePicker', 'chooseValue')
        loadingText: hx.userFacingText('autocompletePicker', 'loading')
        noResultsText: hx.userFacingText('autocompletePicker', 'noResults')
        otherResultsText: hx.userFacingText('autocompletePicker', 'otherResults')
      })


  it 'should not allow the dropdown to open when disabled is true', ->
    items = chai.spy()
    testOpenAutocomplete items, {disabled: true}, (ap) ->
      items.should.not.have.been.called()


  it 'should use the default renderer function if a valueLookup is defined', ->
    valueLookup = (val) -> 'dave:' + val
    testClosedAutocomplete trivialItems, {valueLookup: valueLookup}, (ap) ->
      should.exist(ap._.renderer)
      testValueLookupDiv = hx.detached('div')
      ap._.renderer(testValueLookupDiv.node(), 'bob')
      testValueLookupDiv.text().should.equal('dave:bob')


  it 'should correctly class the button', ->
    button = fixture.append('div').class('bob')
    ap = new hx.AutocompletePicker(button.node(), trivialItems, {buttonClass: 'steve'})
    hx.consoleWarning.should.not.have.been.called()
    button.classed('bob hx-autocomplete-picker hx-btn steve').should.equal(true)


  it 'should correctly set the renderer option', ->
    r = ->
    testClosedAutocomplete trivialItems, {renderer: r}, (ap) ->
      ap.renderer().should.equal(r)


  it 'should initialise with a value when one is provided', ->
    testClosedAutocomplete trivialItems, {value: 'a'}, (ap) ->
      ap.value().should.equal('a')


  it 'should focus the input when picker is opened', ->
    testOpenAutocomplete trivialItems, undefined, (ap) ->
      hx.select(document.activeElement).classed('hx-autocomplete-picker-input').should.equal(true)
      hx.consoleWarning.should.not.have.been.called()


  it 'should clear the input value when the dropdown is opened', ->
    testOpenAutocomplete trivialItems, undefined, (ap) ->
      input = document.activeElement
      input.value = 'a'
      ap.hide()
      testHelpers.fakeNodeEvent(ap._.selection.node(), 'click')(fakeEvent)
      input.value.should.equal('')


  it 'should allow user to use arrow keys to select a value', ->
    testOpenAutocomplete trivialItems, undefined, (ap) ->
      # When doing a real keydown, the event propagates from the input.
      # This doesn't happen in the tests because we use the event emitter.
      dropdown = ap._.menu.dropdown._.dropdown.node()
      testHelpers.fakeNodeEvent(dropdown, 'keydown')({
        which: 40 # Down key
        preventDefault: ->
      })
      testHelpers.fakeNodeEvent(dropdown, 'keydown')({
        which: 40
        preventDefault: ->
      })
      testHelpers.fakeNodeEvent(dropdown, 'keydown')({
        which: 13 # Enter key
        preventDefault: ->
      })
      ap.value().should.equal('b')
      hx.consoleWarning.should.not.have.been.called()


  it 'should filter items when typing', ->
    testOpenAutocomplete trivialItems, undefined, (ap) ->
      hx.select(document.activeElement).value('b')
      testHelpers.fakeNodeEvent(document.activeElement, 'input')({
        target: document.activeElement
      })
      clock.tick(inputDebounceWait)
      ap._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql(['b'])
      hx.consoleWarning.should.not.have.been.called()


  it 'should not do anything when enter is pressed and the input is empty', ->
    testOpenAutocomplete trivialItems, undefined, (ap) ->
      testHelpers.fakeNodeEvent(document.activeElement, 'keydown')({
        which: 13
      })
      should.not.exist(ap.value())
      ap._.menu.dropdown.isOpen().should.equal(true)
      hx.consoleWarning.should.not.have.been.called()


  it 'should not select an item when the key pressed is not enter', ->
    testOpenAutocomplete trivialItems, undefined, (ap) ->
      hx.select(document.activeElement).value('b')
      testHelpers.fakeNodeEvent(document.activeElement, 'keydown')({
        which: 40
      })
      should.not.exist(ap.value())
      ap._.menu.dropdown.isOpen().should.equal(true)
      hx.consoleWarning.should.not.have.been.called()


  it 'should select the first item when enter is pressed and a value is entered', ->
    testOpenAutocomplete trivialItems, undefined, (ap) ->
      hx.select(document.activeElement).value('b')
      testHelpers.fakeNodeEvent(document.activeElement, 'input')({
        target: document.activeElement
      })
      clock.tick(200)
      testHelpers.fakeNodeEvent(document.activeElement, 'keydown')({
        keyCode: 13
      })
      ap.value().should.equal('b')
      hx.consoleWarning.should.not.have.been.called()


  it 'should show the "No Results Found" text when no values are found', ->
    testOpenAutocomplete trivialItems, undefined, (ap) ->
      hx.select(document.activeElement).value('d')
      testHelpers.fakeNodeEvent(document.activeElement, 'input')({
        target: document.activeElement
      })
      clock.tick(inputDebounceWait)
      ap._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql([hx.userFacingText('autocompletePicker', 'noResults')])
      hx.consoleWarning.should.not.have.been.called()


  it 'should not select the first item when enter is pressed and a value is entered if the value is "No Results"', ->
    testOpenAutocomplete trivialItems, undefined, (ap) ->
      hx.select(document.activeElement).value('d')
      testHelpers.fakeNodeEvent(document.activeElement, 'input')({
        target: document.activeElement
      })
      clock.tick(inputDebounceWait)
      ap._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql([hx.userFacingText('autocompletePicker', 'noResults')])
      testHelpers.fakeNodeEvent(document.activeElement, 'keydown')({
        keyCode: 13
      })
      should.not.exist(ap.value())
      ap._.menu.dropdown.isOpen().should.equal(true)
      hx.consoleWarning.should.not.have.been.called()


  it 'should not do anything when the menu emits en empty item', ->
    testClosedAutocomplete trivialItems, undefined, (ap) ->
      should.not.exist(ap.value())
      ap._.menu.emit('change', {content: 'a'})
      ap.value().should.equal('a')
      ap._.menu.emit('change', {content: undefined})
      ap.value().should.equal('a')


  it 'should show "Loading..." when results are loading', ->
    testOpenAutocomplete trivialAsyncItems, undefined, (ap) ->
      ap._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql([hx.userFacingText('autocompletePicker', 'loading')])
      hx.consoleWarning.should.not.have.been.called()


  it 'should show a warning if invalid items are set', ->
    new hx.AutocompletePicker hx.detached('div').node()
    hx.consoleWarning.should.have.been.called.with(invalidItemsMessage(undefined))

    new hx.AutocompletePicker hx.detached('div').node(), {}
    hx.consoleWarning.should.have.been.called.with(invalidItemsMessage({}))

    new hx.AutocompletePicker hx.detached('div').node(), undefined
    hx.consoleWarning.should.have.been.called.with(invalidItemsMessage(undefined))


  it 'should show other results correctly', ->
    testOpenAutocomplete trivialItems, {showOtherResults: true}, (ap) ->
      ap._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql(trivialItems)
      hx.select(document.activeElement).value('b')
      testHelpers.fakeNodeEvent(document.activeElement, 'input')({
        target: document.activeElement
      })
      clock.tick(inputDebounceWait)
      ap._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql(['b', hx.userFacingText('autocompletePicker', 'otherResults'), 'a', 'c'])


  it 'should show the choose value text when no value is selected', ->
    testClosedAutocomplete trivialItems, undefined, (ap) ->
      ap._.selection.select('.hx-autocomplete-picker-text').text().should.equal(hx.userFacingText('autocompletePicker', 'chooseValue'))


  it 'should show the choose value text if an invalid value is passed in', ->
    testClosedAutocomplete trivialItems, undefined, (ap) ->
      ap._.selection.select('.hx-autocomplete-picker-text').text().should.equal(hx.userFacingText('autocompletePicker', 'chooseValue'))
      ap.value('a')
      ap._.selection.select('.hx-autocomplete-picker-text').text().should.equal('a')
      ap.value('d')
      ap._.selection.select('.hx-autocomplete-picker-text').text().should.equal(hx.userFacingText('autocompletePicker', 'chooseValue'))


  it 'should set the value to "undefined" if an invalid value is passed in', ->
    testClosedAutocomplete trivialItems, undefined, (ap) ->
      ap._.selection.select('.hx-autocomplete-picker-text').text().should.equal(hx.userFacingText('autocompletePicker', 'chooseValue'))
      ap.value('a')
      ap._.selection.select('.hx-autocomplete-picker-text').text().should.equal('a')
      ap.value('d')
      ap._.selection.select('.hx-autocomplete-picker-text').text().should.equal(hx.userFacingText('autocompletePicker', 'chooseValue'))
      should.not.exist(ap.value())



  describe 'api', ->

    it 'hide: should hide the dropdown', ->
      testOpenAutocomplete trivialItems, undefined, (ap) ->
        ap._.menu.dropdown.isOpen().should.equal(true)
        ap.hide().should.equal(ap)
        ap._.menu.dropdown.isOpen().should.equal(false)
        hx.consoleWarning.should.not.have.been.called()


    it 'disabled: should set and get the disabled state', ->
      testClosedAutocomplete trivialItems, undefined, (ap) ->
        ap.disabled().should.equal(false)
        ap.disabled(true).should.equal(ap)
        ap.disabled().should.equal(true)
        ap.disabled(false).should.equal(ap)
        ap.disabled().should.equal(false)
        hx.consoleWarning.should.not.have.been.called()


    it 'clearCache: should call into the feed to clear the cache', ->
      testClosedAutocomplete trivialItems, undefined, (ap) ->
        chai.spy.on(ap._.feed, 'clearCache')
        ap.clearCache().should.equal(ap)
        ap._.feed.clearCache.should.have.been.called.once()


    it 'value: should set and get the value', ->
      testClosedAutocomplete trivialItems, undefined, (ap) ->
        should.not.exist(ap.value())
        ap.value('a').should.equal(ap)
        ap.value().should.equal('a')
        ap.value('b').should.equal(ap)
        ap.value().should.equal('b')
        hx.consoleWarning.should.not.have.been.called()


    it 'value: should use the first value if multiple results are returned from the filter', ->
      aObj = {name: 'a', location: 'a'}
      bObj = {name: 'a', location: 'b'}
      cObj = {name: 'a', location: 'c'}

      valueLookup = (item) -> item.name

      items = [bObj, aObj, cObj]
      testClosedAutocomplete items, {valueLookup: valueLookup}, (ap) ->
        should.not.exist(ap.value())
        callback = chai.spy()
        ap.value({name: 'a'}, callback).should.equal(ap)
        callback.should.have.been.called.with(bObj)
        ap.value().should.equal(bObj)


    it 'value: should get and set the value as passed in', ->
      aObj = {name: 'a'}
      bObj = {name: 'b'}
      cObj = {name: 'c'}
      dObj = {name: 'd'}

      valueLookup = (item) -> item.name

      items = [aObj, bObj, cObj]
      testClosedAutocomplete items, {valueLookup: valueLookup}, (ap) ->
        should.not.exist(ap.value())
        callback = chai.spy()
        ap.value({name: 'a'}, callback).should.equal(ap)
        callback.should.have.been.called.with(aObj)
        ap.value().should.equal(aObj)
        ap.value({name: 'd'}, callback).should.equal(ap)
        callback.should.have.been.called.with(undefined)
        should.not.exist(ap.value())


    it 'value: should not set the value when not in the item set', ->
      testClosedAutocomplete trivialItems, undefined, (ap) ->
        should.not.exist(ap.value())
        ap.value('d').should.equal(ap)
        should.not.exist(ap.value())
        hx.consoleWarning.should.not.have.been.called()


    it 'value: should clear the value when set to undefined', ->
      testClosedAutocomplete trivialItems, undefined, (ap) ->
        should.not.exist(ap.value())
        ap.value('b')
        ap.value().should.equal('b')
        ap.value(undefined)
        should.not.exist(ap.value())

    it 'value: should call the callback correctly when the value is in the item set', ->
      testClosedAutocomplete trivialAsyncItems, undefined, (ap) ->
        should.not.exist(ap.value())
        callback = chai.spy()
        ap.value('a', callback).should.equal(ap)
        callback.should.not.have.been.called()
        clock.tick(trivialAsyncWait)
        callback.should.have.been.called.once()
        callback.should.have.been.called.with('a')


    it 'value: should call the callback correctly when the value is in the item set', ->
      testClosedAutocomplete trivialAsyncItems, undefined, (ap) ->
        should.not.exist(ap.value())
        callback = chai.spy()
        ap.value('d', callback).should.equal(ap)
        callback.should.not.have.been.called()
        clock.tick(trivialAsyncWait)
        callback.should.have.been.called.once()
        callback.should.have.been.called.with(undefined)


    it 'items: should set and get the items', ->
      testClosedAutocomplete trivialItems, undefined, (ap) ->
        ap.items().should.equal(trivialItems)

        items = ['a']
        ap.items(items).should.equal(ap)
        ap.items().should.eql(items)

        hx.consoleWarning.should.not.have.been.called()


    it 'items: should show a warning when called with invalid items', ->
      testClosedAutocomplete trivialItems, undefined, (ap) ->
        ap.items(undefined)
        hx.consoleWarning.should.have.been.called.with(invalidItemsMessage(undefined))
        ap.items({}).should.equal(ap)
        hx.consoleWarning.should.have.been.called.with(invalidItemsMessage({}))
        ap.items().should.eql(trivialItems)


    it 'renderer: should set and get the renderer', ->
      testClosedAutocomplete trivialItems, undefined, (ap) ->
        should.exist(ap.renderer())
        r = ->
        ap.renderer(r).should.equal(ap)
        ap.renderer().should.equal(r)



  describe 'events', ->

    it 'should emit the "highlight" event when a menu item is highlighted', ->
      testOpenAutocomplete trivialItems, undefined, (ap) ->
        # When doing a real keydown, the event propagates from the input.
        # This doesn't happen in the tests because we use the event emitter.
        highlight = chai.spy()
        ap.on 'highlight', highlight

        dropdown = ap._.menu.dropdown._.dropdown.node()
        testHelpers.fakeNodeEvent(dropdown, 'keydown')({
          which: 40 # Down key
          preventDefault: ->
        })
        highlight.should.have.been.called.with({
          eventType: 'arrow',
          content: 'a'
          menu: ap._.menu
        })
        testHelpers.fakeNodeEvent(dropdown, 'keydown')({
          which: 40
          preventDefault: ->
        })
        highlight.should.have.been.called.with({
          eventType: 'arrow',
          content: 'b'
          menu: ap._.menu
        })
        highlight.should.have.been.called.twice()
        hx.consoleWarning.should.not.have.been.called()


    it 'should emit the dropdown events with the "dropdown." prefix', ->
      button = fixture.append('div').node()
      ap = new hx.AutocompletePicker(button, trivialItems)
      hx.consoleWarning.should.not.have.been.called()

      change = chai.spy()
      hideend = chai.spy()
      hidestart = chai.spy()
      showend = chai.spy()
      showstart = chai.spy()

      ap.on 'dropdown.change', change
      ap.on 'dropdown.hideend', hideend
      ap.on 'dropdown.hidestart', hidestart
      ap.on 'dropdown.showend', showend
      ap.on 'dropdown.showstart', showstart

      testHelpers.fakeNodeEvent(button, 'click')(fakeEvent)
      change.should.have.been.called.with(true)
      showstart.should.have.been.called()

      clock.tick(dropdownAnimationWait)

      showend.should.have.been.called()

      ap.hide()
      change.should.have.been.called.with(false)
      hidestart.should.have.been.called()

      clock.tick(dropdownAnimationWait)

      hideend.should.have.been.called()

      change.should.have.been.called.twice()
      hideend.should.have.been.called.once()
      hidestart.should.have.been.called.once()
      showend.should.have.been.called.once()
      showstart.should.have.been.called.once()


    it 'should emit the "change" event when the value is changed', ->
      testClosedAutocomplete trivialItems, undefined, (ap) ->
        value = chai.spy()
        ap.on 'change', value
        ap.value('a')
        value.should.have.been.called.with({
          cause: 'api',
          value: 'a'
        })
        value.should.have.been.called.once()

      testOpenAutocomplete trivialItems, undefined, (ap) ->
        value = chai.spy()
        ap.on 'change', value

        hx.select(document.activeElement).value('b')
        testHelpers.fakeNodeEvent(document.activeElement, 'input')({
          target: document.activeElement
        })
        clock.tick(inputDebounceWait)
        testHelpers.fakeNodeEvent(document.activeElement, 'keydown')({
          keyCode: 13
        })

        value.should.have.been.called.with({
          cause: 'user',
          value: 'b'
        })
        value.should.have.been.called.once()
        hx.consoleWarning.should.not.have.been.called()



  describe 'Fluid Api', ->

    it 'should return a selection with an autocomplete picker component', ->
      d = hx.autocompletePicker(['a'])
      d.should.be.an.instanceOf(hx.Selection)
      d.components()[0].should.be.an.instanceOf(hx.AutocompletePicker)
      d.components()[1].should.be.an.instanceOf(hx.Menu)
      d.components()[2].should.be.an.instanceOf(hx.Dropdown)


    it 'should pass the options through to the autocomplete picker', ->
      d = hx.autocompletePicker(['a'], {
        matchType: 'external'
      })
      d.component()._.options.matchType.should.equal('external')
