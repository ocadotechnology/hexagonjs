var hexagon = require('hexagon-js')

var version = require('../package.json').devDependencies['hexagon-js']

hexagon.light.build({
  dest: 'resources/hexagon/' + version,
  embedAssets: true
})

hexagon.light.build({
  dest: 'resources/hexagon/latest',
  embedAssets: true
})

hexagon.light.build({
  dest: 'resources/hexagon/docs',
  prefix: 'dx',
  embedAssets: true
})
