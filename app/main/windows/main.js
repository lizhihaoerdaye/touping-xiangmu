const {BrowserWindow,BrowserView} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let win
let view
let willQuitApp = false
function create () {
    win = new BrowserWindow({
        width: 1440,
        height: 810,
        webPreferences: {
            nodeIntegration: true
        },
        // frame: false,
        show: false,
        // backgroundColor:'#e5e5e5',
        // transparent:true,
        // autoHideMenuBar:true,
        title:'控制投屏',
    })
    view = new BrowserView()
    win.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 950, height: 650 })
    view.webContents.loadFile(path.join(__dirname,'../../renderer/pages/loading/index.html'))
    view.webContents.on('dom-ready', () => {
        win.show()
    })
    win.on('close', (e) => {
        if (willQuitApp) {
            win = null;
        } else {
            e.preventDefault();
            win.hide();
        }
    })
    if (isDev) {
        win.loadURL('http://localhost:3000')
    } else {
        win.loadFile(path.resolve(__dirname, '../../renderer/pages/main/index.html'))
    }
}
function send(channel, ...args) {
    win.webContents.send(channel, ...args)
}

function show() {
    win.show()
}

function close() {
    willQuitApp = true
    win.close()
}

function removeView(){
    win.removeBrowserView(view)
}

// 进度条
function pushProgressBar(num){
    win.setProgressBar(num)
}


module.exports = {create,send,show,close,removeView,pushProgressBar}