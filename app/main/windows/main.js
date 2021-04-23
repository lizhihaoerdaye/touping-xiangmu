const {BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let win
let willQuitApp = false
function create () {
    win = new BrowserWindow({
        width: 950,
        height: 650,
        webPreferences: {
            nodeIntegration: true
        },
        // frame: false,
        // show: false,
        backgroundColor:'#e5e5e5',
        // transparent:true,
        // autoHideMenuBar:true,
        title:'控制投屏',
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


module.exports = {create,send,show,close}