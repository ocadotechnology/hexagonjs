enterEditMode = (toggle, content) ->
  hx.select(content).select('.name').value(hx.select(toggle).text())
  hx.select(content).select('.confirm').on 'click', =>
    hx.select(data.toggle).text(hx.select(data.content).select('.name').value())
    this.hide()

exitEditMode = (toggle, content) ->
  hx.select(toggle).style('display', '')

new hx.InlineMorphSection('#container2', enterEditMode, exitEditMode)
