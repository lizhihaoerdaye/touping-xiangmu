const {BrowserWindow,BrowserView,dialog} = require('electron')
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
        icon: path.join(__dirname,'../../../resource/icon32.ico'), // sets window icon
        show: false,
        // backgroundColor:'#e5e5e5',
        // transparent:true,
        // autoHideMenuBar:true,
        title:'大屏控制',
    })
    view = new BrowserView()
    win.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 1440, height: 810 })
    view.webContents.loadFile(path.join(__dirname,'../../renderer/pages/loading/index.html'))
    view.webContents.on('dom-ready', () => {
        win.show()
    })

    //mainWindow要关闭时的方法↓
    win.on('close', e => {
        if(willQuitApp){
            win = null;
        }else{
            e.preventDefault(); //先阻止一下默认行为，不然直接关了，提示框只会闪一下
            dialog.showMessageBox({
                type: 'info',
                title: '提示',
                message:'确认退出？',
                buttons: ['确认', '取消'],   //选择按钮，点击确认则下面的idx为0，取消为1
                cancelId: 1, //这个的值是如果直接把提示框×掉返回的值，这里设置成和“取消”按钮一样的值，下面的idx也会是1
            }).then(idx => {    
            //注意上面↑是用的then，网上好多是直接把方法做为showMessageBox的第二个参数，我的测试下不成功
                console.log(idx)
                if (idx.response == 1) {
                    console.log('index==1，取消关闭')
                    e.preventDefault();
                } else {
                    console.log('index==0，关闭')
                    close() 
                }
            })
        }

        });
//    win.on('close', (e) => {
//        if (willQuitApp) {
//            win = null;
//        } else {
//            e.preventDefault();
//            win.hide();
//        }
//    })
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