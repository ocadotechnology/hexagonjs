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
  entry: 'demo-new/index.js',
  dest: 'target/index.js',
  format: 'iife',
  moduleName: 'hx',
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
