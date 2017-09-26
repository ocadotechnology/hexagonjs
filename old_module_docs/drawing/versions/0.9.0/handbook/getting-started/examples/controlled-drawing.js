var drawing = new hx.Drawing('#controlled-drawing');

drawing.enablePan();
drawing.enableZoom();

var rect = drawing.create('rectangle');
rect.set('position.x', -25)
rect.set('position.y', -25)
rect.set('width', 50);
rect.set('height', 50);
rect.set('fill.color', '#335544');
