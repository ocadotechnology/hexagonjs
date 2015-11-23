class ButtonGroup extends hx.EventEmitter
  constructor: (selector, options) ->
    super
    self = this

    hx.component.register(selector, this)

    @options = hx.merge.defined({
      buttonClass: 'hx-complement'
      activeClass: 'hx-contrast'
      fullWidth: false
      renderer: (node, data, current) ->
        hx.select(node).text(if data.value? then data.value else data)
        return
      items: []
      disabled: false
    }, options)

    @current = undefined

    group = hx.select(selector)
      .classed('hx-button-group', true)
      .append('div')
        .class('hx-input-group')
        .classed('hx-input-group-full-width', @options.fullWidth)

    @view = group.view('button')
      .enter ->
        @append('button').class('hx-btn ' + self.options.buttonClass)
          .classed('hx-section hx-no-margin', self.options.fullWidth)
          .node()
      .update (item, node) ->
        buttonClass = if item.activeClass? and item is self.current then item.activeClass
        else if item is self.current then self.options.activeClass
        else self.options.buttonClass

        @classed(self.options.buttonClass, false)
          .classed(self.options.activeClass, false)
          .classed(buttonClass, true)
          .attr('disabled', if self.options.disabled then true else undefined)
          .on 'click', 'hx.button-group', ->
            self.value(item, true)

        self.options.renderer(node, item, item is self.current)
        return

    if @options.items? and @options.items.length > 0
      @items @options.items

  renderer: (f) ->
    if f?
      @options.renderer = f
      this
    else
      @options.renderer

  items: (items) ->
    if items?
      @options.items = items
      @view.apply(@options.items)
      this
    else
      @options.items

  value: (value) ->
    if arguments.length > 0
      for item in @options.items
        if item is value or item.value is value
          @current = item
          @view.apply(@options.items)
          @emit('change', {value: item, cause: if arguments[1] then 'user' else 'api'})
          break
      this
    else
      @current

  disabled: (disabled) ->
    if arguments.length > 0
      @options.disabled = disabled
      @items @items()
      this
    else
      @options.disabled

hx.buttonGroup = (options) ->
  selection = hx.detached('div')
  new ButtonGroup(selection.node(), options)
  selection

hx.ButtonGroup = ButtonGroup