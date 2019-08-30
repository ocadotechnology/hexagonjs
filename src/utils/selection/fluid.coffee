import logger from 'utils/logger'
import { isString } from 'utils/utils'
import { palette } from 'utils/palette'

import { detached } from './selection.coffee'

export div = (cls) -> detached('div').class(cls)
export h = (size, cls) -> detached('h' + size).class(cls)
export span = (cls) -> detached('span').class(cls)
export input = (cls) -> detached('input').class(cls)
export checkbox = (cls) -> detached('input').attr('type', 'checkbox').class(cls)
export i = (cls) -> detached('i').class(cls)

export icon = (options) ->
  logger.deprecated('icon', 'The icon fluid API has been replaced by: i(\'class\')')
  detached('i').class(options?.class)

export button = (cls) ->
  if cls and not isString(cls)
    logger.deprecated('button', "The button fluid API has been updated to take a single class string, you passed: #{cls}", "button('class')")
    btn = detached('button').attr('type', 'button').class('hx-btn')
    return palette.context(btn, cls.context)

  return detached('button').class(cls)
