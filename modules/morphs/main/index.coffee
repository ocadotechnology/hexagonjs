# built in animations and morphs

hx.morph.register 'fadeout', (node, duration=100) ->
  hx.animate(node).style('opacity', 0, duration)

hx.morph.register 'fadein', (node, duration=100) ->
  hx.animate(node).style('opacity', 1, duration)

# should only be used for size values
getStyles = (selection, properties) ->
  if selection.style('display') isnt 'none'
    {name: p, value: selection.style(p)} for p in properties
  else
    {name: p, value: '0px'} for p in properties

clearAndGet = (selection, properties) ->
  {name: p, value: selection.style(p, '').style(p)} for p in properties

setStyles = (selection, properties) ->
  for item in properties
    selection.style(item.name, item.value)
  return

animateStyles = (selection, properties, duration) ->
  animation = selection.animate()
  for item in properties
    animation.style(item.name, item.value, duration)
  animation

hx.morph.register 'expand', (node, duration=100) ->

  properties = [
    'height',
    'padding-top',
    'padding-bottom',
    'margin-top',
    'margin-bottom',
    'width',
    'padding-left',
    'padding-right',
    'margin-left',
    'margin-right',
  ]

  # get the start and end style values
  selection = hx.select(node)
  start = getStyles(selection, properties)
  selection.style('display', '')
  end = clearAndGet(selection, properties)

  # restore the styles
  setStyles(selection, start)
  selection.classed 'hx-morph-hidden', true

  # animate the styles
  animateStyles(selection, end, duration)
    .on 'end', 'hx.morphs', (e) ->
      clearAndGet(selection, properties)
      selection.classed 'hx-morph-hidden', false

hx.morph.register 'expandv', (node, duration=100) ->

  properties = [
    'height',
    'padding-top',
    'padding-bottom',
    'margin-top',
    'margin-bottom'
  ]

  # get the start and end style values
  selection = hx.select(node)
  start = getStyles(selection, properties)
  selection.style('display', '')
  end = clearAndGet(selection, properties)

  # restore the styles
  setStyles(selection, start)
  selection.classed 'hx-morph-hidden', true

  # animate the styles
  animateStyles(selection, end, duration)
    .on 'end', 'hx.morphs', (e) ->
      clearAndGet(selection, properties)
      selection.classed 'hx-morph-hidden', false


hx.morph.register 'expandh', (node, duration=100) ->

  properties = [
    'width',
    'padding-left',
    'padding-right',
    'margin-left',
    'margin-right'
  ]

  # get the start and end style values
  selection = hx.select(node)
  start = getStyles(selection, properties)
  selection.style('display', '')
  end = clearAndGet(selection, properties)

  # restore the styles
  setStyles(selection, start)
  selection.classed 'hx-morph-hidden', true

  # animate the styles
  animateStyles(selection, end, duration)
    .on 'end', 'hx.morphs', (e) ->
      clearAndGet(selection, properties)
      selection.classed 'hx-morph-hidden', false

hx.morph.register 'collapse', (node, duration=100) ->
  selection = hx.select(node).classed('hx-morph-hidden', true)
  hx.animate(node)
    .style('height', '0px', duration)
    .style('padding-top', '0px', duration)
    .style('padding-bottom', '0px', duration)
    .style('margin-top', '0px', duration)
    .style('margin-bottom', '0px', duration)
    .style('width', '0px', duration)
    .style('padding-left', '0px', duration)
    .style('padding-right', '0px', duration)
    .style('margin-left', '0px', duration)
    .style('margin-right', '0px', duration)
    .on 'end', 'hx.morphs', (e) ->
      selection
        .style('display', 'none')
        .style('height', '')
        .style('padding-top', '')
        .style('padding-bottom', '')
        .style('margin-top', '')
        .style('margin-bottom', '')
        .style('width', '')
        .style('padding-left', '')
        .style('padding-right', '')
        .style('margin-left', '')
        .style('margin-right', '')
        .classed('hx-morph-hidden', false)

hx.morph.register 'collapsev', (node, duration=100) ->
  selection = hx.select(node).classed('hx-morph-hidden', true)
  hx.animate(node)
    .style('height', '0px', duration)
    .style('padding-top', '0px', duration)
    .style('padding-bottom', '0px', duration)
    .style('margin-top', '0px', duration)
    .style('margin-bottom', '0px', duration)
    .on 'end', 'hx.morphs', (e) ->
      selection
        .style('display', 'none')
        .style('height', '')
        .style('padding-top', '')
        .style('padding-bottom', '')
        .style('margin-top', '')
        .style('margin-bottom', '')
        .classed('hx-morph-hidden', false)

hx.morph.register 'collapseh', (node, duration=100) ->
  selection = hx.select(node).classed('hx-morph-hidden', true)
  hx.animate(node)
    .style('width', '0px', duration)
    .style('padding-left', '0px', duration)
    .style('padding-right', '0px', duration)
    .style('margin-left', '0px', duration)
    .style('margin-right', '0px', duration)
    .on 'end', 'hx.morphs', (e) ->
      selection
        .style('display', 'none')
        .style('width', '')
        .style('padding-left', '')
        .style('padding-right', '')
        .style('margin-left', '')
        .style('margin-right', '')
        .classed('hx-morph-hidden', false)

hx.morph.register 'rotate-90', (node, duration=100) ->
  hx.animate(node)
    .style('-webkit-transform', 'matrix(1, 0, 0, 1, 0, 0)', 'matrix(0, 1, -1, 0, 0, 0)', duration)
    .style('transform', 'matrix(1, 0, 0, 1, 0, 0)', 'matrix(0, 1, -1, 0, 0, 0)', duration)
    .on 'end', 'hx.morphs', ->
      hx.select(node)
        .style('transform', '')
        .style('-webkit-transform', '')
    .on 'cancel', 'hx.morphs', ->
      hx.select(node)
        .style('transform', '')
        .style('-webkit-transform', '')

hx.morph.register 'rotate-0', (node, duration=100) ->
  hx.animate(node)
    .style('-webkit-transform', 'matrix(0, 1, -1, 0, 0, 0)', 'matrix(1, 0, 0, 1, 0, 0)', duration)
    .style('transform', 'matrix(0, 1, -1, 0, 0, 0)', 'matrix(1, 0, 0, 1, 0, 0)', duration)
    .on 'end', 'hx.morphs', ->
      hx.select(node)
        .style('transform', '')
        .style('-webkit-transform', '')
    .on 'cancel', 'hx.morphs', ->
      hx.select(node)
        .style('transform', '')
        .style('-webkit-transform', '')

class Delay extends hx.EventEmitter
  constructor: (duration) ->
    super
    @timeout = setTimeout((=> @emit('end')), duration)

  cancel: => clearTimeout(@timeout)

hx.morph.register 'delay', (node, duration=100) ->
  new Delay(duration)


