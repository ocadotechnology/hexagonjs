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
var path = require('path')
var liveServer = require('live-server')
var gaze = require('gaze')
var merge = require('merge')

module.exports = function (opts) {
  var options = merge({
    port: 9009,
    dest: 'demo',
    serverEnabled: true,
    watchEnabled: true
  }, opts)

  var demoDir = path.join(__dirname, '..', '..', 'demo')

  fs.copyAsync(demoDir, options.dest)

  if (options.watchEnabled) {
    gaze(path.join(demoDir, '**', '*'), function (err, watcher) {
      if (err) {
        console.error(err)
      } else {
        watcher.on('changed', function () {
          fs.copyAsync(demoDir, options.dest)
        })
      }
    })
  }

  if (options.serverEnabled) {
    liveServer.start({
      port: options.port, // Set the server port. Defaults to 8080.
      root: options.dest, // Set root directory that's being server. Defaults to cwd.
      open: false, // When false, it won't load your browser by default.
      wait: 0 // Waits for all changes, before reloading. Defaults to 0 sec.
    })
  }
}
