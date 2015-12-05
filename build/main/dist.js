var hexagon = require('../..')

console.log('Creating hexagon builds in dist. This may take a couple of seconds...')
hexagon.light.build({dest: 'dist/hexagon-light'})
hexagon.dark.build({dest: 'dist/hexagon-dark'})
