contexts = ['action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled']
paletteContexts = ['default', 'action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled']

hx.palette = {}

flatSelect = (selector) ->
  if selector instanceof hx.Selection then selector else hx.select(selector)

context = (contextArray, contextPrefix) ->
  mappedContexts = contextArray.map (context) -> "#{contextPrefix}-#{context}"
    .join(' ')

  (selector, context) ->
    selection = flatSelect(selector)
    if arguments.length > 1
      selection.classed(mappedContexts, false)
      if contextArray.indexOf(context) isnt -1
        selection.classed("#{contextPrefix}-#{context}", true)
      else if context
        hx.consoleWarning "#{context} is not a known context! Accepted values are #{contextArray.join(', ')}"
      selection
    else
      for context in paletteContexts
        if selection.classed("#{contextPrefix}-#{context}") then return context
      return undefined

hx.palette.context = context(contexts, 'hx')
hx.palette.textContext = context(paletteContexts, 'hx-text')
hx.palette.backgroundContext = context(paletteContexts, 'hx-background')
hx.palette.borderContext = context(paletteContexts, 'hx-border')
