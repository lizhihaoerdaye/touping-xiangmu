import React,{useState} from 'react';
import {Button,Modal,Select } from 'antd';
import {postSetFullScreen,postCloseFullScreen,postSwitchSignal} from '../../../services/mainPage'
import styles from './BigScreen.less';
const { Option } = Select;

// 大屏幕模块
const BigScreen = (props)=>{
    const [screenVisible,setScreenVisible] = useState(false);
    const [btnDisable,setBtnDisable] = useState(false);
   
    const {mainView,mainVideoSources} = props;
    const [winName,setWinName] = useState(null);

    const [selectVisible,setSelectVisible] = useState(false);

    const [initialSelVal,setInitialSelVal] = useState(undefined);

    const [myTopPositioning,setTopPositioning] = useState(0);
    const [myLeftPositioning,setLeftPositioning] = useState(0);

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


    const handleSelectEnd = (value)=>{      
        console.log("input = "+value);
        if(!value){
            setSelectVisible(false);
        }else{
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
       
    }
    
    const handleSelect = (e)=>{
        setTopPositioning(e.clientY)
        setLeftPositioning(e.clientX)
        setSelectVisible(true);
        if(mainVideoSources.length>0){
            mainVideoSources.forEach((list,index)=>{
                if(list.name === mainView.inputName){
                    setInitialSelVal(list.input+"|-|"+list.name)
                }
            })
        }
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
                                            {winName?winName:mainView.inputName}
                                        </div>
                                    </div>
                            </Modal>
                        </div>
                        <div className={styles.middleDepend}>{winName?winName:mainView.inputName}</div>
                        <div className={styles.rightDepend}>
                            <Button disabled={(mainView&&mainView.winId)?false:true} type="primary" shape="circle" icon="more"  size="large"  onClick={(e)=>{handleSelect(e)}}/>
                            <Modal
                                width={240}
                                style={{position:'absolute',left:myLeftPositioning,top: myTopPositioning}}
                                bodyStyle={{padding:'0px'}}
                                closable={false}
                                footer={null}
                                wrapClassName={styles.wrapSmallClassName}
                                getContainer={false}
                                visible={selectVisible}
                                onCancel={handleSelectEnd.bind(this,0)}
                                >
                                    <div className={styles.fullScreen}>
                                        <Select
                                        style={{ width: 240 }}
                                        value={initialSelVal}
                                        onChange={value => handleSelectEnd(value)}
                                        allowClear
                                        >
                                        {
                                            mainVideoSources.map((item,i)=>{
                                                return(
                                                    <Option key={item.input+"|-|"+item.name} index={i} value={item.input+"|-|"+item.name}>{item.name}</Option>
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