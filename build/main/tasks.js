/*

  _   _                                     _
 | | | | _____  ____ _  __ _  ___  _ __    (_)___
 | |_| |/ _ \ \/ / _` |/ _` |/ _ \| '_ \   | / __|
 |  _  |  __/>  < (_| | (_| | (_) | | | |_ | \__ \
 |_| |_|\___/_/\_\__,_|\__, |\___/|_| |_(_)/ |___/
                       |___/             |__/

  -----------------------------------------------

  Tasks
  -----------

  Runs tasks such as building the project once, or running the demo page

*/

var demo = require('./demo.js')
var build = require('./build.js')

if (process.argv[2] === 'demo') {
  demo({dest: 'target/demo'})
  build.watch({dest: 'target/demo', embedAssets: true})
} else if (process.argv[2] === 'build') {
  build.build({dest: 'target/build', embedAssets: true})
}
