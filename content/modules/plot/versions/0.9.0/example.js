
var graph = new hx.Graph('#graph');
var axis = graph.addAxis('linear', 'linear');
axis.xTitle = "time";
axis.yTitle = "value";
axis.yScalePaddingMax = 0.1

var randomSign = function(){
  return Math.random() > 0.5 ? 1 : 0;
}

var createData = function(a, b, c) {
  var off = 0.1 + Math.random();
  return hx.range(50).map(function(i){
    return {
      x: i,
      y: Math.abs(off + a*Math.sin(i/10) + b*Math.sin(i/20) + c*Math.sin(i/40) + Math.sin(i/50) + Math.sin(i/100))
    };
  });
}

hx.theme.plot.colors.forEach(function(col, i) {
  var series = axis.addSeries('line', 'Series ' + (i+1));
  series.setData(createData(randomSign(), randomSign(), randomSign()));
  series.color = col;
  series.markers = true;
  series.group = 'some-group';
  series.fill = true;
  series.fillColor = hx.color(col).alpha(0.2).toString();
  series.label.interpolate = true;
});

graph.render();