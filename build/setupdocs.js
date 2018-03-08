var Promise = require('bluebird')
var path = require('path')
var fs = Promise.promisifyAll(require('fs-extra'))
var util = require('./util')

util.moduleList().then((moduleList) => {
  return Promise.all(moduleList.map(function (moduleName) {
    return fs.readJsonAsync(path.join(util.toModuleDir(moduleName), 'module.json'))
  }))
}).map((moduleMeta) => {
  var module = moduleMeta.id
  var keywords = moduleMeta.keywords
  var category = moduleMeta.category
  var niceModuleName = module.split('-').map(function (part) {
    return part[0].toUpperCase() + part.slice(1)
  }).join(' ')
  var indexFilename = 'content/pages/modules/' + module + '/index.um'
  var pageKeywords = `${keywords.join(' ')} ${category}`
  var indexContent = [
    '@stylesheet /resources/hexagon/__version__/hexagon.css',
    '@script /resources/hexagon/__version__/hexagon.js',
    '@inline ../../../shared/common.um',
    '@keywords ' + pageKeywords,
    '@titlebar ' + niceModuleName,
    '',
    '@div .dx-content',
    '  @inline ../../../modules/' + module + '/index.um'
  ].join('\n')

  var changelogFilename = 'content/pages/modules/' + module + '/changelog/index.um'
  var changelogContent = [
    '@inline ../../../../shared/common.um',
    '@titlebar ' + niceModuleName + ' Changelog',
    '',
    '@div .dx-content.docs-changelog',
    '  @h1 .docs-module-section: ' + niceModuleName + ' Changelog',
    '    @div .docs-module-changelog-link',
    '      @hyperlink /changelog/: Complete Changelog',
    '  @changelog.wrapper',
    '    @process',
    '      @renderSingleItemInRoot',
    '      @inline ../../../../modules/' + module + '/index.um',
    '    @for v in versionList',
    '      @version {{v}}',
    '        @link /docs/{{v}}/' + module + '/'
  ].join('\n')

  return fs.outputFileAsync(indexFilename, indexContent)
    .then(function () {
      return fs.outputFileAsync(changelogFilename, changelogContent)
    })
})
