var hexagon = require('../hexagon-base/build')
var path = require('path')
var favicons = require('../favicon.js')

module.exports = hexagon
  .theme(path.join(__dirname, 'theme.um'))
  .assets({
    'logo.svg': {
      filepath: path.join(__dirname, '../assets/hexagon-logo-v1.svg'),
      allowEmbed: true
    }
  })
  .assets({
    'assets/open-sans-light.woff': {
      filepath: path.join(__dirname, '../assets/open-sans-light.woff'),
      allowEmbed: true
    },
    'assets/open-sans-regular.woff': {
      filepath: path.join(__dirname, '../assets/open-sans-regular.woff'),
      allowEmbed: true
    },
    'assets/open-sans-bold.woff': {
      filepath: path.join(__dirname, '../assets/open-sans-bold.woff'),
      allowEmbed: true
    }
  })
  .assets(favicons(path.join(__dirname, '../assets/favicons')))
  .flatten()
