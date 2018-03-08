pie = new hx.PieChart('#donut-chart',{
  innerPadding: 0.5
  segmentPadding: 0.05
})

pie.data {
  title: 'Series 1'
  segments: [
    {
      name: 'Segment 1'
      size: 90,
      fillColor: hx.cycle(hx.theme.plot.colors, 3)
    },
    {
      name: 'Segment 2'
      size: 20,
      fillColor: hx.cycle(hx.theme.plot.colors, 4)
    },
    {
      name: 'Segment 3'
      size: 30,
      fillColor: hx.cycle(hx.theme.plot.colors, 5)
    }
  ]
}

pie.render()