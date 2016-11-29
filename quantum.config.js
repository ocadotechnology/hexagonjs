const Promise = require('bluebird')

const html = require('quantum-html')
const api = require('quantum-api')
const version = require('quantum-version')
const template = require('quantum-template')
const docs = require('quantum-docs')
const codeHighlight = require('quantum-code-highlight')

const transforms = require('./transforms/transforms')

const htmlOptions = {
  embedAssets: false,
  assetPath: '/assets'
}

//XXX: tidy and move this into quantum (with persistence)
function cachedTransforms (trans) {
  const store = {}

  function cached (transform) {
    return (selection, transforms) => {
      const h = JSON.stringify(selection.entity())
      if (!(h in store)) {
        store[h] = transform(selection, transforms)
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

const apiOptions = {
  languages: [
    api.languages.javascript(),
    api.languages.css()
  ],
  reverseVisibleList: true,
  issueUrl: (id) => 'https://github.com/ocadotechnology/hexagonjs/issues/' + id
}

const htmlTransforms = cachedTransforms({
  html: html.transforms(),
  api: api.transforms(apiOptions),
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

function customizedTemplate (page) {
  const templateOptions = {
    variables: {
      version: page.meta.version
    }
  }
  return template(templateOptions)(page)
}

module.exports = {
  pipeline: [
    docs(),
    api(apiOptions),
    version(versionOptions),
    customizedTemplate,
    html({ transforms: htmlTransforms })
  ],
  concurrency: 1,
  pages: [
    {
      files: 'content/**/index.um',
      base: 'content',
      watch: true
    }
  ],
  resources: [
    {
      files: [
        'node_modules/font-awesome/css/**',
        'node_modules/font-awesome/fonts/**'
      ],
      base: 'node_modules',
      dest: 'resources',
      watch: false
    },
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
