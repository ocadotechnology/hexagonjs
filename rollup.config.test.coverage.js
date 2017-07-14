// import commonjs from 'rollup-plugin-commonjs'
import coffee from 'rollup-plugin-coffee-script'
import includePaths from 'rollup-plugin-includepaths'
import buble from 'rollup-plugin-buble'
import istanbul from 'rollup-plugin-istanbul'
import progress from 'rollup-plugin-progress'
import json from 'rollup-plugin-json';

const includePathOptions = {
  include: {},
  paths: [__dirname + '/modules', __dirname],
  external: [],
  extensions: ['.js', '.coffee']
}

export default {
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
    progress()
  ]
}
