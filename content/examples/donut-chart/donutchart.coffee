pie = new hx.PieChart('#graph')
pie.innerPadding = 0.5
pie.segmentPadding = 0.05

pie.setData {
  name: 'Series 1'
  segments: [
    {
      name: 'Segment 1'
      size: 90,
      color: hx.cycle(hx.theme.plot.colors, 3)
    },
    {
      name: 'Segment 2'
      size: 20,
      color: hx.cycle(hx.theme.plot.colors, 4)
    },
    {
      name: 'Segment 3'
      size: 30,
      color: hx.cycle(hx.theme.plot.colors, 5)
    }
  ]
}

pie.render()