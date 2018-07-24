
#XXX: rename to DrawingPrimitive
class DrawingObject

  constructor: (@id = hx.randomId()) ->
    @attr = new hx._.Map
    @properties = new hx._.Map

    @selectable = @addDiscreteProperty 'selectable'
    @selected = false

  addDiscreteProperty: (name, initial=false) ->
    prop = new DiscreteProperty(initial)
    @properties.set(name, prop)
    prop

  addNumberProperty: (name, initial=0) ->
    prop = new NumberProperty(initial)
    @properties.set(name, prop)
    prop

  addColorProperty: (name, initial='#FFF') ->
    prop = new ColorProperty(initial)
    @properties.set(name, prop)
    prop

  addStringProperty: (name, initial='') ->
    prop = new StringProperty(initial)
    @properties.set(name, prop)
    prop

  # callback will be called with up to two arguments:
  #  callback(reachedEnd, [valueAtInterrupt])
  set: (name, value, duration, callback) ->
    if @properties.has(name)
      @properties.get(name).set(value, duration, callback)
    else if hx.startsWith(name, 'attr.')
      @attr.set(name.substring(5), value)
    else
      console.warn('unknown property: ', name, Error().stack)
    @

  get: (name) ->
    if @properties.has(name)
      @properties.get(name).value
    else if hx.startsWith(name, 'attr.')
      @attr.get(name.substring(5))
    else
      undefined

  drawBoundingBox: (ctx, drawing) ->
    #XXX: hardcoded colors
    bb = @getBoundingBox(ctx)
    if bb
      drawing.setStrokeColor(hx.color('rgba(64, 64, 64, 1)'))
      padding = 2
      drawing.setStrokeWidth(Math.min(1, 0.95/drawing.camera.actualZoom))
      ctx.strokeRect(bb[0] - padding, bb[1] - padding, bb[2] - bb[0] + padding * 2, bb[3] - bb[1] + padding * 2)
      drawing.setFillColor(hx.color('rgba(128, 128, 128, 0.1)'))
      ctx.fillRect(bb[0] - padding, bb[1] - padding, bb[2] - bb[0] + padding * 2, bb[3] - bb[1] + padding * 2)

  pointInBoundingBox: (p, ctx) ->
    bb = @getBoundingBox(ctx)
    pointRectangleIntersection(p.x, p.y, bb[0], bb[1], bb[2], bb[3])

