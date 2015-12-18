var Promise = require('bluebird')
var path = require('path')
var fs = Promise.promisifyAll(require('fs-extra'))
var util = require('./util')
var del = require('del')

function examplePart (part) {
  if (part === 'and' || part === 'with')
    return part
  else
    return part[0].toUpperCase() + part.slice(1)
}

return del('content/pages/examples/')
  .then(function () {
    return fs.readdirAsync('content/examples/')
      .map(function (exampleName) {
        var niceExampleName = exampleName.split('-').map(examplePart).join(' ')
        var indexFilename = 'content/pages/examples/' + exampleName + '/index.um'
        var indexContent = [
          '# Built with npm run build-examples - do not edit manually',
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
            return {
              title: niceExampleName,
              link: '/examples/' + exampleName + '/'
            }
          })
      })
  })
  .then(function (examples) {
    var indexContent = [
      '# Built with npm run build-examples - do not edit manually',
      '@inline ../../shared/common.um',
      '@titlebar Examples',
      '@div .dx-content',
      '  @h1: Examples',
      '  @div .docs-example-link-container'
    ]

    examples = examples.map(function (example) {
      return [
        '    @div .docs-example-link',
        '      @hyperlink(' + example.link + ')[' + example.title + ']'
      ].join('\n')
    })

    return fs.outputFileAsync('content/pages/examples/index.um', indexContent.concat(examples).join('\n'))
  })
