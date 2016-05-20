'use strict'

const http = require('http')
const https = require('https')
const express = require('express')
const url = require('url')
const fs = require('fs')
const shortid = require('shortid')
const httpolyglot = require('httpolyglot')
const MITMProxy = require('http-mitm-proxy');
const debug = require('debug')('Proxy')

function safeCall(fn) {
  if (typeof fn != 'function') return

  var args = [].slice.call(arguments, 1)
  return fn.apply(null, args)
}

function createProxy(opts, callbacks) {
  let proxy = new MITMProxy()

  proxy.onError((ctx, err, cb) => {
    debug('Error', err)
    return cb()
  })
  proxy.onRequest(function (ctx, calback) {
    const id = shortid.generate()
    let req = ctx.clientToProxyRequest
    let urlObj = url.parse(req.url)
    let host = req.headers.host || urlObj.host
    let port = url.parse(host).port || 80
    let method = req.method

    debug('#'+id, 'onRequest', req.url)

    let request = {
      id,
      host,
      port,
      method,
      protocol: ctx.isSSL ? 'https' : 'http',
      path: url.format(urlObj),
      headers: req.headers,
      body: new Buffer('')
    }
    /**
     * @event request
     */
    safeCall(callbacks.onRequest, request)
    /**
     * @event onRequestData
     */
    ctx.onRequestData((ctx, chunk, cb) => {
      debug('#'+id, 'onRequestData', chunk.length)

      request.body = Buffer.concat([request.body, chunk], request.body.length + chunk.length)
      safeCall(callbacks.onRequestData, request)
      return cb(null, chunk)
    })
    /**
     * @event onRequestEnd
     */
    ctx.onRequestEnd((ctx, cb) => {
      debug('#'+id, 'onRequestEnd')

      safeCall(callbacks.onRequestEnd, request)
      return cb()
    })
    /**
     * @event onResponse
     */
    var response = {
      id,
      data: new Buffer('')
    }
    ctx.onResponse((ctx, cb) => {

      let proxyReq = ctx.proxyToServerRequest
      let proxyRes = ctx.serverToProxyResponse

      request.server = proxyReq.connection.remoteAddress
      response.headers = proxyRes.headers

      debug('#'+id, 'onResponse', request.server)
      safeCall(callbacks.onResponse, request, response)
      return cb()
    })
    ctx.onResponseData((ctx, chunk, cb) => {
      response.data = Buffer.concat([response.data, chunk], response.data.length + chunk.length)
      safeCall(callbacks.onResponseData, request, response)
      return cb(null, chunk)
    })
    ctx.onResponseEnd((ctx, cb) => {
      debug('#'+id, 'onResponseEnd')
      safeCall(callbacks.onResponseEnd, request, response)
      return cb()
    })
    /**
     * Erhu extend method
     * @event connected
     */
    req.on('socket', (socket) => {
      socket.on('connected', () => {
        request.server = socket.remoteAddress
        safeCall(callbacks.connected, request)
      })
    })

    return calback()

  })

  proxy.listen({
    slient: true,
    port: opts.port,
    sslCaDir: opts.sslCaDir,
    forceSNI: true,
    httpsPort: 8889
  })

}
module.exports = createProxy
