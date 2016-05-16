const electron = require('electron')
const windowStateKeeper = require('electron-window-state')
const ipcMain = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const proxy = require('./server/proxy')

let mainWindow

function createWindow() {
	let mainWindowState = windowStateKeeper({
    defaultWidth: 1400,
    defaultHeight: 800
  })

	mainWindow = new BrowserWindow({
		'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height,
		frame: false,	// without header
		// skipTaskbar: true,
		// fullscreen: true
	})

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