select = require('modules/selection/main')
utils = require('modules/util/main/utils')

contexts = ['action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled']
paletteContexts = ['default', 'action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled']

palette = {}

#XXX: make hx.select do flattening
flatSelect = (selector) ->
  if selector instanceof select.Selection then selector else select(selector)

context = (contextArray, contextPrefix) ->
  mappedContexts = contextArray
    .map((context) -> contextPrefix + '-' + context)
    .join(' ')

  (selector, context) ->
    selection = flatSelect(selector)
    if arguments.length > 1
      selection.classed(mappedContexts, false)
      if contextArray.indexOf(context) isnt -1
        selection.classed(contextPrefix + '-' + context, true)
      else if context
        utils.consoleWarning(context + ' is not a known context. Accepted values are ' + contextArray.join(', '))
      selection
    else
      for context in paletteContexts
        if selection.classed(contextPrefix + '-' + context) then return context
      return undefined

palette.context = context(contexts, 'hx')
palette.textContext = context(paletteContexts, 'hx-text')
palette.backgroundContext = context(paletteContexts, 'hx-background')
palette.borderContext = context(paletteContexts, 'hx-border')

module.exports = palette
module.exports.hx = {
  palette: palette
}
