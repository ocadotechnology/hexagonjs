tree = new hx.Tree('#tree', {
  renderer:(element, datum) ->
    hx.select(element)
      .text(datum.name)
      .style('color', hx.theme.palette[datum.color])
})

hx.json 'data.json', (error, data) -> tree.items(data)
