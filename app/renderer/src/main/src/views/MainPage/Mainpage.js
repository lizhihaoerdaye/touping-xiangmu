import {ipcRenderer} from 'electron'
import React,{useEffect, useState} from 'react';
import { Row, Col, Button,message,Modal } from 'antd';

import HeadTitle from './components/HeadTitle';
import SmallScreen from './components/SmallScreen';
import BigScreen from './components/BigScreen';
import InstructionsViwe from './components/InstructionsViwe';
import {getMainWins,getHeader,getIntroduction,getVideoSources,postCloseScreen,postOpenScreen,postInitWindow} from '../../services/mainPage';


import styles from './index.less';
// const styles = require('./index.less')

const Mainpage = (props)=>{
    const [mainView,setMainView] = useState({});
    const [smallView,setSmallView] = useState([]);
    const [headTextTitle,setHeadTitle] = useState(null);
    const [instructionsText,setInstructionsText] = useState(null);
    const [mainVideoSources,setMainVideoSources] = useState([]);

    const goToEditorHeader = ()=>{
        props.history.push({
            pathname:'/editor-header',
        })
    }

    
    const goToEditorVideo = ()=>{
        props.history.push({
            pathname:'/editor-video',
        })
    }

    const goToEditorRichText = ()=>{
        props.history.push({
            pathname:'/editor-content',
        })
    }

    const goToSplitScreen = ()=>{
        props.history.push({
            pathname:'/split-screen',
        })
    }

    const closeScreen = ()=>{
        postCloseScreen().then(res=>{
            if(res && res.success){
                message.success('操作成功');
            }
        }).catch(err=>{
            message.error('操作失败');
        })
    }

    const openScreen = ()=>{
        postOpenScreen().then(res=>{
            if(res && res.success){
                message.success('操作成功');
            }
        }).catch(err=>{
            message.error('操作失败');
        })
    }

    const initWindow = ()=>{
        postInitWindow().then(res=>{
            if(res && res.success){
                message.success('操作成功');
            }
        }).catch(err=>{
            message.error('操作失败');
        })
    }
    useEffect(()=>{
        // 这里代表租金挂载的生命周期
        ipcRenderer.send('stop-loading-main')
        getMainWins().then(res=>{
            if(res && res.success){
                let arr = []
                res.data.forEach((list,index)=>{
                    if(list.winId === 2){
                        setMainView(list)
                    }else{
                        arr.push(list)
                    }
                })
                setSmallView(arr)
            }
        }).catch(err=>{
            setSmallView([])
            setMainView({})
        })

        getHeader().then(res=>{
            if(res&&res.success){
                setHeadTitle(res.data)
            }
        }).catch(err=>{
            setHeadTitle(null)
        })

        getIntroduction().then(res=>{
            if(res&&res.success){
                setInstructionsText(res.data)
            }
        }).catch(err=>{
            setInstructionsText(null)
        })

        getVideoSources().then(res=>{
            if(res && res.success){
                setMainVideoSources(res.data)
            }
        })
        return()=>{
            // 这里代表租金卸载的生命周期
        }
    },[])
    return(
        <div className={styles.mainpagediv}>
            <HeadTitle headTextTitle={headTextTitle}/>
            <Row>
                <Col span={8}>
                    <SmallScreen smallView={smallView} mainVideoSources={mainVideoSources}/>
                </Col>
                <Col span={10}>
                    <BigScreen mainView={mainView} mainVideoSources={mainVideoSources}/>
                </Col>
                <Col span={6}>
                    <InstructionsViwe instructionsText={instructionsText}/>
                </Col>
            </Row>
            <Button type="primary" className={styles.editorTitle} onClick={()=>{ goToEditorHeader()}}>编辑标题</Button>
            <Button type="primary" className={styles.editorVideo} onClick={()=>{goToEditorVideo()}}>编辑视频源</Button>
            <Button type="primary" className={styles.editorIntroduce} onClick={()=>{ goToEditorRichText()}}>编辑平台</Button>
            <Button type="primary" className={styles.closeScreen} onClick={()=>Modal.confirm({
                                                title:  "关闭屏幕",
                                                content: '确定关闭屏幕吗？',
                                                okText: '确认',
                                                cancelText: '取消',
                                                onOk: () => closeScreen(),
                                            })}>关闭屏幕</Button>
            <Button type="primary" className={styles.openScreen} onClick={()=>Modal.confirm({
                                                title:  "打开屏幕",
                                                content: '确定打开屏幕吗？',
                                                okText: '确认',
                                                cancelText: '取消',
                                                onOk: () => openScreen(),
                                            })}>打开屏幕</Button>
            <Button type="primary" className={styles.initWindow} onClick={()=>Modal.confirm({
                                                title:  "初始化窗口",
                                                content: '确定初始化窗口吗？',
                                                okText: '确认',
                                                cancelText: '取消',
                                                onOk: () => initWindow(),
                                            })}>初始化窗口</Button>
            <Button type="primary" className={styles.splitScreen} onClick={()=>{ goToSplitScreen()}}>两分屏</Button>
        </div>
    )
}

export default Mainpage