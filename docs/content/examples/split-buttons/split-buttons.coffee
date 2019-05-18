
#define the data
data = [
  {
    "text":"Menu Item 1",
    "url":"#menu-1"
  },
  {
    "text":"Menu Item 2",
    "url":"#menu-2"
  },
  {
    "text":"Menu Item 3",
    "url":"#menu-3"
  }
]

#create the menu
menu = new hx.Menu("#btn-2", 'rtrb')

#redefine the renderer for this menu
menu.renderer (element, item) ->
  hx.select(element)
    .html(item.text)
    .on('click', -> document.location = item.url)

#render the data
menu.items(data)