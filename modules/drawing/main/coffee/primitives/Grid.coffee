class Grid extends DrawingObject

  constructor: ->
    super

    @position =
      x: @addNumberProperty('position.x')
      y: @addNumberProperty('position.y')
    @cellSize =
      x: @addNumberProperty('cellSize.x')
      y: @addNumberProperty('cellSize.y')
    @gridSize =
      x: @addNumberProperty('gridSize.x')
      y: @addNumberProperty('gridSize.y')
    @gridLines =
      color: @addColorProperty('gridLines.color')
      width: @addNumberProperty('gridLines.width')
      enabled: @addDiscreteProperty('gridLines.enabled', false)

    colorPalette = (new DrawingColor(Math.random(), Math.random()/2, 0, 0.5) for _ in [0..15] by 1)
    @cells =
      enabled: @addDiscreteProperty('cells.enabled', false)
      states: @addDiscreteProperty('cells.states', undefined)
      palette: @addDiscreteProperty('cells.palette', colorPalette)


  render: (ctx, drawing, cullOffsetX, cullOffsetY) ->



    # only draw things in view
    clip = drawing.camera.getWorldRect()
    clip[0] -= cullOffsetX
    clip[1] -= cullOffsetY
    clip[2] -= cullOffsetX
    clip[3] -= cullOffsetY

    # work out the grid area that actually is visible
    startX = Math.max(0, Math.floor((clip[0] - @position.x.value) / @cellSize.x.value))
    startY = Math.max(0, Math.floor((clip[1] - @position.y.value) / @cellSize.y.value))
    endX = Math.min(@gridSize.x.value-1, Math.ceil((clip[2] - @position.x.value) / @cellSize.x.value))
    endY = Math.min(@gridSize.y.value-1, Math.ceil((clip[3] - @position.y.value) / @cellSize.y.value))

    # only draw if the grid is in view
    if startX <= endX && startY <= endY

      if @cells.enabled.value
        # draw the cell colors

        for y in [startY..endY] by 1
          rowColorMap = @cells.states.value[y]
          for x in [startX..endX] by 1
            cellColor = rowColorMap[x]
            drawing.setFillColor(@cells.palette.value[cellColor])
            ctx.fillRect(@position.x.value + x * @cellSize.x.value+1, @position.y.value + y *  @cellSize.y.value+1, @cellSize.x.value-1, @cellSize.y.value-1)

      if @gridLines.enabled
        ctx.beginPath()
        drawing.setStrokeColor(@gridLines.color.value)
        drawing.setStrokeWidth(@gridLines.width.value)
        drawing.setStrokeCap('square')

        px = @position.x.value
        py = @position.y.value
        cx = @cellSize.x.value
        cy = @cellSize.y.value
        gx = @gridSize.x.value
        gy = @gridSize.y.value

        for x in [startX..endX+1] by 1
          ctx.moveTo(px + x * cx + 0.5, py + 0.5)
          ctx.lineTo(px + x * cx + 0.5, py + cy*gy + 0.5)

        for y in [startY..endY+1] by 1
          ctx.moveTo(px + 0.5, py + y * cy + 0.5)
          ctx.lineTo(px + cx*gx + 0.5, py + y * cy + 0.5)

        ctx.closePath()
        ctx.stroke()

      if @selected then @drawBoundingBox(ctx, drawing)

  getBoundingBox: ->
    # XXX: can be cached
    [
      @position.x.value
      @position.y.value
      @position.x.value + @gridSize.x.value * @cellSize.x.value
      @position.y.value + @gridSize.y.value * @cellSize.y.value
    ]
