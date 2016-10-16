select = require('modules/selection/main')
component = require('modules/component/main')
utils = require('modules/util/main/utils')
EventEmitter = require('modules/event-emitter/main')

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


class NumberPicker extends EventEmitter
  constructor: (@selector, options) ->
    super

    component.component.register(@selector, this)

    @options = utils.merge.defined({
      buttonClass: ''
      min: undefined
      max: undefined
      disabled: false
      value: 0
      incrementOnHold: true
      incrementDelay: 50
    }, options)

    @_ = {}

    container = select(@selector)
    selection = container.class('hx-number-picker')

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
      select(@selector).selectAll('button').forEach (e) -> e.attr('disabled', dis)
      @selectInput.attr('disabled', dis)
      this
    else
      @options.disabled

numberPicker = (options) ->
  selection = select.detached('div')
  new NumberPicker(selection.node(), options)
  selection

module.exports = numberPicker
module.exports.NumberPicker = NumberPicker
module.exports.hx  = {
  numberPicker: numberPicker
  NumberPicker: NumberPicker
}
