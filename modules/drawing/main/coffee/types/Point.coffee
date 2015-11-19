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