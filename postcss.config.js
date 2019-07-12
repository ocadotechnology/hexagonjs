const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssImport(),
    postcssPresetEnv({
      overrideBrowserslist: [
        'last 2 Chrome versions',
        'last 2 iOS versions',
      ],
    }),
  ],
};
