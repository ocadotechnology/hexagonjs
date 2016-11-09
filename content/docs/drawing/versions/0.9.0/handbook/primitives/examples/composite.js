var drawing = new hx.Drawing('#composite-example');

drawing.enablePan();
drawing.enableZoom();
drawing.camera.setupBounds(0.25, 10, -100, -100, 100, 100);

function createFace() {
  var composite = drawing.create('composite');

  composite.create('rectangle', 'face');
  composite.create('rectangle', 'lefteye');
  composite.create('rectangle', 'righteye');
  composite.create('rectangle', 'lips');

  composite.set('face.width', 10);
  composite.set('face.height', 10);
  composite.set('face.position.x', -5);
  composite.set('face.position.y', -5);
  composite.set('face.fill.color', '#996622');

  composite.set('lefteye.width', 2);
  composite.set('lefteye.height', 2);
  composite.set('lefteye.position.x', -3);
  composite.set('lefteye.position.y', -3);
  composite.set('lefteye.fill.color', '#FFF');

  composite.set('righteye.width', 2);
  composite.set('righteye.height', 2);
  composite.set('righteye.position.x', 1);
  composite.set('righteye.position.y', -3);
  composite.set('righteye.fill.color', '#FFF');

  composite.set('lips.width', 6);
  composite.set('lips.height', 1);
  composite.set('lips.position.x', -3);
  composite.set('lips.position.y', 2);
  composite.set('lips.fill.color', '#FFF');

  return composite;
}


var face1 = createFace();
var face2 = createFace();
var face3 = createFace();

// each composite objects that have been created can be acted on as if they are a single object
face1.set('face.fill.color', '#225599');
face1.set('position.x', 0);
face1.set('angle', -0.5);

face2.set('face.fill.color', '#552299');
face2.set('position.x', 20);
face2.set('scale', 1.5);

face3.set('face.fill.color', '#995522');
face3.set('position.x', 40);
face3.set('angle', 0.5);


// make the drawing fit the canvas
drawing.show(drawing, 1.5);