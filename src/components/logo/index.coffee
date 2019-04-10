replaceWithDiv = (sel) ->
  sel.replace(hx.div('hx-logo'))

initLogos = () ->
  logos = hx.selectAll('img.hx-logo')
  if logos.size()
    hx.consoleWarning('Logo:', 'The .hx-logo class should only be applied to <div> elements.', 'You supplied: ', logos.nodes)
    logos.forEach(replaceWithDiv)

export { initLogos }
