select = require('modules/selection/main')
component = require('modules/component/main')
utils = require('modules/util/main/utils')
select = require('modules/selection/main')
EventEmitter = require('modules/event-emitter/main')
Menu = require('modules/menu/main').Menu
userFacingText = require('modules/user-facing-text/main')

userFacingText({
  picker: {
    chooseValue: 'Choose a value...'
  }
})

setValue = (picker, value, items, cause = 'api') ->
  newVal = undefined
  for item in items
    if item is value or (utils.isObject(item) and (item.value is value or item.value is value?.value))
      newVal = item
      break

  if newVal?
    picker._.renderer(picker._.selectedText.node(), newVal)
  else
    picker._.selectedText.text(picker._.options.noValueText)

  if picker._.current isnt newVal
    picker._.current = newVal
    picker.emit 'change', {
      value: newVal
      cause: cause
    }

class Picker extends EventEmitter
  constructor: (selector, options = {}) ->
    super

    resolvedOptions = utils.merge.defined {
      dropdownOptions: {}
      items: []
      noValueText: userFacingText('picker', 'chooseValue')
      renderer: undefined
      value: undefined
      disabled: false
      fullWidth: false
    }, options

    component.register(selector, this)

    @selection = select(selector)

    @selection.classed('hx-picker-full-width', resolvedOptions.fullWidth)

    button = @selection.classed('hx-picker hx-btn', true).append('span').class('hx-picker-inner').attr('type', 'button')
    selectedText = button.append('span').class('hx-picker-text')
    button.append('span').class('hx-picker-icon').append('i').class('hx-icon hx-icon-caret-down')

    renderWrapper = (node, item) => @_.renderer(node, item)

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
      @renderer menu.renderer()

    menu.renderer(renderWrapper)

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
      if utils.isFunction(@items())
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



picker = (options) ->
  selection = select.detached('button')
  new Picker(selection.node(), options)
  selection

module.exports = picker
module.exports.Picker = Picker

module.exports.hx = {
  Picker: Picker,
  picker: picker
}
