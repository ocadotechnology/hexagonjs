// this receives the test results and coverage from the browsers that visit the test page

var port = 9099
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var path = require('path')

var istanbul = require('istanbul')

function coverage (req, res) {
  var collector = new istanbul.Collector()
  var reporter = new istanbul.Reporter(undefined, path.join(__dirname, '../..', 'target/coverage'))

  collector.add(req.body)
  reporter.add('html')
  reporter.write(collector, false, function () {
    console.log('All reports generated')
    res.status(200).end()
  })

}

app
  .use(bodyParser())
  .use(cors())
  .post('/coverage', coverage)
  .listen(port, function () {
    console.log('listening on %d', port)
  })
