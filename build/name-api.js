var path = require('path')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs-extra'))
var util = require('./util')
var replace = Promise.promisifyAll(require('replace'))

function capitalize (word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

util.moduleList().map(function copy (module) {
  return replace({
    regex: '\@api\n',
    replacement: '\@api ' + module.split('-').map(capitalize).join(' ') + '\n',
    paths: [path.join('content', 'modules', module)],
    recursive: true,
    silent: true,
  })
})
