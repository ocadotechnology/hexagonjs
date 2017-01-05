const hx = window.hx

function randomSign() {
  return Math.random() > 0.5 ? 1 : 0
}

function createData(a, b, c, type) {
  var offset = 0.1 + Math.random()
  return hx.range(50).map(function (i) {
    return {
      x: type === 'line' ? i : `REALLYLONGSTRING ${i}`,
      y: Math.abs(offset + a * Math.sin(i / 10) + b * Math.sin(i / 20) + c * Math.sin(i / 40) + Math.sin(i / 50) + Math.sin(i / 100))
    }
  })
}

function createGraph(type) {
  return hx.graph({
    axes: [{
      x: {
        title: 'Time',
        scaleType: type === 'line' ? 'linear' : 'discrete',
        formatter: (x) => {
          return `Overlapping ${x}`
        }
      },
      y: {
        title: 'Value',
        scalePaddingMax: 0.1
      },
      series: hx.theme.plot.colors.map(function (col, i) {
        return {
          type,
          options: {
            title: 'Series ' + (i + 1),
            data: createData(randomSign(), randomSign(), randomSign(), type),
            labelInterpolated: true,
            markersEnabled: true,
            strokeEnabled: true,
            strokeColor: col,
            fillEnabled: true,
            fillColor: hx.color(col).alpha(0.2).toString(),
            group: 'some-group'
          }
        }
      })
    }]
  }).style('height', '200px')
}

hx.select('body').append('div').class('hx-content').add(createGraph('line')).add(createGraph('bar'))
