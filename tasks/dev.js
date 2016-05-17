// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'develop'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.conf')


var spinner = ora('building for develop...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)

var compiler = webpack(webpackConfig)

compiler.watch({ 
  // watch options:
  // wait so long for more changes
  aggregateTimeout: 300,
  // use polling instead of native watchers
  poll: true
  // pass a number to set the polling interval
}, function(err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})