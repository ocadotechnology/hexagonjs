
import { select, span, button, i } from 'utils/selection'
import { isObject, mergeDefined, isFunction } from 'utils/utils'
import { EventEmitter } from 'utils/event-emitter'
import { userFacingText } from 'utils/user-facing-text'

import { Menu } from 'components/menu'

userFacingText({
  picker: {
    chooseValue: 'Choose a value...'
  }
})

setValue = (picker, value, items, cause = 'api') ->
  newVal = undefined
  for item in items
    if item is value or (isObject(item) and (item.value is value or item.value is value?.value))
      newVal = item
      break

  if newVal?
    picker._.selectedText.set(picker._.renderer(newVal))
  else
    picker._.selectedText.text(picker._.options.noValueText)

  if picker._.current isnt newVal
    picker._.current = newVal
    picker.emit 'change', {
      value: newVal
      cause: cause
    }

export class Picker extends EventEmitter
  constructor: (selector, options = {}) ->
    super()

    resolvedOptions = mergeDefined({
      dropdownOptions: {},
      items: [],
      noValueText: userFacingText('picker', 'chooseValue'),
      renderer: undefined,
      value: undefined,
      disabled: false,
      fullWidth: false
    }, options)

    selectedText = span('hx-picker-text')

    @selection = select(selector)
      .classed('hx-picker hx-btn', true)
      .classed('hx-picker-full-width', resolvedOptions.fullWidth)
      .add(span('hx-picker-inner').attr('type', 'button')
        .add(selectedText)
        .add(span('hx-picker-icon').add(i('hx-icon hx-icon-caret-down'))))
      .api('picker', this)
      .api(this)

    menu = new Menu(selector, {
      dropdownOptions: resolvedOptions.dropdownOptions
      items: resolvedOptions.items
      disabled: resolvedOptions.disabled
    })

    menu.pipe(this, '', ['highlight'])
    menu.dropdown.pipe(this, 'dropdown')
    menu.on 'change', 'hx.picker', (item) =>
      if item?.content?
        setValue(this, item.content, @items(), 'user')
        menu.hide()

    @_ =
      menu: menu
      options: resolvedOptions
      renderer: resolvedOptions.renderer
      selectedText: selectedText
      current: undefined

    if not resolvedOptions.renderer?
      @renderer(menu.renderer())

    menu.renderer((item) => @renderer()(item))

    if resolvedOptions.items?
      @items resolvedOptions.items

    if resolvedOptions.value?
      @value resolvedOptions.value

    if not @_.current? and resolvedOptions.noValueText?
      selectedText.text resolvedOptions.noValueText

  renderer: (f) ->
    if f?
      @_.renderer = f
      this
    else
      @_.renderer


  items: (items) ->
    if items?
      @_.items = items
      @_.menu.items(items)
      @value(@_.current)
      this
    else
      @_.items

  value: (value) ->
    if arguments.length > 0
      if isFunction(@items())
        loading = @selection.prepend('span')
        loading.append('i').class('hx-menu-loading hx-icon hx-icon-spin hx-icon-spinner')
        @items() (data) =>
          loading.remove()
          setValue(this, value, data)
      else
        setValue(this, value, @items())
      this
    else
      @_.current

  disabled: (disable) ->
    menuDisable = @_.menu.disabled(disable)
    # menu.disabled returns the wrong 'this' so we return the correct things below
    if disable? then this
    else menuDisable



export picker = (options) ->
  # XXX [2.0.0] added options.class
  selection = button(options.class)
  new Picker(selection, options)
  selection
