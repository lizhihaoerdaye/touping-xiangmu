const {ipcMain} = require('electron')
const {autoUpdater} = require('electron-updater')
const {send:sendUpdateMessage} = require('./windows/main')
const uploadUrl = `http://10.168.254.159:33855/public/`

let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新',
};

autoUpdater.setFeedURL(uploadUrl);

// 检查更新出错
autoUpdater.on('error', function (error) {
    sendUpdateMessage('message',message.error)
});

// 正在检查更新……
autoUpdater.on('checking-for-update', function () {
    sendUpdateMessage('message',message.checking)
});

// 检测到新版本，正在下载……
autoUpdater.on('update-available', function (info) {
    sendUpdateMessage('message',message.updateAva,info)
});

// 现在使用的就是最新版本
autoUpdater.on('update-not-available', function (info) {
    sendUpdateMessage('message',message.updateNotAva)
});

// 更新下载进度事件
autoUpdater.on('download-progress', function (progressObj) {
    sendUpdateMessage('downloadProgress', progressObj)
})

autoUpdater.on('update-downloaded', function (event,...age) {
    // releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate
    ipcMain.on('isUpdateNow', (e, arg) => {
      console.log("开始更新");
      //some code here to handle event
      autoUpdater.quitAndInstall();
    });
    sendUpdateMessage('isUpdateNow')
});

ipcMain.on("checkForUpdate",()=>{
    //执行自动更新检查
    autoUpdater.checkForUpdates();
})