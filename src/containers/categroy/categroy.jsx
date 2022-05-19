import React,{Component} from "react";
import { Card,Button,Icon,Table,Modal,Form,Input,message } from 'antd';
import { connect } from "react-redux";
import { saveCategoryListAction } from "../../reduxs/actions/category_action";
import {categoryListReq} from '../../api'
import {addListReq} from '../../api'
import {operaListReq} from '../../api'
const {Item} = Form;

@connect(
  state =>({}),
  {saveCategoryList:saveCategoryListAction}
)
@Form.create()
class Categroy extends Component{
  state = {
    categoryList:[],
    visible: false,
    title:'',
    isLoading:false,
    categoryName:'',//弹窗显示的值,用于数据回显
    categoryId:''
  }
 //点击操作分类的回调
  operaList = (data) => {
    let {_id,name} = data;
    console.log(data);
    this.setState({
      visible: true,
      title:'opera',
      categoryId:_id,
      categoryName:name
    });
  };
  //点击添加分类的回调
  addList = () => {
    this.setState({
      visible: true,
      title:'add'
    });
  };
  //点击确定按钮
  handleOk = () => {
    //统一验证表单
    this.props.form.validateFields(async(err,values)=>{
      let {categoryName} = values;
      let {title,categoryId} = this.state;
      let result
      if(!err){
        if(title==='add'){
          let result = await addListReq(categoryName)
          if(result.status === 1){
              message.warning(result.msg)
            }else{
              let categoryList = [...this.state.categoryList]//状态不能直接更新
              categoryList.unshift(result.data)
              message.success('添加分类成功')
              this.setState({
                visible: false,
                categoryList
              });
              this.props.form.resetFields();//表单重置
            }
        }else if(title === 'opera'){
          result = await operaListReq(categoryId,categoryName)
          if(result.status === 1){
            message.warning(result.msg)
          }else{
            this.getCategoryList()
            message.success('更改分类成功')
            this.setState({
              visible: false,
            });
            this.props.form.resetFields();//表单重置
          }
        }
         
      }else{
        message.warning('表单输入有误')
      }
    })
  };
  //点击取消按钮
  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();////表单重置
  }
 
  //获取商品列表
  getCategoryList = async()=>{
   let result = await categoryListReq()
   this.categoryList = result.data
   this.setState({
     categoryList:result.data,
     isLoading:false
    })
    this.props.saveCategoryList(this.categoryList)
  }
 //组件挂载
  componentDidMount(){
    this.getCategoryList();
    this.setState({
      isLoading:true
     })
  }

  render(){
    const { visible, title ,isLoading} = this.state
    const dataSource = this.state.categoryList;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
       // dataIndex: '_id',
        key: 'address',
        render:(data)=>{return <Button type="link" onClick={()=>{this.operaList(data)}}>操作分类</Button>},
        width:'25%',
        align:'center'
      },
    ];
    return (
      <div>
        <Card 
          extra={<Button type="primary" onClick={this.addList}><Icon type="plus" />添加</Button>}
        >
            <Modal
              title={title==='add'?'添加分类':'操作分类'}
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText='确定'
              cancelText='取消'
            >
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Item>
                  {getFieldDecorator('categoryName',
                  {
                    initialValue:this.state.categoryName
                  },
                   {
                    rules: [
                      { required: true, message: '分类名必须输入' },
                      ],
                  })(
                    <Input
                      placeholder="请输入您添加的分类名称"
                    />,
                  )}
                </Item>
              </Form>
            </Modal>
          <Table 
            dataSource={dataSource} 
            columns={columns}
            bordered={true}
            rowKey='_id'
            pagination={{pageSize:5,showQuickJumper:true}}
            loading={isLoading}
           />;
        </Card>
      </div>
    )
  }
}
export default Categroy;