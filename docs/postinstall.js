const fs = require('fs');
const cpx = require('cpx');

const pkg = require('./package.json');

const hexagonVersion = pkg.dependencies['hexagon-js'];

const source = 'node_modules/hexagon-js/dist/**/*';
const dest = 'resources/hexagon';
cpx.copySync(source, `${dest}/docs/`, { clean: true });
cpx.copySync(source, `${dest}/latest/`, { clean: true });
cpx.copySync(source, `${dest}/${hexagonVersion}/`, { clean: true });

const hexJs = fs.readFileSync(`${dest}/docs/hexagon.js`, 'utf8');

fs.writeFileSync(`${dest}/docs/hexagon.js`, hexJs.replace('var hx', 'var dx'));
