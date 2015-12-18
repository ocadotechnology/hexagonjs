
makeContent = (selector) ->
  hx.select(selector)
    .add(hx.card()
      .add(hx.card.header.section().text('Header'))
      .add(hx.card.section().text('Content')))

selection = hx.select('#container')

makeContent(selection.node())

node = selection.node()

# these animations are intentionally slow, so you can see what is happening
morph = undefined

animateSpeed = 500

hx.select('#btn-1').on 'click', ->
  if morph isnt undefined then morph.cancel()
  morph = hx.morph(node)
    .with('expand', animateSpeed)
    .then('fadein', animateSpeed)
    .then => morph = undefined
    .go()

hx.select('#btn-2').on 'click', ->
  if morph isnt undefined then morph.cancel()
  morph = hx.morph(node)
    .with('fadeout', animateSpeed)
    .then('collapse', animateSpeed)
    .then => morph = undefined
    .go()