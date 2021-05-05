import React,{useState} from 'react';
import {Button,Modal,Select } from 'antd';
import {postSwitchSignal} from '../../../services/mainPage'
import styles from './RightMiddleScreen.less';
const { Option } = Select;

// 两分屏幕模块
const RightMiddleScreen = (props)=>{

    const {mainView,mainVideoSources} = props;
    const [winName,setWinName] = useState(null);

    const [selectVisible,setSelectVisible] = useState(false);

    const [initialSelVal,setInitialSelVal] = useState(undefined);

    const [myTopPositioning,setTopPositioning] = useState(0);
    const [myLeftPositioning,setLeftPositioning] = useState(0);

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
                        <div className={styles.middleDepend}>{winName?winName:mainView.inputName}</div>
                        <div className={styles.leftDepend}>
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

export default RightMiddleScreen