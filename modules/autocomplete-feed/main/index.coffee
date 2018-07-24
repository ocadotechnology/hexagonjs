sortItems = (valueLookup) ->
  valueLookup ?= hx.identity
  (a, b) -> hx.sort.compare(valueLookup(a), valueLookup(b))

trimTrailingSpaces = (term) ->
  newTerm = term
  while newTerm.lastIndexOf(' ') is newTerm.length - 1
    newTerm = newTerm.slice(0, newTerm.length - 1)
  newTerm

sortActive = (items) ->
  groupedActive = new hx._.Map(hx.groupBy(items, (i) -> not i.disabled))
  active = groupedActive.get(true) || []
  inactive = groupedActive.get(false) || []
  { active, inactive }

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

    resolvedOptions = hx.merge.defined defaults, options

    # defined here so we can use the resolved options
    resolvedOptions.filter ?= (items, term) ->
      filtered = hx.filter[resolvedOptions.matchType](items, term, resolvedOptions.filterOptions)
      { active, inactive } = sortActive(filtered)
      [active..., inactive...]

    @_ =
      options: resolvedOptions
      resultsCache: new hx._.Map


  clearCache: ->
    @_.resultsCache = new hx._.Map
    this

  filter: (term = '', callback) ->
    _ = @_
    thisFilter = term + hx.randomId()
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
    else if _.options.matchType is 'external' and hx.isFunction(_.items)
      # The matching is external so we don't filter here
      _.items(term, cacheItemsThenCallback)
    else
      filterAndCallback = (unfilteredItems) ->
        filteredItems = _.options.filter(unfilteredItems, term)
        if _.options.showOtherResults
          unpartitioned = unfilteredItems.filter (datum) ->
              filteredItems.indexOf(datum) is -1
            .sort sortItems(_.options.valueLookup)

          { active, inactive } = sortActive(unpartitioned)
          otherResults = [active..., inactive...]

        cacheItemsThenCallback(filteredItems, otherResults)

      if hx.isFunction(_.items)
        # Call the function then apply filtering
        _.items(term, filterAndCallback)
      else if term.length
        # Apply filtering to the static object
        filterAndCallback(_.items)
      else
        # Skip filtering and return the entire itemsset
        cacheItemsThenCallback(_.items)

  validateItems: (items) -> hx.isArray(items) or hx.isFunction(items)

  items: (items) ->
    # Validation should be external to the feed and show relevant error message(s)
    if arguments.length
      @_.items = items
      this
    else
      @_.items


hx.AutocompleteFeed = AutocompleteFeed
