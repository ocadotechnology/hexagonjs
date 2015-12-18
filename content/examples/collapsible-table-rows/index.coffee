
# returns the collapsible content for a row
getCollapsibleContent = (rowNode, i) ->
  hx.detached('div')
    .class('hx-margin')
    .text('Content for row ' + (i+1))

toggleRow = (rowNode, i) ->
  selection = hx.select(rowNode)

  isOpen = selection.classed('open')

  if isOpen
    selection.classed('open', false)
    hx.select(rowNode.nextSibling).remove()
    hx.select(rowNode.nextSibling).remove()

  else
    selection.classed('open', true)

    # add an extra row to hold the collapsible content
    selection.insertAfter('tr')
      .append('td').attr('colspan', 999)
      .append(getCollapsibleContent(rowNode, i))

    # insert an extra invisible row to keep the striping looking the same
    selection.insertAfter('tr').style('display', 'none')

# attach click handlers to all rows in the table
hx.select('#my-table')
  .select('tbody')
  .selectAll('tr')
  .forEach (rowNode, i) ->
    rowNode.on('click', -> toggleRow(rowNode.node(), i))
