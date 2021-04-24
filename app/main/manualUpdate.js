const {ipcMain} = require('electron')
const {autoUpdater} = require('electron-updater')
const {send:sendUpdateMessage,pushProgressBar} = require('./windows/main')
const uploadUrl = `http://192.168.31.207:3100/public/`
// 192.168.31.207:3100
	  
// 49.232.150.90:3000
// 在下载之前将autoUpdater的autoDownload属性设置成false，通过渲染进程触发主进程事件来实现这一设置(将自动更新设置成false)
autoUpdater.autoDownload = false
autoUpdater.setFeedURL(uploadUrl);

//'UpdateMsg'  -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载完成

// 当更新发生错误的时候触发。
autoUpdater.on('error', (err) => {
    sendUpdateMessage('UpdateMsg',-1)
})

// 当开始检查更新的时候触发
autoUpdater.on('checking-for-update', (event, arg) => {
    sendUpdateMessage('UpdateMsg', 0)
})

// 发现可更新数据时
autoUpdater.on('update-available', (event, arg) => {
    sendUpdateMessage('UpdateMsg', 1)
})

// 没有可更新数据时
autoUpdater.on('update-not-available', (event, arg) => {
    sendUpdateMessage('UpdateMsg', 2)
})

// 下载监听
autoUpdater.on('download-progress', (progressObj) => {
    sendUpdateMessage('UpdateMsg', 3, progressObj)
    if(progressObj && progressObj.percent){
        pushProgressBar(progressObj.percent/100)
    }
})

// 下载完成
autoUpdater.on('update-downloaded', () => {
    sendUpdateMessage('UpdateMsg', 4)
})

// 执行更新检查
ipcMain.on('check-update', () => {
    autoUpdater.checkForUpdates().then((data)=>{
        sendUpdateMessage('update-check-result', 1 , data)
    }).catch(err => {
        sendUpdateMessage('update-check-result', 2 , '网络出错！')
    })
})

// 退出并安装
ipcMain.on('confirm-update', () => {
    autoUpdater.quitAndInstall()
})

// 手动下载更新文件
ipcMain.on('confirm-downloadUpdate', () => {
    autoUpdater.downloadUpdate()
})