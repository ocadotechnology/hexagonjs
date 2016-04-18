
hx.tooltip = (selector, opts) ->

  options = hx.merge({
    message: ''
    align: 'right'
  }, opts)

  content = (element) ->
    hx.select(element)
      .text(options.message)
      .classed('hx-tooltip', true)

  dropdownOptions = {
    mode: 'hover',
    align: options.align
  }

  new hx.Dropdown(hx.select(selector).node(), content, dropdownOptions)

  return
