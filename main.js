const electron = require('electron')
const ipcMain = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const proxy = require('./server/proxy')

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

proxy((req) => {
	mainWindow.webContents.send('request', req)
}, (res) => {
	
})