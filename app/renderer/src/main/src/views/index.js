import { ipcRenderer } from 'electron';
import React ,{useState,useEffect}from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Button, Modal ,Progress} from 'antd';
import ReactMarkdown from 'react-markdown';
import compareVersions from 'compare-versions';
import { Scrollbars } from 'react-custom-scrollbars';

// import Home from './Home/Home';
// import Automatic from './Automatic/Automatic'
// import Manual from './Manual/Manual'
import Mainpage from './MainPage/Mainpage'
import EditorVideo from './EditorVideo/EditorVideo'
import EditorContent from './EditorContent/EditorContent'
import EditorHeader from './EditorHeader/EditorHeader'

// import TestPage from './TestPage/TestPage'

import 'antd/dist/antd.css';


const AllPage = (props)=>{
    const [updateVisible,setUpdateVisible] = useState(false);
    // const [updateState,setUpdateState] = useState(0);
    const [textSuccess,setTextSuccess] = useState('正在检查更新');
    const [percentage,setPercentage] = useState(0);
    const [downloadLoading,setDownloadLoading] = useState(false);
    const [downloadHidden,setDownloadHidden] = useState(false);
    const [versionNumber,setVersionNumber] = useState('');
    const [versionDate,setVersionDate] = useState('');
    const [versionExplain,setVersionExplain] = useState('');


    const handleCancel = ()=>{
        setUpdateVisible(false);
    }

    const confirmDownloadUpdate = ()=>{
        setDownloadLoading(true)
        ipcRenderer.send("confirm-downloadUpdate")
    }

    const confirmUpdate = ()=>{
        ipcRenderer.send("confirm-update");
    }

    useEffect(()=>{
        // 检测版本更新
        ipcRenderer.send('check-update');
        // 监听更新状态
        ipcRenderer.on('UpdateMsg', (event, msg, arg) => {
            switch (msg) {
                case -1:
                    // setUpdateState(-1);
                    setTextSuccess('检查更新失败');
                    break;
                case 0:
                    // setUpdateState(0);
                    setTextSuccess('正在检查更新');
                    break;
                case 1:
                    // setUpdateState(1);
                    setTextSuccess('检测到新版本，准备下载');
                    break;
                case 2:
                    // setUpdateState(2);
                    setTextSuccess('未检测到新版本');
                    break;
                case 3:
                    // setUpdateState(3);
                    setTextSuccess('下载中');
                    setPercentage(arg.percent.toFixed(1))
                    break;
                case 4:
                    // setUpdateState(4);
                    setDownloadLoading(false);
                    setTextSuccess('下载完成');
                    setDownloadHidden(true);
                    setPercentage(0);
                    break;
                default:
                    break;
            }
        })
        // 检查更新返回内容
        ipcRenderer.on('update-check-result', async(event,state,data)=>{
            // state = 1检测到了新版本信息
            // state = 2检测版本出错
            console.log(state,data)
            if(state === 1){
                const vsersionMessage = await ipcRenderer.invoke('vsersion-message');
                console.log(vsersionMessage)
                const {updateInfo} = data;
                if(compareVersions.compare(updateInfo.version,vsersionMessage,'>')){
                    setUpdateVisible(true)
                    setVersionNumber(updateInfo.version)
                    setVersionDate(updateInfo.releaseDate)
                    setVersionExplain(updateInfo.releaseNotes)
                }
                // 检测到了新版本信息
            }else if(state === 2){
                // 检测版本出错
                console.log(data)
            }
        })
        
        return()=>{
            ipcRenderer.removeListener('UpdateMsg',()=>{});
            ipcRenderer.removeListener('update-check-result',()=>{})
        }
    },[])
    return(
        <div style={{width:'100vw',height:'100vh'}}>
            <Scrollbars style={{ width: "100%", height: "100%" }}>
                <HashRouter>
                    <Switch>
                        <Route exact path={'/'} component={Mainpage} />
                        <Route exact path={'/editor-content'} component={EditorContent} />
                        <Route exact path={'/editor-header'} component={EditorHeader} />
                        <Route exact path={'/editor-video'} component={EditorVideo} />
                        {/* <Route exact path={'/test-page'} component={TestPage} /> */}
                        {/* <Route exact path={'/home-page'} component={Home} />
                        <Route exact path={'/automatic-page'} component={Automatic} />
                        <Route exact path={'/manual-page'} component={Manual} /> */}
                    </Switch>
                </HashRouter>
            <Modal
                title={textSuccess}
                visible={updateVisible}
                onCancel={handleCancel}
                destroyOnClose
                getContainer={false}
                footer={<>
                    <Button type="danger" onClick={()=>{handleCancel()}}>忽略此版本</Button>
                    <Button type="primary" style={{display:downloadHidden?'none':'inline-block'}} loading={downloadLoading} onClick={()=>{confirmDownloadUpdate()}}>下载新版本</Button>
                    <Button type="primary" style={{display:downloadHidden?'inline-block':'none'}} onClick={()=>{confirmUpdate()}}>立即重启</Button>
                    </>}
                >
                    {/* overflowX:'hidden',overflowY:'auto'} */}
                    <Scrollbars style={{ height: "50vh" }}>
                        <div style={{display:percentage===0?'none':'block'}}>
                            <Progress percent={percentage} status="active" />
                        </div>
                        <div>
                            <span>版本号 </span>
                            <span>{versionNumber}</span>
                        </div>
                        <div>
                            <span>更新时间</span><span>{versionDate}</span>
                        </div>
                        <div>
                            <div>版本说明</div>
                            <ReactMarkdown>
                                {versionExplain}
                            </ReactMarkdown>
                        </div>
                    </Scrollbars>
            </Modal>
            </Scrollbars>
        </div>
    )
}


export default AllPage