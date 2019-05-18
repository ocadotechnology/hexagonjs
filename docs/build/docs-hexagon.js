const fs = require('fs');

const hexJs = fs.readFileSync('resources/hexagon/docs/hexagon.js', 'utf8');
fs.writeFileSync('resources/hexagon/docs/hexagon.js', hexJs.replace('var hx', 'var dx'));
