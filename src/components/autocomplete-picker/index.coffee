import { EventEmitter } from 'utils/event-emitter'
import { userFacingText } from 'utils/user-facing-text'
import { select, div, span, i, detached } from 'utils/selection'
import { merge, identity, debounce } from 'utils/utils'
import logger from 'utils/logger'

import { AutocompleteFeed } from 'utils/autocomplete-feed'
import { MenuBase as Menu } from 'components/menu'

userFacingText({
  autocompletePicker:
    chooseValue: 'Choose a value...'
    loading: 'Loading...'
    noResults: 'No Results Found'
    otherResults: 'Other Results'
})

enterKeyCode = 13
debounceDuration = 200

validateItems = (feed, items) ->
  if not feed.validateItems(items)
    logger.warn("hx.AutocompletePicker: the items was expected to be an array of items or a function, you supplied: #{items}")
    return false
  else
    return true

setPickerValue = (picker, results, cause) ->
  _ = picker._
  _.valueText.clear()
  if results.length
    _.current = results[0]
    picker.emit('change', {
      cause: cause
      value: results[0]
    })
    # XXX Breaking: Renderer
    # _.valueText.set(_.renderer(_.current))
    _.renderer _.valueText.node(), results[0]
  else
    _.current = undefined
    _.valueText.text(_.options.chooseValueText)



class AutocompletePicker extends EventEmitter
  constructor: (selector, items, options = {}) ->
    super()

    defaults =
      # Options passed to the feed - defaults defined there
      filter: undefined
      filterOptions: undefined
      matchType: undefined
      useCache: undefined
      showOtherResults: undefined
      trimTrailingSpaces: undefined
      valueLookup: undefined # Used by the feed and by the `value` method

      # Options used by the picker
      buttonClass: undefined
      disabled: false
      renderer: undefined
      value: undefined
      chooseValueText: userFacingText('autocompletePicker', 'chooseValue')
      loadingText: userFacingText('autocompletePicker', 'loading')
      noResultsText: userFacingText('autocompletePicker', 'noResults')
      otherResultsText: userFacingText('autocompletePicker', 'otherResults')

    if options.valueLookup
      # XXX Breaking: Renderer
      # defaults.renderer = (item) ->
      #   return div().text(options.valueLookup(item))

      defaults.renderer = (element, item) ->
        select(element).text(options.valueLookup(item))

    resolvedOptions = merge(defaults, options)

    selection = select(selector)
      .classed('hx-autocomplete-picker hx-btn', true)

    if resolvedOptions.buttonClass
      selection.classed(resolvedOptions.buttonClass, true)

    valueText = div('hx-autocomplete-picker-text')

    selection
      .add(valueText)
      .add(span('hx-autocomplete-picker-icon')
        .add(i('hx-icon hx-icon-caret-down')))

    feedOptions =
      filter: resolvedOptions.filter
      filterOptions: resolvedOptions.filterOptions
      matchType: resolvedOptions.matchType
      showOtherResults: resolvedOptions.showOtherResults
      trimTrailingSpaces: resolvedOptions.trimTrailingSpaces
      valueLookup: resolvedOptions.valueLookup
      useCache: resolvedOptions.useCache

    feed = new AutocompleteFeed(feedOptions)

    @_ =
      selection: selection
      options: resolvedOptions
      valueText: valueText
      feed: feed
      valueLookup: resolvedOptions.valueLookup or identity

    if not validateItems(feed, items)
      return

    feed.items(items)

    # XXX Breaking: Renderer
    # renderWrapper = (element, item) =>
    #   if item.unselectable or item.heading
    #     return div()
    #       .classed('hx-autocomplete-picker-heading', item.heading)
    #       .text(item.text)
    #   else
    #     return @_.renderer(item)
    #       .classed('hx-autocomplete-picker-heading', item.heading)

    renderWrapper = (element, item) =>
      selection = select(element)
        .clear()
        .classed('hx-autocomplete-picker-heading', item.heading)
      if item.unselectable or item.heading
        selection.text(item.text).off()
      else
        @_.renderer(element, item)

    input = detached('input').class('hx-autocomplete-picker-input')
      .on 'input', (e) ->
          renderMenu([loadingItem])
          debouncedPopulate(e.target.value)
      .on 'keydown', (e) ->
        if input.value().length
          if (e.which or e.keyCode) is enterKeyCode and menu.cursorPos is -1
            topItem = menu.items()[0]
            if not topItem.unselectable
              setValue(topItem)

    menu = new Menu(selector, {
      dropdownOptions: {
        ddClass: 'hx-autocomplete-picker-dropdown'
      },
      extraContent: input
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
      menu.render()

    populateMenu = (term) ->
      feed.filter term, (results, otherResults) ->
        if results.length is 0
          results.push(noResultsItem)
        if otherResults.length > 0
          otherResults = [otherResultsItem].concat(otherResults)
        renderMenu(results.concat(otherResults))

    debouncedPopulate = debounce(debounceDuration, populateMenu)

    setValue = (item) =>
      setPickerValue(this, [item], 'user')
      menu.hide()

    menu.dropdown.on 'showstart', ->
      input.value('')
      renderMenu([loadingItem])
      populateMenu(input.value())
      input.node().focus()

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

    selection
      .api('autocomplete-picker', this)
      .api(this)


  clearCache: ->
    @_.feed.clearCache()
    this

  hide: ->
    @_.menu.hide()
    this

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

  value: (value, callback) ->
    _ = @_
    if arguments.length
      _.valueText.text(_.options.loadingText)
      _.feed.filter _.valueLookup(value), (results) =>
        setPickerValue(this, results, 'api')
        callback?(results[0])
      this
    else
      _.current

  renderer: (f) ->
    if f?
      @_.renderer = f
      this
    else
      @_.renderer


autocompletePicker = (items, options) ->
  selection = div()
  new AutocompletePicker(selection, items, options)
  selection

export {
  autocompletePicker,
  AutocompletePicker
}
