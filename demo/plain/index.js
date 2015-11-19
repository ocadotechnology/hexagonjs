container = hx.select('body').append('div')

slider = new hx.Slider(container.append('div').class('hx-pad').append('div'))
pie = new hx.PieChart(container.append('div').style('height', '500px'), {
  segmentPadding: 0.1
})

pie.data({
  name: 'Pie Chart',
  segments: hx.range(Math.floor(slider.value() * 1000)).map(function (i) {
    return {
      name: 'Segment ' + i,
      size: i,
      color: hx.cycle(hx.theme.plot.colors, i)
    }
  })
}).render()

slider.on('change', function () {
  pie.data({
    name: 'Pie Chart',
    segments: hx.range(Math.floor(slider.value() * 1000)).map(function (i) {
      return {
        name: 'Segment ' + i,
        size: i,
        color: hx.cycle(hx.theme.plot.colors, i)
      }
    })
  }).render()
})
