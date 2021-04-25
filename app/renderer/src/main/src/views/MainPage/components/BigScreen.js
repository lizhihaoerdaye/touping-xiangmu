import React,{useState} from 'react';
import {Button,Modal,Select } from 'antd';
import {postSetFullScreen,postCloseFullScreen,getVideoSources,postSwitchSignal} from '../../../services/mainPage'
import styles from './BigScreen.less';
const { Option } = Select;

// 大屏幕模块
const BigScreen = (props)=>{
    const [screenVisible,setScreenVisible] = useState(false);
    const [btnDisable,setBtnDisable] = useState(false);
   
    const {mainView} = props;
    const [winName,setWinName] = useState(null);

    const [selectVisible,setSelectVisible] = useState(false);
    const [sources, setSources] = useState([]);



    const handleCancel = ()=>{
        setBtnDisable(true);
        postCloseFullScreen({winId:mainView.winId}).then(res=>{
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
        postSetFullScreen({winId:mainView.winId}).then(res=>{
            if(res&&res.success){
                setScreenVisible(true);
            }
            setBtnDisable(false);
        }).catch(err=>{
            setBtnDisable(false);
        })
    }

    //从后端接口动态获取Sources的方法
    const getSourcesList=()=> {
        const that = this;
        getVideoSources()
            .then(function (res) {
                setSources(res.data);
            });
    }

    const handleSelectEnd = (value)=>{
      
        console.log("input = "+JSON.stringify(value));
        let input = value.split("|-|")[0];
        let name = value.split("|-|")[1];
        postSwitchSignal({winId:mainView.winId,input:input}).then(res=>{
            if(res&&res.success){
                setSelectVisible(false);
                // mainView.inputName=name;
                setWinName(name);
            }
        }).catch(err=>{
            setSelectVisible(false);
        })
    }
    
    const handleSelect = ()=>{
        setSelectVisible(true);
        getSourcesList();
    }

    const handleChange = ()=>{
       
    }

    return(
        <div className={styles.bigModule}>
            <div className={styles.square}>
            <div className={styles.squareInner}>
                    <div className={styles.automaticDiv}>
                        <div className={styles.rightDepend}>
                            <Button type="primary" size="large" disabled={(mainView&&mainView.winId)?false:true} loading={btnDisable}  icon="fullscreen"  onClick={()=>{handleOpen()}}></Button>
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
                                            <Button type="primary" shape="circle" icon="fullscreen-exit"  size="large" loading={btnDisable} onClick={()=>{handleCancel()}}/>
                                        </div>
                                        <div className={styles.textShow}>
                                            {/* {mainView&&mainView.inputName?mainView.inputName:''} */}
                                            {winName}
                                        </div>
                                    </div>
                            </Modal>
                        </div>
                        <div className={styles.middleDepend}>{winName?winName:'无视频源'}</div>
                        <div className={styles.rightDepend}>
                            <Button disabled={(mainView&&mainView.winId)?false:true} type="primary" shape="circle" icon="more"  size="large"  onClick={()=>{handleSelect()}}/>
                            <Modal
                                
                                style={{height:'70vh',top: '15vh'}}
                                bodyStyle={{height:'70vh',borderRadius:'none',backgroundColor:'#2e2c29'}}
                                closable={false}
                                footer={null}
                                wrapClassName={styles.wrapClassName}
                                getContainer={false}
                                visible={selectVisible}
                                onCancel={handleSelectEnd}
                                >
                                    <div className={styles.fullScreen}>
                                        <Select
                                        style={{ width: 240 }}
                                        defaultValue={Option.valueOf() }
                                        onChange={value => handleSelectEnd(value)}
                                        allowClear
                                        >
                                        {
                                            sources.map((item,i)=>{
                                                return(
                                                    <Option index={i} value={item.input+"|-|"+item.name}>{item.name}</Option>
                                                 )
                                                }
                                            )
                                        }
                                        </Select>
                                       
                                    </div>
                            </Modal>
                        </div> 
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default BigScreen