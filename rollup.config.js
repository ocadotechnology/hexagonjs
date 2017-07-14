// import commonjs from 'rollup-plugin-commonjs'
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
  entry: 'modules/hexagon.js',
  dest: 'target/hexagon.js',
  format: 'iife',
  moduleName: 'hx',
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
  entry: 'modules/hexagon.spec.js',
  dest: 'target/hexagon.test.js',
  format: 'iife',
  moduleName: 'hexagonSpec',
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
  entry: 'modules/hexagon.spec.js',
  dest: 'target/hexagon.test.coverage.js',
  format: 'iife',
  moduleName: 'hexagonSpec',
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
  entry: 'demo/index.js',
  dest: 'target/index.js',
  format: 'iife',
  moduleName: 'hx',
  plugins: [
    json(),
    buble({
      exclude: ['**/*.coffee', '**/*.json']
    }),
    coffee({
      exclude: ['**/*.js', '**/*.json']
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