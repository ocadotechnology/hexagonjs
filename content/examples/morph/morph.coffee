
# fills the dropdown with some content (for this example)
makeGraph = (selector) ->
  node = hx.select(selector).append('div').classed('graph', true).node()
  graph = new hx.Graph(node)
  axis = graph.addAxis()
  axis.xScalePaddingMax = 0.1
  axis.xScalePaddingMin = 0.1
  axis.yScalePaddingMax = 0.1
  axis.yScalePaddingMin = 0.1
  series = axis.addSeries('scatter', 'Scatter Series')
  data = hx.range(100).map (d) ->
    x: d/10 + Math.random()*2
    y: d*d/10 + Math.random()*2
    color: hx.cycle(hx.theme.plot.colors, d)

  series.setData data
  graph.render()


selection = hx.select('#container')

makeGraph(selection.node())

node = selection.node()

# these animations are extra slow, so you can see what is happening

morph = undefined

hx.select('#btn-1').on 'click', ->
  if morph isnt undefined then morph.cancel()
  morph = hx.morph(node)
    .with('expand', 500)
    .then('fadein', 500)
    .thenStyle('background-color', hx.theme.plot.colors[2], 500)
    .thenStyle('background-color', hx.theme.plot.colors[5], 500)
    .then => morph = undefined
    .go()

hx.select('#btn-2').on 'click', ->
  if morph isnt undefined then morph.cancel()
  morph = hx.morph(node)
    .with('fadeout', 500)
    .then('collapse', 500)
    .then => hx.select(node).style('background-color', hx.theme.plot.colors[5])
    .then => hx.select(node).style('background-color', hx.theme.plot.colors[2])
    .then => morph = undefined
    .go()









