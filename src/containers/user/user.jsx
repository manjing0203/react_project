import React,{Component} from "react";
import { Card,Table,Button,Icon, message,Modal,Form,Input,Select } from "antd";
import dayjs from 'dayjs'
import {userListReq,addUserReq,updateUserReq,deleteUserReq} from '../../api'
const {Item} = Form
const {Option} = Select

@Form.create()
class User extends Component{

  state = {
    userList:[],
    roleList:[],
    visible:false,
    operaType:'',
    username:'',
    phone:'',
    email:'',
    password:'',
    role_id:'',
    _id:'',
  }

  //创建用户确认按钮
  handleOk = e => {

    this.props.form.validateFields(async(err,values)=>{
      if(!err){
        if(this.state.operaType === 'add'){
          let result = await addUserReq(values)
          console.log(result)
          let {status,data,msg} = result
          if(status===0){
            let userList = [...this.state.userList]
            userList.unshift(data)
           this.setState({
            visible: false,
            userList
          });
          }else {
            message.error(msg)
            this.setState({visible:true})
          }
        }else if(this.state.operaType === 'update'){
          let result = await updateUserReq({...values,_id:this.state._id})
          console.log(result)
          let {status,msg} = result
          if(status===0){
           this.getUserList()
           this.setState({
            visible: false,
          });
          }else message.error(msg)
        }
      }
    })
    this.props.form.resetFields();//表单重置
  };

  //创建用户取消按钮
  handleCancel = e => {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();//表单重置
  };

  //获取用户列表
  getUserList = async()=>{
    let result = await userListReq()
    console.log(result)
    let {status,data,msg} = result
    if(status === 0){
      this.setState(
        {
        userList:data.users.reverse(),
        roleList:data.roles
      })
    }else message.error(msg)
  }

  //根据角色id展示角色名
  getRoleName = (role_id)=>{
    let {roleList} = this.state
    let result = roleList.find((item)=>{
      return item._id === role_id
    })
    return result.name
  }

  //点击修改回显数据
  updateUser = (_id)=>{
    this.setState({visible:true,operaType:'update',_id})
    let {userList} = this.state
    let result = userList.find((item)=>{
      return item._id === _id
    })
    this.setState({...result})
  }

  //删除用户
  deleteUser = async(_id)=>{
    let result = await deleteUserReq(_id)
    let {status} = result
    if(status===0){
      message.success('删除用户成功')
      this.getUserList()
    }
  }

  componentDidMount(){
    this.getUserList()
  }

  render(){
    let {userList,visible,roleList,operaType,username,password,email,phone,role_id} = this.state
    const dataSource = userList
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(time)=>{return dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss ')}
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        key: 'role_id',
        render:(role_id)=>{return this.getRoleName(role_id)}
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: 'opera',
        render:(_id)=>{
          return (
            <div>
              <Button type="link" onClick={()=>{this.updateUser(_id)}}>修改</Button>
              <Button type="link" onClick={()=>{this.deleteUser(_id)}}>删除</Button>
            </div>
          )
        }
      },
    ];
    return (
      <div>
        <Card 
          title={
           <Button type="primary" 
             onClick={
               ()=>{
                this.props.form.resetFields();//表单重置
                 this.setState({visible:true,operaType:'add'});
                 }
            }>
             <Icon type="plus" />
               创建用户
           </Button>
           } 
        >
          <Table 
            dataSource={dataSource}
            columns={columns}
            bordered 
            rowKey='_id'
            pagination={{pageSize:5,showQuickJumper:true}}
          />;
        </Card>
          <Modal
            title={operaType==='add'?'添加用户':'修改用户'}
            visible={visible}
            okText='确认'
            cancelText='取消'
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form 
              className="login-form"
              labelCol={{md:3}}
              wrapperCol={{md:19}}
              >
              <Item label='用户名'>
                {getFieldDecorator('username', {
                  initialValue:username||'',
                  rules: [{ required: true, message: '用户名必须输入' }],
                })(
                  <Input
                    placeholder="请输入用户名"
                  />,
                )}
              </Item>
              <Item label='密码'>
                {getFieldDecorator('password', {
                  initialValue:password||'',
                  rules: [{ required: true, message: '密码必须输入' }],
                })(
                  <Input
                    placeholder="请输入密码"
                  />,
                )}
              </Item>
              <Item label='手机号'>
                {getFieldDecorator('phone', {
                  initialValue:phone||'',
                  rules: [{ required: true, message: '手机号必须输入' }],
                })(
                  <Input
                    placeholder="请输入手机号"
                  />,
                )}
              </Item>
              <Item label='邮箱'>
                {getFieldDecorator('email', {
                  initialValue:email||'',
                  rules: [{ required: true, message: '邮箱必须输入' }],
                })(
                  <Input
                    placeholder="请输入邮箱"
                  />,
                )}
              </Item>
              <Item label='角色'>
                {getFieldDecorator('role_id', {
                  initialValue:role_id||'',
                  rules: [{ required: true, message: '角色必须选择' }],
                })(
                  <Select>
                    <Option value=''>请选择一个角色</Option>
                    {
                      roleList.map((item)=>{
                        return <Option key={item._id} value={item._id}>{item.name}</Option>
                      })
                    }
                  </Select>
                )}
              </Item>
            </Form>
          </Modal>
      </div>
    )
  }
}
export default User