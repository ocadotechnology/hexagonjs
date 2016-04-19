describe 'Autocomplete Feed', ->
  AutocompleteFeed = hx._.AutocompleteFeed

  it 'should set the default options correctly', ->
    af = new AutocompleteFeed
    should.exist(af._.options.filter)
    af._.options.filter.should.be.an.instanceOf(Function)
    af._.options.matchType.should.equal('contains')
    should.not.exist(af._.options.filterOptions)
    should.not.exist(af._.options.valueLookup)

  it 'should use the default searchValues function if an valueLookup is defined', ->
    valueLookup = chai.spy()
    af = new AutocompleteFeed({
      valueLookup: valueLookup
    })
    should.exist(af._.options.filterOptions)
    af._.options.filterOptions.should.be.an.instanceOf(Object)
    should.exist(af._.options.filterOptions.searchValues)
    af._.options.filterOptions.searchValues.should.be.an.instanceOf(Function)

  it 'should use passed in options where defined', ->
    valueLookup = chai.spy()
    matchType = 'exact'
    filter = chai.spy()
    filterOptions =
      searchValues: chai.spy()

    af = new AutocompleteFeed({
      valueLookup: valueLookup
      matchType: matchType
      filter: filter
      filterOptions: filterOptions
    })

    af._.options.valueLookup.should.equal(valueLookup)
    af._.options.matchType.should.equal(matchType)
    af._.options.filter.should.equal(filter)
    af._.options.filterOptions.should.eql(filterOptions)


  describe 'api', ->

    it 'clearCache(): should create a new cache', ->
      af = new AutocompleteFeed
      initialCache = af._.resultsCache
      initialCache.should.be.an.instanceOf(hx.Map)
      af.clearCache()
      initialCache.should.not.equal(af._.resultsCache)
      af._.resultsCache.should.be.an.instanceOf(hx.Map)


    describe 'filterData(term, callback):', ->
      it 'should not perform filtering when using external matching and data as a function', ->
        af = new AutocompleteFeed({
          matchType: 'external'
        })
        dataArr = ['b','c','a','d']
        data = (term, cb) -> cb(dataArr)
        af.data(data)
        callback = chai.spy()
        af.filterData('a', callback)
        callback.should.have.been.called.once()
        callback.should.have.been.called.with(dataArr, [])

      it 'should use cached data if available', ->
        af = new AutocompleteFeed
        spy = chai.spy()
        callback = chai.spy()
        data = (term, cb) ->
          spy(term)
          cb(['a'])
        af.data(data)

        af.filterData('a', callback)
        spy.should.have.been.called.once()
        callback.should.have.been.called.once()
        spy.should.have.been.called.with('a')

        af.filterData('ab', callback)
        spy.should.have.been.called.twice()
        callback.should.have.been.called.twice()
        spy.should.have.been.called.with('ab')

        af.filterData('a', callback)
        spy.should.have.been.called.twice()
        callback.should.have.been.called.exactly(3)

      it 'should call the filter option function', ->
        filter = chai.spy()
        af = new AutocompleteFeed({
          filter: filter
        })
        af.data(['a'])
        af.filterData('a', ->)
        filter.should.have.been.called.once()
        filter.should.have.been.called.with(['a'], 'a')

      it 'should sort and filter results by default', ->
        af = new AutocompleteFeed
        af.data(['ba','b','a','c','d','ab','a'])
        callback = chai.spy()
        af.filterData('a', callback)
        callback.should.have.been.called.once()
        callback.should.have.been.called.with(['a','a','ab','ba'], [])

      it 'should return other results when using a function', ->
        af = new AutocompleteFeed({
          showOtherResults: true
        })
        dataArr = ['ba','b','a','d','c','ab','a']
        data = (term, cb) -> cb(dataArr)
        af.data(data)
        callback = chai.spy()
        af.filterData('a', callback)
        callback.should.have.been.called.once()
        callback.should.have.been.called.with(['a','a','ab','ba'], ['b','c','d'])

      it 'should return other results when using an array', ->
        af = new AutocompleteFeed({
          showOtherResults: true
        })
        af.data(['ba','b','a','d','c','ab','a'])
        callback = chai.spy()
        af.filterData('a', callback)
        callback.should.have.been.called.once()
        callback.should.have.been.called.with(['a','a','ab','ba'], ['b','c','d'])

      it 'should return the entire dataset when the term is ""', ->
        af = new AutocompleteFeed
        dataArr = ['ba','b','a','d','c','ab','a']
        af.data(dataArr)
        callback = chai.spy()
        af.filterData('', callback)
        callback.should.have.been.called.once()
        callback.should.have.been.called.with(dataArr, [])

      it 'should trim trailing spaces when no values are returned', ->
        af = new AutocompleteFeed({
          trimTrailingSpaces: true
        })
        data = (term, cb) ->

          if term.lastIndexOf(' ') is term.length - 1
            cb []
          else
            cb ['a', 'aa', 'b', 'ba']
        af.data(data)
        callback = chai.spy()
        af.filterData('a ', callback)
        callback.should.have.been.called.once()
        callback.should.have.been.called.with(['a','aa', 'ba'],[])

      it 'should not trim trailing spaces if a value is returned', ->
        af = new AutocompleteFeed({
          trimTrailingSpaces: true
        })
        data = (term, cb) -> cb ['a', 'a a', 'aa', 'b', 'ba']
        af.data(data)
        callback = chai.spy()
        af.filterData('a ', callback)
        callback.should.have.been.called.once()
        callback.should.have.been.called.with(['a a'],[])

      it 'should use the valueLookup correctly', ->
        valueLookup = (val) -> val.text
        af = new AutocompleteFeed({
          valueLookup: valueLookup
        })
        aObj = {text: 'a'}
        bObj = {text: 'b'}
        cObj = {text: 'ca'}

        af.data([aObj, bObj, cObj])
        callback = chai.spy()
        af.filterData('a', callback)
        callback.should.have.been.called.once()
        callback.should.have.been.called.with([aObj, cObj])

      it 'should sort disabled items correctly', ->
        valueLookup = (val) -> val.text
        af = new AutocompleteFeed({
          valueLookup: valueLookup
        })
        aObj = {text: 'a', disabled: false}
        bObj = {text: 'ab', disabled: true}
        cObj = {text: 'ac', disabled: false}

        af.data([aObj, bObj, cObj])
        callback = chai.spy()
        af.filterData('a', callback)
        callback.should.have.been.called.once()
        callback.should.have.been.called.with([aObj, cObj, bObj])

    it 'isValidData(data): should validate data correctly', ->
      af = new AutocompleteFeed

      af.isValidData([]).should.equal(false)
      af.isValidData(['a']).should.equal(true)
      af.isValidData(chai.spy()).should.equal(true)
      af.isValidData(->).should.equal(true)
      af.isValidData({}).should.equal(false)

    it 'data(data): should set the current data', ->
      data = [1,2,3]
      af = new AutocompleteFeed
      should.not.exist(af._.data)
      af.data(data)
      af._.data.should.equal(data)

    it 'data(): should return the currently set data', ->
      data = [1,2,3]
      af = new AutocompleteFeed
      af.data(data)
      af.data().should.equal(data)


describe 'Autocomplete Picker', ->
  origConsoleWarning = hx.consoleWarning
  hx.consoleWarning = chai.spy()

  beforeEach ->
    hx.consoleWarning.reset()

  after ->
    hx.consoleWarning = origConsoleWarning

  it 'should have userFacingText to use as defaults', ->
    hx.userFacingText('autocomplete', 'noResults').should.equal('No Results Found')
    hx.userFacingText('autocomplete', 'otherResults').should.equal('Other Results')

  it 'should focus the input when picker is opened', ->

    hx.consoleWarning.should.not.have.been.called()

  it 'should allow user to use arrow keys to select a value', ->

    hx.consoleWarning.should.not.have.been.called()

  it 'should filter items when typing', ->

    hx.consoleWarning.should.not.have.been.called()

  it 'should set the "active" item when a value is entered', ->

    hx.consoleWarning.should.not.have.been.called()

  it 'should clear the "active" item when the value is cleared', ->

    hx.consoleWarning.should.not.have.been.called()

  it 'should show the "No Results Found" text when no values are found', ->

    hx.consoleWarning.should.not.have.been.called()

  it 'should show "Loading..." when results are loading', ->

    hx.consoleWarning.should.not.have.been.called()


  describe 'api', ->
    it 'hide(): should hide the dropdown', ->

      hx.consoleWarning.should.not.have.been.called()


    it 'disabled(): should return the disabled state', ->

      hx.consoleWarning.should.not.have.been.called()

    it 'disabled(true): should set the disabled state', ->

      hx.consoleWarning.should.not.have.been.called()


    it 'clearCache(): should clear cached values', ->

      hx.consoleWarning.should.not.have.been.called()


    it 'value(): should return the currently set value', ->

      hx.consoleWarning.should.not.have.been.called()

    it 'value(val: String): should set the value to a value in the dataset', ->

      hx.consoleWarning.should.not.have.been.called()

    it 'value(val): should not set the value when not in the dataset', ->

      hx.consoleWarning.should.not.have.been.called()


    it 'data(): should return the currently set data function', ->

      hx.consoleWarning.should.not.have.been.called()

    it 'data(): should return the currently set data array', ->

      hx.consoleWarning.should.not.have.been.called()

    it 'data(data: Function): should set the data function', ->

      hx.consoleWarning.should.not.have.been.called()

    it 'data(data: Array): should set the data array', ->

      hx.consoleWarning.should.not.have.been.called()

  describe 'hx.autocompletePicker', ->
    it 'should return a selection with an autocomplete picker component', ->
      d = hx.autocompletePicker(['a'])
      d.should.be.an.instanceOf(hx.Selection)
      d.component().should.be.an.instanceOf(hx.AutocompletePicker)

    it 'should pass the options through to the autocomplete picker', ->
      d = hx.autocompletePicker(['a'], {
        matchType: 'external'
      })
      d.component()._.options.matchType.should.equal('external')
