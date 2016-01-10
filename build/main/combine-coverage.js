var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs-extra'))
var istanbul = require('istanbul')

function getDirectories (path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory()
  })
}

var reporter = new istanbul.Reporter(undefined, 'target/test-library/coverage')
var collector = new istanbul.Collector()

getDirectories('target/test-library/coverage').forEach(function (dir) {
  collector.add(JSON.parse(fs.readFileSync('target/test-library/coverage/' + dir + '/coverage.json', 'utf8')))
})

reporter.add('lcovonly')
reporter.write(collector, true, function () {
  console.log('done')
})
