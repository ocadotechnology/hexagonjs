hx.userFacingText({
  autocompletePicker:
    chooseValue: 'Choose a value...'
    loading: 'Loading...'
    noResults: 'No Results Found'
    otherResults: 'Other Results'
})

validateItems = (feed, items) ->
  if not feed.validateItems(items)
    hx.consoleWarning "hx.AutocompletePicker: the items was expected to be an array of items or a function, you supplied: #{items}"
    false
  else
    true

setPickerValue = (picker, results, cause) ->
  _ = picker._
  _.valueText.clear()
  if results.length
    _.current = results[0]
    picker.emit('change', {
      cause: cause
      value: results[0]
    })
    _.renderer _.valueText.node(), results[0]
  else
    _.valueText.text(_.options.chooseValueText)

class AutocompletePicker extends hx.EventEmitter
  constructor: (selector, items, options) ->
    super()

    hx.component.register(selector, this)

    defaults =
      # Options passed to the feed - defaults defined there
      filter: undefined
      filterOptions: undefined
      matchType: undefined
      showOtherResults: undefined
      trimTrailingSpaces: undefined
      valueLookup: undefined

      # Options used by the picker
      buttonClass: undefined
      disabled: false
      renderer: undefined
      value: undefined
      chooseValueText: hx.userFacingText('autocompletePicker', 'chooseValue')
      loadingText: hx.userFacingText('autocompletePicker', 'loading')
      noResultsText: hx.userFacingText('autocompletePicker', 'noResults')
      otherResultsText: hx.userFacingText('autocompletePicker', 'otherResults')

    resolvedOptions = hx.merge defaults, options

    selection = hx.select(selector)
      .classed('hx-autocomplete-picker hx-btn', true)

    if resolvedOptions.buttonClass
      selection.classed(resolvedOptions.buttonClass, true)

    valueText = selection.append('div').class('hx-autocomplete-picker-text')
    selection.append('span').class('hx-autocomplete-picker-icon')
      .append('i').class('hx-icon hx-icon-caret-down')

    feedOptions =
      filter: resolvedOptions.filter
      filterOptions: resolvedOptions.filterOptions
      matchType: resolvedOptions.matchType
      showOtherResults: resolvedOptions.showOtherResults
      trimTrailingSpaces: resolvedOptions.trimTrailingSpaces
      valueLookup: resolvedOptions.valueLookup

    feed = new hx.AutocompleteFeed(feedOptions)

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
      @_.menu = menu
      menu.renderer(renderWrapper)

      noResultsItem =
        text: resolvedOptions.noResultsText
        unselectable: true

      loadingItem =
        text: resolvedOptions.loadingText
        unselectable: true

      otherResultsItem =
        text: resolvedOptions.otherResultsText
        unselectable: true
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
            otherResults = [otherResultsItem].concat(otherResults)
          renderMenu(results.concat(otherResults))

      setValue = (item) =>
        setPickerValue(this, [item], 'user')
        menu.hide()

      input = hx.detached('input').class('hx-autocomplete-picker-input')
        .on 'input', (e) -> populateMenu(e.target.value)
        .on 'keydown', (e) ->
          if input.value().length
            if (e.which or e.keyCode) is 13 and menu.cursorPos is -1
              topItem = menu.items()[0]
              if not topItem.unselectable
                setValue(topItem)

      menu.dropdown.on 'showstart', ->
        input.value('')
        menu.dropdown._.dropdown.prepend(input)
        populateMenu(input.value())

      menu.dropdown.on 'showend', ->
        input.node().focus()

      menu.on 'change', (item) =>
        if item? and item.content?
          setValue(item.content)

      menu.pipe this, '', ['highlight']
      menu.dropdown.pipe this, 'dropdown'

      if resolvedOptions.value
        @value(resolvedOptions.value)
      else
        valueText.text(resolvedOptions.chooseValueText)

      if resolvedOptions.disabled
        @disabled(resolvedOptions.disabled)


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
        setPickerValue(this, results, 'api')
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