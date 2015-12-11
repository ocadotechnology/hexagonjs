var Promise = require('bluebird')
var path = require('path')
var fs = Promise.promisifyAll(require('fs-extra'))
var util = require('./util')
var del = require('del')

return del('content/pages/examples/')
  .then(function () {
    return fs.readdirAsync('content/examples/')
      .map(function (exampleName) {
        var niceExampleName = exampleName.split('-').map(function (part) {return part[0].toUpperCase() + part.slice(1)}).join(' ')
        var indexFilename = 'content/pages/examples/' + exampleName + '/index.um'
        var indexContent = [
          '@stylesheet /resources/hexagon/{{version}}/hexagon.css',
          '@script /resources/hexagon/{{version}}/hexagon.js',
          '@inline ../../../shared/common.um',
          '@titlebar ' + niceExampleName + ' Example',
          '',
          '@div .dx-content',
          '  @h1: ' + niceExampleName + ' Example',
          '    @div .docs-example-title-link',
          '      @hyperlink(/examples/)[All Examples]',
          '  @inline ../../../examples/' + exampleName + '/index.um'
        ].join('\n')

        return fs.outputFileAsync(indexFilename, indexContent)
          .then(function () {
            return exampleName
          })
      })
  })
  .then(function (examples) {
    var indexContent = [
      '@inline ../../shared/common.um',
      '@titlebar Examples',
      '@div .dx-content',
      '  @h1: Examples',
      '  @exampleLinkList'
    ].join('\n')
    return fs.outputFileAsync('content/pages/examples/index.um', indexContent)
  })
