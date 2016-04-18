class AutocompletePicker extends hx.EventEmitter
  constructor: (selector, data, options) ->
    super()

    defaults = {}
    resolvedOptions = hx.merge defaults, options

  clearCache: ->

  hide: ->

  disabled: (disabled) ->
    if arguments.length

    else


  data: (data) ->
    if arguments.length

    else


  value: (value) ->
    if arguments.length

    else

hx.AutocompletePicker = AutocompletePicker

hx.autocompletePicker = (data, options) ->
  selection = hx.detached('input')
  new AutoComplete(selection.node(), data, options)
  selection
