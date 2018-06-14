class Toggle extends hx.EventEmitter
  constructor: (selector, options) ->
    super

    hx.component.register(selector, this)

    @options = hx.merge.defined {
      value: false,
      disabled: false
    }, options

    @selection = hx.select(selector).classed('hx-toggle', true)

    @toggle = @selection.append('div').class('hx-toggle-box')

    @value(@options.value)

    @disabled(@options.disabled)

    @selection.on 'click', 'hx.toggle', (e) =>
      if (!@disabled())
        @value(!@value())
        @emit 'change', @value()

  value: (val) ->
    if val?
      @options.value = val
      @toggle.classed('hx-toggle-box-on', val)
      this
    else
      @options.value

  disabled: (val) ->
    if val?
      @options.disabled = val
      @toggle.classed('hx-toggle-disabled', val)
      this
    else
      @options.disabled

hx.toggle = (options) ->
  selection = hx.detached('div')
  new Toggle(selection.node(), options)
  selection

hx.Toggle = Toggle
