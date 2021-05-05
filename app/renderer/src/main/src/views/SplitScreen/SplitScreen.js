import {ipcRenderer} from 'electron'
import React,{useEffect, useState} from 'react';
import { Row, Col, Button,message } from 'antd';

import HeadTitle from './components/HeadTitle';
import MiddleScreen from './components/MiddleScreen';
import RightMiddleScreen from './components/RightMiddleScreen';
import {getSplitScreenWins,getHeader,getVideoSources,postSetSplitScreen,postCloseSplitScreen} from '../../services/mainPage';


import styles from './index.less';
// const styles = require('./index.less')

const SplitScreen = (props)=>{
    const [leftView,setLeftView] = useState({});
    const [rightView,setRightView] = useState([]);
    const [headTextTitle,setHeadTitle] = useState(null);
    const [mainVideoSources,setMainVideoSources] = useState([]);


    const goBack = () => {
        postCloseSplitScreen();
        props.history.goBack();
      }

    useEffect(()=>{
        // 这里代表租金挂载的生命周期
        ipcRenderer.send('stop-loading-main')
        getSplitScreenWins().then(res=>{
            if(res && res.success){
                res.data.forEach((list,index)=>{
                    if(list.winId === 9){
                        setLeftView(list)
                    }else if(list.winId === 10){
                        setRightView(list)
                    }
                })
                postSetSplitScreen()
            }
        }).catch(err=>{
            setLeftView([])
            setRightView({})
            message.error('获取数据失败');
        })

        getHeader().then(res=>{
            if(res&&res.success){
                setHeadTitle(res.data)
            }
        }).catch(err=>{
            setHeadTitle(null)
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
            <Button className={styles.goBack} type="danger" onClick={goBack}>返回</Button>
            <Row>
                <Col span={12}>
                    <MiddleScreen  mainView={leftView} mainVideoSources={mainVideoSources}/>
                </Col>
                <Col span={12}>
                    <RightMiddleScreen  mainView={rightView} mainVideoSources={mainVideoSources}/>
                </Col>
            </Row>
        </div>
    )
}

export default SplitScreen