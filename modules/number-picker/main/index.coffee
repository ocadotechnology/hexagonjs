checkValue = (numberPicker, context) ->
  value = oldValue = context.value()
  max = numberPicker.max()
  min = numberPicker.min()
  if max isnt undefined then value = Math.min(value, max)
  if min isnt undefined then value = Math.max(value, min)
  if value isnt oldValue then context.value(value)

class NumberPicker extends hx.EventEmitter
  constructor: (@selector, options) ->
    super

    hx.component.register(@selector, this)

    @options = hx.merge.defined({
      buttonClass: ''
      min: undefined
      max: undefined
      disabled: false,
      value: 0
    }, options)

    @_ = {}

    container = hx.select(@selector)
    select = container.class('hx-number-picker')

    button = select.append('button').attr('type', 'button').class('hx-btn ' + @options.buttonClass)
    button.append('i').class('hx-icon hx-icon-chevron-up')
    button.on 'click', 'hx.number-picker', => @increment()

    @selectInput = select.append('input')
    @selectInput.attr('type', 'number')
    @selectInput.on 'blur', 'hx.number-picker', =>
      if not @selectInput.attr('readonly')?
        checkValue(this, @selectInput)
        @selectInput.attr('data-value', @selectInput.value())
      @emit 'input-change', {value: @value()}
      @emit 'change', {value: @value()}

    button = select.append('button').attr('type', 'button').class('hx-btn ' + @options.buttonClass)
    button.append('i').class('hx-icon hx-icon-chevron-down')
    button.on 'click', 'hx.number-picker', => @decrement()

    if @options.max isnt undefined then @max @options.max
    if @options.min isnt undefined then @min @options.min
    if @options.disabled then @disabled(@options.disabled)

    @selectInput
      .attr('data-value', @options.value)
      .value(@options.value)

  value: (value, screenValue) ->
    if arguments.length > 0
      if @_.max isnt undefined and value > @_.max then value = @_.max
      if @_.min isnt undefined and value < @_.min then value = @_.min
      if screenValue and isNaN(screenValue)
        @selectInput.attr('type', 'text')
          .attr('readonly', '')
      else
        @selectInput.attr('type', 'number')
          .node().removeAttribute('readonly')

      @selectInput.value(screenValue or value)
      @selectInput.attr('data-value', value)

      @emit 'change', {value: value}
      this
    else
      Number(@selectInput.attr('data-value'))

  min: (val) ->
    if arguments.length > 0
      @_.min = val
      @selectInput.attr('min', val)
      checkValue(this, this)
      this
    else
      @_.min

  max: (val) ->
    if arguments.length > 0
      @_.max = val
      @selectInput.attr('max', val)
      checkValue(this, this)
      this
    else
      @_.max

  increment: ->
    @value(@value() + 1)
    @emit 'increment'
    this

  decrement: ->
    @value(@value() - 1)
    @emit 'decrement'
    this

  disabled: (disable) ->
    if disable?
      @options.disabled = disable
      dis = if disable then true else undefined
      hx.select(@selector).selectAll('button').forEach (e) -> e.attr('disabled', dis)
      @selectInput.attr('disabled', dis)
    else
      @options.disabled

hx.numberPicker = (options) ->
  selection = hx.detached('div')
  new NumberPicker(selection.node(), options)
  selection

hx.NumberPicker = NumberPicker
