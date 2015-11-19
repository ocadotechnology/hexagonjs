pie = new hx.PieChart('#graph')
pie.useLabels = false
pie.useSegmentText = true
pie.segmentTextFormatter = (segment) -> segment.size

pie.setData [
  {
    name: "Series 1"
    segments: [
      {
        name: "Segment 1",
        size: 10,
        color: hx.cycle(hx.theme.plot.colors ,0)
      },
      {
        name: "Segment 2",
        size: 10,
        color: hx.cycle(hx.theme.plot.colors ,1)
      },
      {
        name: "Segment 3",
        size: 80,
        color: hx.cycle(hx.theme.plot.colors ,2)
      }
    ]
  },
  {
    name: "Series 2"
    segments: [
      {
        name: "Segment 1",
        size: 90,
        color: hx.cycle(hx.theme.plot.colors ,3)
      },
      {
        name: "Segment 2",
        size: 20,
        color: hx.cycle(hx.theme.plot.colors ,4)
      },
      {
        name: "Segment 3",
        size: 30,
        color: hx.cycle(hx.theme.plot.colors ,5)
      }
    ]
  },
  {
    name: "Series 3"
    segments: [
      {
        name: "Segment 1",
        size: 90,
        color: hx.cycle(hx.theme.plot.colors ,6)
      },
      {
        name: "Segment 2",
        size: 20,
        color: hx.cycle(hx.theme.plot.colors ,7)
      },
      {
        name: "Segment 3",
        size: 30,
        color: hx.cycle(hx.theme.plot.colors ,8)
      }
    ]
  }
]

pie.render()