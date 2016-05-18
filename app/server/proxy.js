'use strict'

const http = require('http')
const express = require('express')
const url = require('url')
const shortid = require('shortid')

function safeCall(fn) {
	if (typeof fn != 'function') return

	var args = [].slice.call(arguments, 1)
	return fn.apply(null, args)
}

function proxy(options) {
	const server = express()

	/**
	 * Handle proxy request
	 */
	server.use((req, res) => {
		console.log('Request', req.url)
		var urlObj = url.parse(req.url)
		var host = req.headers.host || urlObj.host
		var port = url.parse(host).port || 80
		var method = req.method

		// reset port
		urlObj.port = port
			// prevent repeat port
		if (port == 80) {
			urlObj.port = ''
		}

		const id = shortid.generate()
		var reqOpts = {
			host,
			port,
			method,
			path: url.format(urlObj),
			headers: req.headers
		}
		var request = Object.assign({
			id,
			body: new Buffer('')
		}, reqOpts)

		/**
		 * @event beforeRequest
		 */
		safeCall(options.beforeRequest, request)
		var proxy = http.request(reqOpts, (proxyRes) => {
			request.server = proxy.connection.remoteAddress
				// remote ip
			var response = {
					id,
					headers: proxyRes.headers,
					data: new Buffer('')
				}
				/**
				 * @event beforeReponse
				 */
			safeCall(options.beforeReponse, request, response)
			proxyRes.on('data', (data) => {
				response.data = Buffer.concat([response.data, data], response.data.length + data.length)
					// emit response
				res.write(data)
					/**
					 * @event response
					 */
				safeCall(options.reponse, request, response)
			})
			proxyRes.on('end', () => {
				console.log('#' + id, 'Request End...')
					// emit response end
				res.end()
					/**
					 * @event reponseEnd
					 */
				safeCall(options.reponseEnd, request, response)
			})
		})

		req.on('data', function(buf) {
			proxy.write(buf)
				/**
				 * @event proxyReceive
				 */
			request.body = Buffer.concat([request.body, buf], request.body.length + buf.length)
			safeCall(options.proxyReceive, request)
		})

		req.on('end', function() {
			/**
			 * @event proxyReceived
			 */
			safeCall(options.proxyReceived, request)
			proxy.end()
		})

		// request connected
		proxy.on('socket', (socket) => {
			socket.on('connect', () => {
				/**
				 * @event connect
				 */
				request.server = socket.remoteAddress
				safeCall(options.connect, request)
			})
		})
	})


	var port = 8888
	server.listen(port, () => {
		console.log('Proxy server listen on', port)
	})
}
module.exports = proxy
