class ToggleButton extends hx.EventEmitter
  constructor: (selector, options) ->
    super

    hx.component.register(selector, this)
    @selection = hx.select(selector).classed('hx-btn hx-btn-toggle', true)

    @options = hx.merge.defined {
      value: not @selection.classed('hx-btn-toggle-off')
    }, options

    @value(@options.value)

    @selection.on 'click', 'hx.button', =>
      @value(not @options.value)
      @emit 'change', @options.value

  value: (val) ->
    if val?
      @options.value = val
      @selection.classed('hx-btn-toggle-off', not val)
        .attr('data', val)
      this
    else
      @options.value

hx.toggleButton = (options) ->
  selection = hx.detached('div')
  new ToggleButton(selection.node(), options)
  selection

hx.ToggleButton = ToggleButton