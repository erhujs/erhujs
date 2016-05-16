var vue = require('vue-loader')
var path = require('path')
var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var projectRoot = path.resolve(__dirname, '../')
var cssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader')

module.exports = {
  entry: {
    app: './app/app.js'
  },
  output: {
    path: './build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.vue$/,
    //     loader: 'eslint',
    //     include: projectRoot,
    //     exclude: /node_modules/
    //   },
    //   {
    //     test: /\.js$/,
    //     loader: 'eslint',
    //     include: projectRoot,
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        include: projectRoot,
        exclude: /node_modules|lib/,
        loader: 'babel'
      },
      { 
        test: /\.css$/, 
        loader: cssLoader 
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader!stylus-loader')
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  devtool: '#source-map',
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}

if (process.env.NODE_ENV === 'production') {
  
  delete module.exports.devtool
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
    // new ExtractTextPlugin('build.css')
  ]
} else {
  // module.exports.plugins = [
  //   new ExtractTextPlugin('build.css')
  // ]
  // module.exports.devtool = '#source-map'
}