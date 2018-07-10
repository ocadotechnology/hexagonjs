import { select, addEventAugmenter} from 'utils/selection'
import initializeResizeListeners from './detect-element-resize'

export initResizeEvents = () ->
  addResizeListener = undefined
  removeResizeListener = undefined

  addEventAugmenter({
    name: 'resize',
    setup: (node, eventEmitter) ->
      if addResizeListener is undefined
        registers = initializeResizeListeners()
        addResizeListener = registers.addResizeListener
        removeResizeListener = registers.removeResizeListener

      handler = (e) ->
        box = select(node).box()
        eventEmitter.emit('resize', ({clientRect: box, event: e}))

      addResizeListener(node, handler)

      return -> removeResizeListener(node, handler)
  })
