const { app } =  require('electron');
const {create: createMainWindow,show:showMainWindow,close:closeMainWindow} = require('./windows/main')
const handleIPC = require('./ipc')
if(require('electron-squirrel-startup')) app.quit()
// 禁止多开
const gotTheLock = app.requestSingleInstanceLock()
if(!gotTheLock){
    app.quit()
}else{
    app.on('second-instance', () => {
        // 当运行第二个实例时,将会聚焦到myWindow这个窗口
        showMainWindow()
    })
    app.on('will-finish-launching', () => {
        require('./updater.js')
    })
    app.on('ready', () => {
        createMainWindow()
        handleIPC()
        require('./trayAndMenu')
    })
    app.on('before-quit', () => {
        closeMainWindow()
    })
    app.on('activate', () => {
        // process.crash()
        showMainWindow()
    })
}