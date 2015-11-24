# TODO: rewrite with quantum

# global variables/constants
speed = 0.5
size = 32
spacing = 3.4
hexGridWidth = 15
hexGridHeight = 14
hue = 169


# set up the drawing
drawing = new dx.Drawing('#background')

drawing.camera.zoom = 2
drawing.camera.position.x = size * (hexGridWidth - 0.5) * spacing / 2
drawing.camera.position.y = size * (hexGridHeight - 0.5) / 2

# create the grid
hexagonCurve = ([Math.sin((2*i + 1) * Math.PI / 6) * size, Math.cos((2*i + 1) * Math.PI / 6) * size] for i in [0...6])

colors = [
  'rgba(255, 255, 255, 0.1)',
  'rgba(255, 255, 255, 0.2)',
  'rgba(255, 255, 255, 0.3)',
  'rgba(255, 255, 255, 0.4)',
  'rgba(255, 255, 255, 0.5)',
  'rgba(255, 255, 255, 0.6)'
]

hexGrid =
  for x in [0..hexGridWidth-1]
    for y in [0..hexGridHeight-1]
      hex = drawing.create('shape')
      hex.set('polygon', hexagonCurve)
      hex.set('position.x', size*spacing*x + size*spacing/2 * (y % 2))
      hex.set('position.y', size*1*y)
      hex.set('fill.enabled', true)
      hex.set('fill.color', colors[1])
      object =
        generationsAlive: 0
        drawingObject: hex
        alive: Math.random() > 0.5
        nextAlive: false
      object

# utility methods for the grid
getSurroundingCells = (x, y) ->
  xx = x + (y % 2) - 1
  [
    hexGrid[xx]?[y-1]
    hexGrid[x]?[y-2]
    hexGrid[xx+1]?[y-1]
    hexGrid[xx]?[y+1]
    hexGrid[x]?[y+2]
    hexGrid[xx+1]?[y+1]
  ].filter((d) -> d?)

getSecondarySurroundingCells = (x, y) ->
  xx = x + (y % 2) - 1
  [
    hexGrid[x-1]?[y]
    hexGrid[xx]?[y-3]
    hexGrid[xx]?[y+3]
    hexGrid[xx+1]?[y-3]
    hexGrid[xx+1]?[y+3]
    hexGrid[x+1]?[y]
  ].filter((d) -> d?)

iterateGrid = (f) ->
  for x in [0..hexGridWidth-1]
    for y in [0..hexGridHeight-1]
      f(x, y, hexGrid[x][y])
  undefined

last = (new Date()).getTime()

# main loop
drawing.on 'update', ->

  hue = (hue + 0.1) % 360

  # control the update rate
  if (new Date()).getTime() - last >= 100/speed
    last = (new Date()).getTime()

    # draw
    iterateGrid (x, y, cell) ->
      cell.alive = Math.random() > 0.5
      cell.generationsAlive = if cell.alive then cell.generationsAlive+1 else 0
      color = colors[Math.min(cell.generationsAlive, 4)+1]
      cell.drawingObject.set('fill.color', color, 250)


dx.select(window).on 'scroll', ->
  dx.select('.docs-titlebar-logo')
    .classed('docs-animate', true)
    .classed('docs-visible', window.scrollY > 100)

dx.select('.docs-titlebar-logo')
  .classed('docs-visible', window.scrollY > 100)


