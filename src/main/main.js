const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')


function createWindow(){
  const url = path.join(__dirname,'../../dist/index.html')
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  mainWindow.loadURL('http://localhost:3000/')
  // mainWindow.loadFile(url)
}



app.on('ready', function () {
  createWindow()
})
app.on('browser-window-blur', (e) => {
  console.log('blur')
})
app.on('browser-window-focus', (e) => {
  console.log('focus')
})
app.on('before-quit', function (e) {
  console.log('out');
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
       app.quit();
  }
})
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

//热更新
try {
  require('electron-reloader')(module)
} catch (_) {}

