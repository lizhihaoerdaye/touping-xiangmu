const { app } =  require('electron');
const isDev = require('electron-is-dev')
const {create: createMainWindow,show:showMainWindow,close:closeMainWindow} = require('./windows/main')
const handleIPC = require('./ipc')
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
        if(!isDev){
            // 自动更新
            // require('./automaticUpdater.js')
            
            // 手动更新
            require('./manualUpdate.js')
        }
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
    // app.whenReady().then(()=>{
    //     showMainWindow()
    // })
}