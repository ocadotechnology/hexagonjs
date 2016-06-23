var hexagon = require('../..')
var Promise = require('bluebird')

console.log('Creating hexagon builds in dist. This may take a couple of seconds...')
Promise.all([
  hexagon.light.build({dest: 'dist/hexagon-light'}),
  hexagon.dark.build({dest: 'dist/hexagon-dark'})
])
.then(() => console.log('Builds created successfully'))
.catch((err) => console.error(err.stack))
