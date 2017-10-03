# removes the 200ms delay when clicking on mobiles
if hx.supports('touch')
  DONT_PREVENT_DEFAULT_NODES = [
    'INPUT',
    'TEXTAREA',
    'SELECT',
    'LABEL',
    'A'
  ]

  setupFastClick = (node, eventEmitter) ->
    tapHandling = cancel = resetTimer = null
    scrollTolerance = 10

    getCoords = (e) ->
      ev = e.originalEvent or e
      touches = ev.touches or ev.targetTouches
      if touches then [ touches[0].pageX, touches[0].pageY ]

    startX = undefined
    startY = undefined
    touchStartHander = (e) ->
      if e.touches and e.touches.length > 1 || e.targetTouches and e.targetTouches.length > 1
        return false
      [startX, startY] = getCoords(e)

    touchMoveHander = (e) ->
      if not cancel
        coords = getCoords(e)
        if coords and ((Math.abs( startY - coords[1])) > scrollTolerance || (Math.abs( startX - coords[0])) > scrollTolerance)
          cancel = true

    touchEndHander = (e) ->
      clearTimeout(resetTimer)
      resetTimer = setTimeout(() ->
        tapHandling = false
        cancel = false
      , 1000)

      if ( e.which && e.which > 1 ) || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey
        return

      if cancel or tapHandling and tapHandling isnt e.type
        cancel = false
        return

      if node.contains(e.target) and not (e.target.nodeName in DONT_PREVENT_DEFAULT_NODES)
        e.preventDefault()

      tapHandling = e.type
      eventEmitter.emit('click', e)

    node.addEventListener 'touchstart', touchStartHander
    node.addEventListener 'touchmove', touchMoveHander
    node.addEventListener 'touchend', touchEndHander

    return ->
      node.removeEventListener 'touchstart', touchStartHander
      node.removeEventListener 'touchmove', touchMoveHander
      node.removeEventListener 'touchend', touchEndHander

  hx.select.addEventAugmenter({
    name: 'click',
    setup: setupFastClick
  })
