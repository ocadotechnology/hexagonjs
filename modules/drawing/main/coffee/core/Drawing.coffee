
class Drawing extends hx.EventEmitter

  drawingLoop = ->
    run = false
    hx.loop =>
      if @stats then @stats.start()

      @camera.clearTransform(@ctx)
      @ctx.clearRect(0, 0, @width, @height)

      @camera.update()
      @camera.applyTransform(@ctx)
      for layer in @layers
        layer.render(@ctx)

      if @stats
        @camera.clearTransform(@ctx)
        @stats.end()
        @stats.update()
        @stats.render()

      @emit 'update', @frame
      @frame++
      run

    -> run = true

  resize = (container) ->
    containerWidth = container.clientWidth
    containerHeight = container.clientHeight

    # take into account the device pixel ratio so that things look nice on high resolution screens
    @dpr = if window.devicePixelRatio? then window.devicePixelRatio else 1
    @canvas.prop('width', containerWidth * @dpr)
    @canvas.prop('height', containerHeight * @dpr)
    @canvas.style('width', containerWidth + "px")
    @canvas.style('height', containerHeight + "px")
    @canvas.style('position', 'relative')

    @width = containerWidth * @dpr
    @height = containerHeight * @dpr

    @overlay.style('width', containerWidth + "px")
    @overlay.style('height', containerHeight + "px")

    @state =
      height: containerWidth
      width: containerHeight


  constructor: (selector, autoStart=true) ->
    super

    hx.component.register(selector, this)

    container = hx.select(selector)

    container.classed('hx-drawing', true)

    @canvas = container.append('canvas')
    @overlay = container.append('div')
      .class('hx-drawing-overlay')

    node = container.node()

    resize.call this, node

    container.on 'resize', =>
      resize.call this, node

    @canvasNode = @canvas.node()
    @ctx = @canvasNode.getContext('2d')

    @defaultLayer = new Layer(@)
    @layers = [@defaultLayer]

    @camera = new Camera(@)

    # pipe events through from the camera
    @camera.pipe(this)

    @globalAlpha = 1

    @stats = null

    @selectedObjects = new hx.List

    # start the loop
    @frame = 0
    if autoStart then @resume()

  # starts the drawing updating
  resume: ->
    if not @stopFunc
      @stopFunc = drawingLoop.call(this)

  # stops the drawing updating
  stop: ->
    if @stopFunc
      @stopFunc()
      @stopFunc = undefined

  # find an object by id
  find: (id) ->
    for layer in @layers
      res = layer.find(id)
      if res then return res

  # find an object by indicator function
  findBy: (ind) ->
    for layer in @layers
      res = layer.findBy(ind)
      if res then return res

  # create a new layer
  createLayer:  ->
    layer = new Layer(@)
    @layers.push layer
    layer

  showLayer: (layer) ->
    for l  in @layers
      l.visible = (l == layer)

  # continuously follow an object (until interruped by a pan)
  follow: (obj, zoomOut=1, continuallyEvaluateZoom=false) ->
    @camera.follow(obj, zoomOut, continuallyEvaluateZoom)

  stopFollowing: -> @camera.stopFollowing

  # put the object in view (this will not follow the object after)
  show: (obj, zoomOut=1) ->
    @camera.show(obj, zoomOut)

  enablePan: ->
    @camera.panEnabled = true

  enableZoom: ->
    @camera.zoomEnabled = true

  enableSelection: ->
    @camera.selectionEnabled = true

  # enable the performance gauge
  enablePerformanceGauge: ->
    @stats = new PerformanceGauge(@)

  # enable the search box
  enableSearchbox: ->
    @searchbox = @overlay.append('div').classed('hx-drawing-searchbox', true)
    input = @searchbox.append('input').attr('placeholder', 'Search')
    input.on 'keypress', (e) =>
      if e.which == 13
        @emit 'search', input.prop('value')

  enableSidebar: (position, togglePos, populate) ->
    if arguments.length is 2
      populate = togglePos
      togglePos = null

    @sidebar = new Sidebar(@overlay, position, togglePos, populate)
    @showSidebar = => @sidebar.show()
    @hideSidebar = => @sidebar.hide()
    @toggleSidebar = => @sidebar.toggle()

  # create a new object (id is optional)
  create: (objectType, id) -> @defaultLayer.create(objectType, id)

  # remove an object from the drawing
  delete: (obj) -> layer.delete(obj) for layer in @layers

  # removes all objects from the drawing
  deleteAll: ->
    layer.deleteAll() for layer in @layers
    undefined

  setGlobalAlpha: (alpha) ->
    @globalAlpha = alpha

  setFillColor: (color) ->
    r = color.red()
    g = color.green()
    b = color.blue()
    a = color.alpha() * @globalAlpha

    # can potentially optimise this by only updating the color only when it changes
    @ctx.fillStyle = "rgba(#{Math.floor(r)},#{Math.floor(g)},#{Math.floor(b)},#{a})"

  setStrokeColor: (color) ->

    r = color.red()
    g = color.green()
    b = color.blue()
    a = color.alpha() * @globalAlpha

    # can potentially optimise this by only updating the color only when it changes
    @ctx.strokeStyle = "rgba(#{Math.floor(r)},#{Math.floor(g)},#{Math.floor(b)},#{a})"

  setStrokeWidth: (width) ->
    @ctx.lineWidth = width

  setStrokeCap: (style) ->
    @ctx.lineCap = style

  # returns a bounding box [x1, y1, x2, y2] that all objects in the scene are contained within
  getBoundingBox: ->
    if @layers.length > 0
      result = @layers[0].getBoundingBox(@ctx)
      if @layers.length > 1
        for i in [1..@layers.length-1] by 1
          bb = @layers[i].getBoundingBox(@ctx)
          if bb
            if result
              if bb[0] < result[0] then result[0] = bb[0]
              if bb[1] < result[1] then result[1] = bb[1]
              if bb[2] > result[2] then result[2] = bb[2]
              if bb[3] > result[3] then result[3] = bb[3]
            else
              result = bb
      result
    else
      null

  select: (drawingObject, append=false) ->
    if append
      @selectedObjects.add(drawingObject)
    else
      for obj in @selectedObjects.values()
        if obj!=drawingObject
          obj.selected = false
          @emit 'unselect', obj
      @selectedObjects = new hx.List([drawingObject])
    drawingObject.selected = true
    @emit 'select', drawingObject

  unselect: (drawingObject) ->
    if @selectedObjects.remove(drawingObject)
      drawingObject.selected = false
      @emit 'unselect', drawingObject

  unselectAll: ->
    for obj in @selectedObjects.values()
      obj.selected = false
      @emit 'unselect', obj
    @selectedObjects.clear()

  selected: -> @selectedObjects.values()

