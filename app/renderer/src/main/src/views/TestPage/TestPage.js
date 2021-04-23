import React from 'react';
import {Button} from 'antd';
import styles from './index.less'

const TestPage = (props)=>{
    console.log(styles)
    const goToMainPgae = ()=>{
        console.log(props)
        props.history.push({
            pathname:'/',
            state:{name:'mainpage'}
        })
    }
    return(
        <div className={styles.mainpagediv}>
            测试页面
            <Button onClick={()=>{goToMainPgae()}}>跳转到主页面</Button>
        </div>
    )
}

export default TestPage