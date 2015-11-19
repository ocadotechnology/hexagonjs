var drawing = new hx.Drawing('#layers-zoom-example');

drawing.enableZoom();

drawing.camera.zoomMin = 0.25;
drawing.camera.zoomMax = 10.0;

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


layer1.setAlphaCurve('halfsaw', 2, 1);
layer2.setAlphaCurve('halfsaw', 1, 2);