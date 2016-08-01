# normalisation for mouse + touch events

util = require('modules/util/main')
select = require('modules/selection/main')

init = ->
  addAugmentor = (name, mouseName, touchNames, node, addEventAugmenter, mouseEventFactory, touchEventFactory) ->
    select.addEventAugmenter({
      name: name,
      setup: (node, eventEmitter) ->
        mouseHandler = (e) -> eventEmitter.emit(name, mouseEventFactory(e))
        node.addEventListener mouseName, mouseHandler

        if touch = util.supports('touch')
          touchHandler = (e) -> eventEmitter.emit(name, touchEventFactory(e))
          for touchName in touchNames
            node.addEventListener touchName, touchHandler

        return ->
          node.removeEventListener mouseName, mouseHandler
          if touch
            for touchName in touchNames
              node.removeEventListener touchName, touchHandler
    })

  addAugmentorWithLocation = (name, mouseName, touchNames, node, eventEmitter) ->
    mouseEventFactory = (e) -> {x: e.clientX, y: e.clientY, event: e}
    touchEventFactory = (e) -> {x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY, event: e}
    addAugmentor(name, mouseName, touchNames, node, eventEmitter, mouseEventFactory, touchEventFactory)

  addAugmentorWithoutLocation = (name, mouseName, touchNames, node, eventEmitter) ->
    handler = (e) -> {event: e}
    addAugmentor(name, mouseName, touchNames, node, eventEmitter, handler, handler)

  addAugmentorWithLocation('pointerdown', 'mousedown', ['touchstart'])
  addAugmentorWithLocation('pointermove', 'mousemove', ['touchmove'])
  addAugmentorWithoutLocation('pointerup', 'mouseup', ['touchend', 'touchcancel'])
  addAugmentorWithoutLocation('pointerleave', 'mouseleave', ['touchleave'])
  addAugmentorWithoutLocation('pointerenter', 'mouseenter', ['touchenter'])

module.exports = init

module.exports.hx = {
  init: init
}
