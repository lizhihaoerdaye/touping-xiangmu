import {ipcRenderer} from 'electron'
import React,{useEffect, useState} from 'react';
import { Row, Col, Button} from 'antd';

import HeadTitle from './components/HeadTitle';
import SmallScreen from './components/SmallScreen';
import BigScreen from './components/BigScreen';
import InstructionsViwe from './components/InstructionsViwe';
import {getMainWins,getHeader,getIntroduction,getVideoSources} from '../../services/mainPage';


import styles from './index.less';
// const styles = require('./index.less')

const Mainpage = (props)=>{
    const [mainView,setMainView] = useState({});
    const [smallView,setSmallView] = useState([]);
    const [headTextTitle,setHeadTitle] = useState(null);
    const [instructionsText,setInstructionsText] = useState(null);
    const [mainVideoSources,setMainVideoSources] = useState([]);

    const goToEditorVideo = ()=>{
        props.history.push({
            pathname:'/editor-video',
        })
    }

    const goToEditorRichText = ()=>{
        props.history.push({
            pathname:'/editor-rich-Text',
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
            <Button type="primary" className={styles.editorVideo} onClick={()=>{goToEditorVideo()}}>编辑视频源名称</Button>
            <Button type="primary" className={styles.editorIntroduce} onClick={()=>{ goToEditorRichText()}}>编辑平台介绍</Button>
        </div>
    )
}

export default Mainpage