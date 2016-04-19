describe 'Autocomplete Feed', ->
  AutocompleteFeed = hx._.AutocompleteFeed

  it 'should set the default options correctly', ->
    af = new AutocompleteFeed
    should.exist(af._.options.filter)
    af._.options.filter.should.be.an.instanceOf(Function)
    af._.options.matchType.should.equal('contains')
    should.not.exist(af._.options.filterOptions)
    should.not.exist(af._.options.inputMap)

  it 'should use the default searchValues function if an inputMap is defined', ->
    inputMap = chai.spy()
    af = new AutocompleteFeed({
      inputMap: inputMap
    })
    should.exist(af._.options.filterOptions)
    af._.options.filterOptions.should.be.an.instanceOf(Object)
    should.exist(af._.options.filterOptions.searchValues)
    af._.options.filterOptions.searchValues.should.be.an.instanceOf(Function)

  it 'should use passed in options where defined', ->
    inputMap = chai.spy()
    matchType = 'exact'
    filter = chai.spy()
    filterOptions =
      searchValues: chai.spy()

    af = new AutocompleteFeed({
      inputMap: inputMap
      matchType: matchType
      filter: filter
      filterOptions: filterOptions
    })

    af._.options.inputMap.should.equal(inputMap)
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

      it 'should use cached data if available', ->

      it 'should call the filter option function', ->

      it 'should sort and filter results by default', ->

      it 'should return other results', ->

      it 'should return the entire dataset when the term is ""', ->

      it 'should trim trailing spaces', ->

      it 'should use the inputMap correctly', ->


    it 'isValidData(data): should validate data correctly', ->
      af = new AutocompleteFeed

      af.isValidData([]).should.equal(true)
      af.isValidData(chai.spy()).should.equal(true)
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