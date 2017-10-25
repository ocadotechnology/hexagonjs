import coffee from 'rollup-plugin-coffee-script'
import includePaths from 'rollup-plugin-includepaths'
import buble from 'rollup-plugin-buble'
import progress from 'rollup-plugin-progress'
import json from 'rollup-plugin-json'
import istanbul from 'rollup-plugin-istanbul'

const includePathOptions = {
  include: {},
  paths: [__dirname + '/modules', __dirname],
  external: [],
  extensions: ['.js', '.coffee']
}

const progressOptions = {
  clearLine: false
}

const libraryConfig = {
  input: 'modules/hexagon.js',
  output: {
    file: 'target/hexagon.js',
    format: 'iife'
  },
  name: 'hx',
  plugins: [
    json(),
    buble({
      exclude: ['**/*.coffee', '**/*.json']
    }),
    coffee({
      exclude: ['**/*.js', '**/*.json']
    }),
    includePaths(includePathOptions),
    progress(progressOptions)
  ]
}

const testConfig = {
  input: 'modules/hexagon.spec.js',
  output: {
    file: 'target/hexagon.test.js',
    format: 'iife'
  },
  name: 'hexagonSpec',
  external: ['chai'],
  globals: {
    'chai': 'window.chai'
  },
  plugins: [
    json(),
    buble({
      exclude: ['**/*.coffee', '**/*.json']
    }),
    coffee({
      exclude: ['**/*.js', '**/*.json']
    }),
    includePaths(includePathOptions),
    progress(progressOptions)
  ]
}

const testCoverageConfig = {
  input: 'modules/hexagon.spec.js',
  output: {
    file: 'target/hexagon.test.coverage.js',
    format: 'iife'
  },
  name: 'hexagonSpec',
  external: ['chai'],
  globals: {
    'chai': 'window.chai'
  },
  plugins: [
    json(),
    buble({
      exclude: ['**/*.coffee']
    }),
    coffee({
      exclude: ['**/*.js']
    }),
    istanbul({
      exclude: ['test/**/*', '**/*spec*'],
      reporters: ['coverage'],
      instrumenterConfig: {
        embedSource: true
      },
      sourceMap: false
    }),
    includePaths(includePathOptions),
    progress(progressOptions)
  ]
}


function resolveHexagon () {
  return {
    resolveId: function (code, id) {
      if (code === 'hexagon-js') {
        return 'modules/hexagon.js'
      }
    }
  }
}

const demoConfig = {
  input: 'demo/index.js',
  output: {
    file: 'target/index.js',
    format: 'iife'
  },
  name: 'hx',
  plugins: [
    json(),
    coffee({
      exclude: ['**/*.js', '**/*.json']
    }),
    buble({
      exclude: ['**/*.coffee', '**/*.json']
    }),
    resolveHexagon(),
    includePaths(includePathOptions),
    progress(progressOptions)
  ]
}

export default [
  libraryConfig,
  testConfig,
  testCoverageConfig,
  demoConfig
]