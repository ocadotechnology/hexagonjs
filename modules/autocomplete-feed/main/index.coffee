sort = require('modules/sort/main')
filter = require('modules/filter/main')
utils = require('modules/util/main/utils')
HMap = require('modules/map/main')

sortItems = (valueLookup) ->
  valueLookup ?= utils.identity
  (a, b) -> sort.compare(valueLookup(a), valueLookup(b))

trimTrailingSpaces = (term) ->
  newTerm = term
  while newTerm.lastIndexOf(' ') is newTerm.length - 1
    newTerm = newTerm.slice(0, newTerm.length - 1)
  newTerm

class AutocompleteFeed
  constructor: (options = {}) ->
    self = this

    defaults =
      filter: undefined
      filterOptions: undefined
      matchType: 'contains'
      useCache: true
      showOtherResults: false
      trimTrailingSpaces: false
      valueLookup: undefined

    if options.valueLookup?
      # default searchValue if valueLookup is defined
      defaults.filterOptions =
        searchValues: (datum) -> [self._.options.valueLookup(datum)]

    resolvedOptions = utils.merge.defined defaults, options

    # defined here so we can use the resolved options
    resolvedOptions.filter ?= (items, term) ->
      filtered = filter[resolvedOptions.matchType](items, term, resolvedOptions.filterOptions)

      groupedActive = new HMap(utils.groupBy(filtered, (i) -> not i.disabled))
      res = []
      if groupedActive.get(true)
        res = res.concat(groupedActive.get(true))
      if groupedActive.get(false)
        res = res.concat(groupedActive.get(false))
      res

    @_ =
      options: resolvedOptions
      resultsCache: new HMap


  clearCache: ->
    @_.resultsCache = new HMap
    this

  filter: (term = '', callback) ->
    _ = @_
    thisFilter = term + utils.randomId()
    _.lastFilter = thisFilter

    cacheItemsThenCallback = (results, otherResults = []) =>
      if _.options.trimTrailingSpaces and results.length is 0 and term.lastIndexOf(' ') is term.length - 1
        # The term has trailing spaces and no results were found
        @filter(trimTrailingSpaces(term), callback)
      else
        # Cache the currently searched term items
        if _.options.useCache
          _.resultsCache.set(term, {
            results: results,
            otherResults: otherResults
          })
        # Only call back if this is the filter that was called last
        if thisFilter is _.lastFilter
          callback(results, otherResults)

    if _.options.useCache and _.resultsCache.has(term)
      # Get the result from the cache
      cacheditems = _.resultsCache.get(term)
      callback(cacheditems.results, cacheditems.otherResults)
    else if _.options.matchType is 'external' and utils.isFunction(_.items)
      # The matching is external so we don't filter here
      _.items(term, cacheItemsThenCallback)
    else
      filterAndCallback = (unfilteredItems) ->
        filteredItems = _.options.filter(unfilteredItems, term)
        if _.options.showOtherResults
          unpartitioned = unfilteredItems.filter (datum) ->
              filteredItems.indexOf(datum) is -1
            .sort sortItems(_.options.valueLookup)

          groupedActive = new HMap(utils.groupBy(unpartitioned, (i) -> not i.disabled))
          otherResults = []
          if groupedActive.get(true)
            otherResults = otherResults.concat(groupedActive.get(true))
          if groupedActive.get(false)
            otherResults = otherResults.concat(groupedActive.get(false))

        cacheItemsThenCallback(filteredItems, otherResults)

      if utils.isFunction(_.items)
        # Call the function then apply filtering
        _.items(term, filterAndCallback)
      else if term.length
        # Apply filtering to the static object
        filterAndCallback(_.items)
      else
        # Skip filtering and return the entire itemsset
        cacheItemsThenCallback(_.items)

  validateItems: (items) -> Array.isArray(items) or utils.isFunction(items)

  items: (items) ->
    # Validation should be external to the feed and show relevant error message(s)
    if arguments.length
      @_.items = items
      this
    else
      @_.items


module.exports = AutocompleteFeed
module.exports.hx = {
  AutocompleteFeed: AutocompleteFeed
}
