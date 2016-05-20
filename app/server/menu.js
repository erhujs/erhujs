'use strict'

const shell = require('electron').shell
const path = require('path')

function buildMenu(app, options) {
  const template = [{
    label: 'Edit',
    submenu: [{
      label: 'Undo',
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo'
    }, {
      label: 'Redo',
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: 'Cut',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
    }, {
      label: 'Copy',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    }, {
      label: 'Paste',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
    }, {
      label: 'Select All',
      accelerator: 'CmdOrCtrl+A',
      role: 'selectall'
    }]
  }, {
    label: 'Tools',
    submenu: [{
      label: 'Root Certificate',
      click: () => {
        shell.showItemInFolder(path.resolve(options.sslCaDir, 'certs', 'ca.pem'))
      }
    }]
  }, {
    label: 'View',
    submenu: [{
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click(item, focusedWindow) {
        if (focusedWindow) focusedWindow.reload();
      }
    }, {
      label: 'Toggle Full Screen',
      accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
      }
    }, {
      label: 'Toggle Developer Tools',
      accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.toggleDevTools();
      }
    }, ]
  }]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [{
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => app.quit()
      }]
    })
  }

  return template
}

module.exports = buildMenu
