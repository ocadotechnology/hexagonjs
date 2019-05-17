items = [
  { text: 'Red', value: 'red' },
  { text: 'Green', value: 'green' },
  { text: 'Blue', value: 'blue' }
]

picker = new hx.InlinePicker('#picker-2')
  .renderer (node, item) -> hx.select(node).text(item.text)
  .items(items)
  .value('red')
  .on 'change', (d) -> console.log(d)
