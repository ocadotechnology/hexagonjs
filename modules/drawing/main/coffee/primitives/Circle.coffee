class Circle extends DrawingObject

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

    @radius = @addNumberProperty('radius', 10)

  render: (ctx, drawing, cullOffsetX, cullOffsetY) ->
    # this clipping assumes that the circle is in fact a square - so it is possible to
    # do better clipping (when the circle is just outside the corner of the screen)
    # It may be that improving the clipping will result in worse performance though, since
    # checking rectangle-circle collision accurately will be more costly than this simple, yet inacurate check.

    clip = drawing.camera.getWorldRect()

    clip[0] -= cullOffsetX
    clip[1] -= cullOffsetY
    clip[2] -= cullOffsetX
    clip[3] -= cullOffsetY

    if @position.x.value + @radius.value > clip[0] and
       @position.x.value - @radius.value < clip[2] and
       @position.y.value + @radius.value > clip[1] and
       @position.y.value - @radius.value < clip[3]

      ctx.beginPath()
      ctx.arc(@position.x.value, @position.y.value, @radius.value, 0, Math.PI*2, true)
      ctx.closePath()

      if @fill.enabled.value
        drawing.setFillColor(@fill.color.value)
        ctx.fill()

      if @outline.enabled.value
        drawing.setStrokeColor(@outline.color.value)
        drawing.setStrokeWidth(@outline.width.value)
        ctx.stroke()

      if @selected then @drawBoundingBox(ctx, drawing)

  getBoundingBox: ->
    # XXX: can be cached
    [
      @position.x.value - @radius.value
      @position.y.value - @radius.value
      @position.x.value + @radius.value
      @position.y.value + @radius.value
    ]
