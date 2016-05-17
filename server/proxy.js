const http = require('http')
const express = require('express')
const net = require('net')
const url = require('url')
const shortid = require('shortid')


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

    var id = shortid.generate()
    var reqOpts = {
      host,
      port,
      method,
      path: url.format(urlObj),
      headers: req.headers
    }

		var request = Object.assign({
      id
    }, reqOpts)
		// pass to rendered process
		reqCb(request)

    // do proxy request
		var proxy = http.request(reqOpts, (proxyRes) => {
			request.server = proxy.connection.remoteAddress
			// remote ip

			console.log('#'+id, 'Response from', request.server)
			var buf = new Buffer('')
			proxyRes.on('data', (data) => {
        buf = Buffer.concat([buf, data], buf.length + data.length)
				// emit response
				res.write(data)
			})
      proxyRes.on('end', () => {
        console.log('#'+id, 'Request End...')
        resCb({
          id,
          headers: proxyRes.headers,
          data: buf
        })
        // emit response end
        res.end()
      })
    })
    // request connected
    proxy.on('socket', (socket)=>{
      socket.on('connect', () => {
        console.log('#'+id, 'socket', socket.remoteAddress)
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





