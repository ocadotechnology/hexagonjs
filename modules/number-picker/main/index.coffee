import { select, div } from 'selection/main'
import { mergeDefined } from 'utils/main'
import { EventEmitter } from 'event-emitter/main'

checkValue = (value, min, max) ->
  if max isnt undefined then value = Math.min(value, max)
  if min isnt undefined then value = Math.max(value, min)
  value

getDisabled = (disabled, val, edge) -> if disabled or (val is edge) then 'disabled' else undefined

addHoldHandler = (incrementOnHold, incrementDelay, selection, incrementFn) ->
  if incrementOnHold
    holdStart = undefined
    incrementTimeout = undefined

    clearTimers = ->
      clearTimeout(incrementTimeout)
      incrementTimeout = undefined

    selection.on 'pointerdown', 'hx.number-picker', (e) ->
      holdStart = Date.now()
      document.activeElement.blur()
      e.event.preventDefault()
      fn = ->
        incrementFn()
        incrementTimeout = setTimeout(fn, incrementDelay)
      incrementTimeout = setTimeout(fn, 200)

    selection.on 'pointerup', 'hx.number-picker', ->
      clearTimers()
      if (Date.now() - holdStart) < 200
        incrementFn()

    selection.on 'pointerleave', 'hx.number-picker', clearTimers
  else
    selection.on 'click', 'hx.number-picker', incrementFn


export class NumberPicker extends EventEmitter
  constructor: (@selector, options) ->
    super

    @options = mergeDefined({
      buttonClass: ''
      min: undefined
      max: undefined
      disabled: false
      value: 0
      incrementOnHold: true
      incrementDelay: 50
      step: undefined
    }, options)

    @_ = {}

    selection = select(@selector)
      .class('hx-number-picker')
      .api(this)

    incrementButton = selection.append('button').attr('type', 'button').class('hx-number-picker-increment hx-btn ' + @options.buttonClass)
    incrementButton.append('i').class('hx-icon hx-icon-chevron-up')
    addHoldHandler(@options.incrementOnHold, @options.incrementDelay, incrementButton, => @increment())

    @selectInput = selection.append('input')
    @selectInput.attr('type', 'number')
    @selectInput.on 'blur', 'hx.number-picker', =>
      if @selectInput.attr('readonly') is undefined
        @value(undefined, @selectInput.value())
        @emit 'input-change', {value: @value()}

    decrementButton = selection.append('button').attr('type', 'button').class('hx-number-picker-decrement hx-btn ' + @options.buttonClass)
    decrementButton.append('i').class('hx-icon hx-icon-chevron-down')
    addHoldHandler(@options.incrementOnHold, @options.incrementDelay, decrementButton, => @decrement())

    if @options.max isnt undefined then @max @options.max
    if @options.min isnt undefined then @min @options.min
    if @options.step isnt undefined then @step(@options.step)
    if @options.disabled then @disabled(@options.disabled)
    @value @options.value

  value: (value, screenValue) ->
    if arguments.length > 0
      prevValue = @value()

      valueToUse = if not value? and screenValue then Number(screenValue) else value

      newVal = checkValue(valueToUse, @min(), @max())

      @selectInput
        .attr('type', 'text')
        .attr('data-value', newVal)
        .attr('readonly', if screenValue and isNaN(screenValue) then 'readonly' else undefined)
        # If both value and screen value are defined, we set the input text to be the screen value
        # otherwise we use the provided value (as it is set via the input)
        .value(if value? and screenValue? then screenValue else newVal)

      selection = select(@selector)
      selection.select('.hx-number-picker-decrement')
        .attr('disabled', getDisabled(@options.disabled, newVal, @min()))

      selection.select('.hx-number-picker-increment')
        .attr('disabled', getDisabled(@options.disabled, newVal, @max()))

      if prevValue isnt newVal
        @emit 'change', {value: newVal}
      this
    else
      Number(@selectInput.attr('data-value'))

  min: (val) ->
    if arguments.length > 0
      @_.min = val
      @selectInput.attr('min', val)
      @value(@value())
      this
    else
      @_.min

  max: (val) ->
    if arguments.length > 0
      @_.max = val
      @selectInput.attr('max', val)
      @value(@value())
      this
    else
      @_.max

  increment: ->
    unless @options.disabled
      prevValue = @value()
      step = @options.step || 1
      @value(@value() + step)
      if prevValue isnt @value()
        @emit 'increment'
    this

  decrement: ->
    unless @options.disabled
      prevValue = @value()
      step = @options.step || 1
      @value(@value() - step)
      if prevValue isnt @value()
        @emit 'decrement'
    this

  disabled: (disable) ->
    if disable?
      @options.disabled = disable
      dis = if disable then 'disabled' else undefined
      select(@selector).selectAll('button').forEach (e) -> e.attr('disabled', dis)
      @selectInput.attr('disabled', dis)
      this
    else
      @options.disabled

  step: (val) ->
    if val?
      @options.step = val
      @selectInput.attr('step', val)
      @value(@value())
      this
    else
      @options.step

export numberPicker = (options) ->
  selection = div()
  new NumberPicker(selection, options)
  selection
