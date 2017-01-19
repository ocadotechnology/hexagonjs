const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    'hexagon.test': './modules/hexagon.spec'
  },
  output: {
    path: 'target',
    filename: '[name].js',
    library: 'hx',
    libraryTarget: 'var'
  },
  babel: {
    presets: ['es2015', 'stage-0']
  },
  isparta: {
    embedSource: true,
    noAutoWrap: true,
    babel: {
      presets: ['es2015', 'stage-0']
    }
  },
  module: {
    preLoaders: [
      {
        test: /spec.js$/,
        loader: 'babel',
        exclude: [/node_modules/]
      },
      {
        test: /.js$/,
        loader: 'isparta',
        exclude: [/spec.js$/, /node_modules/]
      },
      // {
      //   test: /.coffee$/,
      //   loader: 'coffee',
      //   exclude: [/node_modules/]
      // }
      {
        test: /spec.coffee$/,
        loader: 'coffee',
        exclude: [/node_modules/]
      },
      {
        test: /.coffee$/,
        loader: 'ibrik-instrumenter-loader',
        exclude: [/spec.coffee$/, /node_modules/]
      }
    ]
  },
  resolve: {
    root: process.cwd(),
    extensions: ['', '.coffee', '.js', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      theme: {
        plotColor1: JSON.stringify("#000000"),
        plotColor2: JSON.stringify("#000000"),
        plotColor3: JSON.stringify("#000000"),
        plotColor4: JSON.stringify("#000000"),
        plotColor5: JSON.stringify("#000000"),
        plotColor6: JSON.stringify("#000000")
      }
    })
  ]
}
