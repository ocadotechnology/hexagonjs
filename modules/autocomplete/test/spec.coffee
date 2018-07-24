describe 'hx.AutoComplete', ->
  dropdownAnimateDelay = 150
  inputDebounceDelay = 200
  ac = undefined

  stringItems = undefined
  objectItems = undefined

  input = undefined
  clock = undefined

  fixture = hx.select('body').append('div').class('hx-test-autocomplete')

  origLoop = hx.loop
  hx_requestAnimationFrame = (f) -> setTimeout(f, 1)
  hx_loop_update = (f, g) -> if not f() then hx_requestAnimationFrame(g)
  hx_loop = (f) ->
    g = -> hx_loop_update(f, g)
    hx_loop_update(f, g)

  origConsoleError = console.error
  origConsoleWarning = hx.consoleWarning
  origDropdownAttachSelector = hx._.dropdown.attachToSelector

  beforeEach ->
    ac = undefined

    stringItems = [
      'bee',
      'cee'
      'ay',
    ]

    objectItems = [
      { name: 'bee', value: 2 }
      { name: 'cee', value: 3 }
      { name: 'ay', value: 1 }
    ]

    input = fixture.append('input')
    clock = sinon.useFakeTimers()
    hx.loop = hx_loop
    chai.spy.on(console, 'error')
    hx.consoleWarning = chai.spy()
    hx._.dropdown.attachToSelector = fixture

  afterEach ->
    clock.restore()
    hx.loop = origLoop
    console.error = origConsoleError
    hx.consoleWarning = origConsoleWarning
    hx._.dropdown.attachToSelector = origDropdownAttachSelector
    fixture.clear()

  after ->
    fixture.remove()


  describe 'sets the user facing text', ->
    it 'loading', ->
      hx.userFacingText('autoComplete','loading').should.equal('Loading...')

    it 'noResultsFound', ->
      hx.userFacingText('autoComplete','noResultsFound').should.equal('No results found')

    it 'otherResults', ->
      hx.userFacingText('autoComplete','otherResults').should.equal('Other Results')

    it 'pleaseEnterMinCharacters', ->
      hx.userFacingText('autoComplete','pleaseEnterMinCharacters').should.equal('Please enter $minLength or more characters')


  describe 'exports', ->
    it 'hx.AutoComplete', ->
      should.exist(hx.AutoComplete)

    it 'hx.autoComplete', ->
      should.exist(hx.autoComplete)


  describe 'without items', ->
    beforeEach ->
      ac = new hx.AutoComplete(input)

    it 'shows a warning', ->
      hx.consoleWarning.should.have.been.called()

    it 'does not set up options', ->
      should.not.exist(ac.options)

    it 'does not set the component', ->
      should.not.exist(input.component())


  describe 'with string items', ->
    beforeEach ->
      ac = new hx.AutoComplete(input, stringItems)

    it 'sets up the component', ->
      input.component().should.equal(ac)


    describe 'calling clearCache', ->
      data = undefined

      beforeEach ->
        data = ac._.data
        ac.clearCache()

      it 'resets the cache', ->
        ac._.data.should.not.equal(data)


    describe 'calling show', ->
      beforeEach ->
        ac.show()
        clock.tick(dropdownAnimateDelay)

      it 'creates the dropdown', ->
        fixture.select('.hx-dropdown').empty().should.equal(false)

      it 'renders the sorted items based on the value', ->
        fixture.selectAll('.hx-menu-item').text().should.eql(['ay', 'bee', 'cee'])

      describe 'then hide', ->
        beforeEach ->
          ac.hide()
          clock.tick(dropdownAnimateDelay)

        it 'should remove the dropdown', ->
          fixture.select('.hx-dropdown').empty().should.equal(true)


    describe 'calling hide', ->
      it 'returns the autocomplete', ->
        ac.hide().should.equal(ac)


    describe 'calling value with arguments', ->
      beforeEach ->
        ac.value('bee')

      it 'sets the value', ->
        ac.value().should.equal('bee')

      it 'sets the input correctly', ->
        input.value().should.equal('bee')

      it 'returns the autocomplete', ->
        ac.value('cee').should.equal(ac)


    describe 'sets the default option values', ->
      it 'minLength', ->
        ac.options.minLength.should.equal(0)

      it 'showAll', ->
        ac.options.showAll.should.equal(true)

      it 'trimTrailingSpaces', ->
        ac.options.trimTrailingSpaces.should.equal(false)

      it 'mustMatch', ->
        ac.options.mustMatch.should.equal(false)

      it 'inputMap', ->
        should.not.exist(ac.options.inputMap)

      it 'renderer', ->
        ac.options.renderer.should.be.a('function')

      it 'matchType', ->
        ac.options.matchType.should.equal('contains')

      it 'placeholder', ->
        should.not.exist(ac.options.placeholder)

      it 'filter', ->
        ac.options.filter.should.be.a('function')

      it 'filterOptions', ->
        ac.options.filterOptions.should.eql({})

      it 'showOtherResults', ->
        ac.options.showOtherResults.should.equal(false)

      it 'allowTabCompletion', ->
        ac.options.allowTabCompletion.should.equal(true)

      it 'value', ->
        should.not.exist(ac.options.value)

      it 'loadingMessage', ->
        ac.options.loadingMessage.should.equal(hx.userFacingText('autoComplete', 'loading'))

      it 'noResultsMessage', ->
        ac.options.noResultsMessage.should.equal(hx.userFacingText('autoComplete', 'noResultsFound'))

      it 'otherResultsMessage', ->
        ac.options.otherResultsMessage.should.equal(hx.userFacingText('autoComplete', 'otherResults'))

      it 'pleaseEnterMinCharactersMessage', ->
        ac.options.pleaseEnterMinCharactersMessage.should.equal(hx.userFacingText('autoComplete', 'pleaseEnterMinCharacters'))


    describe 'and providing an initial value', ->
      beforeEach ->
        ac = new hx.AutoComplete(input, stringItems, { value: 'ay'})

      it 'calling value gets the value from the options', ->
        ac.value().should.equal('ay')

      describe 'calling show', ->
        beforeEach ->
          ac.show()
          clock.tick(dropdownAnimateDelay)

        it 'creates the dropdown', ->
          fixture.select('.hx-dropdown').empty().should.equal(false)

        it 'renders the ay item', ->
          fixture.selectAll('.hx-menu-item').text().should.eql(['ay'])


  describe 'when using object items', ->
    beforeEach ->
      ac = new hx.AutoComplete(input, objectItems, {
        value: { name: 'xx', value: 5 },
        inputMap: (item) -> "#{item.name}, #{item.value}"
      })
      chai.spy.on(ac.options, 'inputMap')

    it 'sets the initial value when it is not in the items', ->
      ac.value().should.equal('xx, 5')

    it 'sets the renderer using the inputMap from the options', ->
      testVal = { name: 'Bob', value: 7 }
      ac.options.renderer(hx.detached('div').node(), testVal)
      ac.options.inputMap.should.have.been.called.with(testVal)

  describe 'when using a function with string items', ->
    describe 'without delay', ->
      functionItems = (term , cb) ->
        cb(stringItems.filter((item) -> item.indexOf(term) > -1))

      beforeEach () ->
        ac = new hx.AutoComplete(input, functionItems, { value: 'ay' })

      it 'sets the initial value correctly from the options', ->
        ac.value().should.equal('ay')


    describe 'with delay', ->
      functionDelay = 10000
      functionItemsWithDelay = (term, cb) ->
        setTimeout(
          () -> cb(stringItems.filter((item) -> item.indexOf(term) > -1)),
          functionDelay
        )

      beforeEach () ->
        ac = new hx.AutoComplete(input, functionItemsWithDelay, { value: 'ay' })

      it 'sets the initial value correctly from the options', ->
        ac.value().should.equal('ay')

      describe 'before items are returned', ->
        beforeEach () ->
          chai.spy.on(ac, 'show')
          testHelpers.fakeNodeEvent(ac._.input.node(), 'focus')()
          clock.tick(dropdownAnimateDelay)

        it 'shows the dropdown', ->
          ac.show.should.have.been.called()

        it 'shows the loading text', ->
          fixture.select('.hx-menu-item').text().should.equal(hx.userFacingText('autoComplete', 'loading'))


    describe 'with delay and mustMatch', ->
      it 'handles pressing enter', ->
        # https://github.com/ocadotechnology/hexagonjs/issues/338
        functionDelay = 10000
        mustMatchFunctionItems = (term, cb) ->
          setTimeout(
            () -> cb(stringItems.filter((item) -> item.indexOf(term) > -1)),
            functionDelay
          )
        ac = new hx.AutoComplete(input, mustMatchFunctionItems, { mustMatch: true })
        testHelpers.fakeNodeEvent(ac._.input.node(), 'focus')()
        ac._.input.value('ayz')
        testHelpers.fakeNodeEvent(ac._.input.node(), 'input')({
          target: ac._.input.node(),
          preventDefault: () ->
        })
        clock.tick(inputDebounceDelay)
        ac._.data.get('ayz').should.equal(true, 'data loading')
        testHelpers.fakeNodeEvent(ac._.input.node(), 'keydown')({
          which: 13,
          preventDefault: () ->
        })
        console.error.should.not.have.been.called()
        input.value().should.equal('', 'input empty')
        ac.value().should.equal('', 'ac value empty')
        clock.tick(dropdownAnimateDelay)
        fixture.selectAll('.hx-dropdown').empty().should.equal(true, 'dropdown empty')

  describe 'hx.autoComplete', ->
    beforeEach ->
      ac = hx.autoComplete(stringItems, { testMergeOption: true })

    it 'returns a selection', ->
      (ac instanceof hx.Selection).should.equal(true)

    it 'has the AutoComplete component', ->
      (ac.component() instanceof hx.AutoComplete).should.equal(true)

    it 'passes the options to the AutoComplete', ->
      ac.component().options.testMergeOption.should.equal(true)



