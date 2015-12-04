/*

  _   _                                     _
 | | | | _____  ____ _  __ _  ___  _ __    (_)___
 | |_| |/ _ \ \/ / _` |/ _` |/ _ \| '_ \   | / __|
 |  _  |  __/>  < (_| | (_| | (_) | | | |_ | \__ \
 |_| |_|\___/_/\_\__,_|\__, |\___/|_| |_(_)/ |___/
                       |___/             |__/

  -----------------------------------------------

  This file exposes the public api for the hexagon builder.

*/

module.exports = {
  base: require('./build/main/build'),
  light: require('./themes/hexagon-light/build'),
  dark: require('./themes/hexagon-dark/build'),
  demo: require('./build/main/demo')
}
