
module.exports = (alignments, selectionRect, dropdownRect, windowRect, ddMaxHeight, scrollbarWidth) ->

  # figure out the direction the drop-down should be revealed (for the animation)
  direction = if alignments[1] is alignments[3] and alignments[0] isnt alignments[2]
    if alignments[0] is 'l' then 'left' else 'right'
  else if alignments[3] is 't' then 'down' else 'up'

  # work out where the drop-down would go when there is ample space

  x = selectionRect.x
  y = selectionRect.y

  if alignments[0] is 'r' then x += selectionRect.width
  if alignments[1] is 'b' then y += selectionRect.height
  if alignments[2] is 'r' then x -= dropdownRect.width
  if alignments[3] is 'b' then y -= dropdownRect.height

  # adjust the position of the drop-down when there is not enough space

  # slide into view (in the appropriate direction)
  if direction is 'down' or direction is 'up'
    x = hx.clamp(0, windowRect.width - dropdownRect.width, x)
  else
    y = hx.clamp(0, windowRect.height - dropdownRect.height, y)

  # flip from downwards to upwards (if needed and there is the space to)
  if direction is 'down' and y > windowRect.height - dropdownRect.height and selectionRect.y - dropdownRect.height > 0
    direction = 'up'
    y = selectionRect.y - dropdownRect.height
    if alignments[1] is alignments[3]
      y += selectionRect.height

  # flip from upwards to downwards (if needed and there is the space to)
  else if direction is 'up' and y < 0 and selectionRect.y + selectionRect.height +  dropdownRect.height < windowRect.height
    direction = 'down'
    y = selectionRect.y + selectionRect.height
    if alignments[1] is alignments[3]
      y -= selectionRect.height

  # flip from right to left (if needed and there is the space to)
  else if direction is 'right' and x > windowRect.width - dropdownRect.width and selectionRect.x - dropdownRect.width > 0
    direction = 'left'
    x = selectionRect.x - dropdownRect.width

  # flip from upwards to downwards (if needed and there is the space to)
  else if direction is 'left' and x < 0 and selectionRect.x + selectionRect.width +  dropdownRect.width < windowRect.width
    direction = 'right'
    x = selectionRect.x + selectionRect.width

  return {
    x: x,
    y: y,
    direction: direction
  }
