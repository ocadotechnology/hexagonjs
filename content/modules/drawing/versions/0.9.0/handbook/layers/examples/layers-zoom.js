var drawing = new hx.Drawing('#layers-zoom-example');

var colors = [
  'rgb(192,46,29)',
  'rgb(241,108,32)',
  'rgb(236,170,56)',
  'rgb(92,167,147)',
  'rgb(17,120,153)',
  'rgb(13,60,85)'
];

drawing.enableZoom();

drawing.camera.zoomMin = 0.25;
drawing.camera.zoomMax = 10.0;

var layer1 = drawing.createLayer();
var layer2 = drawing.createLayer();

createArea = function(x, colIndex) {
  var circle = layer1.create('circle');
  circle.set('position.x', x);
  circle.set('fill.color', colors[colIndex]);
  circle.set('radius', 10);
  circle.set('selectable', true);

  hx.range(100).forEach(function(){
    var miniCircle = layer2.create('circle');

    var normal = colors[colIndex]
    var lighter = hx.color(colors[colIndex]).lighten(0.5).toString()
    var cr = function(x) {
      return  hx.color(normal).mix(hx.color(lighter), x).toString()
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


layer1.setAlphaCurve('ramp', 2, 1);
layer2.setAlphaCurve('ramp', 1, 2);