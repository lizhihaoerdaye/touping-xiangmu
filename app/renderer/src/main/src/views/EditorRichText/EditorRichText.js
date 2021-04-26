import React from 'react';
import { Button } from 'antd';

const EditorRichText = (props)=>{
    return(
        <>
            <Button type="danger" onClick={()=>{props.history.goBack()}}>返回</Button>
            EditorRichText
        </>
    )
}

export default EditorRichText;