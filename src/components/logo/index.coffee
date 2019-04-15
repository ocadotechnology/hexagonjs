import logger from 'utils/logger'
import { div, selectAll } from 'utils/selection'

replaceWithDiv = (sel) ->
  sel.replace(div('hx-logo'))

initLogos = () ->
  logos = selectAll('img.hx-logo')
  if logos.size()
    logger.warn('Logo:', 'The .hx-logo class should only be applied to <div> elements.', 'You supplied: ', logos.nodes)
    logos.forEach(replaceWithDiv)

export { initLogos }
