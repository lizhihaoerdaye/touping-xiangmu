import React from 'react';
import {Button} from 'antd'
import styles from './HeadTitle.less';

const HeadTitle = (props)=>{
    const {headTextTitle} = props
    return(
        <div className={styles.titleParent}>
            <div className={styles.titleTestStyle} dangerouslySetInnerHTML={{__html:headTextTitle&&headTextTitle.id?headTextTitle.content:''}}></div>
            <Button type="primary" className={styles.editorTitle}>编辑标题</Button>
        </div>
    )
}

export default HeadTitle