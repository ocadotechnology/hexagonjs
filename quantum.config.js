var Promise = require('bluebird')

var html = require('quantum-html')
var api = require('quantum-api')
var version = require('quantum-version')
var template = require('quantum-template')
var changelog = require('quantum-changelog')
var docs = require('quantum-docs')
var transforms = require('./transforms/transforms')

var versions = [
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

var htmlOptions = {
  embedAssets: true, // XXX:  make false
  assetPath: '/assets'
}

var htmlTransforms = {
  html: html.transforms,
  // api: api(),
  // changelog: changelog.transforms(),
  docs: docs(),
  hxs: transforms
}

var templateVariables = {
  version: versions[versions.length - 1],
  versions: versions
}

var versionOptions = {
  versions: versions
}

function pipeline (obj) {
  return Promise.resolve(obj)
    .then(template({ variables: templateVariables }))
    // .then(changelog())
    .then(version(versionOptions))
    .map(docs.populateTableOfContents())
    .map(html({ transforms: htmlTransforms }))
    .map(html.stringify(htmlOptions))
    .map(html.htmlRenamer())
}

module.exports = {
  pipeline: pipeline,
  pages: 'content/pages/**/*.um',
  resources: 'content/resouces/**/*',
  htmlTransforms: htmlTransforms
}
