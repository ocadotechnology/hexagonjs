
class Camera extends hx.EventEmitter

  setZoom = (zoom) ->
    @zoom = zoom
    @emit 'zoom', {zoom: zoom}

  onMouseDown = (e, state) ->
    e.preventDefault()
    @mouseDown = true
    x = e.clientX
    y = e.clientY
    state.touchStart.x = x
    state.touchStart.y = y

    @emit 'pointerdown', { x: x, y: y }

  onMouseMove = (e, state) ->
    if @panEnabled and @mouseDown
      e.preventDefault()

    x = e.clientX
    y = e.clientY

    if @mouseDown

      if not @moving and (state.touchStart.x - x)*(state.touchStart.x - x) + (state.touchStart.y-y)*(state.touchStart.y-y) > state.moveThreshold*state.moveThreshold
        @moving = true
        state.positionLast.set state.touchStart
        if @panEnabled
          state.selection.style('cursor', 'move')

      if @moving

        dx = x - state.positionLast.x
        dy = y - state.positionLast.y

        state.positionLast.x = e.clientX
        state.positionLast.y = e.clientY

        onTranslate.call(this, dx, dy)


  onMouseUp = (e, state) ->
    if not @mouseDown then return

    e.preventDefault()
    @mouseDown = false

    if @moving
      @moving = false
    else
      onClick.call(
        this,
        state.touchStart.x - state.selection.box().left,
        state.touchStart.y - state.selection.box().top
      )

    state.selection.style('cursor', 'default')

    @emit 'pointerup', { x: state.touchStart.x, y: state.touchStart.y }

  onTranslate = (dx, dy, state) ->
    if @panEnabled
      @mode = undefined
      @smoothToNextTargetPosition = false
      @position.x -= dx*@drawing.dpr / @actualZoom
      @position.y -= dy*@drawing.dpr / @actualZoom
      @emit 'move', {dx: dx, dy: dy}

  onMouseWheel = (e, state) ->
    if @zoomEnabled
      e.preventDefault()
      e.stopPropagation()

      delta = - e.deltaY
      if e.deltaMode is 1 # Scroll by line enabled - delta value ~20 times lower
        delta *= 20

      deltaTransformed = Math.min(0.99, Math.abs(delta / 120 * 0.2))

      mx = e.clientX
      my = e.clientY
      wx = @getWorldX(mx)
      wy = @getWorldY(my)

      setZoom.call(this, if delta > 0 then @zoom / (1 - deltaTransformed) else @zoom * (1 - deltaTransformed))

  onTouchStart = (e, state) ->
    e.preventDefault()

    @mouseDown = true

    changed = e.changedTouches
    if changed.length > 0
      for i in [0..changed.length-1] by 1
        x = changed[i].clientX
        y = changed[i].clientY
        @emit 'pointerdown', { x: x, y: y }

    if e.targetTouches.length == 1
      x = e.targetTouches[0].clientX
      y = e.targetTouches[0].clientY
      state.touchStart.x = x
      state.touchStart.y = y

      didLongPress = false
      state.longPressTimer = setTimeout(
        =>
          onLongPress.call(
            this,
            state.touchStart.x - state.selection.box().left,
            state.touchStart.y - state.selection.box().top
          )
          didLongPress = true
      , state.longPressTime)

    else if e.targetTouches.length == 2
      if state.longPressTimer
        clearTimeout(state.longPressTimer)
        state.longPressTimer = null

      @isZoomTouch = true
      @lastx1 = e.targetTouches[0].clientX
      @lasty1 = e.targetTouches[0].clientY
      @lastx2 = e.targetTouches[1].clientX
      @lasty2 = e.targetTouches[1].clientY

      @startPinchDistance = Math.sqrt((@lastx1 - @lastx2)*(@lastx1 - @lastx2) + (@lasty1 - @lasty2)*(@lasty1 - @lasty2))

      @lastZoom = @zoom

  onTouchMove = (e, state) ->
    e.preventDefault()

    if e.targetTouches.length == 1 and not @isZoomTouch

      x = e.targetTouches[0].clientX
      y = e.targetTouches[0].clientY

      if not @moving and (state.touchStart.x - x)*(state.touchStart.x - x) + (state.touchStart.y-y)*(state.touchStart.y-y) > state.moveThreshold*state.moveThreshold
        @moving = true
        state.positionLast.set state.touchStart
        if state.longPressTimer
          clearTimeout(state.longPressTimer)
          state.longPressTimer = null

      if @moving
        dx = x - state.positionLast.x
        dy = y - state.positionLast.y

        state.positionLast.x = x
        state.positionLast.y = y

        if @mouseDown then onTranslate.call(this, dx, dy)

    else if e.targetTouches.length == 2
      if @zoomEnabled
        x1 = e.targetTouches[0].clientX
        y1 = e.targetTouches[0].clientY
        x2 = e.targetTouches[1].clientX
        y2 = e.targetTouches[1].clientY

        distance = Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2))

        setZoom.call(this, @lastZoom * distance / @startPinchDistance)


  onTouchEnd = (e, state) ->
    if not @mouseDown then return

    e.preventDefault()

    changed = e.changedTouches
    if changed.length > 0
      for i in [0..changed.length-1] by 1
        x = changed[i].clientX
        y = changed[i].clientY
        @emit 'pointerup', { x: x, y: y }

    if e.targetTouches.length == 0
      @isZoomTouch = false

      if state.longPressTimer
        clearTimeout(state.longPressTimer)
        state.longPressTimer = null

      if @moving
        @moving = false
      else
        if not didLongPress
          onClick.call(
            this,
            state.touchStart.x - state.selection.box().left
            state.touchStart.y - state.selection.box().top
          )

      didLongPress = false

  onClick = (x, y) ->
    wp = @screenPointToWorldPoint(new Point(x, y))
    if @selectionEnabled
      ctx = @drawing.ctx
      obj = @drawing.findBy((d) -> d.selectable.value and d.pointInBoundingBox(wp, ctx))

      if obj
        @drawing.select(obj)
      else
        @drawing.unselectAll()

    @emit 'click', {x: x, y: y, wx: wp.x, wy: wp.y}

  onLongPress = (x, y) -> @emit 'longpress', { x: x, y: y }


  constructor: (@drawing) ->
    super

    @position = new Point
    @zoom = 1
    @actualPosition = new Point
    @actualZoom = 1
    @smoothPosition = false
    @positionSmoothingFactor = 0.15
    @smoothZoom = true
    @zoomSmoothingFactor = 0.15
    @zoomMax = null
    @zoomMin = null
    @xMin = null
    @yMin = null
    @xMax = null
    @yMax = null
    @mode = null
    @followContinualZoom = false
    @smoothToNextTargetPosition = false

    #XXX: move into a hidden state object
    @lastx1 = 0
    @lasty1 = 0
    @lastx2 = 0
    @lasty2 = 0
    @lastZoom = 1
    @isZoomTouch = false
    @moving = false


    @panEnabled = false
    @zoomEnabled = false
    @selectionEnabled = false

    mouseControlState =
      selection: hx.select(@drawing.canvasNode)
      positionLast: new Point
      touchStart: new Point
      mouseDown: false
      moveThreshold: 5*@drawing.dpr
      longPressTime: 1000 # in milliseconds
      longPressTimer: null
      didLongPress: false

    mouseUpHandler = (e) => onMouseUp.call(this, e, mouseControlState)
    touchUpHandler = (e) => onTouchEnd.call(this, e, mouseControlState)

    namespace = 'drawing-' + hx.randomId()
    hx.select(document).on 'mouseup', namespace, mouseUpHandler
    hx.select(document).on 'touchend', namespace, touchUpHandler

    #mouse events
    hx.select(@drawing.canvasNode).on 'mousemove', 'hx.drawing', (e) => onMouseMove.call(this, e, mouseControlState)
    mouseControlState.selection.on 'mousedown', 'hx.drawing', (e) => onMouseDown.call(this, e, mouseControlState)
    mouseControlState.selection.on 'wheel', 'hx.drawing', (e) => onMouseWheel.call(this, e, mouseControlState)

    # touch events
    #XXX: test if using touch events from the document rather than the canvas works well...
    hx.select(@drawing.canvasNode).on 'touchstart', 'hx.drawing', (e) => onTouchStart.call(this, e, mouseControlState)
    mouseControlState.selection.on 'touchmove', 'hx.drawing', (e) => onTouchMove.call(this, e, mouseControlState)
    mouseControlState.selection.on 'touchcancel', 'hx.drawing', (e) => onTouchEnd.call(this, e, mouseControlState)

  setupBounds: (zoomMin, zoomMax, xMin, yMin, xMax, yMax) ->
    @zoomMin = zoomMin
    @zoomMax = zoomMax
    @xMin = xMin
    @yMin = yMin
    @xMax = xMax
    @yMax = yMax

  clearTransform: (ctx) ->
    ctx.setTransform(1, 0, 0, 1, 0, 0)

  applyTransform: (ctx) ->
    ctx.translate(@drawing.width/2, @drawing.height/2)
    ctx.scale(@actualZoom, @actualZoom)
    ctx.translate(-@actualPosition.x, -@actualPosition.y)

  update: ->
    switch @mode
      when 'follow'
        bb = @followObject.getBoundingBox(@drawing.ctx)
        if bb
          if @followContinualZoom
            @zoom = @calculateZoomForBoundingBox(bb, @followZoomOut)
          @position.x = (bb[0] + bb[2])/2
          @position.y = (bb[1] + bb[3])/2


    if @zoomMin then if @zoom < @zoomMin then @zoom = @zoomMin
    if @zoomMax then if @zoom > @zoomMax then @zoom = @zoomMax

    if @xMin then if @position.x < @xMin then @position.x = @xMin
    if @yMin then if @position.y < @yMin then @position.y = @yMin
    if @xMax then if @position.x > @xMax then @position.x = @xMax
    if @yMax then if @position.y > @yMax then @position.y = @yMax

    if @smoothPosition or @smoothToNextTargetPosition
      @actualPosition.tweenTo(@position, @positionSmoothingFactor)

      if @actualPosition.distanceTo(@position) < 1 # magic number
        @smoothToNextTargetPosition = false
    else
      @actualPosition.set(@position)

    if @smoothZoom
      @actualZoom = hx.tween(@actualZoom, @zoom, @zoomSmoothingFactor)
    else
      @actualZoom = @zoom

  # gets the visible area in world coordinates
  getWorldRect: ->
    [
      @actualPosition.x - @drawing.width / ( 2 * @actualZoom)
      @actualPosition.y - @drawing.height / ( 2 * @actualZoom)
      @actualPosition.x + @drawing.width / ( 2 * @actualZoom)
      @actualPosition.y + @drawing.height / ( 2 * @actualZoom)
    ]

  getWorldX: (x) -> (x*@drawing.dpr - @drawing.width / 2) / @actualZoom + @actualPosition.x

  getWorldY: (y) -> (y*@drawing.dpr - @drawing.height / 2) / @actualZoom + @actualPosition.y

  screenPointToWorldPoint: (p) ->
    result =
      x: (p.x*@drawing.dpr - @drawing.width / 2)  / @actualZoom + @actualPosition.x
      y: (p.y*@drawing.dpr - @drawing.height / 2)  / @actualZoom + @actualPosition.y

  worldPointToScreenPoint: (p) ->
    result =
      x: (p.x*@drawing.dpr - @actualPosition.x) * @actualZoom + @drawing.width/2
      y: (p.y*@drawing.dpr - @actualPosition.y) * @actualZoom + @drawing.height/2

  calculateZoomForBoundingBox: (bb, zoomOut) ->
    Math.min(
      @drawing.width / ((bb[2] - bb[0])*zoomOut),
      @drawing.height / ((bb[3] - bb[1])*zoomOut)
    )

  follow: (object, zoomOut, continuallyEvaluateZoom) ->
    @smoothToNextTargetPosition = true
    if object
      @mode = 'follow'
      @followObject = object
      @followZoomOut = zoomOut
      @followContinualZoom = continuallyEvaluateZoom
      bb = @followObject.getBoundingBox(@drawing.ctx)
      if bb
        @zoom = @calculateZoomForBoundingBox(bb, zoomOut)

  stopFollowing: ->
    @mode = null
    @followObject = null

  show: (object, zoomOut) ->
    @smoothToNextTargetPosition = true
    if object
      bb = object.getBoundingBox(@drawing.ctx)
      if bb
        @zoom = @calculateZoomForBoundingBox(bb, zoomOut)
        @position.x = (bb[0] + bb[2])/2
        @position.y = (bb[1] + bb[3])/2
