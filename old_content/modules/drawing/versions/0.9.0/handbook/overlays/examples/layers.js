var drawing = new hx.Drawing('#layers-example');

var layer1 = drawing.createLayer();
var layer2 = drawing.createLayer();

createArea = function(x, colIndex) {
  var circle = layer1.create('circle');
  circle.set('position.x', x);
  circle.set('fill.color', hx.color.dark[colIndex]);
  circle.set('radius', 10);
  circle.set('selectable', true);

  hx.range(100).forEach(function(){
    var miniCircle = layer2.create('circle');

    var normal = hx.color.dark[colIndex]
    var lighter = new hx.Color(hx.color.dark[colIndex]).lighten(0.5).toString()
    var cr = function(x) {
      return  new hx.Color(normal).mix(new hx.Color(lighter), x).toString()
    }

    dist = Math.random()*9.5
    angle = Math.random()*Math.PI*2
    miniCircle.set('position.x', x + Math.cos(angle)*dist);
    miniCircle.set('position.y', Math.sin(angle)*dist);
    miniCircle.set('fill.color', cr(Math.random()));
    miniCircle.set('radius', 0.5);
    miniCircle.set('selectable', true);
  });
}

createArea(-25, 1);
createArea(0, 2);
createArea(25, 3);

drawing.show(drawing, 1.1);

// setup the toggle button
hx.initialiseToggleButtons('#toggle');

drawing.showLayer(layer1);

hx.select('#toggle').on('click', function(){
  if(hx.select('#toggle').attr('data')=='true'){
    drawing.showLayer(layer1);
  } else {
    drawing.showLayer(layer2);
  }
}, true);