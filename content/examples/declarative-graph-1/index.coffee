
createData = (z, a, b, c, d, e) ->
  for i in [0..20]
    x: i
    y: z + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + d*Math.sin(i/50) + e*Math.sin(i/100)


data = {
  axes: [
    {
      xTitle: 'time',
      yTitle: 'value',
      xType: 'discrete'
      series: [
        {
          name: 'Line Series 1',
          type: 'bar',
          data: createData(0, 1, 1, 1, 1, 1),
          color: hx.theme.plot.colors[0],
          markers: true,
          fill: true,
          label: {
            interpolate: true
          }
          group: 'group-1'
        },
        {
          name: 'Line Series 2',
          type: 'bar',
          data: createData(1, -1, 1, -1, 1, -1),
          color: hx.theme.plot.colors[1],
          markers: true,
          fill: true,
          label: {
            interpolate: true
          }
          group: 'group-1'
        },
        {
          name: 'Line Series 3',
          type: 'bar',
          data: createData(2, 1, -1, -1, -1, 1),
          color: hx.theme.plot.colors[2],
          markers: true,
          fill: true,
          label: {
            interpolate: true
          }
          group: 'group-2'
        },
        {
          name: 'Line Series 4',
          type: 'bar',
          data: createData(1, 1, -1, -1, -1, 1),
          color: hx.theme.plot.colors[3],
          markers: true,
          fill: true,
          label: {
            interpolate: true
          }
          group: 'group-2'
        }
      ]
    }
  ]
}


hx.plot('#graph', data)
