
# define some data
createTable = (element, widget) ->
  el = hx.select(element).append('div').style('height', '100%')
  table = new hx.Table(el.node())
  table.setData {
    head:{
      columns:[
        {value:"Name"},
        {value:"PPH"},
        {value:"Current Aisle"}
      ]
    },
    body:[
      [ "Ganesh", "256", "AZP3D" ]
      [ "Steve", "512", "CZP2B" ]
      [ "Keith", "765", "AZP3D" ]
      [ "Laszlo", "68", "AZP3D" ]
      [ "Kate", "244", "AZP3C" ]
      [ "Superman", "19372", "AZP3D" ]
      [ "Bob", "534", "AZP1D" ]
      [ "Jan", "256", "AZP3D" ]
    ]
  }

  table.sort('PPH', 'desc')
  table.render()

menuItems = [
  {name: 'Share', icon: 'fa-share-alt'}
  {name: 'Info', icon: 'fa-info-circle'}
  {name: 'Export', icon: 'fa-download'}
  {name: 'Remove', icon: 'fa-trash', select: (widget) -> widget.remove() }
]


# create the dashboard
dashboard = new hx.Dashboard('#dashboard')

# create widgets in the dashboard
dashboard.createWidget
  title: 'LEADERBOARD 1',
  menu: menuItems
  setup: (element, widget) -> createTable(element, widget)

dashboard.createWidget
  title: 'LEADERBOARD 2',
  menu: menuItems
  setup: (element, widget) -> createTable(element, widget)

dashboard.createWidget
  title: 'LEADERBOARD 3',
  menu: menuItems
  setup: (element, widget) -> createTable(element, widget)