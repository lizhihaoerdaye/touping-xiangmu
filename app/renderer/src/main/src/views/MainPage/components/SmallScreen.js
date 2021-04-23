import React from 'react';
import classNames from "classnames";
import styles from './SmallScreen.less'

// 小屏幕模块
const SmallScreen = (props)=>{
    const {smallView} = props
    return(
        <div className={styles.smallModule}>
            <div className={styles.square}>
                <div className={classNames(styles.squareInner,styles.grid)}>
                    {smallView&&smallView.length>0?smallView.map((list)=>{
                        return <div key={list.id} className={styles.automaticDiv}>{list.inputName?list.inputName:'无视频源'}</div>
                    }):null}
                </div>
            </div>
        </div>
    )
}

export default SmallScreen