hx.userFacingText({
  autocomplete:
    chooseValue: 'Choose a value...'
    loading: 'Loading...'
    noResults: 'No Results Found'
    otherResults: 'Other Results'
})

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
        filterAndCallback = (unfiltereditems) ->
          filtereditems = _.options.filter(unfiltereditems, term)
          if _.options.showOtherResults
            otherResults = unfiltereditems.filter (datum) ->
                filtereditems.indexOf(datum) is -1
              .sort sortItems(_.options.valueLookup)

          cacheitemsAndCallback(filtereditems, otherResults)

        if hx.isFunction(_.items)
          # Call the function then apply filtering
          _.items(term, filterAndCallback)
        else if term.length
          # Apply filtering to the static object
          filterAndCallback(_.items)
        else
          # Skip filtering and return the entire itemsset
          cacheitemsAndCallback(_.items)

  isValiditems: (items) -> (hx.isArray(items) and items.length > 0) or hx.isFunction(items)

  items: (items) ->
    # Validation should be external to the feed and show relevant error message(s)
    if arguments.length
      @_.items = items
      this
    else
      @_.items





validateItems = (feed, items) ->
  if not feed.isValiditems(items)
    hx.consoleWarning "hx.AutocompletePicker: the items was expected to be an array of items or a function, you supplied: #{items}"
    false
  else
    true

setPickerValue = (picker, results) ->
  _ = picker._
  _.valueText.clear()
  if results.length
    _.current = results[0]
    _.renderer _.valueText.node(), results[0]
  else
    _.valueText.text(_.options.chooseValueText)

class AutocompletePicker extends hx.EventEmitter
  constructor: (selector, items, options) ->
    super()

    hx.component.register(selector, this)

    defaults =
      filter: undefined
      filterOptions: undefined
      matchType: undefined
      valueLookup: undefined
      trimTrailingSpaces: undefined
      showOtherResults: undefined

      buttonClass: undefined
      renderer: undefined
      value: undefined

      chooseValueText: hx.userFacingText('autocomplete', 'chooseValue')
      loadingText: hx.userFacingText('autocomplete', 'loading')
      noResultsText: hx.userFacingText('autocomplete', 'noResults')
      otherResultsText: hx.userFacingText('autocomplete', 'otherResults')

    resolvedOptions = hx.merge defaults, options

    selection = hx.select(selector)
      .classed('hx-autocomplete-picker hx-btn', true)

    if resolvedOptions.buttonClass
      selection.classed(resolvedOptions.buttonClass, true)

    valueText = selection.append('div').class('hx-autocomplete-picker-text')
    selection.append('span').class('hx-autocomplete-picker-icon')
      .append('i').class('hx-icon hx-icon-caret-down')

    feedOptions =
      valueLookup: resolvedOptions.valueLookup
      matchType: resolvedOptions.matchType
      filter: resolvedOptions.filter
      filterOptions: resolvedOptions.filterOptions

    feed = new AutocompleteFeed(feedOptions)

    @_ =
      options: resolvedOptions
      valueText: valueText
      feed: feed
      valueLookup: resolvedOptions.valueLookup or hx.identity

    if validateItems(feed, items)
      feed.items(items)

      renderWrapper = (element, item) =>
        selection = hx.select(element)
          .clear()
          .classed('hx-autocomplete-picker-heading', item.heading)
        if item.unselectable or item.heading
          hx.select(element)
            .text(item.text)
            .off()
        else
          @_.renderer(element, item)

      menu = new hx.Menu(selector, {
        dropdownOptions:
          ddClass: 'hx-autocomplete-picker-dropdown'
      })

      @_.renderer = resolvedOptions.renderer or menu.renderer()
      menu.renderer(renderWrapper)

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
        feed.filter term, (results, otherResults) ->
          if results.length is 0
            results.push(noResultsItem)
          if otherResults.length > 0
            otherResults.unshift(otherResultsItem)
          renderMenu(results.concat(otherResults))

      setValue = (item) =>
        setPickerValue(this, [item])
        menu.hide()

      input = hx.detached('input')
        .on 'input', (e) -> populateMenu(e.target.value)
        .on 'keydown', (e) ->
          if input.value().length
            if (e.which or e.keyCode) is 13 and menu.cursorPos is -1
              setValue(menu.items()[0])

      menu.dropdown.on 'showstart', ->
        menu.dropdown._.dropdown.prepend(input)
        populateMenu(input.value())

      menu.dropdown.on 'showend', ->
        input.node().focus()

      menu.on 'change', (item) =>
        if item?.content?
          setValue(item.content)

      if resolvedOptions.value
        @value(resolvedOptions.value)
      else
        valueText.text(resolvedOptions.chooseValueText)


  clearCache: -> @_.feed.clearCache()

  hide: -> @_.menu.hide()

  disabled: (disable) ->
    menuDisable = @_.menu.disabled(disable)
    # menu.disabled returns the wrong 'this' so we return the correct things below
    if disable? then this
    else menuDisable

  items: (items) ->
    if arguments.length
      if validateItems(@_.feed, items)
        @_.feed.items(items)
        @value(@_.current)
      this
    else
      @_.feed.items()

  value: (value) ->
    _ = @_
    if arguments.length
      _.valueText.text(_.options.loadingText)
      _.feed.filter _.valueLookup(value), (results) =>
        setPickerValue(this, results)
      this
    else
      _.current

  renderer: (f) ->
    if f?
      @_.renderer = f
      this
    else
      @_.renderer


hx.autocompletePicker = (items, options) ->
  selection = hx.detached('div')
  new AutocompletePicker(selection.node(), items, options)
  selection

hx.AutocompletePicker = AutocompletePicker

hx._.AutocompleteFeed = AutocompleteFeed