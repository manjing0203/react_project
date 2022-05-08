import React,{Component} from "react";
import { connect } from "react-redux";
import {test1Action,test2Action} from '../../reduxs/actions/login_action'
import logo from "./imgs/logo.png";
import "./css/login.css";
import {Form,Icon,Input,Button } from 'antd';
const {Item} = Form;

class Login extends Component{
  //登录提交信息,发送请求
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
  state =>({user:state}),
  {
    text1:test1Action,
    text2:test2Action
  }
)(Form.create()(Login))

