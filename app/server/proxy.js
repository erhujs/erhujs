'use strict'

const http = require('http')
const https = require('https')
const url = require('url')
const fs = require('fs')
const net = require('net')
const path = require('path')
const shortid = require('shortid')
const httpolyglot = require('httpolyglot')
const MITMProxy = require('http-mitm-proxy');
const debug = require('debug')('Proxy')
const MITMProxyPatch = require('./lib/mitm-proxy-patch')
MITMProxyPatch(MITMProxy.Proxy)

function createProxy(opts, callbacks) {
  let proxy = new MITMProxy()

  proxy.onError((ctx, err) => {
    debug('Error', err)
  })

  proxy.onConnect(function (req, socket, head, callback) {
    let id = shortid.generate()
    let debug = bindDebug(`#${id}`)
    let urlObj = url.parse(`https://${req.url}`)
    let host = urlObj.hostname
    let port = urlObj.port || 443
    let method = 'TUNNEL'
    let request = {
      id,
      host,
      port,
      method,
      protocol: 'https',
      url: `https://${req.url}`,
      path: '',
      headers: req.headers,
      body: new Buffer(''),
      remoteAddress: '',
      cookies: {}
    }
    let response = {
      id,
      data: new Buffer(''),
      statusCode: 200,
      statusMessage: '',
      headers: {}
    }
    debug('Tunnel to', req.url)
    /**
     * @event request
     */
    emitEvent(callbacks.onRequest, request)
    /**
     * @event request
     */
    emitEvent(callbacks.onRequestEnd, request)
    let conn = net.connect(port, host, function(){
      debug('Tunnel connected', conn.remoteAddress)
      request.remoteAddress = conn.remoteAddress
      /**
       * @event connected
       */
      emitEvent(callbacks.onConnected, request)
      socket.write('HTTP/1.1 200 OK\r\n\r\n', 'UTF-8', function(){
        debug('Tunnel response')
        /**
         * @event response
         */
        emitEvent(callbacks.onResponse, request, response)
        conn.pipe(socket)
        socket.pipe(conn)
      })
    })
    conn.on('data', function (chunk) {
      response.data = Buffer.concat([response.data, chunk], response.data.length + chunk.length)
      /**
       * @event responseData
       */
      emitEvent(callbacks.onResponseData, chunk)
    })
    conn.on('end', function () {
      debug('Tunnel end')
      /**
       * @event responseEnd
       */
      emitEvent(callbacks.onResponseEnd, request, response)
    })
    conn.on('error',function(e){
      debug('Tunnel error', e)
      response.statusMessage = e.message || error
    })
  })
  proxy.onRequest(function (ctx, calback) {
    let id = shortid.generate()
    let debug = bindDebug(`#${id}`)
    let req = ctx.clientToProxyRequest
    let urlObj = url.parse(req.url)
    let host = req.headers.host || urlObj.host
    let port = url.parse(host).port || 80
    let method = req.method
    let internalProxy = process.env['http_proxy'] || process.env['HTTP_PROXY']

    if (internalProxy) {
      var proxyObj = url.parse(internalProxy)
      if (!proxyObj.hostname) return
      var reqOpts = ctx.proxyToServerRequestOptions
      Object.assign(reqOpts, {
        host: proxyObj.hostname,
        port: proxyObj.port || 80,
        path: `http://${host}${port == 80 ? '':':'+port}${urlObj.path || '/'}`
      })
      debug('HTTP proxy', internalProxy)
    }

    debug('HTTP request', req.url)
    let request = {
      id,
      host,
      port,
      method,
      protocol: ctx.isSSL ? 'https' : 'http',
      url: req.url,
      path: urlObj.path,
      headers: req.headers,
      body: new Buffer(''),
      remoteAddress: '',
      cookies: {}
    }
    /**
     * @event request
     */
    emitEvent(callbacks.onRequest, request)
    /**
     * @event onRequestData
     */
    ctx.onRequestData((ctx, chunk, cb) => {
      debug('HTTP request-data')
      request.body = Buffer.concat([request.body, chunk], request.body.length + chunk.length)
      emitEvent(callbacks.onRequestData, request)
      return cb(null, chunk)
    })
    /**
     * @event request-end
     */
    ctx.onRequestEnd((ctx, cb) => {
      debug('HTTP request-end')
      emitEvent(callbacks.onRequestEnd, request)
      return cb()
    })

    let response = {
      id,
      statusCode: 0,
      statusMessage: '',
      data: new Buffer(''),
      headers: {}
    }

    /**
     * Get proxyToServerRequest instance immediately by hack
     */
    let proxyReq
    Object.defineProperty(ctx, 'proxyToServerRequest', {
      configurable: true,
      enumerable: true,
      set (v) {
        if (!proxyReq && v) {
          // call only
          proxyReq = v
          /**
           * Erhu extend method
           * @event connected
           */
          proxyReq.on('socket', (socket) => {
            socket.on('connect', () => {
              debug('HTTP connected', socket.remoteAddress)
              request.server = socket.remoteAddress
              emitEvent(callbacks.onConnected, request)
            })
          })
          // remove descriptor
          delete ctx.proxyToServerRequest
          // reset value
          ctx.proxyToServerRequest = v
        }
      }
    })
    ctx.onResponse((ctx, cb) => {
      let proxyReq = ctx.proxyToServerRequest
      let proxyRes = ctx.serverToProxyResponse

      Object.assign(response, {
        statusCode: proxyRes.statusCode,
        statusMessage: proxyRes.statusMessage,
        headers: proxyRes.headers
      })

      debug('HTTP response', request.remoteAddress)
      /**
       * @event response
       */
      emitEvent(callbacks.onResponse, request, response)
      return cb()
    })
    ctx.onResponseData((ctx, chunk, cb) => {
      response.data = Buffer.concat([response.data, chunk], response.data.length + chunk.length)
      /**
       * @event responseData
       */
      emitEvent(callbacks.onResponseData, request, response)
      return cb(null, chunk)
    })
    ctx.onResponseEnd((ctx, cb) => {
      debug('HTTP response-end')
      /**
       * @event responseEnd
       */
      emitEvent(callbacks.onResponseEnd, request, response)
      return cb()
    })

    // request pass through
    return calback()
  })

  // handle webscoket event for external
  handleWebsocket(opts, proxy)

  let port = opts.port || 8888
  proxy.listen({
    port: port,
    sslCaDir: opts.sslCaDir
  })
  debug('sslCaDir', opts.sslCaDir)
  debug('server listen on', port)

  return proxy
}
/**
 * handle webscoket event for external
 * @param  {Object} options Proxy options
 * @param  {Object} proxy   Proxy instance
 * @return {Object}         proxy instance
 */
function handleWebsocket(options, proxy) {
  proxy.onWebSocketConnection((ctx, cb) => {
    let id = shortid.generate()
    let debug = bindDebug(`#${id}`)
    debug('WS connect')

    ctx
      .onWebSocketSend((ctx, message, flags, cb) => {
        debug('WS send')

      })
      .onWebSocketMessage((ctx, message, flags, cb) => {
        debug('WS message')

      })
      .onWebSocketFrame((ctx, type, fromServer, data, flags, cb) => {

      })
      .onWebSocketClose((ctx, code, message, cb) => {
        debug('WS close', err)

      })
      .onWebSocketError((ctx, err) => {
        debug('WS error', err)

      })
  })
  return proxy
}
/*
* Detect TLS from first bytes of data
* Inspired from https://gist.github.com/tg-x/835636
* used heuristic:
* - an incoming connection using SSLv3/TLSv1 records should start with 0x16
* - an incoming connection using SSLv2 records should start with the record size
*   and as the first record should not be very big we can expect 0x80 or 0x00 (the MSB is a flag)
* - everything else is considered to be unencrypted
*/
function isTLS(head) {
  return head[0] == 0x16 || head[0] == 0x80 || head[0] == 0x00
}
/**
 * Check callback type and emit safely
 */
function emitEvent(fn) {
  if (typeof fn != 'function') return

  var args = [].slice.call(arguments, 1)
  return fn.apply(null, args)
}
function bindDebug() {
  var args = [].slice.call(arguments)
  args.unshift(null)
  return debug.bind.apply(debug, args)
}
module.exports = createProxy
