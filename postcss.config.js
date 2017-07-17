const postcssImport = require('postcss-import')
const postcssCssNext = require('postcss-cssnext')

module.exports = {
  plugins: [
    postcssImport(),
    postcssCssNext()
  ]
}
