const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const http = require('http')

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({width: 800, height: 600})

	mainWindow.loadURL('file://' + __dirname + '/index.html')

	mainWindow.webContents.openDevTools()

	mainWindow.on('close', function () {

		// Dereference
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

const server = http.createServer((req, res) => {
	console.log(req.url)
	res.write('ok')
	res.end()
})

server.listen('9010', ()=>{
	console.log('Proxy server listen on', 9010)
})