var path = require('path')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs-extra'))
var del = Promise.promisifyAll(require('del'))
var util = require('./util')

var baseFolder = '../hexagon/modules/'
var newBase = './content/modules/'

util.moduleList().map(function copy (module) {
  return fs.copyAsync(path.join(baseFolder, module, 'docs'), path.join(newBase, module))
    .then(function () {
      return module
    })
})
