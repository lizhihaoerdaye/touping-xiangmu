import React from 'react';
import { Modal, Form, Input } from 'antd';

// eslint-disable-next-line
class CreateForm extends React.Component {

    componentDidMount(){
        this.startAssignment()
    }
    // 组件更新时
    componentDidUpdate(perporps){
        console.log(perporps.visible,this)
        if(!perporps.visible && perporps.visible !== this.props.visible){
            this.startAssignment()
        }
    }

    // 给弹窗赋初始值
    startAssignment=()=>{
        const {currentEditor,form} = this.props
        const { setFieldsValue } = form
        if(currentEditor && currentEditor.id){
            setFieldsValue({
                id:currentEditor.id,
                input:currentEditor.input,
                name:currentEditor.name
            })
        }else{
            setFieldsValue({
                id:undefined,
                input:undefined,
                name:undefined
            })
        }
    }

    render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    return (
            <Modal
            visible={visible}
            title="修改"
            okText="保存"
            onCancel={onCancel}
            onOk={onCreate}
            >
                <Form layout="vertical">
                    <Form.Item label="ID">
                    {getFieldDecorator('id', {
                        rules: [{ required: true, message: '请输入id' }],
                    })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Input">
                    {getFieldDecorator('input', {
                        rules: [{ required: true, message: '请输入input' }],
                    })(<Input />)}
                    </Form.Item>
                    <Form.Item label="名称">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入名称' }],
                    })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(CreateForm);

export default CollectionCreateForm;