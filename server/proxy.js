const http = require('http')

db.allDocs({include_docs: true}).then(function (result) {
	console.log(result)
})
module.exports = function () {
	const server = http.createServer((req, res) => {
		res.write('ok')
		res.end()
	})
	var port = 8888
	server.listen(port, ()=>{
		db.post({
			message: 'server start on port ' + port,
			time: new Date
		}, function (err, res) {
			console.log(err, res)
		})
		console.log('Proxy server listen on', port)
	})
}