setValue = (picker, value, items) ->
  newVal = undefined
  for item in items
    if item is value or (hx.isObject(item) and (item.value is value or item.value is value?.value))
      newVal = item
      break

  if newVal?
    picker.options.renderer(picker.selectedText.node(), newVal)
  else
    picker.selectedText.text(picker.options.noValueText)

  if picker.current isnt newVal
    picker.current = newVal
    picker.emit 'change', {
      value: newVal
      cause: 'api'
    }

class Picker extends hx.EventEmitter
  constructor: (selector, options = {}) ->
    super

    @options = hx.merge.defined {
      dropdownOptions: {}
      items: []
      noValueText: 'Choose a value...'
      renderer: undefined
      value: undefined
      disabled: false
    }, options

    hx.component.register(selector, this)

    @selection = hx.select(selector)

    @current = undefined
    button = @selection.classed('hx-picker', true).append('span').class('hx-picker-inner').attr('type', 'button')
    @selectedText = button.append('span').class('hx-picker-text')
    button.append('span').class('hx-picker-icon').append('i').class('hx-icon hx-icon-caret-down')

    @menu = new hx.Menu(selector, {
      dropdownOptions: @options.dropdownOptions
      items: @options.items
      renderer: @options.renderer
      disabled: @options.disabled
    })

    @menu.on 'change', 'hx.picker', (item) =>
      if item?.content?
        @current = item.content
        @selectedText.text(@current.text or @current)
        @menu.hide()
        @emit 'change', {
          value: @current
          cause: 'user'
        }

    if not @options.renderer?
      @options.renderer = @menu.renderer()

    if @options.value?
      @value(@options.value)

    if not @current? and @options.noValueText?
      @selectedText.text(@options.noValueText)

    @menu.pipe(this, '', ['highlight'])
    @menu.dropdown.pipe(this, 'dropdown')

  renderer: (f) ->
    if f?
      @options.renderer = f
      @menu.renderer(f)
      this
    else
      @options.renderer


  items: (items) ->
    if items?
      @options.items = items
      @menu.items(items)
      @value(@current)
      this
    else
      @options.items

  value: (value) ->
    if arguments.length > 0
      if hx.isFunction(@items())
        loading = @selection.prepend('span')
        loading.append('i').class('hx-menu-loading hx-icon hx-icon-spin hx-icon-spinner')
        @items() (data) =>
          loading.remove()
          setValue(this, value, data)
      else
        setValue(this, value, @items())
      this
    else
      @current

  disabled: (disable) ->
    menuDisable = @menu.disabled(disable)
    # menu.disabled returns the wrong 'this' so we return the correct things below
    if disable? then this
    else menuDisable


hx.picker = (options) ->
  selection = hx.detached('button')
  new Picker(selection.node(), options)
  selection

hx.Picker = Picker