
class InlinePicker extends hx.InlineMorphSection
  enterEditMode = (toggle, content) ->
    @picker.value(@current?.value or @current)
    hx.select(content).select('.hx-confirm').on 'click', 'hx.inline-picker', =>
      @current = @picker.value()
      @textSelection.text(@current.text or @current)
      @emit('change', {api: false, value: @current})
      this.hide()

  exitEditMode = (toggle, content) ->

  constructor: (@selector, options) ->
    # MorphSection registers the component
    options = hx.merge {
      renderer: undefined
      items: []
      contextClass: 'hx-complement'
      ddClass: undefined
      noValueText: undefined
      value: undefined
    }, options

    # currently selected value
    @current = undefined

    selection = hx.select(@selector).classed('hx-inline-picker', true)
    pickerNode = hx.detached('button').class('hx-btn ' +  options.contextClass).node()

    @textSelection = selection.append('a').class('hx-morph-toggle')
    selection.append('div').class('hx-morph-content hx-input-group')
      .add pickerNode
      .add hx.detached('button').class('hx-btn hx-positive hx-confirm').add(hx.detached('i').class('hx-icon hx-icon-check'))

    @picker = new hx.Picker(pickerNode, {
      renderer: options.renderer
      items: options.items
      ddClass: options.ddClass
      noValueText: options.noValueText
    })

    if not options.renderer?
      options.renderer = @picker.renderer()

    @picker.menu.dropdown.on 'showstart', 'hx.inline-picker', =>
      this.detector.addException(@picker.menu.dropdown.dropdown.node())

    super(@selector, enterEditMode, exitEditMode, options)

    if @options.value?
      @value @options.value

  renderer: (f) ->
    if f?
      @options.renderer = f
      @picker.renderer(@options.renderer)
      this
    else
      @options.renderer

  items: (items) ->
    if items?
      @options.items = items
      @picker.items(@options.items)
      this
    else
      @options.items

  value: (value) ->
    if arguments.length > 0
      @picker.value(value)
      @current = @picker.value()
      @textSelection.text(@current.text or @current)
      @emit('change', {api: true, value: @current})
      this
    else
      @current


hx.inlinePicker = (options) ->
  selection = hx.detached('div')
  new InlinePicker(selection.node(), options)
  selection

hx.InlinePicker = InlinePicker
