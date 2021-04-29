import React   from 'react';
import 'braft-editor/dist/index.css';
import { Modal,Form, Button,message} from 'antd';
import Card from 'antd/es/card';
import BraftEditor from 'braft-editor';
import styles from './EditorHeader.less';
import {getHeader,postHeader} from '../../services/mainPage'

const submitArray = ['创建', '保存'];

const fontFamilies = [
    {
        name: 'Araial',
        family: 'Arial, Helvetica, sans-serif'
    },
    { name: '仿宋', family: '仿宋' },
    { name: '宋体', family: '宋体,SimSun' },
    { name: '微软雅黑', family: '宋体,Microsoft Yahei' },
    { name: '楷体', family: '楷体 ' },
    { name: '思源黑体', family: '思源黑体' },
     { name: '隶书', family: '隶书' },
  ]

const controls = [
    'undo', 'redo', 'separator',
    'font-size', 'line-height', 'letter-spacing','font-family', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'remove-styles', 'emoji',  'separator',  'separator',
    'headings', 'blockquote', 'code', 'separator',
    'link', 'separator', 'hr', 'separator',
    'clear'
]

class EditorHeader extends React.Component {

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
      componentDidMount () {
        this.initData();
      }

      initData=()=>{
        getHeader().then(res=>{
            this.setState({loading:false})
            if(res && res.success){
                this.setState({
                    content:BraftEditor.createEditorState(res.data.content),
                    id:res.data.id
                    });          
            }else{
                message.error('获取标题失败');
            }
        }).catch(()=>{
            this.setState({loading:false})
            message.error('获取标题失败');
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

              postHeader(submitData).then(res=>{
                if(res&&res.success){
                    this.initData();
                    message.success('保存成功');
                }
            }).catch(err=>{
                message.error('保存失败');
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
                <Form.Item label="标题">
                {getFieldDecorator('content', {
                    validateTrigger: 'onBlur',
                    rules: [{
                    required: true,
                    validator: (_, value, callback) => {
                        if (value.isEmpty()) {
                        callback('请输入标题内容')
                        } else {
                        callback()
                        }
                    }
                    }],
                    initialValue: BraftEditor.createEditorState(content),
                })(
                    <BraftEditor
                    className={styles.editor}
                    contentClassName={styles.editorContent}
                    fontFamilies ={fontFamilies} 
                    controls = {controls}
                    placeholder="请输入标题内容"
                    />
                )}
                </Form.Item>
                <Form.Item>
                <Button  size="large" type="primary"  onClick={() =>
                                Modal.confirm({
                                                title:  "保存标题",
                                                content: '确定保存吗？',
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

export default Form.create()(EditorHeader)