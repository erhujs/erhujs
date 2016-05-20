'use strict'

const path = require('path')
const electron = require('electron')
const windowStateKeeper = require('electron-window-state')
const ipcMain = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const proxy = require('./server/proxy')
const netproxy = require('./server/netproxy')
const argv = require('minimist')(process.argv.slice(2));

let mainWindow

function createWindow() {
	let mainWindowState = windowStateKeeper({
		defaultWidth: 1000,
		defaultHeight: 700
	})


	mainWindow = new BrowserWindow({
		x: mainWindowState.x,
		y: mainWindowState.y,
		width: mainWindowState.width,
		height: mainWindowState.height,
		resizable: false,
		center: true,
		skipTaskbar: false,
		maximizable: false,
		fullscreenable: false,
		autoHideMenuBar: true,
		titleBarStyle: 'hidden-inset'
		// frame: false
	})
	// setup proxy server
	netproxy(mainWindow.webContents, {
		port: argv['proxy-port'] || 8888,
		sslCaDir: argv['ssl-ca-dir'] || path.resolve(app.getPath('userData'), 'ssl')
	})

	mainWindow.setMenu(null)
	mainWindow.setMenuBarVisibility(false)
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

// proxy({
// 	proxyReceive: (req) => {
// 		mainWindow.webContents.send('proxyReceive', req)
// 	},
// 	proxyReceived: (req) => {
// 		mainWindow.webContents.send('proxyReceived', req)
// 	},
// 	beforeRequest: (req) => {
// 		mainWindow.webContents.send('beforeRequest', req)
// 	},
// 	connect: (req) => {
// 		mainWindow.webContents.send('connect', req)
// 	},
// 	beforeReponse: (req, res) => {
// 		mainWindow.webContents.send('beforeReponse', req, res)
// 	},
// 	response: (req, res) => {
// 		mainWindow.webContents.send('response', req, res)
// 	},
// 	reponseEnd: (req, res) => {
// 		mainWindow.webContents.send('reponseEnd', req, res)
// 	}
// })
