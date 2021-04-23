import React from 'react';
import styles from './HeadTitle.less';

const HeadTitle = (props)=>{
    const {headTextTitle} = props
    return(
        <div className={styles.titleTestStyle} dangerouslySetInnerHTML={{__html:headTextTitle&&headTextTitle.id?headTextTitle.content:''}}></div>
    )
}

export default HeadTitle