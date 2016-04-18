hx.userFacingText({
  autocomplete:
    noResults: 'No Results Found'
    otherResults: 'Other Results'
})

sortDisabledData = (inputMap) ->
  inputMap ?= hx.identity
  (a, b) ->
    if not a.disabled and b.disabled then -1
    else if a.disabled and not b.disabled then 1
    else hx.sort.compare(inputMap(a), inputMap(b))

trimTrailingSpaces = (term) ->
  newTerm = term
  while newTerm.lastIndexOf(' ') is newTerm.length - 1
    newTerm = newTerm.slice(0, newTerm.length - 1)
  newTerm

class AutocompleteFeed
  constructor: (options) ->
    self = this

    defaults =
      inputMap: undefined
      matchType: 'contains'
      filter: undefined
      filterOptions: undefined

    if options.inputMap?
      # default searchValue if inputMap is defined
      defaults.filterOptions =
        searchValues: (datum) -> [self.options.inputMap(datum)]

    resolvedOptions = hx.merge defaults, options

    resolvedOptions.filter ?= (data, term) ->
      hx.filter[resolvedOptions.matchType](data, term, resolvedOptions.filterOptions)
        .sort sortDisabledData(resolvedOptions.inputMap)

    @_ =
      options: resolvedOptions
      resultsCache: new hx.Map


  clearCache: -> @_.resultsCache = new hx.Map

  filterData: (term = '', callback) ->
    _ = @_

    cacheDataAndCallback = (results, otherResults = []) =>
      if _.options.trimTrailingSpaces and results.length is 0 and term.lastIndexOf(' ') is term.length - 1
        # The term has trailing spaces and no results were found
        @filterData(trimTrailingSpaces(term), callback)
      else
        # Cache the currently searched term data
        _.resultsCache.set(term, {
          results: results,
          otherResults: otherResults
        })
        callback(results, otherResults)

    if _.options.matchType is 'external' and hx.isFunction(_.data)
      # The matching is external so we don't filter here
      _.data(term, cacheDataAndCallback)
    else
      cachedData = _.resultsCache.get(term)
      if cachedData?
        # Use the cached data if it exists
        callback(cachedData.results, cachedData.otherResults)
      else
        filterAndCallback = (unfilteredData) ->
          filteredData = _.options.filter(unfilteredData, term)
          if _.options.showOtherResults
            otherResults = unfilteredData.filter (datum) ->
                unfilteredData.indexOf(datum) is -1
              .sort sortDisabledData(_.options.inputMap)

          cacheDataAndCallback(filteredData, otherResults)

        if hx.isFunction(_.data)
          # Call the function then apply filtering
          _.data(term, filterAndCallback)
        else if term.length
          # Apply filtering to the static object
          filterAndCallback(_.data)
        else
          # Skip filtering and return the entire dataset
          cacheDataAndCallback(_.data)

  isValidData: (data) -> hx.isArray(data) or hx.isFunction(data)

  data: (data) ->
    if arguments.length
      @_.data = data
      this
    else
      @_.data


class AutocompletePicker extends hx.EventEmitter
  constructor: (selector, data, options) ->
    super()

    hx.component.register(selector, this)

    defaults =
      inputMap: undefined
      matchType: undefined
      filter: undefined
      filterOptions: undefined

      noResultsMessage: hx.userFacingText('autocomplete', 'noResults')
      otherResultsMessage: hx.userFacingText('autocomplete', 'otherResults')

    resolvedOptions = hx.merge defaults, options

    feedOptions =
      inputMap: resolvedOptions.inputMap
      matchType: resolvedOptions.matchType
      filter: resolvedOptions.filter
      filterOptions: resolvedOptions.filterOptions

    feed = new AutocompleteFeed(feedOptions)

    if not feed.isValidData(data)
      hx.consoleWarning "hx.AutocompletePicker #{selector}: the data was expected to be an array of items or a function, you supplied: #{data}"
    else
      feed.data(data)


    @_ =
      feed: feed


  clearCache: ->

  hide: ->

  disabled: (disabled) ->
    if arguments.length

    else


  data: (data) ->
    if arguments.length

    else


  value: (value) ->
    if arguments.length

    else

hx.autocompletePicker = (data, options) ->
  selection = hx.detached('input')
  new AutoComplete(selection.node(), data, options)
  selection

hx.AutocompletePicker = AutocompletePicker

hx.AutocompletePicker._.AutocompleteFeed = AutocompleteFeed