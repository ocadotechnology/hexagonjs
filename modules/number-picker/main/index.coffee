checkValue = (numberPicker, context) ->
  value = oldValue = context.value()
  max = numberPicker.max()
  min = numberPicker.min()
  if max isnt undefined then value = Math.min(value, max)
  if min isnt undefined then value = Math.max(value, min)
  if value isnt oldValue then context.value(value)

addHoldHandler = (incrementOnHold, incrementDelay, selection, incrementFn) ->
  holdStart = undefined
  holdTimer = undefined
  incrementHold = undefined
  if incrementOnHold
    selection.on 'pointerdown', 'hx.number-picker', ->
      holdStart = Date.now()
      fn = -> incrementHold = setInterval((-> incrementFn()), incrementDelay)
      holdTimer = setTimeout(fn, 200)

    selection.on 'pointerup', 'hx.number-picker', ->
      if Date.now() - holdStart < 200
        incrementFn()
      clearTimeout(holdTimer)
      clearInterval(incrementHold)
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
    select = container.class('hx-number-picker')

    incrementButton = select.append('button').attr('type', 'button').class('hx-btn ' + @options.buttonClass)
    incrementButton.append('i').class('hx-icon hx-icon-chevron-up')

    addHoldHandler(@options.incrementOnHold, @options.incrementDelay, incrementButton, => @increment())

    @selectInput = select.append('input')
    @selectInput.attr('type', 'number')
    @selectInput.on 'blur', 'hx.number-picker', =>
      if not @selectInput.attr('readonly')?
        checkValue(this, @selectInput)
        @selectInput.attr('data-value', @selectInput.value())
      @emit 'input-change', {value: @value()}
      @emit 'change', {value: @value()}

    decrementButton = select.append('button').attr('type', 'button').class('hx-btn ' + @options.buttonClass)
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
    prevValue = @value()
    @value(@value() + 1)
    if prevValue isnt @value()
      @emit 'increment'
    this

  decrement: ->
    prevValue = @value()
    @value(@value() - 1)
    if prevValue isnt @value()
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
