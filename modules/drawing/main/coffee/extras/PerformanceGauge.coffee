class PerformanceGauge
  constructor: (@drawing) ->
    @position = new Point(3, 3)
    @fps = undefined
    @ms = undefined
    @lastEnd = undefined
    @frameStart = undefined
    @frameEnd = undefined

  start: ->
    @frameStart = (new Date()).getTime()

  end: ->
    @lastEnd = @frameEnd
    @frameEnd = (new Date()).getTime()

  update: ->
    thisFrameFps = 1000/(@frameEnd - @lastEnd)
    if not isNaN(thisFrameFps)
      if @fps
        @fps = hx.tween(@fps, thisFrameFps, 0.05)
      else
        @fps = thisFrameFps

    thisFrameMs = (@frameEnd - @frameStart)
    if @ms
      @ms = hx.tween(@ms, thisFrameMs, 0.05)
    else
      @ms = thisFrameMs

  render: ->
    @drawing.ctx.fillStyle = 'rgba(0, 0, 40, 1)'
    @drawing.ctx.strokeStyle = '#ffffff'
    @drawing.ctx.lineCap = 'square'
    @drawing.ctx.lineWidth = 1
    @drawing.ctx.fillRect(@position.x, @position.y, 70, 42)
    @drawing.ctx.strokeRect(@position.x, @position.y, 70, 42)


    @drawing.ctx.font = "10pt Helvetica,Arial"
    @drawing.ctx.fillStyle = '#ffffff'
    @drawing.ctx.fillText("FPS: " + Math.round(@fps), 8 + @position.x, 18 + @position.y)
    if @ms < 17
      @drawing.ctx.fillStyle = '#ffffff'
    else
      @drawing.ctx.fillStyle = '#ff5555'
    @drawing.ctx.fillText("MS: " + Math.round(@ms), 8 + @position.x, 33 + @position.y)