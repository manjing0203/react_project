import React,{Component} from "react";
import { Card,Button,Icon,Table,message,Modal,Input,Form,Tree } from 'antd';
import dayjs from 'dayjs'
import { connect } from "react-redux";
import {roleListReq,addRoleReq,updateRoleReq} from '../../api'
import {PAGE_SIZE} from '../../config/config'
import {menuList} from '../../config/menu-config'
const {Item} = Form
const { TreeNode } = Tree;


@connect(
  state =>({username:state.userInfo.user.username})
)
@Form.create()
class Role extends Component{
    state = {
      roleList:[],
      total:'',
      current:'',
      isShowAdd:false,
      isShowAuth:false,
      roleName:'',
      roleId:'',
      checkedKeys: [],
      menuList,
    }

    onCheck = checkedKeys => {
      console.log('onCheck', checkedKeys);
      this.setState({ checkedKeys });
    };

    renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return  <TreeNode key={item.key} {...item} />;
    });

    //添加角色确认按钮
    handleOk = e => {
      console.log(e);
      e.preventDefault();
      this.setState({
        isShowAdd: false,
      });
      this.props.form.validateFields(async(err, values) => {
         let result = await addRoleReq(values)
         console.log(result)
         this.getRoleList()
      });
    };
    //添加角色取消按钮
    handleCancel = e => {
      console.log(e);
      this.setState({
        isShowAdd: false,
      });
    };

    //授权弹窗确认按钮
    handleAuthOk = async(e) =>{
      this.setState({
        isShowAuth: false,
      });
      let {roleId,checkedKeys} = this.state
      let {username} = this.props
      let result = await updateRoleReq({_id:roleId,menus:checkedKeys,auth_name:username,auth_time:Date.now()})
      console.log(result)
      let {status,data,msg} = result
      let roleList = [...this.state.roleList]
      if(status === 0){
       let result = roleList.map((item)=>{
          if(item._id === roleId){
            item.menus = data.menus
            item.auth_time = data.auth_time
            item.auth_name = data.auth_name
          }
          return item
        })
        console.log(result)
        this.setState({roleList:result})
      }else message.error(msg)
    }
    
    //授权弹窗取消按钮
    handleAuthCancel = e =>{
      this.setState({
        isShowAuth: false,
      });
    }
   
    //点击设置权限触发
    operaAuth = (id)=>{
     let result = this.state.roleList.find((item)=>{
       return item._id === id
     })
     this.setState({
       isShowAuth:true,
       roleName:result.name,
       roleId:id,
       checkedKeys:result.menus
      })
    }

  //获取所有角色列表
  getRoleList = async(pageNum=1)=>{
    let result = await roleListReq(pageNum, PAGE_SIZE)
    let {status,data,msg} = result
    if(status === 0){
      this.setState({
        roleList:data.list,
        total:data.total,
        current:data.pageNum,
      })
    }else message.error(msg)
  }

  //组件挂载
  componentDidMount(){
    this.getRoleList()
  }

  render(){
    let {roleList,total,current,isShowAdd,isShowAuth,roleName} = this.state
    const dataSource = roleList
    const { getFieldDecorator } = this.props.form;
    const treeData = this.state.menuList
    
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(time)=>{return dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss ')}
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        render:(time)=>{return time? dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss ') : ''}
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: 'opera',
        width:'15%',
        render:(id)=>{return <Button type="link" onClick={()=>{this.operaAuth(id)}}>设置权限</Button>}
      },
    ];
    return (
      <div>
        <Card 
          title={
          <Button 
             type="primary" 
             onClick={()=>{
               this.setState({isShowAdd:true})
               this.props.form.resetFields();//表单重置
              }
            }
          >
            <Icon type="plus" />
            添加角色
          </Button>} 
         >
          <Table 
            dataSource={dataSource}
            columns={columns}
            bordered 
            rowKey='_id'
            pagination={
              {
                current,
                pageSize:PAGE_SIZE,
                total,
                onChange:(current)=>{
                  this.getRoleList(current);
                 }
              }
            }
          />;
        </Card>
        {/* 添加角色 */}
        <Modal
          title="添加角色"
          visible={isShowAdd}
          okText='确认'
          cancelText='取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form 
              className="login-form"
              labelCol={{md:5}}
              wrapperCol={{md:19}}
              >
              <Item label='角色名称'>
                {getFieldDecorator('roleName', {
                  initialValue:'',
                  rules: [{ required: true, message: '角色名称必须输入' }],
                })(
                  <Input
                    placeholder="请输入角色名称"
                  />,
                )}
              </Item>
          </Form>
        </Modal>
        {/* 设置权限 */}
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          okText='确认'
          cancelText='取消'
          onOk={this.handleAuthOk}
          onCancel={this.handleAuthCancel}
        >
          <Form 
              className="login-form"
              labelCol={{md:4}}
              wrapperCol={{md:19}}
              >
              <Item label='角色名称'>
                {getFieldDecorator('roleName', {
                  initialValue:roleName||'',
                })(
                  <Input
                    placeholder="请输入角色名称"
                  />,
                )}
              </Item>
          </Form>
          <Tree
            checkable
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            defaultExpandAll
          >
            <TreeNode title='平台功能' key='top'>
              {this.renderTreeNodes(treeData)}
            </TreeNode>
          </Tree>
        </Modal>
      </div>
    )
  }
}
export default  Role