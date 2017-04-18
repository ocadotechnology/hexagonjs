class Tooltip
  constructor: (selector, message = '', options = {}) ->
    defaults = {
      align: 'right'
    }
    resolvedOptions = hx.merge(defaults, options)

    content = (element) -> hx.select(element).text(message)

    dropdownOptions = {
      mode: 'click',
      matchWidth: false,
      align: resolvedOptions.align,
      ddClass: 'hx-tooltip'
    }

    selection = hx.select(selector)

    @_ = {
      selection: selection,
      dropdown: new hx.Dropdown(selection.node(), content, dropdownOptions)
    }

  remove: ->
    @dropdown.hide()
    @dropdown.cleanUp()

hx.tooltip = (selector, message, options) ->
  new Tooltip(selector, message, options)
