import React,{useState} from 'react';
import {Button,Modal} from 'antd';
import {postSetFullScreen,postCloseFullScreen} from '../../../services/mainPage'
import styles from './BigScreen.less';

// 大屏幕模块
const BigScreen = (props)=>{
    const [screenVisible,setScreenVisible] = useState(false);
    const [btnDisable,setBtnDisable] = useState(false);
    const {mainView} = props;


    const handleCancel = ()=>{
        setBtnDisable(true);
        postCloseFullScreen({winId:mainView.id}).then(res=>{
            if(res&&res.success){
                setScreenVisible(false);
            }
            setBtnDisable(false);
        }).catch(err=>{
            setBtnDisable(false);
        })
    }
    
    const handleOpen = ()=>{
        setBtnDisable(true);
        postSetFullScreen({winId:mainView.id}).then(res=>{
            if(res&&res.success){
                setScreenVisible(true);
            }
            setBtnDisable(false);
        }).catch(err=>{
            setBtnDisable(false);
        })
    }

    return(
        <div className={styles.bigModule}>
            <div className={styles.square}>
            <div className={styles.squareInner}>
                    <div className={styles.automaticDiv}>
                        <div className={styles.rightDepend}>
                            <Button type="primary" size="large" disabled={(mainView&&mainView.id)?false:true} loading={btnDisable} onClick={()=>{handleOpen()}}>全屏</Button>
                            <Modal
                                width="100%"
                                style={{height:'100vh',top: 0}}
                                bodyStyle={{height:'100vh',borderRadius:'none',backgroundColor:'#2e2c29'}}
                                closable={false}
                                footer={null}
                                wrapClassName={styles.wrapClassName}
                                getContainer={false}
                                visible={screenVisible}
                                onCancel={handleCancel}
                                >
                                    <div className={styles.fullScreen}>
                                        <div className={styles.cancelBtn}>
                                            <Button type="primary" shape="circle" icon="close" size="large" loading={btnDisable} onClick={()=>{handleCancel()}}/>
                                        </div>
                                        <div className={styles.textShow}>
                                            hello视频
                                        </div>
                                    </div>
                            </Modal>
                        </div>
                        <div className={styles.middleDepend}>{mainView&&mainView.inputName?mainView.inputName:'无视频源'}</div>
                        <div className={styles.rightDepend}>
                            <Button disabled={(mainView&&mainView.id)?false:true} type="primary" shape="circle" icon="more"  size="large"/>
                        </div> 
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default BigScreen