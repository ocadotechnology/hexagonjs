class Toggle extends hx.EventEmitter
  constructor: (selector, options) ->
    super

    hx.component.register(selector, this)

    @options = hx.merge.defined {
      value: false
    }, options

    @selection = hx.select(selector).classed('hx-toggle', true)

    @input = @selection.append('input')
      .attr('type', 'checkbox').node()

    @value(@options.value)

    @selection.on 'click', 'hx.toggle', =>
      @value(!@value())
      @emit 'change', @value()

  value: (val) ->
    if val?
      @options.value = val
      @input.checked = val
      this
    else
      @options.value

hx.toggle = (options) ->
  selection = hx.detached('div')
  new Toggle(selection.node(), options)
  selection

hx.Toggle = Toggle