const http = require('http')
const express = require('express')
const net = require('net')
const url = require('url')


function fixedHeaders(headers) {
    var hds = {}
    Object.keys(headers).forEach(function (name) {
        var value = headers[name]
        name = name.replace(/(^|-)([a-z])/g, function (m, s, w) {
            return (s || '') + w.toUpperCase()
        })
        hds[name] = value
    })
    return hds
}

function proxy(reqCb, resCb) {
	/**
	 * Handle proxy request
	 */
	const server = http.createServer((req, res) => {
		var urlObj = url.parse(req.url)
		var host = req.headers.host
		var port = url.parse(host).port || 80
		var path = urlObj.path || '/'
		var method = req.method

		reqCb({
			host,
			port,
			method,
			path: url.format(urlObj),
			headers: req.headers
		})
		// emit request to UI
		// var request = parseRequest(req)
		// pass through
		var proxy = http.request({
			host,
			port,
			method,
			path: url.format(urlObj),
			headers: req.headers
		}, (proxyRes) => {
			// remote ip
			// proxyRes.connection.remoteAddress
			console.log('Response from', proxy.connection.remoteAddress)
			proxyRes.on('data', (data) => {
				// emit response
				res.write(data)
			})
			proxyRes.on('end', () => {
				console.log('on end')
				// emit response end
				res.end()
			})
		})
		proxy.end()
		// proxy.on('connect', (req, cltSocket, head) => {
		// })
	})
	var port = 8888
	server.listen(port, () => {
		console.log('Proxy server listen on', port)
	})
}
module.exports = proxy





