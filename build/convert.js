const newQuantum = require('quantum-js')

var quantum = require('./quantum')
var version = require('./version')
var template = require('./template')

var hexagon = require('hexagon-js')

var Promise = require('bluebird')
var path = require('path')
var fs = Promise.promisifyAll(require('fs-extra'))
var util = require('./util')
var versions = require('../content/versions.json')
const latestVersion = versions[versions.length - 1]

var Progress = require('progress')
var chalk = require('chalk')


function buildMetaData () {
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
        versions: versions,
        targetVersions: versions,
        latest: latestVersion,
        modules: modules
      })
    })
    .then(function (meta) {
      return fs.writeJsonAsync(path.join('target', 'meta.json'), meta)
    })
}

function getTemplateVariables () {
  return Promise.props({
    version: latestVersion,
    versionList: versions,
    targetVersionList: versions,
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
    return path.join(moduleName, version, baseName)
  }

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
    'arg',
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

  const targetVersions = versions.targetVersions

  var versionOptions = {
    tags: buildTags,
    taggable: taggable,
    indexable: indexable,
    unmergeable: ['examples', 'description', 'extra', 'default'],
    filenameModifier: filenameModifier,
    versions: versions,
    targetVersions: versions
  }

  return Promise.props({
    versionOptions: versionOptions
  })
}

function extractExamples (obj) {
  const versions = quantum.select(obj.content).selectAll('version', {recursive: true})

  return versions.map((v) => {
    const examples = quantum.select(v).select('examples')

    if (examples && examples.hasContent()) {
      return {
        type: 'version',
        params: [v.ps()],
        content: [examples]
      }
    }
  }).filter(x => x)
}

function extractExtra (obj) {
  const versions = quantum.select(obj.content).selectAll('version', {recursive: true})

  return versions.map((v) => {
    const extra = quantum.select(v).select('extra')

    if (extra && extra.hasContent()) {
      return {
        type: 'version',
        params: [v.ps()],
        content: extra.content
      }
    }
  }).filter(x => x)
}

function insertDescription (obj, module, opts) {
  const versions = quantum.select(obj.content).selectAll('version', {recursive: true})

  const descriptions = versions.map((v) => {
    const description = quantum.select(v).select('description')

    if (description && description.hasContent()) {
      return {
        type: 'version',
        params: [v.ps()],
        content: [description]
      }
    }
  }).filter(x => x)

  if (descriptions.length) {
    return new Promise((resolve) => {
      const versioned = [
        {
          type: 'versioned',
          params: [],
          content: descriptions
        }
      ]

      const desc = quantum.stringify(versioned, opts, '  ')
      if (desc) {
        fs.readFileAsync(path.join('content/docs', module, 'index.um'), 'utf8')
          .then(content => content.replace(/\n\s*\{\{moduleDescription\}\}/g, '\n' + desc))
          .then((content) => {
            resolve(content)
          })
      } else {
        resolve([])
      }
    })
  }

}

function convertToNewFormat (objs) {
  var start = Date.now()
  return Promise.all([getTemplateVariables(), getOptions()]).spread(function (templateVariables, options) {
    return progressSequence('Building pages', chalk.green('='), objs, function (obj) {
      const module = obj.filename.split('/')[0]
      return Promise.resolve(obj)
        .then(template({variables: templateVariables}))
        .then((templatedContent) => Promise.all([
          extractExamples(templatedContent),
          extractExtra(templatedContent),
          insertDescription(templatedContent, module, options.versionOptions),
          version(options.versionOptions)(templatedContent)
        ]))
        .then(([exampleContent, extraContent, indexContent, apiContent]) => {
          return [
            {
              filename: 'api/auto.um',
              content: quantum.stringify(quantum.select(apiContent[0]).select('api').content, options.versionOptions)
            },
            {
              filename: 'extra/auto.um',
              content: quantum.stringify(extraContent, options.versionOptions)
            },
            {
              filename: 'examples/auto.um',
              content: quantum.stringify(exampleContent, options.versionOptions)
            },
            {
              filename: 'index.um',
              content: indexContent
            }
          ]
        })
        .map(({ filename, content }) => {
          if (content) {
            const p = path.join('content/docs', module, filename)
            return fs.readFileAsync(p, 'utf8')
              .then(existing => {
                if (existing !== content) {
                  return fs.outputFileAsync(p, content)
                }
              }).catch(() => fs.outputFileAsync(p, content))
          }
        })
    })
  })
}


function buildOnce (module) {
  return quantum.read(`old_content/pages/modules/*/index.um`)
    .then((c) => convertToNewFormat(c))
}

buildMetaData()
  .then(() => buildOnce(process.argv[2]))
