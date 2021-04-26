import React,{useState}  from 'react';
import classNames from "classnames";
import styles from './SmallScreen.less'
import {Button,Modal,Select } from 'antd';
import {postSetFullScreen,postCloseFullScreen,getVideoSources,postSwitchSignal} from '../../../services/mainPage'
const { Option } = Select;

// 小屏幕模块
const SmallScreen = (props)=>{
    const [btnDisable,setBtnDisable] = useState(false);
    const [sources, setSources] = useState([]);
    const [selectVisibles,setSelectVisibles] = useState([false,false,false,false,false,false]);
    const [screenVisibles, setScreenVisibles] = useState([false,false,false,false,false,false]);
    const [names, setNames] = useState([null,null,null,null,null,null]);
    const {smallView} = props

    
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

    //从后端接口动态获取Sources的方法
    const getSourcesList=()=> {
        getVideoSources()
            .then(function (res) {
                setSources(res.data);
            });
    }

    const handleSelect = (index)=>{
        const newSelectVisibles = [...selectVisibles];
        newSelectVisibles[index] = true;
        setSelectVisibles(newSelectVisibles);
        getSourcesList();
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
                                            style={{height:'100vh',top: 0}}
                                            bodyStyle={{height:'100vh',borderRadius:'none',backgroundColor:'#2e2c29'}}
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
                                        <Button disabled={(item.winId)?false:true} type="primary" shape="circle" icon="more"  size="small"  onClick={()=>{handleSelect(index)}}/>
                                        <Modal                               
                                        style={{height:'70vh',top: '15vh'}}
                                        bodyStyle={{height:'70vh',borderRadius:'none',backgroundColor:'#2e2c29'}}
                                        closable={false}
                                        footer={null}
                                        wrapClassName={styles.wrapClassName}
                                        getContainer={false}
                                        visible={selectVisibles[index]}
                                        onCancel={handleSelectEnd.bind(this,null,index,null)}
                                        >
                                            <div className={styles.fullScreen}>
                                                <Select
                                                style={{ width: 240 }}
                                                defaultValue={Option.valueOf() }
                                                onChange={value => handleSelectEnd(item.winId,index,value)}
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
                    }):null}
                </div>
            </div>
        </div>
    )
}

export default SmallScreen