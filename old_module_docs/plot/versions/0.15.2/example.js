
var graph = new hx.Graph('#graph')
var axis = graph.addAxis({
  x: {
    title: 'Time'
  },
  y: {
    title: 'Value',
    scalePaddingMax: 0.1
  }
})

var randomSign = function(){
  return Math.random() > 0.5 ? 1 : 0
}

var createData = function(a, b, c) {
  var offset = 0.1 + Math.random()
  return hx.range(50).map(function(i){
    return {
      x: i,
      y: Math.abs(offset + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + Math.sin(i/50) + Math.sin(i/100))
    }
  })
}

hx.theme.plot.colors.forEach(function(col, i) {
  axis.addSeries('line', {
    title: 'Series ' + (i+1),
    data: createData(randomSign(), randomSign(), randomSign()),
    labelInterpolated: true,
    markersEnabled: true,
    strokeEnabled: true,
    strokeColor: col,
    fillEnabled: true,
    fillColor: hx.color(col).alpha(0.2).toString(),
    group: 'some-group'
  })
})

graph.render()