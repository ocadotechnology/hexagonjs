hx.userFacingText({
  autocomplete:
    loading: 'Loading...'
    noResults: 'No Results Found'
    otherResults: 'Other Results'
})

sortDisabledData = (valueLookup) ->
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
      valueLookup: undefined
      matchType: 'contains'
      showOtherResults: false
      trimTrailingSpaces: false

    if options.valueLookup?
      # default searchValue if valueLookup is defined
      defaults.filterOptions =
        searchValues: (datum) -> [self._.options.valueLookup(datum)]

    resolvedOptions = hx.merge.defined defaults, options

    # defined here so we can use the resolved options
    resolvedOptions.filter ?= (data, term) ->
      hx.filter[resolvedOptions.matchType](data, term, resolvedOptions.filterOptions)
        .sort sortDisabledData(resolvedOptions.valueLookup)

    @_ =
      options: resolvedOptions
      resultsCache: new hx.Map


  clearCache: -> @_.resultsCache = new hx.Map

  filterData: (term, callback) ->
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
      if _.resultsCache.has(term)
        # Use the cached data if it exists
        cachedData = _.resultsCache.get(term)
        callback(cachedData.results, cachedData.otherResults)
      else
        filterAndCallback = (unfilteredData) ->
          filteredData = _.options.filter(unfilteredData, term)
          if _.options.showOtherResults
            otherResults = unfilteredData.filter (datum) ->
                filteredData.indexOf(datum) is -1
              .sort sortDisabledData(_.options.valueLookup)

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

  isValidData: (data) -> (hx.isArray(data) and data.length > 0) or hx.isFunction(data)

  data: (data) ->
    # Validation should be external to the feed and show relevant error message(s)
    if arguments.length
      @_.data = data
      this
    else
      @_.data


validateData = (feed, data) ->
  if not feed.isValidData(data)
    hx.consoleWarning "hx.AutocompletePicker: the data was expected to be an array of items or a function, you supplied: #{data}"
    false
  else
    true

class AutocompletePicker extends hx.EventEmitter
  constructor: (selector, data, options) ->
    super()

    hx.component.register(selector, this)

    defaults =
      filter: undefined
      filterOptions: undefined
      matchType: undefined
      valueLookup: undefined
      trimTrailingSpaces: undefined
      showOtherResults: undefined

      value: undefined
      buttonClass: undefined
      renderer: undefined
      loadingText: hx.userFacingText('autocomplete', 'loading')
      noResultsText: hx.userFacingText('autocomplete', 'noResults')
      otherResultsText: hx.userFacingText('autocomplete', 'otherResults')

    resolvedOptions = hx.merge defaults, options

    selection = hx.select(selector)
      .classed('hx-autocomplete-picker hx-btn', true)

    if resolvedOptions.buttonClass
      selection.classed(resolvedOptions.buttonClass, true)

    feedOptions =
      valueLookup: resolvedOptions.valueLookup
      matchType: resolvedOptions.matchType
      filter: resolvedOptions.filter
      filterOptions: resolvedOptions.filterOptions

    feed = new AutocompleteFeed(feedOptions)

    @_ =
      options: resolvedOptions
      feed: feed

    if validateData(feed, data)
      feed.data(data)

      menu = new hx.Menu(selector, {
        renderer: resolvedOptions.renderer
      })

      noResultsItem =
        text: resolvedOptions.noResultsText
        unselectable: true

      loadingItem =
        text: resolvedOptions.loadingText
        unselectable: true

      otherResultsItem =
        text: resolvedOptions.otherResultsText
        heading: true

      renderMenu = (items) ->
        menu.items(items)
        menu.dropdown._.setupDropdown(menu.dropdown._.dropdown.node())

      populateMenu = (term) ->
        renderMenu([loadingItem])
        feed.filterData term, (results, otherResults) ->
          if results.length is 0
            results.push(noResultsItem)
          if otherResults.length > 0
            otherResults.unshift(otherResultsItem)
          renderMenu(results.concat(otherResults))

      input = hx.detached('input').value(resolvedOptions.value)
        .on 'input', (e) -> populateMenu(e.target.value)




      menu.dropdown.on 'showstart', ->
        menu.dropdown._.dropdown.prepend(input)
        populateMenu(input.value())

      menu.dropdown.on 'showend', ->
        input.node().focus()

      @_.renderer = menu?.renderer()


  clearCache: -> @_.feed.clearCache()

  hide: -> @_.menu.hide()

  disabled: (disable) ->
    menuDisable = @_.menu.disabled(disable)
    # menu.disabled returns the wrong 'this' so we return the correct things below
    if disable? then this
    else menuDisable

  data: (data) ->
    if arguments.length
      if validateData(@_.feed, data)
        @_.feed.data(data)
      this
    else
      @_.feed.data()

  value: (value) ->
    if arguments.length

    else

  renderer: (f) ->
    if f?
      @_.renderer = f
      this
    else
      @_.renderer


hx.autocompletePicker = (data, options) ->
  selection = hx.detached('div')
  new AutocompletePicker(selection.node(), data, options)
  selection

hx.AutocompletePicker = AutocompletePicker

hx._.AutocompleteFeed = AutocompleteFeed