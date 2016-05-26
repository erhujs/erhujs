'use strict'

var pacResolver = require('pac-resolver')
var http = require('http')
var URL = require('url')
var pacModules = {}

function resolvePac(pac, cb) {
  if (pacModules[pac]) {
    cb(null, pacModules[pac])
  } else {
    var obj = URL.parse(pac)

    http.request({
      hostname: obj.host,
      port: obj.port || 80,
      path: pac,
      method: 'GET'
    }, (res) => {
      let body = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        cb(null, pacModules[pac] = pacResolver(body))
      })
      res.on('error', (e) => {
        cb(e)
      })
    }).end()

  }
}

module.exports = (url, pac, cb) => {
  resolvePac(pac, function (err, fn) {
    if (err) return cb(err)
    return fn(url, URL.parse(url).hostname, cb)
  })
}
