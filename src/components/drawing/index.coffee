import { EventEmitter } from 'utils/event-emitter'
import logger from 'utils/logger'

import { Map as HMap } from 'utils/map'
import { List as HList } from 'utils/list'

import { select, div } from 'utils/selection'
import { color } from 'utils/color'
import { interpolate } from 'utils/interpolate'
import { loop as HLoop, ease, transition } from 'utils/transition'

import {
  clamp,
  clampUnit,
  defined,
  randomId,
  startsWith,
  tween,
} from 'utils/utils'

pointRectangleIntersection = (x, y, x1, y1, x2, y2) ->
  x1 <= x and x <= x2 and y1 <= y and y <= y2

# reference: http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
# for the sake of efficiency, this function will return false when two lines are identical (they are parallel,
# and pass throught the same point)
lineIntersection = (x1, y1, x2, y2, x3, y3, x4, y4) ->
  sx1 = x2 - x1
  sy1 = y2 - y1
  sx2 = x4 - x3
  sy2 = y4 - y3
  s = (-sy1 * (x1 - x3) + sx1 * (y1 - y3)) / (-sx2 * sy1 + sx1 * sy2)
  t = ( sx2 * (y1 - y3) - sy2 * (x1 - x3)) / (-sx2 * sy1 + sx1 * sy2)

  # This gives the point of intersection - could be useful in the future
  # so this has been left here.
  # if s >= 0 and s <= 1 and t >= 0 and t <= 1
  #   result =
  #     x: x1 + t * sx1
  #     y: y1 + t * sy1
  # else
  #   undefined

  s >= 0 and s <= 1 and t >= 0 and t <= 1

# more efficient check that can be done if one of the lines is horizontal
horizontalLineIntersection = (x1, y1, x2, y2, xh1, xh2, y) ->
  if y1 == y2
    y == y1 and ((xh1 <= x1 <= xh2) or (xh1 <= x2 <= xh2) or (x1 < xh1 and x2 > xh2))
  else
    ix = x1 + (y - y1) * (x2 - x1) / (y2 - y1)
    xh1 <= ix and ix <= xh2

# more efficient check that can be done if one of the lines is vertical
verticalLineIntersection = (x1, y1, x2, y2, yv1, yv2, x) ->
  if x1 == x2
    x == x1 and ((yv1 <= y1 <= yv2) or (yv1 <= y2 <= yv2) or (y1 < yv1 and y2 > yv2))
  else
    iy = y1 + (x - x1) * (y2 - y1) / (x2 - x1)
    yv1 <= iy and iy <= yv2

#XXX: remove - replace with PointProperty
#XXX: what about the camera - it uses this class, but isn't a drawing primitive

class Point
  constructor: (@x = 0, @y = 0) ->

  set: (point) ->
    @x = point.x
    @y = point.y

  tweenTo: (point, mixAmount) ->
    @x += (point.x-@x) * mixAmount
    @y += (point.y-@y) * mixAmount

  distanceTo: (point) ->
    Math.sqrt((@x - point.x) * (@x - point.x) + (@y - point.y) * (@y - point.y))

  distanceToSquared: (point) ->
    (@x - point.x) * (@x - point.x) + (@y - point.y) * (@y - point.y)

class ColorProperty
  constructor: (initial) ->
    @value = color()
    if defined(initial) then @set(initial)

  set: (value, duration, callback) ->
    if defined(@stop)
      @stop()
      @stop = undefined

    if defined(duration)
      sr = @value.red()
      sg = @value.green()
      sb = @value.blue()
      sa = @value.alpha()

      c = color(value)
      er = c.red()
      eg = c.green()
      eb = c.blue()
      ea = c.alpha()

      cb = if callback then (cancelled) =>
        @stop = undefined
        callback(not cancelled, @value)

      update = (x, cancelled) =>
        if not cancelled
          @value.red(sr + (er - sr) * x)
          @value.green(sg + (eg - sg) * x)
          @value.blue(sb + (eb - sb) * x)
          @value.alpha(sa + (ea - sa) * x)

      @stop = transition duration, update, ease.linear, cb
    else
      @value = color(value)

class NumberProperty
  constructor: (@value) ->
    @stop = undefined

  set: (value, duration, callback) ->
    if defined(@stop)
      @stop()
      @stop = undefined

    if defined(duration)
      start = @value
      cb = if callback then (cancelled) =>
        @stop = undefined
        callback(not cancelled, @value)

      update = (x, cancelled) =>
        if not cancelled
          @value = start + (value - start) * x

      @stop = transition duration, update, ease.linear, cb
    else
      @value = value

class StringProperty
  constructor: (@value) ->
    @stop = undefined

  set: (value, duration, callback) ->
    if defined(@stop)
      @stop()
      @stop = undefined

    if defined(duration)
      interpolater = interpolate(@value, value)
      cb = if callback then (cancelled) =>
        @stop = undefined
        callback(not cancelled, @value)

      update = (x, cancelled) =>
        if not cancelled
          @value = interpolater(x)

      @stop = transition duration, update, ease.linear,
    else
      @value = value

# a property that cannot be animated
class DiscreteProperty
  constructor: (@value) ->
  set: (value) ->
    @value = value


#XXX: rename to DrawingPrimitive
class DrawingObject

  constructor: (@id = randomId()) ->
    @attr = new HMap
    @properties = new HMap

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
    else if startsWith(name, 'attr.')
      @attr.set(name.substring(5), value)
    else
      console.warn('unknown property: ', name, Error().stack)
    @

  get: (name) ->
    if @properties.has(name)
      @properties.get(name).value
    else if startsWith(name, 'attr.')
      @attr.get(name.substring(5))
    else
      undefined

  drawBoundingBox: (ctx, drawing) ->
    #XXX: hardcoded colors
    bb = @getBoundingBox(ctx)
    if bb
      drawing.setStrokeColor(color('rgba(64, 64, 64, 1)'))
      padding = 2
      drawing.setStrokeWidth(Math.min(1, 0.95/drawing.camera.actualZoom))
      ctx.strokeRect(bb[0] - padding, bb[1] - padding, bb[2] - bb[0] + padding * 2, bb[3] - bb[1] + padding * 2)
      drawing.setFillColor(color('rgba(128, 128, 128, 0.1)'))
      ctx.fillRect(bb[0] - padding, bb[1] - padding, bb[2] - bb[0] + padding * 2, bb[3] - bb[1] + padding * 2)

  pointInBoundingBox: (p, ctx) ->
    bb = @getBoundingBox(ctx)
    pointRectangleIntersection(p.x, p.y, bb[0], bb[1], bb[2], bb[3])



#XXX: remove - replace with ColorProperty

class DrawingColor

  constructor: ->
    @c = color()

  set: (name, value) ->

    switch name
      when 'color'
        @c = color(value)
      when 'color.red'
        @c.red(clamp(0, 255, value))
      when 'color.green'
        @c.green(clamp(0, 255, value))
      when 'color.blue'
        @c.blue(clamp(0, 255, value))
      when 'color.alpha'
        @c.alpha(clampUnit(value))

class Text extends DrawingObject

  constructor: ->
    super()
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



class Shape extends DrawingObject

  constructor: ->
    super()

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


class Rectangle extends DrawingObject

  constructor: ->
    super()

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




class Line extends DrawingObject

  constructor: ->
    super()

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



class Grid extends DrawingObject

  constructor: ->
    super()

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


class Composite extends DrawingObject

  constructor: ->
    super()

    @position =
      x: @addNumberProperty('position.x')
      y: @addNumberProperty('position.y')

    @angle = @addNumberProperty('angle')
    @scale = @addNumberProperty('scale', 1)

    @objectList = new HList
    @objectMap = new HMap

  set: (name, value, duration, callback) ->
    if @properties.has(name) or startsWith(name, 'attr.')
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
    if @properties.has(name) or startsWith(name, 'attr.')
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
    object = @objectMap.get(name)
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



class Circle extends DrawingObject

  constructor: ->
    super()

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


class Sidebar extends EventEmitter
  constructor: (container, pos = 'l', togglePos, populate) ->
    super()
    @visible = false
    @selection = container.append('div').class('hx-drawing-sidebar hx-drawing-sidebar-' + pos)

    switch pos
      when 't', 'b'
        @selection.style('height', '0px')
        @expandEvt = 'expandv'
        @collapseEvt = 'collapsev'
      else
        @selection.style('width', '0px')
        @expandEvt = 'expandh'
        @collapseEvt = 'collapseh'

    if togglePos
      togglePos.split('')
      @toggleBtn = container.append('div')
        .class('hx-btn hx-drawing-sidebar-toggle')
        .classed('hx-drawing-sidebar-toggle-' + togglePos[0], true)
        .classed('hx-drawing-sidebar-toggle-' + togglePos[1], true)
        .on 'click', =>
          @toggle()

        .append('i').class('hx-icon hx-icon-bars')

    populate?(@selection.node())

  toggle: ->
    if @visible
      @hide()
    else
      @show()

  show: ->
    if not @visible
      @visible = true
      @selection.morph()
        .with(@expandEvt, 100)
        .and('fadein', 100)
        .go(true)
    this

  hide: ->
    if @visible
      @visible = false
      @selection.morph()
        .with('fadeout', 100)
        .and(@collapseEvt, 100)
        .go(true)
    this

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
        @fps = tween(@fps, thisFrameFps, 0.05)
      else
        @fps = thisFrameFps

    thisFrameMs = (@frameEnd - @frameStart)
    if @ms
      @ms = tween(@ms, thisFrameMs, 0.05)
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



class Layer
  triangle = (start, end) -> (x) -> 1 - Math.abs((Math.log(x) - start) * 2 / (end - start) - 1)
  ramp = (start, end) -> (x) -> 1 + Math.min((Math.log(x) - start) * 2 / (end - start) - 1, 0)

  constructor: (@drawing) ->
    @objects = []
    @visible = true
    @alpha = 1
    @alphaCurveFunction = null

  render: ->
    if @alphaCurveFunction
      @alpha = clampUnit @alphaCurveFunction(@drawing.camera.actualZoom)
      @visible = @alpha > 0.01


    if @visible
      @drawing.setGlobalAlpha(@alpha)
      for object in @objects
        object.render(@drawing.ctx, @drawing, 0, 0)

  # create a new object
  create: (objectType, id) ->
    object = switch objectType
      when 'circle' then new Circle(id)
      when 'rectangle' then new Rectangle(id)
      when 'line' then new Line(id)
      when 'grid' then new Grid(id)
      when 'text' then new Text(id)
      when 'shape' then new Shape(id)
      when 'composite' then new Composite(id)

    if object then @objects.push object

    object

  delete: (obj) ->
    id = @objects.indexOf(obj)
    if id!=-1 then @objects.splice(id,1)

  # removes all objects from the layer
  deleteAll: ->
    @objects = []
    undefined

  find: (id) ->
    for object in @objects
      return object if object.id == id

  findBy: (ind) ->
    for object in @objects
      return object if ind(object)

  # returns a bounding box [x1, y1, x2, y2] that all objects in the layer are contained within
  getBoundingBox: ->
    if @objects.length > 0
      result = @objects[0].getBoundingBox(@drawing.ctx)
      if @objects.length > 1
        for i in [1..@objects.length-1] by 1
          bb = @objects[i].getBoundingBox(@drawing.ctx)
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

  # set a function which transforms the current zoom into an alpha level for the layer. Setting this function will cause the alpha value of the layer to be calculated automatically every step
  setAlphaCurve: (type, start, end) ->
    @alphaCurveFunction = switch type
      when 'triangle' then triangle(start, end)
      when 'ramp' then ramp(start, end)



class Camera extends EventEmitter

  setZoom = (zoom) ->
    @zoom = zoom
    @emit 'zoom', {zoom: zoom}

  onMouseDown = (e, state) ->
    e.preventDefault()
    @mouseDown = true
    x = e.clientX
    y = e.clientY
    state.touchStart.x = x
    state.touchStart.y = y

    @emit 'pointerdown', { x: x, y: y }

  onMouseMove = (e, state) ->
    if @panEnabled and @mouseDown
      e.preventDefault()

    x = e.clientX
    y = e.clientY

    if @mouseDown

      if not @moving and (state.touchStart.x - x)*(state.touchStart.x - x) + (state.touchStart.y-y)*(state.touchStart.y-y) > state.moveThreshold*state.moveThreshold
        @moving = true
        state.positionLast.set state.touchStart
        if @panEnabled
          state.selection.style('cursor', 'move')

      if @moving

        dx = x - state.positionLast.x
        dy = y - state.positionLast.y

        state.positionLast.x = e.clientX
        state.positionLast.y = e.clientY

        onTranslate.call(this, dx, dy)


  onMouseUp = (e, state) ->
    if not @mouseDown then return

    e.preventDefault()
    @mouseDown = false

    if @moving
      @moving = false
    else
      onClick.call(
        this,
        state.touchStart.x - state.selection.box().left,
        state.touchStart.y - state.selection.box().top
      )

    state.selection.style('cursor', 'default')

    @emit 'pointerup', { x: state.touchStart.x, y: state.touchStart.y }

  onTranslate = (dx, dy, state) ->
    if @panEnabled
      @mode = undefined
      @smoothToNextTargetPosition = false
      @position.x -= dx*@drawing.dpr / @actualZoom
      @position.y -= dy*@drawing.dpr / @actualZoom
      @emit 'move', {dx: dx, dy: dy}

  onMouseWheel = (e, state) ->
    if @zoomEnabled
      e.preventDefault()
      e.stopPropagation()

      delta = - e.deltaY
      if e.deltaMode is 1 # Scroll by line enabled - delta value ~20 times lower
        delta *= 20

      deltaTransformed = Math.min(0.99, Math.abs(delta / 120 * 0.2))

      mx = e.clientX
      my = e.clientY
      wx = @getWorldX(mx)
      wy = @getWorldY(my)

      setZoom.call(this, if delta > 0 then @zoom / (1 - deltaTransformed) else @zoom * (1 - deltaTransformed))

  onTouchStart = (e, state) ->
    e.preventDefault()

    @mouseDown = true

    changed = e.changedTouches
    if changed.length > 0
      for i in [0..changed.length-1] by 1
        x = changed[i].clientX
        y = changed[i].clientY
        @emit 'pointerdown', { x: x, y: y }

    if e.targetTouches.length == 1
      x = e.targetTouches[0].clientX
      y = e.targetTouches[0].clientY
      state.touchStart.x = x
      state.touchStart.y = y

      didLongPress = false
      state.longPressTimer = setTimeout(
        =>
          onLongPress.call(
            this,
            state.touchStart.x - state.selection.box().left,
            state.touchStart.y - state.selection.box().top
          )
          didLongPress = true
      , state.longPressTime)

    else if e.targetTouches.length == 2
      if state.longPressTimer
        clearTimeout(state.longPressTimer)
        state.longPressTimer = null

      @isZoomTouch = true
      @lastx1 = e.targetTouches[0].clientX
      @lasty1 = e.targetTouches[0].clientY
      @lastx2 = e.targetTouches[1].clientX
      @lasty2 = e.targetTouches[1].clientY

      @startPinchDistance = Math.sqrt((@lastx1 - @lastx2)*(@lastx1 - @lastx2) + (@lasty1 - @lasty2)*(@lasty1 - @lasty2))

      @lastZoom = @zoom

  onTouchMove = (e, state) ->
    e.preventDefault()

    if e.targetTouches.length == 1 and not @isZoomTouch

      x = e.targetTouches[0].clientX
      y = e.targetTouches[0].clientY

      if not @moving and (state.touchStart.x - x)*(state.touchStart.x - x) + (state.touchStart.y-y)*(state.touchStart.y-y) > state.moveThreshold*state.moveThreshold
        @moving = true
        state.positionLast.set state.touchStart
        if state.longPressTimer
          clearTimeout(state.longPressTimer)
          state.longPressTimer = null

      if @moving
        dx = x - state.positionLast.x
        dy = y - state.positionLast.y

        state.positionLast.x = x
        state.positionLast.y = y

        if @mouseDown then onTranslate.call(this, dx, dy)

    else if e.targetTouches.length == 2
      if @zoomEnabled
        x1 = e.targetTouches[0].clientX
        y1 = e.targetTouches[0].clientY
        x2 = e.targetTouches[1].clientX
        y2 = e.targetTouches[1].clientY

        distance = Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2))

        setZoom.call(this, @lastZoom * distance / @startPinchDistance)


  onTouchEnd = (e, state) ->
    if not @mouseDown then return

    e.preventDefault()

    changed = e.changedTouches
    if changed.length > 0
      for i in [0..changed.length-1] by 1
        x = changed[i].clientX
        y = changed[i].clientY
        @emit 'pointerup', { x: x, y: y }

    if e.targetTouches.length == 0
      @isZoomTouch = false

      if state.longPressTimer
        clearTimeout(state.longPressTimer)
        state.longPressTimer = null

      if @moving
        @moving = false
      else
        if not didLongPress
          onClick.call(
            this,
            state.touchStart.x - state.selection.box().left
            state.touchStart.y - state.selection.box().top
          )

      didLongPress = false

  onClick = (x, y) ->
    wp = @screenPointToWorldPoint(new Point(x, y))
    if @selectionEnabled
      ctx = @drawing.ctx
      obj = @drawing.findBy((d) -> d.selectable.value and d.pointInBoundingBox(wp, ctx))

      if obj
        @drawing.select(obj)
      else
        @drawing.unselectAll()

    @emit 'click', {x: x, y: y, wx: wp.x, wy: wp.y}

  onLongPress = (x, y) -> @emit 'longpress', { x: x, y: y }


  constructor: (@drawing) ->
    super()

    @position = new Point
    @zoom = 1
    @actualPosition = new Point
    @actualZoom = 1
    @smoothPosition = false
    @positionSmoothingFactor = 0.15
    @smoothZoom = true
    @zoomSmoothingFactor = 0.15
    @zoomMax = null
    @zoomMin = null
    @xMin = null
    @yMin = null
    @xMax = null
    @yMax = null
    @mode = null
    @followContinualZoom = false
    @smoothToNextTargetPosition = false

    #XXX: move into a hidden state object
    @lastx1 = 0
    @lasty1 = 0
    @lastx2 = 0
    @lasty2 = 0
    @lastZoom = 1
    @isZoomTouch = false
    @moving = false


    @panEnabled = false
    @zoomEnabled = false
    @selectionEnabled = false

    mouseControlState =
      selection: select(@drawing.canvasNode)
      positionLast: new Point
      touchStart: new Point
      mouseDown: false
      moveThreshold: 5*@drawing.dpr
      longPressTime: 1000 # in milliseconds
      longPressTimer: null
      didLongPress: false

    mouseUpHandler = (e) => onMouseUp.call(this, e, mouseControlState)
    touchUpHandler = (e) => onTouchEnd.call(this, e, mouseControlState)

    namespace = 'drawing-' + randomId()
    select(document).on 'mouseup', namespace, mouseUpHandler
    select(document).on 'touchend', namespace, touchUpHandler

    #mouse events
    select(@drawing.canvasNode).on 'mousemove', 'hx.drawing', (e) => onMouseMove.call(this, e, mouseControlState)
    mouseControlState.selection.on 'mousedown', 'hx.drawing', (e) => onMouseDown.call(this, e, mouseControlState)
    mouseControlState.selection.on 'wheel', 'hx.drawing', (e) => onMouseWheel.call(this, e, mouseControlState)

    # touch events
    #XXX: test if using touch events from the document rather than the canvas works well...
    select(@drawing.canvasNode).on 'touchstart', 'hx.drawing', (e) => onTouchStart.call(this, e, mouseControlState)
    mouseControlState.selection.on 'touchmove', 'hx.drawing', (e) => onTouchMove.call(this, e, mouseControlState)
    mouseControlState.selection.on 'touchcancel', 'hx.drawing', (e) => onTouchEnd.call(this, e, mouseControlState)

  setupBounds: (zoomMin, zoomMax, xMin, yMin, xMax, yMax) ->
    @zoomMin = zoomMin
    @zoomMax = zoomMax
    @xMin = xMin
    @yMin = yMin
    @xMax = xMax
    @yMax = yMax

  clearTransform: (ctx) ->
    ctx.setTransform(1, 0, 0, 1, 0, 0)

  applyTransform: (ctx) ->
    ctx.translate(@drawing.width/2, @drawing.height/2)
    ctx.scale(@actualZoom, @actualZoom)
    ctx.translate(-@actualPosition.x, -@actualPosition.y)

  update: ->
    switch @mode
      when 'follow'
        bb = @followObject.getBoundingBox(@drawing.ctx)
        if bb
          if @followContinualZoom
            @zoom = @calculateZoomForBoundingBox(bb, @followZoomOut)
          @position.x = (bb[0] + bb[2])/2
          @position.y = (bb[1] + bb[3])/2


    if @zoomMin then if @zoom < @zoomMin then @zoom = @zoomMin
    if @zoomMax then if @zoom > @zoomMax then @zoom = @zoomMax

    if @xMin then if @position.x < @xMin then @position.x = @xMin
    if @yMin then if @position.y < @yMin then @position.y = @yMin
    if @xMax then if @position.x > @xMax then @position.x = @xMax
    if @yMax then if @position.y > @yMax then @position.y = @yMax

    if @smoothPosition or @smoothToNextTargetPosition
      @actualPosition.tweenTo(@position, @positionSmoothingFactor)

      if @actualPosition.distanceTo(@position) < 1 # magic number
        @smoothToNextTargetPosition = false
    else
      @actualPosition.set(@position)

    if @smoothZoom
      @actualZoom = tween(@actualZoom, @zoom, @zoomSmoothingFactor)
    else
      @actualZoom = @zoom

  # gets the visible area in world coordinates
  getWorldRect: ->
    [
      @actualPosition.x - @drawing.width / ( 2 * @actualZoom)
      @actualPosition.y - @drawing.height / ( 2 * @actualZoom)
      @actualPosition.x + @drawing.width / ( 2 * @actualZoom)
      @actualPosition.y + @drawing.height / ( 2 * @actualZoom)
    ]

  getWorldX: (x) -> (x*@drawing.dpr - @drawing.width / 2) / @actualZoom + @actualPosition.x

  getWorldY: (y) -> (y*@drawing.dpr - @drawing.height / 2) / @actualZoom + @actualPosition.y

  screenPointToWorldPoint: (p) ->
    result =
      x: (p.x*@drawing.dpr - @drawing.width / 2)  / @actualZoom + @actualPosition.x
      y: (p.y*@drawing.dpr - @drawing.height / 2)  / @actualZoom + @actualPosition.y

  worldPointToScreenPoint: (p) ->
    result =
      x: (p.x*@drawing.dpr - @actualPosition.x) * @actualZoom + @drawing.width/2
      y: (p.y*@drawing.dpr - @actualPosition.y) * @actualZoom + @drawing.height/2

  calculateZoomForBoundingBox: (bb, zoomOut) ->
    Math.min(
      @drawing.width / ((bb[2] - bb[0])*zoomOut),
      @drawing.height / ((bb[3] - bb[1])*zoomOut)
    )

  follow: (object, zoomOut, continuallyEvaluateZoom) ->
    @smoothToNextTargetPosition = true
    if object
      @mode = 'follow'
      @followObject = object
      @followZoomOut = zoomOut
      @followContinualZoom = continuallyEvaluateZoom
      bb = @followObject.getBoundingBox(@drawing.ctx)
      if bb
        @zoom = @calculateZoomForBoundingBox(bb, zoomOut)

  stopFollowing: ->
    @mode = null
    @followObject = null

  show: (object, zoomOut) ->
    @smoothToNextTargetPosition = true
    if object
      bb = object.getBoundingBox(@drawing.ctx)
      if bb
        @zoom = @calculateZoomForBoundingBox(bb, zoomOut)
        @position.x = (bb[0] + bb[2])/2
        @position.y = (bb[1] + bb[3])/2


class Drawing extends EventEmitter

  drawingLoop = ->
    run = false
    HLoop =>
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
    super()

    logger.deprecated('hx.Drawing', 'N/A - This module will be removed in the next major release')

    container = select(selector)
      .classed('hx-drawing', true)
      .api('drawing', this)
      .api(this)

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

    @selectedObjects = new HList

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
      @selectedObjects = new HList([drawingObject])
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

drawing = (options) ->
  selection = div()
  new Drawing(selection.node(), options)
  selection

export {
  drawing,
  Drawing,
  Circle,
  Rectangle,
  Grid,
  Composite,
  Line,
  Shape,
  Text,
  pointRectangleIntersection,
  lineIntersection,
  horizontalLineIntersection,
  verticalLineIntersection,
}
