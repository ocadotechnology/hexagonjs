/*

  _   _                                     _
 | | | | _____  ____ _  __ _  ___  _ __    (_)___
 | |_| |/ _ \ \/ / _` |/ _` |/ _ \| '_ \   | / __|
 |  _  |  __/>  < (_| | (_| | (_) | | | |_ | \__ \
 |_| |_|\___/_/\_\__,_|\__, |\___/|_| |_(_)/ |___/
                       |___/             |__/

  -----------------------------------------------

  Demo
  ----

  Builds and serves the demo page. Can be used when develping themes.

*/

var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs-extra'))
var builder = require('./builder')
var path = require('path')
var liveServer = require('live-server')
var gaze = require('gaze')

module.exports = function (options) {
  options = options || {}
  var port = options.port || 9009
  var dest = options.dest || 'demo'
  var startServer = !options.noServer

  var demoDir = path.join(__dirname, '..', '..', 'demo')

  fs.copyAsync(demoDir, dest)

  if (startServer) {
    gaze(path.join(demoDir, '**', '*'), function (err, watcher) {
      if (err) {
        console.error(err)
      } else {
        watcher.on('changed', function () {
          fs.copyAsync(demoDir, dest)
        })
      }
    })

    liveServer.start({
      port: port, // Set the server port. Defaults to 8080.
      root: dest, // Set root directory that's being server. Defaults to cwd.
      open: false, // When false, it won't load your browser by default.
      wait: 0 // Waits for all changes, before reloading. Defaults to 0 sec.
    })
  }
}
