import coffee from 'rollup-plugin-coffee-script';
import includePaths from 'rollup-plugin-includepaths';
import buble from 'rollup-plugin-buble';
import progress from 'rollup-plugin-progress';
import json from 'rollup-plugin-json';
import istanbul from 'rollup-plugin-istanbul';

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
    file: 'target/hexagon.js',
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

const testConfig = {
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

const testCoverageConfig = {
  input: 'src/hexagon.spec.js',
  output: {
    file: 'target/hexagon.test.coverage.js',
    format: 'iife',
    name: 'hexagonSpec',
    globals: {
      chai: 'window.chai',
    },
  },
  external: ['chai'],
  plugins: [
    json(),
    coffee(),
    buble(),
    istanbul({
      exclude: ['test/**/*', '**/*spec*'],
      reporters: ['coverage'],
      instrumenterConfig: {
        embedSource: true,
      },
      sourceMap: false,
    }),
    includePaths(includePathOptions),
    progress(progressOptions),
  ],
  watch: {
    clearScreen: false,
  },
};

function resolveHexagon() {
  return {
    resolveId(code) {
      if (code === 'hexagon-js') {
        return 'src/hexagon.js';
      }
      return undefined;
    },
  };
}

const demoConfig = {
  input: 'demo/index.js',
  output: {
    file: 'target/index.js',
    format: 'iife',
    name: 'hx',
  },
  plugins: [
    json(),
    coffee(),
    buble(),
    resolveHexagon(),
    includePaths(includePathOptions),
    progress(progressOptions),
  ],
  watch: {
    clearScreen: false,
  },
};

export default [
  libraryConfig,
  testConfig,
  testCoverageConfig,
  demoConfig,
];
