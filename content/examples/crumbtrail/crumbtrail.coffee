crumbtrail = new hx.Crumbtrail("#crumbs")

renderer = (element, datum) ->

  if datum.action
    switch datum.action.type
      when 'url'
        hx.select(element)
          .append('a')
          .prop('target', datum.action.target)
          .prop('href', datum.action.url or '')
          .text(datum.name)

      when 'notification'
        hx.select(element)
          .style('color', hx.theme.palette.warningCol)
          .style('cursor', 'pointer')
          .text(datum.name)
          .on 'click', -> hx.notify().info(datum.action.message)

      when 'menu'
        hx.select(element)
          .style('color', hx.theme.palette.warningCol)
          .style('cursor', 'pointer')
          .text(datum.name)

        menu = new hx.Menu(element, 'click')
        menu.add(item) for item in datum.action.items

  else
    hx.select(element).text(datum.name)

json = [
  {
    "name": "First Node"
  },
  {
    "name": "Second Node",
    "action": {
      "type": "url",
      "url": "http://www.ocado.com/",
      "target": "_blank"
    }
  },
  {
    "name": "Third Node",
    "action": {
      "type": "notification",
      "message": "Third node selected"
    }
  },
  {
    "name": "Fourth Node",
    "action": {
      "type": "menu",
      "items": [
        "item1",
        "item2",
        "item3",
        "item4"
      ]
    }
  }
]

crumbtrail.render(json, renderer, '<i class="fa fa-angle-right"></i>')