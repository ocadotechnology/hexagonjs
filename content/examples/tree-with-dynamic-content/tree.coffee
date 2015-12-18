data = [
  {
    "name": "parent 1",
    "children": [
      {
        "name": "parent 2",
        "children": [
          {
            "name": "item 1",
            "color": "action"
          },
          {
            "name": "item 2",
            "color": "positive"
          }
        ]
      },
      {
        "name": "parent 3",
        "children": [
          {
            "name": "item 3",
            "color": "warning"
          },
          {
            "name": "item 4",
            "color": "negative"
          }
        ]
      },
      {
        "name": "parent 4",
        "children": [
          {
            "name": "item 5",
            "color": "info"
          },
          {
            "name": "item 6",
            "color": "action"
          }
        ]
      }
    ]
  },
  {
    "name": "item 7"
  }
]


tree = new hx.Tree('#tree', {
  renderer:(element, datum) ->
    hx.palette.textContext(hx.select(element).text(datum.name).node(), datum.color)
  items: data
})