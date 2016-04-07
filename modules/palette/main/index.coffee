contexts = ['action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast']
paletteContexts = ['default', 'action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast']

hx.palette = {}

flatSelect = (selector) ->
  if selector instanceof hx.Selection then selector else hx.select(selector)

hx.palette.context =  (selector, context) ->
  selection = flatSelect(selector)
  if arguments.length > 1
    contexts.forEach (c) -> selection.classed('hx-' + c, c is context)
    return selection
  else
    for c in contexts
      if selection.classed('hx-' + c) then return c
    return undefined

hx.palette.textContext =  (selector, context) ->
  selection = flatSelect(selector)
  if arguments.length > 1
    paletteContexts.forEach (c) -> selection.classed('hx-text-' + c, c is context)
    return selection
  else
    for c in paletteContexts
      if selection.classed('hx-text-' + c) then return c
    return undefined

hx.palette.backgroundContext =  (selector, context) ->
  selection = flatSelect(selector)
  if arguments.length > 1
    paletteContexts.forEach (c) -> selection.classed('hx-background-' + c, c is context)
    return selection
  else
    for c in paletteContexts
      if selection.classed('hx-background-' + c) then return c
    return undefined

hx.palette.borderContext =  (selector, context) ->
  selection = flatSelect(selector)
  if arguments.length > 1
    paletteContexts.forEach (c) -> selection.classed('hx-border-' + c, c is context)
    return selection
  else
    for c in paletteContexts
      if selection.classed('hx-border-' + c) then return c
    return undefined