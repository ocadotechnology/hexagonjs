class Tooltip
  constructor: (selector, content) ->

    selection = hx.select(selector).api(this)

    maybeWrapString = (content) ->
      if hx.isString(content)
        hx.div('hx-tooltip-text').text(content)
      else
        content

    dropdownContent = (element) ->
      if hx.isFunction(content)
        hx.select(element).add(maybeWrapString(content()))
      else
        hx.select(element).add(maybeWrapString(content))

    dropdownOptions = {
      mode: 'hover',
      matchWidth: false,
      align: 'right',
      ddClass: 'hx-tooltip'
    }

    dropdown = new hx.Dropdown(selection, dropdownContent, dropdownOptions)

    @_ = { selection, dropdown }

  remove: ->
    @_.dropdown.hide()
    @_.dropdown.cleanUp()

hx.tooltip = (selector, content) ->
  new Tooltip(selector, content)
