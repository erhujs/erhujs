const path = require('path')
const electron = require('electron')
const windowStateKeeper = require('electron-window-state')
const ipcMain = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const proxy = require('./server/proxy')

let mainWindow

function createWindow() {
	let mainWindowState = windowStateKeeper({
		defaultWidth: 1200,
		defaultHeight: 700
	})

	mainWindow = new BrowserWindow({
		'x': mainWindowState.x,
		'y': mainWindowState.y,
		'width': mainWindowState.width,
		'height': mainWindowState.height,
		// frame: false,  // without header
		// skipTaskbar: true,
		// fullscreen: true
	})

	// Load the HTML file directly from the webpack dev server if
	// hot reload is enabled, otherwise load the local file.
	const mainURL = process.env.HOT
		? `http://localhost:${process.env.PORT}/main.html`
		: 'file://' + path.join(__dirname, 'main.html')

	mainWindow.loadURL(mainURL)

	mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function () {

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

proxy({
	proxyReceive: (req) => {
		mainWindow.webContents.send('proxyReceive', req)
	},
	proxyReceived: (req) => {
		mainWindow.webContents.send('proxyReceived', req)
	},
	beforeRequest: (req) => {
		mainWindow.webContents.send('beforeRequest', req)
	},
	connect: (req) => {
		mainWindow.webContents.send('connect', req)
	},
	beforeReponse: (req, res) => {
		mainWindow.webContents.send('beforeReponse', req, res)
	},
	response: (req, res) => {
		mainWindow.webContents.send('response', req, res)
	},
	reponseEnd: (req, res) => {
		mainWindow.webContents.send('reponseEnd', req, res)
	}
})
