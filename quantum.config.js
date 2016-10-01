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

const htmlOptions = {
  embedAssets: true, // XXX:  make false
  assetPath: '/assets'
}

const htmlTransforms = {
  html: html.transforms(),
  api: api.transforms(),
  changelog: changelog.transforms(),
  docs: docs.transforms(),
  codeHighlight: codeHighlight.transforms(),
  hxs: transforms
}

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
    '1.2.1'
  ]
}

function pipeline (obj) {
  return Promise.resolve(obj)
    .then(changelog())
    .then(version(versionOptions))
    .map((page) => {
      const templateOptions = {
        variables: {
          version: page.meta.version
        }
      }
      return template(templateOptions)(page)
    })
    .map(docs())
    .map(html({ transforms: htmlTransforms }))
    .map(html.stringify(htmlOptions))
    .map(html.htmlRenamer())
}

module.exports = {
  pipeline: pipeline,
  pages: 'content/pages/changelog/**/*.um',
  // resources: {
  //   files: 'content/resources/**/*',
  //   base: 'content',
  //   watch: true
  // },
  htmlTransforms: htmlTransforms
}
