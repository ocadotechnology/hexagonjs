select = require('modules/selection/main')
initializeResizeListeners = require('./detect-element-resize')

addResizeListener = undefined
removeResizeListener = undefined

select.addEventAugmenter({
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


module.exports = {
  
}
