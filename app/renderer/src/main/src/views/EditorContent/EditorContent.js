import React   from 'react';
import 'braft-editor/dist/index.css';
import { Modal,Form, Button,message} from 'antd';
import Card from 'antd/es/card';
import BraftEditor from 'braft-editor';
import styles from './EditorContent.less';
import {getIntroduction,postIntroduction} from '../../services/mainPage'

const submitArray = ['创建', '修改'];

// const [content,setContent] = useState(null);

class EditorContent extends React.Component {

    
    constructor(props){
        super(props);
        this.state={
            id:0,
            content:BraftEditor.createEditorState(null),
            loading:true,
            currentEditor:null,
            currentVisible:false
        }
    }
      componentWillMount () {
        this.initData();
      }

      initData=()=>{
        getIntroduction().then(res=>{
            this.setState({loading:false})
            if(res && res.success){
                this.setState({
                    content:BraftEditor.createEditorState(res.data.content),
                    id:res.data.id
                    });
            }else{
                message.error('获取平台介绍失败');
            }
        }).catch(()=>{
            this.setState({loading:false})
            message.error('获取平台介绍失败');
        })
    }

      goBack = () => {
        this.props.history.goBack();
      }

      handleSubmit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
              console.log(values);
              const submitData = {
                id: this.state.id,
                content: values.content.toHTML()
              }

              postIntroduction(submitData).then(res=>{
                if(res&&res.success){
                    this.initData();
                }
            }).catch(err=>{
               
            })

            }
          })

      }
      
      
      render(){
        const {content } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
        <Card>
            <Button type="danger" onClick={this.goBack}>返回</Button>
            <div className="demo-container">
            {/* <BraftEditor
                    className={styles.editor}
                    value={content}
                    placeholder="请输入正文内容"
                    /> */}
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label="文章正文">
                {getFieldDecorator('content', {
                    validateTrigger: 'onBlur',
                    rules: [{
                    required: true,
                    validator: (_, value, callback) => {
                        if (value.isEmpty()) {
                        callback('请输入正文内容')
                        } else {
                        callback()
                        }
                    }
                    }],
                    initialValue: BraftEditor.createEditorState(content),
                })(
                    <BraftEditor
                    className={styles.editor}
                    placeholder="请输入正文内容"
                    />
                )}
                </Form.Item>
                <Form.Item>

                <Button  size="large" type="primary"  onClick={() =>
                                Modal.confirm({
                                                title:  "修改介绍",
                                                content: '确定修改吗？',
                                                okText: '确认',
                                                cancelText: '取消',
                                                onOk: () => this.handleSubmit(),
                                            })} >{submitArray[1]}</Button>
                </Form.Item>
            </Form>
            </div>
        </Card>
        )


    }

  
}

export default Form.create()(EditorContent)