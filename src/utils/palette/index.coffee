import logger from 'utils/logger'
import { select } from 'utils/selection'

contexts = ['action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled']
paletteContexts = ['default', 'action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled']

context = (contextArray, contextPrefix) ->
  mappedContexts = contextArray
    .map((context) -> contextPrefix + '-' + context)
    .join(' ')

  (selector, context) ->
    selection = select(selector)
    if arguments.length > 1
      selection.classed(mappedContexts, false)
      if contextArray.indexOf(context) isnt -1
        selection.classed(contextPrefix + '-' + context, true)
      else if context
        logger.warn(context + ' is not a known context. Accepted values are ' + contextArray.join(', '))
      selection
    else
      for context in paletteContexts
        if selection.classed(contextPrefix + '-' + context) then return context
      return undefined

export palette = {
  context: context(contexts, 'hx'),
  textContext: context(paletteContexts, 'hx-text'),
  backgroundContext: context(paletteContexts, 'hx-background'),
  borderContext: context(paletteContexts, 'hx-border')
}
