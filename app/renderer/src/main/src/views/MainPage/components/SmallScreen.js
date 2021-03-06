import React,{useState}  from 'react';
import classNames from "classnames";
import styles from './SmallScreen.less'
import {Button,Modal,Select } from 'antd';
import {postSetFullScreen,postCloseFullScreen,postSwitchSignal} from '../../../services/mainPage'
const { Option } = Select;

// 小屏幕模块
const SmallScreen = (props)=>{
    const [btnDisable,setBtnDisable] = useState(false);
    const [selectVisibles,setSelectVisibles] = useState([false,false,false,false,false,false]);
    const [screenVisibles, setScreenVisibles] = useState([false,false,false,false,false,false]);
    const [names, setNames] = useState([null,null,null,null,null,null]);

    const [myTopPositioning,setTopPositioning] = useState(0);
    const [myLeftPositioning,setLeftPositioning] = useState(0);



    const [initialSelVal,setInitialSelVal] = useState(undefined);
    const {smallView,mainVideoSources} = props

    
    const handleCancel = (winId,index)=>{
        setBtnDisable(true);
        postCloseFullScreen({winId:winId}).then(res=>{
            if(res&&res.success){
                const newCcreenVisibles = [...screenVisibles];
                newCcreenVisibles[index] = false;
                setScreenVisibles(newCcreenVisibles);
            }
            setBtnDisable(false);
        }).catch(err=>{
            setBtnDisable(false);
        })
    }
    
    const handleOpen = (winId,index)=>{
        setBtnDisable(true);
        postSetFullScreen({winId:winId}).then(res=>{
            if(res&&res.success){
                const newCcreenVisibles = [...screenVisibles];
                newCcreenVisibles[index] = true;
                setScreenVisibles(newCcreenVisibles);
            }
            setBtnDisable(false);
        }).catch(err=>{
            setBtnDisable(false);
        })
    }

    const handleSelect = (e,index)=>{
        setTopPositioning(e.clientY)
        setLeftPositioning(e.clientX)
        const newSelectVisibles = [...selectVisibles];
        newSelectVisibles[index] = true;
        setSelectVisibles(newSelectVisibles);
        if(mainVideoSources.length>0){
            mainVideoSources.forEach((list,ind)=>{
                if(list.name === smallView[index].inputName){
                    setInitialSelVal(list.input+"|-|"+list.name)
                }
            })
        }
        // getSourcesList();
    }

    const handleSelectEnd = (winId,index,value)=>{
      
        console.log("winId = "+winId+", index = "+index+", value = "+value);
        if(!value){
            const newSelectVisibles = [...selectVisibles];
            newSelectVisibles[index] = false;
            setSelectVisibles(newSelectVisibles);
        }
        else{
            let input = value.split("|-|")[0];
            let name = value.split("|-|")[1];
            postSwitchSignal({winId:winId,input:input}).then(res=>{
                if(res&&res.success){
                    const newSelectVisibles = [...selectVisibles];
                    newSelectVisibles[index] = false;
                    setSelectVisibles(newSelectVisibles);
                    const newNames = [...names];
                    newNames[index] = name;
                    setNames(newNames);
                }
            }).catch(err=>{
                const newSelectVisibles = [...selectVisibles];
                newSelectVisibles[index] = false;
                setSelectVisibles(newSelectVisibles);
            })
        }
        
    }

    // const handleSelectCancel = (index)=>{
    //     const newSelectVisibles = [...selectVisibles];
    //     newSelectVisibles[index] = false;
    //     setSelectVisibles(newSelectVisibles);
    //     // const newSelectVisibles = [...selectVisibles];
    //     // newSelectVisibles[index] = false;
    //     // setSelectVisibles(newSelectVisibles);
    // }

    return(
        <div className={styles.smallModule}>
            <div className={styles.square}>
                <div className={classNames(styles.squareInner,styles.grid)}>
                    {smallView&&smallView.length>0?smallView.map((item,index)=>{

                        return <div key={item.winId} className={styles.automaticDiv}>
                                    <div className={styles.rightDepend}>
                                        <Button type="primary" size="small" disabled={(item&&item.winId)?false:true} loading={btnDisable}  icon="fullscreen"  onClick={()=>{handleOpen(item.winId,index)}}></Button>
                                        <Modal
                                            width="100%"
                                            style={{top: 0}}
                                            bodyStyle={{height:'100vh'}}
                                            closable={false}
                                            footer={null}
                                            wrapClassName={styles.wrapClassName}
                                            getContainer={false}
                                            visible={screenVisibles[index]}
                                            onCancel={handleCancel}
                                            >
                                                <div className={styles.fullScreen}>
                                                    <div className={styles.cancelBtn}>
                                                        <Button type="primary" shape="circle" icon="fullscreen-exit"  size="large" loading={btnDisable} onClick={()=>{handleCancel(item.winId,index)}}/>
                                                    </div>
                                                    <div className={styles.textShow}>
                                                        {names[index]?names[index]:item.inputName}
                                                    </div>
                                                </div>
                                        </Modal>
                                    </div>                              
                                    <div className={styles.middleDepend}> {names[index]?names[index]:item.inputName}</div>    
                                    <div className={styles.rightDepend}>
                                        <Button disabled={(item.winId)?false:true} type="primary" shape="circle" icon="more"  size="small"  onClick={(e)=>{handleSelect(e,index)}}/>
                                        <Modal                   
                                        width={240}            
                                        style={{position:'absolute',left:myLeftPositioning,top: myTopPositioning}}
                                        bodyStyle={{padding:'0px'}}
                                        closable={false}
                                        footer={null}
                                        wrapClassName={styles.wrapSmallClassName}
                                        getContainer={false}
                                        visible={selectVisibles[index]}
                                        onCancel={handleSelectEnd.bind(this,null,index,null)}
                                        >
                                            <div className={styles.fullScreen}>
                                                <Select
                                                style={{ width: 240 }}
                                                // defaultValue={Option.valueOf() }
                                                value={initialSelVal}
                                                onChange={value => handleSelectEnd(item.winId,index,value)}
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
                    }):null}
                </div>
            </div>
        </div>
    )
}

export default SmallScreen