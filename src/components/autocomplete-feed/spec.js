import chai from 'chai'

import { Map as HMap } from 'utils/map'

import { AutocompleteFeed } from 'components/autocomplete-feed'

import { installFakeTimers } from 'test/utils/fake-time'

const should = chai.should()

export default () => {
  describe('autocomplete-feed', () => {
    it('should set the default options correctly', () => {
      const af = new AutocompleteFeed()

      should.exist(af._.options.filter)
      af._.options.useCache.should.equal(true)
      af._.options.filter.should.be.an.instanceOf(Function)
      af._.options.matchType.should.equal('contains')
      should.not.exist(af._.options.filterOptions)
      should.not.exist(af._.options.valueLookup)
    })

    it('should use the default searchValues function if a valueLookup is defined', () => {
      const valueLookup = chai.spy()
      const af = new AutocompleteFeed({
        valueLookup
      })

      should.exist(af._.options.filterOptions)
      af._.options.filterOptions.should.be.an.instanceOf(Object)
      should.exist(af._.options.filterOptions.searchValues)
      af._.options.filterOptions.searchValues.should.be.an.instanceOf(Function)
    })

    // sanity check
    it('should not override the searchValues option even if valueLookup is defined', () => {
      const af = new AutocompleteFeed({
        valueLookup: 'hello world',
        filterOptions: {
          searchValues: 'do not override'
        }
      })

      af._.options.filterOptions.searchValues.should.equal('do not override')
    })

    it('should use passed in options where defined', () => {
      const valueLookup = chai.spy()
      const matchType = 'exact'
      const filter = chai.spy()
      const filterOptions = {
        searchValues: chai.spy()
      }

      const af = new AutocompleteFeed({
        valueLookup,
        matchType,
        filter,
        filterOptions
      })

      af._.options.valueLookup.should.equal(valueLookup)
      af._.options.matchType.should.equal(matchType)
      af._.options.filter.should.equal(filter)
      af._.options.filterOptions.should.eql(filterOptions)
    })

    return describe('api', () => {
      it('clearCache: should create a new cache', () => {
        const af = new AutocompleteFeed()
        af.items(['a', 'b', 'c'])
        af.filter('', () => {})
        af.filter('a', () => {})

        const initialCache = af._.resultsCache

        initialCache.should.be.an.instanceOf(HMap)
        initialCache.keys().should.eql(['', 'a'])
        af.clearCache().should.equal(af)
        initialCache.should.not.equal(af._.resultsCache)
        af._.resultsCache.should.be.an.instanceOf(HMap)
        af._.resultsCache.keys().should.eql([])
      })

      it('validateItems: should validate items correctly', () => {
        const af = new AutocompleteFeed()

        af.validateItems([]).should.equal(true)
        af.validateItems(['a']).should.equal(true)
        af.validateItems(chai.spy()).should.equal(true)
        af.validateItems(() => {}).should.equal(true)
        af.validateItems({}).should.equal(false)
      })

      it('items: should set and get the current items', () => {
        const items = [1, 2, 3]
        const af = new AutocompleteFeed()

        should.not.exist(af.items())
        af.items(items)
        af.items().should.equal(items)
      })

      it('filter: should not perform filtering when using external matching and items as a function', () => {
        const af = new AutocompleteFeed({
          matchType: 'external'
        })

        const itemsArr = ['b', 'c', 'a', 'd']

        const callback = chai.spy()
        function items (term, cb) {
          cb(itemsArr)
        }

        af.items(items)
        af.filter('a', callback)

        callback.should.have.been.called.exactly(1)
        callback.should.have.been.called.with(itemsArr, [])
      })

      it('filter: should use cached items if available', () => {
        const af = new AutocompleteFeed()
        const spy = chai.spy()
        const callback = chai.spy()
        function items (term, cb) {
          spy(term)
          cb(['a'])
        }

        af.items(items)

        af.filter('a', callback)
        spy.should.have.been.called.exactly(1)
        callback.should.have.been.called.exactly(1)
        spy.should.have.been.called.with('a')

        af.filter('ab', callback)
        spy.should.have.been.called.exactly(2)
        callback.should.have.been.called.exactly(2)
        spy.should.have.been.called.with('ab')

        af.filter('a', callback)
        spy.should.have.been.called.exactly(2)
        callback.should.have.been.called.exactly(3)
      })

      it('filter: should call the filter option function', () => {
        const filter = chai.spy()
        const af = new AutocompleteFeed({ filter })

        af.items(['a'])
        af.filter('a', () => {})

        filter.should.have.been.called.exactly(1)
        filter.should.have.been.called.with(['a'], 'a')
      })

      it('filter: should sort and filter results by default', () => {
        const af = new AutocompleteFeed()
        const callback = chai.spy()

        af.items(['ba', 'b', 'a', 'c', 'd', 'ab', 'a'])
        af.filter('a', callback)

        callback.should.have.been.called.exactly(1)
        callback.should.have.been.called.with(['a', 'a', 'ab', 'ba'], [])
      })

      it('filter: should return other results when using a function', () => {
        const af = new AutocompleteFeed({
          showOtherResults: true
        })

        const itemsArr = ['ba', 'b', 'a', 'd', 'c', 'ab', 'a']

        const callback = chai.spy()
        function items (term, cb) {
          cb(itemsArr)
        }

        af.items(items)
        af.filter('a', callback)

        callback.should.have.been.called.exactly(1)
        callback.should.have.been.called.with(['a', 'a', 'ab', 'ba'], ['b', 'c', 'd'])
      })

      it('filter: should sort items in the correct order', () => {
        const af = new AutocompleteFeed()

        af.items(['ab', 'ba', 'aab', 'bba'])
        const callback = chai.spy()

        af.filter('a', callback)
        callback.should.have.been.called.with(['aab', 'ab', 'ba', 'bba'], [])

        af.filter('b', callback)
        callback.should.have.been.called.with(['ba', 'bba', 'ab', 'aab'], [])
      })

      it('filter: should return other results when using an array', () => {
        const af = new AutocompleteFeed({
          showOtherResults: true
        })

        const callback = chai.spy()

        af.items(['ba', 'b', 'a', 'd', 'c', 'ab', 'a'])
        af.filter('a', callback)

        callback.should.have.been.called.exactly(1)
        callback.should.have.been.called.with(['a', 'a', 'ab', 'ba'], ['b', 'c', 'd'])
      })

      it('filter: should return the entire itemsset when the term is ""', () => {
        const af = new AutocompleteFeed()

        const itemsArr = ['ba', 'b', 'a', 'd', 'c', 'ab', 'a']
        const callback = chai.spy()

        af.items(itemsArr)
        af.filter('', callback)

        callback.should.have.been.called.exactly(1)
        callback.should.have.been.called.with(itemsArr, [])
      })

      it('filter: should trim trailing spaces when no values are returned', () => {
        const af = new AutocompleteFeed({
          trimTrailingSpaces: true
        })

        const callback = chai.spy()
        function items (term, cb) {
          if (term.lastIndexOf(' ') === (term.length - 1)) {
            cb([])
          } else {
            cb(['a', 'aa', 'b', 'ba'])
          }
        }

        af.items(items)
        af.filter('a ', callback)

        callback.should.have.been.called.exactly(1)
        callback.should.have.been.called.with(['a', 'aa', 'ba'], [])
      })

      it('filter: should not trim trailing spaces if a value is returned', () => {
        const af = new AutocompleteFeed({
          trimTrailingSpaces: true
        })

        const callback = chai.spy()
        function items (term, cb) {
          cb(['a', 'a a', 'aa', 'b', 'ba'])
        }

        af.items(items)
        af.filter('a ', callback)

        callback.should.have.been.called.exactly(1)
        callback.should.have.been.called.with(['a a'], [])
      })

      it('filter: should use the valueLookup correctly', () => {
        function valueLookup (val) {
          return val.text
        }

        const af = new AutocompleteFeed({
          valueLookup
        })
        const aObj = {text: 'a'}
        const bObj = {text: 'b'}
        const cObj = {text: 'ca'}

        const callback = chai.spy()

        af.items([aObj, bObj, cObj])
        af.filter('a', callback)

        callback.should.have.been.called.exactly(1)
        callback.should.have.been.called.with([aObj, cObj])
      })

      it('filter: should sort disabled items correctly', () => {
        function valueLookup (val) {
          return val.text
        }

        const af = new AutocompleteFeed({
          valueLookup
        })
        const aObj = {text: 'a', disabled: false}
        const bObj = {text: 'ab', disabled: true}
        const cObj = {text: 'ac', disabled: false}

        const callback = chai.spy()

        af.items([aObj, bObj, cObj])
        af.filter('a', callback)

        callback.should.have.been.called.exactly(1)
        callback.should.have.been.called.with([aObj, cObj, bObj])
      })

      it('filter: should sort disabled other results correctly', () => {
        function valueLookup (val) {
          return val.text
        }

        const af = new AutocompleteFeed({
          valueLookup,
          showOtherResults: true
        })
        const aObj = {text: 'a', disabled: false}
        const bObj = {text: 'ab', disabled: true}
        const cObj = {text: 'ac', disabled: false}
        const dObj = {text: 'abc', disabled: false}

        const callback = chai.spy()

        af.items([aObj, bObj, cObj, dObj])
        af.filter('d', callback)

        callback.should.have.been.called.exactly(1)
        callback.should.have.been.called.with([], [aObj, dObj, cObj, bObj])
      })

      it('filter: should only call back with the last call to filter', () => {
        const clock = installFakeTimers()
        const itemArr = ['abc', 'abb', 'acc']
        const callCheck = chai.spy()

        function items (term, callback) {
          setTimeout(() => {
            callCheck(term)
            callback(itemArr)
          }, 1000 / term.length)
        }

        const af = new AutocompleteFeed()
        af.items(items).should.equal(af)

        const cb = chai.spy()
        af.filter('a', cb)
        af.filter('abc', cb)
        af.filter('ab', cb)

        clock.tick(1000 / 3)
        callCheck.should.have.been.called.exactly(1)
        callCheck.should.have.been.called.with('abc')
        clock.tick(1000 / 2)
        callCheck.should.have.been.called.exactly(2)
        callCheck.should.have.been.called.with('ab')
        clock.tick(1000 / 1)
        callCheck.should.have.been.called.exactly(3)
        callCheck.should.have.been.called.with('a')

        cb.should.have.been.called.exactly(1)
        cb.should.have.been.called.with(['abb', 'abc'])
        clock.restore()
      })

      it('filter: should not cache results when the useCache option is false', () => {
        const af = new AutocompleteFeed({
          useCache: false
        })
        af._.resultsCache.should.be.an.instanceOf(HMap)
        af._.resultsCache.entries().length.should.equal(0)
        af.items(['a', 'b', 'c'])
        af._.resultsCache.entries().length.should.equal(0)
        af.filter('', () => {})
        af._.resultsCache.entries().length.should.equal(0)
        af.filter('a', () => {})
        af._.resultsCache.entries().length.should.equal(0)
        af.filter('b', () => {})
        af._.resultsCache.entries().length.should.equal(0)
      })

      it('filter: should use the cache before attempting to get new data', () => {
        const af = new AutocompleteFeed()
        const callback = chai.spy()
        af.items(['a', 'b', 'c'])
        af._.resultsCache.should.be.an.instanceOf(HMap)
        af._.resultsCache.entries().length.should.equal(0)
        chai.spy.on(af._.resultsCache, 'has')
        chai.spy.on(af._.resultsCache, 'get')
        chai.spy.on(af._.resultsCache, 'set')

        af.filter('a', callback)
        af._.resultsCache.has.should.have.been.called.with('a')
        af._.resultsCache.has.should.have.been.called.exactly(1)
        af._.resultsCache.set.should.have.been.called.with('a', {
          results: ['a'],
          otherResults: []
        })
        af._.resultsCache.entries().length.should.equal(1)
        callback.should.have.been.called.with(['a'], [])

        af.filter('a', callback)
        af._.resultsCache.has.should.have.been.called.with('a')
        af._.resultsCache.has.should.have.been.called.exactly(2)
        af._.resultsCache.get.should.have.been.called.with('a')
        af._.resultsCache.get.should.have.been.called.exactly(1)
        callback.should.have.been.called.with(['a'], [])
        callback.should.have.been.called.exactly(2)
      })

      it('filter: should use the cache before attempting to get new data using a function', () => {
        const af = new AutocompleteFeed()
        const items = chai.spy((term, cb) => cb(['a', 'b', 'c'], ['d']))

        const callback = chai.spy()

        af.items(items)
        af._.resultsCache.should.be.an.instanceOf(HMap)
        af._.resultsCache.entries().length.should.equal(0)
        chai.spy.on(af._.resultsCache, 'has')
        chai.spy.on(af._.resultsCache, 'get')
        chai.spy.on(af._.resultsCache, 'set')

        af.filter('a', callback)
        af._.resultsCache.has.should.have.been.called.with('a')
        af._.resultsCache.has.should.have.been.called.exactly(1)
        af._.resultsCache.set.should.have.been.called.with('a', {
          results: ['a'],
          otherResults: []
        })
        af._.resultsCache.entries().length.should.equal(1)
        callback.should.have.been.called.with(['a'], [])
        items.should.have.been.called.exactly(1)

        af.filter('a', callback)
        af._.resultsCache.has.should.have.been.called.with('a')
        af._.resultsCache.has.should.have.been.called.exactly(2)
        af._.resultsCache.get.should.have.been.called.with('a')
        af._.resultsCache.get.should.have.been.called.exactly(1)
        callback.should.have.been.called.with(['a'], [])
        callback.should.have.been.called.exactly(2)
        items.should.have.been.called.exactly(1)
      })

      it('filter: should use the cache before attempting to get new data when using external matching', () => {
        const af = new AutocompleteFeed({
          matchType: 'external'
        })

        const items = chai.spy((term, cb) => cb(['a', 'b', 'c'], ['d']))
        const callback = chai.spy()

        af.items(items)
        af._.resultsCache.should.be.an.instanceOf(HMap)
        af._.resultsCache.entries().length.should.equal(0)
        chai.spy.on(af._.resultsCache, 'has')
        chai.spy.on(af._.resultsCache, 'get')
        chai.spy.on(af._.resultsCache, 'set')

        af.filter('a', callback)
        af._.resultsCache.has.should.have.been.called.with('a')
        af._.resultsCache.has.should.have.been.called.exactly(1)
        af._.resultsCache.set.should.have.been.called.with('a', {
          results: ['a', 'b', 'c'],
          otherResults: ['d']
        })
        af._.resultsCache.entries().length.should.equal(1)
        callback.should.have.been.called.with(['a', 'b', 'c'], ['d'])
        items.should.have.been.called.exactly(1)

        af.filter('a', callback)
        af._.resultsCache.has.should.have.been.called.with('a')
        af._.resultsCache.has.should.have.been.called.exactly(2)
        af._.resultsCache.get.should.have.been.called.with('a')
        af._.resultsCache.get.should.have.been.called.exactly(1)
        callback.should.have.been.called.with(['a', 'b', 'c'], ['d'])
        callback.should.have.been.called.exactly(2)
        items.should.have.been.called.exactly(1)
      })
    })
  })
}
