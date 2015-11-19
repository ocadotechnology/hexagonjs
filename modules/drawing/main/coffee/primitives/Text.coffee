class Text extends DrawingObject

  constructor: ->
    super
    @position =
      x: @addNumberProperty('position.x')
      y: @addNumberProperty('position.y')

    @color = @addColorProperty('color')
    @size = @addNumberProperty('size', 12)
    @align =
      x: @addDiscreteProperty('align.x', 'start')
      y: @addDiscreteProperty('align.y', 'top')
    @font = @addDiscreteProperty('font', 'Helvetica,Arial')
    @text = @addStringProperty('text')

  render: (ctx, drawing, cullOffsetX, cullOffsetY) ->
    bb = @getBoundingBox(ctx)
    clip = drawing.camera.getWorldRect()

    clip[0] -= cullOffsetX
    clip[1] -= cullOffsetY
    clip[2] -= cullOffsetX
    clip[3] -= cullOffsetY

    if bb[2] > clip[0] and bb[0] < clip[2] and bb[3] > clip[1] and bb[1] < clip[3]
      ctx.font = '12px ' + @font.value
      drawing.setFillColor(@color.value)
      ctx.save()
      ctx.scale(@size.value/12, @size.value/12)

      #XXX: go through the drawing caching
      ctx.textAlign = @align.x.value
      ctx.textBaseline = @align.y.value
      ctx.fillText(@text.value, @position.x.value / (@size.value / 12), @position.y.value / (@size.value / 12))
      ctx.restore()

      if @selected then @drawBoundingBox(ctx, drawing)

  getWidth: (ctx) ->
    if @textWidth is undefined
      ctx.font = '12px ' + @font.value
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      @textWidth = ctx.measureText(@text.value).width
      ctx.restore()

    @textWidth

  getBoundingBox: (ctx) ->

    width = @getWidth(ctx)*(@size.value/12)
    height = @size.value
    switch @align.x.value
      when "start" then xoffset = 0
      when "end" then xoffset = width
      when "center" then xoffset = width/2
      else xoffset = 0

    switch @align.y.value
      when "top" then yoffset = 0
      when "end" then yoffset = height
      when "middle" then yoffset = height/2
      else yoffset = 0

    [
      @position.x.value - xoffset
      @position.y.value - yoffset
      @position.x.value + width - xoffset
      @position.y.value + height - yoffset
    ]

