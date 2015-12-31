beforePrint = ->
  links = hx.detached('ol')
  refs = []

  hx.select('body').selectAll('*').forEach (sel) ->
    if sel.node().nodeName is 'A' and not sel.classed('.hx-btn')
      thisRef = sel.attr('href')
      if thisRef and thisRef.length and thisRef isnt '#'
        existingIndex = refs.indexOf(thisRef)
        if existingIndex is -1
          refs.push(thisRef)
          itemIndex = refs.length - 1
        else
          itemIndex = existingIndex
        sel.add(hx.detached('sup').class('hx-footnote-ref hx-print-only').text('[' + (Number(itemIndex) + 1) + ']'))

  refs.forEach (ref) ->
    links.add(hx.detached('li').text(ref))

  if refs.length > 0
    hx.select('body')
      .add(hx.detached('div').class('hx-footnote-links hx-print-only')
        .add('hr')
        .add(hx.detached('h2').text('Links'))
        .add(links))
  return

afterPrint = ->
  hx.selectAll('.hx-footnote-ref').remove()
  hx.selectAll('.hx-footnote-links').remove()
  return

if window.matchMedia
  mediaQueryList = window.matchMedia('print')
  mediaQueryList.addListener (mql) ->
    if mql.matches
      beforePrint()
    else
      afterPrint()
    return

window.onbeforeprint = beforePrint
window.onafterprint = afterPrint
