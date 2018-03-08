var drawing = new hx.Drawing('#basic-drawing');

var colors = [
  'rgb(192,46,29)',
  'rgb(241,108,32)',
  'rgb(236,170,56)',
  'rgb(92,167,147)',
  'rgb(17,120,153)',
  'rgb(13,60,85)'
];

var circle = drawing.create('circle');
circle.set('fill.color', colors[5]);

function randomCol() {
  return colors[Math.floor(Math.random()*6)];
}

drawing.on('update', function(i) {
  if(i%120==0){

    var x = (Math.random() - 0.5) * 200;
    var y = (Math.random() - 0.5) * 150;

    circle.set('position.x', x);
    circle.set('position.y', y);
    circle.set('fill.color', randomCol());

  }
});