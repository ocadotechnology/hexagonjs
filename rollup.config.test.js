// import commonjs from 'rollup-plugin-commonjs'
import coffee from 'rollup-plugin-coffee-script'
import includePaths from 'rollup-plugin-includepaths'
import buble from 'rollup-plugin-buble'
import progress from 'rollup-plugin-progress'
import json from 'rollup-plugin-json';

const includePathOptions = {
  include: {},
  paths: [__dirname],
  external: [],
  extensions: ['.js', '.coffee']
}

export default {
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
      exclude: ['**/*.coffee']
    }),
    coffee({
      exclude: ['**/*.js']
    }),
    includePaths(includePathOptions),
    progress()
  ]
}
