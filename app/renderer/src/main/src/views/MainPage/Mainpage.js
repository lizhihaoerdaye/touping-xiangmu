import {ipcRenderer} from 'electron'
import React,{useEffect, useState} from 'react';
import { Row, Col} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import HeadTitle from './components/HeadTitle';
import SmallScreen from './components/SmallScreen';
import BigScreen from './components/BigScreen';
import InstructionsViwe from './components/InstructionsViwe';
import {getMainWins,getHeader,getIntroduction} from '../../services/mainPage';


import styles from './index.less';
// const styles = require('./index.less')

const Mainpage = (props)=>{
    const [mainView,setMainView] = useState({});
    const [smallView,setSmallView] = useState([]);
    const [headTextTitle,setHeadTitle] = useState(null);
    const [instructionsText,setInstructionsText] = useState(null);

    // const goToTestPage = ()=>{
    //     console.log(props)
    //     props.history.push({
    //         pathname:'/test-page',
    //         state:{name:'mainpage'}
    //     })
    // }
    useEffect(()=>{
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

        return()=>{}
    },[])
    return(
        <Scrollbars style={{ width: "100%", height: "100%" }}>
            <div className={styles.mainpagediv}>
                <HeadTitle headTextTitle={headTextTitle}/>
                <Row>
                    <Col span={8}>
                        <SmallScreen smallView={smallView}/>
                    </Col>
                    <Col span={10}>
                        <BigScreen mainView={mainView}/>
                    </Col>
                    <Col span={6}>
                        <InstructionsViwe instructionsText={instructionsText}/>
                    </Col>
                </Row>
                {/* <Button onClick={()=>{goToTestPage()}}>跳转到测试页面</Button> */}
            </div>
        </Scrollbars>
    )
}

export default Mainpage