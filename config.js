// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, 'build/index.html'),
    assetsRoot: path.resolve(__dirname, 'build'),
    assetsSubDirectory: '/',
    assetsPublicPath: '.',
    productionSourceMap: true
  }
}
