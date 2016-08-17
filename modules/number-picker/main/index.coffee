checkValue = (numberPicker, context) ->
  value = oldValue = context.value()
  max = numberPicker.max()
  min = numberPicker.min()
  if max isnt undefined then value = Math.min(value, max)
  if min isnt undefined then value = Math.max(value, min)
  if value isnt oldValue then context.value(value)

addHoldHandler = (incrementOnHold, incrementDelay, selection, incrementFn) ->
  if incrementOnHold
    holdStart = undefined
    holdTimeout = undefined
    incrementInterval = undefined

    clearTimers = ->
      clearTimeout(holdTimeout)
      clearInterval(incrementInterval)

    selection.on 'pointerdown', 'hx.number-picker', (e) ->
      holdStart = Date.now()
      document.activeElement.blur()
      e.event.preventDefault()
      fn = ->
        incrementInterval = setInterval((-> incrementFn()), incrementDelay)
      holdTimeout = setTimeout(fn, 200)

    selection.on 'pointerup', 'hx.number-picker', ->
      clearTimers()
      if (Date.now() - holdStart) < 200
        incrementFn()

    selection.on 'pointerleave', 'hx.number-picker', clearTimers
  else
    selection.on 'click', 'hx.number-picker', -> incrementFn()


class NumberPicker extends hx.EventEmitter
  constructor: (@selector, options) ->
    super

    hx.component.register(@selector, this)

    @options = hx.merge.defined({
      buttonClass: ''
      min: undefined
      max: undefined
      disabled: false
      value: 0
      incrementOnHold: true
      incrementDelay: 50
    }, options)

    @_ = {}

    container = hx.select(@selector)
    selection = container.class('hx-number-picker')

    incrementButton = selection.append('button').attr('type', 'button').class('hx-number-picker-increment hx-btn ' + @options.buttonClass)
    incrementButton.append('i').class('hx-icon hx-icon-chevron-up')
    addHoldHandler(@options.incrementOnHold, @options.incrementDelay, incrementButton, => @increment())

    @selectInput = selection.append('input')
    @selectInput.attr('type', 'number')
    @selectInput.on 'blur', 'hx.number-picker', =>
      @emit 'input-change', {value: @value()}
      @value(undefined, @selectInput.value())

    decrementButton = selection.append('button').attr('type', 'button').class('hx-number-picker-decrement hx-btn ' + @options.buttonClass)
    decrementButton.append('i').class('hx-icon hx-icon-chevron-down')
    addHoldHandler(@options.incrementOnHold, @options.incrementDelay, decrementButton, => @decrement())

    if @options.max isnt undefined then @max @options.max
    if @options.min isnt undefined then @min @options.min
    if @options.disabled then @disabled(@options.disabled)

    @selectInput
      .attr('data-value', @options.value)
      .value(@options.value)

  value: (value, screenValue) ->
    if arguments.length > 0
      prevValue = @value()
      newVal = if not value? and screenValue then screenValue else value

      if @_.max isnt undefined and newVal > @_.max then newVal = @_.max
      if @_.min isnt undefined and newVal < @_.min then newVal = @_.min

      @selectInput
        .attr('type', 'text')
        .attr('data-value', newVal)
        .attr('readonly', if screenValue and isNaN(screenValue) then 'readonly' else undefined)
        .value(screenValue or newVal)

      if prevValue isnt value
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
    unless @options.disabled
      prevValue = @value()
      @value(@value() + 1)
      if prevValue isnt @value()
        @emit 'increment'
    this

  decrement: ->
    unless @options.disabled
      prevValue = @value()
      @value(@value() - 1)
      if prevValue isnt @value()
        @emit 'decrement'
    this

  disabled: (disable) ->
    if disable?
      @options.disabled = disable
      dis = if disable then 'disabled' else undefined
      hx.select(@selector).selectAll('button').forEach (e) -> e.attr('disabled', dis)
      @selectInput.attr('disabled', dis)
      this
    else
      @options.disabled

hx.numberPicker = (options) ->
  selection = hx.detached('div')
  new NumberPicker(selection.node(), options)
  selection

hx.NumberPicker = NumberPicker
