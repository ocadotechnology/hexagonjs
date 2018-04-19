
replaceWithDiv = (sel) ->
  replacement = hx.div('hx-logo')
  sel.insertBefore(replacement)
  sel.remove()

replaceLogos = () ->
  logos = hx.selectAll('img.hx-logo')
  if logos.size()
    hx.consoleWarning('Logo:', 'The .hx-logo class should only be applied to <div> elements.', 'You supplied: ', logos.nodes)
    logos.forEach(replaceWithDiv)

replaceLogos()
