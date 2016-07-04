var quantum = require('quantum-js')
var html = require('quantum-html')
var api = require('quantum-api')
var version = require('quantum-version')
var template = require('quantum-template')
var changelog = require('quantum-changelog')

var hexagon = require('hexagon-js')

var Promise = require('bluebird')
var path = require('path')
var fs = Promise.promisifyAll(require('fs-extra'))
var util = require('./util')
var versions = require('../content/versions.json')

var Progress = require('progress')
var chalk = require('chalk')
var watch = require('quantum-watch')
var flatten = require('flatten')
var liveServer = require('live-server')

var privateConfig
try {
  privateConfig = require('../config.json')
} catch (e) {
  privateConfig = {}
}

function buildMetaData (dev) {
  var targetVersions
  if (dev === true) {
    targetVersions = [versions.targetVersions.reverse()[0]]
  } else {
    targetVersions = versions.targetVersions
  }

  return util.moduleList().then(function (moduleNames) {
    var res = {}
    return Promise.all(moduleNames.map(function (moduleName) {
      return fs.readJsonAsync(path.join(util.toModuleDir(moduleName), 'module.json'))
        .then(function (meta) {
          res[moduleName] = meta
        })
    }))
      .then(function () {
        return res
      })
  })
    .then(function (modules) {
      return Promise.props({
        versions: versions.versions,
        targetVersions: targetVersions,
        latest: versions.latest,
        modules: modules
      })
    })
    .then(function (meta) {
      return fs.writeJsonAsync(path.join('target', 'meta.json'), meta)
    })
}

function hexagonBuildLog (message) {
  console.log(chalk.cyan(message))
}

function createLatestBuild (force) {
  hexagonBuildLog('Building Hexagon ' + versions.latest)
  var dest = 'content/resources/hexagon/' + versions.latest
  var opts = {
    dest: dest,
    embedAssets: true
  }
  return createHexagonBuild(dest, opts, force)
    .then(() => hexagonBuildLog(chalk.cyan('Hexagon ' + versions.latest + ' Built')))
}

function createDocsBuild (force) {
  hexagonBuildLog('Building Hexagon for Docs')
  var dest = 'target/resources/hexagon/docs'
  var opts = {
    dest: dest,
    prefix: 'dx',
    embedAssets: true,
    addFavicons: true
  }
  return createHexagonBuild(dest, opts, force)
    .then(() => hexagonBuildLog('Hexagon for Docs Built'))
}

function createHexagonBuild (dest, options, force) {
  if (force) return hexagon.light.build(options)
  return fs.accessAsync(dest + '/hexagon.css', fs.F_OK)
    // Hexagon build doesn't already exist
    .catch(() => hexagon.light.build(options))
}

function buildHexagon (force) {
  return createDocsBuild(force)
}

// copies the static resources to the target directory
function copyResources () {
  return Promise.all([
    fs.copyAsync('node_modules/font-awesome/css/', 'target/resources/font-awesome/css/'),
    fs.copyAsync('node_modules/font-awesome/fonts/', 'target/resources/font-awesome/fonts/'),
    fs.copyAsync('content/resources/', 'target/resources/'),
    fs.copyAsync('server/', 'target/')
  ])
}

function getTemplateVariables (dev) {
  var targetVersions
  if (dev === true) {
    targetVersions = [versions.targetVersions.reverse()[0]]
  } else {
    targetVersions = versions.targetVersions
  }

  return Promise.props({
    version: versions.latest,
    versionList: versions.versions,
    targetVersionList: targetVersions,
    modules: util.moduleList()
  })
}

function progressSequence (desc, completeStyle, list, func) {
  var bar = new Progress(desc + ' :current/:total [:bar] :percent :etas', { total: list.length, width: 50, complete: completeStyle })
  bar.tick(0)
  return Promise.all(list)
    .map(function (f) {
      return func(f)
        .then(function (res) {
          bar.tick()
          return res
        })
    }, {concurrency: 5})
}

function getOptions (dev) {
  function filenameModifier (filename, version) {
    var baseName = path.basename(filename)
    var moduleName = path.basename(path.dirname(filename))
    return path.join('docs', version, moduleName, baseName)
  }

  var apiOptions = util.moduleList().then(function (modules) {
    var types = {
      'Array': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
      'Boolean': 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean',
      'Date': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date',
      'Element': 'https://developer.mozilla.org/en/docs/Web/API/Element',
      'File': 'https://developer.mozilla.org/en/docs/Web/API/File',
      'Function': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function',
      'HTMLElement': 'https://developer.mozilla.org/en/docs/Web/API/HTMLElement',
      'Node': 'https://developer.mozilla.org/en/docs/Web/API/Node',
      'Number': 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number',
      'Object': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object',
      'String': 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String',
      'SVGElement': 'https://developer.mozilla.org/en/docs/Web/API/SVGElement'
    }

    modules.forEach(function (moduleId) {
      var moduleType = moduleId.split('-').map(function (part) {
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      }).join('')
      types[moduleType] = '../' + moduleId
    })

    return {
      typeLinks: types
    }
  })

  var taggable = [
    'function',
    'prototype',
    'method',
    'property',
    'object',
    'constructor',
    'returns',
    'event',
    'data',
    'class',
    'extraclass',
    'childclass'
  ]

  var indexable = [
    'param',
    'group'
  ]

  var buildTags = {
    added: {
      order: 8
    },
    updated: {
      order: 7
    },
    deprecated: {
      order: 5
    },
    removed: {
      order: 4
    },
    enhancement: {
      keyText: 'Enhancement',
      iconClass: 'fa fa-fw fa-magic',
      order: 6,
      retain: false,
      removeEntity: false
    },
    bugfix: {
      keyText: 'Bug Fix',
      iconClass: 'fa fa-fw fa-bug',
      order: 3,
      retain: false,
      removeEntity: false
    },
    docs: {
      keyText: 'Documentation',
      iconClass: 'fa fa-fw fa-book',
      order: 2,
      retain: false,
      removeEntity: false
    },
    info: {
      keyText: 'Information',
      iconClass: 'fa fa-fw fa-info',
      order: 1,
      retain: false,
      removeEntity: false
    }
  }

  var targetVersions
  if (dev === true) {
    targetVersions = [versions.targetVersions.reverse()[0]]
  } else {
    targetVersions = versions.targetVersions
  }

  var changelogOptions = {
    tags: buildTags,
    taggable: taggable,
    indexable: indexable,
    versions: versions.versions,
    targetVersions: versions.versions,
    reverseVisibleList: true,
    milestoneUrl: privateConfig.milestoneUrl || 'https://github.com/ocadotechnology/hexagonjs/milestones/',
    issueUrl: privateConfig.issueUrl || 'https://github.com/ocadotechnology/hexagonjs/issues/'
  }

  var versionOptions = {
    tags: buildTags,
    taggable: taggable,
    indexable: indexable,
    unmergeable: ['examples', 'description', 'extra'],
    filenameModifier: filenameModifier,
    versions: versions.versions,
    targetVersions: targetVersions
  }

  var htmlTransforms = Promise.props({
    html: html.transforms,
    api: apiOptions.then(api),
    changelog: changelog.transforms(changelogOptions),
    docs: require('../transforms/transforms')
  })

  return Promise.props({
    changelogOptions: changelogOptions,
    versionOptions: versionOptions,
    htmlTransforms: htmlTransforms
  })
}

function buildPages (objs, dev) {
  var start = Date.now()
  return Promise.all([getTemplateVariables(dev), getOptions(dev)]).spread(function (templateVariables, options) {
    return progressSequence('Building pages', chalk.green('='), objs, function (obj) {
      return Promise.resolve(obj)
        .then(template({variables: templateVariables}))
        .then(changelog(options.changelogOptions))
        .then(version(options.versionOptions))
        .then(function (res) { return Array.isArray(res) ? res : [res] })
        .then(flatten)
        .map(function (file) {
          if (file.filename.indexOf('modules') > -1) {
            file.filename = file.filename.replace('modules', 'docs')
          }
          return file
        })
        .map(html({transforms: options.htmlTransforms}))
        .map(html.stringify())
        .map(function (file) {
          var splitName = file.filename.split('/')
          if (splitName[0] === 'docs') {
            var hexagonVersionToLoad = (splitName.length > 3 ? splitName[1] : versions.latest)
            file.content = file.content.split('__version__').join(hexagonVersionToLoad)
          }
          return file
        })
        .map(quantum.write('target'))
    })
  }).then(function (res) {
    var diff = (Date.now() - start)
    var mins = (diff - diff % 60000) / 60000
    var sec = (diff - (diff - diff % 60000)) / 1000
    console.log(chalk.blue('Done!', mins + 'm', sec + 's'))
    return res
  })
}

function watchPages () {
  return watch('content/pages/**/index.um', { base: 'content/pages' }, function (objs) { return buildPages(objs, process.argv[2] !== 'build-all') }).then(function (fun) {
    return fun()
  })
}

function buildOnce () {
  return quantum.read('content/pages/**/index.um', { base: 'content/pages' }).then(buildPages)
}

function startServer () {
  liveServer.start({
    port: 9000,
    root: 'target',
    file: '404/index.html',
    wait: 50,
    open: false
  })
}

if (process.argv[2] === 'postinstall') {
  createLatestBuild(true)
} else if (process.argv[2] === 'build-hexagon') {
  buildHexagon(true)
} else if (process.argv[2] === 'build-release') {
  buildHexagon(true)
    .then(copyResources)
    .then(buildMetaData)
    .then(buildOnce)
} else {
  buildHexagon(false)
    .then(copyResources)
    .then(function () {
      return buildMetaData(process.argv[2] !== 'build-all')
    })
    .then(watchPages)
    .then(startServer)
}
