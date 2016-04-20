describe 'autocomplete-feed', ->

  it 'should set the default options correctly', ->
    af = new hx.AutocompleteFeed
    should.exist(af._.options.filter)
    af._.options.filter.should.be.an.instanceOf(Function)
    af._.options.matchType.should.equal('contains')
    should.not.exist(af._.options.filterOptions)
    should.not.exist(af._.options.valueLookup)


  it 'should use the default searchValues function if an valueLookup is defined', ->
    valueLookup = chai.spy()
    af = new hx.AutocompleteFeed({
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

    af = new hx.AutocompleteFeed({
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

    it 'clearCache: should create a new cache', ->
      af = new hx.AutocompleteFeed
      af.items(['a','b','c'])
      af.filter('', ->)
      af.filter('a', ->)
      initialCache = af._.resultsCache
      initialCache.should.be.an.instanceOf(hx.Map)
      initialCache.keys().should.eql(['', 'a'])
      af.clearCache()
      initialCache.should.not.equal(af._.resultsCache)
      af._.resultsCache.should.be.an.instanceOf(hx.Map)
      af._.resultsCache.keys().should.eql([])


    it 'validateItems: should validate items correctly', ->
      af = new hx.AutocompleteFeed

      af.validateItems([]).should.equal(false)
      af.validateItems(['a']).should.equal(true)
      af.validateItems(chai.spy()).should.equal(true)
      af.validateItems(->).should.equal(true)
      af.validateItems({}).should.equal(false)


    it 'items: should set and get the current items', ->
      items = [1,2,3]
      af = new hx.AutocompleteFeed
      should.not.exist(af.items())
      af.items(items)
      af.items().should.equal(items)


    it 'filter: should use "" if the term is undefined', ->
      af = new hx.AutocompleteFeed
      cb = chai.spy()
      items = (term, callback) ->
        should.exist(term)
        callback(['a'])
      af.items(items)
      af.filter(undefined, cb)
      cb.should.have.been.called()
      cb.should.have.been.called.with(['a'], [])


    it 'filter: should not perform filtering when using external matching and items as a function', ->
      af = new hx.AutocompleteFeed({
        matchType: 'external'
      })
      itemsArr = ['b','c','a','d']
      items = (term, cb) -> cb(itemsArr)
      af.items(items)
      callback = chai.spy()
      af.filter('a', callback)
      callback.should.have.been.called.once()
      callback.should.have.been.called.with(itemsArr, [])


    it 'filter: should use cached items if available', ->
      af = new hx.AutocompleteFeed
      spy = chai.spy()
      callback = chai.spy()
      items = (term, cb) ->
        spy(term)
        cb(['a'])
      af.items(items)

      af.filter('a', callback)
      spy.should.have.been.called.once()
      callback.should.have.been.called.once()
      spy.should.have.been.called.with('a')

      af.filter('ab', callback)
      spy.should.have.been.called.twice()
      callback.should.have.been.called.twice()
      spy.should.have.been.called.with('ab')

      af.filter('a', callback)
      spy.should.have.been.called.twice()
      callback.should.have.been.called.exactly(3)


    it 'filter: should call the filter option function', ->
      filter = chai.spy()
      af = new hx.AutocompleteFeed({
        filter: filter
      })
      af.items(['a'])
      af.filter('a', ->)
      filter.should.have.been.called.once()
      filter.should.have.been.called.with(['a'], 'a')


    it 'filter: should sort and filter results by default', ->
      af = new hx.AutocompleteFeed
      af.items(['ba','b','a','c','d','ab','a'])
      callback = chai.spy()
      af.filter('a', callback)
      callback.should.have.been.called.once()
      callback.should.have.been.called.with(['a','a','ab','ba'], [])


    it 'filter: should return other results when using a function', ->
      af = new hx.AutocompleteFeed({
        showOtherResults: true
      })
      itemsArr = ['ba','b','a','d','c','ab','a']
      items = (term, cb) -> cb(itemsArr)
      af.items(items)
      callback = chai.spy()
      af.filter('a', callback)
      callback.should.have.been.called.once()
      callback.should.have.been.called.with(['a','a','ab','ba'], ['b','c','d'])


    it 'filter: should return other results when using an array', ->
      af = new hx.AutocompleteFeed({
        showOtherResults: true
      })
      af.items(['ba','b','a','d','c','ab','a'])
      callback = chai.spy()
      af.filter('a', callback)
      callback.should.have.been.called.once()
      callback.should.have.been.called.with(['a','a','ab','ba'], ['b','c','d'])


    it 'filter: should return the entire itemsset when the term is ""', ->
      af = new hx.AutocompleteFeed
      itemsArr = ['ba','b','a','d','c','ab','a']
      af.items(itemsArr)
      callback = chai.spy()
      af.filter('', callback)
      callback.should.have.been.called.once()
      callback.should.have.been.called.with(itemsArr, [])


    it 'filter: should trim trailing spaces when no values are returned', ->
      af = new hx.AutocompleteFeed({
        trimTrailingSpaces: true
      })
      items = (term, cb) ->

        if term.lastIndexOf(' ') is term.length - 1
          cb []
        else
          cb ['a', 'aa', 'b', 'ba']
      af.items(items)
      callback = chai.spy()
      af.filter('a ', callback)
      callback.should.have.been.called.once()
      callback.should.have.been.called.with(['a','aa', 'ba'],[])


    it 'filter: should not trim trailing spaces if a value is returned', ->
      af = new hx.AutocompleteFeed({
        trimTrailingSpaces: true
      })
      items = (term, cb) -> cb ['a', 'a a', 'aa', 'b', 'ba']
      af.items(items)
      callback = chai.spy()
      af.filter('a ', callback)
      callback.should.have.been.called.once()
      callback.should.have.been.called.with(['a a'],[])


    it 'filter: should use the valueLookup correctly', ->
      valueLookup = (val) -> val.text
      af = new hx.AutocompleteFeed({
        valueLookup: valueLookup
      })
      aObj = {text: 'a'}
      bObj = {text: 'b'}
      cObj = {text: 'ca'}

      af.items([aObj, bObj, cObj])
      callback = chai.spy()
      af.filter('a', callback)
      callback.should.have.been.called.once()
      callback.should.have.been.called.with([aObj, cObj])


    it 'filter: should sort disabled items correctly', ->
      valueLookup = (val) -> val.text
      af = new hx.AutocompleteFeed({
        valueLookup: valueLookup
      })
      aObj = {text: 'a', disabled: false}
      bObj = {text: 'ab', disabled: true}
      cObj = {text: 'ac', disabled: false}

      af.items([aObj, bObj, cObj])
      callback = chai.spy()
      af.filter('a', callback)
      callback.should.have.been.called.once()
      callback.should.have.been.called.with([aObj, cObj, bObj])