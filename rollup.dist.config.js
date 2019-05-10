import coffee from 'rollup-plugin-coffee-script';
import includePaths from 'rollup-plugin-includepaths';
import buble from 'rollup-plugin-buble';
import progress from 'rollup-plugin-progress';
import json from 'rollup-plugin-json';

const includePathOptions = {
  include: {},
  paths: [`${__dirname}/src`, __dirname],
  external: [],
  extensions: ['.js', '.coffee'],
};

const progressOptions = {
  clearLine: false,
};

const libraryConfig = {
  input: 'src/hexagon.js',
  output: {
    file: 'dist/hexagon.js',
    format: 'iife',
    name: 'hx',
  },
  plugins: [
    json(),
    coffee(),
    buble(),
    includePaths(includePathOptions),
    progress(progressOptions),
  ],
  watch: {
    clearScreen: false,
  },
};

const printConfig = {
  input: 'src/hexagon.print.js',
  output: {
    file: 'dist/hexagon.print.js',
    format: 'iife',
  },
  plugins: [
    json(),
    buble(),
    progress(progressOptions),
  ],
  watch: {
    clearScreen: false,
  },
};

const coreConfig = {
  input: 'src/hexagon.core.js',
  output: {
    file: 'dist/hexagon.core.js',
    format: 'esm',
  },
  plugins: [
    json(),
    coffee(),
    buble(),
    includePaths(includePathOptions),
    progress(progressOptions),
  ],
  watch: {
    clearScreen: false,
  },
};

const themeConfig = {
  input: 'src/hexagon.theme.js',
  output: {
    file: 'dist/hexagon.theme.js',
    format: 'esm',
  },
  plugins: [
    json(),
    coffee(),
    buble(),
    includePaths(includePathOptions),
    progress(progressOptions),
  ],
  watch: {
    clearScreen: false,
  },
};

export default [
  libraryConfig,
  coreConfig,
  themeConfig,
  printConfig,
];
