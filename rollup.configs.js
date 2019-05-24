// import path from 'path';
// import { copy } from 'cpx';
// import postcss from 'rollup-plugin-postcss';
// import postcssImport from 'postcss-import';
// import postcssPresetEnv from 'postcss-preset-env';
import coffee from 'rollup-plugin-coffee-script';
import includePaths from 'rollup-plugin-includepaths';
import progress from 'rollup-plugin-progress';
import buble from 'rollup-plugin-buble';
import json from 'rollup-plugin-json';
import istanbul from 'rollup-plugin-istanbul';

import pkg from './package.json';

const includePathOptions = {
  include: {},
  paths: [`${__dirname}/src`, __dirname],
  external: [],
  extensions: ['.js', '.coffee'],
};

const progressOptions = {
  clearLine: false,
};

const coffeePlugin = () => coffee();
const jsonPlugin = () => json();
const bublePlugin = () => buble();
const includePathsPlugin = () => includePaths(includePathOptions);
const progressPlugin = () => progress(progressOptions);
const istanbulPlugin = () => istanbul({
  exclude: ['test/**/*', '**/*spec*'],
  reporters: ['coverage'],
  instrumenterConfig: {
    embedSource: true,
  },
  sourceMap: false,
});

// const postcssPlugin = () => postcss({
//   extract: true,
//   extensions: ['.css'],
//   plugins: [
//     postcssImport({
//       path: [
//         'src/themes',
//         'src',
//       ],
//     }),
//     postcssPresetEnv({
//       stage: 4,
//       browsers: [
//         'last 2 Chrome versions',
//         'last 2 iOS versions',
//       ],
//     }),
//   ],
// });


const sharedOpts = {
  watch: {
    clearScreen: false,
  },
};

const standardPlugins = [
  jsonPlugin(),
  coffeePlugin(),
  bublePlugin(),
  includePathsPlugin(),
  progressPlugin(),
];

const distLibraryConfig = {
  ...sharedOpts,
  input: 'src/hexagon.js',
  output: {
    file: 'dist/hexagon.js',
    format: 'iife',
    name: 'hx',
  },
  plugins: standardPlugins,
};

const demoLibraryConfig = {
  ...distLibraryConfig,
  output: {
    file: 'demo/hexagon.js',
    format: 'iife',
    name: 'hx',
  },
};

const distPrintConfig = {
  ...sharedOpts,
  input: 'src/hexagon.print.js',
  output: {
    file: 'dist/hexagon.print.js',
    format: 'iife',
  },
  plugins: [
    jsonPlugin(),
    bublePlugin(),
    progressPlugin(),
  ],
};

const demoPrintConfig = {
  ...distPrintConfig,
  output: {
    file: 'demo/hexagon.print.js',
    format: 'iife',
  },
};

const distCoreConfig = {
  ...sharedOpts,
  input: 'src/hexagon.core.js',
  output: {
    file: 'dist/hexagon.core.js',
    format: 'esm',
  },
  plugins: standardPlugins,
};

const distThemeConfig = {
  ...sharedOpts,
  input: 'src/hexagon.theme.js',
  output: {
    file: 'dist/hexagon.theme.js',
    format: 'esm',
  },
  plugins: standardPlugins,
};

const distModuleConfig = {
  ...sharedOpts,
  input: 'src/hexagon.js',
  output: [
    { file: pkg.module, format: 'esm' },
  ],
  plugins: standardPlugins,
};

const testConfig = {
  ...sharedOpts,
  input: 'src/hexagon.spec.js',
  output: {
    file: 'target/hexagon.test.js',
    format: 'iife',
    name: 'hexagonSpec',
    globals: {
      chai: 'window.chai',
    },
  },
  external: ['chai'],
  plugins: standardPlugins,
};

const testCoverageConfig = {
  ...testConfig,
  output: {
    ...testConfig.output,
    file: 'target/hexagon.test.coverage.js',
  },
  plugins: [
    jsonPlugin(),
    coffeePlugin(),
    bublePlugin(),
    istanbulPlugin(),
    includePathsPlugin(),
    progressPlugin(),
  ],
};


const demoConfig = {
  ...sharedOpts,
  input: 'src/demo/index.js',
  output: {
    file: 'demo/index.js',
    format: 'iife',
    globals: {
      'hexagon-js': 'hx',
    },
  },
  external: ['hexagon-js'],
  plugins: standardPlugins,
};

export {
  demoConfig,
  demoLibraryConfig,
  demoPrintConfig,
  distCoreConfig,
  distLibraryConfig,
  distPrintConfig,
  distThemeConfig,
  distModuleConfig,
  testConfig,
  testCoverageConfig,
};
