var drawing = new hx.Drawing('#drawing-example');
drawing.enablePan();
drawing.enableZoom();
drawing.camera.setupBounds(0.25, 10, -100, -100, 100, 100);


var colors = [
  'rgb(192,46,29)',
  'rgb(241,108,32)',
  'rgb(236,170,56)',
  'rgb(92,167,147)',
  'rgb(17,120,153)',
  'rgb(13,60,85)'
];

// create a circle
var circle = drawing.create('circle');
circle.set('position.x', -80);
circle.set('fill.color', colors[0]);
circle.set('radius', 10);

// create a rectangle
var rectangle = drawing.create('rectangle');
rectangle.set('position.x', -60);
rectangle.set('position.y', -10);
rectangle.set('height', 20);
rectangle.set('width', 20);
rectangle.set('fill.color', colors[1]);

// create a text object
var text = drawing.create('text');
text.set('position.x', -35);
text.set('color', colors[2]);
text.set('text', 'text');
text.set('align.y', 'middle');

// create a line
var line = drawing.create('line');
line.set('start.x', -5);
line.set('end.x', 15);
line.set('color', colors[3]);

// create a grid
var grid = drawing.create('grid');
grid.set('position.x', 20);
grid.set('position.y', -12.5);
grid.set('gridSize.x', 5);
grid.set('gridSize.y', 5);
grid.set('cellSize.x', 5);
grid.set('cellSize.y', 5);
grid.set('gridLines.color', colors[4]);

// create a shape (described with a cubic curve)
var shape = drawing.create('shape');
shape.set('position.x', 60);
shape.set('fill.color', colors[5]);

var edges = 10;
var size = 10;

//construct a curve to draw
var curve = hx.range(edges+1).map(function(i){
  return [
    Math.sin((2*i + 1) * Math.PI / edges) * size,
    Math.cos((2*i + 1) * Math.PI / edges) * size,
    Math.sin((2*i + 2) * Math.PI / edges) * size*0.5,
    Math.cos((2*i + 2) * Math.PI / edges) * size*0.5
  ]
});

shape.set('curve', curve);

// make the drawing fit the canvas
drawing.show(drawing, 2);