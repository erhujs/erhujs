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
		var host = req.headers.host || urlObj.host
		var port = url.parse(host).port || 80
		var path = urlObj.path || '/'
		var method = req.method

		// reset port
		urlObj.port = port
		// prevent repeat port
		if (port == 80) {
			urlObj.port = ''
		}

		var requestOpts = {
			host,
			port,
			method,
			path: url.format(urlObj),
			headers: req.headers
		}
		// pass to rendered process
		reqCb(requestOpts)
		var proxy = http.request(requestOpts, (proxyRes) => {
			requestOpts.server = proxy.connection.remoteAddress
			// remote ip
			// proxyRes.connection.remoteAddress
			console.log('Response from', requestOpts.server)
			var buf = new Buffer('')
			proxyRes.on('data', (data) => {
				buf = Buffer.concat([buf, data], buf.length + data.length)
				// emit response
				res.write(data)
			})
			proxyRes.on('end', () => {
				resCb({
					headers: proxyRes.headers,
					data: buf
				})
				// emit response end
				res.end()
			})
		})
		proxy.end()
	})
	var port = 8888
	server.listen(port, () => {
		console.log('Proxy server listen on', port)
	})
}
module.exports = proxy





