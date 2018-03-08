/*

     ____                    __                      _
    / __ \__  ______ _____  / /___  ______ ___      (_)____
   / / / / / / / __ `/ __ \/ __/ / / / __ `__ \    / / ___/
  / /_/ / /_/ / /_/ / / / / /_/ /_/ / / / / / /   / (__  )
  \___\_\__,_/\__,_/_/ /_/\__/\__,_/_/ /_/ /_(_)_/ /____/
                                              /___/

  Write
  =====

  Writes a string to file. This doesn't do anything special, it just
  provides some symmetry when using the read api:

    quantum.read('file.um')
      .map(html())
      .map(html.stringify())
      .map(quantum.write('target'))

*/

var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs-extra'))
var path = require('path')

module.exports = function (directory) {
  return function (data) {
    return fs.outputJsonAsync(path.join(directory, data.filename), data.content)
  }
}
