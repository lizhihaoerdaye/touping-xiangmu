import React from 'react';
import { Button,Table ,Modal,message } from 'antd';
import CollectionCreateForm from './components/CollectionCreateForm'
import {getVideoSources,postUpdateVideoSources} from '../../services/mainPage'

class EditorVideo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            videoSources:[],
            loading:true,
            currentEditor:null,
            currentVisible:false
        }
    }



    componentDidMount(){
        this.initData();
    }

    initData=()=>{
        getVideoSources().then(res=>{
            this.setState({loading:false})
            if(res && res.success){
                this.setState({videoSources:res.data})
            }
        }).catch(()=>{
            this.setState({loading:false})
        })
    }

    editorFn = (obj)=>{
        this.setState({
            currentEditor:obj,
            currentVisible:true,
        })
    }

    handleOk = ()=>{
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          console.log('要上传的参数', values);
        postUpdateVideoSources(values).then(res=>{
            if(res&&res.success){
                this.setState({
                    currentVisible:false,
                });
                message.success('修改成功');
                this.initData();
            }else{
                message.error('修改失败');
            }
        }).catch(err=>{
           
            message.error('修改失败');
        })
    
      
        //   form.resetFields();// 清空表单
        //   this.setState({currentVisible:false});// 关闭弹出
        });
    }
    handleCancel =() =>{
        this.setState({
            currentVisible:false,
        })
    }
    render(){
        const {videoSources,loading,currentVisible,currentEditor} = this.state
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                align: 'center',
            },
            {
                title: 'Input',
                dataIndex: 'input',
                align: 'center',
            },
            {
                title: '名称',
                dataIndex: 'name',
                align: 'center',
            },
            {
                title: '操作',
                align: 'center',
                render: (text, record) => (
                    <Button type="link" onClick={()=>{this.editorFn(record)}}>编辑</Button>
                ),
            },
        ];
        return(
            <div style ={{padding:'10px'}}>
                <Button type="danger" style={{marginBottom:'20px'}} onClick={()=>this.props.history.goBack()}>返回</Button> 
                <div style={{backgroundColor:'white',borderRadius:'5px',padding:'10px'}}>
                    <Table
                    bordered= {true}
                    rowKey='id'
                    columns={columns} 
                    dataSource={videoSources}
                    loading={loading} 
                    pagination={{
                        defaultPageSize: 12,
                        showSizeChanger: true,
                        total: videoSources.length,
                        showTotal: (total)=>(<span>{`共${total}条数据`}</span>),
                    }} // 分页
                    />
                </div>
                <Modal title="修改" visible={currentVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <CollectionCreateForm
                    wrappedComponentRef={(formRef )=>this.formRef=formRef}
                    visible={this.state.currentVisible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleOk}
                    currentEditor={currentEditor}
                    />
                </Modal>
            </div>
        )
    }
}


export default EditorVideo;