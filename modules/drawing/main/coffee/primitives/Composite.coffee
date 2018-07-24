class Composite extends DrawingObject

  constructor: ->
    super

    @position =
      x: @addNumberProperty('position.x')
      y: @addNumberProperty('position.y')

    @angle = @addNumberProperty('angle')
    @scale = @addNumberProperty('scale', 1)

    @objectList = new hx._.List
    @objectMap = new hx._.Map

  set: (name, value, duration, callback) ->
    if @properties.has(name) or hx.startsWith(name, 'attr.')
      super(name, value, duration, callback)
    else
      components = name.split('.')
      if components.length > 1
        objectName = components[0]
        property = components.slice(1).join('.')
        obj = @objectMap.get(objectName)
        if obj
          obj.set(property, value)
        else
          console.warn('unknown property: ', name, Error().stack)
      else
        console.warn('unknown property: ', name, Error().stack)
    @

  get: (name) ->
    if @properties.has(name) or hx.startsWith(name, 'attr.')
      super(name)
    else
      components = name.split('.')
      if components.length > 1
        objectName = components[0]
        property = components.slice(1).join('.')
        obj = @objectMap.get(objectName)
        if obj then obj.get(property)

  # create a new object inside this composite object
  create: (objectType, name) ->
    object = switch objectType
      when 'circle' then new Circle
      when 'rectangle' then new Rectangle
      when 'line' then new Line
      when 'grid' then new Grid
      when 'text' then new Text
      when 'shape' then new Shape
      when 'composite' then new Composite

    if object
      @objectList.add(object)
      @objectMap.set(name, object)

    @

  delete: (name) ->
    @objectList.delete(object)
    @objectMap.delete(name)

  render: (ctx, drawing, cullOffsetX, cullOffsetY) ->
    if @objectList.size > 0
      bb = @getBoundingBox(ctx)
      clip = drawing.camera.getWorldRect()

      clip[0] -= cullOffsetX
      clip[1] -= cullOffsetY
      clip[2] -= cullOffsetX
      clip[3] -= cullOffsetY

      if not bb or bb[2] > clip[0] and bb[0] < clip[2] and bb[3] > clip[1] and bb[1] < clip[3]
        for obj in @objectList.values()
          ctx.save()

          ctx.translate(@position.x.value, @position.y.value)
          ctx.scale(@scale.value, @scale.value)
          ctx.rotate(@angle.value)

          obj.render(ctx, drawing, @position.x.value + cullOffsetX, @position.y.value + cullOffsetY)

          ctx.restore()

    if @selected then @drawBoundingBox(ctx, drawing)

  getBoundingBox: (ctx) ->
    if @objectList.size > 0
      result = @objectList.get(0).getBoundingBox(ctx)
      if @objectList.size > 1
        for i in [1..@objectList.size-1] by 1
          bb = @objectList.get(i).getBoundingBox(ctx)
          if bb
            if result
              if bb[0] < result[0] then result[0] = bb[0]
              if bb[1] < result[1] then result[1] = bb[1]
              if bb[2] > result[2] then result[2] = bb[2]
              if bb[3] > result[3] then result[3] = bb[3]
            else
              result = bb

      #XXX: this bounding box technically isn't correct since it doesn't account for scale and rotation - things might be culled
      # when they shouldn't be as a result. This is a known issue
      result[0] += @position.x.value
      result[1] += @position.y.value
      result[2] += @position.x.value
      result[3] += @position.y.value

      result
