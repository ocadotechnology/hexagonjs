var all, clickFast, clicks, count, last10, selection, total, unlock, unlocked;

all = false;

count = 0;

unlocked = 0;

total = 6;

last10 = [];

clickFast = false;

unlock = function(msg) {
  unlocked++;
  return hx.notify.info('Achievement Unlocked (' + unlocked + '/' + total + '): ' + msg);
};

selection = dx.select('.docs-example-body').selectAll('.hx-btn');

clicks = dx.range(selection.size()).map(function(d) {
  return false;
});

selection.forEach(function(node, i) {
  return node.on('click', function() {
    var millis;
    count++;
    clicks[i] = true;
    if (clicks.indexOf(false) === -1 && !all) {
      all = true;
      unlock('Clicked every button!');
    }
    millis = Date.now();
    last10.push(millis);
    last10 = last10.slice(-10);
    if (dx.max(last10) - dx.min(last10) < 1200 && last10.length === 10 && !clickFast) {
      unlock('Click really really fast!');
      clickFast = true;
    }
    if (count === 10) {
      return unlock('Clicked 10 buttons!');
    } else if (count === 25) {
      return unlock('Clicked 25 buttons!');
    } else if (count === 100) {
      return unlock('Clicked 100 buttons!');
    } else if (count === 10000) {
      return unlock('Clicked 10000 buttons!');
    }
  });
});
