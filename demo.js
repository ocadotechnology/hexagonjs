var hexagon = require('./index.js')
var liveServer = require('live-server')
var testServer = require('./build/main/test-server')

hexagon.light.watch({ dest: 'target/hexagon-light' })
hexagon.demo({ dest: 'target/hexagon-light', serverEnabled: false })

hexagon.dark.watch({ dest: 'target/hexagon-dark' })
hexagon.demo({ dest: 'target/hexagon-dark', serverEnabled: false })

liveServer.start({
  port: 9009,
  root: 'target',
  open: false,
  ignore: 'target/coverage'
})
