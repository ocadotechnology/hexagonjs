
# returns the collapsible content for a row
getCollapsibleContent = (rowNode, i) ->
  data = {
    "head":{
      "columns":[
        { "value":"Name" },
        { "value":"Age" },
        { "value":"Gender" },
        { "value":"Locale" },
        { "value":"Employed" },
        { "value":"Salary (£)" }
      ]
    },
    "body":[
      [
        "Bob",
        "23",
        "Male",
        "UK",
        "2014-12-11T04:44:16Z",
        "20000"
      ],
      [
        "Kate",
        "35",
        "Female",
        "US",
        "2014-09-12T08:15:00+00:00",
        "23000"
      ],
      [
        "Steve",
        "10",
        "Male",
        "US",
        "1418273056000",
        "25000.12"
      ],
      [
        "Alejandro the third",
        "1",
        "Male",
        "US",
        "2012-10-28",
        "19000"
      ],
      [
        "Kelly",
        "11",
        "Female",
        "UK",
        "2011-12-05",
        "15000"
      ],
      [
        "Jan",
        "15",
        "Female",
        "EU",
        "2001-01-02",
        "90000"
      ]
    ]
  };

  div = hx.detached('div')
    .class('table-container')
    .node()

  table = new hx.Table(div, {showSelection: true, useResponsive: false});
  table.setData(data);

  return div

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
      .style('background', 'transparent')
      .append('td').attr('colspan', 999)
      .append(getCollapsibleContent(rowNode, i))

    # insert an extra invisible row to keep the striping looking the same
    selection.insertAfter('tr').style('display', 'none')

# attach click handlers to all rows in the table
hx.select('#my-table')
  .select('tbody')
  .selectAll('tr')
  .each (rowNode, i) ->
    hx.select(rowNode)
      .on('click', -> toggleRow(rowNode, i))
