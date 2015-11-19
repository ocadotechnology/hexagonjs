

data = {
  type: 'pie'
  series: {
    name: "Pie Chart"
    segments: [
      {
        name: "Segment 1"
        size: 10
        color: hx.theme.plot.colors[0]
      }
      {
        name: "Segment 2"
        size: 10
        color: hx.theme.plot.colors[1]
      }
      {
        name: "Segment 3"
        size: 80
        color: hx.theme.plot.colors[2]
      }
    ]
  }
}


hx.plot('#graph', data)
