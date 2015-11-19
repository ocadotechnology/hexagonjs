
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