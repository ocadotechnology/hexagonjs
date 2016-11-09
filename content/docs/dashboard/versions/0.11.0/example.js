// function that fills a node with a random pie chart for this example
function createPie(node, color) {
  var count = 10000
  var n1 = Math.random() * count
  var n2 = count - n1

  pie = new hx.PieChart(node);
  pie.setData({
    name: "Orders Dispatched",
    segments: [
      {
        name: "Completed",
        size: n1,
        color: color
      },
      {
        name: "Remaining",
        size: n2,
        color: '#EEE'
      }
    ]
  })
  pie.innerPadding = 0.8;
  pie.startAngle = Math.PI;
  pie.render();

  hx.select(node)
    .append('div')
    .class('status-text')
    .text(hx.format.si(3)(n1/count*100) + '%')
    .style('')

  // hack until we make graphs resize automatically
  setTimeout(function(){pie.render()}, 20);
}

dashboard = new hx.Dashboard('#example');

widget1 = dashboard.createWidget({ title: 'Widget 1', showMenu: true, showDragControl: true, height: "250px", id: 'one'});
widget1.menu.add([
  { name: 'Item 1', icon: 'fa-download'},
  { name: 'Item 2', icon: 'fa-share'},
  { name: 'Item 3', icon: 'fa-trash'}
]);
var widget2 = dashboard.createWidget({ title: 'Widget 2', id: 'two'});
var widget3 = dashboard.createWidget({ title: 'Widget 3', height: "300px", showDragControl: true, id: 'three'});

createPie(widget1.body.node(), hx.theme.plot.colors[1])

hx.select(widget2.body.node()).text('Text Example')

createPie(widget3.body.node(), hx.theme.plot.colors[3])




