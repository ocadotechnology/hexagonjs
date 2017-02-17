
class InlinePicker extends hx.InlineMorphSection
  enterEditMode = (toggle, content) ->
    _ = @_
    _.picker.value(_.current?.value or _.current)
    hx.select(content).select('.hx-confirm').on 'click', 'hx.inline-picker', =>
      _.current = _.picker.value()
      _.selectedText.text(_.current.text or _.current)
      @emit('change', {api: false, value: _.current})
      this.hide()

  exitEditMode = (toggle, content) ->

  constructor: (selector, options) ->
    # MorphSection registers the component
    resolvedOptions = hx.merge {
      renderer: undefined
      items: []
      contextClass: 'hx-complement'
      ddClass: undefined
      noValueText: undefined
      value: undefined
    }, options

    selection = hx.select(selector).classed('hx-inline-picker', true)
    pickerNode = hx.detached('button').class('hx-btn ' +  resolvedOptions.contextClass).node()

    selectedText = selection.append('a').class('hx-morph-toggle')
    selection.append('div').class('hx-morph-content hx-input-group')
      .add pickerNode
      .add hx.detached('button').class('hx-btn hx-positive hx-confirm').add(hx.detached('i').class('hx-icon hx-icon-check'))

    picker = new hx.Picker(pickerNode, {
      renderer: resolvedOptions.renderer
      items: resolvedOptions.items
      ddClass: resolvedOptions.ddClass
      noValueText: resolvedOptions.noValueText
    })

    picker._.menu.dropdown.on 'showstart', 'hx.inline-picker', =>
      @detector.addException(picker._.menu.dropdown._.dropdown.node())

    @_ =
      current: undefined
      renderer: resolvedOptions.renderer
      options: resolvedOptions
      picker: picker
      selector: selector
      selectedText: selectedText

    if not @renderer()?
      @renderer picker.renderer()

    super(selector, enterEditMode, exitEditMode, resolvedOptions)

    if resolvedOptions.value?
      @value resolvedOptions.value

  renderer: (f) ->
    if f?
      @_.renderer = f
      @_.picker.renderer(f)
      this
    else
      @_.renderer

  items: (items) ->
    if items?
      @_.items = items
      @_.picker.items(items)
      this
    else
      @_.items

  value: (value) ->
    if arguments.length > 0
      @_.picker.value(value)
      @_.current = @_.picker.value()
      @_.selectedText.text(@_.current.text or @_.current)
      @emit('change', {api: true, value: @_.current})
      this
    else
      @_.current


hx.inlinePicker = (options) ->
  selection = hx.detached('div')
  new InlinePicker(selection.node(), options)
  selection

hx.InlinePicker = InlinePicker
