sortItems = (valueLookup) ->
  valueLookup ?= hx.identity
  (a, b) ->
    if not a.disabled and b.disabled then -1
    else if a.disabled and not b.disabled then 1
    else hx.sort.compare(valueLookup(a), valueLookup(b))

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
      hx.filter[resolvedOptions.matchType](items, term, resolvedOptions.filterOptions)
        .sort sortItems(resolvedOptions.valueLookup)

    @_ =
      options: resolvedOptions
      resultsCache: new hx.Map


  clearCache: -> @_.resultsCache = new hx.Map

  filter: (term = '', callback) ->
    _ = @_

    cacheitemsAndCallback = (results, otherResults = []) =>
      if _.options.trimTrailingSpaces and results.length is 0 and term.lastIndexOf(' ') is term.length - 1
        # The term has trailing spaces and no results were found
        @filter(trimTrailingSpaces(term), callback)
      else
        # Cache the currently searched term items
        _.resultsCache.set(term, {
          results: results,
          otherResults: otherResults
        })
        callback(results, otherResults)

    if _.options.matchType is 'external' and hx.isFunction(_.items)
      # The matching is external so we don't filter here
      _.items(term, cacheitemsAndCallback)
    else
      if _.resultsCache.has(term)
        # Use the cached items if it exists
        cacheditems = _.resultsCache.get(term)
        callback(cacheditems.results, cacheditems.otherResults)
      else
        filterAndCallback = (unfilteredItems) ->
          filteredItems = _.options.filter(unfilteredItems, term)
          if _.options.showOtherResults
            otherResults = unfilteredItems.filter (datum) ->
                filteredItems.indexOf(datum) is -1
              .sort sortItems(_.options.valueLookup)

          cacheitemsAndCallback(filteredItems, otherResults)

        if hx.isFunction(_.items)
          # Call the function then apply filtering
          _.items(term, filterAndCallback)
        else if term.length
          # Apply filtering to the static object
          filterAndCallback(_.items)
        else
          # Skip filtering and return the entire itemsset
          cacheitemsAndCallback(_.items)

  validateItems: (items) -> (hx.isArray(items) and items.length > 0) or hx.isFunction(items)

  items: (items) ->
    # Validation should be external to the feed and show relevant error message(s)
    if arguments.length
      @_.items = items
      this
    else
      @_.items


hx.AutocompleteFeed = AutocompleteFeed