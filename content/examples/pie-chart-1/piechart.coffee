pie = new hx.PieChart('#graph')

pie.setData {
  name: "Pie Chart"
  segments: [
    {
      name: "Segment 1"
      size: 10
      color: hx.cycle(hx.theme.plot.colors ,0)
    }
    {
      name: "Segment 2"
      size: 10
      color: hx.cycle(hx.theme.plot.colors ,1)
    }
    {
      name: "Segment 3"
      size: 80
      color: hx.cycle(hx.theme.plot.colors ,2)
    }
  ]
}

pie.render()

