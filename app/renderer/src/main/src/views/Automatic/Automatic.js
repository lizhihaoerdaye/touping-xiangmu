import React,{useState,useEffect} from 'react';
import {ipcRenderer} from 'electron';
const Automatic = (props) =>{
    const [text,setText] = useState('');
    const [downloadPercent,setDownloadPercent] = useState(0);
    const testBtn = ()=>{
        ipcRenderer.send("checkForUpdate");
    }
    useEffect(()=>{
        ipcRenderer.on("message", (event, text,...arg) => {
            console.log(...arg)
            setText(text || '')
        });
        //注意：“downloadProgress”事件可能存在无法触发的问题，只需要限制一下下载网速就好了
        ipcRenderer.on("downloadProgress", (event, progressObj)=> {
            console.log(progressObj);
            setDownloadPercent(progressObj.percent || 0)
        });
        ipcRenderer.on("isUpdateNow", () => {
            ipcRenderer.send("isUpdateNow");
        });
        return()=>{
            ipcRenderer.removeListener("message",()=>{})
            ipcRenderer.removeListener("downloadProgress",()=>{})
            ipcRenderer.removeListener("isUpdateNow",()=>{})
        }
    },[])
    return(
        <div>
            Automatic自动更新页面
            <div>{text}</div>
            <div>{downloadPercent}</div>
            <button onClick={()=>{testBtn()}}>测试更新</button>
        </div>
    )
}

export default Automatic;
