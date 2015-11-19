hx.select.addEventAugmenter({
  name: 'resize',
  setup: (node, eventEmitter) ->
    if not addResizeListener?
      initializeResizeListeners()

    handler = (e) ->
      box = hx.select(node).box()
      eventEmitter.emit('resize', ({clientRect: box, event: e}))

    addResizeListener node, handler

    return -> removeResizeListener node, handler
})