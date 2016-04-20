describe 'autocomplete-picker', ->

  origConsoleWarning = hx.consoleWarning
  hx.consoleWarning = chai.spy()
  fixture = undefined

  fakeEvent = {
    # fake some dom event stuff
    stopPropagation: ->
  }

  trivialItems = ['a','b','c']

  beforeEach ->
    hx.consoleWarning.reset()
    fixture?.remove()
    fixture = hx.select('body').append('div')

  after ->
    hx.consoleWarning = origConsoleWarning

  fakeNodeEvent = (node, eventName) ->
    if node?
      (e) -> hx.select.getHexagonElementDataObject(node).eventEmitter?.emit((if eventName? and isNaN(eventName) then eventName else 'click'), e)

  buildAutocomplete = (items, options) ->
    button = fixture.append('div').node()
    ap = new hx.AutocompletePicker(button, items, options)
    hx.consoleWarning.should.not.have.been.called()
    ap

  testOpenAutocomplete = (items, options, test) ->
    button = fixture.append('div').node()
    ap = new hx.AutocompletePicker(button, items, options)
    hx.consoleWarning.should.not.have.been.called()
    ap.on 'dropdown.showend', -> test(ap)
    fakeNodeEvent(button, 'click')(fakeEvent)

  invalidItemsMessage = (value) ->
    "hx.AutocompletePicker: the items was expected to be an array of items or a function, you supplied: #{value}"


  it 'should have user facing text to use as defaults', ->
    hx.userFacingText('autocompletePicker', 'chooseValue').should.equal('Choose a value...')
    hx.userFacingText('autocompletePicker', 'loading').should.equal('Loading...')
    hx.userFacingText('autocompletePicker', 'noResults').should.equal('No Results Found')
    hx.userFacingText('autocompletePicker', 'otherResults').should.equal('Other Results')


  it 'should have the correct default options defined', ->
    ap = buildAutocomplete trivialItems, {}
    ap._.options.should.eql({
      filter: undefined
      filterOptions: undefined
      matchType: undefined
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
    button = fixture.append('div').node()
    ap = new hx.AutocompletePicker(button, items, {disabled: true})
    hx.consoleWarning.should.not.have.been.called()

    fakeNodeEvent(button, 'click')(fakeEvent)
    items.should.not.have.been.called()


  it 'should correctly class the button', ->
    button = fixture.append('div').class('bob')
    ap = new hx.AutocompletePicker(button.node(), trivialItems, {buttonClass: 'steve'})
    hx.consoleWarning.should.not.have.been.called()
    button.classed('bob hx-autocomplete-picker hx-btn steve').should.equal(true)


  it 'should correctly set the renderer option', ->
    r = ->
    ap = buildAutocomplete trivialItems, {renderer: r}
    ap.renderer().should.equal(r)


  it 'should initialise with a value when one is provided', ->
    ap = buildAutocomplete trivialItems, {value: 'a'}
    ap.value().should.equal('a')


  it 'should focus the input when picker is opened', (done) ->
    testOpenAutocomplete trivialItems, {}, (ap) ->
      hx.select(document.activeElement).classed('hx-autocomplete-picker-input').should.equal(true)
      hx.consoleWarning.should.not.have.been.called()
      done()


  it 'should allow user to use arrow keys to select a value', (done) ->
    testOpenAutocomplete trivialItems, {}, (ap) ->
      # When doing a real keydown, the event propagates from the input.
      # This doesn't happen in the tests because we use the event emitter.
      dropdown = ap._.menu.dropdown._.dropdown.node()
      fakeNodeEvent(dropdown, 'keydown')({
        which: 40 # Down key
        preventDefault: ->
      })
      fakeNodeEvent(dropdown, 'keydown')({
        which: 40
        preventDefault: ->
      })
      fakeNodeEvent(dropdown, 'keydown')({
        which: 13 # Enter key
        preventDefault: ->
      })
      ap.value().should.equal('b')
      hx.consoleWarning.should.not.have.been.called()
      done()


  it 'should filter items when typing', (done) ->
    testOpenAutocomplete trivialItems, {}, (ap) ->
      hx.select(document.activeElement).value('b')
      fakeNodeEvent(document.activeElement, 'input')({
        target: document.activeElement
      })
      ap._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql(['b'])
      hx.consoleWarning.should.not.have.been.called()
      done()


  it 'should not do anything when enter is pressed and the input is empty', (done) ->
    testOpenAutocomplete trivialItems, {}, (ap) ->
      fakeNodeEvent(document.activeElement, 'keydown')({
        which: 13
      })
      should.not.exist(ap.value())
      ap._.menu.dropdown.isOpen().should.equal(true)
      hx.consoleWarning.should.not.have.been.called()
      done()


  it 'should not select an item when the key pressed is not enter', (done) ->
    testOpenAutocomplete trivialItems, {}, (ap) ->
      hx.select(document.activeElement).value('b')
      fakeNodeEvent(document.activeElement, 'keydown')({
        which: 40
      })
      should.not.exist(ap.value())
      ap._.menu.dropdown.isOpen().should.equal(true)
      hx.consoleWarning.should.not.have.been.called()
      done()


  it 'should select the first item when enter is pressed and a value is entered', (done) ->
    testOpenAutocomplete trivialItems, {}, (ap) ->
      hx.select(document.activeElement).value('b')
      fakeNodeEvent(document.activeElement, 'input')({
        target: document.activeElement
      })
      fakeNodeEvent(document.activeElement, 'keydown')({
        keyCode: 13
      })
      ap.value().should.equal('b')
      hx.consoleWarning.should.not.have.been.called()
      done()


  it 'should show the "No Results Found" text when no values are found', (done) ->
    testOpenAutocomplete trivialItems, {}, (ap) ->
      hx.select(document.activeElement).value('d')
      fakeNodeEvent(document.activeElement, 'input')({
        target: document.activeElement
      })
      ap._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql([hx.userFacingText('autocompletePicker', 'noResults')])
      hx.consoleWarning.should.not.have.been.called()
      done()


  it 'should not select the first item when enter is pressed and a value is entered if the value is "No Results"', (done) ->
    testOpenAutocomplete trivialItems, {}, (ap) ->
      hx.select(document.activeElement).value('d')
      fakeNodeEvent(document.activeElement, 'input')({
        target: document.activeElement
      })
      ap._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql([hx.userFacingText('autocompletePicker', 'noResults')])
      fakeNodeEvent(document.activeElement, 'keydown')({
        keyCode: 13
      })
      should.not.exist(ap.value())
      ap._.menu.dropdown.isOpen().should.equal(true)
      hx.consoleWarning.should.not.have.been.called()
      done()


  it 'should not do anything when the menu emits en empty item', ->
    ap = buildAutocomplete trivialItems
    should.not.exist(ap.value())
    ap._.menu.emit('change', {content: 'a'})
    ap.value().should.equal('a')
    ap._.menu.emit('change', {content: undefined})
    ap.value().should.equal('a')


  it 'should show "Loading..." when results are loading', (done) ->
    items = (term, callback) ->
      cb = ->
        callback(['a'])
      setTimeout(cb, 1000)

    testOpenAutocomplete items, {}, (ap) ->
      ap._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql([hx.userFacingText('autocompletePicker', 'loading')])
      hx.consoleWarning.should.not.have.been.called()
      done()

    hx.consoleWarning.should.not.have.been.called()


  it 'should show a warning if invalid items are set', ->
    new hx.AutocompletePicker hx.detached('div').node()
    hx.consoleWarning.should.have.been.called.with(invalidItemsMessage(undefined))

    new hx.AutocompletePicker hx.detached('div').node(), []
    hx.consoleWarning.should.have.been.called.with(invalidItemsMessage([]))

    new hx.AutocompletePicker hx.detached('div').node(), {}
    hx.consoleWarning.should.have.been.called.with(invalidItemsMessage({}))

    new hx.AutocompletePicker hx.detached('div').node(), undefined
    hx.consoleWarning.should.have.been.called.with(invalidItemsMessage(undefined))


  it 'should show other results correctly', ->
    testOpenAutocomplete trivialItems, {showOtherResults: true}, (ap) ->
      ap._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql(trivialItems)
      hx.select(document.activeElement).value('b')
      fakeNodeEvent(document.activeElement, 'input')({
        target: document.activeElement
      })
      ap._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql(['b', hx.userFacingText('autocompletePicker', 'otherResults'), 'a', 'c'])



  describe 'api', ->

    it 'hide: should hide the dropdown', (done) ->
      testOpenAutocomplete trivialItems, {}, (ap) ->
        ap._.menu.dropdown.isOpen().should.equal(true)
        ap.hide()
        ap._.menu.dropdown.isOpen().should.equal(false)
        hx.consoleWarning.should.not.have.been.called()
        done()


    it 'disabled: should set and get the disabled state', ->
      ap = buildAutocomplete trivialItems
      ap.disabled().should.equal(false)
      ap.disabled(true).should.equal(ap)
      ap.disabled().should.equal(true)
      ap.disabled(false).should.equal(ap)
      ap.disabled().should.equal(false)
      hx.consoleWarning.should.not.have.been.called()


    it 'clearCache: should call into the feed to clear the cache', ->
      ap = buildAutocomplete trivialItems
      chai.spy.on(ap._.feed, 'clearCache')
      ap.clearCache()
      ap._.feed.clearCache.should.have.been.called.once()


    it 'value: should set and get the value', ->
      ap = buildAutocomplete trivialItems
      should.not.exist(ap.value())
      ap.value('a')
      ap.value().should.equal('a')
      ap.value('b')
      ap.value().should.equal('b')
      hx.consoleWarning.should.not.have.been.called()


    it 'value: should not set the value when not in the itemsset', ->
      ap = buildAutocomplete trivialItems
      should.not.exist(ap.value())
      ap.value('d')
      should.not.exist(ap.value())
      hx.consoleWarning.should.not.have.been.called()


    it 'items: should set and get the items', ->
      ap = buildAutocomplete trivialItems
      ap.items().should.equal(trivialItems)

      items = ['a']
      ap.items(items).should.equal(ap)
      ap.items().should.eql(items)

      hx.consoleWarning.should.not.have.been.called()


    it 'items: should show a warning when called with invalid items', ->
      ap = buildAutocomplete trivialItems, {}
      ap.items(undefined)
      hx.consoleWarning.should.have.been.called.with(invalidItemsMessage(undefined))
      ap.items([])
      hx.consoleWarning.should.have.been.called.with(invalidItemsMessage([]))
      ap.items({})
      hx.consoleWarning.should.have.been.called.with(invalidItemsMessage({}))
      ap.items().should.eql(trivialItems)


    it 'renderer: should set and get the renderer', ->
      ap = buildAutocomplete trivialItems
      should.exist(ap.renderer())
      r = ->
      ap.renderer(r).should.equal(ap)
      ap.renderer().should.equal(r)



  describe 'events', ->

    it 'should emit the "highlight" event when a menu item is highlighted', (done) ->
      testOpenAutocomplete trivialItems, {}, (ap) ->
        # When doing a real keydown, the event propagates from the input.
        # This doesn't happen in the tests because we use the event emitter.
        highlight = chai.spy()
        ap.on 'highlight', highlight

        dropdown = ap._.menu.dropdown._.dropdown.node()
        fakeNodeEvent(dropdown, 'keydown')({
          which: 40 # Down key
          preventDefault: ->
        })
        highlight.should.have.been.called.with({
          eventType: 'arrow',
          content: 'a'
          menu: ap._.menu
        })
        fakeNodeEvent(dropdown, 'keydown')({
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
        done()


    it 'should emit the dropdown events with the "dropdown." prefix', (done) ->
      clock = sinon.useFakeTimers()
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

      fakeNodeEvent(button, 'click')(fakeEvent)
      change.should.have.been.called.with(true)
      showstart.should.have.been.called()

      clock.tick(200)

      showend.should.have.been.called()

      ap.hide()
      change.should.have.been.called.with(false)
      hidestart.should.have.been.called()

      clock.tick(200)

      hideend.should.have.been.called()

      change.should.have.been.called.twice()
      hideend.should.have.been.called.once()
      hidestart.should.have.been.called.once()
      showend.should.have.been.called.once()
      showstart.should.have.been.called.once()
      clock.restore()
      done()


    it 'should emit the "change" event when the value is changed', (done) ->
      ap = buildAutocomplete trivialItems
      value = chai.spy()
      ap.on 'change', value
      ap.value('a')
      value.should.have.been.called.with({
        cause: 'api',
        value: 'a'
      })
      value.should.have.been.called.once()

      testOpenAutocomplete trivialItems, {}, (ap) ->
        value.reset()
        ap.on 'change', value

        hx.select(document.activeElement).value('b')
        fakeNodeEvent(document.activeElement, 'input')({
          target: document.activeElement
        })
        fakeNodeEvent(document.activeElement, 'keydown')({
          keyCode: 13
        })

        value.should.have.been.called.with({
          cause: 'user',
          value: 'b'
        })
        value.should.have.been.called.once()
        hx.consoleWarning.should.not.have.been.called()
        done()


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