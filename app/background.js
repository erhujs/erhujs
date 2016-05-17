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
    defaultWidth: 800,
    defaultHeight: 600
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

// proxy{
//   beforeRequest: (res)=>{

//   }
// }
proxy((req) => {
  mainWindow.webContents.send('request', req)
}, (res) => {
  mainWindow.webContents.send('response', res)
})
