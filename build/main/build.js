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

var builder = require('./builder')
var path = require('path')

var assetDir = path.join(__dirname, '../../' , 'assets')

module.exports = builder.assets({
  'hexagon-icons.ttf': {
    filepath: path.join(assetDir, 'hexagon-icons.ttf'),
    allowEmbed: true
  },
  'hexagon-icons.eot': {
    filepath: path.join(assetDir, 'hexagon-icons.eot'),
    allowEmbed: true
  },
  'hexagon-icons.woff': {
    filepath: path.join(assetDir, 'hexagon-icons.woff'),
    allowEmbed: true
  },
  'hexagon-icons.svg': {
    filepath: path.join(assetDir, 'hexagon-icons.svg'),
    allowEmbed: true
  },
  'logo.svg': {
    filepath: path.join(assetDir, 'hexagon-logo.svg'),
    allowEmbed: true
  }
})
