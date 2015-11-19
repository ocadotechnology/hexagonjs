class Shape extends DrawingObject

  constructor: ->
    super

    @position =
      x: @addNumberProperty('position.x')
      y: @addNumberProperty('position.y')
    @fill =
      enabled: @addDiscreteProperty('fill.enabled', true)
      color: @addColorProperty('fill.color')
    @outline =
      enabled: @addDiscreteProperty('outline.enabled', false)
      width: @addNumberProperty('outline.width')
      color: @addColorProperty('outline.color')

    # There is no reason that this couldn't be animatable - it would just require a
    # new ArrayProperty type to deal with the animation
    @curve = @addDiscreteProperty('curve', [])

    # internal state - not a property
    @type = ''

  set: (name, value, duration, callback) ->
    if name == 'curve'
      @type = 'curve'
    if name == 'polygon'
      @type = 'polygon'
      name = 'curve'
    super(name, value, duration, callback)

  get: (name) ->
    if name == 'polygon'
      name = 'curve'
    super(name)

  render: (ctx, drawing, cullOffsetX, cullOffsetY) ->
    bb = @getBoundingBox(ctx)
    clip = drawing.camera.getWorldRect()

    clip[0] -= cullOffsetX
    clip[1] -= cullOffsetY
    clip[2] -= cullOffsetX
    clip[3] -= cullOffsetY

    if bb and bb[2] > clip[0] and bb[0] < clip[2] and bb[3] > clip[1] and bb[1] < clip[3]
      ctx.beginPath()

      if @type == 'polygon'
        for point, i in @curve.value
          if i == 0
            ctx.moveTo(@position.x.value + point[0], @position.y.value + point[1])
          else
            ctx.lineTo(@position.x.value + point[0], @position.y.value + point[1])

      if @type == 'curve'
        for p, i in @curve.value
          if i == 0
            ctx.moveTo(@position.x.value + p[0], @position.y.value + p[1])
          else
            ctx.quadraticCurveTo(@position.x.value + @curve.value[i-1][2], @position.y.value + @curve.value[i-1][3], @position.x.value + p[0], @position.y.value + p[1])

      ctx.closePath()

      if @outline.enabled.value
        drawing.setStrokeColor(@outline.color.value)
        drawing.setStrokeWidth(@outline.width.value)
        ctx.stroke()
      if @fill.enabled.value
        drawing.setFillColor(@fill.color.value)
        ctx.fill()

      if @selected then @drawBoundingBox(ctx, drawing)

  getBoundingBox: ->
    if @type == 'polygon'
      x1 = x2 = @curve.value[0][0]
      y1 = y2 = @curve.value[0][1]

      for p, i in @curve.value
        if p[0] < x1 then x1 = p[0]
        if p[1] < y1 then y1 = p[1]
        if p[0] > x2 then x2 = p[0]
        if p[1] > y2 then y2 = p[1]

      [
        @position.x.value + x1,
        @position.y.value + y1,
        @position.x.value + x2,
        @position.y.value + y2
      ]

    # This which won't be accurate at the edges. Doing perfect bounding
    # box detection for curves is not that easy, so can wait for now.
    # This simply calculates the bounding box for the control points and
    # actual points
    else if @type == 'curve'
      x1 = x2 = @curve.value[0][0]
      y1 = y2 = @curve.value[0][1]

      for p, i in @curve.value
        if p[0] < x1 then x1 = p[0]
        if p[1] < y1 then y1 = p[1]
        if p[0] > x2 then x2 = p[0]
        if p[1] > y2 then y2 = p[1]
        if p[2] < x1 then x1 = p[2]
        if p[3] < y1 then y1 = p[3]
        if p[2] > x2 then x2 = p[2]
        if p[3] > y2 then y2 = p[3]

      [
        @position.x.value + x1,
        @position.y.value + y1,
        @position.x.value + x2,
        @position.y.value + y2
      ]
