'use strict'

const path = require('path')
const electron = require('electron')
const windowStateKeeper = require('electron-window-state')
const ipcMain = electron.ipcMain
const app = electron.app
const Menu = electron.Menu
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

  var sslCaDir = path.resolve(app.getPath('userData'), 'ssl')
  console.log('sslCaDir', sslCaDir)
	// setup proxy server
  proxy({
    port: 8888,
    sslCaDir
  }, {
    onRequest: (req) => {
      mainWindow.webContents.send('request', req)
    },
    onRequestData: (req) => {
      mainWindow.webContents.send('request-data', req)
    },
    onRequestEnd: (req) => {
      mainWindow.webContents.send('request-end', req)
    },
    connected: (req) => {
      mainWindow.webContents.send('connected', req)
    },
    onResponse: (req, res) => {
      mainWindow.webContents.send('response', req, res)
    },
    onResponseData: (req, res) => {
      mainWindow.webContents.send('response-data', req, res)
    },
    onResponseEnd: (req, res) => {
      mainWindow.webContents.send('response-end', req, res)
    }
  })
	// netproxy(mainWindow.webContents, options)

	// mainWindow.setMenu(null)
	// mainWindow.setMenuBarVisibility(false)

	// Load the HTML file directly from the webpack dev server if
	// hot reload is enabled, otherwise load the local file.
	const mainURL = process.env.HOT
		? `http://localhost:${process.env.PORT}/main.html`
		: 'file://' + path.join(__dirname, 'main.html')
	console.log(mainURL)

	mainWindow.loadURL(mainURL)

	// mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function () {

		// Dereference
		mainWindow = null
	})

	const menuTemplate = require('./server/menu')(app, {})

  console.log(menuTemplate)

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
