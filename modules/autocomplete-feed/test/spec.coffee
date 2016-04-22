describe 'autocomplete-feed', ->

  it 'should set the default options correctly', ->
    af = new hx.AutocompleteFeed
    should.exist(af._.options.filter)
    af._.options.useCache.should.equal(true)
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
      af.clearCache().should.equal(af)
      initialCache.should.not.equal(af._.resultsCache)
      af._.resultsCache.should.be.an.instanceOf(hx.Map)
      af._.resultsCache.keys().should.eql([])


    it 'validateItems: should validate items correctly', ->
      af = new hx.AutocompleteFeed

      af.validateItems([]).should.equal(true)
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


    it 'filter: should sort items in the correct order', ->
      af = new hx.AutocompleteFeed
      af.items(['ab', 'ba', 'aab', 'bba'])
      callback = chai.spy()
      af.filter('a', callback)
      callback.should.have.been.called.with(['aab', 'ab', 'ba', 'bba'], [])
      af.filter('b', callback)
      callback.should.have.been.called.with(['ba', 'bba', 'ab', 'aab'], [])


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


    it 'filter: should sort disabled other results correctly', ->
      valueLookup = (val) -> val.text
      af = new hx.AutocompleteFeed({
        valueLookup: valueLookup
        showOtherResults: true
      })
      aObj = {text: 'a', disabled: false}
      bObj = {text: 'ab', disabled: true}
      cObj = {text: 'ac', disabled: false}
      dObj = {text: 'abc', disabled: false}

      af.items([aObj, bObj, cObj, dObj])
      callback = chai.spy()
      af.filter('d', callback)
      callback.should.have.been.called.once()
      callback.should.have.been.called.with([], [aObj, dObj, cObj, bObj])


    it 'filter: should only call back with the last call to filter', ->
      clock = sinon.useFakeTimers()
      itemArr = ['abc','abb','acc']
      callCheck = chai.spy()
      items = (term, callback) ->
        setTimeout ->
          callCheck(term)
          callback(itemArr)
        , 1000 / term.length

      af = new hx.AutocompleteFeed
      af.items(items).should.equal(af)

      cb = chai.spy()
      af.filter('a', cb)
      af.filter('abc', cb)
      af.filter('ab', cb)

      clock.tick(1000 / 3)
      callCheck.should.have.been.called.once()
      callCheck.should.have.been.called.with('abc')
      clock.tick(1000 / 2)
      callCheck.should.have.been.called.twice()
      callCheck.should.have.been.called.with('ab')
      clock.tick(1000 / 1)
      callCheck.should.have.been.called.exactly(3)
      callCheck.should.have.been.called.with('a')

      cb.should.have.been.called.once()
      cb.should.have.been.called.with(['abb', 'abc'])
      clock.restore()


    it 'filter: should not cache results when the useCache option is false', ->
      af = new hx.AutocompleteFeed({
        useCache: false
      })
      af._.resultsCache.should.be.an.instanceOf(hx.Map)
      af._.resultsCache.entries().length.should.equal(0)
      af.items(['a','b','c'])
      af._.resultsCache.entries().length.should.equal(0)
      af.filter('', ->)
      af._.resultsCache.entries().length.should.equal(0)
      af.filter('a', ->)
      af._.resultsCache.entries().length.should.equal(0)
      af.filter('b', ->)
      af._.resultsCache.entries().length.should.equal(0)


    it 'filter: should use the cache before attempting to get new data', ->
      af = new hx.AutocompleteFeed()
      callback = chai.spy()
      af.items(['a','b','c'])
      af._.resultsCache.should.be.an.instanceOf(hx.Map)
      af._.resultsCache.entries().length.should.equal(0)
      chai.spy.on(af._.resultsCache, 'has')
      chai.spy.on(af._.resultsCache, 'get')
      chai.spy.on(af._.resultsCache, 'set')

      af.filter('a', callback)
      af._.resultsCache.has.should.have.been.called.with('a')
      af._.resultsCache.has.should.have.been.called.once()
      af._.resultsCache.set.should.have.been.called.with('a', {
        results: ['a']
        otherResults: []
      })
      af._.resultsCache.entries().length.should.equal(1)
      callback.should.have.been.called.with(['a'],[])

      af.filter('a', callback)
      af._.resultsCache.has.should.have.been.called.with('a')
      af._.resultsCache.has.should.have.been.called.twice()
      af._.resultsCache.get.should.have.been.called.with('a')
      af._.resultsCache.get.should.have.been.called.once()
      callback.should.have.been.called.with(['a'],[])
      callback.should.have.been.called.twice()


    it 'filter: should use the cache before attempting to get new data using a function', ->
      af = new hx.AutocompleteFeed()
      items = chai.spy((term, cb) -> cb(['a','b','c'],['d']))
      callback = chai.spy()
      af.items(items)
      af._.resultsCache.should.be.an.instanceOf(hx.Map)
      af._.resultsCache.entries().length.should.equal(0)
      chai.spy.on(af._.resultsCache, 'has')
      chai.spy.on(af._.resultsCache, 'get')
      chai.spy.on(af._.resultsCache, 'set')

      af.filter('a', callback)
      af._.resultsCache.has.should.have.been.called.with('a')
      af._.resultsCache.has.should.have.been.called.once()
      af._.resultsCache.set.should.have.been.called.with('a', {
        results: ['a']
        otherResults: []
      })
      af._.resultsCache.entries().length.should.equal(1)
      callback.should.have.been.called.with(['a'],[])
      items.should.have.been.called.once()

      af.filter('a', callback)
      af._.resultsCache.has.should.have.been.called.with('a')
      af._.resultsCache.has.should.have.been.called.twice()
      af._.resultsCache.get.should.have.been.called.with('a')
      af._.resultsCache.get.should.have.been.called.once()
      callback.should.have.been.called.with(['a'],[])
      callback.should.have.been.called.twice()
      items.should.have.been.called.once()


    it 'filter: should use the cache before attempting to get new data when using external matching', ->
      af = new hx.AutocompleteFeed({
        matchType: 'external'
      })
      items = chai.spy((term, cb) -> cb(['a','b','c'],['d']))
      callback = chai.spy()
      af.items(items)
      af._.resultsCache.should.be.an.instanceOf(hx.Map)
      af._.resultsCache.entries().length.should.equal(0)
      chai.spy.on(af._.resultsCache, 'has')
      chai.spy.on(af._.resultsCache, 'get')
      chai.spy.on(af._.resultsCache, 'set')

      af.filter('a', callback)
      af._.resultsCache.has.should.have.been.called.with('a')
      af._.resultsCache.has.should.have.been.called.once()
      af._.resultsCache.set.should.have.been.called.with('a', {
        results: ['a','b','c']
        otherResults: ['d']
      })
      af._.resultsCache.entries().length.should.equal(1)
      callback.should.have.been.called.with(['a','b','c'],['d'])
      items.should.have.been.called.once()

      af.filter('a', callback)
      af._.resultsCache.has.should.have.been.called.with('a')
      af._.resultsCache.has.should.have.been.called.twice()
      af._.resultsCache.get.should.have.been.called.with('a')
      af._.resultsCache.get.should.have.been.called.once()
      callback.should.have.been.called.with(['a','b','c'],['d'])
      callback.should.have.been.called.twice()
      items.should.have.been.called.once()
