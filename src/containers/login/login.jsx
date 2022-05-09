import React,{Component} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {createSaveUserInfo} from '../../reduxs/actions/login_action'
import logo from "./imgs/logo.png";
import "./css/login.css";
import {Form,Icon,Input,Button, message } from 'antd';
import loginReq from "../../api";
const {Item} = Form;

class Login extends Component{
  //登录提交信息,发送请求
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        //发送axioa请求
        let result = await loginReq(values)
        let {status,msg} = result;
        //axios请求成功后,判断用户名和密码是否与数据库匹配
        if(status === 0){
          //点击登录把状态保存到store中
          this.props.saveUserInfo(result.data)
          //跳转admin页面
           this.props.history.replace('/admin')
        }else{
          message.warning(msg)
        }
        console.log(result)
      }else{
        console.log(message.error('表单有误,请重新输入'))
      }
    });
  };
  //密码验证
  pswVerify = (rule, value, callback)=>{
     if(!value){
       callback('密码必须输入!')
     }else if(value.length<4){
       callback('密码必须小于4位')
     }else if(value.length>12){
       callback('密码不能大于12位')
     }else if(!/^\w+$/.test(value)){
       callback('密码必须是数字字母下划线')
     }else{
       callback()
     }
  }
  
  render(){
    const { getFieldDecorator } = this.props.form;
    if(this.props.user.isLogin){
      return <Redirect to="/admin"/>
    }
    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
           <Item>
             {getFieldDecorator('username', {
               rules: [
                 { required: true, message: '用户名必须输入' },
                 {max:12,message:'用户名最多为12位'},
                 {min:4,message:'用户名做少为4位'},
                 {pattern:/^\w+$/,message:'用户名必须是数字字母下划线'}
                ],
             })(
               <Input
                 prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 placeholder="用户名"
               />,
             )}
           </Item>
           <Item>
             {getFieldDecorator('password', {
               rules: [{validator:this.pswVerify}],
             })(
               <Input
                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 type="password"
                 placeholder="密码"
               />,
             )}
           </Item>
           <Item>
             <Button type="primary" htmlType="submit" className="login-form-button">
               登录
             </Button>
            </Item>
        </Form>
        </section>
      </div>
    )
  }
}

 export default connect(
  state =>({user:state.userInfo}),
  {
   saveUserInfo:createSaveUserInfo
  }
)(Form.create()(Login))

