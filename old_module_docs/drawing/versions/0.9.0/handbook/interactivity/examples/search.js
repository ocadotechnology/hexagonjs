var drawing = new hx.Drawing('#search-example');
drawing.enablePan();
drawing.enableZoom();
drawing.enableSelection();
drawing.enableSearchbox();

// helper for setting up the bounds for the camera
drawing.camera.setupBounds(0.25, 10, -100, -50, 100, 50);

drawing.on('search', function(searchTerm){
  var obj = drawing.find(searchTerm);
  if (obj) {
    drawing.select(obj);
    drawing.show(obj);
  }
});

// create a circle
var circle = drawing.create('circle', 'circle-1');
circle.set('position.x', -25);
circle.set('fill.color', '#224466');
circle.set('radius', 10);
circle.set('selectable', true);

var circle = drawing.create('circle', 'circle-2');
circle.set('position.x', 0);
circle.set('fill.color', '#446622');
circle.set('radius', 10);
circle.set('selectable', true);


var circle = drawing.create('circle', 'circle-3');
circle.set('position.x', 25);
circle.set('fill.color', '#664422');
circle.set('radius', 10);
circle.set('selectable', true);

// make the drawing fit the canvas
drawing.show(drawing, 2);