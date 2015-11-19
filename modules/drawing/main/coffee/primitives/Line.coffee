class Line extends DrawingObject

  constructor: ->
    super

    @start =
      x: @addNumberProperty('start.x')
      y: @addNumberProperty('start.y')
    @end =
      x: @addNumberProperty('end.x')
      y: @addNumberProperty('end.y')

    @color = @addColorProperty('color')
    @width = @addNumberProperty('width')

  render: (ctx, drawing, cullOffsetX, cullOffsetY) ->
    clip = drawing.camera.getWorldRect()

    clip[0] -= cullOffsetX
    clip[1] -= cullOffsetY
    clip[2] -= cullOffsetX
    clip[3] -= cullOffsetY

    width = if @width.value == 0 then Math.min(1, 0.95/drawing.camera.actualZoom) else @width.value

    # this is a lot of checking to do, just to check if a line should be drawn - can this be reduced?
    if pointRectangleIntersection(@start.x.value, @start.y.value, clip[0]-width, clip[1]-width, clip[2]+width, clip[3]+width) or
    pointRectangleIntersection(@end.x.value, @end.y.value, clip[0]-width, clip[1]-width, clip[2]+width, clip[3]+width) or
    horizontalLineIntersection(@start.x.value, @start.y.value, @end.x.value, @end.y.value, clip[0]-width, clip[2]+width, clip[1]-width) or
    horizontalLineIntersection(@start.x.value, @start.y.value, @end.x.value, @end.y.value, clip[0]-width, clip[2]+width, clip[3]+width) or
    verticalLineIntersection(@start.x.value, @start.y.value, @end.x.value, @end.y.value, clip[1]-width, clip[3]+width, clip[0]-width) or
    verticalLineIntersection(@start.x.value, @start.y.value, @end.x.value, @end.y.value, clip[1]-width, clip[3]+width, clip[2]+width)

      ctx.beginPath()
      drawing.setStrokeColor(@color.value)
      drawing.setStrokeWidth(width)
      ctx.moveTo(@start.x.value, @start.y.value)
      ctx.lineTo(@end.x.value, @end.y.value)
      ctx.closePath()
      ctx.stroke()

      if @selected then @drawBoundingBox(ctx, drawing)

  getBoundingBox: ->
    # XXX: can be cached
    [
      Math.min(@start.x.value, @end.x.value)
      Math.min(@start.y.value, @end.y.value)
      Math.max(@start.x.value, @end.x.value)
      Math.max(@start.y.value, @end.y.value)
    ]

