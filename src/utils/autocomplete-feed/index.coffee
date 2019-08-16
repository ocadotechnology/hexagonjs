import { compare } from 'utils/sort'
import * as filter from 'utils/filter'
import {
  identity,
  groupBy,
  randomId,
  mergeDefined,
  isFunction
} from 'utils/utils'
import { Map as HMap } from 'utils/map'

sortItems = (valueLookup = identity) ->
  (a, b) -> compare(valueLookup(a), valueLookup(b))

trimTrailingSpaces = (term) ->
  newTerm = term
  while newTerm.lastIndexOf(' ') is newTerm.length - 1
    newTerm = newTerm.slice(0, newTerm.length - 1)
  newTerm

sortActive = (items) ->
  groupedActive = new HMap(groupBy(items, (i) -> not i.disabled))
  active = groupedActive.get(true) || []
  inactive = groupedActive.get(false) || []
  { active, inactive }

filterNested = (items, term, filterName, filterOptions) ->
  if items.some((item) -> item.children?.length)
    items.reduce((acc, item) ->
      if item.children
        children = filterNested(item.children, term, filterName, filterOptions)
        if children.length
          return [
            ...acc,
            Object.assign({}, item, {
              children,
            })
          ]

      filterSingle = filter[filterName]([item], term, filterOptions)

      return [...acc, ...filterSingle];
    , []);
  else
    filter[filterName](items, term, filterOptions)


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

    resolvedOptions = mergeDefined(defaults, options)

    # defined here so we can use the resolved options
    resolvedOptions.filter ?= (items, term) ->
      filterName = 'filter' + resolvedOptions.matchType[0].toUpperCase() + resolvedOptions.matchType.slice(1)
      filtered = filterNested(items, term, filterName, resolvedOptions.filterOptions)
      { active, inactive } = sortActive(filtered)
      [active..., inactive...]

    @_ =
      options: resolvedOptions
      resultsCache: new HMap


  clearCache: ->
    @_.resultsCache = new HMap
    this

  filter: (term, callback) ->
    _ = @_
    if term is undefined
      callback([])
    else
      term ?= ''
      thisFilter = term + randomId()
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
      else if _.options.matchType is 'external' and isFunction(_.items)
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

        if isFunction(_.items)
          # Call the function then apply filtering
          _.items(term, filterAndCallback)
        else if term.length
          # Apply filtering to the static object
          filterAndCallback(_.items)
        else
          # Skip filtering and return the entire itemsset
          cacheItemsThenCallback(_.items)

  validateItems: (items) -> Array.isArray(items) or isFunction(items)

  items: (items) ->
    # Validation should be external to the feed and show relevant error message(s)
    if arguments.length
      @_.items = items
      this
    else
      @_.items


export {
  AutocompleteFeed
}
