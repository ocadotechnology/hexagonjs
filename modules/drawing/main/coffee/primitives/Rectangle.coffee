class Rectangle extends DrawingObject

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

    @width = @addNumberProperty('width', 10)
    @height = @addNumberProperty('height', 10)

  render: (ctx, drawing, cullOffsetX, cullOffsetY) ->

    clip = drawing.camera.getWorldRect()

    clip[0] -= cullOffsetX
    clip[1] -= cullOffsetY
    clip[2] -= cullOffsetX
    clip[3] -= cullOffsetY

    if @position.x.value + @width.value > clip[0] and @position.x.value < clip[2] and @position.y.value + @height.value > clip[1] and @position.y.value < clip[3]

      if @fill.enabled.value
        drawing.setFillColor(@fill.color.value)
        ctx.fillRect(@position.x.value, @position.y.value, @width.value, @height.value)

      if @outline.enabled.value
        drawing.setStrokeColor(@outline.color.value)
        drawing.setStrokeWidth(@outline.width.value)
        ctx.strokeRect(@position.x.value, @position.y.value, @width.value, @height.value)

      if @selected then @drawBoundingBox(ctx, drawing)

  getBoundingBox: ->
    # XXX: can be cached
    [
      @position.x.value
      @position.y.value
      @position.x.value + @width.value
      @position.y.value + @height.value
    ]

