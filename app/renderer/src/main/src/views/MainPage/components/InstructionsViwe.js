import React from 'react';
import styles from './InstructionsViwe.less';

// 右侧说明模块
const InstructionsViwe = (props)=>{
    const {instructionsText} = props;
    return(
        <div className={styles.testStyle} dangerouslySetInnerHTML={{__html:instructionsText&&instructionsText.id?instructionsText.content:''}}></div>
    )
}

export default InstructionsViwe