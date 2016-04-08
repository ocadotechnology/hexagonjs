setValue = (picker, value, items, cause = 'api') ->
  newVal = undefined
  for item in items
    if item is value or (hx.isObject(item) and (item.value is value or item.value is value?.value))
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

class Picker extends hx.EventEmitter
  constructor: (selector, options = {}) ->
    super

    resolvedOptions = hx.merge.defined {
      dropdownOptions: {}
      items: []
      noValueText: 'Choose a value...'
      renderer: undefined
      value: undefined
      disabled: false
      showAutocomplete: false
      autocompleteLookup: (term, value) ->
        val = (value.value or value.text or value)
        val.toLowerCase().indexOf(term.toLowerCase()) > -1
      autocompleteNoData: 'No Results Found'
    }, options

    hx.component.register(selector, this)

    @selection = hx.select(selector)

    button = @selection.classed('hx-picker hx-btn', true).append('span').class('hx-picker-inner').attr('type', 'button')
    selectedText = button.append('span').class('hx-picker-text')
    button.append('span').class('hx-picker-icon').append('i').class('hx-icon hx-icon-caret-down')

    renderWrapper = (node, item) =>
      if item.unselectable
        hx.select(node).text(item.text)
      else
        @_.renderer(node, item)

    menu = new hx.Menu(selector, {
      dropdownOptions: resolvedOptions.dropdownOptions
      items: resolvedOptions.items
      disabled: resolvedOptions.disabled
      selectedStart: if resolvedOptions.showAutocomplete then 0 else -1
    })

    menu.pipe(this, '', ['highlight'])
    menu.dropdown.pipe(this, 'dropdown')

    if resolvedOptions.showAutocomplete
      autocompleteChange = (event) =>
        value = event.target.value
        filteredItems = if value?.length > 0
          @items().filter (value) ->
            resolvedOptions.autocompleteLookup(event.target.value, value)
        else @items()
        if filteredItems.length is 0
          filteredItems = [{
            unselectable: true
            text: resolvedOptions.autocompleteNoData
          }]
        menu.cursorPos = if value?.length and filteredItems.length then 0 else -1
        menu.items(filteredItems)
        menu.dropdown._.setupDropdown(menu.dropdown._.dropdown.node())
        menuItems = menu.dropdown._.dropdown.selectAll('.hx-menu-item')
          .classed('hx-menu-active', false)
        if menu.cursorPos > -1
          hx.select menuItems.node(menu.cursorPos)
            .classed('hx-menu-active', true)

      debouncedAutocompleteChange = hx.debounce 200, autocompleteChange

      menu.dropdown.on 'showstart', 'hx.picker.autocomplete', ->
        input = hx.detached('input')
          .on 'input', 'hx.picker.autocomplete', debouncedAutocompleteChange
        menu.dropdown._.dropdown.prepend(input)
        input.node().focus()
      menu.dropdown.on 'hideend', 'hx.picker.autocomplete', =>
        menu.items(@items())


    menu.on 'change', 'hx.picker', (item) =>
      if item?.content?
        setValue(this, item.content, @items(), 'user')
        menu.hide()

    menu.on 'hide', => menu.items(@items())

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
      # menuItems = if @_.options.showAutocomplete
      #   [autocompleteItem].concat(items)
      # else
      #   items
      @_.menu.items(items.slice(0))
      @value(@_.current)
      this
    else
      @_.items

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
      @_.current

  disabled: (disable) ->
    menuDisable = @_.menu.disabled(disable)
    # menu.disabled returns the wrong 'this' so we return the correct things below
    if disable? then this
    else menuDisable


hx.picker = (options) ->
  selection = hx.detached('button')
  new Picker(selection.node(), options)
  selection

hx.Picker = Picker