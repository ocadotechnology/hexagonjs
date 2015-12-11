graph = new hx.Graph('#graph')

axis1 = graph.addAxis({
  x: {
    title: 'time'
  },
  y: {
    title: 'value',
    min: 0
  }
})
axis2 = graph.addAxis({
  x: {
    title: 'time',
    visible: false
  },
  y: {
    title: 'another value',
    min: 0
  }
})

data1 = for i in [0..500]
  x: i
  y: 5+Math.sin(i/10) + Math.sin(i/20) + Math.sin(i/40) + Math.sin(i/50) + Math.sin(i/100)

axis1.addSeries('line', {
  title: 'Area Series 1',
  data: data1,
  strokeColor: hx.color(hx.theme.plot.colors[0]).alpha(0.2).toString(),
  fillEnabled: true
})

data2 = for i in [0..500]
  x: i
  y: 3+Math.sin(i/10) - Math.sin(i/20) - Math.sin(i/40) - Math.sin(i/50) + Math.sin(i/100)

axis2.addSeries('line', {
  title: 'Area Series 2',
  data: data2,
  strokeColor: hx.color(hx.theme.plot.colors[1]).alpha(0.2).toString(),
  fillEnabled: true
})

graph.render()