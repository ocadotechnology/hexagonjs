pie = new hx.PieChart('#multi-series-pie-chart',{
  labelsEnabled: false
  segmentTextEnabled: true
  segmentTextFormatter:(segment) -> segment.size
})

pie.data [
  {
    title: "Series 1"
    segments: [
      {
        name: "Segment 1",
        size: 10,
        fillColor: hx.cycle(hx.theme.plot.colors ,0)
      },
      {
        name: "Segment 2",
        size: 10,
        fillColor: hx.cycle(hx.theme.plot.colors ,1)
      },
      {
        name: "Segment 3",
        size: 80,
        fillColor: hx.cycle(hx.theme.plot.colors ,2)
      }
    ]
  },
  {
    title: "Series 2"
    segments: [
      {
        name: "Segment 1",
        size: 90,
        fillColor: hx.cycle(hx.theme.plot.colors ,3)
      },
      {
        name: "Segment 2",
        size: 20,
        fillColor: hx.cycle(hx.theme.plot.colors ,4)
      },
      {
        name: "Segment 3",
        size: 30,
        fillColor: hx.cycle(hx.theme.plot.colors ,5)
      }
    ]
  },
  {
    title: "Series 3"
    segments: [
      {
        name: "Segment 1",
        size: 90,
        fillColor: hx.cycle(hx.theme.plot.colors ,6)
      },
      {
        name: "Segment 2",
        size: 20,
        fillColor: hx.cycle(hx.theme.plot.colors ,7)
      },
      {
        name: "Segment 3",
        size: 30,
        fillColor: hx.cycle(hx.theme.plot.colors ,8)
      }
    ]
  }
]

pie.render()