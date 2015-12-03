var quantum = require('quantum-js')
var html = require('quantum-html')
var api = require('quantum-api')
var version = require('quantum-version')
var template = require('quantum-template')
var changelog = require('quantum-changelog')

var hexagon = require('hexagon-theme')

var Promise = require('bluebird')
var path = require('path')
var fs = Promise.promisifyAll(require('fs-extra'))
var util = require('./util')
var versions = require('../content/versions.json')
var latestVersion = versions[versions.length - 1]

var glob = Promise.promisify(require('glob'))
var Progress = require('progress')
var chalk = require('chalk')
var watch = require('quantum-watch')
var flatten = require('flatten')
var liveServer = require('live-server')

try {
  var privateConfig = require('../config.json')
} catch (e) {
  var privateConfig = {}
}

function buildMetaData () {
  var modules = util.moduleList().then(function (moduleNames) {
    var res = {}
    return Promise.all(moduleNames.map(function (moduleName) {
      return fs.readJsonAsync(path.join(util.toModuleDir(moduleName), 'module.json'))
        .then(function (meta) {
          res[moduleName] = meta
        })
    })).then(function () {
      return res
    })
  })

  return fs.readJsonAsync(path.join(util.root, 'content', 'versions.json'))
    .then(function (versions) {
      return Promise.props({
        versions: versions,
        latest: versions[versions.length - 1],
        modules: modules
      })
    }).then(function (meta) {
    return fs.writeJsonAsync(path.join('target', 'meta.json'), meta)
  })

}

function createBuilds () {
  // create the dx-prefixed and hx-prefixed builds for the latest version of hexagon
  var buildList = [
    { dest: 'target/resources/hexagon/' + latestVersion, embedAssets: true },
    { dest: 'target/resources/hexagon/docs', prefix: 'dx', embedAssets: true, addFavicons: true }
  ]
  return progressSequence('Building Hexagon', chalk.cyan('='), buildList, function (opts) {
    return hexagon.hexagonLight.build(opts)
  })
}

function buildHexagon (force) { // XXX: do this in the postinstall npm script
  if (force) return createBuilds()
  return fs.accessAsync('target/resources/hexagon/' + latestVersion + '/hexagon.css', fs.F_OK)
    .then(function () {
      console.log(chalk.cyan('Skipping Hexagon Build (Already Exists)'))
    })
    // Hexagon build doesn't already exist
    .catch(createBuilds)
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

function getTemplateVariables () {
  return Promise.props({
    version: latestVersion,
    versionList: fs.readJsonAsync(path.join(util.root, 'content/versions.json')),
    modules: util.moduleList()
  })
}

function progressSequence (desc, completeStyle, list, func) {
  var bar = new Progress(desc + ' :current/:total [:bar] :percent :etas', { total: list.length, width: 50, complete: completeStyle})
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

function getOptions () {
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
      types: types
    }
  })

  var changelogOptions = {
    targetVersions: versions,
    milestoneUrl: privateConfig.milestoneUrl || 'https://github.com/ocadotechnology/hexagonjs/milestones/',
    issueUrl: privateConfig.issueUrl || 'https://github.com/ocadotechnology/hexagonjs/issues/'
  }

  var versionOptions = {
    filenameModifier: filenameModifier,
    versions: versions,
    unmergable: ['examples', 'description', 'extra'],
    taggable: ['prototype', 'constructor', 'function', 'method', 'property', 'returns', 'class', 'extraclass', 'childclass']
  }

  var htmlTransforms = Promise.props({
    html: html.transforms,
    api: apiOptions.then(api),
    changelog: changelog(changelogOptions).transforms,
    docs: require('../transforms/transforms')
  })

  return Promise.props({
    changelogOptions: changelogOptions,
    versionOptions: versionOptions,
    htmlTransforms: htmlTransforms
  })
}

function buildPages () {
  return watch('content/pages/**/index.um', { base: 'content/pages'}, function (objs) {
    var start = Date.now()
    return Promise.all([getTemplateVariables(), getOptions()]).spread(function (templateVariables, options) {
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
          .map(html(options.htmlTransforms))
          .map(html.stringify())
          .map(function (file) {
            if (file.filename.indexOf('docs') === 0) {
              var v = file.filename.split('/')[1]
              file.content = file.content.split('__version__').join(v)
            }
            return file
          })
          .map(quantum.write('target'))
      })
    }).then(function () {
      var diff = (Date.now() - start)
      var mins = (diff - diff % 60000) / 60000
      var sec = (diff - (diff - diff % 60000)) / 1000
      console.log(chalk.blue('Done!', mins + 'm', sec + 's'))
    })
  })
    .then(function (fun) {
      return fun()
    })

}

function startServer () {
  liveServer.start({
    port: 9000,
    root: 'target',
    wait: 50,
    open: false
  })
}

if (process.argv[2] === 'build-hexagon') {
  buildHexagon(true)
} else {
  buildHexagon(false)
    .then(copyResources)
    .then(buildMetaData)
    .then(buildPages)
    .then(startServer)
}
