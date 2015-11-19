
#define the data
data = [
  {
    "text":"Menu Item 1",
    "url":"/"
  },
  {
    "text":"Menu Item 2",
    "url":"/examples/menu"
  },
  {
    "text":"Menu Item 3",
    "url":"http://www.ocado.com/"
  }
]

#create the menu
menu = new hx.Menu("#menuButton")

#redefine the renderer for this menu
menu.renderer = (element, item) ->
  hx.select(element)
    .html(item.text)
    .on('click', -> document.location = item.url)

#render the data
menu.render(data)