const Promise = require('bluebird')

const html = require('quantum-html')
const api = require('quantum-api')
const version = require('quantum-version')
const template = require('quantum-template')
const changelog = require('quantum-changelog')
const docs = require('quantum-docs')
const codeHighlight = require('quantum-code-highlight')

//
const transforms = require('./transforms/transforms')

const timesink = require('timesink')

const htmlOptions = {
  embedAssets: true, // XXX:  make false
  assetPath: '/assets'
}

function cachedTransforms (trans) {
  const store = {}

  function cached (transform) {
    return (selection, transforms) => {
      const stop = timesink.start('trans:'+selection.type())
      const stopHash = timesink.start('hash')
      const h = JSON.stringify(selection.entity())
      stopHash()
      if (!(h in store)) {
        store[h] = transform(selection, transforms)
      }
      if (store[h] && store[h].then) {
        store[h].then(stop)
      } else {
        stop()
      }
      return store[h]
    }
  }

  const res = {}
  Object.keys(trans).forEach(k => {
    res[k] = {}
    Object.keys(trans[k]).forEach(w => {
      res[k][w] = cached(trans[k][w])
    })
  })
  return res
}

const htmlTransforms = cachedTransforms({
  html: html.transforms(),
  api: api.transforms(),
  changelog: changelog.transforms(),
  docs: docs.transforms(),
  codeHighlight: codeHighlight.transforms(),
  hxs: transforms
})

const versionOptions = {
  versions: [
    '0.9.0',
    '0.10.0',
    '0.11.0',
    '0.12.0',
    '0.12.1',
    '0.12.2',
    '0.12.3',
    '0.12.4',
    '0.12.5',
    '0.12.6',
    '0.12.7',
    '0.12.8',
    '0.12.9',
    '0.12.10',
    '0.13.0',
    '0.14.0',
    '0.14.1',
    '0.15.0',
    '0.15.1',
    '0.15.2',
    '0.15.3',
    '1.0.0',
    '1.0.4',
    '1.1.0',
    '1.2.0',
    '1.2.1',
    '1.3.0',
    '1.3.1',
    '1.3.2',
    '1.3.3',
    '1.4.0',
    '1.4.1',
    '1.4.2',
    '1.5.0',
    '1.5.1',
    '1.6.0',
    '1.7.0',
    '1.8.0',
    '1.8.1',
    '1.8.2'
  ]
}

function pipeline (obj) {
  return Promise.resolve(obj)
    .then(timesink.time('changelog', changelog({
      languages: [changelog.languages.javascript],
      reverseVisibleList: true,
      issueUrl: 'https://github.com/ocadotechnology/hexagonjs/issues/'
    })))
    .then(timesink.time('version', version(versionOptions)))
    .then(timesink.time('template', (pages) => {
      return Promise.all(pages.map(page => {
        const templateOptions = {
          variables: {
            version: page.meta.version
          }
        }
        return template(templateOptions)(page)
      }))
    }))
    .then(timesink.time('docs', (pages) => Promise.all(pages.map(docs()))))
    .then(timesink.time('html', (pages) => Promise.all(pages.map(html({ transforms: htmlTransforms })))))
    .then(timesink.time('html-stringify', (pages) => Promise.all(pages.map(html.stringify(htmlOptions)))))
    .map(html.htmlRenamer())
    .then((res) => {
      // console.log(timesink.report())
      return res
    })
}

module.exports = {
  pipeline: pipeline,
  pages: [
    {
      files: 'content/**/index.um',
      base: 'content',
      watch: true
    }
  ],
  resources: [
    {
      files: 'resources/hexagon/**/*',
      base: '.',
      watch: false
    },
    {
      files: 'resources/fonts/**/*',
      base: '.',
      watch: false
    },
    {
      files: 'resources/*',
      base: '.',
      watch: true
    }
  ],
  htmlTransforms: htmlTransforms
}
