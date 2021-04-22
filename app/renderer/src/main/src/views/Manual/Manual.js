import React ,{useState,useEffect}from 'react'
import { ipcRenderer } from 'electron'
import ReactMarkdown from 'react-markdown'

//'UpdateMsg'  -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载完成

const Manual = () =>{
    const [displayState,setDisplayState] = useState('none')
    const [percentage,setPercentage] = useState(0);
    const [updateSuccess,setUpdateSuccess] = useState('none');
    const [textSuccess,setTextSuccess] = useState('');
    const [markdownStr] = useState('# electron + rreact 投屏项目\r\n\r\n# Getting Started with Create React App\r\n\r\nThis project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\r\n\r\n## Available Scripts\r\n\r\nIn the project directory, you can run:\r\n\r\n### `yarn start`\r\n\r\nRuns the app in the development mode.\\\r\nOpen [http://localhost:3000](http://localhost:3000) to view it in the browser.\r\n\r\nThe page will reload if you make edits.\\\r\nYou will also see any lint errors in the console.')
    useEffect(()=>{
        // 监听更新状态
        ipcRenderer.on('UpdateMsg', (event, msg, arg) => {
            switch (msg) {
                case -1:
                    setTextSuccess('检查更新失败');
                    break;
                case 0:
                    setTextSuccess('正在检查更新');
                    break;
                case 1:
                    setTextSuccess('检测到新版本，准备下载');
                    setDisplayState('inline-block');
                    break;
                case 2:
                    setTextSuccess('未检测到新版本');
                    break;
                case 3:
                    setTextSuccess('下载中');
                    setPercentage(arg.percent.toFixed(1))
                    break;
                case 4:
                    setTextSuccess('下载完成');
                    setUpdateSuccess('inline-block')
                    break;
                default:
                    break;
            }
        })
        // 检查更新返回内容
        ipcRenderer.on('update-check-result',(event,state,data)=>{
            console.log(state,data)
            // if(state === 1){
                
            // }else if(state === 2){

            // }
        })
        return()=>{
            ipcRenderer.removeListener('UpdateMsg',()=>{});
            ipcRenderer.removeListener('update-check-result',()=>{})
        }
    },[])
    const confirmDownloadUpdate = ()=>{
        ipcRenderer.send("confirm-downloadUpdate")
    }
    const confirmUpdate = ()=>{
        ipcRenderer.send("confirm-update");
    }
    const checkUpdate = () =>{
        console.log('去手动更新')
        ipcRenderer.send("check-update");
    }
    return(
        <div>
            <div>{textSuccess}</div>
            <div>手动更新页面</div>
            <div>下载进度{percentage}</div>
            <div><button onClick={()=>{checkUpdate()}}>手动更新</button></div>
            <div><button style={{display:displayState}} onClick={()=>{confirmDownloadUpdate()}}>下载新版本</button></div>
            <div><button style={{display:updateSuccess}} onClick={()=>{confirmUpdate()}}>下载完成后点击</button></div>
            <div>
                <ReactMarkdown>
                    {markdownStr}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default Manual;