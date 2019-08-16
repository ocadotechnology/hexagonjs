const html = require('quantum-html')
const api = require('quantum-api')
const version = require('quantum-version')
const template = require('quantum-template')
const docs = require('quantum-docs')
const codeHighlight = require('quantum-code-highlight')

const entityTransforms = require('./transforms/transforms')

const latestVersion = require('./package.json').dependencies['hexagon-js']

const typeLinks = {
  'Array': 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array',
  'Boolean': 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean',
  'Function': 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function',
  'Number': 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number',
  'Object': 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object',
  'String': 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String',
  'Element': 'https://developer.mozilla.org/docs/Web/API/Element',
  'Node': 'https://developer.mozilla.org/docs/Web/API/Node',
  'AutoComplete': '/docs/autocomplete/#autocomplete',
  'EventEmitter': '/docs/event-emitter/#eventemitter',
  'Animation': '/docs/animate/#animation',
  'Morph': '/docs/animate/#morph',
}

// XXX: tidy and move this into quantum (with persistence)
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

  function processObj (obj) {
    const res = {}
    Object.keys(obj).forEach(k => {
      if (typeof obj[k] === 'function') {
        res[k] = cached(obj[k])
      } else {
        res[k] = processObj(obj[k])
      }
    })
    return res
  }

  return processObj(trans)
}

const apiOptions = {
  languages: [
    api.languages.javascript({
      typeLinks: typeLinks
    }),
    api.languages.css()
  ],
  reverseVisibleList: true,
  issueUrl: (id) => 'https://github.com/ocadotechnology/hexagonjs/issues/' + id
}

const htmlOptions = {
  embedAssets: false,
  assetPath: '/resources',
  entityTransforms: cachedTransforms({
    html: html.entityTransforms(),
    api: api.entityTransforms(apiOptions),
    docs: docs.entityTransforms(),
    codeHighlight: codeHighlight.entityTransforms(),
    hxs: entityTransforms
  })
}

function customizedTemplate (file) {
  const templateOptions = {
    variables: {
      version: file.meta.version,
      latestVersion: latestVersion,
      editPageUrl: `https://github.com/ocadotechnology/hexagonjs/tree/master/docs/${file.info.src}`
    }
  }

  return template.fileTransform(templateOptions)(file)
}

module.exports = {
  port: 9000,
  pipeline: [
    version.fileTransform(),
    customizedTemplate,
    api.fileTransform(apiOptions),
    docs.fileTransform(),
    html.fileTransform(htmlOptions)
  ],
  concurrency: 1,
  resolveRoot: 'content',
  dest: 'target',
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
        'node_modules/@fortawesome/fontawesome-free/css/**',
        'node_modules/@fortawesome/fontawesome-free/webfonts/**'
      ],
      base: 'node_modules/@fortawesome/fontawesome-free',
      dest: 'resources/font-awesome',
      watch: false
    },
    {
      files: [
        'node_modules/hexagon-js/demo/**',
      ],
      base: 'node_modules/hexagon-js/demo',
      dest: 'demo',
      watch: true
    },
    {
      files: 'content/guide/**/*.html',
      base: 'content',
      watch: false
    },
    {
      files: 'resources/hexagon/**/*',
      base: '.',
      watch: true
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
  ]
}
