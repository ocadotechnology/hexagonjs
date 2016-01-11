/*

  _   _                                     _
 | | | | _____  ____ _  __ _  ___  _ __    (_)___
 | |_| |/ _ \ \/ / _` |/ _` |/ _ \| '_ \   | / __|
 |  _  |  __/>  < (_| | (_| | (_) | | | |_ | \__ \
 |_| |_|\___/_/\_\__,_|\__, |\___/|_| |_(_)/ |___/
                       |___/             |__/

  -----------------------------------------------

  This file exposes the default/base builder for hexagon.

*/

var Builder = require('./builder')
var path = require('path')

var assetDir = path.join(__dirname, '../../' , 'assets')

module.exports = (new Builder).assets({
  'assets/hexagon-icons.ttf': {
    filepath: path.join(assetDir, 'hexagon-icons.ttf'),
    allowEmbed: true
  },
  'assets/hexagon-icons.eot': {
    filepath: path.join(assetDir, 'hexagon-icons.eot'),
    allowEmbed: true
  },
  'assets/hexagon-icons.woff': {
    filepath: path.join(assetDir, 'hexagon-icons.woff'),
    allowEmbed: true
  },
  'assets/hexagon-icons.svg': {
    filepath: path.join(assetDir, 'hexagon-icons.svg'),
    allowEmbed: true
  },
  'assets/logo.svg': {
    filepath: path.join(assetDir, 'hexagon-logo.svg'),
    allowEmbed: true
  },
  'hexagon.print.css': {
    filepath: path.join(assetDir, 'hexagon-print.css'),
    allowEmbed: false
  },
  'hexagon.print.js': {
    filepath: path.join(assetDir, 'hexagon-print.js'),
    allowEmbed: false
  }
})
