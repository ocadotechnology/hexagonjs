hx.Drawing = Drawing

hx.drawing = (options) ->
  selection = hx.detached('div')
  new Drawing(selection.node(), options)
  selection

hx._.drawing = {
  Circle: Circle,
  Rectangle: Rectangle,
  Grid: Grid,
  Composite: Composite,
  Line: Line,
  Shape: Shape,
  Text: Text,
  pointRectangleIntersection: pointRectangleIntersection,
  lineIntersection: lineIntersection,
  horizontalLineIntersection: horizontalLineIntersection,
  verticalLineIntersection: verticalLineIntersection
}