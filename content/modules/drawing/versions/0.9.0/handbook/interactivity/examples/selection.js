var drawing = new hx.Drawing('#selection-example');
drawing.enablePan();
drawing.enableZoom();
drawing.enableSelection();

drawing.camera.zoomMin = 0.25;
drawing.camera.zoomMax = 10.0;
drawing.camera.xMin = -100;
drawing.camera.yMin = -50;
drawing.camera.xMax = 100;
drawing.camera.yMax = 50;

// create a circle
var circle = drawing.create('circle');
circle.set('position.x', -25);
circle.set('fill.color', '#224466');
circle.set('radius', 10);
circle.set('selectable', true);

var circle = drawing.create('circle');
circle.set('position.x', 0);
circle.set('fill.color', '#446622');
circle.set('radius', 10);
circle.set('selectable', true);


var circle = drawing.create('circle');
circle.set('position.x', 25);
circle.set('fill.color', '#664422');
circle.set('radius', 10);
circle.set('selectable', true);

// make the drawing fit the canvas
drawing.show(drawing, 2);