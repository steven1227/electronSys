// Modules to control application life and create native browser window
const {app, BrowserWindow,ipcMain, shell} = require('electron')
const fs = require('fs')
const os = require('os')
const path = require('path');

var AppDirectory = require('appdirectory')
var dirs = new AppDirectory('mycws')
if (!fs.existsSync(dirs.userConfig())) {
    fs.mkdirSync(dirs.userConfig());
}
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1400, height: 980})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

ipcMain.on('print-to-pdf',function(event,arg){
  const pdfPath = path.join(dirs.userConfig(), 'result.pdf');
  const win = BrowserWindow.fromWebContents(event.sender);
  console.log(pdfPath)
  win.webContents.printToPDF({},function(err,data){
    if(err){
      return console.log(err.message);
    }
    fs.writeFile(pdfPath,data,function(error){
      if(error){
          return console.log(err.message);
        }
        event.sender.send("wrote-pdf",pdfPath)
    })
  })

})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
